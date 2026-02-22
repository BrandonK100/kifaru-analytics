/**
 * Player summary card for grid view. Number, name, position, key stats, status.
 */

import type { Player } from '@/types/player.types';
import Tag, { fitnessToTagVariant } from '@/components/ui/Tag';

export interface PlayerCardProps {
  readonly player: Player;
  readonly onClick?: () => void;
}

/**
 * Compact card: jersey, name, position, rating, fitness tag.
 */
export default function PlayerCard({ player, onClick }: PlayerCardProps) {
  const statusLabel = player.fitnessStatus.charAt(0).toUpperCase() + player.fitnessStatus.slice(1);

  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full rounded-lg border border-border bg-surface p-4 text-left transition-colors hover:border-kenya/50 hover:bg-muted/30 focus:outline-none focus:ring-2 focus:ring-kenya/40"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="font-mono text-2xl font-medium text-kenya">#{player.jerseyNumber}</div>
        <Tag label={statusLabel} variant={fitnessToTagVariant(player.fitnessStatus)} />
      </div>
      <h3 className="mt-1 font-display font-medium text-text">{player.name}</h3>
      <p className="text-sm text-sub">{player.position}</p>
      <p className="mt-2 font-mono text-sm text-text">
        Rating: <span className="text-kenya">{player.seasonStats.rating.toFixed(1)}</span>
      </p>
    </button>
  );
}
