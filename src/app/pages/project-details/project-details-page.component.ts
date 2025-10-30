import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { timeout, catchError, of } from 'rxjs';
import { HeaderComponent } from '../../components/header/header.component';

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
  technologies: string[];
  images: ProjectImage[];
  featuredImage?: string;
  createdAt: string;
  updatedAt: string;
}

@Component({
  selector: 'app-project-details-page',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      <!-- Header -->
      <app-header></app-header>

      <!-- Loading State -->
      <div *ngIf="isLoading" class="flex items-center justify-center min-h-screen">
        <div class="text-center">
          <div class="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <p class="text-blue-200 text-lg">Loading project details...</p>
        </div>
      </div>

      <!-- Error State -->
      <div *ngIf="error && !isLoading" class="flex items-center justify-center min-h-screen">
        <div class="text-center">
          <div class="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <h2 class="text-2xl font-bold text-white mb-2">Project Not Found</h2>
          <p class="text-gray-300 mb-6">{{ error }}</p>
          <button 
            (click)="goBack()"
            class="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-200"
          >
            Go Back to Projects
          </button>
        </div>
      </div>

      <!-- Project Details -->
      <div *ngIf="project && !isLoading && !error" class="max-w-7xl mx-auto px-4 py-8">
        <!-- Back Button -->
        <button 
          (click)="goBack()"
          class="mb-8 flex items-center gap-2 px-4 py-2 text-blue-200 hover:text-white hover:bg-white/10 rounded-lg transition-colors duration-200"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>
          <span>Back to Projects</span>
        </button>

        <!-- Hero Section -->
        <div class="bg-slate-800/80 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden mb-8 border border-blue-400/30">
          <!-- Project Header -->
          <div class="relative h-96 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600">
            <!-- Background Image -->
            <div 
              *ngIf="getProjectMainImage()" 
              class="absolute inset-0 bg-cover bg-center"
              [style.background-image]="'url(' + getImageUrl(getProjectMainImage()!) + ')'"
            >
              <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
            </div>
            
            <!-- Content -->
            <div class="relative z-10 h-full flex items-end p-8">
              <div class="text-white">
                <h1 class="text-4xl md:text-5xl font-bold mb-4">{{ project.title }}</h1>
                <p *ngIf="project.shortDescription" class="text-xl text-blue-100 mb-6 max-w-3xl">{{ project.shortDescription }}</p>
                
                <!-- Action Buttons -->
                <div class="flex flex-col sm:flex-row gap-3">
                  <a 
                    *ngIf="project.githubUrl"
                    [href]="project.githubUrl"
                    target="_blank"
                    class="inline-flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-all duration-200 border border-white/30"
                  >
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    <span>GitHub</span>
                  </a>
                  
                  <a 
                    *ngIf="project.liveUrl"
                    [href]="project.liveUrl"
                    target="_blank"
                    class="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                    </svg>
                    <span>Live Demo</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Main Content Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Left Column - Main Content -->
          <div class="lg:col-span-2 space-y-8">
            <!-- Project Description -->
            <div class="bg-slate-800/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-blue-400/30">
              <h2 class="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <div class="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <svg class="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                  </svg>
                </div>
                About This Project
              </h2>
              <div class="prose prose-lg max-w-none text-gray-200 project-description"
                   [innerHTML]="getSanitizedDescription()">
              </div>
            </div>

            <!-- Image Gallery -->
            <div *ngIf="project.images?.length! > 0" class="bg-slate-800/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-blue-400/30">
              <h2 class="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <div class="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <svg class="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                  </svg>
                </div>
                Project Gallery
                <span class="text-sm font-normal text-blue-200 bg-blue-500/20 px-3 py-1 rounded-full">
                  {{ project.images.length }} {{ project.images.length === 1 ? 'image' : 'images' }}
                </span>
              </h2>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div 
                  *ngFor="let image of project.images; let i = index"
                  class="group cursor-pointer"
                  (click)="openImageModal(image, i)"
                >
                  <div class="relative overflow-hidden rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300">
                    <img 
                      [src]="getImageUrl(image.url)" 
                      [alt]="image.alt"
                      class="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div class="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                      <div class="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div class="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="mt-3">
                    <h3 class="font-semibold text-white">{{ image.alt }}</h3>
                    <p *ngIf="image.caption" class="text-sm text-gray-300 mt-1">{{ image.caption }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Column - Sidebar -->
          <div class="space-y-6">
            <!-- Technologies -->
            <div class="bg-slate-800/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-blue-400/30">
              <h3 class="text-xl font-bold text-white mb-4 flex items-center gap-3">
                <div class="w-6 h-6 bg-orange-500/20 rounded-lg flex items-center justify-center">
                  <svg class="w-4 h-4 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
                  </svg>
                </div>
                Technologies
              </h3>
              <div class="flex flex-wrap gap-2">
                <span 
                  *ngFor="let tech of project.technologies"
                  class="px-3 py-2 bg-blue-500/20 text-blue-200 rounded-lg text-sm font-medium hover:bg-blue-500/30 transition-colors duration-200 border border-blue-400/30"
                >
                  {{ tech }}
                </span>
              </div>
            </div>

            <!-- Project Info -->
            <div class="bg-slate-800/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-blue-400/30">
              <h3 class="text-xl font-bold text-white mb-4 flex items-center gap-3">
                <div class="w-6 h-6 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <svg class="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                Project Info
              </h3>
              <div class="space-y-3">
                <div class="flex justify-between items-center py-2 border-b border-gray-600/50">
                  <span class="text-gray-300">Created</span>
                  <span class="font-medium text-white">{{ project.createdAt | date:'MMM yyyy' }}</span>
                </div>
                <div class="flex justify-between items-center py-2 border-b border-gray-600/50">
                  <span class="text-gray-300">Updated</span>
                  <span class="font-medium text-white">{{ project.updatedAt | date:'MMM yyyy' }}</span>
                </div>
                <div class="flex justify-between items-center py-2">
                  <span class="text-gray-300">Images</span>
                  <span class="font-medium text-white">{{ project.images.length || 0 }}</span>
                </div>
              </div>
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
      color: #60a5fa;
      font-weight: bold;
      margin-right: 0.5rem;
      flex-shrink: 0;
    }
    
    .project-description ol {
      /* Quill often wraps bullet LIs in an OL with li[data-list="bullet"] */
      list-style: none;
      padding-left: 0;
      margin: 1rem 0;
    }
    
    .project-description ol li {
      padding-left: 0;
    }
    
    .project-description ol li::before {
      content: none;
    }

    /* Style Quill bullet items rendered as li[data-list="bullet"] */
    .project-description li[data-list="bullet"] {
      display: flex;
      align-items: flex-start;
      gap: 0.5rem;
      margin-bottom: 0.75rem;
      padding-left: 1rem;
    }

    .project-description li[data-list="bullet"]::before {
      content: "•";
      color: #60a5fa;
      font-weight: bold;
      margin-right: 0.5rem;
      flex-shrink: 0;
      line-height: 1.4;
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
      color: #93c5fd;
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
      color: #60a5fa;
      text-decoration: underline;
    }
    
    .project-description a:hover {
      color: #93c5fd;
    }

    /* Quill-specific fixes: bullet-styled ordered lists */
    .project-description ol[data-list="bullet"] {
      list-style: none;
      padding-left: 0;
      margin: 1rem 0;
    }

    .project-description ol[data-list="bullet"] li {
      display: flex;
      align-items: flex-start;
      gap: 0.5rem;
      margin-bottom: 0.5rem;
      padding-left: 1rem;
    }

    .project-description ol[data-list="bullet"] li::before {
      content: "•";
      color: #60a5fa;
      font-weight: bold;
      margin-right: 0.5rem;
      flex-shrink: 0;
    }

    /* Hide Quill UI helper spans */
    .project-description .ql-ui { display: none !important; }

    /* Neutralize inline color styles coming from editor to match theme */
    .project-description [style*="color"] { color: inherit !important; }

    /* Enhanced list spacing and subtle panel */
    .project-description ul, 
    .project-description ol,
    .project-description li { line-height: 1.7; }

    .project-description ol[data-list="bullet"],
    .project-description ul {
      background: rgba(59, 130, 246, 0.06);
      border: 1px solid rgba(59, 130, 246, 0.15);
      border-radius: 0.5rem;
      padding: 0.75rem 1rem;
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
  private cachedSanitizedDescription: SafeHtml | null = null;
  
  showImageModal = false;
  currentImage: ProjectImage | null = null;
  currentImageIndex = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private sanitizer: DomSanitizer
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
    
    console.log('Loading project with ID:', projectId);
    
    this.http.get<ProjectDetails>(`${environment.apiBaseUrl}/portfolio/projects/${projectId}`)
      .pipe(
        timeout(10000), // 10 second timeout
        catchError(error => {
          console.error('HTTP Error:', error);
          return of(null);
        })
      )
      .subscribe({
        next: (project: ProjectDetails | null) => {
          console.log('Project loaded successfully:', project);
          if (project) {
            this.project = project;
            this.cachedSanitizedDescription = null;
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
    if (!imageId) return '';
    return `https://dev-api.technootales.in/v1/cloud/file/${imageId}`;
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

  getSanitizedDescription(): SafeHtml {
    if (!this.project?.description) return '' as unknown as SafeHtml;
    if (!this.cachedSanitizedDescription) {
      this.cachedSanitizedDescription = this.sanitizer.bypassSecurityTrustHtml(this.project.description);
    }
    return this.cachedSanitizedDescription;
  }
}
