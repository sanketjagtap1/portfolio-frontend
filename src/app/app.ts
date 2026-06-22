import { Component, OnInit, signal, inject, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { filter } from 'rxjs/operators';

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
  private readonly destroyRef = inject(DestroyRef);

  constructor(private router: Router) {}

  ngOnInit() {
    // Check current route
    this.checkRoute();

    // Listen for route changes (auto-unsubscribed when the component is destroyed)
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => {
        this.checkRoute();
      });

    // Initialize AOS (Animate On Scroll) library.
    // The module's API lives on the default export under ESM interop.
    if (typeof window !== 'undefined') {
      import('aos').then(mod => {
        const AOS: any = (mod as any).default || mod;
        if (AOS && typeof AOS.init === 'function') {
          AOS.init({ duration: 1000, once: true, offset: 100 });
        }
      }).catch(() => {});
    }
  }

  private checkRoute() {
    const currentUrl = this.router.url;
    this.isAdminRoute.set(currentUrl.startsWith('/admin'));
  }
}
