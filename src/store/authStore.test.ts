import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useAuthStore } from './authStore';

describe('authStore', () => {
  beforeEach(() => {
    // reset store to defaults
    useAuthStore.setState({ user: null, token: null, isAuthenticated: false });
  });

  it('initial state is unauthenticated', () => {
    const s = useAuthStore.getState();
    expect(s.isAuthenticated).toBe(false);
    expect(s.user).toBeNull();
  });

  it('login sets user and isAuthenticated to true', async () => {
    const s = useAuthStore.getState();
    await s.login('fan', 'test@example.com', 'pass');
    const after = useAuthStore.getState();
    expect(after.isAuthenticated).toBe(true);
    expect(after.user).not.toBeNull();
  });

  it('logout clears user and sets isAuthenticated to false', async () => {
    const s = useAuthStore.getState();
    await s.login('fan', 'a@b.com', 'x');
    let after = useAuthStore.getState();
    expect(after.isAuthenticated).toBe(true);
    s.logout();
    after = useAuthStore.getState();
    expect(after.isAuthenticated).toBe(false);
    expect(after.user).toBeNull();
  });

  it('hasRole returns true for matching role', async () => {
    const s = useAuthStore.getState();
    await s.login('coach', 'c@d.com', 'p');
    const has = useAuthStore.getState().hasRole('coach');
    expect(has).toBe(true);
  });

  it('hasAccess returns true for admin accessing any route', async () => {
    const s = useAuthStore.getState();
    await s.login('admin', 'admin@site.com', 'p');
    const access = useAuthStore.getState().hasAccess('fan');
    expect(access).toBe(true);
  });

  it('hasAccess returns false for fan accessing admin route', async () => {
    const s = useAuthStore.getState();
    await s.login('fan', 'fan@site.com', 'p');
    const access = useAuthStore.getState().hasAccess('admin');
    expect(access).toBe(false);
  });
});
