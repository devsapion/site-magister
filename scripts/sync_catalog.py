"""Snapshot the course catalog of the platform into the Next.js app.

Reads https://appmagister.com.br/catalogo (the institutional catalog generated from the platform
data), downloads every course thumbnail and consultant photo as WebP to
public/sites/magister/cursos/ and writes src/lib/magister/catalog.json, which the track pages
(/trilha-*) and the track cards of the home read.

Run from the repository root:  python3 -I scripts/sync_catalog.py
"""

from __future__ import annotations

import html
import json
import re
import shutil
import subprocess
import sys
import tempfile
import unicodedata
import urllib.request
from datetime import date
from pathlib import Path

CATALOG = "https://appmagister.com.br/catalogo"
ROOT = Path(__file__).resolve().parent.parent
PUBLIC_DIR = ROOT / "public" / "sites" / "magister" / "cursos"
PUBLIC_URL = "/sites/magister/cursos"
OUT = ROOT / "src" / "lib" / "magister" / "catalog.json"
UA = {"User-Agent": "Mozilla/5.0 (Sapion Magister catalog sync)"}

# Catalog tone class -> track slug of the site.
TRILHAS = {
    "inovacao": "trilha-inovacao",
    "infancia": "trilha-infancia",
    "skills": "trilha-skills",
    "inclusao": "trilha-inclusao",
    "gestao": "trilha-gestao",
}

# The catalog cuts long texts with "…". When no occurrence of a text is complete, these
# replace it, ending the sentence where the catalog stopped. A complete text in a future
# catalog always wins over the override.
DESCRIPTION_OVERRIDES = {
    "BNCC da Computação Sem Mistérios: da política à prática na sala de aula": (
        "Capacite-se para compreender e implementar, de forma crítica e prática, as diretrizes da "
        "Base Nacional Comum Curricular (BNCC) da Computação. Uma formação para professores, "
        "coordenadores pedagógicos e gestores escolares."
    ),
    "Leitura crítica na era digital: Estratégias para interpretar textos multimodais": (
        "Desenvolva com seus alunos habilidades de interpretação e análise de textos multimodais — "
        "como imagens, vídeos, infográficos, memes e posts em redes sociais — com base em uma "
        "perspectiva crítica e reflexiva."
    ),
    "Acolha, ensine e transforme caminhos de aprendizagem no transtorno do espectro autista": (
        "Desenvolvido para apoiar educadores, gestores e profissionais da educação na construção de "
        "práticas pedagógicas inclusivas, sensíveis e efetivas para estudantes com TEA."
    ),
    "Construindo a Escola Antirracista com o PNEERQ": (
        "Fortaleça a formação de professores, gestores e profissionais da educação para a construção "
        "de práticas pedagógicas comprometidas com a equidade racial, a justiça cognitiva e a "
        "valorização das epistemologias negras e quilombolas."
    ),
    "Aprenda com Thiago Gusmão: Tudo sobre a Inclusão do Estudante com TEA": (
        "Todo professor já se viu diante de um estudante com TEA sem saber por onde começar. Este "
        "curso responde a isso com base científica e linguagem acessível: você vai compreender os "
        "fundamentos do neurodesenvolvimento, os níveis de suporte e como o cérebro autista "
        "processa informação."
    ),
    "Gestão Educacional Estratégica: Dados, Financiamento e Avaliações": (
        "Qualifique gestores, técnicos educacionais e demais profissionais da educação para uma "
        "gestão estratégica, com foco no uso qualificado dos dados, no domínio dos mecanismos de "
        "financiamento da educação e na compreensão das avaliações externas."
    ),
}

CONSULTANT_TITLE_OVERRIDES = {
    "Gessélia": "Consultora educacional",
    "Professor PH": "Mestre em Educação Tecnológica (IFTM)",
    "Israel Boniek": "Doutor em Educação, bacharel em Filosofia (UFSC) e mestre em Teologia",
    "Vanessa Martins": "Mestra em Linguística (UFC) e formadora de professores",
    "Mariana Guidolini": "Jornalista por formação",
    "Ronis Faria": "Doutor e Mestre em Letras",
    "Eliana Comério": "Escritora",
    "Jordana Neri": "Doutora e mestra em Botânica",
    "Camila Reis": "Doutora em Biologia Vegetal",
    "Analice Torezani": "Mestre em Matemática (UFES)",
    "Leticia Frechiani": "Graduada em Ciências Biológicas",
    "Ana Carolina Ceron Oliveira Mônico": "Engenheira Florestal",
    "Felipe Junior Mauricio Pomuchenq": "Coordenador do centro de formação e reflexão do MEPES",
    "Ana Carla Loss Furlan Gerke": "Mestra em Ensino de Humanidades",
    "Ana Gabriela Rauta Siller": "Psicóloga",
    "Dirlan Bravo": "Doutora em Educação (UFES)",
    "Rita Maria Vissi": "Professora há 23 anos",
    "Carline Borges": "Doutora em Educação",
    "Noélia da Silva": "Escritora, professora e pesquisadora em Educação",
    "Geisa Hupp Lacerda": "Mestra em Ciências das Religiões",
    "Adriana Sperandio": "Mestre em Educação",
    "Gisele de Nadai": "Doutora e mestra em Educação",
}

NAME_FIXES = {"Gisele de nadai": "Gisele de Nadai"}

STAT_KEYS = {
    "videoaulas": "videos",
    "e-books e textos": "ebooks",
    "atividades práticas": "activities",
    "conteúdos extras": "extras",
}


def fetch(url: str) -> bytes:
    with urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=60) as response:
        return response.read()


def slugify(text: str) -> str:
    text = unicodedata.normalize("NFKD", text).encode("ascii", "ignore").decode()
    return re.sub(r"[^a-z0-9]+", "-", text.lower()).strip("-")


def text_of(fragment: str) -> str:
    return re.sub(r"\s+", " ", html.unescape(re.sub(r"<[^>]+>", " ", fragment))).strip()


def first(pattern: str, source: str) -> str | None:
    match = re.search(pattern, source, re.S)
    return match.group(1) if match else None


def truncated(text: str | None) -> bool:
    return not text or text.endswith("…")


def download_webp(url: str, target: Path, width: int, quality: int) -> None:
    """Saves `url` as a WebP no wider than `width`. Existing files are kept."""
    if target.exists():
        return
    target.parent.mkdir(parents=True, exist_ok=True)
    with tempfile.NamedTemporaryFile(suffix=Path(url).suffix) as source:
        source.write(fetch(url))
        source.flush()
        subprocess.run(
            ["magick", source.name, "-resize", f"{width}x>", "-strip", "-quality", str(quality), str(target)],
            check=True,
        )


def parse_courses(page: str) -> list[dict]:
    sections = re.findall(r'<section class="(pc-slide[^"]*pc-course\b[^"]*)"(.*?)</section>', page, re.S)
    courses = []
    for classes, section in sections:
        tone = first(r"pc-tone--(\w+)", classes)
        thumb = first(r'pc-course__thumb">\s*<img src="([^"]+)"', section)
        courses.append(
            {
                "tone": tone,
                "title": text_of(first(r'class="pc-course__title">(.*?)</h2>', section) or ""),
                "description": text_of(first(r'class="pc-course__desc">(.*?)</p>', section) or ""),
                "modules": [
                    text_of(re.sub(r"<span>\d+</span>", "", item))
                    for item in re.findall(
                        r"<li>(.*?)</li>", first(r'pc-course__modules">.*?<ol>(.*?)</ol>', section) or ""
                    )
                ],
                # The full-size artwork lives next to the optimized one used by the catalog.
                "thumb": thumb.replace("/optimized/", "/") if thumb else None,
                "stats": {
                    STAT_KEYS[text_of(label)]: int(value)
                    for value, label in re.findall(
                        r"<strong>(\d+)</strong>\s*<span>(.*?)</span>",
                        first(r'pc-course__stats">(.*?)</ul>', section) or "",
                    )
                },
                "consultants": [
                    {"photo": photo, "name": text_of(name), "title": text_of(title)}
                    for photo, name, title in re.findall(
                        r'<li>\s*<img src="([^"]+)"[^>]*>\s*<div>\s*<strong>(.*?)</strong>\s*(?:<span>(.*?)</span>)?',
                        first(r'pc-consultants[^"]*">(.*?)</ul>', section) or "",
                    )
                ],
            }
        )
    return courses


def main() -> None:
    if not shutil.which("magick"):
        sys.exit("ImageMagick (magick) is required to convert the images to WebP.")

    page = fetch(CATALOG).decode("utf-8")
    raw = parse_courses(page)
    if not raw:
        sys.exit("No course found: the catalog markup changed.")

    # Same consultant across courses: keep the most complete title seen.
    consultants: dict[str, dict] = {}
    for course in raw:
        for person in course["consultants"]:
            name = NAME_FIXES.get(person["name"], person["name"])
            slug = slugify(name)
            current = consultants.setdefault(slug, {"name": name, "title": "", "source": person["photo"]})
            title = person["title"]
            better = (truncated(current["title"]) and not truncated(title)) or (
                truncated(current["title"]) == truncated(title) and len(title) > len(current["title"])
            )
            if better:
                current["title"] = title
            person["slug"] = slug

    warnings = []
    for slug, person in consultants.items():
        if truncated(person["title"]):
            override = CONSULTANT_TITLE_OVERRIDES.get(person["name"])
            if override:
                person["title"] = override
            else:
                warnings.append(f"consultant title still truncated: {person['name']} — {person['title']!r}")
        elif person["title"].isupper() and person["name"] in CONSULTANT_TITLE_OVERRIDES:
            # Shouted titles ("DRA. E MESTRA EM EDUCAÇÃO") get the written-out version.
            person["title"] = CONSULTANT_TITLE_OVERRIDES[person["name"]]
        target = PUBLIC_DIR / "consultores" / f"{slug}.webp"
        download_webp(person.pop("source"), target, 320, 80)
        person["photo"] = f"{PUBLIC_URL}/consultores/{target.name}"

    courses = []
    for course in raw:
        slug = slugify(course["title"])
        description = course["description"]
        if truncated(description):
            override = DESCRIPTION_OVERRIDES.get(course["title"])
            if override:
                description = override
            else:
                warnings.append(f"description still truncated: {course['title']}")
        image = None
        if course["thumb"]:
            target = PUBLIC_DIR / f"{slug}.webp"
            download_webp(course["thumb"], target, 1200, 78)
            image = f"{PUBLIC_URL}/{target.name}"
        courses.append(
            {
                "id": slug,
                "trilha": TRILHAS[course["tone"]],
                "title": course["title"],
                "description": description,
                "image": image,
                "modules": course["modules"],
                "stats": course["stats"],
                "consultants": [person["slug"] for person in course["consultants"]],
            }
        )

    OUT.write_text(
        json.dumps(
            {
                "source": CATALOG,
                "syncedAt": date.today().isoformat(),
                "courses": courses,
                "consultants": dict(sorted(consultants.items())),
            },
            ensure_ascii=False,
            indent=2,
        )
        + "\n",
        encoding="utf-8",
    )
    print(f"{len(courses)} courses, {len(consultants)} consultants -> {OUT.relative_to(ROOT)}")
    for warning in warnings:
        print(f"warning: {warning}", file=sys.stderr)


if __name__ == "__main__":
    main()
