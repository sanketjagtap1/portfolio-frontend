import { Injectable, Inject } from '@angular/core';
import { Title, Meta, DomSanitizer } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

export interface SeoConfig {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
  type?: 'website' | 'article' | string;
}

@Injectable({ providedIn: 'root' })
export class SeoService {
  constructor(
    private readonly titleService: Title,
    private readonly meta: Meta,
    private readonly sanitizer: DomSanitizer,
    @Inject(DOCUMENT) private readonly document: Document
  ) {}

  updateTags(cfg: SeoConfig): void {
    if (cfg.title) {
      this.titleService.setTitle(cfg.title);
      this.meta.updateTag({ property: 'og:title', content: cfg.title });
      this.meta.updateTag({ name: 'twitter:title', content: cfg.title });
    }

    if (cfg.description) {
      this.meta.updateTag({ name: 'description', content: cfg.description });
      this.meta.updateTag({ property: 'og:description', content: cfg.description });
      this.meta.updateTag({ name: 'twitter:description', content: cfg.description });
    }

    if (cfg.url) {
      this.meta.updateTag({ property: 'og:url', content: cfg.url });
      this.setCanonical(cfg.url);
    }

    if (cfg.image) {
      this.meta.updateTag({ property: 'og:image', content: cfg.image });
      this.meta.updateTag({ name: 'twitter:image', content: cfg.image });
    }

    this.meta.updateTag({ property: 'og:type', content: cfg.type || 'website' });
  }

  setCanonical(url: string): void {
    const head = this.document.head;
    let linkEl = this.document.querySelector("link[rel='canonical']") as HTMLLinkElement | null;
    if (!linkEl) {
      linkEl = this.document.createElement('link');
      linkEl.setAttribute('rel', 'canonical');
      head.appendChild(linkEl);
    }
    linkEl.setAttribute('href', url);
  }

  setJsonLd(jsonLdObject: object): void {
    // Remove existing JSON-LD if any to avoid duplicates
    const existing = this.document.querySelector("script[type='application/ld+json']");
    if (existing && existing.parentNode) {
      existing.parentNode.removeChild(existing);
    }

    const script = this.document.createElement('script');
    script.setAttribute('type', 'application/ld+json');
    script.text = JSON.stringify(jsonLdObject);
    this.document.head.appendChild(script);
  }
}


