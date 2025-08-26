import { useState } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookOpen, 
  Play, 
  FileText, 
  Trophy,
  ArrowLeft,
  GraduationCap
} from "lucide-react";

interface LearningDashboardPageProps {
  ageGroup: '6-11' | '12-17';
}

export function LearningDashboardPage({ ageGroup }: LearningDashboardPageProps) {
  const [, setLocation] = useLocation();

  const learningOptions = [
    {
      id: 'courses',
      title: 'Courses',
      description: ageGroup === '6-11' 
        ? 'Visual programming courses designed for young minds'
        : 'Advanced programming courses for teen developers',
      icon: <BookOpen className="h-8 w-8" />,
      path: `/courses/${ageGroup}`,
      color: 'text-blue-500'
    },
    {
      id: 'lessons',
      title: 'Lessons',
      description: ageGroup === '6-11'
        ? 'Interactive lessons with fun activities'
        : 'Structured lessons to build coding skills',
      icon: <Play className="h-8 w-8" />,
      path: `/lessons/${ageGroup}`,
      color: 'text-green-500'
    },
    {
      id: 'study-materials',
      title: 'Study Materials',
      description: 'Downloadable guides and resources',
      icon: <FileText className="h-8 w-8" />,
      path: `/study-materials/${ageGroup}`,
      color: 'text-purple-500'
    },
    {
      id: 'competitions',
      title: 'Competitions',
      description: 'Coding challenges and contests',
      icon: <Trophy className="h-8 w-8" />,
      path: `/competitions/${ageGroup}`,
      color: 'text-orange-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button 
            variant="outline" 
            onClick={() => setLocation('/')}
            className="mr-4"
            data-testid="button-back-home"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              {ageGroup === '6-11' ? 'Young Coders Learning' : 'Teen Coders Learning'}
            </h1>
            <p className="text-xl text-gray-600">
              {ageGroup === '6-11' 
                ? 'Choose your learning adventure (Ages 6-11)'
                : 'Select your learning path (Ages 12-17)'
              }
            </p>
          </div>
        </div>

        {/* Learning Options Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {learningOptions.map((option) => (
            <Card 
              key={option.id}
              className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105"
              onClick={() => setLocation(option.path)}
              data-testid={`card-${option.id}`}
            >
              <CardHeader className="text-center">
                <div className={`${option.color} mb-4 flex justify-center`}>
                  {option.icon}
                </div>
                <CardTitle className="text-xl">{option.title}</CardTitle>
                <CardDescription className="text-sm">
                  {option.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  className="w-full" 
                  variant="outline"
                  data-testid={`button-${option.id}`}
                >
                  Start Learning
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {ageGroup === '6-11' ? '15+' : '25+'}
              </div>
              <div className="text-gray-600">Courses Available</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {ageGroup === '6-11' ? '100+' : '200+'}
              </div>
              <div className="text-gray-600">Interactive Lessons</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {ageGroup === '6-11' ? '50+' : '75+'}
              </div>
              <div className="text-gray-600">Study Materials</div>
            </CardContent>
          </Card>
        </div>

        {/* Age Group Features */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            {ageGroup === '6-11' ? 'Young Coders Features' : 'Teen Coders Features'}
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ageGroup === '6-11' ? (
              <>
                <div className="text-center">
                  <div className="text-4xl mb-3">🧩</div>
                  <h3 className="font-semibold mb-2">Visual Programming</h3>
                  <p className="text-sm text-gray-600">Drag-and-drop coding blocks</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-3">🎮</div>
                  <h3 className="font-semibold mb-2">Game Creation</h3>
                  <p className="text-sm text-gray-600">Build fun interactive games</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-3">🤖</div>
                  <h3 className="font-semibold mb-2">Robotics</h3>
                  <p className="text-sm text-gray-600">Control robots with code</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-3">🎨</div>
                  <h3 className="font-semibold mb-2">Creative Projects</h3>
                  <p className="text-sm text-gray-600">Art and animation coding</p>
                </div>
              </>
            ) : (
              <>
                <div className="text-center">
                  <div className="text-4xl mb-3">🐍</div>
                  <h3 className="font-semibold mb-2">Python Programming</h3>
                  <p className="text-sm text-gray-600">Industry-standard language</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-3">🌐</div>
                  <h3 className="font-semibold mb-2">Web Development</h3>
                  <p className="text-sm text-gray-600">Build modern websites</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-3">🤖</div>
                  <h3 className="font-semibold mb-2">AI & Machine Learning</h3>
                  <p className="text-sm text-gray-600">Future tech skills</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-3">📱</div>
                  <h3 className="font-semibold mb-2">App Development</h3>
                  <p className="text-sm text-gray-600">Mobile app creation</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}