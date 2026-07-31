import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../ui/icon.component';
import { BrandIconComponent } from '../ui/brand-icon.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, IconComponent, BrandIconComponent],
  template: `
    <section id="about" class="section">
      <div class="mx-auto max-w-shell px-6">
        <!-- Heading -->
        <div class="max-w-2xl" data-aos="fade-up">
          <p class="kicker">01 — About</p>
          <h2 class="mt-4 font-display text-3xl md:text-5xl font-semibold tracking-tightest text-ink leading-tight">
            Full-stack development, delivered end to end.
          </h2>
        </div>

        <div class="mt-14 grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-start">
          <!-- Narrative -->
          <div data-aos="fade-up">
            <p class="text-lg leading-relaxed text-muted">
              I'm a full-stack developer with <span class="text-ink">4+ years</span> of experience helping
              companies design, build and launch scalable web &amp; mobile applications. My work spans
              enterprise finance portals, real-time trading platforms and consumer mobile apps — across
              Angular and React front-ends, Node.js back-ends, and Flutter.
            </p>
            <p class="mt-5 text-lg leading-relaxed text-muted">
              I care about the things that make software worth paying for: clean architecture, real
              performance, and the details that make a product feel fast and reliable — from database
              schema to the last pixel. Work with me and you get clear communication, honest timelines,
              and code your team can build on.
            </p>

            <!-- Highlight cards -->
            <div class="mt-8 grid gap-3 sm:grid-cols-3">
              <div *ngFor="let h of highlights" class="rounded-2xl border border-line bg-surface p-5">
                <app-icon [name]="h.icon" [size]="20" class="text-accent"></app-icon>
                <div class="mt-3 font-display text-lg font-semibold text-ink">{{ h.title }}</div>
                <div class="mt-1 text-sm text-muted">{{ h.sub }}</div>
              </div>
            </div>
          </div>

          <!-- Profile + achievements card -->
          <div class="rounded-2xl border border-line bg-surface p-6" data-aos="fade-up">
            <dl class="space-y-3">
              <div *ngFor="let f of facts" class="flex items-center justify-between gap-4 border-b border-line pb-3 last:border-0 last:pb-0">
                <dt class="font-mono text-xs uppercase tracking-[0.12em] text-faint">{{ f.k }}</dt>
                <dd class="text-sm font-medium text-ink text-right">{{ f.v }}</dd>
              </div>
            </dl>

            <div class="mt-6 border-t border-line pt-5">
              <h4 class="font-mono text-xs uppercase tracking-[0.12em] text-faint">Key achievements</h4>
              <ul class="mt-3 space-y-2.5">
                <li *ngFor="let a of achievements" class="flex items-start gap-2.5 text-sm text-muted">
                  <app-icon name="check" [size]="16" class="mt-0.5 shrink-0 text-accent"></app-icon>
                  <span>{{ a }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Tech grid -->
        <div class="mt-16" data-aos="fade-up">
          <h3 class="font-mono text-xs uppercase tracking-[0.15em] text-faint">Technologies I work with</h3>
          <div class="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            <div *ngFor="let t of technologies"
                 class="flex items-center gap-3 rounded-xl border border-line bg-surface px-4 py-3 transition-colors hover:border-ink/25">
              <app-brand-icon [key]="t" [label]="t" [box]="38"></app-brand-icon>
              <span class="text-sm font-medium text-ink">{{ t }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [],
})
export class AboutComponent {
  highlights = [
    { icon: 'layers', title: 'Full-stack', sub: 'Frontend, backend, database & cloud' },
    { icon: 'gauge', title: 'Performance', sub: 'Fast, optimized, reliable systems' },
    { icon: 'smartphone', title: 'Web & mobile', sub: 'Angular, React & Flutter' },
  ];

  facts = [
    { k: 'Location', v: 'Pune, India' },
    { k: 'Experience', v: '4+ years' },
    { k: 'Education', v: 'M.Sc. Computer Science' },
    { k: 'Focus', v: 'Web & Mobile' },
    { k: 'Availability', v: 'Freelance & full-time' },
  ];

  achievements = [
    'Cut a batch processing pipeline from 2 weeks to 2 days',
    'Improved application performance by ~40%',
    'Led and mentored teams of 4+ developers',
    'Designed and shipped microservices architectures',
    'Set up CI/CD pipelines and automated deployments',
  ];

  technologies = [
    'Angular', 'React', 'Node.js', 'TypeScript',
    'Flutter', 'Python', 'PostgreSQL', 'MongoDB',
    'Redis', 'Docker', 'AWS', 'Git',
  ];
}
