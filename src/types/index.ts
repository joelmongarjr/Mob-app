export type CandidateAvailability = 
  | 'Available for Internship' 
  | 'Open to Software Projects' 
  | 'Full-Time Student' 
  | 'Academic Focus';

export interface StudentProfile {
  fullName: string;
  headline: string;
  shortBio: string;
  primarySkill: string;
  availabilityStatus: CandidateAvailability;
  imageUri: string | null;
  verificationCode: string;
  registrationNumber: string;
  email: string;
  github: string;
  location: string;
  institution: string;
  lastUpdated?: string;
}

export interface SkillItem {
  id: string;
  name: string;
  domain: 'Mobile Architecture' | 'Native Foundations' | 'Data & Storage' | 'Backend & Cloud' | 'Testing & DevOps';
  proficiency: 'Advanced' | 'Proficient' | 'Intermediate';
  experienceSpan: string;
  summary: string;
  badges: string[];
}

export interface EducationMilestone {
  id: string;
  institution: string;
  qualification: string;
  timeframe: string;
  standing: string;
  city: string;
  accomplishments: string[];
}

export interface PortfolioProject {
  id: string;
  title: string;
  overview: string;
  problemStatement: string;
  individualContribution: string;
  techStack: string[];
  systemDesign: string;
  measuredOutcomes: string[];
  sourceUrl?: string;
  isOnlineRequired: boolean;
}
