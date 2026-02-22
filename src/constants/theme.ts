/**
 * Design token constants for Kifaru Analytics.
 * Use T.* in code; Tailwind classes mirror these where possible.
 */

// Kifaru (كيفارو) — Swahili for Rhinoceros 🦏
// Powerful, grounded, unstoppable — the spirit of Kenyan rugby

export const APP_NAME = 'Kifaru Analytics';
export const APP_TAGLINE = 'Performance Intelligence Platform';
export const APP_ORG = '';

export const T = {
  colors: {
    bg: '#F7F6F3',
    surface: '#FFFFFF',
    border: '#E8E6E1',
    muted: '#F2F1EE',
    text: '#1C1B19',
    sub: '#6B6860',
    faint: '#A8A59E',
    kenya: '#2D6A4F',
    accent: '#B7410E',
    sand: '#D4A96A',
    sage: '#A8C5A0',
  },
  fonts: {
    display: 'Playfair Display, serif',
    body: 'DM Sans, sans-serif',
    mono: 'DM Mono, monospace',
  },
  radius: {
    default: '8px',
    lg: '12px',
    xl: '16px',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
} as const;
