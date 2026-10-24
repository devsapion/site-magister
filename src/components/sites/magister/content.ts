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
 * from here, so editing a title, description or icon updates every place it appears.
 */
export interface Trilha {
  slug: TrilhaSlug;
  title: string;
  description: string;
  href: string;
  /** Card color on the home page. */
  color: string;
  /** Background color at the top of the track page. */
  pageColor: string;
  icon: { src: string; width: number; height: number };
  certificate: string;
  delay: number;
}

export const trilhas: Trilha[] = [
  {
    title: "Inovação",
    description:
      "Acesse tudo sobre metodologias ativas de aprendizagem, ferramentas digitais e os segredos da Nova Educação",
    slug: "trilha-inovacao",
    href: "/trilha-inovacao",
    color: "#f79634",
    pageColor: "#fea244",
    icon: { src: `${ASSETS}/trilha-inovacao.png`, width: 63, height: 91 },
    certificate: `${ASSETS}/certificados/inovacao.png`,
    delay: 0,
  },
  {
    title: "Infância",
    description: "Aprenda tudo sobre o universo da criança em seus primeiros ciclos de aprendizagem",
    slug: "trilha-infancia",
    href: "/trilha-infancia",
    color: "#ffed00",
    pageColor: "#ffed00",
    icon: { src: `${ASSETS}/trilha-infancia.png`, width: 73, height: 76 },
    certificate: `${ASSETS}/certificados/infancia.png`,
    delay: 200,
  },
  {
    title: "Skills",
    description: "Desenvolva suas competências técnicas e emocionais para brilhar na Nova Educação",
    slug: "trilha-skills",
    href: "/trilha-skills",
    color: "#6ff782",
    pageColor: "#6ff782",
    icon: { src: `${ASSETS}/trilha-skills.png`, width: 73, height: 82 },
    certificate: `${ASSETS}/certificados/skills.png`,
    delay: 300,
  },
  {
    title: "Inclusão",
    description: "Torne-se um professor preparado para a educação especial e inclusiva",
    slug: "trilha-inclusao",
    href: "/trilha-inclusao",
    color: "#36c0ec",
    pageColor: "#37bfeb",
    icon: { src: `${ASSETS}/trilha-inclusao.png`, width: 80, height: 86 },
    certificate: `${ASSETS}/certificados/inclusao.png`,
    delay: 400,
  },
  {
    title: "Gestão",
    description:
      "Aprofunde suas habilidades e competências sobre liderança e gestão educacional. Prepare-se para o próximo nível!",
    slug: "trilha-gestao",
    href: "/trilha-gestao",
    color: "#c4c4c4",
    pageColor: "#c4c4c4",
    icon: { src: `${ASSETS}/trilha-gestao.png`, width: 101, height: 69 },
    certificate: `${ASSETS}/certificados/gestao.png`,
    delay: 500,
  },
];

export function getTrilha(slug: string): Trilha | undefined {
  return trilhas.find((trilha) => trilha.slug === slug);
}

/** Highlights shown under the course list on every track page. */
export const trilhaHighlights = {
  workload: "200h",
  items: [
    { label: ["Aulas", "em vídeos"], icon: { src: `${ASSETS}/trilha/chip-videos.png`, width: 64, height: 73 } },
    { label: ["E-books"], icon: { src: `${ASSETS}/trilha/chip-ebooks.png`, width: 45, height: 62 } },
    { label: ["Cursos", "100% online"], icon: { src: `${ASSETS}/trilha/chip-online.png`, width: 63, height: 65 } },
    { label: ["Atividades", "Práticas"], icon: { src: `${ASSETS}/trilha/chip-atividades.png`, width: 64, height: 66 } },
  ],
};

export type Animation = "fadeIn" | "fadeInLeft" | "fadeInRight" | "fadeInDown";

export interface Feature {
  title: string;
  icon: { src: string; width: number; height: number; mobileWidth: string };
  animation: Animation;
  paddingClassName: string;
  /** Desktop placement in the staggered arch. */
  desktopClassName: string;
}

export const features: Feature[] = [
  {
    title: "Adaptive Learning",
    icon: { src: `${ASSETS}/feature-adaptive-learning.png`, width: 99, height: 53, mobileWidth: "50%" },
    animation: "fadeInLeft",
    paddingClassName: "py-[40px]",
    desktopClassName: "mt-[129px] self-end",
  },
  {
    title: "Gamificação",
    icon: { src: `${ASSETS}/feature-gamificacao.png`, width: 70, height: 74, mobileWidth: "36%" },
    animation: "fadeInLeft",
    paddingClassName: "py-[40px]",
    desktopClassName: "self-center",
  },
  {
    title: "Análise de Perfil",
    icon: { src: `${ASSETS}/feature-analise-perfil.png`, width: 88, height: 68, mobileWidth: "46%" },
    animation: "fadeInDown",
    paddingClassName: "py-[30px]",
    desktopClassName: "self-start",
  },
  {
    title: "Magister Club",
    icon: { src: `${ASSETS}/feature-magister-club.png`, width: 77, height: 67, mobileWidth: "40%" },
    animation: "fadeInRight",
    paddingClassName: "py-[30px]",
    desktopClassName: "self-center",
  },
  {
    title: "Magister Labs",
    icon: { src: `${ASSETS}/feature-magister-labs.png`, width: 48, height: 78, mobileWidth: "26%" },
    animation: "fadeInRight",
    paddingClassName: "py-[30px]",
    desktopClassName: "mt-[130px] self-end",
  },
];

export interface FlipCard {
  title: string;
  text: string;
  frontColor: string;
}

export const flipCards: FlipCard[] = [
  {
    title: "Problema x Solução",
    text: "Nossos produtos são criados para resolver um problema real da educação. Debruçamo-nos sobre a “dor” e desenvolvemos uma solução.",
    frontColor: "#8341e9",
  },
  {
    title: "Professores Especialistas",
    text: "Nossas cursos são desenvolvidos por consultores, professores, pesquisadores, criativos, palestrantes, mágicos, pensadores, empreendedores e muito mais.",
    frontColor: "#202266",
  },
  {
    title: "Inovação e Educação",
    text: "Nossas soluções são concebidas a partir da premissa da Nova Educação, a qual resulta da influência da transformação digital em todos os aspectos de nossas vidas.",
    frontColor: "#8341e9",
  },
];

export const subscriptionBenefits = [
  "Acesso imediato por um ano em todas as trilhas de aprendizagem;",
  "Certificado de conclusão em todos os cursos;",
  "Acesso ao Magister Labs;",
  "Acesso ao Magister Club;",
  "Dez cursos personalizados por ano.",
];

export interface Testimonial {
  text: string;
  name: string;
}

export const testimonialRows: Testimonial[][] = [
  [
    {
      text: "Linguagem de fácil compreensão. Ótimas reflexões que intensificam o nosso aprendizado",
      name: "Patrícia de Souza Oliveira",
    },
    { text: "Quanta informação, aula muito enriquecedora para a minha prática pedagógica", name: "Regina Scardua" },
    {
      text: "Linguagem clara e objetiva, o vídeo traduz tudo o que a família passa ao receber o diagnóstico de um filho",
      name: "Regina Scardua",
    },
  ],
  [
    {
      text: "Todo conteúdo passado está sendo muito valioso, pois as especificidades nos fazem buscar cada vez mais o conhecimento",
      name: "Josilânia Maria Lemke Buss",
    },
    { text: "Uma linguagem de fácil entendimento! Muito bom o curso!", name: "Marysabel Canal Paranhos" },
    {
      text: "Estou gostando muito dos cursos da Magister! Uma linguagem clara e objetiva!",
      name: "Larissa Da Silva Paula Barcelos",
    },
  ],
  [
    {
      text: "Adorei o módulo que acabei de estudar, a sugestão de atividade prática e todos os conhecimentos agora adquiridos serão rotineiros",
      name: "Josiane Machado",
    },
    {
      text: "Excelente aula. Muito explicativa, de forma clara e um conteúdo maravilhoso. É preciso muito estudo! Estamos realmente despreparados para nossa rotina escolar com o TEA",
      name: "Josiane Machado",
    },
    {
      text: "Ótimo curso, um excelente complemento curricular para a nossa prática pedagógica diária!",
      name: "Luana Guasti",
    },
  ],
];

// Names and titles are part of each photo, as on the source page.
export const team = [
  { src: `${ASSETS}/team/vanessa.png`, alt: "Vanessa Martins, Mestre em Linguística" },
  { src: `${ASSETS}/team/jose.png`, alt: "José Motta, Mestre em Tecnologias Emergentes na Educação" },
  { src: `${ASSETS}/team/israel.png`, alt: "Israel Boniek, Doutor em Educação" },
  { src: `${ASSETS}/team/giselle.png`, alt: "Giselle Frufrek, Mestre em Educação" },
  {
    src: `${ASSETS}/team/flavia.png`,
    alt: "Flávia Rejane C. e Silva, Especialista em Análise do Comportamento Aplicada",
  },
  { src: `${ASSETS}/team/adriana.png`, alt: "Adriana Sperandio, Mestre em Educação" },
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
