export function homepage(themeCSS: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Downstreet Cafe</title>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap" rel="stylesheet">
<style>${themeCSS}</style>
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: var(--theme-font-body); color: var(--theme-text); background: var(--theme-bg); line-height: var(--theme-line-height-normal); }
h1, h2, h3 { font-family: var(--theme-font-heading); font-weight: 400; }

/* ---- Nav ---- */
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

/* ---- Split Hero ---- */
.split-hero {
  display: grid; grid-template-columns: 1.15fr 0.85fr;
  min-height: 420px; /* optical minimum */
}
.split-hero-img {
  overflow: hidden;
}
.split-hero-img img {
  width: 100%; height: 100%; object-fit: cover; display: block;
}
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

/* ---- Menu Highlights ---- */
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
.menu-line {
  display: flex; align-items: baseline; padding: 6px 0;
}
.menu-line .name { white-space: nowrap; }
.menu-line .dots {
  flex: 1; border-bottom: 1px dotted var(--theme-color-muted);
  margin: 0 var(--theme-space-1); position: relative; top: -3px; /* optical alignment for dotted leader */
}
.menu-line .price {
  white-space: nowrap; color: var(--theme-color-secondary); font-weight: 500;
}

/* ---- Community Callout ---- */
.community {
  text-align: center;
  padding: var(--theme-space-6) var(--theme-space-3);
  background: var(--theme-color-card);
}
.community p {
  font-size: var(--theme-font-size-large); color: var(--theme-color-secondary);
  letter-spacing: 0.02em;
}
.community a {
  display: inline-block; margin-top: var(--theme-space-2);
  color: var(--theme-color-accent); text-decoration: none;
  font-size: var(--theme-font-size-medium); font-weight: 500;
  transition: opacity 0.2s;
}
.community a:hover { opacity: 0.7; }

/* ---- Footer ---- */
footer {
  text-align: center; padding: var(--theme-space-5) var(--theme-space-3);
  font-size: var(--theme-font-size-small); color: var(--theme-color-muted);
  line-height: 1.8; border-top: 1px solid var(--theme-color-muted);
}
footer a { color: var(--theme-color-accent); text-decoration: none; }
footer .wp { opacity: 0.5; margin-top: var(--theme-space-1); }
</style>
</head>
<body>

<nav class="site-nav">
  <a href="#" class="active" onclick="window.parent.postMessage({type:'navigate',page:'homepage'},'*');return false">Home</a>
  <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'menu'},'*');return false">Menu</a>
  <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'about'},'*');return false">About</a>
  <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'events'},'*');return false">Events</a>
  <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'gallery'},'*');return false">Gallery</a>
  <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'order'},'*');return false">Order</a>
</nav>

<div class="split-hero">
  <div class="split-hero-img">
    <img src="/images/downstreet/hero-interior.png" alt="Downstreet Cafe interior with morning light">
  </div>
  <div class="split-hero-text">
    <h1>Downstreet<br>Cafe</h1>
    <p class="tagline">Your neighborhood coffee spot</p>
    <div class="hours-brief">
      Mon – Fri: 7 AM – 6 PM<br>
      Sat – Sun: 8 AM – 4 PM
    </div>
  </div>
</div>

<div class="image-strip">
  <figure>
    <img src="/images/downstreet/latte-art.png" alt="Latte art close-up">
    <figcaption>Latte art by Sophie</figcaption>
  </figure>
  <figure>
    <img src="/images/downstreet/pastries.png" alt="Fresh pastries on wooden board">
    <figcaption>Baked fresh daily</figcaption>
  </figure>
  <figure>
    <img src="/images/downstreet/barista-counter.png" alt="Barista behind espresso machine">
    <figcaption>The espresso bar</figcaption>
  </figure>
</div>

<div class="menu-highlights">
  <h2>Menu Highlights</h2>
  <div class="rule"></div>
  <div class="menu-columns">
    <div class="menu-col">
      <h3>Coffee</h3>
      <div class="menu-line"><span class="name">Espresso</span><span class="dots"></span><span class="price">$3.50</span></div>
      <div class="menu-line"><span class="name">Cappuccino</span><span class="dots"></span><span class="price">$4.75</span></div>
      <div class="menu-line"><span class="name">Pour Over</span><span class="dots"></span><span class="price">$5.00</span></div>
      <div class="menu-line"><span class="name">Cold Brew</span><span class="dots"></span><span class="price">$4.50</span></div>
    </div>
    <div class="menu-col">
      <h3>Pastries</h3>
      <div class="menu-line"><span class="name">Butter Croissant</span><span class="dots"></span><span class="price">$3.25</span></div>
      <div class="menu-line"><span class="name">Banana Bread</span><span class="dots"></span><span class="price">$3.50</span></div>
      <div class="menu-line"><span class="name">Blueberry Muffin</span><span class="dots"></span><span class="price">$3.00</span></div>
      <div class="menu-line"><span class="name">Cinnamon Roll</span><span class="dots"></span><span class="price">$4.25</span></div>
    </div>
  </div>
</div>

<div class="community">
  <p>Open Mic Fridays · Latte Art Workshops · Neighborhood Book Swaps</p>
  <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'events'},'*');return false">See what's happening →</a>
</div>

<footer>
  <p>42 Maple Street, Riverside, OR 97201</p>
  <p>(503) 555-0142 · <a href="#">hello@downstreetcafe.com</a></p>
  <p class="wp">Made with WordPress</p>
</footer>

</body>
</html>`;
}

export function menu(themeCSS: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Menu – Downstreet Cafe</title>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap" rel="stylesheet">
<style>${themeCSS}</style>
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: var(--theme-font-body); color: var(--theme-text); background: var(--theme-bg); line-height: var(--theme-line-height-normal); }
h1, h2, h3 { font-family: var(--theme-font-heading); font-weight: 400; }

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

.hero-image { width: 100%; height: 300px; object-fit: cover; display: block; }

.page-header {
  text-align: center; padding: var(--theme-space-6) var(--theme-space-3) var(--theme-space-4);
}
.page-header h1 {
  font-size: var(--theme-font-size-hero); color: var(--theme-color-primary-dark);
  margin-bottom: var(--theme-space-1);
}
.page-header p {
  font-size: var(--theme-font-size-large); color: var(--theme-color-secondary); font-style: italic;
}

section { max-width: var(--theme-content-width); margin: 0 auto; padding: var(--theme-space-4) var(--theme-space-3) var(--theme-space-8); }

.note { text-align: center; max-width: 600px; margin: 0 auto var(--theme-space-5); color: var(--theme-color-muted); font-style: italic; }

.menu-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: var(--theme-space-4); }
.menu-card { background: var(--theme-color-card); border-radius: 8px; padding: 28px; }
.menu-card h3 {
  font-size: var(--theme-font-size-large); color: var(--theme-color-primary-dark);
  margin-bottom: var(--theme-space-2); padding-bottom: var(--theme-space-1);
  border-bottom: 1px solid var(--theme-color-muted);
  text-transform: uppercase; letter-spacing: 0.06em; font-weight: 600;
}
.menu-item { display: flex; justify-content: space-between; padding: 6px 0; }
.menu-item .price { color: var(--theme-color-secondary); font-weight: 500; white-space: nowrap; margin-left: 12px; }

footer {
  text-align: center; padding: var(--theme-space-5) var(--theme-space-3);
  font-size: var(--theme-font-size-small); color: var(--theme-color-muted);
  line-height: 1.8; border-top: 1px solid var(--theme-color-muted);
}
footer a { color: var(--theme-color-accent); text-decoration: none; }
footer .wp { opacity: 0.5; margin-top: var(--theme-space-1); }
</style>
</head>
<body>

<nav class="site-nav">
  <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'homepage'},'*');return false">Home</a>
  <a href="#" class="active" onclick="window.parent.postMessage({type:'navigate',page:'menu'},'*');return false">Menu</a>
  <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'about'},'*');return false">About</a>
  <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'events'},'*');return false">Events</a>
  <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'gallery'},'*');return false">Gallery</a>
  <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'order'},'*');return false">Order</a>
</nav>

<img class="hero-image" src="/images/downstreet/food-breakfast.png" alt="Overhead breakfast spread">

<div class="page-header">
  <h1>Our Menu</h1>
  <p>Crafted with care, served with love</p>
</div>

<section>
  <p class="note">All coffee is roasted locally by Timber Ridge Roasters. Milk alternatives available for +$0.75.</p>
  <div class="menu-grid">

    <div class="menu-card">
      <h3>Coffee</h3>
      <div class="menu-item"><span>Espresso</span><span class="price">$3.50</span></div>
      <div class="menu-item"><span>Americano</span><span class="price">$3.75</span></div>
      <div class="menu-item"><span>Cappuccino</span><span class="price">$4.75</span></div>
      <div class="menu-item"><span>Latte</span><span class="price">$5.00</span></div>
      <div class="menu-item"><span>Flat White</span><span class="price">$5.00</span></div>
      <div class="menu-item"><span>Mocha</span><span class="price">$5.50</span></div>
      <div class="menu-item"><span>Pour Over</span><span class="price">$5.00</span></div>
      <div class="menu-item"><span>Cold Brew</span><span class="price">$4.50</span></div>
      <div class="menu-item"><span>Iced Latte</span><span class="price">$5.25</span></div>
      <div class="menu-item"><span>Affogato</span><span class="price">$5.75</span></div>
    </div>

    <div class="menu-card">
      <h3>Tea</h3>
      <div class="menu-item"><span>English Breakfast</span><span class="price">$3.00</span></div>
      <div class="menu-item"><span>Earl Grey</span><span class="price">$3.00</span></div>
      <div class="menu-item"><span>Green Tea</span><span class="price">$3.00</span></div>
      <div class="menu-item"><span>Chamomile</span><span class="price">$3.00</span></div>
      <div class="menu-item"><span>Chai Latte</span><span class="price">$4.75</span></div>
      <div class="menu-item"><span>Matcha Latte</span><span class="price">$5.25</span></div>
      <div class="menu-item"><span>Iced Tea</span><span class="price">$3.50</span></div>
    </div>

    <div class="menu-card">
      <h3>Pastries</h3>
      <div class="menu-item"><span>Butter Croissant</span><span class="price">$3.25</span></div>
      <div class="menu-item"><span>Almond Croissant</span><span class="price">$4.00</span></div>
      <div class="menu-item"><span>Chocolate Croissant</span><span class="price">$3.75</span></div>
      <div class="menu-item"><span>Banana Bread</span><span class="price">$3.50</span></div>
      <div class="menu-item"><span>Blueberry Muffin</span><span class="price">$3.00</span></div>
      <div class="menu-item"><span>Lemon Poppy Scone</span><span class="price">$3.50</span></div>
      <div class="menu-item"><span>Cinnamon Roll</span><span class="price">$4.25</span></div>
      <div class="menu-item"><span>Cookie (various)</span><span class="price">$2.50</span></div>
    </div>

    <div class="menu-card">
      <h3>Breakfast</h3>
      <div class="menu-item"><span>Avocado Toast</span><span class="price">$9.00</span></div>
      <div class="menu-item"><span>Egg &amp; Cheese Sandwich</span><span class="price">$7.50</span></div>
      <div class="menu-item"><span>Granola Bowl</span><span class="price">$8.00</span></div>
      <div class="menu-item"><span>Breakfast Burrito</span><span class="price">$9.50</span></div>
      <div class="menu-item"><span>Overnight Oats</span><span class="price">$6.50</span></div>
      <div class="menu-item"><span>Fruit &amp; Yogurt Parfait</span><span class="price">$7.00</span></div>
    </div>

    <div class="menu-card">
      <h3>Lunch</h3>
      <div class="menu-item"><span>Grilled Cheese</span><span class="price">$8.50</span></div>
      <div class="menu-item"><span>Turkey &amp; Brie Panini</span><span class="price">$10.50</span></div>
      <div class="menu-item"><span>Caprese Sandwich</span><span class="price">$9.50</span></div>
      <div class="menu-item"><span>Soup of the Day</span><span class="price">$6.00</span></div>
      <div class="menu-item"><span>Garden Salad</span><span class="price">$7.50</span></div>
      <div class="menu-item"><span>Grain Bowl</span><span class="price">$10.00</span></div>
      <div class="menu-item"><span>Quiche (daily rotation)</span><span class="price">$8.00</span></div>
    </div>

    <div class="menu-card">
      <h3>Other Drinks</h3>
      <div class="menu-item"><span>Fresh Squeezed OJ</span><span class="price">$4.50</span></div>
      <div class="menu-item"><span>Lemonade</span><span class="price">$3.50</span></div>
      <div class="menu-item"><span>Italian Soda</span><span class="price">$3.75</span></div>
      <div class="menu-item"><span>Hot Chocolate</span><span class="price">$4.50</span></div>
      <div class="menu-item"><span>Sparkling Water</span><span class="price">$2.50</span></div>
      <div class="menu-item"><span>Kombucha (draft)</span><span class="price">$5.00</span></div>
    </div>

  </div>
</section>

<footer>
  <p>42 Maple Street, Riverside, OR 97201</p>
  <p>(503) 555-0142 · <a href="#">hello@downstreetcafe.com</a></p>
  <p class="wp">Made with WordPress</p>
</footer>

</body>
</html>`;
}

export function about(themeCSS: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>About – Downstreet Cafe</title>
<style>${themeCSS}</style>
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: var(--theme-font-body); color: var(--theme-text); background: var(--theme-bg); line-height: var(--theme-line-height-normal); }
h1, h2, h3 { font-family: var(--theme-font-heading); }

.hero {
  background: linear-gradient(135deg, var(--theme-color-primary) 0%, var(--theme-color-primary-dark) 100%);
  color: var(--theme-color-surface);
  text-align: center;
  padding: var(--theme-space-10) var(--theme-space-3) var(--theme-space-8);
}
.hero h1 { font-size: var(--theme-font-size-hero); margin-bottom: var(--theme-space-1); }
.hero p { font-size: var(--theme-font-size-large); opacity: 0.9; }
.hero nav { margin-top: var(--theme-space-3); display: flex; justify-content: center; gap: var(--theme-space-3); }
.hero nav a { color: var(--theme-color-surface); text-decoration: none; font-size: var(--theme-font-size-medium); font-weight: 600; padding: var(--theme-space-1) var(--theme-space-2); border-radius: 6px; transition: background 0.2s; }
.hero nav a:hover { background: rgba(255,255,255,0.15); }
.hero nav a.active { background: rgba(255,255,255,0.2); border-bottom: 2px solid var(--theme-color-surface); }

section { max-width: var(--theme-content-width); margin: 0 auto; padding: var(--theme-space-8) var(--theme-space-3); }

.story { max-width: 700px; margin: 0 auto; }
.story h2 { font-size: var(--theme-font-size-xlarge); color: var(--theme-color-primary); margin-bottom: var(--theme-space-2); }
.story p { margin-bottom: var(--theme-space-2); font-size: 1.05rem; }

.values-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: var(--theme-space-4); margin-top: var(--theme-space-5); }
.value-card { background: var(--theme-color-card); border-radius: 12px; padding: 28px; box-shadow: 0 1px 3px rgba(0,0,0,0.06); }
.value-card h3 { font-size: var(--theme-font-size-large); color: var(--theme-text); margin-bottom: 12px; padding-bottom: var(--theme-space-1); border-bottom: 2px solid var(--theme-color-secondary); }
.value-card p { font-size: 0.95rem; color: #5a4a3a; }

.team-section { text-align: center; }
.team-section h2 { font-size: var(--theme-font-size-xlarge); color: var(--theme-color-primary); margin-bottom: var(--theme-space-4); }
.team-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: var(--theme-space-4); }
.team-member { background: var(--theme-color-card); border-radius: 12px; padding: 28px; box-shadow: 0 1px 3px rgba(0,0,0,0.06); text-align: center; }
.team-avatar { width: 80px; height: 80px; border-radius: 50%; background: linear-gradient(135deg, var(--theme-color-secondary), var(--theme-color-primary)); margin: 0 auto var(--theme-space-2); display: flex; align-items: center; justify-content: center; font-size: var(--theme-font-size-xlarge); color: var(--theme-color-surface); font-family: var(--theme-font-heading); }
.team-member h3 { font-size: 1.1rem; margin-bottom: 4px; }
.team-member .role { color: var(--theme-color-primary); font-size: 0.9rem; font-weight: 600; margin-bottom: var(--theme-space-1); }
.team-member p { font-size: 0.9rem; color: #5a4a3a; }

.community { background: var(--theme-color-card); border-radius: 12px; padding: var(--theme-space-5); box-shadow: 0 1px 3px rgba(0,0,0,0.06); max-width: 700px; margin: 0 auto; }
.community h2 { font-size: 1.75rem; color: var(--theme-color-primary); margin-bottom: var(--theme-space-2); }
.community p { margin-bottom: 12px; }
.community ul { margin: 12px 0 0 20px; }
.community li { margin-bottom: var(--theme-space-1); }

footer {
  background: var(--theme-color-accent); color: var(--theme-color-surface); text-align: center; padding: var(--theme-space-5) var(--theme-space-3);
  font-size: var(--theme-font-size-small); line-height: 1.8;
}
footer a { color: var(--theme-color-secondary); text-decoration: none; }
footer .wp { opacity: 0.5; margin-top: var(--theme-space-2); }
</style>
</head>
<body>

<div class="hero">
  <h1>Our Story</h1>
  <p>More than coffee — it's community</p>
  <nav>
    <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'homepage'},'*');return false">Home</a>
    <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'menu'},'*');return false">Menu</a>
    <a href="#" class="active" onclick="window.parent.postMessage({type:'navigate',page:'about'},'*');return false">About</a>
    <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'events'},'*');return false">Events</a>
    <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'gallery'},'*');return false">Gallery</a>
    <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'order'},'*');return false">Order</a>
  </nav>
</div>

<section>
  <div class="story">
    <h2>How It Started</h2>
    <p>Downstreet Cafe began in 2018 when partners Maya Chen and David Okafor decided that Riverside deserved a coffee shop that felt like a living room — warm, unhurried, and genuinely welcoming.</p>
    <p>Maya spent a decade in specialty coffee in Portland, from barista to roaster to café manager. David brought his background in community organizing and a deep belief that small businesses can be neighborhood anchors. Together they found the old bookshop space on Maple Street, kept the original wood floors, and opened the doors.</p>
    <p>Six years later, not much has changed about the feeling — just the number of regulars who call it home.</p>
  </div>
</section>

<section>
  <div class="story">
    <h2>What We Believe In</h2>
  </div>
  <div class="values-grid">
    <div class="value-card">
      <h3>Local Sourcing</h3>
      <p>Our coffee is roasted by Timber Ridge Roasters, just 20 miles up the valley. Pastries come from Maple Lane Bakery. Produce is sourced from three local farms. We believe good food doesn't need to travel far.</p>
    </div>
    <div class="value-card">
      <h3>Sustainability</h3>
      <p>Compostable cups and packaging, a zero single-use plastic policy, and a partnership with Riverside Community Compost. We're not perfect, but we're working on it every day.</p>
    </div>
    <div class="value-card">
      <h3>Fair Wages</h3>
      <p>Every member of our team earns a living wage with benefits. We believe that taking care of our people is the foundation of everything else we do.</p>
    </div>
  </div>
</section>

<section class="team-section">
  <h2>Meet the Team</h2>
  <div class="team-grid">
    <div class="team-member">
      <div class="team-avatar">M</div>
      <h3>Maya Chen</h3>
      <div class="role">Co-Owner &amp; Head Roaster</div>
      <p>Obsessed with pour-over technique and finding the perfect single origin. Always has a new blend in the works.</p>
    </div>
    <div class="team-member">
      <div class="team-avatar">D</div>
      <h3>David Okafor</h3>
      <div class="role">Co-Owner &amp; Operations</div>
      <p>The one who makes sure everything runs smoothly. Knows every regular by name — and their order.</p>
    </div>
    <div class="team-member">
      <div class="team-avatar">S</div>
      <h3>Sophie Lam</h3>
      <div class="role">Lead Barista</div>
      <p>Latte art champion and the friendliest face you'll see at 7 AM. Has been with us since day one.</p>
    </div>
    <div class="team-member">
      <div class="team-avatar">J</div>
      <h3>Jake Moreno</h3>
      <div class="role">Kitchen Manager</div>
      <p>Turned our lunch menu from an afterthought into the reason half the neighborhood shows up at noon.</p>
    </div>
  </div>
</section>

<section>
  <div class="community">
    <h2>In the Community</h2>
    <p>We think a café should give back to the neighborhood that supports it. Here's what we're involved in:</p>
    <ul>
      <li><strong>Open Mic Fridays</strong> — Local musicians, poets, and storytellers every Friday at 7 PM</li>
      <li><strong>Art Wall</strong> — Rotating exhibitions from Riverside artists, with pieces for sale</li>
      <li><strong>Coffee for a Cause</strong> — Every first Monday, all proceeds go to a local nonprofit</li>
      <li><strong>Study Hall Sundays</strong> — Free refills for students during exam season</li>
      <li><strong>Riverside Farmers Market</strong> — Find us at the Saturday market booth, May through October</li>
    </ul>
  </div>
</section>

<footer>
  <p>42 Maple Street, Riverside, OR 97201</p>
  <p>(503) 555-0142 · <a href="#">hello@downstreetcafe.com</a></p>
  <p class="wp">Made with WordPress</p>
</footer>

</body>
</html>`;
}

export function events(themeCSS: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Events – Downstreet Cafe</title>
<style>${themeCSS}</style>
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: var(--theme-font-body); color: var(--theme-text); background: var(--theme-bg); line-height: var(--theme-line-height-normal); }
h1, h2, h3 { font-family: var(--theme-font-heading); }

.hero {
  background: linear-gradient(135deg, var(--theme-color-primary) 0%, var(--theme-color-primary-dark) 100%);
  color: var(--theme-color-surface); text-align: center;
  padding: var(--theme-space-10) var(--theme-space-3) var(--theme-space-8);
}
.hero h1 { font-size: var(--theme-font-size-hero); margin-bottom: var(--theme-space-1); }
.hero p { font-size: var(--theme-font-size-large); opacity: 0.9; }
.hero nav { margin-top: var(--theme-space-3); display: flex; justify-content: center; gap: var(--theme-space-3); flex-wrap: wrap; }
.hero nav a { color: var(--theme-color-surface); text-decoration: none; font-size: var(--theme-font-size-medium); font-weight: 600; padding: var(--theme-space-1) var(--theme-space-2); border-radius: 6px; transition: background 0.2s; }
.hero nav a:hover { background: rgba(255,255,255,0.15); }
.hero nav a.active { background: rgba(255,255,255,0.2); border-bottom: 2px solid var(--theme-color-surface); }

section { max-width: var(--theme-content-width); margin: 0 auto; padding: var(--theme-space-8) var(--theme-space-3); }
section > h2 { text-align: center; font-size: var(--theme-font-size-xlarge); color: var(--theme-color-primary); margin-bottom: var(--theme-space-1); }
section > .subtitle { text-align: center; color: var(--theme-color-muted); margin-bottom: var(--theme-space-5); font-size: 1.05rem; }

.event-card {
  display: flex; gap: var(--theme-space-4); background: var(--theme-color-card); border-radius: 12px;
  padding: var(--theme-space-4); box-shadow: 0 1px 3px rgba(0,0,0,0.06); margin-bottom: var(--theme-space-4);
}
.event-date {
  flex-shrink: 0; width: 80px; text-align: center; background: var(--theme-color-primary); color: var(--theme-color-surface);
  border-radius: 10px; padding: var(--theme-space-2) var(--theme-space-1); display: flex; flex-direction: column; justify-content: center;
}
.event-date .month { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 1px; opacity: 0.85; }
.event-date .day { font-size: 2rem; font-weight: 700; line-height: 1.1; font-family: var(--theme-font-heading); }
.event-date .dow { font-size: 0.7rem; text-transform: uppercase; opacity: 0.7; }
.event-body h3 { font-size: var(--theme-font-size-large); margin-bottom: 4px; }
.event-body .meta { font-size: 0.9rem; color: var(--theme-color-primary); font-weight: 600; margin-bottom: var(--theme-space-1); }
.event-body p { font-size: 0.95rem; color: var(--theme-color-muted); }
.event-tag {
  display: inline-block; font-size: 0.75rem; font-weight: 600; padding: 2px 10px; border-radius: 20px;
  background: var(--theme-color-secondary); color: var(--theme-color-surface); margin-bottom: 8px;
}

.recurring {
  background: var(--theme-color-card); border-radius: 12px; padding: var(--theme-space-5);
  box-shadow: 0 1px 3px rgba(0,0,0,0.06); margin-bottom: var(--theme-space-4);
}
.recurring h3 { font-size: 1.3rem; color: var(--theme-color-primary); margin-bottom: var(--theme-space-2); }
.recurring-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: var(--theme-space-3); }
.recurring-item { padding: var(--theme-space-2); border-left: 3px solid var(--theme-color-secondary); padding-left: var(--theme-space-2); }
.recurring-item strong { display: block; margin-bottom: 2px; }
.recurring-item span { font-size: 0.9rem; color: var(--theme-color-muted); }

footer {
  background: var(--theme-color-accent); color: var(--theme-color-surface); text-align: center; padding: var(--theme-space-5) var(--theme-space-3);
  font-size: var(--theme-font-size-small); line-height: 1.8;
}
footer a { color: var(--theme-color-secondary); text-decoration: none; }
footer .wp { opacity: 0.5; margin-top: var(--theme-space-2); }
</style>
</head>
<body>

<div class="hero">
  <h1>Events</h1>
  <p>What's happening at Downstreet</p>
  <nav>
    <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'homepage'},'*');return false">Home</a>
    <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'menu'},'*');return false">Menu</a>
    <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'about'},'*');return false">About</a>
    <a href="#" class="active" onclick="window.parent.postMessage({type:'navigate',page:'events'},'*');return false">Events</a>
    <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'gallery'},'*');return false">Gallery</a>
    <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'order'},'*');return false">Order</a>
  </nav>
</div>

<section>
  <div class="recurring">
    <h3>Every Week at Downstreet</h3>
    <div class="recurring-grid">
      <div class="recurring-item">
        <strong>Open Mic Fridays</strong>
        <span>Every Friday, 7:00 – 9:30 PM. Sign-ups start at 6:30. All genres welcome — music, poetry, comedy, storytelling.</span>
      </div>
      <div class="recurring-item">
        <strong>Study Hall Sundays</strong>
        <span>Every Sunday, 10 AM – 4 PM. Free refills on drip coffee for students. Extra outlets, quiet vibes.</span>
      </div>
      <div class="recurring-item">
        <strong>Saturday Morning Vinyl</strong>
        <span>Every Saturday, 8 – 11 AM. We spin records from our collection. Bring your own to share.</span>
      </div>
      <div class="recurring-item">
        <strong>Coffee for a Cause</strong>
        <span>First Monday of every month. 100% of proceeds go to a local nonprofit. This month: Riverside Youth Arts.</span>
      </div>
    </div>
  </div>
</section>

<section>
  <h2>Upcoming Events</h2>
  <p class="subtitle">Mark your calendar — we'd love to see you there</p>

  <div class="event-card">
    <div class="event-date"><span class="month">Feb</span><span class="day">21</span><span class="dow">Fri</span></div>
    <div class="event-body">
      <span class="event-tag">Live Music</span>
      <h3>The Ponderosa Sessions</h3>
      <div class="meta">7:00 PM – 9:30 PM · Free</div>
      <p>Local folk duo The Ponderosa Sessions bring their warm acoustic sound for an intimate evening set. Expect originals, classic covers, and good coffee. Seating is first-come, first-served — arrive early for the best spot by the window.</p>
    </div>
  </div>

  <div class="event-card">
    <div class="event-date"><span class="month">Feb</span><span class="day">23</span><span class="dow">Sun</span></div>
    <div class="event-body">
      <span class="event-tag">Workshop</span>
      <h3>Latte Art 101</h3>
      <div class="meta">2:00 PM – 4:00 PM · $25 per person</div>
      <p>Join lead barista Sophie Lam for a hands-on latte art workshop. Learn the basics of milk steaming, free-pour hearts and rosettas, and leave with skills to impress at home. All materials provided. Limited to 12 participants.</p>
    </div>
  </div>

  <div class="event-card">
    <div class="event-date"><span class="month">Mar</span><span class="day">1</span><span class="dow">Sat</span></div>
    <div class="event-body">
      <span class="event-tag">Art</span>
      <h3>Art Wall Opening: "Morning Light" by Kenji Watanabe</h3>
      <div class="meta">5:00 PM – 8:00 PM · Free</div>
      <p>Riverside watercolorist Kenji Watanabe debuts a new series of café and cityscape paintings inspired by early mornings in the neighborhood. Wine and light bites provided. Pieces available for purchase — 20% of sales support Riverside Arts Council.</p>
    </div>
  </div>

  <div class="event-card">
    <div class="event-date"><span class="month">Mar</span><span class="day">8</span><span class="dow">Sat</span></div>
    <div class="event-body">
      <span class="event-tag">Tasting</span>
      <h3>Single Origin Tasting: Ethiopian Yirgacheffe</h3>
      <div class="meta">11:00 AM – 12:30 PM · $15 per person</div>
      <p>Maya walks you through three preparations of the same Ethiopian Yirgacheffe — pour over, espresso, and cold brew. Explore how method changes flavor. Includes tasting notes card and a half-pound bag to take home.</p>
    </div>
  </div>

  <div class="event-card">
    <div class="event-date"><span class="month">Mar</span><span class="day">15</span><span class="dow">Sat</span></div>
    <div class="event-body">
      <span class="event-tag">Community</span>
      <h3>Neighborhood Book Swap</h3>
      <div class="meta">10:00 AM – 2:00 PM · Free</div>
      <p>Bring books you've finished, take ones that catch your eye. No limit, no rules — just the honor system and good taste. We'll have a cozy reading corner set up and a special book-swap-day drink: the Paperback Mocha.</p>
    </div>
  </div>

  <div class="event-card">
    <div class="event-date"><span class="month">Mar</span><span class="day">22</span><span class="dow">Sat</span></div>
    <div class="event-body">
      <span class="event-tag">Seasonal</span>
      <h3>Spring Menu Launch Party</h3>
      <div class="meta">4:00 PM – 7:00 PM · Free</div>
      <p>We're unveiling our spring menu with new drinks, seasonal pastries, and a refreshed lunch lineup. Free samples of everything new. Live acoustic set by local guitarist Ana Reyes. First 50 guests get a Downstreet tote bag.</p>
    </div>
  </div>

</section>

<footer>
  <p>42 Maple Street, Riverside, OR 97201</p>
  <p>(503) 555-0142 · <a href="#">hello@downstreetcafe.com</a></p>
  <p class="wp">Made with WordPress</p>
</footer>

</body>
</html>`;
}

export function gallery(themeCSS: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Gallery – Downstreet Cafe</title>
<style>${themeCSS}</style>
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: var(--theme-font-body); color: var(--theme-text); background: var(--theme-bg); line-height: var(--theme-line-height-normal); }
h1, h2, h3 { font-family: var(--theme-font-heading); }

.hero {
  background: linear-gradient(135deg, var(--theme-color-primary) 0%, var(--theme-color-primary-dark) 100%);
  color: var(--theme-color-surface); text-align: center;
  padding: var(--theme-space-10) var(--theme-space-3) var(--theme-space-8);
}
.hero h1 { font-size: var(--theme-font-size-hero); margin-bottom: var(--theme-space-1); }
.hero p { font-size: var(--theme-font-size-large); opacity: 0.9; }
.hero nav { margin-top: var(--theme-space-3); display: flex; justify-content: center; gap: var(--theme-space-3); flex-wrap: wrap; }
.hero nav a { color: var(--theme-color-surface); text-decoration: none; font-size: var(--theme-font-size-medium); font-weight: 600; padding: var(--theme-space-1) var(--theme-space-2); border-radius: 6px; transition: background 0.2s; }
.hero nav a:hover { background: rgba(255,255,255,0.15); }
.hero nav a.active { background: rgba(255,255,255,0.2); border-bottom: 2px solid var(--theme-color-surface); }

section { max-width: var(--theme-content-width); margin: 0 auto; padding: var(--theme-space-8) var(--theme-space-3); }
section > h2 { text-align: center; font-size: var(--theme-font-size-xlarge); color: var(--theme-color-primary); margin-bottom: var(--theme-space-1); }
section > .subtitle { text-align: center; color: var(--theme-color-muted); margin-bottom: var(--theme-space-5); font-size: 1.05rem; }

.gallery-grid {
  display: grid; grid-template-columns: repeat(4, 1fr); grid-auto-rows: 200px; gap: var(--theme-space-2);
}
.gallery-item {
  border-radius: 10px; overflow: hidden; position: relative; display: flex; align-items: flex-end;
  padding: var(--theme-space-2); cursor: pointer; transition: transform 0.2s;
}
.gallery-item:hover { transform: scale(1.02); }
.gallery-item span {
  background: rgba(0,0,0,0.5); color: #fff; font-size: 0.8rem; padding: 4px 10px; border-radius: 6px;
  font-weight: 500; backdrop-filter: blur(4px);
}
.gallery-item.wide { grid-column: span 2; }
.gallery-item.tall { grid-row: span 2; }
.gallery-item.featured { grid-column: span 2; grid-row: span 2; }

footer {
  background: var(--theme-color-accent); color: var(--theme-color-surface); text-align: center; padding: var(--theme-space-5) var(--theme-space-3);
  font-size: var(--theme-font-size-small); line-height: 1.8;
}
footer a { color: var(--theme-color-secondary); text-decoration: none; }
footer .wp { opacity: 0.5; margin-top: var(--theme-space-2); }
</style>
</head>
<body>

<div class="hero">
  <h1>Gallery</h1>
  <p>A peek inside Downstreet</p>
  <nav>
    <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'homepage'},'*');return false">Home</a>
    <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'menu'},'*');return false">Menu</a>
    <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'about'},'*');return false">About</a>
    <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'events'},'*');return false">Events</a>
    <a href="#" class="active" onclick="window.parent.postMessage({type:'navigate',page:'gallery'},'*');return false">Gallery</a>
    <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'order'},'*');return false">Order</a>
  </nav>
</div>

<section>
  <h2>The Space</h2>
  <p class="subtitle">Our corner of Maple Street</p>
  <div class="gallery-grid">
    <div class="gallery-item featured" style="background: linear-gradient(135deg, #8B6F47 0%, #D4A574 50%, #F5E6D3 100%)"><span>Morning light through the front windows</span></div>
    <div class="gallery-item" style="background: linear-gradient(180deg, #5C4033 0%, #8B6F47 100%)"><span>Original hardwood floors</span></div>
    <div class="gallery-item" style="background: linear-gradient(135deg, #2C1810 0%, #5C4033 100%)"><span>The espresso bar</span></div>
    <div class="gallery-item wide" style="background: linear-gradient(90deg, #D4A574 0%, #F5DEB3 50%, #FFF8DC 100%)"><span>Communal table — seats 12</span></div>
    <div class="gallery-item" style="background: linear-gradient(135deg, #8FBC8F 0%, #556B2F 100%)"><span>The reading nook</span></div>
    <div class="gallery-item tall" style="background: linear-gradient(180deg, #DEB887 0%, #8B4513 100%)"><span>Bookshelf wall — take one, leave one</span></div>
    <div class="gallery-item" style="background: linear-gradient(135deg, #F0E68C 0%, #DAA520 100%)"><span>Sidewalk seating in summer</span></div>
    <div class="gallery-item" style="background: linear-gradient(135deg, #BC8F8F 0%, #8B4513 100%)"><span>Exposed brick detail</span></div>
  </div>
</section>

<section>
  <h2>The Food &amp; Drinks</h2>
  <p class="subtitle">Made fresh, every single day</p>
  <div class="gallery-grid">
    <div class="gallery-item wide" style="background: linear-gradient(135deg, #3E2723 0%, #6D4C41 40%, #D7CCC8 100%)"><span>Sophie's signature rosetta</span></div>
    <div class="gallery-item" style="background: linear-gradient(180deg, #FFF3E0 0%, #FFE0B2 50%, #FFCC80 100%)"><span>Fresh croissants from Maple Lane</span></div>
    <div class="gallery-item" style="background: linear-gradient(135deg, #EFEBE9 0%, #A1887F 100%)"><span>Cappuccino with tulip art</span></div>
    <div class="gallery-item tall" style="background: linear-gradient(180deg, #F9FBE7 0%, #AED581 50%, #689F38 100%)"><span>Garden salad with house vinaigrette</span></div>
    <div class="gallery-item" style="background: linear-gradient(135deg, #FBE9E7 0%, #FF8A65 100%)"><span>The breakfast burrito</span></div>
    <div class="gallery-item" style="background: linear-gradient(135deg, #4E342E 0%, #795548 100%)"><span>Cold brew on tap</span></div>
    <div class="gallery-item wide" style="background: linear-gradient(90deg, #F3E5F5 0%, #CE93D8 50%, #AB47BC 100%)"><span>Lavender latte — spring special</span></div>
  </div>
</section>

<section>
  <h2>Community Moments</h2>
  <p class="subtitle">The people who make this place special</p>
  <div class="gallery-grid">
    <div class="gallery-item" style="background: linear-gradient(135deg, #FFF9C4 0%, #FFC107 100%)"><span>Open Mic Friday night</span></div>
    <div class="gallery-item featured" style="background: linear-gradient(135deg, #E8EAF6 0%, #7986CB 50%, #3F51B5 100%)"><span>Art wall opening — packed house</span></div>
    <div class="gallery-item" style="background: linear-gradient(135deg, #E0F2F1 0%, #80CBC4 100%)"><span>Latte art workshop group</span></div>
    <div class="gallery-item" style="background: linear-gradient(135deg, #FFF3E0 0%, #FFB74D 100%)"><span>Farmers market booth</span></div>
    <div class="gallery-item wide" style="background: linear-gradient(90deg, #FFEBEE 0%, #EF9A9A 50%, #E57373 100%)"><span>Coffee for a Cause — record turnout</span></div>
    <div class="gallery-item" style="background: linear-gradient(135deg, #E8F5E9 0%, #66BB6A 100%)"><span>Study Hall Sundays</span></div>
  </div>
</section>

<footer>
  <p>42 Maple Street, Riverside, OR 97201</p>
  <p>(503) 555-0142 · <a href="#">hello@downstreetcafe.com</a></p>
  <p class="wp">Made with WordPress</p>
</footer>

</body>
</html>`;
}

export function order(themeCSS: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Order Online – Downstreet Cafe</title>
<style>${themeCSS}</style>
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: var(--theme-font-body); color: var(--theme-text); background: var(--theme-bg); line-height: var(--theme-line-height-normal); }
h1, h2, h3 { font-family: var(--theme-font-heading); }

.hero {
  background: linear-gradient(135deg, var(--theme-color-primary) 0%, var(--theme-color-primary-dark) 100%);
  color: var(--theme-color-surface); text-align: center;
  padding: var(--theme-space-10) var(--theme-space-3) var(--theme-space-8);
}
.hero h1 { font-size: var(--theme-font-size-hero); margin-bottom: var(--theme-space-1); }
.hero p { font-size: var(--theme-font-size-large); opacity: 0.9; }
.hero nav { margin-top: var(--theme-space-3); display: flex; justify-content: center; gap: var(--theme-space-3); flex-wrap: wrap; }
.hero nav a { color: var(--theme-color-surface); text-decoration: none; font-size: var(--theme-font-size-medium); font-weight: 600; padding: var(--theme-space-1) var(--theme-space-2); border-radius: 6px; transition: background 0.2s; }
.hero nav a:hover { background: rgba(255,255,255,0.15); }
.hero nav a.active { background: rgba(255,255,255,0.2); border-bottom: 2px solid var(--theme-color-surface); }

.order-layout {
  max-width: var(--theme-content-width); margin: 0 auto; padding: var(--theme-space-5) var(--theme-space-3);
  display: grid; grid-template-columns: 1fr 320px; gap: var(--theme-space-5); align-items: start;
}
.category-tabs { display: flex; gap: var(--theme-space-1); margin-bottom: var(--theme-space-4); flex-wrap: wrap; }
.category-tab {
  padding: 8px 20px; border-radius: 20px; font-size: 0.9rem; font-weight: 600; cursor: pointer;
  background: var(--theme-color-card); color: var(--theme-text); border: 2px solid transparent; transition: all 0.2s;
}
.category-tab:hover { border-color: var(--theme-color-secondary); }
.category-tab.active { background: var(--theme-color-primary); color: var(--theme-color-surface); }

.menu-section-title { font-size: var(--theme-font-size-large); color: var(--theme-color-primary); margin: var(--theme-space-4) 0 var(--theme-space-2); padding-bottom: 8px; border-bottom: 2px solid var(--theme-color-secondary); }
.menu-section-title:first-of-type { margin-top: 0; }

.order-item {
  display: flex; justify-content: space-between; align-items: center;
  background: var(--theme-color-card); border-radius: 10px; padding: 16px 20px;
  margin-bottom: var(--theme-space-1); box-shadow: 0 1px 2px rgba(0,0,0,0.04); transition: box-shadow 0.2s;
}
.order-item:hover { box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
.order-item-info h4 { font-size: 1rem; margin-bottom: 2px; font-family: var(--theme-font-heading); }
.order-item-info p { font-size: 0.85rem; color: var(--theme-color-muted); max-width: 380px; }
.order-item-action { display: flex; align-items: center; gap: 12px; flex-shrink: 0; }
.order-item-action .price { font-weight: 700; color: var(--theme-color-primary); font-size: 1rem; min-width: 50px; text-align: right; }
.add-btn {
  width: 36px; height: 36px; border-radius: 50%; border: 2px solid var(--theme-color-primary); background: transparent;
  color: var(--theme-color-primary); font-size: 1.3rem; font-weight: 700; cursor: pointer; display: flex; align-items: center; justify-content: center;
  transition: all 0.2s; line-height: 1;
}
.add-btn:hover { background: var(--theme-color-primary); color: var(--theme-color-surface); }

.order-sidebar {
  background: var(--theme-color-card); border-radius: 12px; padding: var(--theme-space-4);
  box-shadow: 0 1px 3px rgba(0,0,0,0.06); position: sticky; top: 20px;
}
.order-sidebar h3 { font-size: 1.3rem; color: var(--theme-color-primary); margin-bottom: var(--theme-space-2); }
.sidebar-items { margin-bottom: var(--theme-space-3); }
.sidebar-item { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid rgba(0,0,0,0.06); font-size: 0.9rem; }
.sidebar-item .qty { color: var(--theme-color-muted); font-size: 0.8rem; }
.sidebar-subtotal { display: flex; justify-content: space-between; padding: var(--theme-space-1) 0; font-size: 0.9rem; }
.sidebar-total { display: flex; justify-content: space-between; padding: var(--theme-space-2) 0 0; margin-top: var(--theme-space-1); border-top: 2px solid var(--theme-color-primary); font-size: 1.1rem; font-weight: 700; }
.checkout-btn {
  display: block; width: 100%; padding: 14px; margin-top: var(--theme-space-3); border: none; border-radius: 10px;
  background: var(--theme-color-primary); color: var(--theme-color-surface); font-size: 1rem; font-weight: 700;
  cursor: pointer; transition: opacity 0.2s; font-family: var(--theme-font-heading);
}
.checkout-btn:hover { opacity: 0.9; }
.pickup-note { font-size: 0.8rem; color: var(--theme-color-muted); text-align: center; margin-top: var(--theme-space-1); }
.order-info { text-align: center; padding: var(--theme-space-2) 0 var(--theme-space-4); color: var(--theme-color-muted); font-size: 0.9rem; }
.order-info strong { color: var(--theme-text); }

footer {
  background: var(--theme-color-accent); color: var(--theme-color-surface); text-align: center; padding: var(--theme-space-5) var(--theme-space-3);
  font-size: var(--theme-font-size-small); line-height: 1.8;
}
footer a { color: var(--theme-color-secondary); text-decoration: none; }
footer .wp { opacity: 0.5; margin-top: var(--theme-space-2); }

@media (max-width: 768px) {
  .order-layout { grid-template-columns: 1fr; }
  .order-sidebar { position: static; }
}
</style>
</head>
<body>

<div class="hero">
  <h1>Order Online</h1>
  <p>Pickup in 15–20 minutes</p>
  <nav>
    <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'homepage'},'*');return false">Home</a>
    <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'menu'},'*');return false">Menu</a>
    <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'about'},'*');return false">About</a>
    <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'events'},'*');return false">Events</a>
    <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'gallery'},'*');return false">Gallery</a>
    <a href="#" class="active" onclick="window.parent.postMessage({type:'navigate',page:'order'},'*');return false">Order</a>
  </nav>
</div>

<div class="order-info">
  <strong>Ordering for pickup</strong> · 42 Maple Street · Open until 6:00 PM today
</div>

<div class="order-layout">
  <div class="order-menu">
    <div class="category-tabs">
      <span class="category-tab active">Coffee</span>
      <span class="category-tab">Tea</span>
      <span class="category-tab">Pastries</span>
      <span class="category-tab">Breakfast</span>
      <span class="category-tab">Lunch</span>
      <span class="category-tab">Drinks</span>
    </div>

    <h3 class="menu-section-title">Coffee</h3>
    <div class="order-item"><div class="order-item-info"><h4>Espresso</h4><p>Double shot, rich and bold</p></div><div class="order-item-action"><span class="price">$3.50</span><button class="add-btn">+</button></div></div>
    <div class="order-item"><div class="order-item-info"><h4>Americano</h4><p>Espresso with hot water, smooth and clean</p></div><div class="order-item-action"><span class="price">$3.75</span><button class="add-btn">+</button></div></div>
    <div class="order-item"><div class="order-item-info"><h4>Cappuccino</h4><p>Equal parts espresso, steamed milk, foam</p></div><div class="order-item-action"><span class="price">$4.75</span><button class="add-btn">+</button></div></div>
    <div class="order-item"><div class="order-item-info"><h4>Latte</h4><p>Espresso with silky steamed milk</p></div><div class="order-item-action"><span class="price">$5.00</span><button class="add-btn">+</button></div></div>
    <div class="order-item"><div class="order-item-info"><h4>Flat White</h4><p>Velvety microfoam, double ristretto</p></div><div class="order-item-action"><span class="price">$5.00</span><button class="add-btn">+</button></div></div>
    <div class="order-item"><div class="order-item-info"><h4>Mocha</h4><p>Espresso, house chocolate, steamed milk, whipped cream</p></div><div class="order-item-action"><span class="price">$5.50</span><button class="add-btn">+</button></div></div>
    <div class="order-item"><div class="order-item-info"><h4>Pour Over</h4><p>Single origin, brewed to order — ask about today's beans</p></div><div class="order-item-action"><span class="price">$5.00</span><button class="add-btn">+</button></div></div>
    <div class="order-item"><div class="order-item-info"><h4>Cold Brew</h4><p>24-hour steeped, smooth and naturally sweet</p></div><div class="order-item-action"><span class="price">$4.50</span><button class="add-btn">+</button></div></div>
    <div class="order-item"><div class="order-item-info"><h4>Iced Latte</h4><p>Espresso over ice with cold milk</p></div><div class="order-item-action"><span class="price">$5.25</span><button class="add-btn">+</button></div></div>

    <h3 class="menu-section-title">Tea</h3>
    <div class="order-item"><div class="order-item-info"><h4>Chai Latte</h4><p>House-spiced chai with steamed milk</p></div><div class="order-item-action"><span class="price">$4.75</span><button class="add-btn">+</button></div></div>
    <div class="order-item"><div class="order-item-info"><h4>Matcha Latte</h4><p>Ceremonial grade matcha, oat milk</p></div><div class="order-item-action"><span class="price">$5.25</span><button class="add-btn">+</button></div></div>
    <div class="order-item"><div class="order-item-info"><h4>English Breakfast</h4><p>Classic black tea, served hot</p></div><div class="order-item-action"><span class="price">$3.00</span><button class="add-btn">+</button></div></div>
    <div class="order-item"><div class="order-item-info"><h4>Earl Grey</h4><p>Bergamot-infused black tea</p></div><div class="order-item-action"><span class="price">$3.00</span><button class="add-btn">+</button></div></div>

    <h3 class="menu-section-title">Pastries</h3>
    <div class="order-item"><div class="order-item-info"><h4>Butter Croissant</h4><p>Flaky, golden, from Maple Lane Bakery</p></div><div class="order-item-action"><span class="price">$3.25</span><button class="add-btn">+</button></div></div>
    <div class="order-item"><div class="order-item-info"><h4>Almond Croissant</h4><p>Filled with almond cream, topped with sliced almonds</p></div><div class="order-item-action"><span class="price">$4.00</span><button class="add-btn">+</button></div></div>
    <div class="order-item"><div class="order-item-info"><h4>Cinnamon Roll</h4><p>Warm, gooey, cream cheese frosting</p></div><div class="order-item-action"><span class="price">$4.25</span><button class="add-btn">+</button></div></div>
    <div class="order-item"><div class="order-item-info"><h4>Blueberry Muffin</h4><p>Bursting with real blueberries, streusel top</p></div><div class="order-item-action"><span class="price">$3.00</span><button class="add-btn">+</button></div></div>
    <div class="order-item"><div class="order-item-info"><h4>Banana Bread</h4><p>Dense, moist, hint of cinnamon and walnut</p></div><div class="order-item-action"><span class="price">$3.50</span><button class="add-btn">+</button></div></div>

    <h3 class="menu-section-title">Lunch</h3>
    <div class="order-item"><div class="order-item-info"><h4>Turkey &amp; Brie Panini</h4><p>Roasted turkey, brie, arugula, fig jam on sourdough</p></div><div class="order-item-action"><span class="price">$10.50</span><button class="add-btn">+</button></div></div>
    <div class="order-item"><div class="order-item-info"><h4>Grilled Cheese</h4><p>Sharp cheddar &amp; gruyère on thick-cut sourdough</p></div><div class="order-item-action"><span class="price">$8.50</span><button class="add-btn">+</button></div></div>
    <div class="order-item"><div class="order-item-info"><h4>Grain Bowl</h4><p>Farro, roasted vegetables, tahini, pickled onion, greens</p></div><div class="order-item-action"><span class="price">$10.00</span><button class="add-btn">+</button></div></div>
    <div class="order-item"><div class="order-item-info"><h4>Soup of the Day</h4><p>Rotating daily — ask what's on. Served with bread</p></div><div class="order-item-action"><span class="price">$6.00</span><button class="add-btn">+</button></div></div>
    <div class="order-item"><div class="order-item-info"><h4>Avocado Toast</h4><p>Smashed avocado, everything seasoning, radish, chili flake</p></div><div class="order-item-action"><span class="price">$9.00</span><button class="add-btn">+</button></div></div>
  </div>

  <div class="order-sidebar">
    <h3>Your Order</h3>
    <div class="sidebar-items">
      <div class="sidebar-item"><span>Cappuccino <span class="qty">× 1</span></span><span>$4.75</span></div>
      <div class="sidebar-item"><span>Almond Croissant <span class="qty">× 2</span></span><span>$8.00</span></div>
      <div class="sidebar-item"><span>Cold Brew <span class="qty">× 1</span></span><span>$4.50</span></div>
    </div>
    <div class="sidebar-subtotal"><span>Subtotal</span><span>$17.25</span></div>
    <div class="sidebar-subtotal"><span>Tax</span><span>$1.38</span></div>
    <div class="sidebar-total"><span>Total</span><span>$18.63</span></div>
    <button class="checkout-btn">Checkout · $18.63</button>
    <div class="pickup-note">Ready for pickup in 15–20 min</div>
  </div>
</div>

<footer>
  <p>42 Maple Street, Riverside, OR 97201</p>
  <p>(503) 555-0142 · <a href="#">hello@downstreetcafe.com</a></p>
  <p class="wp">Made with WordPress</p>
</footer>

</body>
</html>`;
}
