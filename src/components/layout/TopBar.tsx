/**
 * Top bar: live match strip or page header. Optional title + children.
 */

import type { ReactNode } from 'react';
import LiveMatchBanner from '@/components/domain/LiveMatchBanner';
import { useUiStore } from '@/store/uiStore';

export interface TopBarProps {
  readonly title?: string;
  readonly children?: ReactNode;
  readonly showLiveBanner?: boolean;
}

/**
 * Top strip: optional LiveMatchBanner, then optional title and actions. Sidebar toggle on the left.
 */
export default function TopBar({
  title,
  children,
  showLiveBanner = true,
}: TopBarProps) {
  const toggleSidebar = useUiStore((s) => s.toggleSidebar);

  return (
    <header className="border-b border-border bg-surface md:sticky md:top-0 md:z-10">
      {showLiveBanner && <LiveMatchBanner />}
      <div className="flex items-center justify-between gap-4 px-4 py-2">
        <button
          type="button"
          onClick={toggleSidebar}
          className="md:hidden rounded p-2 w-10 h-10 flex items-center justify-center text-sub hover:bg-muted hover:text-text focus:outline-none focus:ring"
          aria-label="Toggle sidebar"
        >
          <span className="text-2xl leading-none">≡</span>
        </button>
        {(title || children) && (
          <>
            {title && (
              <h1 className="font-display text-lg font-medium text-text">{title}</h1>
            )}
            <div className="flex-1" />
            {children}
          </>
        )}
      </div>
    </header>
  );
}
