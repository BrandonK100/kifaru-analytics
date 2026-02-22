/**
 * Router-level route constants. Re-exports app ROUTES.
 */

import { ROUTES } from '@/constants/routes';

export const APP_ROUTES = ROUTES;
export type AppRoutePath = (typeof APP_ROUTES)[keyof typeof APP_ROUTES];
