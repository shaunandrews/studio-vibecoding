export function homepage(themeCSS: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Downstreet Cafe</title>
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

.hours-location {
  display: flex; flex-wrap: wrap; gap: var(--theme-space-5);
  background: var(--theme-color-card); border-radius: 12px; padding: var(--theme-space-5);
  box-shadow: 0 1px 3px rgba(0,0,0,0.06);
}
.hours-location > div { flex: 1; min-width: 220px; }
.hours-location h2 { font-size: 1.5rem; color: var(--theme-color-primary); margin-bottom: 12px; }
.hours-location p { margin-bottom: 4px; }

.menu-section h2 { text-align: center; font-size: var(--theme-font-size-xlarge); color: var(--theme-color-primary); margin-bottom: var(--theme-space-4); }
.menu-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: var(--theme-space-4); }
.menu-card { background: var(--theme-color-card); border-radius: 12px; padding: 28px; box-shadow: 0 1px 3px rgba(0,0,0,0.06); }
.menu-card h3 { font-size: var(--theme-font-size-large); color: var(--theme-text); margin-bottom: var(--theme-space-2); padding-bottom: var(--theme-space-1); border-bottom: 2px solid var(--theme-color-secondary); }
.menu-item { display: flex; justify-content: space-between; padding: 6px 0; }
.menu-item .price { color: var(--theme-color-primary); font-weight: 600; }

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
  <h1>Downstreet Cafe</h1>
  <p>Your neighborhood coffee spot</p>
  <nav>
    <a href="#" class="active" onclick="window.parent.postMessage({type:'navigate',page:'homepage'},'*');return false">Home</a>
    <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'menu'},'*');return false">Menu</a>
    <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'about'},'*');return false">About</a>
  </nav>
</div>

<section>
  <div class="hours-location">
    <div>
      <h2>Hours</h2>
      <p><strong>Monday – Friday:</strong> 7:00 AM – 6:00 PM</p>
      <p><strong>Saturday – Sunday:</strong> 8:00 AM – 4:00 PM</p>
    </div>
    <div>
      <h2>Location</h2>
      <p>42 Maple Street</p>
      <p>Riverside, OR 97201</p>
      <p>(503) 555-0142</p>
    </div>
  </div>
</section>

<section class="menu-section">
  <h2>Menu Highlights</h2>
  <div class="menu-grid">
    <div class="menu-card">
      <h3>Coffee</h3>
      <div class="menu-item"><span>Espresso</span><span class="price">$3.50</span></div>
      <div class="menu-item"><span>Cappuccino</span><span class="price">$4.75</span></div>
      <div class="menu-item"><span>Pour Over</span><span class="price">$5.00</span></div>
      <div class="menu-item"><span>Cold Brew</span><span class="price">$4.50</span></div>
    </div>
    <div class="menu-card">
      <h3>Pastries</h3>
      <div class="menu-item"><span>Croissant</span><span class="price">$3.25</span></div>
      <div class="menu-item"><span>Banana Bread</span><span class="price">$3.50</span></div>
      <div class="menu-item"><span>Blueberry Muffin</span><span class="price">$3.00</span></div>
    </div>
    <div class="menu-card">
      <h3>Lunch</h3>
      <div class="menu-item"><span>Grilled Cheese</span><span class="price">$8.50</span></div>
      <div class="menu-item"><span>Soup of the Day</span><span class="price">$6.00</span></div>
      <div class="menu-item"><span>Garden Salad</span><span class="price">$7.50</span></div>
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

export function menu(themeCSS: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Menu – Downstreet Cafe</title>
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
section h2 { text-align: center; font-size: var(--theme-font-size-xlarge); color: var(--theme-color-primary); margin-bottom: var(--theme-space-4); }

.menu-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: var(--theme-space-4); }
.menu-card { background: var(--theme-color-card); border-radius: 12px; padding: 28px; box-shadow: 0 1px 3px rgba(0,0,0,0.06); }
.menu-card h3 { font-size: var(--theme-font-size-large); color: var(--theme-text); margin-bottom: var(--theme-space-2); padding-bottom: var(--theme-space-1); border-bottom: 2px solid var(--theme-color-secondary); }
.menu-item { display: flex; justify-content: space-between; padding: 6px 0; }
.menu-item .price { color: var(--theme-color-primary); font-weight: 600; white-space: nowrap; margin-left: 12px; }
.menu-item .desc { font-size: 0.85rem; color: var(--theme-color-muted); }

.note { text-align: center; max-width: 600px; margin: -20px auto var(--theme-space-5); color: var(--theme-color-muted); font-style: italic; }

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
  <h1>Our Menu</h1>
  <p>Crafted with care, served with love</p>
  <nav>
    <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'homepage'},'*');return false">Home</a>
    <a href="#" class="active" onclick="window.parent.postMessage({type:'navigate',page:'menu'},'*');return false">Menu</a>
    <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'about'},'*');return false">About</a>
  </nav>
</div>

<section>
  <h2>Food &amp; Drinks</h2>
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
