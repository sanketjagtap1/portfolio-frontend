import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService, Skill } from '../../services/portfolio.service';
import { timeout, catchError, of } from 'rxjs';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="skills" class="section bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white relative overflow-hidden">
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
              <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
            </svg>
            Technical Skills Breakdown
          </div>
          <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-indigo-200 bg-clip-text text-transparent leading-tight">
            Technical Skills Breakdown
          </h2>
          <div class="w-24 h-1 bg-gradient-to-r from-blue-400 to-indigo-400 mx-auto rounded-full mb-8"></div>
          <p class="text-lg md:text-xl text-blue-200 mt-8 max-w-4xl mx-auto leading-relaxed">
            I've developed expertise across the full technology stack, from frontend frameworks 
            to cloud infrastructure. Here's a detailed breakdown of my technical skills and proficiency levels.
          </p>
        </div>
        
        <div class="mb-16">
          <div class="flex justify-center gap-2 mb-12 flex-wrap">
            <button 
              *ngFor="let category of categories" 
              class="flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300"
              [class]="selectedCategory === category ? 'bg-blue-500 text-white shadow-lg border border-blue-400/30' : 'bg-white/10 text-blue-200 hover:bg-white/20 hover:text-white border border-white/20'"
              (click)="selectCategory(category)"
            >
              <span class="text-lg">{{ getCategoryIcon(category) }}</span>
              <span class="text-sm">{{ getCategoryLabel(category) }}</span>
            </button>
          </div>
          
          <!-- Loading State -->
          <div *ngIf="isLoading" class="flex flex-col justify-center items-center py-20" role="status" aria-label="Loading skills data">
            <div class="relative mb-4">
              <div class="w-16 h-16 border-4 border-blue-500/30 border-t-blue-400 rounded-full animate-spin"></div>
              <div class="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-indigo-400 rounded-full animate-spin" style="animation-delay: 0.5s;"></div>
            </div>
            <p class="text-blue-200 text-lg">Loading skills...</p>
            <span class="sr-only">Loading skills data...</span>
          </div>
          
          <!-- Skills Grid -->
          <div *ngIf="!isLoading" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" data-aos="fade-up">
            <div 
              *ngFor="let skill of filteredSkills; let i = index" 
              class="group relative"
              data-aos="fade-up"
              [attr.data-aos-delay]="getSkillDelay(i)"
            >
              <!-- Elegant Card -->
              <div class="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl hover:shadow-blue-500/25 transition-all duration-300 hover:-translate-y-2 group-hover:border-blue-400/50">
                <!-- Skill Header -->
                <div class="flex items-center gap-3 mb-4">
                  <div class="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl flex items-center justify-center text-lg group-hover:scale-105 transition-transform duration-300">
                    <img *ngIf="skill.icon && !isEmoji(skill.icon)" 
                         [src]="getImageUrl(skill.icon)" 
                         [alt]="skill.name + ' icon'"
                         class="w-6 h-6 object-contain">
                    <span *ngIf="!skill.icon || isEmoji(skill.icon)">{{ skill.icon || '💻' }}</span>
                  </div>
                  <div class="flex-1 min-w-0">
                    <h3 class="text-sm font-semibold text-white truncate group-hover:text-blue-200 transition-colors duration-300">
                      {{ skill.name }}
                    </h3>
                    <div class="flex items-center gap-2 mt-1">
                      <span class="text-xs font-medium text-blue-200">{{ skill.level }}%</span>
                      <div class="px-2 py-0.5 rounded-full text-xs font-medium"
                           [class]="getSkillLevelClass(skill.level)">
                        {{ getSkillLevelText(skill.level) }}
                      </div>
                    </div>
                  </div>
                </div>
                
                <!-- Elegant Progress Bar -->
                <div class="relative">
                  <div class="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                    <div 
                      class="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-1000 ease-out relative"
                      [style.width.%]="skill.level"
                    >
                      <!-- Subtle shine effect -->
                      <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                  </div>
                </div>
                
                <!-- Hover Effect -->
                <div class="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </div>
          </div>
        </div>
        
        <div data-aos="fade-up">
          <div class="relative">
            <div class="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-2xl blur-xl"></div>
            <div class="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-12 border border-white/20 shadow-2xl">
              <h3 class="text-2xl font-bold text-white text-center mb-12">Technical Focus Areas</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div class="group">
                  <div class="relative">
                    <div class="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-xl blur-lg group-hover:blur-xl transition-all duration-500"></div>
                    <div class="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/20 shadow-xl hover:shadow-blue-500/25 transition-all duration-500 hover:-translate-y-2 group-hover:border-blue-400/50">
                      <div class="flex items-start gap-4">
                        <div class="text-2xl flex-shrink-0">🎨</div>
                        <div>
                          <h4 class="text-lg font-semibold text-white mb-2">Frontend Development</h4>
                          <p class="text-sm text-blue-200 leading-relaxed">Creating responsive, interactive user interfaces with modern frameworks</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div class="group">
                  <div class="relative">
                    <div class="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl blur-lg group-hover:blur-xl transition-all duration-500"></div>
                    <div class="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/20 shadow-xl hover:shadow-purple-500/25 transition-all duration-500 hover:-translate-y-2 group-hover:border-purple-400/50">
                      <div class="flex items-start gap-4">
                        <div class="text-2xl flex-shrink-0">⚙️</div>
                        <div>
                          <h4 class="text-lg font-semibold text-white mb-2">Backend Development</h4>
                          <p class="text-sm text-blue-200 leading-relaxed">Building scalable APIs and server-side applications</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div class="group">
                  <div class="relative">
                    <div class="absolute inset-0 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-xl blur-lg group-hover:blur-xl transition-all duration-500"></div>
                    <div class="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/20 shadow-xl hover:shadow-green-500/25 transition-all duration-500 hover:-translate-y-2 group-hover:border-green-400/50">
                      <div class="flex items-start gap-4">
                        <div class="text-2xl flex-shrink-0">🗄️</div>
                        <div>
                          <h4 class="text-lg font-semibold text-white mb-2">Database Design</h4>
                          <p class="text-sm text-blue-200 leading-relaxed">Designing efficient database schemas and optimizing queries</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div class="group">
                  <div class="relative">
                    <div class="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-xl blur-lg group-hover:blur-xl transition-all duration-500"></div>
                    <div class="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/20 shadow-xl hover:shadow-orange-500/25 transition-all duration-500 hover:-translate-y-2 group-hover:border-orange-400/50">
                      <div class="flex items-start gap-4">
                        <div class="text-2xl flex-shrink-0">☁️</div>
                        <div>
                          <h4 class="text-lg font-semibold text-white mb-2">Cloud & DevOps</h4>
                          <p class="text-sm text-blue-200 leading-relaxed">Deploying and managing applications on cloud platforms</p>
                        </div>
                      </div>
                    </div>
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
export class SkillsComponent implements OnInit {
  skills: Skill[] = [];
  selectedCategory = 'all';
  isLoading = true;
  categories = ['all', 'frontend', 'backend', 'database', 'cloud', 'tools'];

  constructor(private portfolioService: PortfolioService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadSkills();
  }

  loadSkills() {
    this.isLoading = true;
    this.portfolioService.getSkills()
      .pipe(
        timeout(10000),
        catchError(error => {
          console.error('Error loading skills:', error);
          this.loadFallbackData();
          return of([]);
        })
      )
      .subscribe({
        next: (skills) => {
          if (skills && skills.length > 0) {
            this.skills = skills;
          } else {
            this.loadFallbackData();
          }
          this.isLoading = false;
          this.cdr.detectChanges();
        },
        error: (error) => {
          console.error('Error loading skills:', error);
          this.loadFallbackData();
          this.isLoading = false;
        }
      });
  }

  private loadFallbackData() {
    // Fallback data in case API fails
    this.skills = [
      // Frontend
      { name: 'Angular', level: 95, category: 'frontend', icon: '🅰️' },
      { name: 'TypeScript', level: 90, category: 'frontend', icon: '🔷' },
      { name: 'JavaScript (ES6+)', level: 90, category: 'frontend', icon: '🟨' },
      { name: 'HTML5', level: 95, category: 'frontend', icon: '🌐' },
      { name: 'CSS3', level: 90, category: 'frontend', icon: '🎨' },
      { name: 'Bootstrap', level: 85, category: 'frontend', icon: '📱' },
      { name: 'Material UI', level: 85, category: 'frontend', icon: '🎭' },
      { name: 'RxJS', level: 80, category: 'frontend', icon: '⚡' },
      { name: 'Ionic', level: 75, category: 'frontend', icon: '📱' },
      
      // Backend
      { name: 'Node.js', level: 90, category: 'backend', icon: '🟢' },
      { name: 'Express.js', level: 90, category: 'backend', icon: '⚡' },
      { name: 'NestJS', level: 75, category: 'backend', icon: '🏗️' },
      { name: 'WebSockets', level: 80, category: 'backend', icon: '🔌' },
      { name: 'REST APIs', level: 90, category: 'backend', icon: '🌐' },
      { name: 'Swagger', level: 75, category: 'backend', icon: '📚' },
      
      // Database
      { name: 'PostgreSQL', level: 85, category: 'database', icon: '🐘' },
      { name: 'MySQL', level: 85, category: 'database', icon: '🗄️' },
      { name: 'MongoDB', level: 80, category: 'database', icon: '🍃' },
      { name: 'Redis', level: 75, category: 'database', icon: '🔴' },
      { name: 'Prisma', level: 70, category: 'database', icon: '🔧' },
      { name: 'Sequelize', level: 70, category: 'database', icon: '⚙️' },
      
      // Cloud & DevOps
      { name: 'AWS', level: 80, category: 'cloud', icon: '☁️' },
      { name: 'Docker', level: 75, category: 'cloud', icon: '🐳' },
      { name: 'GitHub Actions', level: 80, category: 'cloud', icon: '🔄' },
      { name: 'Nginx', level: 70, category: 'cloud', icon: '🌐' },
      { name: 'PM2', level: 75, category: 'cloud', icon: '⚡' },
      
      // Tools
      { name: 'Git', level: 90, category: 'tools', icon: '📦' },
      { name: 'Postman', level: 85, category: 'tools', icon: '📮' },
      { name: 'Jest', level: 75, category: 'tools', icon: '🧪' },
      { name: 'SonarQube', level: 70, category: 'tools', icon: '🔍' }
    ];
  }

  get filteredSkills(): Skill[] {
    if (this.selectedCategory === 'all') {
      return this.skills;
    }
    return this.skills.filter(skill => skill.category === this.selectedCategory);
  }

  selectCategory(category: string) {
    this.selectedCategory = category;
  }

  getCategoryIcon(category: string): string {
    const icons: { [key: string]: string } = {
      'all': '🌟',
      'frontend': '🎨',
      'backend': '⚙️',
      'database': '🗄️',
      'cloud': '☁️',
      'tools': '🔧'
    };
    return icons[category] || '🌟';
  }

  getCategoryLabel(category: string): string {
    const labels: { [key: string]: string } = {
      'all': 'All Skills',
      'frontend': 'Frontend',
      'backend': 'Backend',
      'database': 'Database',
      'cloud': 'Cloud & DevOps',
      'tools': 'Tools'
    };
    return labels[category] || category;
  }

  getSkillDelay(index: number): number {
    return index * 100;
  }

  getSkillLevelClass(level: number): string {
    if (level >= 90) {
      return 'bg-green-500/20 text-green-300 border border-green-400/30';
    } else if (level >= 75) {
      return 'bg-blue-500/20 text-blue-300 border border-blue-400/30';
    } else if (level >= 60) {
      return 'bg-yellow-500/20 text-yellow-300 border border-yellow-400/30';
    } else {
      return 'bg-gray-500/20 text-gray-300 border border-gray-400/30';
    }
  }

  getSkillLevelText(level: number): string {
    if (level >= 90) {
      return 'Expert';
    } else if (level >= 75) {
      return 'Advanced';
    } else if (level >= 60) {
      return 'Intermediate';
    } else {
      return 'Beginner';
    }
  }

  getImageUrl(icon: string): string {
    // If it's already a full URL, return as is
    if (icon.startsWith('http')) {
      return icon;
    }
    // If it's a file ID, construct the API URL
    return `http://dev-api.technootales.in/v1/cloud/file/${icon}`;
  }

  isEmoji(text: string): boolean {
    // Simple check to see if the text is an emoji (contains emoji characters)
    const emojiRegex = /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/u;
    return emojiRegex.test(text);
  }
}
