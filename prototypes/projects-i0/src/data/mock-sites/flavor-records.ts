export const homepage = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Flavor Records</title>
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #F5F0EB; background: #1A1A1A; line-height: 1.6; }
h1, h2, h3 { font-family: system-ui, sans-serif; font-weight: 900; }

.hero { padding: 100px 24px 80px; text-align: center; }
.hero h1 { font-size: 3.5rem; letter-spacing: -0.02em; text-transform: uppercase; }
.hero p { font-size: 1.1rem; color: #999; margin-top: 8px; }

section { max-width: 900px; margin: 0 auto; padding: 0 24px 80px; }

.featured h2 { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.12em; color: #666; margin-bottom: 24px; }
.featured-release { display: flex; gap: 32px; align-items: center; flex-wrap: wrap; }
.featured-art { width: 300px; max-width: 100%; aspect-ratio: 1; border-radius: 8px; background: linear-gradient(135deg, #8B5CF6, #3B82F6); flex-shrink: 0; }
.featured-info h3 { font-size: 2rem; margin-bottom: 4px; }
.featured-info .artist { font-size: 1.1rem; color: #999; margin-bottom: 16px; }
.featured-info .listen { display: inline-block; padding: 10px 28px; background: #F5F0EB; color: #1A1A1A; border-radius: 100px; text-decoration: none; font-weight: 700; font-size: 0.9rem; }

.catalog h2 { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.12em; color: #666; margin-bottom: 24px; }
.release-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 20px; }
.release { cursor: pointer; }
.release-art { aspect-ratio: 1; border-radius: 6px; margin-bottom: 10px; }
.release h4 { font-size: 0.95rem; font-weight: 700; }
.release .artist { font-size: 0.85rem; color: #888; }

footer { text-align: center; padding: 48px 24px; font-size: 0.8rem; color: #555; border-top: 1px solid #2a2a2a; }
</style>
</head>
<body>

<div class="hero">
  <h1>Flavor Records</h1>
  <p>Independent music since 2019</p>
</div>

<section class="featured">
  <h2>Featured Release</h2>
  <div class="featured-release">
    <div class="featured-art"></div>
    <div class="featured-info">
      <div class="artist">Midnight Signal</div>
      <h3>Echoes of Tomorrow</h3>
      <p class="artist" style="margin-bottom:20px;">12 tracks · January 2026</p>
      <a href="#" class="listen">Listen Now</a>
    </div>
  </div>
</section>

<section class="catalog">
  <h2>Recent Releases</h2>
  <div class="release-grid">
    <div class="release">
      <div class="release-art" style="background: linear-gradient(135deg, #06B6D4, #10B981);"></div>
      <h4>Neon Drift</h4>
      <div class="artist">Glass Canyon</div>
    </div>
    <div class="release">
      <div class="release-art" style="background: linear-gradient(135deg, #EC4899, #F59E0B);"></div>
      <h4>Soft Static</h4>
      <div class="artist">Vera Luna</div>
    </div>
    <div class="release">
      <div class="release-art" style="background: linear-gradient(135deg, #6366F1, #9333EA);"></div>
      <h4>Volume III</h4>
      <div class="artist">The Haze</div>
    </div>
    <div class="release">
      <div class="release-art" style="background: linear-gradient(135deg, #F97316, #EF4444);"></div>
      <h4>After Hours</h4>
      <div class="artist">DJ Sable</div>
    </div>
  </div>
</section>

<footer>
  <p>Flavor Records · Portland, OR · info@flavorrecords.com</p>
  <p style="margin-top:4px;">&copy; 2026 Flavor Records. All rights reserved.</p>
</footer>

</body>
</html>`
