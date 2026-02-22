/**
 * Analytics page: set piece bar, player radar (Collins Injera), points vs conceded area, season summary.
 */

import { useState } from 'react';
import { useSeasonStats } from '@/hooks/useSeasonStats';
import { players } from '@/mock/players.mock';
import { setPieceStats } from '@/mock/setPiece.mock';
import BarChart from '@/components/charts/BarChart';
import LineChart from '@/components/charts/LineChart';
import EmptyState from '@/components/ui/EmptyState';
import RadarChart from '@/components/charts/RadarChart';
import Select from '@/components/ui/Select';
import type { ChartDataPoint } from '@/types/ui.types';

/**
 * Set piece bar, player radar with selector, dual-series area chart, season summary list.
 */
export default function AnalyticsPage() {
  const { analytics, loading } = useSeasonStats();
  const [selectedPlayerId, setSelectedPlayerId] = useState(players[11]?.id ?? 'p12'); // Collins Injera

  const selectedPlayer = players.find((p) => p.id === selectedPlayerId) ?? players[11];

  const setPieceChartData: ChartDataPoint[] = setPieceStats.map((s) => ({
    name: s.label,
    value: s.percentage,
  }));

  const pointsVsConcededData: ChartDataPoint[] = (analytics?.pointsScoredVsConceded ?? []).map(
    (t) => ({
      name: t.matchLabel,
      value: t.value,
      conceded: t.secondaryValue ?? 0,
    })
  );

  return (
    <div className="min-h-screen bg-bg">
      <div className="p-4 md:p-6 lg:p-8">
        <h1 className="mb-6 font-display text-lg font-medium text-text">Analytics</h1>

        <section className="mb-8 grid gap-6 lg:grid-cols-2">
          <BarChart
            data={setPieceChartData}
            title="Set piece success %"
            dataKey="value"
            xKey="name"
            barColor="#D4A96A"
            loading={loading}
          />
          <div>
            <div className="mb-2">
              <Select
                label="Player"
                options={players.map((p) => ({ value: p.id, label: p.name }))}
                value={selectedPlayerId}
                onChange={(e) => setSelectedPlayerId(e.target.value)}
                className="max-w-xs"
              />
            </div>
            <RadarChart
              data={selectedPlayer.radarData}
              title={`${selectedPlayer.name} — radar`}
              height={280}
            />
          </div>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 font-display text-lg font-medium text-text">
            Points scored vs conceded
          </h2>
          <LineChart
            data={pointsVsConcededData}
            title=""
            dataKeys={['value', 'conceded']}
            xKey="name"
            colors={['#2D6A4F', '#B7410E']}
            loading={loading}
          />
        </section>

        <section>
          <h2 className="mb-4 font-display text-lg font-medium text-text">Season summary</h2>
          {loading ? (
            <div className="h-48 animate-pulse rounded-lg bg-border" />
          ) : analytics && (analytics.possession?.length || analytics.winRate?.length) ? (
            <ul className="space-y-2">
              {analytics?.possession?.length && (
                <li className="flex items-center justify-between rounded-lg border border-border bg-surface px-4 py-2 text-sm">
                  <span className="text-sub">Avg possession</span>
                  <span className="font-mono text-text">
                    {Math.round(
                      analytics.possession.reduce((a, b) => a + b.value, 0) /
                        analytics.possession.length
                    )}
                    %
                  </span>
                </li>
              )}
              {analytics?.winRate?.length && (
                <li className="flex items-center justify-between rounded-lg border border-border bg-surface px-4 py-2 text-sm">
                  <span className="text-sub">Win rate (cumulative)</span>
                  <span className="font-mono text-text">
                    {analytics.winRate[analytics.winRate.length - 1]?.value ?? 0}%
                  </span>
                </li>
              )}
            </ul>
          ) : (
            <EmptyState title="No summary data" description="Season summary is not available." />
          )}
        </section>
      </div>
    </div>
  );
}
