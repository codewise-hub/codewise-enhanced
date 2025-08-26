import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface SimpleCoursesPageProps {
  ageGroup: '6-11' | '12-17';
}

export function SimpleCoursesPage({ ageGroup }: SimpleCoursesPageProps) {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button 
            variant="outline" 
            onClick={() => setLocation('/')}
            className="mr-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              {ageGroup === '6-11' ? 'Young Coders' : 'Teen Coders'} Courses
            </h1>
            <p className="text-xl text-gray-600">
              Explore our coding courses for ages {ageGroup}
            </p>
          </div>
        </div>

        {/* Simple Course List */}
        <div className="grid gap-6">
          {ageGroup === '6-11' ? (
            <>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold mb-4">🎨 Scratch Programming</h3>
                <p className="text-gray-600 mb-4">
                  Create animations, stories, and simple games using drag-and-drop blocks
                </p>
                <iframe 
                  width="100%" 
                  height="300" 
                  src="https://www.youtube.com/embed/jXUZaf5D12A" 
                  title="Scratch Programming Tutorial"
                  frameBorder="0" 
                  allowFullScreen
                />
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold mb-4">🧩 Block-Based Coding</h3>
                <p className="text-gray-600 mb-4">
                  Learn fundamental programming concepts using colorful blocks
                </p>
                <iframe 
                  width="100%" 
                  height="300" 
                  src="https://www.youtube.com/embed/jXUZaf5D12A" 
                  title="Block Programming Tutorial"
                  frameBorder="0" 
                  allowFullScreen
                />
              </div>
            </>
          ) : (
            <>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold mb-4">🐍 Python Programming</h3>
                <p className="text-gray-600 mb-4">
                  Master one of the world's most popular programming languages
                </p>
                <iframe 
                  width="100%" 
                  height="300" 
                  src="https://www.youtube.com/embed/_uQrJ0TkZlc" 
                  title="Python Programming Tutorial"
                  frameBorder="0" 
                  allowFullScreen
                />
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold mb-4">🌐 Web Development</h3>
                <p className="text-gray-600 mb-4">
                  Build modern websites and web applications
                </p>
                <iframe 
                  width="100%" 
                  height="300" 
                  src="https://www.youtube.com/embed/qz0aGYrrlhU" 
                  title="Web Development Tutorial"
                  frameBorder="0" 
                  allowFullScreen
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}