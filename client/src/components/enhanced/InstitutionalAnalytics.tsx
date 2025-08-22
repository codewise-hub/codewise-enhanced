import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  TrendingUp, 
  Users, 
  GraduationCap, 
  Award,
  BookOpen,
  Clock,
  Target,
  BarChart3,
  PieChart,
  Download,
  Calendar,
  School,
  CheckCircle,
  AlertTriangle,
  Star
} from "lucide-react";

interface AnalyticsData {
  enrollment: {
    total: number;
    byGrade: { grade: string; count: number; growth: number }[];
    byMonth: { month: string; count: number }[];
  };
  engagement: {
    averageSessionTime: number;
    completionRate: number;
    activeUsers: number;
    topActivities: { activity: string; completions: number; avgScore: number }[];
  };
  performance: {
    overallProgress: number;
    skillsMastery: { skill: string; mastery: number; improvement: number }[];
    assessmentScores: { assessment: string; averageScore: number; trend: number }[];
  };
  teacher: {
    certifiedTeachers: number;
    trainingCompleted: number;
    supportTickets: number;
    satisfaction: number;
  };
}

export function InstitutionalAnalytics() {
  const [selectedPeriod, setSelectedPeriod] = useState("last-month");
  const [selectedGrade, setSelectedGrade] = useState("all");
  const [activeTab, setActiveTab] = useState("overview");
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  // Simulate data loading
  useEffect(() => {
    const loadAnalytics = async () => {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockData: AnalyticsData = {
        enrollment: {
          total: 1247,
          byGrade: [
            { grade: "Grade 4-6", count: 487, growth: 15.2 },
            { grade: "Grade 7-9", count: 523, growth: 22.8 },
            { grade: "Grade 10-12", count: 237, growth: 8.4 }
          ],
          byMonth: [
            { month: "Jan", count: 1089 },
            { month: "Feb", count: 1134 },
            { month: "Mar", count: 1198 },
            { month: "Apr", count: 1247 }
          ]
        },
        engagement: {
          averageSessionTime: 47,
          completionRate: 78.5,
          activeUsers: 1156,
          topActivities: [
            { activity: "Robot Dance Party", completions: 892, avgScore: 87 },
            { activity: "Treasure Hunt Adventure", completions: 756, avgScore: 82 },
            { activity: "AI Chatbot Builder", completions: 623, avgScore: 91 },
            { activity: "Smart Home Simulator", completions: 534, avgScore: 85 }
          ]
        },
        performance: {
          overallProgress: 82.3,
          skillsMastery: [
            { skill: "Sequential Logic", mastery: 89, improvement: 12 },
            { skill: "Problem Solving", mastery: 85, improvement: 18 },
            { skill: "Creative Thinking", mastery: 91, improvement: 8 },
            { skill: "Collaboration", mastery: 76, improvement: 22 },
            { skill: "Technical Communication", mastery: 73, improvement: 15 }
          ],
          assessmentScores: [
            { assessment: "Computational Thinking", averageScore: 84, trend: 7 },
            { assessment: "Programming Concepts", averageScore: 78, trend: 12 },
            { assessment: "Project Portfolio", averageScore: 88, trend: 4 },
            { assessment: "Peer Collaboration", averageScore: 82, trend: 9 }
          ]
        },
        teacher: {
          certifiedTeachers: 28,
          trainingCompleted: 92,
          supportTickets: 3,
          satisfaction: 94
        }
      };
      
      setAnalyticsData(mockData);
      setLoading(false);
    };

    loadAnalytics();
  }, [selectedPeriod, selectedGrade]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading institutional analytics...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!analyticsData) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Institutional Analytics</h1>
            <p className="text-gray-600 mt-2">
              Comprehensive insights into your school's STEM education program
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="last-week">Last Week</SelectItem>
                <SelectItem value="last-month">Last Month</SelectItem>
                <SelectItem value="last-quarter">Last Quarter</SelectItem>
                <SelectItem value="last-year">Last Year</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedGrade} onValueChange={setSelectedGrade}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Grades</SelectItem>
                <SelectItem value="grade-4-6">Grade 4-6</SelectItem>
                <SelectItem value="grade-7-9">Grade 7-9</SelectItem>
                <SelectItem value="grade-10-12">Grade 10-12</SelectItem>
              </SelectContent>
            </Select>
            <Button>
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Key Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Enrollment</p>
                  <p className="text-3xl font-bold text-gray-900">{analyticsData.enrollment.total.toLocaleString()}</p>
                  <p className="text-sm text-green-600 flex items-center mt-1">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    +18.2% from last period
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Course Completion</p>
                  <p className="text-3xl font-bold text-gray-900">{analyticsData.engagement.completionRate}%</p>
                  <p className="text-sm text-green-600 flex items-center mt-1">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    +5.3% improvement
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Certified Teachers</p>
                  <p className="text-3xl font-bold text-gray-900">{analyticsData.teacher.certifiedTeachers}</p>
                  <p className="text-sm text-blue-600 flex items-center mt-1">
                    <Award className="w-4 h-4 mr-1" />
                    {analyticsData.teacher.trainingCompleted}% trained
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Teacher Satisfaction</p>
                  <p className="text-3xl font-bold text-gray-900">{analyticsData.teacher.satisfaction}%</p>
                  <p className="text-sm text-yellow-600 flex items-center mt-1">
                    <Star className="w-4 h-4 mr-1" />
                    4.7/5 rating
                  </p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Star className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Analytics */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Student Progress</TabsTrigger>
            <TabsTrigger value="engagement">Engagement Analysis</TabsTrigger>
            <TabsTrigger value="performance">Skills Assessment</TabsTrigger>
            <TabsTrigger value="teacher">Teacher Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="w-5 h-5 text-blue-600" />
                    <span>Enrollment by Grade Level</span>
                  </CardTitle>
                  <CardDescription>
                    Current student distribution across grade levels with growth trends
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analyticsData.enrollment.byGrade.map((grade, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{grade.grade}</span>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-600">{grade.count} students</span>
                            <Badge variant={grade.growth > 15 ? "default" : "secondary"} className="text-xs">
                              +{grade.growth}%
                            </Badge>
                          </div>
                        </div>
                        <Progress value={(grade.count / analyticsData.enrollment.total) * 100} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="w-5 h-5 text-green-600" />
                    <span>Overall Learning Progress</span>
                  </CardTitle>
                  <CardDescription>
                    Aggregate progress across all students and activities
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-6">
                    <div className="text-4xl font-bold text-green-600 mb-2">
                      {analyticsData.performance.overallProgress}%
                    </div>
                    <div className="text-gray-600">Average Completion Rate</div>
                    <Progress value={analyticsData.performance.overallProgress} className="mt-4" />
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">
                        {analyticsData.engagement.averageSessionTime}min
                      </div>
                      <div className="text-sm text-blue-700">Avg Session Time</div>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">
                        {analyticsData.engagement.activeUsers}
                      </div>
                      <div className="text-sm text-green-700">Active Learners</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="engagement" className="mt-6">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5 text-purple-600" />
                    <span>Top Performing Activities</span>
                  </CardTitle>
                  <CardDescription>
                    Most engaging activities based on completion rates and student scores
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analyticsData.engagement.topActivities.map((activity, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-sm font-bold text-purple-600">
                              {index + 1}
                            </div>
                            <div>
                              <h4 className="font-semibold">{activity.activity}</h4>
                              <p className="text-sm text-gray-600">
                                {activity.completions} completions • Average score: {activity.avgScore}%
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-gray-900">
                            {activity.avgScore}%
                          </div>
                          <Progress value={activity.avgScore} className="w-24 h-2" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="performance" className="mt-6">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Award className="w-5 h-5 text-orange-600" />
                    <span>Skills Mastery Analysis</span>
                  </CardTitle>
                  <CardDescription>
                    Student progress across key 21st-century skills
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {analyticsData.performance.skillsMastery.map((skill, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{skill.skill}</span>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-semibold">{skill.mastery}%</span>
                            <Badge variant={skill.improvement > 15 ? "default" : "secondary"} className="text-xs">
                              +{skill.improvement}%
                            </Badge>
                          </div>
                        </div>
                        <Progress value={skill.mastery} className="h-3" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BookOpen className="w-5 h-5 text-blue-600" />
                    <span>Assessment Performance</span>
                  </CardTitle>
                  <CardDescription>
                    Formal assessment results and trending
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {analyticsData.performance.assessmentScores.map((assessment, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <div className="font-semibold">{assessment.assessment}</div>
                          <div className="text-sm text-gray-600">
                            Average Score: {assessment.averageScore}%
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <TrendingUp className="w-4 h-4 text-green-600" />
                          <span className="text-green-600 font-medium">+{assessment.trend}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="teacher" className="mt-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <GraduationCap className="w-5 h-5 text-green-600" />
                    <span>Professional Development Status</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600 mb-2">
                        {analyticsData.teacher.trainingCompleted}%
                      </div>
                      <div className="text-gray-600 mb-4">Training Completion Rate</div>
                      <Progress value={analyticsData.teacher.trainingCompleted} className="h-3" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">
                          {analyticsData.teacher.certifiedTeachers}
                        </div>
                        <div className="text-sm text-blue-700">Certified Teachers</div>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">
                          {analyticsData.teacher.supportTickets}
                        </div>
                        <div className="text-sm text-green-700">Open Support Tickets</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Star className="w-5 h-5 text-yellow-600" />
                    <span>Teacher Satisfaction</span>
                  </CardTitle>
                  <CardDescription>
                    Feedback and satisfaction metrics from educators
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-6">
                    <div className="text-4xl font-bold text-yellow-600 mb-2">
                      {analyticsData.teacher.satisfaction}%
                    </div>
                    <div className="text-gray-600">Overall Satisfaction</div>
                    <div className="flex justify-center mt-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <Progress value={analyticsData.teacher.satisfaction} className="mt-4" />
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Platform Usability</span>
                      <span className="text-sm font-semibold">96%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Training Quality</span>
                      <span className="text-sm font-semibold">94%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Support Response</span>
                      <span className="text-sm font-semibold">98%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Resource Quality</span>
                      <span className="text-sm font-semibold">92%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Action Items */}
        <div className="mt-8">
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Recommended Actions
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="w-4 h-4 text-orange-500" />
                      <span className="text-sm">3 teachers need additional training support</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Grade 7-9 showing exceptional engagement - consider expansion</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="w-4 h-4 text-blue-500" />
                      <span className="text-sm">Technical Communication skills show opportunity for improvement</span>
                    </div>
                  </div>
                </div>
                <Button className="ml-4">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Review
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}