export function homepage(themeCSS: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Fuego Collective — Small Batch. Big Heat.</title>
<style>${themeCSS}</style>
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: var(--theme-font-body); color: var(--theme-text); background: var(--theme-bg); line-height: var(--theme-line-height-normal); }
h1, h2, h3, h4 { font-family: var(--theme-font-heading); text-transform: uppercase; letter-spacing: 0.02em; }
a { color: var(--theme-color-primary); text-decoration: none; }

/* NAV */
.topnav {
  background: var(--theme-color-accent);
  padding: var(--theme-space-2) var(--theme-space-3);
  display: flex; align-items: center; justify-content: space-between;
}
.topnav .logo { color: var(--theme-color-surface); font-family: var(--theme-font-heading); font-size: 1.4rem; text-transform: uppercase; letter-spacing: 0.08em; }
.topnav .logo span { color: var(--theme-color-primary); }
.topnav nav { display: flex; gap: var(--theme-space-3); }
.topnav nav a { color: var(--theme-color-surface); font-size: var(--theme-font-size-small); font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; opacity: 0.85; transition: opacity 0.2s; }
.topnav nav a:hover, .topnav nav a.active { opacity: 1; color: var(--theme-color-primary); }

/* HERO */
.hero {
  position: relative;
  background: #0A0A0A;
  color: #FAF7F2;
  display: flex; align-items: center; justify-content: center;
  min-height: 520px; overflow: hidden;
}
.hero-content { position: relative; z-index: 2; text-align: center; padding: var(--theme-space-8) var(--theme-space-3); max-width: 600px; }
.hero-img { position: absolute; right: 5%; top: 50%; transform: translateY(-50%); z-index: 1; opacity: 0.7; }
.hero-img img { height: 440px; object-fit: contain; filter: drop-shadow(0 0 60px rgba(230,50,38,0.3)); }
.hero h1 { font-size: var(--theme-font-size-hero); line-height: var(--theme-line-height-tight); margin-bottom: var(--theme-space-2); }
.hero h1 .red { color: var(--theme-color-primary); }
.hero p { font-size: var(--theme-font-size-large); opacity: 0.85; margin-bottom: var(--theme-space-4); }
.btn-primary { display: inline-block; background: var(--theme-color-primary); color: #fff; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; padding: 14px 36px; border-radius: 4px; font-size: var(--theme-font-size-medium); transition: background 0.2s; border: none; cursor: pointer; }
.btn-primary:hover { background: var(--theme-color-primary-dark); }
.btn-outline { display: inline-block; border: 2px solid var(--theme-color-primary); color: var(--theme-color-primary); font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; padding: 12px 32px; border-radius: 4px; font-size: var(--theme-font-size-medium); transition: all 0.2s; background: transparent; cursor: pointer; margin-left: 12px; }
.btn-outline:hover { background: var(--theme-color-primary); color: #fff; }

/* LINEUP */
.lineup { text-align: center; padding: var(--theme-space-8) var(--theme-space-3); }
.lineup h2 { font-size: var(--theme-font-size-xlarge); margin-bottom: var(--theme-space-1); }
.lineup .subtitle { color: var(--theme-color-muted); font-size: var(--theme-font-size-large); margin-bottom: var(--theme-space-5); }
.lineup-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--theme-space-4); max-width: var(--theme-content-width); margin: 0 auto; }
.lineup-card { background: var(--theme-color-card); border-radius: 12px; padding: var(--theme-space-4); text-align: center; box-shadow: 0 2px 8px rgba(0,0,0,0.06); transition: transform 0.2s, box-shadow 0.2s; }
.lineup-card:hover { transform: translateY(-4px); box-shadow: 0 8px 24px rgba(0,0,0,0.1); }
.lineup-card img { width: 100%; height: 220px; object-fit: contain; margin-bottom: var(--theme-space-2); }
.lineup-card h3 { font-size: var(--theme-font-size-large); margin-bottom: 4px; }
.lineup-card .heat { color: var(--theme-color-primary); font-size: var(--theme-font-size-medium); }
.lineup-card .price { font-size: var(--theme-font-size-large); font-weight: 700; margin-top: 8px; }

/* LIFESTYLE */
.lifestyle {
  background: #0A0A0A; color: #FAF7F2;
  display: flex; align-items: center; gap: var(--theme-space-6);
  padding: var(--theme-space-8) var(--theme-space-5);
}
.lifestyle img { width: 50%; border-radius: 8px; object-fit: cover; height: 400px; }
.lifestyle-text { flex: 1; }
.lifestyle-text h2 { font-size: var(--theme-font-size-xlarge); margin-bottom: var(--theme-space-2); }
.lifestyle-text p { font-size: var(--theme-font-size-medium); opacity: 0.85; margin-bottom: var(--theme-space-3); line-height: 1.7; }

/* TESTIMONIALS */
.testimonials { padding: var(--theme-space-8) var(--theme-space-3); text-align: center; }
.testimonials h2 { font-size: var(--theme-font-size-xlarge); margin-bottom: var(--theme-space-5); }
.testimonial-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--theme-space-4); max-width: var(--theme-content-width); margin: 0 auto; }
.testimonial-card { background: var(--theme-color-card); border-radius: 12px; padding: var(--theme-space-4); box-shadow: 0 1px 4px rgba(0,0,0,0.06); text-align: left; }
.testimonial-card .stars { color: var(--theme-color-secondary); font-size: 1.1rem; margin-bottom: 8px; }
.testimonial-card blockquote { font-style: italic; font-size: var(--theme-font-size-medium); line-height: 1.6; margin-bottom: 12px; }
.testimonial-card .author { font-weight: 700; font-size: var(--theme-font-size-small); color: var(--theme-color-muted); }

/* NEWSLETTER */
.newsletter {
  background: var(--theme-color-primary);
  color: #fff; text-align: center;
  padding: var(--theme-space-8) var(--theme-space-3);
}
.newsletter h2 { font-size: var(--theme-font-size-xlarge); margin-bottom: var(--theme-space-1); }
.newsletter p { opacity: 0.9; margin-bottom: var(--theme-space-3); font-size: var(--theme-font-size-medium); }
.newsletter form { display: flex; gap: 8px; max-width: 480px; margin: 0 auto; }
.newsletter input { flex: 1; padding: 14px 16px; border: none; border-radius: 4px; font-size: var(--theme-font-size-medium); }
.newsletter button { background: var(--theme-color-accent); color: #fff; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; padding: 14px 28px; border: none; border-radius: 4px; cursor: pointer; font-size: var(--theme-font-size-small); }

/* FOOTER */
footer {
  background: var(--theme-color-accent); color: var(--theme-color-surface); padding: var(--theme-space-6) var(--theme-space-3);
  text-align: center; font-size: var(--theme-font-size-small);
}
footer .footer-inner { max-width: var(--theme-content-width); margin: 0 auto; }
footer .brand { font-family: var(--theme-font-heading); font-size: 1.2rem; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 8px; }
footer .brand span { color: var(--theme-color-primary); }
footer .links { margin: 12px 0; display: flex; justify-content: center; gap: var(--theme-space-3); }
footer .links a { color: var(--theme-color-surface); opacity: 0.7; transition: opacity 0.2s; }
footer .links a:hover { opacity: 1; }
footer .socials { margin: 12px 0; display: flex; justify-content: center; gap: var(--theme-space-2); }
footer .socials a { color: var(--theme-color-surface); opacity: 0.6; font-size: 0.85rem; }
footer .wp { opacity: 0.4; margin-top: var(--theme-space-2); }
</style>
</head>
<body>

<div class="topnav">
  <div class="logo">Fuego <span>Collective</span></div>
  <nav>
    <a href="#" class="active" onclick="window.parent.postMessage({type:'navigate',page:'homepage'},'*');return false">Home</a>
    <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'shop'},'*');return false">Shop</a>
    <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'product'},'*');return false">Smoky Habanero</a>
  </nav>
</div>

<div class="hero">
  <div class="hero-img"><img src="/images/fuego/hero-bottle.png" alt="Smoky Habanero hot sauce bottle" /></div>
  <div class="hero-content">
    <h1>Small Batch.<br/><span class="red">Big Heat.</span></h1>
    <p>Handcrafted hot sauces made with fire-roasted peppers, real ingredients, and zero compromises.</p>
    <a href="#" class="btn-primary" onclick="window.parent.postMessage({type:'navigate',page:'shop'},'*');return false">Shop Sauces</a>
    <a href="#" class="btn-outline" onclick="window.parent.postMessage({type:'navigate',page:'product'},'*');return false">Our #1 Seller</a>
  </div>
</div>

<section class="lineup">
  <h2>The Lineup</h2>
  <p class="subtitle">Every bottle. Every batch. Made by hand.</p>
  <div class="lineup-grid">
    <div class="lineup-card">
      <img src="/images/fuego/product-mango-habanero.png" alt="Mango Habanero hot sauce" />
      <h3>Mango Habanero</h3>
      <div class="heat">🌶️🌶️🌶️</div>
      <div class="price">$13</div>
    </div>
    <div class="lineup-card">
      <img src="/images/fuego/product-chipotle.png" alt="Chipotle Negro hot sauce" />
      <h3>Chipotle Negro</h3>
      <div class="heat">🌶️🌶️</div>
      <div class="price">$12</div>
    </div>
    <div class="lineup-card">
      <img src="/images/fuego/product-verde.png" alt="Verde Fresco hot sauce" />
      <h3>Verde Fresco</h3>
      <div class="heat">🌶️🌶️</div>
      <div class="price">$12</div>
    </div>
  </div>
</section>

<section class="lifestyle">
  <img src="/images/fuego/lifestyle-tacos.png" alt="Tacos drizzled with Fuego Collective hot sauce" />
  <div class="lifestyle-text">
    <h2>Made for Real Food</h2>
    <p>We don't make hot sauce for the shelf. We make it for the table — for tacos at midnight, eggs on Sunday morning, wings with friends, and everything in between.</p>
    <p>Every bottle starts with whole peppers, sourced from small farms. We roast, smoke, and blend in micro-batches so every drop has depth — not just heat.</p>
    <a href="#" class="btn-primary" onclick="window.parent.postMessage({type:'navigate',page:'shop'},'*');return false">Explore All Sauces</a>
  </div>
</section>

<section class="testimonials">
  <h2>What the People Say</h2>
  <div class="testimonial-grid">
    <div class="testimonial-card">
      <div class="stars">★★★★★</div>
      <blockquote>"The Smoky Habanero is unreal. Complex, smoky, and the heat creeps up perfectly. I put it on literally everything."</blockquote>
      <div class="author">— Marcus T., Austin TX</div>
    </div>
    <div class="testimonial-card">
      <div class="stars">★★★★★</div>
      <blockquote>"Finally, a hot sauce that tastes like actual peppers and not just vinegar. The Mango Habanero on fish tacos is *chef's kiss*."</blockquote>
      <div class="author">— Priya K., Portland OR</div>
    </div>
    <div class="testimonial-card">
      <div class="stars">★★★★★</div>
      <blockquote>"Bought the 4-pack sampler. Now I'm on a monthly subscription. The Verde Fresco is my everyday sauce. Can't go back to store-bought."</blockquote>
      <div class="author">— Jake R., Brooklyn NY</div>
    </div>
  </div>
</section>

<section class="newsletter">
  <h2>Join the Burn List</h2>
  <p>New drops, limited batches, and recipes. No spam — just heat.</p>
  <form onsubmit="return false">
    <input type="email" placeholder="your@email.com" />
    <button type="submit">Subscribe</button>
  </form>
</section>

<footer>
  <div class="footer-inner">
    <div class="brand">Fuego <span>Collective</span></div>
    <div class="links">
      <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'homepage'},'*');return false">Home</a>
      <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'shop'},'*');return false">Shop</a>
      <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'product'},'*');return false">Smoky Habanero</a>
    </div>
    <div class="socials">
      <a href="#">Instagram</a> · <a href="#">TikTok</a> · <a href="#">Twitter</a>
    </div>
    <p>Small-batch hot sauce from Portland, OR · hello@fuegocollective.com</p>
    <p class="wp">Made with WordPress</p>
  </div>
</footer>

</body>
</html>`;
}

export function shop(themeCSS: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Shop — Fuego Collective</title>
<style>${themeCSS}</style>
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: var(--theme-font-body); color: var(--theme-text); background: var(--theme-bg); line-height: var(--theme-line-height-normal); }
h1, h2, h3, h4 { font-family: var(--theme-font-heading); text-transform: uppercase; letter-spacing: 0.02em; }
a { color: var(--theme-color-primary); text-decoration: none; }

.topnav {
  background: var(--theme-color-accent);
  padding: var(--theme-space-2) var(--theme-space-3);
  display: flex; align-items: center; justify-content: space-between;
}
.topnav .logo { color: var(--theme-color-surface); font-family: var(--theme-font-heading); font-size: 1.4rem; text-transform: uppercase; letter-spacing: 0.08em; }
.topnav .logo span { color: var(--theme-color-primary); }
.topnav nav { display: flex; gap: var(--theme-space-3); }
.topnav nav a { color: var(--theme-color-surface); font-size: var(--theme-font-size-small); font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; opacity: 0.85; transition: opacity 0.2s; }
.topnav nav a:hover, .topnav nav a.active { opacity: 1; color: var(--theme-color-primary); }

.page-header {
  background: #0A0A0A; color: #FAF7F2;
  text-align: center; padding: var(--theme-space-6) var(--theme-space-3);
}
.page-header h1 { font-size: var(--theme-font-size-xlarge); }
.page-header p { opacity: 0.7; margin-top: 8px; }

.filters {
  max-width: var(--theme-wide-width); margin: 0 auto;
  padding: var(--theme-space-3) var(--theme-space-3) 0;
  display: flex; gap: 8px; flex-wrap: wrap; align-items: center;
}
.filters label { font-weight: 700; font-size: var(--theme-font-size-small); text-transform: uppercase; letter-spacing: 0.04em; margin-right: 8px; }
.filter-btn { padding: 8px 16px; border: 2px solid var(--theme-color-muted); border-radius: 20px; background: transparent; color: var(--theme-text); font-size: var(--theme-font-size-small); cursor: pointer; font-weight: 600; transition: all 0.2s; }
.filter-btn:hover, .filter-btn.active { border-color: var(--theme-color-primary); color: var(--theme-color-primary); background: rgba(230,50,38,0.06); }

.product-grid {
  max-width: var(--theme-wide-width); margin: 0 auto;
  display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: var(--theme-space-4); padding: var(--theme-space-4) var(--theme-space-3) var(--theme-space-8);
}
.product-card {
  background: var(--theme-color-card); border-radius: 12px; overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06); transition: transform 0.2s, box-shadow 0.2s;
}
.product-card:hover { transform: translateY(-4px); box-shadow: 0 8px 24px rgba(0,0,0,0.1); }
.product-card .img-wrap { height: 200px; display: flex; align-items: center; justify-content: center; background: #f5f5f5; overflow: hidden; }
.product-card .img-wrap img { height: 180px; object-fit: contain; }
.product-card .img-wrap .placeholder { width: 100%; height: 100%; }
.product-card .info { padding: var(--theme-space-3); }
.product-card h3 { font-size: 1rem; margin-bottom: 4px; }
.product-card .meta { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
.product-card .heat { color: var(--theme-color-primary); font-size: 0.85rem; }
.product-card .size { color: var(--theme-color-muted); font-size: var(--theme-font-size-small); }
.product-card .price-row { display: flex; justify-content: space-between; align-items: center; }
.product-card .price { font-size: var(--theme-font-size-large); font-weight: 700; }
.btn-cart { background: var(--theme-color-primary); color: #fff; border: none; padding: 8px 16px; border-radius: 4px; font-weight: 700; font-size: var(--theme-font-size-small); cursor: pointer; text-transform: uppercase; letter-spacing: 0.04em; transition: background 0.2s; }
.btn-cart:hover { background: var(--theme-color-primary-dark); }

footer {
  background: var(--theme-color-accent); color: var(--theme-color-surface); padding: var(--theme-space-6) var(--theme-space-3);
  text-align: center; font-size: var(--theme-font-size-small);
}
footer .brand { font-family: var(--theme-font-heading); font-size: 1.2rem; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 8px; }
footer .brand span { color: var(--theme-color-primary); }
footer .links { margin: 12px 0; display: flex; justify-content: center; gap: var(--theme-space-3); }
footer .links a { color: var(--theme-color-surface); opacity: 0.7; }
footer .wp { opacity: 0.4; margin-top: var(--theme-space-2); }
</style>
</head>
<body>

<div class="topnav">
  <div class="logo">Fuego <span>Collective</span></div>
  <nav>
    <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'homepage'},'*');return false">Home</a>
    <a href="#" class="active" onclick="window.parent.postMessage({type:'navigate',page:'shop'},'*');return false">Shop</a>
    <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'product'},'*');return false">Smoky Habanero</a>
  </nav>
</div>

<div class="page-header">
  <h1>Shop All Sauces</h1>
  <p>Small batch. Handmade. Shipped to your door.</p>
</div>

<div class="filters">
  <label>Heat Level:</label>
  <button class="filter-btn active">All</button>
  <button class="filter-btn">🌶️ Mild</button>
  <button class="filter-btn">🌶️🌶️ Medium</button>
  <button class="filter-btn">🌶️🌶️🌶️ Hot</button>
  <button class="filter-btn">🌶️🌶️🌶️🌶️ Extra Hot</button>
  <button class="filter-btn">🌶️🌶️🌶️🌶️🌶️ Extreme</button>
</div>

<div class="product-grid">

  <div class="product-card">
    <div class="img-wrap"><img src="/images/fuego/hero-bottle.png" alt="Smoky Habanero" /></div>
    <div class="info">
      <h3>Smoky Habanero</h3>
      <div class="meta"><span class="heat">🌶️🌶️🌶️🌶️</span><span class="size">5 oz</span></div>
      <div class="price-row"><span class="price">$14</span><button class="btn-cart" onclick="window.parent.postMessage({type:'navigate',page:'product'},'*');return false">Add to Cart</button></div>
    </div>
  </div>

  <div class="product-card">
    <div class="img-wrap"><img src="/images/fuego/product-mango-habanero.png" alt="Mango Habanero" /></div>
    <div class="info">
      <h3>Mango Habanero</h3>
      <div class="meta"><span class="heat">🌶️🌶️🌶️</span><span class="size">5 oz</span></div>
      <div class="price-row"><span class="price">$13</span><button class="btn-cart">Add to Cart</button></div>
    </div>
  </div>

  <div class="product-card">
    <div class="img-wrap"><img src="/images/fuego/product-chipotle.png" alt="Chipotle Negro" /></div>
    <div class="info">
      <h3>Chipotle Negro</h3>
      <div class="meta"><span class="heat">🌶️🌶️</span><span class="size">5 oz</span></div>
      <div class="price-row"><span class="price">$12</span><button class="btn-cart">Add to Cart</button></div>
    </div>
  </div>

  <div class="product-card">
    <div class="img-wrap"><img src="/images/fuego/product-verde.png" alt="Verde Fresco" /></div>
    <div class="info">
      <h3>Verde Fresco</h3>
      <div class="meta"><span class="heat">🌶️🌶️</span><span class="size">5 oz</span></div>
      <div class="price-row"><span class="price">$12</span><button class="btn-cart">Add to Cart</button></div>
    </div>
  </div>

  <div class="product-card">
    <div class="img-wrap"><div class="placeholder" style="background:linear-gradient(135deg,#8B0000,#FF4500);"></div></div>
    <div class="info">
      <h3>Carolina Reaper</h3>
      <div class="meta"><span class="heat">🌶️🌶️🌶️🌶️🌶️</span><span class="size">5 oz</span></div>
      <div class="price-row"><span class="price">$18</span><button class="btn-cart">Add to Cart</button></div>
    </div>
  </div>

  <div class="product-card">
    <div class="img-wrap"><div class="placeholder" style="background:linear-gradient(135deg,#2F2F2F,#666);"></div></div>
    <div class="info">
      <h3>Ghost Pepper Garlic</h3>
      <div class="meta"><span class="heat">🌶️🌶️🌶️🌶️🌶️</span><span class="size">5 oz</span></div>
      <div class="price-row"><span class="price">$16</span><button class="btn-cart">Add to Cart</button></div>
    </div>
  </div>

  <div class="product-card">
    <div class="img-wrap"><div class="placeholder" style="background:linear-gradient(135deg,#DAA520,#FF6347);"></div></div>
    <div class="info">
      <h3>Pineapple Scorpion</h3>
      <div class="meta"><span class="heat">🌶️🌶️🌶️🌶️</span><span class="size">5 oz</span></div>
      <div class="price-row"><span class="price">$15</span><button class="btn-cart">Add to Cart</button></div>
    </div>
  </div>

  <div class="product-card">
    <div class="img-wrap"><div class="placeholder" style="background:linear-gradient(135deg,#8B4513,#CD853F);"></div></div>
    <div class="info">
      <h3>Smoked Serrano</h3>
      <div class="meta"><span class="heat">🌶️🌶️🌶️</span><span class="size">5 oz</span></div>
      <div class="price-row"><span class="price">$13</span><button class="btn-cart">Add to Cart</button></div>
    </div>
  </div>

  <div class="product-card">
    <div class="img-wrap"><div class="placeholder" style="background:linear-gradient(135deg,#228B22,#90EE90);"></div></div>
    <div class="info">
      <h3>Everyday Jalapeño</h3>
      <div class="meta"><span class="heat">🌶️</span><span class="size">5 oz</span></div>
      <div class="price-row"><span class="price">$12</span><button class="btn-cart">Add to Cart</button></div>
    </div>
  </div>

</div>

<footer>
  <div class="brand">Fuego <span>Collective</span></div>
  <div class="links">
    <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'homepage'},'*');return false">Home</a>
    <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'shop'},'*');return false">Shop</a>
  </div>
  <p>Small-batch hot sauce from Portland, OR</p>
  <p class="wp">Made with WordPress</p>
</footer>

</body>
</html>`;
}

export function product(themeCSS: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Smoky Habanero — Fuego Collective</title>
<style>${themeCSS}</style>
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: var(--theme-font-body); color: var(--theme-text); background: var(--theme-bg); line-height: var(--theme-line-height-normal); }
h1, h2, h3, h4 { font-family: var(--theme-font-heading); text-transform: uppercase; letter-spacing: 0.02em; }
a { color: var(--theme-color-primary); text-decoration: none; }

.topnav {
  background: var(--theme-color-accent);
  padding: var(--theme-space-2) var(--theme-space-3);
  display: flex; align-items: center; justify-content: space-between;
}
.topnav .logo { color: var(--theme-color-surface); font-family: var(--theme-font-heading); font-size: 1.4rem; text-transform: uppercase; letter-spacing: 0.08em; }
.topnav .logo span { color: var(--theme-color-primary); }
.topnav nav { display: flex; gap: var(--theme-space-3); }
.topnav nav a { color: var(--theme-color-surface); font-size: var(--theme-font-size-small); font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; opacity: 0.85; transition: opacity 0.2s; }
.topnav nav a:hover, .topnav nav a.active { opacity: 1; color: var(--theme-color-primary); }

.breadcrumb { max-width: var(--theme-content-width); margin: 0 auto; padding: var(--theme-space-2) var(--theme-space-3); font-size: var(--theme-font-size-small); color: var(--theme-color-muted); }
.breadcrumb a { color: var(--theme-color-muted); }
.breadcrumb a:hover { color: var(--theme-color-primary); }

.product-detail {
  max-width: var(--theme-content-width); margin: 0 auto;
  display: grid; grid-template-columns: 1fr 1fr; gap: var(--theme-space-6);
  padding: var(--theme-space-4) var(--theme-space-3) var(--theme-space-8);
}
.product-image { background: #0A0A0A; border-radius: 12px; display: flex; align-items: center; justify-content: center; padding: var(--theme-space-4); }
.product-image img { max-width: 100%; max-height: 420px; object-fit: contain; filter: drop-shadow(0 0 40px rgba(230,50,38,0.2)); }
.product-info h1 { font-size: var(--theme-font-size-xlarge); margin-bottom: 4px; line-height: var(--theme-line-height-tight); }
.product-info .heat-badge { display: inline-block; background: var(--theme-color-primary); color: #fff; padding: 4px 12px; border-radius: 20px; font-size: var(--theme-font-size-small); font-weight: 700; margin-bottom: var(--theme-space-2); }
.product-info .scoville { color: var(--theme-color-muted); font-size: var(--theme-font-size-small); margin-bottom: var(--theme-space-3); }
.product-info .price { font-size: 2rem; font-weight: 700; color: var(--theme-color-primary); margin-bottom: var(--theme-space-3); }
.product-info .desc { margin-bottom: var(--theme-space-3); line-height: 1.7; }
.product-info .desc p { margin-bottom: 12px; }

.qty-row { display: flex; align-items: center; gap: 12px; margin-bottom: var(--theme-space-3); }
.qty-row label { font-weight: 700; font-size: var(--theme-font-size-small); text-transform: uppercase; }
.qty-btn { width: 36px; height: 36px; border: 2px solid var(--theme-color-muted); border-radius: 6px; background: transparent; font-size: 1.2rem; cursor: pointer; display: flex; align-items: center; justify-content: center; color: var(--theme-text); }
.qty-val { font-size: var(--theme-font-size-large); font-weight: 700; min-width: 24px; text-align: center; }
.btn-add { width: 100%; background: var(--theme-color-primary); color: #fff; border: none; padding: 16px; border-radius: 6px; font-size: var(--theme-font-size-medium); font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; cursor: pointer; transition: background 0.2s; margin-bottom: var(--theme-space-4); }
.btn-add:hover { background: var(--theme-color-primary-dark); }

.details-grid { display: grid; grid-template-columns: 1fr 1fr; gap: var(--theme-space-3); margin-bottom: var(--theme-space-4); }
.detail-box { background: var(--theme-color-card); border-radius: 8px; padding: var(--theme-space-3); box-shadow: 0 1px 3px rgba(0,0,0,0.06); }
.detail-box h4 { font-size: var(--theme-font-size-small); color: var(--theme-color-primary); margin-bottom: 8px; }
.detail-box ul { list-style: none; font-size: var(--theme-font-size-small); }
.detail-box li { padding: 2px 0; }

/* ALSO LIKE */
.also-like { max-width: var(--theme-content-width); margin: 0 auto; padding: 0 var(--theme-space-3) var(--theme-space-8); }
.also-like h2 { font-size: var(--theme-font-size-xlarge); text-align: center; margin-bottom: var(--theme-space-4); }
.also-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--theme-space-4); }
.also-card { background: var(--theme-color-card); border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.06); transition: transform 0.2s; text-align: center; }
.also-card:hover { transform: translateY(-4px); }
.also-card .img-wrap { height: 180px; display: flex; align-items: center; justify-content: center; background: #f5f5f5; }
.also-card img { height: 160px; object-fit: contain; }
.also-card .info { padding: var(--theme-space-3); }
.also-card h3 { font-size: 1rem; margin-bottom: 4px; }
.also-card .price { font-weight: 700; color: var(--theme-color-primary); }

/* REVIEWS */
.reviews { max-width: var(--theme-content-width); margin: 0 auto; padding: 0 var(--theme-space-3) var(--theme-space-8); }
.reviews h2 { font-size: var(--theme-font-size-xlarge); text-align: center; margin-bottom: var(--theme-space-4); }
.review-list { display: flex; flex-direction: column; gap: var(--theme-space-3); }
.review-card { background: var(--theme-color-card); border-radius: 12px; padding: var(--theme-space-4); box-shadow: 0 1px 4px rgba(0,0,0,0.06); }
.review-card .stars { color: var(--theme-color-secondary); margin-bottom: 8px; }
.review-card .body { margin-bottom: 8px; line-height: 1.6; }
.review-card .author { font-weight: 700; font-size: var(--theme-font-size-small); color: var(--theme-color-muted); }

footer {
  background: var(--theme-color-accent); color: var(--theme-color-surface); padding: var(--theme-space-6) var(--theme-space-3);
  text-align: center; font-size: var(--theme-font-size-small);
}
footer .brand { font-family: var(--theme-font-heading); font-size: 1.2rem; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 8px; }
footer .brand span { color: var(--theme-color-primary); }
footer .links { margin: 12px 0; display: flex; justify-content: center; gap: var(--theme-space-3); }
footer .links a { color: var(--theme-color-surface); opacity: 0.7; }
footer .wp { opacity: 0.4; margin-top: var(--theme-space-2); }
</style>
</head>
<body>

<div class="topnav">
  <div class="logo">Fuego <span>Collective</span></div>
  <nav>
    <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'homepage'},'*');return false">Home</a>
    <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'shop'},'*');return false">Shop</a>
    <a href="#" class="active" onclick="window.parent.postMessage({type:'navigate',page:'product'},'*');return false">Smoky Habanero</a>
  </nav>
</div>

<div class="breadcrumb">
  <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'homepage'},'*');return false">Home</a> /
  <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'shop'},'*');return false">Shop</a> /
  Smoky Habanero
</div>

<div class="product-detail">
  <div class="product-image">
    <img src="/images/fuego/hero-bottle.png" alt="Smoky Habanero hot sauce bottle" />
  </div>
  <div class="product-info">
    <h1>Smoky Habanero</h1>
    <span class="heat-badge">🌶️🌶️🌶️🌶️ Hot</span>
    <div class="scoville">~80,000 SHU · 5 oz bottle</div>
    <div class="price">$14</div>
    <div class="desc">
      <p>Our flagship sauce. Hand-picked habaneros are fire-roasted over oak wood, then slow-blended with garlic, tomato, and a touch of brown sugar. The result is a rich, smoky heat that builds gradually — complex enough to sip, bold enough to drench.</p>
      <p>Every batch is made in our Portland kitchen using whole ingredients. No extracts. No fillers. No shortcuts.</p>
    </div>
    <div class="qty-row">
      <label>Qty</label>
      <button class="qty-btn">−</button>
      <span class="qty-val">1</span>
      <button class="qty-btn">+</button>
    </div>
    <button class="btn-add">Add to Cart — $14</button>

    <div class="details-grid">
      <div class="detail-box">
        <h4>Ingredients</h4>
        <ul>
          <li>Habanero peppers</li>
          <li>Tomato</li>
          <li>Garlic</li>
          <li>Apple cider vinegar</li>
          <li>Brown sugar</li>
          <li>Sea salt</li>
          <li>Oak smoke</li>
        </ul>
      </div>
      <div class="detail-box">
        <h4>Perfect With</h4>
        <ul>
          <li>🌮 Tacos & burritos</li>
          <li>🍗 Wings & grilled chicken</li>
          <li>🍳 Scrambled eggs</li>
          <li>🍕 Pizza (trust us)</li>
          <li>🥑 Avocado toast</li>
        </ul>
      </div>
    </div>
  </div>
</div>

<section class="also-like">
  <h2>You Might Also Like</h2>
  <div class="also-grid">
    <div class="also-card">
      <div class="img-wrap"><img src="/images/fuego/product-mango-habanero.png" alt="Mango Habanero" /></div>
      <div class="info"><h3>Mango Habanero</h3><div class="price">$13</div></div>
    </div>
    <div class="also-card">
      <div class="img-wrap"><img src="/images/fuego/product-chipotle.png" alt="Chipotle Negro" /></div>
      <div class="info"><h3>Chipotle Negro</h3><div class="price">$12</div></div>
    </div>
    <div class="also-card">
      <div class="img-wrap"><img src="/images/fuego/product-verde.png" alt="Verde Fresco" /></div>
      <div class="info"><h3>Verde Fresco</h3><div class="price">$12</div></div>
    </div>
  </div>
</section>

<section class="reviews">
  <h2>Reviews</h2>
  <div class="review-list">
    <div class="review-card">
      <div class="stars">★★★★★</div>
      <div class="body">This is the best hot sauce I've ever had, and I've tried hundreds. The smoke flavor is real — not that fake liquid smoke taste. It's got depth, heat, and just enough sweetness to keep you reaching for more. Absolutely destroyed a dozen wings with this last weekend.</div>
      <div class="author">— DanTheHeatSeeker · Verified Purchase</div>
    </div>
    <div class="review-card">
      <div class="stars">★★★★★</div>
      <div class="body">I'm a habanero purist and I was skeptical about the "smoky" angle. But wow — the oak-roasting really transforms the pepper. You get the fruity habanero flavor up front, then the smoke kicks in mid-palate, and the heat lingers beautifully. Restaurant-quality sauce in a bottle.</div>
      <div class="author">— SauceBoss_Maria · Verified Purchase</div>
    </div>
    <div class="review-card">
      <div class="stars">★★★★☆</div>
      <div class="body">Great flavor, amazing on eggs and tacos. Only reason for 4 stars is I wish the bottle was bigger — 5oz goes FAST when you're putting it on everything. Already ordered the 3-pack. Heat level is perfect: noticeable but you can still taste your food.</div>
      <div class="author">— ChileHead_PDX · Verified Purchase</div>
    </div>
  </div>
</section>

<footer>
  <div class="brand">Fuego <span>Collective</span></div>
  <div class="links">
    <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'homepage'},'*');return false">Home</a>
    <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'shop'},'*');return false">Shop</a>
  </div>
  <p>Small-batch hot sauce from Portland, OR · hello@fuegocollective.com</p>
  <p class="wp">Made with WordPress</p>
</footer>

</body>
</html>`;
}
