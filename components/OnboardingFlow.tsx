import React, { useState } from 'react';
import { getTeamLogo } from '../lib/logo-library';

interface OnboardingFlowProps {
  onComplete: (userData: UserOnboardingData) => void;
}

export interface UserOnboardingData {
  name: string;
  favoriteClubs: string[];
  howDidYouHear: string;
  notifications: boolean;
}

const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [userData, setUserData] = useState<UserOnboardingData>({
    name: '',
    favoriteClubs: [],
    howDidYouHear: '',
    notifications: true
  });

  const popularClubs = [
    'manchester united', 'manchester city', 'liverpool', 'arsenal', 'chelsea', 'tottenham',
    'real madrid', 'barcelona', 'atletico madrid', 'bayern munich', 'juventus', 'psg',
    'ac milan', 'inter milan', 'ajax', 'benfica', 'porto', 'napoli'
  ];

  const howDidYouHearOptions = [
    { id: 'friend', label: '👥 Friend or Family', desc: 'Someone recommended it' },
    { id: 'social', label: '📱 Social Media', desc: 'Instagram, Twitter, TikTok' },
    { id: 'search', label: '🔍 Google Search', desc: 'Found it while searching' },
    { id: 'store', label: '📱 App Store', desc: 'Discovered in app store' },
    { id: 'ad', label: '📺 Advertisement', desc: 'Saw an ad online' },
    { id: 'other', label: '🤔 Other', desc: 'Something else' }
  ];

  const steps = [
    {
      title: "Welcome to Soccer Nerds! ⚽",
      subtitle: "Let's get you set up",
      component: (
        <div className="space-y-6">
          <div className="text-center">
            <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-xl">
              <span className="text-6xl animate-bounce">⚽</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              What should we call you?
            </h2>
          </div>
          
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Enter your name"
              value={userData.name}
              onChange={(e) => setUserData(prev => ({...prev, name: e.target.value}))}
              className="w-full p-4 border-2 border-gray-200 rounded-xl text-lg focus:border-amber-500 focus:outline-none transition-colors"
              autoFocus
            />
            <p className="text-gray-500 text-sm text-center">
              We'll use this to personalize your experience
            </p>
          </div>
        </div>
      )
    },
    {
      title: "Choose Your Teams 🏆",
      subtitle: "Select your favorite clubs",
      component: (
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Which teams do you support?
            </h2>
            <p className="text-gray-600">Pick up to 6 favorite clubs</p>
          </div>
          
          <div className="grid grid-cols-3 gap-3 max-h-80 overflow-y-auto">
            {popularClubs.map(club => {
              const isSelected = userData.favoriteClubs.includes(club);
              return (
                <button
                  key={club}
                  onClick={() => {
                    setUserData(prev => ({
                      ...prev,
                      favoriteClubs: isSelected 
                        ? prev.favoriteClubs.filter(c => c !== club)
                        : prev.favoriteClubs.length < 6 
                          ? [...prev.favoriteClubs, club]
                          : prev.favoriteClubs
                    }));
                  }}
                  className={`relative p-3 rounded-xl border-2 transition-all duration-200 ${
                    isSelected 
                      ? 'border-amber-500 bg-amber-50 scale-95' 
                      : 'border-gray-200 bg-white hover:border-amber-300 hover:scale-105'
                  } ${userData.favoriteClubs.length >= 6 && !isSelected ? 'opacity-50' : ''}`}
                  disabled={userData.favoriteClubs.length >= 6 && !isSelected}
                >
                  <img 
                    src={getTeamLogo(club)} 
                    alt={club} 
                    className="w-12 h-12 mx-auto mb-1 object-contain"
                  />
                  <p className="text-xs font-medium text-gray-700 capitalize">
                    {club.replace(/ /g, '\n')}
                  </p>
                  {isSelected && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center">
                      <span className="material-icons text-white text-sm">check</span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
          
          <div className="text-center">
            <p className="text-sm text-gray-500">
              Selected: {userData.favoriteClubs.length}/6
            </p>
          </div>
        </div>
      )
    },
    {
      title: "How did you find us? 🤔",
      subtitle: "Help us understand our community",
      component: (
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              How did you hear about Soccer Nerds?
            </h2>
            <p className="text-gray-600">This helps us improve and reach more fans</p>
          </div>
          
          <div className="space-y-3">
            {howDidYouHearOptions.map(option => (
              <button
                key={option.id}
                onClick={() => setUserData(prev => ({...prev, howDidYouHear: option.id}))}
                className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                  userData.howDidYouHear === option.id
                    ? 'border-amber-500 bg-amber-50'
                    : 'border-gray-200 bg-white hover:border-amber-300'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{option.label.split(' ')[0]}</span>
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {option.label.substring(2)}
                    </h3>
                    <p className="text-sm text-gray-500">{option.desc}</p>
                  </div>
                  {userData.howDidYouHear === option.id && (
                    <div className="ml-auto w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center">
                      <span className="material-icons text-white text-sm">check</span>
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      )
    },
    {
      title: "You're All Set! 🎉",
      subtitle: "Ready to explore the world of football",
      component: (
        <div className="space-y-6">
          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-xl">
              <span className="text-4xl">🎉</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Welcome to the team, {userData.name}!
            </h2>
          </div>
          
          <div className="bg-gray-50 rounded-xl p-4 space-y-3">
            <h3 className="font-semibold text-gray-800">Your preferences:</h3>
            
            <div className="flex items-center space-x-2">
              <span className="material-icons text-amber-500">person</span>
              <span className="text-gray-700">Name: {userData.name}</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="material-icons text-amber-500">sports_soccer</span>
              <span className="text-gray-700">
                {userData.favoriteClubs.length} favorite clubs selected
              </span>
            </div>
            
            {userData.favoriteClubs.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {userData.favoriteClubs.slice(0, 3).map(club => (
                  <div key={club} className="flex items-center space-x-1 bg-white px-2 py-1 rounded-lg">
                    <img src={getTeamLogo(club)} alt={club} className="w-4 h-4" />
                    <span className="text-xs text-gray-600 capitalize">{club}</span>
                  </div>
                ))}
                {userData.favoriteClubs.length > 3 && (
                  <span className="text-xs text-gray-500">+{userData.favoriteClubs.length - 3} more</span>
                )}
              </div>
            )}
          </div>
          
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="material-icons text-amber-600">notifications</span>
                <span className="text-gray-700 font-medium">Match notifications</span>
              </div>
              <button
                onClick={() => setUserData(prev => ({...prev, notifications: !prev.notifications}))}
                className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-300 ${
                  userData.notifications ? 'bg-amber-500' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-300 ${
                    userData.notifications ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Get notified about your favorite teams' matches
            </p>
          </div>
        </div>
      )
    }
  ];

  const currentStepData = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;
  const canProceed = (
    (currentStep === 0 && userData.name.trim().length > 0) ||
    (currentStep === 1 && userData.favoriteClubs.length > 0) ||
    (currentStep === 2 && userData.howDidYouHear.length > 0) ||
    currentStep === 3
  );

  const handleNext = () => {
    if (isLastStep) {
      onComplete(userData);
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm p-4">
        <div className="flex items-center justify-between">
          <button 
            onClick={handleBack}
            className={`p-2 rounded-full transition-colors ${
              currentStep === 0 ? 'text-gray-300' : 'text-gray-600 hover:bg-gray-100'
            }`}
            disabled={currentStep === 0}
          >
            <span className="material-icons">arrow_back</span>
          </button>
          
          <div className="text-center">
            <h1 className="text-lg font-bold">
              Soccer<span className="text-amber-500">Nerds</span>
            </h1>
            <p className="text-xs text-gray-500">Step {currentStep + 1} of {steps.length}</p>
          </div>
          
          <div className="w-10"></div> {/* Spacer */}
        </div>
        
        {/* Progress Bar */}
        <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-amber-500 h-2 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          ></div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 p-6">
        <div className="max-w-md mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              {currentStepData.title}
            </h1>
            <p className="text-gray-600">{currentStepData.subtitle}</p>
          </div>
          
          {currentStepData.component}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t p-4">
        <div className="max-w-md mx-auto">
          <button
            onClick={handleNext}
            disabled={!canProceed}
            className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-200 ${
              canProceed
                ? 'bg-amber-500 text-white hover:bg-amber-600 active:scale-95'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {isLastStep ? '🚀 Get Started!' : 'Continue'}
          </button>
        </div>
      </footer>
    </div>
  );
};

export default OnboardingFlow;