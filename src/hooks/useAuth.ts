/**
 * Auth hook. Wraps authStore and navigates on login/logout.
 */

import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import type { Role } from '@/types/auth.types';
import { ROUTES } from '@/constants/routes';

export function useAuth() {
  const navigate = useNavigate();
  const { user, isAuthenticated, login, logout, hasRole, hasAccess } = useAuthStore();

  const handleLogin = useCallback(
    async (role: Role, email: string, password: string) => {
      await login(role, email, password);
      navigate(ROUTES.DASHBOARD, { replace: true });
    },
    [login, navigate]
  );

  const handleLogout = useCallback(() => {
    logout();
    navigate(ROUTES.LOGIN, { replace: true });
  }, [logout, navigate]);

  return { user, isAuthenticated, login: handleLogin, logout: handleLogout, hasRole, hasAccess };
}
