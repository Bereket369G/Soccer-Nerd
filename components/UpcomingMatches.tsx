import React from 'react';
import UpcomingMatchItem from './UpcomingMatchItem';
import type { Match } from '../types';

interface UpcomingMatchesProps {
    upcoming: Match[];
    finished: Match[];
    onNavigate: (matchId: string) => void;
}

const UpcomingMatches: React.FC<UpcomingMatchesProps> = ({ upcoming, finished, onNavigate }) => {
    const hasUpcoming = upcoming.length > 0;
    const hasFinished = finished.length > 0;

    if (!hasUpcoming && !hasFinished) {
        return (
            <div className="text-center py-8">
                <p className="text-gray-500">No matches found.</p>
                <p className="text-sm text-gray-400">Try adjusting your filters or selecting a different date.</p>
            </div>
        )
    }

    return (
        <>
            {hasUpcoming && (
                <section>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold">Up-Coming Matches</h2>
                    </div>
                    <div className="space-y-4">
                        {upcoming.map((match) => (
                            <UpcomingMatchItem key={match.idEvent} match={match} onNavigate={onNavigate} />
                        ))}
                    </div>
                </section>
            )}
            {hasFinished && (
                 <section>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold">Today's Results</h2>
                    </div>
                    <div className="space-y-4">
                        {finished.map((match) => (
                            <UpcomingMatchItem key={match.idEvent} match={match} onNavigate={onNavigate} />
                        ))}
                    </div>
                </section>
            )}
        </>
    );
};

export default UpcomingMatches;