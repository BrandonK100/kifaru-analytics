/**
 * Player stats hook. Fetches and caches squad.
 */

import { useQuery } from '@tanstack/react-query';
import type { Player } from '@/types/player.types';
import { fetchPlayers } from '@/api/players.api';

export interface UsePlayerStatsResult {
  players: Player[];
  loading: boolean;
  error: Error | null;
}

export function usePlayerStats(): UsePlayerStatsResult {
  const { data, isLoading, error } = useQuery({
    queryKey: ['players'],
    queryFn: fetchPlayers,
    staleTime: 60000,
  });
  return {
    players: data ?? [],
    loading: isLoading,
    error: (error as Error | null) ?? null,
  };
}
