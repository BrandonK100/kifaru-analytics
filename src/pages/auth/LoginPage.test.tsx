import { describe, it, beforeEach, vi, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
// ensure react-router navigation is mocked before importing the page
const navigateMock = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<any>('react-router-dom');
  return { ...actual, useNavigate: () => navigateMock };
});
import LoginPage from './LoginPage';
import { MemoryRouter } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { ROLE_CONFIG } from '@/constants/roles';

describe('LoginPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // reset auth store
    useAuthStore.setState({ user: null, token: null, isAuthenticated: false });
  });

  it('renders role selector grid with 4 roles', () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );
    const roles = Object.keys(ROLE_CONFIG);
    roles.forEach((r) => {
      const label = ROLE_CONFIG[r as keyof typeof ROLE_CONFIG].label;
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });

  it('clicking a role card shows the login form', () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );
    const roleButton = screen.getByText(ROLE_CONFIG.fan.label);
    fireEvent.click(roleButton);
    expect(screen.getByText(/login/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
  });

  it('back button returns to role grid', () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );
    const roleButton = screen.getByText(ROLE_CONFIG.fan.label);
    fireEvent.click(roleButton);
    const back = screen.getByText(/Back/i);
    fireEvent.click(back);
    expect(screen.getByText(ROLE_CONFIG.fan.label)).toBeInTheDocument();
  });

  it('submit with empty fields does not call login', () => {
    const loginMock = vi.fn();
    useAuthStore.setState({ login: loginMock } as any);
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByText(ROLE_CONFIG.fan.label));
    const submit = screen.getByRole('button', { name: /Sign in/i });
    fireEvent.click(submit);
    expect(loginMock).not.toHaveBeenCalled();
  });

  it('submit with valid fields calls authStore.login', async () => {
    const loginMock = vi.fn(async () => Promise.resolve());
    useAuthStore.setState({ login: loginMock } as any);
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByText(ROLE_CONFIG.fan.label));
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'a@b.com' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'pass' } });
    const submit = screen.getByRole('button', { name: /Sign in/i });
    fireEvent.click(submit);
    expect(loginMock).toHaveBeenCalled();
  });

  it('successful login redirects to /dashboard', async () => {
    // make login resolve and set authenticated
    const loginReal = async (role: any) => {
      useAuthStore.setState({ user: { id: 'u1', role, name: 'User', email: 'u@u.com', avatarInitial: 'U' }, isAuthenticated: true } as any);
    };
    useAuthStore.setState({ login: loginReal } as any);

    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByText(ROLE_CONFIG.fan.label));
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'a@b.com' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'pass' } });
    fireEvent.click(screen.getByRole('button', { name: /Sign in/i }));

    // wait a tick since login is async
    await Promise.resolve();
    expect(navigateMock).toHaveBeenCalledWith('/dashboard', { replace: true });
  });
});
