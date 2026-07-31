import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IconComponent } from '../ui/icon.component';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, RouterModule, IconComponent],
  template: `
    <section id="home" class="relative min-h-screen flex flex-col justify-center overflow-hidden pt-16">
      <!-- Background: single disciplined lime glow + faded dotted grid + vignette -->
      <div class="pointer-events-none absolute inset-0" aria-hidden="true">
        <div class="glow"></div>
        <div class="grid-dots absolute inset-0"></div>
        <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(10,10,11,0.85)_100%)]"></div>
      </div>

      <div class="relative z-10 mx-auto max-w-shell w-full px-6 py-20">
        <!-- Eyebrow -->
        <div class="reveal flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs uppercase tracking-[0.2em] text-faint">
          <span class="inline-flex items-center gap-2 text-accent">
            <span class="relative flex h-2 w-2">
              <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60"></span>
              <span class="relative inline-flex h-2 w-2 rounded-full bg-accent"></span>
            </span>
            Available for new projects
          </span>
          <span class="hidden sm:inline text-line">/</span>
          <span class="hidden sm:inline">Sanket Jagtap — Pune, India</span>
        </div>

        <!-- Headline -->
        <h1 class="reveal reveal-1 mt-7 font-display font-semibold leading-[0.95] tracking-tightest text-ink
                   text-5xl sm:text-6xl lg:text-7xl xl:text-[5.5rem] max-w-4xl">
          I design &amp; build
          <span class="relative whitespace-nowrap text-accent">
            products
            <svg class="absolute -bottom-2 left-0 w-full" height="10" viewBox="0 0 300 10" preserveAspectRatio="none" aria-hidden="true">
              <path d="M2 7 C 80 2, 220 2, 298 7" stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round"/>
            </svg>
          </span>
          for the web &amp; beyond.
        </h1>

        <!-- Sub -->
        <p class="reveal reveal-2 mt-8 max-w-xl text-base sm:text-lg leading-relaxed text-muted">
          Full-stack developer with 4+ years helping startups and businesses ship fast,
          reliable web &amp; mobile apps — from Angular &amp; React front-ends to Node.js APIs
          and Flutter. Clear communication, honest timelines, code built to last.
        </p>

        <!-- CTAs -->
        <div class="reveal reveal-3 mt-10 flex flex-wrap items-center gap-3">
          <a routerLink="/contact" class="group btn-primary">
            Start a project
            <app-icon name="arrow-up-right" [size]="17"></app-icon>
          </a>
          <a routerLink="/projects" class="btn-ghost">
            View my work
          </a>
          <a href="/resume.pdf" target="_blank" rel="noopener" class="btn-ghost" aria-label="Download résumé (PDF)">
            <app-icon name="download" [size]="16"></app-icon>
            Résumé
          </a>

          <!-- Socials -->
          <div class="ml-1 flex items-center gap-2 sm:ml-4">
            <a *ngFor="let s of socials" [href]="s.href" [attr.target]="s.blank ? '_blank' : null"
               rel="noopener noreferrer" [attr.aria-label]="s.label"
               class="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-muted transition-all hover:text-ink hover:border-ink/40 hover:-translate-y-0.5">
              <app-icon [name]="s.icon" [size]="18"></app-icon>
            </a>
          </div>
        </div>
      </div>

      <!-- Scrolling tech band -->
      <div class="relative z-10 border-y border-line bg-white/[0.015] py-4 overflow-hidden">
        <div class="flex w-max animate-marquee gap-8 font-mono text-sm text-faint whitespace-nowrap">
          <span *ngFor="let t of loop" class="inline-flex items-center gap-8">
            <span class="text-muted">{{ t }}</span>
            <span class="text-accent/60">◆</span>
          </span>
        </div>
      </div>
    </section>
  `,
  styles: [`
    :host { display: block; }

    .glow {
      position: absolute;
      top: -12rem; right: -8rem;
      width: 46rem; height: 46rem;
      border-radius: 9999px;
      background: radial-gradient(circle at center, rgba(190,242,100,0.14), transparent 68%);
      filter: blur(30px);
      will-change: transform;
      animation: drift 20s ease-in-out infinite;
    }
    @keyframes drift {
      0%, 100% { transform: translate3d(0,0,0) scale(1); }
      50% { transform: translate3d(-30px, 24px, 0) scale(1.08); }
    }

    .grid-dots {
      background-image: radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px);
      background-size: 30px 30px;
      -webkit-mask-image: radial-gradient(ellipse at 60% 40%, black 20%, transparent 72%);
      mask-image: radial-gradient(ellipse at 60% 40%, black 20%, transparent 72%);
    }

    .reveal {
      opacity: 0; transform: translateY(18px);
      animation: reveal 0.75s cubic-bezier(0.22,1,0.36,1) forwards;
    }
    .reveal-1 { animation-delay: 0.08s; }
    .reveal-2 { animation-delay: 0.18s; }
    .reveal-3 { animation-delay: 0.28s; }
    @keyframes reveal { to { opacity: 1; transform: translateY(0); } }

    @media (prefers-reduced-motion: reduce) {
      .glow { animation: none; }
      .reveal { animation: none; opacity: 1; transform: none; }
      .animate-marquee { animation: none; }
    }
  `],
})
export class HeroComponent {
  socials = [
    { icon: 'github', label: 'GitHub', href: 'https://github.com/sanketjagtap1', blank: true },
    { icon: 'linkedin', label: 'LinkedIn', href: 'https://linkedin.com/in/sanket-jagtap', blank: true },
    { icon: 'mail', label: 'Email', href: 'mailto:contact@sanket-jagtap.in', blank: false },
  ];

  private tech = ['Angular', 'React', 'Node.js', 'TypeScript', 'Flutter', 'MySQL', 'PostgreSQL', 'Docker', 'AWS', 'Redis'];
  // Duplicated so the marquee can loop seamlessly (translateX -50%).
  loop = [...this.tech, ...this.tech];
}
