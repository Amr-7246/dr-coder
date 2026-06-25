export type ProjectStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";

export interface ProjectFormState {
    title: string;
    slug: string;
    description: string;
    status: ProjectStatus ;
    liveLink: string|null;
    repoLink: string|null;
    thumbUrl: string;
    iconUrl: string;
    iconColor: string;
    projectMedia: string[];
    videos: string[];
    isSolo: boolean;
    forCompany: boolean;
    sideProject: boolean;
    companyName: string;
    categoryId: number;
    techStackIds: number[]; 
    startingDate: string|null;
    endDate: string|null;
    totalPeriod: string|null;
    isPinned: boolean;
    sortOrder: number;
}

// Get method types
export interface Category {
  id: number;
  name: string;
  description: string | null;
  thumbUrl: string | null;
  sortOrder: number;
  _count?: {
    projects: number;
  };
}

export interface TechStack {
  id: number;
  name: string;
  role: string | null;
  iconUrl: string | null;
  sortOrder: number;
}

export interface Project {
  id: number;
  slug: string;
  title: string;
  description: string | null;
  status: ProjectStatus;

  // Links
  liveLink: string | null;
  repoLink: string | null;

  // Media
  projectMedia: string[];
  videos: string[];
  thumbUrl: string | null;
  iconUrl: string | null;
  iconColor: string | null;

  // Engagement
  likes: number;
  views: number;

  // Facts
  isSolo: boolean;
  isPinned: boolean;
  sortOrder: number;
  forCompany: boolean;
  sideProject: boolean;
  companyName: string | null;

  // Foreign Keys
  categoryId: number;

  // Timestamps (Dates are converted to ISO strings during JSON serialization)
  totalPeriod: string | null;
  startingDate: Date | null;
  endDate: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Extended type representing a Project populated with its full relations.
 * Use this when your Prisma query includes: { include: { category: true, techStack: true } }
 */
export interface ProjectWithRelations extends Project {
  category: Category;
  techStack: TechStack[];
}
