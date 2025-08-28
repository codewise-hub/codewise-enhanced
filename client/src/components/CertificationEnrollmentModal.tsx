import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/hooks/useAuth";
import { 
  X, 
  Award, 
  CreditCard, 
  Calendar, 
  Clock,
  CheckCircle,
  User,
  Mail,
  Phone,
  Building
} from "lucide-react";

interface CertificationEnrollmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  certification: any;
}

export function CertificationEnrollmentModal({ isOpen, onClose, certification }: CertificationEnrollmentModalProps) {
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ')[1] || '',
    email: user?.email || '',
    phone: '',
    organization: '',
    position: '',
    experience: '',
    motivation: '',
    paymentMethod: 'credit-card',
    agreeToTerms: false,
    receiveUpdates: true
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [enrollmentComplete, setEnrollmentComplete] = useState(false);

  if (!isOpen) return null;

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmitEnrollment = async () => {
    setIsSubmitting(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setEnrollmentComplete(true);
      setStep(4);
    } catch (error) {
      console.error('Enrollment failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-3xl w-full max-h-[95vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center space-x-3">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-xl border-2 ${getBadgeStyle(certification.color)}`}>
              {certification.badge}
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Enroll in {certification.title}</h2>
              <p className="text-gray-600">{certification.level} • {certification.duration} • {certification.cpd}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          {/* Progress Steps */}
          {!enrollmentComplete && (
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div className={`flex items-center space-x-2 ${step >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                    {step > 1 ? <CheckCircle className="w-5 h-5" /> : '1'}
                  </div>
                  <span className="text-sm font-medium">Personal Details</span>
                </div>
                <div className={`flex items-center space-x-2 ${step >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                    {step > 2 ? <CheckCircle className="w-5 h-5" /> : '2'}
                  </div>
                  <span className="text-sm font-medium">Background</span>
                </div>
                <div className={`flex items-center space-x-2 ${step >= 3 ? 'text-blue-600' : 'text-gray-400'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                    {step > 3 ? <CheckCircle className="w-5 h-5" /> : '3'}
                  </div>
                  <span className="text-sm font-medium">Payment</span>
                </div>
              </div>
            </div>
          )}

          {/* Step 1: Personal Details */}
          {step === 1 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Personal Information</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    placeholder="Enter your first name"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    placeholder="Enter your last name"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="your.email@example.com"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="+27 XX XXX XXXX"
                    className="mt-1"
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <Button onClick={handleNext} disabled={!formData.firstName || !formData.lastName || !formData.email || !formData.phone}>
                  Continue
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Professional Background */}
          {step === 2 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Professional Background</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="organization">School/Organization *</Label>
                  <Input
                    id="organization"
                    value={formData.organization}
                    onChange={(e) => handleInputChange('organization', e.target.value)}
                    placeholder="Your school or organization name"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="position">Current Position *</Label>
                  <Input
                    id="position"
                    value={formData.position}
                    onChange={(e) => handleInputChange('position', e.target.value)}
                    placeholder="e.g. Teacher, HOD, Principal"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="experience">Teaching Experience</Label>
                  <Select onValueChange={(value) => handleInputChange('experience', value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select your experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-2">0-2 years</SelectItem>
                      <SelectItem value="3-5">3-5 years</SelectItem>
                      <SelectItem value="6-10">6-10 years</SelectItem>
                      <SelectItem value="11-20">11-20 years</SelectItem>
                      <SelectItem value="20+">20+ years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="motivation">What motivates you to take this certification? *</Label>
                  <Textarea
                    id="motivation"
                    value={formData.motivation}
                    onChange={(e) => handleInputChange('motivation', e.target.value)}
                    placeholder="Tell us about your goals and expectations..."
                    className="mt-1 min-h-[100px]"
                  />
                </div>
              </div>
              <div className="flex justify-between">
                <Button variant="outline" onClick={handleBack}>
                  Back
                </Button>
                <Button onClick={handleNext} disabled={!formData.organization || !formData.position || !formData.motivation}>
                  Continue
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Payment */}
          {step === 3 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Payment Information</h3>
              
              {/* Order Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Order Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <div className="font-medium">{certification.title}</div>
                      <div className="text-sm text-gray-600">{certification.duration} • {certification.cpd}</div>
                    </div>
                    <div className="text-xl font-bold text-green-600">{certification.price}</div>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span className="text-green-600">{certification.price}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <div>
                <Label>Payment Method</Label>
                <div className="mt-2 space-y-3">
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="credit-card"
                      name="payment"
                      value="credit-card"
                      checked={formData.paymentMethod === 'credit-card'}
                      onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                      className="w-4 h-4"
                    />
                    <label htmlFor="credit-card" className="flex items-center space-x-2 cursor-pointer">
                      <CreditCard className="w-4 h-4" />
                      <span>Credit/Debit Card</span>
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="bank-transfer"
                      name="payment"
                      value="bank-transfer"
                      checked={formData.paymentMethod === 'bank-transfer'}
                      onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                      className="w-4 h-4"
                    />
                    <label htmlFor="bank-transfer" className="flex items-center space-x-2 cursor-pointer">
                      <Building className="w-4 h-4" />
                      <span>Bank Transfer</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="space-y-3">
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="terms"
                    checked={formData.agreeToTerms}
                    onCheckedChange={(checked) => handleInputChange('agreeToTerms', checked)}
                  />
                  <label htmlFor="terms" className="text-sm cursor-pointer">
                    I agree to the <a href="#" className="text-blue-600 hover:underline">Terms and Conditions</a> and <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a> *
                  </label>
                </div>
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="updates"
                    checked={formData.receiveUpdates}
                    onCheckedChange={(checked) => handleInputChange('receiveUpdates', checked)}
                  />
                  <label htmlFor="updates" className="text-sm cursor-pointer">
                    I would like to receive updates about new courses and educational resources
                  </label>
                </div>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={handleBack}>
                  Back
                </Button>
                <Button 
                  onClick={handleSubmitEnrollment}
                  disabled={!formData.agreeToTerms || isSubmitting}
                  className="min-w-[120px]"
                >
                  {isSubmitting ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Processing...</span>
                    </div>
                  ) : (
                    <>
                      <CreditCard className="w-4 h-4 mr-2" />
                      Complete Enrollment
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}

          {/* Step 4: Success */}
          {step === 4 && enrollmentComplete && (
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Enrollment Successful!</h3>
                <p className="text-gray-600">
                  Welcome to the {certification.title} certification program. You'll receive a confirmation email shortly with access details.
                </p>
              </div>
              
              <Card className="text-left">
                <CardHeader>
                  <CardTitle className="text-lg">What happens next?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <Mail className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <div className="font-medium">Check your email</div>
                      <div className="text-sm text-gray-600">You'll receive login credentials and course access within 24 hours</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Calendar className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <div className="font-medium">Course starts Monday</div>
                      <div className="text-sm text-gray-600">Your first module will be available on the next Monday</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Clock className="w-5 h-5 text-purple-600 mt-0.5" />
                    <div>
                      <div className="font-medium">Flexible schedule</div>
                      <div className="text-sm text-gray-600">Complete at your own pace within the {certification.duration} timeframe</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Button onClick={onClose} className="w-full">
                <Award className="w-4 h-4 mr-2" />
                Return to Certifications
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}