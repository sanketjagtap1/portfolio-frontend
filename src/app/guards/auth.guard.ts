import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * Route guard for the admin area.
 *
 * Blocks any /admin/* route (except the login page) unless an admin token is
 * present. Unauthenticated visitors are redirected to /admin/login with a
 * `redirect` query param so they land back where they were headed after login.
 *
 * Note: this is a client-side gate for UX only — the real enforcement lives on
 * the API (every mutating endpoint requires a valid JWT via authenticateToken).
 * The guard stops the admin UI from rendering to strangers; the server stops
 * anyone from actually reading or changing data without a token.
 */
export const authGuard: CanActivateFn = (route, state): boolean | UrlTree => {
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  // During SSG/SSR there's no localStorage; let it through and re-check on the
  // client once the app hydrates (the guard runs again in the browser).
  if (!isPlatformBrowser(platformId)) {
    return true;
  }

  const token = localStorage.getItem('admin_token');
  if (token) {
    return true;
  }

  return router.createUrlTree(['/admin/login'], {
    queryParams: { redirect: state.url },
  });
};
