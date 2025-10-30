import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService, Skill } from '../../services/portfolio.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="about" class="section bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 text-white relative overflow-hidden">
      <!-- Background Pattern -->
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-600/20 to-purple-600/20"></div>
        <div class="absolute top-20 left-20 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div class="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style="animation-delay: 1s;"></div>
        <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl animate-pulse" style="animation-delay: 2s;"></div>
      </div>
      
      <div class="container relative z-10 py-16">
        <!-- Header Section -->
        <div class="text-center mb-20" data-aos="fade-up">
          <div class="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/20 rounded-full text-indigo-300 text-sm font-medium mb-6 border border-indigo-400/30">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
            About Me
          </div>
          <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-indigo-100 to-purple-200 bg-clip-text text-transparent leading-tight">
            About Me
          </h2>
          <div class="w-24 h-1 bg-gradient-to-r from-indigo-400 to-purple-400 mx-auto rounded-full mb-8"></div>
          <p class="text-lg md:text-xl text-indigo-200 mt-8 max-w-4xl mx-auto leading-relaxed">
            Passionate about creating scalable web applications with modern technologies
          </p>
        </div>
        
        <div class="grid lg:grid-cols-2 gap-12 mb-16">
          <div data-aos="fade-right">
            <div class="mb-8">
              <h3 class="text-2xl font-bold text-white mb-4">Passionate Full Stack Developer</h3>
              <p class="text-lg text-indigo-100 leading-relaxed">
                I'm a dedicated Full Stack Developer with 4+ years of experience in designing, 
                developing, and deploying scalable web and mobile applications. My expertise spans 
                across modern technologies including Angular, Node.js, Flutter, and AWS.
              </p>
            </div>
            
            <div class="space-y-6">
              <div class="group">
                <div class="relative">
                  <div class="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-500"></div>
                  <div class="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl hover:shadow-blue-500/25 transition-all duration-500 hover:-translate-y-2 group-hover:border-blue-400/50">
                    <div class="flex items-start gap-4">
                      <div class="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                      </div>
                      <div>
                        <h4 class="text-lg font-semibold text-white mb-1">4+ Years Experience</h4>
                        <p class="text-sm text-indigo-200">Building scalable applications across various industries</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="group">
                <div class="relative">
                  <div class="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-500"></div>
                  <div class="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl hover:shadow-purple-500/25 transition-all duration-500 hover:-translate-y-2 group-hover:border-purple-400/50">
                    <div class="flex items-start gap-4">
                      <div class="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center text-white shadow-lg">
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
                        <p class="text-sm text-indigo-200">Frontend, Backend, Database, and Cloud technologies</p>
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
                        <p class="text-sm text-indigo-200">Optimizing applications for speed and scalability</p>
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
                  <div class="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-xl blur-lg group-hover:blur-xl transition-all duration-500"></div>
                  <div class="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/20 shadow-xl hover:shadow-blue-500/25 transition-all duration-500 hover:-translate-y-2 group-hover:border-blue-400/50 text-center">
                    <div class="text-3xl font-bold text-white mb-2">4+</div>
                    <div class="text-sm text-indigo-200 font-medium">Years Experience</div>
                  </div>
                </div>
              </div>
              
              <div class="group">
                <div class="relative">
                  <div class="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl blur-lg group-hover:blur-xl transition-all duration-500"></div>
                  <div class="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/20 shadow-xl hover:shadow-purple-500/25 transition-all duration-500 hover:-translate-y-2 group-hover:border-purple-400/50 text-center">
                    <div class="text-3xl font-bold text-white mb-2">50+</div>
                    <div class="text-sm text-indigo-200 font-medium">Projects Completed</div>
                  </div>
                </div>
              </div>
              
              <div class="group">
                <div class="relative">
                  <div class="absolute inset-0 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-xl blur-lg group-hover:blur-xl transition-all duration-500"></div>
                  <div class="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/20 shadow-xl hover:shadow-green-500/25 transition-all duration-500 hover:-translate-y-2 group-hover:border-green-400/50 text-center">
                    <div class="text-3xl font-bold text-white mb-2">15+</div>
                    <div class="text-sm text-indigo-200 font-medium">Technologies</div>
                  </div>
                </div>
              </div>
              
              <div class="group">
                <div class="relative">
                  <div class="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-xl blur-lg group-hover:blur-xl transition-all duration-500"></div>
                  <div class="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/20 shadow-xl hover:shadow-orange-500/25 transition-all duration-500 hover:-translate-y-2 group-hover:border-orange-400/50 text-center">
                    <div class="text-3xl font-bold text-white mb-2">100%</div>
                    <div class="text-sm text-indigo-200 font-medium">Client Satisfaction</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="relative">
              <div class="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-2xl blur-xl"></div>
              <div class="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/20 shadow-2xl">
                <h4 class="text-lg font-semibold text-white mb-4">Key Achievements</h4>
                <ul class="space-y-3">
                  <li class="flex items-start gap-3">
                    <span class="text-green-400 font-bold mt-0.5">✓</span>
                    <span class="text-sm text-indigo-200">Reduced processing time from 2 weeks to 2 days</span>
                  </li>
                  <li class="flex items-start gap-3">
                    <span class="text-green-400 font-bold mt-0.5">✓</span>
                    <span class="text-sm text-indigo-200">Improved application performance by 40%</span>
                  </li>
                  <li class="flex items-start gap-3">
                    <span class="text-green-400 font-bold mt-0.5">✓</span>
                    <span class="text-sm text-indigo-200">Led teams of 4+ developers</span>
                  </li>
                  <li class="flex items-start gap-3">
                    <span class="text-green-400 font-bold mt-0.5">✓</span>
                    <span class="text-sm text-indigo-200">Built microservices architecture</span>
                  </li>
                  <li class="flex items-start gap-3">
                    <span class="text-green-400 font-bold mt-0.5">✓</span>
                    <span class="text-sm text-indigo-200">Implemented CI/CD pipelines</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div class="text-center" data-aos="fade-up">
          <h3 class="text-2xl font-semibold text-white mb-8">Technologies I Work With</h3>
          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6 max-w-5xl mx-auto">
            <div class="group" *ngFor="let tech of technologies">
              <div class="relative">
                <!-- Outer ambient glow -->
                <div class="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-300"></div>

                <!-- Gradient border wrapper -->
                <div class="relative rounded-2xl p-[1px] bg-gradient-to-br from-white/20 via-indigo-400/30 to-white/5 group-hover:from-indigo-400/40 group-hover:via-purple-400/40 group-hover:to-white/20 transition-colors duration-300">
                  <!-- Card -->
                  <div class="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl px-4 py-5 md:px-5 md:py-6 border border-white/10 shadow-lg hover:shadow-indigo-500/25 transition-all duration-200 hover:-translate-y-1 flex flex-col items-center justify-center gap-2 h-28 md:h-32 overflow-hidden">
                    <!-- Corner accent -->
                    <div class="pointer-events-none absolute -top-3 -right-3 w-10 h-10 bg-gradient-to-br from-indigo-500/30 to-purple-500/30 rounded-full blur-xl opacity-60 group-hover:opacity-80 transition-opacity"></div>

                    <!-- Sheen on hover -->
                    <div class="pointer-events-none absolute -left-16 top-0 w-1/2 h-[200%] rotate-12 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-120%] group-hover:translate-x-[220%] transition-transform duration-700 ease-out"></div>

                    <!-- Icon -->
                    <div class="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-indigo-500/15 to-purple-500/15 rounded-xl flex items-center justify-center ring-1 ring-white/10 group-hover:ring-indigo-400/30 transition-all">
                      <img *ngIf="tech.icon && !isEmoji(tech.icon)"
                           [src]="getImageUrl(tech.icon)"
                           [alt]="tech.name + ' icon'"
                           class="w-8 h-8 md:w-9 md:h-9 object-contain" />
                      <span *ngIf="!tech.icon || isEmoji(tech.icon)" class="text-3xl md:text-4xl select-none">{{ tech.icon || '💻' }}</span>
                    </div>

                    <!-- Name -->
                    <span class="text-xs md:text-sm font-semibold text-indigo-100 text-center w-full px-2 truncate" [title]="tech.name">{{ tech.name }}</span>

                    <!-- Bottom accent bar -->
                    <div class="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-400/40 via-purple-400/40 to-pink-400/40 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
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
  technologies: Array<{ name: string; icon?: string }> = [];

  constructor(private portfolioService: PortfolioService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.portfolioService.getSkills().subscribe({
      next: (skills: Skill[]) => {
        if (skills && skills.length) {
          // Deduplicate by name, keep highest level, prefer emoji in icon
          const byName = new Map<string, Skill>();
          for (const s of skills) {
            const prev = byName.get(s.name);
            if (!prev || (typeof s.level === 'number' && s.level > (prev.level as number))) {
              byName.set(s.name, s);
            }
          }
          const deduped = Array.from(byName.values())
            .sort((a, b) => (b.level as number) - (a.level as number))
            .slice(0, 12);
          Promise.resolve().then(() => {
            this.technologies = deduped.map(s => ({
              name: s.name,
              icon: s.icon || '💻'
            }));
            this.cdr.detectChanges();
          });
        } else {
          this.loadFallback();
        }
      },
      error: () => this.loadFallback()
    });
  }

  isEmoji(text: string): boolean {
    const emojiRegex = /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u2600-\u26FF]|[\u2700-\u27BF]/u;
    return !!text && emojiRegex.test(text);
  }

  getImageUrl(icon: string): string {
    if (!icon) return '';
    if (icon.startsWith('http')) return icon;
    return `https://dev-api.technootales.in/v1/cloud/file/${icon}`;
  }

  private loadFallback() {
    Promise.resolve().then(() => {
    this.technologies = [
      { name: 'Angular', icon: '🅰️' },
      { name: 'Node.js', icon: '🟢' },
      { name: 'TypeScript', icon: '🔷' },
      { name: 'JavaScript', icon: '🟨' },
      { name: 'AWS', icon: '☁️' },
      { name: 'PostgreSQL', icon: '🐘' },
      { name: 'MongoDB', icon: '🍃' },
      { name: 'Redis', icon: '🔴' },
      { name: 'Docker', icon: '🐳' },
      { name: 'Git', icon: '📦' },
      { name: 'Express.js', icon: '⚡' },
      { name: 'Ionic', icon: '📱' }
      ];
      this.cdr.detectChanges();
    });
  }
}
