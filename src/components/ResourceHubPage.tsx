import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { 
  Search, 
  Play, 
  Headphones, 
  FileText, 
  Clock, 
  Star,
  Filter,
  Download,
  Bookmark,
  Heart
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ResourceHubPageProps {
  onNavigate: (page: string) => void;
}

interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'video' | 'audio' | 'article';
  category: string;
  duration: string;
  rating: number;
  thumbnail: string;
  isFavorite: boolean;
  author: string;
}

const ResourceHubPage: React.FC<ResourceHubPageProps> = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  const categories = [
    { id: 'all', label: 'All Resources', count: 48 },
    { id: 'relaxation', label: 'Relaxation', count: 12 },
    { id: 'study-stress', label: 'Study Stress', count: 8 },
    { id: 'sleep', label: 'Sleep', count: 6 },
    { id: 'mindfulness', label: 'Mindfulness', count: 10 },
    { id: 'anxiety', label: 'Anxiety', count: 7 },
    { id: 'self-care', label: 'Self-Care', count: 5 }
  ];

  const resources: Resource[] = [
    {
      id: '1',
      title: '10-Minute Guided Meditation for Anxiety',
      description: 'A gentle guided meditation to help calm anxious thoughts and find inner peace.',
      type: 'audio',
      category: 'anxiety',
      duration: '10 min',
      rating: 4.8,
      thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop',
      isFavorite: true,
      author: 'Dr. Sarah Chen'
    },
    {
      id: '2',
      title: 'Effective Study Techniques for Stress Management',
      description: 'Learn proven strategies to manage academic pressure and improve your study habits.',
      type: 'video',
      category: 'study-stress',
      duration: '15 min',
      rating: 4.6,
      thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=300&h=200&fit=crop',
      isFavorite: false,
      author: 'Prof. Michael Torres'
    },
    {
      id: '3',
      title: 'Progressive Muscle Relaxation Guide',
      description: 'Step-by-step instructions for releasing physical tension and achieving deep relaxation.',
      type: 'article',
      category: 'relaxation',
      duration: '5 min read',
      rating: 4.9,
      thumbnail: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=200&fit=crop',
      isFavorite: false,
      author: 'Lisa Rodriguez'
    },
    {
      id: '4',
      title: 'Sleep Stories: Ocean Waves',
      description: 'Drift off to peaceful sleep with calming ocean sounds and gentle narration.',
      type: 'audio',
      category: 'sleep',
      duration: '45 min',
      rating: 4.7,
      thumbnail: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=300&h=200&fit=crop',
      isFavorite: true,
      author: 'Nature Sounds Co.'
    },
    {
      id: '5',
      title: 'Building Healthy Daily Routines',
      description: 'Practical tips for creating sustainable self-care habits that support your mental health.',
      type: 'video',
      category: 'self-care',
      duration: '12 min',
      rating: 4.5,
      thumbnail: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=300&h=200&fit=crop',
      isFavorite: false,
      author: 'Wellness Institute'
    },
    {
      id: '6',
      title: 'Mindful Breathing Exercises',
      description: 'Simple breathing techniques you can use anywhere to center yourself and reduce stress.',
      type: 'article',
      category: 'mindfulness',
      duration: '3 min read',
      rating: 4.8,
      thumbnail: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=300&h=200&fit=crop',
      isFavorite: true,
      author: 'Mindfulness Expert'
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Play className="w-4 h-4" />;
      case 'audio':
        return <Headphones className="w-4 h-4" />;
      case 'article':
        return <FileText className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'video':
        return 'bg-red-100 text-red-800';
      case 'audio':
        return 'bg-blue-100 text-blue-800';
      case 'article':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    const matchesType = selectedType === 'all' || resource.type === selectedType;
    
    return matchesSearch && matchesCategory && matchesType;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 py-8 px-4 pb-20 md:pb-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl text-gray-800 mb-2">Wellness Resource Hub</h1>
          <p className="text-gray-600">Discover videos, audios, and articles to support your mental health journey</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search resources..."
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex items-center space-x-2">
                <Filter className="w-4 h-4" />
                <span className="hidden sm:inline">Filters</span>
              </Button>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-4">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className="flex items-center space-x-1"
              >
                <span>{category.label}</span>
                <Badge variant="secondary" className="ml-1 text-xs">
                  {category.count}
                </Badge>
              </Button>
            ))}
          </div>

          {/* Type Filter */}
          <div className="flex gap-2">
            <Button
              variant={selectedType === 'all' ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedType('all')}
            >
              All Types
            </Button>
            <Button
              variant={selectedType === 'video' ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedType('video')}
              className="flex items-center space-x-2"
            >
              <Play className="w-4 h-4" />
              <span>Videos</span>
            </Button>
            <Button
              variant={selectedType === 'audio' ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedType('audio')}
              className="flex items-center space-x-2"
            >
              <Headphones className="w-4 h-4" />
              <span>Audio</span>
            </Button>
            <Button
              variant={selectedType === 'article' ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedType('article')}
              className="flex items-center space-x-2"
            >
              <FileText className="w-4 h-4" />
              <span>Articles</span>
            </Button>
          </div>
        </div>

        {/* Featured Resources */}
        <div className="mb-8">
          <h2 className="text-xl text-gray-800 mb-4">Featured This Week</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {filteredResources.slice(0, 2).map((resource) => (
              <Card key={resource.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <ImageWithFallback
                    src={resource.thumbnail}
                    alt={resource.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge className={getTypeColor(resource.type)}>
                      <span className="flex items-center space-x-1">
                        {getTypeIcon(resource.type)}
                        <span className="capitalize">{resource.type}</span>
                      </span>
                    </Badge>
                  </div>
                  <div className="absolute top-3 right-3">
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`h-8 w-8 p-0 bg-white/80 hover:bg-white ${
                        resource.isFavorite ? 'text-red-500' : 'text-gray-500'
                      }`}
                    >
                      <Heart className="w-4 h-4" fill={resource.isFavorite ? "currentColor" : "none"} />
                    </Button>
                  </div>
                  <div className="absolute bottom-3 left-3">
                    <Badge variant="secondary" className="bg-black/50 text-white border-0">
                      <Clock className="w-3 h-3 mr-1" />
                      {resource.duration}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="text-lg mb-2 text-gray-800">{resource.title}</h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{resource.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600">{resource.rating}</span>
                      </div>
                      <span className="text-xs text-gray-500">by {resource.author}</span>
                    </div>
                    <Button size="sm">
                      {resource.type === 'article' ? 'Read' : 'Play'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* All Resources Grid */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl text-gray-800">All Resources</h2>
            <p className="text-sm text-gray-600">{filteredResources.length} resources found</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.slice(2).map((resource) => (
              <Card key={resource.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <div className="relative">
                  <ImageWithFallback
                    src={resource.thumbnail}
                    alt={resource.title}
                    className="w-full h-40 object-cover"
                  />
                  <div className="absolute top-2 left-2">
                    <Badge className={getTypeColor(resource.type)} size="sm">
                      {getTypeIcon(resource.type)}
                    </Badge>
                  </div>
                  <div className="absolute top-2 right-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`h-6 w-6 p-0 bg-white/80 hover:bg-white ${
                        resource.isFavorite ? 'text-red-500' : 'text-gray-500'
                      }`}
                    >
                      <Heart className="w-3 h-3" fill={resource.isFavorite ? "currentColor" : "none"} />
                    </Button>
                  </div>
                  <div className="absolute bottom-2 left-2">
                    <Badge variant="secondary" className="bg-black/50 text-white border-0 text-xs">
                      <Clock className="w-3 h-3 mr-1" />
                      {resource.duration}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-3">
                  <h3 className="text-sm mb-1 text-gray-800 line-clamp-2">{resource.title}</h3>
                  <p className="text-xs text-gray-600 mb-2 line-clamp-2">{resource.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <Star className="w-3 h-3 text-yellow-400 fill-current" />
                      <span className="text-xs text-gray-600">{resource.rating}</span>
                    </div>
                    <Button size="sm" variant="outline" className="h-6 text-xs px-2">
                      {resource.type === 'article' ? 'Read' : 'Play'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Access Section */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-blue-800 flex items-center space-x-2">
                <Headphones className="w-5 h-5" />
                <span>Quick Calm</span>
              </CardTitle>
              <CardDescription className="text-blue-600">
                5-minute relaxation exercises
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                Start Now
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-purple-800 flex items-center space-x-2">
                <Heart className="w-5 h-5" />
                <span>Self-Care Kit</span>
              </CardTitle>
              <CardDescription className="text-purple-600">
                Daily wellness activities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-purple-600 hover:bg-purple-700">
                Explore
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-green-800 flex items-center space-x-2">
                <Download className="w-5 h-5" />
                <span>Offline Access</span>
              </CardTitle>
              <CardDescription className="text-green-600">
                Download for later
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-green-600 hover:bg-green-700">
                Download
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ResourceHubPage;