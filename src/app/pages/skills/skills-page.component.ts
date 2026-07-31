import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SkillsComponent } from '../../components/skills/skills.component';
import { IconComponent } from '../../components/ui/icon.component';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-skills-page',
  standalone: true,
  imports: [CommonModule, RouterModule, SkillsComponent, IconComponent],
  template: `
    <app-skills></app-skills>

    <section class="pb-24">
      <div class="mx-auto max-w-shell px-6">
        <div class="flex flex-col items-start justify-between gap-6 rounded-2xl border border-line bg-surface p-8 md:flex-row md:items-center">
          <div>
            <h3 class="font-display text-2xl font-semibold text-ink">Ready to work together?</h3>
            <p class="mt-2 max-w-xl text-muted">Let's discuss how my skills can help bring your project to life.</p>
          </div>
          <div class="flex shrink-0 gap-3">
            <a routerLink="/contact" class="btn-primary">
              Get in touch <app-icon name="arrow-up-right" [size]="17"></app-icon>
            </a>
            <a routerLink="/projects" class="btn-ghost">View my work</a>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [],
})
export class SkillsPageComponent implements OnInit {
  constructor(private seo: SeoService) {}

  ngOnInit() {
    this.seo.set({
      title: 'Skills & Tech Stack — Angular, Node.js, Flutter | Sanket Jagtap',
      description:
        'Full-stack skills across Angular, React, TypeScript, Node.js, Flutter, PostgreSQL, MySQL, Redis, Docker and AWS — everything needed to take a product from idea to production.',
      path: '/skills',
    });
  }
}
