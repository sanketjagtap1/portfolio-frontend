import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { IconComponent } from '../ui/icon.component';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, FormsModule, IconComponent],
  template: `
    <div class="min-h-screen bg-canvas text-ink flex items-center justify-center px-4 py-16 relative overflow-hidden">
      <!-- Subtle accent glow -->
      <div class="pointer-events-none absolute inset-0 opacity-40">
        <div class="absolute -top-24 left-1/2 -translate-x-1/2 h-72 w-[36rem] rounded-full bg-accent/10 blur-[120px]"></div>
      </div>

      <div class="relative z-10 w-full max-w-md">
        <div class="card p-8 md:p-10">
          <!-- Header -->
          <div class="mb-8">
            <span class="kicker mb-4">Admin</span>
            <h1 class="font-display text-3xl font-semibold text-ink mt-3">Welcome back</h1>
            <p class="text-muted mt-2 text-sm">Sign in to manage your portfolio content.</p>
          </div>

          <form (ngSubmit)="onSubmit()" #loginForm="ngForm" class="space-y-5">
            <!-- Email / username -->
            <div>
              <label for="username" class="block text-xs font-mono uppercase tracking-[0.15em] text-faint mb-2">Email</label>
              <input
                type="text"
                id="username"
                name="username"
                [(ngModel)]="loginData.username"
                required
                #username="ngModel"
                autocomplete="username"
                class="w-full rounded-xl border border-line bg-surface2 px-4 py-3 text-ink placeholder-faint focus:outline-none transition-all"
                placeholder="you@example.com"
              >
              <p class="text-red-400 text-xs mt-1.5" *ngIf="username.invalid && username.touched">Email is required.</p>
            </div>

            <!-- Password -->
            <div>
              <label for="password" class="block text-xs font-mono uppercase tracking-[0.15em] text-faint mb-2">Password</label>
              <div class="relative">
                <input
                  [type]="showPassword ? 'text' : 'password'"
                  id="password"
                  name="password"
                  [(ngModel)]="loginData.password"
                  required
                  #password="ngModel"
                  autocomplete="current-password"
                  class="w-full rounded-xl border border-line bg-surface2 px-4 py-3 pr-12 text-ink placeholder-faint focus:outline-none transition-all"
                  placeholder="••••••••"
                >
                <button
                  type="button"
                  (click)="togglePassword()"
                  [attr.aria-label]="showPassword ? 'Hide password' : 'Show password'"
                  class="absolute right-3 top-1/2 -translate-y-1/2 text-faint hover:text-ink transition-colors"
                >
                  <app-icon [name]="showPassword ? 'eye-off' : 'eye'" [size]="18"></app-icon>
                </button>
              </div>
              <p class="text-red-400 text-xs mt-1.5" *ngIf="password.invalid && password.touched">Password is required.</p>
            </div>

            <!-- Error -->
            <div *ngIf="errorMessage" class="flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3">
              <app-icon name="alert-circle" [size]="18" class="text-red-400 shrink-0"></app-icon>
              <span class="text-red-300 text-sm">{{ errorMessage }}</span>
            </div>

            <!-- Submit -->
            <button
              type="submit"
              class="btn-primary w-full py-3.5 mt-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              [disabled]="loginForm.invalid || isLoading"
            >
              <span *ngIf="!isLoading" class="inline-flex items-center gap-2">
                Sign in <app-icon name="arrow-right" [size]="17"></app-icon>
              </span>
              <span *ngIf="isLoading" class="inline-flex items-center gap-2">
                <span class="h-4 w-4 rounded-full border-2 border-accent-ink/30 border-t-accent-ink animate-spin"></span>
                Signing in…
              </span>
            </button>
          </form>
        </div>

        <p class="text-center text-xs text-faint mt-6">
          Protected area · Portfolio management
        </p>
      </div>
    </div>
  `,
  styles: [],
})
export class AdminLoginComponent implements OnInit {
  loginData = {
    username: '',
    password: ''
  };

  isLoading = false;
  errorMessage = '';
  showPassword = false;
  private redirectTo = '/admin/dashboard';

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    // Preserve where the user was headed (set by the auth guard/interceptor).
    const redirect = this.route.snapshot.queryParamMap.get('redirect');
    if (redirect && redirect.startsWith('/admin') && redirect !== '/admin/login') {
      this.redirectTo = redirect;
    }

    // Already logged in? Skip the form.
    if (typeof localStorage !== 'undefined' && localStorage.getItem('admin_token')) {
      this.router.navigateByUrl(this.redirectTo);
    }
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (this.isLoading) return;

    this.isLoading = true;
    this.errorMessage = '';

    const loginPayload = {
      email: this.loginData.username,
      password: this.loginData.password
    };

    this.http.post(`${environment.apiBaseUrl}/api/admin/login`, loginPayload)
      .subscribe({
        next: (response: any) => {
          localStorage.setItem('admin_token', response.token);
          localStorage.setItem('admin_user', JSON.stringify(response.user));
          this.router.navigateByUrl(this.redirectTo);
        },
        error: (error) => {
          console.error('Login error:', error);
          this.isLoading = false;
          this.errorMessage = error.error?.error || 'Login failed. Please check your credentials and try again.';
          this.cdr.detectChanges();
        }
      });
  }
}
