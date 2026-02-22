/**
 * Single match deep-dive: score, player stats, heatmap, events timeline.
 */

import { useParams, Link } from 'react-router-dom';
import { useMatch } from '@/hooks/useMatchData';
import { ROUTES } from '@/constants/routes';
import { getMatchEvents } from '@/mock/matchEvents.mock';
import { attackZones } from '@/mock/heatmap.mock';
import Badge from '@/components/ui/Badge';
import PitchHeatmap from '@/components/charts/PitchHeatmap';
import Skeleton from '@/components/ui/Skeleton';
import { formatDate } from '@/utils/format';
import type { MatchEvent } from '@/types/analytics.types';
import EmptyState from '@/components/ui/EmptyState';

/**
 * Score header, player stat table placeholder, attack heatmap, events feed.
 */
export default function MatchDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { match, loading } = useMatch(id);
  const events = id ? getMatchEvents(id) : [];

  if (loading) {
    return (
      <div className="p-4 md:p-6">
        <Skeleton className="mb-6 h-24 w-full rounded-lg" />
        <Skeleton className="h-64 w-full rounded-lg" />
      </div>
    );
  }

  if (!match) {
    return (
      <div className="p-4 md:p-6">
        <p className="text-sub">Match not found.</p>
        <Link to={ROUTES.MATCHES} className="mt-2 inline-block text-kenya hover:underline">
          Back to matches
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg">
      <div className="border-b border-border bg-surface p-4 md:p-6">
        <Link to={ROUTES.MATCHES} className="mb-2 inline-block text-sm text-kenya hover:underline">
          ← Matches
        </Link>
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-2xl">{match.homeFlag}</span>
          <span className="font-display text-xl text-text">{match.homeTeam}</span>
          <span className="font-mono text-2xl text-text">
            {match.score.home} – {match.score.away}
          </span>
          <span className="font-display text-xl text-text">{match.awayTeam}</span>
          <span className="text-2xl">{match.awayFlag}</span>
          <Badge variant={match.result} />
        </div>
        <p className="mt-2 text-sm text-sub">
          {match.venue} · {formatDate(match.date)}
        </p>
        <p className="mt-1 text-xs text-faint">
          Tries: {match.score.homeTries}–{match.score.awayTries} · Conv: {match.score.homeConversions}–
          {match.score.awayConversions} · Pen: {match.score.homePenalties}–{match.score.awayPenalties}
        </p>
      </div>

      <div className="p-4 md:p-6 lg:p-8">
        <section className="mb-8">
          <h2 className="mb-4 font-display text-lg font-medium text-text">Player stats</h2>
          <div className="overflow-x-auto rounded-lg border border-border bg-surface">
            <table className="min-w-full divide-y divide-border font-body text-sm">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-sub">Stat</th>
                  <th className="px-4 py-3 text-left font-medium text-sub">Home</th>
                  <th className="px-4 py-3 text-left font-medium text-sub">Away</th>
                </tr>
              </thead>
              <tbody>
                {match.stats.map((s) => (
                  <tr key={s.label} className="border-t border-border">
                    <td className="px-4 py-2 text-sub">{s.label}</td>
                    <td className="px-4 py-2 font-mono text-text">{s.home}{s.unit ?? ''}</td>
                    <td className="px-4 py-2 font-mono text-text">{s.away}{s.unit ?? ''}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 font-display text-lg font-medium text-text">Attack zones</h2>
          <PitchHeatmap zones={attackZones} title="Attack heatmap" type="attack" />
        </section>

        <section>
          <h2 className="mb-4 font-display text-lg font-medium text-text">Key events</h2>
          {events.length === 0 ? (
            <EmptyState title="No events recorded" description="No key events were logged for this match." />
          ) : (
            <div className="space-y-2">
              {([...events].sort((a, b) => a.minute - b.minute) as MatchEvent[]).map((ev) => (
                <div
                  key={ev.id}
                  className="flex items-center gap-4 rounded-lg border border-border bg-surface px-4 py-2"
                >
                  <span className="font-mono text-sm text-sub">′{ev.minute}</span>
                  <span className="text-sm text-text">{ev.description}</span>
                  {ev.playerName && (
                    <span className="text-xs text-faint">{ev.playerName}</span>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
