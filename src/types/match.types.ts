/**
 * Match domain types for Kifaru Analytics.
 * Fixtures, scores, and live match state.
 */

export type MatchResult = 'W' | 'L' | 'D' | 'LIVE' | 'UPCOMING';

export interface MatchScore {
  home: number;
  away: number;
  homeTries: number;
  awayTries: number;
  homeConversions: number;
  awayConversions: number;
  homePenalties: number;
  awayPenalties: number;
  homeDropGoals?: number;
  awayDropGoals?: number;
}

export interface MatchStatComparison {
  label: string;
  home: number;
  away: number;
  unit?: string;
}

export interface Match {
  id: string;
  homeTeam: string;
  homeFlag: string;
  awayTeam: string;
  awayFlag: string;
  venue: string;
  date: string;
  score: MatchScore;
  result: MatchResult;
  minute?: number;
  stats: MatchStatComparison[];
}
