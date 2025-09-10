import React, { useState } from 'react';
import Card from '../../components/shared/Card';
import { 
  Search, 
  Play, 
  Headphones, 
  FileText, 
  Clock, 
  Star,
  Filter,
  Heart
} from 'lucide-react';

const StudentResources = () => {
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

  const resources = [
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
    },
    {
      id: '7',
      title: 'Dealing with Test Anxiety',
      description: 'Strategies to manage anxiety before and during exams for better performance.',
      type: 'video',
      category: 'study-stress',
      duration: '18 min',
      rating: 4.7,
      thumbnail: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop',
      isFavorite: false,
      author: 'Dr. Academic Success'
    },
    {
      id: '8',
      title: 'Evening Wind-Down Routine',
      description: 'Create the perfect bedtime routine to improve your sleep quality and mental wellbeing.',
      type: 'article',
      category: 'sleep',
      duration: '4 min read',
      rating: 4.6,
      thumbnail: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=300&h=200&fit=crop',
      isFavorite: false,
      author: 'Sleep Specialist'
    }
  ];

  const getTypeIcon = (type) => {
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

  const getTypeColor = (type) => {
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

  const featuredResources = resources.filter(r => r.isFavorite).slice(0, 2);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Wellness Resource Hub</h1>
          <p className="text-gray-600">Discover videos, audios, and articles to support your mental health journey</p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search resources..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-2">
              <button className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Filter className="w-4 h-4" />
                <span className="hidden sm:inline">Filters</span>
              </button>
            </div>
          </div>

          {/* Category Filter Chips */}
          <div className="flex flex-wrap gap-2 mb-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-1 px-3 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category.id
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span>{category.label}</span>
                <span className={`inline-flex items-center justify-center w-5 h-5 text-xs rounded-full ${
                  selectedCategory === category.id
                    ? 'bg-blue-400 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {category.count}
                </span>
              </button>
            ))}
          </div>

          {/* Type Filter */}
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedType('all')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedType === 'all'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Types
            </button>
            <button
              onClick={() => setSelectedType('video')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedType === 'video'
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Play className="w-4 h-4" />
              <span>Videos</span>
            </button>
            <button
              onClick={() => setSelectedType('audio')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedType === 'audio'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Headphones className="w-4 h-4" />
              <span>Audio</span>
            </button>
            <button
              onClick={() => setSelectedType('article')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedType === 'article'
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Articles</span>
            </button>
          </div>
        </Card>

        {/* Featured Resources */}
        {featuredResources.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Featured This Week</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {featuredResources.map((resource) => (
                <Card key={resource.id} hover className="overflow-hidden">
                  <div className="relative">
                    <img
                      src={resource.thumbnail}
                      alt={resource.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-3 left-3">
                      <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(resource.type)}`}>
                        {getTypeIcon(resource.type)}
                        <span className="ml-1 capitalize">{resource.type}</span>
                      </span>
                    </div>
                    <div className="absolute top-3 right-3">
                      <button className={`p-2 rounded-full transition-colors ${
                        resource.isFavorite ? 'bg-red-500 text-white' : 'bg-white/80 text-gray-500 hover:bg-white'
                      }`}>
                        <Heart className="w-4 h-4" fill={resource.isFavorite ? "currentColor" : "none"} />
                      </button>
                    </div>
                    <div className="absolute bottom-3 left-3">
                      <span className="inline-flex items-center px-2 py-1 text-xs font-medium text-white bg-black/50 rounded-full">
                        <Clock className="w-3 h-3 mr-1" />
                        {resource.duration}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{resource.title}</h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{resource.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-gray-600 font-medium">{resource.rating}</span>
                        </div>
                        <span className="text-xs text-gray-500">by {resource.author}</span>
                      </div>
                      <button className="px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-colors">
                        {resource.type === 'article' ? 'Read' : 'Play'}
                      </button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* All Resources Grid */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">All Resources</h2>
            <p className="text-sm text-gray-600">{filteredResources.length} resources found</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource) => (
              <Card key={resource.id} hover className="overflow-hidden">
                <div className="relative">
                  <img
                    src={resource.thumbnail}
                    alt={resource.title}
                    className="w-full h-40 object-cover"
                  />
                  <div className="absolute top-2 left-2">
                    <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(resource.type)}`}>
                      {getTypeIcon(resource.type)}
                    </span>
                  </div>
                  <div className="absolute top-2 right-2">
                    <button className={`p-1.5 rounded-full transition-colors ${
                      resource.isFavorite ? 'bg-red-500 text-white' : 'bg-white/80 text-gray-500 hover:bg-white'
                    }`}>
                      <Heart className="w-3 h-3" fill={resource.isFavorite ? "currentColor" : "none"} />
                    </button>
                  </div>
                  <div className="absolute bottom-2 left-2">
                    <span className="inline-flex items-center px-2 py-1 text-xs font-medium text-white bg-black/50 rounded-full">
                      <Clock className="w-3 h-3 mr-1" />
                      {resource.duration}
                    </span>
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="text-sm font-semibold text-gray-900 mb-1 line-clamp-2">{resource.title}</h3>
                  <p className="text-xs text-gray-600 mb-2 line-clamp-2">{resource.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <Star className="w-3 h-3 text-yellow-400 fill-current" />
                      <span className="text-xs text-gray-600 font-medium">{resource.rating}</span>
                    </div>
                    <button className="px-2 py-1 bg-blue-500 hover:bg-blue-600 text-white text-xs font-medium rounded transition-colors">
                      {resource.type === 'article' ? 'Read' : 'Play'}
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Access Section */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <Card.Header>
              <Card.Title className="text-blue-800 flex items-center space-x-2">
                <Headphones className="w-5 h-5" />
                <span>Quick Calm</span>
              </Card.Title>
              <Card.Description className="text-blue-600">
                5-minute relaxation exercises
              </Card.Description>
            </Card.Header>
            <Card.Content>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                Start Now
              </button>
            </Card.Content>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <Card.Header>
              <Card.Title className="text-purple-800 flex items-center space-x-2">
                <Heart className="w-5 h-5" />
                <span>Self-Care Kit</span>
              </Card.Title>
              <Card.Description className="text-purple-600">
                Daily wellness activities
              </Card.Description>
            </Card.Header>
            <Card.Content>
              <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                Explore
              </button>
            </Card.Content>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <Card.Header>
              <Card.Title className="text-green-800 flex items-center space-x-2">
                <FileText className="w-5 h-5" />
                <span>Study Guides</span>
              </Card.Title>
              <Card.Description className="text-green-600">
                Academic wellness resources
              </Card.Description>
            </Card.Header>
            <Card.Content>
              <button className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                Browse
              </button>
            </Card.Content>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StudentResources;