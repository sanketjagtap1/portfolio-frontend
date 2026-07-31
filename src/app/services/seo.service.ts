import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

const ORIGIN = 'https://sanket-jagtap.in';

/**
 * Per-page SEO: title, meta description, canonical URL and OG/Twitter tags.
 * Called from each page component — with prerendering enabled these values are
 * baked into the static HTML for every route, so each page carries its own
 * search snippet instead of inheriting the homepage's.
 */
@Injectable({ providedIn: 'root' })
export class SeoService {
  private title = inject(Title);
  private meta = inject(Meta);
  private doc = inject(DOCUMENT);

  set(opts: { title: string; description: string; path: string }): void {
    const url = `${ORIGIN}${opts.path}`;

    this.title.setTitle(opts.title);
    this.meta.updateTag({ name: 'description', content: opts.description });

    // Open Graph / Twitter
    this.meta.updateTag({ property: 'og:title', content: opts.title });
    this.meta.updateTag({ property: 'og:description', content: opts.description });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ name: 'twitter:title', content: opts.title });
    this.meta.updateTag({ name: 'twitter:description', content: opts.description });

    // Canonical
    let link = this.doc.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.doc.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.doc.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }
}
