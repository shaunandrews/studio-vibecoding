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
    <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'homepage'},'*');return false" style="color:var(--theme-text);text-decoration:none;font-size:0.9rem;">Work</a>
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
    <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'homepage'},'*');return false" style="color:var(--theme-text);text-decoration:none;font-size:0.9rem;">Work</a>
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
    <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'homepage'},'*');return false" style="color:var(--theme-text);text-decoration:none;font-size:0.9rem;">Work</a>
    <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'contact'},'*');return false" style="color:var(--theme-text);text-decoration:none;font-size:0.9rem;">Contact</a>
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
