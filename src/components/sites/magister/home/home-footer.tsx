import Image from "next/image";
import { cn } from "@/lib/utils";
import { trilhas } from "../content";
import { HOME, homeLinks, logos } from "./home-content";
import { InstagramIcon, StoreBadges, TikTokIcon, YouTubeIcon } from "./ui";

const columns = [
  {
    title: "Trilhas",
    links: trilhas.map((trilha) => ({ label: trilha.title, href: trilha.href })),
  },
  {
    title: "Conteúdo",
    links: [
      { label: "Blog", href: homeLinks.blog },
      { label: "Materiais gratuitos", href: homeLinks.materiais },
      { label: "Contato", href: homeLinks.contato },
      { label: "Governo", href: homeLinks.governo },
    ],
  },
  {
    title: "Plataforma",
    links: [
      { label: "Sou aluno", href: homeLinks.login },
      { label: "Teste por 14 dias grátis", href: homeLinks.signUp },
      { label: "Assine agora", href: homeLinks.subscribe },
    ],
  },
];

const socials = [
  { label: "Instagram", href: homeLinks.instagram, Icon: InstagramIcon },
  { label: "TikTok", href: homeLinks.tiktok, Icon: TikTokIcon },
  { label: "YouTube", href: homeLinks.youtube, Icon: YouTubeIcon },
];

/** Programs that support the company, shown in white like the reference footer (the seal keeps its colors). */
const supporters = [
  { name: "AWS EdStart", src: `${HOME}/apoio/aws-edstart.svg`, width: 101, height: 40, className: "h-[34px]", mono: true },
  { name: "Google for Education", src: `${HOME}/apoio/google-for-education.svg`, width: 824, height: 100, className: "h-[19px]", mono: true },
  { name: "Microsoft for Startups", src: `${HOME}/apoio/microsoft-for-startups.svg`, width: 86, height: 42, className: "h-[42px]", mono: true },
  { name: "Fundo Soberano do Espírito Santo – Startup investida", src: `${HOME}/apoio/fundo-soberano.webp`, width: 320, height: 320, className: "h-[58px]", mono: false },
];

const heading = "text-[15px] font-bold text-white";
const link = "text-[15px] text-white/70 transition-colors duration-300 hover:text-mg-mint";

export function HomeFooter() {
  return (
    <footer className="bg-mg-night text-white">
      <div className="mx-auto grid max-w-[1160px] gap-10 px-5 py-14 tablet:grid-cols-2 desktop:grid-cols-[1.3fr_1fr_1fr_1.1fr_1.3fr] desktop:py-16">
        <div>
          <Image src={logos.white.src} alt="Sapion Magister" width={110} height={32} className="h-[38px] w-auto" />
          <p className="mt-5 max-w-[240px] text-[15px] leading-[1.6] text-white/70">
            Transformando o Brasil através da Nova Educação.
          </p>
        </div>
        {columns.map((column) => (
          <div key={column.title}>
            <p className={heading}>{column.title}</p>
            <ul className="mt-4 flex flex-col gap-3">
              {column.links.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className={link}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
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
        <div className="mx-auto flex max-w-[1160px] flex-col gap-6 px-5 py-6 desktop:flex-row desktop:items-center desktop:justify-between">
          <p className="text-[13px] text-white/55">
            © {new Date().getFullYear()} Sapion Magister. Todos os direitos reservados.
          </p>
          <ul className="flex flex-wrap items-center gap-x-8 gap-y-5" aria-label="Apoiadores">
            {supporters.map((supporter) => (
              <li key={supporter.name}>
                <Image
                  src={supporter.src}
                  alt={supporter.name}
                  title={supporter.name}
                  width={supporter.width}
                  height={supporter.height}
                  className={cn(
                    "w-auto transition-opacity duration-300",
                    supporter.mono ? "opacity-70 brightness-0 invert hover:opacity-100" : "opacity-90 hover:opacity-100",
                    supporter.className,
                  )}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
