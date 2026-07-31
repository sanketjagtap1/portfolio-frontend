import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { catchError, of, timeout } from 'rxjs';
import { PortfolioService, Testimonial } from '../../services/portfolio.service';
import { IconComponent } from '../ui/icon.component';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule, RouterModule, IconComponent],
  template: `
    <section class="section border-t border-line">
      <div class="mx-auto max-w-shell px-6">
        <div class="max-w-2xl" data-aos="fade-up">
          <p class="kicker">05 — Testimonials</p>
          <h2 class="mt-4 font-display text-3xl md:text-5xl font-semibold tracking-tightest text-ink">
            What people say
          </h2>
          <p class="mt-3 text-muted">Feedback from clients and colleagues I've worked with.</p>
        </div>

        <!-- Reviews grid -->
        <div *ngIf="testimonials.length > 0" class="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <figure *ngFor="let t of testimonials; let i = index"
                  class="flex flex-col rounded-2xl border border-line bg-surface p-6"
                  data-aos="fade-up" [attr.data-aos-delay]="(i % 3) * 80">
            <div class="flex items-center gap-1">
              <app-icon *ngFor="let s of [1,2,3,4,5]" name="star" [size]="16"
                        [ngClass]="s <= (t.rating || 5) ? 'text-accent' : 'text-line'"></app-icon>
            </div>
            <blockquote class="mt-4 flex-1 leading-relaxed text-muted">"{{ t.content }}"</blockquote>
            <figcaption class="mt-6 flex items-center gap-3 border-t border-line pt-5">
              <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-zinc-600 to-zinc-800 text-sm font-bold text-white">
                {{ initials(t.name) }}
              </div>
              <div class="min-w-0">
                <div class="truncate font-semibold text-ink">{{ t.name }}</div>
                <div *ngIf="t.position || t.company" class="truncate text-sm text-muted">
                  {{ t.position }}{{ t.position && t.company ? ', ' : '' }}{{ t.company }}
                </div>
              </div>
            </figcaption>
          </figure>
        </div>

        <!-- Empty state -->
        <div *ngIf="loaded && testimonials.length === 0"
             class="mt-12 flex flex-col items-start gap-4 rounded-2xl border border-line bg-surface p-8 sm:flex-row sm:items-center sm:justify-between"
             data-aos="fade-up">
          <p class="text-muted">
            No reviews yet — if we've worked together, I'd love your feedback.
          </p>
          <a routerLink="/contact" class="btn-ghost shrink-0">Get in touch</a>
        </div>
      </div>
    </section>
  `,
  styles: [],
})
export class TestimonialsComponent implements OnInit {
  testimonials: Testimonial[] = [];
  loaded = false;

  constructor(private portfolioService: PortfolioService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.portfolioService.getTestimonials().pipe(
      timeout(10000),
      catchError(() => of([] as Testimonial[])),
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
