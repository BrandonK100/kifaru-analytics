/**
 * Loading state skeleton blocks for Kifaru Analytics.
 */

export interface SkeletonProps {
  readonly className?: string;
}

/**
 * Pulse placeholder for async content. Use consistent height/width via className.
 */
export default function Skeleton({ className = '' }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse rounded bg-muted ${className}`.trim()}
      aria-hidden
    />
  );
}
