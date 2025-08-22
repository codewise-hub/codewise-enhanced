import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Cpu, 
  Wifi, 
  Battery, 
  Thermometer, 
  Lightbulb, 
  Car, 
  Shield, 
  BookOpen,
  School,
  Users,
  Award,
  CheckCircle,
  ArrowRight,
  Download
} from "lucide-react";

export function RoboticsKitsPage() {
  const [selectedKit, setSelectedKit] = useState("microbit-starter");

  const kits = {
    "microbit-starter": {
      name: "micro:bit STEM Starter Kit",
      price: "R1,299",
      originalPrice: "R1,699",
      description: "Perfect introduction to coding and electronics for grades 4-7",
      image: "https://images.unsplash.com/photo-1606935673680-dfb8b3fdf2c7?w=600&h=400&fit=crop",
      ageGroup: "8-13 years",
      difficulty: "Beginner",
      subjects: ["Technology", "Mathematics", "Science"],
      curriculum: "CAPS Aligned",
      features: [
        "BBC micro:bit v2 development board",
        "LED matrix display (5×5)",
        "2 programmable buttons",
        "Built-in sensors (accelerometer, compass, temperature)",
        "Bluetooth Low Energy connectivity",
        "25 GPIO pins for expansion"
      ],
      included: [
        "1× micro:bit v2 board",
        "1× USB cable",
        "1× Battery pack (2×AAA)",
        "20× Jumper wires",
        "1× Breadboard",
        "10× LEDs (assorted colors)",
        "5× Resistors",
        "2× Servo motors",
        "1× Buzzer",
        "Learning guide & project cards"
      ],
      projects: [
        "Digital Pet - Create an interactive companion",
        "Weather Station - Monitor temperature and humidity", 
        "Step Counter - Build a fitness tracker",
        "Music Player - Compose and play melodies",
        "Burglar Alarm - Motion detection system",
        "LED Light Show - Synchronized light patterns"
      ],
      skills: [
        "Block-based programming",
        "Circuit building",
        "Problem-solving",
        "Logical thinking",
        "Sensor data interpretation"
      ]
    }
  };

  const currentKit = kits[selectedKit as keyof typeof kits];

  const benefits = [
    {
      icon: <School className="w-8 h-8 text-blue-600" />,
      title: "Curriculum Integration",
      description: "Seamlessly aligns with CAPS Technology curriculum requirements"
    },
    {
      icon: <Users className="w-8 h-8 text-green-600" />,
      title: "Teacher Support",
      description: "Comprehensive teacher training and ongoing pedagogical support"
    },
    {
      icon: <Award className="w-8 h-8 text-purple-600" />,
      title: "Student Outcomes",
      description: "Proven to improve STEM engagement and problem-solving skills"
    },
    {
      icon: <Shield className="w-8 h-8 text-orange-600" />,
      title: "Quality Assured",
      description: "CE certified components with 2-year warranty and support"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Grade 6 Teacher, Pinelands Primary",
      quote: "The micro:bit kits transformed how my students learn technology. They're building circuits and coding with confidence!",
      school: "Cape Town, Western Cape"
    },
    {
      name: "Michael Chen", 
      role: "HOD Technology, St. Andrews College",
      quote: "Outstanding curriculum alignment and student engagement. Our Grade 7s are creating projects we never thought possible.",
      school: "Johannesburg, Gauteng"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Professional Robotics Kits
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              CAPS-aligned, curriculum-integrated STEM solutions for South African schools
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                <School className="w-5 h-5 mr-2" />
                Request School Quote
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                <Download className="w-5 h-5 mr-2" />
                Download Curriculum Guide
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Schools Choose CodewiseHub Robotics</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive STEM education solutions designed specifically for South African classrooms
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4">
                    {benefit.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Kit Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured: micro:bit STEM Kit</h2>
            <p className="text-xl text-gray-600">Our most popular classroom solution</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src={currentKit.image}
                alt={currentKit.name}
                className="w-full rounded-2xl shadow-xl"
              />
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Badge className="bg-green-100 text-green-800">{currentKit.curriculum}</Badge>
                <Badge variant="outline">{currentKit.ageGroup}</Badge>
                <Badge variant="outline">{currentKit.difficulty}</Badge>
              </div>
              
              <h3 className="text-3xl font-bold text-gray-900">{currentKit.name}</h3>
              <p className="text-lg text-gray-600">{currentKit.description}</p>
              
              <div className="flex items-baseline gap-4">
                <span className="text-3xl font-bold text-blue-600">{currentKit.price}</span>
                <span className="text-xl text-gray-400 line-through">{currentKit.originalPrice}</span>
                <Badge className="bg-red-100 text-red-800">Save 23%</Badge>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {currentKit.subjects.map((subject, index) => (
                  <Badge key={index} variant="outline">{subject}</Badge>
                ))}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="flex-1">
                  Request School Quote
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button size="lg" variant="outline" className="flex-1">
                  <Download className="w-5 h-5 mr-2" />
                  Kit Specifications
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Kit Information */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="features" className="space-y-8">
            <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4">
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="included">What's Included</TabsTrigger>
              <TabsTrigger value="projects">Sample Projects</TabsTrigger>
              <TabsTrigger value="skills">Learning Outcomes</TabsTrigger>
            </TabsList>

            <TabsContent value="features" className="space-y-6">
              <h3 className="text-2xl font-bold text-center mb-8">Technical Specifications</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentKit.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="included" className="space-y-6">
              <h3 className="text-2xl font-bold text-center mb-8">Complete Kit Contents</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {currentKit.included.map((item, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                    <CheckCircle className="w-5 h-5 text-blue-600" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="projects" className="space-y-6">
              <h3 className="text-2xl font-bold text-center mb-8">Student Project Examples</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentKit.projects.map((project, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg">{project.split(' - ')[0]}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">{project.split(' - ')[1]}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="skills" className="space-y-6">
              <h3 className="text-2xl font-bold text-center mb-8">Learning Outcomes</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xl font-semibold mb-4 text-blue-600">Technical Skills</h4>
                  <div className="space-y-3">
                    {currentKit.skills.slice(0, 3).map((skill, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <Cpu className="w-5 h-5 text-blue-600" />
                        <span className="text-gray-700">{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-4 text-purple-600">21st Century Skills</h4>
                  <div className="space-y-3">
                    {currentKit.skills.slice(3).map((skill, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <BookOpen className="w-5 h-5 text-purple-600" />
                        <span className="text-gray-700">{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Educators Are Saying</h2>
            <p className="text-xl text-gray-600">Trusted by 300+ schools across South Africa</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6">
                <CardContent className="space-y-4">
                  <p className="text-lg text-gray-700 italic">"{testimonial.quote}"</p>
                  <div className="border-t pt-4">
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-blue-600">{testimonial.role}</p>
                    <p className="text-gray-600 text-sm">{testimonial.school}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your STEM Classroom?</h2>
          <p className="text-xl mb-8">Join 300+ South African schools already using CodewiseHub</p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              Request School Demo
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
              Speak to Education Consultant
            </Button>
          </div>
          
          <p className="text-sm mt-6 opacity-90">
            Free curriculum consultation • Teacher training included • 30-day money-back guarantee
          </p>
        </div>
      </section>
    </div>
  );
}