/**
 * Role-aware navigation sidebar. Collapsible via uiStore.
 */

import { useAuthStore } from '@/store/authStore';
import { ROUTES } from '@/constants/routes';
import type { NavItemConfig } from '@/types/ui.types';
import NavItem from './NavItem';
import UserFooter from './UserFooter';

const NAV_ITEMS: NavItemConfig[] = [
  { label: 'Dashboard', path: ROUTES.DASHBOARD, roles: ['admin', 'coach', 'player', 'fan'] },
  { label: 'Matches', path: ROUTES.MATCHES, roles: ['admin', 'coach', 'player', 'fan'] },
  { label: 'Players', path: ROUTES.PLAYERS, roles: ['admin', 'coach', 'player'] },
  { label: 'Heatmap', path: ROUTES.HEATMAP, roles: ['admin', 'coach'] },
  { label: 'Analytics', path: ROUTES.ANALYTICS, roles: ['admin', 'coach'] },
  { label: 'Team', path: ROUTES.TEAM, roles: ['admin'] },
];

/**
 * Sidebar with nav links and user footer. Visibility controlled by parent.
 */
export default function Sidebar() {
  const user = useAuthStore((s) => s.user);
  const role = user?.role ?? 'fan';

  return (
    <aside className="flex h-full flex-col border-r border-border bg-surface">
      <div className="p-3">
        <div className="mb-4 flex items-center gap-2">
          <div className="flex flex-col">
            <span className="font-display text-xl font-bold">Kifaru</span>
            <span className="text-xs tracking-wider text-sub">KENYA RUGBY</span>
          </div>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-1 overflow-y-auto p-3">
        {NAV_ITEMS.map((item) => (
          <NavItem key={item.path} item={item} userRole={role} />
        ))}
      </div>
      <UserFooter />
    </aside>
  );
}
