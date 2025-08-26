import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  GraduationCap, 
  Users, 
  Calendar, 
  Award, 
  BookOpen, 
  Video, 
  Clock, 
  CheckCircle,
  Star,
  Download,
  Phone,
  Mail,
  MapPin
} from "lucide-react";

export function TeacherTrainingPage() {
  const [selectedProgram, setSelectedProgram] = useState("foundation");

  const programs = {
    foundation: {
      title: "Foundation Coding & Robotics Certificate",
      duration: "6 weeks",
      commitment: "3 hours/week",
      price: "R2,999",
      certification: "SACE Endorsed - 15 CPD Points",
      description: "Master the fundamentals of teaching coding and robotics in primary and secondary schools",
      outcomes: [
        "Understand computational thinking concepts",
        "Teach block-based programming effectively", 
        "Integrate robotics into CAPS curriculum",
        "Assess student programming projects",
        "Troubleshoot common technical issues"
      ],
      modules: [
        {
          week: 1,
          title: "Introduction to Computational Thinking",
          topics: ["Algorithm design", "Pattern recognition", "Decomposition", "Abstraction"],
          duration: "3 hours"
        },
        {
          week: 2,
          title: "Block-Based Programming Pedagogy",
          topics: ["Scratch fundamentals", "Visual programming benefits", "Age-appropriate challenges"],
          duration: "3 hours"
        },
        {
          week: 3,
          title: "micro:bit Hardware & Programming",
          topics: ["Device overview", "Sensors and outputs", "Python basics", "Project development"],
          duration: "3 hours"
        },
        {
          week: 4,
          title: "Curriculum Integration Strategies",
          topics: ["CAPS alignment", "Cross-curricular connections", "Assessment rubrics"],
          duration: "3 hours"
        },
        {
          week: 5,
          title: "Classroom Management for STEM",
          topics: ["Lab setup", "Safety protocols", "Differentiated learning", "Group dynamics"],
          duration: "3 hours"
        },
        {
          week: 6,
          title: "Assessment & Portfolio Development",
          topics: ["Project evaluation", "Digital portfolios", "Parent communication", "Certification exam"],
          duration: "3 hours"
        }
      ],
      format: "Hybrid (Online + 1 In-Person Workshop)",
      materials: "Physical robotics kit included"
    },
    advanced: {
      title: "Advanced STEM Integration Specialist",
      duration: "8 weeks", 
      commitment: "4 hours/week",
      price: "R4,499",
      certification: "SACE Endorsed - 25 CPD Points",
      description: "Advanced methodologies for integrating STEM education across multiple subjects and grade levels",
      outcomes: [
        "Design interdisciplinary STEM projects",
        "Implement maker-space pedagogy",
        "Lead school-wide STEM initiatives",
        "Mentor other educators effectively",
        "Develop custom curriculum materials"
      ],
      modules: [
        {
          week: 1,
          title: "STEM Leadership & Vision",
          topics: ["Change management", "Stakeholder buy-in", "Resource planning", "Success metrics"],
          duration: "4 hours"
        },
        {
          week: 2,
          title: "Advanced Programming Concepts",
          topics: ["Python for education", "Web development basics", "AI/ML fundamentals", "Data science"],
          duration: "4 hours"
        },
        {
          week: 3,
          title: "Maker-Space Design & Management",
          topics: ["Space planning", "Equipment selection", "Safety systems", "Student workflows"],
          duration: "4 hours"
        },
        {
          week: 4,
          title: "Project-Based Learning Mastery",
          topics: ["Authentic assessment", "Industry partnerships", "Real-world connections"],
          duration: "4 hours"
        },
        {
          week: 5,
          title: "Digital Citizenship & Ethics",
          topics: ["Online safety", "Data privacy", "AI ethics", "Responsible innovation"],
          duration: "4 hours"
        },
        {
          week: 6,
          title: "Professional Learning Communities",
          topics: ["Mentorship models", "Peer collaboration", "Action research", "Knowledge sharing"],
          duration: "4 hours"
        },
        {
          week: 7,
          title: "Grant Writing & Funding",
          topics: ["Funding opportunities", "Proposal development", "Budget planning", "Sustainability"],
          duration: "4 hours"
        },
        {
          week: 8,
          title: "Capstone Project & Certification",
          topics: ["Portfolio presentation", "Implementation plan", "Peer review", "Final assessment"],
          duration: "4 hours"
        }
      ],
      format: "Hybrid (Online + 2 In-Person Workshops)",
      materials: "Extended robotics kit + 3D printing credits"
    }
  };

  const instructors = [
    {
      name: "Dr. Sarah Mitchell",
      title: "Head of Educational Technology",
      credentials: "PhD Computer Science Education, 15 years teaching experience",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop",
      specialties: ["Curriculum Design", "Assessment Strategies", "Teacher Development"]
    },
    {
      name: "Prof. James Rodriguez",
      title: "STEM Integration Specialist",
      credentials: "MEd STEM Education, Former HOD Technology",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
      specialties: ["Robotics Pedagogy", "Maker Education", "School Leadership"]
    },
    {
      name: "Dr. Amara Okafor",
      title: "Computational Thinking Expert",
      credentials: "PhD Educational Psychology, Certified Google Educator",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop",
      specialties: ["Cognitive Development", "Digital Literacy", "Inclusive Education"]
    }
  ];

  const testimonials = [
    {
      name: "Linda van der Merwe",
      school: "Stellenbosch Primary School",
      role: "Grade 6 Teacher",
      quote: "The training completely transformed my confidence in teaching technology. My students are now creating amazing robotics projects!",
      rating: 5
    },
    {
      name: "Thabo Mthembu",
      school: "Kings College, Johannesburg",
      role: "HOD Technology",
      quote: "Outstanding professional development. The practical approach and ongoing support made implementation seamless.",
      rating: 5
    },
    {
      name: "Mary O'Connor",
      school: "St. Mary's Convent, Cape Town",
      role: "Principal",
      quote: "The whole-school transformation has been remarkable. Our STEM results have improved significantly since the training.",
      rating: 5
    }
  ];

  const stats = [
    { number: "2,500+", label: "Teachers Trained", icon: <Users className="w-6 h-6" /> },
    { number: "95%", label: "Completion Rate", icon: <Award className="w-6 h-6" /> },
    { number: "4.9/5", label: "Average Rating", icon: <Star className="w-6 h-6" /> },
    { number: "300+", label: "Partner Schools", icon: <GraduationCap className="w-6 h-6" /> }
  ];

  const currentProgram = programs[selectedProgram as keyof typeof programs];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Teacher Training Excellence
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto">
              Comprehensive professional development to equip educators with tomorrow's teaching skills
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                <Calendar className="w-5 h-5 mr-2" />
                View Training Calendar
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600">
                <Download className="w-5 h-5 mr-2" />
                Download Brochure
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4 text-blue-600">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Training Programs */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Professional Development Programs</h2>
            <p className="text-xl text-gray-600">SACE-endorsed training designed for South African educators</p>
          </div>

          <Tabs value={selectedProgram} onValueChange={setSelectedProgram} className="space-y-8">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
              <TabsTrigger value="foundation">Foundation Level</TabsTrigger>
              <TabsTrigger value="advanced">Advanced Level</TabsTrigger>
            </TabsList>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Program Overview */}
              <div className="lg:col-span-2">
                <Card className="p-6">
                  <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{currentProgram.title}</h3>
                        <p className="text-gray-600">{currentProgram.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-blue-600">{currentProgram.price}</div>
                        <Badge className="mt-2 bg-green-100 text-green-800">{currentProgram.certification}</Badge>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                      <div className="text-center">
                        <Clock className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                        <div className="font-semibold">{currentProgram.duration}</div>
                        <div className="text-sm text-gray-600">Duration</div>
                      </div>
                      <div className="text-center">
                        <Users className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                        <div className="font-semibold">{currentProgram.commitment}</div>
                        <div className="text-sm text-gray-600">Per Week</div>
                      </div>
                      <div className="text-center">
                        <Video className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                        <div className="font-semibold">{currentProgram.format}</div>
                        <div className="text-sm text-gray-600">Format</div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold mb-4">Learning Outcomes</h4>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {currentProgram.outcomes.map((outcome, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{outcome}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Quick Info & CTA */}
              <div className="space-y-6">
                <Card className="p-6">
                  <div className="text-center space-y-4">
                    <Award className="w-12 h-12 text-purple-600 mx-auto" />
                    <h4 className="text-lg font-semibold">Certification</h4>
                    <p className="text-gray-600">{currentProgram.certification}</p>
                    <div className="text-sm text-gray-500">
                      Recognized by SACE for professional development
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold">What's Included</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        Interactive online modules
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        Live instructor sessions
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        {currentProgram.materials}
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        Ongoing support community
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        Digital certificate
                      </li>
                    </ul>
                  </div>
                </Card>

                <div className="space-y-3">
                  <Button className="w-full" size="lg">
                    Enroll Now
                  </Button>
                  <Button variant="outline" className="w-full">
                    Schedule Consultation
                  </Button>
                </div>
              </div>
            </div>

            {/* Curriculum Details */}
            <Card className="p-6">
              <h4 className="text-xl font-semibold mb-6">Detailed Curriculum</h4>
              <div className="space-y-4">
                {currentProgram.modules.map((module, index) => (
                  <div key={index} className="flex gap-4 p-4 border rounded-lg">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold">
                        {module.week}
                      </div>
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-semibold text-gray-900">{module.title}</h5>
                        <Badge variant="outline">{module.duration}</Badge>
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
                ))}
              </div>
            </Card>
          </Tabs>
        </div>
      </section>



      {/* Contact & Support */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Teaching?</h2>
            <p className="text-xl opacity-90">Get personalized guidance from our education consultants</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <Phone className="w-8 h-8 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Call Us</h3>
              <p>+27 21 555 0123</p>
              <p className="text-sm opacity-75">Mon-Fri 8AM-5PM</p>
            </div>
            <div>
              <Mail className="w-8 h-8 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Email Us</h3>
              <p>training@codewisehub.co.za</p>
              <p className="text-sm opacity-75">Response within 24 hours</p>
            </div>
            <div>
              <MapPin className="w-8 h-8 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Visit Us</h3>
              <p>Cape Town & Johannesburg</p>
              <p className="text-sm opacity-75">Training centers available</p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              Schedule Free Consultation
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}