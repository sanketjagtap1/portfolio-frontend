import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IconComponent } from '../ui/icon.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule, IconComponent],
  template: `
    <footer class="border-t border-line bg-canvas">
      <div class="mx-auto max-w-shell px-6 py-16">
        <!-- Big CTA line -->
        <div class="flex flex-col gap-6 border-b border-line pb-12 md:flex-row md:items-end md:justify-between">
          <div>
            <p class="kicker mb-4">Let's build something</p>
            <h2 class="font-display text-3xl md:text-5xl font-semibold tracking-tightest text-ink max-w-lg leading-tight">
              Have a project in mind?
            </h2>
          </div>
          <a routerLink="/contact" class="btn-primary self-start md:self-auto">
            Start a conversation
            <app-icon name="arrow-up-right" [size]="17"></app-icon>
          </a>
        </div>

        <!-- Link columns -->
        <div class="grid grid-cols-2 gap-8 py-12 md:grid-cols-4">
          <div class="col-span-2 md:col-span-1">
            <a routerLink="/" class="font-display text-lg font-bold text-ink">Sanket Jagtap<span class="text-accent">.</span></a>
            <p class="mt-2 text-sm text-muted">Full-stack developer building fast, reliable web &amp; mobile products.</p>
            <div class="mt-4 flex gap-2">
              <a *ngFor="let s of socials" [href]="s.href" [attr.target]="s.blank ? '_blank' : null"
                 rel="noopener noreferrer" [attr.aria-label]="s.label"
                 class="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-muted transition-all hover:text-ink hover:border-ink/40">
                <app-icon [name]="s.icon" [size]="17"></app-icon>
              </a>
            </div>
          </div>

          <div>
            <h4 class="font-mono text-xs uppercase tracking-[0.15em] text-faint">Navigation</h4>
            <ul class="mt-4 space-y-2.5 text-sm">
              <li *ngFor="let l of nav"><a [routerLink]="l.path" class="text-muted hover:text-ink transition-colors">{{ l.label }}</a></li>
            </ul>
          </div>

          <div>
            <h4 class="font-mono text-xs uppercase tracking-[0.15em] text-faint">Services</h4>
            <ul class="mt-4 space-y-2.5 text-sm text-muted">
              <li *ngFor="let s of services">{{ s }}</li>
            </ul>
          </div>

          <div>
            <h4 class="font-mono text-xs uppercase tracking-[0.15em] text-faint">Stack</h4>
            <ul class="mt-4 space-y-2.5 text-sm text-muted">
              <li *ngFor="let t of stack">{{ t }}</li>
            </ul>
          </div>
        </div>

        <!-- Bottom bar -->
        <div class="flex flex-col items-center justify-between gap-3 border-t border-line pt-8 text-sm text-faint sm:flex-row">
          <p>© {{ currentYear }} Sanket Jagtap. All rights reserved.</p>
          <p class="font-mono text-xs">Angular · Node.js · TypeScript</p>
        </div>
      </div>
    </footer>
  `,
  styles: [],
})
export class FooterComponent {
  currentYear = 2026;

  socials = [
    { icon: 'github', label: 'GitHub', href: 'https://github.com/sanketjagtap1', blank: true },
    { icon: 'linkedin', label: 'LinkedIn', href: 'https://linkedin.com/in/sanket-jagtap', blank: true },
    { icon: 'mail', label: 'Email', href: 'mailto:contact@sanket-jagtap.in', blank: false },
  ];
  nav = [
    { label: 'Home', path: '/' },
    { label: 'Skills', path: '/skills' },
    { label: 'Experience', path: '/experience' },
    { label: 'Projects', path: '/projects' },
    { label: 'Services', path: '/services' },
    { label: 'Blog', path: '/blog' },
    { label: 'Contact', path: '/contact' },
  ];
  services = ['Web Development', 'Mobile Development', 'API Development', 'Cloud & DevOps'];
  stack = ['Angular', 'React', 'Node.js', 'Flutter', 'PostgreSQL'];
}
