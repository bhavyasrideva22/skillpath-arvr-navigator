import { AssessmentResult } from '@/types/assessment';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface ResultsChartProps {
  results: AssessmentResult;
}

export const ResultsChart = ({ results }: ResultsChartProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-success-emerald';
    if (score >= 60) return 'text-warning-amber';
    return 'text-destructive';
  };

  const getRecommendationBadge = (recommendation: string) => {
    switch (recommendation) {
      case 'yes':
        return <Badge className="bg-success-emerald/20 text-success-emerald border-success-emerald">Strong Fit</Badge>;
      case 'maybe':
        return <Badge className="bg-warning-amber/20 text-warning-amber border-warning-amber">Moderate Fit</Badge>;
      default:
        return <Badge className="bg-destructive/20 text-destructive border-destructive">Needs Development</Badge>;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Overall Score */}
      <Card className="shadow-elevation">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Overall Assessment Score</CardTitle>
          <div className="flex items-center justify-center gap-4 mt-4">
            <div className={`text-4xl font-bold ${getScoreColor(results.overallScore)}`}>
              {results.overallScore}%
            </div>
            {getRecommendationBadge(results.recommendation)}
          </div>
        </CardHeader>
      </Card>

      {/* Section Scores */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-lg">Psychological Fit</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Score</span>
                <span className={`font-semibold ${getScoreColor(results.psychometricScore)}`}>
                  {results.psychometricScore}%
                </span>
              </div>
              <Progress value={results.psychometricScore} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-lg">Technical Readiness</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Score</span>
                <span className={`font-semibold ${getScoreColor(results.technicalScore)}`}>
                  {results.technicalScore}%
                </span>
              </div>
              <Progress value={results.technicalScore} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-lg">WISCAR Average</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {Object.entries(results.wiscarScores).map(([key, value]) => (
                <div key={key} className="flex justify-between text-sm">
                  <span className="capitalize">{key}</span>
                  <span className={getScoreColor(value)}>{value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Skill Gaps */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Skill Gap Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {results.skillGaps.map((skill, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{skill.skill}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                      {skill.current}% / {skill.required}%
                    </span>
                    {skill.gap && (
                      <Badge variant="outline" className="text-xs">Needs Improvement</Badge>
                    )}
                  </div>
                </div>
                <div className="relative">
                  <Progress value={skill.current} className="h-2" />
                  <div 
                    className="absolute top-0 h-2 w-0.5 bg-warning-amber"
                    style={{ left: `${skill.required}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Insights */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Key Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {results.insights.map((insight, index) => (
              <li key={index} className="flex items-start gap-2">
                <div className="w-2 h-2 bg-ar-purple rounded-full mt-2 flex-shrink-0" />
                <span>{insight}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Recommended Next Steps</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="space-y-2">
            {results.nextSteps.map((step, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="w-6 h-6 bg-vr-blue text-white rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">
                  {index + 1}
                </div>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>
    </div>
  );
};