
export interface StudyTip {
  title: string;
  description: string;
  technique: string;
}

export interface ExamPrep {
  topic: string;
  keyConcepts: string[];
  commonMistakes: string[];
  practiceQuestion: string;
}

export interface CareerPath {
  role: string;
  skillsRequired: string[];
  salaryOutlook: string;
  nextSteps: string;
}

export interface AcademicGuidance {
  subject: string;
  summary: string;
  studyTips: StudyTip[];
  examPrep: ExamPrep;
  careerPath: CareerPath;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}
