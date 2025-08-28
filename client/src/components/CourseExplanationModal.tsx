import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Play, Book, Code, Star, Clock, Users } from "lucide-react";
import type { AgeGroup } from "@/types/user";

interface CourseExplanationModalProps {
  isOpen: boolean;
  onClose: () => void;
  ageGroup: AgeGroup;
  onGetStarted: () => void;
}

export function CourseExplanationModal({ isOpen, onClose, ageGroup, onGetStarted }: CourseExplanationModalProps) {
  if (!isOpen) return null;

  const courseInfo = ageGroup === '6-11' ? {
    title: "Little Coders Program",
    subtitle: "Ages 6-11 • Visual Block Programming",
    description: "A fun and interactive introduction to programming concepts using colorful blocks instead of complex code. Perfect for young minds to start their coding journey!",
    benefits: [
      "Develops logical thinking and problem-solving skills",
      "Builds creativity through interactive animations and games", 
      "Enhances math skills through programming concepts",
      "Prepares foundation for advanced programming",
      "Improves digital literacy and computer confidence"
    ],
    courses: [
      {
        name: "Scratch Programming",
        description: "Create animations, stories, and simple games using drag-and-drop blocks",
        icon: "🎨",
        difficulty: "Beginner Friendly"
      },
      {
        name: "Robotics Basics", 
        description: "Control virtual robots and learn basic programming logic",
        icon: "🤖",
        difficulty: "Interactive Fun"
      },
      {
        name: "Digital Art & Animation",
        description: "Combine creativity with coding to make moving pictures",
        icon: "🎬",
        difficulty: "Creative Learning"
      }
    ],
    videoTutorials: [
      {
        title: "Scratch Blocks in 3 Minutes",
        url: "https://www.youtube.com/embed/jXUZaf5D12A", // Scratch for Kids tutorial (keeping same as it's educational)
        description: "Learn how to use visual programming blocks quickly"
      },
      {
        title: "Micro:bit Quick Start (2 min)",
        url: "https://www.youtube.com/embed/-mmcVQvz9xY", // Shorter micro:bit intro
        description: "Quick introduction to the micro:bit device for kids"
      },
      {
        title: "Coding Lab Tutorial (4 min)",
        url: "https://www.youtube.com/embed/Wuza5WXiMkc", // micro:bit programming tutorial (keeping as it's specific to platform)
        description: "Connect and program your micro:bit device step-by-step"
      }
    ]
  } : {
    title: "Teen Coders Program", 
    subtitle: "Ages 12-17 • Real Programming Languages",
    description: "Advance your coding skills with professional programming languages like Python, web development, and AI prompt engineering. Build real applications and prepare for a tech career in the AI era!",
    benefits: [
      "Learn industry-standard programming languages",
      "Master AI tools and prompt engineering for future careers",
      "Build portfolio projects for college applications",
      "Develop problem-solving skills for STEM subjects",
      "Prepare for computer science courses and careers", 
      "Gain practical skills for the digital economy"
    ],
    courses: [
      {
        name: "Python Programming",
        description: "Master one of the most popular programming languages used by professionals",
        icon: "🐍", 
        difficulty: "Beginner to Advanced"
      },
      {
        name: "Web Development",
        description: "Create websites and web applications using HTML, CSS, and JavaScript",
        icon: "🌐",
        difficulty: "Project-Based"
      },
      {
        name: "Prompt Engineering & AI",
        description: "Learn to work with AI tools like ChatGPT, Claude, and build AI-powered applications",
        icon: "🤖",
        difficulty: "Modern Skills"
      },
      {
        name: "Data Science Basics",
        description: "Analyze data and create visualizations using Python libraries",
        icon: "📊",
        difficulty: "Intermediate"
      }
    ],
    videoTutorials: [
      {
        title: "Python Basics in 5 Minutes",
        url: "https://www.youtube.com/embed/kqtD5dpn9C8", // Short Python intro
        description: "Quick introduction to Python programming fundamentals"
      },
      {
        title: "AI Tools for Beginners (3 min)",
        url: "https://www.youtube.com/embed/JTxsNm9IdYU", // Short AI intro
        description: "Learn how AI tools can help young developers build amazing projects"
      },
      {
        title: "Your First Website in 4 Minutes",
        url: "https://www.youtube.com/embed/PlxWf493en4", // Quick web dev tutorial
        description: "Build a simple website using HTML and CSS"
      }
    ]
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{courseInfo.title}</h2>
            <p className="text-gray-600">{courseInfo.subtitle}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition"
            data-testid="button-close-course-modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 space-y-8">
          {/* Description */}
          <div>
            <p className="text-lg text-gray-700 leading-relaxed">{courseInfo.description}</p>
          </div>

          {/* Video Tutorials Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <Play className="h-5 w-5 mr-2 text-blue-600" />
{ageGroup === '6-11' ? 'Video Tutorials - How to Use the Visual Lab' : 'Video Tutorials - Coding Environment & Tools'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {courseInfo.videoTutorials.map((video, index) => (
                <Card key={index} className="overflow-hidden">
                  <div className="aspect-video">
                    <iframe
                      src={video.url}
                      title={video.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    ></iframe>
                  </div>
                  <CardContent className="p-4">
                    <h4 className="font-semibold text-sm mb-2">{video.title}</h4>
                    <p className="text-xs text-gray-600">{video.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Benefits */}
          <div>
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <Star className="h-5 w-5 mr-2 text-yellow-500" />
              How Learning These Skills Benefits Students
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {courseInfo.benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700">{benefit}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Courses */}
          <div>
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <Book className="h-5 w-5 mr-2 text-green-600" />
              Available Courses
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {courseInfo.courses.map((course, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="text-center">
                    <div className="text-4xl mb-2">{course.icon}</div>
                    <CardTitle className="text-lg">{course.name}</CardTitle>
                    <Badge variant="outline">{course.difficulty}</Badge>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center">
                      {course.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="flex items-center justify-center mb-2">
                  <Clock className="h-8 w-8 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">
                  {ageGroup === '6-11' ? '2-4' : '3-6'}
                </div>
                <div className="text-gray-600">Hours per week</div>
              </div>
              <div>
                <div className="flex items-center justify-center mb-2">
                  <Users className="h-8 w-8 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">
                  {ageGroup === '6-11' ? '10,000+' : '15,000+'}
                </div>
                <div className="text-gray-600">Students enrolled</div>
              </div>
              <div>
                <div className="flex items-center justify-center mb-2">
                  <Code className="h-8 w-8 text-purple-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">
                  {ageGroup === '6-11' ? '20+' : '50+'}
                </div>
                <div className="text-gray-600">Projects to build</div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button 
              onClick={() => {
                onGetStarted();
                onClose();
              }}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3"
              data-testid="button-get-started"
            >
              <Play className="h-5 w-5 mr-2" />
              Get Started Now
            </Button>
            <Button 
              variant="outline" 
              onClick={onClose}
              className="flex-1 py-3"
              data-testid="button-learn-more-later"
            >
              Learn More Later
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}