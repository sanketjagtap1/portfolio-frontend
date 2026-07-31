# Changelog

## 2026-07 — Growth & hardening release

### Security
- **Admin route guard** (`guards/auth.guard.ts`): all `/admin/*` routes require a token; unauthenticated visitors redirect to login with return URL.
- **Auth interceptor** (`interceptors/auth.interceptor.ts`): central Bearer-token attachment for own-API calls; 401/403 clears the session and redirects to login.
- Removed default-credentials hint from the login screen.
- Server (nginx): HSTS, X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy on all responses; `www` → apex 301.

### SEO
- **SSG prerendering** (`main.server.ts`, `app.routes.server.ts`): 16 routes ship real HTML content (public routes prerendered, admin/dynamic client-rendered). Pages went from ~66 chars of indexable text to full content.
- Per-route titles, meta descriptions and canonical URLs (`SeoService`).
- Keyword-focused copy (freelance/full-stack/Pune) across hero, about, services; JSON-LD `Person` (with `alumniOf`, corrected `sameAs` → github.com/sanketjagtap1) + `WebSite`.
- RSS feed (`/rss.xml`, `/feed.xml` via backend) + `<link rel="alternate">` discovery; dev.to syndication with canonical backlinks; IndexNow key shipped in `public/`.
- Proper `/blog` listing page (was rendering Home = duplicate content); Services & Blog added to header/footer nav.

### Performance
- **Quill removed from the global bundle**: lazy `import('quill')` + non-injected `quill.css` bundle, loaded only when the admin editor renders. Initial payload **934 KB → 687 KB raw (206 → 149 KB transfer)**; removed render-blocking CDN CSS/JS from every public page.
- Google Fonts moved from SCSS `@import` to `<head>` `<link>` with preconnect (faster FCP/LCP).
- nginx: gzip + immutable caching for hashed assets, 30d for images, no-cache for HTML.

### UX / Lead generation
- Full editorial-dark redesign of the public site **and** the entire admin portal.
- Contact form stores leads in DB + emails notifications (backend `mailer.ts`); admin Leads page.
- Freelance packages (hourly/retainer) with clear pricing; client-focused copywriting site-wide.
- Résumé download CTA in hero (`/resume.pdf`).
- Branded fallback covers for imageless project cards.

### Remaining / ideas
- Google Analytics or Clarity (needs account/tag from owner).
- Calendly "book a call" embed (needs owner's Calendly).
- BreadcrumbList JSON-LD on detail pages (minor).
- Hashnode auto-publish via API + n8n (needs owner's token; RSS import is Pro-only there).
