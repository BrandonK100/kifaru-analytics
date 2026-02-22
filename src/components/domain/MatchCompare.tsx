/**
 * Side-by-side match stat comparison. Renders CompareBar for each stat.
 */

import type { MatchStatComparison } from '@/types/match.types';
import CompareBar from '@/components/charts/CompareBar';

export interface MatchCompareProps {
  readonly stats: MatchStatComparison[];
  readonly loading?: boolean;
}

/**
 * Vertical list of comparison bars for possession, territory, scrums, etc.
 */
export default function MatchCompare({ stats, loading = false }: MatchCompareProps) {
  if (loading) {
    return (
      <div className="space-y-4 rounded-lg border border-border bg-surface p-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-10 animate-pulse rounded bg-border" />
        ))}
      </div>
    );
  }

  if (!stats || stats.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-surface p-4 text-center text-sm text-faint">
        No stats available
      </div>
    );
  }

  return (
    <div className="space-y-4 rounded-lg border border-border bg-surface p-4">
      {stats.map((stat) => (
        <CompareBar key={stat.label} stat={stat} />
      ))}
    </div>
  );
}
