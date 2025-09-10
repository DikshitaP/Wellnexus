import React from 'react';
import { Heart, Phone, Mail, Shield } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white/80 backdrop-blur-md border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold text-gray-800">MindCare</span>
            </div>
            <p className="text-sm text-gray-600 max-w-xs">
              Your safe space for mental wellness. We're here to support your journey to better mental health.
            </p>
          </div>

          {/* Crisis Support */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
              <Shield className="w-5 h-5 text-red-500" />
              <span>Crisis Support</span>
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-red-500" />
                <span className="text-gray-700">
                  <strong>Crisis Hotline:</strong> <span className="text-red-600">988</span>
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-blue-500" />
                <span className="text-gray-700">
                  <strong>Crisis Text:</strong> <span className="text-blue-600">Text HOME to 741741</span>
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-green-500" />
                <span className="text-gray-700">
                  <strong>Campus Support:</strong> <span className="text-green-600">(555) 123-4567</span>
                </span>
              </div>
            </div>
          </div>

          {/* Contact & Support */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Support</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p>Available 24/7 for crisis support</p>
              <p>Monday-Friday 9AM-5PM for general inquiries</p>
              <p className="pt-2">
                <span className="font-medium">Email:</span> support@mindcare.edu
              </p>
              <p>
                <span className="font-medium">Phone:</span> (555) 123-CARE
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-500">
              © 2024 MindCare. Your privacy and wellbeing are our priority.
            </div>
            <div className="flex space-x-6 text-sm text-gray-500">
              <a href="#" className="hover:text-gray-700 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-gray-700 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-gray-700 transition-colors">Contact Us</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;