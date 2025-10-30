import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-nav',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="bg-slate-800/90 backdrop-blur-lg border-b border-blue-400/30 shadow-xl sticky top-0 z-50">
      <div class="container mx-auto px-4">
        <div class="flex items-center justify-between h-16">
          <!-- Logo -->
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center shadow-sm">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-white">
                <path d="M12 15l-3-3h6l-3 3z"/>
                <path d="M12 3v12"/>
                <path d="M21 12h-6"/>
                <path d="M3 12h6"/>
              </svg>
            </div>
            <div>
              <h1 class="text-xl font-bold text-white">Admin Portal</h1>
              <p class="text-xs text-blue-200">Portfolio Management</p>
            </div>
          </div>

          <!-- Navigation Links -->
          <div class="hidden md:flex items-center gap-1">
            <a 
              routerLink="/admin/dashboard" 
              routerLinkActive="active"
              class="px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-slate-700/50 transition-colors duration-200 flex items-center gap-2 font-medium"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                <polyline points="9,22 9,12 15,12 15,22"/>
              </svg>
              Dashboard
            </a>
            
            <a 
              routerLink="/admin/skills" 
              routerLinkActive="active"
              class="px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-slate-700/50 transition-colors duration-200 flex items-center gap-2 font-medium"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
              </svg>
              Skills
            </a>
            
            <a 
              routerLink="/admin/projects" 
              routerLinkActive="active"
              class="px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-slate-700/50 transition-colors duration-200 flex items-center gap-2 font-medium"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              Projects
            </a>
            
            <a 
              routerLink="/admin/experience" 
              routerLinkActive="active"
              class="px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-slate-700/50 transition-colors duration-200 flex items-center gap-2 font-medium"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                <polyline points="3.27,6.96 12,12.01 20.73,6.96"/>
                <line x1="12" y1="22.08" x2="12" y2="12"/>
              </svg>
              Experience
            </a>
            
            <a 
              routerLink="/admin/blog" 
              routerLinkActive="active"
              class="px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-slate-700/50 transition-colors duration-200 flex items-center gap-2 font-medium"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14,2 14,8 20,8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10,9 9,9 8,9"/>
              </svg>
              Blog
            </a>
          </div>

          <!-- Right Side Actions -->
          <div class="flex items-center gap-3">
            <!-- View Portfolio Button -->
            <a 
              href="/" 
              target="_blank"
              class="hidden md:flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm font-medium"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                <polyline points="15,3 21,3 21,9"/>
                <line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
              View Site
            </a>

            <!-- User Info & Logout -->
            <div class="flex items-center gap-3">
              <div class="text-right hidden md:block">
                <p class="text-gray-900 text-sm font-medium">{{ user?.name || 'Admin' }}</p>
                <p class="text-gray-500 text-xs">{{ user?.role | titlecase }}</p>
              </div>
              
              <button 
                (click)="logout()"
                class="flex items-center gap-2 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 text-sm font-medium"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                  <polyline points="16,17 21,12 16,7"/>
                  <line x1="21" y1="12" x2="9" y2="12"/>
                </svg>
                <span class="hidden md:inline">Logout</span>
              </button>
            </div>

            <!-- Mobile Menu Button -->
            <button 
              (click)="toggleMobileMenu()"
              class="md:hidden w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors duration-200"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-gray-300">
                <line x1="3" y1="6" x2="21" y2="6"/>
                <line x1="3" y1="12" x2="21" y2="12"/>
                <line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Mobile Menu -->
        <div *ngIf="showMobileMenu" class="md:hidden border-t border-gray-200 py-4">
          <div class="space-y-2">
            <a 
              routerLink="/admin/dashboard" 
              routerLinkActive="active"
              (click)="closeMobileMenu()"
              class="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-slate-700/50 transition-colors duration-200 font-medium"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                <polyline points="9,22 9,12 15,12 15,22"/>
              </svg>
              Dashboard
            </a>
            
            <a 
              routerLink="/admin/skills" 
              routerLinkActive="active"
              (click)="closeMobileMenu()"
              class="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-slate-700/50 transition-colors duration-200 font-medium"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
              </svg>
              Skills Management
            </a>
            
            <a 
              routerLink="/admin/projects" 
              routerLinkActive="active"
              (click)="closeMobileMenu()"
              class="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-slate-700/50 transition-colors duration-200 font-medium"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              Projects Management
            </a>
            
            <a 
              routerLink="/admin/experience" 
              routerLinkActive="active"
              (click)="closeMobileMenu()"
              class="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-slate-700/50 transition-colors duration-200 font-medium"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                <polyline points="3.27,6.96 12,12.01 20.73,6.96"/>
                <line x1="12" y1="22.08" x2="12" y2="12"/>
              </svg>
              Experience Management
            </a>
            
            <a 
              routerLink="/admin/blog" 
              routerLinkActive="active"
              (click)="closeMobileMenu()"
              class="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-slate-700/50 transition-colors duration-200 font-medium"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14,2 14,8 20,8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10,9 9,9 8,9"/>
              </svg>
              Blog Management
            </a>

            <div class="border-t border-gray-200 pt-3 mt-3">
              <a 
                href="/" 
                target="_blank"
                class="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-900 hover:bg-gray-100 transition-colors duration-200 font-medium"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                  <polyline points="15,3 21,3 21,9"/>
                  <line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
                View Portfolio Site
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    .active {
      background-color: rgba(59, 130, 246, 0.2);
      color: #60a5fa;
      font-weight: 600;
    }

    a:hover:not(.active) {
      transform: translateY(-1px);
    }

    button:hover {
      transform: translateY(-1px);
    }

    /* Smooth animations */
    * {
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    }
  `]
})
export class AdminNavComponent implements OnInit {
  showMobileMenu = false;
  user: any = null;

  constructor(private router: Router) {}

  ngOnInit() {
    this.loadUser();
  }

  loadUser() {
    const userStr = localStorage.getItem('admin_user');
    if (userStr) {
      this.user = JSON.parse(userStr);
    }
  }

  toggleMobileMenu() {
    this.showMobileMenu = !this.showMobileMenu;
  }

  closeMobileMenu() {
    this.showMobileMenu = false;
  }

  logout() {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    this.router.navigate(['/admin/login']);
  }
}
