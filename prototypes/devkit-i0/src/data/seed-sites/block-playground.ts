import type { Site } from '../site-types'

export const blockPlayground: Site = {
  name: "Block Playground",
  description: "An experimental sandbox for custom block development",

  theme: {
    name: "editorial-bold",
    fonts: ["DM Serif Display", "DM Sans"],
    variables: {
      "--color-primary": "#1c1917",
      "--color-secondary": "#57534e",
      "--color-accent": "#c2410c",
      "--color-accent-light": "rgba(194, 65, 12, 0.08)",
      "--color-background": "#fafaf9",
      "--color-background-alt": "#f5f5f4",
      "--color-surface": "#ffffff",
      "--color-border": "#e7e5e4",
      "--color-muted": "#a8a29e",
      "--font-heading": "'DM Serif Display', Georgia, serif",
      "--font-body": "'DM Sans', -apple-system, sans-serif",
      "--spacing-xs": "8px",
      "--spacing-sm": "16px",
      "--spacing-md": "24px",
      "--spacing-lg": "40px",
      "--spacing-xl": "64px",
      "--spacing-2xl": "96px",
      "--border-radius": "6px",
      "--line-height-tight": "1.15",
      "--line-height-normal": "1.6"
    },
    darkVariables: {
      "--color-primary": "#fafaf9",
      "--color-secondary": "#a8a29e",
      "--color-accent": "#fb923c",
      "--color-accent-light": "rgba(251, 146, 60, 0.12)",
      "--color-background": "#1c1917",
      "--color-background-alt": "#292524",
      "--color-surface": "#292524",
      "--color-border": "#44403c",
      "--color-muted": "#78716c",
      "--font-heading": "'DM Serif Display', Georgia, serif",
      "--font-body": "'DM Sans', -apple-system, sans-serif",
      "--spacing-xs": "8px",
      "--spacing-sm": "16px",
      "--spacing-md": "24px",
      "--spacing-lg": "40px",
      "--spacing-xl": "64px",
      "--spacing-2xl": "96px",
      "--border-radius": "6px",
      "--line-height-tight": "1.15",
      "--line-height-normal": "1.6"
    }
  },

  sections: {
    header: {
      id: "header",
      role: "navigation",
      html: `
        <header class="ed-header">
          <div class="header-inner">
            <h1 class="masthead">The Dispatch</h1>
            <nav class="nav">
              <a href="/" class="nav-link">Home</a>
              <a href="/culture" class="nav-link">Culture</a>
              <a href="/tech" class="nav-link">Tech</a>
            </nav>
          </div>
        </header>
      `,
      css: `
        [data-section="header"] .ed-header {
          background: var(--color-background);
          border-bottom: 3px solid var(--color-primary);
        }
        [data-section="header"] .header-inner {
          max-width: 1000px;
          margin: 0 auto;
          padding: var(--spacing-md) var(--spacing-md);
          display: flex;
          justify-content: space-between;
          align-items: baseline;
        }
        [data-section="header"] .masthead {
          font-family: var(--font-heading);
          font-size: 28px;
          font-weight: 400;
          color: var(--color-primary);
          margin: 0;
          letter-spacing: -0.01em;
        }
        [data-section="header"] .nav {
          display: flex;
          gap: var(--spacing-md);
        }
        [data-section="header"] .nav-link {
          font-family: var(--font-body);
          font-size: 14px;
          font-weight: 500;
          color: var(--color-secondary);
          text-decoration: none;
        }
        [data-section="header"] .nav-link:hover {
          color: var(--color-accent);
        }
      `
    },

    hero: {
      id: "hero",
      role: "banner",
      html: `
        <section class="ed-hero">
          <div class="hero-inner">
            <div class="hero-text">
              <span class="hero-cat">Featured</span>
              <h2 class="hero-title">The Quiet Revolution in Interface Typography</h2>
              <p class="hero-excerpt">How a generation of designers abandoned decorative type for something more radical: clarity. And why the pendulum is swinging back.</p>
              <div class="hero-byline">
                <span class="author">Elena Voss</span>
                <span class="date">Feb 14, 2026</span>
              </div>
            </div>
            <div class="hero-img">
              <img src="https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop&q=80" alt="" />
            </div>
          </div>
        </section>
      `,
      css: `
        [data-section="hero"] .ed-hero {
          background: var(--color-background);
          padding: var(--spacing-xl) 0;
        }
        [data-section="hero"] .hero-inner {
          max-width: 1000px;
          margin: 0 auto;
          padding: 0 var(--spacing-md);
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--spacing-lg);
          align-items: center;
        }
        [data-section="hero"] .hero-cat {
          font-family: var(--font-body);
          font-size: 12px;
          font-weight: 700;
          color: var(--color-accent);
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }
        [data-section="hero"] .hero-title {
          font-family: var(--font-heading);
          font-size: 32px;
          font-weight: 400;
          color: var(--color-primary);
          line-height: var(--line-height-tight);
          margin: var(--spacing-xs) 0 var(--spacing-sm) 0;
        }
        [data-section="hero"] .hero-excerpt {
          font-family: var(--font-body);
          font-size: 16px;
          color: var(--color-secondary);
          line-height: var(--line-height-normal);
          margin: 0 0 var(--spacing-md) 0;
        }
        [data-section="hero"] .hero-byline {
          display: flex;
          gap: var(--spacing-sm);
          font-family: var(--font-body);
          font-size: 13px;
        }
        [data-section="hero"] .author {
          font-weight: 600;
          color: var(--color-primary);
        }
        [data-section="hero"] .date {
          color: var(--color-muted);
        }
        [data-section="hero"] .hero-img img {
          width: 100%;
          height: 280px;
          object-fit: cover;
          border-radius: var(--border-radius);
        }
        @media (max-width: 768px) {
          [data-section="hero"] .hero-inner {
            grid-template-columns: 1fr;
            padding: 0 var(--spacing-sm);
          }
          [data-section="hero"] .hero-title { font-size: 26px; }
          [data-section="hero"] .hero-img img { height: 200px; }
        }
      `
    },

    posts: {
      id: "posts",
      html: `
        <section class="ed-posts">
          <div class="posts-inner">
            <h3 class="posts-heading">Latest</h3>
            <div class="posts-list">
              <article class="post-row">
                <span class="post-cat">Tech</span>
                <h4 class="post-title">Why Your Smart Home Is Dumber Than You Think</h4>
                <span class="post-date">Feb 12</span>
              </article>
              <article class="post-row">
                <span class="post-cat">Culture</span>
                <h4 class="post-title">The Last Portrait Photographer in Brooklyn</h4>
                <span class="post-date">Feb 10</span>
              </article>
              <article class="post-row">
                <span class="post-cat">Tech</span>
                <h4 class="post-title">The Chip That Taught Itself to Dream</h4>
                <span class="post-date">Feb 8</span>
              </article>
              <article class="post-row">
                <span class="post-cat">Culture</span>
                <h4 class="post-title">What Happens When a Library Burns Down</h4>
                <span class="post-date">Feb 5</span>
              </article>
            </div>
          </div>
        </section>
      `,
      css: `
        [data-section="posts"] .ed-posts {
          background: var(--color-background-alt);
          padding: var(--spacing-xl) 0;
        }
        [data-section="posts"] .posts-inner {
          max-width: 1000px;
          margin: 0 auto;
          padding: 0 var(--spacing-md);
        }
        [data-section="posts"] .posts-heading {
          font-family: var(--font-heading);
          font-size: 22px;
          font-weight: 400;
          color: var(--color-primary);
          margin: 0 0 var(--spacing-md) 0;
          padding-bottom: var(--spacing-sm);
          border-bottom: 2px solid var(--color-accent);
          display: inline-block;
        }
        [data-section="posts"] .posts-list {
          display: flex;
          flex-direction: column;
        }
        [data-section="posts"] .post-row {
          display: grid;
          grid-template-columns: 60px 1fr auto;
          gap: var(--spacing-sm);
          align-items: center;
          padding: var(--spacing-sm) 0;
          border-bottom: 1px solid var(--color-border);
        }
        [data-section="posts"] .post-row:last-child {
          border-bottom: none;
        }
        [data-section="posts"] .post-cat {
          font-family: var(--font-body);
          font-size: 11px;
          font-weight: 700;
          color: var(--color-accent);
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }
        [data-section="posts"] .post-title {
          font-family: var(--font-heading);
          font-size: 18px;
          font-weight: 400;
          color: var(--color-primary);
          margin: 0;
          line-height: 1.3;
        }
        [data-section="posts"] .post-date {
          font-family: var(--font-body);
          font-size: 13px;
          color: var(--color-muted);
          white-space: nowrap;
        }
        @media (max-width: 768px) {
          [data-section="posts"] .posts-inner { padding: 0 var(--spacing-sm); }
          [data-section="posts"] .post-row { grid-template-columns: 50px 1fr; }
          [data-section="posts"] .post-date { display: none; }
        }
      `
    },

    footer: {
      id: "footer",
      role: "contentinfo",
      html: `
        <footer class="ed-footer">
          <div class="footer-inner">
            <span class="footer-name">The Dispatch</span>
            <span class="footer-copy">&copy; 2026</span>
          </div>
        </footer>
      `,
      css: `
        [data-section="footer"] .ed-footer {
          background: var(--color-primary);
          padding: var(--spacing-md) 0;
        }
        [data-section="footer"] .footer-inner {
          max-width: 1000px;
          margin: 0 auto;
          padding: 0 var(--spacing-md);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        [data-section="footer"] .footer-name {
          font-family: var(--font-heading);
          font-size: 18px;
          color: var(--color-background);
        }
        [data-section="footer"] .footer-copy {
          font-family: var(--font-body);
          font-size: 13px;
          color: var(--color-muted);
        }
      `
    }
  },

  pages: [
    {
      slug: "",
      title: "Home",
      sections: ["header", "hero", "posts", "footer"]
    }
  ]
}
