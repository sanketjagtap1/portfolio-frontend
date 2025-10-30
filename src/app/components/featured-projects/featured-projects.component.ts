import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { PortfolioService, Project } from '../../services/portfolio.service';
import { catchError, of, timeout, map, Observable } from 'rxjs';

@Component({
  selector: 'app-featured-projects',
  standalone: true,
  imports: [CommonModule, RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 text-white relative overflow-hidden">
      <!-- Background Pattern -->
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-600/20 to-indigo-600/20"></div>
        <div class="absolute top-20 left-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div class="absolute bottom-20 right-20 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" style="animation-delay: 1s;"></div>
        <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/5 rounded-full blur-3xl animate-pulse" style="animation-delay: 2s;"></div>
      </div>
      
      <div class="container mx-auto px-4 relative z-10">
        <div class="text-center mb-16" data-aos="fade-up">
          <div class="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/20 rounded-full text-purple-300 text-sm font-medium mb-6 border border-purple-400/30">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            Featured Projects
          </div>
          <h2 class="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-purple-100 to-indigo-200 bg-clip-text text-transparent">Featured Projects</h2>
          <p class="text-xl text-purple-200 max-w-3xl mx-auto leading-relaxed">
            Showcasing some of my most impactful work and innovative solutions
          </p>
        </div>
        
        <ng-container *ngIf="(featuredProjects$ | async) as projects; else loading">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div class="group" *ngFor="let project of projects; let i = index" [attr.data-aos]="i % 2 === 0 ? 'fade-right' : 'fade-left'">
              <div class="relative">
                <div class="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500" [class.from-purple-500/20]="i % 2 === 1" [class.to-pink-500/20]="i % 2 === 1"></div>
                <div class="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/20 shadow-2xl hover:shadow-blue-500/25 transition-all duration-500 group-hover:border-blue-400/50 hover:-translate-y-2">
                  <!-- Status badge -->
                  <div class="relative h-48 overflow-hidden">
                    <div *ngIf="getProjectMainImage(project)" class="w-full h-full bg-cover bg-center" [style.background-image]="'url(' + getImageUrl(getProjectMainImage(project)!) + ')'">
                      <div class="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <h3 class="text-xl font-bold text-white text-center px-4 truncate" [title]="project.title">{{ project.title }}</h3>
                      </div>
                      <div class="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold uppercase"
                           [class]="project.status === 'completed' ? 'bg-green-500/20 text-green-300 border border-green-400/30' : 
                                    project.status === 'in-progress' ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-400/30' : 
                                    'bg-gray-500/20 text-gray-300 border border-gray-400/30'">
                        <span class="w-2 h-2 rounded-full mr-2 inline-block" 
                              [class]="project.status === 'completed' ? 'bg-green-400' : 
                                       project.status === 'in-progress' ? 'bg-yellow-400 animate-pulse' : 'bg-gray-400'"></span>
                        {{ project.status | titlecase }}
                      </div>
                    </div>
                    <div *ngIf="!getProjectMainImage(project)" class="w-full h-full bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 flex items-center justify-center">
                      <div class="text-center px-4">
                        <div class="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                          </svg>
                        </div>
                        <h3 class="text-xl font-bold text-white">{{ project.title }}</h3>
                      </div>
                    </div>
                  </div>

                  <div class="p-8">
                    <h3 class="text-2xl font-bold text-white mb-4 group-hover:text-blue-200 transition-colors duration-300">
                      {{ project.title }}
                    </h3>
                    <div *ngIf="project.shortDescription" class="mb-6">
                      <p class="text-blue-200 leading-relaxed text-sm md:text-base font-medium">
                        {{ project.shortDescription }}
                      </p>
                    </div>
                    <div class="mb-8">
                      <div class="flex items-center gap-2 mb-4">
                        <div class="w-2 h-2 bg-blue-400 rounded-full"></div>
                        <h4 class="text-sm font-semibold text-blue-300 uppercase tracking-wide">Technologies</h4>
                      </div>
                      <div class="flex flex-wrap gap-2 justify-center md:justify-start">
                        <span *ngFor="let tech of project.technologies.slice(0, 6)"
                              class="px-3 py-1.5 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 text-blue-200 rounded-full text-xs font-medium border border-blue-400/30 hover:from-blue-500/40 hover:to-indigo-500/40 hover:border-blue-400/50 transition-all duration-300 hover:scale-105">
                          {{ tech }}
                        </span>
                        <span *ngIf="project.technologies.length > 6"
                              class="px-3 py-1.5 bg-gray-500/20 text-gray-300 rounded-full text-xs font-medium border border-gray-400/30">
                          +{{ project.technologies.length - 6 }} more
                        </span>
                      </div>
                    </div>
                    <div class="flex flex-col sm:flex-row gap-3 pt-4 border-t border-white/10">
                      <a *ngIf="project.githubUrl" [href]="project.githubUrl" target="_blank" rel="noopener noreferrer"
                         class="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-gray-600/20 to-gray-700/20 text-gray-200 rounded-xl font-medium border border-gray-400/30 hover:from-gray-600/40 hover:to-gray-700/40 hover:border-gray-400/50 transition-all duration-300 hover:scale-105 group">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="group-hover:scale-110 transition-transform duration-200">
                          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                        </svg>
                        <span>View Code</span>
                      </a>
                      <a *ngIf="project.liveUrl" [href]="project.liveUrl" target="_blank" rel="noopener noreferrer"
                         class="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl font-medium shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105 group">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="group-hover:scale-110 transition-transform duration-200">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                          <polyline points="15,3 21,3 21,9"/>
                          <line x1="10" y1="14" x2="21" y2="3"/>
                        </svg>
                        <span>Live Demo</span>
                      </a>
                      <button (click)="goToDetails(project.id)"
                              class="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-200 rounded-xl font-medium border border-purple-400/30 hover:from-purple-500/40 hover:to-pink-500/40 hover:border-purple-400/50 transition-all duration-300 hover:scale-105 group">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="group-hover:scale-110 transition-transform duration-200">
                          <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"/>
                        </svg>
                        <span>View Details</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ng-container>
        <ng-template #loading>
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div class="relative" *ngFor="let s of [0,1]">
              <div class="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-3xl blur-xl"></div>
              <div class="relative bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-xl animate-pulse">
                <div class="flex items-center gap-4 mb-6">
                  <div class="w-16 h-16 rounded-2xl bg-white/10"></div>
                  <div class="flex-1 space-y-2">
                    <div class="h-5 w-40 bg-white/10 rounded"></div>
                    <div class="h-4 w-24 bg-white/10 rounded"></div>
                  </div>
                </div>
                <div class="h-48 rounded-2xl bg-white/10 mb-6"></div>
                <div class="flex items-center justify-between">
                  <div class="flex gap-2">
                    <div class="h-7 w-16 bg-white/10 rounded"></div>
                    <div class="h-7 w-16 bg-white/10 rounded"></div>
                    <div class="h-7 w-16 bg-white/10 rounded"></div>
                  </div>
                  <div class="h-9 w-20 bg-white/10 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </ng-template>
        
        <div class="text-center" data-aos="fade-up">
          <a routerLink="/projects" class="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold rounded-xl hover:from-purple-600 hover:to-indigo-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            View All Projects
            <svg class="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  `,
  styles: []
})
export class FeaturedProjectsComponent implements OnInit {
  featuredProjects$!: Observable<Project[]>;

  constructor(private portfolioService: PortfolioService, private router: Router) {}

  ngOnInit() {
    this.featuredProjects$ = this.portfolioService.getProjects().pipe(
      timeout(10000),
      catchError(err => {
        console.error('Featured projects load error:', err);
        return of([] as Project[]);
      }),
      map((projects: Project[]) => {
        const featured = (projects || []).filter(p => p.featured);
        return (featured.length ? featured : projects).slice(0, 2);
      })
    );
  }

  goToDetails(projectId: number) {
    this.router.navigate(['/projects', projectId]);
  }

  getProjectMainImage(project: Project): string | null {
    if (project.featuredImage) return project.featuredImage;
    if (project.images && project.images.length > 0) return project.images[0].url;
    return project.image || null;
  }

  getImageUrl(image: string): string {
    if (!image) return '';
    if (image.startsWith('http')) return image;
    return `http://dev-api.technootales.in/v1/cloud/file/${image}`;
  }
}
