import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Separator } from './ui/separator';
import { 
  User, 
  Settings, 
  Bell, 
  Shield, 
  Heart, 
  Calendar,
  Award,
  TrendingUp,
  Edit3,
  Save,
  X
} from 'lucide-react';

interface ProfilePageProps {
  onNavigate: (page: string) => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ onNavigate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: 'Alex',
    lastName: 'Student',
    email: 'alex.student@university.edu',
    bio: 'Computer Science major focusing on mental wellness and personal growth.',
    anonymousPosting: true,
    emailNotifications: true,
    pushNotifications: false,
    weeklyReports: true,
    crisisAlerts: true
  });

  const stats = {
    checkInStreak: 12,
    totalCheckIns: 45,
    resourcesViewed: 28,
    communityPosts: 8,
    supportGiven: 23,
    joinDate: 'March 2024'
  };

  const achievements = [
    { id: 1, name: '7-Day Streak', description: 'Checked in for 7 consecutive days', earned: true, date: '2 weeks ago' },
    { id: 2, name: 'Community Helper', description: 'Provided support to 10+ community members', earned: true, date: '1 week ago' },
    { id: 3, name: 'Resource Explorer', description: 'Viewed 25+ wellness resources', earned: true, date: '3 days ago' },
    { id: 4, name: 'Mood Master', description: 'Complete 30 mood check-ins', earned: false, progress: 45 },
    { id: 5, name: 'Wellness Warrior', description: 'Maintain a 30-day check-in streak', earned: false, progress: 12 }
  ];

  const handleSave = () => {
    setIsEditing(false);
    // In a real app, this would save to backend
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form data
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 py-8 px-4 pb-20 md:pb-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl text-gray-800 mb-2">Your Profile</h1>
          <p className="text-gray-600">Manage your account and wellness journey</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Profile Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Header */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-4 mb-6">
                  <Avatar className="w-20 h-20">
                    <AvatarFallback className="bg-gradient-to-br from-blue-400 to-purple-500 text-white text-2xl">
                      {profileData.firstName[0]}{profileData.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h2 className="text-2xl text-gray-800 mb-1">
                      {profileData.firstName} {profileData.lastName}
                    </h2>
                    <p className="text-gray-600 mb-2">{profileData.email}</p>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      Active Member since {stats.joinDate}
                    </Badge>
                  </div>
                  <Button 
                    variant="outline" 
                    onClick={() => setIsEditing(!isEditing)}
                    className="flex items-center space-x-2"
                  >
                    {isEditing ? <X className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
                    <span>{isEditing ? 'Cancel' : 'Edit'}</span>
                  </Button>
                </div>

                {isEditing ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          value={profileData.firstName}
                          onChange={(e) => setProfileData(prev => ({ ...prev, firstName: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          value={profileData.lastName}
                          onChange={(e) => setProfileData(prev => ({ ...prev, lastName: e.target.value }))}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        value={profileData.bio}
                        onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                        placeholder="Tell us a bit about yourself..."
                      />
                    </div>
                    <Button onClick={handleSave} className="flex items-center space-x-2">
                      <Save className="w-4 h-4" />
                      <span>Save Changes</span>
                    </Button>
                  </div>
                ) : (
                  <div>
                    <p className="text-gray-700 leading-relaxed">{profileData.bio}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Privacy & Notifications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="w-5 h-5 text-blue-500" />
                  <span>Privacy & Notifications</span>
                </CardTitle>
                <CardDescription>
                  Control your privacy settings and notification preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h4 className="text-sm text-gray-700 flex items-center space-x-2">
                    <Shield className="w-4 h-4" />
                    <span>Privacy Settings</span>
                  </h4>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="anonymous">Anonymous Community Posts</Label>
                      <p className="text-xs text-gray-500">Post anonymously in community forums</p>
                    </div>
                    <Switch
                      id="anonymous"
                      checked={profileData.anonymousPosting}
                      onCheckedChange={(checked) => 
                        setProfileData(prev => ({ ...prev, anonymousPosting: checked }))
                      }
                    />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="text-sm text-gray-700 flex items-center space-x-2">
                    <Bell className="w-4 h-4" />
                    <span>Notification Preferences</span>
                  </h4>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="emailNotifs">Email Notifications</Label>
                      <p className="text-xs text-gray-500">Receive updates via email</p>
                    </div>
                    <Switch
                      id="emailNotifs"
                      checked={profileData.emailNotifications}
                      onCheckedChange={(checked) => 
                        setProfileData(prev => ({ ...prev, emailNotifications: checked }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="pushNotifs">Push Notifications</Label>
                      <p className="text-xs text-gray-500">Receive push notifications</p>
                    </div>
                    <Switch
                      id="pushNotifs"
                      checked={profileData.pushNotifications}
                      onCheckedChange={(checked) => 
                        setProfileData(prev => ({ ...prev, pushNotifications: checked }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="weeklyReports">Weekly Wellness Reports</Label>
                      <p className="text-xs text-gray-500">Get weekly summaries of your progress</p>
                    </div>
                    <Switch
                      id="weeklyReports"
                      checked={profileData.weeklyReports}
                      onCheckedChange={(checked) => 
                        setProfileData(prev => ({ ...prev, weeklyReports: checked }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="crisisAlerts">Crisis Resource Alerts</Label>
                      <p className="text-xs text-gray-500">Important safety notifications</p>
                    </div>
                    <Switch
                      id="crisisAlerts"
                      checked={profileData.crisisAlerts}
                      onCheckedChange={(checked) => 
                        setProfileData(prev => ({ ...prev, crisisAlerts: checked }))
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Award className="w-5 h-5 text-yellow-500" />
                  <span>Achievements</span>
                </CardTitle>
                <CardDescription>
                  Celebrate your wellness milestones
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {achievements.map((achievement) => (
                    <div 
                      key={achievement.id}
                      className={`p-4 rounded-lg border-2 ${
                        achievement.earned 
                          ? 'border-green-200 bg-green-50' 
                          : 'border-gray-200 bg-gray-50'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className={`text-sm ${
                          achievement.earned ? 'text-green-800' : 'text-gray-600'
                        }`}>
                          {achievement.name}
                        </h4>
                        {achievement.earned && (
                          <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                            ✓ Earned
                          </Badge>
                        )}
                      </div>
                      <p className={`text-xs mb-2 ${
                        achievement.earned ? 'text-green-600' : 'text-gray-500'
                      }`}>
                        {achievement.description}
                      </p>
                      {achievement.earned ? (
                        <p className="text-xs text-green-500">{achievement.date}</p>
                      ) : (
                        <div>
                          <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                            <div 
                              className="bg-blue-500 h-2 rounded-full"
                              style={{ width: `${(achievement.progress! / 30) * 100}%` }}
                            ></div>
                          </div>
                          <p className="text-xs text-gray-500">
                            Progress: {achievement.progress}/30
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Stats */}
          <div className="space-y-6">
            {/* Wellness Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                  <span>Your Stats</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-white text-lg">{stats.checkInStreak}</span>
                  </div>
                  <p className="text-sm text-gray-600">Current Streak</p>
                  <p className="text-xs text-gray-500">days</p>
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Total Check-ins</span>
                    <Badge variant="outline">{stats.totalCheckIns}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Resources Viewed</span>
                    <Badge variant="outline">{stats.resourcesViewed}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Community Posts</span>
                    <Badge variant="outline">{stats.communityPosts}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Support Given</span>
                    <Badge variant="outline" className="bg-pink-50 text-pink-700 border-pink-200">
                      <Heart className="w-3 h-3 mr-1" />
                      {stats.supportGiven}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => onNavigate('mood-tracker')}
                >
                  <Heart className="w-4 h-4 mr-2" />
                  Daily Check-in
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => onNavigate('booking')}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Book Session
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => onNavigate('resources')}
                >
                  <User className="w-4 h-4 mr-2" />
                  Browse Resources
                </Button>
              </CardContent>
            </Card>

            {/* Account Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Account</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start text-gray-600">
                  Export My Data
                </Button>
                <Button variant="outline" className="w-full justify-start text-gray-600">
                  Privacy Policy
                </Button>
                <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50">
                  Delete Account
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;