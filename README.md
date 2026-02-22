# Kifaru Analytics

A lightweight rugby analytics dashboard (UI prototype) — quick start, scripts, and testing.

Quick start

- Install dependencies: `pnpm install`
- Run dev server: `pnpm dev`
- Build for production: `pnpm build`
- Run tests: `pnpm test`

Tech stack

- Vite + React + TypeScript
- Tailwind CSS for styles
- Zustand for lightweight state
- Recharts / D3 for charts
- Vitest + React Testing Library for tests

Project layout (important folders)

- `src/` — application source
  - `components/` — UI components and charts
  - `pages/` — page views
  - `store/` — Zustand stores
  - `api/` — API client and endpoints
  - `mock/` — mocked data for development
  - `test/` — test setup

Testing

- Unit and component tests run with `pnpm test` (Vitest + RTL). Tests are in `src/**/*.test.*`.

Notes

- This repo is a prototype / internal dashboard — adjust environment and API clients before deploying.
- For development, mock data lives in `src/mock` and can be replaced by real endpoints in `src/api`.

Contact

If you want this README expanded into a detailed developer guide, tell me what sections to include.
# Kifaru Analytics

Performance intelligence platform. Role-based dashboard for coaches, players, administrators, and fans.

## Tech stack

- **Frontend:** React 18, TypeScript (strict), Vite
- **Routing:** React Router v6
- **State:** Zustand (global), React Query (server)
- **Styling:** Tailwind CSS v3 (design tokens, no component libraries)
- **Charts:** Recharts + D3 (heatmaps)
- **Forms:** React Hook Form + Zod
- **Auth:** JWT-based, role-aware
- **Package manager:** pnpm (or npm)

## Setup

1. Install dependencies:
   ```bash
   pnpm install
   # or: npm install
   ```
2. Copy environment template:
   ```bash
   cp .env.example .env
   ```
3. Run dev server:
   ```bash
   pnpm dev
   # or: npm run dev
   ```
4. Build:
   ```bash
   pnpm build
   ```
5. Type-check:
   ```bash
   pnpm exec tsc --noEmit
   ```
6. Tests:
   ```bash
   pnpm test
   ```

## Folder structure

- `src/types/` — TypeScript types (auth, match, player, team, analytics, ui)
- `src/constants/` — roles, routes, positions, theme
- `src/mock/` — mock data (fixtures, players, match stats, season stats, insights)
- `src/components/` — ui, charts, layout, domain (to be built in Phase 3)
- `src/pages/` — route-level pages (Phase 4)
- `src/router/` — routes and protected route guard (Phase 2)
- `src/store/` — Zustand stores (Phase 2)
- `src/api/` — API client and endpoints (Phase 2)
- `src/hooks/` — custom hooks (Phase 2)

## Role access

| Role   | Access level | Primary use case                          |
|--------|--------------|-------------------------------------------|
| Admin  | Full         | Squad, users, seasons, all data           |
| Coach  | Team + tactics| Match analysis, selection, heatmaps     |
| Player | Personal only| Own stats, fitness, ratings, radar        |
| Fan    | Public       | Live scores, fixtures, standings, highlights |

## Design tokens

- **Fonts:** Playfair Display (display), DM Sans (body), DM Mono (stats)
- **Colors:** bg `#F7F6F3`, kenya `#2D6A4F`, accent `#B7410E`, sand/sage for charts

---

*Kifaru Analytics · Built with intention.*
