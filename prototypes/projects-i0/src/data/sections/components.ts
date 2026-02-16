// Component CSS for the section system.
// Extracted and deduplicated from all 6 page functions in downstreet-cafe.ts.
// All values use var(--theme-*) tokens — no hardcoded colors.

export const componentCSS = `
/* ---- Reset & Base ---- */
* { margin: 0; padding: 0; box-sizing: border-box; }
body {
  font-family: var(--theme-font-body);
  color: var(--theme-text);
  background: var(--theme-bg);
  line-height: var(--theme-line-height-normal);
}
h1, h2, h3 { font-family: var(--theme-font-heading); font-weight: 400; }

/* ---- Page Header ---- */
/* Used by hero-simple and as page headers on menu/about/events/gallery/order.
   Padding varies by context:
   - menu page: space-6 top, space-4 bottom
   - about/events/gallery: space-6 top, space-2 bottom
   - order page: space-5 top, space-1 bottom
   Default uses the most common variant (space-6 / space-2). */
.page-header {
  text-align: center; padding: var(--theme-space-6) var(--theme-space-3) var(--theme-space-2);
}
.page-header h1 {
  font-size: var(--theme-font-size-hero); color: var(--theme-color-primary-dark);
  margin-bottom: var(--theme-space-1);
}
.page-header p {
  font-size: var(--theme-font-size-large); color: var(--theme-color-secondary); font-style: italic;
}
/* Menu page variant — extra bottom padding */
.page-header--menu { padding-bottom: var(--theme-space-4); }
/* Order page variant — tighter padding */
.page-header--order { padding-top: var(--theme-space-5); padding-bottom: var(--theme-space-1); }

/* ---- Hero: Split ---- */
.split-hero {
  display: grid; grid-template-columns: 1.15fr 0.85fr;
  min-height: 420px;
}
.split-hero-img { overflow: hidden; }
.split-hero-img img { width: 100%; height: 100%; object-fit: cover; display: block; }
.split-hero-text {
  display: flex; flex-direction: column; justify-content: center;
  padding: var(--theme-space-8) var(--theme-space-6);
}
.split-hero-text h1 {
  font-size: var(--theme-font-size-hero); line-height: var(--theme-line-height-tight);
  color: var(--theme-color-primary-dark); margin-bottom: var(--theme-space-2);
}
.split-hero-text .tagline {
  font-size: var(--theme-font-size-large); color: var(--theme-color-secondary);
  font-style: italic; margin-bottom: var(--theme-space-4);
}
.split-hero-text .hours-brief {
  font-size: var(--theme-font-size-small); color: var(--theme-color-muted);
  line-height: 1.8;
}

/* ---- Hero: Fullwidth ---- */
.hero-image { width: 100%; height: 300px; object-fit: cover; display: block; }
/* About page uses a taller hero image (340px) — set via inline style or modifier */

/* ---- Image Strip ---- */
.image-strip {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--theme-space-2);
  max-width: var(--theme-wide-width); margin: 0 auto;
  padding: var(--theme-space-6) var(--theme-space-3);
}
.image-strip figure { margin: 0; }
.image-strip img { width: 100%; height: 220px; object-fit: cover; display: block; }
.image-strip figcaption {
  font-size: var(--theme-font-size-small); color: var(--theme-color-muted);
  margin-top: var(--theme-space-1); text-align: center;
}

/* ---- Image Gallery ---- */
section > h2 {
  text-align: center; font-size: var(--theme-font-size-xlarge);
  color: var(--theme-color-primary-dark); margin-bottom: var(--theme-space-1);
}
section > .subtitle {
  text-align: center; color: var(--theme-color-muted);
  margin-bottom: var(--theme-space-5); font-size: 1.05rem;
}
.gallery-grid {
  display: grid; grid-template-columns: repeat(4, 1fr); grid-auto-rows: 200px;
  gap: var(--theme-space-2);
}
.gallery-item {
  border-radius: 8px; overflow: hidden; position: relative;
  cursor: pointer; transition: transform 0.2s;
}
.gallery-item:hover { transform: scale(1.02); }
.gallery-item img { width: 100%; height: 100%; object-fit: cover; display: block; }
.gallery-item .caption {
  position: absolute; bottom: 0; left: 0; right: 0;
  background: rgba(0,0,0,0.5); color: #fff; font-size: 0.8rem; padding: 6px 10px;
  font-weight: 500; backdrop-filter: blur(4px);
  opacity: 0; transition: opacity 0.2s;
}
.gallery-item:hover .caption { opacity: 1; }
.gallery-item.wide { grid-column: span 2; }
.gallery-item.tall { grid-row: span 2; }
.gallery-item.featured { grid-column: span 2; grid-row: span 2; }

/* ---- Menu: Dotted Leader ---- */
/* Homepage "Menu Highlights" — two-column dotted-leader layout */
.menu-highlights {
  max-width: var(--theme-content-width); margin: 0 auto;
  padding: var(--theme-space-6) var(--theme-space-3) var(--theme-space-8);
}
.menu-highlights > h2 {
  text-align: center; font-size: var(--theme-font-size-xlarge);
  color: var(--theme-color-primary-dark); margin-bottom: var(--theme-space-1);
}
.menu-highlights > .rule {
  width: 40px; height: 1px; background: var(--theme-color-muted);
  margin: 0 auto var(--theme-space-5);
}
.menu-columns {
  display: grid; grid-template-columns: 1fr 1fr; gap: var(--theme-space-6);
}
.menu-col h3 {
  font-size: var(--theme-font-size-large); color: var(--theme-color-primary);
  text-transform: uppercase; letter-spacing: 0.06em; font-weight: 600;
  margin-bottom: var(--theme-space-2); padding-bottom: var(--theme-space-1);
  border-bottom: 1px solid var(--theme-color-muted);
}
.menu-line { display: flex; align-items: baseline; padding: 6px 0; }
.menu-line .name { white-space: nowrap; }
.menu-line .dots {
  flex: 1; border-bottom: 1px dotted var(--theme-color-muted);
  margin: 0 var(--theme-space-1); position: relative; top: -3px;
}
.menu-line .price {
  white-space: nowrap; color: var(--theme-color-secondary); font-weight: 500;
}

/* ---- Menu: Cards ---- */
/* Full menu page — card grid layout */
section {
  max-width: var(--theme-content-width); margin: 0 auto;
  padding: var(--theme-space-4) var(--theme-space-3) var(--theme-space-8);
}
/* About page sections use different vertical padding */
section.section--padded { padding: var(--theme-space-6) var(--theme-space-3); }

.note {
  text-align: center; max-width: 600px; margin: 0 auto var(--theme-space-5);
  color: var(--theme-color-muted); font-style: italic;
}
.menu-grid {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--theme-space-4);
}
.menu-card { background: var(--theme-color-card); border-radius: 8px; padding: 28px; }
.menu-card h3 {
  font-size: var(--theme-font-size-large); color: var(--theme-color-primary-dark);
  margin-bottom: var(--theme-space-2); padding-bottom: var(--theme-space-1);
  border-bottom: 1px solid var(--theme-color-muted);
  text-transform: uppercase; letter-spacing: 0.06em; font-weight: 600;
}
.menu-item { display: flex; justify-content: space-between; padding: 6px 0; }
.menu-item .price {
  color: var(--theme-color-secondary); font-weight: 500;
  white-space: nowrap; margin-left: 12px;
}

/* ---- Content: Prose ---- */
.story { max-width: 700px; margin: 0 auto; }
.story h2 {
  font-size: var(--theme-font-size-xlarge); color: var(--theme-color-primary-dark);
  margin-bottom: var(--theme-space-2);
}
.story p { margin-bottom: var(--theme-space-2); font-size: 1.05rem; }

/* ---- Content: Cards ---- */
.values-grid {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: var(--theme-space-4); margin-top: var(--theme-space-5);
}
.value-card { background: var(--theme-color-card); border-radius: 8px; padding: 28px; }
.value-card h3 {
  font-size: var(--theme-font-size-large); color: var(--theme-color-primary-dark);
  margin-bottom: 12px; padding-bottom: var(--theme-space-1);
  border-bottom: 1px solid var(--theme-color-muted); font-weight: 600;
}
.value-card p { font-size: 0.95rem; color: var(--theme-color-secondary); }

/* ---- Team Grid ---- */
.team-section { text-align: center; }
.team-section h2 {
  font-size: var(--theme-font-size-xlarge); color: var(--theme-color-primary-dark);
  margin-bottom: var(--theme-space-4);
}
.team-grid {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--theme-space-4);
}
.team-member {
  background: var(--theme-color-card); border-radius: 8px; padding: 28px; text-align: center;
}
.team-avatar {
  width: 80px; height: 80px; border-radius: 50%;
  background: var(--theme-color-accent); margin: 0 auto var(--theme-space-2);
  display: flex; align-items: center; justify-content: center;
  font-size: var(--theme-font-size-xlarge); color: var(--theme-color-surface);
  font-family: var(--theme-font-heading);
}
.team-member h3 { font-size: 1.1rem; margin-bottom: 4px; }
.team-member .role {
  color: var(--theme-color-accent); font-size: 0.9rem; font-weight: 600;
  margin-bottom: var(--theme-space-1);
}
.team-member p { font-size: 0.9rem; color: var(--theme-color-secondary); }

/* ---- Event List ---- */
.event-card {
  display: flex; gap: var(--theme-space-4); background: var(--theme-color-card);
  border-radius: 8px; padding: var(--theme-space-4); margin-bottom: var(--theme-space-4);
}
.event-date {
  flex-shrink: 0; width: 80px; text-align: center;
  background: var(--theme-color-accent); color: var(--theme-color-surface);
  border-radius: 8px; padding: var(--theme-space-2) var(--theme-space-1);
  display: flex; flex-direction: column; justify-content: center;
}
.event-date .month {
  font-size: 0.75rem; text-transform: uppercase; letter-spacing: 1px; opacity: 0.85;
}
.event-date .day {
  font-size: 2rem; font-weight: 700; line-height: 1.1;
  font-family: var(--theme-font-heading);
}
.event-date .dow { font-size: 0.7rem; text-transform: uppercase; opacity: 0.7; }
.event-body h3 { font-size: var(--theme-font-size-large); margin-bottom: 4px; }
.event-body .meta {
  font-size: 0.9rem; color: var(--theme-color-accent); font-weight: 600;
  margin-bottom: var(--theme-space-1);
}
.event-body p { font-size: 0.95rem; color: var(--theme-color-muted); }
.event-tag {
  display: inline-block; font-size: 0.75rem; font-weight: 600;
  padding: 2px 10px; border-radius: 20px;
  background: var(--theme-color-accent); color: var(--theme-color-surface);
  margin-bottom: 8px;
}

/* ---- Event Recurring ---- */
.recurring {
  background: var(--theme-color-card); border-radius: 8px;
  padding: var(--theme-space-5); margin-bottom: var(--theme-space-4);
}
.recurring h3 {
  font-size: 1.3rem; color: var(--theme-color-primary-dark);
  margin-bottom: var(--theme-space-2);
}
.recurring-grid {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--theme-space-3);
}
.recurring-item {
  padding: var(--theme-space-2); border-left: 3px solid var(--theme-color-accent);
  padding-left: var(--theme-space-2);
}
.recurring-item strong { display: block; margin-bottom: 2px; }
.recurring-item span { font-size: 0.9rem; color: var(--theme-color-muted); }

/* ---- CTA Banner ---- */
/* Used on homepage as community callout, and on about page as community section card */
.community {
  text-align: center;
  padding: var(--theme-space-6) var(--theme-space-3);
  background: var(--theme-color-card);
}
.community h2 {
  font-size: 1.75rem; color: var(--theme-color-primary-dark);
  margin-bottom: var(--theme-space-2);
}
.community p {
  font-size: var(--theme-font-size-large); color: var(--theme-color-secondary);
  letter-spacing: 0.02em; margin-bottom: 12px;
}
.community a {
  display: inline-block; margin-top: var(--theme-space-2);
  color: var(--theme-color-accent); text-decoration: none;
  font-size: var(--theme-font-size-medium); font-weight: 500;
  transition: opacity 0.2s;
}
.community a:hover { opacity: 0.7; }
/* About page community card variant — with border-radius and constrained width */
.community--card {
  border-radius: 8px; padding: var(--theme-space-5);
  max-width: 700px; margin: 0 auto; text-align: left;
}
.community--card p { letter-spacing: 0; }
.community ul { margin: 12px 0 0 20px; }
.community li { margin-bottom: var(--theme-space-1); }

/* ---- Order Layout ---- */
.order-info {
  text-align: center; padding: var(--theme-space-2) 0 var(--theme-space-4);
  color: var(--theme-color-muted); font-size: 0.9rem;
}
.order-info strong { color: var(--theme-text); }

.order-layout {
  max-width: var(--theme-content-width); margin: 0 auto;
  padding: var(--theme-space-5) var(--theme-space-3);
  display: grid; grid-template-columns: 1fr 320px; gap: var(--theme-space-5);
  align-items: start;
}
.category-tabs {
  display: flex; gap: var(--theme-space-1); margin-bottom: var(--theme-space-4);
  flex-wrap: wrap;
}
.category-tab {
  padding: 8px 20px; border-radius: 20px; font-size: 0.9rem; font-weight: 600;
  cursor: pointer; background: var(--theme-color-card); color: var(--theme-text);
  border: 2px solid transparent; transition: all 0.2s;
}
.category-tab:hover { border-color: var(--theme-color-accent); }
.category-tab.active { background: var(--theme-color-accent); color: var(--theme-color-surface); }

.menu-section-title {
  font-size: var(--theme-font-size-large); color: var(--theme-color-primary-dark);
  margin: var(--theme-space-4) 0 var(--theme-space-2); padding-bottom: 8px;
  border-bottom: 1px solid var(--theme-color-muted);
  text-transform: uppercase; letter-spacing: 0.06em; font-weight: 600;
}
.menu-section-title:first-of-type { margin-top: 0; }

.order-item {
  display: flex; justify-content: space-between; align-items: center;
  background: var(--theme-color-card); border-radius: 8px; padding: 16px 20px;
  margin-bottom: var(--theme-space-1); transition: background 0.2s;
}
.order-item:hover { background: var(--theme-bg); }
.order-item-info h4 {
  font-size: 1rem; margin-bottom: 2px;
  font-family: var(--theme-font-heading); font-weight: 400;
}
.order-item-info p { font-size: 0.85rem; color: var(--theme-color-muted); max-width: 380px; }
.order-item-action {
  display: flex; align-items: center; gap: 12px; flex-shrink: 0;
}
.order-item-action .price {
  font-weight: 500; color: var(--theme-color-secondary); font-size: 1rem;
  min-width: 50px; text-align: right;
}
.add-btn {
  width: 36px; height: 36px; border-radius: 50%;
  border: 2px solid var(--theme-color-accent); background: transparent;
  color: var(--theme-color-accent); font-size: 1.3rem; font-weight: 700;
  cursor: pointer; display: flex; align-items: center; justify-content: center;
  transition: all 0.2s; line-height: 1;
}
.add-btn:hover { background: var(--theme-color-accent); color: var(--theme-color-surface); }

.order-sidebar {
  background: var(--theme-color-card); border-radius: 8px;
  padding: var(--theme-space-4); position: sticky; top: 20px;
}
.order-sidebar h3 {
  font-size: 1.3rem; color: var(--theme-color-primary-dark);
  margin-bottom: var(--theme-space-2);
}
.sidebar-items { margin-bottom: var(--theme-space-3); }
.sidebar-item {
  display: flex; justify-content: space-between; padding: 8px 0;
  border-bottom: 1px solid var(--theme-color-muted); font-size: 0.9rem;
}
.sidebar-item .qty { color: var(--theme-color-muted); font-size: 0.8rem; }
.sidebar-subtotal {
  display: flex; justify-content: space-between;
  padding: var(--theme-space-1) 0; font-size: 0.9rem;
}
.sidebar-total {
  display: flex; justify-content: space-between;
  padding: var(--theme-space-2) 0 0; margin-top: var(--theme-space-1);
  border-top: 2px solid var(--theme-color-primary-dark);
  font-size: 1.1rem; font-weight: 700;
}
.checkout-btn {
  display: block; width: 100%; padding: 14px; margin-top: var(--theme-space-3);
  border: none; border-radius: 8px;
  background: var(--theme-color-accent); color: var(--theme-color-surface);
  font-size: 1rem; font-weight: 700; cursor: pointer;
  transition: opacity 0.2s; font-family: var(--theme-font-heading);
}
.checkout-btn:hover { opacity: 0.9; }
.pickup-note {
  font-size: 0.8rem; color: var(--theme-color-muted);
  text-align: center; margin-top: var(--theme-space-1);
}

@media (max-width: 768px) {
  .order-layout { grid-template-columns: 1fr; }
  .order-sidebar { position: static; }
}
`;
