import { projects } from "./Projects";
import { experiences } from "./Experiences";
import { academics } from "./Academics";
import { educations } from "./Educations";
import { Project } from "../interfaces/Project";
import {
  DiscographyProject,
  DiscographyYearGroup,
  DiscographyExperience,
  DiscographyAcademic,
  DiscographyEducation,
  ReleaseGrade,
} from "../interfaces/Discography";

export const formatTwoDigits = (num: number): string =>
  num < 10 ? `0${num}` : `${num}`;

export const RELEASE_GRADE_COLORS: Record<ReleaseGrade, string> = {
  "Full Album": "#8A7E80",
  EP: "#FF890A",
  Single: "#9370DB",
};

interface ReleaseMetadataSpec {
  baseProjectId: number;
  releaseYear: number;
  releaseGrade: ReleaseGrade;
  isTitle?: boolean;
  isHot?: boolean;
}

/**
 * Curated discography specs extending base items from src/data/Projects.ts.
 * Title and description are inherited directly from Projects.ts.
 */
const DISCOGRAPHY_RELEASE_SPECS: ReleaseMetadataSpec[] = [
  {
    baseProjectId: 1,
    releaseYear: 2020,
    releaseGrade: "Single",
    isTitle: true,
  },
  {
    baseProjectId: 2,
    releaseYear: 2022,
    releaseGrade: "EP",
  },
  {
    baseProjectId: 3,
    releaseYear: 2023,
    releaseGrade: "EP",
  },
  {
    baseProjectId: 7,
    releaseYear: 2024,
    releaseGrade: "Single",
  },
  {
    baseProjectId: 8,
    releaseYear: 2024,
    releaseGrade: "Single",
  },
  {
    baseProjectId: 13,
    releaseYear: 2025,
    releaseGrade: "Single",
  },
  {
    baseProjectId: 9,
    releaseYear: 2025,
    releaseGrade: "EP",
    isTitle: true,
  },
  {
    baseProjectId: 11,
    releaseYear: 2025,
    releaseGrade: "Full Album",
    isHot: true,
  },
  {
    baseProjectId: 10,
    releaseYear: 2025,
    releaseGrade: "Full Album",
    isTitle: true,
    isHot: true,
  },
  {
    baseProjectId: 17,
    releaseYear: 2026,
    releaseGrade: "EP",
  },
  {
    baseProjectId: 16,
    releaseYear: 2026,
    releaseGrade: "Full Album",
    isTitle: true,
    isHot: true,
  },
];

const baseProjectMap = new Map<number, Project>(
  projects.map((project) => [project.id, project]),
);

export const compareDiscographyLatestFirst = (
  a: Pick<DiscographyProject, "releaseYear" | "id">,
  b: Pick<DiscographyProject, "releaseYear" | "id">,
): number => {
  if (b.releaseYear !== a.releaseYear) {
    return b.releaseYear - a.releaseYear;
  }
  return b.id - a.id;
};

const chronologicalSpecs = [...DISCOGRAPHY_RELEASE_SPECS].sort((a, b) => {
  if (a.releaseYear !== b.releaseYear) {
    return a.releaseYear - b.releaseYear;
  }
  return a.baseProjectId - b.baseProjectId;
});

export const discographyProjects: DiscographyProject[] = chronologicalSpecs
  .map((spec, index) => {
    const baseProject = baseProjectMap.get(spec.baseProjectId);
    if (!baseProject) {
      throw new Error(`Base project id ${spec.baseProjectId} not found`);
    }

    const releaseNumber = index + 1;
    return {
      ...baseProject,
      releaseNumber,
      trackNumber: formatTwoDigits(releaseNumber),
      catalogId: `MKH-${formatTwoDigits(releaseNumber)}`,
      releaseYear: spec.releaseYear,
      releaseGrade: spec.releaseGrade,
      isTitle: spec.isTitle,
      isHot: spec.isHot,
    };
  })
  .sort(compareDiscographyLatestFirst);

const releaseYears = discographyProjects.map((project) => project.releaseYear);
const minReleaseYear = Math.min(...releaseYears);
const maxReleaseYear = Math.max(...releaseYears);

export const discographyEraLabel: string =
  releaseYears.length === 0
    ? ""
    : minReleaseYear === maxReleaseYear
      ? `${minReleaseYear}`
      : `${minReleaseYear} — ${maxReleaseYear}`;

const currentYear = new Date().getFullYear();
export const activeEraLabel: string =
  releaseYears.length === 0
    ? `${currentYear}`
    : minReleaseYear >= currentYear
      ? `${minReleaseYear}`
      : `${minReleaseYear} — ${currentYear}`;

export const groupReleasesByYear = (
  items: DiscographyProject[],
): DiscographyYearGroup[] => {
  const yearMap = new Map<number, DiscographyProject[]>();

  [...items].sort(compareDiscographyLatestFirst).forEach((item) => {
    const group = yearMap.get(item.releaseYear) ?? [];
    group.push(item);
    yearMap.set(item.releaseYear, group);
  });

  return Array.from(yearMap.entries())
    .sort(([yearA], [yearB]) => yearB - yearA)
    .map(([year, releases]) => ({
      year,
      releases,
    }));
};

export const discographyExperiences: DiscographyExperience[] = experiences
  .toSorted((a, b) => b.id - a.id)
  .map((experience, index, arr) => ({
    ...experience,
    labelCode: `LABEL ${formatTwoDigits(arr.length - index)}`,
    isCurrent:
      experience.category === "MAIN" && experience.period.trim().endsWith("-"),
  }));

export const currentMainExperience: DiscographyExperience | undefined =
  discographyExperiences.find((experience) => experience.isCurrent);

export const discographyAcademics: DiscographyAcademic[] = academics.map(
  (academic) => ({
    ...academic,
    honorTag: "HONOR / AWARD",
  }),
);

export const discographyEducations: DiscographyEducation[] = educations.map(
  (education, index) => ({
    ...education,
    sessionCode: `SESSION ${formatTwoDigits(index + 1)}`,
  }),
);
