/**
 * Inline label tag for statuses (Fit, Injured, Monitor) in Kifaru Analytics.
 */

import type { FitnessStatus } from '@/types/player.types';

export interface TagProps {
  readonly label: string;
  readonly variant: 'fit' | 'injured' | 'monitor' | 'neutral';
  readonly className?: string;
}

const variantClasses: Record<TagProps['variant'], string> = {
  fit: 'bg-kenya/15 text-kenya border-kenya/30',
  injured: 'bg-accent/15 text-accent border-accent/30',
  monitor: 'bg-sand/30 text-sub border-sand/50',
  neutral: 'bg-muted text-sub border-border',
};

/**
 * Small pill for fitness or category labels.
 */
export default function Tag({ label, variant, className = '' }: TagProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${variantClasses[variant]} ${className}`.trim()}
    >
      {label}
    </span>
  );
}

export function fitnessToTagVariant(status: FitnessStatus): TagProps['variant'] {
  if (status === 'fit') return 'fit';
  if (status === 'injured') return 'injured';
  return 'monitor';
}
