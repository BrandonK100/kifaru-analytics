/**
 * Analytics domain types for Kifaru Analytics.
 * Trends, set piece, heatmaps, and zones.
 */

export interface Trend {
  matchLabel: string;
  value: number;
  secondaryValue?: number;
}

export interface SetPieceStat {
  label: string;
  won: number;
  total: number;
  percentage: number;
}

export interface Zone {
  id: string;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  count: number;
  percentage: number;
}

export interface HeatmapData {
  zones: Zone[];
  type: 'attack' | 'defence';
  matchId?: string;
  label?: string;
}

export interface MatchEvent {
  id: string;
  minute: number;
  type: 'try' | 'conversion' | 'penalty' | 'dropGoal' | 'yellowCard' | 'redCard' | 'substitution';
  team: 'home' | 'away';
  description: string;
  playerName?: string;
}
