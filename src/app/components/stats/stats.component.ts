import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <section class="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white relative overflow-hidden">
      <!-- Background Pattern -->
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/20 to-indigo-600/20"></div>
        <div class="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div class="absolute bottom-20 right-20 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" style="animation-delay: 1s;"></div>
        <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style="animation-delay: 2s;"></div>
      </div>
      
      <div class="container mx-auto px-4 relative z-10">
        <div class="text-center mb-16" data-aos="fade-up">
          <div class="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 rounded-full text-blue-300 text-sm font-medium mb-6 border border-blue-400/30">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
            </svg>
            By The Numbers
          </div>
          <h2 class="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-indigo-200 bg-clip-text text-transparent">By The Numbers</h2>
          <p class="text-xl text-blue-200 max-w-3xl mx-auto leading-relaxed">
            Quantifying my impact and expertise through measurable achievements
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div class="text-center group" data-aos="zoom-in" data-aos-delay="100">
            <div class="relative">
              <div class="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-500"></div>
              <div class="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/20 shadow-xl hover:shadow-blue-500/25 transition-all duration-500 hover:-translate-y-2 group-hover:border-blue-400/50">
                <div class="text-5xl font-bold mb-2 text-white">4+</div>
                <div class="text-lg font-semibold text-blue-200 mb-2">Years Experience</div>
                <div class="text-sm text-blue-300">Building scalable applications</div>
              </div>
            </div>
          </div>
          
          <div class="text-center group" data-aos="zoom-in" data-aos-delay="200">
            <div class="relative">
              <div class="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-500"></div>
              <div class="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/20 shadow-xl hover:shadow-purple-500/25 transition-all duration-500 hover:-translate-y-2 group-hover:border-purple-400/50">
                <div class="text-5xl font-bold mb-2 text-white">50+</div>
                <div class="text-lg font-semibold text-blue-200 mb-2">Projects Completed</div>
                <div class="text-sm text-blue-300">Across various industries</div>
              </div>
            </div>
          </div>
          
          <div class="text-center group" data-aos="zoom-in" data-aos-delay="300">
            <div class="relative">
              <div class="absolute inset-0 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-500"></div>
              <div class="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/20 shadow-xl hover:shadow-green-500/25 transition-all duration-500 hover:-translate-y-2 group-hover:border-green-400/50">
                <div class="text-5xl font-bold mb-2 text-white">15+</div>
                <div class="text-lg font-semibold text-blue-200 mb-2">Technologies</div>
                <div class="text-sm text-blue-300">Mastered and certified</div>
              </div>
            </div>
          </div>
          
          <div class="text-center group" data-aos="zoom-in" data-aos-delay="400">
            <div class="relative">
              <div class="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-500"></div>
              <div class="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/20 shadow-xl hover:shadow-orange-500/25 transition-all duration-500 hover:-translate-y-2 group-hover:border-orange-400/50">
                <div class="text-5xl font-bold mb-2 text-white">100%</div>
                <div class="text-lg font-semibold text-blue-200 mb-2">Client Satisfaction</div>
                <div class="text-sm text-blue-300">Delivered on time</div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="text-center mt-16" data-aos="fade-up" data-aos-delay="500">
          <a routerLink="/experience" class="inline-flex items-center px-8 py-4 bg-white/10 backdrop-blur-xl text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            View My Experience
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
export class StatsComponent {}
