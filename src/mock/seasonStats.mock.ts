/**
 * Mock season-level trend data for Kifaru Analytics.
 * 9-match arrays for points, tries, possession, win rate.
 */

import type { Trend } from '@/types/analytics.types';

export const pointsPerMatch: Trend[] = [
  { matchLabel: 'R1', value: 28 },
  { matchLabel: 'R2', value: 17 },
  { matchLabel: 'R3', value: 19 },
  { matchLabel: 'R4', value: 45 },
  { matchLabel: 'R5', value: 27 },
  { matchLabel: 'R6', value: 24 },
  { matchLabel: 'R7', value: 21 },
  { matchLabel: 'R8', value: 38 },
  { matchLabel: 'R9', value: 18 },
];

export const triesPerMatch: Trend[] = [
  { matchLabel: 'R1', value: 4 },
  { matchLabel: 'R2', value: 2 },
  { matchLabel: 'R3', value: 2 },
  { matchLabel: 'R4', value: 6 },
  { matchLabel: 'R5', value: 3 },
  { matchLabel: 'R6', value: 3 },
  { matchLabel: 'R7', value: 3 },
  { matchLabel: 'R8', value: 5 },
  { matchLabel: 'R9', value: 2 },
];

export const possessionTrend: Trend[] = [
  { matchLabel: 'R1', value: 54 },
  { matchLabel: 'R2', value: 45 },
  { matchLabel: 'R3', value: 50 },
  { matchLabel: 'R4', value: 62 },
  { matchLabel: 'R5', value: 48 },
  { matchLabel: 'R6', value: 53 },
  { matchLabel: 'R7', value: 47 },
  { matchLabel: 'R8', value: 58 },
  { matchLabel: 'R9', value: 38 },
];

export const pointsScoredVsConceded: Trend[] = [
  { matchLabel: 'R1', value: 28, secondaryValue: 24 },
  { matchLabel: 'R2', value: 17, secondaryValue: 31 },
  { matchLabel: 'R3', value: 19, secondaryValue: 19 },
  { matchLabel: 'R4', value: 45, secondaryValue: 12 },
  { matchLabel: 'R5', value: 27, secondaryValue: 22 },
  { matchLabel: 'R6', value: 24, secondaryValue: 21 },
  { matchLabel: 'R7', value: 21, secondaryValue: 28 },
  { matchLabel: 'R8', value: 38, secondaryValue: 15 },
  { matchLabel: 'R9', value: 18, secondaryValue: 52 },
];

export const winRateCumulative: Trend[] = [
  { matchLabel: 'R1', value: 100 },
  { matchLabel: 'R2', value: 50 },
  { matchLabel: 'R3', value: 33 },
  { matchLabel: 'R4', value: 50 },
  { matchLabel: 'R5', value: 60 },
  { matchLabel: 'R6', value: 67 },
  { matchLabel: 'R7', value: 57 },
  { matchLabel: 'R8', value: 63 },
  { matchLabel: 'R9', value: 56 },
];
