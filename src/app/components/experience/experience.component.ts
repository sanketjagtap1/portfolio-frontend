import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService, Experience } from '../../services/portfolio.service';
import { timeout, catchError, of } from 'rxjs';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="experience" class="section bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white relative overflow-hidden min-h-screen" role="region" aria-labelledby="experience-heading">
      <!-- Background Pattern -->
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/20 to-purple-600/20"></div>
        <div class="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div class="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style="animation-delay: 1s;"></div>
        <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl animate-pulse" style="animation-delay: 2s;"></div>
      </div>
      
      <div class="container relative z-10 py-16">
        <!-- Header Section -->
        <div class="text-center mb-20" data-aos="fade-up">
          <div class="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 rounded-full text-blue-300 text-sm font-medium mb-6 border border-blue-400/30">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
            </svg>
            Professional Journey
          </div>
          <h2 id="experience-heading" class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent leading-tight">
            Professional Experience
          </h2>
          <div class="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full mb-8"></div>
          <p class="text-lg md:text-xl text-blue-200 mt-8 max-w-4xl mx-auto leading-relaxed">
            A journey of growth, innovation, and leadership across diverse technology landscapes, delivering impactful solutions and driving digital transformation
          </p>
        </div>

        <!-- Loading State -->
        <div *ngIf="isLoading" class="flex flex-col justify-center items-center py-20" role="status" aria-label="Loading experience data">
          <div class="relative mb-4">
            <div class="w-16 h-16 border-4 border-blue-500/30 border-t-blue-400 rounded-full animate-spin"></div>
            <div class="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-purple-400 rounded-full animate-spin" style="animation-delay: 0.5s;"></div>
          </div>
          <p class="text-blue-200 text-lg">Loading experience data...</p>
          <button (click)="loadExperienceData()" class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Retry Loading
          </button>
          <span class="sr-only">Loading experience data...</span>
        </div>
        
        <!-- Experience Timeline -->
        <div *ngIf="!isLoading" class="relative max-w-5xl mx-auto" role="list" aria-label="Professional experience timeline">
          <!-- Enhanced Timeline line -->
          <div class="absolute left-4 md:left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 via-purple-400 to-pink-400 rounded-full shadow-lg" aria-hidden="true"></div>
          
          <div class="space-y-12 md:space-y-16">
            <div 
              *ngFor="let exp of experiences; let i = index" 
              class="relative group"
              role="listitem"
              data-aos="fade-up"
              [attr.data-aos-delay]="i * 200"
              [attr.aria-label]="exp.position + ' at ' + exp.company"
            >
              <!-- Timeline content -->
              <div class="ml-12 md:ml-20">
                <div class="relative">
                  <!-- Card Background Glow -->
                  <div class="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl md:rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                  
                  <!-- Main Card -->
                  <div class="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl md:rounded-3xl p-6 md:p-8 border border-white/20 shadow-2xl hover:shadow-blue-500/25 transition-all duration-500 hover:-translate-y-2 group-hover:border-blue-400/50">
                    <!-- Company Header -->
                    <div class="flex flex-col md:flex-row md:items-center gap-4 mb-6">
                      <div class="flex items-center gap-4">
                        <div class="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg">
                          <span class="text-lg md:text-2xl font-bold text-white">{{ exp.company.charAt(0) }}</span>
                        </div>
                        <div class="flex-1">
                          <h3 class="text-xl md:text-2xl font-bold text-white mb-1">{{ exp.position }}</h3>
                          <h4 class="text-base md:text-lg font-semibold text-blue-300">{{ exp.company }}</h4>
                        </div>
                      </div>
                      <div class="md:text-right md:ml-auto">
                        <div class="inline-flex px-3 py-1 rounded-full text-xs font-semibold mb-2"
                             [class]="exp.current ? 'bg-green-500/20 text-green-300 border border-green-400/30' : 'bg-gray-500/20 text-gray-300 border border-gray-400/30'">
                          <span class="w-2 h-2 rounded-full mr-2" 
                                [class]="exp.current ? 'bg-green-400 animate-pulse' : 'bg-gray-400'"></span>
                          {{ exp.current ? 'Current' : 'Completed' }}
                        </div>
                        <div class="text-sm text-blue-200 font-medium">
                          {{ formatDate(exp.startDate) }} - {{ exp.current ? 'Present' : formatDate(exp.endDate || '') }}
                        </div>
                      </div>
                    </div>
                    
                    <!-- Location -->
                    <div class="flex items-center gap-2 text-blue-200 mb-6">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                        <circle cx="12" cy="10" r="3"/>
                      </svg>
                      <span class="text-sm font-medium">{{ exp.location }}</span>
                    </div>
                    
                    <!-- Description -->
                    <p class="text-blue-100 leading-relaxed mb-6 md:mb-8 text-base md:text-lg">{{ exp.description }}</p>
                    
                    
                    <!-- Technologies -->
                    <div>
                      <h5 class="text-base md:text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                        Technologies Used
                      </h5>
                      <div class="flex flex-wrap gap-2 md:gap-3" role="list" aria-label="Technologies used">
                        <span *ngFor="let tech of exp.technologies" 
                              class="px-3 py-1.5 md:px-4 md:py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-200 rounded-lg md:rounded-xl text-xs md:text-sm font-medium border border-blue-400/30 hover:from-blue-500/40 hover:to-purple-500/40 hover:border-blue-400/50 transition-all duration-300 hover:scale-105"
                              role="listitem">
                          {{ tech }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Enhanced Timeline marker -->
              <div class="absolute left-2 md:left-6 top-6 md:top-8">
                <div class="relative">
                  <div class="w-4 h-4 md:w-6 md:h-6 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full border-2 md:border-4 border-slate-900 shadow-xl"></div>
                  <div class="absolute inset-0 w-4 h-4 md:w-6 md:h-6 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Enhanced Career Highlights -->
        <div *ngIf="!isLoading" class="mt-20 md:mt-32" data-aos="fade-up">
          <div class="text-center mb-12 md:mb-16">
            <div class="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/20 rounded-full text-purple-300 text-sm font-medium mb-6 border border-purple-400/30">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              Career Highlights
            </div>
            <h3 class="text-3xl md:text-4xl font-bold text-white mb-4">Key Achievements</h3>
            <div class="w-20 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full"></div>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 auto-rows-fr">
            <div class="group" data-aos="zoom-in" data-aos-delay="100">
              <div class="relative">
                <div class="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl md:rounded-2xl blur-lg group-hover:blur-xl transition-all duration-500"></div>
                <div class="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-xl md:rounded-2xl p-6 md:p-8 border border-white/20 shadow-xl hover:shadow-blue-500/25 transition-all duration-500 hover:-translate-y-2 group-hover:border-blue-400/50 h-full flex flex-col">
                  <div class="text-3xl md:text-4xl mb-4">🚀</div>
                  <h4 class="text-lg md:text-xl font-bold text-white mb-3">Performance Optimization</h4>
                  <p class="text-blue-200 leading-relaxed text-sm md:text-base">Improved application performance by 40% through code optimization and database tuning</p>
                </div>
              </div>
            </div>
            
            <div class="group" data-aos="zoom-in" data-aos-delay="200">
              <div class="relative">
                <div class="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl md:rounded-2xl blur-lg group-hover:blur-xl transition-all duration-500"></div>
                <div class="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-xl md:rounded-2xl p-6 md:p-8 border border-white/20 shadow-xl hover:shadow-purple-500/25 transition-all duration-500 hover:-translate-y-2 group-hover:border-purple-400/50 h-full flex flex-col">
                  <div class="text-3xl md:text-4xl mb-4">⏱️</div>
                  <h4 class="text-lg md:text-xl font-bold text-white mb-3">Process Automation</h4>
                  <p class="text-blue-200 leading-relaxed text-sm md:text-base">Reduced processing time from 2 weeks to 2 days through automated workflows</p>
                </div>
              </div>
            </div>
            
            <div class="group" data-aos="zoom-in" data-aos-delay="300">
              <div class="relative">
                <div class="absolute inset-0 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-xl md:rounded-2xl blur-lg group-hover:blur-xl transition-all duration-500"></div>
                <div class="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-xl md:rounded-2xl p-6 md:p-8 border border-white/20 shadow-xl hover:shadow-green-500/25 transition-all duration-500 hover:-translate-y-2 group-hover:border-green-400/50 h-full flex flex-col">
                  <div class="text-3xl md:text-4xl mb-4">👥</div>
                  <h4 class="text-lg md:text-xl font-bold text-white mb-3">Team Leadership</h4>
                  <p class="text-blue-200 leading-relaxed text-sm md:text-base">Led teams of 4+ developers and conducted code reviews for quality assurance</p>
                </div>
              </div>
            </div>
            
            <div class="group" data-aos="zoom-in" data-aos-delay="400">
              <div class="relative">
                <div class="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-xl md:rounded-2xl blur-lg group-hover:blur-xl transition-all duration-500"></div>
                <div class="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-xl md:rounded-2xl p-6 md:p-8 border border-white/20 shadow-xl hover:shadow-orange-500/25 transition-all duration-500 hover:-translate-y-2 group-hover:border-orange-400/50 h-full flex flex-col">
                  <div class="text-3xl md:text-4xl mb-4">🏗️</div>
                  <h4 class="text-lg md:text-xl font-bold text-white mb-3">Architecture Design</h4>
                  <p class="text-blue-200 leading-relaxed text-sm md:text-base">Designed and implemented microservices architecture for scalable applications</p>
                </div>
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
      0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.3); }
      50% { box-shadow: 0 0 30px rgba(59, 130, 246, 0.6); }
    }
    
    .group:hover .animate-float {
      animation: float 2s ease-in-out infinite;
    }
    
    .group:hover .animate-glow {
      animation: glow 2s ease-in-out infinite;
    }
    
    /* Enhanced scrollbar for webkit browsers */
    .experience-timeline::-webkit-scrollbar {
      width: 6px;
    }
    
    .experience-timeline::-webkit-scrollbar-track {
      background: rgba(255, 255, 255, 0.1);
      border-radius: 3px;
    }
    
    .experience-timeline::-webkit-scrollbar-thumb {
      background: linear-gradient(45deg, #3b82f6, #8b5cf6);
      border-radius: 3px;
    }
    
    .experience-timeline::-webkit-scrollbar-thumb:hover {
      background: linear-gradient(45deg, #2563eb, #7c3aed);
    }
    
    /* Professional focus states for accessibility */
    .focus-visible:focus {
      outline: 2px solid #3b82f6;
      outline-offset: 2px;
    }
    
    /* Smooth transitions for all interactive elements */
    * {
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    /* Enhanced text selection */
    ::selection {
      background: rgba(59, 130, 246, 0.3);
      color: white;
    }
    
    /* Professional gradient text */
    .gradient-text {
      background: linear-gradient(135deg, #ffffff 0%, #e0e7ff 50%, #c7d2fe 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
  `]
})
export class ExperienceComponent implements OnInit {
  experiences: Experience[] = [];
  isLoading = true;

  constructor(private portfolioService: PortfolioService, private cdr: ChangeDetectorRef) {
    // Component initialized
  }

  ngOnInit() {
    this.loadExperienceData();
  }

  loadExperienceData() {
    this.isLoading = true;
    this.experiences = [];
    
    this.portfolioService.getExperience().pipe(
      timeout(10000), // 10 second timeout
      catchError(error => {
        console.error('API call failed or timed out:', error);
        return of([]); // Return empty array on error
      })
    ).subscribe({
      next: (data) => {
        if (data && data.length > 0) {
          this.experiences = data;
        } else {
          this.loadFallbackData();
        }
        this.isLoading = false;
        setTimeout(() => {
          this.cdr.detectChanges(); // Force change detection in next tick
        }, 0);
      },
      error: (error) => {
        console.error('Error loading experience data:', error);
        this.loadFallbackData();
        this.isLoading = false;
        setTimeout(() => {
          this.cdr.detectChanges(); // Force change detection in next tick
        }, 0);
      }
    });
  }

  private loadFallbackData() {
    this.experiences = [
      {
        id: 1,
        position: 'Senior Software Engineer',
        company: 'Pegasus InfoCorp',
        location: 'Mumbai, India',
        startDate: '2024-09',
        endDate: '',
        current: true,
        description: 'Spearheading development of scalable web and mobile modules using Node.js, Express.js, and Angular. Improved response times and UI performance through optimized development practices. Designed and integrated RESTful APIs for loan and insurance workflows with external partners (KreditBee and Motilal Oswal). Engineered mobile features using Ionic + Angular for consistent cross-platform user experience.',
        technologies: ['Angular', 'Node.js', 'Express.js', 'Ionic', 'MySQL', 'REST APIs', 'SonarQube'],
        order: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 2,
        position: 'Assistant Manager IT',
        company: 'Bajaj Housing Finance Ltd (BASSL)',
        location: 'Pune, India',
        startDate: '2022-10',
        endDate: '2024-09',
        current: false,
        description: 'Led end-to-end development of enterprise-grade Retention Portal using Angular, Node.js, and PostgreSQL. Built and deployed microservices architecture on AWS EC2, configured Nginx and PM2 for performance and availability. Automated loan service request processes, reducing retention processing time from 2 weeks to 2 days.',
        technologies: ['Angular', 'Node.js', 'PostgreSQL', 'AWS', 'Nginx', 'PM2', 'Microservices'],
        order: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 3,
        position: 'Software Engineer',
        company: 'Televed Systems Pvt Ltd',
        location: 'Pune, India',
        startDate: '2021-11',
        endDate: '2022-10',
        current: false,
        description: 'Developed modules for healthcare product platform using Angular, Node.js, and MongoDB. Created scalable and reusable REST APIs supporting patient records, appointment scheduling, and doctor dashboards. Built responsive, user-centric interfaces using Material UI and optimized client-side performance.',
        technologies: ['Angular', 'Node.js', 'MongoDB', 'Material UI', 'RBAC', 'REST APIs'],
        order: 2,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];
  }

  formatDate(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString + '-01');
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  }
}

