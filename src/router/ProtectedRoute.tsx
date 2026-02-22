/**
 * ProtectedRoute. Auth and optional role guard.
 */

import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import type { Role } from '@/types/auth.types';
import { useAuthStore } from '@/store/authStore';
import { ROUTES } from '@/constants/routes';

export interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: Role;
}

export default function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const location = useLocation();
  const { isAuthenticated, hasAccess } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace state={{ from: location.pathname }} />;
  }
  if (requiredRole && !hasAccess(requiredRole)) {
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  }
  return <>{children}</>;
}
