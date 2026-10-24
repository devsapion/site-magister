import Image from "next/image";
import { Carousel } from "./carousel";
import { ASSETS, links, team } from "./content";
import { whiteCta } from "./hero-section";

export function TeamSection() {
  return (
    <section className="relative bg-[linear-gradient(40deg,#d6e8fa_66%,#a9a1f5_85%)] py-[60px]">
      <div
        className="pointer-events-none absolute top-[-83px] right-[-32px] z-[1] hidden w-[336px] desktop:block"
        data-animate="fadeIn"
        aria-hidden="true"
      >
        <Image src={`${ASSETS}/time-cube.png`} alt="" width={1024} height={1021} className="h-auto w-full" />
      </div>

      <div className="mx-auto flex max-w-[1140px] flex-col gap-5">
        <Image
          src={`${ASSETS}/time-stars.png`}
          alt=""
          width={692}
          height={200}
          className="mx-auto h-auto w-[43%] tablet:w-[15%]"
        />
        <h2 className="text-center text-[36px] font-bold leading-none text-black tablet:text-[42px]">#TimeMagister</h2>

        <Carousel
          label="#TimeMagister"
          perView={{ mobile: 1, tablet: 2, desktop: 4 }}
          gap={{ mobile: 20, tablet: 20, desktop: 20 }}
          autoplayMs={5000}
          pauseOnHover
          pauseOnInteraction
          dots
          className="mt-[10px] p-[10px] tablet:mt-[60px] tablet:p-0"
          slideClassName="pb-[7px]"
          dotsClassName="h-[30px] gap-[12px] pb-[6px]"
          dotClassName="size-[6px] bg-black opacity-20"
          activeDotClassName="opacity-100"
        >
          {team.map((member) => (
            <Image
              key={member.src}
              src={member.src}
              alt={member.alt}
              width={1113}
              height={1700}
              sizes="(min-width: 1025px) 270px, (min-width: 768px) 50vw, 100vw"
              className="h-auto w-full"
            />
          ))}
        </Carousel>

        <div className="mt-[10px] p-[10px] text-center">
          <a href={links.signUp} className={whiteCta}>
            Teste por 14 dias grátis
          </a>
        </div>
      </div>
    </section>
  );
}
