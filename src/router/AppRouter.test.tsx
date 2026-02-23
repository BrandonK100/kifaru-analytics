import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { APP_ROUTES } from './routes';
import ProtectedRoute from './ProtectedRoute';

// simple helpers
function SetupRoutes(authenticated = false) {
  useAuthStore.setState({ user: authenticated ? { id: 'u1', role: 'fan', name: 'U', email: 'u@x', avatarInitial: 'U' } : null, isAuthenticated: authenticated });
  return (
    <Routes>
      <Route path={APP_ROUTES.LOGIN} element={<div>Login</div>} />
      <Route index element={<Navigate to={APP_ROUTES.DASHBOARD} replace />} />
      <Route
        path={APP_ROUTES.DASHBOARD}
        element={
          <ProtectedRoute>
            <div>Dashboard</div>
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to={APP_ROUTES.DASHBOARD} replace />} />
    </Routes>
  );
}

describe('App routing behaviour', () => {
  beforeEach(() => {
    // reset auth store between tests
    useAuthStore.setState({ user: null, isAuthenticated: false });
  });

  it('should redirect empty path to dashboard', () => {
    render(<MemoryRouter initialEntries={['/']}>{SetupRoutes(true)}</MemoryRouter>);
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });

  it('should send unauthenticated users to login even after root redirect', () => {
    render(<MemoryRouter initialEntries={['/']}>{SetupRoutes(false)}</MemoryRouter>);
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  it('should redirect unknown hashes back to dashboard', () => {
    render(<MemoryRouter initialEntries={['/some/random']}>{SetupRoutes(true)}</MemoryRouter>);
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });
});