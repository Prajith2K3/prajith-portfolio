export interface CodeSnippet {
  language: 'sql' | 'python' | 'dax';
  title: string;
  code: string;
}

export interface MetricHighlight {
  label: string;
  value: string;
  change?: string;
  description: string;
}

export interface ProjectImage {
  title: string;
  src: string;
  caption: string;
}

export interface Project {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  date: string;
  category: string;
  datasetScale: string;
  primaryMetricValue: string;
  primaryMetricLabel: string;
  techStack: string[];
  businessProblem: string;
  analyticalApproach: string[];
  sqlWork: string[];
  pythonWork: string[];
  powerBiWork: string[];
  keyMetrics: MetricHighlight[];
  businessImpact: string;
  recommendations: string[];
  codeSnippets: CodeSnippet[];
  dashboardPagesCount: number;
  dashboardPages: string[];
  visualType: 'churn-flow' | 'sales-landscape' | 'marketing-funnel';
  projectImages?: ProjectImage[];
}

export interface SkillCategory {
  id: string;
  title: string;
  subtitle: string;
  items: {
    name: string;
    level: string;
    description: string;
    isPrimary?: boolean;
  }[];
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  score?: string;
  credentialUrl?: string;
  featured?: boolean;
  image?: string;
  suiteImages?: { title: string; src: string }[];
  verificationCode?: string;
  skills?: string[];
  description?: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  duration: string;
  credentialId?: string;
  welcomeId?: string;
  accreditation?: string;
  issuedDate?: string;
  certificateImg?: string;
  welcomeLetterImg?: string;
  ventureImages?: { title: string; src: string; caption: string }[];
  responsibilities: string[];
  etlStages: {
    stage: 'DATA' | 'CLEAN' | 'ANALYZE' | 'VISUALIZE' | 'INSIGHT';
    title: string;
    description: string;
  }[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  duration: string;
  location: string;
  gpa?: string;
}
