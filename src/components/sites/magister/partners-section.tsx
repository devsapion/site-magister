import Image from "next/image";
import { Carousel } from "./carousel";
import { ContactPopup } from "./contact-popup";
import { ASSETS, partners } from "./content";

export function PartnersSection() {
  return (
    <section className="bg-mg-light pt-10 pb-[90px]">
      <div className="mx-auto max-w-[1140px]">
        <div className="relative z-[1] flex flex-col gap-5 rounded-[30px] bg-mg-violet p-[20px] tablet:p-10">
          <Image
            src={`${ASSETS}/star-purple.png`}
            alt=""
            width={110}
            height={110}
            className="absolute top-[-53px] left-[269px] h-auto w-[31px] tablet:top-[-57px] tablet:right-0 tablet:left-auto tablet:w-[45px]"
          />
          <h2 className="text-[25px] font-bold leading-none text-white tablet:text-[28px]">Confiam na Sapion Magister!</h2>
          <Carousel
            label="Confiam na Sapion Magister"
            perView={{ mobile: 1, tablet: 2, desktop: 4 }}
            gap={{ mobile: 20, tablet: 20, desktop: 20 }}
            autoplayMs={5000}
            dots
            className="pt-[30px]"
            slideClassName="flex items-center pb-[7px]"
            dotsClassName="h-[30px] gap-[12px] pb-[6px]"
            dotClassName="size-[6px] bg-white"
            activeDotClassName="bg-mg-secondary"
          >
            {partners.map((partner) => (
              <Image
                key={partner.src}
                src={partner.src}
                alt={partner.alt}
                width={500}
                height={300}
                sizes="(min-width: 1025px) 250px, (min-width: 768px) 50vw, 100vw"
                className="h-auto w-full rounded-[15px]"
              />
            ))}
          </Carousel>
          <div className="pt-[30px] text-center">
            <ContactPopup />
          </div>
        </div>
      </div>
    </section>
  );
}
