/**
 * Season stats hook. Analytics and insights.
 */

import { useQuery } from '@tanstack/react-query';
import { fetchSeasonAnalytics, fetchInsights } from '@/api/analytics.api';
import type { SeasonAnalytics } from '@/api/analytics.api';
import type { Insight } from '@/mock';

export interface UseSeasonStatsResult {
  analytics: SeasonAnalytics | null;
  insights: Insight[];
  loading: boolean;
  error: Error | null;
}

export function useSeasonStats(): UseSeasonStatsResult {
  const a = useQuery({
    queryKey: ['season-analytics'],
    queryFn: fetchSeasonAnalytics,
    staleTime: 120000,
  });
  const i = useQuery({
    queryKey: ['insights'],
    queryFn: fetchInsights,
    staleTime: 120000,
  });
  return {
    analytics: (a.data as SeasonAnalytics | null) ?? null,
    insights: (i.data as Insight[] | undefined) ?? [],
    loading: a.isLoading || i.isLoading,
    error: (a.error as Error | null) ?? (i.error as Error | null) ?? null,
  };
}
