/**
 * Auth store for Kifaru Analytics. User, token, login/logout, role access.
 */

import { create } from 'zustand';
import type { User, Role } from '@/types/auth.types';
import { ROLE_ORDER, ROLES } from '@/constants/roles';

interface AuthStore {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (role: Role, email: string, password: string) => Promise<void>;
  logout: () => void;
  hasRole: (role: Role) => boolean;
  hasAccess: (requiredRole: Role) => boolean;
}

function createMockUser(role: Role, email: string): User {
  const nameFromEmail = email.split('@')[0] ?? 'User';
  const avatarInitial = nameFromEmail.charAt(0).toUpperCase();
  const base: User = {
    id: `${role}-${Date.now()}`,
    name: nameFromEmail.replace('.', ' '),
    email,
    role,
    avatarInitial,
  };
  if (role === ROLES.PLAYER) return { ...base, jerseyNumber: 15 };
  return base;
}

export const useAuthStore = create<AuthStore>()((set, get) => ({
  user: null,
  token: null,
  isAuthenticated: false,

  async login(role, email, _password) {
    await new Promise((r) => setTimeout(r, 400));
    const user = createMockUser(role, email);
    const token = `mock-jwt-${role}-${Date.now()}`;
    set({ user, token, isAuthenticated: true });
  },

  logout() {
    set({ user: null, token: null, isAuthenticated: false });
  },

  hasRole(role) {
    return get().user?.role === role;
  },

  hasAccess(requiredRole) {
    const current = get().user?.role;
    if (!current) return false;
    return ROLE_ORDER.indexOf(current) >= ROLE_ORDER.indexOf(requiredRole);
  },
}));
