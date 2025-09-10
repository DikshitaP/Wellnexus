import React, { useState } from 'react';
import MentalHealthNavigation from './components/MentalHealthNavigation';
import LoginPage from './components/LoginPage';
import MentalHealthHomePage from './components/MentalHealthHomePage';
import ChatbotPage from './components/ChatbotPage';
import BookingPage from './components/BookingPage';
import MoodTrackerPage from './components/MoodTrackerPage';
import PeerForumPage from './components/PeerForumPage';
import ResourceHubPage from './components/ResourceHubPage';
import ProfilePage from './components/ProfilePage';

type Page = 'login' | 'home' | 'chatbot' | 'booking' | 'mood-tracker' | 'forum' | 'resources' | 'profile';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleNavigation = (page: string) => {
    if (page === 'home' && currentPage === 'login') {
      setIsLoggedIn(true);
    }
    setCurrentPage(page as Page);
  };

  const renderCurrentPage = () => {
    if (!isLoggedIn && currentPage !== 'login') {
      return <LoginPage onNavigate={handleNavigation} />;
    }

    switch (currentPage) {
      case 'login':
        return <LoginPage onNavigate={handleNavigation} />;
      case 'home':
        return <MentalHealthHomePage onNavigate={handleNavigation} />;
      case 'chatbot':
        return <ChatbotPage onNavigate={handleNavigation} />;
      case 'booking':
        return <BookingPage onNavigate={handleNavigation} />;
      case 'mood-tracker':
        return <MoodTrackerPage onNavigate={handleNavigation} />;
      case 'forum':
        return <PeerForumPage onNavigate={handleNavigation} />;
      case 'resources':
        return <ResourceHubPage onNavigate={handleNavigation} />;
      case 'profile':
        return <ProfilePage onNavigate={handleNavigation} />;
      default:
        return <MentalHealthHomePage onNavigate={handleNavigation} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {isLoggedIn && currentPage !== 'login' && (
        <MentalHealthNavigation currentPage={currentPage} onNavigate={handleNavigation} />
      )}
      <main>
        {renderCurrentPage()}
      </main>
    </div>
  );
}

export default App;