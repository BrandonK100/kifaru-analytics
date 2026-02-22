/**
 * 404 page. Shown for unknown routes.
 */

import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import Button from '@/components/ui/Button';

/**
 * Simple not-found message and link back to dashboard.
 */
export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-bg p-4">
      <h1 className="font-display text-2xl text-text">Page not found</h1>
      <p className="mt-2 text-sub">The page you’re looking for doesn’t exist.</p>
      <Link to={ROUTES.DASHBOARD} className="mt-6">
        <Button>Go to dashboard</Button>
      </Link>
    </div>
  );
}
