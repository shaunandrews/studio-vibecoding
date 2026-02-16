import type { Site } from '../site-types'

export const portfolio: Site = {
  name: "Studio Meridian",
  description: "A design studio crafting digital experiences with precision, clarity, and human connection",
  
  theme: {
    name: "swiss-minimal",
    fonts: ["Inter"],
    variables: {
      "--color-primary": "#0f172a",        // near-black
      "--color-secondary": "#475569",      // slate gray
      "--color-accent": "#0ea5e9",         // electric blue
      "--color-background": "#ffffff",     // white
      "--color-background-alt": "#f8fafc", // off-white
      "--color-border": "#e2e8f0",         // light border
      "--color-muted": "#64748b",          // muted text
      "--font-primary": "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      "--spacing-unit": "8px",
      "--spacing-xs": "8px",
      "--spacing-sm": "16px",
      "--spacing-md": "32px",
      "--spacing-lg": "48px",
      "--spacing-xl": "64px",
      "--spacing-2xl": "96px",
      "--spacing-3xl": "128px",
      "--border-radius": "2px",
      "--line-height-tight": "1.1",
      "--line-height-normal": "1.5",
      "--line-height-relaxed": "1.7",
      "--shadow-subtle": "0 1px 3px rgba(15, 23, 42, 0.08)",
      "--shadow-medium": "0 4px 12px rgba(15, 23, 42, 0.12)"
    }
  },

  sections: {
    header: {
      id: "header",
      role: "navigation",
      html: `
        <header class="portfolio-header">
          <div class="header-container">
            <div class="logo">
              <h1 class="site-title">Studio Meridian</h1>
            </div>
            <nav class="main-nav">
              <ul class="nav-list">
                <li><a href="/" class="nav-link" data-active="home">Home</a></li>
                <li><a href="/work" class="nav-link" data-active="work">Work</a></li>
                <li><a href="/about" class="nav-link" data-active="about">About</a></li>
              </ul>
            </nav>
          </div>
        </header>
      `,
      css: `
        [data-section="header"] .portfolio-header {
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
          height: 80px;
        }
        
        [data-section="header"] .site-title {
          font-family: var(--font-primary);
          font-size: 20px;
          font-weight: 600;
          color: var(--color-primary);
          margin: 0;
          letter-spacing: -0.02em;
        }
        
        [data-section="header"] .nav-list {
          display: flex;
          list-style: none;
          margin: 0;
          padding: 0;
          gap: var(--spacing-lg);
        }
        
        [data-section="header"] .nav-link {
          font-family: var(--font-primary);
          font-size: 15px;
          font-weight: 400;
          color: var(--color-muted);
          text-decoration: none;
          transition: color 0.2s ease;
          position: relative;
        }
        
        [data-section="header"] .nav-link:hover {
          color: var(--color-primary);
        }
        
        [data-section="header"] .nav-link[data-active="home"]:hover::after,
        [data-section="header"] .nav-link[data-active="work"]:hover::after,
        [data-section="header"] .nav-link[data-active="about"]:hover::after {
          content: '';
          position: absolute;
          bottom: -8px;
          left: 0;
          right: 0;
          height: 2px;
          background: var(--color-accent);
        }
        
        @media (max-width: 768px) {
          [data-section="header"] .header-container {
            padding: 0 var(--spacing-sm);
            height: 64px;
          }
          
          [data-section="header"] .site-title {
            font-size: 18px;
          }
          
          [data-section="header"] .nav-list {
            gap: var(--spacing-md);
          }
          
          [data-section="header"] .nav-link {
            font-size: 14px;
          }
        }
      `
    },

    hero: {
      id: "hero",
      role: "banner",
      html: `
        <section class="hero-section">
          <div class="hero-container">
            <div class="hero-content">
              <h2 class="hero-headline">We design digital experiences</h2>
              <div class="hero-accent-line"></div>
              <p class="hero-description">
                Thoughtful interfaces that connect brands with their audiences. 
                Every pixel serves a purpose.
              </p>
            </div>
          </div>
        </section>
      `,
      css: `
        [data-section="hero"] .hero-section {
          background: var(--color-background);
          padding: var(--spacing-3xl) 0 var(--spacing-2xl) 0;
          min-height: 60vh;
          display: flex;
          align-items: center;
        }
        
        [data-section="hero"] .hero-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 var(--spacing-md);
        }
        
        [data-section="hero"] .hero-content {
          max-width: 800px;
        }
        
        [data-section="hero"] .hero-headline {
          font-family: var(--font-primary);
          font-size: clamp(48px, 8vw, 96px);
          font-weight: 700;
          color: var(--color-primary);
          line-height: var(--line-height-tight);
          margin: 0 0 var(--spacing-md) 0;
          letter-spacing: -0.04em;
        }
        
        [data-section="hero"] .hero-accent-line {
          width: 120px;
          height: 4px;
          background: var(--color-accent);
          margin: 0 0 var(--spacing-lg) 0;
        }
        
        [data-section="hero"] .hero-description {
          font-family: var(--font-primary);
          font-size: 24px;
          font-weight: 400;
          color: var(--color-secondary);
          line-height: var(--line-height-relaxed);
          margin: 0;
          max-width: 600px;
        }
        
        @media (max-width: 768px) {
          [data-section="hero"] .hero-section {
            padding: var(--spacing-2xl) 0 var(--spacing-xl) 0;
            min-height: 50vh;
          }
          
          [data-section="hero"] .hero-container {
            padding: 0 var(--spacing-sm);
          }
          
          [data-section="hero"] .hero-headline {
            font-size: clamp(36px, 12vw, 64px);
          }
          
          [data-section="hero"] .hero-description {
            font-size: 20px;
          }
          
          [data-section="hero"] .hero-accent-line {
            width: 80px;
            height: 3px;
            margin-bottom: var(--spacing-md);
          }
        }
      `
    },

    "work-preview": {
      id: "work-preview",
      html: `
        <section class="work-preview-section">
          <div class="work-preview-container">
            <div class="section-header">
              <h2 class="section-title">Selected Work</h2>
            </div>
            
            <div class="work-grid">
              <article class="work-card">
                <div class="work-image">
                  <img src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop&q=80" alt="Meridian Bank mobile app interface" />
                </div>
                <div class="work-content">
                  <h3 class="work-title">Meridian Bank</h3>
                  <p class="work-description">Mobile banking reimagined for the digital-first generation</p>
                  <div class="work-meta">
                    <span class="work-type">Product Design</span>
                  </div>
                </div>
              </article>
              
              <article class="work-card">
                <div class="work-image">
                  <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop&q=80" alt="Clarity Analytics dashboard interface" />
                </div>
                <div class="work-content">
                  <h3 class="work-title">Clarity Analytics</h3>
                  <p class="work-description">Data visualization platform that makes complex metrics accessible</p>
                  <div class="work-meta">
                    <span class="work-type">Dashboard Design</span>
                  </div>
                </div>
              </article>
              
              <article class="work-card">
                <div class="work-image">
                  <img src="https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?w=600&h=400&fit=crop&q=80" alt="Northpoint Coffee website design" />
                </div>
                <div class="work-content">
                  <h3 class="work-title">Northpoint Coffee</h3>
                  <p class="work-description">E-commerce experience that captures the artisan coffee culture</p>
                  <div class="work-meta">
                    <span class="work-type">Web Design</span>
                  </div>
                </div>
              </article>
              
              <article class="work-card">
                <div class="work-image">
                  <img src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop&q=80" alt="Pulse fitness app interface" />
                </div>
                <div class="work-content">
                  <h3 class="work-title">Pulse Fitness</h3>
                  <p class="work-description">Personal training app that adapts to user progress and preferences</p>
                  <div class="work-meta">
                    <span class="work-type">App Design</span>
                  </div>
                </div>
              </article>
            </div>
            
            <div class="work-cta">
              <a href="/work" class="work-link">View All Work</a>
            </div>
          </div>
        </section>
      `,
      css: `
        [data-section="work-preview"] .work-preview-section {
          background: var(--color-background-alt);
          padding: var(--spacing-2xl) 0;
        }
        
        [data-section="work-preview"] .work-preview-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 var(--spacing-md);
        }
        
        [data-section="work-preview"] .section-header {
          margin-bottom: var(--spacing-xl);
        }
        
        [data-section="work-preview"] .section-title {
          font-family: var(--font-primary);
          font-size: 32px;
          font-weight: 600;
          color: var(--color-primary);
          margin: 0;
          letter-spacing: -0.02em;
        }
        
        [data-section="work-preview"] .work-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: var(--spacing-lg);
          margin-bottom: var(--spacing-xl);
        }
        
        [data-section="work-preview"] .work-card {
          background: var(--color-background);
          border-radius: var(--border-radius);
          overflow: hidden;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          border: 1px solid var(--color-border);
        }
        
        [data-section="work-preview"] .work-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-medium);
        }
        
        [data-section="work-preview"] .work-image {
          aspect-ratio: 3/2;
          overflow: hidden;
        }
        
        [data-section="work-preview"] .work-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.2s ease;
        }
        
        [data-section="work-preview"] .work-card:hover .work-image img {
          transform: scale(1.02);
        }
        
        [data-section="work-preview"] .work-content {
          padding: var(--spacing-md);
        }
        
        [data-section="work-preview"] .work-title {
          font-family: var(--font-primary);
          font-size: 20px;
          font-weight: 600;
          color: var(--color-primary);
          margin: 0 0 var(--spacing-xs) 0;
          letter-spacing: -0.01em;
        }
        
        [data-section="work-preview"] .work-description {
          font-family: var(--font-primary);
          font-size: 15px;
          color: var(--color-secondary);
          line-height: var(--line-height-normal);
          margin: 0 0 var(--spacing-sm) 0;
        }
        
        [data-section="work-preview"] .work-meta {
          display: flex;
          gap: var(--spacing-sm);
        }
        
        [data-section="work-preview"] .work-type {
          font-family: var(--font-primary);
          font-size: 12px;
          font-weight: 500;
          color: var(--color-accent);
          background: rgba(14, 165, 233, 0.1);
          padding: 4px 8px;
          border-radius: 12px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        
        [data-section="work-preview"] .work-cta {
          text-align: center;
        }
        
        [data-section="work-preview"] .work-link {
          display: inline-flex;
          align-items: center;
          font-family: var(--font-primary);
          font-size: 16px;
          font-weight: 500;
          color: var(--color-background);
          background: var(--color-primary);
          padding: var(--spacing-sm) var(--spacing-md);
          text-decoration: none;
          border-radius: var(--border-radius);
          transition: background 0.2s ease;
        }
        
        [data-section="work-preview"] .work-link:hover {
          background: var(--color-accent);
        }
        
        @media (max-width: 768px) {
          [data-section="work-preview"] .work-preview-container {
            padding: 0 var(--spacing-sm);
          }
          
          [data-section="work-preview"] .work-grid {
            grid-template-columns: 1fr;
            gap: var(--spacing-md);
          }
          
          [data-section="work-preview"] .section-title {
            font-size: 28px;
          }
          
          [data-section="work-preview"] .work-content {
            padding: var(--spacing-sm);
          }
        }
      `
    },

    footer: {
      id: "footer",
      role: "contentinfo",
      html: `
        <footer class="portfolio-footer">
          <div class="footer-container">
            <div class="footer-content">
              <div class="footer-brand">
                <h3 class="footer-title">Studio Meridian</h3>
                <p class="footer-tagline">Crafting digital experiences with precision and purpose</p>
              </div>
              
              <div class="footer-contact">
                <div class="contact-item">
                  <a href="mailto:hello@studiomeridian.com" class="contact-link">hello@studiomeridian.com</a>
                </div>
                <div class="contact-item">
                  <a href="https://twitter.com/studiomeridian" class="contact-link" target="_blank" rel="noopener">Twitter</a>
                </div>
                <div class="contact-item">
                  <a href="https://dribbble.com/studiomeridian" class="contact-link" target="_blank" rel="noopener">Dribbble</a>
                </div>
                <div class="contact-item">
                  <a href="https://linkedin.com/company/studiomeridian" class="contact-link" target="_blank" rel="noopener">LinkedIn</a>
                </div>
              </div>
            </div>
            
            <div class="footer-bottom">
              <p class="copyright">&copy; 2026 Studio Meridian. All rights reserved.</p>
            </div>
          </div>
        </footer>
      `,
      css: `
        [data-section="footer"] .portfolio-footer {
          background: var(--color-background);
          border-top: 1px solid var(--color-border);
          padding: var(--spacing-xl) 0 var(--spacing-lg) 0;
        }
        
        [data-section="footer"] .footer-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 var(--spacing-md);
        }
        
        [data-section="footer"] .footer-content {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: var(--spacing-xl);
          align-items: start;
          margin-bottom: var(--spacing-lg);
        }
        
        [data-section="footer"] .footer-title {
          font-family: var(--font-primary);
          font-size: 20px;
          font-weight: 600;
          color: var(--color-primary);
          margin: 0 0 var(--spacing-xs) 0;
          letter-spacing: -0.02em;
        }
        
        [data-section="footer"] .footer-tagline {
          font-family: var(--font-primary);
          font-size: 15px;
          color: var(--color-secondary);
          line-height: var(--line-height-normal);
          margin: 0;
          max-width: 300px;
        }
        
        [data-section="footer"] .footer-contact {
          display: flex;
          gap: var(--spacing-lg);
          align-items: center;
        }
        
        [data-section="footer"] .contact-link {
          font-family: var(--font-primary);
          font-size: 15px;
          font-weight: 400;
          color: var(--color-muted);
          text-decoration: none;
          transition: color 0.2s ease;
        }
        
        [data-section="footer"] .contact-link:hover {
          color: var(--color-accent);
        }
        
        [data-section="footer"] .footer-bottom {
          padding-top: var(--spacing-md);
          border-top: 1px solid var(--color-border);
        }
        
        [data-section="footer"] .copyright {
          font-family: var(--font-primary);
          font-size: 13px;
          color: var(--color-muted);
          margin: 0;
          text-align: center;
        }
        
        @media (max-width: 768px) {
          [data-section="footer"] .footer-container {
            padding: 0 var(--spacing-sm);
          }
          
          [data-section="footer"] .footer-content {
            grid-template-columns: 1fr;
            gap: var(--spacing-md);
            text-align: center;
          }
          
          [data-section="footer"] .footer-contact {
            justify-content: center;
            flex-wrap: wrap;
            gap: var(--spacing-md);
          }
          
          [data-section="footer"] .footer-tagline {
            max-width: none;
          }
        }
      `
    },

    "work-grid": {
      id: "work-grid",
      html: `
        <section class="work-grid-section">
          <div class="work-grid-container">
            <header class="page-header">
              <h1 class="page-title">Our Work</h1>
              <p class="page-description">Selected projects that showcase our approach to design and problem-solving</p>
            </header>
            
            <div class="projects-grid">
              <article class="project-card featured">
                <div class="project-image">
                  <img src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=500&fit=crop&q=80" alt="Meridian Bank mobile app interface" />
                </div>
                <div class="project-content">
                  <div class="project-meta">
                    <span class="project-type">Product Design</span>
                    <span class="project-year">2025</span>
                  </div>
                  <h2 class="project-title">Meridian Bank</h2>
                  <p class="project-description">Complete redesign of mobile banking experience, focusing on security, accessibility, and user-friendly financial management tools.</p>
                </div>
              </article>
              
              <article class="project-card">
                <div class="project-image">
                  <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop&q=80" alt="Clarity Analytics dashboard" />
                </div>
                <div class="project-content">
                  <div class="project-meta">
                    <span class="project-type">Dashboard Design</span>
                    <span class="project-year">2024</span>
                  </div>
                  <h3 class="project-title">Clarity Analytics</h3>
                  <p class="project-description">Data visualization platform that transforms complex business metrics into actionable insights.</p>
                </div>
              </article>
              
              <article class="project-card">
                <div class="project-image">
                  <img src="https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?w=600&h=400&fit=crop&q=80" alt="Northpoint Coffee e-commerce site" />
                </div>
                <div class="project-content">
                  <div class="project-meta">
                    <span class="project-type">Web Design</span>
                    <span class="project-year">2024</span>
                  </div>
                  <h3 class="project-title">Northpoint Coffee</h3>
                  <p class="project-description">E-commerce platform that captures the artisan coffee culture while optimizing for conversion.</p>
                </div>
              </article>
              
              <article class="project-card">
                <div class="project-image">
                  <img src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop&q=80" alt="Pulse fitness app interface" />
                </div>
                <div class="project-content">
                  <div class="project-meta">
                    <span class="project-type">App Design</span>
                    <span class="project-year">2024</span>
                  </div>
                  <h3 class="project-title">Pulse Fitness</h3>
                  <p class="project-description">Personal training app with adaptive workouts and progress tracking for fitness enthusiasts.</p>
                </div>
              </article>
              
              <article class="project-card">
                <div class="project-image">
                  <img src="https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&h=400&fit=crop&q=80" alt="Urban planning software interface" />
                </div>
                <div class="project-content">
                  <div class="project-meta">
                    <span class="project-type">Enterprise Software</span>
                    <span class="project-year">2023</span>
                  </div>
                  <h3 class="project-title">CityPlan Pro</h3>
                  <p class="project-description">Urban planning software that helps city planners visualize and manage development projects.</p>
                </div>
              </article>
              
              <article class="project-card">
                <div class="project-image">
                  <img src="https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=600&h=400&fit=crop&q=80" alt="Healthcare patient portal interface" />
                </div>
                <div class="project-content">
                  <div class="project-meta">
                    <span class="project-type">Healthcare Design</span>
                    <span class="project-year">2023</span>
                  </div>
                  <h3 class="project-title">HealthConnect Portal</h3>
                  <p class="project-description">Patient portal redesign focused on accessibility and clear communication of medical information.</p>
                </div>
              </article>
              
              <article class="project-card">
                <div class="project-image">
                  <img src="https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=600&h=400&fit=crop&q=80" alt="EdTech learning platform interface" />
                </div>
                <div class="project-content">
                  <div class="project-meta">
                    <span class="project-type">EdTech</span>
                    <span class="project-year">2023</span>
                  </div>
                  <h3 class="project-title">LearnFlow Academy</h3>
                  <p class="project-description">Online learning platform designed for seamless course discovery and engaging student experiences.</p>
                </div>
              </article>
              
              <article class="project-card">
                <div class="project-image">
                  <img src="https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=600&h=400&fit=crop&q=80" alt="Real estate platform interface" />
                </div>
                <div class="project-content">
                  <div class="project-meta">
                    <span class="project-type">PropTech</span>
                    <span class="project-year">2022</span>
                  </div>
                  <h3 class="project-title">Meridian Properties</h3>
                  <p class="project-description">Real estate platform with advanced search, virtual tours, and streamlined buying processes.</p>
                </div>
              </article>
            </div>
          </div>
        </section>
      `,
      css: `
        [data-section="work-grid"] .work-grid-section {
          background: var(--color-background);
          padding: var(--spacing-2xl) 0;
        }
        
        [data-section="work-grid"] .work-grid-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 var(--spacing-md);
        }
        
        [data-section="work-grid"] .page-header {
          margin-bottom: var(--spacing-2xl);
        }
        
        [data-section="work-grid"] .page-title {
          font-family: var(--font-primary);
          font-size: 48px;
          font-weight: 700;
          color: var(--color-primary);
          line-height: var(--line-height-tight);
          margin: 0 0 var(--spacing-sm) 0;
          letter-spacing: -0.03em;
        }
        
        [data-section="work-grid"] .page-description {
          font-family: var(--font-primary);
          font-size: 20px;
          color: var(--color-secondary);
          line-height: var(--line-height-normal);
          margin: 0;
          max-width: 600px;
        }
        
        [data-section="work-grid"] .projects-grid {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          gap: var(--spacing-lg);
        }
        
        [data-section="work-grid"] .project-card {
          background: var(--color-background);
          border: 1px solid var(--color-border);
          border-radius: var(--border-radius);
          overflow: hidden;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        
        [data-section="work-grid"] .project-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-medium);
        }
        
        [data-section="work-grid"] .project-card.featured {
          grid-column: span 12;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0;
        }
        
        [data-section="work-grid"] .project-card:not(.featured) {
          grid-column: span 6;
        }
        
        [data-section="work-grid"] .project-image {
          aspect-ratio: 4/3;
          overflow: hidden;
        }
        
        [data-section="work-grid"] .featured .project-image {
          aspect-ratio: auto;
        }
        
        [data-section="work-grid"] .project-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.2s ease;
        }
        
        [data-section="work-grid"] .project-card:hover .project-image img {
          transform: scale(1.02);
        }
        
        [data-section="work-grid"] .project-content {
          padding: var(--spacing-md);
        }
        
        [data-section="work-grid"] .featured .project-content {
          padding: var(--spacing-lg);
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        
        [data-section="work-grid"] .project-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--spacing-sm);
        }
        
        [data-section="work-grid"] .project-type {
          font-family: var(--font-primary);
          font-size: 12px;
          font-weight: 500;
          color: var(--color-accent);
          background: rgba(14, 165, 233, 0.1);
          padding: 4px 8px;
          border-radius: 12px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        
        [data-section="work-grid"] .project-year {
          font-family: var(--font-primary);
          font-size: 12px;
          font-weight: 500;
          color: var(--color-muted);
        }
        
        [data-section="work-grid"] .project-title {
          font-family: var(--font-primary);
          font-weight: 600;
          color: var(--color-primary);
          margin: 0 0 var(--spacing-sm) 0;
          letter-spacing: -0.01em;
        }
        
        [data-section="work-grid"] .featured .project-title {
          font-size: 32px;
        }
        
        [data-section="work-grid"] .project-card:not(.featured) .project-title {
          font-size: 20px;
        }
        
        [data-section="work-grid"] .project-description {
          font-family: var(--font-primary);
          color: var(--color-secondary);
          line-height: var(--line-height-normal);
          margin: 0;
        }
        
        [data-section="work-grid"] .featured .project-description {
          font-size: 16px;
        }
        
        [data-section="work-grid"] .project-card:not(.featured) .project-description {
          font-size: 15px;
        }
        
        @media (max-width: 768px) {
          [data-section="work-grid"] .work-grid-container {
            padding: 0 var(--spacing-sm);
          }
          
          [data-section="work-grid"] .page-title {
            font-size: 36px;
          }
          
          [data-section="work-grid"] .page-description {
            font-size: 18px;
          }
          
          [data-section="work-grid"] .projects-grid {
            gap: var(--spacing-md);
          }
          
          [data-section="work-grid"] .project-card.featured {
            grid-column: span 12;
            grid-template-columns: 1fr;
          }
          
          [data-section="work-grid"] .project-card:not(.featured) {
            grid-column: span 12;
          }
          
          [data-section="work-grid"] .project-content {
            padding: var(--spacing-sm);
          }
          
          [data-section="work-grid"] .featured .project-content {
            padding: var(--spacing-md);
          }
          
          [data-section="work-grid"] .featured .project-title {
            font-size: 24px;
          }
        }
      `
    },

    "about-content": {
      id: "about-content",
      html: `
        <section class="about-content-section">
          <div class="about-container">
            <div class="about-layout">
              <div class="about-text">
                <h1 class="about-title">We believe design shapes behavior</h1>
                
                <div class="about-body">
                  <p class="about-paragraph">
                    Studio Meridian was founded in 2019 by Alex Chen and Jordan Rivera, two designers who shared a conviction that exceptional digital experiences require both strategic thinking and meticulous craft.
                  </p>
                  
                  <p class="about-paragraph">
                    Our approach centers on understanding the human context behind every interface. We don't just design screens—we design systems that adapt to real user needs, business constraints, and technological possibilities.
                  </p>
                  
                  <p class="about-paragraph">
                    Working with startups and established companies alike, we've learned that the best solutions emerge from close collaboration. We embed ourselves in our clients' worlds, learning their industry's nuances and their users' unspoken needs.
                  </p>
                  
                  <p class="about-paragraph">
                    Every project begins with questions: Who is this for? What problem are we solving? How will we know if it works? These questions guide us toward solutions that aren't just beautiful—they're effective.
                  </p>
                </div>
                
                <div class="team-profiles">
                  <div class="profile">
                    <h3 class="profile-name">Alex Chen</h3>
                    <p class="profile-role">Co-founder, Design Director</p>
                    <p class="profile-bio">Previously led product design at Stripe. Focuses on systems thinking and user research methodologies.</p>
                  </div>
                  
                  <div class="profile">
                    <h3 class="profile-name">Jordan Rivera</h3>
                    <p class="profile-role">Co-founder, Creative Director</p>
                    <p class="profile-bio">Former visual design lead at Airbnb. Specializes in brand identity and interaction design.</p>
                  </div>
                </div>
              </div>
              
              <div class="about-image">
                <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=800&fit=crop&q=80" alt="Studio Meridian team collaborating in their bright, minimalist office space" />
                <p class="image-caption">Our Oakland studio, where ideas take shape through conversation and iteration.</p>
              </div>
            </div>
          </div>
        </section>
      `,
      css: `
        [data-section="about-content"] .about-content-section {
          background: var(--color-background);
          padding: var(--spacing-2xl) 0;
        }
        
        [data-section="about-content"] .about-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 var(--spacing-md);
        }
        
        [data-section="about-content"] .about-layout {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: var(--spacing-2xl);
          align-items: start;
        }
        
        [data-section="about-content"] .about-title {
          font-family: var(--font-primary);
          font-size: 48px;
          font-weight: 700;
          color: var(--color-primary);
          line-height: var(--line-height-tight);
          margin: 0 0 var(--spacing-xl) 0;
          letter-spacing: -0.03em;
          max-width: 500px;
        }
        
        [data-section="about-content"] .about-body {
          margin-bottom: var(--spacing-xl);
        }
        
        [data-section="about-content"] .about-paragraph {
          font-family: var(--font-primary);
          font-size: 18px;
          color: var(--color-secondary);
          line-height: var(--line-height-relaxed);
          margin: 0 0 var(--spacing-md) 0;
        }
        
        [data-section="about-content"] .about-paragraph:last-child {
          margin-bottom: 0;
        }
        
        [data-section="about-content"] .team-profiles {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--spacing-lg);
        }
        
        [data-section="about-content"] .profile {
          padding: var(--spacing-md);
          background: var(--color-background-alt);
          border: 1px solid var(--color-border);
          border-radius: var(--border-radius);
        }
        
        [data-section="about-content"] .profile-name {
          font-family: var(--font-primary);
          font-size: 20px;
          font-weight: 600;
          color: var(--color-primary);
          margin: 0 0 4px 0;
          letter-spacing: -0.01em;
        }
        
        [data-section="about-content"] .profile-role {
          font-family: var(--font-primary);
          font-size: 14px;
          font-weight: 500;
          color: var(--color-accent);
          margin: 0 0 var(--spacing-sm) 0;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        
        [data-section="about-content"] .profile-bio {
          font-family: var(--font-primary);
          font-size: 15px;
          color: var(--color-secondary);
          line-height: var(--line-height-normal);
          margin: 0;
        }
        
        [data-section="about-content"] .about-image img {
          width: 100%;
          height: 500px;
          object-fit: cover;
          border-radius: var(--border-radius);
          box-shadow: var(--shadow-subtle);
          margin-bottom: var(--spacing-sm);
        }
        
        [data-section="about-content"] .image-caption {
          font-family: var(--font-primary);
          font-size: 14px;
          color: var(--color-muted);
          line-height: var(--line-height-normal);
          margin: 0;
        }
        
        @media (max-width: 768px) {
          [data-section="about-content"] .about-container {
            padding: 0 var(--spacing-sm);
          }
          
          [data-section="about-content"] .about-layout {
            grid-template-columns: 1fr;
            gap: var(--spacing-xl);
          }
          
          [data-section="about-content"] .about-title {
            font-size: 36px;
          }
          
          [data-section="about-content"] .about-paragraph {
            font-size: 16px;
          }
          
          [data-section="about-content"] .team-profiles {
            grid-template-columns: 1fr;
            gap: var(--spacing-md);
          }
          
          [data-section="about-content"] .profile {
            padding: var(--spacing-sm);
          }
          
          [data-section="about-content"] .about-image img {
            height: 300px;
          }
        }
      `
    }
  },

  pages: [
    {
      slug: "",
      title: "Studio Meridian | Digital Design & Experience",
      sections: ["header", "hero", "work-preview", "footer"]
    },
    {
      slug: "work",
      title: "Work | Studio Meridian",
      sections: ["header", "work-grid", "footer"]
    },
    {
      slug: "about",
      title: "About | Studio Meridian",
      sections: ["header", "about-content", "footer"]
    }
  ]
}