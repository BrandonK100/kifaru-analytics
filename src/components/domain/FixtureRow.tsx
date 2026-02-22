/**
 * Single row in fixtures table. Score, venue, result badge.
 */

import { Link } from 'react-router-dom';
import type { Match } from '@/types/match.types';
import { matchPath } from '@/constants/routes';
import Badge from '@/components/ui/Badge';
import { formatScore, formatDate } from '@/utils/format';

export interface FixtureRowProps {
  readonly match: Match;
}

/**
 * Table row for one fixture. Opponent (flag + name), venue, date, score, result.
 */
export default function FixtureRow({ match }: FixtureRowProps) {
  const scoreText =
    match.result === 'UPCOMING' || match.result === 'LIVE'
      ? '–'
      : formatScore(match.score.home, match.score.away);

  return (
    <tr className="border-t border-border hover:bg-muted/50">
      <td className="px-4 py-3 text-sub">
        {match.homeFlag} {match.homeTeam} v {match.awayTeam} {match.awayFlag}
      </td>
      <td className="px-4 py-3 text-sub">{match.venue}</td>
      <td className="px-4 py-3 font-mono text-sub">{formatDate(match.date)}</td>
      <td className="px-4 py-3 font-mono text-text">{scoreText}</td>
      <td className="px-4 py-3">
        <Badge variant={match.result} />
      </td>
      <td className="px-4 py-3">
        <Link
          to={matchPath(match.id)}
          className="text-kenya hover:underline"
          aria-label={`View match ${match.homeTeam} v ${match.awayTeam}`}
        >
          View
        </Link>
      </td>
    </tr>
  );
}
