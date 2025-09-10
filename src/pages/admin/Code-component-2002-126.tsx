import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Card from '../../components/shared/Card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import {
  Users,
  Calendar,
  MessageSquare,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Activity,
  Shield,
  BookOpen
} from 'lucide-react';

const AdminDashboard = () => {
  const { user } = useAuth();

  const statsCards = [
    {
      title: 'Active Students',
      value: '1,247',
      change: '+12%',
      changeType: 'positive',
      icon: Users,
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Total Bookings',
      value: '89',
      change: '+8%',
      changeType: 'positive',
      icon: Calendar,
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Chatbot Sessions',
      value: '2,156',
      change: '+24%',
      changeType: 'positive',
      icon: MessageSquare,
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Crisis Alerts',
      value: '3',
      change: '-2',
      changeType: 'negative',
      icon: AlertTriangle,
      color: 'from-red-500 to-red-600'
    }
  ];

  const weeklyBookings = [
    { day: 'Mon', bookings: 12, completed: 10 },
    { day: 'Tue', bookings: 15, completed: 14 },
    { day: 'Wed', bookings: 18, completed: 16 },
    { day: 'Thu', bookings: 14, completed: 12 },
    { day: 'Fri', bookings: 20, completed: 18 },
    { day: 'Sat', bookings: 8, completed: 7 },
    { day: 'Sun', bookings: 6, completed: 6 }
  ];

  const moodTrends = [
    { day: 'Mon', avgMood: 3.2 },
    { day: 'Tue', avgMood: 3.5 },
    { day: 'Wed', avgMood: 2.8 },
    { day: 'Thu', avgMood: 3.7 },
    { day: 'Fri', avgMood: 3.4 },
    { day: 'Sat', avgMood: 3.8 },
    { day: 'Sun', avgMood: 3.6 }
  ];

  const resourceUsage = [
    { name: 'Videos', value: 45, color: '#3b82f6' },
    { name: 'Audio', value: 30, color: '#10b981' },
    { name: 'Articles', value: 25, color: '#f59e0b' }
  ];

  const recentAlerts = [
    {
      id: 1,
      type: 'crisis',
      message: 'High-risk mood pattern detected for Student #4721',
      timestamp: '2 minutes ago',
      status: 'pending'
    },
    {
      id: 2,
      type: 'booking',
      message: 'Emergency session requested by Student #3892',
      timestamp: '15 minutes ago',
      status: 'resolved'
    },
    {
      id: 3,
      type: 'forum',
      message: 'Post flagged for review in Anxiety category',
      timestamp: '1 hour ago',
      status: 'pending'
    }
  ];

  const upcomingSessions = [
    {
      id: 1,
      studentId: 'S#4721',
      counselor: 'Dr. Sarah Smith',
      time: '2:00 PM',
      type: 'Video Call',
      status: 'confirmed'
    },
    {
      id: 2,
      studentId: 'S#3892',
      counselor: 'Dr. Michael Johnson',
      time: '3:30 PM',
      type: 'Phone Call',
      status: 'pending'
    },
    {
      id: 3,
      studentId: 'S#5634',
      counselor: 'Dr. Emily Williams',
      time: '4:00 PM',
      type: 'Video Call',
      status: 'confirmed'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.name || 'Admin'}
          </h1>
          <p className="text-gray-600">Here's what's happening with your mental health platform today.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                    <div className="flex items-center mt-2">
                      <span className={`text-sm font-medium ${
                        stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {stat.change}
                      </span>
                      <span className="text-sm text-gray-500 ml-1">from last week</span>
                    </div>
                  </div>
                  <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Weekly Bookings Chart */}
            <Card>
              <Card.Header>
                <Card.Title className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-blue-500" />
                  <span>Weekly Bookings Overview</span>
                </Card.Title>
                <Card.Description>Scheduled vs completed sessions this week</Card.Description>
              </Card.Header>
              <Card.Content>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={weeklyBookings}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
                      <XAxis dataKey="day" stroke="#6b7280" />
                      <YAxis stroke="#6b7280" />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: 'white',
                          border: '1px solid #e5e7eb',
                          borderRadius: '8px',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                        }}
                      />
                      <Bar dataKey="bookings" fill="#3b82f6" name="Scheduled" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="completed" fill="#10b981" name="Completed" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card.Content>
            </Card>

            {/* Mood Trends */}
            <Card>
              <Card.Header>
                <Card.Title className="flex items-center space-x-2">
                  <Activity className="w-5 h-5 text-green-500" />
                  <span>Average Student Mood Trends</span>
                </Card.Title>
                <Card.Description>Daily average mood scores (0-4 scale)</Card.Description>
              </Card.Header>
              <Card.Content>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={moodTrends}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
                      <XAxis dataKey="day" stroke="#6b7280" />
                      <YAxis domain={[0, 4]} stroke="#6b7280" />
                      <Tooltip 
                        formatter={(value) => [value.toFixed(1), 'Average Mood']}
                        contentStyle={{
                          backgroundColor: 'white',
                          border: '1px solid #e5e7eb',
                          borderRadius: '8px',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                        }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="avgMood" 
                        stroke="#10b981"
                        strokeWidth={3}
                        dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                        activeDot={{ r: 6, stroke: '#10b981', strokeWidth: 2 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card.Content>
            </Card>

            {/* Resource Usage */}
            <Card>
              <Card.Header>
                <Card.Title className="flex items-center space-x-2">
                  <BookOpen className="w-5 h-5 text-purple-500" />
                  <span>Resource Usage Distribution</span>
                </Card.Title>
                <Card.Description>How students are engaging with content</Card.Description>
              </Card.Header>
              <Card.Content>
                <div className="flex items-center justify-center">
                  <div className="h-64 w-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={resourceUsage}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {resourceUsage.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip 
                          formatter={(value) => [`${value}%`, 'Usage']}
                          contentStyle={{
                            backgroundColor: 'white',
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="ml-8">
                    {resourceUsage.map((item, index) => (
                      <div key={index} className="flex items-center mb-2">
                        <div 
                          className="w-4 h-4 rounded-full mr-2"
                          style={{ backgroundColor: item.color }}
                        ></div>
                        <span className="text-sm font-medium text-gray-700">{item.name}</span>
                        <span className="text-sm text-gray-500 ml-2">{item.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card.Content>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Alerts */}
            <Card>
              <Card.Header>
                <div className="flex items-center justify-between">
                  <Card.Title className="flex items-center space-x-2">
                    <Shield className="w-5 h-5 text-red-500" />
                    <span>Recent Alerts</span>
                  </Card.Title>
                  <Link 
                    to="/admin/analytics"
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    View All
                  </Link>
                </div>
              </Card.Header>
              <Card.Content>
                <div className="space-y-3">
                  {recentAlerts.map((alert) => (
                    <div key={alert.id} className="p-3 border border-gray-200 rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${
                          alert.type === 'crisis' ? 'bg-red-100 text-red-800' :
                          alert.type === 'booking' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {alert.type}
                        </span>
                        <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${
                          alert.status === 'pending' ? 'bg-orange-100 text-orange-800' : 'bg-green-100 text-green-800'
                        }`}>
                          {alert.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 mb-1">{alert.message}</p>
                      <p className="text-xs text-gray-500">{alert.timestamp}</p>
                    </div>
                  ))}
                </div>
              </Card.Content>
            </Card>

            {/* Upcoming Sessions */}
            <Card>
              <Card.Header>
                <div className="flex items-center justify-between">
                  <Card.Title className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-blue-500" />
                    <span>Today's Sessions</span>
                  </Card.Title>
                  <Link 
                    to="/admin/bookings"
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Manage
                  </Link>
                </div>
              </Card.Header>
              <Card.Content>
                <div className="space-y-3">
                  {upcomingSessions.map((session) => (
                    <div key={session.id} className="p-3 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-900">{session.time}</span>
                        <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${
                          session.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {session.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700">{session.studentId} with {session.counselor}</p>
                      <p className="text-xs text-gray-500 mt-1">{session.type}</p>
                    </div>
                  ))}
                </div>
              </Card.Content>
            </Card>

            {/* Quick Actions */}
            <Card>
              <Card.Header>
                <Card.Title>Quick Actions</Card.Title>
              </Card.Header>
              <Card.Content>
                <div className="space-y-3">
                  <Link 
                    to="/admin/bookings"
                    className="flex items-center justify-between w-full p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-5 h-5 text-blue-500" />
                      <span className="text-sm font-medium text-gray-900">Manage Bookings</span>
                    </div>
                    <span className="text-xs text-gray-500">89 pending</span>
                  </Link>
                  
                  <Link 
                    to="/admin/forum"
                    className="flex items-center justify-between w-full p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <MessageSquare className="w-5 h-5 text-green-500" />
                      <span className="text-sm font-medium text-gray-900">Forum Moderation</span>
                    </div>
                    <span className="text-xs text-gray-500">3 flagged</span>
                  </Link>
                  
                  <Link 
                    to="/admin/analytics"
                    className="flex items-center justify-between w-full p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <TrendingUp className="w-5 h-5 text-purple-500" />
                      <span className="text-sm font-medium text-gray-900">View Analytics</span>
                    </div>
                  </Link>
                </div>
              </Card.Content>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;