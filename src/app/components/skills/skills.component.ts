import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService, Skill } from '../../services/portfolio.service';
import { timeout, catchError, of } from 'rxjs';
import { BrandIconComponent } from '../ui/brand-icon.component';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, BrandIconComponent],
  template: `
    <section id="skills" class="section">
      <div class="mx-auto max-w-shell px-6">
        <!-- Header -->
        <div class="max-w-2xl" data-aos="fade-up">
          <p class="kicker">Skills</p>
          <h2 class="mt-4 font-display text-3xl md:text-5xl font-semibold tracking-tightest text-ink">
            Technical skills
          </h2>
          <p class="mt-3 text-muted">
            Everything I use to take a product from idea to production — front-end, back-end, database and cloud.
          </p>
        </div>

        <!-- Category filter -->
        <div class="mt-10 flex flex-wrap gap-2">
          <button *ngFor="let category of categories"
                  (click)="selectCategory(category)"
                  class="rounded-full border px-4 py-2 font-mono text-xs uppercase tracking-wide transition-colors"
                  [ngClass]="selectedCategory === category
                    ? 'border-accent bg-accent text-accent-ink'
                    : 'border-line text-muted hover:text-ink hover:border-ink/30'">
            {{ getCategoryLabel(category) }}
          </button>
        </div>

        <!-- Loading -->
        <div *ngIf="isLoading" class="mt-14 flex justify-center" role="status" aria-label="Loading skills">
          <div class="h-10 w-10 animate-spin rounded-full border-2 border-line border-t-accent"></div>
        </div>

        <!-- Grid -->
        <div *ngIf="!isLoading" class="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3" data-aos="fade-up">
          <div *ngFor="let skill of filteredSkills"
               class="rounded-xl border border-line bg-surface p-5 transition-colors hover:border-ink/25">
            <div class="flex items-center gap-3">
              <app-brand-icon [key]="skill.name" [label]="skill.name" [box]="40"></app-brand-icon>
              <div class="min-w-0 flex-1">
                <h3 class="truncate font-medium text-ink">{{ skill.name }}</h3>
                <div class="mt-0.5 flex items-center gap-2">
                  <span class="font-mono text-xs text-faint">{{ skill.level }}%</span>
                  <span class="font-mono text-[10px] uppercase tracking-wide" [ngClass]="levelClass(skill.level)">
                    {{ levelText(skill.level) }}
                  </span>
                </div>
              </div>
            </div>
            <div class="mt-4 h-1 w-full overflow-hidden rounded-full bg-white/[0.06]">
              <div class="h-full rounded-full bg-accent transition-all duration-1000 ease-out" [style.width.%]="skill.level"></div>
            </div>
          </div>
        </div>

        <div *ngIf="!isLoading && filteredSkills.length === 0" class="mt-14 text-center text-muted">
          No skills in this category yet.
        </div>
      </div>
    </section>
  `,
  styles: [],
})
export class SkillsComponent implements OnInit {
  skills: Skill[] = [];
  selectedCategory = 'all';
  isLoading = true;
  categories = ['all', 'frontend', 'backend', 'mobile', 'database', 'cloud', 'tools'];

  constructor(private portfolioService: PortfolioService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadSkills();
  }

  loadSkills() {
    this.isLoading = true;
    this.portfolioService.getSkills()
      .pipe(
        timeout(10000),
        catchError(() => of([] as Skill[])),
      )
      .subscribe({
        next: (skills) => {
          this.skills = skills && skills.length > 0 ? skills : [];
          this.isLoading = false;
          this.cdr.detectChanges();
        },
        error: () => {
          this.skills = [];
          this.isLoading = false;
          this.cdr.detectChanges();
        },
      });
  }

  get filteredSkills(): Skill[] {
    if (this.selectedCategory === 'all') return this.skills;
    return this.skills.filter(skill => skill.category === this.selectedCategory);
  }

  selectCategory(category: string) {
    this.selectedCategory = category;
  }

  getCategoryLabel(category: string): string {
    const labels: { [key: string]: string } = {
      all: 'All', frontend: 'Frontend', backend: 'Backend', mobile: 'Mobile',
      database: 'Database', cloud: 'Cloud & DevOps', tools: 'Tools',
    };
    return labels[category] || category;
  }

  levelClass(level: number): string {
    if (level >= 90) return 'text-accent';
    if (level >= 75) return 'text-muted';
    return 'text-faint';
  }

  levelText(level: number): string {
    if (level >= 90) return 'Expert';
    if (level >= 75) return 'Advanced';
    if (level >= 60) return 'Intermediate';
    return 'Beginner';
  }
}
