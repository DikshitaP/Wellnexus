import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Card from '../../components/shared/Card';
import Modal from '../../components/shared/Modal';
import { 
  Plus, 
  MessageCircle, 
  Heart, 
  Clock, 
  Send, 
  Users,
  TrendingUp,
  Shield
} from 'lucide-react';

const StudentForum = () => {
  const { user } = useAuth();
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
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

  const forumPosts = [
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
    if (!newPost.title || !newPost.content) return;
    
    // In a real app, this would submit to a backend
    setShowCreatePost(false);
    setNewPost({ title: '', content: '', category: 'general', isAnonymous: true });
  };

  const handleAddComment = (postId) => {
    if (!newComment.trim()) return;
    
    // In a real app, this would submit to a backend
    setNewComment('');
  };

  const getCategoryStyle = (categoryId) => {
    const category = categories.find(c => c.id === categoryId);
    return category?.color || 'bg-gray-100 text-gray-800';
  };

  const getCategoryLabel = (categoryId) => {
    const category = categories.find(c => c.id === categoryId);
    return category?.label || 'General';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Peer Support Forum</h1>
            <p className="text-gray-600">Connect with others on similar journeys</p>
          </div>
          <button 
            onClick={() => setShowCreatePost(true)}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium px-4 py-2 rounded-lg transition-all duration-200 flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>New Post</span>
          </button>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Main Forum Feed */}
          <div className="lg:col-span-3 space-y-4">
            {forumPosts.map((post) => (
              <Card key={post.id} hover>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${getCategoryStyle(post.category)}`}>
                        {getCategoryLabel(post.category)}
                      </span>
                      <span className="text-xs text-gray-500 flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{post.timestamp}</span>
                      </span>
                    </div>
                    <h3 
                      className="text-lg font-semibold text-gray-900 cursor-pointer hover:text-blue-600 transition-colors"
                      onClick={() => setSelectedPost(selectedPost === post.id ? null : post.id)}
                    >
                      {post.title}
                    </h3>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-4 leading-relaxed">{post.content}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button className="flex items-center space-x-1 text-gray-500 hover:text-red-500 transition-colors">
                      <Heart className="w-4 h-4" />
                      <span className="text-sm">{post.likes}</span>
                    </button>
                    <button 
                      onClick={() => setSelectedPost(selectedPost === post.id ? null : post.id)}
                      className="flex items-center space-x-1 text-gray-500 hover:text-blue-500 transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span className="text-sm">{post.comments.length}</span>
                    </button>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-medium">A</span>
                    </div>
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
                              <div className="w-4 h-4 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                                <span className="text-white text-xs">A</span>
                              </div>
                              <span>{comment.author}</span>
                              <span>•</span>
                              <span>{comment.timestamp}</span>
                            </div>
                            <button className="flex items-center space-x-1 text-gray-400 hover:text-red-500 transition-colors">
                              <Heart className="w-3 h-3" />
                              <span className="text-xs">{comment.likes}</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Add Comment */}
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Add a supportive comment..."
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <button 
                        onClick={() => handleAddComment(post.id)}
                        disabled={!newComment.trim()}
                        className="px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <Card.Header>
                <Card.Title className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-blue-500" />
                  <span>Community Stats</span>
                </Card.Title>
              </Card.Header>
              <Card.Content>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Active members</span>
                    <span className="text-blue-600 font-medium">1,247</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Posts today</span>
                    <span className="text-green-600 font-medium">23</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Support given</span>
                    <span className="text-purple-600 font-medium">156</span>
                  </div>
                </div>
              </Card.Content>
            </Card>

            <Card>
              <Card.Header>
                <Card.Title className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                  <span>Popular Categories</span>
                </Card.Title>
              </Card.Header>
              <Card.Content>
                <div className="space-y-2">
                  {categories.slice(0, 4).map((category) => (
                    <div key={category.id} className="flex items-center justify-between">
                      <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${category.color}`}>
                        {category.label}
                      </span>
                      <span className="text-xs text-gray-500 font-medium">
                        {Math.floor(Math.random() * 20) + 5}
                      </span>
                    </div>
                  ))}
                </div>
              </Card.Content>
            </Card>

            <Card>
              <Card.Header>
                <Card.Title className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-green-500" />
                  <span>Community Guidelines</span>
                </Card.Title>
              </Card.Header>
              <Card.Content>
                <div className="space-y-2 text-xs text-gray-600">
                  <p>• Be kind and supportive</p>
                  <p>• Respect anonymity</p>
                  <p>• No medical advice</p>
                  <p>• Report harmful content</p>
                  <p>• Seek professional help for crises</p>
                </div>
              </Card.Content>
            </Card>
          </div>
        </div>
      </div>

      {/* Create Post Modal */}
      <Modal
        isOpen={showCreatePost}
        onClose={() => setShowCreatePost(false)}
        title="Share with the Community"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
            <input
              type="text"
              value={newPost.title}
              onChange={(e) => setNewPost(prev => ({ ...prev, title: e.target.value }))}
              placeholder="What would you like to share?"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <div className="grid grid-cols-2 gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setNewPost(prev => ({ ...prev, category: category.id }))}
                  className={`px-3 py-2 text-sm rounded-lg transition-all ${
                    newPost.category === category.id
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Your message</label>
            <textarea
              value={newPost.content}
              onChange={(e) => setNewPost(prev => ({ ...prev, content: e.target.value }))}
              placeholder="Share your thoughts, experiences, or ask for support..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[150px] resize-none"
            />
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-2">
              <Shield className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-green-800">Privacy & Safety</span>
            </div>
            <p className="text-xs text-green-700">
              Posts are anonymous by default. Please be respectful and supportive. 
              If you're in crisis, please contact emergency services or a crisis helpline.
            </p>
          </div>

          <div className="flex space-x-3">
            <button 
              onClick={handleCreatePost}
              disabled={!newPost.title || !newPost.content}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Post to Community
            </button>
            <button 
              onClick={() => setShowCreatePost(false)}
              className="flex-1 border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default StudentForum;