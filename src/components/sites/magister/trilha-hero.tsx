import Image from "next/image";
import type { Trilha } from "./content";
import { Sparkle } from "./sparkle";

export function TrilhaHero({ trilha }: { trilha: Trilha }) {
  return (
    <section
      className="relative"
      style={{ backgroundImage: `linear-gradient(180deg, ${trilha.pageColor} 5%, #e7ffff 100%)` }}
    >
      <div className="mx-auto flex max-w-[1140px] flex-col tablet:flex-row tablet:pt-10 tablet:pb-[100px]">
        <div className="relative flex shrink-0 flex-col gap-5 p-[10px] tablet:w-[33.083%]">
          <Sparkle className="top-[39px] left-[287px] size-[44px]" floating="soft" />
          <Sparkle className="top-[194px] left-[313px] size-[21px]" floating="soft" />

          <p className="-mb-[10px] text-[20px] font-bold leading-none text-mg-violet tablet:mb-0">
            Trilhas de aprendizagem
          </p>
          <h1 className="text-[56px] font-bold leading-none text-mg-violet">{trilha.title}</h1>
          <p className="my-[5px] text-[16px] leading-[22px] text-black tablet:mt-[16px] tablet:mb-[15px] tablet:text-[18px]">
            {trilha.description}
          </p>
          <div>
            <a
              href="#cursos"
              className="inline-block rounded-[10px] border border-mg-violet bg-mg-violet px-[24px] py-[12px] text-center text-[16px] font-bold leading-none text-white transition-all duration-300 hover:border-mg-primary hover:bg-mg-primary max-tablet:w-full tablet:text-[18px]"
            >
              Conheça os cursos
            </a>
          </div>
        </div>

        <div className="relative p-[10px] tablet:w-[20%]">
          <Image
            src={trilha.icon.src}
            alt=""
            width={trilha.icon.width * 4}
            height={trilha.icon.height * 4}
            className="ml-[10.5px] hidden h-auto w-[84px] tablet:block"
          />
          <Sparkle className="top-[142px] left-[132px] size-[29px]" floating="soft" />
          <Sparkle className="top-[250px] left-[51px] size-[18px]" floating="soft" />
        </div>

        <div className="relative p-[10px] tablet:w-[55%]">
          <Sparkle className="top-[-32px] left-[111px] size-[21px]" floating="soft" />
          <Sparkle className="top-[379px] left-[104px] size-[33px]" floating="soft" />
          <Sparkle className="top-[-27px] left-[504px] size-[17px]" floating="soft" />
          <Sparkle className="top-[98px] left-[573px] size-[19px]" floating="soft" />
        </div>
      </div>
    </section>
  );
}
