/**
 * Match helpers used in tests and UI.
 */

export type MatchScore = { home: number; away: number };

export function getResult(match: { score?: MatchScore; result?: string } | null): string {
  if (!match) return 'D';
  if (match.result === 'LIVE') return 'LIVE';
  const h = match.score?.home ?? 0;
  const a = match.score?.away ?? 0;
  if (h > a) return 'W';
  if (h < a) return 'L';
  return 'D';
}

export function calcPossession(home: number, away: number): { home: number; away: number } {
  const total = Math.max(1, home + away);
  const rawHome = (home / total) * 100;
  const rawAway = (away / total) * 100;
  let h = Math.round(rawHome);
  let a = Math.round(rawAway);
  const diff = h + a - 100;
  if (diff !== 0) {
    // adjust the larger value to ensure sum == 100
    if (h >= a) h -= diff; else a -= diff;
  }
  return { home: h, away: a };
}
