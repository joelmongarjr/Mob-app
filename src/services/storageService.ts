import AsyncStorage from '@react-native-async-storage/async-storage';
import { StudentProfile, SkillItem, EducationMilestone, PortfolioProject } from '../types';

const STORAGE_KEY_PROFILE = '@jmportfolio_profile_v1';

export const DEFAULT_PROFILE: StudentProfile = {
  fullName: 'Joel Eliezer Youto Mongar Jr',
  headline: 'Software Engineering Student & Cloud-Native Mobile Developer',
  shortBio: 'Undergraduate Software Engineering student at INES-Ruhengeri specializing in data-driven React Native mobile architectures, offline relational caching with AsyncStorage, and scalable community logistics solutions.',
  primarySkill: 'React Native & Mobile Database Architecture',
  availabilityStatus: 'Available for Internship',
  imageUri: null,
  verificationCode: 'MOB-A2-7585',
  registrationNumber: '25/27585',
  email: 'joel.mongar@student.ines.ac.rw',
  github: 'https://github.com/joel-mongar',
  location: 'Musanze, Northern Province, Rwanda',
  institution: "Institut d'Enseignement Supérieur de Ruhengeri (INES-Ruhengeri)",
  lastUpdated: new Date().toISOString(),
};

export const JOEL_SKILLS: SkillItem[] = [
  {
    id: 'skill-1',
    name: 'React Native & Native Bridge Optimization',
    domain: 'Mobile Architecture',
    proficiency: 'Proficient',
    experienceSpan: '2 years',
    summary: 'Developing scalable cross-platform mobile clients with React Navigation, customized bridge modules, memoized render trees, and native Android hooks.',
    badges: ['React Native', 'Expo', 'TypeScript', 'Native Modules', 'AsyncStorage'],
  },
  {
    id: 'skill-2',
    name: 'Java / Kotlin & Android Fundamentals',
    domain: 'Native Foundations',
    proficiency: 'Proficient',
    experienceSpan: '2 years',
    summary: 'Understanding Android lifecycle internals, manifest configurations, intent dispatching, permissions handling, and APK packaging standards.',
    badges: ['Java', 'Android SDK', 'Lifecycle', 'Manifest', 'Gradle'],
  },
  {
    id: 'skill-3',
    name: 'Database Systems, SQL & Offline Storage',
    domain: 'Data & Storage',
    proficiency: 'Advanced',
    experienceSpan: '2.5 years',
    summary: 'Designing normalized schema definitions, ACID transactions, SQLite local databases, key-value serialization, and conflict resolution.',
    badges: ['SQL', 'AsyncStorage', 'Database Normalization', 'ACID', 'JSON'],
  },
  {
    id: 'skill-4',
    name: 'Python Backend & Microservices Architecture',
    domain: 'Backend & Cloud',
    proficiency: 'Proficient',
    experienceSpan: '2 years',
    summary: 'Constructing lightweight RESTful API microservices in Python, designing data serialization pipelines, and executing algorithmic data processing.',
    badges: ['Python 3', 'REST APIs', 'FastAPI', 'Microservices', 'Data Modeling'],
  },
  {
    id: 'skill-5',
    name: 'Automated Unit Testing & CI/CD Pipelines',
    domain: 'Testing & DevOps',
    proficiency: 'Advanced',
    experienceSpan: '2 years',
    summary: 'Setting up Git version control workflows, automated preview compilation via Expo EAS, smoke test harnesses, and physical device test logging.',
    badges: ['Git Workflow', 'EAS Build', 'Automated QA', 'Smoke Testing', 'Release CI'],
  },
];

export const JOEL_EDUCATION: EducationMilestone[] = [
  {
    id: 'edu-1',
    institution: "Institut d'Enseignement Supérieur de Ruhengeri (INES-Ruhengeri)",
    qualification: 'Bachelor of Science in Software Engineering',
    timeframe: '2024 - Present',
    standing: 'In Progress (Year II)',
    city: 'Musanze, Northern Province, Rwanda',
    accomplishments: [
      'Comprehensive study in Mobile Application Development (SWE 3409), Database Systems, Data Structures, and Software Modeling.',
      'Active developer contributor in university team projects and mobile application prototypes.',
      'Specialized focus on offline-first database systems and community logistics applications.',
    ],
  },
  {
    id: 'edu-2',
    institution: 'Secondary School Certificate of Education',
    qualification: 'Advanced Level Sciences (Physics, Chemistry & Math)',
    timeframe: 'Graduated 2022',
    standing: 'Graduated with Academic Honors',
    city: 'East Africa',
    accomplishments: [
      'Strong academic foundation in applied mathematics, structural mechanics, and analytical reasoning.',
      'Applied scientific principles to software engineering and database logic.',
    ],
  },
];

export const JOEL_PROJECTS: PortfolioProject[] = [
  {
    id: 'proj-1',
    title: 'EcoTrack Ruhengeri — Municipal Solid Waste Logistics App',
    overview: 'Offline-capable sanitation route tracking and incident reporting mobile client for municipal dispatchers',
    problemStatement: 'Sanitation truck drivers in Ruhengeri frequently operate in hilly sectors with patchy cellular signals, causing missed commercial collections and delayed dispatch reporting during waste management rounds.',
    individualContribution: 'Engineered the offline collection route cache and incident logger in React Native using AsyncStorage. Built responsive checklist components, implemented local coordinate logging, and verified offline data integrity.',
    techStack: ['React Native', 'TypeScript', 'AsyncStorage', 'Local Route Cache', 'Flexbox'],
    systemDesign: 'Decoupled offline-first architecture that stores daily collection waypoints locally. Drivers can mark bins as collected or reported without internet, syncing records when back at base.',
    measuredOutcomes: [
      '100% route verification retention over 48 hours of simulated offline field routes.',
      'Sub-15ms UI response time when updating bin collection statuses.',
      'Zero collection entry corruption during sudden battery-drain reboot tests.',
    ],
    sourceUrl: 'https://github.com/joel-mongar/ecotrack-ruhengeri',
    isOnlineRequired: true,
  },
  {
    id: 'proj-2',
    title: 'INES Student Cooperative Credit & Savings (SACCO) Ledger',
    overview: 'Mobile micro-savings and credit management client for student cooperative associations',
    problemStatement: 'Student welfare cooperatives and credit groups often record monthly shares and micro-loan repayments on paper notebooks, creating ledger discrepancies and delayed transaction auditing.',
    individualContribution: 'Constructed the double-entry offline savings ledger with real-time balance calculations. Designed controlled financial input screens with dynamic numeric validation rules, currency formatting, and transaction receipts.',
    techStack: ['React Native', 'Controlled Inputs', 'Form Validation', 'Financial Calculations', 'Local Storage'],
    systemDesign: 'Deterministic client-side financial computation engine enforcing strict transaction validation before serializing balance states into local device storage.',
    measuredOutcomes: [
      'Eliminated arithmetic discrepancies across simulated multi-member monthly cycles.',
      'Enforced strict validation preventing invalid or negative financial entries.',
      'Complete audit trail preserved locally across application reboots.',
    ],
    sourceUrl: 'https://github.com/joel-mongar/ines-sacco-ledger',
    isOnlineRequired: true,
  },
];

export const loadProfile = async (): Promise<StudentProfile> => {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY_PROFILE);
    if (raw != null) {
      const parsed = JSON.parse(raw);
      return {
        ...DEFAULT_PROFILE,
        ...parsed,
        verificationCode: DEFAULT_PROFILE.verificationCode,
        registrationNumber: DEFAULT_PROFILE.registrationNumber,
      };
    }
    return DEFAULT_PROFILE;
  } catch (err) {
    console.error('Failed to load profile from AsyncStorage:', err);
    return DEFAULT_PROFILE;
  }
};

export const persistProfile = async (profile: StudentProfile): Promise<boolean> => {
  try {
    const payload: StudentProfile = {
      ...profile,
      lastUpdated: new Date().toISOString(),
    };
    await AsyncStorage.setItem(STORAGE_KEY_PROFILE, JSON.stringify(payload));
    return true;
  } catch (err) {
    console.error('Failed to save profile to AsyncStorage:', err);
    return false;
  }
};

export const resetProfile = async (): Promise<StudentProfile> => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY_PROFILE);
    return DEFAULT_PROFILE;
  } catch (err) {
    console.error('Failed to reset profile in AsyncStorage:', err);
    return DEFAULT_PROFILE;
  }
};
