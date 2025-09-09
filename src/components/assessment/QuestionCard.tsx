import { Question } from '@/types/assessment';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

interface QuestionCardProps {
  question: Question;
  onAnswer: (value: number | string) => void;
  questionNumber: number;
  totalQuestions: number;
}

export const QuestionCard = ({ question, onAnswer, questionNumber, totalQuestions }: QuestionCardProps) => {
  const [selectedValue, setSelectedValue] = useState<string>('');

  const handleSubmit = () => {
    if (!selectedValue) return;
    
    if (question.type === 'likert') {
      onAnswer(parseInt(selectedValue));
    } else {
      onAnswer(selectedValue);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto shadow-elevation animate-slide-up">
      <CardHeader>
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-muted-foreground">
            Question {questionNumber} of {totalQuestions}
          </span>
          <span className="text-sm text-ar-purple font-medium">
            {question.category.charAt(0).toUpperCase() + question.category.slice(1)}
          </span>
        </div>
        <CardTitle className="text-xl leading-relaxed">{question.question}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {question.type === 'likert' && question.scale && (
          <RadioGroup value={selectedValue} onValueChange={setSelectedValue}>
            <div className="space-y-3">
              {question.scale.labels.map((label, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <RadioGroupItem value={(index + 1).toString()} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                    {label}
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        )}

        {(question.type === 'multiple-choice' || question.type === 'scenario') && question.options && (
          <RadioGroup value={selectedValue} onValueChange={setSelectedValue}>
            <div className="space-y-3">
              {question.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <RadioGroupItem value={option} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        )}

        <div className="flex justify-end pt-4">
          <Button 
            onClick={handleSubmit} 
            disabled={!selectedValue}
            className="gradient-primary hover:opacity-90 transition-opacity"
          >
            Next Question
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};