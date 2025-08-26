import { Button } from "@/components/ui/button";
import { ArrowLeft, Play, Clock, Star, Users } from "lucide-react";

interface CourseExplanationPageProps {
  ageGroup: '6-11' | '12-17';
  onBack: () => void;
}

export function CourseExplanationPage({ ageGroup, onBack }: CourseExplanationPageProps) {
  const isLittleCoder = ageGroup === '6-11';

  const courses = isLittleCoder ? [
    {
      id: 1,
      title: "Visual Programming Basics",
      description: "Learn coding with colorful drag-and-drop blocks! Perfect for beginners.",
      duration: "4 weeks",
      lessons: 12,
      difficulty: "Beginner",
      videoUrl: "https://www.youtube.com/embed/OAx_6-wdslM",
      features: [
        "Drag & drop programming blocks",
        "Fun animations and games",
        "Interactive storytelling",
        "Character movement and control"
      ]
    },
    {
      id: 2,
      title: "Game Creation Fun",
      description: "Build your first games! Create characters, add sounds, and make them move.",
      duration: "6 weeks",
      lessons: 18,
      difficulty: "Beginner",
      videoUrl: "https://www.youtube.com/embed/jbAguTlPDTw",
      features: [
        "Character design and animation",
        "Sound effects and music",
        "Game mechanics and rules",
        "Publishing your games"
      ]
    },
    {
      id: 3,
      title: "Micro:bit Adventures",
      description: "Program real devices! Make LEDs blink, sensors work, and build cool projects.",
      duration: "5 weeks",
      lessons: 15,
      difficulty: "Intermediate",
      videoUrl: "https://www.youtube.com/embed/u2u7UJSRuko",
      features: [
        "LED patterns and displays",
        "Button and sensor programming",
        "Music and sound creation",
        "Interactive project building"
      ]
    },
    {
      id: 4,
      title: "Creative Coding",
      description: "Express your creativity through code! Make digital art, animations, and interactive stories.",
      duration: "4 weeks",
      lessons: 12,
      difficulty: "Beginner",
      videoUrl: "https://www.youtube.com/embed/vRdZa7jQd5w",
      features: [
        "Digital art creation",
        "Animation techniques",
        "Interactive storytelling",
        "Creative project showcase"
      ]
    }
  ] : [
    {
      id: 1,
      title: "Python Programming",
      description: "Master one of the world's most popular programming languages. From basics to advanced concepts.",
      duration: "8 weeks",
      lessons: 24,
      difficulty: "Beginner to Advanced",
      videoUrl: "https://www.youtube.com/embed/_uQrJ0TkZlc",
      features: [
        "Python syntax and fundamentals",
        "Data structures and algorithms",
        "Object-oriented programming",
        "Real-world project development"
      ]
    },
    {
      id: 2,
      title: "Web Development",
      description: "Build modern websites and web applications using HTML, CSS, and JavaScript.",
      duration: "10 weeks",
      lessons: 30,
      difficulty: "Intermediate",
      videoUrl: "https://www.youtube.com/embed/qz0aGYrrlhU",
      features: [
        "HTML structure and semantics",
        "CSS styling and responsive design",
        "JavaScript interactivity",
        "Modern web frameworks"
      ]
    },
    {
      id: 3,
      title: "AI & Machine Learning",
      description: "Explore artificial intelligence and machine learning concepts with hands-on projects.",
      duration: "6 weeks",
      lessons: 18,
      difficulty: "Advanced",
      videoUrl: "https://www.youtube.com/embed/dOxUroR57xs",
      features: [
        "AI fundamentals and concepts",
        "Machine learning algorithms",
        "Data analysis and visualization",
        "Building AI applications"
      ]
    },
    {
      id: 4,
      title: "Data Science",
      description: "Learn to analyze data, create visualizations, and extract insights from information.",
      duration: "7 weeks",
      lessons: 21,
      difficulty: "Intermediate",
      videoUrl: "https://www.youtube.com/embed/ua-CiDNNj30",
      features: [
        "Data collection and cleaning",
        "Statistical analysis",
        "Data visualization",
        "Predictive modeling"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {isLittleCoder ? 'Little Coders' : 'Teen Coders'} Courses
              </h1>
              <p className="text-gray-600">
                {isLittleCoder 
                  ? 'Fun and interactive coding courses for ages 6-11'
                  : 'Advanced programming courses for ages 12-17'
                }
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          {courses.map((course) => (
            <div key={course.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
              {/* Video */}
              <div className="aspect-video">
                <iframe
                  src={course.videoUrl}
                  title={course.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{course.title}</h3>
                    <p className="text-gray-600 mb-4">{course.description}</p>
                  </div>
                </div>

                {/* Course Stats */}
                <div className="flex items-center gap-6 mb-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {course.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <Play className="w-4 h-4" />
                    {course.lessons} lessons
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4" />
                    {course.difficulty}
                  </div>
                </div>

                {/* Features */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">What you'll learn:</h4>
                  <ul className="space-y-2">
                    {course.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  Start Learning
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Get Started Section */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Start Your Coding Journey?
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            {isLittleCoder 
              ? 'Join thousands of young coders learning programming through fun, interactive lessons designed just for kids!'
              : 'Master programming skills with industry-relevant courses taught by expert instructors.'
            }
          </p>
          <div className="flex items-center justify-center gap-6 mb-6">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Users className="w-4 h-4" />
              10,000+ students
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Star className="w-4 h-4" />
              4.9/5 rating
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Play className="w-4 h-4" />
              500+ lessons
            </div>
          </div>
          <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-8">
            Get Started Today
          </Button>
        </div>
      </div>
    </div>
  );
}