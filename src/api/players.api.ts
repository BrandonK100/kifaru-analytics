/**
 * Players API. Mock squad and player by id.
 */

import type { Player } from '@/types/player.types';
import { players } from '@/mock';

export async function fetchPlayers(): Promise<Player[]> {
  await new Promise((r) => setTimeout(r, 250));
  return players;
}

export async function fetchPlayerById(id: string): Promise<Player | null> {
  await new Promise((r) => setTimeout(r, 250));
  return players.find((p) => p.id === id) ?? null;
}
