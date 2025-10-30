import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center px-4">
      <!-- Background Pattern -->
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/20 to-indigo-600/20"></div>
        <div class="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div class="absolute bottom-20 right-20 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" style="animation-delay: 1s;"></div>
      </div>

      <div class="relative z-10 w-full max-w-md">
        <!-- Login Card -->
        <div class="relative">
          <div class="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-3xl blur-xl"></div>
          <div class="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
            <!-- Header -->
            <div class="text-center mb-8">
              <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 15l-3-3h6l-3 3z"/>
                  <path d="M12 3v12"/>
                  <path d="M21 12h-6"/>
                  <path d="M3 12h6"/>
                </svg>
              </div>
              <h1 class="text-3xl font-bold text-white mb-2">Admin Login</h1>
              <p class="text-blue-200">Access your portfolio management dashboard</p>
            </div>

            <!-- Login Form -->
            <form (ngSubmit)="onSubmit()" #loginForm="ngForm" class="space-y-6">
              <!-- Username Field -->
              <div class="form-group">
                <label for="username" class="block text-sm font-semibold text-blue-200 mb-2">Username or Email</label>
                <input 
                  type="text" 
                  id="username" 
                  name="username" 
                  [(ngModel)]="loginData.username"
                  required
                  #username="ngModel"
                  class="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300"
                  placeholder="Enter your username or email"
                  [class.error]="username.invalid && username.touched"
                >
                <div class="error-message text-red-400 text-sm mt-1" *ngIf="username.invalid && username.touched">
                  Username is required
                </div>
              </div>

              <!-- Password Field -->
              <div class="form-group">
                <label for="password" class="block text-sm font-semibold text-blue-200 mb-2">Password</label>
                <div class="relative">
                  <input 
                    [type]="showPassword ? 'text' : 'password'" 
                    id="password" 
                    name="password" 
                    [(ngModel)]="loginData.password"
                    required
                    #password="ngModel"
                    class="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300 pr-12"
                    placeholder="Enter your password"
                    [class.error]="password.invalid && password.touched"
                  >
                  <button 
                    type="button" 
                    (click)="togglePassword()"
                    class="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-300 hover:text-blue-200 transition-colors duration-300"
                  >
                    <svg *ngIf="!showPassword" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                    <svg *ngIf="showPassword" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  </button>
                </div>
                <div class="error-message text-red-400 text-sm mt-1" *ngIf="password.invalid && password.touched">
                  Password is required
                </div>
              </div>

              <!-- Error Message -->
              <div *ngIf="errorMessage" class="bg-red-500/20 border border-red-400/30 rounded-xl p-4">
                <div class="flex items-center gap-2">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="15" y1="9" x2="9" y2="15"/>
                    <line x1="9" y1="9" x2="15" y2="15"/>
                  </svg>
                  <span class="text-red-300 font-medium">{{ errorMessage }}</span>
                </div>
              </div>

              <!-- Submit Button -->
              <button 
                type="submit" 
                class="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                [disabled]="loginForm.invalid || isLoading"
              >
                <span *ngIf="!isLoading">Sign In</span>
                <span *ngIf="isLoading">Signing In...</span>
                <svg *ngIf="!isLoading" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
                  <polyline points="10,17 15,12 10,7"/>
                  <line x1="15" y1="12" x2="3" y2="12"/>
                </svg>
                <div *ngIf="isLoading" class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              </button>
            </form>

            <!-- Footer -->
            <div class="mt-8 text-center">
              <p class="text-blue-200 text-sm">
                Default credentials: <span class="text-blue-300 font-mono">admin / admin123</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .form-group input:focus {
      transform: translateY(-1px);
      box-shadow: 0 10px 25px rgba(59, 130, 246, 0.15);
    }

    .error {
      border-color: #ef4444 !important;
      box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1) !important;
    }

    .error-message {
      animation: slideDown 0.3s ease-out;
    }

    @keyframes slideDown {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    button:hover:not(:disabled) {
      transform: translateY(-2px);
    }

    /* Custom scrollbar */
    ::-webkit-scrollbar {
      width: 6px;
    }

    ::-webkit-scrollbar-track {
      background: rgba(255, 255, 255, 0.1);
      border-radius: 3px;
    }

    ::-webkit-scrollbar-thumb {
      background: linear-gradient(45deg, #3b82f6, #6366f1);
      border-radius: 3px;
    }

    ::-webkit-scrollbar-thumb:hover {
      background: linear-gradient(45deg, #2563eb, #4f46e5);
    }
  `]
})
export class AdminLoginComponent implements OnInit {
  loginData = {
    username: '',
    password: ''
  };

  isLoading = false;
  errorMessage = '';
  showPassword = false;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    // Check if already logged in
    const token = localStorage.getItem('admin_token');
    if (token) {
      this.router.navigate(['/admin/dashboard']);
    }
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (this.isLoading) return;

    this.isLoading = true;
    this.errorMessage = '';

    // Convert username to email field for the API
    const loginPayload = {
      email: this.loginData.username,
      password: this.loginData.password
    };

    this.http.post('http://localhost:3000/api/admin/login', loginPayload)
      .subscribe({
        next: (response: any) => {
          // Store token and user info
          localStorage.setItem('admin_token', response.token);
          localStorage.setItem('admin_user', JSON.stringify(response.user));
          
          // Redirect to dashboard
          this.router.navigate(['/admin/dashboard']);
        },
        error: (error) => {
          console.error('Login error:', error);
          this.isLoading = false;
          this.errorMessage = error.error?.error || 'Login failed. Please try again.';
        }
      });
  }
}
