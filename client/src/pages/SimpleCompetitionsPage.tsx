import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Trophy, Calendar, Users } from "lucide-react";

interface SimpleCompetitionsPageProps {
  ageGroup: '6-11' | '12-17';
}

export function SimpleCompetitionsPage({ ageGroup }: SimpleCompetitionsPageProps) {
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
              Coding Competitions
            </h1>
            <p className="text-xl text-gray-600">
              Challenges and contests for {ageGroup === '6-11' ? 'young coders' : 'teen coders'}
            </p>
          </div>
        </div>

        {/* Competitions Grid */}
        <div className="grid gap-6">
          {ageGroup === '6-11' ? (
            <>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Trophy className="h-8 w-8 text-yellow-500 mr-3" />
                    <div>
                      <h3 className="text-xl font-bold">Animation Challenge</h3>
                      <p className="text-gray-600">Create the most creative animation</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center text-sm text-gray-500 mb-1">
                      <Calendar className="h-4 w-4 mr-1" />
                      Jan 15 - Feb 15
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Users className="h-4 w-4 mr-1" />
                      120 participants
                    </div>
                  </div>
                </div>
                <Button className="w-full">Join Competition</Button>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Trophy className="h-8 w-8 text-silver mr-3" />
                    <div>
                      <h3 className="text-xl font-bold">Game Design Contest</h3>
                      <p className="text-gray-600">Build the most fun game using blocks</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center text-sm text-gray-500 mb-1">
                      <Calendar className="h-4 w-4 mr-1" />
                      Feb 1 - Mar 1
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Users className="h-4 w-4 mr-1" />
                      85 participants
                    </div>
                  </div>
                </div>
                <Button className="w-full">Join Competition</Button>
              </div>
            </>
          ) : (
            <>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Trophy className="h-8 w-8 text-yellow-500 mr-3" />
                    <div>
                      <h3 className="text-xl font-bold">Python Code Challenge</h3>
                      <p className="text-gray-600">Solve algorithmic problems using Python</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center text-sm text-gray-500 mb-1">
                      <Calendar className="h-4 w-4 mr-1" />
                      Jan 20 - Feb 20
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Users className="h-4 w-4 mr-1" />
                      250 participants
                    </div>
                  </div>
                </div>
                <Button className="w-full">Join Competition</Button>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Trophy className="h-8 w-8 text-silver mr-3" />
                    <div>
                      <h3 className="text-xl font-bold">Web Dev Hackathon</h3>
                      <p className="text-gray-600">Build a complete web application in 48 hours</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center text-sm text-gray-500 mb-1">
                      <Calendar className="h-4 w-4 mr-1" />
                      Mar 1 - Mar 3
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Users className="h-4 w-4 mr-1" />
                      180 participants
                    </div>
                  </div>
                </div>
                <Button className="w-full">Join Competition</Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}