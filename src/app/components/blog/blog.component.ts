import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { timeout, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { PortfolioService } from '../../services/portfolio.service';
import { IconComponent } from '../ui/icon.component';

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
  createdAt: string;
  updatedAt: string;
}

interface BlogResponse {
  blogs: Blog[];
  pagination: { page: number; limit: number; total: number; pages: number };
}

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <section id="blog" class="section border-t border-line">
      <div class="mx-auto max-w-shell px-6">
        <!-- Header -->
        <div class="max-w-2xl" data-aos="fade-up">
          <p class="kicker">04 — Writing</p>
          <h2 class="mt-4 font-display text-3xl md:text-5xl font-semibold tracking-tightest text-ink">
            Blog &amp; articles
          </h2>
          <p class="mt-3 text-muted">
            Notes on web development, the projects I'm building, and things I learn along the way.
          </p>
        </div>

        <!-- Loading -->
        <div *ngIf="isLoading" class="mt-14 flex justify-center" role="status" aria-label="Loading blog posts">
          <div class="h-10 w-10 animate-spin rounded-full border-2 border-line border-t-accent"></div>
        </div>

        <!-- Grid -->
        <div *ngIf="!isLoading && blogs.length > 0" class="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <article *ngFor="let blog of blogs; let i = index"
                   (click)="viewBlog(blog.slug)"
                   class="group flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-colors hover:border-ink/25"
                   data-aos="fade-up" [attr.data-aos-delay]="i * 80">
            <!-- Cover -->
            <div class="relative aspect-[16/9] overflow-hidden bg-canvas">
              <img *ngIf="blog.featuredImage" [src]="getImageUrl(blog.featuredImage)" [alt]="blog.title"
                   class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" loading="lazy" />
              <div *ngIf="!blog.featuredImage"
                   class="flex h-full w-full items-center justify-center bg-gradient-to-br from-surface2 to-canvas">
                <app-icon name="code" [size]="40" class="text-line"></app-icon>
              </div>
            </div>

            <!-- Body -->
            <div class="flex flex-1 flex-col p-5">
              <div class="font-mono text-xs text-faint">{{ formatDate(blog.publishedAt || blog.createdAt) }}</div>
              <h3 class="mt-2 line-clamp-2 font-display text-lg font-semibold text-ink group-hover:text-accent transition-colors">
                {{ blog.title }}
              </h3>
              <p class="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">{{ blog.excerpt }}</p>

              <div *ngIf="blog.tags?.length" class="mt-4 flex flex-wrap gap-1.5">
                <span *ngFor="let tag of blog.tags.slice(0, 3)" class="chip">{{ tag }}</span>
              </div>

              <div class="mt-5 flex items-center gap-1.5 pt-1 text-sm font-semibold text-ink">
                Read more <app-icon name="arrow-right" [size]="15" class="transition-transform group-hover:translate-x-1"></app-icon>
              </div>
            </div>
          </article>
        </div>

        <!-- Empty -->
        <div *ngIf="!isLoading && blogs.length === 0 && !hasError" class="mt-14 rounded-2xl border border-line bg-surface p-12 text-center">
          <p class="text-muted">No articles yet — check back soon.</p>
        </div>

        <!-- Error -->
        <div *ngIf="hasError" class="mt-14 rounded-2xl border border-line bg-surface p-12 text-center">
          <p class="text-muted">Couldn't load posts right now.</p>
          <button (click)="loadBlogs()" class="btn-ghost mt-4">Try again</button>
        </div>

        <!-- Pagination -->
        <div *ngIf="!isLoading && pagination && pagination.pages > 1" class="mt-10 flex items-center justify-center gap-2">
          <button (click)="loadPage(pagination.page - 1)" [disabled]="pagination.page <= 1"
                  class="rounded-lg border border-line px-3 py-2 text-sm text-muted transition-colors hover:text-ink disabled:opacity-40">
            Prev
          </button>
          <button *ngFor="let page of getPageNumbers()" (click)="loadPage(page)"
                  class="h-9 w-9 rounded-lg text-sm transition-colors"
                  [ngClass]="page === pagination.page ? 'bg-accent text-accent-ink font-semibold' : 'border border-line text-muted hover:text-ink'">
            {{ page }}
          </button>
          <button (click)="loadPage(pagination.page + 1)" [disabled]="pagination.page >= pagination.pages"
                  class="rounded-lg border border-line px-3 py-2 text-sm text-muted transition-colors hover:text-ink disabled:opacity-40">
            Next
          </button>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
  `],
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
    private router: Router,
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
        catchError(() => {
          this.hasError = true;
          return of({ blogs: [], pagination: { page: 1, limit: 6, total: 0, pages: 0 } });
        }),
      )
      .subscribe({
        next: (response: BlogResponse) => {
          this.blogs = response.blogs || [];
          this.pagination = response.pagination;
          this.isLoading = false;
          this.cdr.detectChanges();
        },
        error: () => {
          this.blogs = [];
          this.pagination = null;
          this.isLoading = false;
          this.hasError = true;
          this.cdr.detectChanges();
        },
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
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  }

  getImageUrl(image: string): string {
    return this.portfolioService.getFileUrl(image);
  }

  formatDate(dateString: string): string {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  }

  viewBlog(slug: string) {
    this.router.navigate(['/blog', slug]);
  }
}
