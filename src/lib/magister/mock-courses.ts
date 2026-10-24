import { links } from "@/components/sites/magister/content";
import type { Course } from "./courses";

// Fictitious placeholder courses (3 per track) until they come from the database.
export const mockCourses: Course[] = [
  { id: "inov-1", trilha: "trilha-inovacao", title: "Metodologias ativas na prática da sala de aula", url: links.signUp },
  { id: "inov-2", trilha: "trilha-inovacao", title: "Ferramentas digitais para engajar seus alunos", url: links.signUp },
  { id: "inov-3", trilha: "trilha-inovacao", title: "Aprendizagem baseada em projetos do zero", url: links.signUp },

  { id: "inf-1", trilha: "trilha-infancia", title: "O brincar como eixo da aprendizagem na Educação Infantil", url: links.signUp },
  { id: "inf-2", trilha: "trilha-infancia", title: "Alfabetização lúdica nos primeiros anos", url: links.signUp },
  { id: "inf-3", trilha: "trilha-infancia", title: "Desenvolvimento socioemocional na primeira infância", url: links.signUp },

  { id: "ski-1", trilha: "trilha-skills", title: "Comunicação assertiva para professores", url: links.signUp },
  { id: "ski-2", trilha: "trilha-skills", title: "Gestão do tempo e produtividade docente", url: links.signUp },
  { id: "ski-3", trilha: "trilha-skills", title: "Inteligência emocional em sala de aula", url: links.signUp },

  { id: "inc-1", trilha: "trilha-inclusao", title: "Práticas pedagógicas inclusivas no dia a dia", url: links.signUp },
  { id: "inc-2", trilha: "trilha-inclusao", title: "Adaptação curricular para estudantes com deficiência", url: links.signUp },
  { id: "inc-3", trilha: "trilha-inclusao", title: "Tecnologias assistivas na escola", url: links.signUp },

  { id: "ges-1", trilha: "trilha-gestao", title: "Liderança pedagógica para gestores escolares", url: links.signUp },
  { id: "ges-2", trilha: "trilha-gestao", title: "Planejamento estratégico da escola", url: links.signUp },
  { id: "ges-3", trilha: "trilha-gestao", title: "Indicadores educacionais e tomada de decisão", url: links.signUp },
];
