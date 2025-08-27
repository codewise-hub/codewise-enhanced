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

        {/* Course List */}
        <div className="grid gap-6">
          {ageGroup === '6-11' ? (
            <>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold mb-4 text-purple-600">🎨 Scratch Programming</h3>
                <p className="text-gray-600 mb-4">
                  Learn the fundamentals of programming through visual, drag-and-drop blocks. Create interactive stories, animations, and simple games while understanding core programming concepts like loops, conditions, and variables.
                </p>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h4 className="font-semibold mb-2">What You'll Learn:</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-600">
                      <li>Basic programming concepts</li>
                      <li>Creating animations and stories</li>
                      <li>Game development basics</li>
                      <li>Problem-solving skills</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Skills Developed:</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-600">
                      <li>Logical thinking</li>
                      <li>Creative expression</li>
                      <li>Sequential reasoning</li>
                      <li>Digital literacy</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold mb-4 text-blue-600">🤖 Advanced Robotics</h3>
                <p className="text-gray-600 mb-4">
                  Build and program advanced robots using micro:bit and various sensors. Learn to control LED displays, motors, and sensors while understanding how real-world devices communicate and respond to their environment.
                </p>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h4 className="font-semibold mb-2">What You'll Learn:</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-600">
                      <li>Robot programming basics</li>
                      <li>Sensor integration</li>
                      <li>LED pattern creation</li>
                      <li>Motor control systems</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Skills Developed:</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-600">
                      <li>Hardware-software integration</li>
                      <li>Systems thinking</li>
                      <li>Troubleshooting</li>
                      <li>Engineering mindset</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold mb-4 text-green-600">🎮 Game Creation</h3>
                <p className="text-gray-600 mb-4">
                  Design and build your own interactive games using visual programming tools. Learn game mechanics, character movement, scoring systems, and create engaging experiences for friends and family.
                </p>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h4 className="font-semibold mb-2">What You'll Learn:</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-600">
                      <li>Game design principles</li>
                      <li>Character animation</li>
                      <li>Scoring and levels</li>
                      <li>User interaction</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Skills Developed:</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-600">
                      <li>Creative problem solving</li>
                      <li>User experience design</li>
                      <li>Project planning</li>
                      <li>Testing and iteration</li>
                    </ul>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold mb-4 text-blue-600">🐍 Python Programming</h3>
                <p className="text-gray-600 mb-4">
                  Master Python, one of the world's most versatile programming languages. Build real applications, analyze data, create web services, and develop artificial intelligence systems using professional development practices.
                </p>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h4 className="font-semibold mb-2">What You'll Learn:</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-600">
                      <li>Python syntax and fundamentals</li>
                      <li>Data structures and algorithms</li>
                      <li>Object-oriented programming</li>
                      <li>Library and framework usage</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Skills Developed:</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-600">
                      <li>Professional coding practices</li>
                      <li>Problem decomposition</li>
                      <li>Code debugging and testing</li>
                      <li>Software architecture</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold mb-4 text-purple-600">🌐 Web Development</h3>
                <p className="text-gray-600 mb-4">
                  Create modern, responsive websites and web applications using HTML, CSS, JavaScript, and popular frameworks. Learn frontend and backend development to build full-stack applications.
                </p>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h4 className="font-semibold mb-2">What You'll Learn:</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-600">
                      <li>HTML, CSS, and JavaScript</li>
                      <li>Responsive design principles</li>
                      <li>Modern frameworks (React, Vue)</li>
                      <li>Database integration</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Skills Developed:</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-600">
                      <li>User interface design</li>
                      <li>Client-server architecture</li>
                      <li>Version control (Git)</li>
                      <li>Web security basics</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold mb-4 text-orange-600">🧠 AI & Machine Learning</h3>
                <p className="text-gray-600 mb-4">
                  Explore artificial intelligence and machine learning concepts. Learn to work with AI systems, understand prompt engineering, and build intelligent applications using modern AI tools and frameworks.
                </p>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h4 className="font-semibold mb-2">What You'll Learn:</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-600">
                      <li>AI fundamentals and concepts</li>
                      <li>Prompt engineering techniques</li>
                      <li>Machine learning basics</li>
                      <li>AI application development</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Skills Developed:</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-600">
                      <li>Critical thinking about AI</li>
                      <li>Data analysis and interpretation</li>
                      <li>Ethical AI considerations</li>
                      <li>Future technology readiness</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold mb-4 text-green-600">📱 Mobile App Development</h3>
                <p className="text-gray-600 mb-4">
                  Build native mobile applications for iOS and Android platforms. Learn app design principles, user interface development, and how to publish apps to app stores.
                </p>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h4 className="font-semibold mb-2">What You'll Learn:</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-600">
                      <li>Mobile UI/UX design</li>
                      <li>Cross-platform development</li>
                      <li>App store deployment</li>
                      <li>Mobile-specific features</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Skills Developed:</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-600">
                      <li>Mobile design patterns</li>
                      <li>Performance optimization</li>
                      <li>User experience design</li>
                      <li>App monetization strategies</li>
                    </ul>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}