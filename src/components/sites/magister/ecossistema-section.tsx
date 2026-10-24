import Image from "next/image";
import type { ComponentType, ReactNode, SVGProps } from "react";
import { cn } from "@/lib/utils";
import { Carousel } from "./carousel";
import { ASSETS, testimonialRows, type Testimonial } from "./content";
import { ClockIcon, MunicipalitiesIcon, StudentsIcon } from "./icons";

interface Stat {
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  iconClassName: string;
  gapClassName: string;
  title: ReactNode;
  description: string;
}

const stats: Stat[] = [
  {
    Icon: StudentsIcon,
    iconClassName: "size-[80px] tablet:size-[110px]",
    gapClassName: "tablet:gap-5",
    title: "milhares",
    description: "de cursistas",
  },
  {
    Icon: MunicipalitiesIcon,
    iconClassName: "size-[92px] tablet:-ml-[6px] tablet:size-[115px]",
    gapClassName: "tablet:gap-5",
    title: "dezenas",
    description: "de municípios",
  },
  {
    Icon: ClockIcon,
    iconClassName: "size-[80px] tablet:size-[105px]",
    gapClassName: "tablet:gap-[28px]",
    title: (
      <>
        <span className="text-[32px]">+de</span>
        <br />
        2000h
      </>
    ),
    description: "de conteúdo",
  },
];

// Swiper rows that bleed past the right edge, each offset like the source.
const rowClassNames = [
  "tablet:-mr-[45px] -mr-[45px] -mb-[10px] tablet:mb-0",
  "-mr-[120px] ml-[80px] -mb-[10px] tablet:mb-0",
  "-mr-[45px]",
];

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className="flex h-full flex-col rounded-[20px] border border-mg-primary bg-white p-[20px] pl-[25px] tablet:pl-[40px]">
      <blockquote className="text-[14px] leading-[1.5] text-black tablet:text-[16px]">{testimonial.text}</blockquote>
      <figcaption className="mt-[25px] text-[14px] font-bold leading-[1.5] text-mg-gray tablet:text-[16px]">
        {testimonial.name}
      </figcaption>
    </figure>
  );
}

/** `overlapClassName` pulls the section up over the previous one (240px on the home, 192px on tracks). */
export function EcossistemaSection({ overlapClassName = "-mt-[240px]" }: { overlapClassName?: string }) {
  return (
    <section
      className={cn(
        "relative bg-[url(/sites/magister/images/ecossistema-bg.png)] bg-cover bg-no-repeat py-[50px]",
        overlapClassName,
      )}
    >
      <div className="mx-auto flex max-w-[1140px] flex-col tablet:flex-row">
        <div className="flex flex-col gap-5 p-[10px] tablet:w-[50.242%] tablet:shrink-0">
          <h2
            className="mb-[25px] text-center text-[34px] font-bold leading-none text-mg-primary tablet:text-left tablet:text-[38px]"
            data-animate="fadeIn"
          >
            Ecossistema de educadores e resultados de verdade
          </h2>
          {stats.map(({ Icon, iconClassName, gapClassName, title, description }) => (
            <div
              key={description}
              className={cn("mb-[30px] flex flex-col items-center gap-5 tablet:flex-row", gapClassName)}
              data-animate="fadeInLeft"
            >
              <Icon className={cn("shrink-0", iconClassName)} />
              <div className="text-center tablet:text-left">
                <h3 className="mt-2 mb-4 text-[40px] font-bold leading-[34px] text-mg-indigo tablet:text-[48px]">
                  {title}
                </h3>
                <p className="h-px text-[20px] font-bold leading-[1px] text-mg-indigo tablet:text-[28px]">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="relative z-[11] mt-[30px] flex min-w-0 flex-col gap-5 tablet:mt-[135px] tablet:-mr-[370px] tablet:w-full">
          <div
            className="absolute top-[-134px] left-[167px] hidden w-[110px] desktop:block"
            aria-hidden="true"
          >
            <Image
              src={`${ASSETS}/ecossistema-illustration.png`}
              alt=""
              width={500}
              height={413}
              className="h-auto w-full"
            />
          </div>
          {testimonialRows.map((row, i) => (
            <div key={i} className={rowClassNames[i]}>
              <Carousel
                label={`Depoimentos ${i + 1}`}
                perView={{ mobile: 2, tablet: 2, desktop: 2 }}
                gap={{ mobile: 10, tablet: 10, desktop: 20 }}
                autoplayMs={5000}
                pauseOnHover
                pauseOnInteraction
                viewportClassName="mx-auto w-[95%]"
              >
                {row.map((testimonial) => (
                  <TestimonialCard key={testimonial.text} testimonial={testimonial} />
                ))}
              </Carousel>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
