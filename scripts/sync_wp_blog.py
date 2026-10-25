"""Snapshot the blog posts of the current WordPress site into the Next.js app.

Fetches every post from https://magister.sapion.com.br/wp-json/wp/v2/posts, cleans the
Elementor/Gutenberg markup down to plain article HTML, downloads the images to
public/sites/magister/blog/<slug>/ and writes src/lib/magister/blog-posts.json.

Run from the repository root:  python3 -I scripts/sync_wp_blog.py
"""

from __future__ import annotations

import html
import json
import math
import re
import shutil
import subprocess
import sys
import unicodedata
import urllib.parse
import urllib.request
from html.parser import HTMLParser
from pathlib import Path

WP = "https://magister.sapion.com.br"
ROOT = Path(__file__).resolve().parent.parent
PUBLIC_DIR = ROOT / "public" / "sites" / "magister" / "blog"
PUBLIC_URL = "/sites/magister/blog"
OUT = ROOT / "src" / "lib" / "magister" / "blog-posts.json"

# WordPress category slug -> blog category slug used by the site.
CATEGORY_MAP = {
    "trilha-inovacao": "inovacao",
    "trilha-infancia": "infancia",
    "trilha-skills": "skills",
    "trilha-inclusao": "inclusao",
    "trilha-gestao": "gestao",
    "geral": "plataforma",
    "sem-categoria": "plataforma",
}

KEEP = {
    "p", "h2", "h3", "h4", "ul", "ol", "li", "strong", "em", "a", "blockquote", "figure",
    "figcaption", "img", "iframe", "br", "hr", "table", "thead", "tbody", "tr", "th", "td",
}
RENAME = {"b": "strong", "i": "em", "h1": "h2", "h5": "h4", "h6": "h4"}
DROP = {"script", "style", "nav", "svg", "noscript", "form", "button"}
VOID = {"img", "br", "hr"}
UA = {"User-Agent": "Mozilla/5.0 (Sapion Magister blog sync)"}


def fetch(url: str) -> bytes:
    with urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=60) as response:
        return response.read()


def slugify(text: str) -> str:
    text = unicodedata.normalize("NFKD", text).encode("ascii", "ignore").decode()
    return re.sub(r"[^a-z0-9]+", "-", text.lower()).strip("-")


class Cleaner(HTMLParser):
    """Rebuilds the post HTML keeping only article tags and a few safe attributes."""

    def __init__(self, post_slug: str, post_slugs: set[str]) -> None:
        super().__init__(convert_charrefs=True)
        self.post_slug = post_slug
        self.post_slugs = post_slugs
        self.out: list[str] = []
        self.stack: list[str | None] = []  # emitted tag or None for unwrapped elements
        self.drop_depth = 0
        self.images: list[str] = []
        self.headings: list[dict[str, object]] = []
        self.heading_buffer: list[str] | None = None

    def rewrite_link(self, href: str) -> str:
        parsed = urllib.parse.urlparse(href)
        if parsed.netloc.endswith("magister.sapion.com.br"):
            slug = parsed.path.strip("/")
            if slug in self.post_slugs:
                return f"/blog/{slug}"
            if slug.startswith("trilha-") or slug == "":
                return f"/{slug}"
        return href

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        a = {k: (v or "") for k, v in attrs}
        if self.drop_depth or tag in DROP or a.get("id") == "ez-toc-container":
            if tag not in VOID:
                self.drop_depth += 1
            return
        tag = RENAME.get(tag, tag)
        if tag not in KEEP:
            if tag not in VOID:
                self.stack.append(None)
            return

        kept: list[tuple[str, str]] = []
        if tag == "a":
            href = self.rewrite_link(a.get("href", ""))
            if not href or href.startswith("#"):
                self.stack.append(None)
                return
            kept.append(("href", href))
            if href.startswith("http"):
                kept += [("target", "_blank"), ("rel", "noopener noreferrer")]
        elif tag == "img":
            src = a.get("src", "")
            if not src:
                return
            self.images.append(src)
            kept += [("src", src), ("alt", a.get("alt", "")), ("loading", "lazy")]
            for dim in ("width", "height"):
                if a.get(dim, "").isdigit():
                    kept.append((dim, a[dim]))
        elif tag == "iframe":
            src = a.get("src", "")
            if "youtube" not in src:
                self.drop_depth += 1
                return
            kept += [("src", src), ("title", a.get("title", "Vídeo")), ("loading", "lazy"), ("allowfullscreen", "")]
        elif tag in ("h2", "h3"):
            self.heading_buffer = []

        attrs_html = "".join(f' {k}="{html.escape(v, quote=True)}"' if v else f" {k}" for k, v in kept)
        self.out.append(f"<{tag}{attrs_html}>")
        if tag not in VOID:
            self.stack.append(tag)

    def handle_startendtag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        # Self-closing tags inside a dropped subtree (e.g. <path/> in an svg) open nothing.
        if self.drop_depth:
            return
        self.handle_starttag(tag, attrs)
        if tag not in VOID:
            self.handle_endtag(tag)

    def handle_endtag(self, tag: str) -> None:
        if tag in VOID:
            return
        if self.drop_depth:
            self.drop_depth -= 1
            return
        if not self.stack:
            return
        emitted = self.stack.pop()
        if emitted is None:
            return
        if emitted in ("h2", "h3") and self.heading_buffer is not None:
            text = re.sub(r"\s+", " ", "".join(self.heading_buffer)).strip()
            heading_id = slugify(text) or f"secao-{len(self.headings) + 1}"
            # Put the id on the opening tag emitted earlier.
            for i in range(len(self.out) - 1, -1, -1):
                if self.out[i] == f"<{emitted}>":
                    self.out[i] = f'<{emitted} id="{heading_id}">'
                    break
            self.headings.append({"id": heading_id, "text": text, "level": int(emitted[1])})
            self.heading_buffer = None
        self.out.append(f"</{emitted}>")

    def handle_data(self, data: str) -> None:
        if self.drop_depth:
            return
        if self.heading_buffer is not None:
            self.heading_buffer.append(data)
        self.out.append(html.escape(data, quote=False))

    def result(self) -> str:
        body = "".join(self.out)
        # Drop wrappers the editors left empty (nested galleries, blank list items...).
        empty = re.compile(r"<(p|figure|ol|ul|li|strong|em|blockquote)>(\s|&nbsp;|\xa0)*</\1>")
        while empty.search(body):
            body = empty.sub("", body)
        body = re.sub(r"\n{2,}", "\n", body)
        return body.strip()


# Static first frames of animated images, used as covers: local animated src -> poster src.
POSTERS: dict[str, str] = {}


def download_image(url: str, post_slug: str, name: str | None = None) -> str:
    folder = PUBLIC_DIR / post_slug
    folder.mkdir(parents=True, exist_ok=True)
    filename = name or Path(urllib.parse.urlparse(url).path).name
    target = folder / filename
    if target.suffix.lower() == ".gif" and shutil.which("gif2webp") and shutil.which("magick"):
        # Screen-recording GIFs weigh 8-20 MB: ship them as lossy animated WebP instead.
        webp, poster = target.with_suffix(".webp"), target.with_name(f"{target.stem}-poster.webp")
        if not webp.exists():
            target.write_bytes(fetch(url))
            subprocess.run(
                ["gif2webp", "-lossy", "-q", "40", "-m", "4", "-mt", "-quiet", str(target), "-o", str(webp)],
                check=True,
            )
            subprocess.run(["magick", f"{target}[0]", "-resize", "1600x>", "-quality", "80", str(poster)], check=True)
            target.unlink()
        local = f"{PUBLIC_URL}/{post_slug}/{webp.name}"
        POSTERS[local] = f"{PUBLIC_URL}/{post_slug}/{poster.name}"
        return local
    if not target.exists():
        target.write_bytes(fetch(url))
    return f"{PUBLIC_URL}/{post_slug}/{filename}"


def text_of(fragment: str) -> str:
    return re.sub(r"\s+", " ", html.unescape(re.sub(r"<[^>]+>", " ", fragment))).strip()


def main() -> None:
    posts = json.loads(fetch(f"{WP}/wp-json/wp/v2/posts?per_page=100&_embed=1"))
    slugs = {p["slug"] for p in posts}
    result = []
    for post in posts:
        slug = post["slug"]
        embedded = post.get("_embedded", {})
        terms = [t for group in embedded.get("wp:term", []) for t in group if t.get("taxonomy") == "category"]
        category = next((CATEGORY_MAP[t["slug"]] for t in terms if t["slug"] in CATEGORY_MAP), "plataforma")
        author = (embedded.get("author") or [{}])[0]

        cleaner = Cleaner(slug, slugs)
        cleaner.feed(post["content"]["rendered"])
        body = cleaner.result()
        for src in cleaner.images:
            local = download_image(src, slug)
            body = body.replace(f'src="{html.escape(src, quote=True)}"', f'src="{local}"')

        media = (embedded.get("wp:featuredmedia") or [{}])[0]
        cover = None
        if media.get("source_url"):
            details = media.get("media_details", {})
            ext = Path(urllib.parse.urlparse(media["source_url"]).path).suffix
            cover = {
                "src": download_image(media["source_url"], slug, f"capa{ext}"),
                "width": details.get("width"),
                "height": details.get("height"),
                "alt": text_of(media.get("alt_text") or post["title"]["rendered"]),
            }
        elif cleaner.images:
            first = re.search(r'<img src="([^"]+)"[^>]*?(?:width="(\d+)")?[^>]*?(?:height="(\d+)")?', body)
            if first:
                cover = {
                    "src": POSTERS.get(first.group(1), first.group(1)),
                    "width": int(first.group(2)) if first.group(2) else None,
                    "height": int(first.group(3)) if first.group(3) else None,
                    "alt": text_of(post["title"]["rendered"]),
                }

        words = len(text_of(body).split())
        excerpt = text_of(post["excerpt"]["rendered"]).replace("[…]", "").replace("[&hellip;]", "").strip()
        result.append(
            {
                "slug": slug,
                "title": text_of(post["title"]["rendered"]),
                "excerpt": excerpt,
                "date": post["date"],
                "modified": post["modified"],
                "category": category,
                "author": {"name": author.get("name", "Equipe Sapion Magister"), "bio": text_of(author.get("description", ""))},
                "cover": cover,
                "readingMinutes": max(1, math.ceil(words / 200)),
                "headings": cleaner.headings,
                "html": body,
            }
        )
        print(f"{post['date'][:10]}  {category:<10}  {slug}  ({len(cleaner.images)} imagens)")

    result.sort(key=lambda p: p["date"], reverse=True)
    OUT.write_text(json.dumps(result, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
    print(f"{len(result)} posts -> {OUT.relative_to(ROOT)}")


if __name__ == "__main__":
    sys.exit(main())
