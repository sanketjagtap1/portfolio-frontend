import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExperienceComponent } from '../../components/experience/experience.component';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-experience-page',
  standalone: true,
  imports: [CommonModule, ExperienceComponent],
  template: `
    <div class="experience-page">
      <app-experience></app-experience>
    </div>
  `,
  styles: []
})
export class ExperiencePageComponent implements OnInit {
  constructor(private seo: SeoService) {}

  ngOnInit() {
    this.seo.set({
      title: 'Experience — Senior Full-Stack Developer | Sanket Jagtap',
      description:
        '4+ years building production software: enterprise finance portals at Bajaj Housing Finance, loan & insurance APIs at Pegasus InfoCorp, and healthcare platforms — with Angular, Node.js, AWS and microservices.',
      path: '/experience',
    });
  }
}
