import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { timeout, catchError, of } from 'rxjs';
import { AdminNavComponent } from '../admin-nav/admin-nav.component';
import { environment } from '../../../environments/environment';

interface AdminTestimonial {
  id: number;
  name: string;
  position?: string;
  company?: string;
  content: string;
  email?: string;
  rating?: number;
  approved: boolean;
  featured: boolean;
  createdAt: string;
}

@Component({
  selector: 'app-testimonials-management',
  standalone: true,
  imports: [CommonModule, AdminNavComponent],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 text-white">
      <app-admin-nav></app-admin-nav>

      <div class="container mx-auto px-4 py-8">
        <div class="flex items-center justify-between mb-8">
          <div>
            <h1 class="text-3xl font-bold">Testimonials</h1>
            <p class="text-blue-200 text-sm mt-1">
              Approve reviews to show them publicly. Share your review link:
              <a [href]="reviewLink" target="_blank" class="text-cyan-300 underline">{{ reviewLink }}</a>
            </p>
          </div>
          <div class="text-right text-sm text-blue-200">
            <div><span class="text-amber-300 font-semibold">{{ pendingCount }}</span> pending</div>
            <div><span class="text-green-300 font-semibold">{{ approvedCount }}</span> approved</div>
          </div>
        </div>

        <div *ngIf="isLoading" class="text-center py-20 text-blue-200">Loading…</div>

        <div *ngIf="!isLoading && testimonials.length === 0" class="text-center py-20 text-blue-200">
          No reviews yet. Share your review link to collect some.
        </div>

        <div *ngIf="!isLoading" class="space-y-4">
          <div *ngFor="let t of testimonials"
               class="bg-white/5 border rounded-2xl p-6"
               [class.border-amber-400_30]="!t.approved"
               [ngClass]="t.approved ? 'border-white/15' : 'border-amber-400/40'">
            <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-3 flex-wrap">
                  <span class="font-semibold text-white">{{ t.name }}</span>
                  <span *ngIf="t.position || t.company" class="text-sm text-blue-200">
                    {{ t.position }}{{ t.position && t.company ? ', ' : '' }}{{ t.company }}
                  </span>
                  <span class="px-2 py-0.5 rounded-full text-xs font-medium"
                        [ngClass]="t.approved ? 'bg-green-500/20 text-green-300 border border-green-400/30' : 'bg-amber-500/20 text-amber-200 border border-amber-400/30'">
                    {{ t.approved ? 'Approved' : 'Pending' }}
                  </span>
                  <span *ngIf="t.featured" class="px-2 py-0.5 rounded-full text-xs bg-blue-500/20 text-blue-200 border border-blue-400/30">Featured</span>
                  <span *ngIf="t.rating" class="text-yellow-400 text-sm">{{ stars(t.rating) }}</span>
                </div>
                <p class="text-blue-100 mt-3 leading-relaxed">"{{ t.content }}"</p>
                <p class="text-xs text-blue-300/60 mt-2">
                  {{ t.createdAt | date:'medium' }}<span *ngIf="t.email"> · {{ t.email }}</span>
                </p>
              </div>

              <div class="flex md:flex-col gap-2 flex-shrink-0">
                <button (click)="toggleApprove(t)"
                        class="px-4 py-2 rounded-lg text-sm font-medium transition-all"
                        [ngClass]="t.approved ? 'bg-white/10 text-blue-200 hover:bg-white/20' : 'bg-green-500/20 text-green-300 border border-green-400/30 hover:bg-green-500/30'">
                  {{ t.approved ? 'Unapprove' : 'Approve' }}
                </button>
                <button (click)="toggleFeature(t)"
                        class="px-4 py-2 rounded-lg text-sm font-medium bg-white/10 text-blue-200 hover:bg-white/20 transition-all">
                  {{ t.featured ? 'Unfeature' : 'Feature' }}
                </button>
                <button (click)="remove(t)"
                        class="px-4 py-2 rounded-lg text-sm font-medium bg-red-500/20 text-red-300 border border-red-400/30 hover:bg-red-500/30 transition-all">
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class TestimonialsManagementComponent implements OnInit {
  testimonials: AdminTestimonial[] = [];
  isLoading = true;
  reviewLink = `${typeof window !== 'undefined' ? window.location.origin : ''}/review`;

  private apiUrl = `${environment.apiBaseUrl}/api/portfolio/admin`;

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef, private router: Router) {}

  ngOnInit() {
    if (!localStorage.getItem('admin_token')) {
      this.router.navigate(['/admin/login']);
      return;
    }
    this.load();
  }

  get pendingCount(): number { return this.testimonials.filter(t => !t.approved).length; }
  get approvedCount(): number { return this.testimonials.filter(t => t.approved).length; }

  private headers(): HttpHeaders {
    return new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('admin_token')}`);
  }

  stars(rating: number): string {
    return '★'.repeat(Math.max(0, Math.min(5, rating)));
  }

  load() {
    this.isLoading = true;
    this.http.get<AdminTestimonial[]>(`${this.apiUrl}/testimonials`, { headers: this.headers() })
      .pipe(timeout(10000), catchError(err => { console.error('Load testimonials failed', err); return of([] as AdminTestimonial[]); }))
      .subscribe(list => {
        this.testimonials = list || [];
        this.isLoading = false;
        this.cdr.detectChanges();
      });
  }

  toggleApprove(t: AdminTestimonial) {
    this.http.put(`${this.apiUrl}/testimonials/${t.id}`, { approved: !t.approved }, { headers: this.headers() })
      .subscribe({ next: () => { t.approved = !t.approved; this.cdr.detectChanges(); }, error: e => console.error(e) });
  }

  toggleFeature(t: AdminTestimonial) {
    this.http.put(`${this.apiUrl}/testimonials/${t.id}`, { featured: !t.featured }, { headers: this.headers() })
      .subscribe({ next: () => { t.featured = !t.featured; this.cdr.detectChanges(); }, error: e => console.error(e) });
  }

  remove(t: AdminTestimonial) {
    if (!confirm('Delete this review permanently?')) return;
    this.http.delete(`${this.apiUrl}/testimonials/${t.id}`, { headers: this.headers() })
      .subscribe({ next: () => { this.testimonials = this.testimonials.filter(x => x.id !== t.id); this.cdr.detectChanges(); }, error: e => console.error(e) });
  }
}
