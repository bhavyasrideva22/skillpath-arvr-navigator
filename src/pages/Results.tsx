import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ResultsChart } from '@/components/assessment/ResultsChart';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AssessmentResult } from '@/types/assessment';
import { ArrowLeft, Download, Share2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Results = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [results, setResults] = useState<AssessmentResult | null>(null);

  useEffect(() => {
    const savedResults = localStorage.getItem('assessmentResults');
    if (savedResults) {
      setResults(JSON.parse(savedResults));
    } else {
      navigate('/');
    }
  }, [navigate]);

  const handleShare = () => {
    if (navigator.share && results) {
      navigator.share({
        title: 'AR/VR Developer Assessment Results',
        text: `I scored ${results.overallScore}% on the AR/VR Developer readiness assessment!`,
        url: window.location.origin
      });
    } else {
      navigator.clipboard.writeText(window.location.origin);
      toast({
        title: "Link copied!",
        description: "Assessment link copied to clipboard.",
      });
    }
  };

  const handleDownload = () => {
    if (!results) return;
    
    const reportData = {
      timestamp: new Date().toISOString(),
      results,
      summary: `AR/VR Developer Assessment Results - Overall Score: ${results.overallScore}%`
    };
    
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ar-vr-assessment-results.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Results downloaded!",
      description: "Your assessment results have been saved.",
    });
  };

  const handleRetakeAssessment = () => {
    localStorage.removeItem('assessmentResults');
    navigate('/assessment');
  };

  if (!results) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md mx-auto shadow-elevation animate-fade-in">
          <CardHeader>
            <CardTitle>Loading Results...</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Please wait while we process your assessment results.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => navigate('/')}
                className="hover:bg-secondary"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div>
                <h1 className="text-3xl font-bold">Your Assessment Results</h1>
                <p className="text-muted-foreground">AR/VR Developer Readiness Report</p>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleShare} className="gap-2">
                <Share2 className="h-4 w-4" />
                Share
              </Button>
              <Button variant="outline" onClick={handleDownload} className="gap-2">
                <Download className="h-4 w-4" />
                Download
              </Button>
              <Button onClick={handleRetakeAssessment} className="gradient-primary gap-2">
                Retake Assessment
              </Button>
            </div>
          </div>
        </div>

        {/* Results Content */}
        <ResultsChart results={results} />

        {/* Career Paths Section */}
        <Card className="mt-8 shadow-card">
          <CardHeader>
            <CardTitle>Potential Career Paths</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  title: "AR/VR Developer",
                  description: "Build immersive applications for gaming, education, or enterprise",
                  fit: results.overallScore >= 80 ? "high" : results.overallScore >= 60 ? "medium" : "low"
                },
                {
                  title: "3D Graphics Programmer", 
                  description: "Focus on rendering, shaders, and visual effects",
                  fit: results.technicalScore >= 70 ? "high" : results.technicalScore >= 50 ? "medium" : "low"
                },
                {
                  title: "UX Designer for AR/VR",
                  description: "Design intuitive immersive user experiences", 
                  fit: results.psychometricScore >= 70 ? "high" : results.psychometricScore >= 50 ? "medium" : "low"
                },
                {
                  title: "Simulation Engineer",
                  description: "Develop virtual training environments",
                  fit: results.wiscarScores.skill >= 70 ? "high" : results.wiscarScores.skill >= 50 ? "medium" : "low"
                },
                {
                  title: "Mixed Reality Specialist", 
                  description: "Integrate AR/VR with IoT and real-world data",
                  fit: results.technicalScore >= 75 ? "high" : results.technicalScore >= 55 ? "medium" : "low"
                },
                {
                  title: "AR/VR QA Tester",
                  description: "Ensure quality and usability of immersive experiences",
                  fit: results.psychometricScore >= 60 ? "high" : "medium"
                }
              ].map((career, index) => (
                <div key={index} className="p-4 border rounded-lg space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{career.title}</h3>
                    <span className={`text-xs px-2 py-1 rounded ${
                      career.fit === 'high' ? 'bg-success-emerald/20 text-success-emerald' :
                      career.fit === 'medium' ? 'bg-warning-amber/20 text-warning-amber' :
                      'bg-muted text-muted-foreground'
                    }`}>
                      {career.fit === 'high' ? 'High Fit' : career.fit === 'medium' ? 'Medium Fit' : 'Low Fit'}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{career.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-12 text-center text-muted-foreground">
          <p>Thank you for completing the AR/VR Developer Assessment!</p>
          <p className="text-sm mt-2">
            Results are based on current responses and may change as you develop your skills.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Results;