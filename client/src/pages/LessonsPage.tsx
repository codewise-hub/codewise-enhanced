import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  BookOpen, 
  Play, 
  Code, 
  FileText, 
  CheckCircle, 
  Clock,
  Star,
  Video
} from "lucide-react";

interface Lesson {
  id: string;
  title: string;
  type: 'video' | 'interactive' | 'coding' | 'quiz';
  duration: string;
  completed: boolean;
  content?: string;
  videoUrl?: string;
  courseTitle: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

interface LessonsPageProps {
  ageGroup: '6-11' | '12-17';
}

export function LessonsPage({ ageGroup }: LessonsPageProps) {
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

  // Sample lessons data
  const lessons: Lesson[] = ageGroup === '6-11' ? [
    {
      id: 'scratch-intro',
      title: 'Introduction to Scratch',
      type: 'video',
      duration: '15 min',
      completed: true,
      courseTitle: 'Scratch Programming',
      difficulty: 'beginner',
      videoUrl: 'https://www.youtube.com/embed/jXUZaf5D12A'
    },
    {
      id: 'first-animation',
      title: 'Creating Your First Animation',
      type: 'interactive',
      duration: '20 min',
      completed: true,
      courseTitle: 'Scratch Programming',
      difficulty: 'beginner'
    },
    {
      id: 'sprite-movement',
      title: 'Making Sprites Move',
      type: 'coding',
      duration: '25 min',
      completed: false,
      courseTitle: 'Scratch Programming',
      difficulty: 'beginner'
    },
    {
      id: 'simple-game',
      title: 'Building a Simple Game',
      type: 'interactive',
      duration: '30 min',
      completed: false,
      courseTitle: 'Block-Based Coding',
      difficulty: 'beginner'
    },
    {
      id: 'microbit-intro',
      title: 'Introduction to micro:bit',
      type: 'video',
      duration: '18 min',
      completed: false,
      courseTitle: 'Robotics Basics',
      difficulty: 'beginner',
      videoUrl: 'https://www.youtube.com/embed/jXUZaf5D12A'
    }
  ] : [
    {
      id: 'python-basics',
      title: 'Python Fundamentals',
      type: 'video',
      duration: '25 min',
      completed: true,
      courseTitle: 'Python Programming',
      difficulty: 'intermediate',
      videoUrl: 'https://www.youtube.com/embed/jXUZaf5D12A'
    },
    {
      id: 'data-structures',
      title: 'Data Structures in Python',
      type: 'coding',
      duration: '35 min',
      completed: true,
      courseTitle: 'Python Programming',
      difficulty: 'intermediate'
    },
    {
      id: 'web-basics',
      title: 'HTML & CSS Basics',
      type: 'coding',
      duration: '40 min',
      completed: false,
      courseTitle: 'Web Development',
      difficulty: 'intermediate'
    },
    {
      id: 'javascript-intro',
      title: 'Introduction to JavaScript',
      type: 'video',
      duration: '30 min',
      completed: false,
      courseTitle: 'Web Development',
      difficulty: 'intermediate',
      videoUrl: 'https://www.youtube.com/embed/jXUZaf5D12A'
    },
    {
      id: 'prompt-engineering',
      title: 'AI Prompt Engineering Basics',
      type: 'video',
      duration: '20 min',
      completed: false,
      courseTitle: 'AI & Prompt Engineering',
      difficulty: 'advanced',
      videoUrl: 'https://www.youtube.com/embed/dOxUroR57xs'
    }
  ];

  const getLessonIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="h-5 w-5 text-red-500" />;
      case 'interactive': return <Play className="h-5 w-5 text-blue-500" />;
      case 'coding': return <Code className="h-5 w-5 text-green-500" />;
      case 'quiz': return <FileText className="h-5 w-5 text-purple-500" />;
      default: return <BookOpen className="h-5 w-5 text-gray-500" />;
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

  const completedLessons = lessons.filter(lesson => lesson.completed).length;
  const progressPercentage = (completedLessons / lessons.length) * 100;

  if (selectedLesson) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <Button 
            variant="outline" 
            onClick={() => setSelectedLesson(null)}
            className="mb-6"
            data-testid="button-back-to-lessons"
          >
            ← Back to Lessons
          </Button>

          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2 mb-2">
                {getLessonIcon(selectedLesson.type)}
                <Badge className={getDifficultyColor(selectedLesson.difficulty)}>
                  {selectedLesson.difficulty}
                </Badge>
                <Badge variant="outline">{selectedLesson.type}</Badge>
              </div>
              <CardTitle className="text-3xl">{selectedLesson.title}</CardTitle>
              <CardDescription className="text-lg">
                Course: {selectedLesson.courseTitle} • Duration: {selectedLesson.duration}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {selectedLesson.videoUrl && (
                <div className="mb-6">
                  <div className="aspect-video rounded-lg overflow-hidden bg-gray-100">
                    <iframe
                      src={selectedLesson.videoUrl}
                      title={selectedLesson.title}
                      className="w-full h-full"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              )}

              {selectedLesson.type === 'coding' && (
                <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-6">
                  <div className="mb-2 text-gray-400"># Sample Code for {selectedLesson.title}</div>
                  {ageGroup === '6-11' ? (
                    <div>
                      <div className="text-blue-300">when flag clicked</div>
                      <div className="ml-4">move 10 steps</div>
                      <div className="ml-4">turn 15 degrees</div>
                      <div className="ml-4">say "Hello!" for 2 seconds</div>
                    </div>
                  ) : (
                    <div>
                      <div className="text-blue-300">def</div> <span className="text-yellow-300">hello_world</span>():
                      <div className="ml-4"><span className="text-blue-300">print</span>(<span className="text-green-300">"Hello, World!"</span>)</div>
                      <div className="mt-2">hello_world()</div>
                    </div>
                  )}
                </div>
              )}

              <div className="flex space-x-4">
                <Button className="flex-1" data-testid="button-start-lesson">
                  <Play className="h-4 w-4 mr-2" />
                  {selectedLesson.completed ? 'Review Lesson' : 'Start Lesson'}
                </Button>
                {!selectedLesson.completed && (
                  <Button variant="outline" data-testid="button-mark-complete">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Mark Complete
                  </Button>
                )}
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
            {ageGroup === '6-11' ? 'Young Coders Lessons' : 'Teen Coders Lessons'}
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            {ageGroup === '6-11' 
              ? 'Interactive lessons to build foundational coding skills'
              : 'Advanced lessons to master programming concepts'
            }
          </p>
          
          <Card className="max-w-md mx-auto mb-8">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {Math.round(progressPercentage)}%
                </div>
                <div className="text-sm text-gray-600 mb-3">Overall Progress</div>
                <Progress value={progressPercentage} className="w-full" />
                <div className="text-sm text-gray-500 mt-2">
                  {completedLessons} of {lessons.length} lessons completed
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lessons.map((lesson, index) => (
            <Card 
              key={lesson.id} 
              className={`cursor-pointer hover:shadow-lg transition-shadow ${
                lesson.completed ? 'bg-green-50 border-green-200' : ''
              }`}
              onClick={() => setSelectedLesson(lesson)}
              data-testid={`lesson-card-${lesson.id}`}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-sm font-semibold">
                      {index + 1}
                    </div>
                    {getLessonIcon(lesson.type)}
                  </div>
                  <div className="flex flex-col items-end space-y-1">
                    {lesson.completed && (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    )}
                    <Badge className={getDifficultyColor(lesson.difficulty)}>
                      {lesson.difficulty}
                    </Badge>
                  </div>
                </div>
                <CardTitle className="text-lg">{lesson.title}</CardTitle>
                <CardDescription>
                  <div className="flex items-center space-x-2 text-sm">
                    <span>{lesson.courseTitle}</span>
                    <span>•</span>
                    <span className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {lesson.duration}
                    </span>
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <Badge variant="outline">{lesson.type}</Badge>
                  <Button variant="ghost" size="sm">
                    {lesson.completed ? 'Review' : 'Start'}
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