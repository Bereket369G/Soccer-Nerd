// Represents a single match/event from TheSportsDB API
export interface Match {
    idEvent: string;
    strEvent: string;
    strHomeTeam: string;
    strAwayTeam: string;
    intHomeScore: string | null;
    intAwayScore: string | null;
    strStatus: string;
    dateEvent: string;
    strTime: string;
    strVenue: string;
    intRound: string;
    strHomeTeamBadge: string;
    strAwayTeamBadge: string;
    strLeague: string;
}

// Represents the statistics for a match from TheSportsDB API
export interface MatchStats {
    [key: string]: string | null | undefined;
    intHomeShots: string | null;
    intAwayShots: string | null;
    intHomePossession: string | null;
    intAwayPossession: string | null;
    intHomeYellowCards: string | null;
    intAwayYellowCards: string | null;
    intHomeRedCards: string | null;
    intAwayRedCards: string | null;
    intHomeCornerKicks: string | null;
    intAwayCornerKicks: string | null;
}

// Represents a single timeline event for a match from TheSportsDB API
export interface TimelineEvent {
    idTimeline: string;
    idEvent: string;
    strTimeline: string;
    strTimelineDetail: 'Goal' | 'Yellow Card' | 'Red Card' | 'Substitution' | string; // Making it extensible
    strTeam: 'Home' | 'Away';
    strPlayer: string;
    strMinute: string;
}

// UI-specific type for rendering stats in the details page
export interface StatItemData {
    label: string;
    home: number;
    away: number;
    isPercentage?: boolean;
}