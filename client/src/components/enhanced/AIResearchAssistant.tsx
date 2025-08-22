import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/hooks/useAuth";
import { 
  Search, 
  BookOpen, 
  Lightbulb, 
  Code, 
  Brain,
  Zap,
  Globe,
  Database,
  Cpu,
  MessageSquare,
  Send,
  Star,
  Clock,
  ChevronDown,
  ChevronUp
} from "lucide-react";

interface ResearchQuery {
  id: string;
  question: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  timestamp: Date;
  sources: string[];
  summary: string;
  relatedTopics: string[];
  codeExamples?: string[];
  followUpQuestions: string[];
}

interface AIResearchAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AIResearchAssistant({ isOpen, onClose }: AIResearchAssistantProps) {
  const { user } = useAuth();
  const [query, setQuery] = useState('');
  const [isResearching, setIsResearching] = useState(false);
  const [researchHistory, setResearchHistory] = useState<ResearchQuery[]>([]);
  const [activeTab, setActiveTab] = useState('research');
  const [selectedQuery, setSelectedQuery] = useState<ResearchQuery | null>(null);
  const [expandedQuery, setExpandedQuery] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const isLittleCoder = user?.ageGroup === '6-11';

  const researchCategories = [
    { id: 'programming', label: 'Programming', icon: <Code className="w-4 h-4" />, color: 'bg-blue-100 text-blue-800' },
    { id: 'algorithms', label: 'Algorithms', icon: <Brain className="w-4 h-4" />, color: 'bg-purple-100 text-purple-800' },
    { id: 'ai_ml', label: 'AI & Machine Learning', icon: <Zap className="w-4 h-4" />, color: 'bg-yellow-100 text-yellow-800' },
    { id: 'web_dev', label: 'Web Development', icon: <Globe className="w-4 h-4" />, color: 'bg-green-100 text-green-800' },
    { id: 'data_science', label: 'Data Science', icon: <Database className="w-4 h-4" />, color: 'bg-red-100 text-red-800' },
    { id: 'computer_science', label: 'Computer Science', icon: <Cpu className="w-4 h-4" />, color: 'bg-indigo-100 text-indigo-800' }
  ];

  const sampleQuestions = isLittleCoder ? [
    "How do I make a character jump in Scratch?",
    "What is a variable and how do I use it?",
    "How can I make my robot follow a line?",
    "What are loops and why are they useful?",
    "How do I create animations in my game?"
  ] : [
    "What's the difference between machine learning and deep learning?",
    "How do I optimize a sorting algorithm for large datasets?",
    "What are the best practices for secure web authentication?",
    "How do quantum computers work and what can they solve?",
    "What are the key principles of good software architecture?"
  ];

  const generateResearchResponse = async (question: string): Promise<ResearchQuery> => {
    // Simulate research delay
    await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 3000));

    const categories = researchCategories.map(cat => cat.id);
    const category = categories[Math.floor(Math.random() * categories.length)];
    
    let response: Partial<ResearchQuery> = {
      id: Date.now().toString(),
      question,
      category,
      timestamp: new Date(),
      difficulty: isLittleCoder ? 'beginner' : Math.random() > 0.5 ? 'intermediate' : 'advanced'
    };

    // Generate contextual responses based on question content
    const questionLower = question.toLowerCase();
    
    if (questionLower.includes('loop') || questionLower.includes('repeat')) {
      response = {
        ...response,
        category: 'programming',
        summary: isLittleCoder 
          ? "Loops are like doing something over and over again! In coding, we use loops when we want the computer to repeat actions. Like brushing your teeth every morning - you do the same steps multiple times. There are different types of loops: 'forever' loops that never stop, and 'repeat 10 times' loops that count and then stop."
          : "Loops are fundamental control structures in programming that allow you to execute a block of code repeatedly. There are several types: for loops (definite iteration), while loops (conditional iteration), and do-while loops. They're essential for processing arrays, handling user input, and creating efficient algorithms.",
        sources: [
          "Introduction to Programming Concepts - MIT OpenCourseWare",
          "Loop Structures in Computer Science - Khan Academy",
          "Best Practices for Loop Optimization - Google Developers"
        ],
        relatedTopics: ["Variables", "Conditional Statements", "Arrays", "Functions", "Iteration"],
        codeExamples: isLittleCoder 
          ? ["Repeat 10 [move 10 steps, turn 36 degrees] // Makes a circle!"]
          : [
              "for (let i = 0; i < array.length; i++) { console.log(array[i]); }",
              "while (condition) { // do something }",
              "array.forEach(item => console.log(item));"
            ],
        followUpQuestions: [
          "What's the difference between for and while loops?",
          "How do I avoid infinite loops?", 
          "When should I use nested loops?"
        ]
      };
    } else if (questionLower.includes('ai') || questionLower.includes('machine learning')) {
      response = {
        ...response,
        category: 'ai_ml',
        summary: isLittleCoder
          ? "AI (Artificial Intelligence) is like making computers think and learn like humans! Imagine a computer that can recognize your drawings, understand what you say, or even play games with you. Machine Learning is when computers learn from examples - like showing a computer 1000 pictures of cats so it can recognize cats in new pictures!"
          : "Artificial Intelligence encompasses various techniques for creating systems that can perform tasks typically requiring human intelligence. Machine Learning is a subset of AI that enables computers to learn patterns from data without explicit programming. Deep Learning uses neural networks with multiple layers to model complex patterns, particularly effective for image recognition, natural language processing, and decision-making tasks.",
        sources: [
          "Introduction to Artificial Intelligence - Stanford CS221",
          "Machine Learning Basics - Andrew Ng's Course", 
          "AI Ethics and Applications - Partnership on AI",
          "Neural Networks and Deep Learning - deeplearning.ai"
        ],
        relatedTopics: ["Neural Networks", "Data Science", "Python Programming", "Statistics", "Computer Vision"],
        codeExamples: isLittleCoder
          ? ["Ask AI: 'What animal is in this picture?' // Computer looks and says 'Cat!'"]
          : [
              "import tensorflow as tf\nmodel = tf.keras.Sequential([tf.keras.layers.Dense(128, activation='relu')])",
              "from sklearn.linear_model import LinearRegression\nmodel = LinearRegression().fit(X, y)",
              "import torch\nmodel = torch.nn.Linear(input_size, output_size)"
            ],
        followUpQuestions: [
          "What's the difference between supervised and unsupervised learning?",
          "How do neural networks actually work?",
          "What are the ethical considerations in AI development?"
        ]
      };
    } else if (questionLower.includes('algorithm') || questionLower.includes('sorting')) {
      response = {
        ...response,
        category: 'algorithms',
        summary: isLittleCoder
          ? "An algorithm is like a recipe for solving problems! Just like making a sandwich has steps (get bread, add filling, close sandwich), computer algorithms have steps to solve problems. Sorting algorithms help organize things in order - like arranging your toys from smallest to biggest, or your books alphabetically!"
          : "Algorithms are step-by-step procedures for solving computational problems. Sorting algorithms organize data in a specific order, with different approaches offering various trade-offs between time complexity, space complexity, and stability. Common sorting algorithms include Quick Sort (O(n log n) average), Merge Sort (O(n log n) guaranteed), and Bubble Sort (O(n²) but simple to understand).",
        sources: [
          "Introduction to Algorithms - MIT Press (CLRS)",
          "Algorithm Design and Analysis - Stanford CS161",
          "Sorting Algorithms Visualization - VisuAlgo",
          "Big O Notation Guide - Khan Academy"
        ],
        relatedTopics: ["Data Structures", "Time Complexity", "Space Complexity", "Recursion", "Dynamic Programming"],
        codeExamples: isLittleCoder
          ? ["1. Compare two items", "2. Put smaller one first", "3. Repeat until sorted!"]
          : [
              "def quicksort(arr): return [] if len(arr) <= 1 else quicksort([x for x in arr[1:] if x < arr[0]]) + [arr[0]] + quicksort([x for x in arr[1:] if x >= arr[0]])",
              "def merge_sort(arr): # Divide and conquer approach",
              "def bubble_sort(arr): # Simple but inefficient O(n²)"
            ],
        followUpQuestions: [
          "Which sorting algorithm should I use for my specific use case?",
          "How do I analyze the time complexity of algorithms?",
          "What are some real-world applications of different algorithms?"
        ]
      };
    } else {
      // General response for other questions
      response = {
        ...response,
        summary: isLittleCoder
          ? "That's a great question! Programming is all about solving problems step by step. Let me help you understand this concept in a fun and easy way. Remember, every expert programmer started as a beginner, so keep asking questions and experimenting!"
          : "This is an interesting technical question that requires a comprehensive analysis. Let me break down the key concepts and provide you with detailed information, practical examples, and resources for deeper learning.",
        sources: [
          "Programming Fundamentals - Various Educational Sources",
          "Computer Science Principles - College Board",
          "Developer Documentation and Best Practices"
        ],
        relatedTopics: ["Problem Solving", "Logic", "Programming Concepts", "Software Development"],
        codeExamples: ["// Example code would be provided based on specific question context"],
        followUpQuestions: [
          "Can you give me a specific example?",
          "How would I implement this in practice?",
          "What are the common mistakes to avoid?"
        ]
      };
    }

    return response as ResearchQuery;
  };

  const handleResearch = async () => {
    if (!query.trim()) return;

    setIsResearching(true);
    
    try {
      const result = await generateResearchResponse(query);
      setResearchHistory(prev => [result, ...prev]);
      setSelectedQuery(result);
      setQuery('');
    } catch (error) {
      console.error('Research failed:', error);
    } finally {
      setIsResearching(false);
    }
  };

  const handleSampleQuestion = (question: string) => {
    setQuery(question);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [researchHistory]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl w-full max-w-6xl h-[90vh] flex flex-col">
        <div className="p-6 border-b bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-2xl">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold mb-2">
                {isLittleCoder ? "🔍 Code Detective" : "🧠 AI Research Assistant"}
              </h2>
              <p className="opacity-90">
                {isLittleCoder 
                  ? "Ask questions and discover amazing coding secrets!"
                  : "Advanced research assistant for deep technical exploration"
                }
              </p>
            </div>
            <Button onClick={onClose} variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600">
              ✕
            </Button>
          </div>
        </div>

        <div className="flex-1 flex">
          {/* Main Research Area */}
          <div className="flex-1 flex flex-col">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
              <TabsList className="grid w-full grid-cols-3 mx-6 mt-4">
                <TabsTrigger value="research">Research</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
                <TabsTrigger value="favorites">Saved</TabsTrigger>
              </TabsList>

              <TabsContent value="research" className="flex-1 flex flex-col p-6 space-y-6">
                {/* Search Input */}
                <Card>
                  <CardContent className="p-4">
                    <div className="flex space-x-3">
                      <Input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder={isLittleCoder 
                          ? "What coding mystery would you like to solve?"
                          : "Enter your technical research question..."
                        }
                        className="flex-1"
                        onKeyPress={(e) => e.key === 'Enter' && handleResearch()}
                        disabled={isResearching}
                      />
                      <Button 
                        onClick={handleResearch} 
                        disabled={!query.trim() || isResearching}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        {isResearching ? (
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <Search className="w-5 h-5" />
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Sample Questions */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Lightbulb className="w-5 h-5 text-yellow-500" />
                      {isLittleCoder ? "Fun Questions to Explore" : "Popular Research Topics"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {sampleQuestions.map((question, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          onClick={() => handleSampleQuestion(question)}
                          className="text-left h-auto py-2 px-3 whitespace-normal"
                        >
                          {question}
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Research Progress */}
                {isResearching && (
                  <Card>
                    <CardContent className="p-6">
                      <div className="text-center space-y-4">
                        <div className="text-lg font-medium">
                          {isLittleCoder ? "🔍 Investigating your question..." : "🧠 Researching and analyzing..."}
                        </div>
                        <Progress value={65} className="w-full" />
                        <div className="text-sm text-gray-600">
                          Gathering information from reliable sources...
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Latest Result */}
                {selectedQuery && (
                  <Card className="border-2 border-blue-200">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg mb-2">{selectedQuery.question}</CardTitle>
                          <div className="flex items-center gap-2 mb-4">
                            <Badge className={researchCategories.find(cat => cat.id === selectedQuery.category)?.color}>
                              {researchCategories.find(cat => cat.id === selectedQuery.category)?.icon}
                              <span className="ml-1">{researchCategories.find(cat => cat.id === selectedQuery.category)?.label}</span>
                            </Badge>
                            <Badge variant="outline" className="capitalize">
                              {selectedQuery.difficulty}
                            </Badge>
                            <div className="flex items-center text-sm text-gray-500">
                              <Clock className="w-4 h-4 mr-1" />
                              {selectedQuery.timestamp.toLocaleTimeString()}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Summary */}
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <BookOpen className="w-4 h-4" />
                          {isLittleCoder ? "Simple Explanation" : "Research Summary"}
                        </h4>
                        <p className="text-gray-700 leading-relaxed">{selectedQuery.summary}</p>
                      </div>

                      {/* Code Examples */}
                      {selectedQuery.codeExamples && selectedQuery.codeExamples.length > 0 && (
                        <div>
                          <h4 className="font-semibold mb-3 flex items-center gap-2">
                            <Code className="w-4 h-4" />
                            {isLittleCoder ? "Code Examples" : "Implementation Examples"}
                          </h4>
                          <div className="space-y-3">
                            {selectedQuery.codeExamples.map((example, index) => (
                              <div key={index} className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                                {example}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Related Topics */}
                      <div>
                        <h4 className="font-semibold mb-3">Related Topics</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedQuery.relatedTopics.map((topic, index) => (
                            <Badge key={index} variant="secondary" className="cursor-pointer hover:bg-gray-200">
                              {topic}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Follow-up Questions */}
                      <div>
                        <h4 className="font-semibold mb-3">Suggested Follow-up Questions</h4>
                        <div className="space-y-2">
                          {selectedQuery.followUpQuestions.map((question, index) => (
                            <Button
                              key={index}
                              variant="ghost"
                              size="sm"
                              onClick={() => handleSampleQuestion(question)}
                              className="justify-start h-auto py-2 px-3 whitespace-normal text-left w-full"
                            >
                              💡 {question}
                            </Button>
                          ))}
                        </div>
                      </div>

                      {/* Sources */}
                      <div>
                        <h4 className="font-semibold mb-3">Sources & Further Reading</h4>
                        <ul className="space-y-2">
                          {selectedQuery.sources.map((source, index) => (
                            <li key={index} className="text-sm text-blue-600 hover:underline cursor-pointer">
                              📚 {source}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="history" className="flex-1 p-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Research History</h3>
                  {researchHistory.length === 0 ? (
                    <Card>
                      <CardContent className="p-8 text-center text-gray-500">
                        <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p>No research history yet. Start by asking a question!</p>
                      </CardContent>
                    </Card>
                  ) : (
                    <div className="space-y-3">
                      {researchHistory.map((item) => (
                        <Card 
                          key={item.id} 
                          className="cursor-pointer hover:shadow-md transition-shadow"
                          onClick={() => setSelectedQuery(item)}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h4 className="font-medium mb-2">{item.question}</h4>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                  <Badge className={researchCategories.find(cat => cat.id === item.category)?.color}>
                                    {researchCategories.find(cat => cat.id === item.category)?.label}
                                  </Badge>
                                  <span>•</span>
                                  <span>{item.timestamp.toLocaleDateString()}</span>
                                </div>
                              </div>
                              <Button
                                variant="ghost" 
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setExpandedQuery(expandedQuery === item.id ? null : item.id);
                                }}
                              >
                                {expandedQuery === item.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                              </Button>
                            </div>
                            
                            {expandedQuery === item.id && (
                              <div className="mt-4 pt-4 border-t">
                                <p className="text-sm text-gray-700 mb-3">{item.summary.substring(0, 200)}...</p>
                                <div className="flex flex-wrap gap-1">
                                  {item.relatedTopics.slice(0, 3).map((topic, index) => (
                                    <Badge key={index} variant="outline">
                                      {topic}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="favorites" className="flex-1 p-6">
                <Card>
                  <CardContent className="p-8 text-center text-gray-500">
                    <Star className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Save your favorite research queries here for quick access!</p>
                    <p className="text-sm mt-2">Click the star icon on any research result to save it.</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}