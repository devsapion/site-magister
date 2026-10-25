import Image from "next/image";
import { trilhas } from "../content";
import { homeLinks, logos } from "./home-content";
import { InstagramIcon, StoreBadges, TikTokIcon, YouTubeIcon } from "./ui";

const platformLinks = [
  { label: "Sou aluno", href: homeLinks.login },
  { label: "Teste por 14 dias grátis", href: homeLinks.signUp },
  { label: "Assine agora", href: homeLinks.subscribe },
  { label: "Governo", href: homeLinks.governo },
];

const socials = [
  { label: "Instagram", href: homeLinks.instagram, Icon: InstagramIcon },
  { label: "TikTok", href: homeLinks.tiktok, Icon: TikTokIcon },
  { label: "YouTube", href: homeLinks.youtube, Icon: YouTubeIcon },
];

const heading = "text-[15px] font-bold text-white";
const link = "text-[15px] text-white/70 transition-colors duration-300 hover:text-mg-mint";

export function HomeFooter() {
  return (
    <footer className="bg-mg-night text-white">
      <div className="mx-auto grid max-w-[1160px] gap-10 px-5 py-14 tablet:grid-cols-2 desktop:grid-cols-[1.3fr_1fr_1fr_1.2fr] desktop:py-16">
        <div>
          <Image src={logos.white.src} alt="Sapion Magister" width={110} height={32} className="h-[38px] w-auto" />
          <p className="mt-5 max-w-[260px] text-[15px] leading-[1.6] text-white/70">
            Transformando o Brasil através da Nova Educação.
          </p>
        </div>
        <div>
          <p className={heading}>Trilhas</p>
          <ul className="mt-4 flex flex-col gap-3">
            {trilhas.map((trilha) => (
              <li key={trilha.slug}>
                <a href={trilha.href} className={link}>
                  {trilha.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className={heading}>Plataforma</p>
          <ul className="mt-4 flex flex-col gap-3">
            {platformLinks.map((item) => (
              <li key={item.label}>
                <a href={item.href} className={link}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className={heading}>Baixe o aplicativo</p>
          <StoreBadges className="mt-4 flex-wrap" imageClassName="h-[40px]" />
          <p className={`${heading} mt-8`}>Redes sociais</p>
          <ul className="mt-4 flex gap-3">
            {socials.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  aria-label={`${label} @sapion.magister`}
                  className="grid size-11 place-items-center rounded-full bg-white/10 text-white transition-colors duration-300 hover:bg-mg-mint hover:text-mg-ink"
                >
                  <Icon className="size-5" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-[1160px] px-5 py-6 text-[13px] text-white/55">
          © {new Date().getFullYear()} Sapion Magister. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
