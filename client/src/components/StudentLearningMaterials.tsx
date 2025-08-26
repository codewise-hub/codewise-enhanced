import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  BookOpen, 
  Play, 
  Code, 
  FileText, 
  Download, 
  CheckCircle, 
  Clock,
  Star,
  Award
} from "lucide-react";
import type { AgeGroup } from "@/types/user";

interface Course {
  id: string;
  title: string;
  description: string;
  ageGroup: AgeGroup;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  lessonsCount: number;
  completedLessons: number;
  thumbnail: string;
  lessons: Lesson[];
}

interface Lesson {
  id: string;
  title: string;
  type: 'video' | 'interactive' | 'coding' | 'quiz';
  duration: string;
  completed: boolean;
  content?: string;
  videoUrl?: string;
}

interface StudyMaterial {
  id: string;
  title: string;
  type: 'pdf' | 'doc' | 'presentation';
  size: string;
  downloadUrl: string;
  category: string;
}

interface StudentLearningMaterialsProps {
  ageGroup: AgeGroup;
}

export function StudentLearningMaterials({ ageGroup }: StudentLearningMaterialsProps) {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);

  // Original courses based on age group with embedded videos
  const mockCourses: Course[] = ageGroup === '6-11' ? [
    {
      id: 'scratch-programming',
      title: 'Scratch Programming',
      description: 'Create animations, stories, and simple games using drag-and-drop blocks',
      ageGroup: '6-11',
      difficulty: 'beginner',
      duration: '4 hours',
      lessonsCount: 6,
      completedLessons: 2,
      thumbnail: '🎨',
      lessons: [
        {
          id: 'scratch-1',
          title: 'Visual Lab Overview - How Blocks Work',
          type: 'video',
          duration: '15 min',
          completed: true,
          videoUrl: 'https://www.youtube.com/embed/jXUZaf5D12A'
        },
        {
          id: 'scratch-2',
          title: 'Creating Your First Animation',
          type: 'interactive',
          duration: '30 min',
          completed: true
        },
        {
          id: 'scratch-3',
          title: 'Interactive Stories and Games',
          type: 'coding',
          duration: '45 min',
          completed: false
        },
        {
          id: 'scratch-4',
          title: 'Adding Sounds and Effects',
          type: 'interactive',
          duration: '25 min',
          completed: false
        },
        {
          id: 'scratch-5',
          title: 'Sharing Your Projects',
          type: 'video',
          duration: '20 min',
          completed: false
        },
        {
          id: 'scratch-6',
          title: 'Final Project: Create Your Game',
          type: 'coding',
          duration: '60 min',
          completed: false
        }
      ]
    },
    {
      id: 'robotics-basics',
      title: 'Robotics Basics',
      description: 'Control virtual robots and learn basic programming logic',
      ageGroup: '6-11',
      difficulty: 'beginner',
      duration: '3 hours',
      lessonsCount: 5,
      completedLessons: 1,
      thumbnail: '🤖',
      lessons: [
        {
          id: 'robot-1',
          title: 'Micro:bit Introduction for Kids',
          type: 'video',
          duration: '12 min',
          completed: true,
          videoUrl: 'https://www.youtube.com/embed/u2u7UJSRuko'
        },
        {
          id: 'robot-2',
          title: 'micro:bit Coding Lab Tutorial',
          type: 'video',
          duration: '15 min',
          completed: false,
          videoUrl: 'https://www.youtube.com/embed/Wuza5WXiMkc'
        },
        {
          id: 'robot-3',
          title: 'Programming Robot Movements',
          type: 'interactive',
          duration: '35 min',
          completed: false
        },
        {
          id: 'robot-4',
          title: 'LED Patterns and Lights',
          type: 'coding',
          duration: '30 min',
          completed: false
        },
        {
          id: 'robot-5',
          title: 'Sensors and Detection',
          type: 'interactive',
          duration: '40 min',
          completed: false
        }
      ]
    },
    {
      id: 'digital-art-animation',
      title: 'Digital Art & Animation',
      description: 'Combine creativity with coding to make moving pictures',
      ageGroup: '6-11',
      difficulty: 'beginner',
      duration: '3.5 hours',
      lessonsCount: 5,
      completedLessons: 0,
      thumbnail: '🎬',
      lessons: [
        {
          id: 'art-1',
          title: 'Introduction to Digital Art',
          type: 'video',
          duration: '18 min',
          completed: false
        },
        {
          id: 'art-2',
          title: 'Drawing with Code',
          type: 'interactive',
          duration: '40 min',
          completed: false
        },
        {
          id: 'art-3',
          title: 'Animation Basics',
          type: 'coding',
          duration: '45 min',
          completed: false
        },
        {
          id: 'art-4',
          title: 'Creating Moving Characters',
          type: 'interactive',
          duration: '50 min',
          completed: false
        },
        {
          id: 'art-5',
          title: 'Final Animation Project',
          type: 'coding',
          duration: '60 min',
          completed: false
        }
      ]
    }
  ] : [
    {
      id: 'python-programming',
      title: 'Python Programming',
      description: 'Master one of the most popular programming languages used by professionals',
      ageGroup: '12-17',
      difficulty: 'beginner',
      duration: '8 hours',
      lessonsCount: 6,
      completedLessons: 2,
      thumbnail: '🐍',
      lessons: [
        {
          id: 'python-1',
          title: 'Python IDE and Code Editor Setup',
          type: 'video',
          duration: '20 min',
          completed: true,
          videoUrl: 'https://www.youtube.com/embed/VuKvR1J2LQE'
        },
        {
          id: 'python-2',
          title: 'Variables and Data Types',
          type: 'coding',
          duration: '45 min',
          completed: true
        },
        {
          id: 'python-3',
          title: 'Control Structures and Loops',
          type: 'coding',
          duration: '60 min',
          completed: false
        },
        {
          id: 'python-4',
          title: 'Functions and Modules',
          type: 'coding',
          duration: '50 min',
          completed: false
        },
        {
          id: 'python-5',
          title: 'Working with Files and Data',
          type: 'interactive',
          duration: '55 min',
          completed: false
        },
        {
          id: 'python-6',
          title: 'Final Project: Build Your App',
          type: 'coding',
          duration: '90 min',
          completed: false
        }
      ]
    },
    {
      id: 'web-development',
      title: 'Web Development',
      description: 'Create websites and web applications using HTML, CSS, and JavaScript',
      ageGroup: '12-17',
      difficulty: 'intermediate',
      duration: '10 hours',
      lessonsCount: 6,
      completedLessons: 1,
      thumbnail: '🌐',
      lessons: [
        {
          id: 'web-1',
          title: 'Building Your First Web Project',
          type: 'video',
          duration: '25 min',
          completed: true,
          videoUrl: 'https://www.youtube.com/embed/pQN-pnXPaVg'
        },
        {
          id: 'web-2',
          title: 'HTML Structure and Elements',
          type: 'coding',
          duration: '50 min',
          completed: false
        },
        {
          id: 'web-3',
          title: 'CSS Styling and Layouts',
          type: 'coding',
          duration: '60 min',
          completed: false
        },
        {
          id: 'web-4',
          title: 'JavaScript Interactivity',
          type: 'coding',
          duration: '75 min',
          completed: false
        },
        {
          id: 'web-5',
          title: 'Responsive Design',
          type: 'interactive',
          duration: '45 min',
          completed: false
        },
        {
          id: 'web-6',
          title: 'Portfolio Website Project',
          type: 'coding',
          duration: '120 min',
          completed: false
        }
      ]
    },
    {
      id: 'ai-prompt-engineering',
      title: 'Prompt Engineering & AI',
      description: 'Learn to work with AI tools like ChatGPT, Claude, and build AI-powered applications',
      ageGroup: '12-17',
      difficulty: 'intermediate',
      duration: '3 hours',
      lessonsCount: 4,
      completedLessons: 1,
      thumbnail: '🤖',
      lessons: [
        {
          id: 'ai-1',
          title: 'What is AI Prompt Engineering?',
          type: 'video',
          duration: '15 min',
          completed: true,
          videoUrl: 'https://www.youtube.com/embed/dOxUroR57xs'
        },
        {
          id: 'ai-2',
          title: 'Writing Effective Prompts',
          type: 'interactive',
          duration: '40 min',
          completed: false
        },
        {
          id: 'ai-3',
          title: 'AI Tools for Developers',
          type: 'coding',
          duration: '50 min',
          completed: false
        },
        {
          id: 'ai-4',
          title: 'Build an AI-Powered App',
          type: 'coding',
          duration: '75 min',
          completed: false
        }
      ]
    },
    {
      id: 'data-science-basics',
      title: 'Data Science Basics',
      description: 'Analyze data and create visualizations using Python libraries',
      ageGroup: '12-17',
      difficulty: 'intermediate',
      duration: '6 hours',
      lessonsCount: 5,
      completedLessons: 0,
      thumbnail: '📊',
      lessons: [
        {
          id: 'data-1',
          title: 'Introduction to Data Science',
          type: 'video',
          duration: '20 min',
          completed: false
        },
        {
          id: 'data-2',
          title: 'Working with Data in Python',
          type: 'coding',
          duration: '60 min',
          completed: false
        },
        {
          id: 'data-3',
          title: 'Data Visualization',
          type: 'interactive',
          duration: '50 min',
          completed: false
        },
        {
          id: 'data-4',
          title: 'Statistical Analysis',
          type: 'coding',
          duration: '70 min',
          completed: false
        },
        {
          id: 'data-5',
          title: 'Final Data Project',
          type: 'coding',
          duration: '90 min',
          completed: false
        }
      ]
    }
  ];

  const mockStudyMaterials: StudyMaterial[] = ageGroup === '6-11' ? [
    {
      id: 'scratch-guide',
      title: 'Scratch Programming Guide',
      type: 'pdf',
      size: '2.3 MB',
      downloadUrl: '#',
      category: 'Programming'
    },
    {
      id: 'robotics-handbook',
      title: 'Kids Robotics Handbook',
      type: 'pdf',
      size: '1.8 MB',
      downloadUrl: '#',
      category: 'Robotics'
    },
    {
      id: 'coding-games',
      title: 'Fun Coding Games',
      type: 'presentation',
      size: '4.2 MB',
      downloadUrl: '#',
      category: 'Games'
    }
  ] : [
    {
      id: 'python-reference',
      title: 'Python Reference Guide',
      type: 'pdf',
      size: '3.1 MB',
      downloadUrl: '#',
      category: 'Programming'
    },
    {
      id: 'web-dev-cheatsheet',
      title: 'Web Development Cheat Sheet',
      type: 'pdf',
      size: '1.5 MB',
      downloadUrl: '#',
      category: 'Web Development'
    },
    {
      id: 'algorithms-guide',
      title: 'Algorithms and Data Structures',
      type: 'doc',
      size: '2.8 MB',
      downloadUrl: '#',
      category: 'Computer Science'
    }
  ];

  const { data: courses } = useQuery({
    queryKey: ['/api/courses', ageGroup],
    queryFn: async () => mockCourses
  });

  const { data: studyMaterials } = useQuery({
    queryKey: ['/api/study-materials', ageGroup],
    queryFn: async () => mockStudyMaterials
  });

  const getLessonIcon = (type: string) => {
    switch (type) {
      case 'video': return <Play className="h-4 w-4" />;
      case 'interactive': return <BookOpen className="h-4 w-4" />;
      case 'coding': return <Code className="h-4 w-4" />;
      case 'quiz': return <FileText className="h-4 w-4" />;
      default: return <BookOpen className="h-4 w-4" />;
    }
  };

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
      <div className="space-y-6">
        {/* Course Header */}
        <div className="flex items-center justify-between">
          <Button 
            variant="outline" 
            onClick={() => setSelectedCourse(null)}
            data-testid="button-back-to-courses"
          >
            ← Back to Courses
          </Button>
          <Badge className={getDifficultyColor(selectedCourse.difficulty)}>
            {selectedCourse.difficulty}
          </Badge>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-2xl mb-2">{selectedCourse.title}</CardTitle>
                <CardDescription className="text-base mb-4">
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
                  <span className="flex items-center">
                    <Award className="h-4 w-4 mr-1" />
                    {selectedCourse.completedLessons}/{selectedCourse.lessonsCount} completed
                  </span>
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
            <div className="space-y-3">
              <h3 className="text-lg font-semibold mb-4">Course Lessons</h3>
              {selectedCourse.lessons.map((lesson, index) => (
                <div
                  key={lesson.id}
                  className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-colors ${
                    lesson.completed ? 'bg-green-50 border-green-200' : 'hover:bg-gray-50'
                  } ${activeLesson?.id === lesson.id ? 'ring-2 ring-blue-500' : ''}`}
                  onClick={() => setActiveLesson(lesson)}
                  data-testid={`lesson-${lesson.id}`}
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100">
                      <span className="text-sm font-semibold">{index + 1}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getLessonIcon(lesson.type)}
                      <div>
                        <h4 className="font-medium">{lesson.title}</h4>
                        <p className="text-sm text-gray-600">{lesson.duration}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">{lesson.type}</Badge>
                    {lesson.completed && (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Active Lesson Display */}
        {activeLesson && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                {getLessonIcon(activeLesson.type)}
                <span>{activeLesson.title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {(activeLesson as any).videoUrl && (
                <div className="aspect-video bg-gray-100 rounded-lg mb-4 overflow-hidden">
                  <iframe
                    src={(activeLesson as any).videoUrl}
                    className="w-full h-full"
                    allowFullScreen
                    title={activeLesson.title}
                  />
                </div>
              )}
              
              {!(activeLesson as any).videoUrl && (
                <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                  <div className="text-center">
                    <Play className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600">Interactive lesson content</p>
                    <p className="text-sm text-gray-500">Duration: {activeLesson.duration}</p>
                  </div>
                </div>
              )}
              
              <div className="flex justify-between">
                <Button 
                  variant="outline" 
                  onClick={() => setActiveLesson(null)}
                >
                  Back to Course
                </Button>
                <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                  {(activeLesson as any).videoUrl ? 'Mark as Watched' : 
                   activeLesson.type === 'coding' ? 'Start Coding' :
                   activeLesson.type === 'quiz' ? 'Take Quiz' : 'Start Lesson'}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Learning Materials</h2>
        <p className="text-gray-600">
          Explore courses and study materials designed for {ageGroup === '6-11' ? 'Little Coders' : 'Teen Coders'}
        </p>
      </div>

      <Tabs defaultValue="courses" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="courses" data-testid="tab-courses">My Courses</TabsTrigger>
          <TabsTrigger value="materials" data-testid="tab-materials">Study Materials</TabsTrigger>
        </TabsList>

        <TabsContent value="courses" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses?.map((course) => (
              <Card 
                key={course.id} 
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => setSelectedCourse(course)}
                data-testid={`course-${course.id}`}
              >
                <CardHeader>
                  <div className="aspect-video bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg mb-4 flex items-center justify-center">
                    <BookOpen className="h-12 w-12 text-white" />
                  </div>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-2">{course.title}</CardTitle>
                      <CardDescription>{course.description}</CardDescription>
                    </div>
                    <Badge className={getDifficultyColor(course.difficulty)}>
                      {course.difficulty}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {course.duration}
                      </span>
                      <span>{course.lessonsCount} lessons</span>
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span>Progress</span>
                        <span>{course.completedLessons}/{course.lessonsCount}</span>
                      </div>
                      <Progress 
                        value={(course.completedLessons / course.lessonsCount) * 100}
                        className="h-2"
                      />
                    </div>
                    
                    <Button className="w-full">
                      {course.completedLessons === 0 ? 'Start Course' : 'Continue Learning'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="materials" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {studyMaterials?.map((material) => (
              <Card key={material.id} data-testid={`material-${material.id}`}>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <FileText className="h-6 w-6 text-blue-600" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 truncate">{material.title}</h3>
                      <div className="mt-1 flex items-center space-x-2">
                        <Badge variant="outline">{material.category}</Badge>
                        <span className="text-sm text-gray-500">{material.size}</span>
                      </div>
                      <Button 
                        size="sm" 
                        className="mt-3"
                        onClick={() => {
                          if (material.downloadUrl === '#') {
                            alert('This is a demo material. In the full version, this would download the actual file.');
                            return;
                          }
                          window.open(material.downloadUrl, '_blank');
                        }}
                        data-testid={`download-${material.id}`}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}