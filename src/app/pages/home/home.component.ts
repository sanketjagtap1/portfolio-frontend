import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../services/seo.service';
import { CommonModule } from '@angular/common';
import { HeroComponent } from '../../components/hero/hero.component';
import { AboutComponent } from '../../components/about/about.component';
import { StatsComponent } from '../../components/stats/stats.component';
import { FeaturedProjectsComponent } from '../../components/featured-projects/featured-projects.component';
import { ServicesComponent } from '../../components/services/services.component';
import { TestimonialsComponent } from '../../components/testimonials/testimonials.component';
import { BlogComponent } from '../../components/blog/blog.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule, 
    HeroComponent, 
    AboutComponent, 
    StatsComponent, 
    FeaturedProjectsComponent, 
    ServicesComponent,
    TestimonialsComponent,
    BlogComponent
  ],
  template: `
    <div class="home-page">
      <app-hero></app-hero>
      <app-about></app-about>
      <app-stats></app-stats>
      <app-services></app-services>
      <app-featured-projects></app-featured-projects>
      <app-blog></app-blog>
      <app-testimonials></app-testimonials>
    </div>
  `,
  styles: []
})
export class HomeComponent implements OnInit {
  constructor(private readonly seo: SeoService) {}

  ngOnInit(): void {
    const url = typeof window !== 'undefined' ? window.location.href : 'https://sanket-jagtap.in/';
    this.seo.updateTags({
      title: 'Sanket Jagtap - Home',
      description: 'Explore projects, services, experience, and blog by full-stack developer Sanket Jagtap.',
      url,
      image: 'https://sanket-jagtap.in/favicon.ico',
      type: 'website'
    });

    this.seo.setJsonLd({
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Sanket Jagtap',
      url,
      sameAs: []
    });
  }
}
