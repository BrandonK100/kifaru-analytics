/**
 * Rugby position constants and groupings for Kifaru Analytics.
 */

import type { Position } from '@/types/player.types';

export const POSITIONS: Position[] = [
  'Loosehead Prop',
  'Hooker',
  'Tighthead Prop',
  'Lock',
  'Blindside Flanker',
  'Openside Flanker',
  'Number Eight',
  'Scrum Half',
  'Fly Half',
  'Inside Centre',
  'Outside Centre',
  'Left Wing',
  'Right Wing',
  'Fullback',
];

export const FORWARD_POSITIONS: Position[] = [
  'Loosehead Prop',
  'Hooker',
  'Tighthead Prop',
  'Lock',
  'Blindside Flanker',
  'Openside Flanker',
  'Number Eight',
];

export const BACK_POSITIONS: Position[] = [
  'Scrum Half',
  'Fly Half',
  'Inside Centre',
  'Outside Centre',
  'Left Wing',
  'Right Wing',
  'Fullback',
];

export function isForward(position: Position): boolean {
  return FORWARD_POSITIONS.includes(position);
}

export function isBack(position: Position): boolean {
  return BACK_POSITIONS.includes(position);
}
