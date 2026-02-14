export const homepage = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Downstreet Cafe</title>
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #3B2314; background: #FFF8F0; line-height: 1.6; }
h1, h2, h3 { font-family: Georgia, 'Times New Roman', serif; }

.hero {
  background: linear-gradient(135deg, #C2703E 0%, #A8572E 100%);
  color: #FFF8F0;
  text-align: center;
  padding: 80px 24px;
}
.hero h1 { font-size: 3rem; margin-bottom: 8px; }
.hero p { font-size: 1.25rem; opacity: 0.9; }

section { max-width: 960px; margin: 0 auto; padding: 60px 24px; }

.hours-location {
  display: flex; flex-wrap: wrap; gap: 40px;
  background: #fff; border-radius: 12px; padding: 40px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.06);
}
.hours-location > div { flex: 1; min-width: 220px; }
.hours-location h2 { font-size: 1.5rem; color: #C2703E; margin-bottom: 12px; }
.hours-location p { margin-bottom: 4px; }

.menu-section h2 { text-align: center; font-size: 2rem; color: #C2703E; margin-bottom: 32px; }
.menu-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 32px; }
.menu-card { background: #fff; border-radius: 12px; padding: 28px; box-shadow: 0 1px 3px rgba(0,0,0,0.06); }
.menu-card h3 { font-size: 1.25rem; color: #3B2314; margin-bottom: 16px; padding-bottom: 8px; border-bottom: 2px solid #A8B5A0; }
.menu-item { display: flex; justify-content: space-between; padding: 6px 0; }
.menu-item .price { color: #C2703E; font-weight: 600; }

footer {
  background: #3B2314; color: #FFF8F0; text-align: center; padding: 40px 24px;
  font-size: 0.875rem; line-height: 1.8;
}
footer a { color: #A8B5A0; text-decoration: none; }
footer .wp { opacity: 0.5; margin-top: 16px; }
</style>
</head>
<body>

<div class="hero">
  <h1>Downstreet Cafe</h1>
  <p>Your neighborhood coffee spot</p>
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
</html>`
