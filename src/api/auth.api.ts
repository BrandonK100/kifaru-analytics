/**
 * Auth API. Mock login via authStore until backend is ready.
 */

import type { Role } from '@/types/auth.types';
import type { User } from '@/types/auth.types';
import { useAuthStore } from '@/store/authStore';

export interface LoginPayload {
  role: Role;
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}

export async function loginApi(payload: LoginPayload): Promise<LoginResponse> {
  await useAuthStore.getState().login(payload.role, payload.email, payload.password);
  const { user, token } = useAuthStore.getState();
  if (!user || !token) throw new Error('Login failed');
  return { user, token };
}
