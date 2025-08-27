import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BookOpen, Award, Clock, CheckCircle, Play, Download } from 'lucide-react';

interface EducatorDashboardProps {
  onClose: () => void;
}

export function EducatorDashboard({ onClose }: EducatorDashboardProps) {
  const [activeTab, setActiveTab] = useState('progress');

  const courses = [
    {
      id: 1,
      title: 'Digital Citizenship & Online Safety',
      category: 'Foundation Course',
      progress: 85,
      totalLessons: 12,
      completedLessons: 10,
      estimatedHours: 8,
      status: 'In Progress',
      description: 'Learn to teach students about responsible digital citizenship and online safety practices.',
      materials: [
        'Lesson Plans: Digital Footprint Awareness',
        'Activity Sheets: Password Security',
        'Assessment Rubrics: Online Behavior',
        'Parent Communication Templates'
      ]
    },
    {
      id: 2,
      title: 'Computational Thinking for Young Minds',
      category: 'Pedagogy Course',
      progress: 60,
      totalLessons: 15,
      completedLessons: 9,
      estimatedHours: 12,
      status: 'In Progress',
      description: 'Master techniques for teaching computational thinking concepts to students aged 6-11.',
      materials: [
        'Teaching Guide: Pattern Recognition Activities',
        'Unplugged Computing Resources',
        'Assessment Tools: Logic & Reasoning',
        'Differentiation Strategies Guide'
      ]
    },
    {
      id: 3,
      title: 'Python Programming Fundamentals',
      category: 'Technical Skill',
      progress: 100,
      totalLessons: 20,
      completedLessons: 20,
      estimatedHours: 15,
      status: 'Completed',
      description: 'Build proficiency in Python programming to effectively teach text-based coding to teens.',
      materials: [
        'Complete Python Reference Guide',
        'Project-Based Learning Templates',
        'Code Review Checklists',
        'Student Portfolio Examples'
      ]
    },
    {
      id: 4,
      title: 'AI & Technology Integration',
      category: 'Emerging Tech',
      progress: 30,
      totalLessons: 18,
      completedLessons: 5,
      estimatedHours: 14,
      status: 'Not Started',
      description: 'Explore how to integrate AI tools and emerging technologies into coding education.',
      materials: [
        'AI Ethics in Education Guide',
        'Tool Integration Best Practices',
        'Student AI Literacy Framework',
        'Future-Ready Curriculum Design'
      ]
    }
  ];

  const credentials = [
    {
      id: 1,
      title: 'Certified Young Coders Educator',
      issueDate: '2024-03-15',
      expiryDate: '2026-03-15',
      status: 'Active',
      badgeColor: 'bg-green-500',
      description: 'Qualified to teach visual programming and computational thinking to students aged 6-11'
    },
    {
      id: 2,
      title: 'Python Programming Instructor',
      issueDate: '2024-07-20',
      expiryDate: '2026-07-20',
      status: 'Active',
      badgeColor: 'bg-blue-500',
      description: 'Certified to teach Python programming fundamentals and advanced concepts'
    },
    {
      id: 3,
      title: 'Digital Citizenship Specialist',
      issueDate: '2024-08-10',
      expiryDate: '2025-08-10',
      status: 'Expiring Soon',
      badgeColor: 'bg-yellow-500',
      description: 'Specialized training in teaching online safety and digital responsibility'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-2xl max-w-6xl w-full mx-4 max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold mb-2">Educator Learning Hub</h1>
              <p className="text-lg opacity-90">Professional Development Dashboard</p>
            </div>
            <Button
              onClick={onClose}
              variant="outline"
              className="bg-white text-purple-600 hover:bg-gray-100"
              data-testid="button-close-educator-dashboard"
            >
              Close
            </Button>
          </div>
          
          {/* Tab Navigation */}
          <div className="flex gap-4 mt-6">
            <Button
              onClick={() => setActiveTab('progress')}
              variant={activeTab === 'progress' ? 'secondary' : 'ghost'}
              className={`text-white ${activeTab === 'progress' ? 'bg-white/20' : 'hover:bg-white/10'}`}
              data-testid="tab-my-progress"
            >
              <BookOpen className="w-4 h-4 mr-2" />
              My Progress
            </Button>
            <Button
              onClick={() => setActiveTab('credentials')}
              variant={activeTab === 'credentials' ? 'secondary' : 'ghost'}
              className={`text-white ${activeTab === 'credentials' ? 'bg-white/20' : 'hover:bg-white/10'}`}
              data-testid="tab-my-credentials"
            >
              <Award className="w-4 h-4 mr-2" />
              My Credentials
            </Button>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-6 overflow-y-auto max-h-[70vh]">
          {activeTab === 'progress' && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Learning Journey</h2>
                <p className="text-gray-600">Track your progress through professional development courses and study materials</p>
              </div>

              {courses.map((course) => (
                <Card key={course.id} className="overflow-hidden">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl text-gray-900 mb-2">{course.title}</CardTitle>
                        <Badge variant="outline" className="mb-2">{course.category}</Badge>
                        <p className="text-gray-600">{course.description}</p>
                      </div>
                      <div className="text-right">
                        <Badge 
                          variant={course.status === 'Completed' ? 'default' : 'secondary'}
                          className={course.status === 'Completed' ? 'bg-green-500' : ''}
                        >
                          {course.status}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Progress Section */}
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Course Progress</h4>
                        <Progress value={course.progress} className="mb-3" />
                        <div className="flex justify-between text-sm text-gray-600 mb-4">
                          <span>{course.completedLessons} of {course.totalLessons} lessons</span>
                          <span>{course.progress}% complete</span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{course.estimatedHours} hours</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span>{course.completedLessons} completed</span>
                          </div>
                        </div>
                      </div>

                      {/* Study Materials */}
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Study Materials</h4>
                        <div className="space-y-2">
                          {course.materials.map((material, index) => (
                            <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                              <span className="text-sm text-gray-700">{material}</span>
                              <Button size="sm" variant="ghost" className="text-blue-600 hover:text-blue-700">
                                <Download className="w-4 h-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3 mt-6">
                      {course.status !== 'Completed' && (
                        <Button className="bg-purple-600 hover:bg-purple-700">
                          <Play className="w-4 h-4 mr-2" />
                          Continue Learning
                        </Button>
                      )}
                      <Button variant="outline">
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {activeTab === 'credentials' && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Professional Credentials</h2>
                <p className="text-gray-600">View and manage your earned certifications and qualifications</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {credentials.map((credential) => (
                  <Card key={credential.id} className="text-center">
                    <CardHeader>
                      <div className={`w-16 h-16 rounded-full ${credential.badgeColor} mx-auto mb-4 flex items-center justify-center`}>
                        <Award className="w-8 h-8 text-white" />
                      </div>
                      <CardTitle className="text-lg text-gray-900 mb-2">{credential.title}</CardTitle>
                      <Badge 
                        variant={credential.status === 'Active' ? 'default' : 'secondary'}
                        className={credential.status === 'Active' ? 'bg-green-500' : credential.status === 'Expiring Soon' ? 'bg-yellow-500' : ''}
                      >
                        {credential.status}
                      </Badge>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-4">{credential.description}</p>
                      <div className="text-xs text-gray-500 space-y-1">
                        <div>Issued: {new Date(credential.issueDate).toLocaleDateString()}</div>
                        <div>Expires: {new Date(credential.expiryDate).toLocaleDateString()}</div>
                      </div>
                      <Button variant="outline" size="sm" className="mt-4 w-full">
                        View Certificate
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="text-center p-8">
                  <BookOpen className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Earn More Credentials</h3>
                  <p className="text-gray-600 mb-4">
                    Continue your professional development journey and unlock new teaching certifications
                  </p>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Browse Available Courses
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}