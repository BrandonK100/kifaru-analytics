/**
 * Matches page: live match card + full fixture table.
 */

import { useFixtures } from '@/hooks/useMatchData';
import { useMatchStore } from '@/store/matchStore';
import MatchCompare from '@/components/domain/MatchCompare';
import FixtureRow from '@/components/domain/FixtureRow';
import EmptyState from '@/components/ui/EmptyState';
import Badge from '@/components/ui/Badge';
import Skeleton from '@/components/ui/Skeleton';
import { matchPath } from '@/constants/routes';
import { Link } from 'react-router-dom';

/**
 * Top: live match deep-dive (score, breakdown, MatchCompare). Below: fixture table.
 */
export default function MatchesPage() {
  const { fixtures, loading } = useFixtures();
  const { liveMatch, liveMinute } = useMatchStore();

  return (
    <div className="min-h-screen bg-bg">
      {/* banner rendered by TopBar */}
      <div className="p-4 md:p-6 lg:p-8">
        {liveMatch && (
          <section className="mb-8">
            <h2 className="mb-4 font-display text-lg font-medium text-text">Live now</h2>
            <div className="rounded-lg border border-border bg-surface p-6">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{liveMatch.homeFlag}</span>
                  <span className="font-display text-xl text-text">{liveMatch.homeTeam}</span>
                  <span className="font-mono text-2xl text-text">
                    {liveMatch.score.home} – {liveMatch.score.away}
                  </span>
                  <span className="font-display text-xl text-text">{liveMatch.awayTeam}</span>
                  <span className="text-2xl">{liveMatch.awayFlag}</span>
                </div>
                <Badge variant="LIVE" />
                <span className="font-mono text-sub">′{liveMinute}</span>
              </div>
              <p className="mb-2 text-sm text-sub">
                Tries: {liveMatch.score.homeTries} – {liveMatch.score.awayTries} · Conversions:{' '}
                {liveMatch.score.homeConversions} – {liveMatch.score.awayConversions} · Penalties:{' '}
                {liveMatch.score.homePenalties} – {liveMatch.score.awayPenalties}
              </p>
              <MatchCompare stats={liveMatch.stats} />
              <Link
                to={matchPath(liveMatch.id)}
                className="mt-4 inline-block text-kenya hover:underline"
              >
                View full match →
              </Link>
            </div>
          </section>
        )}

        <section>
          <h2 className="mb-4 font-display text-lg font-medium text-text">All fixtures</h2>
          {loading ? (
            <Skeleton className="h-96 w-full rounded-lg" />
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
                      {(fixtures ?? []).length === 0 ? (
                        <tr>
                          <td colSpan={6} className="px-4 py-6">
                            <EmptyState
                              title="No fixtures"
                              description="There are no fixtures for this period."
                            />
                          </td>
                        </tr>
                      ) : (
                        (fixtures ?? []).map((m) => (
                          <FixtureRow key={m.id} match={m} />
                        ))
                      )}
                    </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
