// Portfolio-specific CSS for Alex Chen UI Portfolio site
// All values use var(--theme-*) tokens

export const portfolioCSS = `

/* ---- Portfolio Nav (override shared nav) ---- */
.site-nav {
  max-width: var(--theme-content-width);
  margin: 0 auto;
  padding: 20px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: none;
  gap: 0;
}
.site-nav .site-name {
  font-weight: 700;
  color: var(--theme-text);
  text-decoration: none;
  text-transform: none;
  letter-spacing: 0;
  font-size: 1rem;
}
.site-nav .nav-links {
  display: flex;
  gap: 24px;
}
.site-nav .nav-links a {
  color: var(--theme-text);
  text-decoration: none;
  font-size: 0.9rem;
  text-transform: none;
  letter-spacing: 0;
  font-weight: 400;
  border-bottom: none;
  padding: 0;
}
.site-nav .nav-links a:hover { color: var(--theme-color-primary); }
.site-nav .nav-links a.active {
  color: var(--theme-color-primary);
  font-weight: 600;
  border-bottom: none;
}

/* ---- Portfolio Footer (override shared footer) ---- */
footer {
  max-width: var(--theme-content-width);
  margin: 0 auto;
  padding: var(--theme-space-5) var(--theme-space-3);
  border-top: 1px solid var(--theme-color-border);
  font-size: var(--theme-font-size-small);
  color: var(--theme-color-muted-light);
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
  text-align: left;
  line-height: 1.6;
}
footer a {
  color: var(--theme-color-primary);
  text-decoration: none;
}

/* ---- Intro Section ---- */
.p-intro {
  max-width: var(--theme-content-width);
  margin: 0 auto;
  padding: var(--theme-space-8) var(--theme-space-3) var(--theme-space-10);
}
.p-intro__greeting {
  font-size: var(--theme-font-size-medium);
  color: var(--theme-color-primary);
  font-weight: 600;
  margin-bottom: var(--theme-space-1);
}
.p-intro h1 {
  font-size: var(--theme-font-size-hero);
  font-weight: 700;
  margin-bottom: 12px;
}
.p-intro p {
  font-size: var(--theme-font-size-large);
  color: var(--theme-color-muted);
  max-width: 520px;
}

/* ---- Project Card Grid (homepage) ---- */
.p-work {
  max-width: var(--theme-content-width);
  margin: 0 auto;
  padding: 0 var(--theme-space-3) var(--theme-space-10);
}
.p-work h2 {
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--theme-color-muted-light);
  margin-bottom: var(--theme-space-3);
  text-align: left;
}
.p-card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}
.p-card {
  border-radius: 12px;
  overflow: hidden;
  background: var(--theme-color-surface-alt);
  transition: transform 0.2s, box-shadow 0.2s;
}
.p-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.08);
}
.p-card-link {
  text-decoration: none;
  color: inherit;
  display: block;
}
.p-card__thumb { height: 180px; }
.p-card__body { padding: 20px; }
.p-card__body h3 {
  font-size: var(--theme-font-size-medium);
  font-weight: 600;
  margin-bottom: 4px;
}
.p-card__body p {
  font-size: 0.875rem;
  color: var(--theme-color-muted);
}

/* ---- About Brief ---- */
.p-about {
  max-width: var(--theme-content-width);
  margin: 0 auto;
  padding: 0 var(--theme-space-3) var(--theme-space-10);
}
.p-about h2 {
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--theme-color-muted-light);
  margin-bottom: 12px;
  text-align: left;
}
.p-about p {
  max-width: 560px;
  color: var(--theme-color-muted);
}

/* ---- Work Page: Filters ---- */
.p-filters {
  max-width: var(--theme-content-width);
  margin: 0 auto;
  padding: 0 var(--theme-space-3) var(--theme-space-4);
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
.p-filter-btn {
  padding: 8px 18px;
  border-radius: 20px;
  border: 1px solid var(--theme-color-border);
  background: transparent;
  color: var(--theme-color-muted);
  font-size: 0.85rem;
  font-family: var(--theme-font-body);
  cursor: pointer;
  transition: all 0.2s;
}
.p-filter-btn:hover {
  border-color: var(--theme-color-primary);
  color: var(--theme-color-primary);
}
.p-filter-btn.active {
  background: var(--theme-color-primary);
  color: var(--theme-bg);
  border-color: var(--theme-color-primary);
}

/* ---- Work Page: Full Project Grid ---- */
.p-hero {
  max-width: var(--theme-content-width);
  margin: 0 auto;
  padding: var(--theme-space-8) var(--theme-space-3) var(--theme-space-4);
}
.p-hero h1 {
  font-size: var(--theme-font-size-xlarge);
  font-weight: 700;
  margin-bottom: 8px;
}
.p-hero p {
  font-size: 1.1rem;
  color: var(--theme-color-muted);
  max-width: 520px;
}

.p-project-grid {
  max-width: var(--theme-content-width);
  margin: 0 auto;
  padding: 0 var(--theme-space-3) var(--theme-space-10);
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}
.p-project-card {
  border-radius: 14px;
  overflow: hidden;
  background: var(--theme-color-surface-alt);
  transition: transform 0.25s, box-shadow 0.25s;
  cursor: pointer;
  text-decoration: none;
  color: inherit;
  display: block;
  position: relative;
}
.p-project-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(0,0,0,0.1);
}
.p-project-thumb {
  height: 220px;
  position: relative;
  overflow: hidden;
}
.p-project-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.6);
  opacity: 0;
  transition: opacity 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
}
.p-project-card:hover .p-project-overlay { opacity: 1; }
.p-project-overlay span {
  color: #fff;
  font-weight: 600;
  font-size: 0.95rem;
  padding: 10px 24px;
  border: 2px solid #fff;
  border-radius: 24px;
}
.p-project-info { padding: 20px; }
.p-project-info h3 {
  font-size: var(--theme-font-size-medium);
  font-weight: 600;
  margin-bottom: 4px;
}
.p-project-client {
  font-size: 0.85rem;
  color: var(--theme-color-muted);
  margin-bottom: 8px;
}
.p-project-category {
  display: inline-block;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--theme-color-primary);
  font-weight: 600;
  background: rgba(16,185,129,0.08);
  padding: 4px 10px;
  border-radius: 4px;
}

/* ---- Case Study Hero ---- */
.p-cs-hero {
  max-width: var(--theme-content-width);
  margin: 0 auto;
  padding: var(--theme-space-8) var(--theme-space-3) var(--theme-space-6);
}
.p-cs-label {
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--theme-color-primary);
  font-weight: 600;
  margin-bottom: 12px;
}
.p-cs-hero h1 {
  font-size: var(--theme-font-size-xlarge);
  font-weight: 700;
  margin-bottom: 12px;
}
.p-cs-hero p {
  font-size: 1.15rem;
  color: var(--theme-color-muted);
  max-width: 560px;
}

/* ---- Case Study Image Block ---- */
.p-cs-image-block {
  max-width: var(--theme-content-width);
  margin: 0 auto;
  padding: 0 var(--theme-space-3) var(--theme-space-8);
}

/* ---- Case Study Image Row ---- */
.p-cs-image-row {
  max-width: var(--theme-content-width);
  margin: 0 auto;
  padding: 0 var(--theme-space-3) var(--theme-space-8);
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--theme-space-2);
}
.p-cs-image-row div {
  height: 200px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: var(--theme-font-size-small);
  font-weight: 500;
  letter-spacing: 0.05em;
}

/* ---- Case Study Meta ---- */
.p-cs-meta {
  max-width: var(--theme-content-width);
  margin: 0 auto;
  padding: 0 var(--theme-space-3) var(--theme-space-8);
  display: grid;
  gap: var(--theme-space-3);
}
.p-cs-meta-label {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--theme-color-muted-light);
  margin-bottom: 4px;
}
.p-cs-meta-value {
  font-size: var(--theme-font-size-medium);
  font-weight: 600;
}

/* ---- Case Study Section ---- */
.p-cs-section {
  max-width: var(--theme-content-width);
  margin: 0 auto;
  padding: 0 var(--theme-space-3) var(--theme-space-8);
}
.p-cs-section h2 {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: var(--theme-space-2);
  text-align: left;
}
.p-cs-section h3 {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: var(--theme-space-1);
  color: var(--theme-color-primary);
}
.p-cs-section p {
  color: var(--theme-color-muted);
  margin-bottom: var(--theme-space-2);
  max-width: 640px;
}
.p-cs-section ul {
  color: var(--theme-color-muted);
  margin-left: 20px;
  margin-bottom: var(--theme-space-2);
}
.p-cs-section ul li { margin-bottom: 6px; }

/* ---- Case Study Results ---- */
.p-results-grid {
  display: grid;
  gap: 20px;
  margin-top: var(--theme-space-2);
}
.p-result-card {
  background: var(--theme-color-surface-alt);
  border-radius: 12px;
  padding: var(--theme-space-3);
}
.p-result-number {
  font-size: 2rem;
  font-weight: 700;
  color: var(--theme-color-primary);
  margin-bottom: 4px;
}
.p-result-desc {
  font-size: 0.875rem;
  color: var(--theme-color-muted);
}

/* ---- Case Study Timeline ---- */
.p-cs-timeline {
  max-width: var(--theme-content-width);
  margin: 0 auto;
  padding: 0 var(--theme-space-3) var(--theme-space-8);
}
.p-cs-timeline h2 {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: var(--theme-space-3);
}
.p-timeline-track {
  display: flex;
  gap: 0;
  position: relative;
}
.p-timeline-phase {
  flex: 1;
  text-align: center;
  padding: 20px 12px;
  position: relative;
}
.p-timeline-bar {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  border-radius: 2px;
}
.p-timeline-name {
  font-weight: 600;
  font-size: 0.85rem;
  margin-bottom: 4px;
}
.p-timeline-duration {
  font-size: 0.75rem;
  color: var(--theme-color-muted);
}

/* ---- Case Study Compare ---- */
.p-cs-compare {
  max-width: var(--theme-content-width);
  margin: 0 auto;
  padding: 0 var(--theme-space-3) var(--theme-space-8);
}
.p-cs-compare h2 {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: var(--theme-space-3);
}
.p-compare-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}
.p-compare-col h3 {
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 12px;
}
.p-compare-before h3 { color: var(--theme-color-muted); }
.p-compare-after h3 { color: var(--theme-color-primary); }
.p-compare-block {
  border-radius: 12px;
  padding: 24px;
  min-height: 280px;
}
.p-compare-block--before {
  background: var(--theme-color-surface-alt);
  border: 1px solid var(--theme-color-border);
}
.p-compare-block--after {
  background: linear-gradient(135deg, rgba(91,146,121,0.08) 0%, rgba(168,213,186,0.12) 100%);
  border: 1px solid rgba(91,146,121,0.2);
}
.p-compare-block .mock-row { display: flex; gap: 8px; margin-bottom: 10px; align-items: center; }
.p-compare-block .mock-bar { height: 10px; border-radius: 5px; background: var(--theme-color-border); }
.p-compare-block .mock-bar.green { background: linear-gradient(90deg, #5b9279, #9dd4ad); }
.p-compare-block .mock-text { font-size: 0.8rem; color: var(--theme-color-muted); margin-bottom: 6px; }
.p-compare-block .mock-heading { font-size: 0.9rem; font-weight: 600; margin-bottom: 12px; }

/* ---- Case Study Testimonial ---- */
.p-cs-testimonial {
  max-width: var(--theme-content-width);
  margin: 0 auto;
  padding: 0 var(--theme-space-3) var(--theme-space-8);
}
.p-cs-testimonial blockquote {
  border-left: 3px solid var(--theme-color-primary);
  padding-left: 20px;
  font-size: 1.1rem;
  color: var(--theme-color-muted);
  font-style: italic;
  margin-bottom: 8px;
  max-width: 600px;
}
.p-cs-testimonial cite {
  font-size: 0.85rem;
  color: var(--theme-color-muted);
  font-style: normal;
  padding-left: 20px;
}

/* ---- Process Phases ---- */
.p-phase-list {
  max-width: var(--theme-content-width);
  margin: 0 auto;
  padding: 0 var(--theme-space-3) var(--theme-space-6);
}
.p-phase {
  display: grid;
  grid-template-columns: 80px 1fr;
  gap: var(--theme-space-3);
  padding: var(--theme-space-5) 0;
  border-bottom: 1px solid var(--theme-color-border);
  position: relative;
}
.p-phase:last-child { border-bottom: none; }
.p-phase-number {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--theme-color-primary), #5eead4);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: 700;
  font-size: 1.2rem;
  flex-shrink: 0;
}
.p-phase-content h2 {
  font-size: 1.35rem;
  font-weight: 700;
  margin-bottom: 4px;
  text-align: left;
}
.p-phase-subtitle {
  font-size: 0.9rem;
  color: var(--theme-color-primary);
  font-weight: 600;
  margin-bottom: 12px;
}
.p-phase-content p {
  color: var(--theme-color-muted);
  margin-bottom: var(--theme-space-2);
  max-width: 600px;
}
.p-phase-meta {
  display: flex;
  gap: var(--theme-space-4);
  margin-top: var(--theme-space-2);
  flex-wrap: wrap;
}
.p-phase-meta-group h4 {
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--theme-color-muted-light);
  margin-bottom: 6px;
}
.p-phase-tags {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}
.p-phase-tag {
  background: var(--theme-color-surface-alt);
  padding: 5px 12px;
  border-radius: 6px;
  font-size: 0.8rem;
  color: var(--theme-color-muted);
  font-weight: 500;
}

/* ---- Process Principles ---- */
.p-philosophy {
  max-width: var(--theme-content-width);
  margin: 0 auto;
  padding: var(--theme-space-4) var(--theme-space-3) var(--theme-space-8);
}
.p-philosophy h2 {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: var(--theme-space-3);
}
.p-principles-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
.p-principle {
  background: var(--theme-color-surface-alt);
  border-radius: 12px;
  padding: 24px;
}
.p-principle-icon {
  font-size: 1.5rem;
  margin-bottom: 12px;
}
.p-principle h3 {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 8px;
}
.p-principle p {
  font-size: 0.875rem;
  color: var(--theme-color-muted);
}

/* ---- Process CTA ---- */
.p-cta-section {
  max-width: var(--theme-content-width);
  margin: 0 auto;
  padding: 0 var(--theme-space-3) var(--theme-space-10);
}
.p-cta-card {
  background: linear-gradient(135deg, rgba(16,185,129,0.06) 0%, rgba(94,234,212,0.08) 100%);
  border: 1px solid rgba(16,185,129,0.15);
  border-radius: 16px;
  padding: var(--theme-space-6);
  text-align: center;
}
.p-cta-badge {
  display: inline-block;
  background: #ecfdf5;
  color: var(--theme-color-primary);
  font-weight: 600;
  font-size: var(--theme-font-size-small);
  padding: 6px 16px;
  border-radius: 20px;
  margin-bottom: 16px;
}
.p-cta-card h2 {
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 12px;
  text-align: center;
}
.p-cta-card p {
  color: var(--theme-color-muted);
  max-width: 480px;
  margin: 0 auto 24px;
  font-size: 1.05rem;
}
.p-cta-btn {
  display: inline-block;
  background: var(--theme-color-primary);
  color: #fff;
  font-size: 0.95rem;
  font-weight: 600;
  padding: 14px 36px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-family: var(--theme-font-body);
  text-decoration: none;
  transition: background 0.2s;
}
.p-cta-btn:hover { opacity: 0.9; }

/* ---- Contact: Avatar Block ---- */
.p-avatar-block {
  max-width: var(--theme-content-width);
  margin: 0 auto;
  padding: var(--theme-space-8) var(--theme-space-3) var(--theme-space-6);
  display: flex;
  gap: var(--theme-space-4);
  align-items: center;
}
.p-avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--theme-color-primary) 0%, #5eead4 100%);
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--theme-bg);
  font-size: var(--theme-font-size-xlarge);
  font-weight: 700;
}
.p-avatar-info h2 {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 4px;
}
.p-avatar-info p {
  color: var(--theme-color-muted);
  font-size: var(--theme-font-size-medium);
}

/* ---- Contact: Philosophy Quote ---- */
.p-philosophy-quote {
  max-width: var(--theme-content-width);
  margin: 0 auto;
  padding: 0 var(--theme-space-3) var(--theme-space-8);
}
.p-philosophy-quote blockquote {
  border-left: 3px solid var(--theme-color-primary);
  padding-left: 20px;
  font-size: var(--theme-font-size-large);
  color: var(--theme-color-muted);
  font-style: italic;
  margin-bottom: var(--theme-space-2);
}

/* ---- Contact: Tools Grid ---- */
.p-tools-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 12px;
  margin-top: 12px;
}
.p-tool-tag {
  background: var(--theme-color-surface-alt);
  border-radius: 8px;
  padding: 12px 16px;
  font-size: 0.875rem;
  font-weight: 500;
  text-align: center;
}

/* ---- Contact: Experience ---- */
.p-experience {
  max-width: var(--theme-content-width);
  margin: 0 auto;
  padding: 0 var(--theme-space-3) var(--theme-space-8);
}
.p-experience h2 {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 16px;
  text-align: left;
}
.p-exp-item {
  padding: 20px 0;
  border-bottom: 1px solid var(--theme-color-border);
}
.p-exp-item:last-child { border-bottom: none; }
.p-exp-role {
  font-weight: 600;
  font-size: var(--theme-font-size-medium);
}
.p-exp-company {
  color: var(--theme-color-primary);
  font-size: 0.9rem;
}
.p-exp-period {
  color: var(--theme-color-muted-light);
  font-size: var(--theme-font-size-small);
  margin-top: 2px;
}

/* ---- Contact: Availability ---- */
.p-availability {
  max-width: var(--theme-content-width);
  margin: 0 auto;
  padding: 0 var(--theme-space-3) var(--theme-space-8);
}
.p-availability h2 {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 16px;
  text-align: left;
}
.p-avail-badge {
  display: inline-block;
  background: #ecfdf5;
  color: var(--theme-color-primary);
  font-weight: 600;
  font-size: var(--theme-font-size-small);
  padding: 6px 14px;
  border-radius: 20px;
  margin-bottom: 12px;
}
.p-availability p {
  color: var(--theme-color-muted);
  max-width: 640px;
}

/* ---- Contact: Form ---- */
.p-contact-form {
  max-width: var(--theme-content-width);
  margin: 0 auto;
  padding: 0 var(--theme-space-3) var(--theme-space-8);
}
.p-contact-form h2 {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 20px;
  text-align: left;
}
.p-form-group { margin-bottom: 20px; }
.p-form-group label {
  display: block;
  font-size: var(--theme-font-size-small);
  font-weight: 600;
  color: var(--theme-color-muted);
  margin-bottom: 6px;
}
.p-form-group input,
.p-form-group textarea {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid var(--theme-color-border);
  border-radius: 8px;
  font-size: 0.95rem;
  font-family: var(--theme-font-body);
  color: var(--theme-text);
  background: var(--theme-color-surface-alt);
  transition: border-color 0.2s;
  outline: none;
}
.p-form-group input:focus,
.p-form-group textarea:focus {
  border-color: var(--theme-color-primary);
  background: var(--theme-bg);
}
.p-form-group textarea {
  height: 140px;
  resize: vertical;
}
.p-form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--theme-space-2);
}
.p-submit-btn {
  display: inline-block;
  background: var(--theme-color-primary);
  color: var(--theme-bg);
  font-size: 0.95rem;
  font-weight: 600;
  padding: 12px 32px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-family: var(--theme-font-body);
  transition: background 0.2s;
}
.p-submit-btn:hover { opacity: 0.9; }

/* ---- Contact: Social Links ---- */
.p-social-links {
  max-width: var(--theme-content-width);
  margin: 0 auto;
  padding: 0 var(--theme-space-3) var(--theme-space-8);
}
.p-social-links h2 {
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--theme-color-muted-light);
  margin-bottom: var(--theme-space-2);
  text-align: left;
}
.p-social-grid {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}
.p-social-card {
  display: flex;
  align-items: center;
  gap: 10px;
  background: var(--theme-color-surface-alt);
  border-radius: 10px;
  padding: 14px 20px;
  text-decoration: none;
  color: var(--theme-text);
  font-weight: 500;
  font-size: 0.9rem;
  transition: background 0.2s;
}
.p-social-card:hover { background: var(--theme-color-border); }
.p-social-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}
`
