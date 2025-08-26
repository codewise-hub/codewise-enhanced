import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  BookOpen, 
  Play, 
  Clock,
  Star,
  Award,
  ChevronRight
} from "lucide-react";

interface Course {
  id: string;
  title: string;
  description: string;
  ageGroup: '6-11' | '12-17';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  lessonsCount: number;
  completedLessons: number;
  thumbnail: string;
  videoUrl?: string;
}

interface CoursesPageProps {
  ageGroup: '6-11' | '12-17';
}

export function CoursesPage({ ageGroup }: CoursesPageProps) {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  // Courses data matching the reference site
  const courses: Course[] = ageGroup === '6-11' ? [
    {
      id: 'scratch-programming',
      title: 'Scratch Programming',
      description: 'Create animations, stories, and simple games using drag-and-drop blocks. Perfect for young minds to learn programming logic through visual coding.',
      ageGroup: '6-11',
      difficulty: 'beginner',
      duration: '4 hours',
      lessonsCount: 6,
      completedLessons: 2,
      thumbnail: '🎨',
      videoUrl: 'https://www.youtube.com/embed/jXUZaf5D12A'
    },
    {
      id: 'block-based-coding',
      title: 'Block-Based Coding',
      description: 'Learn fundamental programming concepts using colorful blocks. Build interactive stories and simple animations.',
      ageGroup: '6-11',
      difficulty: 'beginner',
      duration: '3 hours',
      lessonsCount: 5,
      completedLessons: 1,
      thumbnail: '🧩',
      videoUrl: 'https://www.youtube.com/embed/jXUZaf5D12A'
    },
    {
      id: 'robotics-basics',
      title: 'Robotics Basics',
      description: 'Introduction to robotics with micro:bit. Learn to control LEDs, sensors, and make your robot move.',
      ageGroup: '6-11',
      difficulty: 'beginner',
      duration: '5 hours',
      lessonsCount: 8,
      completedLessons: 0,
      thumbnail: '🤖',
      videoUrl: 'https://www.youtube.com/embed/jXUZaf5D12A'
    }
  ] : [
    {
      id: 'python-programming',
      title: 'Python Programming',
      description: 'Learn Python from basics to advanced concepts. Build real-world applications and games.',
      ageGroup: '12-17',
      difficulty: 'intermediate',
      duration: '8 hours',
      lessonsCount: 12,
      completedLessons: 3,
      thumbnail: '🐍',
      videoUrl: 'https://www.youtube.com/embed/jXUZaf5D12A'
    },
    {
      id: 'web-development',
      title: 'Web Development',
      description: 'Create stunning websites using HTML, CSS, and JavaScript. Build your own portfolio site.',
      ageGroup: '12-17',
      difficulty: 'intermediate',
      duration: '10 hours',
      lessonsCount: 15,
      completedLessons: 5,
      thumbnail: '🌐',
      videoUrl: 'https://www.youtube.com/embed/jXUZaf5D12A'
    },
    {
      id: 'ai-prompt-engineering',
      title: 'AI & Prompt Engineering',
      description: 'Master the art of communicating with AI. Learn prompt engineering techniques and build AI-powered applications.',
      ageGroup: '12-17',
      difficulty: 'advanced',
      duration: '6 hours',
      lessonsCount: 10,
      completedLessons: 2,
      thumbnail: '🤖',
      videoUrl: 'https://www.youtube.com/embed/dOxUroR57xs'
    },
    {
      id: 'advanced-robotics',
      title: 'Advanced Robotics',
      description: 'Build complex robots with sensors, motors, and advanced programming. Create autonomous robots.',
      ageGroup: '12-17',
      difficulty: 'advanced',
      duration: '12 hours',
      lessonsCount: 18,
      completedLessons: 0,
      thumbnail: '🔧',
      videoUrl: 'https://www.youtube.com/embed/jXUZaf5D12A'
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (selectedCourse) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <Button 
            variant="outline" 
            onClick={() => setSelectedCourse(null)}
            className="mb-6"
            data-testid="button-back-to-courses"
          >
            ← Back to Courses
          </Button>

          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-3xl mb-2">{selectedCourse.title}</CardTitle>
                  <CardDescription className="text-lg mb-4">
                    {selectedCourse.description}
                  </CardDescription>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {selectedCourse.duration}
                    </span>
                    <span className="flex items-center">
                      <BookOpen className="h-4 w-4 mr-1" />
                      {selectedCourse.lessonsCount} lessons
                    </span>
                    <Badge className={getDifficultyColor(selectedCourse.difficulty)}>
                      {selectedCourse.difficulty}
                    </Badge>
                  </div>
                </div>
                <div className="ml-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {Math.round((selectedCourse.completedLessons / selectedCourse.lessonsCount) * 100)}%
                    </div>
                    <div className="text-sm text-gray-600">Complete</div>
                    <Progress 
                      value={(selectedCourse.completedLessons / selectedCourse.lessonsCount) * 100} 
                      className="w-24 mt-2"
                    />
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {selectedCourse.videoUrl && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3">Course Preview</h3>
                  <div className="aspect-video rounded-lg overflow-hidden">
                    <iframe
                      src={selectedCourse.videoUrl}
                      title={`${selectedCourse.title} Preview`}
                      className="w-full h-full"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              )}
              
              <div className="flex space-x-4">
                <Button className="flex-1" data-testid="button-start-course">
                  <Play className="h-4 w-4 mr-2" />
                  Start Course
                </Button>
                <Button variant="outline" data-testid="button-view-syllabus">
                  <BookOpen className="h-4 w-4 mr-2" />
                  View Syllabus
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {ageGroup === '6-11' ? 'Young Coders Courses' : 'Teen Coders Courses'}
          </h1>
          <p className="text-xl text-gray-600">
            {ageGroup === '6-11' 
              ? 'Fun and interactive coding courses designed for young minds (ages 6-11)'
              : 'Advanced programming courses for teenagers (ages 12-17)'
            }
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Card 
              key={course.id} 
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => setSelectedCourse(course)}
              data-testid={`course-card-${course.id}`}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="text-4xl mb-2">{course.thumbnail}</div>
                  <Badge className={getDifficultyColor(course.difficulty)}>
                    {course.difficulty}
                  </Badge>
                </div>
                <CardTitle className="text-xl">{course.title}</CardTitle>
                <CardDescription className="text-sm">
                  {course.description.substring(0, 100)}...
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {course.duration}
                    </span>
                    <span className="flex items-center">
                      <BookOpen className="h-4 w-4 mr-1" />
                      {course.lessonsCount} lessons
                    </span>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{course.completedLessons}/{course.lessonsCount}</span>
                    </div>
                    <Progress value={(course.completedLessons / course.lessonsCount) * 100} />
                  </div>
                  
                  <Button className="w-full" variant="outline">
                    Learn More
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}