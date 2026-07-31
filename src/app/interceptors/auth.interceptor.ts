import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

/**
 * Central auth plumbing for admin API calls.
 *
 *  1. Attaches the stored admin token as a Bearer header on requests to our own
 *     API — so components no longer have to hand-build Authorization headers
 *     (and can't forget to). Requests that already set Authorization are left
 *     untouched, and only same-origin API calls get the header (never a 3rd party).
 *
 *  2. On a 401/403 it clears the stored session and bounces the user to the
 *     login screen. This is what makes an expired token recover gracefully
 *     instead of leaving the admin stuck on a silently-dead page.
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const platformId = inject(PLATFORM_ID);
  const router = inject(Router);

  if (!isPlatformBrowser(platformId)) {
    return next(req);
  }

  const apiBase = environment.apiBaseUrl.replace(/\/$/, '');
  const isOwnApi = req.url.startsWith(apiBase) || req.url.startsWith('/api/');
  const token = localStorage.getItem('admin_token');

  let authReq = req;
  if (token && isOwnApi && !req.headers.has('Authorization')) {
    authReq = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
  }

  return next(authReq).pipe(
    catchError((err: HttpErrorResponse) => {
      if ((err.status === 401 || err.status === 403) && isOwnApi) {
        localStorage.removeItem('admin_token');
        localStorage.removeItem('admin_user');
        // Only redirect if we're inside the admin area — public pages that hit a
        // protected endpoint shouldn't be yanked to the login screen.
        if (router.url.startsWith('/admin')) {
          router.navigate(['/admin/login'], { queryParams: { redirect: router.url } });
        }
      }
      return throwError(() => err);
    })
  );
};
