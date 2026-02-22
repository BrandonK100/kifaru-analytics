/**
 * Sidebar user card and logout. Uses authStore.
 */

import { useAuthStore } from '@/store/authStore';
import { useAuth } from '@/hooks/useAuth';
import Button from '@/components/ui/Button';

/**
 * Shows current user initial, name, role and logout button.
 */
export default function UserFooter() {
  const user = useAuthStore((s) => s.user);
  const { logout } = useAuth();

  if (!user) return null;

  return (
    <div className="border-t border-border p-3">
      <div className="flex items-center gap-2">
        <div
          className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-kenya/20 font-mono text-sm font-medium text-kenya"
          aria-hidden
        >
          {user.avatarInitial}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-text">{user.name}</p>
          <p className="truncate text-xs text-sub capitalize">{user.role}</p>
        </div>
      </div>
      <Button
        variant="ghost"
        size="sm"
        className="mt-2 w-full"
        onClick={() => logout()}
      >
        Log out
      </Button>
    </div>
  );
}
