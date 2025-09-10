import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Card from '../../components/shared/Card';
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

const StudentDashboard = () => {
  const { user } = useAuth();

  const quickActions = [
    {
      icon: MessageCircle,
      title: 'Chat Support',
      description: 'Talk to our AI companion',
      color: 'from-blue-400 to-blue-600',
      href: '/student/chatbot'
    },
    {
      icon: Calendar,
      title: 'Book Session',
      description: 'Schedule with a counselor',
      color: 'from-purple-400 to-purple-600',
      href: '/student/booking'
    },
    {
      icon: Heart,
      title: 'Mood Check',
      description: 'Track how you\'re feeling',
      color: 'from-pink-400 to-pink-600',
      href: '/student/mood-tracker'
    },
    {
      icon: Users,
      title: 'Peer Support',
      description: 'Connect with community',
      color: 'from-green-400 to-green-600',
      href: '/student/forum'
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Welcome Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <Heart className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Welcome back, {user?.firstName || 'Student'}!
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Take a moment to check in with yourself and access the support you need today.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Link to={action.href} key={index}>
                <Card hover className="group transition-all duration-300">
                  <div className={`w-12 h-12 bg-gradient-to-r ${action.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{action.title}</h3>
                  <p className="text-sm text-gray-600">{action.description}</p>
                </Card>
              </Link>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Daily Check-in Prompt */}
            <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold mb-2">How are you feeling today?</h3>
                  <p className="text-blue-100 mb-4">
                    Take a moment to reflect on your mental state and track your wellness journey.
                  </p>
                  <Link 
                    to="/student/mood-tracker"
                    className="inline-flex items-center px-4 py-2 bg-white text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    <Heart className="w-4 h-4 mr-2" />
                    Start Daily Check-in
                  </Link>
                </div>
                <div className="hidden md:block">
                  <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
                    <Heart className="w-12 h-12 text-white" />
                  </div>
                </div>
              </div>
            </Card>

            {/* Featured Resources */}
            <Card>
              <Card.Header>
                <div className="flex items-center justify-between">
                  <div>
                    <Card.Title className="flex items-center space-x-2">
                      <BookOpen className="w-5 h-5 text-green-500" />
                      <span>Recommended For You</span>
                    </Card.Title>
                    <Card.Description>Resources to support your wellbeing today</Card.Description>
                  </div>
                  <Link 
                    to="/student/resources"
                    className="inline-flex items-center px-3 py-2 text-sm text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    View All
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </Card.Header>
              <Card.Content>
                <div className="grid md:grid-cols-3 gap-4">
                  {featuredResources.map((resource, index) => (
                    <div key={index} className="group cursor-pointer">
                      <div className="relative mb-3 overflow-hidden rounded-lg">
                        <img
                          src={resource.thumbnail}
                          alt={resource.title}
                          className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                          {resource.type === 'video' && <Play className="w-8 h-8 text-white opacity-80" />}
                          {resource.type === 'audio' && <Headphones className="w-8 h-8 text-white opacity-80" />}
                        </div>
                        <div className="absolute bottom-2 left-2">
                          <span className="inline-flex items-center px-2 py-1 text-xs font-medium text-white bg-black/50 rounded">
                            <Clock className="w-3 h-3 mr-1" />
                            {resource.duration}
                          </span>
                        </div>
                      </div>
                      <h4 className="text-sm font-medium text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                        {resource.title}
                      </h4>
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3 text-yellow-400 fill-current" />
                        <span className="text-xs text-gray-600">{resource.rating}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card.Content>
            </Card>

            {/* Recent Community Activity */}
            <Card>
              <Card.Header>
                <div className="flex items-center justify-between">
                  <div>
                    <Card.Title className="flex items-center space-x-2">
                      <Users className="w-5 h-5 text-blue-500" />
                      <span>Community Highlights</span>
                    </Card.Title>
                    <Card.Description>Recent supportive moments from our community</Card.Description>
                  </div>
                  <Link 
                    to="/student/forum"
                    className="inline-flex items-center px-3 py-2 text-sm text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Join Forum
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </Card.Header>
              <Card.Content>
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
              </Card.Content>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Today's Wellness Stats */}
            <Card>
              <Card.Header>
                <Card.Title className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                  <span>Your Wellness Today</span>
                </Card.Title>
              </Card.Header>
              <Card.Content className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Overall Mood</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 h-2 bg-gray-200 rounded-full">
                      <div 
                        className="h-2 bg-gradient-to-r from-green-400 to-blue-500 rounded-full"
                        style={{ width: `${(todaysStats.moodScore / 10) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900">{todaysStats.moodScore}/10</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Check-in Streak</span>
                  <span className="inline-flex items-center px-2 py-1 text-xs font-medium text-orange-800 bg-orange-100 rounded-full">
                    <Zap className="w-3 h-3 mr-1" />
                    {todaysStats.streak} days
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Support Given</span>
                  <span className="inline-flex items-center px-2 py-1 text-xs font-medium text-pink-800 bg-pink-100 rounded-full">
                    <Heart className="w-3 h-3 mr-1" />
                    {todaysStats.communitySupport}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Resources Used</span>
                  <span className="inline-flex items-center px-2 py-1 text-xs font-medium text-blue-800 bg-blue-100 rounded-full">
                    <BookOpen className="w-3 h-3 mr-1" />
                    {todaysStats.resourcesUsed}
                  </span>
                </div>
              </Card.Content>
            </Card>

            {/* Upcoming Appointment */}
            <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200">
              <Card.Header>
                <Card.Title className="flex items-center space-x-2 text-purple-800">
                  <Calendar className="w-5 h-5" />
                  <span>Next Session</span>
                </Card.Title>
              </Card.Header>
              <Card.Content>
                <div className="text-center">
                  <p className="text-sm text-purple-600 mb-2">Tomorrow at 2:00 PM</p>
                  <p className="text-xs text-purple-500 mb-3">with Dr. Sarah Smith</p>
                  <Link 
                    to="/student/booking"
                    className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </Card.Content>
            </Card>

            {/* Crisis Resources */}
            <Card className="border-red-200 bg-gradient-to-br from-red-50 to-orange-50">
              <Card.Header>
                <Card.Title className="flex items-center space-x-2 text-red-800">
                  <Shield className="w-5 h-5" />
                  <span>Need Immediate Help?</span>
                </Card.Title>
              </Card.Header>
              <Card.Content>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-medium text-red-700 mb-1">24/7 Crisis Text Line</p>
                    <p className="text-red-600">Text HOME to 741741</p>
                  </div>
                  <div>
                    <p className="font-medium text-red-700 mb-1">National Suicide Prevention</p>
                    <p className="text-red-600">Call 988</p>
                  </div>
                  <div>
                    <p className="font-medium text-red-700 mb-1">Campus Emergency</p>
                    <p className="text-red-600">Call (555) 123-4567</p>
                  </div>
                </div>
              </Card.Content>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;