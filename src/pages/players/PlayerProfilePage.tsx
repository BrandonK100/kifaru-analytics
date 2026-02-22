/**
 * Full player profile: hero, stats grid, radar, match ratings, match table.
 */

import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchPlayerById } from '@/api/players.api';
import { ROUTES } from '@/constants/routes';
import Tag, { fitnessToTagVariant } from '@/components/ui/Tag';
import RadarChart from '@/components/charts/RadarChart';
import LineChart from '@/components/charts/LineChart';
import Skeleton from '@/components/ui/Skeleton';
import type { ChartDataPoint } from '@/types/ui.types';

/**
 * Hero (name, position, number, fitness, rating), stats grid, radar, last 5 ratings line chart.
 */
export default function PlayerProfilePage() {
  const { id } = useParams<{ id: string }>();
  const { data: player, isLoading } = useQuery({
    queryKey: ['player', id],
    queryFn: () => fetchPlayerById(id ?? ''),
    enabled: Boolean(id),
  });

  if (isLoading) {
    return (
      <div className="p-4 md:p-6">
        <Skeleton className="mb-6 h-32 w-full rounded-lg" />
        <Skeleton className="h-64 w-full rounded-lg" />
      </div>
    );
  }

  if (!player) {
    return (
      <div className="p-4 md:p-6">
        <p className="text-sub">Player not found.</p>
        <Link to={ROUTES.PLAYERS} className="mt-2 inline-block text-kenya hover:underline">
          Back to squad
        </Link>
      </div>
    );
  }

  const s = player.seasonStats;
  const statusLabel = player.fitnessStatus.charAt(0).toUpperCase() + player.fitnessStatus.slice(1);
  const matchRatingsData: ChartDataPoint[] = [
    { name: 'M1', value: 7.2 },
    { name: 'M2', value: 6.8 },
    { name: 'M3', value: 7.5 },
    { name: 'M4', value: 8.1 },
    { name: 'M5', value: 7.9 },
  ];

  return (
    <div className="min-h-screen bg-bg">
      <div className="border-b border-border bg-surface p-4 md:p-6">
        <Link to={ROUTES.PLAYERS} className="mb-2 inline-block text-sm text-kenya hover:underline">
          ← Squad
        </Link>
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-mono text-3xl font-medium text-kenya">#{player.jerseyNumber}</span>
          <h1 className="font-display text-2xl text-text">{player.name}</h1>
          <Tag label={statusLabel} variant={fitnessToTagVariant(player.fitnessStatus)} />
        </div>
        <p className="mt-1 text-sub">{player.position}</p>
        <p className="mt-2 font-mono text-lg text-kenya">Rating: {s.rating.toFixed(1)}</p>
      </div>

      <div className="p-4 md:p-6 lg:p-8">
        <section className="mb-8">
          <h2 className="mb-4 font-display text-lg font-medium text-text">Season stats</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:grid-cols-4">
            <div className="rounded-lg border border-border bg-surface p-3">
              <p className="text-xs text-sub">Tries</p>
              <p className="font-mono text-xl text-text">{s.tries}</p>
            </div>
            <div className="rounded-lg border border-border bg-surface p-3">
              <p className="text-xs text-sub">Tackles</p>
              <p className="font-mono text-xl text-text">{s.tackles}</p>
            </div>
            <div className="rounded-lg border border-border bg-surface p-3">
              <p className="text-xs text-sub">Carries</p>
              <p className="font-mono text-xl text-text">{s.carries}</p>
            </div>
            <div className="rounded-lg border border-border bg-surface p-3">
              <p className="text-xs text-sub">Metres</p>
              <p className="font-mono text-xl text-text">{s.metresGained}</p>
            </div>
            <div className="rounded-lg border border-border bg-surface p-3">
              <p className="text-xs text-sub">Line breaks</p>
              <p className="font-mono text-xl text-text">{s.lineBreaks}</p>
            </div>
            <div className="rounded-lg border border-border bg-surface p-3">
              <p className="text-xs text-sub">Turnovers</p>
              <p className="font-mono text-xl text-text">{s.turnoversWon}</p>
            </div>
            <div className="rounded-lg border border-border bg-surface p-3">
              <p className="text-xs text-sub">Tackle %</p>
              <p className="font-mono text-xl text-text">{s.tackleSuccessRate}%</p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <RadarChart data={player.radarData} title="Performance radar" height={320} />
        </section>

        <section className="mb-8">
          <h2 className="mb-4 font-display text-lg font-medium text-text">Last 5 match ratings</h2>
          <LineChart data={matchRatingsData} title="" dataKeys={['value']} xKey="name" />
        </section>

        <section>
          <h2 className="mb-4 font-display text-lg font-medium text-text">Match-by-match</h2>
          <div className="rounded-lg border border-border bg-surface p-4 text-sm text-faint">
            Match-by-match breakdown table can be wired to real data when available.
          </div>
        </section>
      </div>
    </div>
  );
}
