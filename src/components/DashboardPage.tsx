import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { mockPets } from '../data/mockData';
import { 
  Heart, 
  FileText, 
  MessageCircle, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Calendar,
  MapPin,
  Send,
  User,
  Settings,
  Bell,
  Search
} from 'lucide-react';

interface DashboardPageProps {
  onNavigate: (page: string, petId?: string) => void;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ onNavigate }) => {
  const [newMessage, setNewMessage] = useState('');
  const [selectedConversation, setSelectedConversation] = useState(0);

  // Mock data for user applications
  const userApplications = [
    {
      id: '1',
      petId: '1',
      petName: 'Buddy',
      petImage: mockPets[0].images[0],
      status: 'pending',
      submittedAt: new Date('2024-01-15'),
      lastUpdate: new Date('2024-01-16'),
      nextStep: 'Reference check in progress'
    },
    {
      id: '2',
      petId: '2',
      petName: 'Luna',
      petImage: mockPets[1].images[0],
      status: 'approved',
      submittedAt: new Date('2024-01-10'),
      lastUpdate: new Date('2024-01-18'),
      nextStep: 'Schedule meet & greet'
    },
    {
      id: '3',
      petId: '3',
      petName: 'Max',
      petImage: mockPets[2].images[0],
      status: 'rejected',
      submittedAt: new Date('2024-01-05'),
      lastUpdate: new Date('2024-01-12'),
      nextStep: 'Application closed'
    }
  ];

  // Mock data for saved pets
  const savedPets = mockPets.slice(0, 4);

  // Mock data for conversations
  const conversations = [
    {
      id: 1,
      petName: 'Buddy',
      lastMessage: 'Thank you for your application. We\'ll be in touch soon!',
      timestamp: new Date('2024-01-16T14:30:00'),
      unread: true,
      messages: [
        {
          id: 1,
          sender: 'shelter',
          text: 'Hi! Thank you for your interest in Buddy. We\'ve received your application.',
          timestamp: new Date('2024-01-15T10:00:00')
        },
        {
          id: 2,
          sender: 'user',
          text: 'Thank you! I\'m very excited about the possibility of adopting Buddy. When can I schedule a meet and greet?',
          timestamp: new Date('2024-01-15T10:30:00')
        },
        {
          id: 3,
          sender: 'shelter',
          text: 'We\'re currently reviewing your application and checking references. We\'ll contact you within 2-3 business days to schedule a meeting.',
          timestamp: new Date('2024-01-16T14:30:00')
        }
      ]
    },
    {
      id: 2,
      petName: 'Luna',
      lastMessage: 'Great news! Your application has been approved.',
      timestamp: new Date('2024-01-18T09:15:00'),
      unread: false,
      messages: [
        {
          id: 1,
          sender: 'shelter',
          text: 'Great news! Your application for Luna has been approved. Congratulations!',
          timestamp: new Date('2024-01-18T09:15:00')
        }
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'approved':
        return <CheckCircle className="w-4 h-4" />;
      case 'rejected':
        return <XCircle className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const sendMessage = () => {
    if (newMessage.trim()) {
      // In a real app, this would send the message to the server
      setNewMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Welcome back, Sarah! 👋
          </h1>
          <p className="text-lg text-gray-600">
            Track your adoption applications and manage your saved pets.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Active Applications', value: '2', icon: FileText, color: 'blue' },
            { label: 'Saved Pets', value: '4', icon: Heart, color: 'pink' },
            { label: 'Messages', value: '3', icon: MessageCircle, color: 'purple' },
            { label: 'Profile Complete', value: '85%', icon: User, color: 'green' }
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className={`p-6 bg-white rounded-2xl shadow-lg border-0`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                  </div>
                  <div className={`bg-${stat.color}-100 p-3 rounded-xl`}>
                    <Icon className={`w-6 h-6 text-${stat.color}-600`} />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="applications" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white rounded-2xl p-2 shadow-lg">
            <TabsTrigger value="applications" className="rounded-xl">Applications</TabsTrigger>
            <TabsTrigger value="saved" className="rounded-xl">Saved Pets</TabsTrigger>
            <TabsTrigger value="messages" className="rounded-xl">Messages</TabsTrigger>
            <TabsTrigger value="profile" className="rounded-xl">Profile</TabsTrigger>
          </TabsList>

          {/* Applications Tab */}
          <TabsContent value="applications" className="space-y-6">
            <Card className="p-6 bg-white rounded-2xl shadow-lg border-0">
              <h2 className="text-xl font-bold text-gray-800 mb-6">My Applications</h2>
              
              {userApplications.length > 0 ? (
                <div className="space-y-4">
                  {userApplications.map((application) => (
                    <Card key={application.id} className="p-6 border border-gray-100 rounded-xl hover:shadow-md transition-all duration-200">
                      <div className="flex items-center gap-4">
                        <ImageWithFallback
                          src={application.petImage}
                          alt={application.petName}
                          className="w-16 h-16 object-cover rounded-xl"
                        />
                        
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-bold text-gray-800">{application.petName}</h3>
                            <Badge className={`${getStatusColor(application.status)} flex items-center gap-1`}>
                              {getStatusIcon(application.status)}
                              {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              Submitted: {application.submittedAt.toLocaleDateString()}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              Updated: {application.lastUpdate.toLocaleDateString()}
                            </div>
                            <div>
                              Next: {application.nextStep}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button 
                            variant="outline"
                            size="sm"
                            onClick={() => onNavigate('pet-profile', application.petId)}
                            className="border-2 border-pink-300 text-pink-600 hover:bg-pink-50 rounded-xl"
                          >
                            View Pet
                          </Button>
                          {application.status === 'approved' && (
                            <Button 
                              size="sm"
                              className="bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl"
                            >
                              Schedule Visit
                            </Button>
                          )}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">No Applications Yet</h3>
                  <p className="text-gray-500 mb-6">Start your adoption journey by browsing our available pets.</p>
                  <Button 
                    onClick={() => onNavigate('browse')}
                    className="bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl"
                  >
                    Browse Pets
                  </Button>
                </div>
              )}
            </Card>
          </TabsContent>

          {/* Saved Pets Tab */}
          <TabsContent value="saved" className="space-y-6">
            <Card className="p-6 bg-white rounded-2xl shadow-lg border-0">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">Saved Pets</h2>
                <Button 
                  onClick={() => onNavigate('browse')}
                  variant="outline"
                  className="border-2 border-pink-300 text-pink-600 hover:bg-pink-50 rounded-xl"
                >
                  <Search className="w-4 h-4 mr-2" />
                  Find More Pets
                </Button>
              </div>
              
              {savedPets.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {savedPets.map((pet) => (
                    <Card 
                      key={pet.id}
                      className="group overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border-0 bg-white rounded-2xl cursor-pointer"
                      onClick={() => onNavigate('pet-profile', pet.id)}
                    >
                      <div className="relative overflow-hidden">
                        <ImageWithFallback
                          src={pet.images[0]}
                          alt={pet.name}
                          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute top-3 right-3">
                          <Button size="sm" className="rounded-full bg-pink-500 text-white p-2 hover:bg-pink-600">
                            <Heart className="w-4 h-4 fill-current" />
                          </Button>
                        </div>
                        <div className="absolute bottom-3 left-3">
                          <Badge className="bg-green-500 text-white">Available</Badge>
                        </div>
                      </div>
                      
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-bold text-gray-800 mb-1">{pet.name}</h3>
                            <p className="text-sm text-gray-600">{pet.breed}</p>
                          </div>
                          <p className="font-bold text-pink-600">${pet.adoptionFee}</p>
                        </div>
                        
                        <div className="flex items-center gap-3 text-xs text-gray-600 mb-3">
                          <span>{pet.age} years</span>
                          <span>{pet.location.split(',')[0]}</span>
                        </div>
                        
                        <Button 
                          className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white rounded-xl text-sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            onNavigate('adoption-form', pet.id);
                          }}
                        >
                          Apply to Adopt
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">No Saved Pets</h3>
                  <p className="text-gray-500 mb-6">Save pets you're interested in to easily find them later.</p>
                  <Button 
                    onClick={() => onNavigate('browse')}
                    className="bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl"
                  >
                    Browse Pets
                  </Button>
                </div>
              )}
            </Card>
          </TabsContent>

          {/* Messages Tab */}
          <TabsContent value="messages" className="space-y-6">
            <Card className="p-0 bg-white rounded-2xl shadow-lg border-0 overflow-hidden">
              <div className="flex h-[600px]">
                {/* Conversations List */}
                <div className="w-1/3 border-r border-gray-100">
                  <div className="p-4 border-b border-gray-100">
                    <h2 className="font-bold text-gray-800">Messages</h2>
                  </div>
                  <div className="overflow-y-auto">
                    {conversations.map((conversation, index) => (
                      <div
                        key={conversation.id}
                        onClick={() => setSelectedConversation(index)}
                        className={`p-4 border-b border-gray-50 cursor-pointer hover:bg-gray-50 transition-colors ${
                          selectedConversation === index ? 'bg-pink-50 border-pink-100' : ''
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-gray-800">{conversation.petName}</h3>
                          {conversation.unread && (
                            <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                        <p className="text-xs text-gray-400 mt-1">
                          {conversation.timestamp.toLocaleDateString()}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Message Area */}
                <div className="flex-1 flex flex-col">
                  {conversations.length > 0 ? (
                    <>
                      {/* Message Header */}
                      <div className="p-4 border-b border-gray-100">
                        <h3 className="font-bold text-gray-800">
                          Conversation about {conversations[selectedConversation]?.petName}
                        </h3>
                      </div>

                      {/* Messages */}
                      <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {conversations[selectedConversation]?.messages.map((message) => (
                          <div
                            key={message.id}
                            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                          >
                            <div
                              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                                message.sender === 'user'
                                  ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white'
                                  : 'bg-gray-100 text-gray-800'
                              }`}
                            >
                              <p className="text-sm">{message.text}</p>
                              <p
                                className={`text-xs mt-1 ${
                                  message.sender === 'user' ? 'text-pink-100' : 'text-gray-500'
                                }`}
                              >
                                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Message Input */}
                      <div className="p-4 border-t border-gray-100">
                        <div className="flex gap-2">
                          <Input
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Type your message..."
                            className="flex-1 border-2 border-gray-100 focus:border-pink-400 rounded-xl"
                            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                          />
                          <Button 
                            onClick={sendMessage}
                            className="bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl px-4"
                          >
                            <Send className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="flex-1 flex items-center justify-center">
                      <div className="text-center">
                        <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-600 mb-2">No Messages</h3>
                        <p className="text-gray-500">Messages from the shelter will appear here.</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card className="p-6 bg-white rounded-2xl shadow-lg border-0">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">Profile Settings</h2>
                <Button variant="outline" className="border-2 border-gray-300 text-gray-600 hover:bg-gray-50 rounded-xl">
                  <Settings className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
                    <p className="text-gray-600">Sarah Johnson</p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                    <p className="text-gray-600">sarah.johnson@email.com</p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Phone</label>
                    <p className="text-gray-600">(555) 123-4567</p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Address</label>
                    <p className="text-gray-600">123 Main Street, San Francisco, CA 94102</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Preferred Pet Type</label>
                    <p className="text-gray-600">Dogs, Medium to Large size</p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Experience Level</label>
                    <p className="text-gray-600">Experienced (5+ years)</p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Notifications</label>
                    <div className="flex items-center gap-2">
                      <Bell className="w-4 h-4 text-green-500" />
                      <span className="text-gray-600">Email notifications enabled</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DashboardPage;