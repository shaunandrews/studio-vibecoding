// Fuego Collective — site-specific CSS
// All values use var(--theme-*) tokens

export const fuegoCSS = `
/* ---- Hide default site-nav and footer (Fuego uses custom header/footer sections) ---- */
.site-nav { display: none; }
body > footer { display: none; }

/* ---- Reset & Base ---- */
* { margin: 0; padding: 0; box-sizing: border-box; }
body {
  font-family: var(--theme-font-body);
  color: var(--theme-text);
  background: var(--theme-bg);
  line-height: var(--theme-line-height-normal);
}
h1, h2, h3, h4 {
  font-family: var(--theme-font-heading);
  text-transform: uppercase;
  letter-spacing: 0.02em;
}
a { color: var(--theme-color-primary); text-decoration: none; }

/* ---- Top Nav ---- */
.topnav {
  background: var(--theme-color-accent);
  padding: var(--theme-space-2) var(--theme-space-3);
  display: flex; align-items: center; justify-content: space-between;
}
.topnav .logo {
  color: var(--theme-color-surface);
  font-family: var(--theme-font-heading);
  font-size: 1.4rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}
.topnav .logo span { color: var(--theme-color-primary); }
.topnav nav { display: flex; gap: var(--theme-space-3); }
.topnav nav a {
  color: var(--theme-color-surface);
  font-size: var(--theme-font-size-small);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  opacity: 0.85;
  transition: opacity 0.2s;
}
.topnav nav a:hover { opacity: 1; color: var(--theme-color-primary); }

/* ---- Hero ---- */
.fuego-hero {
  position: relative;
  background: var(--theme-color-accent);
  color: var(--theme-color-surface);
  display: flex; align-items: center; justify-content: center;
  min-height: 520px; overflow: hidden;
}
.fuego-hero .hero-content {
  position: relative; z-index: 2;
  text-align: center;
  padding: var(--theme-space-8) var(--theme-space-3);
  max-width: 600px;
}
.fuego-hero .hero-img {
  position: absolute; right: 5%; top: 50%;
  transform: translateY(-50%); z-index: 1; opacity: 0.7;
}
.fuego-hero .hero-img img {
  height: 440px; object-fit: contain;
  filter: drop-shadow(0 0 60px rgba(230,50,38,0.3));
}
.fuego-hero h1 {
  font-size: var(--theme-font-size-hero);
  line-height: var(--theme-line-height-tight);
  margin-bottom: var(--theme-space-2);
}
.fuego-hero h1 .red { color: var(--theme-color-primary); }
.fuego-hero p {
  font-size: var(--theme-font-size-large);
  opacity: 0.85;
  margin-bottom: var(--theme-space-4);
}

/* ---- Buttons ---- */
.btn-primary {
  display: inline-block;
  background: var(--theme-color-primary);
  color: #fff;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  padding: 14px 36px;
  border-radius: 4px;
  font-size: var(--theme-font-size-medium);
  transition: background 0.2s;
  border: none; cursor: pointer;
}
.btn-primary:hover { background: var(--theme-color-primary-dark); }
.btn-outline {
  display: inline-block;
  border: 2px solid var(--theme-color-primary);
  color: var(--theme-color-primary);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  padding: 12px 32px;
  border-radius: 4px;
  font-size: var(--theme-font-size-medium);
  transition: all 0.2s;
  background: transparent; cursor: pointer;
  margin-left: 12px;
}
.btn-outline:hover { background: var(--theme-color-primary); color: #fff; }

/* ---- Product Lineup ---- */
.lineup { text-align: center; padding: var(--theme-space-8) var(--theme-space-3); }
.lineup h2 { font-size: var(--theme-font-size-xlarge); margin-bottom: var(--theme-space-1); }
.lineup .subtitle {
  color: var(--theme-color-muted);
  font-size: var(--theme-font-size-large);
  margin-bottom: var(--theme-space-5);
}
.lineup-grid {
  display: grid; grid-template-columns: repeat(3, 1fr);
  gap: var(--theme-space-4);
  max-width: var(--theme-content-width); margin: 0 auto;
}
.lineup-card {
  background: var(--theme-color-card);
  border-radius: 12px;
  padding: var(--theme-space-4);
  text-align: center;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  transition: transform 0.2s, box-shadow 0.2s;
}
.lineup-card:hover { transform: translateY(-4px); box-shadow: 0 8px 24px rgba(0,0,0,0.1); }
.lineup-card img { width: 100%; height: 220px; object-fit: contain; margin-bottom: var(--theme-space-2); }
.lineup-card h3 { font-size: var(--theme-font-size-large); margin-bottom: 4px; }
.lineup-card .heat { color: var(--theme-color-primary); font-size: var(--theme-font-size-medium); }
.lineup-card .price { font-size: var(--theme-font-size-large); font-weight: 700; margin-top: 8px; }

/* ---- Lifestyle ---- */
.lifestyle {
  background: var(--theme-color-accent);
  color: var(--theme-color-surface);
  display: flex; align-items: center; gap: var(--theme-space-6);
  padding: var(--theme-space-8) var(--theme-space-5);
}
.lifestyle img { width: 50%; border-radius: 8px; object-fit: cover; height: 400px; }
.lifestyle .lifestyle-text { flex: 1; }
.lifestyle .lifestyle-text h2 { font-size: var(--theme-font-size-xlarge); margin-bottom: var(--theme-space-2); }
.lifestyle .lifestyle-text p {
  font-size: var(--theme-font-size-medium);
  opacity: 0.85;
  margin-bottom: var(--theme-space-3);
  line-height: 1.7;
}

/* ---- Testimonials ---- */
.testimonials { padding: var(--theme-space-8) var(--theme-space-3); text-align: center; }
.testimonials h2 { font-size: var(--theme-font-size-xlarge); margin-bottom: var(--theme-space-5); }
.testimonial-grid {
  display: grid; grid-template-columns: repeat(3, 1fr);
  gap: var(--theme-space-4);
  max-width: var(--theme-content-width); margin: 0 auto;
}
.testimonial-card {
  background: var(--theme-color-card);
  border-radius: 12px;
  padding: var(--theme-space-4);
  box-shadow: 0 1px 4px rgba(0,0,0,0.06);
  text-align: left;
}
.testimonial-card .stars { color: var(--theme-color-secondary); font-size: 1.1rem; margin-bottom: 8px; }
.testimonial-card blockquote {
  font-style: italic;
  font-size: var(--theme-font-size-medium);
  line-height: 1.6;
  margin-bottom: 12px;
}
.testimonial-card .author {
  font-weight: 700;
  font-size: var(--theme-font-size-small);
  color: var(--theme-color-muted);
}

/* ---- Newsletter ---- */
.newsletter {
  background: var(--theme-color-primary);
  color: #fff; text-align: center;
  padding: var(--theme-space-8) var(--theme-space-3);
}
.newsletter h2 { font-size: var(--theme-font-size-xlarge); margin-bottom: var(--theme-space-1); }
.newsletter p { opacity: 0.9; margin-bottom: var(--theme-space-3); font-size: var(--theme-font-size-medium); }
.newsletter form { display: flex; gap: 8px; max-width: 480px; margin: 0 auto; }
.newsletter input {
  flex: 1; padding: 14px 16px; border: none; border-radius: 4px;
  font-size: var(--theme-font-size-medium);
}
.newsletter button {
  background: var(--theme-color-accent); color: #fff;
  font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em;
  padding: 14px 28px; border: none; border-radius: 4px;
  cursor: pointer; font-size: var(--theme-font-size-small);
}

/* ---- Fuego Footer ---- */
.fuego-footer {
  background: var(--theme-color-accent);
  color: var(--theme-color-surface);
  padding: var(--theme-space-6) var(--theme-space-3);
  text-align: center;
  font-size: var(--theme-font-size-small);
}
.fuego-footer .footer-inner { max-width: var(--theme-content-width); margin: 0 auto; }
.fuego-footer .brand {
  font-family: var(--theme-font-heading);
  font-size: 1.2rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 8px;
}
.fuego-footer .brand span { color: var(--theme-color-primary); }
.fuego-footer .links { margin: 12px 0; display: flex; justify-content: center; gap: var(--theme-space-3); }
.fuego-footer .links a { color: var(--theme-color-surface); opacity: 0.7; transition: opacity 0.2s; }
.fuego-footer .links a:hover { opacity: 1; }
.fuego-footer .socials { margin: 12px 0; display: flex; justify-content: center; gap: var(--theme-space-2); }
.fuego-footer .socials a { color: var(--theme-color-surface); opacity: 0.6; font-size: 0.85rem; }
.fuego-footer .wp { opacity: 0.4; margin-top: var(--theme-space-2); }

/* ---- Page Header (Dark) ---- */
.fuego-page-header {
  background: var(--theme-color-accent);
  color: var(--theme-color-surface);
  text-align: center;
  padding: var(--theme-space-6) var(--theme-space-3);
}
.fuego-page-header h1 { font-size: var(--theme-font-size-xlarge); }
.fuego-page-header p { opacity: 0.7; margin-top: 8px; }

/* ---- Filters ---- */
.filters {
  max-width: var(--theme-wide-width); margin: 0 auto;
  padding: var(--theme-space-3) var(--theme-space-3) 0;
  display: flex; gap: 8px; flex-wrap: wrap; align-items: center;
}
.filters label {
  font-weight: 700; font-size: var(--theme-font-size-small);
  text-transform: uppercase; letter-spacing: 0.04em; margin-right: 8px;
}
.filter-btn {
  padding: 8px 16px;
  border: 2px solid var(--theme-color-muted);
  border-radius: 20px;
  background: transparent;
  color: var(--theme-text);
  font-size: var(--theme-font-size-small);
  cursor: pointer; font-weight: 600;
  transition: all 0.2s;
}
.filter-btn:hover, .filter-btn.active {
  border-color: var(--theme-color-primary);
  color: var(--theme-color-primary);
  background: rgba(230,50,38,0.06);
}

/* ---- Product Grid (Shop) ---- */
.product-grid {
  max-width: var(--theme-wide-width); margin: 0 auto;
  display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: var(--theme-space-4);
  padding: var(--theme-space-4) var(--theme-space-3) var(--theme-space-8);
}
.product-card {
  background: var(--theme-color-card);
  border-radius: 12px; overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  transition: transform 0.2s, box-shadow 0.2s;
}
.product-card:hover { transform: translateY(-4px); box-shadow: 0 8px 24px rgba(0,0,0,0.1); }
.product-card .img-wrap {
  height: 200px; display: flex; align-items: center; justify-content: center;
  background: #f5f5f5; overflow: hidden;
}
.product-card .img-wrap img { height: 180px; object-fit: contain; }
.product-card .img-wrap .placeholder { width: 100%; height: 100%; }
.product-card .info { padding: var(--theme-space-3); }
.product-card h3 { font-size: 1rem; margin-bottom: 4px; }
.product-card .meta { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
.product-card .heat { color: var(--theme-color-primary); font-size: 0.85rem; }
.product-card .size { color: var(--theme-color-muted); font-size: var(--theme-font-size-small); }
.product-card .price-row { display: flex; justify-content: space-between; align-items: center; }
.product-card .price { font-size: var(--theme-font-size-large); font-weight: 700; }
.btn-cart {
  background: var(--theme-color-primary); color: #fff;
  border: none; padding: 8px 16px; border-radius: 4px;
  font-weight: 700; font-size: var(--theme-font-size-small);
  cursor: pointer; text-transform: uppercase; letter-spacing: 0.04em;
  transition: background 0.2s;
}
.btn-cart:hover { background: var(--theme-color-primary-dark); }

/* ---- Breadcrumb ---- */
.breadcrumb {
  max-width: var(--theme-content-width); margin: 0 auto;
  padding: var(--theme-space-2) var(--theme-space-3);
  font-size: var(--theme-font-size-small);
  color: var(--theme-color-muted);
}
.breadcrumb a { color: var(--theme-color-muted); }
.breadcrumb a:hover { color: var(--theme-color-primary); }

/* ---- Product Detail ---- */
.product-detail {
  max-width: var(--theme-content-width); margin: 0 auto;
  display: grid; grid-template-columns: 1fr 1fr; gap: var(--theme-space-6);
  padding: var(--theme-space-4) var(--theme-space-3) var(--theme-space-8);
}
.product-image {
  background: var(--theme-color-accent);
  border-radius: 12px;
  display: flex; align-items: center; justify-content: center;
  padding: var(--theme-space-4);
}
.product-image img {
  max-width: 100%; max-height: 420px; object-fit: contain;
  filter: drop-shadow(0 0 40px rgba(230,50,38,0.2));
}
.product-info h1 {
  font-size: var(--theme-font-size-xlarge);
  margin-bottom: 4px;
  line-height: var(--theme-line-height-tight);
}
.product-info .heat-badge {
  display: inline-block;
  background: var(--theme-color-primary); color: #fff;
  padding: 4px 12px; border-radius: 20px;
  font-size: var(--theme-font-size-small); font-weight: 700;
  margin-bottom: var(--theme-space-2);
}
.product-info .scoville {
  color: var(--theme-color-muted);
  font-size: var(--theme-font-size-small);
  margin-bottom: var(--theme-space-3);
}
.product-info .price {
  font-size: 2rem; font-weight: 700;
  color: var(--theme-color-primary);
  margin-bottom: var(--theme-space-3);
}
.product-info .desc { margin-bottom: var(--theme-space-3); line-height: 1.7; }
.product-info .desc p { margin-bottom: 12px; }

.qty-row { display: flex; align-items: center; gap: 12px; margin-bottom: var(--theme-space-3); }
.qty-row label { font-weight: 700; font-size: var(--theme-font-size-small); text-transform: uppercase; }
.qty-btn {
  width: 36px; height: 36px;
  border: 2px solid var(--theme-color-muted);
  border-radius: 6px; background: transparent;
  font-size: 1.2rem; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  color: var(--theme-text);
}
.qty-val { font-size: var(--theme-font-size-large); font-weight: 700; min-width: 24px; text-align: center; }
.btn-add {
  width: 100%;
  background: var(--theme-color-primary); color: #fff;
  border: none; padding: 16px; border-radius: 6px;
  font-size: var(--theme-font-size-medium); font-weight: 700;
  text-transform: uppercase; letter-spacing: 0.06em;
  cursor: pointer; transition: background 0.2s;
  margin-bottom: var(--theme-space-4);
}
.btn-add:hover { background: var(--theme-color-primary-dark); }

.details-grid {
  display: grid; grid-template-columns: 1fr 1fr;
  gap: var(--theme-space-3);
  margin-bottom: var(--theme-space-4);
}
.detail-box {
  background: var(--theme-color-card);
  border-radius: 8px;
  padding: var(--theme-space-3);
  box-shadow: 0 1px 3px rgba(0,0,0,0.06);
}
.detail-box h4 {
  font-size: var(--theme-font-size-small);
  color: var(--theme-color-primary);
  margin-bottom: 8px;
}
.detail-box ul { list-style: none; font-size: var(--theme-font-size-small); }
.detail-box li { padding: 2px 0; }

/* ---- Related Products ---- */
.also-like {
  max-width: var(--theme-content-width); margin: 0 auto;
  padding: 0 var(--theme-space-3) var(--theme-space-8);
}
.also-like h2 { font-size: var(--theme-font-size-xlarge); text-align: center; margin-bottom: var(--theme-space-4); }
.also-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--theme-space-4); }
.also-card {
  background: var(--theme-color-card);
  border-radius: 12px; overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  transition: transform 0.2s; text-align: center;
}
.also-card:hover { transform: translateY(-4px); }
.also-card .img-wrap {
  height: 180px; display: flex; align-items: center; justify-content: center;
  background: #f5f5f5;
}
.also-card img { height: 160px; object-fit: contain; }
.also-card .info { padding: var(--theme-space-3); }
.also-card h3 { font-size: 1rem; margin-bottom: 4px; }
.also-card .price { font-weight: 700; color: var(--theme-color-primary); }

/* ---- Reviews ---- */
.reviews {
  max-width: var(--theme-content-width); margin: 0 auto;
  padding: 0 var(--theme-space-3) var(--theme-space-8);
}
.reviews h2 { font-size: var(--theme-font-size-xlarge); text-align: center; margin-bottom: var(--theme-space-4); }
.review-list { display: flex; flex-direction: column; gap: var(--theme-space-3); }
.review-card {
  background: var(--theme-color-card);
  border-radius: 12px;
  padding: var(--theme-space-4);
  box-shadow: 0 1px 4px rgba(0,0,0,0.06);
}
.review-card .stars { color: var(--theme-color-secondary); margin-bottom: 8px; }
.review-card .body { margin-bottom: 8px; line-height: 1.6; }
.review-card .author {
  font-weight: 700;
  font-size: var(--theme-font-size-small);
  color: var(--theme-color-muted);
}
`
