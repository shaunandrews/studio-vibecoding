export function homepage(themeCSS: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Alex Chen — UI/UX Designer</title>
<style>${themeCSS}</style>
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: var(--theme-font-body); color: var(--theme-text); background: var(--theme-bg); line-height: var(--theme-line-height-normal); }

.intro { max-width: var(--theme-content-width); margin: 0 auto; padding: var(--theme-space-8) var(--theme-space-3) var(--theme-space-10); }
.intro .greeting { font-size: var(--theme-font-size-medium); color: var(--theme-color-primary); font-weight: 600; margin-bottom: var(--theme-space-1); }
.intro h1 { font-size: var(--theme-font-size-hero); font-weight: 700; margin-bottom: 12px; }
.intro p { font-size: var(--theme-font-size-large); color: var(--theme-color-muted); max-width: 520px; }

.work { max-width: var(--theme-content-width); margin: 0 auto; padding: 0 var(--theme-space-3) var(--theme-space-10); }
.work h2 { font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.1em; color: var(--theme-color-muted-light); margin-bottom: var(--theme-space-3); }
.card-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; }
.card { border-radius: 12px; overflow: hidden; background: var(--theme-color-surface-alt); transition: transform 0.2s, box-shadow 0.2s; }
.card:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.08); }
.card-link { text-decoration: none; color: inherit; display: block; }
.card-thumb { height: 180px; }
.card-body { padding: 20px; }
.card-body h3 { font-size: var(--theme-font-size-medium); font-weight: 600; margin-bottom: 4px; }
.card-body p { font-size: 0.875rem; color: var(--theme-color-muted); }

.about { max-width: var(--theme-content-width); margin: 0 auto; padding: 0 var(--theme-space-3) var(--theme-space-10); }
.about h2 { font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.1em; color: var(--theme-color-muted-light); margin-bottom: 12px; }
.about p { max-width: 560px; color: #555; }

footer { max-width: var(--theme-content-width); margin: 0 auto; padding: var(--theme-space-5) var(--theme-space-3); border-top: 1px solid var(--theme-color-border); font-size: var(--theme-font-size-small); color: var(--theme-color-muted-light); display: flex; justify-content: space-between; flex-wrap: wrap; gap: 12px; }
footer a { color: var(--theme-color-primary); text-decoration: none; }
</style>
</head>
<body>

<nav style="max-width:var(--theme-content-width);margin:0 auto;padding:20px 24px;display:flex;justify-content:space-between;align-items:center;">
  <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'homepage'},'*');return false" style="font-weight:700;color:var(--theme-text);text-decoration:none;">Alex Chen</a>
  <div style="display:flex;gap:24px;">
    <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'work'},'*');return false" style="color:var(--theme-text);text-decoration:none;font-size:0.9rem;">Work</a>
    <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'process'},'*');return false" style="color:var(--theme-text);text-decoration:none;font-size:0.9rem;">Process</a>
    <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'contact'},'*');return false" style="color:var(--theme-text);text-decoration:none;font-size:0.9rem;">Contact</a>
  </div>
</nav>

<section class="intro">
  <div class="greeting">Hello —</div>
  <h1>Hi, I'm Alex Chen</h1>
  <p>UI/UX Designer crafting digital experiences that are simple, purposeful, and human.</p>
</section>

<section class="work">
  <h2>Selected Work</h2>
  <div class="card-grid">
    <a class="card-link" href="#" onclick="window.parent.postMessage({type:'navigate',page:'casestudy'},'*');return false">
      <div class="card">
        <div class="card-thumb" style="background: #c7d2cb;"></div>
        <div class="card-body">
          <h3>Meridian Banking App</h3>
          <p>Reimagining personal finance for a mobile-first generation.</p>
        </div>
      </div>
    </a>
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
}

export function casestudy(themeCSS: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Meridian Banking App — Alex Chen</title>
<style>${themeCSS}</style>
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: var(--theme-font-body); color: var(--theme-text); background: var(--theme-bg); line-height: var(--theme-line-height-normal); }

.hero { max-width: var(--theme-content-width); margin: 0 auto; padding: var(--theme-space-8) var(--theme-space-3) var(--theme-space-6); }
.hero .label { font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.1em; color: var(--theme-color-primary); font-weight: 600; margin-bottom: 12px; }
.hero h1 { font-size: var(--theme-font-size-xlarge); font-weight: 700; margin-bottom: 12px; }
.hero p { font-size: 1.15rem; color: var(--theme-color-muted); max-width: 560px; }

.hero-image { max-width: var(--theme-content-width); margin: 0 auto; padding: 0 var(--theme-space-3) var(--theme-space-6); }
.hero-image div { height: 320px; border-radius: 16px; background: linear-gradient(135deg, #c7d2cb 0%, #a8b9ad 100%); display: flex; align-items: center; justify-content: center; color: var(--theme-bg); font-size: var(--theme-font-size-medium); font-weight: 500; letter-spacing: 0.05em; }

.meta { max-width: var(--theme-content-width); margin: 0 auto; padding: 0 var(--theme-space-3) var(--theme-space-8); display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--theme-space-3); }
.meta-item .meta-label { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em; color: var(--theme-color-muted-light); margin-bottom: 4px; }
.meta-item .meta-value { font-size: var(--theme-font-size-medium); font-weight: 600; }

.section { max-width: var(--theme-content-width); margin: 0 auto; padding: 0 var(--theme-space-3) var(--theme-space-8); }
.section h2 { font-size: 1.5rem; font-weight: 700; margin-bottom: var(--theme-space-2); }
.section h3 { font-size: 1.1rem; font-weight: 600; margin-bottom: var(--theme-space-1); color: var(--theme-color-primary); }
.section p { color: #555; margin-bottom: var(--theme-space-2); max-width: 640px; }
.section ul { color: #555; margin-left: 20px; margin-bottom: var(--theme-space-2); }
.section ul li { margin-bottom: 6px; }

.image-block { max-width: var(--theme-content-width); margin: 0 auto; padding: 0 var(--theme-space-3) var(--theme-space-8); }
.image-block div { height: 240px; border-radius: 12px; display: flex; align-items: center; justify-content: center; color: var(--theme-bg); font-size: 0.9rem; font-weight: 500; letter-spacing: 0.05em; }
.image-row { max-width: var(--theme-content-width); margin: 0 auto; padding: 0 var(--theme-space-3) var(--theme-space-8); display: grid; grid-template-columns: 1fr 1fr; gap: var(--theme-space-2); }
.image-row div { height: 200px; border-radius: 12px; display: flex; align-items: center; justify-content: center; color: var(--theme-bg); font-size: var(--theme-font-size-small); font-weight: 500; letter-spacing: 0.05em; }

.results-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-top: var(--theme-space-2); }
.result-card { background: var(--theme-color-surface-alt); border-radius: 12px; padding: var(--theme-space-3); }
.result-card .number { font-size: 2rem; font-weight: 700; color: var(--theme-color-primary); margin-bottom: 4px; }
.result-card .desc { font-size: 0.875rem; color: var(--theme-color-muted); }

footer { max-width: var(--theme-content-width); margin: 0 auto; padding: var(--theme-space-5) var(--theme-space-3); border-top: 1px solid var(--theme-color-border); font-size: var(--theme-font-size-small); color: var(--theme-color-muted-light); display: flex; justify-content: space-between; flex-wrap: wrap; gap: 12px; }
footer a { color: var(--theme-color-primary); text-decoration: none; }
</style>
</head>
<body>

<nav style="max-width:var(--theme-content-width);margin:0 auto;padding:20px 24px;display:flex;justify-content:space-between;align-items:center;">
  <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'homepage'},'*');return false" style="font-weight:700;color:var(--theme-text);text-decoration:none;">Alex Chen</a>
  <div style="display:flex;gap:24px;">
    <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'work'},'*');return false" style="color:var(--theme-text);text-decoration:none;font-size:0.9rem;">Work</a>
    <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'process'},'*');return false" style="color:var(--theme-text);text-decoration:none;font-size:0.9rem;">Process</a>
    <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'contact'},'*');return false" style="color:var(--theme-text);text-decoration:none;font-size:0.9rem;">Contact</a>
  </div>
</nav>

<section class="hero">
  <div class="label">Case Study</div>
  <h1>Meridian Banking App</h1>
  <p>Reimagining personal finance for a mobile-first generation — making money management feel intuitive, not intimidating.</p>
</section>

<div class="hero-image">
  <div>Hero — App Overview</div>
</div>

<div class="meta">
  <div class="meta-item">
    <div class="meta-label">Role</div>
    <div class="meta-value">Lead Product Designer</div>
  </div>
  <div class="meta-item">
    <div class="meta-label">Timeline</div>
    <div class="meta-value">12 Weeks</div>
  </div>
  <div class="meta-item">
    <div class="meta-label">Team</div>
    <div class="meta-value">5 People</div>
  </div>
</div>

<section class="section">
  <h2>The Challenge</h2>
  <p>Meridian, a digital-first bank targeting millennials and Gen Z, was struggling with user retention. Their existing app felt like a spreadsheet — functional but lifeless. Users opened it to check balances and left immediately.</p>
  <p>The goal: transform the app from a utility into a daily companion that helps users build better financial habits, without sacrificing the trust and clarity that banking demands.</p>
</section>

<section class="section">
  <h2>Discovery & Research</h2>
  <p>I started by interviewing 24 users across three segments — students, early-career professionals, and freelancers. Key findings:</p>
  <ul>
    <li>78% felt anxious opening their banking app</li>
    <li>Users wanted to understand spending patterns, not just see transactions</li>
    <li>Trust was tied to visual clarity — cluttered screens felt "sketchy"</li>
    <li>Notifications were seen as nagging rather than helpful</li>
  </ul>
</section>

<div class="image-row">
  <div style="background: linear-gradient(135deg, #e8ede9 0%, #c7d2cb 100%);">Research Synthesis</div>
  <div style="background: linear-gradient(135deg, #dce3e0 0%, #b5c4ba 100%);">User Journey Map</div>
</div>

<section class="section">
  <h2>Design Process</h2>
  <h3>Information Architecture</h3>
  <p>I restructured the app around three core modes: Overview (how am I doing?), Activity (what happened?), and Goals (where am I going?). This replaced the flat tab-based navigation with a more intentional hierarchy.</p>

  <h3>Visual Language</h3>
  <p>We developed a warm, confident aesthetic — rounded cards with subtle depth, a muted earth-tone palette that felt calming rather than corporate, and generous whitespace that let numbers breathe.</p>

  <h3>Interaction Design</h3>
  <p>Micro-interactions became key to the experience. Smooth transitions between views, satisfying progress animations on savings goals, and gentle haptic feedback for confirmations. Every interaction reinforced the feeling of being in control.</p>
</section>

<div class="image-block">
  <div style="background: linear-gradient(135deg, #c7d2cb 0%, #9bb0a3 100%);">Final UI — Dashboard & Activity Views</div>
</div>

<div class="image-row">
  <div style="background: linear-gradient(135deg, #b8c9be 0%, #8fa899 100%);">Goals Screen</div>
  <div style="background: linear-gradient(135deg, #a8b9ad 0%, #89a090 100%);">Spending Insights</div>
</div>

<section class="section">
  <h2>The Solution</h2>
  <p>The redesigned Meridian app centers around a personalized dashboard that greets users with a clear financial snapshot — not a wall of numbers, but a curated summary of what matters today. Spending insights are woven throughout, surfacing patterns in plain language rather than charts.</p>
  <p>The savings goals feature uses visual progress indicators and milestone celebrations, turning the often-dreaded act of saving into something genuinely rewarding.</p>
</section>

<section class="section">
  <h2>Results</h2>
  <p>After launch, the numbers told a compelling story:</p>
  <div class="results-grid">
    <div class="result-card">
      <div class="number">+47%</div>
      <div class="desc">Daily active users within 3 months</div>
    </div>
    <div class="result-card">
      <div class="number">+62%</div>
      <div class="desc">Average session duration</div>
    </div>
    <div class="result-card">
      <div class="number">4.8★</div>
      <div class="desc">App Store rating (up from 3.2)</div>
    </div>
    <div class="result-card">
      <div class="number">−31%</div>
      <div class="desc">Support tickets related to navigation</div>
    </div>
  </div>
</section>

<section class="section">
  <h2>Reflection</h2>
  <p>This project reinforced something I deeply believe: in fintech, empathy is a feature. Users don't just need to see their money — they need to feel okay about it. The biggest design wins weren't visual; they were emotional.</p>
</section>

<footer>
  <span>alex@alexchen.design</span>
  <div>
    <a href="#">Dribbble</a> · <a href="#">LinkedIn</a> · <a href="#">Twitter</a>
  </div>
</footer>

</body>
</html>`
}

export function work(themeCSS: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Work — Alex Chen</title>
<style>${themeCSS}</style>
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: var(--theme-font-body); color: var(--theme-text); background: var(--theme-bg); line-height: var(--theme-line-height-normal); }

.hero { max-width: var(--theme-content-width); margin: 0 auto; padding: var(--theme-space-8) var(--theme-space-3) var(--theme-space-4); }
.hero h1 { font-size: var(--theme-font-size-xlarge); font-weight: 700; margin-bottom: 8px; }
.hero p { font-size: 1.1rem; color: var(--theme-color-muted); max-width: 520px; }

.filters { max-width: var(--theme-content-width); margin: 0 auto; padding: 0 var(--theme-space-3) var(--theme-space-4); display: flex; gap: 8px; flex-wrap: wrap; }
.filter-btn { padding: 8px 18px; border-radius: 20px; border: 1px solid var(--theme-color-border); background: transparent; color: var(--theme-color-muted); font-size: 0.85rem; font-family: var(--theme-font-body); cursor: pointer; transition: all 0.2s; }
.filter-btn:hover { border-color: var(--theme-color-primary); color: var(--theme-color-primary); }
.filter-btn.active { background: var(--theme-color-primary); color: var(--theme-bg); border-color: var(--theme-color-primary); }

.project-grid { max-width: var(--theme-content-width); margin: 0 auto; padding: 0 var(--theme-space-3) var(--theme-space-10); display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; }
.project-card { border-radius: 14px; overflow: hidden; background: var(--theme-color-surface-alt); transition: transform 0.25s, box-shadow 0.25s; cursor: pointer; text-decoration: none; color: inherit; display: block; position: relative; }
.project-card:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(0,0,0,0.1); }
.project-thumb { height: 220px; position: relative; overflow: hidden; }
.project-overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.6); opacity: 0; transition: opacity 0.3s; display: flex; align-items: center; justify-content: center; }
.project-card:hover .project-overlay { opacity: 1; }
.project-overlay span { color: #fff; font-weight: 600; font-size: 0.95rem; padding: 10px 24px; border: 2px solid #fff; border-radius: 24px; }
.project-info { padding: 20px; }
.project-info h3 { font-size: var(--theme-font-size-medium); font-weight: 600; margin-bottom: 4px; }
.project-info .client { font-size: 0.85rem; color: var(--theme-color-muted); margin-bottom: 8px; }
.project-info .category { display: inline-block; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.08em; color: var(--theme-color-primary); font-weight: 600; background: rgba(16,185,129,0.08); padding: 4px 10px; border-radius: 4px; }

footer { max-width: var(--theme-content-width); margin: 0 auto; padding: var(--theme-space-5) var(--theme-space-3); border-top: 1px solid var(--theme-color-border); font-size: var(--theme-font-size-small); color: var(--theme-color-muted-light); display: flex; justify-content: space-between; flex-wrap: wrap; gap: 12px; }
footer a { color: var(--theme-color-primary); text-decoration: none; }
</style>
</head>
<body>

<nav style="max-width:var(--theme-content-width);margin:0 auto;padding:20px 24px;display:flex;justify-content:space-between;align-items:center;">
  <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'homepage'},'*');return false" style="font-weight:700;color:var(--theme-text);text-decoration:none;">Alex Chen</a>
  <div style="display:flex;gap:24px;">
    <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'work'},'*');return false" style="color:var(--theme-color-primary);text-decoration:none;font-size:0.9rem;font-weight:600;">Work</a>
    <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'process'},'*');return false" style="color:var(--theme-text);text-decoration:none;font-size:0.9rem;">Process</a>
    <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'contact'},'*');return false" style="color:var(--theme-text);text-decoration:none;font-size:0.9rem;">Contact</a>
  </div>
</nav>

<section class="hero">
  <h1>Work</h1>
  <p>A curated selection of projects spanning mobile apps, web platforms, and design systems. Each one a story of turning complexity into clarity.</p>
</section>

<div class="filters">
  <button class="filter-btn active">All</button>
  <button class="filter-btn">Mobile App</button>
  <button class="filter-btn">Web Platform</button>
  <button class="filter-btn">Design System</button>
  <button class="filter-btn">Dashboard</button>
</div>

<div class="project-grid">
  <a class="project-card" href="#" onclick="window.parent.postMessage({type:'navigate',page:'casestudy'},'*');return false">
    <div class="project-thumb" style="background: linear-gradient(135deg, #c7d2cb 0%, #8fa899 100%);">
      <div class="project-overlay"><span>View Case Study</span></div>
    </div>
    <div class="project-info">
      <h3>Meridian Banking App</h3>
      <div class="client">Meridian Financial</div>
      <span class="category">Mobile App</span>
    </div>
  </a>
  <a class="project-card" href="#" onclick="window.parent.postMessage({type:'navigate',page:'casestudy2'},'*');return false">
    <div class="project-thumb" style="background: linear-gradient(135deg, #a8d5ba 0%, #5b9279 100%);">
      <div class="project-overlay"><span>View Case Study</span></div>
    </div>
    <div class="project-info">
      <h3>Verdant</h3>
      <div class="client">Verdant Inc.</div>
      <span class="category">Web Platform</span>
    </div>
  </a>
  <a class="project-card" href="#">
    <div class="project-thumb" style="background: linear-gradient(135deg, #b8c5d6 0%, #7a94b3 100%);">
      <div class="project-overlay"><span>View Project</span></div>
    </div>
    <div class="project-info">
      <h3>Solstice Weather</h3>
      <div class="client">Solstice Labs</div>
      <span class="category">Mobile App</span>
    </div>
  </a>
  <a class="project-card" href="#">
    <div class="project-thumb" style="background: linear-gradient(135deg, #d6c7b8 0%, #b8a48e 100%);">
      <div class="project-overlay"><span>View Project</span></div>
    </div>
    <div class="project-info">
      <h3>Aura Health Dashboard</h3>
      <div class="client">Aura Health</div>
      <span class="category">Dashboard</span>
    </div>
  </a>
  <a class="project-card" href="#">
    <div class="project-thumb" style="background: linear-gradient(135deg, #c4b8d6 0%, #9b89b8 100%);">
      <div class="project-overlay"><span>View Project</span></div>
    </div>
    <div class="project-info">
      <h3>Prism Design System</h3>
      <div class="client">Prism Studio</div>
      <span class="category">Design System</span>
    </div>
  </a>
  <a class="project-card" href="#">
    <div class="project-thumb" style="background: linear-gradient(135deg, #f0c27f 0%, #d4945a 100%);">
      <div class="project-overlay"><span>View Project</span></div>
    </div>
    <div class="project-info">
      <h3>Harvest Marketplace</h3>
      <div class="client">Harvest Co.</div>
      <span class="category">Web Platform</span>
    </div>
  </a>
  <a class="project-card" href="#">
    <div class="project-thumb" style="background: linear-gradient(135deg, #e8b4b8 0%, #c77d83 100%);">
      <div class="project-overlay"><span>View Project</span></div>
    </div>
    <div class="project-info">
      <h3>Cadence Fitness</h3>
      <div class="client">Cadence Inc.</div>
      <span class="category">Mobile App</span>
    </div>
  </a>
  <a class="project-card" href="#">
    <div class="project-thumb" style="background: linear-gradient(135deg, #89CFF0 0%, #5B8DB8 100%);">
      <div class="project-overlay"><span>View Project</span></div>
    </div>
    <div class="project-info">
      <h3>Nimbus Component Library</h3>
      <div class="client">Nimbus Cloud</div>
      <span class="category">Design System</span>
    </div>
  </a>
</div>

<footer>
  <span>alex@alexchen.design</span>
  <div>
    <a href="#">Dribbble</a> · <a href="#">LinkedIn</a> · <a href="#">Twitter</a>
  </div>
</footer>

</body>
</html>`
}

export function casestudy2(themeCSS: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Verdant — Sustainable Shopping Platform — Alex Chen</title>
<style>${themeCSS}</style>
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: var(--theme-font-body); color: var(--theme-text); background: var(--theme-bg); line-height: var(--theme-line-height-normal); }

.hero { max-width: var(--theme-content-width); margin: 0 auto; padding: var(--theme-space-8) var(--theme-space-3) var(--theme-space-6); }
.hero .label { font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.1em; color: var(--theme-color-primary); font-weight: 600; margin-bottom: 12px; }
.hero h1 { font-size: var(--theme-font-size-xlarge); font-weight: 700; margin-bottom: 12px; }
.hero p { font-size: 1.15rem; color: var(--theme-color-muted); max-width: 560px; }

.hero-image { max-width: var(--theme-content-width); margin: 0 auto; padding: 0 var(--theme-space-3) var(--theme-space-6); }
.hero-image div { height: 340px; border-radius: 16px; display: flex; align-items: center; justify-content: center; color: #fff; font-size: var(--theme-font-size-medium); font-weight: 500; letter-spacing: 0.05em; }

.meta { max-width: var(--theme-content-width); margin: 0 auto; padding: 0 var(--theme-space-3) var(--theme-space-8); display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--theme-space-3); }
.meta-item .meta-label { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em; color: var(--theme-color-muted-light); margin-bottom: 4px; }
.meta-item .meta-value { font-size: var(--theme-font-size-medium); font-weight: 600; }

.section { max-width: var(--theme-content-width); margin: 0 auto; padding: 0 var(--theme-space-3) var(--theme-space-8); }
.section h2 { font-size: 1.5rem; font-weight: 700; margin-bottom: var(--theme-space-2); }
.section h3 { font-size: 1.1rem; font-weight: 600; margin-bottom: var(--theme-space-1); color: var(--theme-color-primary); }
.section p { color: #555; margin-bottom: var(--theme-space-2); max-width: 640px; }
.section ul { color: #555; margin-left: 20px; margin-bottom: var(--theme-space-2); }
.section ul li { margin-bottom: 6px; }

.image-block { max-width: var(--theme-content-width); margin: 0 auto; padding: 0 var(--theme-space-3) var(--theme-space-8); }
.image-block div { height: 240px; border-radius: 12px; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 0.9rem; font-weight: 500; letter-spacing: 0.05em; }
.image-row { max-width: var(--theme-content-width); margin: 0 auto; padding: 0 var(--theme-space-3) var(--theme-space-8); display: grid; grid-template-columns: 1fr 1fr; gap: var(--theme-space-2); }
.image-row div { height: 200px; border-radius: 12px; display: flex; align-items: center; justify-content: center; color: #fff; font-size: var(--theme-font-size-small); font-weight: 500; letter-spacing: 0.05em; }

.timeline { max-width: var(--theme-content-width); margin: 0 auto; padding: 0 var(--theme-space-3) var(--theme-space-8); }
.timeline h2 { font-size: 1.5rem; font-weight: 700; margin-bottom: var(--theme-space-3); }
.timeline-track { display: flex; gap: 0; position: relative; }
.timeline-phase { flex: 1; text-align: center; padding: 20px 12px; position: relative; }
.timeline-phase::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 4px; border-radius: 2px; }
.timeline-phase:nth-child(1)::before { background: #5b9279; }
.timeline-phase:nth-child(2)::before { background: #7ab893; }
.timeline-phase:nth-child(3)::before { background: #9dd4ad; }
.timeline-phase:nth-child(4)::before { background: #b8e6c8; }
.timeline-phase .phase-name { font-weight: 600; font-size: 0.85rem; margin-bottom: 4px; }
.timeline-phase .phase-duration { font-size: 0.75rem; color: var(--theme-color-muted); }

.compare { max-width: var(--theme-content-width); margin: 0 auto; padding: 0 var(--theme-space-3) var(--theme-space-8); }
.compare h2 { font-size: 1.5rem; font-weight: 700; margin-bottom: var(--theme-space-3); }
.compare-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
.compare-col h3 { font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 12px; }
.compare-col.before h3 { color: var(--theme-color-muted); }
.compare-col.after h3 { color: var(--theme-color-primary); }
.compare-block { border-radius: 12px; padding: 24px; min-height: 280px; }
.compare-block.before-block { background: var(--theme-color-surface-alt); border: 1px solid var(--theme-color-border); }
.compare-block.after-block { background: linear-gradient(135deg, rgba(91,146,121,0.08) 0%, rgba(168,213,186,0.12) 100%); border: 1px solid rgba(91,146,121,0.2); }
.compare-block .mock-row { display: flex; gap: 8px; margin-bottom: 10px; align-items: center; }
.compare-block .mock-bar { height: 10px; border-radius: 5px; background: var(--theme-color-border); }
.compare-block .mock-bar.green { background: linear-gradient(90deg, #5b9279, #9dd4ad); }
.compare-block .mock-square { width: 40px; height: 40px; border-radius: 8px; background: var(--theme-color-border); flex-shrink: 0; }
.compare-block .mock-square.green { background: linear-gradient(135deg, #5b9279, #7ab893); }
.compare-block .mock-text { font-size: 0.8rem; color: var(--theme-color-muted); margin-bottom: 6px; }
.compare-block .mock-heading { font-size: 0.9rem; font-weight: 600; margin-bottom: 12px; }

.results-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: var(--theme-space-2); }
.result-card { background: var(--theme-color-surface-alt); border-radius: 12px; padding: var(--theme-space-3); }
.result-card .number { font-size: 2rem; font-weight: 700; color: var(--theme-color-primary); margin-bottom: 4px; }
.result-card .desc { font-size: 0.875rem; color: var(--theme-color-muted); }

.testimonial { max-width: var(--theme-content-width); margin: 0 auto; padding: 0 var(--theme-space-3) var(--theme-space-8); }
.testimonial blockquote { border-left: 3px solid var(--theme-color-primary); padding-left: 20px; font-size: 1.1rem; color: #444; font-style: italic; margin-bottom: 8px; max-width: 600px; }
.testimonial cite { font-size: 0.85rem; color: var(--theme-color-muted); font-style: normal; padding-left: 20px; }

footer { max-width: var(--theme-content-width); margin: 0 auto; padding: var(--theme-space-5) var(--theme-space-3); border-top: 1px solid var(--theme-color-border); font-size: var(--theme-font-size-small); color: var(--theme-color-muted-light); display: flex; justify-content: space-between; flex-wrap: wrap; gap: 12px; }
footer a { color: var(--theme-color-primary); text-decoration: none; }
</style>
</head>
<body>

<nav style="max-width:var(--theme-content-width);margin:0 auto;padding:20px 24px;display:flex;justify-content:space-between;align-items:center;">
  <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'homepage'},'*');return false" style="font-weight:700;color:var(--theme-text);text-decoration:none;">Alex Chen</a>
  <div style="display:flex;gap:24px;">
    <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'work'},'*');return false" style="color:var(--theme-text);text-decoration:none;font-size:0.9rem;">Work</a>
    <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'process'},'*');return false" style="color:var(--theme-text);text-decoration:none;font-size:0.9rem;">Process</a>
    <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'contact'},'*');return false" style="color:var(--theme-text);text-decoration:none;font-size:0.9rem;">Contact</a>
  </div>
</nav>

<section class="hero">
  <div class="label">Case Study</div>
  <h1>Verdant — Sustainable Shopping Platform</h1>
  <p>Helping conscious consumers find, compare, and buy sustainable products without the guilt-trip or the guesswork.</p>
</section>

<div class="hero-image">
  <div style="background: linear-gradient(135deg, #a8d5ba 0%, #5b9279 100%);">Hero — Platform Overview</div>
</div>

<div class="meta">
  <div class="meta-item">
    <div class="meta-label">Role</div>
    <div class="meta-value">Lead Designer</div>
  </div>
  <div class="meta-item">
    <div class="meta-label">Timeline</div>
    <div class="meta-value">16 Weeks</div>
  </div>
  <div class="meta-item">
    <div class="meta-label">Team</div>
    <div class="meta-value">8 People</div>
  </div>
  <div class="meta-item">
    <div class="meta-label">Platform</div>
    <div class="meta-value">Web &amp; iOS</div>
  </div>
</div>

<section class="section">
  <h2>The Challenge</h2>
  <p>Verdant wanted to build an e-commerce platform for sustainable products — but the space was full of greenwashing, confusing eco-labels, and guilt-driven marketing. Shoppers didn't trust sustainability claims, and ethical brands struggled to stand out in a sea of vague "eco-friendly" tags.</p>
  <p>The brief: create a shopping experience that makes sustainability transparent, trustworthy, and — crucially — enjoyable. Not preachy. Not overwhelming. Just helpful.</p>
</section>

<section class="section">
  <h2>Research &amp; Discovery</h2>
  <h3>Understanding the Landscape</h3>
  <p>I conducted competitive analysis across 12 sustainable marketplaces and interviewed 30 consumers who'd tried eco-conscious shopping. The findings were revealing:</p>
  <ul>
    <li>84% of users distrusted "green" labels without third-party verification</li>
    <li>Average time to assess a product's sustainability: 4.2 minutes (vs. 30 seconds for price/reviews)</li>
    <li>67% abandoned carts when they couldn't verify environmental claims</li>
    <li>Users wanted to feel empowered, not lectured</li>
  </ul>
  <h3>Key Insight</h3>
  <p>People don't want to become sustainability experts. They want to make good choices quickly and feel confident about them. The design needed to do the heavy lifting — translating complex certifications and supply-chain data into instant, glanceable trust signals.</p>
</section>

<div class="image-row">
  <div style="background: linear-gradient(135deg, #d4edda 0%, #a8d5ba 100%);">Affinity Mapping</div>
  <div style="background: linear-gradient(135deg, #c3e6cb 0%, #82c99a 100%);">User Personas</div>
</div>

<div class="timeline">
  <h2>Project Timeline</h2>
  <div class="timeline-track">
    <div class="timeline-phase">
      <div class="phase-name">Discovery</div>
      <div class="phase-duration">Weeks 1–3</div>
    </div>
    <div class="timeline-phase">
      <div class="phase-name">Design &amp; Prototype</div>
      <div class="phase-duration">Weeks 4–9</div>
    </div>
    <div class="timeline-phase">
      <div class="phase-name">Test &amp; Iterate</div>
      <div class="phase-duration">Weeks 10–13</div>
    </div>
    <div class="timeline-phase">
      <div class="phase-name">Ship &amp; Measure</div>
      <div class="phase-duration">Weeks 14–16</div>
    </div>
  </div>
</div>

<section class="section">
  <h2>Design Approach</h2>
  <h3>The Sustainability Score</h3>
  <p>The centerpiece of the design: a clear, 0–100 "Impact Score" displayed on every product. Rather than throwing raw certifications at users, I designed an algorithm visualization that breaks sustainability into four pillars — Materials, Labor, Transport, and End-of-Life — each with a simple progress bar and plain-language summary.</p>
  <p>Users could tap into detail or trust the top-line number. Both paths were equally valid.</p>

  <h3>Visual Language</h3>
  <p>I developed a design language rooted in natural textures and warm greens — but avoided the cliché "leaf-and-earth" aesthetic. The palette is modern, almost editorial. Clean typography (Söhne for headings, Inter for body) signals credibility without feeling corporate. Product photography sits on soft gradient backgrounds, not busy lifestyle shots.</p>

  <h3>Smart Filtering</h3>
  <p>Traditional filters (price, category) were augmented with values-based filters: "Plastic-Free Packaging," "Living Wage Certified," "Carbon Neutral Shipping." These surface as gentle suggestions, not gatekeeping mechanisms — nudging rather than judging.</p>
</section>

<div class="image-block">
  <div style="background: linear-gradient(135deg, #a8d5ba 0%, #5b9279 100%);">Product Detail Page — Impact Score Breakdown</div>
</div>

<div class="image-row">
  <div style="background: linear-gradient(135deg, #b8e6c8 0%, #7ab893 100%);">Smart Filters UI</div>
  <div style="background: linear-gradient(135deg, #9dd4ad 0%, #6aab84 100%);">Collection Browsing</div>
</div>

<div class="compare">
  <h2>Before &amp; After</h2>
  <div class="compare-grid">
    <div class="compare-col before">
      <h3>Before — Original Platform</h3>
      <div class="compare-block before-block">
        <div class="mock-heading">Product: Organic Cotton Tee</div>
        <div class="mock-row"><div class="mock-bar" style="width:60%;"></div></div>
        <div class="mock-text">✓ Eco-Friendly  ✓ Sustainable  ✓ Green</div>
        <div class="mock-row"><div class="mock-bar" style="width:80%;"></div></div>
        <div class="mock-row"><div class="mock-bar" style="width:45%;"></div></div>
        <div class="mock-text" style="margin-top:12px;">Certifications: FSC, GOTS, B-Corp, OEKO-TEX, Cradle to Cradle, Fair Trade, USDA Organic</div>
        <div class="mock-row"><div class="mock-bar" style="width:70%;"></div></div>
        <div class="mock-text" style="color:var(--theme-color-muted-light);font-style:italic;margin-top:8px;">Dense, unstructured, overwhelming. Users couldn't parse what mattered.</div>
      </div>
    </div>
    <div class="compare-col after">
      <h3>After — Verdant Redesign</h3>
      <div class="compare-block after-block">
        <div class="mock-heading">Product: Organic Cotton Tee</div>
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px;">
          <div style="width:52px;height:52px;border-radius:50%;background:linear-gradient(135deg,#5b9279,#9dd4ad);display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:1.1rem;">87</div>
          <div><div style="font-weight:600;font-size:0.9rem;">Impact Score</div><div style="font-size:0.75rem;color:var(--theme-color-muted);">Excellent sustainability rating</div></div>
        </div>
        <div class="mock-text" style="font-weight:600;">Materials · 92/100</div>
        <div class="mock-row"><div class="mock-bar green" style="width:92%;"></div></div>
        <div class="mock-text" style="font-weight:600;">Labor · 88/100</div>
        <div class="mock-row"><div class="mock-bar green" style="width:88%;"></div></div>
        <div class="mock-text" style="font-weight:600;">Transport · 74/100</div>
        <div class="mock-row"><div class="mock-bar green" style="width:74%;"></div></div>
        <div class="mock-text" style="color:var(--theme-color-muted-light);font-style:italic;margin-top:8px;">Clear, scannable, trustworthy. One number, with depth on demand.</div>
      </div>
    </div>
  </div>
</div>

<section class="section">
  <h2>The Solution</h2>
  <p>The final platform launched with three core experiences:</p>
  <ul>
    <li><strong>Browse with confidence</strong> — Every product carries its Impact Score front and center. No greenwashing hides behind the numbers.</li>
    <li><strong>Shop by values</strong> — Users set their priorities once (e.g., "I care most about labor practices") and the platform personalizes rankings accordingly.</li>
    <li><strong>Track your impact</strong> — A personal dashboard shows cumulative environmental impact of purchases: CO₂ saved, plastic avoided, fair-wage hours supported.</li>
  </ul>
  <p>The checkout flow includes a "Your Impact" summary — not to guilt-trip, but to celebrate the choices users are already making.</p>
</section>

<div class="image-block">
  <div style="background: linear-gradient(135deg, #7ab893 0%, #3d7a57 100%);">Personal Impact Dashboard</div>
</div>

<section class="section">
  <h2>Results</h2>
  <p>Verdant launched in beta with 200 brands and 3,400 products. Within 8 weeks:</p>
  <div class="results-grid">
    <div class="result-card">
      <div class="number">+73%</div>
      <div class="desc">Conversion rate vs. previous platform</div>
    </div>
    <div class="result-card">
      <div class="number">2.1×</div>
      <div class="desc">Average session duration</div>
    </div>
    <div class="result-card">
      <div class="number">91%</div>
      <div class="desc">Users said they trusted product claims</div>
    </div>
    <div class="result-card">
      <div class="number">−52%</div>
      <div class="desc">Cart abandonment rate</div>
    </div>
    <div class="result-card">
      <div class="number">4.9★</div>
      <div class="desc">Average app store rating</div>
    </div>
    <div class="result-card">
      <div class="number">68%</div>
      <div class="desc">Users returned within 7 days</div>
    </div>
  </div>
</section>

<div class="testimonial">
  <blockquote>"Alex didn't just redesign our platform — he reframed how we think about trust in sustainable commerce. The Impact Score alone changed our entire business model."</blockquote>
  <cite>— Maya Torres, CEO, Verdant Inc.</cite>
</div>

<section class="section">
  <h2>Reflection</h2>
  <p>This project taught me that transparency is a design material. The hardest challenge wasn't visual — it was deciding how much information to surface and when. Too little feels evasive; too much feels like a data dump. The sweet spot is progressive disclosure: give people a clear signal upfront, and let curiosity drive deeper exploration.</p>
  <p>Sustainability shouldn't require a PhD. Good design can bridge that gap.</p>
</section>

<footer>
  <span>alex@alexchen.design</span>
  <div>
    <a href="#">Dribbble</a> · <a href="#">LinkedIn</a> · <a href="#">Twitter</a>
  </div>
</footer>

</body>
</html>`
}

export function process(themeCSS: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Process — Alex Chen</title>
<style>${themeCSS}</style>
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: var(--theme-font-body); color: var(--theme-text); background: var(--theme-bg); line-height: var(--theme-line-height-normal); }

.hero { max-width: var(--theme-content-width); margin: 0 auto; padding: var(--theme-space-8) var(--theme-space-3) var(--theme-space-6); }
.hero .label { font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.1em; color: var(--theme-color-primary); font-weight: 600; margin-bottom: 12px; }
.hero h1 { font-size: var(--theme-font-size-xlarge); font-weight: 700; margin-bottom: 12px; }
.hero p { font-size: 1.15rem; color: var(--theme-color-muted); max-width: 560px; }

.phase-list { max-width: var(--theme-content-width); margin: 0 auto; padding: 0 var(--theme-space-3) var(--theme-space-6); }

.phase { display: grid; grid-template-columns: 80px 1fr; gap: var(--theme-space-3); padding: var(--theme-space-5) 0; border-bottom: 1px solid var(--theme-color-border); position: relative; }
.phase:last-child { border-bottom: none; }
.phase-number { width: 56px; height: 56px; border-radius: 50%; background: linear-gradient(135deg, var(--theme-color-primary), #5eead4); display: flex; align-items: center; justify-content: center; color: #fff; font-weight: 700; font-size: 1.2rem; flex-shrink: 0; }
.phase-content h2 { font-size: 1.35rem; font-weight: 700; margin-bottom: 4px; }
.phase-content .subtitle { font-size: 0.9rem; color: var(--theme-color-primary); font-weight: 600; margin-bottom: 12px; }
.phase-content p { color: #555; margin-bottom: var(--theme-space-2); max-width: 600px; }
.phase-meta { display: flex; gap: var(--theme-space-4); margin-top: var(--theme-space-2); flex-wrap: wrap; }
.phase-meta-group h4 { font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.1em; color: var(--theme-color-muted-light); margin-bottom: 6px; }
.phase-meta-group .tags { display: flex; gap: 6px; flex-wrap: wrap; }
.phase-meta-group .tag { background: var(--theme-color-surface-alt); padding: 5px 12px; border-radius: 6px; font-size: 0.8rem; color: var(--theme-color-muted); font-weight: 500; }

.philosophy { max-width: var(--theme-content-width); margin: 0 auto; padding: var(--theme-space-4) var(--theme-space-3) var(--theme-space-8); }
.philosophy h2 { font-size: 1.5rem; font-weight: 700; margin-bottom: var(--theme-space-3); }
.principles-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
.principle { background: var(--theme-color-surface-alt); border-radius: 12px; padding: 24px; }
.principle .icon { font-size: 1.5rem; margin-bottom: 12px; }
.principle h3 { font-size: 1rem; font-weight: 600; margin-bottom: 8px; }
.principle p { font-size: 0.875rem; color: var(--theme-color-muted); }

.cta-section { max-width: var(--theme-content-width); margin: 0 auto; padding: 0 var(--theme-space-3) var(--theme-space-10); }
.cta-card { background: linear-gradient(135deg, rgba(16,185,129,0.06) 0%, rgba(94,234,212,0.08) 100%); border: 1px solid rgba(16,185,129,0.15); border-radius: 16px; padding: var(--theme-space-6); text-align: center; }
.cta-card .badge { display: inline-block; background: #ecfdf5; color: var(--theme-color-primary); font-weight: 600; font-size: var(--theme-font-size-small); padding: 6px 16px; border-radius: 20px; margin-bottom: 16px; }
.cta-card h2 { font-size: 1.8rem; font-weight: 700; margin-bottom: 12px; }
.cta-card p { color: var(--theme-color-muted); max-width: 480px; margin: 0 auto 24px; font-size: 1.05rem; }
.cta-btn { display: inline-block; background: var(--theme-color-primary); color: #fff; font-size: 0.95rem; font-weight: 600; padding: 14px 36px; border: none; border-radius: 8px; cursor: pointer; font-family: var(--theme-font-body); text-decoration: none; transition: background 0.2s; }
.cta-btn:hover { opacity: 0.9; }

footer { max-width: var(--theme-content-width); margin: 0 auto; padding: var(--theme-space-5) var(--theme-space-3); border-top: 1px solid var(--theme-color-border); font-size: var(--theme-font-size-small); color: var(--theme-color-muted-light); display: flex; justify-content: space-between; flex-wrap: wrap; gap: 12px; }
footer a { color: var(--theme-color-primary); text-decoration: none; }
</style>
</head>
<body>

<nav style="max-width:var(--theme-content-width);margin:0 auto;padding:20px 24px;display:flex;justify-content:space-between;align-items:center;">
  <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'homepage'},'*');return false" style="font-weight:700;color:var(--theme-text);text-decoration:none;">Alex Chen</a>
  <div style="display:flex;gap:24px;">
    <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'work'},'*');return false" style="color:var(--theme-text);text-decoration:none;font-size:0.9rem;">Work</a>
    <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'process'},'*');return false" style="color:var(--theme-color-primary);text-decoration:none;font-size:0.9rem;font-weight:600;">Process</a>
    <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'contact'},'*');return false" style="color:var(--theme-text);text-decoration:none;font-size:0.9rem;">Contact</a>
  </div>
</nav>

<section class="hero">
  <div class="label">How I Work</div>
  <h1>Design Process</h1>
  <p>Great design isn't magic — it's methodology. Here's how I turn ambiguity into interfaces that work, every time.</p>
</section>

<div class="phase-list">

  <div class="phase">
    <div class="phase-number">01</div>
    <div class="phase-content">
      <h2>Discovery</h2>
      <div class="subtitle">Understanding the problem space</div>
      <p>Every project starts with listening. I immerse myself in the business context, stakeholder goals, existing data, and competitive landscape. The goal isn't to form opinions — it's to form the right questions.</p>
      <p>I run kickoff workshops, audit existing products, and align on success metrics before sketching a single screen.</p>
      <div class="phase-meta">
        <div class="phase-meta-group">
          <h4>Tools</h4>
          <div class="tags">
            <span class="tag">Miro</span>
            <span class="tag">Notion</span>
            <span class="tag">Google Docs</span>
          </div>
        </div>
        <div class="phase-meta-group">
          <h4>Deliverables</h4>
          <div class="tags">
            <span class="tag">Project brief</span>
            <span class="tag">Stakeholder map</span>
            <span class="tag">Competitive audit</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="phase">
    <div class="phase-number">02</div>
    <div class="phase-content">
      <h2>Research</h2>
      <div class="subtitle">Talking to the humans who matter</div>
      <p>I conduct user interviews, contextual inquiries, and survey analysis to understand real behaviors — not assumed ones. I look for patterns in frustration, workarounds, and unspoken needs.</p>
      <p>Research artifacts become the project's north star. Every design decision traces back to something a real person said or did.</p>
      <div class="phase-meta">
        <div class="phase-meta-group">
          <h4>Tools</h4>
          <div class="tags">
            <span class="tag">Dovetail</span>
            <span class="tag">Maze</span>
            <span class="tag">Zoom</span>
            <span class="tag">Typeform</span>
          </div>
        </div>
        <div class="phase-meta-group">
          <h4>Deliverables</h4>
          <div class="tags">
            <span class="tag">User personas</span>
            <span class="tag">Journey maps</span>
            <span class="tag">Research report</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="phase">
    <div class="phase-number">03</div>
    <div class="phase-content">
      <h2>Ideate</h2>
      <div class="subtitle">Exploring the solution space widely</div>
      <p>This is where I go broad. Sketches, wireframes, crazy-eights, "what if" explorations. I generate dozens of directions before narrowing. The ugly ideas often hide the best insights.</p>
      <p>I involve engineers and stakeholders early — divergent thinking works best as a team sport.</p>
      <div class="phase-meta">
        <div class="phase-meta-group">
          <h4>Tools</h4>
          <div class="tags">
            <span class="tag">Pen & paper</span>
            <span class="tag">Figma</span>
            <span class="tag">FigJam</span>
          </div>
        </div>
        <div class="phase-meta-group">
          <h4>Deliverables</h4>
          <div class="tags">
            <span class="tag">Wireframes</span>
            <span class="tag">Information architecture</span>
            <span class="tag">Flow diagrams</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="phase">
    <div class="phase-number">04</div>
    <div class="phase-content">
      <h2>Prototype</h2>
      <div class="subtitle">Making it real enough to learn from</div>
      <p>I build interactive prototypes at the right fidelity for the question at hand — sometimes a clickable Figma flow, sometimes a coded prototype for complex interactions. The point is to make the idea tangible enough to test.</p>
      <p>This phase is where visual design and interaction design converge. Typography, spacing, motion, and micro-interactions all come together.</p>
      <div class="phase-meta">
        <div class="phase-meta-group">
          <h4>Tools</h4>
          <div class="tags">
            <span class="tag">Figma</span>
            <span class="tag">Protopie</span>
            <span class="tag">Framer</span>
            <span class="tag">HTML/CSS</span>
          </div>
        </div>
        <div class="phase-meta-group">
          <h4>Deliverables</h4>
          <div class="tags">
            <span class="tag">Hi-fi mockups</span>
            <span class="tag">Interactive prototype</span>
            <span class="tag">Design specs</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="phase">
    <div class="phase-number">05</div>
    <div class="phase-content">
      <h2>Test</h2>
      <div class="subtitle">Letting users prove us right (or wrong)</div>
      <p>I run moderated usability tests with 5–8 participants, measuring task completion, time-on-task, and qualitative feedback. I record sessions and create highlight reels for stakeholders — nothing builds alignment faster than watching a user struggle.</p>
      <p>Testing isn't the end. It's a loop. Findings feed directly back into design iterations, sometimes multiple rounds before launch.</p>
      <div class="phase-meta">
        <div class="phase-meta-group">
          <h4>Tools</h4>
          <div class="tags">
            <span class="tag">Maze</span>
            <span class="tag">Lookback</span>
            <span class="tag">Hotjar</span>
          </div>
        </div>
        <div class="phase-meta-group">
          <h4>Deliverables</h4>
          <div class="tags">
            <span class="tag">Usability report</span>
            <span class="tag">Iteration log</span>
            <span class="tag">Highlight reel</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="phase">
    <div class="phase-number">06</div>
    <div class="phase-content">
      <h2>Ship</h2>
      <div class="subtitle">Getting it into the world — and watching closely</div>
      <p>I work side-by-side with engineers during implementation, doing design QA and making real-time decisions as edge cases surface. I believe designers should stay involved until the last pixel ships.</p>
      <p>Post-launch, I set up dashboards to track the metrics we defined in Discovery. The first two weeks of real usage data are worth more than months of prototyping.</p>
      <div class="phase-meta">
        <div class="phase-meta-group">
          <h4>Tools</h4>
          <div class="tags">
            <span class="tag">Linear</span>
            <span class="tag">GitHub</span>
            <span class="tag">Mixpanel</span>
            <span class="tag">Figma</span>
          </div>
        </div>
        <div class="phase-meta-group">
          <h4>Deliverables</h4>
          <div class="tags">
            <span class="tag">Dev handoff</span>
            <span class="tag">QA checklist</span>
            <span class="tag">Launch metrics dashboard</span>
          </div>
        </div>
      </div>
    </div>
  </div>

</div>

<div class="philosophy">
  <h2>Guiding Principles</h2>
  <div class="principles-grid">
    <div class="principle">
      <div class="icon">🎯</div>
      <h3>Clarity Over Cleverness</h3>
      <p>The best interface is one users never have to think about. I optimize for understanding, not impressiveness.</p>
    </div>
    <div class="principle">
      <div class="icon">🤝</div>
      <h3>Collaborate Early</h3>
      <p>Engineers, PMs, and stakeholders aren't reviewers — they're co-creators. I bring them in from day one.</p>
    </div>
    <div class="principle">
      <div class="icon">📐</div>
      <h3>Systems Over Screens</h3>
      <p>Individual screens are moments. Design systems are multipliers. I build for scale from the start.</p>
    </div>
  </div>
</div>

<div class="cta-section">
  <div class="cta-card">
    <div class="badge">● Currently available for freelance</div>
    <h2>Let's work together</h2>
    <p>I'm taking on select projects in fintech, health, sustainability, and developer tools. Short engagements or long-term partnerships — let's talk.</p>
    <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'contact'},'*');return false" class="cta-btn">Get in Touch</a>
  </div>
</div>

<footer>
  <span>alex@alexchen.design</span>
  <div>
    <a href="#">Dribbble</a> · <a href="#">LinkedIn</a> · <a href="#">Twitter</a>
  </div>
</footer>

</body>
</html>`
}

export function contact(themeCSS: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>About & Contact — Alex Chen</title>
<style>${themeCSS}</style>
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: var(--theme-font-body); color: var(--theme-text); background: var(--theme-bg); line-height: var(--theme-line-height-normal); }

.hero { max-width: var(--theme-content-width); margin: 0 auto; padding: var(--theme-space-8) var(--theme-space-3) var(--theme-space-6); }
.hero h1 { font-size: var(--theme-font-size-xlarge); font-weight: 700; margin-bottom: 12px; }
.hero p { font-size: 1.15rem; color: var(--theme-color-muted); max-width: 560px; }

.section { max-width: var(--theme-content-width); margin: 0 auto; padding: 0 var(--theme-space-3) var(--theme-space-8); }
.section h2 { font-size: 1.5rem; font-weight: 700; margin-bottom: var(--theme-space-2); }
.section p { color: #555; margin-bottom: var(--theme-space-2); max-width: 640px; }

.avatar-block { max-width: var(--theme-content-width); margin: 0 auto; padding: 0 var(--theme-space-3) var(--theme-space-6); display: flex; gap: var(--theme-space-4); align-items: center; }
.avatar { width: 120px; height: 120px; border-radius: 50%; background: linear-gradient(135deg, var(--theme-color-primary) 0%, #5eead4 100%); flex-shrink: 0; display: flex; align-items: center; justify-content: center; color: var(--theme-bg); font-size: var(--theme-font-size-xlarge); font-weight: 700; }
.avatar-info h2 { font-size: 1.5rem; font-weight: 700; margin-bottom: 4px; }
.avatar-info p { color: var(--theme-color-muted); font-size: var(--theme-font-size-medium); }

.philosophy { max-width: var(--theme-content-width); margin: 0 auto; padding: 0 var(--theme-space-3) var(--theme-space-8); }
.philosophy blockquote { border-left: 3px solid var(--theme-color-primary); padding-left: 20px; font-size: var(--theme-font-size-large); color: #444; font-style: italic; margin-bottom: var(--theme-space-2); }

.tools-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 12px; margin-top: 12px; }
.tool-tag { background: var(--theme-color-surface-alt); border-radius: 8px; padding: 12px 16px; font-size: 0.875rem; font-weight: 500; text-align: center; }

.experience { max-width: var(--theme-content-width); margin: 0 auto; padding: 0 var(--theme-space-3) var(--theme-space-8); }
.exp-item { padding: 20px 0; border-bottom: 1px solid var(--theme-color-border); }
.exp-item:last-child { border-bottom: none; }
.exp-item .role { font-weight: 600; font-size: var(--theme-font-size-medium); }
.exp-item .company { color: var(--theme-color-primary); font-size: 0.9rem; }
.exp-item .period { color: var(--theme-color-muted-light); font-size: var(--theme-font-size-small); margin-top: 2px; }

.availability { max-width: var(--theme-content-width); margin: 0 auto; padding: 0 var(--theme-space-3) var(--theme-space-8); }
.availability .badge { display: inline-block; background: #ecfdf5; color: var(--theme-color-primary); font-weight: 600; font-size: var(--theme-font-size-small); padding: 6px 14px; border-radius: 20px; margin-bottom: 12px; }

.contact-form { max-width: var(--theme-content-width); margin: 0 auto; padding: 0 var(--theme-space-3) var(--theme-space-8); }
.contact-form h2 { font-size: 1.5rem; font-weight: 700; margin-bottom: 20px; }
.form-group { margin-bottom: 20px; }
.form-group label { display: block; font-size: var(--theme-font-size-small); font-weight: 600; color: #555; margin-bottom: 6px; }
.form-group input, .form-group textarea { width: 100%; padding: 12px 16px; border: 1px solid #ddd; border-radius: 8px; font-size: 0.95rem; font-family: var(--theme-font-body); color: var(--theme-text); background: #fafafa; transition: border-color 0.2s; outline: none; }
.form-group input:focus, .form-group textarea:focus { border-color: var(--theme-color-primary); background: var(--theme-bg); }
.form-group textarea { height: 140px; resize: vertical; }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: var(--theme-space-2); }
.submit-btn { display: inline-block; background: var(--theme-color-primary); color: var(--theme-bg); font-size: 0.95rem; font-weight: 600; padding: 12px 32px; border: none; border-radius: 8px; cursor: pointer; font-family: var(--theme-font-body); transition: background 0.2s; }
.submit-btn:hover { background: var(--theme-color-primary-dark); }

.social-links { max-width: var(--theme-content-width); margin: 0 auto; padding: 0 var(--theme-space-3) var(--theme-space-8); }
.social-links h2 { font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.1em; color: var(--theme-color-muted-light); margin-bottom: var(--theme-space-2); }
.social-grid { display: flex; gap: 12px; flex-wrap: wrap; }
.social-card { display: flex; align-items: center; gap: 10px; background: var(--theme-color-surface-alt); border-radius: 10px; padding: 14px 20px; text-decoration: none; color: var(--theme-text); font-weight: 500; font-size: 0.9rem; transition: background 0.2s; }
.social-card:hover { background: var(--theme-color-border); }
.social-dot { width: 8px; height: 8px; border-radius: 50%; }

footer { max-width: var(--theme-content-width); margin: 0 auto; padding: var(--theme-space-5) var(--theme-space-3); border-top: 1px solid var(--theme-color-border); font-size: var(--theme-font-size-small); color: var(--theme-color-muted-light); display: flex; justify-content: space-between; flex-wrap: wrap; gap: 12px; }
footer a { color: var(--theme-color-primary); text-decoration: none; }
</style>
</head>
<body>

<nav style="max-width:var(--theme-content-width);margin:0 auto;padding:20px 24px;display:flex;justify-content:space-between;align-items:center;">
  <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'homepage'},'*');return false" style="font-weight:700;color:var(--theme-text);text-decoration:none;">Alex Chen</a>
  <div style="display:flex;gap:24px;">
    <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'work'},'*');return false" style="color:var(--theme-text);text-decoration:none;font-size:0.9rem;">Work</a>
    <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'process'},'*');return false" style="color:var(--theme-text);text-decoration:none;font-size:0.9rem;">Process</a>
    <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'contact'},'*');return false" style="color:var(--theme-color-primary);text-decoration:none;font-size:0.9rem;font-weight:600;">Contact</a>
  </div>
</nav>

<div class="avatar-block">
  <div class="avatar">AC</div>
  <div class="avatar-info">
    <h2>Alex Chen</h2>
    <p>Product Designer · San Francisco, CA</p>
  </div>
</div>

<div class="philosophy">
  <blockquote>"Design should feel like a conversation — intuitive, respectful, and genuinely helpful."</blockquote>
</div>

<section class="section">
  <h2>Design Philosophy</h2>
  <p>I approach every project with three principles: clarity over cleverness, empathy over assumption, and craft over speed. I believe the best interfaces are invisible — they get out of the way and let people accomplish what they came to do.</p>
  <p>My work sits at the intersection of visual design and systems thinking. I love building component libraries as much as I love pushing pixels on a hero screen. Both matter.</p>
</section>

<section class="section">
  <h2>Tools & Skills</h2>
  <div class="tools-grid">
    <div class="tool-tag">Figma</div>
    <div class="tool-tag">Framer</div>
    <div class="tool-tag">Protopie</div>
    <div class="tool-tag">HTML / CSS</div>
    <div class="tool-tag">React (basic)</div>
    <div class="tool-tag">Design Systems</div>
    <div class="tool-tag">User Research</div>
    <div class="tool-tag">Accessibility</div>
  </div>
</section>

<section class="experience">
  <h2 style="font-size:1.5rem;font-weight:700;margin-bottom:16px;padding:0;">Experience</h2>
  <div class="exp-item">
    <div class="role">Senior Product Designer</div>
    <div class="company">Meridian Financial</div>
    <div class="period">2023 – Present</div>
  </div>
  <div class="exp-item">
    <div class="role">Product Designer</div>
    <div class="company">Solstice Labs</div>
    <div class="period">2020 – 2023</div>
  </div>
  <div class="exp-item">
    <div class="role">UI Designer</div>
    <div class="company">Aura Health</div>
    <div class="period">2018 – 2020</div>
  </div>
  <div class="exp-item">
    <div class="role">Junior Designer</div>
    <div class="company">Prism Studio</div>
    <div class="period">2016 – 2018</div>
  </div>
</section>

<section class="availability">
  <h2 style="font-size:1.5rem;font-weight:700;margin-bottom:16px;">Availability</h2>
  <div class="badge">● Available for freelance</div>
  <p style="color:#555;max-width:640px;">I'm currently taking on select freelance projects — particularly in fintech, health, and developer tools. I'm open to both short-term engagements (audits, redesigns) and longer product partnerships.</p>
</section>

<section class="contact-form">
  <h2>Get in Touch</h2>
  <form onsubmit="return false">
    <div class="form-row">
      <div class="form-group">
        <label>Name</label>
        <input type="text" placeholder="Your name">
      </div>
      <div class="form-group">
        <label>Email</label>
        <input type="email" placeholder="you@example.com">
      </div>
    </div>
    <div class="form-group">
      <label>Project type</label>
      <input type="text" placeholder="e.g. Mobile app redesign, Design system">
    </div>
    <div class="form-group">
      <label>Message</label>
      <textarea placeholder="Tell me about your project..."></textarea>
    </div>
    <button type="submit" class="submit-btn">Send Message</button>
  </form>
</section>

<section class="social-links">
  <h2>Elsewhere</h2>
  <div class="social-grid">
    <a href="#" class="social-card"><span class="social-dot" style="background:#ea4c89;"></span> Dribbble</a>
    <a href="#" class="social-card"><span class="social-dot" style="background:#0077b5;"></span> LinkedIn</a>
    <a href="#" class="social-card"><span class="social-dot" style="background:#1da1f2;"></span> Twitter</a>
    <a href="#" class="social-card"><span class="social-dot" style="background:#333;"></span> GitHub</a>
  </div>
</section>

<footer>
  <span>alex@alexchen.design</span>
  <div>
    <a href="#">Dribbble</a> · <a href="#">LinkedIn</a> · <a href="#">Twitter</a>
  </div>
</footer>

</body>
</html>`
}
