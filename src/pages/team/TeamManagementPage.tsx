/**
 * Team management (Admin only). Squad size, available, injured, avg age; squad table with actions.
 */

import { usePlayerStats } from '@/hooks/usePlayerStats';
import StatCard from '@/components/ui/StatCard';
import Table from '@/components/ui/Table';
import Tag, { fitnessToTagVariant } from '@/components/ui/Tag';
import Button from '@/components/ui/Button';
import Skeleton from '@/components/ui/Skeleton';
import type { Player } from '@/types/player.types';

/**
 * 4 StatCards, squad table with status Tag and action buttons (Select / Report / Review).
 */
export default function TeamManagementPage() {
  const { players, loading } = usePlayerStats();

  const squadSize = players.length;
  const available = players.filter((p) => p.fitnessStatus === 'fit').length;
  const injured = players.filter((p) => p.fitnessStatus === 'injured').length;
  const avgAge =
    players.length > 0
      ? (players.reduce((a, p) => a + p.age, 0) / players.length).toFixed(1)
      : '—';

  const actionLabel = (p: Player): string => {
    if (p.fitnessStatus === 'injured') return 'Report';
    if (p.fitnessStatus === 'monitor') return 'Review';
    return 'Select';
  };

  if (loading) {
    return (
      <div className="p-4 md:p-6">
        <Skeleton className="mb-6 h-24 w-full" />
        <Skeleton className="h-96 w-full rounded-lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg">
      <div className="p-4 md:p-6 lg:p-8">
        <h1 className="mb-6 font-display text-lg font-medium text-text">Team management</h1>

        <section className="mb-8">
          <h2 className="mb-4 font-display text-sm font-medium text-text">Squad overview</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:grid-cols-4">
            <StatCard label="Squad size" value={squadSize} />
            <StatCard label="Available" value={available} />
            <StatCard label="Injured" value={injured} />
            <StatCard label="Avg age" value={avgAge} sub="years" />
          </div>
        </section>

        <section>
          <h2 className="mb-4 font-display text-sm font-medium text-text">Squad</h2>
          <Table<Player>
            columns={[
              { key: 'name', header: 'Player' },
              { key: 'position', header: 'Position' },
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
              {
                key: 'rating',
                header: 'Last rating',
                render: (row) => row.seasonStats.rating.toFixed(1),
              },
              {
                key: 'action',
                header: 'Action',
                render: (row) => (
                  <Button size="sm" variant="ghost">
                    {actionLabel(row)}
                  </Button>
                ),
              },
            ]}
            data={players}
            emptyState={{ title: 'No squad data' }}
          />
        </section>
      </div>
    </div>
  );
}
