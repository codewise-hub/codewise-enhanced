import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Trophy, 
  Calendar, 
  Users, 
  Award,
  Clock,
  Star,
  Medal,
  Target
} from "lucide-react";

interface Competition {
  id: string;
  title: string;
  description: string;
  ageGroup: '6-11' | '12-17' | 'all';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  deadline: string;
  duration: string;
  participants: number;
  maxParticipants: number;
  prize: string;
  status: 'open' | 'closed' | 'upcoming';
  category: string;
}

interface CompetitionsPageProps {
  ageGroup: '6-11' | '12-17';
}

export function CompetitionsPage({ ageGroup }: CompetitionsPageProps) {
  const [selectedCompetition, setSelectedCompetition] = useState<Competition | null>(null);
  const [filter, setFilter] = useState<'all' | 'open' | 'upcoming'>('all');

  // Sample competitions data
  const competitions: Competition[] = [
    {
      id: 'scratch-creative',
      title: 'Scratch Creative Challenge',
      description: 'Create an interactive story or game using Scratch. Show your creativity and coding skills!',
      ageGroup: '6-11',
      difficulty: 'beginner',
      deadline: '2025-09-15',
      duration: '2 weeks',
      participants: 45,
      maxParticipants: 100,
      prize: 'CodewiseHub Premium Access + Digital Certificate',
      status: 'open',
      category: 'Creative Coding'
    },
    {
      id: 'microbit-robotics',
      title: 'micro:bit Robotics Contest',
      description: 'Build and program a robot using micro:bit that can complete obstacle courses.',
      ageGroup: '6-11',
      difficulty: 'intermediate',
      deadline: '2025-10-01',
      duration: '3 weeks',
      participants: 23,
      maxParticipants: 50,
      prize: 'micro:bit Starter Kit + Certificate',
      status: 'open',
      category: 'Robotics'
    },
    {
      id: 'python-algorithm',
      title: 'Python Algorithm Challenge',
      description: 'Solve complex programming problems using Python. Test your problem-solving skills!',
      ageGroup: '12-17',
      difficulty: 'advanced',
      deadline: '2025-09-30',
      duration: '1 week',
      participants: 67,
      maxParticipants: 150,
      prize: 'Laptop + CodewiseHub Pro Subscription',
      status: 'open',
      category: 'Programming'
    },
    {
      id: 'web-design',
      title: 'Web Design Showcase',
      description: 'Design and build a responsive website on any topic of your choice.',
      ageGroup: '12-17',
      difficulty: 'intermediate',
      deadline: '2025-10-15',
      duration: '4 weeks',
      participants: 34,
      maxParticipants: 80,
      prize: 'Web Development Course Bundle',
      status: 'open',
      category: 'Web Development'
    },
    {
      id: 'ai-innovation',
      title: 'AI Innovation Challenge',
      description: 'Create an AI-powered solution to solve a real-world problem.',
      ageGroup: '12-17',
      difficulty: 'advanced',
      deadline: '2025-11-01',
      duration: '6 weeks',
      participants: 0,
      maxParticipants: 60,
      prize: 'AI Course Package + Mentorship Program',
      status: 'upcoming',
      category: 'Artificial Intelligence'
    },
    {
      id: 'game-jam',
      title: 'CodewiseHub Game Jam',
      description: 'Create a complete game in 48 hours using any programming language or tool.',
      ageGroup: 'all',
      difficulty: 'intermediate',
      deadline: '2025-09-20',
      duration: '48 hours',
      participants: 89,
      maxParticipants: 200,
      prize: 'Gaming Setup + CodewiseHub Annual Subscription',
      status: 'open',
      category: 'Game Development'
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-green-100 text-green-800';
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredCompetitions = competitions.filter(comp => {
    const matchesAgeGroup = comp.ageGroup === ageGroup || comp.ageGroup === 'all';
    const matchesFilter = filter === 'all' || comp.status === filter;
    return matchesAgeGroup && matchesFilter;
  });

  if (selectedCompetition) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <Button 
            variant="outline" 
            onClick={() => setSelectedCompetition(null)}
            className="mb-6"
            data-testid="button-back-to-competitions"
          >
            ← Back to Competitions
          </Button>

          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <Trophy className="h-6 w-6 text-yellow-500" />
                    <Badge className={getStatusColor(selectedCompetition.status)}>
                      {selectedCompetition.status}
                    </Badge>
                    <Badge className={getDifficultyColor(selectedCompetition.difficulty)}>
                      {selectedCompetition.difficulty}
                    </Badge>
                  </div>
                  <CardTitle className="text-3xl mb-2">{selectedCompetition.title}</CardTitle>
                  <CardDescription className="text-lg mb-4">
                    {selectedCompetition.description}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5 text-gray-500" />
                    <span><strong>Deadline:</strong> {new Date(selectedCompetition.deadline).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-gray-500" />
                    <span><strong>Duration:</strong> {selectedCompetition.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-gray-500" />
                    <span><strong>Participants:</strong> {selectedCompetition.participants}/{selectedCompetition.maxParticipants}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Target className="h-5 w-5 text-gray-500" />
                    <span><strong>Category:</strong> {selectedCompetition.category}</span>
                  </div>
                </div>
                
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Award className="h-5 w-5 text-yellow-600" />
                    <span className="font-semibold text-yellow-800">Prize</span>
                  </div>
                  <p className="text-yellow-700">{selectedCompetition.prize}</p>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <h3 className="text-lg font-semibold mb-3">Competition Guidelines</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Follow the competition theme and requirements</li>
                  <li>• Submit your project before the deadline</li>
                  <li>• Include proper documentation and comments in your code</li>
                  <li>• Original work only - plagiarism will result in disqualification</li>
                  <li>• Have fun and learn something new!</li>
                </ul>
              </div>

              {selectedCompetition.status === 'open' && (
                <Button className="w-full md:w-auto" size="lg" data-testid="button-register">
                  <Trophy className="h-4 w-4 mr-2" />
                  Register for Competition
                </Button>
              )}
              
              {selectedCompetition.status === 'upcoming' && (
                <Button variant="outline" className="w-full md:w-auto" size="lg" data-testid="button-notify">
                  <Calendar className="h-4 w-4 mr-2" />
                  Notify Me When Open
                </Button>
              )}
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
            Coding Competitions
          </h1>
          <p className="text-xl text-gray-600">
            {ageGroup === '6-11' 
              ? 'Fun coding challenges designed for young programmers'
              : 'Advanced programming competitions to test your skills'
            }
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex justify-center space-x-4 mb-8">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            onClick={() => setFilter('all')}
            data-testid="button-filter-all"
          >
            All Competitions
          </Button>
          <Button
            variant={filter === 'open' ? 'default' : 'outline'}
            onClick={() => setFilter('open')}
            data-testid="button-filter-open"
          >
            Open for Registration
          </Button>
          <Button
            variant={filter === 'upcoming' ? 'default' : 'outline'}
            onClick={() => setFilter('upcoming')}
            data-testid="button-filter-upcoming"
          >
            Coming Soon
          </Button>
        </div>

        {/* Competitions Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCompetitions.map((competition) => (
            <Card 
              key={competition.id} 
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => setSelectedCompetition(competition)}
              data-testid={`competition-card-${competition.id}`}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    <Trophy className="h-6 w-6 text-yellow-500" />
                    <Badge className={getStatusColor(competition.status)}>
                      {competition.status}
                    </Badge>
                  </div>
                  <Badge className={getDifficultyColor(competition.difficulty)}>
                    {competition.difficulty}
                  </Badge>
                </div>
                <CardTitle className="text-xl">{competition.title}</CardTitle>
                <CardDescription>{competition.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(competition.deadline).toLocaleDateString()}
                    </span>
                    <span className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {competition.duration}
                    </span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span>Participants</span>
                    <span>{competition.participants}/{competition.maxParticipants}</span>
                  </div>
                  
                  <div className="bg-yellow-50 p-2 rounded text-sm">
                    <div className="flex items-center space-x-1">
                      <Medal className="h-4 w-4 text-yellow-600" />
                      <span className="font-medium text-yellow-800">Prize:</span>
                    </div>
                    <p className="text-yellow-700 text-xs mt-1">{competition.prize}</p>
                  </div>
                  
                  <Button className="w-full" variant="outline">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCompetitions.length === 0 && (
          <div className="text-center py-12">
            <Trophy className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No competitions found</h3>
            <p className="text-gray-600">
              Check back later for new competitions in your age group.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}