import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import ChatBubble from '../../components/shared/ChatBubble';
import { Send, Bot } from 'lucide-react';

const StudentChatbot = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([
    {
      id: '1',
      text: `Hello ${user?.firstName || 'there'}! I'm Alex, your AI wellness companion. I'm here to listen and support you. How are you feeling today?`,
      isUser: false,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const supportiveResponses = [
    "I hear you, and your feelings are completely valid. It takes courage to share how you're feeling.",
    "Thank you for trusting me with this. You're not alone in what you're experiencing.",
    "It sounds like you're going through a challenging time. What's one small thing that might help you feel a bit better today?",
    "Your wellbeing matters. Have you been able to take care of your basic needs today - eating, sleeping, staying hydrated?",
    "Sometimes just talking about what we're feeling can be really helpful. How does it feel to put these thoughts into words?",
    "I'm glad you reached out today. That shows real strength, even when things feel difficult.",
    "Would you like to explore some coping strategies that might help, or would you prefer to just talk through what's on your mind?",
    "Remember, healing isn't linear and it's okay to have ups and downs. What's been helping you get through tough moments recently?",
    "That sounds really tough. Can you tell me more about what's making you feel this way?",
    "It's okay to feel overwhelmed sometimes. Let's take this one step at a time. What feels most pressing for you right now?"
  ];

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      text: inputMessage,
      isUser: true,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response with delay
    setTimeout(() => {
      const randomResponse = supportiveResponses[Math.floor(Math.random() * supportiveResponses.length)];
      const aiMessage = {
        id: (Date.now() + 1).toString(),
        text: randomResponse,
        isUser: false,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 flex flex-col">
      <div className="max-w-4xl mx-auto w-full h-full flex flex-col">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 p-4 flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Alex - AI Wellness Companion</h2>
            <p className="text-sm text-green-600">Online • Always here for you</p>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <ChatBubble
              key={message.id}
              message={message.text}
              isUser={message.isUser}
              timestamp={message.timestamp}
            />
          ))}

          {isTyping && (
            <ChatBubble
              message=""
              isUser={false}
              isTyping={true}
            />
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="bg-white/80 backdrop-blur-sm border-t border-gray-200 p-4">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Share what's on your mind... I'm here to listen"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/70"
              disabled={isTyping}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isTyping}
              className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">
            This is a supportive AI. For emergencies, please contact local crisis services.
          </p>
        </div>
      </div>
    </div>
  );
};

export default StudentChatbot;