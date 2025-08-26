import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle, Play } from "lucide-react";

interface SimpleLessonsPageProps {
  ageGroup: '6-11' | '12-17';
}

export function SimpleLessonsPage({ ageGroup }: SimpleLessonsPageProps) {
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
              {ageGroup === '6-11' ? 'Young Coders' : 'Teen Coders'} Lessons
            </h1>
            <p className="text-xl text-gray-600">
              Interactive lessons for ages {ageGroup}
            </p>
          </div>
        </div>

        {/* Simple Lessons List */}
        <div className="grid gap-4">
          {ageGroup === '6-11' ? (
            <>
              <div className="bg-white p-4 rounded-lg shadow-lg flex items-center justify-between">
                <div className="flex items-center">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3" />
                  <div>
                    <h3 className="font-bold">Introduction to Scratch</h3>
                    <p className="text-gray-600 text-sm">15 minutes</p>
                  </div>
                </div>
                <Button size="sm">
                  <Play className="h-4 w-4 mr-2" />
                  Start
                </Button>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-lg flex items-center justify-between">
                <div className="flex items-center">
                  <Play className="h-6 w-6 text-blue-500 mr-3" />
                  <div>
                    <h3 className="font-bold">Creating Your First Animation</h3>
                    <p className="text-gray-600 text-sm">20 minutes</p>
                  </div>
                </div>
                <Button size="sm">
                  <Play className="h-4 w-4 mr-2" />
                  Start
                </Button>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-lg flex items-center justify-between">
                <div className="flex items-center">
                  <Play className="h-6 w-6 text-blue-500 mr-3" />
                  <div>
                    <h3 className="font-bold">Making Sprites Move</h3>
                    <p className="text-gray-600 text-sm">25 minutes</p>
                  </div>
                </div>
                <Button size="sm">
                  <Play className="h-4 w-4 mr-2" />
                  Start
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className="bg-white p-4 rounded-lg shadow-lg flex items-center justify-between">
                <div className="flex items-center">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3" />
                  <div>
                    <h3 className="font-bold">Python Basics</h3>
                    <p className="text-gray-600 text-sm">30 minutes</p>
                  </div>
                </div>
                <Button size="sm">
                  <Play className="h-4 w-4 mr-2" />
                  Start
                </Button>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-lg flex items-center justify-between">
                <div className="flex items-center">
                  <Play className="h-6 w-6 text-blue-500 mr-3" />
                  <div>
                    <h3 className="font-bold">Variables and Data Types</h3>
                    <p className="text-gray-600 text-sm">35 minutes</p>
                  </div>
                </div>
                <Button size="sm">
                  <Play className="h-4 w-4 mr-2" />
                  Start
                </Button>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-lg flex items-center justify-between">
                <div className="flex items-center">
                  <Play className="h-6 w-6 text-blue-500 mr-3" />
                  <div>
                    <h3 className="font-bold">Functions and Loops</h3>
                    <p className="text-gray-600 text-sm">40 minutes</p>
                  </div>
                </div>
                <Button size="sm">
                  <Play className="h-4 w-4 mr-2" />
                  Start
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}