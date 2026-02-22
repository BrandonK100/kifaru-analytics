/**
 * D3 SVG rugby pitch with heat overlay. Zones as radial gradient blobs.
 */

import { useMemo } from 'react';
import type { Zone } from '@/types/analytics.types';
import Skeleton from '@/components/ui/Skeleton';
import EmptyState from '@/components/ui/EmptyState';

export interface PitchHeatmapProps {
  readonly zones: Zone[];
  readonly title?: string;
  readonly type?: 'attack' | 'defence';
  readonly width?: number;
  readonly height?: number;
  readonly loading?: boolean;
}

const PITCH_WIDTH = 700;
const PITCH_HEIGHT = 400;

/**
 * SVG pitch with try lines, 22m, halfway, in-goal. Heat by zone count.
 */
export default function PitchHeatmap({
  zones,
  title,
  type = 'attack',
  width = PITCH_WIDTH,
  height = PITCH_HEIGHT,
  loading = false,
}: PitchHeatmapProps) {
  const maxCount = useMemo(
    () => (zones.length ? Math.max(...zones.map((z) => z.count), 1) : 1),
    [zones]
  );

  if (loading) {
    return (
      <div className="rounded-lg border border-border bg-surface p-4">
        {title && (
          <h3 className="mb-2 font-display text-sm font-medium text-text">{title}</h3>
        )}
        <div style={{ minHeight: height }}>
          <Skeleton className="h-full w-full rounded-lg" />
        </div>
      </div>
    );
  }

  if (!zones || zones.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-surface p-4">
        {title && (
          <h3 className="mb-2 font-display text-sm font-medium text-text">{title}</h3>
        )}
        <div style={{ minHeight: height }}>
          <EmptyState title="No zone data" description="There is no zone data to display." />
        </div>
      </div>
    );
  }

  const fillColor = type === 'attack' ? '#2D6A4F' : '#B7410E';

  return (
    <div className="rounded-lg border border-border bg-surface p-4" style={{ minHeight: height }}>
      {title && (
        <h3 className="mb-2 font-display text-sm font-medium text-text">{title}</h3>
      )}
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full max-w-full"
        style={{ aspectRatio: `${width} / ${height}` }}
        aria-label={`${type} heatmap`}
      >
        <defs>
          <linearGradient id="pitch-grass" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2D6A4F" stopOpacity={0.15} />
            <stop offset="100%" stopColor="#2D6A4F" stopOpacity={0.05} />
          </linearGradient>
          {zones.map((z) => (
            <radialGradient key={z.id} id={`heat-${z.id}`}>
              <stop offset="0%" stopColor={fillColor} stopOpacity={0.4 * (z.count / maxCount)} />
              <stop offset="100%" stopColor={fillColor} stopOpacity={0} />
            </radialGradient>
          ))}
        </defs>
        <rect width={width} height={height} fill="url(#pitch-grass)" />
        <rect x={0} y={0} width={width} height={22} fill="#2D6A4F" fillOpacity={0.2} />
        <rect x={0} y={height - 22} width={width} height={22} fill="#2D6A4F" fillOpacity={0.2} />
        <line x1={width / 2} y1={0} x2={width / 2} y2={height} stroke="#2D6A4F" strokeWidth={2} />
        <line x1={0} y1={80} x2={width} y2={80} stroke="#2D6A4F" strokeWidth={1.5} />
        <line x1={0} y1={height - 80} x2={width} y2={height - 80} stroke="#2D6A4F" strokeWidth={1.5} />
        <circle cx={width / 2} cy={height / 2} r={60} fill="none" stroke="#2D6A4F" strokeWidth={2} />
        <circle cx={width / 2} cy={height / 2} r={2} fill="#2D6A4F" />
        {zones.map((z) => (
          <ellipse
            key={z.id}
            cx={z.x + z.width / 2}
            cy={z.y + z.height / 2}
            rx={z.width / 2 + 8}
            ry={z.height / 2 + 8}
            fill={`url(#heat-${z.id})`}
          />
        ))}
      </svg>
      <div className="mt-2 space-y-1">
        {zones.map((z) => (
          <div key={z.id} className="flex items-center justify-between text-xs text-sub">
            <span>{z.name}</span>
            <span className="font-mono">
              {z.count} ({z.percentage.toFixed(0)}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
