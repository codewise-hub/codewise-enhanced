import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  X, 
  Clock, 
  Award, 
  BookOpen, 
  CheckCircle, 
  Play, 
  Users, 
  Calendar,
  Target,
  FileText
} from 'lucide-react';

interface CertificationProgram {
  id: string;
  title: string;
  duration: string;
  commitment: string;
  price: string;
  certification: string;
  description: string;
  outcomes: string[];
  modules: Array<{
    week: number;
    title: string;
    topics: string[];
    duration: string;
  }>;
  materials: string;
  prerequisites: string[];
  targetAudience: string[];
}

interface CertificationEnrollmentModalProps {
  program: CertificationProgram;
  onClose: () => void;
  onEnroll: (programId: string) => void;
}

export function CertificationEnrollmentModal({ program, onClose, onEnroll }: CertificationEnrollmentModalProps) {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold mb-2">{program.title}</h1>
              <div className="flex flex-wrap gap-4 text-sm opacity-90">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{program.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{program.commitment}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Award className="w-4 h-4" />
                  <span>{program.certification}</span>
                </div>
              </div>
            </div>
            <Button
              onClick={onClose}
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/10"
              data-testid="button-close-enrollment"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-2 mt-6">
            <Button
              onClick={() => setActiveTab('overview')}
              variant={activeTab === 'overview' ? 'secondary' : 'ghost'}
              size="sm"
              className={`text-white ${activeTab === 'overview' ? 'bg-white/20' : 'hover:bg-white/10'}`}
            >
              Overview
            </Button>
            <Button
              onClick={() => setActiveTab('curriculum')}
              variant={activeTab === 'curriculum' ? 'secondary' : 'ghost'}
              size="sm"
              className={`text-white ${activeTab === 'curriculum' ? 'bg-white/20' : 'hover:bg-white/10'}`}
            >
              Curriculum
            </Button>
            <Button
              onClick={() => setActiveTab('outcomes')}
              variant={activeTab === 'outcomes' ? 'secondary' : 'ghost'}
              size="sm"
              className={`text-white ${activeTab === 'outcomes' ? 'bg-white/20' : 'hover:bg-white/10'}`}
            >
              Learning Outcomes
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">About This Certification</h3>
                <p className="text-gray-600 leading-relaxed">{program.description}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Users className="w-5 h-5 text-blue-500" />
                      Target Audience
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {program.targetAudience.map((audience, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{audience}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <BookOpen className="w-5 h-5 text-purple-500" />
                      Prerequisites
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {program.prerequisites.map((prerequisite, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{prerequisite}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <FileText className="w-5 h-5 text-orange-500" />
                    What's Included
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm">Interactive online modules</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm">Live instructor sessions</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm">Hands-on practical exercises</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm">{program.materials}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm">Ongoing support community</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm">Digital certificate upon completion</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'curriculum' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Detailed Curriculum</h3>
                <p className="text-gray-600 mb-6">
                  Complete {program.duration} program with {program.modules.length} comprehensive modules
                </p>
              </div>

              <div className="space-y-4">
                {program.modules.map((module, index) => (
                  <Card key={index} className="border-l-4 border-l-blue-500">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold">
                            {module.week}
                          </div>
                        </div>
                        <div className="flex-grow">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-gray-900">{module.title}</h4>
                            <Badge variant="outline" className="text-xs">
                              {module.duration}
                            </Badge>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {module.topics.map((topic, topicIndex) => (
                              <Badge key={topicIndex} variant="secondary" className="text-xs">
                                {topic}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'outcomes' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Learning Outcomes</h3>
                <p className="text-gray-600 mb-6">
                  Upon successful completion, you will be able to:
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {program.outcomes.map((outcome, index) => (
                  <Card key={index} className="border-l-4 border-l-green-500">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <Target className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{outcome}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Award className="w-8 h-8 text-blue-600 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-blue-900 mb-2">Professional Recognition</h4>
                      <p className="text-blue-800 text-sm">
                        This certification is {program.certification} and will enhance your professional credentials 
                        as an educator in the digital age. Upon completion, you'll receive a digital certificate 
                        that can be shared on LinkedIn and other professional platforms.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-gray-900">{program.price}</div>
              <div className="text-sm text-gray-600">Complete certification program</div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button 
                onClick={() => onEnroll(program.id)}
                className="bg-purple-600 hover:bg-purple-700"
                data-testid="button-enroll-program"
              >
                <Play className="w-4 h-4 mr-2" />
                Enroll Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}