import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PortfolioService, TestimonialSubmission } from '../../services/portfolio.service';

@Component({
  selector: 'app-review-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <section class="min-h-screen py-20 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 text-white relative overflow-hidden">
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div class="absolute bottom-20 right-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
      </div>

      <div class="container mx-auto px-4 relative z-10 max-w-2xl">
        <div class="text-center mb-10">
          <h1 class="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent">
            Leave a Review
          </h1>
          <p class="text-blue-200">Share your experience working with Sanket. Your review appears after a quick approval.</p>
        </div>

        <!-- Success state -->
        <div *ngIf="submitted" class="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-10 border border-white/20 text-center">
          <div class="text-5xl mb-4">🎉</div>
          <h2 class="text-2xl font-bold text-white mb-2">Thank you!</h2>
          <p class="text-blue-100 mb-6">{{ successMessage }}</p>
          <a routerLink="/" class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all">Back to site</a>
        </div>

        <!-- Form -->
        <form *ngIf="!submitted" (ngSubmit)="submit()" #f="ngForm"
              class="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/20 space-y-5">

          <div>
            <label class="block text-sm font-medium text-blue-100 mb-2">Your name *</label>
            <input [(ngModel)]="model.name" name="name" required minlength="2" maxlength="100"
                   class="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder-blue-300/50 focus:outline-none focus:border-blue-400"
                   placeholder="Jane Doe">
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label class="block text-sm font-medium text-blue-100 mb-2">Role / Position</label>
              <input [(ngModel)]="model.position" name="position" maxlength="100"
                     class="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder-blue-300/50 focus:outline-none focus:border-blue-400"
                     placeholder="Engineering Manager">
            </div>
            <div>
              <label class="block text-sm font-medium text-blue-100 mb-2">Company</label>
              <input [(ngModel)]="model.company" name="company" maxlength="100"
                     class="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder-blue-300/50 focus:outline-none focus:border-blue-400"
                     placeholder="Acme Inc.">
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-blue-100 mb-2">Email <span class="text-blue-300/60">(optional, not shown publicly)</span></label>
            <input [(ngModel)]="model.email" name="email" type="email" maxlength="150"
                   class="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder-blue-300/50 focus:outline-none focus:border-blue-400"
                   placeholder="jane@company.com">
          </div>

          <div>
            <label class="block text-sm font-medium text-blue-100 mb-2">Rating</label>
            <div class="flex items-center gap-2">
              <button type="button" *ngFor="let s of [1,2,3,4,5]" (click)="model.rating = s"
                      class="transition-transform hover:scale-110" [attr.aria-label]="s + ' stars'">
                <svg class="w-8 h-8" [class.text-yellow-400]="s <= (model.rating || 0)" [class.text-white/20]="s > (model.rating || 0)" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
              </button>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-blue-100 mb-2">Your review *</label>
            <textarea [(ngModel)]="model.content" name="content" required minlength="10" maxlength="1000" rows="5"
                      class="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder-blue-300/50 focus:outline-none focus:border-blue-400 resize-y"
                      placeholder="What was it like working with Sanket?"></textarea>
            <div class="text-right text-xs text-blue-300/60 mt-1">{{ (model.content || '').length }}/1000</div>
          </div>

          <p *ngIf="error" class="text-red-300 text-sm">{{ error }}</p>

          <button type="submit" [disabled]="submitting || f.invalid"
                  class="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
            {{ submitting ? 'Submitting...' : 'Submit Review' }}
          </button>
        </form>
      </div>
    </section>
  `,
  styles: []
})
export class ReviewPageComponent {
  model: TestimonialSubmission = { name: '', content: '', position: '', company: '', email: '', rating: null };
  submitting = false;
  submitted = false;
  error = '';
  successMessage = 'Your review has been submitted and will appear once approved.';

  constructor(private portfolioService: PortfolioService) {}

  submit() {
    this.error = '';
    if (!this.model.name || this.model.name.trim().length < 2) { this.error = 'Please enter your name.'; return; }
    if (!this.model.content || this.model.content.trim().length < 10) { this.error = 'Your review must be at least 10 characters.'; return; }

    this.submitting = true;
    const payload: TestimonialSubmission = {
      name: this.model.name.trim(),
      content: this.model.content.trim(),
      position: this.model.position?.trim() || undefined,
      company: this.model.company?.trim() || undefined,
      email: this.model.email?.trim() || undefined,
      rating: this.model.rating || null,
    };

    this.portfolioService.submitTestimonial(payload).subscribe({
      next: (res: any) => {
        this.submitting = false;
        this.submitted = true;
        if (res?.message) this.successMessage = res.message;
      },
      error: (err) => {
        this.submitting = false;
        this.error = err?.error?.errors?.[0]?.msg || err?.error?.error || 'Something went wrong. Please try again.';
      }
    });
  }
}
