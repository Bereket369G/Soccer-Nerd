import React, { useState, useEffect } from 'react';
import type { Match, MatchStats, TimelineEvent, StatItemData } from '../types';
import { fetchMatchStats, fetchMatchTimeline } from '../lib/api';
import Footer from './Footer';

const transformStats = (stats: MatchStats | null): StatItemData[] => {
    if (!stats) return [];
    return [
        { label: 'Shots on Target', home: parseInt(stats.intHomeShots || '0'), away: parseInt(stats.intAwayShots || '0') },
        { label: 'Possession', home: parseInt(stats.intHomePossession || '0'), away: parseInt(stats.intAwayPossession || '0'), isPercentage: true },
        { label: 'Yellow Cards', home: parseInt(stats.intHomeYellowCards || '0'), away: parseInt(stats.intAwayYellowCards || '0') },
        { label: 'Red Cards', home: parseInt(stats.intHomeRedCards || '0'), away: parseInt(stats.intAwayRedCards || '0') },
        { label: 'Corner Kicks', home: parseInt(stats.intHomeCornerKicks || '0'), away: parseInt(stats.intAwayCornerKicks || '0') },
    ];
};

const StatItem: React.FC<{ stat: StatItemData }> = ({ stat }) => {
    const total = stat.home + stat.away;
    const homeWidth = total > 0 ? (stat.home / total) * 100 : stat.isPercentage ? stat.home : 50;
    const awayWidth = total > 0 ? (stat.away / total) * 100 : stat.isPercentage ? stat.away : 50;

    const homeBarClass = stat.home >= stat.away ? 'bg-amber-500' : 'bg-gray-800';
    const awayBarClass = stat.away > stat.home ? 'bg-amber-500' : 'bg-gray-800';
    
    return (
        <div>
            <div className="flex justify-between items-center text-sm font-medium mb-2">
                <span className={`font-bold ${stat.home >= stat.away ? 'text-amber-500' : 'text-gray-800'}`}>
                    {stat.isPercentage ? `${stat.home}%` : stat.home}
                </span>
                <span className="text-gray-600">{stat.label}</span>
                <span className={`font-bold ${stat.away > stat.home ? 'text-amber-500' : 'text-gray-800'}`}>
                    {stat.isPercentage ? `${stat.away}%` : stat.away}
                </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="flex h-2.5">
                    <div className={`${homeBarClass} h-2.5 rounded-l-full`} style={{ width: `${homeWidth}%` }}></div>
                    <div className={`${awayBarClass} h-2.5 rounded-r-full`} style={{ width: `${awayWidth}%` }}></div>
                </div>
            </div>
        </div>
    );
};


// FIX: Update component props to accept the onNavigate handler.
const MatchDetailsPage: React.FC<{ match: Match; onBack: () => void; onNavigate: (view: 'home' | 'profile') => void; }> = ({ match, onBack, onNavigate }) => {
    const [stats, setStats] = useState<MatchStats | null>(null);
    const [timeline, setTimeline] = useState<TimelineEvent[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadDetails = async () => {
            setLoading(true);
            try {
                const [statsData, timelineData] = await Promise.all([
                    fetchMatchStats(match.idEvent),
                    fetchMatchTimeline(match.idEvent)
                ]);
                setStats(statsData);
                setTimeline(timelineData || []);
            } catch (error) {
                console.error("Failed to load match details:", error);
            } finally {
                setLoading(false);
            }
        };
        loadDetails();
    }, [match.idEvent]);

    const renderedStats = transformStats(stats);
    const goals = timeline.filter(e => e.strTimelineDetail === 'Goal');

    return (
        <div className="container mx-auto max-w-sm bg-gray-50 min-h-screen">
            <header className="flex items-center justify-between p-4 bg-white sticky top-0 z-20">
                <button onClick={onBack} className="text-gray-500 p-2">
                    <span className="material-icons">arrow_back</span>
                </button>
                <div className="text-center">
                    <h1 className="text-xl font-semibold text-gray-800 truncate">{match.strLeague}</h1>
                    <p className="text-sm font-medium text-gray-500">Week {match.intRound}</p>
                </div>
                <button className="text-gray-500 p-2">
                    <span className="material-icons">more_vert</span>
                </button>
            </header>

            <main className="p-4 pb-24">
                {/* Scoreboard */}
                <div className="bg-black text-white rounded-3xl p-6 shadow-lg mb-6 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute top-0 left-0 w-full h-full opacity-10">
                        <img alt="abstract background lines" className="w-full h-full object-cover" src="https://firebasestorage.googleapis.com/v0/b/ai-prototyping-llc.appspot.com/o/generators%2F3155e714-424a-4b52-a544-bc9a5026c4f0%2F3b11e2f8-f2b7-4a11-807d-1c39c9055812.png?alt=media" />
                    </div>
                    <div className="relative z-10">
                        <div className="flex justify-between items-start mb-4">
                            <p className="text-sm font-medium">{match.strVenue}</p>
                            <span className="bg-amber-500 text-white text-xs font-medium px-2 py-1 rounded-md">{match.intHomeScore === null ? 'UPCOMING' : 'LIVE'}</span>
                        </div>
                        <div className="flex items-center justify-between mb-4">
                             <img alt={`${match.strHomeTeam} logo`} className="w-16 h-16 object-contain" src={match.strHomeTeamBadge} />
                            <div className="text-center">
                                <p className="text-6xl font-extrabold">{match.intHomeScore ?? 0} : {match.intAwayScore ?? 0}</p>
                                <p className="text-xs text-gray-400">{match.strStatus}</p>
                            </div>
                            <img alt={`${match.strAwayTeam} logo`} className="w-16 h-16 object-contain" src={match.strAwayTeamBadge} />
                        </div>
                        <div className="space-y-4 pt-4">
                             <div className="w-full bg-gray-700 rounded-full h-1.5 relative">
                                <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: '50%' }}></div>
                            </div>
                             <div className="flex justify-between relative text-xs h-10">
                                {goals.map(goal => (
                                    <div key={goal.idTimeline} className="absolute" style={{ left: `${parseInt(goal.strMinute)}%` }}>
                                         <div className="flex flex-col items-center">
                                            <span className="material-icons text-white text-base -mb-1">sports_soccer</span>
                                            <div className="w-px h-2 bg-white"></div>
                                            <span className="text-white whitespace-nowrap mt-1 text-center">{goal.strPlayer}<br/>{goal.strMinute}'</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex justify-center space-x-2 mb-6">
                    <button className="bg-amber-500 text-white font-medium py-2 px-6 rounded-lg shadow">Stats</button>
                    <button className="bg-white text-gray-500 font-medium py-2 px-6 rounded-lg">H2H</button>
                    <button className="bg-white text-gray-500 font-medium py-2 px-6 rounded-lg">Table</button>
                </div>

                {/* Stats */}
                <div className="space-y-6 bg-white p-6 rounded-2xl shadow-sm">
                    {loading ? (
                        <p className="text-center text-gray-500">Loading stats...</p>
                    ) : renderedStats.length > 0 ? (
                        renderedStats.map(stat => <StatItem key={stat.label} stat={stat} />)
                    ) : (
                        <p className="text-center text-gray-500">Statistics are not available for this match.</p>
                    )}
                </div>
            </main>
            
            {/* FIX: Pass the onNavigate prop to the Footer component to fix the missing prop error. */}
            <Footer activeView="stats" onNavigate={onNavigate} />
        </div>
    );
};

export default MatchDetailsPage;