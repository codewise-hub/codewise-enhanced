import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { 
  Award, 
  GraduationCap, 
  FileCheck, 
  Star,
  Clock,
  Users,
  CheckCircle,
  Download,
  Share2,
  Eye,
  Calendar,
  BookOpen,
  Code,
  Brain,
  Target,
  Trophy
} from "lucide-react";

export function CertificationHub() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("browse");
  const [selectedCertification, setSelectedCertification] = useState<string | null>(null);

  const certifications = [
    {
      id: "foundation-coding",
      title: "Foundation Coding Educator",
      level: "Foundation",
      duration: "6 weeks",
      cpd: "15 CPD Points",
      price: "R2,999",
      sace: true,
      description: "Master the fundamentals of teaching coding and computational thinking to primary school learners",
      badge: "🎓",
      color: "blue",
      modules: [
        { title: "Computational Thinking Pedagogy", duration: "8 hours", completed: false },
        { title: "Block-Based Programming Methods", duration: "10 hours", completed: false },
        { title: "Assessment and Evaluation", duration: "6 hours", completed: false },
        { title: "Classroom Management for STEM", duration: "8 hours", completed: false },
        { title: "Curriculum Integration", duration: "10 hours", completed: false },
        { title: "Practical Teaching Portfolio", duration: "12 hours", completed: false }
      ],
      skills: [
        "Visual programming instruction",
        "Age-appropriate challenge design", 
        "Formative assessment techniques",
        "Cross-curricular integration",
        "Student motivation strategies"
      ],
      outcomes: [
        "Design and deliver effective coding lessons",
        "Assess student computational thinking skills",
        "Integrate coding across multiple subjects",
        "Support diverse learning needs",
        "Create engaging STEM learning environments"
      ],
      prerequisites: "Teaching qualification or equivalent experience",
      nextLevel: "advanced-programming"
    },
    {
      id: "advanced-programming",
      title: "Advanced Programming Specialist",
      level: "Intermediate",
      duration: "8 weeks", 
      cpd: "20 CPD Points",
      price: "R4,499",
      sace: true,
      description: "Develop expertise in text-based programming and advanced robotics for secondary education",
      badge: "💻",
      color: "purple",
      modules: [
        { title: "Python Programming Pedagogy", duration: "12 hours", completed: false },
        { title: "JavaScript and Web Development", duration: "10 hours", completed: false },
        { title: "Advanced Robotics Projects", duration: "14 hours", completed: false },
        { title: "Data Science for Educators", duration: "8 hours", completed: false },
        { title: "AI and Machine Learning Concepts", duration: "10 hours", completed: false },
        { title: "Capstone Project Development", duration: "16 hours", completed: false }
      ],
      skills: [
        "Multi-language programming instruction",
        "Complex project management",
        "Advanced debugging techniques",
        "Industry connection development",
        "Career guidance provision"
      ],
      outcomes: [
        "Teach multiple programming languages effectively",
        "Guide advanced robotics projects",
        "Introduce AI/ML concepts appropriately",
        "Prepare students for tech careers",
        "Lead school-wide STEM initiatives"
      ],
      prerequisites: "Foundation Coding Educator certification or equivalent",
      nextLevel: "stem-leadership"
    },
    {
      id: "stem-leadership",
      title: "STEM Education Leadership",
      level: "Advanced", 
      duration: "10 weeks",
      cpd: "25 CPD Points",
      price: "R5,999",
      sace: true,
      description: "Lead institutional STEM transformation and build sustainable technology education programs",
      badge: "🏆",
      color: "gold",
      modules: [
        { title: "Educational Technology Strategy", duration: "12 hours", completed: false },
        { title: "Teacher Professional Development", duration: "14 hours", completed: false },
        { title: "Curriculum Design and Alignment", duration: "10 hours", completed: false },
        { title: "Community and Industry Partnerships", duration: "8 hours", completed: false },
        { title: "Budget and Resource Management", duration: "10 hours", completed: false },
        { title: "Program Evaluation and Improvement", duration: "12 hours", completed: false },
        { title: "Leadership Practicum", duration: "16 hours", completed: false }
      ],
      skills: [
        "Strategic program development",
        "Teacher mentoring and coaching",
        "Stakeholder relationship management",
        "Data-driven decision making",
        "Innovation leadership"
      ],
      outcomes: [
        "Design comprehensive STEM programs",
        "Lead institutional technology transformation", 
        "Develop sustainable funding models",
        "Build effective teacher training programs",
        "Create community learning partnerships"
      ],
      prerequisites: "Advanced Programming Specialist or leadership experience",
      nextLevel: null
    },
    {
      id: "robotics-specialist",
      title: "Robotics Education Specialist",
      level: "Specialist",
      duration: "6 weeks",
      cpd: "18 CPD Points", 
      price: "R3,799",
      sace: true,
      description: "Specialize in hands-on robotics education with micro:bit, Arduino, and IoT integration",
      badge: "🤖",
      color: "green",
      modules: [
        { title: "Physical Computing Foundations", duration: "10 hours", completed: false },
        { title: "Sensor Integration and Data Collection", duration: "8 hours", completed: false },
        { title: "Wireless Communication Protocols", duration: "8 hours", completed: false },
        { title: "Project-Based Learning Design", duration: "10 hours", completed: false },
        { title: "Safety and Troubleshooting", duration: "6 hours", completed: false },
        { title: "Competition Preparation", duration: "10 hours", completed: false }
      ],
      skills: [
        "Hardware-software integration",
        "Sensor data interpretation",
        "Wireless system design",
        "Project scaffolding",
        "Technical problem solving"
      ],
      outcomes: [
        "Design comprehensive robotics curricula",
        "Troubleshoot hardware and software issues",
        "Prepare students for competitions",
        "Integrate IoT concepts effectively",
        "Lead maker space initiatives"
      ],
      prerequisites: "Foundation Coding Educator or technical background",
      nextLevel: "advanced-programming"
    },
    {
      id: "ai-education",
      title: "AI Education Pioneer",
      level: "Specialist",
      duration: "7 weeks",
      cpd: "20 CPD Points",
      price: "R4,299",
      sace: true,
      description: "Lead the integration of artificial intelligence and machine learning concepts in K-12 education",
      badge: "🧠",
      color: "orange",
      modules: [
        { title: "AI Ethics and Responsible Computing", duration: "8 hours", completed: false },
        { title: "Machine Learning Fundamentals for Educators", duration: "10 hours", completed: false },
        { title: "Natural Language Processing Projects", duration: "8 hours", completed: false },
        { title: "Computer Vision in Education", duration: "8 hours", completed: false },
        { title: "AI Tool Integration", duration: "10 hours", completed: false },
        { title: "Future Skills Development", duration: "12 hours", completed: false }
      ],
      skills: [
        "AI concept simplification",
        "Ethical technology discussion",
        "Tool evaluation and selection",
        "Future-oriented curriculum design",
        "Critical thinking development"
      ],
      outcomes: [
        "Introduce AI concepts age-appropriately",
        "Guide ethical technology discussions",
        "Evaluate and integrate AI tools",
        "Prepare students for AI-enhanced careers",
        "Lead institutional AI adoption"
      ],
      prerequisites: "Advanced Programming Specialist or equivalent",
      nextLevel: "stem-leadership"
    }
  ];

  const userCertifications = [
    {
      id: "foundation-coding",
      title: "Foundation Coding Educator",
      completed: true,
      completionDate: "2024-06-15",
      score: 94,
      credentialId: "FCE-2024-789123",
      expires: "2027-06-15"
    }
  ];

  const getBadgeStyle = (color: string) => {
    const styles = {
      blue: "bg-blue-100 text-blue-800 border-blue-300",
      purple: "bg-purple-100 text-purple-800 border-purple-300", 
      gold: "bg-yellow-100 text-yellow-800 border-yellow-300",
      green: "bg-green-100 text-green-800 border-green-300",
      orange: "bg-orange-100 text-orange-800 border-orange-300"
    };
    return styles[color as keyof typeof styles] || styles.blue;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Professional Development Certifications
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            SACE-endorsed certification programs that advance your career and transform your teaching practice
          </p>
          <div className="flex justify-center mt-6 space-x-4">
            <Badge variant="secondary" className="px-4 py-2 text-lg">
              <Award className="w-5 h-5 mr-2" />
              SACE Endorsed
            </Badge>
            <Badge variant="secondary" className="px-4 py-2 text-lg">
              <FileCheck className="w-5 h-5 mr-2" />
              Industry Recognized
            </Badge>
            <Badge variant="secondary" className="px-4 py-2 text-lg">
              <Users className="w-5 h-5 mr-2" />
              1,500+ Graduates
            </Badge>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="browse">Available Certifications</TabsTrigger>
            <TabsTrigger value="progress">My Progress</TabsTrigger>
            <TabsTrigger value="credentials">My Credentials</TabsTrigger>
          </TabsList>

          <TabsContent value="browse" className="mt-8">
            <div className="grid gap-8">
              {certifications.map((cert) => (
                <Card key={cert.id} className="overflow-hidden">
                  <div className="flex">
                    <div className="flex-1">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-4">
                            <div className={`w-16 h-16 rounded-lg flex items-center justify-center text-2xl border-2 ${getBadgeStyle(cert.color)}`}>
                              {cert.badge}
                            </div>
                            <div>
                              <CardTitle className="text-2xl">{cert.title}</CardTitle>
                              <div className="flex items-center space-x-4 mt-2">
                                <Badge variant="outline">{cert.level}</Badge>
                                <div className="flex items-center text-sm text-gray-600">
                                  <Clock className="w-4 h-4 mr-1" />
                                  {cert.duration}
                                </div>
                                <div className="flex items-center text-sm text-gray-600">
                                  <GraduationCap className="w-4 h-4 mr-1" />
                                  {cert.cpd}
                                </div>
                              </div>
                              <p className="text-gray-600 mt-2">{cert.description}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-green-600">{cert.price}</div>
                            <div className="text-sm text-gray-500">One-time fee</div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid lg:grid-cols-3 gap-6">
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-3">Course Modules</h4>
                            <div className="space-y-2">
                              {cert.modules.slice(0, 4).map((module, idx) => (
                                <div key={idx} className="flex items-center text-sm">
                                  <BookOpen className="w-4 h-4 mr-2 text-blue-600" />
                                  <span className="flex-1">{module.title}</span>
                                  <span className="text-gray-500 text-xs">{module.duration}</span>
                                </div>
                              ))}
                              {cert.modules.length > 4 && (
                                <div className="text-sm text-gray-500">
                                  +{cert.modules.length - 4} more modules
                                </div>
                              )}
                            </div>
                          </div>

                          <div>
                            <h4 className="font-semibold text-gray-900 mb-3">Key Skills</h4>
                            <div className="space-y-2">
                              {cert.skills.map((skill, idx) => (
                                <div key={idx} className="flex items-center text-sm">
                                  <Target className="w-4 h-4 mr-2 text-green-600" />
                                  <span>{skill}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h4 className="font-semibold text-gray-900 mb-3">Learning Outcomes</h4>
                            <div className="space-y-2">
                              {cert.outcomes.slice(0, 3).map((outcome, idx) => (
                                <div key={idx} className="flex items-start text-sm">
                                  <CheckCircle className="w-4 h-4 mr-2 text-purple-600 mt-0.5 flex-shrink-0" />
                                  <span>{outcome}</span>
                                </div>
                              ))}
                              {cert.outcomes.length > 3 && (
                                <div className="text-sm text-gray-500">
                                  +{cert.outcomes.length - 3} more outcomes
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mt-6 pt-6 border-t">
                          <div className="text-sm text-gray-600">
                            <span className="font-medium">Prerequisites:</span> {cert.prerequisites}
                          </div>
                          <div className="flex items-center space-x-3">
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4 mr-2" />
                              View Details
                            </Button>
                            <Button size="sm">
                              <Award className="w-4 h-4 mr-2" />
                              Enroll Now
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="progress" className="mt-8">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-blue-600" />
                    <span>Current Enrollments</span>
                  </CardTitle>
                  <CardDescription>
                    Track your progress across active certification programs
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <GraduationCap className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No Active Enrollments</h3>
                    <p className="text-gray-500 mb-6">
                      Start your professional development journey by enrolling in a certification program
                    </p>
                    <Button>
                      <Award className="w-4 h-4 mr-2" />
                      Browse Certifications
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="credentials" className="mt-8">
            <div className="grid gap-6">
              {userCertifications.length > 0 ? (
                userCertifications.map((credential) => (
                  <Card key={credential.id} className="overflow-hidden">
                    <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                            <Trophy className="w-8 h-8 text-green-600" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-gray-900">{credential.title}</h3>
                            <div className="flex items-center space-x-4 mt-2">
                              <Badge variant="secondary" className="bg-green-100 text-green-800">
                                <CheckCircle className="w-4 h-4 mr-1" />
                                Completed
                              </Badge>
                              <div className="text-sm text-gray-600">
                                Score: {credential.score}%
                              </div>
                              <div className="text-sm text-gray-600">
                                Completed: {new Date(credential.completionDate).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm">
                            <Share2 className="w-4 h-4 mr-2" />
                            Share
                          </Button>
                          <Button size="sm">
                            <Download className="w-4 h-4 mr-2" />
                            Download Certificate
                          </Button>
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <div className="grid md:grid-cols-3 gap-6 text-sm">
                        <div>
                          <Label className="font-medium text-gray-700">Credential ID</Label>
                          <p className="mt-1 font-mono text-gray-900">{credential.credentialId}</p>
                        </div>
                        <div>
                          <Label className="font-medium text-gray-700">Issued Date</Label>
                          <p className="mt-1 text-gray-900">{new Date(credential.completionDate).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <Label className="font-medium text-gray-700">Valid Until</Label>
                          <p className="mt-1 text-gray-900">{new Date(credential.expires).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-700">
                          This digital credential can be verified at <strong>credentials.codewisehub.com</strong> 
                          using the credential ID above. Share this achievement on LinkedIn and professional networks.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card>
                  <CardContent className="p-12 text-center">
                    <FileCheck className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No Credentials Yet</h3>
                    <p className="text-gray-500 mb-6">
                      Complete certification programs to earn professional credentials
                    </p>
                    <Button>
                      <Award className="w-4 h-4 mr-2" />
                      Start Learning
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>

        {/* Call to Action */}
        <div className="mt-12">
          <Card className="bg-gradient-to-r from-purple-50 to-blue-50">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Ready to Advance Your Teaching Career?
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Join 1,500+ educators who have transformed their teaching practice through our 
                SACE-endorsed certification programs. Start your journey today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="px-8">
                  <Calendar className="w-5 h-5 mr-2" />
                  Schedule Consultation
                </Button>
                <Button size="lg" variant="outline" className="px-8">
                  <Download className="w-5 h-5 mr-2" />
                  Download Brochure
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}