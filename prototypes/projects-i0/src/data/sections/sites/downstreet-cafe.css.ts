export const downstreetCSS = `
/* Nav */
.site-nav {
  display: flex; justify-content: center; gap: var(--theme-space-4);
  padding: var(--theme-space-2) var(--theme-space-3);
  border-bottom: 1px solid var(--theme-color-muted);
}
.site-nav a {
  color: var(--theme-color-primary); text-decoration: none;
  font-size: var(--theme-font-size-small); font-weight: 500;
  text-transform: uppercase; letter-spacing: 0.08em;
  padding: var(--theme-space-1) 0; transition: color 0.2s;
}
.site-nav a:hover { color: var(--theme-color-accent); }
.site-nav a.active { color: var(--theme-color-accent); border-bottom: 1px solid var(--theme-color-accent); }

/* Footer */
footer {
  text-align: center; padding: var(--theme-space-5) var(--theme-space-3);
  font-size: var(--theme-font-size-small); color: var(--theme-color-muted);
  line-height: 1.8; border-top: 1px solid var(--theme-color-muted);
}
footer a { color: var(--theme-color-accent); text-decoration: none; }
footer .wp { opacity: 0.5; margin-top: var(--theme-space-1); }
`
