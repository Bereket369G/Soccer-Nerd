import React from 'react';
import type { Match } from '../types';

interface LiveMatchProps {
    match: Match;
    onNavigate: (matchId: string) => void;
}

const LiveMatch: React.FC<LiveMatchProps> = ({ match, onNavigate }) => {
    return (
        <section>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Live Match</h2>
                <div className="flex items-center space-x-2 text-sm font-medium bg-white px-3 py-1.5 rounded-full shadow-sm">
                    <img alt={`${match.strLeague} logo`} className="h-5 w-5" src="https://logodownload.org/wp-content/uploads/2017/05/premier-league-logo-4.png" />
                    <span>{match.strLeague}</span>
                </div>
            </div>
            <div onClick={() => onNavigate(match.idEvent)} className="bg-gray-800 text-white rounded-2xl p-4 shadow-lg cursor-pointer transition-transform hover:scale-105">
                <div className="text-center mb-4">
                    <p className="text-sm font-medium text-gray-400">{match.strVenue}</p>
                    <p className="text-xs text-gray-400">Week {match.intRound}</p>
                </div>
                <div className="flex justify-between items-center">
                    <div className="text-center w-1/3">
                        <img alt={`${match.strHomeTeam} logo`} className="w-16 h-16 mx-auto mb-2 object-contain" src={match.strHomeTeamBadge} />
                        <p className="font-semibold truncate">{match.strHomeTeam}</p>
                        <p className="text-xs text-gray-400">Home</p>
                    </div>
                    <div className="text-center">
                        <p className="text-xs text-gray-400">{match.strStatus}</p>
                        <p className="text-5xl font-extrabold">{match.intHomeScore} : {match.intAwayScore}</p>
                    </div>
                    <div className="text-center w-1/3">
                        <img alt={`${match.strAwayTeam} logo`} className="w-16 h-16 mx-auto mb-2 object-contain" src={match.strAwayTeamBadge} />
                        <p className="font-semibold truncate">{match.strAwayTeam}</p>
                        <p className="text-xs text-gray-400">Away</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LiveMatch;