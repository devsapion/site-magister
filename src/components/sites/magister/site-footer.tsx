import Image from "next/image";
import { ASSETS } from "./content";

export function SiteFooter() {
  return (
    <footer className="bg-[radial-gradient(at_top_center,#8341e9_50%,#b896e7_100%)] py-10">
      <div className="mx-auto flex max-w-[1140px] flex-col items-center gap-5 px-[10px] tablet:px-0">
        <Image
          src={`${ASSETS}/logo-white.png`}
          alt="Sapion Magister"
          width={1024}
          height={347}
          className="h-auto w-[34%] tablet:w-[15%]"
        />
        <p className="text-center text-[16px] leading-none text-white">
          Transformando o Brasil através da Nova Educação{" "}
          <Image
            src={`${ASSETS}/heart.svg`}
            alt="❤️"
            width={16}
            height={16}
            className="inline-block size-[1em] align-[-0.1em]"
          />{" "}
          © Sapion Magister
        </p>
      </div>
    </footer>
  );
}
