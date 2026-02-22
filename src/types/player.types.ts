/**
 * Player domain types for Kifaru Analytics.
 * Squad, positions, stats, and radar data.
 */

export type Position =
  | 'Loosehead Prop'
  | 'Hooker'
  | 'Tighthead Prop'
  | 'Lock'
  | 'Blindside Flanker'
  | 'Openside Flanker'
  | 'Number Eight'
  | 'Scrum Half'
  | 'Fly Half'
  | 'Inside Centre'
  | 'Outside Centre'
  | 'Left Wing'
  | 'Right Wing'
  | 'Fullback';

export type FitnessStatus = 'fit' | 'injured' | 'monitor';

export interface PlayerStat {
  tries: number;
  tackles: number;
  tackleSuccessRate: number;
  carries: number;
  metresGained: number;
  lineBreaks: number;
  turnoversWon: number;
  rating: number;
}

export interface RadarPoint {
  stat: string;
  value: number;
}

export interface Player {
  id: string;
  jerseyNumber: string;
  name: string;
  position: Position;
  age: number;
  fitnessStatus: FitnessStatus;
  seasonStats: PlayerStat;
  radarData: RadarPoint[];
}
