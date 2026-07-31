import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AdminNavComponent } from '../admin-nav/admin-nav.component';
import { IconComponent } from '../ui/icon.component';
import { environment } from '../../../environments/environment';

interface AdminUser {
  id: number;
  username: string;
  email: string;
  name: string;
  role: string;
}

interface StatCard {
  key: 'skills' | 'projects' | 'experience' | 'blogs' | 'services';
  label: string;
  hint: string;
  icon: string;
  section: string;
}

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, AdminNavComponent, IconComponent],
  template: `
    <div class="min-h-screen bg-canvas text-ink">
      <app-admin-nav></app-admin-nav>

      <main class="mx-auto max-w-shell px-4 md:px-6 py-8 md:py-10">
        <!-- Header -->
        <div class="mb-8">
          <span class="kicker mb-3">Overview</span>
          <h1 class="font-display text-3xl md:text-4xl font-semibold text-ink mt-3">
            Welcome back{{ user?.name ? ', ' + firstName : '' }}
          </h1>
          <p class="text-muted mt-2">Monitor and manage your portfolio content.</p>
        </div>

        <!-- Stats grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-10">
          <button
            *ngFor="let c of cards"
            (click)="navigateToSection(c.section)"
            class="card group text-left hover:border-ink/25 hover:-translate-y-0.5 transition-all"
          >
            <div class="flex items-start justify-between">
              <span class="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <app-icon [name]="c.icon" [size]="20"></app-icon>
              </span>
              <app-icon name="arrow-up-right" [size]="18" class="text-faint transition-colors group-hover:text-ink"></app-icon>
            </div>
            <p class="mt-4 font-display text-3xl font-semibold text-ink tabular-nums">
              <span *ngIf="isLoading" class="text-faint animate-pulse">—</span>
              <span *ngIf="!isLoading">{{ stats[c.key] || 0 }}</span>
            </p>
            <p class="text-sm font-medium text-ink mt-0.5">{{ c.label }}</p>
            <p class="text-xs text-faint mt-0.5">{{ c.hint }}</p>
          </button>
        </div>

        <!-- Quick actions -->
        <div class="card">
          <h2 class="font-display text-lg font-semibold text-ink mb-4">Quick actions</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
            <a
              routerLink="/admin/messages"
              class="flex items-center gap-3 rounded-xl border border-line bg-white/[0.02] p-4 transition-colors hover:border-ink/25 hover:bg-white/[0.04]"
            >
              <span class="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
                <app-icon name="inbox" [size]="18"></app-icon>
              </span>
              <span>
                <span class="block text-sm font-medium text-ink">View leads</span>
                <span class="block text-xs text-faint">Contact-form enquiries</span>
              </span>
            </a>

            <button
              (click)="viewPortfolio()"
              class="flex items-center gap-3 rounded-xl border border-line bg-white/[0.02] p-4 text-left transition-colors hover:border-ink/25 hover:bg-white/[0.04]"
            >
              <span class="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
                <app-icon name="external-link" [size]="18"></app-icon>
              </span>
              <span>
                <span class="block text-sm font-medium text-ink">View portfolio</span>
                <span class="block text-xs text-faint">Preview the public site</span>
              </span>
            </button>

            <a
              routerLink="/admin/projects"
              class="flex items-center gap-3 rounded-xl border border-line bg-white/[0.02] p-4 transition-colors hover:border-ink/25 hover:bg-white/[0.04]"
            >
              <span class="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
                <app-icon name="plus" [size]="18"></app-icon>
              </span>
              <span>
                <span class="block text-sm font-medium text-ink">Add a project</span>
                <span class="block text-xs text-faint">Showcase new work</span>
              </span>
            </a>
          </div>
        </div>
      </main>
    </div>
  `,
  styles: []
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

  cards: StatCard[] = [
    { key: 'skills', label: 'Skills', hint: 'Technical expertise', icon: 'award', section: 'skills' },
    { key: 'projects', label: 'Projects', hint: 'Portfolio showcases', icon: 'folder', section: 'projects' },
    { key: 'experience', label: 'Experience', hint: 'Professional journey', icon: 'briefcase', section: 'experience' },
    { key: 'blogs', label: 'Blog posts', hint: 'Published articles', icon: 'file-text', section: 'blog' },
    { key: 'services', label: 'Services', hint: 'Service offerings', icon: 'grid', section: 'services' },
  ];

  constructor(private http: HttpClient, private router: Router, private cdr: ChangeDetectorRef) {}

  get firstName(): string {
    return (this.user?.name || '').split(' ')[0];
  }

  ngOnInit() {
    this.loadUser();
    this.loadStats();
  }

  loadUser() {
    if (typeof localStorage === 'undefined') return;
    const userStr = localStorage.getItem('admin_user');
    if (userStr) {
      try { this.user = JSON.parse(userStr); } catch { this.user = null; }
    }
  }

  loadStats() {
    this.isLoading = true;

    let completedRequests = 0;
    const totalRequests = 5;

    const fallbackTimeout = setTimeout(() => {
      if (this.isLoading) {
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    }, 10000);

    const checkComplete = () => {
      completedRequests++;
      if (completedRequests === totalRequests) {
        clearTimeout(fallbackTimeout);
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    };

    const base = `${environment.apiBaseUrl}/api`;

    this.http.get(`${base}/portfolio/skills`).subscribe({
      next: (r: any) => { this.stats.skills = Array.isArray(r) ? r.length : 0; this.cdr.detectChanges(); checkComplete(); },
      error: () => { this.stats.skills = 0; checkComplete(); }
    });

    this.http.get(`${base}/portfolio/projects`).subscribe({
      next: (r: any) => { this.stats.projects = Array.isArray(r) ? r.length : 0; this.cdr.detectChanges(); checkComplete(); },
      error: () => { this.stats.projects = 0; checkComplete(); }
    });

    this.http.get(`${base}/portfolio/experience`).subscribe({
      next: (r: any) => { this.stats.experience = Array.isArray(r) ? r.length : 0; this.cdr.detectChanges(); checkComplete(); },
      error: () => { this.stats.experience = 0; checkComplete(); }
    });

    this.http.get(`${base}/blog`).subscribe({
      next: (r: any) => { this.stats.blogs = r.blogs?.length || 0; this.cdr.detectChanges(); checkComplete(); },
      error: () => { this.stats.blogs = 0; checkComplete(); }
    });

    this.http.get(`${base}/portfolio/services`).subscribe({
      next: (r: any) => { this.stats.services = Array.isArray(r) ? r.length : 0; this.cdr.detectChanges(); checkComplete(); },
      error: () => { this.stats.services = 0; checkComplete(); }
    });
  }

  navigateToSection(section: string) {
    const known = ['skills', 'projects', 'blog', 'experience', 'services', 'testimonials', 'messages'];
    if (known.includes(section)) {
      this.router.navigate([`/admin/${section}`]);
    }
  }

  viewPortfolio() {
    window.open('/', '_blank');
  }
}
