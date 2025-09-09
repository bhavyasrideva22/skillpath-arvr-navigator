import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Brain, Code, Target, Users, Zap, ArrowRight, Play } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Brain className="h-6 w-6" />,
      title: "Psychological Assessment",
      description: "Evaluate creativity, persistence, and cognitive fit for AR/VR development"
    },
    {
      icon: <Code className="h-6 w-6" />,
      title: "Technical Evaluation", 
      description: "Test programming knowledge, 3D math skills, and AR/VR fundamentals"
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "WISCAR Framework",
      description: "Comprehensive analysis of Will, Interest, Skill, Cognitive ability, and Real-world alignment"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Career Guidance",
      description: "Personalized recommendations for your AR/VR development journey"
    }
  ];

  const careers = [
    "AR/VR Developer",
    "3D Graphics Programmer", 
    "UX Designer for AR/VR",
    "Simulation Engineer",
    "Mixed Reality Specialist"
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="gradient-assessment absolute inset-0" />
        <div className="relative max-w-7xl mx-auto px-4 py-20 sm:py-32">
          <div className="text-center animate-fade-in">
            <Badge className="mb-4 bg-ar-purple/20 text-ar-purple border-ar-purple">
              <Zap className="w-3 h-3 mr-1" />
              AI-Powered Assessment
            </Badge>
            <h1 className="text-4xl sm:text-6xl font-bold mb-6">
              Are You Ready to Become an
              <span className="block gradient-primary bg-clip-text text-transparent">
                AR/VR Developer?
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Discover your potential in AR/VR development through our comprehensive assessment. 
              Get personalized insights, skill gap analysis, and career recommendations in just 20 minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                onClick={() => navigate('/assessment')}
                className="gradient-primary hover:opacity-90 transition-opacity text-lg px-8 py-6 shadow-glow animate-glow"
              >
                <Play className="w-5 h-5 mr-2" />
                Start Assessment
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <p className="text-sm text-muted-foreground">
                ⏱️ Takes 15-20 minutes • 🆓 Completely free
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 max-w-7xl mx-auto px-4">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-3xl font-bold mb-4">Comprehensive Assessment Framework</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our scientifically-backed assessment evaluates multiple dimensions to provide 
            accurate insights into your AR/VR development readiness.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="shadow-card hover:shadow-elevation transition-shadow animate-slide-up">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* What You'll Learn Section */}
      <section className="py-20 bg-secondary/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <h2 className="text-3xl font-bold mb-6">What You'll Discover</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-ar-purple rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Your Psychological Fit</h3>
                    <p className="text-muted-foreground">How well your personality and cognitive style align with AR/VR development</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-vr-blue rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Technical Readiness Level</h3>
                    <p className="text-muted-foreground">Assessment of your current programming and 3D development skills</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-tech-green rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Personalized Learning Path</h3>
                    <p className="text-muted-foreground">Tailored recommendations for courses, projects, and skill development</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-warning-amber rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">4</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Career Alignment</h3>
                    <p className="text-muted-foreground">Which AR/VR roles best match your strengths and interests</p>
                  </div>
                </div>
              </div>
            </div>
            
            <Card className="shadow-elevation animate-slide-up">
              <CardHeader>
                <CardTitle>Potential Career Paths</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {careers.map((career, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-gradient-assessment rounded-lg">
                      <div className="w-2 h-2 bg-ar-purple rounded-full" />
                      <span className="font-medium">{career}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-secondary rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <strong>Average Salary Range:</strong> $75,000 - $150,000+
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    <strong>Job Growth:</strong> 13% projected growth (2022-2032)
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto text-center px-4">
          <div className="animate-slide-up">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Take the first step towards your AR/VR development career. 
              Get instant results and actionable insights.
            </p>
            <Button 
              size="lg" 
              onClick={() => navigate('/assessment')}
              className="gradient-primary hover:opacity-90 transition-opacity text-lg px-8 py-6 shadow-glow"
            >
              <Play className="w-5 h-5 mr-2" />
              Begin Assessment Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <p className="text-sm text-muted-foreground mt-4">
              No registration required • Results available immediately
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
