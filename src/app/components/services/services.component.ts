import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PortfolioService } from '../../services/portfolio.service';
import { timeout, catchError, of } from 'rxjs';
import { IconComponent } from '../ui/icon.component';

export interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  features: string[];
  price?: string;
  duration?: string;
  featured: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, RouterModule, IconComponent],
  template: `
    <section id="services" class="section border-t border-line">
      <div class="mx-auto max-w-shell px-6">
        <!-- Header -->
        <div class="max-w-2xl" data-aos="fade-up">
          <p class="kicker">03 — Services</p>
          <h2 class="mt-4 font-display text-3xl md:text-5xl font-semibold tracking-tightest text-ink">
            Ways we can work together
          </h2>
          <p class="mt-3 text-muted">
            Whether you need a quick fix, a polished website, or a full product built from scratch —
            there's a package with clear scope, pricing and timelines. No surprises.
          </p>
        </div>

        <!-- Loading -->
        <div *ngIf="isLoading" class="mt-14 flex justify-center">
          <div class="h-10 w-10 animate-spin rounded-full border-2 border-line border-t-accent"></div>
        </div>

        <!-- Grid -->
        <div *ngIf="!isLoading && services.length > 0" class="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <div *ngFor="let service of services; let i = index"
               class="group flex h-full flex-col rounded-2xl border border-line bg-surface p-6 transition-colors hover:border-ink/25"
               data-aos="fade-up" [attr.data-aos-delay]="i * 80">
            <div class="flex items-start justify-between">
              <div class="flex h-12 w-12 items-center justify-center rounded-xl border border-line bg-white/[0.03] text-accent">
                <app-icon [name]="iconFor(i)" [size]="22"></app-icon>
              </div>
              <span *ngIf="service.featured"
                    class="rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide text-accent">
                Popular
              </span>
            </div>

            <h3 class="mt-5 font-display text-xl font-semibold text-ink">{{ service.title }}</h3>
            <p class="mt-2 text-sm leading-relaxed text-muted">{{ service.description }}</p>

            <ul class="mt-4 space-y-2">
              <li *ngFor="let feature of service.features.slice(0, 4)" class="flex items-center gap-2.5 text-sm text-muted">
                <app-icon name="check" [size]="15" class="shrink-0 text-accent"></app-icon>
                {{ feature }}
              </li>
            </ul>

            <div class="mt-6 flex items-end justify-between border-t border-line pt-5">
              <div>
                <div *ngIf="service.price" class="font-display text-lg font-semibold text-ink">{{ service.price }}</div>
                <div *ngIf="service.duration" class="font-mono text-xs text-faint">{{ service.duration }}</div>
              </div>
              <a routerLink="/contact"
                 class="inline-flex items-center gap-1.5 rounded-full border border-line px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-ink/40">
                Enquire <app-icon name="arrow-up-right" [size]="14"></app-icon>
              </a>
            </div>
          </div>
        </div>

        <!-- Custom CTA -->
        <div class="mt-12 flex flex-col items-start justify-between gap-6 rounded-2xl border border-line bg-surface p-8 md:flex-row md:items-center"
             data-aos="fade-up">
          <div>
            <h3 class="font-display text-2xl font-semibold text-ink">Need something custom?</h3>
            <p class="mt-2 max-w-xl text-muted">
              Every project is different. Tell me what you're building and I'll put together a plan and a
              fair quote — usually within 24 hours, no obligation.
            </p>
          </div>
          <a routerLink="/contact" class="btn-primary shrink-0">
            Let's talk <app-icon name="arrow-up-right" [size]="17"></app-icon>
          </a>
        </div>
      </div>
    </section>
  `,
  styles: [],
})
export class ServicesComponent implements OnInit {
  services: Service[] = [];
  isLoading = true;

  private icons = ['globe', 'smartphone', 'server', 'palette', 'code', 'layers'];

  constructor(private portfolioService: PortfolioService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadServicesData();
  }

  iconFor(i: number): string {
    return this.icons[i % this.icons.length];
  }

  loadServicesData() {
    this.isLoading = true;
    this.portfolioService.getServices()
      .pipe(
        timeout(10000),
        catchError(() => of([] as Service[])),
      )
      .subscribe({
        next: (data) => {
          this.services = data || [];
          this.isLoading = false;
          this.cdr.detectChanges();
        },
        error: () => {
          this.services = [];
          this.isLoading = false;
          this.cdr.detectChanges();
        },
      });
  }
}
