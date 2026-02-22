/**
 * Analytics API. Season trends and insights from mock.
 */

import type { Trend } from '@/types/analytics.types';
import {
  pointsPerMatch,
  triesPerMatch,
  possessionTrend,
  pointsScoredVsConceded,
  winRateCumulative,
  insights,
  type Insight,
} from '@/mock';

export interface SeasonAnalytics {
  points: Trend[];
  tries: Trend[];
  possession: Trend[];
  pointsScoredVsConceded: Trend[];
  winRate: Trend[];
}

export async function fetchSeasonAnalytics(): Promise<SeasonAnalytics> {
  await new Promise((r) => setTimeout(r, 250));
  return {
    points: pointsPerMatch,
    tries: triesPerMatch,
    possession: possessionTrend,
    pointsScoredVsConceded,
    winRate: winRateCumulative,
  };
}

export async function fetchInsights(): Promise<Insight[]> {
  await new Promise((r) => setTimeout(r, 200));
  return insights;
}
