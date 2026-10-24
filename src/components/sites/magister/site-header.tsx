import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ASSETS, links } from "./content";
import { MobileMenu } from "./mobile-menu";

type HeaderVariant = "dark" | "light";

// "dark": white logo over purple (home). "light": colored logo over the track color (track pages).
const styles = {
  dark: {
    logo: { src: `${ASSETS}/logo-white.png`, width: 1024, height: 347 },
    logoBox: "w-[19.159%]",
    logoImage: "w-[65%]",
    link: "font-poppins text-white hover:text-mg-secondary focus-visible:text-mg-secondary",
    linkBox: ["w-[158px]", "w-[113px]"],
    buttonBox: "w-[185px]",
    button: "font-poppins hover:border-mg-violet hover:bg-mg-secondary hover:text-mg-violet",
    primary: "border-white bg-white text-mg-violet",
    secondary: "border-white bg-transparent text-white",
    mobileBar: "py-[8px] max-tablet:py-[15px]",
  },
  light: {
    logo: { src: `${ASSETS}/logo-color.png`, width: 1024, height: 298 },
    logoBox: "w-[391px]",
    logoImage: "w-[185px]",
    link: "text-black hover:text-mg-violet focus-visible:text-mg-violet",
    linkBox: ["w-[145px]"],
    buttonBox: "w-[170px]",
    button: "hover:border-mg-violet hover:bg-mg-primary hover:text-white",
    primary: "border-mg-violet bg-mg-violet text-white",
    secondary: "border-mg-violet bg-transparent text-mg-violet",
    mobileBar: "py-[8px] max-tablet:py-[15px]",
  },
} as const;

export function SiteHeader({ variant = "dark" }: { variant?: HeaderVariant }) {
  const s = styles[variant];
  const navLink = cn("text-[16px] font-medium leading-none transition-colors duration-300", s.link);
  const navButton = cn(
    "block w-full rounded-[10px] border p-[10px] text-center text-[16px] font-bold leading-none transition-all duration-300",
    s.button,
  );
  const logo = (
    <Image
      src={s.logo.src}
      alt="Sapion Magister"
      width={s.logo.width}
      height={s.logo.height}
      preload
      className="h-auto w-full"
    />
  );

  return (
    <header className="relative">
      {/* Desktop (≥1025px) */}
      <div className="hidden px-[10px] desktop:block">
        <div className="mx-auto flex max-w-[1140px] items-center py-[10px]">
          <div className={cn("p-[10px]", s.logoBox)}>
            <Link href={links.home} className={cn("block", s.logoImage)}>
              {logo}
            </Link>
          </div>
          <nav aria-label="Principal" className="ml-auto flex items-center">
            <div className={cn("flex justify-center p-[10px]", s.linkBox[0])}>
              <a href={links.trilhas} className={navLink}>
                Nossos cursos
              </a>
            </div>
            {variant === "dark" && (
              <div className={cn("flex justify-center p-[10px]", s.linkBox[1])}>
                <a href={links.governo} className={navLink}>
                  Governo
                </a>
              </div>
            )}
            <div className={cn("p-[10px]", s.buttonBox)}>
              <a href={links.login} className={cn(navButton, s.primary)}>
                Sou aluno
              </a>
            </div>
            <div className={cn("p-[10px]", s.buttonBox)}>
              <a href={links.assine} className={cn(navButton, s.secondary)}>
                Assine agora
              </a>
            </div>
          </nav>
        </div>
      </div>

      {/* Tablet and mobile (≤1024px) */}
      <div className={cn("flex items-center desktop:hidden", s.mobileBar)}>
        <div
          className={cn(
            "p-[10px]",
            variant === "dark"
              ? "w-1/2 max-tablet:w-[65%] max-tablet:p-0"
              : "w-1/2 max-tablet:w-[65%] max-tablet:py-0 max-tablet:pr-0",
          )}
        >
          <Link
            href={links.home}
            className={cn("block", variant === "dark" ? "max-tablet:w-[80%]" : "w-[187px] max-w-full")}
          >
            {logo}
          </Link>
        </div>
        <div className="flex flex-1 justify-end p-[10px]">
          <MobileMenu tone={variant === "dark" ? "white" : "violet"} />
        </div>
      </div>
    </header>
  );
}

/** Thin purple rule under the light header on track pages. */
export function HeaderDivider() {
  return (
    <div className="relative -mt-[22px] px-[10px]">
      <div className="mx-auto max-w-[1140px] py-[25px]">
        <hr className="border-0 border-t border-mg-violet" />
      </div>
    </div>
  );
}
