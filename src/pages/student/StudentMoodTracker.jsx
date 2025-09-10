import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Card from '../../components/shared/Card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Calendar, TrendingUp, Heart, Save } from 'lucide-react';

const StudentMoodTracker = () => {
  const { user } = useAuth();
  const [selectedMood, setSelectedMood] = useState(null);
  const [notes, setNotes] = useState('');
  const [activities, setActivities] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const moodOptions = [
    { value: 4, emoji: '😊', label: 'Happy', color: 'from-green-400 to-green-600' },
    { value: 3, emoji: '🙂', label: 'Good', color: 'from-blue-400 to-blue-600' },
    { value: 2, emoji: '😐', label: 'Okay', color: 'from-yellow-400 to-yellow-600' },
    { value: 1, emoji: '😔', label: 'Sad', color: 'from-orange-400 to-orange-600' },
    { value: 0, emoji: '😭', label: 'Very Sad', color: 'from-red-400 to-red-600' }
  ];

  const dailyActivities = [
    'Exercise', 'Meditation', 'Reading', 'Socializing', 'Work/Study',
    'Hobbies', 'Nature walk', 'Music', 'Cooking', 'Gaming', 'Therapy', 'Journaling'
  ];

  // Mock historical data
  const moodHistory = [
    { date: 'Mon', mood: 3, day: 'Monday' },
    { date: 'Tue', mood: 4, day: 'Tuesday' },
    { date: 'Wed', mood: 2, day: 'Wednesday' },
    { date: 'Thu', mood: 4, day: 'Thursday' },
    { date: 'Fri', mood: 3, day: 'Friday' },
    { date: 'Sat', mood: 4, day: 'Saturday' },
    { date: 'Sun', mood: 3, day: 'Sunday' }
  ];

  const handleActivityToggle = (activity) => {
    setActivities(prev => 
      prev.includes(activity) 
        ? prev.filter(a => a !== activity)
        : [...prev, activity]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedMood === null) return;
    
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setSelectedMood(null);
      setNotes('');
      setActivities([]);
    }, 3000);
  };

  const getMoodColor = (moodValue) => {
    const mood = moodOptions.find(m => m.value === moodValue);
    return mood ? mood.color : 'from-gray-400 to-gray-600';
  };

  const getMoodLabel = (moodValue) => {
    const mood = moodOptions.find(m => m.value === moodValue);
    return mood ? mood.label : 'Unknown';
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h2>
          <p className="text-gray-600 mb-4">
            Your mood check-in has been recorded. Taking time to reflect on your wellbeing is an important step.
          </p>
          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <p className="text-sm text-green-800">
              Keep up the great work! Consistent tracking helps identify patterns and progress.
            </p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Daily Mood Check-in</h1>
          <p className="text-gray-600">Track your mental wellness journey</p>
          <div className="flex items-center justify-center space-x-2 mt-2">
            <Calendar className="w-4 h-4 text-blue-500" />
            <span className="text-sm text-blue-600 font-medium">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </span>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Mood Tracking */}
          <div className="lg:col-span-2 space-y-6">
            {/* Mood Selection */}
            <Card>
              <Card.Header>
                <Card.Title>How are you feeling today?</Card.Title>
                <Card.Description>Select the emotion that best describes your overall mood</Card.Description>
              </Card.Header>
              <Card.Content>
                <div className="grid grid-cols-5 gap-4">
                  {moodOptions.map((mood) => (
                    <button
                      key={mood.value}
                      onClick={() => setSelectedMood(mood.value)}
                      className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                        selectedMood === mood.value
                          ? `border-blue-500 bg-gradient-to-br ${mood.color} text-white shadow-lg scale-105`
                          : 'border-gray-200 hover:border-gray-300 bg-white hover:shadow-md'
                      }`}
                    >
                      <div className="text-3xl mb-2">{mood.emoji}</div>
                      <div className={`text-sm font-medium ${
                        selectedMood === mood.value ? 'text-white' : 'text-gray-700'
                      }`}>
                        {mood.label}
                      </div>
                    </button>
                  ))}
                </div>
              </Card.Content>
            </Card>

            {/* Activities */}
            <Card>
              <Card.Header>
                <Card.Title>Today's Activities</Card.Title>
                <Card.Description>What did you do today? Select all that apply</Card.Description>
              </Card.Header>
              <Card.Content>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {dailyActivities.map((activity) => (
                    <button
                      key={activity}
                      onClick={() => handleActivityToggle(activity)}
                      className={`px-3 py-2 text-sm rounded-lg transition-all duration-200 ${
                        activities.includes(activity)
                          ? 'bg-blue-500 text-white shadow-md'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {activity}
                    </button>
                  ))}
                </div>
              </Card.Content>
            </Card>

            {/* Notes */}
            <Card>
              <Card.Header>
                <Card.Title>Reflection Notes</Card.Title>
                <Card.Description>Share any thoughts, feelings, or observations about your day</Card.Description>
              </Card.Header>
              <Card.Content>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="What's on your mind today? How did certain events make you feel? What are you grateful for?"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[100px] resize-none"
                />
              </Card.Content>
            </Card>

            <button
              onClick={handleSubmit}
              disabled={selectedMood === null}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-3 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <Save className="w-5 h-5" />
              <span>Submit Daily Check-in</span>
            </button>
          </div>

          {/* Sidebar - Weekly Overview */}
          <div className="space-y-6">
            <Card>
              <Card.Header>
                <Card.Title className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                  <span>This Week's Mood</span>
                </Card.Title>
                <Card.Description>Your mood trends over the past week</Card.Description>
              </Card.Header>
              <Card.Content>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={moodHistory}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
                      <XAxis 
                        dataKey="date" 
                        stroke="#6b7280"
                        fontSize={12}
                      />
                      <YAxis 
                        domain={[0, 4]}
                        ticks={[0, 1, 2, 3, 4]}
                        stroke="#6b7280"
                        fontSize={12}
                      />
                      <Tooltip 
                        formatter={(value) => [getMoodLabel(value), 'Mood']}
                        labelFormatter={(label) => {
                          const day = moodHistory.find(d => d.date === label);
                          return day ? day.day : label;
                        }}
                        contentStyle={{
                          backgroundColor: 'white',
                          border: '1px solid #e5e7eb',
                          borderRadius: '8px',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                        }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="mood" 
                        stroke="#3b82f6"
                        strokeWidth={3}
                        dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                        activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card.Content>
            </Card>

            <Card>
              <Card.Header>
                <Card.Title>Quick Stats</Card.Title>
              </Card.Header>
              <Card.Content>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Current Streak</span>
                    <span className="inline-flex items-center px-2 py-1 text-xs font-medium text-orange-800 bg-orange-100 rounded-full">
                      5 days
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">This Week's Average</span>
                    <span className="inline-flex items-center px-2 py-1 text-xs font-medium text-blue-800 bg-blue-100 rounded-full">
                      3.3 / 4.0
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Best Day</span>
                    <span className="inline-flex items-center px-2 py-1 text-xs font-medium text-green-800 bg-green-100 rounded-full">
                      Tuesday
                    </span>
                  </div>
                </div>
              </Card.Content>
            </Card>

            <Card>
              <Card.Header>
                <Card.Title>Wellness Tips</Card.Title>
              </Card.Header>
              <Card.Content>
                <div className="space-y-3 text-sm">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-blue-800">💙 Regular check-ins help you understand patterns in your mood and wellbeing.</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="text-green-800">🌱 Try to notice what activities and experiences boost your mood.</p>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <p className="text-purple-800">🔍 Look for trends - are there specific days or times that are consistently challenging?</p>
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

export default StudentMoodTracker;