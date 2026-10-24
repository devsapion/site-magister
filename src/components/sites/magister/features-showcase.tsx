import Image from "next/image";
import { cn } from "@/lib/utils";
import { ASSETS, features, type Feature } from "./content";

function FeatureCard({ feature, className, mobile }: { feature: Feature; className?: string; mobile?: boolean }) {
  const title = feature.title.split(" ");
  return (
    <div
      className={cn(
        "mg-feature-card relative z-[1] flex flex-col gap-5 rounded-[30px_70px_30px_30px] px-[5px] transition-[background] duration-800",
        feature.paddingClassName,
        className,
      )}
      data-animate={mobile ? "fadeInLeft" : feature.animation}
    >
      <div className="flex justify-center">
        <Image
          src={feature.icon.src}
          alt=""
          width={feature.icon.width * 4}
          height={feature.icon.height * 4}
          style={mobile ? { width: feature.icon.mobileWidth, height: "auto" } : { width: feature.icon.width }}
          className={mobile ? undefined : "h-auto"}
        />
      </div>
      <h3
        className={cn(
          "text-center font-bold text-mg-secondary transition-colors duration-300",
          mobile ? "text-[18px]" : "text-[24px]",
          "leading-none",
        )}
      >
        {title.length === 2 && title[0] === "Magister" ? (
          <>
            {title[0]}
            <br />
            {title[1]}
          </>
        ) : (
          feature.title
        )}
      </h3>
    </div>
  );
}

interface FeaturesShowcaseProps {
  /** Vertical offset of the desktop arch (it overlaps the block above on track pages). */
  desktopRowClassName?: string;
  mobileGridClassName?: string;
}

/** Feature cards (Adaptive Learning … Magister Labs) and the Inovação × Educação diagram. */
export function FeaturesShowcase({
  desktopRowClassName = "mt-[45px]",
  mobileGridClassName = "mt-[45px]",
}: FeaturesShowcaseProps) {
  return (
    <>
      {/* Tablet and mobile: features in a two-column grid */}
      <div className={cn("flex flex-wrap justify-center gap-[13px] desktop:hidden", mobileGridClassName)}>
        {features.map((feature) => (
          <FeatureCard key={feature.title} feature={feature} className="w-[48%]" mobile />
        ))}
      </div>

      {/* Desktop: features arranged in an arch */}
      <div className={cn("hidden h-[366px] gap-5 px-[10px] py-[10px] desktop:flex", desktopRowClassName)}>
        {features.map((feature) => (
          <FeatureCard key={feature.title} feature={feature} className={cn("flex-1", feature.desktopClassName)} />
        ))}
      </div>

      <div className="relative tablet:px-[10px] tablet:py-[10px] desktop:-mt-[105px]">
        <div className="flex justify-center" data-animate="fadeIn">
          <Image
            src={`${ASSETS}/venn-inovacao-educacao.png`}
            alt="Inovação e Educação"
            width={1536}
            height={1092}
            sizes="(min-width: 768px) 660px, 100vw"
            className="h-auto w-full tablet:w-[60%]"
          />
        </div>
        <div
          className="absolute top-[-27px] left-[1158px] hidden w-[23px] desktop:block"
          data-animate="fadeIn"
          aria-hidden="true"
        >
          <Image src={`${ASSETS}/scroll-arrows.png`} alt="" width={84} height={327} className="h-auto w-full" />
        </div>
      </div>
    </>
  );
}

/** Standalone version used on track pages, over the dark purple gradient. */
export function FeaturesSection() {
  return (
    <section className="relative bg-[linear-gradient(171deg,#45108a_16%,#5713a4_48%)] py-10">
      <div className="mx-auto max-w-[1140px] px-[10px]">
        <div className="flex flex-col gap-5 py-[10px]">
          <FeaturesShowcase desktopRowClassName="-mt-[152px]" mobileGridClassName="-mt-[30px]" />
        </div>
      </div>
    </section>
  );
}
