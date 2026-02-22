/**
 * Login page. Role selector grid then email/password form. No layout.
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Role } from '@/types/auth.types';
import { ROLE_CONFIG } from '@/constants/roles';
import { ROUTES } from '@/constants/routes';
import { useAuth } from '@/hooks/useAuth';
import { useAuthStore } from '@/store/authStore';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';

type Step = 'role' | 'form';

/**
 * Step 1: 2×2 role cards. Step 2: Email + password form. Back returns to role grid.
 */
export default function LoginPage() {
  const [step, setStep] = useState<Step>('role');
  const [role, setRole] = useState<Role | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const { login } = useAuth();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) navigate(ROUTES.DASHBOARD, { replace: true });
  }, [isAuthenticated, navigate]);

  const handleRoleSelect = (r: Role) => {
    setRole(r);
    setStep('form');
    setError(null);
  };

  const handleBack = () => {
    setStep('role');
    setRole(null);
    setEmail('');
    setPassword('');
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!role) return;
    setError(null);
    setLoading(true);
    try {
      await login(role, email, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  if (step === 'role') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg p-4">
        <div className="w-full max-w-2xl">
          <h1 className="mb-2 text-center font-display text-3xl text-text">Kifaru</h1>
          <p className="mb-4 text-center text-sub">Performance Analytics Platform</p>
          <p className="mb-6 text-center text-sub">Select your role to continue</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {(Object.keys(ROLE_CONFIG) as Role[]).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => handleRoleSelect(r)}
                className="rounded-lg border border-border bg-surface p-4 text-left shadow-sm transition-colors hover:border-kenya hover:bg-muted/30 focus:outline-none focus:ring-2 focus:ring-kenya/40"
              >
                <span className="font-display text-lg capitalize text-text">{ROLE_CONFIG[r].label}</span>
                <p className="mt-1 text-sm text-sub">{ROLE_CONFIG[r].description}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg p-4">
      <Card className="w-full max-w-md">
        <Card.Header>
          <div className="flex items-center justify-between">
            <span className="capitalize">{role && ROLE_CONFIG[role].label} login</span>
            <button
              type="button"
              onClick={handleBack}
              className="text-sm text-kenya hover:underline"
            >
              Back
            </button>
          </div>
        </Card.Header>
        <Card.Body>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
            <Input
              label="Password"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
            {error && (
              <p className="text-sm text-accent" role="alert">
                {error}
              </p>
            )}
            <Button type="submit" loading={loading} className="w-full">
              Sign in
            </Button>
          </form>
        </Card.Body>
      </Card>
    </div>
  );
}
