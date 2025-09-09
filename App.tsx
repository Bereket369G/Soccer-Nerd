
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import LiveMatch from './components/LiveMatch';
import UpcomingMatches from './components/UpcomingMatches';
import Footer from './components/Footer';
import MatchDetailsPage from './components/MatchDetailsPage';
import ProfilePage from './components/ProfilePage';
import { fetchMatchesByDate } from './lib/api';
import type { Match } from './types';

// Helper to get today's date in YYYY-MM-DD format
const getTodaysDate = () => new Date().toISOString().split('T')[0];

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [matchStatus, setMatchStatus] = useState('all'); // 'all', 'live', 'upcoming', 'finished'
  const [selectedDate, setSelectedDate] = useState<string>(getTodaysDate());
  
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedMatchId, setSelectedMatchId] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState<'home' | 'profile'>('home');

  useEffect(() => {
    const loadMatches = async () => {
      if (!selectedDate) return;
      try {
        setLoading(true);
        setError(null);
        const fetchedMatches = await fetchMatchesByDate(selectedDate);
        setMatches(fetchedMatches || []);
      } catch (err)
      {
        setError('Failed to fetch matches. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadMatches();
  }, [selectedDate]); // Re-fetch whenever the date changes

  const handleNavigateToDetails = (matchId: string) => {
    setSelectedMatchId(matchId);
  };

  const handleNavigateHome = () => {
    setSelectedMatchId(null);
    setCurrentView('home');
  };
  
  // FIX: Add a navigation handler for the footer on the details page.
  // This ensures that when navigating from MatchDetailsPage, the view correctly updates
  // by clearing the selected match ID and setting the new view. This function
  // is passed down to MatchDetailsPage to be used by its Footer component.
  const handleFooterNavigation = (view: 'home' | 'profile') => {
    setSelectedMatchId(null);
    setCurrentView(view);
  };
  
  const selectedMatch = matches.find(m => m.idEvent === selectedMatchId);
  
  if (selectedMatch) {
    return <MatchDetailsPage match={selectedMatch} onBack={handleNavigateHome} onNavigate={handleFooterNavigation} />;
  }

  // --- Filtering Logic ---
  const isLive = (match: Match) => !['Match Finished', 'Not Started', 'Postponed', 'Cancelled', 'Abandoned'].includes(match.strStatus) && match.intHomeScore !== null;
  const isUpcoming = (match: Match) => match.strStatus === 'Not Started';
  const isFinished = (match: Match) => match.strStatus === 'Match Finished';

  const searchFilteredMatches = matches.filter(match =>
    searchQuery ?
    match.strHomeTeam.toLowerCase().includes(searchQuery.toLowerCase()) ||
    match.strAwayTeam.toLowerCase().includes(searchQuery.toLowerCase())
    : true
  );

  const liveMatches = searchFilteredMatches.filter(isLive);
  const upcomingMatches = searchFilteredMatches.filter(isUpcoming);
  const finishedMatches = searchFilteredMatches.filter(isFinished);

  const firstLiveMatch = liveMatches[0];

  const showLive = matchStatus === 'all' || matchStatus === 'live';
  const showUpcoming = matchStatus === 'all' || matchStatus === 'upcoming';
  const showFinished = matchStatus === 'all' || matchStatus === 'finished';

  const renderHomePage = () => (
    <>
      <Header 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery}
        matchStatus={matchStatus}
        setMatchStatus={setMatchStatus}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      <main className="p-4 space-y-6 pb-24">
        {loading ? (
           <div className="text-center py-10">
             <p className="text-gray-500">Loading matches for {selectedDate}...</p>
           </div>
        ) : error ? (
           <div className="text-center py-10 text-red-500">{error}</div>
        ) : (
          <>
            {showLive && firstLiveMatch && (
              <LiveMatch match={firstLiveMatch} onNavigate={handleNavigateToDetails} />
            )}
            
            <UpcomingMatches 
              upcoming={showUpcoming ? upcomingMatches : []}
              finished={showFinished ? finishedMatches : []}
              onNavigate={handleNavigateToDetails} 
            />
          </>
        )}
      </main>
    </>
  );

  return (
    <div className="container mx-auto max-w-sm bg-[#F8FAFC] min-h-screen">
      {currentView === 'home' ? renderHomePage() : <ProfilePage />}
      <Footer 
        activeView={selectedMatchId ? 'stats' : currentView} 
        onNavigate={setCurrentView} 
      />
    </div>
  );
};

export default App;