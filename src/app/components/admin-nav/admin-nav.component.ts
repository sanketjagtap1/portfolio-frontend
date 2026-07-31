import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { IconComponent } from '../ui/icon.component';

interface NavLink {
  label: string;
  path: string;
  icon: string;
}

@Component({
  selector: 'app-admin-nav',
  standalone: true,
  imports: [CommonModule, RouterModule, IconComponent],
  template: `
    <nav class="sticky top-0 z-50 border-b border-line bg-canvas/85 backdrop-blur-xl">
      <div class="mx-auto max-w-shell px-4 md:px-6">
        <div class="flex h-16 items-center justify-between gap-4">
          <!-- Brand -->
          <a routerLink="/admin/dashboard" class="flex items-center gap-2.5 shrink-0">
            <span class="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-ink">
              <app-icon name="layout-dashboard" [size]="18"></app-icon>
            </span>
            <span class="hidden sm:block leading-tight">
              <span class="block font-display text-sm font-semibold text-ink">Admin</span>
              <span class="block font-mono text-[10px] uppercase tracking-[0.18em] text-faint">Portfolio</span>
            </span>
          </a>

          <!-- Desktop links -->
          <div class="hidden lg:flex items-center gap-1 flex-1 justify-center">
            <a
              *ngFor="let link of links"
              [routerLink]="link.path"
              routerLinkActive="nav-active"
              class="nav-link flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-white/[0.04] hover:text-ink"
            >
              <app-icon [name]="link.icon" [size]="16"></app-icon>
              {{ link.label }}
            </a>
          </div>

          <!-- Right actions -->
          <div class="flex items-center gap-2 shrink-0">
            <a
              href="/"
              target="_blank"
              rel="noopener"
              class="hidden md:inline-flex items-center gap-2 rounded-lg border border-line px-3 py-2 text-sm font-medium text-muted transition-colors hover:border-ink/30 hover:text-ink"
            >
              <app-icon name="external-link" [size]="15"></app-icon>
              View site
            </a>

            <div class="hidden md:block text-right leading-tight mr-1">
              <p class="text-sm font-medium text-ink">{{ user?.name || 'Admin' }}</p>
              <p class="font-mono text-[10px] uppercase tracking-[0.15em] text-faint">{{ user?.role || 'admin' }}</p>
            </div>

            <button
              (click)="logout()"
              class="inline-flex items-center gap-2 rounded-lg border border-red-500/25 bg-red-500/10 px-3 py-2 text-sm font-medium text-red-300 transition-colors hover:bg-red-500/20"
            >
              <app-icon name="log-out" [size]="15"></app-icon>
              <span class="hidden sm:inline">Logout</span>
            </button>

            <button
              (click)="toggleMobileMenu()"
              [attr.aria-label]="showMobileMenu ? 'Close menu' : 'Open menu'"
              class="lg:hidden flex h-9 w-9 items-center justify-center rounded-lg border border-line text-ink transition-colors hover:bg-white/[0.05]"
            >
              <app-icon [name]="showMobileMenu ? 'x' : 'menu'" [size]="18"></app-icon>
            </button>
          </div>
        </div>

        <!-- Mobile menu -->
        <div *ngIf="showMobileMenu" class="lg:hidden border-t border-line py-3">
          <div class="grid grid-cols-2 gap-1.5">
            <a
              *ngFor="let link of links"
              [routerLink]="link.path"
              routerLinkActive="nav-active"
              (click)="closeMobileMenu()"
              class="nav-link flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium text-muted transition-colors hover:bg-white/[0.04] hover:text-ink"
            >
              <app-icon [name]="link.icon" [size]="16"></app-icon>
              {{ link.label }}
            </a>
          </div>
          <a
            href="/"
            target="_blank"
            rel="noopener"
            class="mt-2 flex items-center gap-2.5 rounded-lg border border-line px-3 py-2.5 text-sm font-medium text-muted transition-colors hover:text-ink"
          >
            <app-icon name="external-link" [size]="16"></app-icon>
            View portfolio site
          </a>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    .nav-active {
      background-color: rgba(190, 242, 100, 0.12);
      color: var(--ink);
    }
    .nav-active :is(svg) { color: var(--accent); }
  `]
})
export class AdminNavComponent implements OnInit {
  showMobileMenu = false;
  user: any = null;

  links: NavLink[] = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: 'layout-dashboard' },
    { label: 'Skills', path: '/admin/skills', icon: 'award' },
    { label: 'Projects', path: '/admin/projects', icon: 'folder' },
    { label: 'Experience', path: '/admin/experience', icon: 'briefcase' },
    { label: 'Blog', path: '/admin/blog', icon: 'file-text' },
    { label: 'Services', path: '/admin/services', icon: 'grid' },
    { label: 'Testimonials', path: '/admin/testimonials', icon: 'message-square' },
    { label: 'Leads', path: '/admin/messages', icon: 'inbox' },
  ];

  constructor(private router: Router) {}

  ngOnInit() {
    this.loadUser();
  }

  loadUser() {
    if (typeof localStorage === 'undefined') return;
    const userStr = localStorage.getItem('admin_user');
    if (userStr) {
      try { this.user = JSON.parse(userStr); } catch { this.user = null; }
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
