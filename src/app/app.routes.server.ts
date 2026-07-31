import { RenderMode, ServerRoute } from '@angular/ssr';

/**
 * Render modes for static prerendering (SEO).
 *
 * Public, parameterless pages are PRERENDERED at build time — the built HTML
 * contains the real page content (fetched from the live API during the build),
 * so search engines index actual text instead of an empty app shell. The app
 * still hydrates and re-fetches on the client, so visitors always see live data.
 *
 * Param routes (project/blog details) prerender the known IDs/slugs by asking
 * the live API at build time; unknown ones fall back to client rendering.
 * Admin and token-gated pages are client-only — they're private, personalised,
 * and must never be baked into public HTML.
 */
export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Prerender },
  { path: 'home', renderMode: RenderMode.Prerender },
  { path: 'skills', renderMode: RenderMode.Prerender },
  { path: 'experience', renderMode: RenderMode.Prerender },
  { path: 'projects', renderMode: RenderMode.Prerender },
  { path: 'services', renderMode: RenderMode.Prerender },
  { path: 'contact', renderMode: RenderMode.Prerender },
  { path: 'blog', renderMode: RenderMode.Prerender },

  {
    path: 'projects/:id',
    renderMode: RenderMode.Prerender,
    fallback: undefined,
    async getPrerenderParams() {
      try {
        const res = await fetch('https://sanket-jagtap.in/api/portfolio/projects');
        const projects: Array<{ id: number }> = await res.json();
        return projects.map((p) => ({ id: String(p.id) }));
      } catch {
        return [];
      }
    },
  },
  {
    path: 'blog/:slug',
    renderMode: RenderMode.Prerender,
    fallback: undefined,
    async getPrerenderParams() {
      try {
        const res = await fetch('https://sanket-jagtap.in/api/blog?limit=100&status=published');
        const data: { blogs?: Array<{ slug: string }> } = await res.json();
        return (data.blogs || []).map((b) => ({ slug: b.slug }));
      } catch {
        return [];
      }
    },
  },

  // Private / token-gated / personalised — never prerender.
  { path: 'review', renderMode: RenderMode.Client },
  { path: 'admin/login', renderMode: RenderMode.Client },
  { path: 'admin/dashboard', renderMode: RenderMode.Client },
  { path: 'admin/skills', renderMode: RenderMode.Client },
  { path: 'admin/projects', renderMode: RenderMode.Client },
  { path: 'admin/experience', renderMode: RenderMode.Client },
  { path: 'admin/blog', renderMode: RenderMode.Client },
  { path: 'admin/services', renderMode: RenderMode.Client },
  { path: 'admin/testimonials', renderMode: RenderMode.Client },
  { path: 'admin/messages', renderMode: RenderMode.Client },

  { path: '**', renderMode: RenderMode.Client },
];
