import { describe, it, beforeEach, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import { useAuthStore } from '@/store/authStore';
import { ROUTES } from '@/constants/routes';

  function setupWithAuth(state: Partial<ReturnType<typeof useAuthStore.getState>>) {
    useAuthStore.setState(state as any);
  }

describe('ProtectedRoute', () => {
  beforeEach(() => {
    useAuthStore.setState({ user: null, isAuthenticated: false });
  });

  it('unauthenticated user is redirected to /login', () => {
    render(
      <MemoryRouter initialEntries={[ROUTES.TEAM]}>
        <Routes>
          <Route path={ROUTES.LOGIN} element={<div>Login</div>} />
          <Route
            path={ROUTES.TEAM}
            element={<ProtectedRoute requiredRole={'admin'}><div>Team</div></ProtectedRoute>}
          />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  it('authenticated user without required role is redirected to /dashboard', () => {
    setupWithAuth({ user: { id: 'u1', role: 'fan', name: 'Fan', email: 'fan@x.com', avatarInitial: 'F' }, isAuthenticated: true });
    render(
      <MemoryRouter initialEntries={[ROUTES.TEAM]}>
        <Routes>
          <Route path={ROUTES.DASHBOARD} element={<div>Dashboard</div>} />
          <Route
            path={ROUTES.TEAM}
            element={<ProtectedRoute requiredRole={'admin'}><div>Team</div></ProtectedRoute>}
          />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });

  it('authenticated admin can access /team route', () => {
    setupWithAuth({ user: { id: 'u1', role: 'admin', name: 'Admin', email: 'a@x.com', avatarInitial: 'A' }, isAuthenticated: true });
    render(
      <MemoryRouter initialEntries={[ROUTES.TEAM]}>
        <Routes>
          <Route
            path={ROUTES.TEAM}
            element={<ProtectedRoute requiredRole={'admin'}><div>Team</div></ProtectedRoute>}
          />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText('Team')).toBeInTheDocument();
  });

  it('authenticated fan cannot access /team route', () => {
    setupWithAuth({ user: { id: 'u2', role: 'fan', name: 'Fan2', email: 'f2@x.com', avatarInitial: 'F' }, isAuthenticated: true });
    render(
      <MemoryRouter initialEntries={[ROUTES.TEAM]}>
        <Routes>
          <Route path={ROUTES.DASHBOARD} element={<div>Dashboard</div>} />
          <Route
            path={ROUTES.TEAM}
            element={<ProtectedRoute requiredRole={'admin'}><div>Team</div></ProtectedRoute>}
          />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });
});
