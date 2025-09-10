import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Slider } from '../../components/ui/slider';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Badge } from '../../components/ui/badge';
import { Calendar, TrendingUp, Heart, Coffee, Moon, Zap } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { studentAPI } from '../../services/api';

const StudentMoodTracker: React.FC = () => {
  const [selectedMood, setSelectedMood] = useState('');
  const [moodValues, setMoodValues] = useState({
    overall: [5],
    stress: [3],
    anxiety: [3],
    energy: [5],
    sleep: [5]
  });
  const [activities, setActivities] = useState<string[]>([]);
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [moodHistory, setMoodHistory] = useState<any[]>([]);

  const moodOptions = [
    { emoji: '😊', label: 'Happy', color: 'bg-green-100 text-green-800' },
    { emoji: '😌', label: 'Calm', color: 'bg-blue-100 text-blue-800' },
    { emoji: '😐', label: 'Neutral', color: 'bg-gray-100 text-gray-800' },
    { emoji: '😟', label: 'Worried', color: 'bg-yellow-100 text-yellow-800' },
    { emoji: '😢', label: 'Sad', color: 'bg-purple-100 text-purple-800' },
    { emoji: '😰', label: 'Anxious', color: 'bg-orange-100 text-orange-800' },
    { emoji: '😤', label: 'Frustrated', color: 'bg-red-100 text-red-800' },
    { emoji: '😴', label: 'Tired', color: 'bg-indigo-100 text-indigo-800' }
  ];

  const dailyActivities = [
    'Exercise', 'Meditation', 'Reading', 'Socializing', 'Work/Study',
    'Hobbies', 'Nature walk', 'Music', 'Cooking', 'Gaming', 'Therapy', 'Journaling'
  ];

  useEffect(() => {
    const fetchMoodHistory = async () => {
      try {
        const response = await studentAPI.getMoodHistory();
        setMoodHistory(response.data);
      } catch (error) {
        console.error('Error fetching mood history:', error);
      }
    };

    fetchMoodHistory();
  }, []);

  const handleActivityToggle = (activity: string) => {
    setActivities(prev => 
      prev.includes(activity) 
        ? prev.filter(a => a !== activity)
        : [...prev, activity]
    );
  };

  const handleSubmit = async () => {
    if (!selectedMood) return;

    setIsLoading(true);
    
    try {
      const moodData = {
        mood: selectedMood,
        overall: moodValues.overall[0],
        stress: moodValues.stress[0],
        anxiety: moodValues.anxiety[0],
        energy: moodValues.energy[0],
        sleep: moodValues.sleep[0],
        activities: activities,
        notes: notes
      };

      await studentAPI.saveMoodEntry(moodData);
      setIsSubmitted(true);
      
      // Refresh mood history
      const response = await studentAPI.getMoodHistory();
      setMoodHistory(response.data);
    } catch (error) {
      console.error('Error saving mood entry:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSliderChange = (key: string, value: number[]) => {
    setMoodValues(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const resetForm = () => {
    setSelectedMood('');
    setMoodValues({
      overall: [5],
      stress: [3],
      anxiety: [3],
      energy: [5],
      sleep: [5]
    });
    setActivities([]);
    setNotes('');
    setIsSubmitted(false);
  };

  // Prepare chart data
  const chartData = moodHistory.slice(-14).map(entry => ({
    date: new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    mood: entry.mood,
    stress: entry.stress,
    energy: entry.energy,
    sleep: entry.sleep
  }));

  const weeklyStats = {
    avgMood: moodHistory.length > 0 
      ? (moodHistory.slice(-7).reduce((sum, entry) => sum + entry.mood, 0) / Math.min(7, moodHistory.length)).toFixed(1)
      : '0.0',
    streak: 12, // Mock streak data
    totalEntries: moodHistory.length
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="pt-6">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl text-gray-800 mb-2">Thank You!</h2>
            <p className="text-gray-600 mb-4">
              Your mood check-in has been recorded. Taking time to reflect on your wellbeing is an important step.
            </p>
            <div className="space-y-2 mb-4">
              <Button onClick={resetForm} variant="outline" className="w-full">
                Add Another Entry
              </Button>
              <Button onClick={() => window.history.back()} className="w-full">
                Return to Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 py-8 px-4 pb-20 md:pb-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl text-gray-800 mb-2">Daily Mood Check-in</h1>
          <p className="text-gray-600">Track your mental wellness journey</p>
          <div className="flex items-center justify-center space-x-2 mt-2">
            <Calendar className="w-4 h-4 text-blue-500" />
            <span className="text-sm text-blue-600">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </span>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Mood Tracking */}
          <div className="lg:col-span-2 space-y-6">
            {/* Overall Mood Selection */}
            <Card>
              <CardHeader>
                <CardTitle>How are you feeling today?</CardTitle>
                <CardDescription>Select the emotion that best describes your overall mood</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-3">
                  {moodOptions.map((mood) => (
                    <Button
                      key={mood.label}
                      variant={selectedMood === mood.label ? "default" : "outline"}
                      onClick={() => setSelectedMood(mood.label)}
                      className="h-auto py-4 flex flex-col space-y-2"
                    >
                      <span className="text-2xl">{mood.emoji}</span>
                      <span className="text-xs">{mood.label}</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Detailed Mood Sliders */}
            <Card>
              <CardHeader>
                <CardTitle>Rate Your Day</CardTitle>
                <CardDescription>Use the sliders to rate different aspects of how you're feeling</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label className="flex items-center space-x-2">
                      <Heart className="w-4 h-4 text-pink-500" />
                      <span>Overall Wellbeing</span>
                    </Label>
                    <Badge variant="secondary">{moodValues.overall[0]}/10</Badge>
                  </div>
                  <Slider
                    value={moodValues.overall}
                    onValueChange={(value) => handleSliderChange('overall', value)}
                    max={10}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Poor</span>
                    <span>Excellent</span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label className="flex items-center space-x-2">
                      <Zap className="w-4 h-4 text-orange-500" />
                      <span>Stress Level</span>
                    </Label>
                    <Badge variant="secondary">{moodValues.stress[0]}/10</Badge>
                  </div>
                  <Slider
                    value={moodValues.stress}
                    onValueChange={(value) => handleSliderChange('stress', value)}
                    max={10}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Very relaxed</span>
                    <span>Very stressed</span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label className="flex items-center space-x-2">
                      <Coffee className="w-4 h-4 text-yellow-600" />
                      <span>Energy Level</span>
                    </Label>
                    <Badge variant="secondary">{moodValues.energy[0]}/10</Badge>
                  </div>
                  <Slider
                    value={moodValues.energy}
                    onValueChange={(value) => handleSliderChange('energy', value)}
                    max={10}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Exhausted</span>
                    <span>Energized</span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label className="flex items-center space-x-2">
                      <Moon className="w-4 h-4 text-blue-600" />
                      <span>Sleep Quality</span>
                    </Label>
                    <Badge variant="secondary">{moodValues.sleep[0]}/10</Badge>
                  </div>
                  <Slider
                    value={moodValues.sleep}
                    onValueChange={(value) => handleSliderChange('sleep', value)}
                    max={10}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Poor sleep</span>
                    <span>Great sleep</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Activities */}
            <Card>
              <CardHeader>
                <CardTitle>Today's Activities</CardTitle>
                <CardDescription>What did you do today? Select all that apply</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {dailyActivities.map((activity) => (
                    <Button
                      key={activity}
                      variant={activities.includes(activity) ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleActivityToggle(activity)}
                      className="text-sm"
                    >
                      {activity}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Notes */}
            <Card>
              <CardHeader>
                <CardTitle>Reflection Notes</CardTitle>
                <CardDescription>Share any thoughts, feelings, or observations about your day</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="What's on your mind today? How did certain events make you feel? What are you grateful for?"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="min-h-[100px]"
                />
              </CardContent>
            </Card>

            <Button
              onClick={handleSubmit}
              disabled={!selectedMood || isLoading}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            >
              {isLoading ? 'Saving...' : 'Submit Daily Check-in'}
            </Button>
          </div>

          {/* Sidebar - Stats and Charts */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                  <span>Your Progress</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl text-blue-600 mb-1">{weeklyStats.avgMood}</div>
                  <div className="text-sm text-gray-600">7-Day Average Mood</div>
                </div>
                
                <div className="grid grid-cols-2 gap-3 text-center">
                  <div>
                    <div className="text-xl text-green-600">{weeklyStats.streak}</div>
                    <div className="text-xs text-gray-500">Day Streak</div>
                  </div>
                  <div>
                    <div className="text-xl text-purple-600">{weeklyStats.totalEntries}</div>
                    <div className="text-xs text-gray-500">Total Entries</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Mood Trend Chart */}
            {chartData.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>14-Day Mood Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" fontSize={12} />
                      <YAxis domain={[1, 10]} fontSize={12} />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="mood" 
                        stroke="#6366f1" 
                        strokeWidth={2}
                        dot={{ fill: '#6366f1', strokeWidth: 2, r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            )}

            {/* Weekly Summary */}
            {chartData.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Weekly Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={150}>
                    <BarChart data={chartData.slice(-7)}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" fontSize={12} />
                      <YAxis domain={[1, 10]} fontSize={12} />
                      <Tooltip />
                      <Bar dataKey="mood" fill="#10b981" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle>Quick Tips</CardTitle>
              </CardHeader>
              <CardContent>
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
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentMoodTracker;