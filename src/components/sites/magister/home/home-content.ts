import { links, testimonialRows, type TrilhaSlug } from "../content";

/** Assets of the redesigned home (app screenshots, mascot, consultants, new logo). */
export const HOME = "/sites/magister/home";

export const homeLinks = {
  ...links,
  resultados: "#resultados",
  diferenciais: "#diferenciais",
  especialistas: "#especialistas",
  instagram: "https://www.instagram.com/sapion.magister/",
  tiktok: "https://www.tiktok.com/@sapion.magister",
  youtube: "https://www.youtube.com/@sapion.magister",
};

export const navItems = [
  { label: "Trilhas", href: links.trilhas },
  { label: "Diferenciais", href: homeLinks.diferenciais },
  { label: "Resultados", href: homeLinks.resultados },
  { label: "Planos", href: links.assine },
  { label: "Governo", href: links.governo },
];

export const logos = {
  white: { src: `${HOME}/logo-white.svg`, width: 110, height: 32 },
  color: { src: `${HOME}/logo-color.svg`, width: 110, height: 32 },
  mark: { src: `${HOME}/logo-mark-white.svg`, width: 28, height: 28 },
};

/** App screenshots exported from the redesigned platform (920×2000). */
export const appScreens = {
  inicio: { src: `${HOME}/app/inicio.webp`, alt: "Tela inicial do app com nível, pontos e Magister Labs" },
  club: { src: `${HOME}/app/club-feed.webp`, alt: "Feed da comunidade Magister Club" },
  diagnostico: { src: `${HOME}/app/diagnostico.webp`, alt: "Diagnóstico do perfil por trilha" },
  videos: { src: `${HOME}/app/videos.webp`, alt: "Vídeos exclusivos: podcasts, videodicas e masterclasses" },
  aula: { src: `${HOME}/app/aula.webp`, alt: "Aula em vídeo da trilha Skills" },
  ranking: { src: `${HOME}/app/ranking.webp`, alt: "Ranking gamificado dos cursistas" },
};

/** Magis, the Sapion Magister mascot, in each pose. */
export const magis = {
  pensando: { src: `${HOME}/magis/pensando.png`, width: 1254, height: 1254 },
  selfie: { src: `${HOME}/magis/selfie.png`, width: 1254, height: 1254 },
  meditando: { src: `${HOME}/magis/meditando.png`, width: 1254, height: 1254 },
  lupa: { src: `${HOME}/magis/lupa.png`, width: 875, height: 989 },
  magia: { src: `${HOME}/magis/magia.png`, width: 1254, height: 1254 },
  espiando: { src: `${HOME}/magis/espiando.png`, width: 1254, height: 1006 },
  diva: { src: `${HOME}/magis/diva.png`, width: 1448, height: 1086 },
  piscando: { src: `${HOME}/magis/piscando.png`, width: 1230, height: 1278 },
  ideia: { src: `${HOME}/magis/ideia.png`, width: 1254, height: 1254 },
  oculos: { src: `${HOME}/magis/oculos.png`, width: 1254, height: 1254 },
  comemorando: { src: `${HOME}/magis/comemorando.png`, width: 869, height: 1100 },
};

export type MagisPose = keyof typeof magis;

/** Platform numbers from the institutional catalog (appmagister.com.br/catalogo). */
export const platformNumbers = [
  { value: "5", label: "trilhas de aprendizagem" },
  { value: "31", label: "cursos no catálogo" },
  { value: "156", label: "módulos" },
  { value: "613", label: "videoaulas" },
  { value: "40", label: "consultores especialistas" },
  { value: "25", label: "ferramentas de IA no Labs" },
];

export interface TrilhaVisual {
  icon: string;
  /** Badge gradient, same recipe as the platform catalog. */
  gradient: string;
  /** Title color. */
  color: string;
  /** Soft background for the stats chip. */
  tint: string;
  stats: string;
}

export const trilhaVisuals: Record<TrilhaSlug, TrilhaVisual> = {
  "trilha-inovacao": {
    icon: `${HOME}/trilhas/inovacao.svg`,
    gradient: "radial-gradient(85% 95% at 50% 42%, #ffa651 0%, #ff922b 55%, #e8590c 135%)",
    color: "#e8590c",
    tint: "#fff4e6",
    stats: "4 cursos · 20 módulos",
  },
  "trilha-infancia": {
    icon: `${HOME}/trilhas/infancia.svg`,
    gradient: "radial-gradient(85% 95% at 50% 42%, #f7cc4b 0%, #f5c123 55%, #f08c00 135%)",
    color: "#c08d00",
    tint: "#fff9db",
    stats: "5 cursos · 25 módulos",
  },
  "trilha-skills": {
    icon: `${HOME}/trilhas/skills.svg`,
    gradient: "radial-gradient(85% 95% at 50% 42%, #48d3aa 0%, #20c997 55%, #099268 135%)",
    color: "#099268",
    tint: "#e6fcf5",
    stats: "8 cursos · 41 módulos",
  },
  "trilha-inclusao": {
    icon: `${HOME}/trilhas/inclusao.svg`,
    gradient: "radial-gradient(85% 95% at 50% 42%, #58acf3 0%, #339af0 55%, #1971c2 135%)",
    color: "#1971c2",
    tint: "#e7f5ff",
    stats: "9 cursos · 45 módulos",
  },
  "trilha-gestao": {
    icon: `${HOME}/trilhas/gestao.svg`,
    gradient: "radial-gradient(85% 95% at 50% 42%, #b3b3b3 0%, #a1a1a1 55%, #737373 135%)",
    color: "#4d4d4d",
    tint: "#f1f3f5",
    stats: "5 cursos · 25 módulos",
  },
};

/** How courses are made (the old flip cards) plus certification, illustrated by Magis. */
export const pillars: { title: string; text: string; pose: MagisPose }[] = [
  {
    title: "Problema x Solução",
    text: "Cada curso nasce de uma dor real da educação. Nos debruçamos sobre ela e desenvolvemos a solução.",
    pose: "lupa",
  },
  {
    title: "Professores especialistas",
    text: "Consultores, professores, pesquisadores, criativos, palestrantes, mágicos, pensadores e empreendedores.",
    pose: "pensando",
  },
  {
    title: "Inovação e Educação",
    text: "Soluções concebidas a partir da premissa da Nova Educação e da transformação digital.",
    pose: "magia",
  },
  {
    title: "Certificação",
    text: "Certificado de conclusão em todos os cursos, válido em todo o território nacional.",
    pose: "comemorando",
  },
];

export interface Consultant {
  name: string;
  title: string;
  photo: string;
}

const consultant = (slug: string, name: string, title: string): Consultant => ({
  name,
  title,
  photo: `${HOME}/consultores/${slug}.webp`,
});

/** A selection of the 40 consultants listed in the platform catalog. */
export const consultants: Consultant[] = [
  consultant("israel-boniek", "Israel Boniek", "Doutor em Educação"),
  consultant("michelle-jordao", "Michelle Jordão", "Pós-doutoranda e doutora em Educação"),
  consultant("thiago-gusmao", "Thiago Gusmão", "Neurologista da infância e adolescência"),
  consultant("douglas-farias", "Douglas Farias", "Secretário de Educação de Coreaú (CE)"),
  consultant("vanessa-martins", "Vanessa Martins", "Mestra em Linguística"),
  consultant("gustavo-arns", "Gustavo Arns", "Mestre em Estudos da Felicidade"),
  consultant("flavia-regiane", "Flávia Regiane", "Psicóloga e Analista do Comportamento"),
  consultant("jose-motta", "José Motta", "Mestre em Tecnologias Emergentes na Educação"),
  consultant("marta-alves", "Marta Alves da Cruz", "Doutora e Mestra em Educação"),
  consultant("debora-resende", "Débora Resende Maranhão", "Especialista em Estatísticas Educacionais"),
  consultant("william-borghetti", "William Borghetti", "Especialista em Neurocomunicação"),
  consultant("rosemari-probst", "Rosemari Probst", "Mestre em Educação"),
  consultant("adriana-sperandio", "Adriana Sperandio", "Mestre em Educação"),
  consultant("rayner-raulino", "Rayner Raulino", "Doutor e Mestre em Educação (UFES)"),
  consultant("professor-ph", "Professor PH", "Mestre em Educação Tecnológica"),
  consultant("analice-torezani", "Analice Torezani", "Mestre em Matemática (UFES)"),
];

export type Audience = "professores" | "gestores" | "redes";

export interface Diferencial {
  id: string;
  audience: Audience;
  audienceLabel: string;
  tag: string;
  title: string;
  text: string;
  /** Extra facts shown as chips under the text. */
  chips?: string[];
  visual:
    | { kind: "phone"; screen: keyof typeof appScreens; tint: string }
    | { kind: "labs"; tint: string }
    | { kind: "certificate"; tint: string };
  cta: { label: string; href: string };
}

export const diferenciais: Diferencial[] = [
  {
    id: "adaptive-learning",
    audience: "professores",
    audienceLabel: "Para professores",
    tag: "Adaptive Learning",
    title: "Aprenda no seu ritmo, do seu jeito",
    text: "Personalizamos a experiência de aprendizagem, adaptando o ensino às suas necessidades individuais com algoritmos avançados e inteligência artificial.",
    chips: ["Aulas em vídeo", "E-books", "Atividades práticas", "100% online"],
    visual: { kind: "phone", screen: "aula", tint: "#e6fcf5" },
    cta: { label: "Começar agora", href: links.signUp },
  },
  {
    id: "analise-de-perfil",
    audience: "professores",
    audienceLabel: "Para professores",
    tag: "Análise de perfil com IA",
    title: "Descubra suas forças e gargalos",
    text: "Nossa inteligência artificial avalia seu perfil a partir de objetivos, interesses e lacunas de conhecimento e cria cursos exclusivos, personalizados instantaneamente.",
    visual: { kind: "phone", screen: "diagnostico", tint: "#fff4e6" },
    cta: { label: "Fazer meu diagnóstico", href: links.signUp },
  },
  {
    id: "magister-labs",
    audience: "professores",
    audienceLabel: "Para professores",
    tag: "Magister Labs",
    title: "Inteligência artificial a favor do professor",
    text: "25 ferramentas de IA para o dia a dia: da criação automática de planos de aula alinhados à BNCC à elaboração de listas de exercícios personalizadas.",
    visual: { kind: "labs", tint: "#e6fcf5" },
    cta: { label: "Conhecer o Labs", href: links.signUp },
  },
  {
    id: "gamificacao",
    audience: "professores",
    audienceLabel: "Para professores",
    tag: "Gamificação",
    title: "Aprender vira jogo",
    text: "Ao estudar e participar da comunidade, o cursista acumula pontos, sobe de nível, coleciona medalhas e disputa o ranking.",
    chips: ["14 níveis", "+15 medalhas", "Ranking da rede"],
    visual: { kind: "phone", screen: "ranking", tint: "#f3edff" },
    cta: { label: "Quero jogar", href: links.signUp },
  },
  {
    id: "magister-club",
    audience: "gestores",
    audienceLabel: "Para professores e gestores",
    tag: "Magister Club",
    title: "Uma comunidade que inspira",
    text: "Feed, stories, fóruns por trilha, mensagens e curadoria diária de notícias da educação. Troca de experiências e suporte para aprimorar as práticas educacionais.",
    chips: ["25 masterclasses", "30 episódios do SapionCast", "70 videodicas"],
    visual: { kind: "phone", screen: "club", tint: "#fff4e6" },
    cta: { label: "Entrar no Club", href: links.signUp },
  },
  {
    id: "certificado",
    audience: "redes",
    audienceLabel: "Para professores e redes de ensino",
    tag: "Certificação",
    title: "Certificado válido em todo o território nacional",
    text: "Os certificados emitidos pela Sapion Magister se enquadram na categoria de cursos livres e estão de acordo com as principais leis vigentes.",
    chips: [
      "Lei nº 9.394 – LDB",
      "Artigos 205 e 206 – Constituição Federal",
      "Decreto nº 5.154/2004",
      "Resolução CNE nº 04/99 – MEC",
    ],
    visual: { kind: "certificate", tint: "#f3edff" },
    cta: { label: "Teste por 14 dias grátis", href: links.signUp },
  },
];

export const labsTools = [
  { name: "Plano de aula BNCC", icon: `${HOME}/labs/lesson-plan-generator.svg` },
  { name: "Gerador de slides", icon: `${HOME}/labs/slide-generator.svg` },
  { name: "Correção de prova", icon: `${HOME}/labs/exam-correction.svg` },
  { name: "Questões modelo SAEB", icon: `${HOME}/labs/regular-question-generator.svg` },
  { name: "PEI/PDI", icon: `${HOME}/labs/pei-pdi.svg` },
];

/**
 * Impact in the partner networks. Placeholder wording kept from the previous site
 * ("milhares", "dezenas", "+2.000h"): replace with the measured municipal numbers.
 */
export const impactStats = [
  {
    value: "Milhares",
    text: "de professores cursistas em formação continuada nas redes parceiras.",
    icon: "users",
  },
  {
    value: "Dezenas",
    text: "de municípios transformando a formação dos seus professores com a Sapion Magister.",
    icon: "building",
  },
  {
    value: "+2.000h",
    text: "de conteúdo em videoaulas, e-books, atividades práticas e masterclasses.",
    icon: "clock",
  },
] as const;

const allTestimonials = testimonialRows.flat();

/** Featured in the rotating card next to the impact numbers. */
export const featuredTestimonials = [
  allTestimonials[7],
  allTestimonials[3],
  allTestimonials[6],
  allTestimonials[2],
  allTestimonials[1],
  allTestimonials[8],
];

/** Shown as cards under "Quem usa aprova!". */
export const gridTestimonials = [allTestimonials[0], allTestimonials[4], allTestimonials[5]];
