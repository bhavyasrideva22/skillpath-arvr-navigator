export interface Question {
  id: string;
  type: 'likert' | 'multiple-choice' | 'true-false' | 'scenario';
  category: 'psychometric' | 'technical' | 'wiscar';
  subcategory: string;
  question: string;
  options?: string[];
  scale?: { min: number; max: number; labels: string[] };
}

export interface Answer {
  questionId: string;
  value: number | string;
  timestamp: Date;
}

export interface AssessmentResult {
  psychometricScore: number;
  technicalScore: number;
  wiscarScores: {
    will: number;
    interest: number;
    skill: number;
    cognitive: number;
    ability: number;
    realWorld: number;
  };
  overallScore: number;
  recommendation: 'yes' | 'maybe' | 'no';
  insights: string[];
  nextSteps: string[];
  skillGaps: { skill: string; current: number; required: number; gap: boolean }[];
}

export interface AssessmentState {
  currentSection: 'intro' | 'psychometric' | 'technical' | 'wiscar' | 'results';
  currentQuestionIndex: number;
  answers: Answer[];
  startTime: Date;
  sectionStartTime: Date;
}