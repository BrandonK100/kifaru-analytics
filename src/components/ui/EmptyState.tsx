import type { EmptyStateProps } from '@/types/ui.types';

/**
 * Simple, consistent empty state used across tables and charts.
 */
export default function EmptyState({ title, description, icon = '◌' }: EmptyStateProps) {
  return (
    <div className="rounded-lg border border-border bg-surface p-6 text-center">
      <div className="text-faint font-mono text-4xl">{icon}</div>
      <p className="mt-3 font-body text-sub">{title}</p>
      {description && <p className="mt-1 text-sm font-body text-faint">{description}</p>}
    </div>
  );
}
