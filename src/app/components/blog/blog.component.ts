import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { timeout, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { PortfolioService } from '../../services/portfolio.service';

interface Blog {
  id: number;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  featuredImage?: string;
  published: boolean;
  publishedAt?: string;
  tags: string[];
  authorId: number;
  author?: {
    id: number;
    name?: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
}

interface BlogResponse {
  blogs: Blog[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="blog" class="section bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 text-white relative overflow-hidden min-h-screen">
      <!-- Background Pattern -->
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-cyan-600/20 to-sky-600/20"></div>
        <div class="absolute top-20 left-20 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div class="absolute bottom-20 right-20 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl animate-pulse" style="animation-delay: 1s;"></div>
        <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-sky-500/5 rounded-full blur-3xl animate-pulse" style="animation-delay: 2s;"></div>
      </div>
      
      <div class="container relative z-10 py-16">
        <!-- Header Section -->
        <div class="text-center mb-20" data-aos="fade-up">
          <div class="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/20 rounded-full text-cyan-300 text-sm font-medium mb-6 border border-cyan-400/30">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14,2 14,8 20,8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
              <polyline points="10,9 9,9 8,9"/>
            </svg>
            Latest Blog Posts
          </div>
          <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-100 to-sky-200 bg-clip-text text-transparent leading-tight">
            Blog & Articles
          </h2>
          <div class="w-24 h-1 bg-gradient-to-r from-cyan-400 to-sky-400 mx-auto rounded-full mb-8"></div>
          <p class="text-lg md:text-xl text-cyan-200 mt-8 max-w-4xl mx-auto leading-relaxed">
            Insights, tutorials, and thoughts on web development, technology trends, and professional growth
          </p>
        </div>

        <!-- Loading State -->
        <div *ngIf="isLoading" class="flex flex-col justify-center items-center py-20" role="status" aria-label="Loading blog posts">
          <div class="relative mb-4">
            <div class="w-16 h-16 border-4 border-cyan-500/30 border-t-cyan-400 rounded-full animate-spin"></div>
            <div class="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-sky-400 rounded-full animate-spin" style="animation-delay: 0.5s;"></div>
          </div>
          <p class="text-cyan-200 text-lg">Loading blog posts...</p>
          <span class="sr-only">Loading blog posts...</span>
        </div>

        <!-- Blog Posts Grid -->
        <div *ngIf="!isLoading && blogs.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-20">
          <article 
            *ngFor="let blog of blogs; let i = index" 
            class="group relative"
            data-aos="fade-up"
            [attr.data-aos-delay]="i * 200"
          >
            <!-- Card Background Glow -->
            <div class="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-sky-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
            
            <!-- Main Card -->
            <div class="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/20 shadow-2xl hover:shadow-cyan-500/25 transition-all duration-500 hover:-translate-y-2 group-hover:border-cyan-400/50 flex flex-col h-full">
              <!-- Featured Image -->
              <div class="relative h-48 overflow-hidden">
                <div *ngIf="blog.featuredImage" class="w-full h-full bg-cover bg-center" [style.background-image]="'url(' + getImageUrl(blog.featuredImage) + ')'"></div>
                <div *ngIf="!blog.featuredImage" class="w-full h-full bg-gradient-to-br from-cyan-500 via-sky-500 to-sky-500 flex items-center justify-center">
                  <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14,2 14,8 20,8"/>
                    <line x1="16" y1="13" x2="8" y2="13"/>
                    <line x1="16" y1="17" x2="8" y2="17"/>
                    <polyline points="10,9 9,9 8,9"/>
                  </svg>
                </div>
                
                <!-- Status Badge -->
                <div class="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold uppercase"
                     [class]="blog.published ? 'bg-green-500/20 text-green-300 border border-green-400/30' : 'bg-yellow-500/20 text-yellow-300 border border-yellow-400/30'">
                  {{ blog.published ? 'Published' : 'Draft' }}
                </div>
              </div>
              
              <!-- Blog Content -->
              <div class="p-6 flex flex-col flex-grow">
                <!-- Date -->
                <div class="text-sm text-cyan-200 font-medium mb-3">
                  {{ formatDate(blog.publishedAt || blog.createdAt) }}
                </div>
                
                <!-- Title -->
                <h3 class="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-cyan-200 transition-colors duration-300">
                  {{ blog.title }}
                </h3>
                
                <!-- Excerpt -->
                <p class="text-cyan-100 leading-relaxed mb-4 line-clamp-3">{{ blog.excerpt }}</p>
                
                <!-- Tags -->
                <div *ngIf="blog.tags && blog.tags.length > 0" class="mb-4">
                  <div class="flex flex-wrap gap-1.5">
                    <span *ngFor="let tag of getDisplayTags(blog.tags); let i = index" 
                          class="px-2 py-1 bg-cyan-500/20 text-cyan-200 rounded-lg text-xs font-medium border border-cyan-400/30">
                      {{ tag }}
                    </span>
                    <span *ngIf="blog.tags.length > 3" 
                          class="px-2 py-1 bg-gray-500/20 text-gray-300 rounded-lg text-xs font-medium border border-gray-400/30">
                      +{{ blog.tags.length - 3 }} more
                    </span>
                  </div>
                </div>
                
                <!-- Read More Button -->
                <div class="mt-auto pt-4">
                  <button 
                    (click)="viewBlog(blog.slug)"
                    class="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-cyan-500 to-sky-500 text-white rounded-xl font-medium shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 hover:scale-105"
                  >
                    Read More
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M7 17L17 7M17 7H7M17 7V17"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </article>
        </div>

        <!-- No Posts Message -->
        <div *ngIf="!isLoading && blogs.length === 0 && !hasError" class="text-center py-20">
          <div class="w-24 h-24 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14,2 14,8 20,8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
              <polyline points="10,9 9,9 8,9"/>
            </svg>
          </div>
          <h3 class="text-2xl font-bold text-white mb-4">No Blog Posts Yet</h3>
          <p class="text-cyan-200 text-lg">Check back soon for insightful articles and tutorials!</p>
        </div>

        <!-- Error State -->
        <div *ngIf="hasError" class="text-center py-20">
          <div class="w-24 h-24 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <line x1="15" y1="9" x2="9" y2="15"/>
              <line x1="9" y1="9" x2="15" y2="15"/>
            </svg>
          </div>
          <h3 class="text-2xl font-bold text-white mb-4">Unable to Load Blog Posts</h3>
          <p class="text-red-200 text-lg mb-6">There was an error loading the blog posts. Please try again later.</p>
          <button 
            (click)="loadBlogs()"
            class="px-6 py-3 bg-gradient-to-r from-cyan-500 to-sky-500 text-white rounded-xl font-medium shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 hover:scale-105"
          >
            Try Again
          </button>
        </div>

        <!-- Pagination -->
        <div *ngIf="!isLoading && pagination && pagination.pages > 1" class="flex justify-center items-center gap-4">
          <button 
            (click)="loadPage(pagination.page - 1)"
            [disabled]="pagination.page <= 1"
            class="px-4 py-2 bg-white/10 text-white rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          
          <div class="flex gap-2">
            <button 
              *ngFor="let page of getPageNumbers()" 
              (click)="loadPage(page)"
              class="px-3 py-2 rounded-xl transition-all duration-300"
              [class]="page === pagination.page ? 'bg-cyan-500 text-white' : 'bg-white/10 text-cyan-200 hover:bg-white/20'"
            >
              {{ page }}
            </button>
          </div>
          
          <button 
            (click)="loadPage(pagination.page + 1)"
            [disabled]="pagination.page >= pagination.pages"
            class="px-4 py-2 bg-white/10 text-white rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .line-clamp-2 {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .line-clamp-3 {
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    button:hover:not(:disabled) {
      transform: translateY(-2px);
    }

    /* Responsive improvements */
    @media (max-width: 768px) {
      .grid {
        gap: 1.5rem;
      }
    }

    /* Card hover effects */
    .group:hover .group-hover\\:border-cyan-400\\/50 {
      border-color: rgba(8, 145, 178, 0.5);
    }

    /* Tag improvements */
    .tag-container {
      max-height: 3rem;
      overflow: hidden;
    }

    /* Custom scrollbar */
    ::-webkit-scrollbar {
      width: 6px;
    }

    ::-webkit-scrollbar-track {
      background: rgba(255, 255, 255, 0.1);
      border-radius: 3px;
    }

    ::-webkit-scrollbar-thumb {
      background: linear-gradient(45deg, #0ea5e9, #0ea5e9);
      border-radius: 3px;
    }

    ::-webkit-scrollbar-thumb:hover {
      background: linear-gradient(45deg, #0284c7, #0284c7);
    }
  `]
})
export class BlogComponent implements OnInit {
  blogs: Blog[] = [];
  isLoading = true;
  pagination: any = null;
  currentPage = 1;
  hasError = false;

  constructor(
    private portfolioService: PortfolioService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadBlogs();
  }

  loadBlogs(page = 1) {
    this.isLoading = true;
    this.hasError = false;
    this.currentPage = page;

    this.portfolioService.getBlogs(page, 6)
      .pipe(
        timeout(10000),
        catchError(error => {
          console.error('Blog API Error:', error);
          this.hasError = true;
          return of({ blogs: [], pagination: { page: 1, limit: 6, total: 0, pages: 0 } });
        })
      )
      .subscribe({
        next: (response: BlogResponse) => {
          this.blogs = response.blogs || [];
          this.pagination = response.pagination;
          this.isLoading = false;
          this.cdr.detectChanges();
        },
        error: (error) => {
          console.error('Error loading blogs:', error);
          this.blogs = [];
          this.pagination = null;
          this.isLoading = false;
          this.hasError = true;
          this.cdr.detectChanges();
        }
      });
  }

  loadPage(page: number) {
    if (this.pagination && page >= 1 && page <= this.pagination.pages && page !== this.currentPage) {
      this.loadBlogs(page);
    }
  }

  getPageNumbers(): number[] {
    if (!this.pagination) return [];
    
    const pages: number[] = [];
    const start = Math.max(1, this.pagination.page - 2);
    const end = Math.min(this.pagination.pages, this.pagination.page + 2);
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    
    return pages;
  }

  getImageUrl(image: string): string {
    return this.portfolioService.getFileUrl(image);
  }

  formatDate(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  }

  getDisplayTags(tags: string[]): string[] {
    // Show only first 3 tags in the card view
    return tags.slice(0, 3);
  }

  viewBlog(slug: string) {
    // Navigate to the blog detail page
    this.router.navigate(['/blog', slug]);
  }
}
