import React from 'react';
import { Heart, Phone, Mail, MapPin, Shield } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl text-primary">MindCare</span>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              Your safe space for mental wellness and psychological support. 
              Available 24/7 for students who need care and guidance.
            </p>
          </div>

          {/* Crisis Resources */}
          <div className="space-y-4">
            <h4 className="flex items-center space-x-2 text-red-800">
              <Shield className="w-5 h-5" />
              <span>Crisis Support</span>
            </h4>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-red-700 mb-1">24/7 Crisis Text Line</p>
                <p className="text-red-600">Text HOME to 741741</p>
              </div>
              <div>
                <p className="text-red-700 mb-1">National Suicide Prevention</p>
                <p className="text-red-600">Call or Text 988</p>
              </div>
              <div>
                <p className="text-red-700 mb-1">Campus Emergency</p>
                <p className="text-red-600">Call (555) 123-4567</p>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h4 className="text-gray-800">Contact Us</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-blue-500" />
                <span className="text-gray-600">(555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-blue-500" />
                <span className="text-gray-600">support@mindcare.app</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-blue-500" />
                <span className="text-gray-600">Student Health Center, Campus</span>
              </div>
            </div>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h4 className="text-gray-800">Quick Resources</h4>
            <div className="space-y-2 text-sm">
              <a href="#" className="block text-blue-600 hover:text-blue-800">
                Mental Health First Aid
              </a>
              <a href="#" className="block text-blue-600 hover:text-blue-800">
                Campus Counseling Services
              </a>
              <a href="#" className="block text-blue-600 hover:text-blue-800">
                Wellness Workshops
              </a>
              <a href="#" className="block text-blue-600 hover:text-blue-800">
                Peer Support Groups
              </a>
              <a href="#" className="block text-blue-600 hover:text-blue-800">
                Self-Care Resources
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-600">
              © 2024 MindCare. All rights reserved. Your privacy and wellbeing are our priority.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-600 hover:text-gray-800">Privacy Policy</a>
              <a href="#" className="text-gray-600 hover:text-gray-800">Terms of Service</a>
              <a href="#" className="text-gray-600 hover:text-gray-800">Accessibility</a>
            </div>
          </div>
        </div>

        {/* Emergency Notice */}
        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-800 text-center">
            <strong>Emergency:</strong> If you are in immediate danger or having thoughts of self-harm, 
            please call 911 or go to your nearest emergency room immediately.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;