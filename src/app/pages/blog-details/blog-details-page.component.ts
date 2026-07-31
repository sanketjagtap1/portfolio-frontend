import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { PortfolioService } from '../../services/portfolio.service';
import { timeout, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IconComponent } from '../../components/ui/icon.component';

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
  imports: [CommonModule, IconComponent],
  template: `
    <div class="min-h-screen">
      <div class="mx-auto max-w-3xl px-6 pb-24 pt-24">
        <!-- Back -->
        <button (click)="goBack()" class="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-ink">
          <app-icon name="arrow-right" [size]="15" class="rotate-180"></app-icon>
          Back to blog
        </button>

        <!-- Loading -->
        <div *ngIf="isLoading" class="flex justify-center py-24" role="status" aria-label="Loading blog post">
          <div class="h-10 w-10 animate-spin rounded-full border-2 border-line border-t-accent"></div>
        </div>

        <!-- Error -->
        <div *ngIf="hasError" class="py-24 text-center">
          <h3 class="font-display text-2xl font-semibold text-ink">Post not found</h3>
          <p class="mt-2 text-muted">This article doesn't exist or has been removed.</p>
          <button (click)="goBack()" class="btn-primary mt-6">Back to blog</button>
        </div>

        <!-- Content -->
        <article *ngIf="!isLoading && !hasError && blog" class="mt-8">
          <div class="flex flex-wrap items-center gap-3 font-mono text-xs text-faint">
            <span>{{ formatDate(blog.publishedAt || blog.createdAt) }}</span>
            <span class="text-line">/</span>
            <span>{{ getReadingTime(blog.content) }} min read</span>
            <span *ngIf="blog.author" class="text-line">/</span>
            <span *ngIf="blog.author">{{ blog.author.name || blog.author.email }}</span>
          </div>

          <h1 class="mt-4 font-display text-3xl md:text-5xl font-semibold tracking-tightest text-ink leading-tight">
            {{ blog.title }}
          </h1>

          <p *ngIf="blog.excerpt" class="mt-4 text-lg text-muted">{{ blog.excerpt }}</p>

          <div *ngIf="blog.tags?.length" class="mt-5 flex flex-wrap gap-1.5">
            <span *ngFor="let tag of blog.tags" class="chip">{{ tag }}</span>
          </div>

          <!-- Featured image -->
          <div *ngIf="blog.featuredImage" class="mt-8 overflow-hidden rounded-2xl border border-line">
            <img [src]="getImageUrl(blog.featuredImage)" [alt]="blog.title" class="w-full object-cover" />
          </div>

          <!-- Body -->
          <div class="blog-content mt-10" [innerHTML]="formatContent(blog.content)"></div>

          <!-- Share -->
          <div class="mt-14 flex flex-col items-start justify-between gap-4 border-t border-line pt-8 sm:flex-row sm:items-center">
            <div>
              <h3 class="font-display text-lg font-semibold text-ink">Share this article</h3>
              <p class="text-sm text-muted">Help others discover this content.</p>
            </div>
            <div class="flex gap-2">
              <button (click)="shareOnTwitter()" aria-label="Share on Twitter/X"
                      class="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-muted transition-colors hover:text-ink hover:border-ink/40">
                <app-icon name="twitter" [size]="16"></app-icon>
              </button>
              <button (click)="shareOnLinkedIn()" aria-label="Share on LinkedIn"
                      class="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-muted transition-colors hover:text-ink hover:border-ink/40">
                <app-icon name="linkedin" [size]="16"></app-icon>
              </button>
              <button (click)="copyLink()" aria-label="Copy link"
                      class="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-muted transition-colors hover:text-ink hover:border-ink/40">
                <app-icon name="copy" [size]="16"></app-icon>
              </button>
            </div>
          </div>
        </article>
      </div>
    </div>
  `,
  styles: [`
    .blog-content {
      line-height: 1.75;
      color: #c9c9ce;
      font-size: 1.05rem;
    }

    /* Headers */
    .blog-content h1,
    .blog-content h2,
    .blog-content h3,
    .blog-content h4,
    .blog-content h5,
    .blog-content h6 {
      color: #ededed;
      font-family: 'Space Grotesk', sans-serif;
      font-weight: 600;
      letter-spacing: -0.02em;
      margin-top: 2rem;
      margin-bottom: 1rem;
      line-height: 1.3;
    }

    .blog-content h1 {
      font-size: 1.875rem;
      border-bottom: 1px solid #26262a;
      padding-bottom: 0.5rem;
    }
    .blog-content h2 {
      font-size: 1.5rem;
      border-bottom: 1px solid #26262a;
      padding-bottom: 0.3rem;
    }
    .blog-content h3 { font-size: 1.25rem; }
    .blog-content h4 { font-size: 1.125rem; }
    .blog-content h5 { font-size: 1rem; }
    .blog-content h6 { font-size: 0.875rem; }

    /* Paragraphs */
    .blog-content p {
      margin-bottom: 1rem;
      color: #a1a1aa;
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
      color: #a1a1aa;
    }

    .blog-content ul li {
      list-style-type: disc;
    }

    .blog-content ol li {
      list-style-type: decimal;
    }

    /* Blockquotes */
    .blog-content blockquote {
      border-left: 3px solid #bef264;
      padding: 1rem 1.5rem;
      margin: 2rem 0;
      font-style: italic;
      color: #d9f99d;
      background: rgba(190,242,100,0.06);
      border-radius: 0.5rem;
      position: relative;
    }

    .blog-content blockquote::before {
      content: '"';
      font-size: 4rem;
      color: rgba(190,242,100,0.3);
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
      color: #bef264;
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
      color: #bef264;
      text-decoration: underline;
      transition: color 0.3s ease;
      font-weight: 500;
    }

    .blog-content a:hover {
      color: #d9f99d;
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
      background: #1c1c20;
      font-weight: bold;
      color: #ededed;
    }

    .blog-content td {
      color: #a1a1aa;
    }

    /* Text formatting */
    .blog-content strong {
      color: #ededed;
      font-weight: bold;
    }

    .blog-content em {
      color: #d9f99d;
      font-style: italic;
    }

    .blog-content u {
      text-decoration: underline;
      color: #bef264;
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
      background: linear-gradient(45deg, #bef264, #bef264);
      border-radius: 3px;
    }

    ::-webkit-scrollbar-thumb:hover {
      background: linear-gradient(45deg, #84991f, #84991f);
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
    private cdr: ChangeDetectorRef
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
        catchError(() => {
          this.hasError = true;
          return of(null);
        })
      )
      .subscribe({
        next: (response) => {
          this.blog = response?.blog || null;
          this.isLoading = false;
          this.hasError = !this.blog;
          setTimeout(() => {
            this.cdr.detectChanges();
          }, 0);
        },
        error: () => {
          this.blog = null;
          this.isLoading = false;
          this.hasError = true;
          setTimeout(() => {
            this.cdr.detectChanges();
          }, 0);
        }
      });
  }

  getImageUrl(image: string): string {
    if (image.startsWith('http')) {
      return image;
    }
    return `${environment.fileApiUrl}/${image}`;
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
    navigator.clipboard.writeText(window.location.href);
  }
}
