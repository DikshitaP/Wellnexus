// Mock API service for the Mental Health Support System
import axios from 'axios';

// Mock JWT tokens
const MOCK_STUDENT_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwicm9sZSI6InN0dWRlbnQiLCJpYXQiOjE1MTYyMzkwMjJ9';
const MOCK_ADMIN_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFkbWluIFVzZXIiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE1MTYyMzkwMjJ9';

// Create axios instance
const api = axios.create({
  baseURL: 'https://api.mindcare.app', // Mock base URL
  timeout: 5000,
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  // Student login
  studentLogin: async (email, password) => {
    // Mock validation
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (email === 'student@test.com' && password === 'password') {
      const userData = {
        id: 1,
        email: 'student@test.com',
        name: 'Alex Student',
        role: 'student',
        token: MOCK_STUDENT_TOKEN
      };
      localStorage.setItem('token', MOCK_STUDENT_TOKEN);
      localStorage.setItem('user', JSON.stringify(userData));
      return { data: userData };
    }
    throw new Error('Invalid credentials');
  },

  // Student signup
  studentSignup: async (userData) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newUser = {
      id: Date.now(),
      email: userData.email,
      name: `${userData.firstName} ${userData.lastName}`,
      role: 'student',
      token: MOCK_STUDENT_TOKEN
    };
    localStorage.setItem('token', MOCK_STUDENT_TOKEN);
    localStorage.setItem('user', JSON.stringify(newUser));
    return { data: newUser };
  },

  // Admin login
  adminLogin: async (email, password) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (email === 'admin@test.com' && password === 'admin123') {
      const userData = {
        id: 1,
        email: 'admin@test.com',
        name: 'Admin User',
        role: 'admin',
        token: MOCK_ADMIN_TOKEN
      };
      localStorage.setItem('token', MOCK_ADMIN_TOKEN);
      localStorage.setItem('user', JSON.stringify(userData));
      return { data: userData };
    }
    throw new Error('Invalid admin credentials');
  },

  // Logout
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return Promise.resolve();
  },

  // Get current user
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  }
};

// Student API
export const studentAPI = {
  // Chatbot
  sendMessage: async (message) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const responses = [
      "I hear you, and your feelings are completely valid. It takes courage to share how you're feeling.",
      "Thank you for trusting me with this. You're not alone in what you're experiencing.",
      "It sounds like you're going through a challenging time. What's one small thing that might help you feel a bit better today?",
      "Your wellbeing matters. Have you been able to take care of your basic needs today?",
      "I'm glad you reached out today. That shows real strength, even when things feel difficult."
    ];
    
    return {
      data: {
        id: Date.now(),
        message: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date().toISOString()
      }
    };
  },

  // Bookings
  createBooking: async (bookingData) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      data: {
        id: Date.now(),
        ...bookingData,
        status: 'pending',
        createdAt: new Date().toISOString()
      }
    };
  },

  getBookings: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      data: [
        {
          id: 1,
          date: '2024-01-15',
          time: '10:00 AM',
          counselor: 'Dr. Sarah Smith',
          type: 'video',
          status: 'confirmed'
        },
        {
          id: 2,
          date: '2024-01-22',
          time: '2:00 PM',
          counselor: 'Dr. Michael Johnson',
          type: 'phone',
          status: 'pending'
        }
      ]
    };
  },

  // Mood Tracker
  saveMoodEntry: async (moodData) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      data: {
        id: Date.now(),
        ...moodData,
        date: new Date().toISOString().split('T')[0]
      }
    };
  },

  getMoodHistory: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const mockData = [];
    for (let i = 30; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      mockData.push({
        date: date.toISOString().split('T')[0],
        mood: Math.floor(Math.random() * 5) + 3, // 3-7 range
        stress: Math.floor(Math.random() * 5) + 2,
        energy: Math.floor(Math.random() * 5) + 3,
        sleep: Math.floor(Math.random() * 5) + 3
      });
    }
    
    return { data: mockData };
  },

  // Forum
  getForumPosts: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      data: [
        {
          id: 1,
          title: 'Feeling overwhelmed with finals season',
          content: 'Does anyone else feel like they\'re drowning in assignments?',
          author: 'Anonymous Student',
          timestamp: '2 hours ago',
          category: 'academic',
          likes: 12,
          comments: [
            {
              id: 1,
              content: 'I totally understand! Breaking things down into smaller tasks has really helped me.',
              author: 'StudyBuddy',
              timestamp: '1 hour ago',
              likes: 5
            }
          ]
        }
      ]
    };
  },

  createForumPost: async (postData) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      data: {
        id: Date.now(),
        ...postData,
        timestamp: new Date().toISOString(),
        likes: 0,
        comments: []
      }
    };
  },

  // Resources
  getResources: async (filters = {}) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      data: [
        {
          id: 1,
          title: '10-Minute Guided Meditation for Anxiety',
          description: 'A gentle guided meditation to help calm anxious thoughts.',
          type: 'audio',
          category: 'anxiety',
          duration: '10 min',
          rating: 4.8,
          thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop'
        }
      ]
    };
  }
};

// Admin API
export const adminAPI = {
  // Dashboard stats
  getDashboardStats: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      data: {
        activeStudents: 1247,
        totalBookings: 156,
        pendingBookings: 23,
        chatbotSessions: 892,
        forumPosts: 45,
        flaggedContent: 3
      }
    };
  },

  // Booking management
  getAllBookings: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      data: [
        {
          id: 1,
          studentName: 'Anonymous Student',
          studentEmail: 'student1@test.com',
          counselor: 'Dr. Sarah Smith',
          date: '2024-01-15',
          time: '10:00 AM',
          type: 'video',
          status: 'pending',
          reason: 'anxiety'
        }
      ]
    };
  },

  updateBookingStatus: async (bookingId, status) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      data: {
        id: bookingId,
        status: status,
        updatedAt: new Date().toISOString()
      }
    };
  },

  // Forum moderation
  getFlaggedContent: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      data: [
        {
          id: 1,
          type: 'post',
          content: 'Sample flagged post content...',
          author: 'Anonymous',
          reportReason: 'Inappropriate content',
          reportedAt: '2024-01-10T10:00:00Z',
          status: 'pending'
        }
      ]
    };
  },

  moderateContent: async (contentId, action) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      data: {
        id: contentId,
        action: action,
        moderatedAt: new Date().toISOString()
      }
    };
  },

  // Analytics
  getAnalytics: async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockData = {
      moodTrends: [],
      chatbotActivity: [],
      bookingDemand: []
    };

    // Generate mock mood trends
    for (let i = 30; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      mockData.moodTrends.push({
        date: date.toISOString().split('T')[0],
        avgMood: Math.random() * 3 + 5, // 5-8 range
        totalEntries: Math.floor(Math.random() * 50) + 100
      });
    }

    // Generate mock chatbot activity
    for (let i = 7; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      mockData.chatbotActivity.push({
        date: date.toISOString().split('T')[0],
        sessions: Math.floor(Math.random() * 100) + 50,
        messages: Math.floor(Math.random() * 500) + 200
      });
    }

    // Generate mock booking demand
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    months.forEach(month => {
      mockData.bookingDemand.push({
        month: month,
        bookings: Math.floor(Math.random() * 100) + 50,
        completed: Math.floor(Math.random() * 80) + 40
      });
    });

    return { data: mockData };
  }
};

export default api;