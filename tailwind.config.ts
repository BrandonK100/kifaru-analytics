/** Tailwind configuration with Kifaru Analytics design tokens. */
import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
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
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        body: ['DM Sans', 'sans-serif'],
        mono: ['DM Mono', 'monospace'],
      },
      borderRadius: {
        DEFAULT: '8px',
        lg: '12px',
        xl: '16px',
      },
    },
  },
  plugins: [],
} satisfies Config;
