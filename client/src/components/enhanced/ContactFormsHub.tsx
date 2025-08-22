import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { 
  School, 
  Users, 
  Mail, 
  Phone, 
  MapPin,
  Calendar,
  BookOpen,
  Award,
  Building2,
  User
} from "lucide-react";

export function ContactFormsHub() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("school");

  // School Contact Form State
  const [schoolForm, setSchoolForm] = useState({
    schoolName: "",
    contactPerson: "",
    email: "",
    phone: "",
    province: "",
    district: "",
    studentCount: "",
    grades: "",
    currentSTEMProgram: "",
    interests: [] as string[],
    message: "",
    preferredContactTime: "",
    urgency: "medium"
  });

  // Parent Contact Form State  
  const [parentForm, setParentForm] = useState({
    parentName: "",
    email: "",
    phone: "",
    childName: "",
    childAge: "",
    currentSchool: "",
    interests: [] as string[],
    experience: "",
    goals: "",
    message: "",
    preferredContactTime: "",
    hearAboutUs: ""
  });

  const provinces = [
    "Eastern Cape", "Free State", "Gauteng", "KwaZulu-Natal", 
    "Limpopo", "Mpumalanga", "Northern Cape", "North West", "Western Cape"
  ];

  const schoolInterests = [
    "Curriculum Integration", "Teacher Training", "Robotics Kits", 
    "Assessment Tools", "Professional Development", "CAPS Alignment",
    "Maker Space Setup", "Digital Citizenship", "AI Education"
  ];

  const parentInterests = [
    "After-School Programs", "Holiday Camps", "Online Courses",
    "Parent-Child Workshops", "Advanced Programming", "Robotics Clubs",
    "Competition Preparation", "University Preparation"
  ];

  const handleSchoolSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Request Submitted Successfully!",
        description: "Our education consultant will contact you within 24 hours.",
      });
      
      // Reset form
      setSchoolForm({
        schoolName: "",
        contactPerson: "",
        email: "",
        phone: "",
        province: "",
        district: "",
        studentCount: "",
        grades: "",
        currentSTEMProgram: "",
        interests: [],
        message: "",
        preferredContactTime: "",
        urgency: "medium"
      });
      
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    }
  };

  const handleParentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Thank You for Your Interest!",
        description: "We'll be in touch soon with program recommendations for your child.",
      });
      
      // Reset form
      setParentForm({
        parentName: "",
        email: "",
        phone: "",
        childName: "",
        childAge: "",
        currentSchool: "",
        interests: [],
        experience: "",
        goals: "",
        message: "",
        preferredContactTime: "",
        hearAboutUs: ""
      });
      
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    }
  };

  const handleInterestToggle = (interest: string, formType: 'school' | 'parent') => {
    if (formType === 'school') {
      const newInterests = schoolForm.interests.includes(interest)
        ? schoolForm.interests.filter(i => i !== interest)
        : [...schoolForm.interests, interest];
      setSchoolForm(prev => ({ ...prev, interests: newInterests }));
    } else {
      const newInterests = parentForm.interests.includes(interest)
        ? parentForm.interests.filter(i => i !== interest)
        : [...parentForm.interests, interest];
      setParentForm(prev => ({ ...prev, interests: newInterests }));
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">Contact CodewiseHub</h1>
        <p className="text-xl text-gray-600">
          Get personalized guidance for your school or child's coding journey
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
          <TabsTrigger value="school" className="flex items-center gap-2">
            <School className="w-4 h-4" />
            School Inquiry
          </TabsTrigger>
          <TabsTrigger value="parent" className="flex items-center gap-2">
            <User className="w-4 h-4" />
            Parent Inquiry
          </TabsTrigger>
        </TabsList>

        {/* School Contact Form */}
        <TabsContent value="school">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="flex items-center gap-2 justify-center">
                <Building2 className="w-6 h-6 text-blue-600" />
                School Partnership Inquiry
              </CardTitle>
              <CardDescription>
                Transform your STEM education with our comprehensive school solutions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSchoolSubmit} className="space-y-6">
                {/* Basic Information */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="schoolName">School Name *</Label>
                    <Input
                      id="schoolName"
                      value={schoolForm.schoolName}
                      onChange={(e) => setSchoolForm(prev => ({ ...prev, schoolName: e.target.value }))}
                      placeholder="e.g., Pinelands Primary School"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contactPerson">Contact Person *</Label>
                    <Input
                      id="contactPerson"
                      value={schoolForm.contactPerson}
                      onChange={(e) => setSchoolForm(prev => ({ ...prev, contactPerson: e.target.value }))}
                      placeholder="Principal / HOD / Teacher"
                      required
                    />
                  </div>
                </div>

                {/* Contact Details */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={schoolForm.email}
                      onChange={(e) => setSchoolForm(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="principal@school.co.za"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={schoolForm.phone}
                      onChange={(e) => setSchoolForm(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="+27 21 555 0123"
                    />
                  </div>
                </div>

                {/* Location */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Province *</Label>
                    <Select 
                      value={schoolForm.province} 
                      onValueChange={(value) => setSchoolForm(prev => ({ ...prev, province: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select province" />
                      </SelectTrigger>
                      <SelectContent>
                        {provinces.map((province) => (
                          <SelectItem key={province} value={province}>
                            {province}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="district">District/City</Label>
                    <Input
                      id="district"
                      value={schoolForm.district}
                      onChange={(e) => setSchoolForm(prev => ({ ...prev, district: e.target.value }))}
                      placeholder="e.g., Cape Town Metro"
                    />
                  </div>
                </div>

                {/* School Details */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="studentCount">Number of Students</Label>
                    <Select 
                      value={schoolForm.studentCount} 
                      onValueChange={(value) => setSchoolForm(prev => ({ ...prev, studentCount: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select student count" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="under-100">Under 100</SelectItem>
                        <SelectItem value="100-300">100-300</SelectItem>
                        <SelectItem value="300-600">300-600</SelectItem>
                        <SelectItem value="600-1000">600-1000</SelectItem>
                        <SelectItem value="over-1000">Over 1000</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="grades">Grades Taught</Label>
                    <Input
                      id="grades"
                      value={schoolForm.grades}
                      onChange={(e) => setSchoolForm(prev => ({ ...prev, grades: e.target.value }))}
                      placeholder="e.g., Grade R-7 or Grade 8-12"
                    />
                  </div>
                </div>

                {/* Current STEM Program */}
                <div className="space-y-2">
                  <Label htmlFor="currentSTEMProgram">Current STEM/Technology Program</Label>
                  <Textarea
                    id="currentSTEMProgram"
                    value={schoolForm.currentSTEMProgram}
                    onChange={(e) => setSchoolForm(prev => ({ ...prev, currentSTEMProgram: e.target.value }))}
                    placeholder="Describe any existing coding, robotics, or technology programs at your school"
                    rows={3}
                  />
                </div>

                {/* Areas of Interest */}
                <div className="space-y-3">
                  <Label>Areas of Interest (Select all that apply)</Label>
                  <div className="grid md:grid-cols-3 gap-3">
                    {schoolInterests.map((interest) => (
                      <div key={interest} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={`school-${interest}`}
                          checked={schoolForm.interests.includes(interest)}
                          onChange={() => handleInterestToggle(interest, 'school')}
                          className="rounded border-gray-300"
                        />
                        <label htmlFor={`school-${interest}`} className="text-sm">
                          {interest}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Preferences */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Preferred Contact Time</Label>
                    <Select 
                      value={schoolForm.preferredContactTime} 
                      onValueChange={(value) => setSchoolForm(prev => ({ ...prev, preferredContactTime: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="morning">Morning (8AM-12PM)</SelectItem>
                        <SelectItem value="afternoon">Afternoon (12PM-5PM)</SelectItem>
                        <SelectItem value="anytime">Anytime</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Urgency</Label>
                    <Select 
                      value={schoolForm.urgency} 
                      onValueChange={(value) => setSchoolForm(prev => ({ ...prev, urgency: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select urgency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high">High - Need solution ASAP</SelectItem>
                        <SelectItem value="medium">Medium - Planning for next term</SelectItem>
                        <SelectItem value="low">Low - Exploring options</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Additional Message */}
                <div className="space-y-2">
                  <Label htmlFor="message">Additional Information</Label>
                  <Textarea
                    id="message"
                    value={schoolForm.message}
                    onChange={(e) => setSchoolForm(prev => ({ ...prev, message: e.target.value }))}
                    placeholder="Tell us about your specific needs, challenges, or questions..."
                    rows={4}
                  />
                </div>

                <Button type="submit" size="lg" className="w-full">
                  <Mail className="w-5 h-5 mr-2" />
                  Submit School Inquiry
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Parent Contact Form */}
        <TabsContent value="parent">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="flex items-center gap-2 justify-center">
                <Users className="w-6 h-6 text-purple-600" />
                Parent & Student Inquiry
              </CardTitle>
              <CardDescription>
                Find the perfect coding program for your child's learning journey
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleParentSubmit} className="space-y-6">
                {/* Parent Information */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="parentName">Parent/Guardian Name *</Label>
                    <Input
                      id="parentName"
                      value={parentForm.parentName}
                      onChange={(e) => setParentForm(prev => ({ ...prev, parentName: e.target.value }))}
                      placeholder="Your full name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="parentEmail">Email Address *</Label>
                    <Input
                      id="parentEmail"
                      type="email"
                      value={parentForm.email}
                      onChange={(e) => setParentForm(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="parent@example.com"
                      required
                    />
                  </div>
                </div>

                {/* Contact & Child Info */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="parentPhone">Phone Number</Label>
                    <Input
                      id="parentPhone"
                      type="tel"
                      value={parentForm.phone}
                      onChange={(e) => setParentForm(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="+27 82 555 0123"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="childName">Child's Name *</Label>
                    <Input
                      id="childName"
                      value={parentForm.childName}
                      onChange={(e) => setParentForm(prev => ({ ...prev, childName: e.target.value }))}
                      placeholder="Your child's name"
                      required
                    />
                  </div>
                </div>

                {/* Child Details */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Child's Age *</Label>
                    <Select 
                      value={parentForm.childAge} 
                      onValueChange={(value) => setParentForm(prev => ({ ...prev, childAge: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select age" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({length: 12}, (_, i) => i + 6).map(age => (
                          <SelectItem key={age} value={age.toString()}>
                            {age} years old
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currentSchool">Current School</Label>
                    <Input
                      id="currentSchool"
                      value={parentForm.currentSchool}
                      onChange={(e) => setParentForm(prev => ({ ...prev, currentSchool: e.target.value }))}
                      placeholder="School name and grade"
                    />
                  </div>
                </div>

                {/* Experience Level */}
                <div className="space-y-2">
                  <Label>Child's Coding Experience</Label>
                  <Select 
                    value={parentForm.experience} 
                    onValueChange={(value) => setParentForm(prev => ({ ...prev, experience: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Complete Beginner</SelectItem>
                      <SelectItem value="some">Some Scratch/Block Coding</SelectItem>
                      <SelectItem value="intermediate">Basic Programming Skills</SelectItem>
                      <SelectItem value="advanced">Advanced/Competition Level</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Interests */}
                <div className="space-y-3">
                  <Label>Program Interests (Select all that apply)</Label>
                  <div className="grid md:grid-cols-2 gap-3">
                    {parentInterests.map((interest) => (
                      <div key={interest} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={`parent-${interest}`}
                          checked={parentForm.interests.includes(interest)}
                          onChange={() => handleInterestToggle(interest, 'parent')}
                          className="rounded border-gray-300"
                        />
                        <label htmlFor={`parent-${interest}`} className="text-sm">
                          {interest}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Goals */}
                <div className="space-y-2">
                  <Label htmlFor="goals">Learning Goals</Label>
                  <Textarea
                    id="goals"
                    value={parentForm.goals}
                    onChange={(e) => setParentForm(prev => ({ ...prev, goals: e.target.value }))}
                    placeholder="What do you hope your child will achieve? e.g., build confidence, prepare for high school, career exploration"
                    rows={3}
                  />
                </div>

                {/* Additional Info */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Preferred Contact Time</Label>
                    <Select 
                      value={parentForm.preferredContactTime} 
                      onValueChange={(value) => setParentForm(prev => ({ ...prev, preferredContactTime: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="morning">Morning (8AM-12PM)</SelectItem>
                        <SelectItem value="afternoon">Afternoon (12PM-5PM)</SelectItem>
                        <SelectItem value="evening">Evening (5PM-8PM)</SelectItem>
                        <SelectItem value="anytime">Anytime</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>How did you hear about us?</Label>
                    <Select 
                      value={parentForm.hearAboutUs} 
                      onValueChange={(value) => setParentForm(prev => ({ ...prev, hearAboutUs: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select source" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="school">Through School</SelectItem>
                        <SelectItem value="google">Google Search</SelectItem>
                        <SelectItem value="social">Social Media</SelectItem>
                        <SelectItem value="friend">Friend Recommendation</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <Label htmlFor="parentMessage">Questions or Comments</Label>
                  <Textarea
                    id="parentMessage"
                    value={parentForm.message}
                    onChange={(e) => setParentForm(prev => ({ ...prev, message: e.target.value }))}
                    placeholder="Any specific questions about programs, schedules, or your child's needs?"
                    rows={3}
                  />
                </div>

                <Button type="submit" size="lg" className="w-full">
                  <User className="w-5 h-5 mr-2" />
                  Submit Parent Inquiry
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Contact Information Cards */}
      <div className="grid md:grid-cols-3 gap-6 mt-12">
        <Card className="text-center p-6">
          <Phone className="w-8 h-8 text-blue-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Call Us</h3>
          <p className="text-gray-600">+27 21 555 0123</p>
          <p className="text-sm text-gray-500">Mon-Fri 8AM-5PM</p>
        </Card>
        
        <Card className="text-center p-6">
          <Mail className="w-8 h-8 text-purple-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Email Us</h3>
          <p className="text-gray-600">hello@codewisehub.co.za</p>
          <p className="text-sm text-gray-500">24-hour response time</p>
        </Card>
        
        <Card className="text-center p-6">
          <MapPin className="w-8 h-8 text-green-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Visit Us</h3>
          <p className="text-gray-600">Cape Town & Johannesburg</p>
          <p className="text-sm text-gray-500">Demo centers available</p>
        </Card>
      </div>
    </div>
  );
}