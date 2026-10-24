import Image from "next/image";
import { cn } from "@/lib/utils";
import { Carousel } from "./carousel";
import { trilhas, type Trilha } from "./content";
import { FeaturesShowcase } from "./features-showcase";

function TrilhaCard({ trilha, variant }: { trilha: Trilha; variant: "row" | "slide" }) {
  return (
    <div
      className="flex h-full flex-col justify-center gap-5 rounded-[30px_80px_30px_30px] px-[15px] py-[25px] shadow-[0_0_10px_0_rgba(0,0,0,0.3)]"
      style={{ backgroundColor: trilha.color }}
    >
      {variant === "row" ? (
        <div className="flex h-[92px] items-center justify-center">
          <Image
            src={trilha.icon.src}
            alt=""
            width={trilha.icon.width * 4}
            height={trilha.icon.height * 4}
            style={{ width: trilha.icon.width, height: trilha.icon.height }}
          />
        </div>
      ) : (
        <div className="flex justify-center">
          <Image
            src={trilha.icon.src}
            alt=""
            width={trilha.icon.width * 4}
            height={trilha.icon.height * 4}
            className="h-auto w-[35%] tablet:w-[36%]"
          />
        </div>
      )}
      <h3 className="-mb-[15px] text-center text-[22px] font-bold leading-none text-mg-violet">{trilha.title}</h3>
      <p className={cn("text-center font-roboto text-[14px] leading-none text-black", variant === "row" && "flex-1")}>
        {trilha.description}
      </p>
      <div className="text-center">
        <a
          href={trilha.href}
          className="inline-block rounded-[10px] bg-mg-blue p-[10px] text-[12px] font-bold leading-none text-white transition-colors duration-300 hover:bg-mg-violet"
        >
          Conhecer cursos
        </a>
      </div>
    </div>
  );
}

export function TrilhasSection() {
  return (
    <section
      id="trilhas"
      className="relative scroll-mt-0 bg-[linear-gradient(171deg,#a05ff9_16%,#5713a4_48%)] py-10"
    >
      <div className="mx-auto max-w-[1140px]">
        <div className="bg-[url(/sites/magister/images/trilhas-path-bg.png)] bg-[length:962px_auto] bg-[position:-232px_155px] bg-no-repeat px-[10px] tablet:bg-contain tablet:bg-[position:0_0] desktop:bg-[position:0_83px]">
          <div className="flex flex-col gap-5 py-[10px]">
            <h2 className="text-center text-[36px] font-bold leading-none text-mg-secondary tablet:text-[38px]">
              Trilhas de aprendizagem
            </h2>
            <p className="py-[10px] text-center text-[16px] leading-[18px] text-white tablet:px-[50px] tablet:py-0 tablet:text-[18px] desktop:px-[300px]">
              Aprender nunca foi tão fácil e motivador! Conheça nossas trilhas de aprendizagem que vão
              transformar sua formação e suas aulas em experiências incríveis.
            </p>

            {/* Tablet and mobile: one track per slide */}
            <Carousel
              label="Trilhas de aprendizagem"
              perView={{ mobile: 1, tablet: 1, desktop: 1 }}
              gap={{ mobile: 0, tablet: 0, desktop: 0 }}
              autoplayMs={5000}
              arrows
              arrowInset={10}
              className="desktop:hidden"
              viewportClassName="mx-auto w-[95%]"
              slideClassName="p-[20px] pb-[37px]"
              arrowClassName="text-[rgba(238,238,238,0.9)]"
            >
              {trilhas.map((trilha) => (
                <TrilhaCard key={trilha.title} trilha={trilha} variant="slide" />
              ))}
            </Carousel>

            {/* Tablet and desktop: five cards in a row */}
            <div className="mt-10 mb-[30px] hidden gap-5 px-[10px] py-[10px] tablet:flex">
              {trilhas.map((trilha) => (
                <div
                  key={trilha.title}
                  className="flex-1"
                  data-animate="fadeIn"
                  data-delay={trilha.delay || undefined}
                >
                  <TrilhaCard trilha={trilha} variant="row" />
                </div>
              ))}
            </div>

            <FeaturesShowcase />
          </div>
        </div>
      </div>
    </section>
  );
}
