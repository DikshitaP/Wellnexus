import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';
import { 
  Heart, 
  MessageCircle, 
  Calendar, 
  Users, 
  BookOpen, 
  User,
  LayoutDashboard,
  Settings,
  FileText,
  BarChart3,
  LogOut
} from 'lucide-react';
import { authAPI } from '../services/api';

interface NavbarProps {
  userRole: 'student' | 'admin';
}

const Navbar: React.FC<NavbarProps> = ({ userRole }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentUser = authAPI.getCurrentUser();

  const handleLogout = () => {
    authAPI.logout();
    navigate('/login');
  };

  const studentNavItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/student/dashboard' },
    { id: 'chatbot', label: 'Chat Support', icon: MessageCircle, path: '/student/chatbot' },
    { id: 'booking', label: 'Book Session', icon: Calendar, path: '/student/booking' },
    { id: 'mood-tracker', label: 'Mood Tracker', icon: Heart, path: '/student/mood-tracker' },
    { id: 'forum', label: 'Peer Forum', icon: Users, path: '/student/forum' },
    { id: 'resources', label: 'Resources', icon: BookOpen, path: '/student/resources' },
  ];

  const adminNavItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard' },
    { id: 'bookings', label: 'Bookings', icon: Calendar, path: '/admin/bookings' },
    { id: 'forum-moderation', label: 'Forum Moderation', icon: Users, path: '/admin/forum-moderation' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, path: '/admin/analytics' },
  ];

  const navItems = userRole === 'student' ? studentNavItems : adminNavItems;

  return (
    <nav className="bg-white border-b border-border shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to={userRole === 'student' ? '/student/dashboard' : '/admin/dashboard'} className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl text-primary">MindCare</span>
            {userRole === 'admin' && (
              <span className="text-sm bg-purple-100 text-purple-700 px-2 py-1 rounded-full">Admin</span>
            )}
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link key={item.id} to={item.path}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    className="flex items-center space-x-2 px-3 py-2"
                  >
                    <Icon className="w-4 h-4" />
                    <span className="hidden lg:inline">{item.label}</span>
                  </Button>
                </Link>
              );
            })}
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-3">
            <div className="hidden md:flex items-center space-x-2">
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-gradient-to-br from-blue-400 to-purple-500 text-white text-sm">
                  {currentUser?.name?.split(' ').map(n => n[0]).join('') || 'U'}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm text-gray-700">{currentUser?.name}</span>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-border z-50">
        <div className="grid grid-cols-4 py-2">
          {navItems.slice(0, 4).map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link key={item.id} to={item.path}>
                <Button
                  variant="ghost"
                  className={`flex flex-col items-center py-2 px-1 h-auto ${
                    isActive ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  <Icon className="w-5 h-5 mb-1" />
                  <span className="text-xs">{item.label.split(' ')[0]}</span>
                </Button>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;