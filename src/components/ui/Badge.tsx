/**
 * Status/result badges (W, L, D, LIVE, UPCOMING) for Kifaru Analytics.
 */

import type { BadgeVariant } from '@/types/ui.types';

export interface BadgeProps {
  readonly variant: BadgeVariant;
  readonly className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  W: 'bg-kenya text-surface',
  L: 'bg-accent text-surface',
  D: 'bg-muted text-sub border border-border',
  LIVE: 'bg-accent text-surface font-mono',
  UPCOMING: 'bg-muted text-sub border border-border',
};

/**
 * Compact result or status badge for match rows and summaries.
 */
export default function Badge({ variant, className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded px-2 py-0.5 text-xs font-medium font-mono ${variantClasses[variant]} ${className}`.trim()}
      aria-label={variant === 'LIVE' ? 'Live' : variant}
    >
      {variant}
    </span>
  );
}
