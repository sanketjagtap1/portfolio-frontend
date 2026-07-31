import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { timeout, catchError, of } from 'rxjs';
import { PortfolioService } from '../../services/portfolio.service';
import { IconComponent } from '../../components/ui/icon.component';

export interface ProjectImage {
  id: string;
  url: string;
  alt: string;
  caption?: string;
}

export interface ProjectDetails {
  id: number;
  title: string;
  shortDescription: string;
  description: string;
  githubUrl?: string;
  liveUrl?: string;
  downloadUrl?: string;
  technologies: string[];
  images: ProjectImage[];
  featuredImage?: string;
  createdAt: string;
  updatedAt: string;
}

@Component({
  selector: 'app-project-details-page',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <div class="min-h-screen">
      <!-- Loading -->
      <div *ngIf="isLoading" class="flex min-h-screen items-center justify-center">
        <div class="h-10 w-10 animate-spin rounded-full border-2 border-line border-t-accent"></div>
      </div>

      <!-- Error -->
      <div *ngIf="error && !isLoading" class="flex min-h-screen items-center justify-center px-6">
        <div class="text-center">
          <h2 class="font-display text-2xl font-semibold text-ink">Project not found</h2>
          <p class="mt-2 text-muted">{{ error }}</p>
          <button (click)="goBack()" class="btn-primary mt-6">Back to projects</button>
        </div>
      </div>

      <!-- Details -->
      <div *ngIf="project && !isLoading && !error" class="mx-auto max-w-shell px-6 pb-24 pt-24">
        <!-- Back -->
        <button (click)="goBack()" class="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-ink">
          <app-icon name="arrow-right" [size]="15" class="rotate-180"></app-icon>
          Back to projects
        </button>

        <!-- Title block -->
        <div class="mt-8 max-w-3xl">
          <h1 class="font-display text-4xl md:text-6xl font-semibold tracking-tightest text-ink">{{ project.title }}</h1>
          <p *ngIf="project.shortDescription" class="mt-4 text-lg text-muted">{{ project.shortDescription }}</p>

          <div class="mt-6 flex flex-wrap gap-3">
            <a *ngIf="project.liveUrl" [href]="project.liveUrl" target="_blank" rel="noopener noreferrer" class="btn-primary">
              Live demo <app-icon name="arrow-up-right" [size]="17"></app-icon>
            </a>
            <a *ngIf="project.downloadUrl" [href]="project.downloadUrl"
               class="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-6 py-3 font-semibold text-accent transition-colors hover:bg-accent/15">
              <app-icon name="download" [size]="17"></app-icon> Download APK
            </a>
            <a *ngIf="project.githubUrl" [href]="project.githubUrl" target="_blank" rel="noopener noreferrer" class="btn-ghost">
              <app-icon name="github" [size]="17"></app-icon> GitHub
            </a>
          </div>
          <p *ngIf="project.downloadUrl" class="mt-3 font-mono text-xs text-faint">
            Android only — open the file and allow "Install from unknown sources" if prompted.
          </p>
        </div>

        <!-- Cover -->
        <div *ngIf="getProjectMainImage()" class="mt-10 flex justify-center overflow-hidden rounded-2xl border border-line bg-canvas p-3">
          <img [src]="getImageUrl(getProjectMainImage()!)" [alt]="project.title"
               class="max-h-[70vh] w-auto max-w-full rounded-xl object-contain" />
        </div>

        <!-- Content grid -->
        <div class="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div class="space-y-8 lg:col-span-2">
            <div class="rounded-2xl border border-line bg-surface p-8">
              <h2 class="font-mono text-xs uppercase tracking-[0.15em] text-faint">About this project</h2>
              <div class="prose prose-invert mt-4 max-w-none project-description" [innerHTML]="project.description"></div>
            </div>

            <div *ngIf="project.images?.length! > 0" class="rounded-2xl border border-line bg-surface p-8">
              <h2 class="font-mono text-xs uppercase tracking-[0.15em] text-faint">
                Gallery · {{ project.images.length }} {{ project.images.length === 1 ? 'image' : 'images' }}
              </h2>
              <div class="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
                <div *ngFor="let image of project.images; let i = index" class="group cursor-pointer" (click)="openImageModal(image, i)">
                  <div class="flex h-72 items-center justify-center overflow-hidden rounded-xl border border-line bg-canvas p-2">
                    <img [src]="getImageUrl(image.url)" [alt]="image.alt"
                         class="max-h-full w-auto max-w-full object-contain transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <h3 class="mt-3 font-medium text-ink">{{ image.alt }}</h3>
                  <p *ngIf="image.caption" class="mt-1 text-sm text-muted">{{ image.caption }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Sidebar -->
          <div class="space-y-6">
            <div class="rounded-2xl border border-line bg-surface p-6">
              <h3 class="font-mono text-xs uppercase tracking-[0.15em] text-faint">Technologies</h3>
              <div class="mt-4 flex flex-wrap gap-1.5">
                <span *ngFor="let tech of project.technologies" class="chip">{{ tech }}</span>
              </div>
            </div>

            <div class="rounded-2xl border border-line bg-surface p-6">
              <h3 class="font-mono text-xs uppercase tracking-[0.15em] text-faint">Project info</h3>
              <dl class="mt-4 space-y-3 text-sm">
                <div class="flex items-center justify-between border-b border-line pb-3">
                  <dt class="text-muted">Created</dt><dd class="text-ink">{{ project.createdAt | date:'MMM yyyy' }}</dd>
                </div>
                <div class="flex items-center justify-between border-b border-line pb-3">
                  <dt class="text-muted">Updated</dt><dd class="text-ink">{{ project.updatedAt | date:'MMM yyyy' }}</dd>
                </div>
                <div class="flex items-center justify-between">
                  <dt class="text-muted">Images</dt><dd class="text-ink">{{ project.images.length || 0 }}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <!-- Enhanced Image Modal -->
      <div *ngIf="showImageModal" class="fixed inset-0 z-50 overflow-y-auto" (click)="closeImageModal()">
        <div class="flex min-h-screen items-center justify-center p-4">
          <!-- Backdrop -->
          <div class="fixed inset-0 bg-black/90 backdrop-blur-sm transition-opacity"></div>
          
          <!-- Image Modal -->
          <div class="relative max-w-7xl w-full max-h-[95vh]" (click)="$event.stopPropagation()">
            <!-- Close Button -->
            <button 
              (click)="closeImageModal()"
              class="absolute top-4 right-4 z-10 p-3 bg-white/20 backdrop-blur-sm text-white rounded-xl hover:bg-white/30 transition-all duration-200 group"
            >
              <svg class="w-6 h-6 group-hover:rotate-90 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>

            <!-- Navigation Arrows -->
            <button 
              *ngIf="currentImageIndex > 0"
              (click)="previousImage()"
              class="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-4 bg-white/20 backdrop-blur-sm text-white rounded-xl hover:bg-white/30 transition-all duration-200 group"
            >
              <svg class="w-8 h-8 group-hover:-translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
              </svg>
            </button>
            
            <button 
              *ngIf="currentImageIndex < (project?.images?.length || 0) - 1"
              (click)="nextImage()"
              class="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-4 bg-white/20 backdrop-blur-sm text-white rounded-xl hover:bg-white/30 transition-all duration-200 group"
            >
              <svg class="w-8 h-8 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </button>

            <!-- Main Image -->
            <div class="flex items-center justify-center">
              <img 
                [src]="getImageUrl(currentImage?.url || '')" 
                [alt]="currentImage?.alt"
                class="max-w-full max-h-[80vh] object-contain rounded-xl shadow-2xl"
              />
            </div>

            <!-- Image Info -->
            <div class="mt-6 text-center">
              <h3 class="text-white text-2xl font-bold mb-2">{{ currentImage?.alt }}</h3>
              <p *ngIf="currentImage?.caption" class="text-gray-300 text-lg mb-4">{{ currentImage?.caption }}</p>
              <div class="flex items-center justify-center gap-4">
                <span class="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-medium">
                  {{ currentImageIndex + 1 }} of {{ project?.images?.length || 0 }}
                </span>
                <div class="flex gap-2">
                  <div 
                    *ngFor="let image of project?.images; let i = index"
                    class="w-3 h-3 rounded-full transition-all duration-200"
                    [class]="i === currentImageIndex ? 'bg-white' : 'bg-white/40'"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    /* Project description HTML formatting */
    .project-description ul {
      list-style: none;
      padding-left: 0;
      margin: 1rem 0;
    }
    
    .project-description li {
      display: flex;
      align-items: flex-start;
      gap: 0.5rem;
      margin-bottom: 0.5rem;
      padding-left: 1rem;
    }
    
    .project-description li::before {
      content: "•";
      color: #bef264;
      font-weight: bold;
      margin-right: 0.5rem;
      flex-shrink: 0;
    }
    
    .project-description ol {
      padding-left: 1.5rem;
      margin: 1rem 0;
    }
    
    .project-description ol li {
      padding-left: 0;
    }
    
    .project-description ol li::before {
      content: none;
    }
    
    .project-description h1,
    .project-description h2,
    .project-description h3,
    .project-description h4,
    .project-description h5,
    .project-description h6 {
      margin-top: 1.5rem;
      margin-bottom: 0.75rem;
      font-weight: 600;
      color: #ffffff;
    }
    
    .project-description h1 {
      font-size: 1.5rem;
    }
    
    .project-description h2 {
      font-size: 1.25rem;
    }
    
    .project-description h3 {
      font-size: 1.125rem;
    }
    
    .project-description p {
      margin-bottom: 1rem;
      line-height: 1.6;
    }
    
    .project-description strong {
      font-weight: 600;
      color: #ffffff;
    }
    
    .project-description em {
      font-style: italic;
      color: #a1a1aa;
    }
    
    .project-description blockquote {
      border-left: 4px solid #3b82f6;
      padding-left: 1rem;
      margin: 1rem 0;
      font-style: italic;
      color: #93c5fd;
      background-color: rgba(59, 130, 246, 0.1);
      padding: 1rem;
      border-radius: 0.375rem;
    }
    
    .project-description code {
      background-color: rgba(59, 130, 246, 0.2);
      padding: 0.125rem 0.25rem;
      border-radius: 0.25rem;
      font-family: 'Courier New', monospace;
      font-size: 0.875rem;
      color: #fbbf24;
    }
    
    .project-description pre {
      background-color: #1f2937;
      color: #f9fafb;
      padding: 1rem;
      border-radius: 0.5rem;
      overflow-x: auto;
      margin: 1rem 0;
    }
    
    .project-description pre code {
      background-color: transparent;
      color: inherit;
      padding: 0;
    }
    
    .project-description a {
      color: #bef264;
      text-decoration: underline;
    }

    .project-description a:hover {
      color: #d9f99d;
    }

    /* Custom scrollbar */
    .overflow-y-auto::-webkit-scrollbar {
      width: 8px;
    }
    
    .overflow-y-auto::-webkit-scrollbar-track {
      background: rgba(255, 255, 255, 0.1);
      border-radius: 4px;
    }
    
    .overflow-y-auto::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.3);
      border-radius: 4px;
    }
    
    .overflow-y-auto::-webkit-scrollbar-thumb:hover {
      background: rgba(255, 255, 255, 0.5);
    }
  `]
})
export class ProjectDetailsPageComponent implements OnInit {
  project: ProjectDetails | null = null;
  isLoading = true;
  error: string | null = null;
  
  showImageModal = false;
  currentImage: ProjectImage | null = null;
  currentImageIndex = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private portfolioService: PortfolioService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const projectId = params['id'];
      if (projectId) {
        this.loadProject(projectId);
      }
    });
  }

  loadProject(projectId: string) {
    this.isLoading = true;
    this.error = null;

    this.portfolioService.getProjectById(projectId)
      .pipe(
        timeout(10000),
        catchError(error => {
          console.error('Error loading project:', error);
          return of(null);
        })
      )
      .subscribe({
        next: (project: any) => {
          if (project) {
            this.project = project as ProjectDetails;
            this.isLoading = false;
          } else {
            this.error = 'Failed to load project details. Please try again.';
            this.isLoading = false;
          }
          // Force change detection
          setTimeout(() => {
            this.cdr.detectChanges();
          }, 100);
        },
        error: (error: any) => {
          console.error('Error loading project:', error);
          this.error = 'Failed to load project details. Please try again.';
          this.isLoading = false;
          // Force change detection
          setTimeout(() => {
            this.cdr.detectChanges();
          }, 100);
        }
      });
  }

  getProjectMainImage(): string | null {
    if (!this.project) return null;
    
    // Priority: featuredImage -> first image from images array
    if (this.project.featuredImage) {
      return this.project.featuredImage;
    }
    if (this.project.images && this.project.images.length > 0) {
      return this.project.images[0].url;
    }
    return null;
  }

  getImageUrl(imageId: string): string {
    return this.portfolioService.getFileUrl(imageId);
  }

  openImageModal(image: ProjectImage, index: number) {
    this.currentImage = image;
    this.currentImageIndex = index;
    this.showImageModal = true;
  }

  closeImageModal() {
    this.showImageModal = false;
    this.currentImage = null;
    this.currentImageIndex = 0;
  }

  previousImage() {
    if (this.currentImageIndex > 0 && this.project?.images) {
      this.currentImageIndex--;
      this.currentImage = this.project.images[this.currentImageIndex];
    }
  }

  nextImage() {
    if (this.project?.images && this.currentImageIndex < (this.project.images.length - 1)) {
      this.currentImageIndex++;
      this.currentImage = this.project.images[this.currentImageIndex];
    }
  }

  goBack() {
    this.router.navigate(['/projects']);
  }
}
