/**
 * Live match hook. Fixtures query + matchStore ticker.
 */

import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchFixtures } from '@/api/matches.api';
import { useMatchStore } from '@/store/matchStore';
import type { Match } from '@/types/match.types';

export interface UseLiveMatchResult {
  liveMatch: Match | null;
  liveMinute: number;
  loading: boolean;
  error: Error | null;
}

export function useLiveMatch(): UseLiveMatchResult {
  const { data, isLoading, error } = useQuery({
    queryKey: ['fixtures'],
    queryFn: fetchFixtures,
    staleTime: 30000,
  });

  const { liveMatch, liveMinute, startLiveTicker, stopLiveTicker, setLiveMatch } = useMatchStore();

  useEffect(() => {
    if (!liveMatch && data) {
      const fromData = data.find((m) => m.result === 'LIVE') ?? null;
      if (fromData) {
        setLiveMatch(fromData);
      }
    }
  }, [data, liveMatch, setLiveMatch]);

  useEffect(() => {
    if (liveMatch) startLiveTicker();
    return () => stopLiveTicker();
  }, [liveMatch, startLiveTicker, stopLiveTicker]);

  return {
    liveMatch,
    liveMinute,
    loading: isLoading,
    error: (error as Error | null) ?? null,
  };
}
