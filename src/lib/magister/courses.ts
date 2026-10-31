import type { TrilhaSlug } from "@/components/sites/magister/content";
import catalog from "./catalog.json";

export interface CourseConsultant {
  name: string;
  title: string;
  photo: string;
}

/** Content counts shown on the course and in its "Grade e professores" dialog. */
export interface CourseStats {
  videos: number;
  ebooks: number;
  activities: number;
  extras: number;
}

export interface Course {
  id: string;
  trilha: TrilhaSlug;
  title: string;
  description: string;
  /** 16:9 artwork from the platform, or null when the course has none yet. */
  image: string | null;
  /** Module titles in study order. */
  modules: string[];
  stats: CourseStats;
  consultants: CourseConsultant[];
}

const consultants: Record<string, CourseConsultant> = catalog.consultants;

/**
 * Snapshot of https://appmagister.com.br/catalogo, refreshed with
 * `python3 -I scripts/sync_catalog.py`.
 */
const courses: Course[] = catalog.courses.map((course) => ({
  ...course,
  trilha: course.trilha as TrilhaSlug,
  consultants: course.consultants.map((slug) => consultants[slug]),
}));

/** Courses of a track, in the platform's order. Async so it can become a database query. */
export async function getCoursesByTrilha(trilha: TrilhaSlug): Promise<Course[]> {
  return courses.filter((course) => course.trilha === trilha);
}

export interface CatalogTotals extends Omit<CourseStats, "extras"> {
  courses: number;
  modules: number;
  consultants: number;
}

function totalsOf(list: Course[]): CatalogTotals {
  return {
    courses: list.length,
    modules: list.reduce((sum, course) => sum + course.modules.length, 0),
    videos: list.reduce((sum, course) => sum + course.stats.videos, 0),
    ebooks: list.reduce((sum, course) => sum + course.stats.ebooks, 0),
    activities: list.reduce((sum, course) => sum + course.stats.activities, 0),
    consultants: new Set(list.flatMap((course) => course.consultants.map((person) => person.name))).size,
  };
}

/** Counts of the whole catalog (home ribbon) or of one track (track cards and pages). */
export function getCatalogTotals(trilha?: TrilhaSlug): CatalogTotals {
  return totalsOf(trilha ? courses.filter((course) => course.trilha === trilha) : courses);
}
