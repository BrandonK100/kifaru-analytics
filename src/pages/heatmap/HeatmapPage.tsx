/**
 * Heatmap page: Attack + Defence pitch heatmaps, zone legend, match selector, distance bar chart.
 */

import { useState } from 'react';
import { attackZones, defenceZones } from '@/mock/heatmap.mock';
import { players } from '@/mock/players.mock';
import PitchHeatmap from '@/components/charts/PitchHeatmap';
import BarChart from '@/components/charts/BarChart';
import Select from '@/components/ui/Select';
import type { ChartDataPoint } from '@/types/ui.types';

/**
 * Two PitchHeatmaps (attack, defence), dropdown for match/season, horizontal bar chart of player distance.
 */
export default function HeatmapPage() {
  const [context, setContext] = useState('season');

  const distanceData: ChartDataPoint[] = players
    .slice(0, 10)
    .map((p) => ({ name: p.name.split(' ').pop() ?? p.name, value: p.seasonStats.metresGained }))
    .sort((a, b) => (b.value as number) - (a.value as number));

  return (
    <div className="min-h-screen bg-bg">
      <div className="p-4 md:p-6 lg:p-8">
        <h1 className="mb-4 font-display text-lg font-medium text-text">Pitch heatmaps</h1>
        <div className="mb-6">
          <Select
            label="Context"
            options={[
              { value: 'season', label: 'Season average' },
              { value: 'match', label: 'Last match' },
            ]}
            value={context}
            onChange={(e) => setContext(e.target.value)}
            className="max-w-xs"
          />
        </div>

        <section className="mb-8 grid gap-6 lg:grid-cols-2">
          <PitchHeatmap zones={attackZones} title="Attack zones" type="attack" />
          <PitchHeatmap zones={defenceZones} title="Defensive zones" type="defence" />
        </section>

        <section>
          <h2 className="mb-4 font-display text-lg font-medium text-text">Distance covered (top 10)</h2>
          <BarChart data={distanceData} title="" dataKey="value" xKey="name" barColor="#A8C5A0" />
        </section>
      </div>
    </div>
  );
}
