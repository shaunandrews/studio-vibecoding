export const homepage = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Alex Chen — UI/UX Designer</title>
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #2d2d2d; background: #fff; line-height: 1.6; }

.intro { max-width: 800px; margin: 0 auto; padding: 100px 24px 80px; }
.intro .greeting { font-size: 1rem; color: #0d9488; font-weight: 600; margin-bottom: 8px; }
.intro h1 { font-size: 2.75rem; font-weight: 700; margin-bottom: 12px; }
.intro p { font-size: 1.2rem; color: #666; max-width: 520px; }

.work { max-width: 800px; margin: 0 auto; padding: 0 24px 80px; }
.work h2 { font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.1em; color: #999; margin-bottom: 24px; }
.card-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; }
.card { border-radius: 12px; overflow: hidden; background: #f5f5f5; }
.card-thumb { height: 180px; }
.card-body { padding: 20px; }
.card-body h3 { font-size: 1rem; font-weight: 600; margin-bottom: 4px; }
.card-body p { font-size: 0.875rem; color: #777; }

.about { max-width: 800px; margin: 0 auto; padding: 0 24px 80px; }
.about h2 { font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.1em; color: #999; margin-bottom: 12px; }
.about p { max-width: 560px; color: #555; }

footer { max-width: 800px; margin: 0 auto; padding: 40px 24px; border-top: 1px solid #eee; font-size: 0.85rem; color: #999; display: flex; justify-content: space-between; flex-wrap: wrap; gap: 12px; }
footer a { color: #0d9488; text-decoration: none; }
</style>
</head>
<body>

<section class="intro">
  <div class="greeting">Hello —</div>
  <h1>Hi, I'm Alex Chen</h1>
  <p>UI/UX Designer crafting digital experiences that are simple, purposeful, and human.</p>
</section>

<section class="work">
  <h2>Selected Work</h2>
  <div class="card-grid">
    <div class="card">
      <div class="card-thumb" style="background: #c7d2cb;"></div>
      <div class="card-body">
        <h3>Meridian Banking App</h3>
        <p>Reimagining personal finance for a mobile-first generation.</p>
      </div>
    </div>
    <div class="card">
      <div class="card-thumb" style="background: #b8c5d6;"></div>
      <div class="card-body">
        <h3>Solstice Weather</h3>
        <p>A calm, beautiful weather app that respects your attention.</p>
      </div>
    </div>
    <div class="card">
      <div class="card-thumb" style="background: #d6c7b8;"></div>
      <div class="card-body">
        <h3>Aura Health Dashboard</h3>
        <p>Making complex health data feel approachable and clear.</p>
      </div>
    </div>
    <div class="card">
      <div class="card-thumb" style="background: #c4b8d6;"></div>
      <div class="card-body">
        <h3>Prism Design System</h3>
        <p>A unified design language for a growing product suite.</p>
      </div>
    </div>
  </div>
</section>

<section class="about">
  <h2>About</h2>
  <p>I'm a product designer based in San Francisco with 8 years of experience building interfaces for startups and established brands. I believe great design disappears — it just feels right.</p>
</section>

<footer>
  <span>alex@alexchen.design</span>
  <div>
    <a href="#">Dribbble</a> · <a href="#">LinkedIn</a> · <a href="#">Twitter</a>
  </div>
</footer>

</body>
</html>`
