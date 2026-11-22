import { WorkCategory } from "./Experience";

export interface Project {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  projectUrl: string;
  githubUrl: string;
  category?: WorkCategory;
}
