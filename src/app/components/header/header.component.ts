import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header class="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-white/10 shadow-lg">
      <nav class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <!-- Logo -->
          <div class="flex-shrink-0">
            <a routerLink="/" class="text-2xl font-bold bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Sanket Jagtap
            </a>
          </div>
          
          <!-- Desktop Navigation -->
          <div class="hidden md:block">
            <div class="ml-10 flex items-baseline space-x-8">
              <a routerLink="/" routerLinkActive="text-blue-400" [routerLinkActiveOptions]="{exact: true}" class="text-blue-200 hover:text-blue-300 px-3 py-2 text-sm font-medium transition-colors duration-200">Home</a>
              <a routerLink="/skills" routerLinkActive="text-blue-400" class="text-blue-200 hover:text-blue-300 px-3 py-2 text-sm font-medium transition-colors duration-200">Skills</a>
              <a routerLink="/experience" routerLinkActive="text-blue-400" class="text-blue-200 hover:text-blue-300 px-3 py-2 text-sm font-medium transition-colors duration-200">Experience</a>
              <a routerLink="/projects" routerLinkActive="text-blue-400" class="text-blue-200 hover:text-blue-300 px-3 py-2 text-sm font-medium transition-colors duration-200">Projects</a>
              <a routerLink="/contact" routerLinkActive="text-blue-400" class="text-blue-200 hover:text-blue-300 px-3 py-2 text-sm font-medium transition-colors duration-200">Contact</a>
              <a routerLink="/contact" class="ml-4 px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-sm font-semibold rounded-lg hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                Let's Talk
              </a>
            </div>
          </div>
          
          <!-- Mobile menu button -->
          <div class="md:hidden">
            <button 
              (click)="toggleMenu()"
              class="inline-flex items-center justify-center p-2 rounded-md text-blue-200 hover:text-blue-300 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-expanded="false"
            >
              <span class="sr-only">Open main menu</span>
              <!-- Hamburger icon -->
              <svg class="block h-6 w-6" [class.hidden]="isMenuOpen()" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <!-- Close icon -->
              <svg class="hidden h-6 w-6" [class.block]="isMenuOpen()" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        
        <!-- Mobile Navigation -->
        <div class="md:hidden" [class.hidden]="!isMenuOpen()">
          <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-slate-800/95 backdrop-blur-xl border-t border-white/10">
            <a routerLink="/" routerLinkActive="text-blue-400" [routerLinkActiveOptions]="{exact: true}" (click)="closeMenu()" class="text-blue-200 hover:text-blue-300 block px-3 py-2 text-base font-medium transition-colors duration-200">Home</a>
            <a routerLink="/skills" routerLinkActive="text-blue-400" (click)="closeMenu()" class="text-blue-200 hover:text-blue-300 block px-3 py-2 text-base font-medium transition-colors duration-200">Skills</a>
            <a routerLink="/experience" routerLinkActive="text-blue-400" (click)="closeMenu()" class="text-blue-200 hover:text-blue-300 block px-3 py-2 text-base font-medium transition-colors duration-200">Experience</a>
            <a routerLink="/projects" routerLinkActive="text-blue-400" (click)="closeMenu()" class="text-blue-200 hover:text-blue-300 block px-3 py-2 text-base font-medium transition-colors duration-200">Projects</a>
            <a routerLink="/contact" routerLinkActive="text-blue-400" (click)="closeMenu()" class="text-blue-200 hover:text-blue-300 block px-3 py-2 text-base font-medium transition-colors duration-200">Contact</a>
          </div>
        </div>
      </nav>
    </header>
  `,
  styles: []
})
export class HeaderComponent implements OnInit {
  isScrolled = signal(false);
  isMenuOpen = signal(false);

  ngOnInit() {
    window.addEventListener('scroll', () => {
      this.isScrolled.set(window.scrollY > 50);
    });
  }

  toggleMenu() {
    this.isMenuOpen.set(!this.isMenuOpen());
  }

  closeMenu() {
    this.isMenuOpen.set(false);
  }
}
