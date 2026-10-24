import type { TrilhaSlug } from "@/components/sites/magister/content";
import { mockCourses } from "./mock-courses";

export interface Course {
  id: string;
  trilha: TrilhaSlug;
  title: string;
  /** Destination of the "Mais detalhes" button. */
  url: string;
  /** Card artwork (3:2). Cards without an image show the track's placeholder art. */
  image?: string;
}

/**
 * Courses listed on a track page. Reads the placeholder list for now; swap the body for the
 * database query when it is available — callers already await it.
 */
export async function getCoursesByTrilha(trilha: TrilhaSlug): Promise<Course[]> {
  return mockCourses.filter((course) => course.trilha === trilha);
}
