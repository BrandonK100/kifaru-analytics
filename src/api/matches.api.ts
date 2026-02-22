/**
 * Matches API. Returns mock fixtures and single match.
 */

import type { Match } from '@/types/match.types';
import { fixtures } from '@/mock';

export async function fetchFixtures(): Promise<Match[]> {
  await new Promise((r) => setTimeout(r, 250));
  return fixtures;
}

export async function fetchMatchById(id: string): Promise<Match | null> {
  await new Promise((r) => setTimeout(r, 250));
  return fixtures.find((m) => m.id === id) ?? null;
}
