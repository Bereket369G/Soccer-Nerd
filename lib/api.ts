import type { Match, MatchStats, TimelineEvent } from '../types';

const API_KEY = '123';
const BASE_URL = `https://www.thesportsdb.com/api/v1/json/${API_KEY}`;

// Helper to fetch and parse JSON
async function apiFetch(endpoint: string) {
    try {
        const response = await fetch(`${BASE_URL}/${endpoint}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Failed to fetch from endpoint: ${endpoint}`, error);
        return null; // Return null on network error or if parsing fails
    }
}

// Fetch all soccer matches scheduled for a specific day
export async function fetchMatchesByDate(date: string): Promise<Match[] | null> {
    const data = await apiFetch(`eventsday.php?d=${date}&s=Soccer`);
    return data?.events || null;
}

// Fetch statistics for a specific match/event ID
export async function fetchMatchStats(eventId: string): Promise<MatchStats | null> {
    const data = await apiFetch(`lookupeventstats.php?id=${eventId}`);
    // The API returns an array with one object, or an empty object if no stats
    return data?.eventstats?.[0] || null;
}

// Fetch the timeline for a specific match/event ID
export async function fetchMatchTimeline(eventId: string): Promise<TimelineEvent[] | null> {
    const data = await apiFetch(`lookuptimeline.php?id=${eventId}`);
    return data?.timeline || null;
}
