import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { useNavigate } from 'react-router-dom';
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
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import { studentAPI } from '../../services/api';

const StudentDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [moodHistory, setMoodHistory] = useState<any[]>([]);
  const [upcomingBookings, setUpcomingBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [moodResponse, bookingsResponse] = await Promise.all([
          studentAPI.getMoodHistory(),
          studentAPI.getBookings()
        ]);
        
        setMoodHistory(moodResponse.data.slice(-7)); // Last 7 days
        setUpcomingBookings(bookingsResponse.data.filter(b => b.status !== 'completed'));
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const quickActions = [
    {
      icon: MessageCircle,
      title: 'Chat Support',
      description: 'Talk to our AI companion',
      color: 'from-blue-400 to-blue-600',
      action: () => navigate('/student/chatbot')
    },
    {
      icon: Calendar,
      title: 'Book Session',
      description: 'Schedule with a counselor',
      color: 'from-purple-400 to-purple-600',
      action: () => navigate('/student/booking')
    },
    {
      icon: Heart,
      title: 'Mood Check',
      description: 'Track how you\'re feeling',
      color: 'from-pink-400 to-pink-600',
      action: () => navigate('/student/mood-tracker')
    },
    {
      icon: Users,
      title: 'Peer Support',
      description: 'Connect with community',
      color: 'from-green-400 to-green-600',
      action: () => navigate('/student/forum')
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

  // Calculate today's stats from mood history
  const todaysStats = {
    moodScore: moodHistory.length > 0 ? moodHistory[moodHistory.length - 1]?.mood || 0 : 0,
    streak: 12, // Mock data for streak
    communitySupport: 23,
    resourcesUsed: 8
  };

  const avgMood = moodHistory.length > 0 
    ? (moodHistory.reduce((sum, entry) => sum + entry.mood, 0) / moodHistory.length).toFixed(1)
    : '0.0';

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading your dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 py-8 px-4 pb-20 md:pb-8">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl text-gray-800 mb-3">Welcome Back!</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Take a moment to check in with yourself and access the support you need today.
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
                      onClick={() => navigate('/student/mood-tracker')}
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

            {/* Upcoming Appointments */}
            {upcomingBookings.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-purple-500" />
                    <span>Upcoming Sessions</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {upcomingBookings.slice(0, 2).map((booking) => (
                      <div key={booking.id} className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                        <div>
                          <p className="text-sm text-purple-800 mb-1">{booking.date} at {booking.time}</p>
                          <p className="text-xs text-purple-600">with {booking.counselor}</p>
                        </div>
                        <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                          {booking.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full mt-3"
                    onClick={() => navigate('/student/booking')}
                  >
                    Manage Appointments
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Featured Resources */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center space-x-2">
                      <BookOpen className="w-5 h-5 text-green-500" />
                      <span>Recommended Resources</span>
                    </CardTitle>
                    <CardDescription>Resources to support your wellbeing today</CardDescription>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => navigate('/student/resources')}
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
                    onClick={() => navigate('/student/forum')}
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
                  <span>Your Wellness</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-white text-lg">{avgMood}</span>
                  </div>
                  <p className="text-sm text-gray-600">7-Day Average Mood</p>
                  <p className="text-xs text-gray-500">out of 10</p>
                </div>

                <div className="grid grid-cols-2 gap-3 text-center">
                  <div>
                    <div className="text-2xl text-blue-600">{todaysStats.streak}</div>
                    <div className="text-xs text-gray-500">Day Streak</div>
                  </div>
                  <div>
                    <div className="text-2xl text-green-600">{moodHistory.length}</div>
                    <div className="text-xs text-gray-500">Check-ins</div>
                  </div>
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
                      <p className="text-sm text-gray-800">{todaysStats.streak}-Day Check-in Streak</p>
                      <p className="text-xs text-gray-500">Keep it up!</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <Users className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-800">Community Helper</p>
                      <p className="text-xs text-gray-500">Given {todaysStats.communitySupport} hearts</p>
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

export default StudentDashboard;