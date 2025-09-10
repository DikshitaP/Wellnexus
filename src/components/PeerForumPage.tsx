import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Separator } from './ui/separator';
import { 
  Plus, 
  MessageCircle, 
  Heart, 
  Clock, 
  Send, 
  Users,
  Bookmark,
  Shield,
  TrendingUp
} from 'lucide-react';

interface PeerForumPageProps {
  onNavigate: (page: string) => void;
}

interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  timestamp: string;
  category: string;
  likes: number;
  comments: Comment[];
  isAnonymous: boolean;
}

interface Comment {
  id: string;
  content: string;
  author: string;
  timestamp: string;
  likes: number;
  isAnonymous: boolean;
}

const PeerForumPage: React.FC<PeerForumPageProps> = ({ onNavigate }) => {
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [selectedPost, setSelectedPost] = useState<string | null>(null);
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    category: 'general',
    isAnonymous: true
  });
  const [newComment, setNewComment] = useState('');

  const categories = [
    { id: 'general', label: 'General Support', color: 'bg-blue-100 text-blue-800' },
    { id: 'anxiety', label: 'Anxiety', color: 'bg-purple-100 text-purple-800' },
    { id: 'depression', label: 'Depression', color: 'bg-indigo-100 text-indigo-800' },
    { id: 'academic', label: 'Academic Stress', color: 'bg-orange-100 text-orange-800' },
    { id: 'relationships', label: 'Relationships', color: 'bg-pink-100 text-pink-800' },
    { id: 'self-care', label: 'Self-Care', color: 'bg-green-100 text-green-800' }
  ];

  const forumPosts: Post[] = [
    {
      id: '1',
      title: 'Feeling overwhelmed with finals season',
      content: 'Does anyone else feel like they\'re drowning in assignments? I have 3 exams next week and I can barely focus on studying. Any tips for managing academic stress?',
      author: 'Anonymous Student',
      timestamp: '2 hours ago',
      category: 'academic',
      likes: 12,
      isAnonymous: true,
      comments: [
        {
          id: '1',
          content: 'I totally understand! Breaking things down into smaller tasks has really helped me. Try the Pomodoro technique - 25 minutes focused study, 5 minute break.',
          author: 'StudyBuddy',
          timestamp: '1 hour ago',
          likes: 5,
          isAnonymous: true
        },
        {
          id: '2',
          content: 'Remember to take care of yourself too! Make sure you\'re eating well and getting some sleep. Your health is more important than perfect grades.',
          author: 'Anonymous',
          timestamp: '45 minutes ago',
          likes: 8,
          isAnonymous: true
        }
      ]
    },
    {
      id: '2',
      title: 'Small wins today 🌟',
      content: 'I managed to go for a 15-minute walk today even though I was feeling really down. It might not seem like much, but it felt like a huge step for me. Celebrating the small victories!',
      author: 'Anonymous',
      timestamp: '4 hours ago',
      category: 'self-care',
      likes: 24,
      isAnonymous: true,
      comments: [
        {
          id: '3',
          content: 'That\'s amazing! Every step counts, literally and figuratively. You should be proud of yourself for taking that step.',
          author: 'Anonymous Supporter',
          timestamp: '3 hours ago',
          likes: 6,
          isAnonymous: true
        }
      ]
    },
    {
      id: '3',
      title: 'Anyone else struggling with social anxiety?',
      content: 'I have a presentation next week and I\'m already losing sleep over it. My heart races just thinking about speaking in front of the class. How do you all cope with presentation anxiety?',
      author: 'Nervous Presenter',
      timestamp: '6 hours ago',
      category: 'anxiety',
      likes: 18,
      isAnonymous: true,
      comments: [
        {
          id: '4',
          content: 'Practice, practice, practice! I record myself doing the presentation on my phone and it really helps. Also breathing exercises before you start.',
          author: 'Anonymous',
          timestamp: '5 hours ago',
          likes: 7,
          isAnonymous: true
        }
      ]
    }
  ];

  const handleCreatePost = () => {
    setShowCreatePost(false);
    setNewPost({ title: '', content: '', category: 'general', isAnonymous: true });
    // In a real app, this would submit to a backend
  };

  const handleAddComment = (postId: string) => {
    setNewComment('');
    // In a real app, this would submit to a backend
  };

  const getCategoryStyle = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    return category?.color || 'bg-gray-100 text-gray-800';
  };

  if (showCreatePost) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Share with the Community</CardTitle>
              <CardDescription>
                Create a post to connect with others and find support
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm mb-2">Title</label>
                <Input
                  value={newPost.title}
                  onChange={(e) => setNewPost(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="What would you like to share?"
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm mb-2">Category</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {categories.map((category) => (
                    <Button
                      key={category.id}
                      variant={newPost.category === category.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => setNewPost(prev => ({ ...prev, category: category.id }))}
                    >
                      {category.label}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm mb-2">Your message</label>
                <Textarea
                  value={newPost.content}
                  onChange={(e) => setNewPost(prev => ({ ...prev, content: e.target.value }))}
                  placeholder="Share your thoughts, experiences, or ask for support..."
                  className="min-h-[150px]"
                />
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <div className="flex items-center space-x-2 mb-2">
                  <Shield className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-green-800">Privacy & Safety</span>
                </div>
                <p className="text-xs text-green-700">
                  Posts are anonymous by default. Please be respectful and supportive. 
                  If you're in crisis, please contact emergency services or a crisis helpline.
                </p>
              </div>

              <div className="flex space-x-3">
                <Button 
                  onClick={handleCreatePost}
                  disabled={!newPost.title || !newPost.content}
                  className="flex-1"
                >
                  Post to Community
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setShowCreatePost(false)}
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 py-8 px-4 pb-20 md:pb-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl text-gray-800 mb-2">Peer Support Forum</h1>
            <p className="text-gray-600">Connect with others on similar journeys</p>
          </div>
          <Button 
            onClick={() => setShowCreatePost(true)}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Post
          </Button>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Main Forum Feed */}
          <div className="lg:col-span-3 space-y-4">
            {forumPosts.map((post) => (
              <Card key={post.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge className={getCategoryStyle(post.category)}>
                          {categories.find(c => c.id === post.category)?.label}
                        </Badge>
                        <span className="text-xs text-gray-500 flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{post.timestamp}</span>
                        </span>
                      </div>
                      <CardTitle className="text-lg cursor-pointer hover:text-blue-600"
                        onClick={() => setSelectedPost(selectedPost === post.id ? null : post.id)}>
                        {post.title}
                      </CardTitle>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <p className="text-gray-700 mb-4 leading-relaxed">{post.content}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Button variant="ghost" size="sm" className="text-gray-500 hover:text-red-500">
                        <Heart className="w-4 h-4 mr-1" />
                        {post.likes}
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-gray-500 hover:text-blue-500"
                        onClick={() => setSelectedPost(selectedPost === post.id ? null : post.id)}
                      >
                        <MessageCircle className="w-4 h-4 mr-1" />
                        {post.comments.length}
                      </Button>
                    </div>
                    
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Avatar className="w-6 h-6">
                        <AvatarFallback className="bg-blue-100 text-blue-600 text-xs">
                          A
                        </AvatarFallback>
                      </Avatar>
                      <span>{post.author}</span>
                    </div>
                  </div>

                  {/* Comments Section */}
                  {selectedPost === post.id && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <div className="space-y-3 mb-4">
                        {post.comments.map((comment) => (
                          <div key={comment.id} className="bg-gray-50 rounded-lg p-3">
                            <p className="text-sm text-gray-700 mb-2">{comment.content}</p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2 text-xs text-gray-500">
                                <Avatar className="w-4 h-4">
                                  <AvatarFallback className="bg-green-100 text-green-600 text-xs">
                                    A
                                  </AvatarFallback>
                                </Avatar>
                                <span>{comment.author}</span>
                                <span>•</span>
                                <span>{comment.timestamp}</span>
                              </div>
                              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-red-500 h-auto p-1">
                                <Heart className="w-3 h-3 mr-1" />
                                {comment.likes}
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {/* Add Comment */}
                      <div className="flex space-x-2">
                        <Input
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          placeholder="Add a supportive comment..."
                          className="flex-1"
                        />
                        <Button 
                          size="sm"
                          onClick={() => handleAddComment(post.id)}
                          disabled={!newComment.trim()}
                        >
                          <Send className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-blue-500" />
                  <span>Community Stats</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Active members</span>
                    <span className="text-blue-600">1,247</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Posts today</span>
                    <span className="text-green-600">23</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Support given</span>
                    <span className="text-purple-600">156</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                  <span>Popular Categories</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {categories.slice(0, 4).map((category) => (
                    <div key={category.id} className="flex items-center justify-between">
                      <Badge variant="outline" className="text-xs">
                        {category.label}
                      </Badge>
                      <span className="text-xs text-gray-500">
                        {Math.floor(Math.random() * 20) + 5}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Community Guidelines</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-xs text-gray-600">
                  <p>• Be kind and supportive</p>
                  <p>• Respect anonymity</p>
                  <p>• No medical advice</p>
                  <p>• Report harmful content</p>
                  <p>• Seek professional help for crises</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PeerForumPage;