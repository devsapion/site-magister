export const ASSETS = "/sites/magister/images";

export const links = {
  home: "/",
  trilhas: "/#trilhas",
  assine: "#assine",
  governo: "https://magister.sapion.com.br/governo/",
  login: "https://appmagister.com.br/login",
  app: "https://appmagister.com.br/",
  signUp: "https://appmagister.com.br/login/sign_up",
  subscribe: "https://appmagister.com.br/add-to-cart-plan/3",
  appStore: "https://apps.apple.com/us/app/sapion-magister/id6739249496",
  googlePlay: "https://play.google.com/store/apps/details?id=com.converta.appmagister",
  video: "https://www.youtube-nocookie.com/embed/2HUE36-zVds?si=vOmxd8ygjwhISP9A&controls=0",
};

export type TrilhaSlug =
  | "trilha-inovacao"
  | "trilha-infancia"
  | "trilha-skills"
  | "trilha-inclusao"
  | "trilha-gestao";

/**
 * Single source for every learning track: the home cards and the /trilha-* pages both read
 * from here, so editing a title or description updates every place it appears.
 */
export interface Trilha {
  slug: TrilhaSlug;
  title: string;
  description: string;
  href: string;
}

export const trilhas: Trilha[] = [
  {
    title: "Inovação",
    description:
      "Acesse tudo sobre metodologias ativas de aprendizagem, ferramentas digitais e os segredos da Nova Educação",
    slug: "trilha-inovacao",
    href: "/trilha-inovacao",
  },
  {
    title: "Infância",
    description: "Aprenda tudo sobre o universo da criança em seus primeiros ciclos de aprendizagem",
    slug: "trilha-infancia",
    href: "/trilha-infancia",
  },
  {
    title: "Skills",
    description: "Desenvolva suas competências técnicas e emocionais para brilhar na Nova Educação",
    slug: "trilha-skills",
    href: "/trilha-skills",
  },
  {
    title: "Inclusão",
    description: "Torne-se um professor preparado para a educação especial e inclusiva",
    slug: "trilha-inclusao",
    href: "/trilha-inclusao",
  },
  {
    title: "Gestão",
    description:
      "Aprofunde suas habilidades e competências sobre liderança e gestão educacional. Prepare-se para o próximo nível!",
    slug: "trilha-gestao",
    href: "/trilha-gestao",
  },
];

export function getTrilha(slug: string): Trilha | undefined {
  return trilhas.find((trilha) => trilha.slug === slug);
}

export const subscriptionBenefits = [
  "Acesso imediato por um ano em todas as trilhas de aprendizagem;",
  "Certificado de conclusão em todos os cursos;",
  "Acesso ao Magister Labs;",
  "Acesso ao Magister Club;",
  "Dez cursos personalizados por ano.",
];

export const partners = [
  { src: `${ASSETS}/partners/partner-7.png`, alt: "Prefeitura de Colatina" },
  { src: `${ASSETS}/partners/partner-6.png`, alt: "Prefeitura de Alto Rio Novo" },
  { src: `${ASSETS}/partners/partner-5.png`, alt: "Prefeitura Municipal de São Roque do Canaã" },
  { src: `${ASSETS}/partners/partner-4.png`, alt: "Fundação Renova" },
  { src: `${ASSETS}/partners/partner-3.png`, alt: "Governo do Estado do Espírito Santo" },
  { src: `${ASSETS}/partners/partner-2.png`, alt: "Prefeitura de Pancas" },
  { src: `${ASSETS}/partners/partner-1.png`, alt: "Prefeitura Municipal de Barra de São Francisco" },
];

export const certificateLaws = [
  "Lei nº 9.394 - Diretrizes e Bases da Educação Nacional",
  "Artigo 205 e 206 - Constituição Federal",
  "Decreto Presidencial nº 5.154/2004",
  "Normas da Resolução CNE nº 04/99 – MEC (art. 7º § 3º)",
];
