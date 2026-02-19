import type { Site } from '../site-types'

export const downstreetCafe: Site = {
  name: "Downstreet Café",
  description: "A warm neighborhood café serving exceptional coffee, fresh pastries, and community connection since 2018",
  
  theme: {
    name: "warm-editorial",
    fonts: ["Playfair Display", "Source Sans Pro"],
    variables: {
      "--color-primary": "#2d3748",      // ink-dark text
      "--color-secondary": "#68725a",    // sage green
      "--color-accent": "#8fa382",       // lighter sage
      "--color-neutral": "#6b7280",      // slate gray
      "--color-background": "#faf9f7",   // warm paper
      "--color-background-alt": "#f3f2f0", // slightly darker paper
      "--font-heading": "'Playfair Display', serif",
      "--font-body": "'Source Sans Pro', sans-serif",
      "--spacing-xs": "0.5rem",
      "--spacing-sm": "1rem",
      "--spacing-md": "2rem",
      "--spacing-lg": "3rem",
      "--spacing-xl": "4rem",
      "--border-radius": "4px",
      "--line-height-tight": "1.2",
      "--line-height-normal": "1.6",
      "--color-footer-bg": "#2d3748",
      "--color-footer-text": "#faf9f7",
      "--color-footer-muted": "rgba(250, 249, 247, 0.8)",
      "--color-footer-border": "rgba(250, 249, 247, 0.2)",
      "--shadow-soft": "0 2px 8px rgba(45, 55, 72, 0.1)"
    },
    darkVariables: {
      "--color-primary": "#e8e4df",         // warm cream text
      "--color-secondary": "#8fa382",       // sage green (lightened)
      "--color-accent": "#a3b899",          // lighter sage
      "--color-neutral": "#9ca3af",         // light slate gray
      "--color-background": "#1c1917",      // warm charcoal
      "--color-background-alt": "#292524",  // slightly lighter charcoal
      "--font-heading": "'Playfair Display', serif",
      "--font-body": "'Source Sans Pro', sans-serif",
      "--spacing-xs": "0.5rem",
      "--spacing-sm": "1rem",
      "--spacing-md": "2rem",
      "--spacing-lg": "3rem",
      "--spacing-xl": "4rem",
      "--border-radius": "4px",
      "--line-height-tight": "1.2",
      "--line-height-normal": "1.6",
      "--color-footer-bg": "#0f0e0d",
      "--color-footer-text": "#e8e4df",
      "--color-footer-muted": "rgba(232, 228, 223, 0.8)",
      "--color-footer-border": "rgba(232, 228, 223, 0.2)",
      "--shadow-soft": "0 2px 8px rgba(0, 0, 0, 0.3)"
    }
  },

  sections: {
    header: {
      id: "header",
      role: "navigation",
      html: `
        <header class="cafe-header">
          <div class="header-container">
            <h1 class="site-title">Downstreet Café</h1>
            <nav class="main-nav">
              <ul class="nav-list">
                <li><a href="/" class="nav-link">Home</a></li>
                <li><a href="/menu" class="nav-link">Menu</a></li>
                <li><a href="/about" class="nav-link">About</a></li>
              </ul>
            </nav>
          </div>
        </header>
      `,
      css: `
        [data-section="header"] .cafe-header {
          background: var(--color-background);
          border-bottom: 1px solid var(--color-background-alt);
          padding: var(--spacing-sm) 0;
        }
        
        [data-section="header"] .header-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 var(--spacing-md);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        [data-section="header"] .site-title {
          font-family: var(--font-heading);
          font-size: 1.75rem;
          font-weight: 400;
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
          font-family: var(--font-body);
          font-size: 1rem;
          font-weight: 400;
          color: var(--color-neutral);
          text-decoration: none;
          transition: color 0.2s ease;
        }
        
        [data-section="header"] .nav-link:hover {
          color: var(--color-secondary);
        }
        
        @media (max-width: 768px) {
          [data-section="header"] .header-container {
            padding: 0 var(--spacing-sm);
            flex-direction: column;
            gap: var(--spacing-sm);
          }
          
          [data-section="header"] .site-title {
            font-size: 1.5rem;
          }
          
          [data-section="header"] .nav-list {
            gap: var(--spacing-md);
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
              <h2 class="hero-headline">Coffee crafted with intention</h2>
              <p class="hero-tagline">Every cup tells a story. Every visit feels like home.</p>
              <div class="hours-info">
                <h3 class="hours-title">Open Daily</h3>
                <div class="hours-grid">
                  <div class="hours-item">
                    <span class="day">Mon-Fri</span>
                    <span class="time">7:00 AM – 5:00 PM</span>
                  </div>
                  <div class="hours-item">
                    <span class="day">Weekends</span>
                    <span class="time">8:00 AM – 6:00 PM</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="hero-image">
              <img src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&h=600&fit=crop&q=80" alt="Fresh pastries and coffee on wooden counter" />
            </div>
          </div>
        </section>
      `,
      css: `
        [data-section="hero"] .hero-section {
          background: var(--color-background);
          padding: var(--spacing-xl) 0;
        }
        
        [data-section="hero"] .hero-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 var(--spacing-md);
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--spacing-xl);
          align-items: center;
        }
        
        [data-section="hero"] .hero-headline {
          font-family: var(--font-heading);
          font-size: 2.5rem;
          font-weight: 400;
          color: var(--color-primary);
          line-height: var(--line-height-tight);
          margin: 0 0 var(--spacing-md) 0;
          letter-spacing: -0.02em;
        }
        
        [data-section="hero"] .hero-tagline {
          font-family: var(--font-body);
          font-size: 1.125rem;
          color: var(--color-neutral);
          line-height: var(--line-height-normal);
          margin: 0 0 var(--spacing-lg) 0;
        }
        
        [data-section="hero"] .hours-info {
          background: var(--color-background-alt);
          padding: var(--spacing-md);
          border-radius: var(--border-radius);
          border: 1px solid rgba(104, 114, 90, 0.1);
        }
        
        [data-section="hero"] .hours-title {
          font-family: var(--font-heading);
          font-size: 1.25rem;
          color: var(--color-primary);
          margin: 0 0 var(--spacing-sm) 0;
        }
        
        [data-section="hero"] .hours-grid {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-xs);
        }
        
        [data-section="hero"] .hours-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        [data-section="hero"] .day {
          font-family: var(--font-body);
          font-weight: 600;
          color: var(--color-secondary);
        }
        
        [data-section="hero"] .time {
          font-family: var(--font-body);
          color: var(--color-neutral);
        }
        
        [data-section="hero"] .hero-image img {
          width: 100%;
          height: 400px;
          object-fit: cover;
          border-radius: var(--border-radius);
          box-shadow: var(--shadow-soft);
        }
        
        @media (max-width: 768px) {
          [data-section="hero"] .hero-container {
            grid-template-columns: 1fr;
            gap: var(--spacing-md);
            padding: 0 var(--spacing-sm);
          }
          
          [data-section="hero"] .hero-headline {
            font-size: 2rem;
          }
          
          [data-section="hero"] .hero-image img {
            height: 300px;
          }
        }
      `
    },

    "menu-preview": {
      id: "menu-preview",
      html: `
        <section class="menu-preview-section">
          <div class="menu-preview-container">
            <header class="section-header">
              <h2 class="section-title">Today's Favorites</h2>
              <p class="section-subtitle">A taste of what awaits on our full menu</p>
            </header>
            
            <div class="featured-items">
              <div class="menu-item">
                <div class="item-info">
                  <h3 class="item-name">House Blend</h3>
                  <p class="item-description">Our signature roast with notes of chocolate and caramel</p>
                </div>
                <div class="item-leader"></div>
                <span class="item-price">$3.50</span>
              </div>
              
              <div class="menu-item">
                <div class="item-info">
                  <h3 class="item-name">Maple Pecan Scone</h3>
                  <p class="item-description">Fresh-baked daily with local maple syrup and candied pecans</p>
                </div>
                <div class="item-leader"></div>
                <span class="item-price">$4.75</span>
              </div>
              
              <div class="menu-item">
                <div class="item-info">
                  <h3 class="item-name">Grilled Sourdough Sandwich</h3>
                  <p class="item-description">Artisan sourdough, aged cheddar, tomato, and fresh basil</p>
                </div>
                <div class="item-leader"></div>
                <span class="item-price">$9.50</span>
              </div>
              
              <div class="menu-item">
                <div class="item-info">
                  <h3 class="item-name">Lavender Honey Latte</h3>
                  <p class="item-description">Espresso, steamed milk, culinary lavender, and local wildflower honey</p>
                </div>
                <div class="item-leader"></div>
                <span class="item-price">$5.25</span>
              </div>
            </div>
            
            <div class="menu-link-container">
              <a href="/menu" class="menu-link">View Full Menu</a>
            </div>
          </div>
        </section>
      `,
      css: `
        [data-section="menu-preview"] .menu-preview-section {
          background: var(--color-background-alt);
          padding: var(--spacing-xl) 0;
        }
        
        [data-section="menu-preview"] .menu-preview-container {
          max-width: 800px;
          margin: 0 auto;
          padding: 0 var(--spacing-md);
        }
        
        [data-section="menu-preview"] .section-header {
          text-align: center;
          margin-bottom: var(--spacing-xl);
        }
        
        [data-section="menu-preview"] .section-title {
          font-family: var(--font-heading);
          font-size: 2rem;
          font-weight: 400;
          color: var(--color-primary);
          margin: 0 0 var(--spacing-sm) 0;
        }
        
        [data-section="menu-preview"] .section-subtitle {
          font-family: var(--font-body);
          font-size: 1.125rem;
          color: var(--color-neutral);
          margin: 0;
          line-height: var(--line-height-normal);
        }
        
        [data-section="menu-preview"] .featured-items {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-lg);
          margin-bottom: var(--spacing-xl);
        }
        
        [data-section="menu-preview"] .menu-item {
          display: grid;
          grid-template-columns: 1fr auto auto;
          gap: var(--spacing-sm);
          align-items: end;
          padding-bottom: var(--spacing-sm);
          border-bottom: 1px solid rgba(104, 114, 90, 0.1);
        }
        
        [data-section="menu-preview"] .item-info h3 {
          font-family: var(--font-heading);
          font-size: 1.25rem;
          font-weight: 400;
          color: var(--color-primary);
          margin: 0 0 var(--spacing-xs) 0;
        }
        
        [data-section="menu-preview"] .item-description {
          font-family: var(--font-body);
          font-size: 0.9rem;
          color: var(--color-neutral);
          line-height: var(--line-height-normal);
          margin: 0;
        }
        
        [data-section="menu-preview"] .item-leader {
          border-bottom: 2px dotted var(--color-accent);
          margin-bottom: 4px;
          min-width: 50px;
          height: 1px;
        }
        
        [data-section="menu-preview"] .item-price {
          font-family: var(--font-body);
          font-size: 1.125rem;
          font-weight: 600;
          color: var(--color-secondary);
          white-space: nowrap;
        }
        
        [data-section="menu-preview"] .menu-link-container {
          text-align: center;
        }
        
        [data-section="menu-preview"] .menu-link {
          display: inline-block;
          font-family: var(--font-body);
          font-size: 1rem;
          font-weight: 600;
          color: var(--color-secondary);
          text-decoration: none;
          padding: var(--spacing-sm) var(--spacing-md);
          border: 2px solid var(--color-secondary);
          border-radius: var(--border-radius);
          transition: all 0.2s ease;
        }
        
        [data-section="menu-preview"] .menu-link:hover {
          background: var(--color-secondary);
          color: var(--color-background);
        }
        
        @media (max-width: 768px) {
          [data-section="menu-preview"] .menu-preview-container {
            padding: 0 var(--spacing-sm);
          }
          
          [data-section="menu-preview"] .menu-item {
            grid-template-columns: 1fr;
            gap: var(--spacing-xs);
          }
          
          [data-section="menu-preview"] .item-leader {
            display: none;
          }
          
          [data-section="menu-preview"] .item-price {
            font-size: 1rem;
            margin-top: var(--spacing-xs);
          }
        }
      `
    },

    community: {
      id: "community",
      html: `
        <section class="community-section">
          <div class="community-container">
            <header class="section-header">
              <h2 class="section-title">Community & Events</h2>
              <p class="section-subtitle">More than coffee—we're a gathering place for connection and culture</p>
            </header>
            
            <div class="events-grid">
              <div class="event-card">
                <div class="event-date">
                  <span class="date-month">Feb</span>
                  <span class="date-day">18</span>
                </div>
                <div class="event-content">
                  <h3 class="event-title">Open Mic Night</h3>
                  <p class="event-description">Share your poetry, music, or stories. Sign up starts at 6:30 PM.</p>
                  <span class="event-time">7:00 PM - 9:00 PM</span>
                </div>
              </div>
              
              <div class="event-card">
                <div class="event-date">
                  <span class="date-month">Feb</span>
                  <span class="date-day">22</span>
                </div>
                <div class="event-content">
                  <h3 class="event-title">Local Art Exhibition</h3>
                  <p class="event-description">"Urban Gardens" featuring watercolors by Sarah Chen. Opening reception with wine and cheese.</p>
                  <span class="event-time">6:00 PM - 8:00 PM</span>
                </div>
              </div>
              
              <div class="event-card">
                <div class="event-date">
                  <span class="date-month">Mar</span>
                  <span class="date-day">02</span>
                </div>
                <div class="event-content">
                  <h3 class="event-title">Coffee Cupping Workshop</h3>
                  <p class="event-description">Learn to taste coffee like a pro. We'll explore beans from three different regions.</p>
                  <span class="event-time">2:00 PM - 4:00 PM</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      `,
      css: `
        [data-section="community"] .community-section {
          background: var(--color-background);
          padding: var(--spacing-xl) 0;
        }
        
        [data-section="community"] .community-container {
          max-width: 1000px;
          margin: 0 auto;
          padding: 0 var(--spacing-md);
        }
        
        [data-section="community"] .section-header {
          text-align: center;
          margin-bottom: var(--spacing-xl);
        }
        
        [data-section="community"] .section-title {
          font-family: var(--font-heading);
          font-size: 2rem;
          font-weight: 400;
          color: var(--color-primary);
          margin: 0 0 var(--spacing-sm) 0;
        }
        
        [data-section="community"] .section-subtitle {
          font-family: var(--font-body);
          font-size: 1.125rem;
          color: var(--color-neutral);
          margin: 0;
          line-height: var(--line-height-normal);
        }
        
        [data-section="community"] .events-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: var(--spacing-md);
        }
        
        [data-section="community"] .event-card {
          background: var(--color-background-alt);
          border: 1px solid rgba(104, 114, 90, 0.1);
          border-radius: var(--border-radius);
          padding: var(--spacing-md);
          display: flex;
          gap: var(--spacing-md);
          transition: box-shadow 0.2s ease;
        }
        
        [data-section="community"] .event-card:hover {
          box-shadow: var(--shadow-soft);
        }
        
        [data-section="community"] .event-date {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: var(--color-secondary);
          color: white;
          border-radius: var(--border-radius);
          padding: var(--spacing-sm);
          min-width: 60px;
          text-align: center;
        }
        
        [data-section="community"] .date-month {
          font-family: var(--font-body);
          font-size: 0.8rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          line-height: 1;
        }
        
        [data-section="community"] .date-day {
          font-family: var(--font-heading);
          font-size: 1.5rem;
          font-weight: 400;
          line-height: 1;
          margin-top: 2px;
        }
        
        [data-section="community"] .event-content {
          flex: 1;
        }
        
        [data-section="community"] .event-title {
          font-family: var(--font-heading);
          font-size: 1.25rem;
          font-weight: 400;
          color: var(--color-primary);
          margin: 0 0 var(--spacing-xs) 0;
        }
        
        [data-section="community"] .event-description {
          font-family: var(--font-body);
          font-size: 0.95rem;
          color: var(--color-neutral);
          line-height: var(--line-height-normal);
          margin: 0 0 var(--spacing-sm) 0;
        }
        
        [data-section="community"] .event-time {
          font-family: var(--font-body);
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--color-secondary);
        }
        
        @media (max-width: 768px) {
          [data-section="community"] .community-container {
            padding: 0 var(--spacing-sm);
          }
          
          [data-section="community"] .events-grid {
            grid-template-columns: 1fr;
          }
        }
      `
    },

    footer: {
      id: "footer",
      role: "contentinfo",
      html: `
        <footer class="cafe-footer">
          <div class="footer-container">
            <div class="footer-content">
              <div class="contact-info">
                <h3 class="footer-title">Visit Us</h3>
                <address class="address">
                  142 Downstreet Avenue<br>
                  Portland, Maine 04101
                </address>
                <div class="contact-details">
                  <a href="tel:+12075551234" class="contact-link">(207) 555-1234</a>
                  <a href="mailto:hello@downstreetcafe.com" class="contact-link">hello@downstreetcafe.com</a>
                </div>
              </div>
              
              <div class="hours-summary">
                <h3 class="footer-title">Hours</h3>
                <div class="hours-list">
                  <div class="hours-item">Monday - Friday: 7:00 AM - 5:00 PM</div>
                  <div class="hours-item">Saturday - Sunday: 8:00 AM - 6:00 PM</div>
                </div>
              </div>
            </div>
            
            <div class="footer-bottom">
              <p class="copyright">&copy; 2026 Downstreet Café. Made with love in Portland.</p>
            </div>
          </div>
        </footer>
      `,
      css: `
        [data-section="footer"] .cafe-footer {
          background: var(--color-footer-bg);
          color: var(--color-footer-text);
          padding: var(--spacing-lg) 0 var(--spacing-md) 0;
        }
        
        [data-section="footer"] .footer-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 var(--spacing-md);
        }
        
        [data-section="footer"] .footer-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--spacing-xl);
          margin-bottom: var(--spacing-lg);
        }
        
        [data-section="footer"] .footer-title {
          font-family: var(--font-heading);
          font-size: 1.25rem;
          font-weight: 400;
          color: var(--color-footer-text);
          margin: 0 0 var(--spacing-sm) 0;
        }

        [data-section="footer"] .address {
          font-family: var(--font-body);
          font-size: 1rem;
          color: var(--color-footer-muted);
          line-height: var(--line-height-normal);
          font-style: normal;
          margin: 0 0 var(--spacing-sm) 0;
        }
        
        [data-section="footer"] .contact-details {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-xs);
        }
        
        [data-section="footer"] .contact-link {
          font-family: var(--font-body);
          color: var(--color-footer-muted);
          text-decoration: none;
          transition: color 0.2s ease;
        }
        
        [data-section="footer"] .contact-link:hover {
          color: var(--color-footer-text);
        }

        [data-section="footer"] .hours-list {
          font-family: var(--font-body);
          color: var(--color-footer-muted);
          line-height: var(--line-height-normal);
        }
        
        [data-section="footer"] .hours-item {
          margin-bottom: var(--spacing-xs);
        }
        
        [data-section="footer"] .footer-bottom {
          padding-top: var(--spacing-md);
          border-top: 1px solid var(--color-footer-border);
          text-align: center;
        }
        
        [data-section="footer"] .copyright {
          font-family: var(--font-body);
          font-size: 0.9rem;
          color: var(--color-footer-muted);
          margin: 0;
        }
        
        @media (max-width: 768px) {
          [data-section="footer"] .footer-container {
            padding: 0 var(--spacing-sm);
          }
          
          [data-section="footer"] .footer-content {
            grid-template-columns: 1fr;
            gap: var(--spacing-md);
          }
        }
      `
    },

    "menu-full": {
      id: "menu-full",
      html: `
        <section class="menu-full-section">
          <div class="menu-full-container">
            <header class="menu-header">
              <h1 class="menu-title">Our Menu</h1>
              <p class="menu-subtitle">Carefully curated offerings, made fresh daily</p>
            </header>
            
            <div class="menu-categories">
              <div class="menu-category">
                <h2 class="category-title">Coffee & Espresso</h2>
                <div class="menu-items">
                  <div class="menu-item">
                    <div class="item-info">
                      <h3 class="item-name">House Blend</h3>
                      <p class="item-description">Our signature roast with notes of chocolate and caramel</p>
                    </div>
                    <div class="item-leader"></div>
                    <span class="item-price">$3.50</span>
                  </div>
                  <div class="menu-item">
                    <div class="item-info">
                      <h3 class="item-name">Single Origin Guatemala</h3>
                      <p class="item-description">Bright acidity with hints of citrus and brown sugar</p>
                    </div>
                    <div class="item-leader"></div>
                    <span class="item-price">$4.25</span>
                  </div>
                  <div class="menu-item">
                    <div class="item-info">
                      <h3 class="item-name">Cappuccino</h3>
                      <p class="item-description">Double espresso with steamed milk and microfoam</p>
                    </div>
                    <div class="item-leader"></div>
                    <span class="item-price">$4.50</span>
                  </div>
                  <div class="menu-item">
                    <div class="item-info">
                      <h3 class="item-name">Lavender Honey Latte</h3>
                      <p class="item-description">Espresso, steamed milk, culinary lavender, and local wildflower honey</p>
                    </div>
                    <div class="item-leader"></div>
                    <span class="item-price">$5.25</span>
                  </div>
                  <div class="menu-item">
                    <div class="item-info">
                      <h3 class="item-name">Cold Brew</h3>
                      <p class="item-description">Smooth, low-acid coffee steeped for 18 hours</p>
                    </div>
                    <div class="item-leader"></div>
                    <span class="item-price">$4.00</span>
                  </div>
                </div>
              </div>
              
              <div class="menu-category">
                <h2 class="category-title">Pastries & Sweets</h2>
                <div class="menu-items">
                  <div class="menu-item">
                    <div class="item-info">
                      <h3 class="item-name">Maple Pecan Scone</h3>
                      <p class="item-description">Fresh-baked daily with local maple syrup and candied pecans</p>
                    </div>
                    <div class="item-leader"></div>
                    <span class="item-price">$4.75</span>
                  </div>
                  <div class="menu-item">
                    <div class="item-info">
                      <h3 class="item-name">Blueberry Lemon Muffin</h3>
                      <p class="item-description">Wild Maine blueberries with a bright lemon glaze</p>
                    </div>
                    <div class="item-leader"></div>
                    <span class="item-price">$3.95</span>
                  </div>
                  <div class="menu-item">
                    <div class="item-info">
                      <h3 class="item-name">Cinnamon Cardamom Roll</h3>
                      <p class="item-description">House-made with organic flour and Madagascar vanilla</p>
                    </div>
                    <div class="item-leader"></div>
                    <span class="item-price">$5.50</span>
                  </div>
                  <div class="menu-item">
                    <div class="item-info">
                      <h3 class="item-name">Seasonal Fruit Tart</h3>
                      <p class="item-description">Pastry cream with fresh seasonal fruit (ask about today's selection)</p>
                    </div>
                    <div class="item-leader"></div>
                    <span class="item-price">$6.25</span>
                  </div>
                </div>
              </div>
              
              <div class="menu-category">
                <h2 class="category-title">Lunch</h2>
                <div class="menu-items">
                  <div class="menu-item">
                    <div class="item-info">
                      <h3 class="item-name">Grilled Sourdough Sandwich</h3>
                      <p class="item-description">Artisan sourdough, aged cheddar, tomato, and fresh basil</p>
                    </div>
                    <div class="item-leader"></div>
                    <span class="item-price">$9.50</span>
                  </div>
                  <div class="menu-item">
                    <div class="item-info">
                      <h3 class="item-name">Turkey & Avocado Wrap</h3>
                      <p class="item-description">House-roasted turkey, avocado, sprouts, and herb aioli</p>
                    </div>
                    <div class="item-leader"></div>
                    <span class="item-price">$10.75</span>
                  </div>
                  <div class="menu-item">
                    <div class="item-info">
                      <h3 class="item-name">Garden Salad</h3>
                      <p class="item-description">Mixed greens, seasonal vegetables, with house vinaigrette</p>
                    </div>
                    <div class="item-leader"></div>
                    <span class="item-price">$8.95</span>
                  </div>
                  <div class="menu-item">
                    <div class="item-info">
                      <h3 class="item-name">Soup of the Day</h3>
                      <p class="item-description">Ask your server about today's house-made soup</p>
                    </div>
                    <div class="item-leader"></div>
                    <span class="item-price">$6.50</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      `,
      css: `
        [data-section="menu-full"] .menu-full-section {
          background: var(--color-background);
          padding: var(--spacing-xl) 0;
        }
        
        [data-section="menu-full"] .menu-full-container {
          max-width: 900px;
          margin: 0 auto;
          padding: 0 var(--spacing-md);
        }
        
        [data-section="menu-full"] .menu-header {
          text-align: center;
          margin-bottom: var(--spacing-xl);
        }
        
        [data-section="menu-full"] .menu-title {
          font-family: var(--font-heading);
          font-size: 2.5rem;
          font-weight: 400;
          color: var(--color-primary);
          margin: 0 0 var(--spacing-sm) 0;
          letter-spacing: -0.02em;
        }
        
        [data-section="menu-full"] .menu-subtitle {
          font-family: var(--font-body);
          font-size: 1.125rem;
          color: var(--color-neutral);
          margin: 0;
          line-height: var(--line-height-normal);
        }
        
        [data-section="menu-full"] .menu-categories {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-xl);
        }
        
        [data-section="menu-full"] .menu-category {
          background: var(--color-background-alt);
          padding: var(--spacing-lg);
          border-radius: var(--border-radius);
          border: 1px solid rgba(104, 114, 90, 0.1);
        }
        
        [data-section="menu-full"] .category-title {
          font-family: var(--font-heading);
          font-size: 1.75rem;
          font-weight: 400;
          color: var(--color-primary);
          margin: 0 0 var(--spacing-lg) 0;
          padding-bottom: var(--spacing-sm);
          border-bottom: 2px solid var(--color-secondary);
          display: inline-block;
        }
        
        [data-section="menu-full"] .menu-items {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-md);
        }
        
        [data-section="menu-full"] .menu-item {
          display: grid;
          grid-template-columns: 1fr auto auto;
          gap: var(--spacing-sm);
          align-items: end;
          padding-bottom: var(--spacing-sm);
          border-bottom: 1px solid rgba(104, 114, 90, 0.1);
        }
        
        [data-section="menu-full"] .menu-item:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }
        
        [data-section="menu-full"] .item-info h3 {
          font-family: var(--font-heading);
          font-size: 1.25rem;
          font-weight: 400;
          color: var(--color-primary);
          margin: 0 0 var(--spacing-xs) 0;
        }
        
        [data-section="menu-full"] .item-description {
          font-family: var(--font-body);
          font-size: 0.9rem;
          color: var(--color-neutral);
          line-height: var(--line-height-normal);
          margin: 0;
        }
        
        [data-section="menu-full"] .item-leader {
          border-bottom: 2px dotted var(--color-accent);
          margin-bottom: 4px;
          min-width: 50px;
          height: 1px;
        }
        
        [data-section="menu-full"] .item-price {
          font-family: var(--font-body);
          font-size: 1.125rem;
          font-weight: 600;
          color: var(--color-secondary);
          white-space: nowrap;
        }
        
        @media (max-width: 768px) {
          [data-section="menu-full"] .menu-full-container {
            padding: 0 var(--spacing-sm);
          }
          
          [data-section="menu-full"] .menu-category {
            padding: var(--spacing-md);
          }
          
          [data-section="menu-full"] .menu-item {
            grid-template-columns: 1fr;
            gap: var(--spacing-xs);
          }
          
          [data-section="menu-full"] .item-leader {
            display: none;
          }
          
          [data-section="menu-full"] .item-price {
            font-size: 1rem;
            margin-top: var(--spacing-xs);
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
                <h1 class="about-title">Our Story</h1>
                
                <div class="story-content">
                  <p class="story-paragraph">
                    Downstreet Café opened its doors in October 2018 when Maria Santos decided Portland needed a different kind of neighborhood coffee shop. After years working as a buyer for specialty coffee importers, she wanted to create a space that honored both the craft of coffee and the art of community.
                  </p>
                  
                  <p class="story-paragraph">
                    The name comes from the old saying "just downstreet from here"—the kind of place locals would point to when giving directions. That sense of being woven into the fabric of the neighborhood was exactly what Maria envisioned.
                  </p>
                  
                  <p class="story-paragraph">
                    We source our beans directly from small farms in Guatemala, Ethiopia, and Colombia, building relationships that ensure fair prices for growers and exceptional quality in every cup. Our pastries come from local bakers who share our commitment to using organic, seasonal ingredients.
                  </p>
                  
                  <p class="story-paragraph">
                    More than anything, we believe coffee shops should be third places—not home, not work, but somewhere in between where ideas percolate, friendships brew, and community happens naturally. Whether you're here for a quick espresso or settling in with a laptop for the afternoon, you're part of what makes this place special.
                  </p>
                </div>
                
                <div class="team-note">
                  <p><strong>Maria Santos</strong>, Owner & Head Roaster<br>
                  <em>"Every cup tells a story—from the farmer who grew it to the moment you taste it. We're honored to be part of that journey."</em></p>
                </div>
              </div>
              
              <div class="about-image">
                <img src="https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=600&h=800&fit=crop&q=80" alt="Maria Santos preparing coffee behind the counter" />
                <p class="image-caption">Maria working with our La Marzocco espresso machine, a centerpiece of our coffee program since day one.</p>
              </div>
            </div>
          </div>
        </section>
      `,
      css: `
        [data-section="about-content"] .about-content-section {
          background: var(--color-background);
          padding: var(--spacing-xl) 0;
        }
        
        [data-section="about-content"] .about-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 var(--spacing-md);
        }
        
        [data-section="about-content"] .about-layout {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: var(--spacing-xl);
          align-items: start;
        }
        
        [data-section="about-content"] .about-title {
          font-family: var(--font-heading);
          font-size: 2.5rem;
          font-weight: 400;
          color: var(--color-primary);
          margin: 0 0 var(--spacing-lg) 0;
          letter-spacing: -0.02em;
        }
        
        [data-section="about-content"] .story-content {
          margin-bottom: var(--spacing-lg);
        }
        
        [data-section="about-content"] .story-paragraph {
          font-family: var(--font-body);
          font-size: 1.125rem;
          color: var(--color-neutral);
          line-height: var(--line-height-normal);
          margin: 0 0 var(--spacing-md) 0;
        }
        
        [data-section="about-content"] .story-paragraph:last-child {
          margin-bottom: 0;
        }
        
        [data-section="about-content"] .team-note {
          background: var(--color-background-alt);
          padding: var(--spacing-md);
          border-left: 4px solid var(--color-secondary);
          border-radius: 0 var(--border-radius) var(--border-radius) 0;
        }
        
        [data-section="about-content"] .team-note p {
          font-family: var(--font-body);
          font-size: 1rem;
          color: var(--color-neutral);
          line-height: var(--line-height-normal);
          margin: 0;
        }
        
        [data-section="about-content"] .team-note strong {
          color: var(--color-primary);
          font-weight: 600;
        }
        
        [data-section="about-content"] .team-note em {
          font-style: italic;
          color: var(--color-secondary);
        }
        
        [data-section="about-content"] .about-image img {
          width: 100%;
          height: 500px;
          object-fit: cover;
          border-radius: var(--border-radius);
          box-shadow: var(--shadow-soft);
          margin-bottom: var(--spacing-sm);
        }
        
        [data-section="about-content"] .image-caption {
          font-family: var(--font-body);
          font-size: 0.9rem;
          color: var(--color-neutral);
          line-height: var(--line-height-normal);
          margin: 0;
          font-style: italic;
        }
        
        @media (max-width: 768px) {
          [data-section="about-content"] .about-container {
            padding: 0 var(--spacing-sm);
          }
          
          [data-section="about-content"] .about-layout {
            grid-template-columns: 1fr;
            gap: var(--spacing-md);
          }
          
          [data-section="about-content"] .about-title {
            font-size: 2rem;
          }
          
          [data-section="about-content"] .story-paragraph {
            font-size: 1rem;
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
      title: "Home",
      sections: ["header", "hero", "menu-preview", "community", "footer"]
    },
    {
      slug: "menu",
      title: "Menu",
      sections: ["header", "menu-full", "footer"]
    },
    {
      slug: "about",
      title: "About",
      sections: ["header", "about-content", "footer"]
    }
  ]
}