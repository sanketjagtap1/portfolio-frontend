import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

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
  selector: 'app-project-details-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="isOpen" class="fixed inset-0 z-50 overflow-y-auto" (click)="closeModal()">
      <div class="flex min-h-screen items-center justify-center p-4">
        <!-- Backdrop -->
        <div class="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"></div>
        
        <!-- Modal -->
        <div class="relative bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[95vh] overflow-hidden transform transition-all duration-300" (click)="$event.stopPropagation()">
          <!-- Header -->
          <div class="relative bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 p-8 text-white">
            <div class="absolute inset-0 bg-black/10"></div>
            <div class="relative flex items-center justify-between">
              <div class="flex-1">
                <h2 class="text-3xl font-bold mb-2">{{ project?.title }}</h2>
                <p *ngIf="project?.shortDescription" class="text-blue-100 text-lg">{{ project?.shortDescription }}</p>
              </div>
              <button 
                (click)="closeModal()"
                class="p-3 hover:bg-white/20 rounded-xl transition-all duration-200 group"
              >
                <svg class="w-6 h-6 group-hover:rotate-90 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>
          </div>

          <!-- Content -->
          <div class="overflow-y-auto max-h-[calc(95vh-120px)]">
            <!-- Image Gallery -->
            <div *ngIf="project?.images?.length! > 0" class="p-8 bg-gray-50">
              <div class="flex items-center gap-3 mb-6">
                <div class="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                  </svg>
                </div>
                <h3 class="text-2xl font-bold text-gray-900">Project Gallery</h3>
                <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  {{ project?.images?.length || 0 }} {{ (project?.images?.length || 0) === 1 ? 'image' : 'images' }}
                </span>
              </div>
              
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div 
                  *ngFor="let image of project?.images; let i = index"
                  class="group cursor-pointer"
                  (click)="openImageModal(image, i)"
                >
                  <div class="relative overflow-hidden rounded-xl shadow-lg group-hover:shadow-2xl transition-all duration-300">
                    <img 
                      [src]="getImageUrl(image.url)" 
                      [alt]="image.alt"
                      class="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div class="absolute bottom-4 left-4 right-4">
                        <h4 class="text-white font-semibold mb-1">{{ image.alt }}</h4>
                        <p *ngIf="image.caption" class="text-gray-200 text-sm">{{ image.caption }}</p>
                      </div>
                    </div>
                    <div class="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div class="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Project Details -->
            <div class="p-8">
              <!-- Description -->
              <div class="mb-8">
                <div class="flex items-center gap-3 mb-6">
                  <div class="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                    <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                    </svg>
                  </div>
                  <h3 class="text-2xl font-bold text-gray-900">Project Description</h3>
                </div>
                <div class="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <div class="text-gray-700 leading-relaxed project-description" 
                       [innerHTML]="project?.description">
                  </div>
                </div>
              </div>

              <!-- Technologies -->
              <div class="mb-8">
                <div class="flex items-center gap-3 mb-6">
                  <div class="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                    <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
                    </svg>
                  </div>
                  <h3 class="text-2xl font-bold text-gray-900">Technologies Used</h3>
                </div>
                <div class="flex flex-wrap gap-3">
                  <span 
                    *ngFor="let tech of project?.technologies"
                    class="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full text-sm font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    {{ tech }}
                  </span>
                </div>
              </div>

              <!-- Links -->
              <div class="mb-8">
                <div class="flex items-center gap-3 mb-6">
                  <div class="w-8 h-8 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-lg flex items-center justify-center">
                    <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/>
                    </svg>
                  </div>
                  <h3 class="text-2xl font-bold text-gray-900">Project Links</h3>
                </div>
                <div class="flex flex-wrap gap-4">
                  <a 
                    *ngIf="project?.githubUrl"
                    [href]="project?.githubUrl || '#'"
                    target="_blank"
                    class="group flex items-center gap-3 px-6 py-4 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    <div class="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center group-hover:bg-white/30 transition-colors duration-200">
                      <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </div>
                    <div>
                      <div class="font-semibold">View Source Code</div>
                      <div class="text-sm text-gray-300">GitHub Repository</div>
                    </div>
                  </a>
                  
                  <a 
                    *ngIf="project?.liveUrl"
                    [href]="project?.liveUrl || '#'"
                    target="_blank"
                    class="group flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    <div class="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center group-hover:bg-white/30 transition-colors duration-200">
                      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                      </svg>
                    </div>
                    <div>
                      <div class="font-semibold">Live Demo</div>
                      <div class="text-sm text-blue-100">Visit Website</div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Enhanced Image Modal -->
    <div *ngIf="showImageModal" class="fixed inset-0 z-60 overflow-y-auto" (click)="closeImageModal()">
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
  `,
  styles: [`
    /* Custom scrollbar */
    .overflow-y-auto::-webkit-scrollbar {
      width: 6px;
    }
    
    .overflow-y-auto::-webkit-scrollbar-track {
      background: #f1f1f1;
    }
    
    .overflow-y-auto::-webkit-scrollbar-thumb {
      background: #c1c1c1;
      border-radius: 3px;
    }
    
    .overflow-y-auto::-webkit-scrollbar-thumb:hover {
      background: #a8a8a8;
    }
    
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
      color: #3b82f6;
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
      color: #1f2937;
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
      color: #1f2937;
    }
    
    .project-description em {
      font-style: italic;
      color: #6b7280;
    }
    
    .project-description blockquote {
      border-left: 4px solid #3b82f6;
      padding-left: 1rem;
      margin: 1rem 0;
      font-style: italic;
      color: #6b7280;
      background-color: #f8fafc;
      padding: 1rem;
      border-radius: 0.375rem;
    }
    
    .project-description code {
      background-color: #f1f5f9;
      padding: 0.125rem 0.25rem;
      border-radius: 0.25rem;
      font-family: 'Courier New', monospace;
      font-size: 0.875rem;
      color: #e11d48;
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
      color: #3b82f6;
      text-decoration: underline;
    }
    
    .project-description a:hover {
      color: #1d4ed8;
    }
  `]
})
export class ProjectDetailsModalComponent {
  @Input() isOpen = false;
  @Input() project: ProjectDetails | null = null;
  @Output() close = new EventEmitter<void>();

  showImageModal = false;
  currentImage: ProjectImage | null = null;
  currentImageIndex = 0;

  closeModal() {
    this.isOpen = false;
    this.showImageModal = false;
    this.close.emit();
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

  getImageUrl(imageId: string): string {
    if (!imageId) return '';
    return `http://dev-api.technootales.in/v1/cloud/file/${imageId}`;
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (!this.showImageModal) return;
    
    switch (event.key) {
      case 'Escape':
        this.closeImageModal();
        break;
      case 'ArrowLeft':
        event.preventDefault();
        this.previousImage();
        break;
      case 'ArrowRight':
        event.preventDefault();
        this.nextImage();
        break;
    }
  }
}
