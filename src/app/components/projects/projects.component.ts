import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PortfolioService, Project, ProjectImage } from '../../services/portfolio.service';
import { timeout, catchError, of } from 'rxjs';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="projects" class="section bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white relative overflow-hidden min-h-screen">
      <!-- Background Pattern -->
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/20 to-indigo-600/20"></div>
        <div class="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div class="absolute bottom-20 right-20 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" style="animation-delay: 1s;"></div>
        <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style="animation-delay: 2s;"></div>
      </div>
      
      <div class="container relative z-10 py-16">
        <!-- Header Section -->
        <div class="text-center mb-20" data-aos="fade-up">
          <div class="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 rounded-full text-blue-300 text-sm font-medium mb-6 border border-blue-400/30">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            Featured Projects
          </div>
          <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-indigo-200 bg-clip-text text-transparent leading-tight">
            Portfolio Projects
          </h2>
          <div class="w-24 h-1 bg-gradient-to-r from-blue-400 to-indigo-400 mx-auto rounded-full mb-8"></div>
          <p class="text-lg md:text-xl text-blue-200 mt-8 max-w-4xl mx-auto leading-relaxed">
            Innovative solutions and technical expertise showcased through real-world projects that demonstrate full-stack development capabilities
          </p>
        </div>

        <!-- Loading State -->
        <div *ngIf="isLoading" class="flex flex-col justify-center items-center py-20" role="status" aria-label="Loading projects data">
          <div class="relative mb-4">
            <div class="w-16 h-16 border-4 border-blue-500/30 border-t-blue-400 rounded-full animate-spin"></div>
            <div class="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-indigo-400 rounded-full animate-spin" style="animation-delay: 0.5s;"></div>
          </div>
          <p class="text-blue-200 text-lg">Loading projects...</p>
          <span class="sr-only">Loading projects data...</span>
        </div>
        
        <!-- Projects Grid -->
        <div *ngIf="!isLoading" class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          <div 
            *ngFor="let project of projects; let i = index" 
            class="group relative cursor-pointer"
            data-aos="fade-up"
            [attr.data-aos-delay]="i * 200"
            (click)="navigateToProjectDetails(project.id)"
          >
            <!-- Card Background Glow -->
            <div class="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
            
            <!-- Main Card -->
            <div class="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/20 shadow-2xl hover:shadow-blue-500/25 transition-all duration-500 hover:-translate-y-2 group-hover:border-blue-400/50">
              <!-- Project Image/Header -->
              <div class="relative h-48 overflow-hidden">
                <div *ngIf="getProjectMainImage(project)" class="w-full h-full bg-cover bg-center" [style.background-image]="'url(' + getImageUrl(getProjectMainImage(project)!) + ')'">
                  <div class="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <h3 class="text-xl font-bold text-white text-center">{{ project.title }}</h3>
                  </div>
                  <!-- Image count indicator -->
                  <div *ngIf="getProjectImageCount(project) > 1" class="absolute top-4 left-4 px-2 py-1 bg-black/50 text-white text-xs rounded-full">
                    {{ getProjectImageCount(project) }} images
                  </div>
                </div>
                <div *ngIf="!getProjectMainImage(project)" class="w-full h-full bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 flex items-center justify-center">
                  <div class="text-center">
                    <div class="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    </div>
                    <h3 class="text-xl font-bold text-white">{{ project.title }}</h3>
                  </div>
                </div>
                <!-- Status Badge -->
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
              
              <!-- Project Content -->
              <div class="p-8">
                <!-- Project Title -->
                <h3 class="text-2xl font-bold text-white mb-4 group-hover:text-blue-200 transition-colors duration-300">
                  {{ project.title }}
                </h3>
                
                <!-- Short Description Only -->
                <div *ngIf="project.shortDescription" class="mb-6">
                  <p class="text-blue-200 leading-relaxed text-sm md:text-base font-medium">
                    {{ project.shortDescription }}
                  </p>
                </div>
                
                <!-- Technologies -->
                <div class="mb-8">
                  <div class="flex items-center gap-2 mb-4">
                    <div class="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <h4 class="text-sm font-semibold text-blue-300 uppercase tracking-wide">Technologies</h4>
                  </div>
                  <div class="flex flex-wrap gap-2">
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
                
                <!-- Action Buttons -->
                <div class="flex flex-col sm:flex-row gap-3 pt-4 border-t border-white/10">
                  <a 
                    *ngIf="project.githubUrl" 
                    [href]="project.githubUrl" 
                    target="_blank" 
                    class="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-gray-600/20 to-gray-700/20 text-gray-200 rounded-xl font-medium border border-gray-400/30 hover:from-gray-600/40 hover:to-gray-700/40 hover:border-gray-400/50 transition-all duration-300 hover:scale-105 group"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="group-hover:scale-110 transition-transform duration-200">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                    </svg>
                    <span>View Code</span>
                  </a>
                  <a
                    *ngIf="project.liveUrl"
                    [href]="project.liveUrl"
                    target="_blank"
                    class="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl font-medium shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105 group"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="group-hover:scale-110 transition-transform duration-200">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                      <polyline points="15,3 21,3 21,9"/>
                      <line x1="10" y1="14" x2="21" y2="3"/>
                    </svg>
                    <span>Live Demo</span>
                  </a>
             <button
               (click)="navigateToProjectDetails(project.id)"
               class="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-200 rounded-xl font-medium border border-purple-400/30 hover:from-purple-500/40 hover:to-pink-500/40 hover:border-purple-400/50 transition-all duration-300 hover:scale-105 group"
             >
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
        
        <!-- Project Statistics -->
        <div *ngIf="!isLoading" class="mb-20" data-aos="fade-up">
          <div class="text-center mb-12 md:mb-16">
            <div class="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/20 rounded-full text-indigo-300 text-sm font-medium mb-6 border border-indigo-400/30">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
              </svg>
              Project Statistics
            </div>
            <h3 class="text-3xl md:text-4xl font-bold text-white mb-4">Development Metrics</h3>
            <div class="w-20 h-1 bg-gradient-to-r from-blue-400 to-indigo-400 mx-auto rounded-full"></div>
          </div>
          
          <div class="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            <div class="group" data-aos="zoom-in" data-aos-delay="100">
              <div class="relative">
                <div class="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-xl md:rounded-2xl blur-lg group-hover:blur-xl transition-all duration-500"></div>
                <div class="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-xl md:rounded-2xl p-6 md:p-8 border border-white/20 shadow-xl hover:shadow-blue-500/25 transition-all duration-500 hover:-translate-y-2 group-hover:border-blue-400/50 text-center">
                  <div class="text-3xl md:text-4xl mb-4">🚀</div>
                  <h4 class="text-lg md:text-xl font-bold text-white mb-3">{{ projects.length }}+</h4>
                  <p class="text-blue-200 leading-relaxed text-sm md:text-base">Projects Completed</p>
                </div>
              </div>
            </div>

            <div class="group" data-aos="zoom-in" data-aos-delay="200">
              <div class="relative">
                <div class="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-xl md:rounded-2xl blur-lg group-hover:blur-xl transition-all duration-500"></div>
                <div class="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-xl md:rounded-2xl p-6 md:p-8 border border-white/20 shadow-xl hover:shadow-indigo-500/25 transition-all duration-500 hover:-translate-y-2 group-hover:border-indigo-400/50 text-center">
                  <div class="text-3xl md:text-4xl mb-4">⚡</div>
                  <h4 class="text-lg md:text-xl font-bold text-white mb-3">{{ getTotalTechnologies() }}+</h4>
                  <p class="text-blue-200 leading-relaxed text-sm md:text-base">Technologies Used</p>
                </div>
              </div>
            </div>

            <div class="group" data-aos="zoom-in" data-aos-delay="300">
              <div class="relative">
                <div class="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-xl md:rounded-2xl blur-lg group-hover:blur-xl transition-all duration-500"></div>
                <div class="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-xl md:rounded-2xl p-6 md:p-8 border border-white/20 shadow-xl hover:shadow-purple-500/25 transition-all duration-500 hover:-translate-y-2 group-hover:border-purple-400/50 text-center">
                  <div class="text-3xl md:text-4xl mb-4">💯</div>
                  <h4 class="text-lg md:text-xl font-bold text-white mb-3">100%</h4>
                  <p class="text-blue-200 leading-relaxed text-sm md:text-base">Client Satisfaction</p>
                </div>
              </div>
            </div>

            <div class="group" data-aos="zoom-in" data-aos-delay="400">
              <div class="relative">
                <div class="absolute inset-0 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-xl md:rounded-2xl blur-lg group-hover:blur-xl transition-all duration-500"></div>
                <div class="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-xl md:rounded-2xl p-6 md:p-8 border border-white/20 shadow-xl hover:shadow-green-500/25 transition-all duration-500 hover:-translate-y-2 group-hover:border-green-400/50 text-center">
                  <div class="text-3xl md:text-4xl mb-4">🛠️</div>
                  <h4 class="text-lg md:text-xl font-bold text-white mb-3">24/7</h4>
                  <p class="text-blue-200 leading-relaxed text-sm md:text-base">Support Available</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Call to Action -->
        <div *ngIf="!isLoading" class="text-center" data-aos="fade-up">
          <div class="relative">
            <div class="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-3xl blur-xl"></div>
            <div class="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-12 md:p-16 text-white shadow-2xl">
              <div class="max-w-3xl mx-auto">
                <h3 class="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Next Project?</h3>
                <p class="text-lg md:text-xl mb-8 opacity-90 leading-relaxed">
                  Let's collaborate to bring your innovative ideas to life with cutting-edge technology and professional development practices.
                </p>
                <a href="#contact" class="inline-flex items-center gap-3 px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  Start a Project
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M7 17L17 7M17 7H7M17 7V17"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    /* Custom animations for enhanced user experience */
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
    }
    
    @keyframes glow {
      0%, 100% { box-shadow: 0 0 20px rgba(147, 51, 234, 0.3); }
      50% { box-shadow: 0 0 30px rgba(147, 51, 234, 0.6); }
    }
    
    .group:hover .animate-float {
      animation: float 2s ease-in-out infinite;
    }
    
    .group:hover .animate-glow {
      animation: glow 2s ease-in-out infinite;
    }
    
    /* Enhanced scrollbar for webkit browsers */
    .projects-container::-webkit-scrollbar {
      width: 6px;
    }
    
    .projects-container::-webkit-scrollbar-track {
      background: rgba(255, 255, 255, 0.1);
      border-radius: 3px;
    }
    
    .projects-container::-webkit-scrollbar-thumb {
      background: linear-gradient(45deg, #8b5cf6, #ec4899);
      border-radius: 3px;
    }
    
    .projects-container::-webkit-scrollbar-thumb:hover {
      background: linear-gradient(45deg, #7c3aed, #db2777);
    }
    
    /* Professional focus states for accessibility */
    .focus-visible:focus {
      outline: 2px solid #8b5cf6;
      outline-offset: 2px;
    }
    
    /* Smooth transitions for all interactive elements */
    * {
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    /* Enhanced text selection */
    ::selection {
      background: rgba(147, 51, 234, 0.3);
      color: white;
    }
    
    /* Professional gradient text */
    .gradient-text {
      background: linear-gradient(135deg, #ffffff 0%, #e0e7ff 50%, #fce7f3 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    
    /* Project description formatting */
    .project-description ul {
      list-style: none;
      padding-left: 0;
    }
    
    .project-description li {
      display: flex;
      align-items: flex-start;
      gap: 0.5rem;
      margin-bottom: 0.5rem;
    }
    
    .project-description strong {
      color: #ffffff;
      font-weight: 600;
    }
    
    .project-description em {
      color: #93c5fd;
      font-style: italic;
    }
    
    .project-description p {
      margin-bottom: 1rem;
    }
    
    .project-description p:last-child {
      margin-bottom: 0;
    }
  `]
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [];
  isLoading = true;

  constructor(private portfolioService: PortfolioService, private cdr: ChangeDetectorRef, private router: Router) {
    // Component initialized
  }

  ngOnInit() {
    this.loadProjectsData();
  }

  loadProjectsData() {
    this.isLoading = true;
    this.projects = [];
    
    this.portfolioService.getProjects().pipe(
      timeout(10000), // 10 second timeout
      catchError(error => {
        console.error('API call failed or timed out:', error);
        return of([]); // Return empty array on error
      })
    ).subscribe({
      next: (data) => {
        console.log('Projects API response:', data);
        if (data && data.length > 0) {
          this.projects = data;
          console.log('Projects loaded:', this.projects);
          // Log each project's images
          this.projects.forEach((project, index) => {
            console.log(`Project ${index + 1} (${project.title}):`, {
              image: project.image,
              featuredImage: project.featuredImage,
              images: project.images,
              imageCount: this.getProjectImageCount(project)
            });
          });
        } else {
          this.loadFallbackData();
        }
        this.isLoading = false;
        setTimeout(() => {
          this.cdr.detectChanges(); // Force change detection in next tick
        }, 0);
      },
      error: (error) => {
        console.error('Error loading projects data:', error);
        this.loadFallbackData();
        this.isLoading = false;
        setTimeout(() => {
          this.cdr.detectChanges(); // Force change detection in next tick
        }, 0);
      }
    });
  }

  private loadFallbackData() {
    this.projects = [
      {
        id: 1,
        title: 'AlgoETF - Automated Trading Platform',
        description: 'Real-time automated trading platform with multi-broker integration for maximizing trading profits.',
        shortDescription: 'Designed and developed a comprehensive automated trading platform that integrates with multiple brokers to execute trades based on market conditions and predefined algorithms.',
        technologies: ['Angular', 'Node.js', 'Express.js', 'Redis', 'WebSockets', 'MySQL', 'AWS', 'GitHub Actions'],
        githubUrl: 'https://github.com/sanketjagtap/algo-etf',
        liveUrl: 'https://algo-etf-demo.com',
        status: 'completed',
        featured: true,
        order: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        images: [
          {
            id: 'sample1',
            url: 'sample1',
            alt: 'AlgoETF Dashboard Overview',
            caption: 'Main dashboard showing trading analytics and portfolio performance'
          },
          {
            id: 'sample2',
            url: 'sample2',
            alt: 'Trading Algorithm Configuration',
            caption: 'Algorithm configuration interface for setting up trading strategies'
          },
          {
            id: 'sample3',
            url: 'sample3',
            alt: 'Real-time Market Data',
            caption: 'Live market data feed with real-time price updates'
          }
        ]
      }
    ];
  }

  formatDate(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString + '-01');
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  }

  getTotalTechnologies(): number {
    const allTechs = new Set();
    this.projects.forEach(project => {
      project.technologies.forEach(tech => allTechs.add(tech));
    });
    return allTechs.size;
  }

  getImageUrl(image: string): string {
    // If it's already a full URL, return as is
    if (image.startsWith('http')) {
      return image;
    }
    // If it's a file ID, construct the API URL
    return `https://dev-api.technootales.in/v1/cloud/file/${image}`;
  }

  getProjectMainImage(project: Project): string | null {
    // Priority: featuredImage -> first image from images array -> image (legacy)
    if (project.featuredImage) {
      return project.featuredImage;
    }
    if (project.images && project.images.length > 0) {
      return project.images[0].url;
    }
    return project.image || null;
  }

  getProjectImageCount(project: Project): number {
    let count = 0;
    if (project.featuredImage) count++;
    if (project.images && project.images.length > 0) count += project.images.length;
    if (project.image && !project.featuredImage) count++; // Don't double count if featuredImage is the same as image
    return count;
  }

  navigateToProjectDetails(projectId: number) {
    this.router.navigate(['/projects', projectId]);
  }
}
