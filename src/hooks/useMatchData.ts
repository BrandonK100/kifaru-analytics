/**
 * Match data hook. Fixtures list and single match by id.
 */

import { useQuery } from '@tanstack/react-query';
import type { Match } from '@/types/match.types';
import { fetchFixtures, fetchMatchById } from '@/api/matches.api';

export function useFixtures() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['fixtures'],
    queryFn: fetchFixtures,
    staleTime: 30000,
  });
  return { fixtures: data ?? [], loading: isLoading, error: (error as Error | null) ?? null };
}

export function useMatch(id: string | undefined) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['match', id],
    queryFn: () => fetchMatchById(id ?? ''),
    enabled: Boolean(id),
    staleTime: 30000,
  });
  return {
    match: (data as Match | null) ?? null,
    loading: isLoading,
    error: (error as Error | null) ?? null,
  };
}
