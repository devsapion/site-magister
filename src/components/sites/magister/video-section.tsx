import { cn } from "@/lib/utils";
import { ASSETS, flipCards, links, type FlipCard } from "./content";

function FlipBox({ card }: { card: FlipCard }) {
  return (
    <div className="mg-flip relative h-[150px] rounded-[20px] tablet:h-[125px]" tabIndex={0}>
      <div
        className="mg-flip-face mg-flip-front flex h-full items-center justify-center rounded-[20px] bg-cover bg-[position:0_0] bg-no-repeat p-[25px] shadow-[0_0_10px_0_rgba(0,0,0,0.5)]"
        style={{ backgroundColor: card.frontColor, backgroundImage: `url(${ASSETS}/flip-front-bg.png)` }}
      >
        <h3 className="text-center text-[18px] font-bold leading-[1.2] text-white tablet:text-[24px]">{card.title}</h3>
      </div>
      <div
        className="mg-flip-face mg-flip-back absolute inset-0 flex flex-col justify-center rounded-[20px] bg-cover bg-[position:0_0] bg-no-repeat p-[25px]"
        style={{ backgroundImage: `url(${ASSETS}/flip-back-bg.png)` }}
      >
        <h3 className="mb-[10px] text-[14px] font-bold leading-[1.2] text-black tablet:text-[18px]">{card.title}</h3>
        <p className="text-[12px] leading-[1.4] text-black tablet:text-[14px]">{card.text}</p>
      </div>
    </div>
  );
}

const variants = {
  home: {
    section: "bg-[linear-gradient(180deg,#5613a3_0%,#83adc8_100%)] tablet:px-[10px]",
    inner: "tablet:py-[10px]",
  },
  // Track pages: extra bottom space that the testimonials section overlaps.
  trilha: {
    section: "bg-[linear-gradient(182deg,#5613a3_34%,#a05ff9_100%)]",
    inner: "pb-[330px]",
  },
};

export function VideoSection({ variant = "home" }: { variant?: keyof typeof variants }) {
  const v = variants[variant];
  return (
    <section className={v.section}>
      <div className={cn("mx-auto flex max-w-[1140px] flex-col tablet:flex-row", v.inner)}>
        <div className="flex shrink-0 flex-col justify-center p-[10px] pb-[17px] tablet:w-[56.096%]">
          <iframe
            src={links.video}
            title="Apresentação Sapion Magister"
            className="h-[415px] w-full rounded-[15px]"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            loading="lazy"
          />
        </div>
        <div className="flex flex-1 flex-col gap-5 p-[10px]">
          {flipCards.map((card) => (
            <FlipBox key={card.title} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}
