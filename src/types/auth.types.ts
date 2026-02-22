/**
 * Auth domain types for Kifaru Analytics.
 * User, Role, and session-related interfaces.
 */

export type Role = 'admin' | 'coach' | 'player' | 'fan';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatarInitial: string;
  jerseyNumber?: number;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}
