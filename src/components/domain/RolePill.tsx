/**
 * Colored role indicator pill for admin/coach/player/fan.
 */

import type { Role } from '@/types/auth.types';
import { ROLE_CONFIG } from '@/constants/roles';

export interface RolePillProps {
  readonly role: Role;
  readonly className?: string;
}

const roleColors: Record<Role, string> = {
  admin: 'bg-accent/15 text-accent border-accent/30',
  coach: 'bg-kenya/15 text-kenya border-kenya/30',
  player: 'bg-sage/30 text-kenya border-sage/50',
  fan: 'bg-muted text-sub border-border',
};

/**
 * Small pill showing role label with role-specific color.
 */
export default function RolePill({ role, className = '' }: RolePillProps) {
  const config = ROLE_CONFIG[role];
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${roleColors[role]} ${className}`.trim()}
    >
      {config.label}
    </span>
  );
}
