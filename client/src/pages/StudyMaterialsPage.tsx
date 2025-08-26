import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  FileText, 
  Download, 
  Search,
  BookOpen,
  FileIcon,
  File,
  Video,
  Image
} from "lucide-react";

interface StudyMaterial {
  id: string;
  title: string;
  type: 'pdf' | 'doc' | 'presentation' | 'video' | 'image';
  size: string;
  downloadUrl: string;
  category: string;
  description: string;
  ageGroup: '6-11' | '12-17';
}

interface StudyMaterialsPageProps {
  ageGroup: '6-11' | '12-17';
}

export function StudyMaterialsPage({ ageGroup }: StudyMaterialsPageProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Sample study materials data
  const studyMaterials: StudyMaterial[] = ageGroup === '6-11' ? [
    {
      id: 'scratch-guide',
      title: 'Scratch Programming Guide',
      type: 'pdf',
      size: '2.5 MB',
      downloadUrl: '#',
      category: 'Programming',
      description: 'Complete guide to Scratch programming with examples and exercises',
      ageGroup: '6-11'
    },
    {
      id: 'coding-cheatsheet',
      title: 'Young Coders Cheat Sheet',
      type: 'pdf',
      size: '1.2 MB',
      downloadUrl: '#',
      category: 'Reference',
      description: 'Quick reference for basic coding concepts and blocks',
      ageGroup: '6-11'
    },
    {
      id: 'animation-tutorial',
      title: 'Creating Animations Tutorial',
      type: 'video',
      size: '45 MB',
      downloadUrl: '#',
      category: 'Tutorial',
      description: 'Step-by-step video tutorial for creating animations',
      ageGroup: '6-11'
    },
    {
      id: 'project-templates',
      title: 'Project Templates Pack',
      type: 'doc',
      size: '800 KB',
      downloadUrl: '#',
      category: 'Templates',
      description: 'Ready-to-use templates for common projects',
      ageGroup: '6-11'
    },
    {
      id: 'robotics-worksheet',
      title: 'Robotics Activity Worksheets',
      type: 'pdf',
      size: '3.1 MB',
      downloadUrl: '#',
      category: 'Robotics',
      description: 'Printable worksheets for robotics activities',
      ageGroup: '6-11'
    },
    {
      id: 'microbit-examples',
      title: 'micro:bit Code Examples',
      type: 'doc',
      size: '1.8 MB',
      downloadUrl: '#',
      category: 'Robotics',
      description: 'Collection of micro:bit code examples and projects',
      ageGroup: '6-11'
    }
  ] : [
    {
      id: 'python-handbook',
      title: 'Python Programming Handbook',
      type: 'pdf',
      size: '4.2 MB',
      downloadUrl: '#',
      category: 'Programming',
      description: 'Comprehensive guide to Python programming for teens',
      ageGroup: '12-17'
    },
    {
      id: 'web-dev-guide',
      title: 'Web Development Complete Guide',
      type: 'pdf',
      size: '6.8 MB',
      downloadUrl: '#',
      category: 'Web Development',
      description: 'HTML, CSS, and JavaScript fundamentals',
      ageGroup: '12-17'
    },
    {
      id: 'ai-prompt-guide',
      title: 'AI Prompt Engineering Guide',
      type: 'pdf',
      size: '2.9 MB',
      downloadUrl: '#',
      category: 'AI/ML',
      description: 'Master the art of AI prompt engineering',
      ageGroup: '12-17'
    },
    {
      id: 'algorithms-cheatsheet',
      title: 'Algorithms & Data Structures',
      type: 'pdf',
      size: '3.5 MB',
      downloadUrl: '#',
      category: 'Reference',
      description: 'Quick reference for common algorithms and data structures',
      ageGroup: '12-17'
    },
    {
      id: 'project-portfolio',
      title: 'Portfolio Project Ideas',
      type: 'presentation',
      size: '5.1 MB',
      downloadUrl: '#',
      category: 'Projects',
      description: 'Inspiring project ideas for your coding portfolio',
      ageGroup: '12-17'
    },
    {
      id: 'advanced-robotics',
      title: 'Advanced Robotics Manual',
      type: 'pdf',
      size: '7.2 MB',
      downloadUrl: '#',
      category: 'Robotics',
      description: 'Advanced robotics concepts and autonomous systems',
      ageGroup: '12-17'
    }
  ];

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf': return <FileText className="h-8 w-8 text-red-500" />;
      case 'doc': return <FileIcon className="h-8 w-8 text-blue-500" />;
      case 'presentation': return <File className="h-8 w-8 text-orange-500" />;
      case 'video': return <Video className="h-8 w-8 text-purple-500" />;
      case 'image': return <Image className="h-8 w-8 text-green-500" />;
      default: return <File className="h-8 w-8 text-gray-500" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'pdf': return 'bg-red-100 text-red-800';
      case 'doc': return 'bg-blue-100 text-blue-800';
      case 'presentation': return 'bg-orange-100 text-orange-800';
      case 'video': return 'bg-purple-100 text-purple-800';
      case 'image': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const categories = ['all', ...Array.from(new Set(studyMaterials.map(material => material.category)))];

  const filteredMaterials = studyMaterials.filter(material => {
    const matchesSearch = material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         material.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || material.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {ageGroup === '6-11' ? 'Young Coders Study Materials' : 'Teen Coders Study Materials'}
          </h1>
          <p className="text-xl text-gray-600">
            {ageGroup === '6-11' 
              ? 'Downloadable resources to support your coding journey'
              : 'Advanced study materials and reference guides'
            }
          </p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-lg p-6 mb-8 shadow-sm">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search study materials..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
                data-testid="input-search-materials"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  data-testid={`button-category-${category}`}
                >
                  {category === 'all' ? 'All Categories' : category}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Study Materials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMaterials.map((material) => (
            <Card 
              key={material.id} 
              className="hover:shadow-lg transition-shadow"
              data-testid={`material-card-${material.id}`}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    {getFileIcon(material.type)}
                    <div>
                      <Badge className={getTypeColor(material.type)}>
                        {material.type.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">{material.size}</div>
                  </div>
                </div>
                <CardTitle className="text-lg">{material.title}</CardTitle>
                <CardDescription>{material.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <Badge variant="outline">{material.category}</Badge>
                  </div>
                  
                  <Button 
                    className="w-full" 
                    variant="outline"
                    onClick={() => {
                      // In a real app, this would download the file
                      console.log(`Downloading ${material.title}`);
                    }}
                    data-testid={`button-download-${material.id}`}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredMaterials.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No materials found</h3>
            <p className="text-gray-600">
              Try adjusting your search terms or category filter.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}