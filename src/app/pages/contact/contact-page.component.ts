import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactComponent } from '../../components/contact/contact.component';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [CommonModule, ContactComponent],
  template: `
    <div class="contact-page">
      <app-contact></app-contact>
    </div>
  `,
  styles: []
})
export class ContactPageComponent {}
