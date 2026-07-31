import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PortfolioService, Project } from '../../services/portfolio.service';
import { timeout, catchError, of } from 'rxjs';
import { IconComponent } from '../ui/icon.component';
import { ProjectCardComponent } from '../ui/project-card.component';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, RouterModule, IconComponent, ProjectCardComponent],
  template: `
    <section id="projects" class="section min-h-screen">
      <div class="mx-auto max-w-shell px-6">
        <!-- Header -->
        <div class="max-w-2xl" data-aos="fade-up">
          <p class="kicker">Projects</p>
          <h2 class="mt-4 font-display text-4xl md:text-6xl font-semibold tracking-tightest text-ink">
            Selected work
          </h2>
          <p class="mt-4 text-lg text-muted">
            Real-world projects showcasing full-stack development — from trading platforms to mobile apps.
          </p>
        </div>

        <!-- Loading -->
        <div *ngIf="isLoading" class="mt-16 flex justify-center" role="status" aria-label="Loading projects">
          <div class="h-10 w-10 animate-spin rounded-full border-2 border-line border-t-accent"></div>
        </div>

        <!-- Grid -->
        <div *ngIf="!isLoading && projects.length > 0" class="mt-12 grid gap-6 md:grid-cols-2">
          <div *ngFor="let project of projects; let i = index" data-aos="fade-up" [attr.data-aos-delay]="i * 80">
            <app-project-card [project]="project"></app-project-card>
          </div>
        </div>

        <!-- Empty -->
        <div *ngIf="!isLoading && projects.length === 0" class="mt-16 rounded-2xl border border-line bg-surface p-12 text-center text-muted">
          No projects to show yet.
        </div>

        <!-- CTA -->
        <div *ngIf="!isLoading" class="mt-16 flex flex-col items-start justify-between gap-6 rounded-2xl border border-line bg-surface p-8 md:flex-row md:items-center"
             data-aos="fade-up">
          <div>
            <h3 class="font-display text-2xl font-semibold text-ink">Have something in mind?</h3>
            <p class="mt-2 max-w-xl text-muted">Tell me about your project and I'll help you turn it into a product that ships.</p>
          </div>
          <a routerLink="/contact" class="btn-primary shrink-0">
            Start a project <app-icon name="arrow-up-right" [size]="17"></app-icon>
          </a>
        </div>
      </div>
    </section>
  `,
  styles: [],
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [];
  isLoading = true;

  constructor(private portfolioService: PortfolioService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadProjectsData();
  }

  loadProjectsData() {
    this.isLoading = true;
    this.projects = [];

    this.portfolioService.getProjects().pipe(
      timeout(10000),
      catchError(() => of([] as Project[])),
    ).subscribe({
      next: (data) => {
        this.projects = (data || []).sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.projects = [];
        this.isLoading = false;
        this.cdr.detectChanges();
      },
    });
  }
}
