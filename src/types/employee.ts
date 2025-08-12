// Employee interface with complete type definitions for TypeScript
export interface Employee {
  id: string;
  name: string;
  email: string;
  role: string;
  assessmentSubmitted: boolean;
  submissionDate?: string;
  assessmentAnswers?: AssessmentAnswers;
  tags: string[];
  profilePicture?: string;
  createdAt: string;
  updatedAt: string;
}

// Assessment answers interface based on the 20 questions mentioned in the assignment
export interface AssessmentAnswers {
  q1: string; // What interests you about building AI-based products for HR technology?
  q2: string;
  q3: string;
  q4: string;
  q5: string;
  q6: string;
  q7: string;
  q8: string;
  q9: string;
  q10: string;
  q11: string;
  q12: string;
  q13: string;
  q14: string; // Long-term goals related question
  q15: string;
  q16: string; // Learning attitude question
  q17: string; // Recent skill learning question
  q18: string;
  q19: string; // Work culture preference question
  q20: string; // Biggest aspiration question
}

// Filter options for the dashboard
export interface FilterOptions {
  assessmentStatus: 'all' | 'submitted' | 'not-submitted';
  role: string;
  interestArea: string;
  longTermGoals: string;
  workCulturePreference: string;
  learningAttitude: string;
  searchQuery: string;
}

// Sort options for the employee list
export interface SortOptions {
  field: 'name' | 'submissionDate' | 'learningScore';
  direction: 'asc' | 'desc';
}

// Tag categories for filtering and organization
export const TAG_CATEGORIES = {
  INTEREST_AREA: {
    'AI Enthusiast': 'AI Enthusiast',
    'HR-Tech Passionate': 'HR-Tech Passionate', 
    'Looking to explore': 'Looking to explore'
  },
  LONG_TERM_GOALS: {
    'Career-focused': 'Career-focused',
    'Entrepreneurial': 'Entrepreneurial',
    'Technically inclined': 'Technically inclined',
    'Unclear/Exploring': 'Unclear/Exploring'
  },
  WORK_CULTURE: {
    'Prefers healthy culture': 'Prefers healthy culture',
    'Salary-driven': 'Salary-driven'
  },
  LEARNING_ATTITUDE: {
    'Active Learner': 'Active Learner',
    'Passive/No recent skill': 'Passive/No recent skill'
  }
} as const;

// Common roles in the organization
export const ROLES = [
  'Software Engineer',
  'Backend Developer', 
  'Frontend Developer',
  'Full Stack Developer',
  'Product Manager',
  'UI/UX Designer',
  'DevOps Engineer',
  'Data Scientist',
  'QA Engineer',
  'Tech Lead',
  'HR Manager',
  'Business Analyst'
] as const;