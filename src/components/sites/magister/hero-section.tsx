import Image from "next/image";
import { ASSETS, links } from "./content";
import { Sparkle } from "./sparkle";

export const whiteCta =
  "inline-block rounded-[10px] border border-white bg-white px-[24px] py-[12px] text-center text-[18px] font-bold leading-none text-mg-violet transition-all duration-300 hover:border-mg-secondary hover:bg-mg-secondary max-tablet:text-[16px]";

function StoreBadges({ className }: { className?: string }) {
  return (
    <div className={className}>
      <a href={links.appStore} className="block" data-animate="fadeInRight">
        <Image
          src={`${ASSETS}/badge-app-store.png`}
          alt="Disponível na App Store"
          width={600}
          height={182}
          className="h-auto w-[138px] max-desktop:mx-auto max-desktop:w-[80%]"
        />
      </a>
      <a href={links.googlePlay} className="block" data-animate="fadeInRight">
        <Image
          src={`${ASSETS}/badge-google-play.png`}
          alt="Disponível no Google Play"
          width={568}
          height={172}
          className="h-auto w-[138px] max-desktop:mx-auto max-desktop:w-[80%]"
        />
      </a>
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="relative bg-[linear-gradient(180deg,#8341e9_0%,#a05ff9_80%)] px-[10px]">
      <div className="mx-auto flex max-w-[1140px] flex-col py-[10px] tablet:flex-row">
        <div className="relative mt-[25px] flex flex-col gap-5 tablet:mt-[65px] tablet:w-1/2 tablet:p-[10px]">
          <Sparkle className="top-[-32px] left-[29px] size-[26px] tablet:top-[-70px] tablet:left-[114px]" />
          <Sparkle
            className="top-[-25px] left-[274px] size-[21px] tablet:top-[-80px] tablet:left-[382px] tablet:size-[26px]"
            delay={500}
          />
          <Sparkle className="top-[-65px] left-[212px] size-[30px] tablet:top-[-107px] tablet:left-[243px] tablet:size-[44px]" />

          <h1 className="text-[30px] font-semibold leading-none text-white tablet:text-[34px] desktop:text-[36px]">
            Transformamos a formação de professores por meio da empatia, personalização e gamificação
          </h1>
          <p className="text-[16px] leading-[18px] text-white tablet:mt-[16px] tablet:mb-[15px] tablet:text-[18px] tablet:leading-[22px]">
            Você poderá experimentar um pouco do que a Sapion Magister oferece para a formação de
            professores, focada em metodologias ativas, ferramentas digitais e os segredos da Nova
            Educação. Veja como nossas soluções são concebidas a partir da premissa da Nova Educação,
            influenciada pela transformação digital.
          </p>
          <div>
            <a href={links.signUp} className={`${whiteCta} max-tablet:w-full`}>
              Teste por 14 dias grátis
            </a>
          </div>
          <StoreBadges className="relative z-[9] -mr-[100px] hidden flex-col items-end gap-[5px] desktop:flex" />
        </div>

        <div
          className="relative mt-[20px] flex flex-col justify-center p-[10px] tablet:mt-0 tablet:w-1/2 desktop:justify-start"
          data-animate="fadeIn"
        >
          <div data-animate="fadeInRight">
            <Image
              src={`${ASSETS}/hero-phones.png`}
              alt="Aplicativo Sapion Magister no celular"
              width={1467}
              height={1536}
              preload
              sizes="(min-width: 768px) 550px, 100vw"
              className="h-auto w-full"
            />
          </div>
          <StoreBadges className="relative z-[9] grid grid-cols-2 gap-[5px] p-[10px] desktop:hidden" />

          <Sparkle className="top-[125px] left-[32px] size-[26px]" delay={500} />
          <Sparkle className="top-[404px] left-[-2px] size-[26px] tablet:top-[470px] tablet:left-[100px]" delay={800} />
          <Sparkle className="top-[293px] left-[543px] size-[26px]" floating />
          <Sparkle className="top-[543px] left-[413px] hidden size-[26px] tablet:block" />
          <Sparkle className="top-[6px] left-[216px] size-[26px]" delay={1000} />
          <Sparkle
            className="top-[3px] left-[329px] size-[11px] tablet:top-[-5px] tablet:left-[379px] tablet:size-[44px]"
            animation="fadeInDown"
            delay={300}
          />
        </div>
      </div>
    </section>
  );
}
