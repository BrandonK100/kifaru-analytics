/**
 * App router. React Router v6 with protected routes and AppShell layout.
 */

import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { APP_ROUTES } from './routes';
import ProtectedRoute from './ProtectedRoute';
import AppShell from '@/components/layout/AppShell';
import TopBar from '@/components/layout/TopBar';
import LoginPage from '@/pages/auth/LoginPage';
import DashboardPage from '@/pages/dashboard/DashboardPage';
import MatchesPage from '@/pages/matches/MatchesPage';
import MatchDetailPage from '@/pages/matches/MatchDetailPage';
import PlayersPage from '@/pages/players/PlayersPage';
import PlayerProfilePage from '@/pages/players/PlayerProfilePage';
import HeatmapPage from '@/pages/heatmap/HeatmapPage';
import AnalyticsPage from '@/pages/analytics/AnalyticsPage';
import TeamManagementPage from '@/pages/team/TeamManagementPage';
import NotFoundPage from '@/pages/NotFoundPage';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell>
      <TopBar showLiveBanner />
      <div className="flex-1">{children}</div>
    </AppShell>
  );
}

export function AppRouter() {
  return (
    <HashRouter>
      <Routes>
        <Route path={APP_ROUTES.LOGIN} element={<LoginPage />} />
        <Route
          path={APP_ROUTES.DASHBOARD}
          element={
            <ProtectedRoute>
              <Layout>
                <DashboardPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path={APP_ROUTES.MATCHES}
          element={
            <ProtectedRoute>
              <Layout>
                <MatchesPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path={APP_ROUTES.MATCH}
          element={
            <ProtectedRoute>
              <Layout>
                <MatchDetailPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path={APP_ROUTES.PLAYERS}
          element={
            <ProtectedRoute>
              <Layout>
                <PlayersPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path={APP_ROUTES.PLAYER}
          element={
            <ProtectedRoute>
              <Layout>
                <PlayerProfilePage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path={APP_ROUTES.HEATMAP}
          element={
            <ProtectedRoute>
              <Layout>
                <HeatmapPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path={APP_ROUTES.ANALYTICS}
          element={
            <ProtectedRoute>
              <Layout>
                <AnalyticsPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path={APP_ROUTES.TEAM}
          element={
            <ProtectedRoute requiredRole="admin">
              <Layout>
                <TeamManagementPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Navigate to={APP_ROUTES.DASHBOARD} replace />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </HashRouter>
  );
}
