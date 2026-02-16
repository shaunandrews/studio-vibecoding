// Blog-specific CSS for Shaun's Blog
// Clean minimal personal blog — typography-driven, generous whitespace

export const blogCSS = `
/* ---- Page wrapper — single constraint for alignment ---- */
body {
  max-width: var(--theme-content-width);
  margin: 0 auto;
  padding: 0 48px;
}

/* ---- Override shared nav to blog-style header ---- */
.site-nav {
  max-width: none;
  margin: 0;
  padding: 48px 0 40px;
  display: flex;
  align-items: baseline;
  justify-content: flex-start;
  border-bottom: 1px solid var(--theme-color-border);
  gap: 32px;
}
.site-nav .site-name {
  font-size: 1rem;
  font-weight: 700;
  font-family: var(--theme-font-heading);
  color: var(--theme-text);
  text-decoration: none;
  letter-spacing: -0.02em;
}
.site-nav .site-name:hover {
  color: var(--theme-color-primary);
}
.site-nav .nav-links {
  display: flex;
  gap: 24px;
  align-items: baseline;
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
  border-bottom: none;
}

/* ---- Override shared footer ---- */
footer {
  max-width: none;
  margin: 80px 0 0;
  padding: 32px 0 48px;
  text-align: left;
  font-size: 0.8125rem;
  color: var(--theme-color-muted-light);
  border-top: 1px solid var(--theme-color-border);
  line-height: 1.6;
}

/* ---- Main content area ---- */
main {
  max-width: none;
  margin: 0;
  padding: 48px 0 0;
}

/* ---- Featured post (homepage) ---- */
.featured {
  border-bottom: 1px solid var(--theme-color-border);
  padding-bottom: 48px;
  margin-bottom: 48px;
}
.featured .label {
  font-size: 0.6875rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--theme-color-primary);
  font-weight: 600;
  margin-bottom: 16px;
}
.featured h2 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 12px;
  font-family: var(--theme-font-heading);
  line-height: 1.1;
  letter-spacing: -0.03em;
  max-width: 85%;
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
  margin-bottom: 20px;
}
.featured .excerpt {
  font-size: 1rem;
  color: var(--theme-color-muted);
  line-height: 1.7;
  max-width: 90%;
}

/* ---- Post list (homepage) ---- */
.posts h3 {
  font-size: 0.6875rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--theme-color-muted-light);
  font-weight: 500;
  margin-bottom: 0;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--theme-color-border-light);
}
.post-item {
  padding: 20px 0;
  border-bottom: 1px solid var(--theme-color-border-light);
}
.post-item:first-of-type {
  border-top: none;
}
.post-item a {
  font-size: 1rem;
  font-weight: 600;
  color: var(--theme-text);
  text-decoration: none;
  transition: color 0.15s ease;
  letter-spacing: -0.01em;
}
.post-item a:hover {
  color: var(--theme-color-primary);
}
.post-item .meta {
  font-size: 0.8125rem;
  color: var(--theme-color-muted-light);
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
  color: var(--theme-color-muted-light);
  text-decoration: none;
  margin-bottom: 40px;
  transition: color 0.15s ease;
}
.back:hover {
  color: var(--theme-text);
}

article h2 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 16px;
  line-height: 1.1;
  letter-spacing: -0.03em;
  font-family: var(--theme-font-heading);
  max-width: 90%;
}
.byline {
  font-size: 0.8125rem;
  color: var(--theme-color-muted-light);
  margin-bottom: 48px;
}
.byline strong {
  color: var(--theme-color-muted);
  font-weight: 500;
}

article p {
  font-size: 1.0625rem;
  color: var(--theme-color-body-text);
  margin-bottom: 28px;
  line-height: 1.8;
}
article h3 {
  font-size: 1.125rem;
  font-weight: 700;
  margin-top: 56px;
  margin-bottom: 20px;
  font-family: var(--theme-font-heading);
  letter-spacing: -0.01em;
  color: var(--theme-text);
}

.pullquote {
  border-left: 2px solid var(--theme-color-border);
  padding: 0 0 0 24px;
  margin: 40px 0;
  font-size: 1.25rem;
  font-style: italic;
  color: var(--theme-color-muted);
  line-height: 1.5;
}

article pre {
  background: #fafafa;
  padding: 24px;
  border-radius: 6px;
  overflow-x: auto;
  margin: 36px 0;
  font-size: 0.8125rem;
  line-height: 1.7;
  color: var(--theme-text);
  border: none;
}
article code {
  font-family: 'SF Mono', 'Fira Code', 'Consolas', monospace;
  font-size: 0.875em;
}
article p code {
  background: #f5f5f5;
  padding: 2px 6px;
  border-radius: 3px;
  font-size: 0.85em;
}

.post-tags {
  margin-top: 56px;
  padding-top: 24px;
  border-top: 1px solid var(--theme-color-border-light);
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  align-items: center;
}
.post-tags span.label {
  font-size: 0.75rem;
  color: var(--theme-color-muted-light);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 500;
  margin-right: 4px;
}
.post-tags .tag {
  font-size: 0.75rem;
  padding: 4px 10px;
  background: #f7f7f7;
  color: var(--theme-color-muted);
  border-radius: 100px;
}

/* ---- About page ---- */
.page-header {
  text-align: left;
  padding: 0 0 8px;
}
.page-header h1 {
  font-size: 2rem;
  color: var(--theme-text);
  font-weight: 700;
  letter-spacing: -0.03em;
  margin-bottom: 0;
}
.page-header p {
  font-style: normal;
  color: var(--theme-color-muted);
  font-size: 1rem;
}

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
  margin-bottom: 28px;
  line-height: 1.8;
}

main h2 {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 8px;
  font-family: var(--theme-font-heading);
  letter-spacing: -0.03em;
}
main > p {
  font-size: 1.0625rem;
  color: var(--theme-color-body-text);
  margin-bottom: 28px;
  line-height: 1.8;
}

.section {
  margin-top: 56px;
}
.section h3 {
  font-size: 0.6875rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--theme-color-muted-light);
  font-weight: 500;
  margin-bottom: 0;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--theme-color-border-light);
}
.section ul {
  list-style: none;
}
.section li {
  padding: 12px 0;
  border-bottom: 1px solid var(--theme-color-border-light);
  font-size: 0.9375rem;
  color: var(--theme-color-muted);
  line-height: 1.6;
}
.section li:last-child {
  border-bottom: none;
}
.section li strong {
  color: var(--theme-text);
  font-weight: 500;
}

/* ---- Archive ---- */
main > h2 {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 48px;
  font-family: var(--theme-font-heading);
  letter-spacing: -0.03em;
}

.month-group {
  margin-bottom: 56px;
}
.month-group h3 {
  font-size: 0.6875rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--theme-color-muted-light);
  font-weight: 500;
  margin-bottom: 0;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--theme-color-border-light);
}

.archive-item {
  padding: 20px 0;
  border-bottom: 1px solid var(--theme-color-border-light);
}
.archive-item:first-child {
  border-top: none;
}
.archive-item a {
  font-size: 1rem;
  font-weight: 600;
  color: var(--theme-text);
  text-decoration: none;
  display: block;
  margin-bottom: 4px;
  transition: color 0.15s ease;
  letter-spacing: -0.01em;
}
.archive-item a:hover {
  color: var(--theme-color-primary);
}
.archive-item .meta {
  font-size: 0.8125rem;
  color: var(--theme-color-muted-light);
  margin-bottom: 8px;
}
.archive-item .excerpt {
  font-size: 0.9375rem;
  color: var(--theme-color-muted);
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
  background: #f7f7f7;
  color: var(--theme-color-muted);
  border-radius: 100px;
}

/* ---- Projects ---- */
main > .subtitle {
  font-size: 1rem;
  color: var(--theme-color-muted);
  margin-top: -4px;
  margin-bottom: 48px;
  line-height: 1.6;
}

.projects-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0;
}
.project-card {
  border: none;
  border-bottom: 1px solid var(--theme-color-border-light);
  border-radius: 0;
  padding: 28px 0;
  background: none;
}
.project-card:first-child {
  border-top: 1px solid var(--theme-color-border-light);
}
.project-card h3 {
  font-size: 1rem;
  font-weight: 600;
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
  font-size: 0.9375rem;
  color: var(--theme-color-muted);
  margin-bottom: 12px;
  line-height: 1.6;
}
.project-card .tech {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  margin-bottom: 12px;
}
.project-card .tech span {
  font-size: 0.6875rem;
  padding: 3px 8px;
  background: #f7f7f7;
  color: var(--theme-color-muted);
  border-radius: 100px;
}
.project-card .bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.project-card .status {
  font-size: 0.6875rem;
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
  color: var(--theme-color-muted-light);
  text-decoration: none;
  transition: color 0.15s ease;
}
.project-card .link:hover {
  color: var(--theme-color-primary);
}
`
