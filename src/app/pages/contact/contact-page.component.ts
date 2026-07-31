import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactComponent } from '../../components/contact/contact.component';
import { SeoService } from '../../services/seo.service';

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
export class ContactPageComponent implements OnInit {
  constructor(private seo: SeoService) {}

  ngOnInit() {
    this.seo.set({
      title: 'Contact — Hire a Freelance Developer | Sanket Jagtap',
      description:
        'Hire a freelance full-stack developer for your next web or mobile project. Based in Pune, India — working with clients worldwide. Every message gets a personal reply within 24 hours.',
      path: '/contact',
    });
  }
}
