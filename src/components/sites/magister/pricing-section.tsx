import Image from "next/image";
import { cn } from "@/lib/utils";
import { ASSETS, links, subscriptionBenefits } from "./content";
import { CheckIcon } from "./icons";

// Same content everywhere; only the section background and the benefits card colors change.
const variants = {
  home: {
    section: "bg-[linear-gradient(180deg,#83adc8_8%,#8bbad0_32%)] pt-10 pb-[340px]",
    card: "bg-[#d9e9fb]",
    title: "text-mg-primary",
    subtitle: "text-black",
    list: "text-black",
    check: "fill-mg-primary",
  },
  trilha: {
    section: "bg-[#c0fdfe] pb-[80px] tablet:pt-10",
    card: "bg-[#46108a]",
    title: "text-white",
    subtitle: "text-mg-secondary",
    list: "text-white",
    check: "fill-mg-secondary",
  },
};

export function PricingSection({ variant = "home" }: { variant?: keyof typeof variants }) {
  const v = variants[variant];
  return (
    <section id="assine" className={v.section}>
      <div className="mx-auto max-w-[1140px] p-[10px] tablet:px-[10px] tablet:py-0">
        <div className="flex flex-col tablet:flex-row tablet:py-[10px]">
          {/* Benefits */}
          <div className={cn("relative z-[1] flex flex-col gap-5 rounded-[30px_60px_0_30px] p-[20px] shadow-[0_0_10px_0_rgba(0,0,0,0.5)] tablet:w-[620px] tablet:shrink-0 tablet:p-10", v.card)}>
            <Image
              src={`${ASSETS}/book-icon.png`}
              alt=""
              width={485}
              height={496}
              className="absolute top-[27px] right-[24px] h-auto w-[36px] tablet:top-[26px] tablet:right-[42px] tablet:w-[49px]"
            />
            <h2 className={cn("pr-[50px] text-[25px] font-bold leading-none tablet:text-[28px]", v.title)}>
              Assine a Sapion Magister!
            </h2>
            <p className={cn("text-[16px] font-semibold leading-none tablet:text-[18px]", v.subtitle)}>
              Ao assinar a Sapion Magister, você terá:
            </p>
            <ul className={cn("font-roboto text-[14px] leading-[1.5] tablet:text-[16px]", v.list)}>
              {subscriptionBenefits.map((benefit) => (
                <li key={benefit} className="flex items-start">
                  <CheckIcon className={cn("mt-[5px] mr-[4px] size-[16px] shrink-0", v.check)} />
                  <span className="pl-[5px]">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Investment */}
          <div className="-mt-[70px] rounded-[30px] border-4 border-[#e4af08] bg-[linear-gradient(256deg,#fdbf00_63%,#b88a05_100%)] px-[15px] py-[15px] shadow-[0_0_10px_0_rgba(0,0,0,0.5)] tablet:mt-0 tablet:-ml-[100px] tablet:w-[600px] tablet:shrink-0">
            <div className="rounded-[30px] border-2 border-black pt-[65px] tablet:mx-[4px] tablet:pt-[20px] tablet:pr-[20px] tablet:pb-[20px] tablet:pl-[95px]">
              <div className="flex flex-col gap-5 px-[10px] py-[10px]">
                <h2 className="-mb-[12px] text-center text-[30px] font-bold leading-none text-mg-deep tablet:text-[46px]">
                  Investimento
                </h2>
                <p className="bg-mg-secondary p-[10px] text-center text-[14px] font-bold leading-none text-black shadow-[6px_6px_0_-3px_rgba(0,0,0,0.1)] tablet:text-[16px]">
                  CADA TRILHA POR MENOS DE <span className="text-[22px]">R$ 200</span>
                </p>
                <p className="-mb-[12px] text-center text-[38px] font-bold leading-none text-mg-deep">
                  10x <span className="text-[28px]">R$</span> <span className="text-[80px]">99,70</span>
                </p>
                <div className="text-center">
                  <a
                    href={links.subscribe}
                    className="inline-block rounded-[20px] bg-[linear-gradient(135deg,#431983_31%,#8341e9_100%)] px-[60px] py-[26px] text-[20px] font-bold leading-none text-white tablet:text-[26px]"
                  >
                    Assine agora
                  </a>
                </div>
                <p className="text-center text-[14px] leading-none text-black tablet:text-[20px]">
                  7 dias de garantia total
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
