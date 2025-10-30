import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { filter } from 'rxjs/operators';
import { SeoService } from './services/seo.service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    CommonModule,
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly title = signal('Sanket Jagtap - Full Stack Developer');
  isAdminRoute = signal(false);

  constructor(private router: Router, private seo: SeoService) {}

  ngOnInit() {
    // Check current route
    this.checkRoute();
    
    // Listen for route changes
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.checkRoute();
      });

    // Initialize AOS (Animate On Scroll) library
    if (typeof window !== 'undefined') {
      import('aos').then(AOS => {
        AOS.init({
          duration: 1000,
          once: true,
          offset: 100
        });
      });
    }
  }

  private checkRoute() {
    const currentUrl = this.router.url;
    this.isAdminRoute.set(currentUrl.startsWith('/admin'));
    if (typeof window !== 'undefined') {
      this.seo.setCanonical(window.location.href);
    }
  }
}
