/**
 * Mock heatmap zone data for Kifaru Analytics.
 */

import type { Zone } from '@/types/analytics.types';

const total = 48;
function pct(n: number): number {
  return Math.round((n / total) * 100);
}

export const attackZones: Zone[] = [
  { id: 'a1', name: 'Left 22', x: 80, y: 120, width: 120, height: 80, count: 8, percentage: pct(8) },
  { id: 'a2', name: 'Centre 22', x: 250, y: 120, width: 200, height: 80, count: 12, percentage: pct(12) },
  { id: 'a3', name: 'Right 22', x: 500, y: 120, width: 120, height: 80, count: 6, percentage: pct(6) },
  { id: 'a4', name: 'Left mid', x: 80, y: 200, width: 120, height: 100, count: 5, percentage: pct(5) },
  { id: 'a5', name: 'Centre mid', x: 250, y: 200, width: 200, height: 100, count: 4, percentage: pct(4) },
  { id: 'a6', name: 'Right mid', x: 500, y: 200, width: 120, height: 100, count: 7, percentage: pct(7) },
  { id: 'a7', name: 'Opp 22', x: 250, y: 280, width: 200, height: 60, count: 6, percentage: pct(6) },
];

export const defenceZones: Zone[] = [
  { id: 'd1', name: 'Our 22 left', x: 80, y: 280, width: 120, height: 80, count: 10, percentage: pct(10) },
  { id: 'd2', name: 'Our 22 centre', x: 250, y: 280, width: 200, height: 80, count: 14, percentage: pct(14) },
  { id: 'd3', name: 'Our 22 right', x: 500, y: 280, width: 120, height: 80, count: 9, percentage: pct(9) },
  { id: 'd4', name: 'Mid left', x: 80, y: 120, width: 120, height: 100, count: 3, percentage: pct(3) },
  { id: 'd5', name: 'Mid centre', x: 250, y: 120, width: 200, height: 100, count: 5, percentage: pct(5) },
  { id: 'd6', name: 'Mid right', x: 500, y: 120, width: 120, height: 100, count: 4, percentage: pct(4) },
  { id: 'd7', name: 'Wide', x: 0, y: 0, width: 700, height: 60, count: 3, percentage: pct(3) },
];
