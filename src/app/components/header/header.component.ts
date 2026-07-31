import { Component, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IconComponent } from '../ui/icon.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, IconComponent],
  template: `
    <header
      class="fixed top-0 inset-x-0 z-50 transition-all duration-300 border-b backdrop-blur-xl"
      [ngClass]="isScrolled()
        ? 'bg-canvas/90 border-line'
        : 'bg-canvas/60 border-transparent'">
      <nav class="mx-auto max-w-shell px-6">
        <div class="flex items-center justify-between h-16">
          <!-- Wordmark -->
          <a routerLink="/" class="font-display text-lg font-bold tracking-tight text-ink">
            Sanket Jagtap<span class="text-accent">.</span>
          </a>

          <!-- Desktop nav -->
          <div class="hidden md:flex items-center gap-1">
            <a *ngFor="let l of links" [routerLink]="l.path"
               routerLinkActive="text-ink after:scale-x-100"
               [routerLinkActiveOptions]="{exact: l.path === '/'}"
               class="relative px-3 py-2 text-sm font-medium text-muted hover:text-ink transition-colors
                      after:absolute after:left-3 after:right-3 after:-bottom-0.5 after:h-px after:bg-accent
                      after:origin-left after:scale-x-0 after:transition-transform after:duration-300">
              {{ l.label }}
            </a>
            <a routerLink="/contact"
               class="ml-3 inline-flex items-center gap-1.5 rounded-full bg-accent px-5 py-2 text-sm font-semibold text-accent-ink transition-all hover:brightness-95 hover:-translate-y-0.5">
              Let's Talk <app-icon name="arrow-up-right" [size]="15"></app-icon>
            </a>
          </div>

          <!-- Mobile toggle -->
          <button (click)="toggleMenu()"
                  class="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg border border-line text-ink hover:bg-white/5"
                  [attr.aria-expanded]="isMenuOpen()" aria-label="Toggle menu">
            <app-icon [name]="isMenuOpen() ? 'x' : 'menu'" [size]="20"></app-icon>
          </button>
        </div>

        <!-- Mobile nav -->
        <div class="md:hidden overflow-hidden transition-all duration-300"
             [class.max-h-0]="!isMenuOpen()" [class.max-h-96]="isMenuOpen()">
          <div class="flex flex-col gap-1 py-3 border-t border-line">
            <a *ngFor="let l of links" [routerLink]="l.path"
               routerLinkActive="text-ink bg-white/5"
               [routerLinkActiveOptions]="{exact: l.path === '/'}"
               (click)="closeMenu()"
               class="rounded-lg px-3 py-2.5 text-sm font-medium text-muted hover:text-ink hover:bg-white/5 transition-colors">
              {{ l.label }}
            </a>
            <a routerLink="/contact" (click)="closeMenu()"
               class="mt-1 inline-flex items-center justify-center gap-1.5 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-ink">
              Let's Talk <app-icon name="arrow-up-right" [size]="15"></app-icon>
            </a>
          </div>
        </div>
      </nav>
    </header>
  `,
  styles: [],
})
export class HeaderComponent {
  isScrolled = signal(false);
  isMenuOpen = signal(false);

  links = [
    { label: 'Home', path: '/' },
    { label: 'Skills', path: '/skills' },
    { label: 'Experience', path: '/experience' },
    { label: 'Projects', path: '/projects' },
    { label: 'Services', path: '/services' },
    { label: 'Blog', path: '/blog' },
    { label: 'Contact', path: '/contact' },
  ];

  @HostListener('window:scroll')
  onWindowScroll() {
    this.isScrolled.set(window.scrollY > 50);
  }

  toggleMenu() {
    this.isMenuOpen.set(!this.isMenuOpen());
  }

  closeMenu() {
    this.isMenuOpen.set(false);
  }
}
