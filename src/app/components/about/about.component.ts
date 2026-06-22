import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="about" class="section bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 text-white relative overflow-hidden">
      <!-- Background Pattern -->
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-sky-600/20 to-cyan-600/20"></div>
        <div class="absolute top-20 left-20 w-72 h-72 bg-sky-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div class="absolute bottom-20 right-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style="animation-delay: 1s;"></div>
        <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl animate-pulse" style="animation-delay: 2s;"></div>
      </div>
      
      <div class="container relative z-10 py-16">
        <!-- Header Section -->
        <div class="text-center mb-20" data-aos="fade-up">
          <div class="inline-flex items-center gap-2 px-4 py-2 bg-sky-500/20 rounded-full text-sky-300 text-sm font-medium mb-6 border border-sky-400/30">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
            About Me
          </div>
          <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-sky-100 to-cyan-200 bg-clip-text text-transparent leading-tight">
            About Me
          </h2>
          <div class="w-24 h-1 bg-gradient-to-r from-sky-400 to-cyan-400 mx-auto rounded-full mb-8"></div>
          <p class="text-lg md:text-xl text-sky-200 mt-8 max-w-4xl mx-auto leading-relaxed">
            Passionate about creating scalable web applications with modern technologies
          </p>
        </div>
        
        <div class="grid lg:grid-cols-2 gap-12 mb-16">
          <div data-aos="fade-right">
            <div class="mb-8">
              <h3 class="text-2xl font-bold text-white mb-4">Passionate Full Stack Developer</h3>
              <p class="text-lg text-sky-100 leading-relaxed">
                I'm a dedicated Full Stack Developer with 4+ years of experience in designing, 
                developing, and deploying scalable web and mobile applications. My expertise spans 
                across modern technologies including Angular, Node.js, Flutter, and AWS.
              </p>
            </div>
            
            <div class="space-y-6">
              <div class="group">
                <div class="relative">
                  <div class="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-sky-500/20 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-500"></div>
                  <div class="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl hover:shadow-blue-500/25 transition-all duration-500 hover:-translate-y-2 group-hover:border-blue-400/50">
                    <div class="flex items-start gap-4">
                      <div class="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-sky-600 rounded-xl flex items-center justify-center text-white shadow-lg">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                      </div>
                      <div>
                        <h4 class="text-lg font-semibold text-white mb-1">4+ Years Experience</h4>
                        <p class="text-sm text-sky-200">Building scalable applications across various industries</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="group">
                <div class="relative">
                  <div class="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-sky-500/20 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-500"></div>
                  <div class="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl hover:shadow-cyan-500/25 transition-all duration-500 hover:-translate-y-2 group-hover:border-cyan-400/50">
                    <div class="flex items-start gap-4">
                      <div class="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-cyan-500 to-sky-600 rounded-xl flex items-center justify-center text-white shadow-lg">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <path d="M9 12l2 2 4-4"/>
                          <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3"/>
                          <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3"/>
                          <path d="M12 3c0 1-1 3-3 3s-3-2-3-3 1-3 3-3 3 2 3 3"/>
                          <path d="M12 21c0-1 1-3 3-3s3 2 3 3-1 3-3 3-3-2-3-3"/>
                        </svg>
                      </div>
                      <div>
                        <h4 class="text-lg font-semibold text-white mb-1">Full Stack Expertise</h4>
                        <p class="text-sm text-sky-200">Frontend, Backend, Database, and Cloud technologies</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="group">
                <div class="relative">
                  <div class="absolute inset-0 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-500"></div>
                  <div class="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl hover:shadow-green-500/25 transition-all duration-500 hover:-translate-y-2 group-hover:border-green-400/50">
                    <div class="flex items-start gap-4">
                      <div class="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                        </svg>
                      </div>
                      <div>
                        <h4 class="text-lg font-semibold text-white mb-1">Performance Focused</h4>
                        <p class="text-sm text-sky-200">Optimizing applications for speed and scalability</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div data-aos="fade-left">
            <div class="grid grid-cols-2 gap-6 mb-8">
              <div class="group">
                <div class="relative">
                  <div class="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-sky-500/20 rounded-xl blur-lg group-hover:blur-xl transition-all duration-500"></div>
                  <div class="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/20 shadow-xl hover:shadow-blue-500/25 transition-all duration-500 hover:-translate-y-2 group-hover:border-blue-400/50 text-center">
                    <div class="text-3xl font-bold text-white mb-2">4+</div>
                    <div class="text-sm text-sky-200 font-medium">Years Experience</div>
                  </div>
                </div>
              </div>
              
              <div class="group">
                <div class="relative">
                  <div class="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-sky-500/20 rounded-xl blur-lg group-hover:blur-xl transition-all duration-500"></div>
                  <div class="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/20 shadow-xl hover:shadow-cyan-500/25 transition-all duration-500 hover:-translate-y-2 group-hover:border-cyan-400/50 text-center">
                    <div class="text-3xl font-bold text-white mb-2">50+</div>
                    <div class="text-sm text-sky-200 font-medium">Projects Completed</div>
                  </div>
                </div>
              </div>
              
              <div class="group">
                <div class="relative">
                  <div class="absolute inset-0 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-xl blur-lg group-hover:blur-xl transition-all duration-500"></div>
                  <div class="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/20 shadow-xl hover:shadow-green-500/25 transition-all duration-500 hover:-translate-y-2 group-hover:border-green-400/50 text-center">
                    <div class="text-3xl font-bold text-white mb-2">15+</div>
                    <div class="text-sm text-sky-200 font-medium">Technologies</div>
                  </div>
                </div>
              </div>
              
              <div class="group">
                <div class="relative">
                  <div class="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-xl blur-lg group-hover:blur-xl transition-all duration-500"></div>
                  <div class="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/20 shadow-xl hover:shadow-orange-500/25 transition-all duration-500 hover:-translate-y-2 group-hover:border-orange-400/50 text-center">
                    <div class="text-3xl font-bold text-white mb-2">100%</div>
                    <div class="text-sm text-sky-200 font-medium">Client Satisfaction</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="relative">
              <div class="absolute inset-0 bg-gradient-to-r from-sky-500/20 to-cyan-500/20 rounded-2xl blur-xl"></div>
              <div class="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/20 shadow-2xl">
                <h4 class="text-lg font-semibold text-white mb-4">Key Achievements</h4>
                <ul class="space-y-3">
                  <li class="flex items-start gap-3">
                    <span class="text-green-400 font-bold mt-0.5">✓</span>
                    <span class="text-sm text-sky-200">Reduced processing time from 2 weeks to 2 days</span>
                  </li>
                  <li class="flex items-start gap-3">
                    <span class="text-green-400 font-bold mt-0.5">✓</span>
                    <span class="text-sm text-sky-200">Improved application performance by 40%</span>
                  </li>
                  <li class="flex items-start gap-3">
                    <span class="text-green-400 font-bold mt-0.5">✓</span>
                    <span class="text-sm text-sky-200">Led teams of 4+ developers</span>
                  </li>
                  <li class="flex items-start gap-3">
                    <span class="text-green-400 font-bold mt-0.5">✓</span>
                    <span class="text-sm text-sky-200">Built microservices architecture</span>
                  </li>
                  <li class="flex items-start gap-3">
                    <span class="text-green-400 font-bold mt-0.5">✓</span>
                    <span class="text-sm text-sky-200">Implemented CI/CD pipelines</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div class="text-center" data-aos="fade-up">
          <h3 class="text-2xl font-semibold text-white mb-8">Technologies I Work With</h3>
          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 max-w-4xl mx-auto">
            <div class="group" *ngFor="let tech of technologies">
              <div class="relative">
                <div class="absolute inset-0 bg-gradient-to-r from-sky-500/20 to-cyan-500/20 rounded-xl blur-lg group-hover:blur-xl transition-all duration-500"></div>
                <div class="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/20 shadow-xl hover:shadow-sky-500/25 transition-all duration-500 hover:-translate-y-2 group-hover:border-sky-400/50 flex flex-col items-center gap-3">
                  <div class="text-2xl">{{ tech.emoji }}</div>
                  <span class="text-sm font-medium text-sky-200">{{ tech.name }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: []
})
export class AboutComponent implements OnInit {
  technologies = [
    { name: 'Angular', emoji: '🅰️' },
    { name: 'Node.js', emoji: '🟢' },
    { name: 'TypeScript', emoji: '🔷' },
    { name: 'JavaScript', emoji: '🟨' },
    { name: 'AWS', emoji: '☁️' },
    { name: 'PostgreSQL', emoji: '🐘' },
    { name: 'MongoDB', emoji: '🍃' },
    { name: 'Redis', emoji: '🔴' },
    { name: 'Docker', emoji: '🐳' },
    { name: 'Git', emoji: '📦' },
    { name: 'Express.js', emoji: '⚡' },
    { name: 'Ionic', emoji: '📱' }
  ];

  ngOnInit() {
    // Component initialization
  }
}
