"use client";

import { Check, Link2 } from "lucide-react";
import { useState, type SVGProps } from "react";

const icon = (d: string) =>
  function Icon(props: SVGProps<SVGSVGElement>) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
        <path fill="currentColor" d={d} />
      </svg>
    );
  };

const WhatsAppIcon = icon(
  "M12.04 2a9.9 9.9 0 0 0-8.5 15l-1.4 5 5.2-1.36A9.9 9.9 0 1 0 12.04 2Zm5.8 14.1c-.24.68-1.42 1.3-1.96 1.36-.5.06-1.13.08-1.82-.11a16.6 16.6 0 0 1-1.65-.61 12.9 12.9 0 0 1-4.94-4.37c-.37-.5-1.03-1.53-1.03-2.92 0-1.4.73-2.08 1-2.37.25-.28.56-.35.75-.35h.54c.17 0 .4-.06.63.48.24.56.8 1.94.87 2.08.07.14.12.3.02.49-.09.18-.14.3-.28.46l-.42.49c-.14.14-.28.29-.12.57.16.28.73 1.2 1.56 1.94 1.07.95 1.98 1.25 2.26 1.39.28.14.44.12.6-.07.17-.19.7-.82.88-1.1.19-.28.37-.23.63-.14.26.1 1.63.77 1.91.91.28.14.47.21.54.33.07.11.07.66-.17 1.34Z",
);
const LinkedInIcon = icon(
  "M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05a3.74 3.74 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45Z",
);
const FacebookIcon = icon(
  "M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12Z",
);
const XIcon = icon(
  "M17.75 3h3.07l-6.7 7.66L22 21h-6.17l-4.83-6.32L5.47 21H2.4l7.17-8.2L2 3h6.33l4.37 5.78L17.75 3Zm-1.08 16.17h1.7L7.4 4.73H5.58l11.09 14.44Z",
);

/** Share links plus a copy-link button for a post. */
export function ShareButtons({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const encodedUrl = encodeURIComponent(url);
  const targets = [
    { label: "WhatsApp", Icon: WhatsAppIcon, href: `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}` },
    { label: "LinkedIn", Icon: LinkedInIcon, href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}` },
    { label: "Facebook", Icon: FacebookIcon, href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}` },
    { label: "X", Icon: XIcon, href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodeURIComponent(title)}` },
  ];
  const button =
    "grid size-11 place-items-center rounded-full border border-mg-line bg-white text-mg-purple transition-colors duration-300 hover:border-mg-purple hover:bg-mg-purple hover:text-white";

  return (
    <div className="flex flex-wrap items-center gap-3">
      <p className="mr-2 text-[15px] font-semibold text-mg-ink">Compartilhe</p>
      {targets.map(({ label, Icon, href }) => (
        <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={`Compartilhar no ${label}`} className={button}>
          <Icon className="size-5" />
        </a>
      ))}
      <button
        type="button"
        aria-label="Copiar link"
        className={button}
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            window.setTimeout(() => setCopied(false), 2000);
          } catch {
            setCopied(false);
          }
        }}
      >
        {copied ? <Check className="size-5" /> : <Link2 className="size-5" />}
      </button>
      <span role="status" className="text-[13px] text-mg-muted">
        {copied ? "Link copiado!" : ""}
      </span>
    </div>
  );
}
