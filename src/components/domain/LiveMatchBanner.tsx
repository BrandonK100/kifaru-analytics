/**
 * Live score strip at top of page. Uses useLiveMatch for ticker.
 */

import { useLiveMatch } from '@/hooks/useLiveMatch';
import Badge from '@/components/ui/Badge';
import Skeleton from '@/components/ui/Skeleton';

/**
 * Persistent strip: live match score + minute ticker. Empty when no live match.
 */
export default function LiveMatchBanner() {
  const { liveMatch, liveMinute, loading } = useLiveMatch();

  if (loading) {
    return (
      <div className="flex items-center justify-center gap-4 border-b border-border bg-muted/50 px-4 py-2">
        <Skeleton className="h-5 w-48" />
      </div>
    );
  }

  if (!liveMatch) return null;

  const homeScore = liveMatch.score.home;
  const awayScore = liveMatch.score.away;

  return (
    <div className="flex flex-wrap items-center justify-center gap-3 border-b border-border bg-accent/10 px-4 py-2 font-body text-sm">
      <Badge variant="LIVE" />
      <span className="font-mono text-faint">′{liveMinute}</span>
      <span className="sm:hidden text-text font-mono">
        {liveMatch.homeFlag} {homeScore} – {awayScore} {liveMatch.awayFlag}
      </span>
      <span className="hidden sm:inline text-text">
        {liveMatch.homeFlag} {liveMatch.homeTeam} {homeScore} – {awayScore}{' '}
        {liveMatch.awayTeam} {liveMatch.awayFlag}
      </span>
    </div>
  );
}
