/**
 * Team and season domain types for Kifaru Analytics.
 */

export interface Team {
  id: string;
  name: string;
  code: string;
  flag?: string;
}

export interface Season {
  id: string;
  name: string;
  year: number;
  startDate: string;
  endDate: string;
}

export interface Record {
  played: number;
  won: number;
  drawn: number;
  lost: number;
  pointsFor: number;
  pointsAgainst: number;
}
