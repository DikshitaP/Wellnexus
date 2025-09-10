import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  MessageCircle, 
  Calendar, 
  Heart, 
  Users, 
  BookOpen, 
  TrendingUp,
  Clock,
  Star,
  Play,
  Headphones,
  ChevronRight,
  Shield,
  Award,
  Zap
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface MentalHealthHomePageProps {
  onNavigate: (page: string) => void;
}

const MentalHealthHomePage: React.FC<MentalHealthHomePageProps> = ({ onNavigate }) => {
  const quickActions = [
    {
      icon: MessageCircle,
      title: 'Chat Support',
      description: 'Talk to our AI companion',
      color: 'from-blue-400 to-blue-600',
      action: () => onNavigate('chatbot')
    },
    {
      icon: Calendar,
      title: 'Book Session',
      description: 'Schedule with a counselor',
      color: 'from-purple-400 to-purple-600',
      action: () => onNavigate('booking')
    },
    {
      icon: Heart,
      title: 'Mood Check',
      description: 'Track how you\'re feeling',
      color: 'from-pink-400 to-pink-600',
      action: () => onNavigate('mood-tracker')
    },
    {
      icon: Users,
      title: 'Peer Support',
      description: 'Connect with community',
      color: 'from-green-400 to-green-600',
      action: () => onNavigate('forum')
    }
  ];

  const featuredResources = [
    {
      title: '10-Minute Meditation',
      type: 'audio',
      duration: '10 min',
      rating: 4.8,
      thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop'
    },
    {
      title: 'Study Stress Guide',
      type: 'video',
      duration: '15 min',
      rating: 4.6,
      thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=300&h=200&fit=crop'
    },
    {
      title: 'Sleep Better Tonight',
      type: 'article',
      duration: '5 min read',
      rating: 4.9,
      thumbnail: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=300&h=200&fit=crop'
    }
  ];

  const todaysStats = {
    moodScore: 7.2,
    streak: 5,
    communitySupport: 23,
    resourcesUsed: 8
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 py-8 px-4 pb-20 md:pb-8">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <Heart className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl text-gray-800 mb-3">Welcome to MindCare</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your safe space for mental wellness. Take a moment to check in with yourself and access the support you need.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Card 
                key={index} 
                className="hover:shadow-lg transition-all duration-300 cursor-pointer group overflow-hidden"
                onClick={action.action}
              >
                <CardContent className="p-6">
                  <div className={`w-12 h-12 bg-gradient-to-r ${action.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg text-gray-800 mb-2">{action.title}</h3>
                  <p className="text-sm text-gray-600">{action.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Daily Check-in Prompt */}
            <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl mb-2">How are you feeling today?</h3>
                    <p className="text-blue-100 mb-4">
                      Take a moment to reflect on your mental state and track your wellness journey.
                    </p>
                    <Button 
                      variant="secondary" 
                      onClick={() => onNavigate('mood-tracker')}
                      className="bg-white text-blue-600 hover:bg-blue-50"
                    >
                      <Heart className="w-4 h-4 mr-2" />
                      Start Daily Check-in
                    </Button>
                  </div>
                  <div className="hidden md:block">
                    <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
                      <Heart className="w-12 h-12 text-white" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Featured Resources */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center space-x-2">
                      <BookOpen className="w-5 h-5 text-green-500" />
                      <span>Recommended For You</span>
                    </CardTitle>
                    <CardDescription>Resources to support your wellbeing today</CardDescription>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => onNavigate('resources')}
                  >
                    View All
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  {featuredResources.map((resource, index) => (
                    <div key={index} className="group cursor-pointer">
                      <div className="relative mb-3 overflow-hidden rounded-lg">
                        <ImageWithFallback
                          src={resource.thumbnail}
                          alt={resource.title}
                          className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                          {resource.type === 'video' && <Play className="w-8 h-8 text-white opacity-80" />}
                          {resource.type === 'audio' && <Headphones className="w-8 h-8 text-white opacity-80" />}
                        </div>
                        <div className="absolute bottom-2 left-2">
                          <Badge variant="secondary" className="bg-black/50 text-white border-0 text-xs">
                            <Clock className="w-3 h-3 mr-1" />
                            {resource.duration}
                          </Badge>
                        </div>
                      </div>
                      <h4 className="text-sm text-gray-800 mb-1 group-hover:text-blue-600 transition-colors">
                        {resource.title}
                      </h4>
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3 text-yellow-400 fill-current" />
                        <span className="text-xs text-gray-600">{resource.rating}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Community Activity */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center space-x-2">
                      <Users className="w-5 h-5 text-blue-500" />
                      <span>Community Highlights</span>
                    </CardTitle>
                    <CardDescription>Recent supportive moments from our community</CardDescription>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => onNavigate('forum')}
                  >
                    Join Forum
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-l-4 border-green-400 pl-4 py-2">
                    <p className="text-sm text-gray-700">
                      "Just wanted to share that I finally asked for help today. Thank you all for the encouragement! 💙"
                    </p>
                    <p className="text-xs text-gray-500 mt-1">Anonymous • 2 hours ago • 15 hearts</p>
                  </div>
                  <div className="border-l-4 border-blue-400 pl-4 py-2">
                    <p className="text-sm text-gray-700">
                      "The breathing exercise from today's mood check really helped during my anxiety spike."
                    </p>
                    <p className="text-xs text-gray-500 mt-1">Anonymous • 4 hours ago • 8 hearts</p>
                  </div>
                  <div className="border-l-4 border-purple-400 pl-4 py-2">
                    <p className="text-sm text-gray-700">
                      "Small victories: I got out of bed, had breakfast, and attended my first class this week!"
                    </p>
                    <p className="text-xs text-gray-500 mt-1">Anonymous • 6 hours ago • 22 hearts</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Today's Wellness Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                  <span>Your Wellness Today</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Overall Mood</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 h-2 bg-gray-200 rounded-full">
                      <div 
                        className="h-2 bg-gradient-to-r from-green-400 to-blue-500 rounded-full"
                        style={{ width: `${(todaysStats.moodScore / 10) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-800">{todaysStats.moodScore}/10</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Check-in Streak</span>
                  <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                    <Zap className="w-3 h-3 mr-1" />
                    {todaysStats.streak} days
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Support Given</span>
                  <Badge variant="secondary" className="bg-pink-100 text-pink-800">
                    <Heart className="w-3 h-3 mr-1" />
                    {todaysStats.communitySupport}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Resources Used</span>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    <BookOpen className="w-3 h-3 mr-1" />
                    {todaysStats.resourcesUsed}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Appointment */}
            <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-purple-800">
                  <Calendar className="w-5 h-5" />
                  <span>Next Session</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="text-sm text-purple-600 mb-2">Tomorrow at 2:00 PM</p>
                  <p className="text-xs text-purple-500 mb-3">with Dr. Sarah Smith</p>
                  <Button 
                    size="sm" 
                    className="w-full bg-purple-600 hover:bg-purple-700"
                    onClick={() => onNavigate('booking')}
                  >
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Crisis Resources */}
            <Card className="border-red-200 bg-gradient-to-br from-red-50 to-orange-50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-red-800">
                  <Shield className="w-5 h-5" />
                  <span>Need Immediate Help?</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-red-700 mb-1">24/7 Crisis Text Line</p>
                    <p className="text-red-600">Text HOME to 741741</p>
                  </div>
                  <div>
                    <p className="text-red-700 mb-1">National Suicide Prevention</p>
                    <p className="text-red-600">Call 988</p>
                  </div>
                  <div>
                    <p className="text-red-700 mb-1">Campus Emergency</p>
                    <p className="text-red-600">Call (555) 123-4567</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Award className="w-5 h-5 text-yellow-500" />
                  <span>Recent Achievements</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <Heart className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-800">5-Day Check-in Streak</p>
                      <p className="text-xs text-gray-500">Earned today</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <Users className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-800">Community Helper</p>
                      <p className="text-xs text-gray-500">Earned yesterday</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentalHealthHomePage;