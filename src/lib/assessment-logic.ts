import { Answer, AssessmentResult } from '@/types/assessment';

const CORRECT_TECHNICAL_ANSWERS = {
  'tech_1': 'C#',
  'tech_2': 'Rotation', 
  'tech_3': 'VR completely replaces reality while AR overlays digital content on reality',
  'tech_4': 'Y-axis',
  'tech_5': 'Maintaining consistent frame rate'
};

export function calculateAssessmentResult(answers: Answer[]): AssessmentResult {
  // Calculate psychometric score (1-5 scale questions)
  const psychAnswers = answers.filter(a => a.questionId.startsWith('psych_'));
  const psychometricScore = psychAnswers.length > 0 
    ? (psychAnswers.reduce((sum, a) => sum + Number(a.value), 0) / psychAnswers.length / 5) * 100 
    : 0;

  // Calculate technical score (multiple choice questions)
  const techAnswers = answers.filter(a => a.questionId.startsWith('tech_'));
  const correctTechAnswers = techAnswers.filter(a => 
    CORRECT_TECHNICAL_ANSWERS[a.questionId as keyof typeof CORRECT_TECHNICAL_ANSWERS] === a.value
  );
  const technicalScore = techAnswers.length > 0 
    ? (correctTechAnswers.length / techAnswers.length) * 100 
    : 0;

  // Calculate WISCAR scores
  const wiscarAnswers = answers.filter(a => a.questionId.startsWith('wiscar_'));
  const wiscarScores = {
    will: calculateWiscarSubScore(wiscarAnswers, 'will'),
    interest: calculateWiscarSubScore(wiscarAnswers, 'interest'),
    skill: calculateWiscarSubScore(wiscarAnswers, 'skill'), 
    cognitive: calculateWiscarSubScore(wiscarAnswers, 'cognitive'),
    ability: calculateWiscarSubScore(wiscarAnswers, 'ability'),
    realWorld: 75 // Simulated for demo
  };

  // Calculate overall score
  const overallScore = (psychometricScore + technicalScore + Object.values(wiscarScores).reduce((a, b) => a + b, 0) / 6) / 3;

  // Determine recommendation
  let recommendation: 'yes' | 'maybe' | 'no' = 'no';
  if (overallScore >= 80) recommendation = 'yes';
  else if (overallScore >= 60) recommendation = 'maybe';

  // Generate insights and next steps
  const insights = generateInsights(psychometricScore, technicalScore, wiscarScores, overallScore);
  const nextSteps = generateNextSteps(recommendation, technicalScore, psychometricScore);

  // Generate skill gaps
  const skillGaps = [
    { skill: 'Programming (C#, C++)', current: Math.round(technicalScore), required: 80, gap: technicalScore < 80 },
    { skill: '3D Math & Spatial Reasoning', current: Math.round(wiscarScores.cognitive), required: 75, gap: wiscarScores.cognitive < 75 },
    { skill: 'Problem Solving & Debugging', current: Math.round(psychometricScore), required: 70, gap: psychometricScore < 70 },
    { skill: 'Creativity & Innovation', current: Math.round(wiscarScores.interest), required: 75, gap: wiscarScores.interest < 75 },
    { skill: 'Persistence & Grit', current: Math.round(wiscarScores.will), required: 80, gap: wiscarScores.will < 80 }
  ];

  return {
    psychometricScore: Math.round(psychometricScore),
    technicalScore: Math.round(technicalScore),
    wiscarScores: {
      will: Math.round(wiscarScores.will),
      interest: Math.round(wiscarScores.interest),
      skill: Math.round(wiscarScores.skill),
      cognitive: Math.round(wiscarScores.cognitive),
      ability: Math.round(wiscarScores.ability),
      realWorld: Math.round(wiscarScores.realWorld)
    },
    overallScore: Math.round(overallScore),
    recommendation,
    insights,
    nextSteps,
    skillGaps
  };
}

function calculateWiscarSubScore(answers: Answer[], subcategory: string): number {
  const relevantAnswers = answers.filter(a => {
    const questionId = a.questionId;
    if (subcategory === 'will' && questionId === 'wiscar_1') return true;
    if (subcategory === 'interest' && questionId === 'wiscar_2') return true;
    if (subcategory === 'skill' && questionId === 'wiscar_3') return true;
    if (subcategory === 'cognitive' && questionId === 'wiscar_4') return true;
    if (subcategory === 'ability' && questionId === 'wiscar_5') return true;
    return false;
  });

  if (relevantAnswers.length === 0) return 0;

  // Convert answers to scores
  const scores = relevantAnswers.map(a => {
    if (typeof a.value === 'number') return (a.value / 5) * 100;
    
    // Handle skill question specifically
    if (a.questionId === 'wiscar_3') {
      const skillLevels = {
        'Complete beginner': 25,
        'Some experience with tutorials': 50, 
        'Built several projects': 75,
        'Professional experience': 100
      };
      return skillLevels[a.value as keyof typeof skillLevels] || 0;
    }

    // Handle scenario questions
    if (a.questionId === 'wiscar_1') {
      const scenarioScores = {
        'Ask for help from a colleague immediately': 60,
        'Take a break and approach it with fresh perspective': 85,
        'Keep working until you solve it yourself': 70,
        'Document the issue and move to other tasks': 40
      };
      return scenarioScores[a.value as keyof typeof scenarioScores] || 0;
    }

    return 0;
  });

  return scores.reduce((sum, score) => sum + score, 0) / scores.length;
}

function generateInsights(psychometric: number, technical: number, wiscar: any, overall: number): string[] {
  const insights = [];

  if (psychometric >= 80) {
    insights.push("You demonstrate excellent psychological fit for AR/VR development with strong creativity and persistence.");
  } else if (psychometric >= 60) {
    insights.push("You show good potential for AR/VR development but may benefit from building confidence in creative problem-solving.");
  } else {
    insights.push("Consider developing your creative thinking and persistence skills before pursuing AR/VR development.");
  }

  if (technical >= 80) {
    insights.push("Your technical knowledge is strong and you're ready for intermediate AR/VR development challenges.");
  } else if (technical >= 60) {
    insights.push("You have solid foundational knowledge but should strengthen your programming and 3D math skills.");
  } else {
    insights.push("Focus on building fundamental programming skills before diving into AR/VR specific technologies.");
  }

  if (wiscar.interest >= 80) {
    insights.push("Your genuine interest in AR/VR technology will drive your learning and career success.");
  }

  if (wiscar.skill < 60) {
    insights.push("Building more hands-on programming experience will significantly improve your readiness.");
  }

  return insights;
}

function generateNextSteps(recommendation: string, technical: number, psychometric: number): string[] {
  const steps = [];

  if (recommendation === 'yes') {
    steps.push("Start with Unity Learn basics and build your first AR/VR project");
    steps.push("Join AR/VR developer communities and participate in hackathons");
    steps.push("Focus on building a portfolio with 2-3 completed projects");
  } else if (recommendation === 'maybe') {
    steps.push("Strengthen programming fundamentals with C# or C++ courses");
    steps.push("Complete online tutorials for Unity or Unreal Engine");
    steps.push("Build confidence with simpler 3D projects before tackling AR/VR");
  } else {
    steps.push("Start with general programming courses (Python, JavaScript, or C#)");
    steps.push("Explore related fields like front-end development or game design");
    steps.push("Consider roles in QA testing for AR/VR applications");
  }

  if (technical < 70) {
    steps.push("Focus on mathematics for programmers and 3D math concepts");
  }

  if (psychometric < 70) {
    steps.push("Practice creative problem-solving through coding challenges");
  }

  return steps;
}