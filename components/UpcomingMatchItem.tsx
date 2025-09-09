import React from 'react';
import type { Match } from '../types';

interface UpcomingMatchItemProps {
    match: Match;
    onNavigate: (matchId: string) => void;
}

const formatDisplayDate = (dateString: string): string => {
    if (!dateString) return '';
    const date = new Date(`${dateString}T00:00:00Z`);
    return date.toLocaleDateString('en-US', {
        timeZone: 'UTC',
        day: 'numeric',
        month: 'short',
    });
};

const formatDisplayTime = (timeString: string): string => {
    if (!timeString) return '';
    // API time can include seconds, so split and take first two parts
    const [hours, minutes] = timeString.split(':');
    return `${hours}:${minutes}`;
}

const UpcomingMatchItem: React.FC<UpcomingMatchItemProps> = ({ match, onNavigate }) => {
    const isFinished = match.strStatus === 'Match Finished';

    return (
        <div onClick={() => onNavigate(match.idEvent)} className="bg-white p-4 rounded-2xl shadow-sm cursor-pointer transition-transform hover:scale-105">
            <div className="flex items-center">
                <span className="material-icons text-gray-300 text-lg mr-2">star_border</span>
                <p className="font-semibold flex-1 truncate">{match.strHomeTeam}</p>
                <img alt={`${match.strHomeTeam} logo`} className="w-8 h-8 object-contain" src={`${match.strHomeTeamBadge}/tiny`} />
                <div className="text-center mx-4">
                    {isFinished ? (
                        <p className="font-bold text-lg">{match.intHomeScore} : {match.intAwayScore}</p>
                    ) : (
                        <p className="font-bold text-lg">{formatDisplayTime(match.strTime)}</p>
                    )}
                    <p className="text-xs text-gray-500">{formatDisplayDate(match.dateEvent)}</p>
                </div>
                <img alt={`${match.strAwayTeam} logo`} className="w-8 h-8 object-contain" src={`${match.strAwayTeamBadge}/tiny`} />
                <p className="font-semibold flex-1 text-right truncate">{match.strAwayTeam}</p>
            </div>
            <div className="flex justify-between mt-1 px-8">
                <p className="text-xs text-gray-400">Home</p>
                <p className="text-xs text-gray-400">Away</p>
            </div>
        </div>
    );
};

export default UpcomingMatchItem;