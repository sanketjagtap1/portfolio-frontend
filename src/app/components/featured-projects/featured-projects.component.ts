import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-featured-projects',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <section class="py-20 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 text-white relative overflow-hidden">
      <!-- Background Pattern -->
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-cyan-600/20 to-sky-600/20"></div>
        <div class="absolute top-20 left-20 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div class="absolute bottom-20 right-20 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl animate-pulse" style="animation-delay: 1s;"></div>
        <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-sky-500/5 rounded-full blur-3xl animate-pulse" style="animation-delay: 2s;"></div>
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
          <!-- Project 1 -->
          <div class="group" data-aos="fade-right">
            <div class="relative">
              <div class="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-sky-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div class="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-xl hover:shadow-blue-500/25 transition-all duration-500 hover:-translate-y-2 group-hover:border-blue-400/50">
                <div class="flex items-center gap-4 mb-6">
                  <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-sky-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                    E
                  </div>
                  <div>
                    <h3 class="text-2xl font-bold text-white">E-Commerce Platform</h3>
                    <div class="flex items-center gap-2 mt-1">
                      <span class="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm font-medium border border-green-400/30">Completed</span>
                      <span class="text-sm text-cyan-300">2024</span>
                    </div>
                  </div>
                </div>
                
                <p class="text-cyan-100 leading-relaxed mb-6">
                  A full-stack e-commerce solution built with Angular, Node.js, and MongoDB. 
                  Features include user authentication, payment integration, inventory management, 
                  and real-time notifications.
                </p>
                
                <div class="flex flex-wrap gap-2 mb-6">
                  <span class="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-lg text-sm font-medium border border-blue-400/30">Angular</span>
                  <span class="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-lg text-sm font-medium border border-blue-400/30">Node.js</span>
                  <span class="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-lg text-sm font-medium border border-blue-400/30">MongoDB</span>
                  <span class="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-lg text-sm font-medium border border-blue-400/30">Stripe</span>
                </div>
                
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-4 text-sm text-cyan-300">
                    <div class="flex items-center gap-1">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 19c-5 0-9-2-9-5s4-5 9-5 9 2 9 5-4 5-9 5z"/>
                        <path d="M9 19c0-2.5 2-4.5 4.5-4.5s4.5 2 4.5 4.5"/>
                      </svg>
                      <span>10k+ Users</span>
                    </div>
                    <div class="flex items-center gap-1">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                      <span>4.9 Rating</span>
                    </div>
                  </div>
                  <a routerLink="/projects" class="text-blue-300 hover:text-blue-200 font-semibold flex items-center gap-1 transition-colors duration-300">
                    View Details
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Project 2 -->
          <div class="group" data-aos="fade-left">
            <div class="relative">
              <div class="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-sky-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div class="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-xl hover:shadow-cyan-500/25 transition-all duration-500 hover:-translate-y-2 group-hover:border-cyan-400/50">
                <div class="flex items-center gap-4 mb-6">
                  <div class="w-16 h-16 bg-gradient-to-br from-cyan-500 to-sky-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                    A
                  </div>
                  <div>
                    <h3 class="text-2xl font-bold text-white">Analytics Dashboard</h3>
                    <div class="flex items-center gap-2 mt-1">
                      <span class="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm font-medium border border-blue-400/30">In Progress</span>
                      <span class="text-sm text-cyan-300">2024</span>
                    </div>
                  </div>
                </div>
                
                <p class="text-cyan-100 leading-relaxed mb-6">
                  A comprehensive analytics dashboard for business intelligence. Built with React, 
                  D3.js, and Python backend. Features real-time data visualization, custom reports, 
                  and automated insights.
                </p>
                
                <div class="flex flex-wrap gap-2 mb-6">
                  <span class="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-lg text-sm font-medium border border-cyan-400/30">React</span>
                  <span class="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-lg text-sm font-medium border border-cyan-400/30">D3.js</span>
                  <span class="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-lg text-sm font-medium border border-cyan-400/30">Python</span>
                  <span class="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-lg text-sm font-medium border border-cyan-400/30">PostgreSQL</span>
                </div>
                
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-4 text-sm text-cyan-300">
                    <div class="flex items-center gap-1">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 19c-5 0-9-2-9-5s4-5 9-5 9 2 9 5-4 5-9 5z"/>
                        <path d="M9 19c0-2.5 2-4.5 4.5-4.5s4.5 2 4.5 4.5"/>
                      </svg>
                      <span>5k+ Users</span>
                    </div>
                    <div class="flex items-center gap-1">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                      <span>4.8 Rating</span>
                    </div>
                  </div>
                  <a routerLink="/projects" class="text-cyan-300 hover:text-cyan-200 font-semibold flex items-center gap-1 transition-colors duration-300">
                    View Details
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                    </svg>
                  </a>
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
  styles: []
})
export class FeaturedProjectsComponent {}
