/**
 * Role definitions and configuration for Kifaru Analytics.
 * Access hierarchy: admin > coach > player > fan.
 */

import type { Role } from '@/types/auth.types';

export const ROLES = {
  ADMIN: 'admin',
  COACH: 'coach',
  PLAYER: 'player',
  FAN: 'fan',
} as const satisfies Record<string, Role>;

export type RoleValue = (typeof ROLES)[keyof typeof ROLES];

/** Order for access comparison: higher index = more access. */
export const ROLE_ORDER: Role[] = ['fan', 'player', 'coach', 'admin'];

export const ROLE_CONFIG: Record<
  Role,
  { label: string; description: string; accessLevel: number }
> = {
  admin: {
    label: 'Administrator',
    description: 'Full access to squad, users, seasons, and all data.',
    accessLevel: 4,
  },
  coach: {
    label: 'Coach',
    description: 'Match analysis, player selection, and tactical heatmaps.',
    accessLevel: 3,
  },
  player: {
    label: 'Player',
    description: 'Your own stats, fitness, match ratings, and radar.',
    accessLevel: 2,
  },
  fan: {
    label: 'Fan',
    description: 'Live scores, fixtures, standings, and highlights.',
    accessLevel: 1,
  },
};
