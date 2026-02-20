import type { Site } from '@shared/data/site-types'

export const jetpackDev: Site = {
  name: "Jetpack Dev",
  description: "A SaaS product site used for testing Jetpack sync module integration",

  theme: {
    name: "saas-emerald",
    fonts: ["Inter"],
    variables: {
      "--color-primary": "#1a2e1a",
      "--color-secondary": "#3d5a3d",
      "--color-accent": "#059669",
      "--color-accent-light": "rgba(5, 150, 105, 0.1)",
      "--color-highlight": "#fbbf24",
      "--color-background": "#ffffff",
      "--color-background-alt": "#f0fdf4",
      "--color-border": "#d1e7d1",
      "--color-muted": "#6b8a6b",
      "--font-primary": "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      "--spacing-xs": "8px",
      "--spacing-sm": "16px",
      "--spacing-md": "32px",
      "--spacing-lg": "48px",
      "--spacing-xl": "64px",
      "--spacing-2xl": "96px",
      "--border-radius": "8px",
      "--border-radius-lg": "16px",
      "--line-height-tight": "1.2",
      "--line-height-normal": "1.6",
      "--shadow-sm": "0 1px 2px rgba(0, 0, 0, 0.05)",
      "--shadow-md": "0 4px 16px rgba(5, 150, 105, 0.1)",
      "--shadow-lg": "0 8px 32px rgba(5, 150, 105, 0.15)"
    },
    darkVariables: {
      "--color-primary": "#e8f5e8",
      "--color-secondary": "#a3c9a3",
      "--color-accent": "#34d399",
      "--color-accent-light": "rgba(52, 211, 153, 0.15)",
      "--color-highlight": "#fbbf24",
      "--color-background": "#0a1a0a",
      "--color-background-alt": "#122212",
      "--color-border": "#1e3a1e",
      "--color-muted": "#5a7a5a",
      "--font-primary": "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      "--spacing-xs": "8px",
      "--spacing-sm": "16px",
      "--spacing-md": "32px",
      "--spacing-lg": "48px",
      "--spacing-xl": "64px",
      "--spacing-2xl": "96px",
      "--border-radius": "8px",
      "--border-radius-lg": "16px",
      "--line-height-tight": "1.2",
      "--line-height-normal": "1.6",
      "--shadow-sm": "0 1px 2px rgba(0, 0, 0, 0.2)",
      "--shadow-md": "0 4px 16px rgba(0, 0, 0, 0.25)",
      "--shadow-lg": "0 8px 32px rgba(0, 0, 0, 0.35)"
    }
  },

  sections: {
    header: {
      id: "header",
      role: "navigation",
      html: `
        <header class="saas-header">
          <div class="header-container">
            <div class="header-left">
              <svg class="logo-icon" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 2L2 7v10l10 5 10-5V7L12 2z" stroke="currentColor" stroke-width="2" fill="rgba(5,150,105,0.15)"/><path d="M12 22V12M2 7l10 5 10-5" stroke="currentColor" stroke-width="2"/></svg>
              <span class="logo-text">Stackflow</span>
            </div>
            <nav class="main-nav">
              <a href="/" class="nav-link">Product</a>
              <a href="/pricing" class="nav-link">Pricing</a>
              <a href="/docs" class="nav-link">Docs</a>
            </nav>
            <div class="header-right">
              <a href="#" class="nav-link">Log in</a>
              <a href="#" class="cta-button">Start Free</a>
            </div>
          </div>
        </header>
      `,
      css: `
        [data-section="header"] .saas-header {
          background: var(--color-background);
          border-bottom: 1px solid var(--color-border);
          position: sticky;
          top: 0;
          z-index: 100;
        }
        [data-section="header"] .header-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 var(--spacing-md);
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 64px;
        }
        [data-section="header"] .header-left {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        [data-section="header"] .logo-icon {
          color: var(--color-accent);
        }
        [data-section="header"] .logo-text {
          font-family: var(--font-primary);
          font-size: 18px;
          font-weight: 700;
          color: var(--color-primary);
          letter-spacing: -0.03em;
        }
        [data-section="header"] .main-nav {
          display: flex;
          gap: var(--spacing-md);
        }
        [data-section="header"] .nav-link {
          font-family: var(--font-primary);
          font-size: 14px;
          font-weight: 500;
          color: var(--color-secondary);
          text-decoration: none;
          transition: color 0.15s ease;
        }
        [data-section="header"] .nav-link:hover { color: var(--color-primary); }
        [data-section="header"] .header-right {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
        }
        [data-section="header"] .cta-button {
          font-family: var(--font-primary);
          font-size: 14px;
          font-weight: 600;
          color: #fff;
          background: var(--color-accent);
          padding: 8px 20px;
          border-radius: var(--border-radius);
          text-decoration: none;
          transition: opacity 0.15s ease;
        }
        [data-section="header"] .cta-button:hover { opacity: 0.9; }
        @media (max-width: 768px) {
          [data-section="header"] .main-nav { display: none; }
          [data-section="header"] .header-container { padding: 0 var(--spacing-sm); }
        }
      `
    },

    hero: {
      id: "hero",
      role: "banner",
      html: `
        <section class="hero-section">
          <div class="hero-container">
            <div class="hero-badge">Now in public beta</div>
            <h1 class="hero-headline">Deploy workflows<br>that actually work</h1>
            <p class="hero-sub">Stackflow connects your data pipelines, APIs, and team processes into one observable platform. Ship faster, break less.</p>
            <div class="hero-actions">
              <a href="#" class="btn-primary">Get Started Free</a>
              <a href="#" class="btn-secondary">View Demo</a>
            </div>
            <div class="hero-stats">
              <div class="stat">
                <span class="stat-value">99.97%</span>
                <span class="stat-label">Uptime SLA</span>
              </div>
              <div class="stat-divider"></div>
              <div class="stat">
                <span class="stat-value">2.4M</span>
                <span class="stat-label">Workflows/day</span>
              </div>
              <div class="stat-divider"></div>
              <div class="stat">
                <span class="stat-value">340ms</span>
                <span class="stat-label">Avg response</span>
              </div>
            </div>
          </div>
        </section>
      `,
      css: `
        [data-section="hero"] .hero-section {
          background: var(--color-background);
          padding: var(--spacing-2xl) 0 var(--spacing-xl) 0;
          text-align: center;
        }
        [data-section="hero"] .hero-container {
          max-width: 800px;
          margin: 0 auto;
          padding: 0 var(--spacing-md);
        }
        [data-section="hero"] .hero-badge {
          display: inline-block;
          font-family: var(--font-primary);
          font-size: 13px;
          font-weight: 600;
          color: var(--color-accent);
          background: var(--color-accent-light);
          padding: 6px 16px;
          border-radius: 100px;
          margin-bottom: var(--spacing-md);
          letter-spacing: 0.02em;
        }
        [data-section="hero"] .hero-headline {
          font-family: var(--font-primary);
          font-size: clamp(40px, 6vw, 64px);
          font-weight: 800;
          color: var(--color-primary);
          line-height: var(--line-height-tight);
          margin: 0 0 var(--spacing-sm) 0;
          letter-spacing: -0.04em;
        }
        [data-section="hero"] .hero-sub {
          font-family: var(--font-primary);
          font-size: 20px;
          color: var(--color-secondary);
          line-height: var(--line-height-normal);
          margin: 0 auto var(--spacing-lg);
          max-width: 560px;
        }
        [data-section="hero"] .hero-actions {
          display: flex;
          gap: var(--spacing-sm);
          justify-content: center;
          margin-bottom: var(--spacing-xl);
        }
        [data-section="hero"] .btn-primary {
          font-family: var(--font-primary);
          font-size: 16px;
          font-weight: 600;
          color: #fff;
          background: var(--color-accent);
          padding: 14px 28px;
          border-radius: var(--border-radius);
          text-decoration: none;
          transition: opacity 0.15s ease;
        }
        [data-section="hero"] .btn-primary:hover { opacity: 0.9; }
        [data-section="hero"] .btn-secondary {
          font-family: var(--font-primary);
          font-size: 16px;
          font-weight: 600;
          color: var(--color-primary);
          background: var(--color-background);
          border: 1px solid var(--color-border);
          padding: 14px 28px;
          border-radius: var(--border-radius);
          text-decoration: none;
          transition: border-color 0.15s ease;
        }
        [data-section="hero"] .btn-secondary:hover { border-color: var(--color-accent); }
        [data-section="hero"] .hero-stats {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: var(--spacing-lg);
          padding: var(--spacing-md);
          background: var(--color-background-alt);
          border-radius: var(--border-radius-lg);
          border: 1px solid var(--color-border);
        }
        [data-section="hero"] .stat { text-align: center; }
        [data-section="hero"] .stat-value {
          display: block;
          font-family: var(--font-primary);
          font-size: 28px;
          font-weight: 800;
          color: var(--color-primary);
          letter-spacing: -0.03em;
        }
        [data-section="hero"] .stat-label {
          font-family: var(--font-primary);
          font-size: 13px;
          color: var(--color-muted);
          font-weight: 500;
        }
        [data-section="hero"] .stat-divider {
          width: 1px;
          height: 40px;
          background: var(--color-border);
        }
        @media (max-width: 768px) {
          [data-section="hero"] .hero-container { padding: 0 var(--spacing-sm); }
          [data-section="hero"] .hero-section { padding: var(--spacing-xl) 0 var(--spacing-lg) 0; }
          [data-section="hero"] .hero-actions { flex-direction: column; align-items: center; }
          [data-section="hero"] .hero-stats { flex-direction: column; gap: var(--spacing-sm); }
          [data-section="hero"] .stat-divider { width: 40px; height: 1px; }
        }
      `
    },

    features: {
      id: "features",
      html: `
        <section class="features-section">
          <div class="features-container">
            <div class="features-header">
              <h2 class="features-title">Everything you need to ship</h2>
              <p class="features-sub">Built for teams that move fast without breaking things.</p>
            </div>
            <div class="features-grid">
              <div class="feature-card">
                <div class="feature-icon-wrap"><span class="feature-icon">&#9881;</span></div>
                <h3 class="feature-name">Pipeline Builder</h3>
                <p class="feature-desc">Visual workflow editor with 200+ integrations. Drag, connect, deploy in minutes.</p>
              </div>
              <div class="feature-card">
                <div class="feature-icon-wrap"><span class="feature-icon">&#9729;</span></div>
                <h3 class="feature-name">Edge Runtime</h3>
                <p class="feature-desc">Execute workflows at the edge for sub-100ms response times globally.</p>
              </div>
              <div class="feature-card">
                <div class="feature-icon-wrap"><span class="feature-icon">&#9889;</span></div>
                <h3 class="feature-name">Real-Time Observability</h3>
                <p class="feature-desc">Traces, logs, and metrics in one view. Know exactly what happened and why.</p>
              </div>
            </div>
          </div>
        </section>
      `,
      css: `
        [data-section="features"] .features-section {
          background: var(--color-background-alt);
          padding: var(--spacing-2xl) 0;
        }
        [data-section="features"] .features-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 var(--spacing-md);
        }
        [data-section="features"] .features-header {
          text-align: center;
          margin-bottom: var(--spacing-xl);
        }
        [data-section="features"] .features-title {
          font-family: var(--font-primary);
          font-size: 36px;
          font-weight: 800;
          color: var(--color-primary);
          margin: 0 0 var(--spacing-xs) 0;
          letter-spacing: -0.03em;
        }
        [data-section="features"] .features-sub {
          font-family: var(--font-primary);
          font-size: 18px;
          color: var(--color-secondary);
          margin: 0;
        }
        [data-section="features"] .features-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--spacing-md);
        }
        [data-section="features"] .feature-card {
          background: var(--color-background);
          border: 1px solid var(--color-border);
          border-radius: var(--border-radius-lg);
          padding: var(--spacing-md);
          transition: box-shadow 0.2s ease, transform 0.2s ease;
        }
        [data-section="features"] .feature-card:hover {
          box-shadow: var(--shadow-md);
          transform: translateY(-2px);
        }
        [data-section="features"] .feature-icon-wrap {
          width: 48px;
          height: 48px;
          background: var(--color-accent-light);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: var(--spacing-sm);
        }
        [data-section="features"] .feature-icon { font-size: 22px; }
        [data-section="features"] .feature-name {
          font-family: var(--font-primary);
          font-size: 18px;
          font-weight: 700;
          color: var(--color-primary);
          margin: 0 0 var(--spacing-xs) 0;
          letter-spacing: -0.01em;
        }
        [data-section="features"] .feature-desc {
          font-family: var(--font-primary);
          font-size: 15px;
          color: var(--color-secondary);
          line-height: var(--line-height-normal);
          margin: 0;
        }
        @media (max-width: 768px) {
          [data-section="features"] .features-container { padding: 0 var(--spacing-sm); }
          [data-section="features"] .features-grid { grid-template-columns: 1fr; }
        }
      `
    },

    footer: {
      id: "footer",
      role: "contentinfo",
      html: `
        <footer class="saas-footer">
          <div class="footer-container">
            <div class="footer-content">
              <div class="footer-brand">
                <span class="footer-logo-text">Stackflow</span>
                <p class="footer-tagline">Workflow automation for modern teams.</p>
              </div>
              <div class="footer-links">
                <a href="#" class="footer-link">Docs</a>
                <a href="#" class="footer-link">Pricing</a>
                <a href="#" class="footer-link">Blog</a>
                <a href="#" class="footer-link">Status</a>
              </div>
            </div>
            <div class="footer-bottom">
              <span class="copyright">&copy; 2026 Stackflow, Inc.</span>
            </div>
          </div>
        </footer>
      `,
      css: `
        [data-section="footer"] .saas-footer {
          background: var(--color-background-alt);
          border-top: 1px solid var(--color-border);
          padding: var(--spacing-lg) 0 var(--spacing-md) 0;
        }
        [data-section="footer"] .footer-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 var(--spacing-md);
        }
        [data-section="footer"] .footer-content {
          display: flex;
          justify-content: space-between;
          align-items: start;
          margin-bottom: var(--spacing-md);
        }
        [data-section="footer"] .footer-brand {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        [data-section="footer"] .footer-logo-text {
          font-family: var(--font-primary);
          font-size: 18px;
          font-weight: 700;
          color: var(--color-primary);
          letter-spacing: -0.03em;
        }
        [data-section="footer"] .footer-tagline {
          font-family: var(--font-primary);
          font-size: 14px;
          color: var(--color-muted);
          margin: 0;
        }
        [data-section="footer"] .footer-links {
          display: flex;
          gap: var(--spacing-md);
        }
        [data-section="footer"] .footer-link {
          font-family: var(--font-primary);
          font-size: 14px;
          color: var(--color-secondary);
          text-decoration: none;
          transition: color 0.15s ease;
        }
        [data-section="footer"] .footer-link:hover { color: var(--color-accent); }
        [data-section="footer"] .footer-bottom {
          padding-top: var(--spacing-sm);
          border-top: 1px solid var(--color-border);
        }
        [data-section="footer"] .copyright {
          font-family: var(--font-primary);
          font-size: 13px;
          color: var(--color-muted);
        }
        @media (max-width: 768px) {
          [data-section="footer"] .footer-container { padding: 0 var(--spacing-sm); }
          [data-section="footer"] .footer-content { flex-direction: column; gap: var(--spacing-sm); }
        }
      `
    }
  },

  pages: [
    {
      slug: "",
      title: "Home",
      sections: ["header", "hero", "features", "footer"]
    }
  ]
}
