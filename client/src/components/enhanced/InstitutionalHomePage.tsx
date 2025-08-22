import { useState } from "react";
import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import roboticsKitImage from "@assets/generated_images/Educational_robotics_kit_display_7f81acdd.png";

import { 
  School, 
  Users, 
  Award, 
  BookOpen, 
  Cpu, 
  Zap,
  Globe,
  Shield,
  TrendingUp,
  Play,
  ArrowRight,
  CheckCircle,
  Star,
  Quote,
  Calendar,
  MapPin,
  Mail
} from "lucide-react";

export function InstitutionalHomePage() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const stats = [
    { number: "300+", label: "Partner Schools", icon: <School className="w-6 h-6" /> },
    { number: "150,000+", label: "Students Reached", icon: <Users className="w-6 h-6" /> },
    { number: "1,500+", label: "Teachers Trained", icon: <Award className="w-6 h-6" /> },
    { number: "10", label: "Countries", icon: <Globe className="w-6 h-6" /> }
  ];

  const features = [
    {
      icon: <BookOpen className="w-8 h-8 text-blue-600" />,
      title: "Learn at Your Own Pace",
      description: "From beginner-friendly block coding to advanced text programming - courses designed for every skill level.",
      benefits: ["Age-appropriate content (6-17 years)", "Interactive lessons & projects", "Track your progress & achievements"]
    },
    {
      icon: <Cpu className="w-8 h-8 text-purple-600" />,
      title: "Build Real Robots",
      description: "Create amazing projects with micro:bit, Arduino, and IoT sensors. See your code come to life!",
      benefits: ["Hands-on robotics activities", "LED displays & motor control", "Sensors & wireless projects"]
    },
    {
      icon: <Users className="w-8 h-8 text-green-600" />,
      title: "Perfect for Schools",
      description: "Curriculum aligned with South African education standards and teacher training programs trusted by 300+ schools.",
      benefits: ["Professional teacher certification", "Curriculum integration support", "Student progress tracking"]
    },
    {
      icon: <Shield className="w-8 h-8 text-orange-600" />,
      title: "Safe Learning Environment",
      description: "Supervised online platform with comprehensive support for learners, teachers, and parents.",
      benefits: ["Child-safe online environment", "24/7 technical support", "Parent progress reports"]
    }
  ];

  const testimonials = [
    {
      quote: "CodewiseHub transformed our approach to technology education. Our Grade 7 learners are now building autonomous robots and understanding the fundamentals of computer science.",
      author: "Dr. Sarah Mitchell",
      role: "Principal, Pinelands High School",
      location: "Cape Town, Western Cape",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop",
      results: "87% improvement in STEM engagement scores"
    },
    {
      quote: "The professional development program exceeded our expectations. Our teachers now confidently integrate coding across multiple subjects, creating truly interdisciplinary learning experiences.",
      author: "James Rodriguez",
      role: "HOD Technology, St. Stithians College",
      location: "Johannesburg, Gauteng",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
      results: "15 teachers certified in 6 months"
    },
    {
      quote: "Our partnership with CodewiseHub has positioned us as a leading STEM school in KwaZulu-Natal. The impact on learner outcomes has been remarkable.",
      author: "Nomsa Mthembu",
      role: "Deputy Principal, Orient Islamic School",
      location: "Durban, KwaZulu-Natal", 
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop",
      results: "40% increase in technology subject enrollment"
    }
  ];

  const certifications = [
    { name: "Education Certified", description: "Professional educator recognition and standards" },
    { name: "SA Curriculum Aligned", description: "Aligned with South African education curriculum" },
    { name: "CE Certified", description: "European safety standards for educational equipment" },
    { name: "ISO 27001", description: "Information security management certification" }
  ];

  const partnerSchools = [
    "St. Stithians College", "Pinelands High School", "Orient Islamic School",
    "Curro Academy Pretoria", "Hoërskool Zwartkop", "Florida Primary School",
    "Hatfield Christian School", "Graceland Combined School"
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="gradient-bg py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-3 mb-6">
                <Badge className="bg-yellow-400 text-purple-800 font-semibold">
                  🎓 Perfect for Schools & Students
                </Badge>
                <Badge className="bg-green-500 text-white">
                  SA Curriculum Aligned
                </Badge>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight text-white">
                Learn. Code. Build.
                <span className="block text-yellow-300">Create Amazing Robots!</span>
              </h1>
              
              <p className="text-lg lg:text-xl mb-8 text-white opacity-90 leading-relaxed">
                From visual programming to advanced robotics, discover the joy of creating with technology. 
                Perfect for students, classrooms, and curious minds ready to build the future.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Button size="lg" className="bg-yellow-400 text-purple-800 hover:bg-yellow-300 font-bold">
                  <Play className="w-5 h-5 mr-2" />
                  Start Learning Today - FREE!
                </Button>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-800">
                    <School className="w-5 h-5 mr-2" />
                    Schools: Get Demo
                  </Button>
                </Link>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="flex justify-center mb-2 text-yellow-200">
                      {stat.icon}
                    </div>
                    <div className="text-2xl font-bold text-white">{stat.number}</div>
                    <div className="text-sm text-white opacity-80">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <img 
                src={roboticsKitImage}
                alt="Educational robotics kit with micro:bit and components"
                className="rounded-2xl shadow-2xl bg-white p-6"
              />
              <div className="absolute -bottom-6 -right-6 bg-white rounded-lg p-4 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Cpu className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Build & Learn</div>
                    <div className="text-sm text-gray-600">hands-on robotics</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-8 bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <p className="text-gray-600">Trusted by leading schools across South Africa</p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {partnerSchools.slice(0, 6).map((school, index) => (
              <div key={index} className="text-gray-700 font-medium">
                {school}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Why Choose CodewiseHub?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Whether you're a student ready to explore coding, or a school looking to transform STEM education - 
              we have everything you need to succeed in the digital world.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 hover:shadow-xl transition-shadow border-l-4 border-l-blue-500">
                <div className="flex gap-6">
                  <div className="flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {feature.description}
                    </p>
                    <ul className="space-y-2">
                      {feature.benefits.map((benefit, benefitIndex) => (
                        <li key={benefitIndex} className="flex items-center gap-2 text-sm text-gray-700">
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Choose Your Learning Path */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Choose Your Learning Path!
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Whether you're just starting out or ready for advanced challenges, we have the perfect learning journey for you
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Young Coders Path */}
            <Card className="overflow-hidden hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-8 text-white">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
                    <span className="text-2xl">🧒</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Young Coders</h3>
                    <p className="opacity-90">Ages 6-11</p>
                  </div>
                </div>
                <p className="text-lg opacity-90 mb-6">
                  Start your coding adventure with colorful blocks and friendly characters!
                </p>
              </div>
              <CardContent className="p-8">
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span>Visual block-based programming</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span>Fun games and animations</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span>Simple robotics with micro:bit</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span>Progress badges and rewards</span>
                  </li>
                </ul>
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  Start Young Coder Journey
                </Button>
              </CardContent>
            </Card>

            {/* Teen Coders Path */}
            <Card className="overflow-hidden hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-br from-green-500 to-teal-600 p-8 text-white">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
                    <span className="text-2xl">👨‍💻</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Teen Coders</h3>
                    <p className="opacity-90">Ages 12-17</p>
                  </div>
                </div>
                <p className="text-lg opacity-90 mb-6">
                  Master real programming languages and build professional projects!
                </p>
              </div>
              <CardContent className="p-8">
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span>Python, JavaScript & HTML/CSS</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span>Web development projects</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span>Advanced robotics & IoT</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span>AI & machine learning basics</span>
                  </li>
                </ul>
                <Button className="w-full bg-teal-600 hover:bg-teal-700">
                  Start Teen Coder Journey
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Certified Excellence & Compliance
            </h2>
            <p className="text-xl text-gray-600">
              Meeting the highest standards for educational technology
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {certifications.map((cert, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{cert.name}</h3>
                <p className="text-sm text-gray-600">{cert.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Start Your Coding Adventure?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of students and hundreds of schools building the future with CodewiseHub
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button size="lg" className="bg-white text-purple-800 hover:bg-gray-100">
              <Play className="w-5 h-5 mr-2" />
              Start Learning for FREE
            </Button>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-800">
                <School className="w-5 h-5 mr-2" />
                Schools: Request Demo
              </Button>
            </Link>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center text-sm opacity-90">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Free curriculum consultation
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              30-day money-back guarantee
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Ongoing implementation support
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <Card className="p-6">
              <Mail className="w-8 h-8 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Email Us</h3>
              <p className="text-gray-600">schools@codewisehub.co.za</p>
              <p className="text-sm text-gray-500 mt-2">Response within 24 hours</p>
            </Card>
            
            <Card className="p-6">
              <Calendar className="w-8 h-8 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Schedule Demo</h3>
              <p className="text-gray-600">Book a personalized consultation</p>
              <Button className="mt-3" size="sm">
                Book Now
              </Button>
            </Card>
            
            <Card className="p-6">
              <MapPin className="w-8 h-8 text-purple-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Visit Us</h3>
              <p className="text-gray-600">Cape Town & Johannesburg</p>
              <p className="text-sm text-gray-500 mt-2">Training centers available</p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}