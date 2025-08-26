import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, FileText, BookOpen } from "lucide-react";

interface SimpleStudyMaterialsPageProps {
  ageGroup: '6-11' | '12-17';
}

export function SimpleStudyMaterialsPage({ ageGroup }: SimpleStudyMaterialsPageProps) {
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
              Study Materials
            </h1>
            <p className="text-xl text-gray-600">
              Resources and guides for {ageGroup === '6-11' ? 'young coders' : 'teen coders'}
            </p>
          </div>
        </div>

        {/* Study Materials Grid */}
        <div className="grid gap-6">
          {ageGroup === '6-11' ? (
            <>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <FileText className="h-8 w-8 text-blue-500 mr-4" />
                    <div>
                      <h3 className="text-xl font-bold">Scratch Programming Guide</h3>
                      <p className="text-gray-600">Complete beginner's guide to visual programming</p>
                      <p className="text-sm text-gray-500">PDF • 24 pages</p>
                    </div>
                  </div>
                  <Button>
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <BookOpen className="h-8 w-8 text-green-500 mr-4" />
                    <div>
                      <h3 className="text-xl font-bold">Block Coding Workbook</h3>
                      <p className="text-gray-600">Exercises and activities for hands-on learning</p>
                      <p className="text-sm text-gray-500">PDF • 36 pages</p>
                    </div>
                  </div>
                  <Button>
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <FileText className="h-8 w-8 text-purple-500 mr-4" />
                    <div>
                      <h3 className="text-xl font-bold">Robotics Activity Cards</h3>
                      <p className="text-gray-600">Fun robotics projects for micro:bit</p>
                      <p className="text-sm text-gray-500">PDF • 18 pages</p>
                    </div>
                  </div>
                  <Button>
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <FileText className="h-8 w-8 text-blue-500 mr-4" />
                    <div>
                      <h3 className="text-xl font-bold">Python Programming Handbook</h3>
                      <p className="text-gray-600">Comprehensive guide to Python programming</p>
                      <p className="text-sm text-gray-500">PDF • 120 pages</p>
                    </div>
                  </div>
                  <Button>
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <BookOpen className="h-8 w-8 text-green-500 mr-4" />
                    <div>
                      <h3 className="text-xl font-bold">Web Development Guide</h3>
                      <p className="text-gray-600">HTML, CSS, and JavaScript fundamentals</p>
                      <p className="text-sm text-gray-500">PDF • 95 pages</p>
                    </div>
                  </div>
                  <Button>
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <FileText className="h-8 w-8 text-purple-500 mr-4" />
                    <div>
                      <h3 className="text-xl font-bold">AI & Machine Learning Primer</h3>
                      <p className="text-gray-600">Introduction to artificial intelligence concepts</p>
                      <p className="text-sm text-gray-500">PDF • 68 pages</p>
                    </div>
                  </div>
                  <Button>
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}