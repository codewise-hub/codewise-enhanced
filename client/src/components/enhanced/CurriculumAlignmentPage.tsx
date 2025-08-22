import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  BookOpen, 
  GraduationCap, 
  Target, 
  CheckCircle,
  Download,
  Eye,
  Clock,
  Users,
  Award,
  FileText,
  School,
  Lightbulb,
  Code
} from "lucide-react";

export function CurriculumAlignmentPage() {
  const [selectedGrade, setSelectedGrade] = useState("grade-4-6");
  const [activeTab, setActiveTab] = useState("overview");

  const curriculumMapping = {
    "grade-4-6": {
      title: "Grades 4-6: Intermediate Phase Foundation",
      description: "Introducing computational thinking through visual programming and hands-on robotics",
      alignment: 95,
      subjects: [
        {
          subject: "Mathematics",
          topics: ["Patterns, Functions and Algebra", "Geometry", "Measurement", "Data Handling"],
          integration: [
            "Programming patterns in visual blocks",
            "Geometric shapes in robot movement",
            "Measuring distances and angles",
            "Collecting and analyzing sensor data"
          ],
          assessmentTasks: [
            "Create geometric patterns with robot movement",
            "Program a robot to measure classroom dimensions",
            "Collect temperature data and create graphs"
          ]
        },
        {
          subject: "Natural Sciences",
          topics: ["Matter and Materials", "Energy and Change", "Life and Living", "Planet Earth and Beyond"],
          integration: [
            "Exploring material properties with sensors",
            "Energy sources for robotics systems",
            "Programming life-like behaviors",
            "Simulating planetary movements"
          ],
          assessmentTasks: [
            "Build a robot that detects different materials",
            "Create a solar-powered robot project",
            "Program animal behavior simulations"
          ]
        },
        {
          subject: "Technology",
          topics: ["Processing", "Systems and Control", "Structures"],
          integration: [
            "Algorithm design and processing",
            "Input-output systems with micro:bit",
            "Building robot chassis and supports"
          ],
          assessmentTasks: [
            "Design and build a functional robot",
            "Create control systems for automated tasks",
            "Document the design process"
          ]
        }
      ],
      learningOutcomes: [
        "Understand basic programming concepts (sequence, repetition)",
        "Apply logical thinking to solve problems",
        "Use technology to enhance learning across subjects",
        "Work collaboratively on technical projects",
        "Document and present technical solutions"
      ],
      resources: [
        {
          type: "Lesson Plans",
          count: 24,
          description: "Detailed weekly lesson plans with activities and assessments"
        },
        {
          type: "Assessment Rubrics", 
          count: 12,
          description: "Age-appropriate rubrics for technical and creative projects"
        },
        {
          type: "Parent Resources",
          count: 8,
          description: "Home extension activities and progress tracking guides"
        }
      ]
    },
    "grade-7-9": {
      title: "Grades 7-9: Senior Phase Development",
      description: "Advancing to text-based programming and complex problem-solving",
      alignment: 98,
      subjects: [
        {
          subject: "Mathematics",
          topics: ["Functions", "Algebraic Expressions", "Geometry of 2D and 3D Objects", "Statistics"],
          integration: [
            "Programming mathematical functions",
            "Creating algebraic models in code",
            "3D modeling and spatial programming",
            "Statistical analysis of robot data"
          ],
          assessmentTasks: [
            "Program functions for robot navigation",
            "Create mathematical models for optimization",
            "Analyze performance data from robot sensors"
          ]
        },
        {
          subject: "Natural Sciences",
          topics: ["Chemical Systems", "Mechanical Systems", "Earth as a System"],
          integration: [
            "Programming chemical reaction simulations",
            "Mechanical engineering in robotics",
            "Environmental monitoring systems"
          ],
          assessmentTasks: [
            "Build an environmental monitoring robot",
            "Program physics simulations",
            "Design sustainable technology solutions"
          ]
        },
        {
          subject: "Technology",
          topics: ["Mechanical Technologies", "Civil Technologies", "Electrical Technologies"],
          integration: [
            "Advanced robotics mechanisms",
            "Structural design for robot projects",
            "Circuit design and electronic control"
          ],
          assessmentTasks: [
            "Design and build complex mechanical systems",
            "Create electronic control systems",
            "Integrate multiple technologies in projects"
          ]
        }
      ],
      learningOutcomes: [
        "Master text-based programming languages",
        "Apply engineering design processes",
        "Integrate technology across multiple disciplines",
        "Lead collaborative technical projects",
        "Present technical solutions professionally"
      ],
      resources: [
        {
          type: "Project Portfolios",
          count: 16,
          description: "Comprehensive project templates with assessment criteria"
        },
        {
          type: "Career Connections",
          count: 12,
          description: "Links to STEM careers and university pathways"
        },
        {
          type: "Competition Prep",
          count: 6,
          description: "Training for robotics and programming competitions"
        }
      ]
    },
    "grade-10-12": {
      title: "Grades 10-12: Further Education Phase Mastery",
      description: "Preparing for tertiary education and professional STEM careers",
      alignment: 100,
      subjects: [
        {
          subject: "Mathematics",
          topics: ["Functions", "Calculus", "Statistics", "Mathematical Models"],
          integration: [
            "Advanced algorithmic thinking",
            "Optimization and machine learning basics",
            "Statistical modeling and data science",
            "Mathematical proofs in computer science"
          ],
          assessmentTasks: [
            "Implement machine learning algorithms",
            "Create predictive models using statistics",
            "Develop optimization solutions for real problems"
          ]
        },
        {
          subject: "Physical Sciences",
          topics: ["Mechanics", "Waves, Sound and Light", "Electricity and Magnetism"],
          integration: [
            "Physics simulations and modeling",
            "Signal processing and communication",
            "Electronic system design"
          ],
          assessmentTasks: [
            "Build advanced sensor systems",
            "Create physics-based simulations",
            "Design communication protocols"
          ]
        },
        {
          subject: "Information Technology",
          topics: ["Programming", "Data Structures", "System Analysis", "Project Management"],
          integration: [
            "Advanced programming concepts",
            "Database design and management",
            "System architecture and design",
            "Professional project management"
          ],
          assessmentTasks: [
            "Develop complete software systems",
            "Design and implement databases",
            "Lead multi-phase technical projects"
          ]
        }
      ],
      learningOutcomes: [
        "Demonstrate advanced programming proficiency",
        "Apply software engineering principles",
        "Understand system design and architecture",
        "Prepare for university computer science programs",
        "Develop professional technical communication skills"
      ],
      resources: [
        {
          type: "University Prep",
          count: 20,
          description: "Preparation materials for computer science programs"
        },
        {
          type: "Industry Connections",
          count: 15,
          description: "Partnerships with tech companies for internships"
        },
        {
          type: "Certification Pathways",
          count: 8,
          description: "Industry-recognized certification programs"
        }
      ]
    }
  };

  const currentMapping = curriculumMapping[selectedGrade as keyof typeof curriculumMapping];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            CAPS-Aligned Curriculum Integration
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            Comprehensive curriculum mapping showing how CodewiseHub integrates seamlessly 
            with the Curriculum and Assessment Policy Statement (CAPS) across all grade levels
          </p>
          <div className="flex justify-center mt-6">
            <Badge variant="secondary" className="px-4 py-2 text-lg">
              <School className="w-5 h-5 mr-2" />
              DBE Approved • CAPS Compliant • Assessment Ready
            </Badge>
          </div>
        </div>

        {/* Grade Selection */}
        <div className="flex justify-center mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(curriculumMapping).map(([key, mapping]) => (
              <Button
                key={key}
                variant={selectedGrade === key ? "default" : "outline"}
                className="p-4 h-auto text-left"
                onClick={() => setSelectedGrade(key)}
              >
                <div>
                  <div className="font-semibold text-sm">{mapping.title.split(':')[0]}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {mapping.alignment}% CAPS Aligned
                  </div>
                  <Progress value={mapping.alignment} className="mt-2 h-2" />
                </div>
              </Button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl">{currentMapping.title}</CardTitle>
                <CardDescription className="text-lg mt-2">
                  {currentMapping.description}
                </CardDescription>
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-2 mb-2">
                  <Target className="w-5 h-5 text-green-600" />
                  <span className="text-2xl font-bold text-green-600">
                    {currentMapping.alignment}%
                  </span>
                </div>
                <div className="text-sm text-muted-foreground">CAPS Alignment</div>
              </div>
            </div>
          </CardHeader>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Subject Integration</TabsTrigger>
            <TabsTrigger value="outcomes">Learning Outcomes</TabsTrigger>
            <TabsTrigger value="resources">Teaching Resources</TabsTrigger>
            <TabsTrigger value="implementation">Implementation</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="grid gap-6">
              {currentMapping.subjects.map((subject, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <BookOpen className="w-5 h-5 text-blue-600" />
                      <span>{subject.subject}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3 text-gray-700">CAPS Topics Covered</h4>
                        <ul className="space-y-2">
                          {subject.topics.map((topic, idx) => (
                            <li key={idx} className="flex items-start space-x-2">
                              <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">{topic}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-3 text-gray-700">Technology Integration</h4>
                        <ul className="space-y-2">
                          {subject.integration.map((item, idx) => (
                            <li key={idx} className="flex items-start space-x-2">
                              <Code className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="mt-6">
                      <h4 className="font-semibold mb-3 text-gray-700">Sample Assessment Tasks</h4>
                      <div className="grid gap-2">
                        {subject.assessmentTasks.map((task, idx) => (
                          <div key={idx} className="flex items-center space-x-2 bg-gray-50 p-3 rounded-lg">
                            <Award className="w-4 h-4 text-orange-600 flex-shrink-0" />
                            <span className="text-sm">{task}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="outcomes" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="w-5 h-5 text-green-600" />
                  <span>Key Learning Outcomes</span>
                </CardTitle>
                <CardDescription>
                  These outcomes align with CAPS requirements and prepare students for future success
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {currentMapping.learningOutcomes.map((outcome, index) => (
                    <div key={index} className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg border border-green-200">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-green-900">{outcome}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="resources" className="mt-6">
            <div className="grid md:grid-cols-3 gap-6">
              {currentMapping.resources.map((resource, index) => (
                <Card key={index}>
                  <CardHeader className="text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <FileText className="w-6 h-6 text-blue-600" />
                    </div>
                    <CardTitle className="text-lg">{resource.type}</CardTitle>
                    <div className="text-2xl font-bold text-blue-600">{resource.count}</div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 text-center mb-4">
                      {resource.description}
                    </p>
                    <Button className="w-full" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Download Resources
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="implementation" className="mt-6">
            <div className="grid lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-purple-600" />
                    <span>Implementation Timeline</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-bold text-blue-600">
                        1
                      </div>
                      <div>
                        <div className="font-semibold">Assessment & Planning (Week 1-2)</div>
                        <div className="text-sm text-gray-600">Current curriculum review and integration planning</div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-sm font-bold text-green-600">
                        2
                      </div>
                      <div>
                        <div className="font-semibold">Teacher Training (Week 3-4)</div>
                        <div className="text-sm text-gray-600">Professional development and SACE certification</div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-sm font-bold text-purple-600">
                        3
                      </div>
                      <div>
                        <div className="font-semibold">Pilot Implementation (Week 5-8)</div>
                        <div className="text-sm text-gray-600">Small group testing and feedback collection</div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-sm font-bold text-orange-600">
                        4
                      </div>
                      <div>
                        <div className="font-semibold">Full Rollout (Week 9+)</div>
                        <div className="text-sm text-gray-600">School-wide implementation with ongoing support</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="w-5 h-5 text-green-600" />
                    <span>Support Structure</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="font-semibold text-blue-900">Dedicated Education Consultant</div>
                      <div className="text-sm text-blue-700">Personal support throughout implementation</div>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                      <div className="font-semibold text-green-900">24/7 Technical Support</div>
                      <div className="text-sm text-green-700">Platform and hardware assistance</div>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                      <div className="font-semibold text-purple-900">Peer Learning Network</div>
                      <div className="text-sm text-purple-700">Connect with other implementing schools</div>
                    </div>
                    <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                      <div className="font-semibold text-orange-900">Quarterly Reviews</div>
                      <div className="text-sm text-orange-700">Progress assessment and optimization</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Ready to Transform Your School's STEM Education?
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Join 300+ schools already benefiting from our CAPS-aligned curriculum. 
                Get a personalized implementation plan for your school.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="px-8">
                  <School className="w-5 h-5 mr-2" />
                  Schedule Consultation
                </Button>
                <Button size="lg" variant="outline" className="px-8">
                  <Download className="w-5 h-5 mr-2" />
                  Download Curriculum Guide
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}