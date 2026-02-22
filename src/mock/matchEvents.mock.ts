/**
 * Mock match events (tries, cards, subs) per match for Kifaru Analytics.
 */

import type { MatchEvent } from '@/types/analytics.types';

export const matchEventsByMatchId: Record<string, MatchEvent[]> = {
  m1: [
    { id: 'e1', minute: 12, type: 'try', team: 'home', description: 'Try', playerName: 'Jacob Ojee' },
    { id: 'e2', minute: 14, type: 'conversion', team: 'home', description: 'Conversion' },
    { id: 'e3', minute: 28, type: 'try', team: 'away', description: 'Try' },
    { id: 'e4', minute: 45, type: 'penalty', team: 'away', description: 'Penalty goal' },
    { id: 'e5', minute: 52, type: 'try', team: 'home', description: 'Try', playerName: 'Collins Injera' },
    { id: 'e6', minute: 67, type: 'substitution', team: 'home', description: 'Replacement', playerName: 'Samuel Asati' },
  ],
  m2: [
    { id: 'e7', minute: 8, type: 'try', team: 'away', description: 'Try' },
    { id: 'e8', minute: 22, type: 'penalty', team: 'home', description: 'Penalty goal' },
    { id: 'e9', minute: 35, type: 'yellowCard', team: 'home', description: 'Yellow card' },
  ],
  m8: [
    { id: 'e10', minute: 18, type: 'try', team: 'home', description: 'Try', playerName: 'Tony Omondi' },
    { id: 'e11', minute: 41, type: 'penalty', team: 'away', description: 'Penalty goal' },
  ],
};

export function getMatchEvents(matchId: string): MatchEvent[] {
  return matchEventsByMatchId[matchId] ?? [];
}
