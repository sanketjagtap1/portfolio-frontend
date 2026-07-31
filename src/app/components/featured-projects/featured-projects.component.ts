import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { catchError, of, timeout } from 'rxjs';
import { PortfolioService, Project } from '../../services/portfolio.service';
import { IconComponent } from '../ui/icon.component';
import { ProjectCardComponent } from '../ui/project-card.component';

@Component({
  selector: 'app-featured-projects',
  standalone: true,
  imports: [CommonModule, RouterModule, IconComponent, ProjectCardComponent],
  template: `
    <section *ngIf="featuredProjects.length > 0" class="section border-t border-line">
      <div class="mx-auto max-w-shell px-6">
        <div class="flex flex-wrap items-end justify-between gap-4" data-aos="fade-up">
          <div class="max-w-xl">
            <p class="kicker">02 — Work</p>
            <h2 class="mt-4 font-display text-3xl md:text-5xl font-semibold tracking-tightest text-ink">
              Featured projects
            </h2>
            <p class="mt-3 text-muted">Real products I've designed, built and shipped — from real-time trading platforms to mobile apps.</p>
          </div>
          <a routerLink="/projects"
             class="inline-flex items-center gap-1.5 rounded-full border border-line px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-ink/40">
            All projects <app-icon name="arrow-up-right" [size]="15"></app-icon>
          </a>
        </div>

        <div class="mt-12 grid gap-6 md:grid-cols-2">
          <div *ngFor="let project of featuredProjects" data-aos="fade-up">
            <app-project-card [project]="project"></app-project-card>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [],
})
export class FeaturedProjectsComponent implements OnInit {
  featuredProjects: Project[] = [];

  constructor(
    private portfolioService: PortfolioService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.portfolioService.getProjects().pipe(
      timeout(10000),
      catchError(() => of([] as Project[])),
    ).subscribe(projects => {
      const list = projects || [];
      const featured = list.filter(p => p.featured);
      this.featuredProjects = (featured.length > 0 ? featured : list)
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
        .slice(0, 4);
      this.cdr.detectChanges();
    });
  }
}
