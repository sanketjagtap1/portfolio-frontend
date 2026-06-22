import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <section
      id="home"
      class="relative min-h-screen flex items-center overflow-hidden bg-slate-950 text-white"
    >
      <!-- Layered, GPU-cheap background (transform/opacity only) -->
      <div class="hero-bg pointer-events-none absolute inset-0" aria-hidden="true">
        <!-- Soft aurora blobs -->
        <div class="aurora aurora--blue"></div>
        <div class="aurora aurora--cyan"></div>
        <!-- Subtle dotted grid, masked to fade out -->
        <div class="hero-grid absolute inset-0"></div>
        <!-- Vignette for depth -->
        <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(2,6,23,0.7)_100%)]"></div>
      </div>

      <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-24">
        <div class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <!-- Content -->
          <div class="text-center lg:text-left">
            <div class="reveal inline-flex items-center px-4 py-1.5 rounded-full bg-white/5 text-slate-200 text-sm font-medium mb-6 border border-white/10 backdrop-blur-sm">
              <span class="relative flex h-2 w-2 mr-2.5">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
              </span>
              Available for new opportunities
            </div>

            <h1 class="reveal reveal-1 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight mb-5">
              Hi, I'm
              <span class="bg-gradient-to-r from-sky-400 via-blue-400 to-cyan-300 bg-clip-text text-transparent">Sanket</span>
            </h1>

            <h2 class="reveal reveal-2 text-xl sm:text-2xl md:text-3xl font-semibold text-slate-300 mb-6">
              Full Stack Developer
            </h2>

            <p class="reveal reveal-3 text-base sm:text-lg text-slate-400 mb-9 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              I build scalable, accessible web applications with Angular, Node.js, and
              modern cloud tooling — focused on clean architecture and great user experience.
            </p>

            <div class="reveal reveal-4 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                routerLink="/projects"
                class="group inline-flex items-center justify-center px-7 py-3.5 bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold rounded-xl shadow-lg shadow-blue-900/40 transition-transform duration-300 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
              >
                View My Work
                <svg class="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 17L17 7M17 7H7M17 7V17"/>
                </svg>
              </a>
              <a
                routerLink="/contact"
                class="group inline-flex items-center justify-center px-7 py-3.5 bg-white/5 backdrop-blur-sm text-white font-semibold rounded-xl border border-white/10 transition-colors duration-300 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
              >
                Get In Touch
                <svg class="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                </svg>
              </a>
            </div>

            <!-- Social Links -->
            <div class="reveal reveal-5 flex justify-center lg:justify-start gap-3 mt-10">
              <a href="https://linkedin.com/in/sanket-jagtap" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile"
                 class="w-11 h-11 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-slate-300 transition-all duration-300 hover:text-white hover:bg-white/10 hover:-translate-y-0.5">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="mailto:sanketjagtap479@gmail.com" aria-label="Send email"
                 class="w-11 h-11 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-slate-300 transition-all duration-300 hover:text-white hover:bg-white/10 hover:-translate-y-0.5">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
              </a>
              <a href="tel:8806328987" aria-label="Call"
                 class="w-11 h-11 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-slate-300 transition-all duration-300 hover:text-white hover:bg-white/10 hover:-translate-y-0.5">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
              </a>
            </div>
          </div>

          <!-- Visual -->
          <div class="reveal reveal-3 relative hidden lg:block">
            <div class="relative mx-auto w-80 h-80 xl:w-96 xl:h-96">
              <!-- Glow ring -->
              <div class="absolute inset-0 rounded-full bg-gradient-to-br from-sky-500/30 to-cyan-400/20 blur-2xl"></div>
              <!-- Rotating conic ring -->
              <div class="absolute -inset-4 rounded-full ring-glow"></div>
              <!-- Card -->
              <div class="absolute inset-0 rounded-full bg-white/[0.03] backdrop-blur-sm border border-white/10 flex items-center justify-center shadow-2xl">
                <div class="text-center">
                  <div class="w-28 h-28 mx-auto mb-5 rounded-full bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-900/50">
                    <span class="text-white text-4xl font-bold tracking-wide">SJ</span>
                  </div>
                  <h3 class="text-xl font-semibold text-white">Sanket Jagtap</h3>
                  <p class="text-sm text-slate-400 mt-1">Full Stack Developer</p>
                </div>
              </div>
              <!-- Floating tech chips -->
              <div class="float-chip absolute -top-2 -right-2 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-white/10 text-sm backdrop-blur-sm shadow-lg">⚡ Angular</div>
              <div class="float-chip float-chip--delay absolute -bottom-2 -left-2 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-white/10 text-sm backdrop-blur-sm shadow-lg">🚀 Node.js</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Scroll indicator -->
      <a href="#about" aria-label="Scroll to content"
         class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center text-slate-400 hover:text-white transition-colors duration-300">
        <span class="text-xs mb-2 tracking-wide uppercase">Scroll</span>
        <svg class="w-5 h-5 scroll-bob" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
        </svg>
      </a>
    </section>
  `,
  styles: [`
    :host { display: block; }

    /* ---- Aurora blobs ---- */
    .aurora {
      position: absolute;
      border-radius: 9999px;
      filter: blur(90px);
      opacity: 0.5;
      will-change: transform;
    }
    .aurora--blue {
      width: 38rem; height: 38rem;
      top: -8rem; left: -6rem;
      background: radial-gradient(circle at center, rgba(56,189,248,0.55), transparent 70%);
      animation: drift-a 18s ease-in-out infinite;
    }
    .aurora--cyan {
      width: 32rem; height: 32rem;
      bottom: -10rem; right: -6rem;
      background: radial-gradient(circle at center, rgba(34,211,238,0.45), transparent 70%);
      animation: drift-b 22s ease-in-out infinite;
    }

    @keyframes drift-a {
      0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
      50% { transform: translate3d(40px, 30px, 0) scale(1.08); }
    }
    @keyframes drift-b {
      0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
      50% { transform: translate3d(-35px, -25px, 0) scale(1.1); }
    }

    /* ---- Dotted grid (pure CSS, zero DOM nodes) ---- */
    .hero-grid {
      background-image: radial-gradient(rgba(148,163,184,0.18) 1px, transparent 1px);
      background-size: 28px 28px;
      -webkit-mask-image: radial-gradient(ellipse at center, black 35%, transparent 75%);
      mask-image: radial-gradient(ellipse at center, black 35%, transparent 75%);
    }

    /* ---- Rotating conic ring around the avatar ---- */
    .ring-glow {
      background: conic-gradient(from 0deg, transparent 0 55%, rgba(56,189,248,0.5) 75%, rgba(34,211,238,0.6) 90%, transparent 100%);
      -webkit-mask: radial-gradient(farthest-side, transparent calc(100% - 3px), black calc(100% - 2px));
      mask: radial-gradient(farthest-side, transparent calc(100% - 3px), black calc(100% - 2px));
      animation: spin 9s linear infinite;
      will-change: transform;
    }
    @keyframes spin { to { transform: rotate(360deg); } }

    /* ---- Floating chips ---- */
    .float-chip { animation: float-chip 6s ease-in-out infinite; }
    .float-chip--delay { animation-delay: 2.5s; }
    @keyframes float-chip {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }

    /* ---- Scroll indicator bob ---- */
    .scroll-bob { animation: bob 1.8s ease-in-out infinite; }
    @keyframes bob {
      0%, 100% { transform: translateY(0); opacity: 0.7; }
      50% { transform: translateY(5px); opacity: 1; }
    }

    /* ---- Staggered entrance ---- */
    .reveal {
      opacity: 0;
      transform: translateY(16px);
      animation: reveal 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
    }
    .reveal-1 { animation-delay: 0.08s; }
    .reveal-2 { animation-delay: 0.16s; }
    .reveal-3 { animation-delay: 0.24s; }
    .reveal-4 { animation-delay: 0.32s; }
    .reveal-5 { animation-delay: 0.40s; }
    @keyframes reveal {
      to { opacity: 1; transform: translateY(0); }
    }

    /* ---- Respect users who prefer less motion ---- */
    @media (prefers-reduced-motion: reduce) {
      .aurora, .ring-glow, .float-chip, .scroll-bob { animation: none; }
      .reveal {
        animation: none;
        opacity: 1;
        transform: none;
      }
    }
  `]
})
export class HeroComponent {}
