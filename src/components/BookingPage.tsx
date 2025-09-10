import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Calendar } from './ui/calendar';
import { Badge } from './ui/badge';
import { Calendar as CalendarIcon, Clock, Phone, Video, MessageSquare, CheckCircle } from 'lucide-react';

interface BookingPageProps {
  onNavigate: (page: string) => void;
}

const BookingPage: React.FC<BookingPageProps> = ({ onNavigate }) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedCounselor, setSelectedCounselor] = useState('');
  const [sessionType, setSessionType] = useState('');
  const [isBooked, setIsBooked] = useState(false);
  const [formData, setFormData] = useState({
    reason: '',
    urgency: '',
    notes: ''
  });

  const counselors = [
    {
      id: 'dr-smith',
      name: 'Dr. Sarah Smith',
      specialty: 'Anxiety & Depression',
      rating: 4.9,
      nextAvailable: 'Today'
    },
    {
      id: 'dr-johnson',
      name: 'Dr. Michael Johnson',
      specialty: 'Academic Stress',
      rating: 4.8,
      nextAvailable: 'Tomorrow'
    },
    {
      id: 'dr-williams',
      name: 'Dr. Emily Williams',
      specialty: 'Relationships & Social Issues',
      rating: 4.9,
      nextAvailable: 'Today'
    },
    {
      id: 'crisis-line',
      name: 'Crisis Support Line',
      specialty: 'Immediate Support',
      rating: 5.0,
      nextAvailable: 'Available 24/7'
    }
  ];

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
  ];

  const sessionTypes = [
    { id: 'video', label: 'Video Call', icon: Video, description: 'Face-to-face online session' },
    { id: 'phone', label: 'Phone Call', icon: Phone, description: 'Audio-only session' },
    { id: 'chat', label: 'Text Chat', icon: MessageSquare, description: 'Text-based session' }
  ];

  const handleBooking = () => {
    setIsBooked(true);
    setTimeout(() => {
      onNavigate('home');
    }, 3000);
  };

  if (isBooked) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="pt-6">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl text-gray-800 mb-2">Session Booked!</h2>
            <p className="text-gray-600 mb-4">
              Your appointment has been confirmed. You'll receive a confirmation email shortly.
            </p>
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
              <p className="text-sm text-green-800">
                <strong>Next Steps:</strong> Check your email for session details and preparation tips.
              </p>
            </div>
            <Button onClick={() => onNavigate('home')} className="w-full">
              Return to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl text-gray-800 mb-2">Book a Session</h1>
          <p className="text-gray-600">Schedule time with a mental health professional</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Calendar and Time Selection */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CalendarIcon className="w-5 h-5 text-blue-500" />
                  <span>Select Date & Time</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => date < new Date() || date < new Date("1900-01-01")}
                  className="rounded-md border"
                />
                
                {selectedDate && (
                  <div className="mt-4">
                    <Label className="flex items-center space-x-2 mb-3">
                      <Clock className="w-4 h-4 text-blue-500" />
                      <span>Available Times</span>
                    </Label>
                    <div className="grid grid-cols-3 gap-2">
                      {timeSlots.map((time) => (
                        <Button
                          key={time}
                          variant={selectedTime === time ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedTime(time)}
                          className="text-xs"
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Session Type Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Session Type</CardTitle>
                <CardDescription>Choose how you'd like to connect</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {sessionTypes.map((type) => {
                    const Icon = type.icon;
                    return (
                      <Button
                        key={type.id}
                        variant={sessionType === type.id ? "default" : "outline"}
                        onClick={() => setSessionType(type.id)}
                        className="w-full justify-start h-auto p-4"
                      >
                        <Icon className="w-5 h-5 mr-3" />
                        <div className="text-left">
                          <div>{type.label}</div>
                          <div className="text-xs opacity-70">{type.description}</div>
                        </div>
                      </Button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Counselor Selection and Booking Form */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Select Counselor</CardTitle>
                <CardDescription>Choose a mental health professional</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {counselors.map((counselor) => (
                    <Button
                      key={counselor.id}
                      variant={selectedCounselor === counselor.id ? "default" : "outline"}
                      onClick={() => setSelectedCounselor(counselor.id)}
                      className="w-full justify-start h-auto p-4"
                    >
                      <div className="text-left flex-1">
                        <div className="flex items-center justify-between">
                          <span>{counselor.name}</span>
                          <Badge variant="secondary">★ {counselor.rating}</Badge>
                        </div>
                        <div className="text-xs opacity-70 mt-1">{counselor.specialty}</div>
                        <div className="text-xs text-green-600 mt-1">{counselor.nextAvailable}</div>
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Booking Form */}
            <Card>
              <CardHeader>
                <CardTitle>Session Details</CardTitle>
                <CardDescription>Help us prepare for your session</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="reason">Primary reason for this session</Label>
                  <Select onValueChange={(value) => setFormData(prev => ({ ...prev, reason: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a reason" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="anxiety">Anxiety & Stress</SelectItem>
                      <SelectItem value="depression">Depression & Mood</SelectItem>
                      <SelectItem value="academic">Academic Pressure</SelectItem>
                      <SelectItem value="relationships">Relationship Issues</SelectItem>
                      <SelectItem value="sleep">Sleep Problems</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="urgency">How urgent is your need?</Label>
                  <Select onValueChange={(value) => setFormData(prev => ({ ...prev, urgency: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select urgency level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low - General support</SelectItem>
                      <SelectItem value="medium">Medium - Need guidance soon</SelectItem>
                      <SelectItem value="high">High - Struggling significantly</SelectItem>
                      <SelectItem value="crisis">Crisis - Need immediate help</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="notes">Additional notes (optional)</Label>
                  <Textarea
                    id="notes"
                    placeholder="Share anything else that might help your counselor prepare..."
                    value={formData.notes}
                    onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                    className="min-h-[80px]"
                  />
                </div>

                <Button
                  onClick={handleBooking}
                  disabled={!selectedDate || !selectedTime || !selectedCounselor || !sessionType}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                >
                  Confirm Booking
                </Button>

                <p className="text-xs text-gray-500 text-center">
                  Sessions are confidential and follow professional ethics guidelines
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;