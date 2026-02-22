/**
 * Two-sided stat comparison bar for match stats (home vs away).
 */

import type { MatchStatComparison } from '@/types/match.types';

export interface CompareBarProps {
  readonly stat: MatchStatComparison;
  readonly max?: number;
  readonly showValues?: boolean;
}

/**
 * Horizontal bar with left (home) and right (away) segments. Uses theme colors.
 */
export default function CompareBar({
  stat,
  showValues = true,
}: CompareBarProps) {
  const total = stat.home + stat.away || 1;
  const homePct = (stat.home / total) * 100;
  const awayPct = (stat.away / total) * 100;
  const unit = stat.unit ?? '';

  return (
    <div className="w-full">
      {/* desktop: values left/center/right; mobile: stacked values with bar in middle */}
      <div className="mb-1 hidden sm:flex justify-between text-xs text-sub">
        <span>{showValues ? `${stat.home}${unit}` : ''}</span>
        <span className="font-medium text-text">{stat.label}</span>
        <span>{showValues ? `${stat.away}${unit}` : ''}</span>
      </div>
      <div className="mb-1 sm:hidden text-center text-xs text-sub">
        {showValues ? `${stat.home}${unit}` : ''}
      </div>
      <div className="flex h-2 w-full overflow-hidden rounded-full bg-muted">
        <div
          className="bg-kenya transition-all"
          style={{ width: `${homePct}%` }}
          title={`${stat.home}${unit}`}
        />
        <div
          className="bg-accent transition-all"
          style={{ width: `${awayPct}%` }}
          title={`${stat.away}${unit}`}
        />
      </div>
      <div className="mt-1 sm:hidden text-center text-xs text-sub">{showValues ? `${stat.away}${unit}` : ''}</div>
    </div>
  );
}
