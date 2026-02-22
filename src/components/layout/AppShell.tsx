/**
 * Root layout: sidebar + main. Uses uiStore for sidebar toggle.
 */

import type { ReactNode } from 'react';
import { useUiStore } from '@/store/uiStore';
import Sidebar from './Sidebar';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useEffect } from 'react';

export interface AppShellProps {
  readonly children: ReactNode;
}

/**
 * App shell with collapsible sidebar and main content area.
 */
export default function AppShell({ children }: AppShellProps) {
  const sidebarOpen = useUiStore((s) => s.sidebarOpen);
  const setSidebarOpen = useUiStore((s) => s.setSidebarOpen);
  const isDesktop = useMediaQuery('(min-width: 768px)');

  useEffect(() => {
    if (!isDesktop) setSidebarOpen(false);
  }, [isDesktop, setSidebarOpen]);

  return (
    <div className="flex min-h-screen bg-bg">
      {/* persistent sidebar on md+ */}
      {isDesktop && sidebarOpen && (
        <div className="hidden md:flex md:w-56 md:flex-shrink-0">
          <Sidebar />
        </div>
      )}

      {/* mobile slide-over */}
      {!isDesktop && sidebarOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setSidebarOpen(false)}
            aria-hidden
          />
          <div className="absolute left-0 top-0 bottom-0 w-64">
            <Sidebar />
          </div>
        </div>
      )}

      <main className="min-w-0 flex-1 overflow-auto">{children}</main>
    </div>
  );
}
