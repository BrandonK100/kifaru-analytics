/**
 * Line chart wrapper for Kifaru Analytics. Recharts with theme tokens.
 */

import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import type { ChartDataPoint } from '@/types/ui.types';
import Skeleton from '@/components/ui/Skeleton';
import EmptyState from '@/components/ui/EmptyState';

export interface LineChartProps {
  readonly data: ChartDataPoint[];
  readonly dataKeys?: string[];
  readonly xKey?: string;
  readonly title?: string;
  readonly height?: number;
  readonly colors?: string[];
  readonly loading?: boolean;
}

const DEFAULT_HEIGHT = 280;
const DEFAULT_COLORS = ['#2D6A4F', '#B7410E'];

/**
 * Line chart for series (e.g. match ratings). Empty data shows empty state.
 */
export default function LineChart({
  data,
  dataKeys = ['value'],
  xKey = 'name',
  title,
  height = DEFAULT_HEIGHT,
  colors = DEFAULT_COLORS,
  loading = false,
}: LineChartProps) {
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
        <RechartsLineChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E8E6E1" />
          <XAxis dataKey={xKey} tick={{ fill: '#6B6860', fontSize: 11 }} />
          <YAxis tick={{ fill: '#6B6860', fontSize: 11 }} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E8E6E1',
              borderRadius: '8px',
            }}
          />
          {dataKeys.map((key, i) => (
            <Line
              key={key}
              type="monotone"
              dataKey={key}
              stroke={colors[i % colors.length]}
              strokeWidth={2}
              dot={{ fill: colors[i % colors.length], r: 4 }}
            />
          ))}
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
}
