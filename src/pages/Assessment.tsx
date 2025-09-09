import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuestionCard } from '@/components/assessment/QuestionCard';
import { ProgressBar } from '@/components/ui/progress-bar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { psychometricQuestions, technicalQuestions, wiscarQuestions } from '@/data/questions';
import { AssessmentState, Answer } from '@/types/assessment';
import { calculateAssessmentResult } from '@/lib/assessment-logic';
import { ArrowLeft } from 'lucide-react';

const Assessment = () => {
  const navigate = useNavigate();
  const [state, setState] = useState<AssessmentState>({
    currentSection: 'psychometric',
    currentQuestionIndex: 0,
    answers: [],
    startTime: new Date(),
    sectionStartTime: new Date()
  });

  const allQuestions = [...psychometricQuestions, ...technicalQuestions, ...wiscarQuestions];
  const currentQuestion = allQuestions[state.currentQuestionIndex];
  const totalQuestions = allQuestions.length;
  const progress = ((state.currentQuestionIndex) / totalQuestions) * 100;

  const getSectionInfo = () => {
    const currentIndex = state.currentQuestionIndex;
    if (currentIndex < psychometricQuestions.length) {
      return { section: 'Psychological Assessment', color: 'text-ar-purple' };
    } else if (currentIndex < psychometricQuestions.length + technicalQuestions.length) {
      return { section: 'Technical Evaluation', color: 'text-vr-blue' };
    } else {
      return { section: 'WISCAR Analysis', color: 'text-tech-green' };
    }
  };

  const handleAnswer = (value: number | string) => {
    const answer: Answer = {
      questionId: currentQuestion.id,
      value,
      timestamp: new Date()
    };

    const newAnswers = [...state.answers, answer];
    
    if (state.currentQuestionIndex + 1 >= totalQuestions) {
      // Assessment complete - calculate results and navigate
      const results = calculateAssessmentResult(newAnswers);
      localStorage.setItem('assessmentResults', JSON.stringify(results));
      navigate('/results');
    } else {
      setState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1,
        answers: newAnswers
      }));
    }
  };

  const handleBack = () => {
    if (state.currentQuestionIndex > 0) {
      setState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex - 1,
        answers: prev.answers.slice(0, -1)
      }));
    } else {
      navigate('/');
    }
  };

  const sectionInfo = getSectionInfo();

  if (!currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md mx-auto shadow-elevation">
          <CardHeader>
            <CardTitle>Assessment Complete</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Processing your results...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={handleBack}
              className="hover:bg-secondary"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-2xl font-bold">AR/VR Developer Assessment</h1>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className={`text-lg font-semibold ${sectionInfo.color}`}>
                {sectionInfo.section}
              </span>
              <span className="text-sm text-muted-foreground">
                {Math.round(progress)}% Complete
              </span>
            </div>
            <ProgressBar value={state.currentQuestionIndex} max={totalQuestions} />
          </div>
        </div>

        {/* Question */}
        <QuestionCard
          question={currentQuestion}
          onAnswer={handleAnswer}
          questionNumber={state.currentQuestionIndex + 1}
          totalQuestions={totalQuestions}
        />

        {/* Section Indicator */}
        <div className="mt-8 flex justify-center space-x-8">
          <div className={`text-center ${state.currentQuestionIndex < psychometricQuestions.length ? 'text-ar-purple' : 'text-muted-foreground'}`}>
            <div className="text-sm font-medium">Psychological</div>
            <div className="text-xs">5 questions</div>
          </div>
          <div className={`text-center ${
            state.currentQuestionIndex >= psychometricQuestions.length && 
            state.currentQuestionIndex < psychometricQuestions.length + technicalQuestions.length 
            ? 'text-vr-blue' : 'text-muted-foreground'
          }`}>
            <div className="text-sm font-medium">Technical</div>
            <div className="text-xs">5 questions</div>
          </div>
          <div className={`text-center ${state.currentQuestionIndex >= psychometricQuestions.length + technicalQuestions.length ? 'text-tech-green' : 'text-muted-foreground'}`}>
            <div className="text-sm font-medium">WISCAR</div>
            <div className="text-xs">5 questions</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assessment;