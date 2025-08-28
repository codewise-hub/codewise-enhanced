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

        {/* Preview Videos Section */}
        <div className="grid gap-8 mb-12">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {ageGroup === '6-11' ? 'What You\'ll Learn - Quick Preview!' : 'Your Learning Journey - Preview'}
            </h2>
            <p className="text-gray-600 mb-8">
              Watch these short videos to see what awaits you. Sign up to access full courses and materials!
            </p>
          </div>

          {ageGroup === '6-11' ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Scratch Programming */}
              <Card className="overflow-hidden">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    🧩 Scratch Programming
                  </CardTitle>
                  <CardDescription>Create fun animations with drag-and-drop blocks</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video mb-4">
                    <iframe
                      width="100%"
                      height="100%"
                      src="https://www.youtube.com/embed/jXUZaf5D12A"
                      title="Scratch Programming - What You'll Learn"
                      frameBorder="0"
                      allowFullScreen
                      className="rounded-lg"
                    />
                  </div>
                  <p className="text-sm text-gray-600">Learn visual programming with colorful drag-and-drop blocks to create games and animations</p>
                </CardContent>
              </Card>

              {/* Advanced Robotics */}
              <Card className="overflow-hidden">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    🤖 Advanced Robotics
                  </CardTitle>
                  <CardDescription>Build smart robots with sensors and motors</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video mb-4">
                    <iframe
                      width="100%"
                      height="100%"
                      src="https://www.youtube.com/embed/HCl-dLTaYsY"
                      title="Advanced Robotics - Introduction for Kids"
                      frameBorder="0"
                      allowFullScreen
                      className="rounded-lg"
                    />
                  </div>
                  <p className="text-sm text-gray-600">Introduction to advanced robotics concepts for young learners</p>
                </CardContent>
              </Card>

              {/* Device Connection */}
              <Card className="overflow-hidden">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    🔌 Connect Your Device
                  </CardTitle>
                  <CardDescription>Easy setup for micro:bit and sensors</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video mb-4">
                    <iframe
                      width="100%"
                      height="100%"
                      src="https://www.youtube.com/embed/u2u7UJSRuko"
                      title="Device Connection - What You'll Learn"
                      frameBorder="0"
                      allowFullScreen
                      className="rounded-lg"
                    />
                  </div>
                  <p className="text-sm text-gray-600">Learn how to connect and set up your micro:bit and sensors for coding projects</p>
                </CardContent>
              </Card>

              {/* Embedded IDE */}
              <Card className="overflow-hidden">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    💻 Coding Environment
                  </CardTitle>
                  <CardDescription>Professional coding tools made simple</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video mb-4">
                    <iframe
                      width="100%"
                      height="100%"
                      src="https://www.youtube.com/embed/YE7VzlLtp-4"
                      title="Coding Environment - What You'll Learn"
                      frameBorder="0"
                      allowFullScreen
                      className="rounded-lg"
                    />
                  </div>
                  <p className="text-sm text-gray-600">Use our kid-friendly coding environment with helpful hints and colorful interface</p>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Python Programming */}
              <Card className="overflow-hidden">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    🐍 Python Programming
                  </CardTitle>
                  <CardDescription>Master the world's most popular programming language</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video mb-4">
                    <iframe
                      width="100%"
                      height="100%"
                      src="https://www.youtube.com/embed/kf79hJPHq0s"
                      title="Python Programming - 1 Minute Intro"
                      frameBorder="0"
                      allowFullScreen
                      className="rounded-lg"
                    />
                  </div>
                  <p className="text-sm text-gray-600">Quick 1-minute introduction to Python programming fundamentals</p>
                </CardContent>
              </Card>

              {/* Web Development */}
              <Card className="overflow-hidden">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    🌐 Web Development
                  </CardTitle>
                  <CardDescription>Build modern websites and web applications</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video mb-4">
                    <iframe
                      width="100%"
                      height="100%"
                      src="https://www.youtube.com/embed/UB1O30fR-EE"
                      title="Web Development - 1 Minute Intro"
                      frameBorder="0"
                      allowFullScreen
                      className="rounded-lg"
                    />
                  </div>
                  <p className="text-sm text-gray-600">Quick 1-minute overview of web development basics</p>
                </CardContent>
              </Card>

              {/* Professional IDE */}
              <Card className="overflow-hidden">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    💻 Professional IDE
                  </CardTitle>
                  <CardDescription>Code like a professional developer</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video mb-4">
                    <iframe
                      width="100%"
                      height="100%"
                      src="https://www.youtube.com/embed/yJw0SyKO9IU"
                      title="Professional IDE - 1 Minute Intro"
                      frameBorder="0"
                      allowFullScreen
                      className="rounded-lg"
                    />
                  </div>
                  <p className="text-sm text-gray-600">Quick 1-minute intro to professional coding tools</p>
                </CardContent>
              </Card>

              {/* Prompt Engineering */}
              <Card className="overflow-hidden">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    🧠 AI & Prompt Engineering
                  </CardTitle>
                  <CardDescription>Work with artificial intelligence systems</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video mb-4">
                    <iframe
                      width="100%"
                      height="100%"
                      src="https://www.youtube.com/embed/dOxUroR57xs"
                      title="AI & Prompt Engineering - Brief Explanation"
                      frameBorder="0"
                      allowFullScreen
                      className="rounded-lg"
                    />
                  </div>
                  <p className="text-sm text-gray-600">Brief explanation of AI and prompt engineering concepts</p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        {/* Sign Up Call-to-Action */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white text-center mb-8">
          <h3 className="text-2xl font-bold mb-4">Ready to Start Your Coding Journey?</h3>
          <p className="text-lg mb-6 opacity-90">
            Sign up now to access full courses, study materials, and start building amazing projects!
          </p>
          <Button 
            size="lg" 
            className="bg-yellow-400 text-purple-800 hover:bg-yellow-300 font-bold"
            onClick={() => window.location.href = `/?signup=${ageGroup}`}
          >
            Sign Up Now - FREE!
          </Button>
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