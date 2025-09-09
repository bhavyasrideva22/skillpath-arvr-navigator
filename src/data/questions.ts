import { Question } from '@/types/assessment';

export const psychometricQuestions: Question[] = [
  {
    id: 'psych_1',
    type: 'likert',
    category: 'psychometric',
    subcategory: 'interest',
    question: 'I enjoy creating 3D interactive experiences.',
    scale: { min: 1, max: 5, labels: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'] }
  },
  {
    id: 'psych_2',
    type: 'likert',
    category: 'psychometric',
    subcategory: 'openness',
    question: 'I am excited by the possibility of creating virtual worlds that others can explore.',
    scale: { min: 1, max: 5, labels: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'] }
  },
  {
    id: 'psych_3',
    type: 'likert',
    category: 'psychometric',
    subcategory: 'persistence',
    question: 'When debugging complex technical issues, I persist until I find the solution.',
    scale: { min: 1, max: 5, labels: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'] }
  },
  {
    id: 'psych_4',
    type: 'likert',
    category: 'psychometric',
    subcategory: 'creativity',
    question: 'I often come up with creative solutions to technical problems.',
    scale: { min: 1, max: 5, labels: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'] }
  },
  {
    id: 'psych_5',
    type: 'likert',
    category: 'psychometric',
    subcategory: 'collaboration',
    question: 'I work well in teams to achieve common goals.',
    scale: { min: 1, max: 5, labels: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'] }
  }
];

export const technicalQuestions: Question[] = [
  {
    id: 'tech_1',
    type: 'multiple-choice',
    category: 'technical',
    subcategory: 'programming',
    question: 'Which programming language is most commonly used for Unity development?',
    options: ['JavaScript', 'Python', 'C#', 'C++']
  },
  {
    id: 'tech_2',
    type: 'multiple-choice',
    category: 'technical',
    subcategory: '3d-math',
    question: 'What does a quaternion represent in 3D graphics?',
    options: ['Position', 'Scale', 'Rotation', 'Color']
  },
  {
    id: 'tech_3',
    type: 'multiple-choice',
    category: 'technical',
    subcategory: 'ar-vr',
    question: 'What is the primary difference between AR and VR?',
    options: [
      'AR is cheaper to develop than VR',
      'VR completely replaces reality while AR overlays digital content on reality',
      'AR requires more powerful hardware than VR',
      'VR is only for gaming while AR is for business'
    ]
  },
  {
    id: 'tech_4',
    type: 'multiple-choice',
    category: 'technical',
    subcategory: 'spatial',
    question: 'In 3D space, which axis typically represents "up"?',
    options: ['X-axis', 'Y-axis', 'Z-axis', 'W-axis']
  },
  {
    id: 'tech_5',
    type: 'multiple-choice',
    category: 'technical',
    subcategory: 'optimization',
    question: 'What is the most important factor for AR/VR performance optimization?',
    options: ['High-resolution textures', 'Complex animations', 'Maintaining consistent frame rate', 'Advanced lighting']
  }
];

export const wiscarQuestions: Question[] = [
  {
    id: 'wiscar_1',
    type: 'scenario',
    category: 'wiscar',
    subcategory: 'will',
    question: 'You encounter a complex bug that has taken you 3 days to solve with no progress. What do you do?',
    options: [
      'Ask for help from a colleague immediately',
      'Take a break and approach it with fresh perspective',
      'Keep working until you solve it yourself',
      'Document the issue and move to other tasks'
    ]
  },
  {
    id: 'wiscar_2',
    type: 'likert',
    category: 'wiscar',
    subcategory: 'interest',
    question: 'I actively seek out new AR/VR technologies and trends in my free time.',
    scale: { min: 1, max: 5, labels: ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'] }
  },
  {
    id: 'wiscar_3',
    type: 'multiple-choice',
    category: 'wiscar',
    subcategory: 'skill',
    question: 'How would you rate your current programming experience?',
    options: ['Complete beginner', 'Some experience with tutorials', 'Built several projects', 'Professional experience']
  },
  {
    id: 'wiscar_4',
    type: 'likert',
    category: 'wiscar',
    subcategory: 'cognitive',
    question: 'I can easily visualize how 3D objects would look from different angles.',
    scale: { min: 1, max: 5, labels: ['Very Difficult', 'Difficult', 'Moderate', 'Easy', 'Very Easy'] }
  },
  {
    id: 'wiscar_5',
    type: 'likert',
    category: 'wiscar',
    subcategory: 'ability',
    question: 'I enjoy learning from feedback and criticism of my work.',
    scale: { min: 1, max: 5, labels: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'] }
  }
];