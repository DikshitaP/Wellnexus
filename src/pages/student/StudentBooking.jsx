import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Card from '../../components/shared/Card';
import Modal from '../../components/shared/Modal';
import { Calendar, Clock, User, CheckCircle, Phone, Video, MessageSquare } from 'lucide-react';

const StudentBooking = () => {
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedCounselor, setSelectedCounselor] = useState('');
  const [sessionType, setSessionType] = useState('');
  const [reason, setReason] = useState('');
  const [urgency, setUrgency] = useState('');
  const [notes, setNotes] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isBooked, setIsBooked] = useState(false);

  const counselors = [
    {
      id: 'dr-smith',
      name: 'Dr. Sarah Smith',
      specialty: 'Anxiety & Depression',
      rating: 4.9,
      nextAvailable: 'Today',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&crop=face'
    },
    {
      id: 'dr-johnson',
      name: 'Dr. Michael Johnson',
      specialty: 'Academic Stress',
      rating: 4.8,
      nextAvailable: 'Tomorrow',
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop&crop=face'
    },
    {
      id: 'dr-williams',
      name: 'Dr. Emily Williams',
      specialty: 'Relationships & Social Issues',
      rating: 4.9,
      nextAvailable: 'Today',
      image: 'https://images.unsplash.com/photo-1594824475562-2377130c4c42?w=100&h=100&fit=crop&crop=face'
    },
    {
      id: 'crisis-line',
      name: 'Crisis Support Line',
      specialty: 'Immediate Support',
      rating: 5.0,
      nextAvailable: 'Available 24/7',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=100&h=100&fit=crop&crop=face'
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

  const reasons = [
    'Anxiety & Stress',
    'Depression & Mood',
    'Academic Pressure',
    'Relationship Issues',
    'Sleep Problems',
    'Other'
  ];

  const urgencyLevels = [
    { value: 'low', label: 'Low - General support' },
    { value: 'medium', label: 'Medium - Need guidance soon' },
    { value: 'high', label: 'High - Struggling significantly' },
    { value: 'crisis', label: 'Crisis - Need immediate help' }
  ];

  const generateDateOptions = () => {
    const dates = [];
    for (let i = 0; i < 14; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      dates.push({
        value: date.toISOString().split('T')[0],
        label: date.toLocaleDateString('en-US', { 
          weekday: 'long', 
          month: 'short', 
          day: 'numeric' 
        })
      });
    }
    return dates;
  };

  const handleBooking = () => {
    setShowConfirmModal(true);
  };

  const confirmBooking = () => {
    setIsBooked(true);
    setShowConfirmModal(false);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsBooked(false);
      setSelectedDate('');
      setSelectedTime('');
      setSelectedCounselor('');
      setSessionType('');
      setReason('');
      setUrgency('');
      setNotes('');
    }, 3000);
  };

  const selectedCounselorData = counselors.find(c => c.id === selectedCounselor);
  const selectedSessionTypeData = sessionTypes.find(s => s.id === sessionType);

  if (isBooked) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Session Booked!</h2>
          <p className="text-gray-600 mb-4">
            Your appointment has been confirmed. You'll receive a confirmation email shortly.
          </p>
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
            <p className="text-sm text-green-800">
              <strong>Next Steps:</strong> Check your email for session details and preparation tips.
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Book a Session</h1>
          <p className="text-gray-600">Schedule time with a mental health professional</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Counselor and Session Type */}
          <div className="space-y-6">
            {/* Select Counselor */}
            <Card>
              <Card.Header>
                <Card.Title>Select Counselor</Card.Title>
                <Card.Description>Choose a mental health professional</Card.Description>
              </Card.Header>
              <Card.Content>
                <div className="space-y-3">
                  {counselors.map((counselor) => (
                    <div
                      key={counselor.id}
                      onClick={() => setSelectedCounselor(counselor.id)}
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${
                        selectedCounselor === counselor.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        <img
                          src={counselor.image}
                          alt={counselor.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-semibold text-gray-900">{counselor.name}</h4>
                            <span className="inline-flex items-center px-2 py-1 text-xs font-medium text-yellow-800 bg-yellow-100 rounded-full">
                              ★ {counselor.rating}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{counselor.specialty}</p>
                          <p className="text-xs text-green-600 mt-1">{counselor.nextAvailable}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card.Content>
            </Card>

            {/* Session Type */}
            <Card>
              <Card.Header>
                <Card.Title>Session Type</Card.Title>
                <Card.Description>Choose how you'd like to connect</Card.Description>
              </Card.Header>
              <Card.Content>
                <div className="space-y-3">
                  {sessionTypes.map((type) => {
                    const Icon = type.icon;
                    return (
                      <div
                        key={type.id}
                        onClick={() => setSessionType(type.id)}
                        className={`p-4 border rounded-lg cursor-pointer transition-all ${
                          sessionType === type.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <Icon className="w-5 h-5 text-gray-600" />
                          <div>
                            <h4 className="font-medium text-gray-900">{type.label}</h4>
                            <p className="text-sm text-gray-600">{type.description}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card.Content>
            </Card>
          </div>

          {/* Right Column - Date/Time and Details */}
          <div className="space-y-6">
            {/* Date & Time Selection */}
            <Card>
              <Card.Header>
                <Card.Title className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-blue-500" />
                  <span>Select Date & Time</span>
                </Card.Title>
              </Card.Header>
              <Card.Content>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                    <select
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select a date</option>
                      {generateDateOptions().map((date) => (
                        <option key={date.value} value={date.value}>
                          {date.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {selectedDate && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span>Available Times</span>
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {timeSlots.map((time) => (
                          <button
                            key={time}
                            onClick={() => setSelectedTime(time)}
                            className={`px-3 py-2 text-sm rounded-lg transition-all ${
                              selectedTime === time
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </Card.Content>
            </Card>

            {/* Session Details */}
            <Card>
              <Card.Header>
                <Card.Title>Session Details</Card.Title>
                <Card.Description>Help us prepare for your session</Card.Description>
              </Card.Header>
              <Card.Content className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Primary reason for this session
                  </label>
                  <select
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select a reason</option>
                    {reasons.map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    How urgent is your need?
                  </label>
                  <select
                    value={urgency}
                    onChange={(e) => setUrgency(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select urgency level</option>
                    {urgencyLevels.map((level) => (
                      <option key={level.value} value={level.value}>{level.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Additional notes (optional)
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Share anything else that might help your counselor prepare..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[80px]"
                  />
                </div>

                <button
                  onClick={handleBooking}
                  disabled={!selectedDate || !selectedTime || !selectedCounselor || !sessionType}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-3 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  Confirm Booking
                </button>

                <p className="text-xs text-gray-500 text-center">
                  Sessions are confidential and follow professional ethics guidelines
                </p>
              </Card.Content>
            </Card>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <Modal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        title="Confirm Your Booking"
      >
        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 mb-2">Booking Summary</h4>
            <div className="space-y-2 text-sm text-blue-800">
              <p><strong>Counselor:</strong> {selectedCounselorData?.name}</p>
              <p><strong>Date:</strong> {new Date(selectedDate).toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</p>
              <p><strong>Time:</strong> {selectedTime}</p>
              <p><strong>Session Type:</strong> {selectedSessionTypeData?.label}</p>
              {reason && <p><strong>Reason:</strong> {reason}</p>}
            </div>
          </div>
          
          <div className="flex space-x-3">
            <button
              onClick={confirmBooking}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Confirm Booking
            </button>
            <button
              onClick={() => setShowConfirmModal(false)}
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

export default StudentBooking;