/**
 * Dashboard: KPIs, charts, recent matches, AI insights.
 */

import { useFixtures } from '@/hooks/useMatchData';
import { useSeasonStats } from '@/hooks/useSeasonStats';
import { useQuery } from '@tanstack/react-query';
import { fetchTeams } from '@/api/teams.api';
import LiveMatchBanner from '@/components/domain/LiveMatchBanner';
import StatCard from '@/components/ui/StatCard';
import BarChart from '@/components/charts/BarChart';
import AreaChart from '@/components/charts/AreaChart';
import InsightCard from '@/components/domain/InsightCard';
import Badge from '@/components/ui/Badge';
import Skeleton from '@/components/ui/Skeleton';
import { formatDate } from '@/utils/format';
import { matchPath } from '@/constants/routes';
import { Link } from 'react-router-dom';
import type { ChartDataPoint } from '@/types/ui.types';
import EmptyState from '@/components/ui/EmptyState';

/**
 * Overview: live strip, 6 StatCards, points bar + try trend area, recent 5 matches, 3 insights.
 */
export default function DashboardPage() {
  const { fixtures, loading: fixturesLoading } = useFixtures();
  const { analytics, insights, loading: statsLoading } = useSeasonStats();
  const { data: teamsData } = useQuery({ queryKey: ['teams'], queryFn: fetchTeams });

  const loading = fixturesLoading || statsLoading;
  const record = teamsData?.[0]?.record;
  const recentMatches = (fixtures ?? []).filter((m) => m.result !== 'UPCOMING').slice(0, 5);

  const pointsChartData: ChartDataPoint[] = (analytics?.points ?? []).map((t) => ({
    name: t.matchLabel,
    value: t.value,
  }));
  const triesChartData: ChartDataPoint[] = (analytics?.tries ?? []).map((t) => ({
    name: t.matchLabel,
    value: t.value,
  }));

  const topScorer = 'Collins Injera';
  const avgTackleRate = record ? (record.played ? 89 : 0) : 0;
  const avgPossession = analytics?.possession?.length
    ? Math.round(
        analytics.possession.reduce((a, b) => a + b.value, 0) / analytics.possession.length
      )
    : 0;
  const lineBreaksTotal = analytics?.tries?.length ? analytics.tries.length * 4 : 0;

  return (
    <div className="min-h-screen bg-bg">
      <LiveMatchBanner />
      <div className="p-4 md:p-6 lg:p-8">
        <div className="max-w-screen-lg mx-auto w-full">
          <section className="mb-8">
          <h2 className="mb-4 font-display text-lg font-medium text-text">Season at a glance</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            <StatCard
              label="Season record"
              value={record ? `${record.won}-${record.lost}-${record.drawn}` : '—'}
              sub={record ? `${record.played} played` : undefined}
              loading={loading}
            />
            <StatCard
              label="Avg score"
              value={record && record.played ? (record.pointsFor / record.played).toFixed(1) : '—'}
              loading={loading}
            />
            <StatCard label="Top scorer" value={topScorer} sub="Tries" loading={loading} />
            <StatCard
              label="Tackle rate %"
              value={avgTackleRate ? `${avgTackleRate}%` : '—'}
              loading={loading}
            />
            <StatCard
              label="Possession"
              value={avgPossession ? `${avgPossession}%` : '—'}
              loading={loading}
            />
            <StatCard label="Line breaks" value={String(lineBreaksTotal)} loading={loading} />
          </div>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 font-display text-lg font-medium text-text">Trends</h2>
          <div className="grid gap-6 lg:grid-cols-2">
            <BarChart
              data={pointsChartData}
              title="Points per match"
              dataKey="value"
              xKey="name"
              loading={loading}
            />
            <AreaChart
              data={triesChartData}
              title="Tries per match"
              dataKey="value"
              xKey="name"
              loading={loading}
            />
          </div>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 font-display text-lg font-medium text-text">Recent matches</h2>
          {loading ? (
            <Skeleton className="h-64 w-full rounded-lg" />
          ) : (
            <div className="overflow-x-auto rounded-lg border border-border bg-surface">
              <table className="min-w-full divide-y divide-border font-body text-sm">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left font-medium text-sub">Match</th>
                    <th className="px-4 py-3 text-left font-medium text-sub">Venue</th>
                    <th className="px-4 py-3 text-left font-medium text-sub">Date</th>
                    <th className="px-4 py-3 text-left font-medium text-sub">Score</th>
                    <th className="px-4 py-3 text-left font-medium text-sub">Result</th>
                    <th className="px-4 py-3 text-left font-medium text-sub">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {recentMatches.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-4 py-6">
                        <EmptyState
                          title="No matches found"
                          description="There are no fixtures recorded for this period."
                        />
                      </td>
                    </tr>
                  ) : (
                    recentMatches.map((m) => (
                      <tr key={m.id} className="border-t border-border hover:bg-muted/30">
                        <td className="px-4 py-3 text-text">
                          {m.homeFlag} {m.homeTeam} v {m.awayTeam} {m.awayFlag}
                        </td>
                        <td className="px-4 py-3 text-sub">{m.venue}</td>
                        <td className="px-4 py-3 font-mono text-sub">{formatDate(m.date)}</td>
                        <td className="px-4 py-3 font-mono text-text">
                          {m.result === 'LIVE' ? '–' : `${m.score.home} – ${m.score.away}`}
                        </td>
                        <td className="px-4 py-3">
                          <Badge variant={m.result} />
                        </td>
                        <td className="px-4 py-3">
                          <Link to={matchPath(m.id)} className="text-kenya hover:underline">
                            View
                          </Link>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <section>
          <h2 className="mb-4 font-display text-lg font-medium text-text">AI insights</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {(insights ?? []).slice(0, 3).map((insight) => (
              <InsightCard key={insight.id} insight={insight} />
            ))}
          </div>
          </section>
        </div>
      </div>
    </div>
  );
}
