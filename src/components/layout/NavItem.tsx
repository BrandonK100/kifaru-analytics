/**
 * Single nav link for sidebar. Role-aware; active state from path.
 */

import { NavLink } from 'react-router-dom';
import type { NavItemConfig } from '@/types/ui.types';

export interface NavItemProps {
  readonly item: NavItemConfig;
  readonly userRole: string;
}

/**
 * Renders link if user role is in item.roles. Uses NavLink for active state.
 */
export default function NavItem({ item, userRole }: NavItemProps) {
  if (!item.roles.includes(userRole)) return null;

  return (
    <NavLink
      to={item.path}
      className={({ isActive }) =>
        `block rounded-md px-3 py-2 text-sm font-medium transition-colors ${
          isActive ? 'bg-kenya/15 text-kenya' : 'text-sub hover:bg-muted hover:text-text'
        }`
      }
    >
      {item.icon && <span className="mr-2" aria-hidden>{item.icon}</span>}
      {item.label}
    </NavLink>
  );
}
