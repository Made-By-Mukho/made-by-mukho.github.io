import { Project } from "./Project";
import { Experience } from "./Experience";
import { Academic } from "./Academic";
import { Education } from "./Education";

export type ReleaseGrade = "Full Album" | "EP" | "Single";

export interface DiscographyProject extends Project {
  releaseNumber: number;
  trackNumber: string;
  catalogId: string;
  releaseYear: number;
  releaseGrade: ReleaseGrade;
  isTitle?: boolean;
  isHot?: boolean;
}

export interface DiscographyYearGroup {
  year: number;
  releases: DiscographyProject[];
}

export interface DiscographyExperience extends Experience {
  labelCode: string;
  isCurrent: boolean;
}

export interface DiscographyAcademic extends Academic {
  honorTag: string;
}

export interface DiscographyEducation extends Education {
  sessionCode: string;
}
