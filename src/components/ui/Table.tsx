/**
 * Reusable sortable table for Kifaru Analytics.
 * Generic over row type T with id. Mobile: horizontal scroll.
 */

import type { ReactNode } from 'react';
import Skeleton from './Skeleton';
import EmptyState from './EmptyState';
import type { EmptyStateProps } from '@/types/ui.types';

export interface TableColumn<T> {
  readonly key: keyof T | string;
  readonly header: string;
  readonly sortable?: boolean;
  readonly render?: (row: T) => ReactNode;
}

export interface TableProps<T extends { id: string | number }> {
  readonly columns: TableColumn<T>[];
  readonly data: T[];
  readonly loading?: boolean;
  readonly emptyState?: EmptyStateProps;
  readonly onSort?: (key: keyof T | string, direction: 'asc' | 'desc') => void;
  readonly sortKey?: keyof T | string | null;
  readonly sortDirection?: 'asc' | 'desc';
  readonly onRowClick?: (row: T) => void;
}

function getCellValue<T extends object>(row: T, key: keyof T | string): ReactNode {
  const v = key in row ? (row as unknown as Record<string, unknown>)[key as string] : null;
  if (v === null || v === undefined) return '—';
  if (typeof v === 'string' || typeof v === 'number') return String(v);
  return String(v);
}

/**
 * Table with optional sorting and empty/loading states.
 */
export default function Table<T extends { id: string | number }>({
  columns,
  data,
  loading = false,
  emptyState,
  onSort,
  sortKey = null,
  sortDirection = 'asc',
  onRowClick,
}: TableProps<T>) {
  if (loading) {
    return (
      <div className="overflow-x-auto rounded-lg border border-border bg-surface">
        <table className="min-w-full divide-y divide-border font-body text-sm">
          <thead>
            <tr>
              {columns.map((col) => (
                <th
                  key={String(col.key)}
                  className="px-4 py-3 text-left font-medium text-sub"
                >
                  <Skeleton className="h-4 w-20" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4, 5].map((i) => (
              <tr key={i} className="border-t border-border">
                {columns.map((col) => (
                  <td key={String(col.key)} className="px-4 py-3">
                    <Skeleton className="h-4 w-16" />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="overflow-x-auto rounded-lg border border-border bg-surface">
        <table className="min-w-full divide-y divide-border font-body text-sm">
          <thead>
            <tr>
              {columns.map((col) => (
                <th
                  key={String(col.key)}
                  className="px-4 py-3 text-left font-medium text-sub"
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={columns.length} className="px-4 py-6">
                <EmptyState
                  title={emptyState?.title ?? 'No data'}
                  description={emptyState?.description}
                  icon={emptyState?.icon}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-border bg-surface">
      <table className="min-w-full divide-y divide-border font-body text-sm">
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={String(col.key)}
                className="px-4 py-3 text-left font-medium text-sub"
              >
                {col.sortable && onSort ? (
                  <button
                    type="button"
                    className="flex items-center gap-1 hover:text-text"
                    onClick={() =>
                      onSort(
                        col.key,
                        sortKey === col.key && sortDirection === 'asc' ? 'desc' : 'asc'
                      )
                    }
                  >
                    {col.header}
                    {sortKey === col.key && (
                      <span className="text-faint">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </button>
                ) : (
                  col.header
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr
              key={row.id}
              className={`border-t border-border ${onRowClick ? 'cursor-pointer hover:bg-muted' : ''}`}
              onClick={onRowClick ? () => onRowClick(row) : undefined}
              role={onRowClick ? 'button' : undefined}
            >
              {columns.map((col) => (
                <td key={String(col.key)} className="px-4 py-3 text-text">
                  {col.render ? col.render(row) : getCellValue(row, col.key)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
