import React from 'react';
import { Bot, User } from 'lucide-react';

const ChatBubble = ({ message, isUser, timestamp, isTyping = false }) => {
  return (
    <div className={`flex items-start space-x-3 mb-4 ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
      {/* Avatar */}
      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
        isUser 
          ? 'bg-blue-500 text-white' 
          : 'bg-green-500 text-white'
      }`}>
        {isUser ? (
          <User className="w-4 h-4" />
        ) : (
          <Bot className="w-4 h-4" />
        )}
      </div>

      {/* Message bubble */}
      <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
        isUser 
          ? 'bg-blue-500 text-white rounded-br-md' 
          : 'bg-white text-gray-800 border border-gray-200 rounded-bl-md shadow-sm'
      }`}>
        {isTyping ? (
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        ) : (
          <>
            <p className="text-sm leading-relaxed">{message}</p>
            {timestamp && (
              <p className={`text-xs mt-2 ${
                isUser ? 'text-blue-100' : 'text-gray-500'
              }`}>
                {timestamp}
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ChatBubble;