import React, { useEffect, useState } from 'react';

interface LoadingPageProps {
  onComplete: () => void;
}

const LoadingPage: React.FC<LoadingPageProps> = ({ onComplete }) => {
  const [currentText, setCurrentText] = useState(0);
  const [showLogo, setShowLogo] = useState(false);
  
  const loadingTexts = [
    "⚽ Welcome to Soccer Nerds",
    "🏆 Your Ultimate Football Hub", 
    "📊 Real-time Match Data",
    "🚀 Let's Get Started!"
  ];

  useEffect(() => {
    // Show logo after initial delay
    const logoTimer = setTimeout(() => setShowLogo(true), 500);
    
    // Cycle through text animations
    const textInterval = setInterval(() => {
      setCurrentText(prev => {
        if (prev < loadingTexts.length - 1) {
          return prev + 1;
        } else {
          // Complete loading after showing all texts
          setTimeout(onComplete, 1000);
          return prev;
        }
      });
    }, 1200);

    return () => {
      clearTimeout(logoTimer);
      clearInterval(textInterval);
    };
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-400 via-orange-500 to-red-500 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full animate-bounce" style={{animationDelay: '0s'}}></div>
        <div className="absolute top-32 right-16 w-24 h-24 bg-white/10 rounded-full animate-bounce" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute bottom-32 left-16 w-20 h-20 bg-white/10 rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-16 right-20 w-28 h-28 bg-white/10 rounded-full animate-bounce" style={{animationDelay: '1.5s'}}></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-8">
        {/* Logo Animation */}
        <div className={`transition-all duration-1000 transform ${
          showLogo ? 'scale-100 opacity-100 translate-y-0' : 'scale-50 opacity-0 translate-y-10'
        }`}>
          <div className="w-24 h-24 mx-auto mb-8 bg-white rounded-full flex items-center justify-center shadow-2xl">
            <span className="text-4xl animate-spin" style={{animationDuration: '2s'}}>⚽</span>
          </div>
          
          {/* App Title */}
          <h1 className="text-4xl font-bold text-white mb-2">
            Soccer<span className="text-yellow-300">Nerds</span>
          </h1>
          <p className="text-white/80 text-lg mb-12">Your Football Universe</p>
        </div>

        {/* Animated Text */}
        <div className="h-16 flex items-center justify-center">
          <p className={`text-2xl font-semibold text-white transition-all duration-500 transform ${
            currentText >= 0 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            {loadingTexts[currentText]}
          </p>
        </div>

        {/* Loading Bar */}
        <div className="w-64 h-2 bg-white/20 rounded-full mx-auto mt-8 overflow-hidden">
          <div className="h-full bg-white rounded-full transition-all duration-300 ease-out" 
               style={{width: `${((currentText + 1) / loadingTexts.length) * 100}%`}}>
          </div>
        </div>
        
        {/* Progress Percentage */}
        <p className="text-white/70 mt-4 text-sm font-medium">
          {Math.round(((currentText + 1) / loadingTexts.length) * 100)}%
        </p>
      </div>

      {/* Floating Soccer Balls */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 text-6xl opacity-20 animate-pulse" style={{animationDelay: '0s'}}>⚽</div>
        <div className="absolute top-3/4 right-1/4 text-4xl opacity-10 animate-pulse" style={{animationDelay: '1s'}}>🏆</div>
        <div className="absolute bottom-1/3 left-1/3 text-5xl opacity-15 animate-pulse" style={{animationDelay: '2s'}}>🥅</div>
      </div>
    </div>
  );
};

export default LoadingPage;