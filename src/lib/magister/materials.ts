import type { MagisPose } from "@/components/sites/magister/home/home-content";
import type { BlogCategorySlug } from "./blog";

export interface FreeMaterial {
  slug: string;
  /** Shown in brackets before the title, e.g. "[E-book] ...". */
  kind: "Catálogo" | "E-book" | "Guia" | "Planilha";
  title: string;
  description: string;
  date: string;
  /** Colors the cover like the matching blog category. */
  category: BlogCategorySlug;
  pose: MagisPose;
  /** "O que você vai encontrar" list on the landing page. */
  highlights: string[];
  /** File delivered after the form. Without one, the page says it goes out by e-mail. */
  fileUrl?: string;
}

// The catalog is the platform's real presentation PDF. The guide and the spreadsheet are
// placeholders for the template: replace them (and add the files) as materials are produced.
const materials: FreeMaterial[] = [
  {
    slug: "catalogo-de-cursos",
    kind: "Catálogo",
    title: "Apresentação institucional e catálogo de cursos",
    description:
      "Conheça as 5 trilhas, os 31 cursos e os 156 módulos da Sapion Magister, com os consultores e o conteúdo de cada curso.",
    date: "2026-10-24",
    category: "plataforma",
    pose: "ideia",
    highlights: [
      "As 5 trilhas de aprendizagem e os 31 cursos do catálogo, módulo a módulo;",
      "Videoaulas, e-books, atividades práticas e conteúdos extras de cada curso;",
      "Os 40 consultores especialistas que assinam os cursos;",
      "Magister Labs, Magister Club e a gamificação da plataforma.",
    ],
    fileUrl: "https://appmagister.com.br/catalogo",
  },
  {
    slug: "guia-magister-labs",
    kind: "Guia",
    title: "25 ferramentas de IA do Magister Labs para o dia a dia do professor",
    description:
      "Um guia prático para usar a inteligência artificial a favor da sua rotina: do plano de aula alinhado à BNCC à correção de provas.",
    date: "2026-10-10",
    category: "inovacao",
    pose: "magia",
    highlights: [
      "Como gerar planos de aula alinhados às habilidades da BNCC;",
      "Slides, quizzes e questões no modelo SAEB criados em minutos;",
      "Correção automática de provas escaneadas ou fotografadas;",
      "PEI e PDI com apoio da IA para a educação inclusiva.",
    ],
  },
  {
    slug: "planilha-formacao-continuada",
    kind: "Planilha",
    title: "Planejamento da formação continuada da rede",
    description:
      "Uma planilha para secretarias e gestores organizarem trilhas, metas e o acompanhamento da formação dos professores.",
    date: "2026-09-26",
    category: "gestao",
    pose: "oculos",
    highlights: [
      "Mapa de trilhas e cursos por etapa de ensino;",
      "Metas de participação e conclusão por escola;",
      "Acompanhamento mensal de engajamento dos cursistas;",
      "Modelo de relatório para apresentar os resultados à rede.",
    ],
  },
];

export async function getMaterials(): Promise<FreeMaterial[]> {
  return [...materials].sort((a, b) => b.date.localeCompare(a.date));
}

export async function getMaterial(slug: string): Promise<FreeMaterial | undefined> {
  return materials.find((material) => material.slug === slug);
}
