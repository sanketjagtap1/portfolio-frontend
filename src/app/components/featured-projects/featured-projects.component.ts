import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { catchError, of, timeout } from 'rxjs';
import { PortfolioService, Project } from '../../services/portfolio.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-featured-projects',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <section *ngIf="featuredProjects.length > 0" class="py-20 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 text-white relative overflow-hidden">
      <!-- Background Pattern -->
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-cyan-600/20 to-sky-600/20"></div>
        <div class="absolute top-20 left-20 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div class="absolute bottom-20 right-20 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl animate-pulse" style="animation-delay: 1s;"></div>
      </div>

      <div class="container mx-auto px-4 relative z-10">
        <div class="text-center mb-16" data-aos="fade-up">
          <div class="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/20 rounded-full text-cyan-300 text-sm font-medium mb-6 border border-cyan-400/30">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            Featured Projects
          </div>
          <h2 class="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-100 to-sky-200 bg-clip-text text-transparent">Featured Projects</h2>
          <p class="text-xl text-cyan-200 max-w-3xl mx-auto leading-relaxed">
            Showcasing some of my most impactful work and innovative solutions
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div *ngFor="let project of featuredProjects" class="group" data-aos="fade-up">
            <div class="relative h-full">
              <div class="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-sky-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div class="relative h-full flex flex-col bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/20 shadow-xl hover:shadow-cyan-500/25 transition-all duration-500 hover:-translate-y-2 group-hover:border-cyan-400/50 overflow-hidden">

                <!-- Cover image (or gradient fallback) -->
                <a [routerLink]="['/projects', project.id]" class="block relative h-52 overflow-hidden">
                  <div *ngIf="getMainImage(project) as img"
                       class="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                       [style.background-image]="'url(' + img + ')'"></div>
                  <div *ngIf="!getMainImage(project)"
                       class="w-full h-full bg-gradient-to-br from-cyan-500 to-sky-600 flex items-center justify-center text-white text-5xl font-bold">
                    {{ project.title.charAt(0) }}
                  </div>
                  <span class="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium border"
                        [ngClass]="statusClass(project.status)">
                    {{ formatStatus(project.status) }}
                  </span>
                </a>

                <div class="p-8 flex flex-col flex-1">
                  <h3 class="text-2xl font-bold text-white mb-3">{{ project.title }}</h3>

                  <p class="text-cyan-100 leading-relaxed mb-6 line-clamp-3">
                    {{ project.shortDescription || project.description }}
                  </p>

                  <div class="flex flex-wrap gap-2 mb-6">
                    <span *ngFor="let tech of project.technologies.slice(0, 6)"
                          class="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-lg text-sm font-medium border border-cyan-400/30">
                      {{ tech }}
                    </span>
                    <span *ngIf="project.technologies.length > 6"
                          class="px-3 py-1 bg-white/10 text-cyan-200 rounded-lg text-sm font-medium border border-white/20">
                      +{{ project.technologies.length - 6 }}
                    </span>
                  </div>

                  <div class="flex items-center justify-between mt-auto pt-2">
                    <a [routerLink]="['/projects', project.id]" class="text-cyan-300 hover:text-cyan-200 font-semibold flex items-center gap-1 transition-colors duration-300">
                      View Details
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                      </svg>
                    </a>
                    <div class="flex items-center gap-4">
                      <a *ngIf="project.downloadUrl" [href]="project.downloadUrl" download
                         class="text-sm text-green-300 hover:text-green-200 font-medium flex items-center gap-1 transition-colors duration-300">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
                        </svg>
                        APK
                      </a>
                      <a *ngIf="project.liveUrl" [href]="project.liveUrl" target="_blank" rel="noopener noreferrer"
                         class="text-sm text-sky-300 hover:text-sky-200 font-medium flex items-center gap-1 transition-colors duration-300">
                        Live
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="text-center" data-aos="fade-up">
          <a routerLink="/projects" class="inline-flex items-center px-8 py-4 bg-gradient-to-r from-cyan-500 to-sky-500 text-white font-semibold rounded-xl hover:from-cyan-600 hover:to-sky-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            View All Projects
            <svg class="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .line-clamp-3 {
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  `]
})
export class FeaturedProjectsComponent implements OnInit {
  featuredProjects: Project[] = [];

  constructor(
    private portfolioService: PortfolioService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.portfolioService.getProjects().pipe(
      timeout(10000),
      catchError(error => {
        console.error('Featured projects API failed:', error);
        return of([] as Project[]);
      })
    ).subscribe(projects => {
      const list = projects || [];
      // Prefer projects explicitly marked as featured; fall back to the first few.
      const featured = list.filter(p => p.featured);
      const chosen = (featured.length > 0 ? featured : list)
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
        .slice(0, 4);
      this.featuredProjects = chosen;
      this.cdr.detectChanges();
    });
  }

  getMainImage(project: Project): string | null {
    const raw = project.featuredImage
      || (project.images && project.images.length > 0 ? project.images[0].url : null)
      || project.image
      || null;
    if (!raw) return null;
    return raw.startsWith('http') ? raw : `${environment.fileApiUrl}/${raw}`;
  }

  formatStatus(status: string): string {
    if (status === 'in-progress') return 'In Progress';
    if (status === 'planned') return 'Planned';
    return 'Completed';
  }

  statusClass(status: string): string {
    if (status === 'in-progress') return 'bg-amber-500/20 text-amber-200 border-amber-400/30';
    if (status === 'planned') return 'bg-slate-500/20 text-slate-200 border-slate-400/30';
    return 'bg-green-500/20 text-green-300 border-green-400/30';
  }
}
