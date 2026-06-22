import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { catchError, of, timeout } from 'rxjs';
import { PortfolioService, Testimonial } from '../../services/portfolio.service';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <section class="py-20 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 text-white relative overflow-hidden">
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/20 to-cyan-600/20"></div>
        <div class="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div class="absolute bottom-20 right-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
      </div>

      <div class="container mx-auto px-4 relative z-10">
        <div class="text-center mb-16" data-aos="fade-up">
          <h2 class="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent">
            What People Say
          </h2>
          <p class="text-xl text-blue-200 max-w-3xl mx-auto leading-relaxed">
            Feedback from clients and colleagues I've worked with
          </p>
        </div>

        <!-- Reviews grid -->
        <div *ngIf="testimonials.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div *ngFor="let t of testimonials; let i = index" class="group" data-aos="zoom-in" [attr.data-aos-delay]="(i % 3) * 100 + 100">
            <div class="relative h-full">
              <div class="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-500"></div>
              <div class="relative h-full flex flex-col bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/20 shadow-xl hover:shadow-blue-500/25 transition-all duration-500 hover:-translate-y-2">
                <div class="flex items-center gap-1 mb-4">
                  <svg *ngFor="let s of [1,2,3,4,5]" class="w-5 h-5" [class.text-yellow-400]="s <= (t.rating || 5)" [class.text-white/20]="s > (t.rating || 5)" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                </div>

                <p class="text-blue-100 leading-relaxed mb-6 flex-1">"{{ t.content }}"</p>

                <div class="flex items-center gap-4">
                  <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                    {{ initials(t.name) }}
                  </div>
                  <div class="min-w-0">
                    <div class="font-semibold text-white truncate">{{ t.name }}</div>
                    <div *ngIf="t.position || t.company" class="text-sm text-blue-200 truncate">
                      {{ t.position }}{{ t.position && t.company ? ', ' : '' }}{{ t.company }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty state (no approved reviews yet) -->
        <div *ngIf="loaded && testimonials.length === 0" class="text-center max-w-xl mx-auto" data-aos="fade-up">
          <div class="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-10 border border-white/20">
            <div class="text-4xl mb-4">💬</div>
            <p class="text-blue-100 text-lg">No reviews yet — if we've worked together, I'd love your feedback.</p>
          </div>
        </div>

        <!-- Leave a review CTA -->
        <div class="text-center mt-16" data-aos="fade-up" data-aos-delay="400">
          <a routerLink="/review" class="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            Leave a Review
            <svg class="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  `,
  styles: []
})
export class TestimonialsComponent implements OnInit {
  testimonials: Testimonial[] = [];
  loaded = false;

  constructor(private portfolioService: PortfolioService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.portfolioService.getTestimonials().pipe(
      timeout(10000),
      catchError(() => of([] as Testimonial[]))
    ).subscribe(list => {
      this.testimonials = list || [];
      this.loaded = true;
      this.cdr.detectChanges();
    });
  }

  initials(name: string): string {
    return (name || '?').trim().split(/\s+/).map(p => p.charAt(0)).slice(0, 2).join('').toUpperCase();
  }
}
