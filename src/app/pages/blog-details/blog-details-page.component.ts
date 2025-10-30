import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { PortfolioService } from '../../services/portfolio.service';
import { timeout, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { SeoService } from '../../services/seo.service';

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

@Component({
  selector: 'app-blog-details-page',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 text-white relative overflow-hidden">
      <!-- Background Pattern -->
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-600/20 to-pink-600/20"></div>
        <div class="absolute top-20 left-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div class="absolute bottom-20 right-20 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style="animation-delay: 1s;"></div>
        <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl animate-pulse" style="animation-delay: 2s;"></div>
      </div>

      <div class="container relative z-10 py-8 md:py-16 pb-16 md:pb-24">
        <!-- Back Button -->
        <div class="mt-4 md:mt-8 mb-8">
          <button 
            (click)="goBack()"
            class="flex items-center gap-2 px-4 py-2 bg-white/10 text-white rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Back to Blog
          </button>
        </div>

        <!-- Loading State -->
        <div *ngIf="isLoading" class="flex flex-col justify-center items-center py-20" role="status" aria-label="Loading blog post">
          <div class="relative mb-4">
            <div class="w-16 h-16 border-4 border-purple-500/30 border-t-purple-400 rounded-full animate-spin"></div>
            <div class="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-pink-400 rounded-full animate-spin" style="animation-delay: 0.5s;"></div>
          </div>
          <p class="text-purple-200 text-lg">Loading blog post...</p>
          <span class="sr-only">Loading blog post...</span>
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
          <h3 class="text-2xl font-bold text-white mb-4">Blog Post Not Found</h3>
          <p class="text-red-200 text-lg mb-6">The blog post you're looking for doesn't exist or has been removed.</p>
          <button 
            (click)="goBack()"
            class="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105"
          >
            Back to Blog
          </button>
        </div>

        <!-- Blog Post Content -->
        <article *ngIf="!isLoading && !hasError && blog" class="max-w-4xl mx-auto px-4">
          <!-- Featured Image -->
          <div *ngIf="blog.featuredImage" class="relative h-64 md:h-96 mb-8 rounded-3xl overflow-hidden">
            <div class="w-full h-full bg-cover bg-center" [style.background-image]="'url(' + getImageUrl(blog.featuredImage) + ')'"></div>
            <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          </div>

          <!-- Blog Header -->
          <header class="mb-8">
            <!-- Status Badge -->
            <div class="mb-4">
              <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold uppercase"
                    [class]="blog.published ? 'bg-green-500/20 text-green-300 border border-green-400/30' : 'bg-yellow-500/20 text-yellow-300 border border-yellow-400/30'">
                {{ blog.published ? 'Published' : 'Draft' }}
              </span>
            </div>

            <!-- Title -->
            <h1 class="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 bg-gradient-to-r from-white via-purple-100 to-pink-200 bg-clip-text text-transparent leading-tight">
              {{ blog.title }}
            </h1>

            <!-- Meta Information -->
            <div class="flex flex-wrap items-center gap-3 md:gap-4 text-purple-200 mb-4">
              <div class="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12,6 12,12 16,14"/>
                </svg>
                <span>{{ formatDate(blog.publishedAt || blog.createdAt) }}</span>
              </div>
              
              <div *ngIf="blog.author" class="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
                <span>{{ blog.author.name || blog.author.email }}</span>
              </div>

              <div class="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14,2 14,8 20,8"/>
                </svg>
                <span>{{ getReadingTime(blog.content) }} min read</span>
              </div>
            </div>

            <!-- Excerpt -->
            <p *ngIf="blog.excerpt" class="text-base text-purple-100 leading-relaxed mb-4">
              {{ blog.excerpt }}
            </p>

            <!-- Tags -->
            <div *ngIf="blog.tags && blog.tags.length > 0" class="mb-6">
              <div class="flex flex-wrap gap-2">
                <span *ngFor="let tag of blog.tags" 
                      class="px-3 py-1 bg-purple-500/20 text-purple-200 rounded-lg text-sm font-medium border border-purple-400/30 hover:bg-purple-500/30 transition-colors duration-300">
                  {{ tag }}
                </span>
              </div>
            </div>
          </header>

          <!-- Blog Content -->
          <div class="prose prose-lg prose-invert max-w-none">
            <div class="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
              <div class="blog-content" [innerHTML]="formatContent(blog.content)"></div>
            </div>
          </div>

          <!-- Share Section -->
          <div class="mt-12 pt-6 pb-6 border-t border-white/20">
            <div class="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 class="text-lg font-bold text-white mb-2">Share this article</h3>
                <p class="text-sm text-purple-200">Help others discover this content</p>
              </div>
              
              <div class="flex gap-4">
                <button 
                  (click)="shareOnTwitter()"
                  class="flex items-center gap-1.5 px-3 py-1.5 bg-blue-500/20 text-blue-300 rounded-lg border border-blue-400/30 hover:bg-blue-500/30 transition-all duration-300 text-sm"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                  Twitter
                </button>
                
                <button 
                  (click)="shareOnLinkedIn()"
                  class="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600/20 text-blue-300 rounded-lg border border-blue-500/30 hover:bg-blue-600/30 transition-all duration-300 text-sm"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  LinkedIn
                </button>
                
                <button 
                  (click)="copyLink()"
                  class="flex items-center gap-1.5 px-3 py-1.5 bg-purple-500/20 text-purple-300 rounded-lg border border-purple-400/30 hover:bg-purple-500/30 transition-all duration-300 text-sm"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                  </svg>
                  Copy Link
                </button>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  `,
  styles: [`
    .blog-content {
      line-height: 1.7;
      color: #e2e8f0;
      font-size: 1rem;
    }

    /* Headers */
    .blog-content h1,
    .blog-content h2,
    .blog-content h3,
    .blog-content h4,
    .blog-content h5,
    .blog-content h6 {
      color: #ffffff;
      font-weight: bold;
      margin-top: 2rem;
      margin-bottom: 1rem;
      line-height: 1.3;
    }

    .blog-content h1 { 
      font-size: 1.875rem; 
      border-bottom: 2px solid rgba(139, 92, 246, 0.3);
      padding-bottom: 0.5rem;
    }
    .blog-content h2 { 
      font-size: 1.5rem; 
      border-bottom: 1px solid rgba(139, 92, 246, 0.2);
      padding-bottom: 0.3rem;
    }
    .blog-content h3 { font-size: 1.25rem; }
    .blog-content h4 { font-size: 1.125rem; }
    .blog-content h5 { font-size: 1rem; }
    .blog-content h6 { font-size: 0.875rem; }

    /* Paragraphs */
    .blog-content p {
      margin-bottom: 1rem;
      color: #cbd5e1;
      text-align: justify;
    }

    /* Lists */
    .blog-content ul,
    .blog-content ol {
      margin-bottom: 1rem;
      padding-left: 1.5rem;
    }

    .blog-content li {
      margin-bottom: 0.5rem;
      color: #cbd5e1;
    }

    .blog-content ul li {
      list-style-type: disc;
    }

    .blog-content ol li {
      list-style-type: decimal;
    }

    /* Blockquotes */
    .blog-content blockquote {
      border-left: 4px solid #8b5cf6;
      padding: 1rem 1.5rem;
      margin: 2rem 0;
      font-style: italic;
      color: #a78bfa;
      background: rgba(139, 92, 246, 0.1);
      border-radius: 0.5rem;
      position: relative;
    }

    .blog-content blockquote::before {
      content: '"';
      font-size: 4rem;
      color: rgba(139, 92, 246, 0.3);
      position: absolute;
      top: -0.5rem;
      left: 0.5rem;
      font-family: serif;
    }

    /* Code */
    .blog-content code {
      background: rgba(0, 0, 0, 0.4);
      padding: 0.25rem 0.5rem;
      border-radius: 0.25rem;
      font-family: 'Courier New', monospace;
      color: #fbbf24;
      font-size: 0.9em;
    }

    .blog-content pre {
      background: rgba(0, 0, 0, 0.4);
      padding: 1.5rem;
      border-radius: 0.75rem;
      overflow-x: auto;
      margin: 1.5rem 0;
      border: 1px solid rgba(255, 255, 255, 0.1);
    }

    .blog-content pre code {
      background: none;
      padding: 0;
      color: #e2e8f0;
      font-size: 0.9rem;
    }

    /* Links */
    .blog-content a {
      color: #8b5cf6;
      text-decoration: underline;
      transition: color 0.3s ease;
      font-weight: 500;
    }

    .blog-content a:hover {
      color: #a78bfa;
      text-decoration: none;
    }

    /* Images */
    .blog-content img {
      max-width: 100%;
      height: auto;
      border-radius: 0.75rem;
      margin: 1.5rem 0;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
    }

    /* Tables */
    .blog-content table {
      width: 100%;
      border-collapse: collapse;
      margin: 1.5rem 0;
      background: rgba(255, 255, 255, 0.05);
      border-radius: 0.5rem;
      overflow: hidden;
    }

    .blog-content th,
    .blog-content td {
      border: 1px solid rgba(255, 255, 255, 0.1);
      padding: 0.75rem;
      text-align: left;
    }

    .blog-content th {
      background: rgba(139, 92, 246, 0.2);
      font-weight: bold;
      color: #ffffff;
    }

    .blog-content td {
      color: #cbd5e1;
    }

    /* Text formatting */
    .blog-content strong {
      color: #ffffff;
      font-weight: bold;
    }

    .blog-content em {
      color: #a78bfa;
      font-style: italic;
    }

    .blog-content u {
      text-decoration: underline;
      color: #8b5cf6;
    }

    .blog-content s {
      text-decoration: line-through;
      color: #9ca3af;
    }

    /* Indentation */
    .blog-content .ql-indent-1 { padding-left: 2rem; }
    .blog-content .ql-indent-2 { padding-left: 4rem; }
    .blog-content .ql-indent-3 { padding-left: 6rem; }

    /* Responsive adjustments */
    @media (max-width: 768px) {
      .blog-content {
        font-size: 1rem;
      }
      
      .blog-content h1 { font-size: 2rem; }
      .blog-content h2 { font-size: 1.5rem; }
      .blog-content h3 { font-size: 1.25rem; }
      
      .blog-content pre {
        padding: 1rem;
        font-size: 0.8rem;
      }
    }

    button:hover:not(:disabled) {
      transform: translateY(-2px);
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
      background: linear-gradient(45deg, #8b5cf6, #ec4899);
      border-radius: 3px;
    }

    ::-webkit-scrollbar-thumb:hover {
      background: linear-gradient(45deg, #7c3aed, #db2777);
    }
  `]
})
export class BlogDetailsPageComponent implements OnInit {
  blog: Blog | null = null;
  isLoading = true;
  hasError = false;
  slug: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private portfolioService: PortfolioService,
    private cdr: ChangeDetectorRef,
    private seo: SeoService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.slug = params['slug'];
      if (this.slug) {
        this.loadBlog();
      }
    });
  }

  loadBlog() {
    this.isLoading = true;
    this.hasError = false;

    this.portfolioService.getBlogBySlug(this.slug)
      .pipe(
        timeout(10000),
        catchError(error => {
          console.error('Blog API Error:', error);
          this.hasError = true;
          return of(null);
        })
      )
      .subscribe({
        next: (response) => {
          console.log('Blog API Response:', response);
          this.blog = response?.blog || null;
          this.isLoading = false;
          this.hasError = !this.blog;
          if (this.blog) {
            const url = typeof window !== 'undefined' ? window.location.href : `https://sanket-jagtap.in/blog/${this.blog.slug}`;
            const description = this.blog.excerpt || this.stripHtml(this.blog.content).slice(0, 160);
            const image = this.blog.featuredImage ? this.getImageUrl(this.blog.featuredImage) : 'https://sanket-jagtap.in/favicon.ico';
            this.seo.updateTags({
              title: `${this.blog.title} | Blog`,
              description,
              url,
              image,
              type: 'article'
            });

            this.seo.setJsonLd({
              '@context': 'https://schema.org',
              '@type': 'Article',
              headline: this.blog.title,
              description,
              image: [image],
              datePublished: this.blog.publishedAt || this.blog.createdAt,
              dateModified: this.blog.updatedAt,
              author: this.blog.author?.name || this.blog.author?.email || 'Author',
              mainEntityOfPage: url
            });
          }
          setTimeout(() => {
            this.cdr.detectChanges();
          }, 0);
        },
        error: (error) => {
          console.error('Error loading blog:', error);
          this.blog = null;
          this.isLoading = false;
          this.hasError = true;
          setTimeout(() => {
            this.cdr.detectChanges();
          }, 0);
        }
      });
  }

  private stripHtml(html: string): string {
    const div = document.createElement('div');
    div.innerHTML = html || '';
    const text = div.textContent || div.innerText || '';
    return text.replace(/\s+/g, ' ').trim();
  }

  getImageUrl(image: string): string {
    if (image.startsWith('http')) {
      return image;
    }
    return `http://dev-api.technootales.in/v1/cloud/file/${image}`;
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

  getReadingTime(content: string): number {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
  }

  formatContent(content: string): string {
    // Return the content as-is since it's already HTML from the rich text editor
    return content || '';
  }

  goBack() {
    this.router.navigate(['/']);
  }

  shareOnTwitter() {
    if (this.blog) {
      const url = encodeURIComponent(window.location.href);
      const text = encodeURIComponent(`Check out this blog post: ${this.blog.title}`);
      window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
    }
  }

  shareOnLinkedIn() {
    if (this.blog) {
      const url = encodeURIComponent(window.location.href);
      const title = encodeURIComponent(this.blog.title);
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}&title=${title}`, '_blank');
    }
  }

  copyLink() {
    navigator.clipboard.writeText(window.location.href).then(() => {
      // You could show a toast notification here
      console.log('Link copied to clipboard');
    });
  }
}
