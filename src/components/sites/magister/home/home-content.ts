import { links, trilhas, type TrilhaSlug } from "../content";

/** Assets of the redesigned home (app screenshots, mascot, consultants, new logo). */
export const HOME = "/sites/magister/home";

export const homeLinks = {
  ...links,
  // Absolute so the header links also work from the blog pages.
  // The municipal-impact section of the home, the pitch for public networks.
  governo: "/#governo",
  diferenciais: "/#diferenciais",
  especialistas: "/#especialistas",
  planos: "/#assine",
  blog: "/blog",
  materiais: "/materiais-gratuitos",
  contato: "/contato",
  // Legal pages: routes reserved for when the content is ready (not built yet).
  privacidade: "/politica-de-privacidade",
  termos: "/termos-de-uso",
  lgpd: "/lgpd",
  anticorrupcao: "/codigo-de-conduta-anticorrupcao",
  instagram: "https://www.instagram.com/sapion.magister/",
  tiktok: "https://www.tiktok.com/@sapion.magister",
  youtube: "https://www.youtube.com/@sapion.magister",
};

export interface HeaderLink {
  label: string;
  href: string;
  /** Rendered as a dropdown on desktop and as chips in the mobile menu. */
  children?: { label: string; href: string; description?: string }[];
}

export const navItems: HeaderLink[] = [
  {
    label: "Trilhas",
    href: links.trilhas,
    children: trilhas.map((trilha) => ({ label: trilha.title, href: trilha.href, description: trilha.description })),
  },
  { label: "Diferenciais", href: homeLinks.diferenciais },
  { label: "Planos", href: homeLinks.planos },
  { label: "Blog", href: homeLinks.blog },
  { label: "Governo", href: homeLinks.governo },
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

/** Platform numbers that are not counted from the course catalog (see `getCatalogTotals`). */
export const platformNumbers = [
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
  /** Text over the track gradient: white, or ink where white would not read (yellow). */
  onGradient: "light" | "dark";
  /** Magis pose on the track page. */
  pose: MagisPose;
}

export const trilhaVisuals: Record<TrilhaSlug, TrilhaVisual> = {
  "trilha-inovacao": {
    icon: `${HOME}/trilhas/inovacao.svg`,
    gradient: "radial-gradient(85% 95% at 50% 42%, #ffa651 0%, #ff922b 55%, #e8590c 135%)",
    color: "#e8590c",
    tint: "#fff4e6",
    onGradient: "light",
    pose: "ideia",
  },
  "trilha-infancia": {
    icon: `${HOME}/trilhas/infancia.svg`,
    gradient: "radial-gradient(85% 95% at 50% 42%, #f7cc4b 0%, #f5c123 55%, #f08c00 135%)",
    color: "#c08d00",
    tint: "#fff9db",
    onGradient: "dark",
    pose: "piscando",
  },
  "trilha-skills": {
    icon: `${HOME}/trilhas/skills.svg`,
    gradient: "radial-gradient(85% 95% at 50% 42%, #48d3aa 0%, #20c997 55%, #099268 135%)",
    color: "#099268",
    tint: "#e6fcf5",
    onGradient: "light",
    pose: "meditando",
  },
  "trilha-inclusao": {
    icon: `${HOME}/trilhas/inclusao.svg`,
    gradient: "radial-gradient(85% 95% at 50% 42%, #58acf3 0%, #339af0 55%, #1971c2 135%)",
    color: "#1971c2",
    tint: "#e7f5ff",
    onGradient: "light",
    pose: "magia",
  },
  "trilha-gestao": {
    icon: `${HOME}/trilhas/gestao.svg`,
    gradient: "radial-gradient(85% 95% at 50% 42%, #b3b3b3 0%, #a1a1a1 55%, #737373 135%)",
    color: "#4d4d4d",
    tint: "#f1f3f5",
    onGradient: "light",
    pose: "oculos",
  },
};

export interface Pillar {
  title: string;
  text: string;
  icon: "target" | "experts" | "idea" | "award";
  /** Icon tile gradient, one track color per step. */
  gradient: string;
}

/** How courses are made (the old flip cards) plus certification, as numbered steps. */
export const pillars: Pillar[] = [
  {
    title: "Problema x Solução",
    text: "Cada curso nasce de uma dor real da educação. Nos debruçamos sobre ela e desenvolvemos a solução.",
    icon: "target",
    gradient: "linear-gradient(140deg,#ffa651,#e8590c)",
  },
  {
    title: "Professores especialistas",
    text: "Consultores, professores, pesquisadores, criativos, palestrantes, mágicos, pensadores e empreendedores.",
    icon: "experts",
    gradient: "linear-gradient(140deg,#b07cff,#7a35e6)",
  },
  {
    title: "Inovação e Educação",
    text: "Soluções concebidas a partir da premissa da Nova Educação e da transformação digital.",
    icon: "idea",
    gradient: "linear-gradient(140deg,#48d3aa,#099268)",
  },
  {
    title: "Certificação",
    text: "Certificado de conclusão em todos os cursos, válido em todo o território nacional.",
    icon: "award",
    gradient: "linear-gradient(140deg,#58acf3,#1971c2)",
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
  },
  {
    id: "analise-de-perfil",
    audience: "professores",
    audienceLabel: "Para professores",
    tag: "Análise de perfil com IA",
    title: "Descubra suas forças e gargalos",
    text: "Nossa inteligência artificial avalia seu perfil a partir de objetivos, interesses e lacunas de conhecimento e cria cursos exclusivos, personalizados instantaneamente.",
    visual: { kind: "phone", screen: "diagnostico", tint: "#fff4e6" },
  },
  {
    id: "magister-labs",
    audience: "professores",
    audienceLabel: "Para professores",
    tag: "Magister Labs",
    title: "Inteligência artificial a favor do professor",
    text: "25 ferramentas de IA para o dia a dia: da criação automática de planos de aula alinhados à BNCC à elaboração de listas de exercícios personalizadas.",
    visual: { kind: "labs", tint: "#e6fcf5" },
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
  },
];

export const labsTools = [
  { name: "Plano de aula BNCC", icon: `${HOME}/labs/lesson-plan-generator.svg` },
  { name: "Gerador de slides", icon: `${HOME}/labs/slide-generator.svg` },
  { name: "Correção de prova", icon: `${HOME}/labs/exam-correction.svg` },
  { name: "Questões modelo SAEB", icon: `${HOME}/labs/regular-question-generator.svg` },
  { name: "PEI/PDI", icon: `${HOME}/labs/pei-pdi.svg` },
];

/** Big numbers of the partner networks; `count` animates from zero when it scrolls into view. */
export const impactNumbers = {
  hours: {
    count: 15,
    label: "horas de formação",
    text: "Formação continuada certificada, concluída pelos professores das redes parceiras.",
  },
  interactions: {
    count: 100,
    label: "interações na plataforma",
    text: "Aulas assistidas, atividades entregues, fóruns e conversas no Magister Club.",
  },
  aiContents: {
    count: 30,
    label: "conteúdos gerados com a nossa IA",
    text: "Planos de aula, slides, avaliações e atividades criados no Magister Labs.",
  },
};

/** Reach of the platform, kept as words like on the previous site. */
export const reachStats = [
  {
    value: "Dezenas",
    label: "de municípios e órgãos públicos",
    text: "Secretarias de educação que escolheram a Sapion Magister para formar seus professores.",
    icon: "building",
  },
  {
    value: "Milhares",
    label: "de professores em formação",
    text: "Professores, coordenadores e gestores estudando nas trilhas da plataforma.",
    icon: "users",
  },
] as const;

export interface NetworkReason {
  /** Shown along the collapsed panel. */
  short: string;
  tag: string;
  title: string;
  text: string;
  gradient: string;
  screen: keyof typeof appScreens;
  pose: MagisPose;
}

/** "Porque você deveria levar a Sapion Magister para a sua rede?", from the previous /governo page. */
export const networkReasons: NetworkReason[] = [
  {
    short: "Qualidade do ensino",
    tag: "IDEB e aprendizagem",
    gradient: "radial-gradient(90% 120% at 0% 100%, #3d0b8a 0%, rgba(61,11,138,0) 60%), linear-gradient(120deg, #8443ea 0%, #9b5cf6 50%, #b07cff 100%)",
    screen: "aula",
    pose: "ideia",
    title: "Impacto direto na qualidade do ensino",
    text: "A Sapion Magister oferece formação prática e personalizada que reflete diretamente na sala de aula. Com professores mais capacitados, sua rede eleva os índices educacionais, como o IDEB, e promove uma aprendizagem mais significativa para os alunos.",
  },
  {
    short: "Soluções personalizadas",
    tag: "IA e gamificação",
    gradient: "radial-gradient(90% 120% at 0% 100%, #05523b 0%, rgba(5,82,59,0) 60%), linear-gradient(120deg, #099268 0%, #20c997 60%, #48d3aa 100%)",
    screen: "diagnostico",
    pose: "magia",
    title: "Soluções inovadoras e personalizadas",
    text: "Nossa plataforma combina inteligência artificial, gamificação e metodologias inovadoras para atender às demandas da sua rede de forma personalizada, potencializando o desenvolvimento contínuo dos educadores.",
  },
  {
    short: "Suporte completo",
    tag: "Club, Labs e Análise de Perfil",
    gradient: "radial-gradient(90% 120% at 0% 100%, #8a2c05 0%, rgba(138,44,5,0) 60%), linear-gradient(120deg, #e8590c 0%, #ff922b 60%, #ffa651 100%)",
    screen: "club",
    pose: "oculos",
    title: "Suporte completo para gestores e professores",
    text: "Além das formações, oferecemos ferramentas como o Magister Club, Magister Labs e a Análise de Perfil, que auxiliam na gestão pedagógica, incentivam a criatividade e proporcionam um ambiente colaborativo.",
  },
];

export interface VideoTestimonial {
  /** YouTube video id: the `v=` part of a watch link. */
  youtubeId: string;
  title: string;
  /** Who speaks, or the partner network. */
  subtitle: string;
}

/** Recorded testimonials in the video carousel. Five copies of one case while the others are recorded. */
export const videoTestimonials: VideoTestimonial[] = Array.from({ length: 5 }, () => ({
  youtubeId: "Srq-Oflp1wE",
  title: "Case de sucesso",
  subtitle: "São Roque do Canaã (ES)",
}));
