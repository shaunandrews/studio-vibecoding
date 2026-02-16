// Blog-specific CSS for Shaun's Blog
// Overrides shared nav/footer styles and adds blog-specific components

export const blogCSS = `
/* ---- Override shared nav to blog-style header ---- */
.site-nav {
  max-width: var(--theme-content-width);
  margin: 0 auto;
  padding: 40px 24px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: none;
  gap: var(--theme-space-4);
}
.site-nav .site-name {
  font-size: 1.125rem;
  font-weight: 700;
  font-family: var(--theme-font-heading);
  color: var(--theme-text);
  text-decoration: none;
  letter-spacing: -0.02em;
}
.site-nav .site-name:hover {
  color: var(--theme-text);
}
.site-nav .nav-links {
  display: flex;
  gap: 24px;
  align-items: center;
}
.site-nav .nav-links a {
  color: var(--theme-color-muted);
  text-transform: none;
  letter-spacing: 0;
  font-size: 0.875rem;
  font-weight: 400;
  padding: 0;
  text-decoration: none;
  transition: color 0.15s ease;
}
.site-nav .nav-links a:hover {
  color: var(--theme-text);
}
.site-nav .nav-links a.active {
  color: var(--theme-text);
  font-weight: 500;
  border-bottom: none;
}

/* ---- Override shared footer ---- */
footer {
  max-width: var(--theme-content-width);
  margin: 0 auto;
  padding: 48px 24px 48px;
  text-align: left;
  font-size: 0.8125rem;
  color: var(--theme-color-muted-light);
  border-top: 1px solid var(--theme-color-border);
  line-height: 1.6;
  margin-top: 64px;
}

/* ---- Main content area ---- */
main {
  max-width: var(--theme-content-width);
  margin: 0 auto;
  padding: 64px 24px 0;
}

/* ---- Featured post (homepage) ---- */
.featured {
  border-bottom: 1px solid var(--theme-color-border);
  padding-bottom: 40px;
  margin-bottom: 40px;
}
.featured .label {
  font-size: 0.6875rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--theme-color-primary);
  font-weight: 600;
  margin-bottom: 12px;
}
.featured h2 {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 8px;
  font-family: var(--theme-font-heading);
  line-height: 1.2;
  letter-spacing: -0.025em;
}
.featured h2 a {
  color: inherit;
  text-decoration: none;
  transition: color 0.15s ease;
}
.featured h2 a:hover {
  color: var(--theme-color-primary);
}
.featured .date {
  font-size: 0.8125rem;
  color: var(--theme-color-muted);
  margin-bottom: 16px;
}
.featured .excerpt {
  font-size: 1.0625rem;
  color: var(--theme-color-body-text);
  line-height: 1.7;
}

/* ---- Post list (homepage) ---- */
.posts h3 {
  font-size: 0.6875rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--theme-color-muted);
  font-weight: 600;
  margin-bottom: 16px;
}
.post-item {
  padding: 16px 0;
  border-bottom: 1px solid var(--theme-color-border-light);
}
.post-item:first-of-type {
  border-top: 1px solid var(--theme-color-border-light);
}
.post-item a {
  font-size: 1.0625rem;
  font-weight: 600;
  color: var(--theme-text);
  text-decoration: none;
  transition: color 0.15s ease;
}
.post-item a:hover {
  color: var(--theme-color-primary);
}
.post-item .meta {
  font-size: 0.8125rem;
  color: var(--theme-color-muted);
  margin-top: 4px;
  line-height: 1.6;
}
.post-item .meta .excerpt {
  color: var(--theme-color-muted-light);
}

/* ---- Blog post (single) ---- */
.back {
  display: inline-block;
  font-size: 0.8125rem;
  color: var(--theme-color-muted);
  text-decoration: none;
  margin-bottom: 32px;
  transition: color 0.15s ease;
}
.back:hover {
  color: var(--theme-text);
}

article h2 {
  font-size: 2.25rem;
  font-weight: 700;
  margin-bottom: 12px;
  line-height: 1.15;
  letter-spacing: -0.03em;
  font-family: var(--theme-font-heading);
}
.byline {
  font-size: 0.8125rem;
  color: var(--theme-color-muted);
  margin-bottom: 40px;
  padding-bottom: 32px;
  border-bottom: 1px solid var(--theme-color-border-light);
}
.byline strong {
  color: var(--theme-text);
  font-weight: 500;
}

article p {
  font-size: 1.0625rem;
  color: var(--theme-color-body-text);
  margin-bottom: 24px;
  line-height: 1.75;
}
article h3 {
  font-size: 1.25rem;
  font-weight: 700;
  margin-top: 48px;
  margin-bottom: 16px;
  font-family: var(--theme-font-heading);
  letter-spacing: -0.015em;
}

.pullquote {
  border-left: 2px solid var(--theme-color-primary);
  padding: 4px 0 4px 24px;
  margin: 40px 0;
  font-size: 1.1875rem;
  font-style: italic;
  color: var(--theme-color-body-text);
  line-height: 1.6;
}

article pre {
  background: var(--theme-color-surface);
  border: 1px solid var(--theme-color-border-light);
  padding: 20px 24px;
  border-radius: 8px;
  overflow-x: auto;
  margin: 32px 0;
  font-size: 0.8125rem;
  line-height: 1.65;
  color: var(--theme-text);
}
article code {
  font-family: 'SF Mono', 'Fira Code', 'Consolas', monospace;
  font-size: 0.9em;
}

.post-tags {
  margin-top: 48px;
  padding-top: 24px;
  border-top: 1px solid var(--theme-color-border-light);
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  align-items: center;
}
.post-tags span.label {
  font-size: 0.75rem;
  color: var(--theme-color-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 500;
}
.post-tags .tag {
  font-size: 0.75rem;
  padding: 4px 10px;
  background: var(--theme-color-surface);
  border: 1px solid var(--theme-color-border-light);
  color: var(--theme-color-muted);
  border-radius: 4px;
}

/* ---- About page ---- */
/* page-header override for blog */
.page-header {
  text-align: left;
  padding: 0 0 8px;
}
.page-header h1 {
  font-size: 2rem;
  color: var(--theme-text);
  font-weight: 700;
  letter-spacing: -0.025em;
  margin-bottom: 0;
}
.page-header p {
  font-style: normal;
  color: var(--theme-color-muted);
  font-size: 1.0625rem;
}

/* story/prose override for blog */
.story {
  max-width: none;
  margin: 0;
}
.story h2 {
  display: none;
}
.story p {
  font-size: 1.0625rem;
  color: var(--theme-color-body-text);
  margin-bottom: 24px;
  line-height: 1.75;
}

main h2 {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 8px;
  font-family: var(--theme-font-heading);
  letter-spacing: -0.025em;
}
main > p {
  font-size: 1.0625rem;
  color: var(--theme-color-body-text);
  margin-bottom: 24px;
  line-height: 1.75;
}

.section {
  margin-top: 48px;
}
.section h3 {
  font-size: 0.6875rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--theme-color-primary);
  font-weight: 600;
  margin-bottom: 12px;
}
.section ul {
  list-style: none;
}
.section li {
  padding: 10px 0;
  border-bottom: 1px solid var(--theme-color-border-light);
  font-size: 0.9375rem;
  color: var(--theme-color-body-text);
  line-height: 1.6;
}
.section li:last-child {
  border-bottom: none;
}
.section li strong {
  color: var(--theme-text);
  font-weight: 600;
}

/* ---- Archive ---- */
main > h2 {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 48px;
  font-family: var(--theme-font-heading);
  letter-spacing: -0.025em;
}

.month-group {
  margin-bottom: 48px;
}
.month-group h3 {
  font-size: 0.6875rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--theme-color-primary);
  font-weight: 600;
  margin-bottom: 12px;
}

.archive-item {
  padding: 16px 0;
  border-bottom: 1px solid var(--theme-color-border-light);
}
.archive-item:first-child {
  border-top: 1px solid var(--theme-color-border-light);
}
.archive-item a {
  font-size: 1.0625rem;
  font-weight: 600;
  color: var(--theme-text);
  text-decoration: none;
  display: block;
  margin-bottom: 4px;
  transition: color 0.15s ease;
}
.archive-item a:hover {
  color: var(--theme-color-primary);
}
.archive-item .meta {
  font-size: 0.8125rem;
  color: var(--theme-color-muted);
  margin-bottom: 6px;
}
.archive-item .excerpt {
  font-size: 0.9375rem;
  color: var(--theme-color-body-text);
  margin-bottom: 10px;
  line-height: 1.6;
}
.archive-item .tags {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}
.archive-item .tag {
  font-size: 0.6875rem;
  padding: 3px 8px;
  background: var(--theme-color-surface);
  border: 1px solid var(--theme-color-border-light);
  color: var(--theme-color-muted);
  border-radius: 4px;
}

/* ---- Projects ---- */
main > .subtitle {
  font-size: 1.0625rem;
  color: var(--theme-color-muted);
  margin-top: -4px;
  margin-bottom: 40px;
  line-height: 1.6;
}

.projects-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}
.project-card {
  border: 1px solid var(--theme-color-border);
  border-radius: 10px;
  padding: 24px;
  background: var(--theme-bg);
  transition: border-color 0.15s ease;
}
.project-card:hover {
  border-color: var(--theme-color-muted-light);
}
.project-card h3 {
  font-size: 1.0625rem;
  font-weight: 700;
  margin-bottom: 6px;
  font-family: var(--theme-font-heading);
  letter-spacing: -0.01em;
}
.project-card h3 a {
  color: inherit;
  text-decoration: none;
  transition: color 0.15s ease;
}
.project-card h3 a:hover {
  color: var(--theme-color-primary);
}
.project-card .desc {
  font-size: 0.875rem;
  color: var(--theme-color-muted);
  margin-bottom: 16px;
  line-height: 1.6;
}
.project-card .tech {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  margin-bottom: 16px;
}
.project-card .tech span {
  font-size: 0.6875rem;
  padding: 3px 8px;
  background: var(--theme-color-surface);
  border: 1px solid var(--theme-color-border-light);
  color: var(--theme-color-muted);
  border-radius: 4px;
}
.project-card .bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.project-card .status {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.project-card .status.shipped {
  color: var(--theme-color-primary);
}
.project-card .status.in-progress {
  color: var(--theme-color-accent, #e67e22);
}
.project-card .status.archived {
  color: var(--theme-color-muted-light);
}
.project-card .link {
  font-size: 0.8125rem;
  color: var(--theme-color-muted);
  text-decoration: none;
  transition: color 0.15s ease;
}
.project-card .link:hover {
  color: var(--theme-color-primary);
}

/* ---- Override shared section padding for blog ---- */
section {
  padding: 0 24px;
}
`
