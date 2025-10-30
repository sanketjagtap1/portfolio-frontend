import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExperienceComponent } from '../../components/experience/experience.component';

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
export class ExperiencePageComponent {}
