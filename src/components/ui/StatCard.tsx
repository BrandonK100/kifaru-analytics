/**
 * Metric card (label, value, delta) for Dashboard and Team Management.
 */

import Skeleton from './Skeleton';

export interface StatCardProps {
  readonly label: string;
  readonly value: string | number;
  readonly sub?: string;
  readonly delta?: { direction: 'up' | 'down'; text: string };
  readonly loading?: boolean;
}

/**
 * Displays a single performance metric with optional delta indicator.
 */
export default function StatCard({
  label,
  value,
  sub,
  delta,
  loading = false,
}: StatCardProps) {
  if (loading) {
    return (
      <div className="rounded-lg border border-border bg-surface p-4">
        <Skeleton className="mb-2 h-4 w-24" />
        <Skeleton className="h-8 w-16" />
        {sub && <Skeleton className="mt-1 h-3 w-20" />}
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-border bg-surface p-4">
      <p className="text-sm font-medium text-sub">{label}</p>
      <p className="mt-1 font-display text-2xl text-text">{value}</p>
      {sub != null && sub !== '' && (
        <p className="mt-0.5 text-xs text-faint">{sub}</p>
      )}
      {delta && (
        <p
          className={`mt-1 text-xs font-medium ${delta.direction === 'up' ? 'text-kenya' : 'text-accent'}`}
        >
          {delta.direction === 'up' ? '↑' : '↓'} {delta.text}
        </p>
      )}
    </div>
  );
}
