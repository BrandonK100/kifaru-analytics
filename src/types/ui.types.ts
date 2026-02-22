/**
 * UI and shared component types for Kifaru Analytics.
 */

export type BadgeVariant = 'W' | 'L' | 'D' | 'LIVE' | 'UPCOMING';

export interface NavItemConfig {
  label: string;
  path: string;
  icon?: string;
  roles: string[];
}

export interface ChartDataPoint {
  name: string;
  value: number;
  [key: string]: string | number;
}

export interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: string;
}
