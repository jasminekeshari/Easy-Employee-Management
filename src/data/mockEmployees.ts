// Mock employee data for demonstration - In real app, this would come from API
import { Employee } from '../types/employee';

export const mockEmployees: Employee[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@company.com',
    role: 'Software Engineer',
    assessmentSubmitted: true,
    submissionDate: '2025-08-05',
    tags: ['AI Enthusiast', 'Active Learner', 'Career-focused', 'Prefers healthy culture'],
    assessmentAnswers: {
      q1: 'I am fascinated by how AI can revolutionize HR processes and make them more efficient and fair.',
      q14: 'I want to become a senior software engineer and eventually lead AI projects.',
      q16: 'Yes, I actively learn new technologies every month.',
      q17: 'Recently learned React 18 and Next.js 14 features.',
      q19: 'I strongly prefer a healthy work environment over just high salary.',
      q20: 'My biggest aspiration is to build products that positively impact people\'s careers.',
      q2: 'I have 3 years of experience in full-stack development.',
      q3: 'My strongest skill is problem-solving and system design.',
      q4: 'I work best in collaborative team environments.',
      q5: 'I am motivated by challenging technical problems.',
      q6: 'My communication style is direct but empathetic.',
      q7: 'I handle stress by breaking problems into smaller parts.',
      q8: 'I prefer agile development methodologies.',
      q9: 'My ideal project involves innovative technology.',
      q10: 'I learn best through hands-on experience.',
      q11: 'I value work-life balance highly.',
      q12: 'My leadership style is collaborative.',
      q13: 'I handle feedback well and use it for improvement.',
      q15: 'I am flexible with remote or hybrid work.',
      q18: 'I enjoy mentoring junior developers.'
    },
    createdAt: '2025-08-01',
    updatedAt: '2025-08-05'
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'michael.chen@company.com',
    role: 'Product Manager',
    assessmentSubmitted: true,
    submissionDate: '2025-08-04',
    tags: ['HR-Tech Passionate', 'Active Learner', 'Entrepreneurial', 'Salary-driven'],
    assessmentAnswers: {
      q1: 'HR technology has immense potential to solve real-world workplace challenges.',
      q14: 'I aspire to start my own HR-tech company in the next 5 years.',
      q16: 'I constantly upgrade my product management skills.',
      q17: 'Recently completed a course on AI product strategy.',
      q19: 'While culture matters, competitive compensation is my priority.',
      q20: 'I want to build products that transform how companies hire and manage talent.',
      q2: 'I have 5 years of product management experience.',
      q3: 'Strategic thinking and user empathy are my strongest skills.',
      q4: 'I excel in cross-functional team leadership.',
      q5: 'Market impact and user satisfaction drive me.',
      q6: 'I communicate with data-driven insights.',
      q7: 'I manage stress through proper planning and delegation.',
      q8: 'I prefer outcome-driven development approaches.',
      q9: 'Products that solve real user problems excite me.',
      q10: 'I learn through user research and market analysis.',
      q11: 'I balance ambition with personal well-being.',
      q12: 'I lead by setting clear vision and empowering teams.',
      q13: 'I actively seek feedback from users and stakeholders.',
      q15: 'I prefer hybrid work for better collaboration.',
      q18: 'I enjoy coaching team members on product thinking.'
    },
    createdAt: '2025-08-01',
    updatedAt: '2025-08-04'
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    email: 'emily.rodriguez@company.com',
    role: 'UI/UX Designer',
    assessmentSubmitted: false,
    tags: ['Looking to explore', 'Passive/No recent skill', 'Unclear/Exploring'],
    createdAt: '2025-08-02',
    updatedAt: '2025-08-02'
  },
  {
    id: '4',
    name: 'David Kim',
    email: 'david.kim@company.com',
    role: 'Backend Developer',
    assessmentSubmitted: true,
    submissionDate: '2025-08-03',
    tags: ['AI Enthusiast', 'Active Learner', 'Technically inclined', 'Prefers healthy culture'],
    assessmentAnswers: {
      q1: 'AI can automate repetitive HR tasks and provide insights into employee behavior.',
      q14: 'I want to specialize in AI/ML engineering and build scalable systems.',
      q16: 'I dedicate time weekly to learn new technologies.',
      q17: 'Recently mastered GraphQL and microservices architecture.',
      q19: 'A positive work environment is crucial for my productivity.',
      q20: 'I aspire to architect systems that power the next generation of AI applications.',
      q2: 'I have 4 years of backend development experience.',
      q3: 'System architecture and performance optimization are my strengths.',
      q4: 'I work well independently but collaborate effectively when needed.',
      q5: 'Technical excellence and clean code motivate me.',
      q6: 'I communicate clearly about technical concepts.',
      q7: 'I handle pressure by maintaining organized workflows.',
      q8: 'I prefer test-driven development methodologies.',
      q9: 'High-performance, scalable systems interest me most.',
      q10: 'I learn best by building and experimenting.',
      q11: 'I value continuous learning and growth opportunities.',
      q12: 'I lead through technical expertise and mentorship.',
      q13: 'I appreciate constructive feedback on code and architecture.',
      q15: 'I am comfortable with fully remote work.',
      q18: 'I enjoy sharing knowledge through tech talks and documentation.'
    },
    createdAt: '2025-08-01',
    updatedAt: '2025-08-03'
  },
  {
    id: '5',
    name: 'Lisa Thompson',
    email: 'lisa.thompson@company.com',
    role: 'HR Manager',
    assessmentSubmitted: true,
    submissionDate: '2025-08-06',
    tags: ['HR-Tech Passionate', 'Active Learner', 'Career-focused', 'Prefers healthy culture'],
    assessmentAnswers: {
      q1: 'AI in HR can eliminate bias and improve decision-making in talent management.',
      q14: 'I aim to become a Chief People Officer and drive organizational transformation.',
      q16: 'I regularly attend HR conferences and complete certifications.',
      q17: 'Recently certified in People Analytics and AI in HR.',
      q19: 'Creating a healthy, inclusive culture is my top priority.',
      q20: 'I want to build workplaces where every employee can thrive and reach their potential.',
      q2: 'I have 7 years of HR leadership experience.',
      q3: 'Emotional intelligence and strategic HR planning are my strengths.',
      q4: 'I excel at building relationships across all organizational levels.',
      q5: 'Employee development and organizational success drive me.',
      q6: 'I communicate with empathy and transparency.',
      q7: 'I manage stress through mindfulness and stakeholder communication.',
      q8: 'I prefer people-centric, agile HR practices.',
      q9: 'Initiatives that improve employee experience excite me.',
      q10: 'I learn through case studies and peer collaboration.',
      q11: 'I model the work-life integration I advocate for.',
      q12: 'I lead with authenticity and inclusive decision-making.',
      q13: 'I actively seek 360-degree feedback for continuous improvement.',
      q15: 'I support flexible work arrangements that suit individual needs.',
      q18: 'I am passionate about developing future HR leaders.'
    },
    createdAt: '2025-07-30',
    updatedAt: '2025-08-06'
  },
  {
    id: '6',
    name: 'James Wilson',
    email: 'james.wilson@company.com',
    role: 'Data Scientist',
    assessmentSubmitted: false,
    tags: ['Looking to explore', 'Passive/No recent skill'],
    createdAt: '2025-08-03',
    updatedAt: '2025-08-03'
  },
  {
    id: '7',
    name: 'Alexandra Brown',
    email: 'alexandra.brown@company.com',
    role: 'Frontend Developer',
    assessmentSubmitted: true,
    submissionDate: '2025-08-07',
    tags: ['AI Enthusiast', 'Active Learner', 'Career-focused', 'Salary-driven'],
    assessmentAnswers: {
      q1: 'AI can create more intuitive and personalized user experiences in HR applications.',
      q14: 'I want to lead frontend architecture for AI-powered products.',
      q16: 'I stay updated with the latest frontend frameworks and best practices.',
      q17: 'Recently learned Three.js and advanced React patterns.',
      q19: 'While I value good culture, competitive compensation is important for my goals.',
      q20: 'I aspire to create user interfaces that make complex AI accessible to everyone.',
      q2: 'I have 3 years of frontend development experience.',
      q3: 'Creating intuitive user experiences and performance optimization.',
      q4: 'I collaborate well with designers and backend developers.',
      q5: 'Creating beautiful, functional interfaces motivates me.',
      q6: 'I communicate design decisions with visual prototypes.',
      q7: 'I handle stress by breaking down complex UIs into components.',
      q8: 'I prefer component-driven development methodologies.',
      q9: 'Interactive, AI-enhanced user interfaces interest me.',
      q10: 'I learn best through building and iterating on real projects.',
      q11: 'I value creative freedom and professional growth.',
      q12: 'I lead by setting high standards for user experience.',
      q13: 'I welcome feedback from users and design teams.',
      q15: 'I prefer hybrid work for design collaboration.',
      q18: 'I enjoy sharing frontend best practices with the team.'
    },
    createdAt: '2025-08-02',
    updatedAt: '2025-08-07'
  },
  {
    id: '8',
    name: 'Robert Martinez',
    email: 'robert.martinez@company.com',
    role: 'DevOps Engineer',
    assessmentSubmitted: true,
    submissionDate: '2025-08-02',
    tags: ['Looking to explore', 'Active Learner', 'Technically inclined', 'Prefers healthy culture'],
    assessmentAnswers: {
      q1: 'AI infrastructure and deployment pipelines are areas I\'m exploring.',
      q14: 'I want to specialize in MLOps and AI infrastructure at scale.',
      q16: 'I continuously learn new cloud technologies and automation tools.',
      q17: 'Recently mastered Kubernetes and implemented CI/CD for ML models.',
      q19: 'A supportive team environment is essential for complex infrastructure work.',
      q20: 'I aspire to build infrastructure that powers the next generation of AI applications.',
      q2: 'I have 5 years of DevOps and infrastructure experience.',
      q3: 'System reliability and automation are my core strengths.',
      q4: 'I work well with development teams to ensure smooth deployments.',
      q5: 'Building robust, scalable systems drives my passion.',
      q6: 'I communicate infrastructure concepts clearly to non-technical stakeholders.',
      q7: 'I manage stress through proper monitoring and incident response procedures.',
      q8: 'I prefer infrastructure-as-code and automated deployment practices.',
      q9: 'Large-scale, distributed systems fascinate me.',
      q10: 'I learn best by implementing solutions in production environments.',
      q11: 'I value stability in both systems and work environment.',
      q12: 'I lead by ensuring system reliability and sharing knowledge.',
      q13: 'I appreciate feedback on infrastructure improvements and processes.',
      q15: 'I am flexible with remote work, focusing on system uptime.',
      q18: 'I enjoy teaching others about infrastructure best practices.'
    },
    createdAt: '2025-07-31',
    updatedAt: '2025-08-02'
  }
];

// Helper function to calculate learning attitude score based on assessment answers
export const calculateLearningScore = (employee: Employee): number => {
  if (!employee.assessmentSubmitted || !employee.assessmentAnswers) return 0;
  
  let score = 0;
  
  // Check Q16 - active learning attitude
  if (employee.assessmentAnswers.q16.toLowerCase().includes('yes') || 
      employee.assessmentAnswers.q16.toLowerCase().includes('actively') ||
      employee.assessmentAnswers.q16.toLowerCase().includes('constantly')) {
    score += 5;
  }
  
  // Check Q17 - recent skill learning
  if (employee.assessmentAnswers.q17.toLowerCase().includes('recently') ||
      employee.assessmentAnswers.q17.toLowerCase().includes('learned') ||
      employee.assessmentAnswers.q17.toLowerCase().includes('completed')) {
    score += 5;
  }
  
  // Bonus points for specific learning indicators
  if (employee.tags.includes('Active Learner')) score += 2;
  
  return Math.min(score, 10); // Cap at 10
};