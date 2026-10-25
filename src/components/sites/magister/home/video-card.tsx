"use client";

import Image from "next/image";
import { useState } from "react";
import { HOME } from "./home-content";

const embed = "https://www.youtube-nocookie.com/embed/2HUE36-zVds?autoplay=1&rel=0";

/** Presentation video: a poster with a play button that swaps in the YouTube player on click. */
export function VideoCard() {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-[24px] bg-mg-night">
      {playing ? (
        <iframe
          src={embed}
          title="Apresentação Sapion Magister"
          className="absolute inset-0 h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className="group absolute inset-0 h-full w-full"
          aria-label="Assistir ao vídeo de apresentação da Sapion Magister"
        >
          <Image
            src={`${HOME}/video-poster.jpg`}
            alt=""
            fill
            sizes="(min-width: 1025px) 760px, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
          <span className="absolute inset-0 bg-[linear-gradient(180deg,rgba(26,11,69,0)_45%,rgba(26,11,69,0.55)_100%)]" />
          <span className="absolute top-1/2 left-1/2 grid size-[76px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white shadow-[0_20px_40px_-12px_rgba(0,0,0,0.6)] transition-transform duration-300 group-hover:scale-110">
            <span className="absolute inset-0 animate-ping rounded-full bg-white/50 [animation-duration:2.2s]" />
            <svg viewBox="0 0 24 24" className="relative ml-1 size-7 fill-mg-purple" aria-hidden="true">
              <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.6-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" />
            </svg>
          </span>
          <span className="absolute bottom-5 left-6 text-left text-white">
            <span className="block text-[13px] font-medium text-white/80">Conheça a plataforma</span>
            <span className="block text-[18px] font-bold">Assista à apresentação</span>
          </span>
        </button>
      )}
    </div>
  );
}
