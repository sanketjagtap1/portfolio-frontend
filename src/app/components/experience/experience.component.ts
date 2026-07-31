import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService, Experience } from '../../services/portfolio.service';
import { timeout, catchError, of } from 'rxjs';
import { IconComponent } from '../ui/icon.component';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <section id="experience" class="section" role="region" aria-labelledby="experience-heading">
      <div class="mx-auto max-w-shell px-6">
        <!-- Header -->
        <div class="max-w-2xl" data-aos="fade-up">
          <p class="kicker">Experience</p>
          <h2 id="experience-heading" class="mt-4 font-display text-3xl md:text-5xl font-semibold tracking-tightest text-ink">
            Professional experience
          </h2>
          <p class="mt-3 text-muted">
            Roles where I've shipped products, led teams and grown as an engineer.
          </p>
        </div>

        <!-- Loading -->
        <div *ngIf="isLoading" class="mt-14 flex justify-center" role="status" aria-label="Loading experience">
          <div class="h-10 w-10 animate-spin rounded-full border-2 border-line border-t-accent"></div>
        </div>

        <!-- Timeline -->
        <div *ngIf="!isLoading" class="relative mt-14 max-w-4xl" role="list">
          <div class="absolute left-[7px] top-2 bottom-2 w-px bg-line md:left-[9px]" aria-hidden="true"></div>

          <div class="space-y-10">
            <div *ngFor="let exp of experiences; let i = index" class="relative pl-8 md:pl-12" role="listitem"
                 data-aos="fade-up" [attr.data-aos-delay]="i * 80">
              <!-- Marker -->
              <span class="absolute left-0 top-2 h-[15px] w-[15px] rounded-full border-2 border-canvas md:h-[19px] md:w-[19px]"
                    [ngClass]="exp.current ? 'bg-accent' : 'bg-faint'" aria-hidden="true"></span>

              <div class="rounded-2xl border border-line bg-surface p-6">
                <div class="flex flex-wrap items-start justify-between gap-3">
                  <div class="flex items-center gap-3">
                    <div class="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-white/[0.03] font-display text-lg font-bold text-ink">
                      {{ exp.company.charAt(0) }}
                    </div>
                    <div>
                      <h3 class="font-display text-lg font-semibold text-ink">{{ exp.position }}</h3>
                      <div class="text-sm text-accent">{{ exp.company }}</div>
                    </div>
                  </div>
                  <div class="text-right">
                    <span class="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide"
                          [ngClass]="exp.current ? 'border-accent/30 bg-accent/10 text-accent' : 'border-line text-muted'">
                      <span class="h-1.5 w-1.5 rounded-full" [ngClass]="exp.current ? 'bg-accent' : 'bg-faint'"></span>
                      {{ exp.current ? 'Current' : 'Completed' }}
                    </span>
                    <div class="mt-1.5 font-mono text-xs text-faint">
                      {{ formatDate(exp.startDate) }} — {{ exp.current ? 'Present' : formatDate(exp.endDate || '') }}
                    </div>
                  </div>
                </div>

                <div class="mt-4 flex items-center gap-1.5 text-sm text-muted">
                  <app-icon name="map-pin" [size]="15"></app-icon>{{ exp.location }}
                </div>

                <ul class="mt-4 space-y-2">
                  <li *ngFor="let point of bullets(exp.description)" class="flex items-start gap-2.5 text-sm leading-relaxed text-muted">
                    <app-icon name="check" [size]="15" class="mt-0.5 shrink-0 text-accent"></app-icon>
                    <span>{{ point }}</span>
                  </li>
                </ul>

                <div class="mt-5 flex flex-wrap gap-1.5">
                  <span *ngFor="let tech of exp.technologies" class="chip">{{ tech }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Key achievements -->
        <div *ngIf="!isLoading" class="mt-20" data-aos="fade-up">
          <p class="kicker">Highlights</p>
          <h3 class="mt-4 font-display text-2xl md:text-3xl font-semibold tracking-tightest text-ink">Key achievements</h3>
          <div class="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <div *ngFor="let a of achievements" class="rounded-2xl border border-line bg-surface p-6">
              <div class="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-white/[0.03] text-accent">
                <app-icon [name]="a.icon" [size]="22"></app-icon>
              </div>
              <h4 class="mt-4 font-display text-lg font-semibold text-ink">{{ a.title }}</h4>
              <p class="mt-2 text-sm leading-relaxed text-muted">{{ a.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [],
})
export class ExperienceComponent implements OnInit {
  experiences: Experience[] = [];
  isLoading = true;

  achievements = [
    { icon: 'gauge', title: 'Performance', desc: 'Improved application performance by ~40% through code and database tuning.' },
    { icon: 'clock', title: 'Automation', desc: 'Cut a processing pipeline from 2 weeks to 2 days with automated workflows.' },
    { icon: 'users', title: 'Leadership', desc: 'Led teams of 4+ developers and drove code reviews for quality.' },
    { icon: 'layers', title: 'Architecture', desc: 'Designed and shipped microservices for scalable applications.' },
  ];

  constructor(private portfolioService: PortfolioService, private cdr: ChangeDetectorRef) {}

  /** Split a role description into clean bullet points.
   *  Handles both newline-separated lines and legacy "•"-prefixed text,
   *  stripping any leading bullet glyph/dash so the UI renders its own markers. */
  bullets(description: string | null | undefined): string[] {
    if (!description) return [];
    return description
      .split(/\r?\n|(?=•)/)
      .map((line) => line.replace(/^\s*[•\-*]\s*/, '').trim())
      .filter((line) => line.length > 0);
  }

  ngOnInit() {
    this.loadExperienceData();
  }

  loadExperienceData() {
    this.isLoading = true;
    this.experiences = [];

    this.portfolioService.getExperience().pipe(
      timeout(10000),
      catchError(() => of([] as Experience[])),
    ).subscribe({
      next: (data) => {
        this.experiences = data && data.length > 0 ? data : this.fallback();
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.experiences = this.fallback();
        this.isLoading = false;
        this.cdr.detectChanges();
      },
    });
  }

  private fallback(): Experience[] {
    return [
      {
        id: 1, position: 'Senior Software Engineer', company: 'Pegasus InfoCorp', location: 'Mumbai, India',
        startDate: '2024-09', endDate: '', current: true,
        description: 'Building scalable web and mobile modules with Node.js, Express.js and Angular. Designed and integrated RESTful APIs for loan and insurance workflows, and improved MySQL performance through schema and query optimization.',
        technologies: ['Angular', 'Node.js', 'Express.js', 'Ionic', 'MySQL', 'REST APIs', 'SonarQube'],
        order: 0, createdAt: '', updatedAt: '',
      },
      {
        id: 2, position: 'Assistant Manager IT', company: 'Bajaj Housing Finance Ltd (BASSL)', location: 'Pune, India',
        startDate: '2022-10', endDate: '2024-09', current: false,
        description: 'Led end-to-end development of an enterprise Retention Portal with Angular, Node.js and PostgreSQL. Deployed microservices on AWS EC2 with Nginx and PM2, and automated workflows that cut processing time from 2 weeks to 2 days.',
        technologies: ['Angular', 'Node.js', 'PostgreSQL', 'AWS', 'Nginx', 'PM2', 'Microservices'],
        order: 1, createdAt: '', updatedAt: '',
      },
      {
        id: 3, position: 'Software Engineer', company: "Televed Systems Pvt Ltd", location: 'Pune, India',
        startDate: '2021-11', endDate: '2022-10', current: false,
        description: 'Developed modules for a healthcare platform with Angular, Node.js and MongoDB. Built reusable REST APIs for patient records, appointment scheduling and doctor dashboards with role-based access control.',
        technologies: ['Angular', 'Node.js', 'MongoDB', 'Material UI', 'RBAC', 'REST APIs'],
        order: 2, createdAt: '', updatedAt: '',
      },
    ];
  }

  formatDate(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString + '-01');
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  }
}
