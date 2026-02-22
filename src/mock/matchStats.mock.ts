/**
 * Mock per-match stat comparisons for Kifaru Analytics.
 * One entry per fixture id (m1–m12).
 */

import type { MatchStatComparison } from '@/types/match.types';

function stat(label: string, home: number, away: number, unit?: string): MatchStatComparison {
  return { label, home, away, unit };
}

export const matchStats: Record<string, MatchStatComparison[]> = {
  m1: [
    stat('Possession (%)', 54, 46, '%'),
    stat('Territory (%)', 52, 48, '%'),
    stat('Scrums won', 8, 6, ''),
    stat('Lineouts won', 10, 9, ''),
    stat('Penalties conceded', 9, 11, ''),
    stat('Line breaks', 5, 4, ''),
  ],
  m2: [
    stat('Possession (%)', 45, 55, '%'),
    stat('Territory (%)', 42, 58, '%'),
    stat('Scrums won', 5, 9, ''),
    stat('Lineouts won', 7, 11, ''),
    stat('Penalties conceded', 12, 8, ''),
    stat('Line breaks', 3, 6, ''),
  ],
  m3: [
    stat('Possession (%)', 50, 50, '%'),
    stat('Territory (%)', 48, 52, '%'),
    stat('Scrums won', 7, 7, ''),
    stat('Lineouts won', 9, 9, ''),
    stat('Penalties conceded', 10, 10, ''),
    stat('Line breaks', 4, 4, ''),
  ],
  m4: [
    stat('Possession (%)', 62, 38, '%'),
    stat('Territory (%)', 65, 35, '%'),
    stat('Scrums won', 10, 4, ''),
    stat('Lineouts won', 12, 6, ''),
    stat('Penalties conceded', 6, 14, ''),
    stat('Line breaks', 9, 2, ''),
  ],
  m5: [
    stat('Possession (%)', 48, 52, '%'),
    stat('Territory (%)', 45, 55, '%'),
    stat('Scrums won', 6, 8, ''),
    stat('Lineouts won', 8, 10, ''),
    stat('Penalties conceded', 11, 9, ''),
    stat('Line breaks', 4, 5, ''),
  ],
  m6: [
    stat('Possession (%)', 53, 47, '%'),
    stat('Territory (%)', 51, 49, '%'),
    stat('Scrums won', 8, 6, ''),
    stat('Lineouts won', 10, 8, ''),
    stat('Penalties conceded', 8, 10, ''),
    stat('Line breaks', 5, 4, ''),
  ],
  m7: [
    stat('Possession (%)', 47, 53, '%'),
    stat('Territory (%)', 44, 56, '%'),
    stat('Scrums won', 6, 8, ''),
    stat('Lineouts won', 8, 10, ''),
    stat('Penalties conceded', 10, 8, ''),
    stat('Line breaks', 4, 6, ''),
  ],
  m8: [
    stat('Possession (%)', 51, 49, '%'),
    stat('Territory (%)', 50, 50, '%'),
    stat('Scrums won', 4, 3, ''),
    stat('Lineouts won', 5, 4, ''),
    stat('Penalties conceded', 5, 6, ''),
    stat('Line breaks', 2, 2, ''),
  ],
  m9: [
    stat('Possession (%)', 0, 0, '%'),
    stat('Territory (%)', 0, 0, '%'),
    stat('Scrums won', 0, 0, ''),
    stat('Lineouts won', 0, 0, ''),
    stat('Penalties conceded', 0, 0, ''),
    stat('Line breaks', 0, 0, ''),
  ],
  m10: [
    stat('Possession (%)', 0, 0, '%'),
    stat('Territory (%)', 0, 0, '%'),
    stat('Scrums won', 0, 0, ''),
    stat('Lineouts won', 0, 0, ''),
    stat('Penalties conceded', 0, 0, ''),
    stat('Line breaks', 0, 0, ''),
  ],
  m11: [
    stat('Possession (%)', 58, 42, '%'),
    stat('Territory (%)', 60, 40, '%'),
    stat('Scrums won', 9, 5, ''),
    stat('Lineouts won', 11, 7, ''),
    stat('Penalties conceded', 7, 12, ''),
    stat('Line breaks', 7, 3, ''),
  ],
  m12: [
    stat('Possession (%)', 38, 62, '%'),
    stat('Territory (%)', 35, 65, '%'),
    stat('Scrums won', 4, 12, ''),
    stat('Lineouts won', 5, 14, ''),
    stat('Penalties conceded', 15, 6, ''),
    stat('Line breaks', 2, 11, ''),
  ],
};
