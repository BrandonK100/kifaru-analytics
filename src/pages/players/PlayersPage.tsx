/**
 * Players page: filter tabs, sortable table, PlayerDetailPanel on row click.
 */

import { useState, useMemo } from 'react';
import { usePlayerStats } from '@/hooks/usePlayerStats';
import { FORWARD_POSITIONS, BACK_POSITIONS } from '@/constants/positions';
import type { Position } from '@/types/player.types';
import type { Player } from '@/types/player.types';
import Table from '@/components/ui/Table';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import Tag, { fitnessToTagVariant } from '@/components/ui/Tag';
import PlayerDetailPanel from '@/components/domain/PlayerDetailPanel';
import EmptyState from '@/components/ui/EmptyState';
import Skeleton from '@/components/ui/Skeleton';

type Filter = 'all' | 'forwards' | 'backs' | 'top';

/**
 * Tabs: All | Forwards | Backs | Top Performers. Table with detail panel on row click.
 */
export default function PlayersPage() {
  const { players, loading } = usePlayerStats();
  const [filter, setFilter] = useState<Filter>('all');
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [sortKey, setSortKey] = useState<keyof Player | string>('jerseyNumber');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  const filtered = useMemo(() => {
    let list = players;
    if (filter === 'forwards')
      list = list.filter((p) => FORWARD_POSITIONS.includes(p.position as Position));
    if (filter === 'backs')
      list = list.filter((p) => BACK_POSITIONS.includes(p.position as Position));
    if (filter === 'top') list = [...list].sort((a, b) => b.seasonStats.rating - a.seasonStats.rating).slice(0, 10);
    return list;
  }, [players, filter]);

  const getSortVal = (p: Player, k: string): unknown => {
    if (k === 'tries') return p.seasonStats.tries;
    if (k === 'tackles') return p.seasonStats.tackles;
    if (k === 'rating') return p.seasonStats.rating;
    return k in p ? (p as unknown as Record<string, unknown>)[k] : null;
  };

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      const ak = getSortVal(a, sortKey as string);
      const bk = getSortVal(b, sortKey as string);
      if (ak == null && bk == null) return 0;
      if (ak == null) return sortDir === 'asc' ? 1 : -1;
      if (bk == null) return sortDir === 'asc' ? -1 : 1;
      const cmp = typeof ak === 'number' && typeof bk === 'number'
        ? ak - bk
        : String(ak).localeCompare(String(bk));
      return sortDir === 'asc' ? cmp : -cmp;
    });
  }, [filtered, sortKey, sortDir]);

  const tabs: { id: Filter; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'forwards', label: 'Forwards' },
    { id: 'backs', label: 'Backs' },
    { id: 'top', label: 'Top Performers' },
  ];

  if (loading) {
    return (
      <div className="p-4 md:p-6">
        <Skeleton className="mb-4 h-10 w-64" />
        <Skeleton className="h-96 w-full rounded-lg" />
      </div>
    );
  }

  const isMobile = useMediaQuery('(max-width: 767px)');

  return (
    <div className="flex min-h-screen bg-bg">
      <div className="min-w-0 flex-1 p-4 md:p-6 lg:p-8">
        <h1 className="mb-4 font-display text-lg font-medium text-text">Squad</h1>
        <div className="mb-4 flex gap-2">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setFilter(t.id)}
              className={`rounded-md px-3 py-1.5 text-sm font-medium ${
                filter === t.id ? 'bg-kenya text-surface' : 'bg-muted text-sub hover:bg-border'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
        <Table<Player>
          columns={[
            { key: 'jerseyNumber', header: '#', sortable: true },
            { key: 'name', header: 'Name', sortable: true },
            { key: 'position', header: 'Position', sortable: true },
            {
              key: 'tries',
              header: 'Tries',
              sortable: true,
              render: (row) => row.seasonStats.tries,
            },
            {
              key: 'tackles',
              header: 'Tackles',
              sortable: true,
              render: (row) => row.seasonStats.tackles,
            },
            {
              key: 'rating',
              header: 'Rating',
              sortable: true,
              render: (row) => row.seasonStats.rating.toFixed(1),
            },
            {
              key: 'fitnessStatus',
              header: 'Status',
              render: (row) => (
                <Tag
                  label={row.fitnessStatus.charAt(0).toUpperCase() + row.fitnessStatus.slice(1)}
                  variant={fitnessToTagVariant(row.fitnessStatus)}
                />
              ),
            },
          ]}
          data={sorted}
          sortKey={sortKey}
          sortDirection={sortDir}
          onSort={(key, direction) => {
            setSortKey(key);
            setSortDir(direction);
          }}
          onRowClick={setSelectedPlayer}
          emptyState={{ title: 'No players', description: 'No squad data.' }}
        />
      </div>
      <div className="hidden w-96 flex-shrink-0 border-l border-border lg:block">
        {selectedPlayer ? (
          <PlayerDetailPanel player={selectedPlayer} onClose={() => setSelectedPlayer(null)} />
        ) : (
          <div className="p-6">
            <EmptyState title="Select a player to view their profile" description="Tap a row to see player details." />
          </div>
        )}
      </div>

      {/* Mobile bottom sheet for player detail */}
      {selectedPlayer && isMobile && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/30" onClick={() => setSelectedPlayer(null)} />
          <div className="absolute left-0 right-0 bottom-0 mx-auto w-full max-w-xl rounded-t-xl bg-surface border border-border p-4 shadow-xl" style={{ maxHeight: '80vh', overflow: 'auto' }}>
            <PlayerDetailPanel player={selectedPlayer} onClose={() => setSelectedPlayer(null)} />
          </div>
        </div>
      )}
    </div>
  );
}
