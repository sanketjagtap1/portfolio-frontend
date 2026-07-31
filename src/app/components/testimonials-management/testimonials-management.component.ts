import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { timeout, catchError, of } from 'rxjs';
import { AdminNavComponent } from '../admin-nav/admin-nav.component';
import { IconComponent } from '../ui/icon.component';
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

interface ReviewInvite {
  id: number;
  token: string;
  label?: string;
  used: boolean;
  usedAt?: string;
  expiresAt?: string;
  createdAt: string;
}

@Component({
  selector: 'app-testimonials-management',
  standalone: true,
  imports: [CommonModule, FormsModule, AdminNavComponent, IconComponent],
  template: `
    <div class="min-h-screen bg-canvas text-ink">
      <app-admin-nav></app-admin-nav>

      <div class="mx-auto max-w-shell px-4 md:px-6 py-8 md:py-10 space-y-10">
        <div>
          <span class="kicker mb-3">TESTIMONIALS</span>
          <h1 class="font-display text-3xl md:text-4xl font-semibold text-ink mt-3">Testimonials</h1>
          <p class="text-muted text-sm mt-2">Reviews are invitation-only. Generate a link below and share it — the same link is reusable and can collect reviews from as many people as you like.</p>
        </div>

        <!-- Generate review link -->
        <div class="rounded-2xl border border-line bg-surface p-6">
          <h2 class="font-display text-lg font-semibold text-ink mb-4">Create a review link</h2>
          <div class="flex flex-col md:flex-row gap-3 md:items-end">
            <div class="flex-1">
              <label class="block text-xs font-mono uppercase tracking-[0.15em] text-faint mb-2">Who is this for? <span class="text-faint normal-case tracking-normal">(optional, for your reference)</span></label>
              <input [(ngModel)]="newLabel" name="newLabel" maxlength="100"
                     class="w-full rounded-xl border border-line bg-surface2 px-4 py-3 text-ink"
                     placeholder="e.g. John from Acme">
            </div>
            <div class="w-full md:w-40">
              <label class="block text-xs font-mono uppercase tracking-[0.15em] text-faint mb-2">Expires in (days)</label>
              <input [(ngModel)]="newExpiry" name="newExpiry" type="number" min="0"
                     class="w-full rounded-xl border border-line bg-surface2 px-4 py-3 text-ink"
                     placeholder="0 = never">
            </div>
            <button (click)="generateInvite()" [disabled]="generating" class="btn-primary !px-4 !py-2 text-sm">
              <app-icon [name]="generating ? 'loader' : 'plus'" [size]="16" [class.animate-spin]="generating"></app-icon>
              {{ generating ? 'Creating…' : 'Generate Link' }}
            </button>
          </div>

          <div *ngIf="lastLink" class="mt-4 p-4 rounded-xl border border-accent/30 bg-accent/10">
            <p class="text-sm text-muted mb-2">Share this reusable link (many people can submit with it):</p>
            <div class="flex gap-2">
              <input readonly [value]="lastLink" class="flex-1 rounded-lg border border-line bg-surface2 px-3 py-2 text-ink text-sm">
              <button (click)="copy(lastLink)" class="btn-ghost !px-4 !py-2 text-sm">
                <app-icon name="copy" [size]="15"></app-icon>
                {{ copied === lastLink ? 'Copied!' : 'Copy' }}
              </button>
            </div>
          </div>
        </div>

        <!-- Existing invites -->
        <div class="rounded-2xl border border-line bg-surface p-6">
          <h2 class="font-display text-lg font-semibold text-ink mb-4">Review links</h2>
          <div *ngIf="invites.length === 0" class="text-faint text-sm">No links yet.</div>
          <div class="space-y-3">
            <div *ngFor="let inv of invites" class="flex flex-col md:flex-row md:items-center gap-3 p-3 rounded-xl border border-line bg-white/[0.02]">
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-2 flex-wrap">
                  <span class="font-medium text-ink">{{ inv.label || 'Untitled' }}</span>
                  <span class="chip" [ngClass]="statusClass(inv)">{{ status(inv) }}</span>
                </div>
                <div class="text-xs text-faint mt-1 truncate">{{ link(inv) }}</div>
              </div>
              <div class="flex gap-2 flex-shrink-0">
                <button *ngIf="status(inv) === 'Active'" (click)="copy(link(inv))" class="btn-ghost !px-4 !py-2 text-sm">
                  <app-icon name="link" [size]="15"></app-icon>
                  {{ copied === link(inv) ? 'Copied!' : 'Copy' }}
                </button>
                <button (click)="revoke(inv)" class="inline-flex items-center justify-center gap-2 rounded-full border border-red-500/25 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-300 transition-colors hover:bg-red-500/20">
                  <app-icon name="trash" [size]="15"></app-icon>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Reviews -->
        <div>
          <div class="flex items-center justify-between mb-4">
            <h2 class="font-display text-lg font-semibold text-ink">Reviews</h2>
            <div class="text-right text-sm text-muted">
              <span class="text-amber-300 font-semibold">{{ pendingCount }}</span> pending ·
              <span class="text-accent font-semibold">{{ approvedCount }}</span> approved
            </div>
          </div>

          <div *ngIf="isLoading" class="text-center py-12 text-muted">Loading…</div>
          <div *ngIf="!isLoading && testimonials.length === 0" class="text-faint text-sm">No reviews yet.</div>

          <div *ngIf="!isLoading" class="space-y-4">
            <div *ngFor="let t of testimonials" class="rounded-2xl border bg-surface p-6"
                 [ngClass]="t.approved ? 'border-line' : 'border-amber-400/40'">
              <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div class="flex-1 min-w-0">
                  <div class="flex items-center gap-3 flex-wrap">
                    <span class="font-semibold text-ink">{{ t.name }}</span>
                    <span *ngIf="t.position || t.company" class="text-sm text-muted">{{ t.position }}{{ t.position && t.company ? ', ' : '' }}{{ t.company }}</span>
                    <span class="chip" [ngClass]="t.approved ? '!text-accent !border-accent/30 !bg-accent/10' : '!text-amber-300 !border-amber-400/30 !bg-amber-500/10'">{{ t.approved ? 'Approved' : 'Pending' }}</span>
                    <span *ngIf="t.featured" class="chip !text-accent !border-accent/30 !bg-accent/10">Featured</span>
                    <span *ngIf="t.rating" class="inline-flex items-center gap-0.5 text-accent">{{ stars(t.rating) }}</span>
                  </div>
                  <p class="text-muted mt-3 leading-relaxed">"{{ t.content }}"</p>
                  <p class="text-xs text-faint mt-2">{{ t.createdAt | date:'medium' }}<span *ngIf="t.email"> · {{ t.email }}</span></p>
                </div>
                <div class="flex md:flex-col gap-2 flex-shrink-0">
                  <button *ngIf="!t.approved" (click)="toggleApprove(t)" class="btn-primary !px-4 !py-2 text-sm">
                    <app-icon name="check" [size]="15"></app-icon>
                    Approve
                  </button>
                  <button *ngIf="t.approved" (click)="toggleApprove(t)" class="btn-ghost !px-4 !py-2 text-sm">
                    <app-icon name="x" [size]="15"></app-icon>
                    Unapprove
                  </button>
                  <button (click)="toggleFeature(t)" class="btn-ghost !px-4 !py-2 text-sm">
                    <app-icon name="star" [size]="15"></app-icon>
                    {{ t.featured ? 'Unfeature' : 'Feature' }}
                  </button>
                  <button (click)="remove(t)" class="inline-flex items-center justify-center gap-2 rounded-full border border-red-500/25 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-300 transition-colors hover:bg-red-500/20">
                    <app-icon name="trash" [size]="15"></app-icon>
                    Delete
                  </button>
                </div>
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
  invites: ReviewInvite[] = [];
  isLoading = true;

  newLabel = '';
  newExpiry: number | null = null;
  generating = false;
  lastLink = '';
  copied = '';

  private apiUrl = `${environment.apiBaseUrl}/api/portfolio/admin`;
  private origin = typeof window !== 'undefined' ? window.location.origin : '';

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef, private router: Router) {}

  ngOnInit() {
    if (!localStorage.getItem('admin_token')) {
      this.router.navigate(['/admin/login']);
      return;
    }
    this.load();
    this.loadInvites();
  }

  get pendingCount(): number { return this.testimonials.filter(t => !t.approved).length; }
  get approvedCount(): number { return this.testimonials.filter(t => t.approved).length; }

  private headers(): HttpHeaders {
    return new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('admin_token')}`);
  }

  stars(rating: number): string { return '★'.repeat(Math.max(0, Math.min(5, rating))); }

  link(inv: ReviewInvite): string { return `${this.origin}/review?token=${inv.token}`; }

  status(inv: ReviewInvite): string {
    // Links are reusable — a link is Active until it expires (if an expiry is set).
    if (inv.expiresAt && new Date(inv.expiresAt) < new Date()) return 'Expired';
    return 'Active';
  }

  statusClass(inv: ReviewInvite): string {
    const s = this.status(inv);
    if (s === 'Expired') return '!text-faint';
    return '!text-accent !border-accent/30 !bg-accent/10';
  }

  copy(text: string) {
    navigator.clipboard?.writeText(text).then(() => {
      this.copied = text;
      this.cdr.detectChanges();
      setTimeout(() => { this.copied = ''; this.cdr.detectChanges(); }, 2000);
    });
  }

  load() {
    this.isLoading = true;
    this.http.get<AdminTestimonial[]>(`${this.apiUrl}/testimonials`, { headers: this.headers() })
      .pipe(timeout(10000), catchError(() => of([] as AdminTestimonial[])))
      .subscribe(list => { this.testimonials = list || []; this.isLoading = false; this.cdr.detectChanges(); });
  }

  loadInvites() {
    this.http.get<ReviewInvite[]>(`${this.apiUrl}/review-invites`, { headers: this.headers() })
      .pipe(timeout(10000), catchError(() => of([] as ReviewInvite[])))
      .subscribe(list => { this.invites = list || []; this.cdr.detectChanges(); });
  }

  generateInvite() {
    this.generating = true;
    const body: any = { label: this.newLabel?.trim() || null };
    if (this.newExpiry && this.newExpiry > 0) body.expiresInDays = this.newExpiry;
    this.http.post<any>(`${this.apiUrl}/review-invites`, body, { headers: this.headers() })
      .subscribe({
        next: (res) => {
          this.generating = false;
          if (res?.invite) {
            this.lastLink = this.link(res.invite);
            this.invites.unshift(res.invite);
            this.newLabel = '';
            this.newExpiry = null;
          }
          this.cdr.detectChanges();
        },
        error: (e) => { this.generating = false; console.error(e); }
      });
  }

  revoke(inv: ReviewInvite) {
    if (!confirm('Delete this review link?')) return;
    this.http.delete(`${this.apiUrl}/review-invites/${inv.id}`, { headers: this.headers() })
      .subscribe({ next: () => { this.invites = this.invites.filter(x => x.id !== inv.id); this.cdr.detectChanges(); }, error: e => console.error(e) });
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
