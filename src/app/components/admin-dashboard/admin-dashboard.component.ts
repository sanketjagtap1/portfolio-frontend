import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { timeout, catchError, of } from 'rxjs';
import { AdminNavComponent } from '../admin-nav/admin-nav.component';

interface AdminUser {
  id: number;
  username: string;
  email: string;
  name: string;
  role: string;
}

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, AdminNavComponent],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      <!-- Admin Navigation -->
      <app-admin-nav></app-admin-nav>

      <!-- Main Content -->
      <main class="container mx-auto px-4 py-8">
        <!-- Page Header -->
        <div class="mb-8">
          <h1 class="text-3xl font-bold text-white mb-2">Dashboard Overview</h1>
          <p class="text-blue-200">Monitor and manage your portfolio content</p>
        </div>

        <!-- Stats Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <!-- Skills Card -->
          <div class="bg-slate-800/80 backdrop-blur-lg rounded-xl shadow-xl border border-blue-400/30 p-6 hover:shadow-2xl transition-all duration-300">
            <div class="flex items-center justify-between mb-4">
              <div class="p-3 bg-blue-500/20 rounded-lg">
                <svg class="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                </svg>
              </div>
              <div class="text-right">
                <p class="text-2xl font-bold text-white">
                  <span *ngIf="isLoading" class="animate-pulse text-gray-400">--</span>
                  <span *ngIf="!isLoading">{{ stats.skills || 0 }}</span>
                </p>
                <p class="text-sm text-blue-200">Skills</p>
              </div>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-sm text-gray-300">Technical expertise</span>
              <button 
                (click)="navigateToSection('skills')"
                class="px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Manage
              </button>
            </div>
          </div>

          <!-- Projects Card -->
          <div class="bg-slate-800/80 backdrop-blur-lg rounded-xl shadow-xl border border-blue-400/30 p-6 hover:shadow-2xl transition-all duration-300">
            <div class="flex items-center justify-between mb-4">
              <div class="p-3 bg-purple-500/20 rounded-lg">
                <svg class="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <div class="text-right">
                <p class="text-2xl font-bold text-white">
                  <span *ngIf="isLoading" class="animate-pulse text-gray-400">--</span>
                  <span *ngIf="!isLoading">{{ stats.projects || 0 }}</span>
                </p>
                <p class="text-sm text-blue-200">Projects</p>
              </div>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-sm text-gray-300">Portfolio showcases</span>
              <button 
                (click)="navigateToSection('projects')"
                class="px-3 py-1.5 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 transition-colors duration-200"
              >
                Manage
              </button>
            </div>
          </div>

          <!-- Experience Card -->
          <div class="bg-slate-800/80 backdrop-blur-lg rounded-xl shadow-xl border border-blue-400/30 p-6 hover:shadow-2xl transition-all duration-300">
            <div class="flex items-center justify-between mb-4">
              <div class="p-3 bg-green-500/20 rounded-lg">
                <svg class="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                  <polyline points="3.27,6.96 12,12.01 20.73,6.96"/>
                  <line x1="12" y1="22.08" x2="12" y2="12"/>
                </svg>
              </div>
              <div class="text-right">
                <p class="text-2xl font-bold text-white">
                  <span *ngIf="isLoading" class="animate-pulse text-gray-400">--</span>
                  <span *ngIf="!isLoading">{{ stats.experience || 0 }}</span>
                </p>
                <p class="text-sm text-blue-200">Experience</p>
              </div>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-sm text-gray-300">Professional journey</span>
              <button 
                (click)="navigateToSection('experience')"
                class="px-3 py-1.5 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors duration-200"
              >
                Manage
              </button>
            </div>
          </div>

          <!-- Blog Card -->
          <div class="bg-slate-800/80 backdrop-blur-lg rounded-xl shadow-xl border border-blue-400/30 p-6 hover:shadow-2xl transition-all duration-300">
            <div class="flex items-center justify-between mb-4">
              <div class="p-3 bg-orange-500/20 rounded-lg">
                <svg class="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14,2 14,8 20,8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/>
                  <polyline points="10,9 9,9 8,9"/>
                </svg>
              </div>
              <div class="text-right">
                <p class="text-2xl font-bold text-white">
                  <span *ngIf="isLoading" class="animate-pulse text-gray-400">--</span>
                  <span *ngIf="!isLoading">{{ stats.blogs || 0 }}</span>
                </p>
                <p class="text-sm text-blue-200">Blog Posts</p>
              </div>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-sm text-gray-300">Published articles</span>
              <button 
                (click)="navigateToSection('blog')"
                class="px-3 py-1.5 bg-orange-600 text-white text-sm rounded-lg hover:bg-orange-700 transition-colors duration-200"
              >
                Manage
              </button>
            </div>
          </div>

          <!-- Services Card -->
          <div class="bg-slate-800/80 backdrop-blur-lg rounded-xl shadow-xl border border-blue-400/30 p-6 hover:shadow-2xl transition-all duration-300">
            <div class="flex items-center justify-between mb-4">
              <div class="p-3 bg-teal-500/20 rounded-lg">
                <svg class="w-6 h-6 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                </svg>
              </div>
              <div class="text-right">
                <p class="text-2xl font-bold text-white">
                  <span *ngIf="isLoading" class="animate-pulse text-gray-400">--</span>
                  <span *ngIf="!isLoading">{{ stats.services || 0 }}</span>
                </p>
                <p class="text-sm text-blue-200">Services</p>
              </div>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-sm text-gray-300">Service offerings</span>
              <button 
                (click)="navigateToSection('services')"
                class="px-3 py-1.5 bg-teal-600 text-white text-sm rounded-lg hover:bg-teal-700 transition-colors duration-200"
              >
                Manage
              </button>
            </div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="bg-slate-800/80 backdrop-blur-lg rounded-xl shadow-xl border border-blue-400/30 p-6">
          <h2 class="text-xl font-semibold text-white mb-4">Quick Actions</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button 
              (click)="navigateToSection('contact')"
              class="flex items-center gap-3 p-4 bg-slate-700/50 rounded-lg hover:bg-slate-700/70 transition-colors duration-200 group border border-slate-600/50"
            >
                <div class="p-2 bg-indigo-500/20 rounded-lg group-hover:bg-indigo-500/30 transition-colors duration-200">
                  <svg class="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
              </div>
              <div class="text-left">
                <p class="font-medium text-white">Update Contact Info</p>
                <p class="text-sm text-gray-400">Manage contact details</p>
              </div>
            </button>
            
            <button 
              (click)="viewPortfolio()"
              class="flex items-center gap-3 p-4 bg-slate-700/50 rounded-lg hover:bg-slate-700/70 transition-colors duration-200 group border border-slate-600/50"
            >
                <div class="p-2 bg-purple-500/20 rounded-lg group-hover:bg-purple-500/30 transition-colors duration-200">
                  <svg class="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                  <polyline points="15,3 21,3 21,9"/>
                  <line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
              </div>
              <div class="text-left">
                <p class="font-medium text-white">View Portfolio</p>
                <p class="text-sm text-gray-400">Preview public site</p>
              </div>
            </button>
            
            <button 
              (click)="navigateToSection('profile')"
              class="flex items-center gap-3 p-4 bg-slate-700/50 rounded-lg hover:bg-slate-700/70 transition-colors duration-200 group border border-slate-600/50"
            >
                <div class="p-2 bg-blue-500/20 rounded-lg group-hover:bg-blue-500/30 transition-colors duration-200">
                  <svg class="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              </div>
              <div class="text-left">
                <p class="font-medium text-white">Update Profile</p>
                <p class="text-sm text-gray-400">Manage admin settings</p>
              </div>
            </button>
          </div>
        </div>
      </main>
    </div>
  `,
  styles: [`
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
export class AdminDashboardComponent implements OnInit {
  user: AdminUser | null = null;
  isLoading = true;
  stats = {
    skills: 0,
    projects: 0,
    experience: 0,
    blogs: 0,
    services: 0
  };

  constructor(private http: HttpClient, private router: Router, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.checkAuth();
    this.loadStats();
  }

  checkAuth() {
    const token = localStorage.getItem('admin_token');
    const userStr = localStorage.getItem('admin_user');
    
    if (!token || !userStr) {
      this.router.navigate(['/admin/login']);
      return;
    }

    this.user = JSON.parse(userStr);
  }

  loadStats() {
    this.isLoading = true;
    
    let completedRequests = 0;
    const totalRequests = 4;
    
    // Fallback timeout to prevent infinite loading
    const fallbackTimeout = setTimeout(() => {
      if (this.isLoading) {
        console.warn('⚠️ Fallback timeout triggered - forcing loading to complete');
        this.isLoading = false;
        console.log('Final stats after timeout:', this.stats);
      }
    }, 10000); // 10 second fallback
    
    const checkComplete = () => {
      completedRequests++;
      if (completedRequests === totalRequests) {
        clearTimeout(fallbackTimeout);
        this.isLoading = false;
        // Force UI update
        setTimeout(() => {
          this.cdr.detectChanges();
        }, 0);
      }
    };
    
    // Load skills count (public endpoint)
    this.http.get('http://localhost:3000/api/portfolio/skills')
      .subscribe({
        next: (skills: any) => {
          this.stats.skills = Array.isArray(skills) ? skills.length : 0;
          this.cdr.detectChanges();
          checkComplete();
        },
        error: (error) => {
          console.error('Error loading skills:', error);
          this.stats.skills = 0;
          checkComplete();
        }
      });

    // Load projects count (public endpoint)
    this.http.get('http://localhost:3000/api/portfolio/projects')
      .subscribe({
        next: (projects: any) => {
          this.stats.projects = Array.isArray(projects) ? projects.length : 0;
          this.cdr.detectChanges();
          checkComplete();
        },
        error: (error) => {
          console.error('Error loading projects:', error);
          this.stats.projects = 0;
          checkComplete();
        }
      });

    // Load experience count (public endpoint)
    this.http.get('http://localhost:3000/api/portfolio/experience')
      .subscribe({
        next: (experience: any) => {
          this.stats.experience = Array.isArray(experience) ? experience.length : 0;
          this.cdr.detectChanges();
          checkComplete();
        },
        error: (error) => {
          console.error('Error loading experience:', error);
          this.stats.experience = 0;
          checkComplete();
        }
      });

    // Load blogs count (public endpoint)
    this.http.get('http://localhost:3000/api/blog')
      .subscribe({
        next: (response: any) => {
          this.stats.blogs = response.blogs?.length || 0;
          this.cdr.detectChanges();
          checkComplete();
        },
        error: (error) => {
          console.error('Error loading blogs:', error);
          this.stats.blogs = 0;
          checkComplete();
        }
      });

    // Load services count (public endpoint)
    this.http.get('http://localhost:3000/api/portfolio/services')
      .subscribe({
        next: (response: any) => {
          this.stats.services = Array.isArray(response) ? response.length : 0;
          this.cdr.detectChanges();
          checkComplete();
        },
        error: (error) => {
          console.error('Error loading services:', error);
          this.stats.services = 0;
          checkComplete();
        }
      });
  }

  navigateToSection(section: string) {
    switch (section) {
      case 'skills':
        this.router.navigate(['/admin/skills']);
        break;
      case 'projects':
        this.router.navigate(['/admin/projects']);
        break;
      case 'blog':
        this.router.navigate(['/admin/blog']);
        break;
      case 'experience':
        this.router.navigate(['/admin/experience']);
        break;
      case 'services':
        this.router.navigate(['/admin/services']);
        break;
      case 'contact':
        // TODO: Implement contact management
        alert('Contact management coming soon!');
        break;
      case 'profile':
        // TODO: Implement profile management
        alert('Profile management coming soon!');
        break;
      default:
        console.log(`Navigate to ${section} management`);
    }
  }

  viewPortfolio() {
    window.open('/', '_blank');
  }
}
