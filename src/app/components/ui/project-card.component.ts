import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IconComponent } from './icon.component';
import { Project } from '../../services/portfolio.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [CommonModule, RouterModule, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-colors duration-300 hover:border-ink/25">
      <!-- Cover -->
      <a [routerLink]="['/projects', project.id]" class="relative block aspect-[16/10] overflow-hidden bg-canvas">
        <img *ngIf="cover" [src]="cover" [alt]="project.title"
             class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" loading="lazy" />
        <!-- Designed fallback cover (no image needed) -->
        <div *ngIf="!cover"
             class="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-surface2 to-canvas">
          <div class="pointer-events-none absolute -right-8 -top-8 h-36 w-36 rounded-full bg-accent/10 blur-3xl"></div>
          <div class="pointer-events-none absolute inset-0 opacity-50"
               style="background-image: radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px); background-size: 22px 22px;"></div>
          <div class="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-accent/30 bg-accent/10 font-display text-2xl font-bold text-accent">
            {{ monogram }}
          </div>
          <div class="relative mt-3 line-clamp-1 max-w-[80%] px-2 text-center font-display text-sm font-semibold text-muted">{{ project.title }}</div>
        </div>
        <span class="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[11px] uppercase tracking-wide backdrop-blur"
              [ngClass]="statusClass">
          <span class="h-1.5 w-1.5 rounded-full" [ngClass]="dotClass"></span>
          {{ statusLabel }}
        </span>
      </a>

      <!-- Body -->
      <div class="flex flex-1 flex-col p-6">
        <h3 class="font-display text-xl font-semibold text-ink">{{ project.title }}</h3>
        <p class="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">
          {{ project.shortDescription || project.description }}
        </p>

        <div class="mt-4 flex flex-wrap gap-1.5">
          <span *ngFor="let t of (project.technologies || []).slice(0, 5)" class="chip">{{ t }}</span>
          <span *ngIf="(project.technologies || []).length > 5" class="chip">+{{ project.technologies.length - 5 }}</span>
        </div>

        <div class="mt-6 flex flex-wrap items-center gap-2 pt-1">
          <a [routerLink]="['/projects', project.id]"
             class="inline-flex items-center gap-1.5 rounded-lg border border-line px-3.5 py-2 text-xs font-semibold text-ink transition-colors hover:border-ink/40">
            View details <app-icon name="arrow-right" [size]="14"></app-icon>
          </a>
          <a *ngIf="project.liveUrl" [href]="project.liveUrl" target="_blank" rel="noopener noreferrer"
             class="inline-flex items-center gap-1.5 rounded-lg bg-accent px-3.5 py-2 text-xs font-semibold text-accent-ink transition-all hover:brightness-95">
            Live <app-icon name="arrow-up-right" [size]="14"></app-icon>
          </a>
          <a *ngIf="project.downloadUrl" [href]="project.downloadUrl"
             class="inline-flex items-center gap-1.5 rounded-lg border border-accent/40 bg-accent/10 px-3.5 py-2 text-xs font-semibold text-accent transition-colors hover:bg-accent/15">
            <app-icon name="download" [size]="14"></app-icon> APK
          </a>
        </div>
      </div>
    </article>
  `,
  styles: [`
    .line-clamp-2 {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  `],
})
export class ProjectCardComponent {
  @Input() project!: Project;

  /** Up to two initials from the project title, for the imageless cover. */
  get monogram(): string {
    const words = (this.project.title || '?').trim().split(/\s+/).filter(Boolean);
    if (words.length === 0) return '?';
    if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
    return (words[0][0] + words[1][0]).toUpperCase();
  }

  get cover(): string | null {
    const raw = this.project.featuredImage
      || (this.project.images && this.project.images.length > 0 ? this.project.images[0].url : null)
      || this.project.image
      || null;
    if (!raw) return null;
    return raw.startsWith('http') ? raw : `${environment.fileApiUrl}/${raw}`;
  }

  get statusLabel(): string {
    const s = this.project.status;
    if (s === 'in-progress') return 'In progress';
    if (s === 'planned') return 'Planned';
    return 'Completed';
  }

  get statusClass(): string {
    const s = this.project.status;
    if (s === 'in-progress') return 'border-amber-400/30 bg-amber-950/40 text-amber-300';
    if (s === 'planned') return 'border-line bg-canvas/70 text-muted';
    return 'border-accent/30 bg-canvas/70 text-accent';
  }

  get dotClass(): string {
    const s = this.project.status;
    if (s === 'in-progress') return 'bg-amber-400';
    if (s === 'planned') return 'bg-faint';
    return 'bg-accent';
  }
}
