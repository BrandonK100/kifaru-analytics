/**
 * Radar chart for player stats. Recharts PolarGrid + theme tokens.
 */

import {
  RadarChart as RechartsRadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from 'recharts';
import type { RadarPoint } from '@/types/player.types';
import Skeleton from '@/components/ui/Skeleton';
import EmptyState from '@/components/ui/EmptyState';

export interface RadarChartProps {
  readonly data: RadarPoint[];
  readonly title?: string;
  readonly height?: number;
  readonly fillColor?: string;
  readonly loading?: boolean;
}

const DEFAULT_HEIGHT = 320;

/**
 * Radar chart for player attribute comparison. Empty data shows empty state.
 */
export default function RadarChart({
  data,
  title,
  height = DEFAULT_HEIGHT,
  fillColor = '#2D6A4F',
  loading = false,
}: RadarChartProps) {
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

  if (!data || data.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-surface p-4">
        {title && (
          <h3 className="mb-2 font-display text-sm font-medium text-text">{title}</h3>
        )}
        <div style={{ minHeight: height }}>
          <EmptyState title="No data" description="There is no data to display." />
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-border bg-surface p-4" style={{ minHeight: height }}>
      {title && (
        <h3 className="mb-2 font-display text-sm font-medium text-text">{title}</h3>
      )}
      <ResponsiveContainer width="100%" height={height}>
        <RechartsRadarChart data={data} cx="50%" cy="50%" outerRadius="70%">
          <PolarGrid stroke="#E8E6E1" />
          <PolarAngleAxis dataKey="stat" tick={{ fill: '#6B6860', fontSize: 11 }} />
          <PolarRadiusAxis angle={90} tick={{ fill: '#6B6860', fontSize: 10 }} />
          <Radar
            name="Score"
            dataKey="value"
            stroke={fillColor}
            fill={fillColor}
            fillOpacity={0.3}
            strokeWidth={2}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E8E6E1',
              borderRadius: '8px',
            }}
          />
          <Legend />
        </RechartsRadarChart>
      </ResponsiveContainer>
    </div>
  );
}
