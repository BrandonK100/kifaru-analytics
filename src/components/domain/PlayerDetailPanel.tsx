/**
 * Slide-in player detail with full stats and radar. Used from PlayersPage.
 */

import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';
import type { Player } from '@/types/player.types';
import Skeleton from '@/components/ui/Skeleton';
import { playerPath } from '@/constants/routes';
import Tag, { fitnessToTagVariant } from '@/components/ui/Tag';
import RadarChart from '@/components/charts/RadarChart';

export interface PlayerDetailPanelProps {
  readonly player: Player | null;
  readonly onClose?: () => void;
  readonly children?: ReactNode;
  readonly loading?: boolean;
}

/**
 * Side panel: name, position, number, fitness, stat list, RadarChart.
 */
export default function PlayerDetailPanel({
  player,
  onClose,
  children,
  loading = false,
}: PlayerDetailPanelProps) {
  if (loading) {
    return (
      <div className="flex h-full flex-col border-l border-border bg-surface shadow-lg">
        <div className="flex items-center justify-between border-b border-border p-4">
          <div>
            <Skeleton className="mb-2 h-6 w-48" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            {[...Array(8)].map((_, i) => (
              <Skeleton key={i} className="h-6 w-full" />
            ))}
          </div>
          <div className="mt-6">
            <Skeleton className="h-64 w-full rounded-lg" />
          </div>
        </div>
      </div>
    );
  }

  if (!player) return null;

  const s = player.seasonStats;
  const statusLabel =
    player.fitnessStatus.charAt(0).toUpperCase() + player.fitnessStatus.slice(1);

  return (
    <div className="flex h-full flex-col border-l border-border bg-surface shadow-lg">
      <div className="flex items-center justify-between border-b border-border p-4">
        <div>
          <h2 className="font-display text-lg font-medium text-text">{player.name}</h2>
          <p className="text-sm text-sub">
            #{player.jerseyNumber} · {player.position}
          </p>
          <Tag
            label={statusLabel}
            variant={fitnessToTagVariant(player.fitnessStatus)}
            className="mt-2"
          />
        </div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="rounded p-1 text-sub hover:bg-muted hover:text-text"
            aria-label="Close panel"
          >
            ×
          </button>
        )}
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
          <dt className="text-sub">Tries</dt>
          <dd className="font-mono text-text">{s.tries}</dd>
          <dt className="text-sub">Tackles</dt>
          <dd className="font-mono text-text">{s.tackles}</dd>
          <dt className="text-sub">Tackle %</dt>
          <dd className="font-mono text-text">{s.tackleSuccessRate}%</dd>
          <dt className="text-sub">Carries</dt>
          <dd className="font-mono text-text">{s.carries}</dd>
          <dt className="text-sub">Metres</dt>
          <dd className="font-mono text-text">{s.metresGained}</dd>
          <dt className="text-sub">Line breaks</dt>
          <dd className="font-mono text-text">{s.lineBreaks}</dd>
          <dt className="text-sub">Turnovers</dt>
          <dd className="font-mono text-text">{s.turnoversWon}</dd>
          <dt className="text-sub">Rating</dt>
          <dd className="font-mono text-kenya">{s.rating.toFixed(1)}</dd>
        </dl>
        <div className="mt-6">
          <RadarChart data={player.radarData} title="Season radar" height={260} />
        </div>
        <Link
          to={playerPath(player.id)}
          className="mt-4 inline-block text-sm text-kenya hover:underline"
        >
          View full profile →
        </Link>
        {children}
      </div>
    </div>
  );
}
