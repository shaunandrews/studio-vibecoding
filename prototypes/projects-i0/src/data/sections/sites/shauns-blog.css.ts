// Blog-specific CSS for Shaun's Blog
// Overrides shared nav/footer styles and adds blog-specific components

export const blogCSS = `
/* ---- Override shared nav to blog-style header ---- */
.site-nav {
  max-width: var(--theme-content-width);
  margin: 0 auto;
  padding: var(--theme-space-5) var(--theme-space-3) 0;
  justify-content: flex-end;
  gap: var(--theme-space-3);
  border-bottom: none;
}
.site-nav::before {
  content: "Shaun's Blog";
  font-size: 1.5rem;
  font-weight: 700;
  font-family: var(--theme-font-heading);
  color: var(--theme-text);
  margin-right: auto;
}
.site-nav a {
  color: var(--theme-text);
  text-transform: none;
  letter-spacing: 0;
  font-size: 0.9rem;
  font-weight: 400;
  padding: 0;
}
.site-nav a:hover { color: var(--theme-color-primary); }
.site-nav a.active { color: var(--theme-color-primary); border-bottom: none; }

/* ---- Override shared footer ---- */
footer {
  max-width: var(--theme-content-width);
  margin: 0 auto;
  text-align: left;
  font-size: var(--theme-font-size-small);
  color: var(--theme-color-muted-light);
  border-top: 1px solid var(--theme-color-border);
  line-height: 1.6;
}
footer p:nth-child(2) { display: none; }

/* ---- Main content area ---- */
main {
  max-width: var(--theme-content-width);
  margin: 0 auto;
  padding: var(--theme-space-6) var(--theme-space-3);
}

/* ---- Featured post (homepage) ---- */
.featured {
  border-bottom: 1px solid var(--theme-color-border);
  padding-bottom: var(--theme-space-5);
  margin-bottom: var(--theme-space-5);
}
.featured .label {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--theme-color-primary);
  font-weight: 600;
  margin-bottom: var(--theme-space-1);
}
.featured h2 {
  font-size: var(--theme-font-size-xlarge);
  font-weight: 700;
  margin-bottom: var(--theme-space-1);
  font-family: var(--theme-font-heading);
}
.featured h2 a { color: inherit; text-decoration: none; }
.featured h2 a:hover { color: var(--theme-color-primary); }
.featured .date {
  font-size: 0.85rem;
  color: var(--theme-color-muted);
  margin-bottom: 12px;
}
.featured .excerpt {
  font-size: 1.05rem;
  color: var(--theme-color-body-text);
}

/* ---- Post list (homepage) ---- */
.posts h3 {
  font-size: var(--theme-font-size-small);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--theme-color-muted);
  margin-bottom: 20px;
}
.post-item {
  padding: 20px 0;
  border-bottom: 1px solid var(--theme-color-border-light);
}
.post-item:first-of-type {
  border-top: 1px solid var(--theme-color-border-light);
}
.post-item a {
  font-size: var(--theme-font-size-large);
  font-weight: 600;
  color: var(--theme-text);
  text-decoration: none;
}
.post-item a:hover { color: var(--theme-color-primary); }
.post-item .meta {
  font-size: 0.85rem;
  color: var(--theme-color-muted);
  margin-top: 4px;
}
.post-item .meta .excerpt { color: var(--theme-color-muted); }

/* ---- Blog post (single) ---- */
.back {
  display: inline-block;
  font-size: 0.85rem;
  color: var(--theme-color-primary);
  text-decoration: none;
  margin-bottom: var(--theme-space-4);
}
.back:hover { text-decoration: underline; }

article h2 {
  font-size: var(--theme-font-size-hero);
  font-weight: 700;
  margin-bottom: 12px;
  line-height: var(--theme-line-height-tight);
  font-family: var(--theme-font-heading);
}
.byline {
  font-size: 0.85rem;
  color: var(--theme-color-muted);
  margin-bottom: var(--theme-space-5);
}
.byline strong { color: var(--theme-text); }

article p {
  font-size: 1.05rem;
  color: var(--theme-color-body-text);
  margin-bottom: var(--theme-space-3);
}
article h3 {
  font-size: var(--theme-font-size-large);
  font-weight: 700;
  margin-top: var(--theme-space-5);
  margin-bottom: var(--theme-space-2);
  font-family: var(--theme-font-heading);
}

.pullquote {
  border-left: 3px solid var(--theme-color-primary);
  padding: var(--theme-space-2) var(--theme-space-4);
  margin: var(--theme-space-4) 0;
  font-size: 1.2rem;
  font-style: italic;
  color: var(--theme-color-primary);
  line-height: 1.5;
}

article pre {
  background: var(--theme-color-surface);
  padding: var(--theme-space-3);
  border-radius: 6px;
  overflow-x: auto;
  margin: var(--theme-space-3) 0;
  font-size: 0.9rem;
  line-height: 1.5;
  color: var(--theme-text);
}
article code {
  font-family: 'SF Mono', 'Fira Code', monospace;
}

.post-tags {
  margin-top: var(--theme-space-5);
  padding-top: var(--theme-space-3);
  border-top: 1px solid var(--theme-color-border-light);
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  align-items: center;
}
.post-tags span.label {
  font-size: 0.8rem;
  color: var(--theme-color-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.post-tags .tag {
  font-size: 0.8rem;
  padding: 3px 10px;
  background: var(--theme-color-surface);
  color: var(--theme-color-muted);
  border-radius: 3px;
}

/* ---- About page ---- */
main h2 {
  font-size: var(--theme-font-size-xlarge);
  font-weight: 700;
  margin-bottom: var(--theme-space-3);
  font-family: var(--theme-font-heading);
}
main > p {
  font-size: 1.05rem;
  color: var(--theme-color-body-text);
  margin-bottom: 20px;
}

.section {
  margin-top: var(--theme-space-6);
}
.section h3 {
  font-size: var(--theme-font-size-small);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--theme-color-primary);
  font-weight: 600;
  margin-bottom: var(--theme-space-2);
}
.section ul { list-style: none; }
.section li {
  padding: var(--theme-space-1) 0;
  border-bottom: 1px solid var(--theme-color-border-light);
  font-size: 0.95rem;
  color: var(--theme-color-body-text);
}
.section li:last-child { border-bottom: none; }
.section li strong { color: var(--theme-text); }

/* ---- Archive ---- */
main > h2 {
  font-size: var(--theme-font-size-xlarge);
  font-weight: 700;
  margin-bottom: var(--theme-space-5);
  font-family: var(--theme-font-heading);
}

.month-group { margin-bottom: var(--theme-space-5); }
.month-group h3 {
  font-size: var(--theme-font-size-small);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--theme-color-primary);
  font-weight: 600;
  margin-bottom: var(--theme-space-2);
}

.archive-item {
  padding: 16px 0;
  border-bottom: 1px solid var(--theme-color-border-light);
}
.archive-item:first-child {
  border-top: 1px solid var(--theme-color-border-light);
}
.archive-item a {
  font-size: var(--theme-font-size-large);
  font-weight: 600;
  color: var(--theme-text);
  text-decoration: none;
  display: block;
  margin-bottom: 4px;
}
.archive-item a:hover { color: var(--theme-color-primary); }
.archive-item .meta {
  font-size: 0.85rem;
  color: var(--theme-color-muted);
  margin-bottom: 6px;
}
.archive-item .excerpt {
  font-size: 0.95rem;
  color: var(--theme-color-body-text);
  margin-bottom: 8px;
}
.archive-item .tags {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}
.archive-item .tag {
  font-size: 0.75rem;
  padding: 2px 8px;
  background: var(--theme-color-surface);
  color: var(--theme-color-muted);
  border-radius: 3px;
}

/* ---- Projects ---- */
main > .subtitle {
  font-size: 1.05rem;
  color: var(--theme-color-muted);
  margin-bottom: var(--theme-space-5);
}

.projects-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--theme-space-3);
}
.project-card {
  border: 1px solid var(--theme-color-border-light);
  border-radius: 8px;
  padding: var(--theme-space-4);
  background: var(--theme-color-card, var(--theme-bg));
}
.project-card h3 {
  font-size: var(--theme-font-size-large);
  font-weight: 700;
  margin-bottom: 6px;
  font-family: var(--theme-font-heading);
}
.project-card h3 a { color: inherit; text-decoration: none; }
.project-card h3 a:hover { color: var(--theme-color-primary); }
.project-card .desc {
  font-size: 0.95rem;
  color: var(--theme-color-body-text);
  margin-bottom: 12px;
}
.project-card .tech {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  margin-bottom: 12px;
}
.project-card .tech span {
  font-size: 0.75rem;
  padding: 2px 8px;
  background: var(--theme-color-surface);
  color: var(--theme-color-muted);
  border-radius: 3px;
}
.project-card .bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.project-card .status {
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.project-card .status.shipped { color: var(--theme-color-primary); }
.project-card .status.in-progress { color: var(--theme-color-accent, #e67e22); }
.project-card .status.archived { color: var(--theme-color-muted); }
.project-card .link {
  font-size: 0.85rem;
  color: var(--theme-color-primary);
  text-decoration: none;
}
.project-card .link:hover { text-decoration: underline; }
`
