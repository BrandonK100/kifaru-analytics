/**
 * Application route constants. No magic strings in navigation or redirects.
 */

export const ROUTES = {
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  MATCHES: '/matches',
  MATCH: '/matches/:id',
  PLAYERS: '/players',
  PLAYER: '/players/:id',
  HEATMAP: '/heatmap',
  ANALYTICS: '/analytics',
  TEAM: '/team',
  REPORTS: '/reports',
} as const;

export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES];

/** Build a path with dynamic segment (e.g. match or player id). */
export function matchPath(id: string): string {
  return `/matches/${id}`;
}

export function playerPath(id: string): string {
  return `/players/${id}`;
}
