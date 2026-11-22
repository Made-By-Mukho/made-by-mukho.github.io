export type WorkCategory = "MAIN" | "FREELANCE";

export interface Experience {
  id: number;
  company: string;
  role: string;
  period: string;
  description: string[];
  category?: WorkCategory;
  logoUrl?: string;
}
