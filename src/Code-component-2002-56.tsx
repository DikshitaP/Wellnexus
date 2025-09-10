import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Student Components
import StudentLogin from './pages/student/StudentLogin';
import StudentDashboard from './pages/student/StudentDashboard';
import StudentChatbot from './pages/student/StudentChatbot';
import StudentBooking from './pages/student/StudentBooking';
import StudentMoodTracker from './pages/student/StudentMoodTracker';
import StudentForum from './pages/student/StudentForum';
import StudentResources from './pages/student/StudentResources';

// Admin Components
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminBookings from './pages/admin/AdminBookings';
import AdminForum from './pages/admin/AdminForum';
import AdminAnalytics from './pages/admin/AdminAnalytics';

// Shared Components
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function AppContent() {
  const { user, isAuthenticated } = useAuth();

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50">
        {isAuthenticated && <Navbar />}
        
        <main className="min-h-screen">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Navigate to="/student/login" replace />} />
            <Route path="/student/login" element={<StudentLogin />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            
            {/* Student Protected Routes */}
            <Route path="/student/dashboard" element={
              <ProtectedRoute allowedRoles={['student']}>
                <StudentDashboard />
              </ProtectedRoute>
            } />
            <Route path="/student/chatbot" element={
              <ProtectedRoute allowedRoles={['student']}>
                <StudentChatbot />
              </ProtectedRoute>
            } />
            <Route path="/student/booking" element={
              <ProtectedRoute allowedRoles={['student']}>
                <StudentBooking />
              </ProtectedRoute>
            } />
            <Route path="/student/mood-tracker" element={
              <ProtectedRoute allowedRoles={['student']}>
                <StudentMoodTracker />
              </ProtectedRoute>
            } />
            <Route path="/student/forum" element={
              <ProtectedRoute allowedRoles={['student']}>
                <StudentForum />
              </ProtectedRoute>
            } />
            <Route path="/student/resources" element={
              <ProtectedRoute allowedRoles={['student']}>
                <StudentResources />
              </ProtectedRoute>
            } />
            
            {/* Admin Protected Routes */}
            <Route path="/admin/dashboard" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/admin/bookings" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminBookings />
              </ProtectedRoute>
            } />
            <Route path="/admin/forum" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminForum />
              </ProtectedRoute>
            } />
            <Route path="/admin/analytics" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminAnalytics />
              </ProtectedRoute>
            } />
            
            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        
        {isAuthenticated && <Footer />}
      </div>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;