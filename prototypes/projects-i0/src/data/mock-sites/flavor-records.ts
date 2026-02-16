export function homepage(themeCSS: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Flavor Records</title>
<style>${themeCSS}</style>
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: var(--theme-font-body); color: var(--theme-text); background: var(--theme-bg); line-height: var(--theme-line-height-normal); }
h1, h2, h3 { font-family: var(--theme-font-heading); font-weight: 900; }

.hero { padding: var(--theme-space-8) var(--theme-space-3) var(--theme-space-10); text-align: center; }
.hero h1 { font-size: var(--theme-font-size-hero); letter-spacing: -0.02em; text-transform: uppercase; }
.hero p { font-size: var(--theme-font-size-large); color: var(--theme-color-muted); margin-top: var(--theme-space-1); }

section { max-width: var(--theme-content-width); margin: 0 auto; padding: 0 var(--theme-space-3) var(--theme-space-10); }

.featured h2 { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.12em; color: var(--theme-color-muted-dark); margin-bottom: var(--theme-space-3); }
.featured-release { display: flex; gap: var(--theme-space-4); align-items: center; flex-wrap: wrap; cursor: pointer; }
.featured-art { width: 300px; max-width: 100%; aspect-ratio: 1; border-radius: 8px; background: linear-gradient(135deg, #8B5CF6, #3B82F6); flex-shrink: 0; }
.featured-info h3 { font-size: 2rem; margin-bottom: 4px; }
.featured-info .artist { font-size: var(--theme-font-size-large); color: var(--theme-color-muted); margin-bottom: var(--theme-space-2); }
.featured-info .listen { display: inline-block; padding: 10px 28px; background: var(--theme-text); color: var(--theme-bg); border-radius: 100px; text-decoration: none; font-weight: 700; font-size: 0.9rem; }

.catalog h2 { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.12em; color: var(--theme-color-muted-dark); margin-bottom: var(--theme-space-3); }
.release-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 20px; }
.release { cursor: pointer; }
.release-art { aspect-ratio: 1; border-radius: 6px; margin-bottom: 10px; }
.release h4 { font-size: 0.95rem; font-weight: 700; }
.release .artist { font-size: 0.85rem; color: var(--theme-color-muted); }

a.nav-link:hover { color: var(--theme-text) !important; }
footer { text-align: center; padding: var(--theme-space-6) var(--theme-space-3); font-size: var(--theme-font-size-small); color: var(--theme-color-muted-darker); border-top: 1px solid var(--theme-color-surface-alt); }
</style>
</head>
<body>

<nav style="max-width:var(--theme-content-width);margin:0 auto;padding:var(--theme-space-3);display:flex;justify-content:space-between;align-items:center;">
  <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'homepage'},'*');return false" style="font-weight:900;color:var(--theme-text);text-decoration:none;text-transform:uppercase;letter-spacing:0.05em;">Flavor Records</a>
  <div style="display:flex;gap:var(--theme-space-3);">
    <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'releases'},'*');return false" class="nav-link" style="color:var(--theme-color-muted);text-decoration:none;font-size:0.9rem;">Releases</a>
    <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'catalog'},'*');return false" class="nav-link" style="color:var(--theme-color-muted);text-decoration:none;font-size:0.9rem;">Catalog</a>
    <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'artist'},'*');return false" class="nav-link" style="color:var(--theme-color-muted);text-decoration:none;font-size:0.9rem;">Artists</a>
    <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'shows'},'*');return false" class="nav-link" style="color:var(--theme-color-muted);text-decoration:none;font-size:0.9rem;">Shows</a>
    <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'labelAbout'},'*');return false" class="nav-link" style="color:var(--theme-color-muted);text-decoration:none;font-size:0.9rem;">About</a>
  </div>
</nav>

<div class="hero">
  <h1>Flavor Records</h1>
  <p>Independent music since 2019</p>
</div>

<section class="featured">
  <h2>Featured Release</h2>
  <div class="featured-release" onclick="window.parent.postMessage({type:'navigate',page:'artist'},'*')">
    <div class="featured-art"></div>
    <div class="featured-info">
      <div class="artist">Midnight Signal</div>
      <h3>Echoes of Tomorrow</h3>
      <p class="artist" style="margin-bottom:20px;">12 tracks · January 2026</p>
      <a href="#" onclick="event.stopPropagation();window.parent.postMessage({type:'navigate',page:'artist'},'*');return false" class="listen">Listen Now</a>
    </div>
  </div>
</section>

<section class="catalog">
  <h2>Recent Releases</h2>
  <div class="release-grid">
    <div class="release" onclick="window.parent.postMessage({type:'navigate',page:'releases'},'*')">
      <div class="release-art" style="background: linear-gradient(135deg, #06B6D4, #10B981);"></div>
      <h4>Neon Drift</h4>
      <div class="artist">Glass Canyon</div>
    </div>
    <div class="release" onclick="window.parent.postMessage({type:'navigate',page:'releases'},'*')">
      <div class="release-art" style="background: linear-gradient(135deg, #EC4899, #F59E0B);"></div>
      <h4>Soft Static</h4>
      <div class="artist">Vera Luna</div>
    </div>
    <div class="release" onclick="window.parent.postMessage({type:'navigate',page:'releases'},'*')">
      <div class="release-art" style="background: linear-gradient(135deg, #6366F1, #9333EA);"></div>
      <h4>Volume III</h4>
      <div class="artist">The Haze</div>
    </div>
    <div class="release" onclick="window.parent.postMessage({type:'navigate',page:'releases'},'*')">
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
}

export function artist(themeCSS: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Midnight Signal — Flavor Records</title>
<style>${themeCSS}</style>
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: var(--theme-font-body); color: var(--theme-text); background: var(--theme-bg); line-height: var(--theme-line-height-normal); }
h1, h2, h3 { font-family: var(--theme-font-heading); font-weight: 900; }
a.nav-link:hover { color: var(--theme-text) !important; }

.artist-hero { max-width: var(--theme-content-width); margin: 0 auto; padding: var(--theme-space-8) var(--theme-space-3) var(--theme-space-6); display: flex; gap: var(--theme-space-5); align-items: center; flex-wrap: wrap; }
.artist-photo { width: 280px; aspect-ratio: 1; border-radius: 50%; background: linear-gradient(135deg, #8B5CF6, #3B82F6, var(--theme-bg)); flex-shrink: 0; }
.artist-meta h1 { font-size: var(--theme-font-size-xlarge); text-transform: uppercase; letter-spacing: -0.02em; }
.artist-meta .tagline { color: var(--theme-color-muted); font-size: var(--theme-font-size-large); margin-top: 4px; }
.artist-meta .tags { display: flex; gap: var(--theme-space-1); margin-top: var(--theme-space-2); flex-wrap: wrap; }
.artist-meta .tag { padding: 4px 14px; border: 1px solid var(--theme-color-surface-alt); border-radius: 100px; font-size: 0.75rem; color: var(--theme-color-muted); text-transform: uppercase; letter-spacing: 0.08em; }

section { max-width: var(--theme-content-width); margin: 0 auto; padding: 0 var(--theme-space-3) var(--theme-space-8); }
section h2 { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.12em; color: var(--theme-color-muted-dark); margin-bottom: var(--theme-space-3); }

.quote { border-left: 3px solid var(--theme-color-primary); padding: 20px var(--theme-space-3); margin-bottom: var(--theme-space-8); max-width: var(--theme-content-width); margin-left: auto; margin-right: auto; padding-left: var(--theme-space-3); padding-right: var(--theme-space-3); }
.quote p { font-size: 1.2rem; font-style: italic; color: #ccc; }
.quote cite { display: block; margin-top: 12px; font-size: 0.85rem; color: var(--theme-color-muted-dark); font-style: normal; }

.bio p { color: #bbb; font-size: var(--theme-font-size-medium); margin-bottom: var(--theme-space-2); max-width: 680px; }

.discography-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 20px; }
.disc-item { cursor: default; }
.disc-art { aspect-ratio: 1; border-radius: 6px; margin-bottom: 10px; }
.disc-item h4 { font-size: 0.95rem; font-weight: 700; }
.disc-item .year { font-size: var(--theme-font-size-small); color: var(--theme-color-muted-dark); }
.disc-item .format { display: inline-block; font-size: 0.65rem; text-transform: uppercase; letter-spacing: 0.08em; color: var(--theme-color-primary); margin-top: 2px; }

.shows-list { display: flex; flex-direction: column; gap: var(--theme-space-2); }
.show { display: flex; justify-content: space-between; align-items: center; padding: var(--theme-space-2) 0; border-bottom: 1px solid var(--theme-color-surface-alt); flex-wrap: wrap; gap: var(--theme-space-1); }
.show-date { font-weight: 900; font-size: 0.85rem; text-transform: uppercase; color: var(--theme-color-primary); min-width: 120px; }
.show-venue { flex: 1; }
.show-venue .name { font-weight: 700; }
.show-venue .city { font-size: 0.85rem; color: var(--theme-color-muted); }
.show-status { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.08em; padding: 6px 16px; border: 1px solid var(--theme-color-surface-alt); border-radius: 100px; color: var(--theme-color-muted); }
.show-status.soldout { border-color: var(--theme-color-danger); color: var(--theme-color-danger); }

footer { text-align: center; padding: var(--theme-space-6) var(--theme-space-3); font-size: var(--theme-font-size-small); color: var(--theme-color-muted-darker); border-top: 1px solid var(--theme-color-surface-alt); }
</style>
</head>
<body>

<nav style="max-width:var(--theme-content-width);margin:0 auto;padding:var(--theme-space-3);display:flex;justify-content:space-between;align-items:center;">
  <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'homepage'},'*');return false" style="font-weight:900;color:var(--theme-text);text-decoration:none;text-transform:uppercase;letter-spacing:0.05em;">Flavor Records</a>
  <div style="display:flex;gap:var(--theme-space-3);">
    <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'releases'},'*');return false" class="nav-link" style="color:var(--theme-color-muted);text-decoration:none;font-size:0.9rem;">Releases</a>
    <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'catalog'},'*');return false" class="nav-link" style="color:var(--theme-color-muted);text-decoration:none;font-size:0.9rem;">Catalog</a>
    <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'artist'},'*');return false" class="nav-link" style="color:var(--theme-text);text-decoration:none;font-size:0.9rem;">Artists</a>
    <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'shows'},'*');return false" class="nav-link" style="color:var(--theme-color-muted);text-decoration:none;font-size:0.9rem;">Shows</a>
    <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'labelAbout'},'*');return false" class="nav-link" style="color:var(--theme-color-muted);text-decoration:none;font-size:0.9rem;">About</a>
  </div>
</nav>

<div class="artist-hero">
  <div class="artist-photo"></div>
  <div class="artist-meta">
    <h1>Midnight Signal</h1>
    <p class="tagline">Portland, OR · Signed 2021</p>
    <div class="tags">
      <span class="tag">Post-Punk</span>
      <span class="tag">Shoegaze</span>
      <span class="tag">Dream Pop</span>
    </div>
  </div>
</div>

<section style="padding-bottom:0;">
  <div class="quote">
    <p>"We wanted to make something that sounds like driving through fog at 2 AM — familiar but unreachable."</p>
    <cite>— Kai Morrow, vocals/guitar</cite>
  </div>
</section>

<section class="bio">
  <h2>About</h2>
  <p>Midnight Signal emerged from Portland's basement scene in 2019, built on the foundation of layered guitars, analog synths, and Kai Morrow's haunted vocal delivery. The four-piece — Morrow, bassist Jess Tanaka, drummer Cole Arden, and synth/keys player Mira Voss — found their sound in late-night sessions at a converted warehouse studio on the east side.</p>
  <p>Their debut EP <em>Half-Light</em> caught the attention of Flavor Records in early 2021. Since signing, the band has released two full-length albums and toured extensively across the Pacific Northwest and beyond, earning a reputation for intense, atmospheric live shows.</p>
  <p>Their latest album <em>Echoes of Tomorrow</em> (January 2026) marks a shift toward more expansive arrangements, blending post-punk urgency with cinematic textures that expand on the sonic palette of their earlier work.</p>
</section>

<section>
  <h2>Discography</h2>
  <div class="discography-grid">
    <div class="disc-item">
      <div class="disc-art" style="background: linear-gradient(135deg, #8B5CF6, #3B82F6);"></div>
      <h4>Echoes of Tomorrow</h4>
      <span class="format">LP</span>
      <div class="year">2026</div>
    </div>
    <div class="disc-item">
      <div class="disc-art" style="background: linear-gradient(135deg, #6366F1, #1e1b4b);"></div>
      <h4>Peripheral Vision</h4>
      <span class="format">LP</span>
      <div class="year">2024</div>
    </div>
    <div class="disc-item">
      <div class="disc-art" style="background: linear-gradient(135deg, #7C3AED, #4338CA);"></div>
      <h4>Signal / Noise</h4>
      <span class="format">Single</span>
      <div class="year">2023</div>
    </div>
    <div class="disc-item">
      <div class="disc-art" style="background: linear-gradient(135deg, #a78bfa, #312e81);"></div>
      <h4>Half-Light</h4>
      <span class="format">EP</span>
      <div class="year">2021</div>
    </div>
  </div>
</section>

<section>
  <h2>Upcoming Shows</h2>
  <div class="shows-list">
    <div class="show">
      <div class="show-date">Mar 14, 2026</div>
      <div class="show-venue">
        <div class="name">Doug Fir Lounge</div>
        <div class="city">Portland, OR</div>
      </div>
      <div class="show-status soldout">Sold Out</div>
    </div>
    <div class="show">
      <div class="show-date">Mar 22, 2026</div>
      <div class="show-venue">
        <div class="name">The Crocodile</div>
        <div class="city">Seattle, WA</div>
      </div>
      <div class="show-status">Tickets</div>
    </div>
    <div class="show">
      <div class="show-date">Apr 5, 2026</div>
      <div class="show-venue">
        <div class="name">The Independent</div>
        <div class="city">San Francisco, CA</div>
      </div>
      <div class="show-status">Tickets</div>
    </div>
    <div class="show">
      <div class="show-date">Apr 18, 2026</div>
      <div class="show-venue">
        <div class="name">Lodge Room</div>
        <div class="city">Los Angeles, CA</div>
      </div>
      <div class="show-status">Tickets</div>
    </div>
    <div class="show">
      <div class="show-date">May 2, 2026</div>
      <div class="show-venue">
        <div class="name">Neumos</div>
        <div class="city">Seattle, WA</div>
      </div>
      <div class="show-status">Tickets</div>
    </div>
  </div>
</section>

<footer>
  <p>Flavor Records · Portland, OR · info@flavorrecords.com</p>
  <p style="margin-top:4px;">&copy; 2026 Flavor Records. All rights reserved.</p>
</footer>

</body>
</html>`
}

export function releases(themeCSS: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Releases — Flavor Records</title>
<style>${themeCSS}</style>
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: var(--theme-font-body); color: var(--theme-text); background: var(--theme-bg); line-height: var(--theme-line-height-normal); }
h1, h2, h3 { font-family: var(--theme-font-heading); font-weight: 900; }
a.nav-link:hover { color: var(--theme-text) !important; }

.page-header { max-width: var(--theme-content-width); margin: 0 auto; padding: var(--theme-space-8) var(--theme-space-3) var(--theme-space-6); }
.page-header h1 { font-size: var(--theme-font-size-xlarge); text-transform: uppercase; letter-spacing: -0.02em; }
.page-header p { color: var(--theme-color-muted); margin-top: 4px; }

section { max-width: var(--theme-content-width); margin: 0 auto; padding: 0 var(--theme-space-3) var(--theme-space-8); }
section h2 { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.12em; color: var(--theme-color-muted-dark); margin-bottom: var(--theme-space-3); }

.release-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(190px, 1fr)); gap: var(--theme-space-3); }
.release-card { cursor: default; }
.release-card .art { aspect-ratio: 1; border-radius: 6px; margin-bottom: 12px; position: relative; overflow: hidden; }
.release-card .art .format-badge { position: absolute; top: 10px; right: 10px; background: rgba(0,0,0,0.6); backdrop-filter: blur(8px); padding: 3px 10px; border-radius: 100px; font-size: 0.65rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: var(--theme-text); }
.release-card h4 { font-size: var(--theme-font-size-medium); font-weight: 700; margin-bottom: 2px; }
.release-card .artist { font-size: 0.85rem; color: var(--theme-color-muted); }
.release-card .meta { display: flex; gap: var(--theme-space-1); align-items: center; margin-top: 6px; }
.release-card .year { font-size: 0.75rem; color: var(--theme-color-muted-darker); }
.release-card .genre { font-size: 0.65rem; text-transform: uppercase; letter-spacing: 0.08em; padding: 2px 8px; border: 1px solid var(--theme-color-surface-alt); border-radius: 100px; color: var(--theme-color-muted); }

footer { text-align: center; padding: var(--theme-space-6) var(--theme-space-3); font-size: var(--theme-font-size-small); color: var(--theme-color-muted-darker); border-top: 1px solid var(--theme-color-surface-alt); }
</style>
</head>
<body>

<nav style="max-width:var(--theme-content-width);margin:0 auto;padding:var(--theme-space-3);display:flex;justify-content:space-between;align-items:center;">
  <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'homepage'},'*');return false" style="font-weight:900;color:var(--theme-text);text-decoration:none;text-transform:uppercase;letter-spacing:0.05em;">Flavor Records</a>
  <div style="display:flex;gap:var(--theme-space-3);">
    <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'releases'},'*');return false" class="nav-link" style="color:var(--theme-text);text-decoration:none;font-size:0.9rem;">Releases</a>
    <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'catalog'},'*');return false" class="nav-link" style="color:var(--theme-color-muted);text-decoration:none;font-size:0.9rem;">Catalog</a>
    <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'artist'},'*');return false" class="nav-link" style="color:var(--theme-color-muted);text-decoration:none;font-size:0.9rem;">Artists</a>
    <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'shows'},'*');return false" class="nav-link" style="color:var(--theme-color-muted);text-decoration:none;font-size:0.9rem;">Shows</a>
    <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'labelAbout'},'*');return false" class="nav-link" style="color:var(--theme-color-muted);text-decoration:none;font-size:0.9rem;">About</a>
  </div>
</nav>

<div class="page-header">
  <h1>Releases</h1>
  <p>The full Flavor Records catalog</p>
</div>

<section>
  <h2>2026</h2>
  <div class="release-grid">
    <div class="release-card">
      <div class="art" style="background: linear-gradient(135deg, #8B5CF6, #3B82F6);">
        <span class="format-badge">LP</span>
      </div>
      <h4>Echoes of Tomorrow</h4>
      <div class="artist">Midnight Signal</div>
      <div class="meta">
        <span class="year">Jan 2026</span>
        <span class="genre">Post-Punk</span>
      </div>
    </div>
    <div class="release-card">
      <div class="art" style="background: linear-gradient(135deg, #06B6D4, #10B981);">
        <span class="format-badge">LP</span>
      </div>
      <h4>Neon Drift</h4>
      <div class="artist">Glass Canyon</div>
      <div class="meta">
        <span class="year">Feb 2026</span>
        <span class="genre">Synthwave</span>
      </div>
    </div>
  </div>
</section>

<section>
  <h2>2025</h2>
  <div class="release-grid">
    <div class="release-card">
      <div class="art" style="background: linear-gradient(135deg, #EC4899, #F59E0B);">
        <span class="format-badge">EP</span>
      </div>
      <h4>Soft Static</h4>
      <div class="artist">Vera Luna</div>
      <div class="meta">
        <span class="year">Nov 2025</span>
        <span class="genre">Dream Pop</span>
      </div>
    </div>
    <div class="release-card">
      <div class="art" style="background: linear-gradient(135deg, #F97316, #EF4444);">
        <span class="format-badge">LP</span>
      </div>
      <h4>After Hours</h4>
      <div class="artist">DJ Sable</div>
      <div class="meta">
        <span class="year">Sep 2025</span>
        <span class="genre">House</span>
      </div>
    </div>
    <div class="release-card">
      <div class="art" style="background: linear-gradient(135deg, #14B8A6, #0D9488);">
        <span class="format-badge">Single</span>
      </div>
      <h4>Coastal</h4>
      <div class="artist">Glass Canyon</div>
      <div class="meta">
        <span class="year">Jul 2025</span>
        <span class="genre">Ambient</span>
      </div>
    </div>
    <div class="release-card">
      <div class="art" style="background: linear-gradient(135deg, #A855F7, #6D28D9);">
        <span class="format-badge">EP</span>
      </div>
      <h4>Ultraviolet</h4>
      <div class="artist">KODA</div>
      <div class="meta">
        <span class="year">May 2025</span>
        <span class="genre">Electronica</span>
      </div>
    </div>
  </div>
</section>

<section>
  <h2>2024</h2>
  <div class="release-grid">
    <div class="release-card">
      <div class="art" style="background: linear-gradient(135deg, #6366F1, #1e1b4b);">
        <span class="format-badge">LP</span>
      </div>
      <h4>Peripheral Vision</h4>
      <div class="artist">Midnight Signal</div>
      <div class="meta">
        <span class="year">Oct 2024</span>
        <span class="genre">Shoegaze</span>
      </div>
    </div>
    <div class="release-card">
      <div class="art" style="background: linear-gradient(135deg, #E11D48, #BE123C);">
        <span class="format-badge">LP</span>
      </div>
      <h4>Burn the Map</h4>
      <div class="artist">Vera Luna</div>
      <div class="meta">
        <span class="year">Jun 2024</span>
        <span class="genre">Indie Rock</span>
      </div>
    </div>
    <div class="release-card">
      <div class="art" style="background: linear-gradient(135deg, #6366F1, #9333EA);">
        <span class="format-badge">LP</span>
      </div>
      <h4>Volume III</h4>
      <div class="artist">The Haze</div>
      <div class="meta">
        <span class="year">Mar 2024</span>
        <span class="genre">Psych Rock</span>
      </div>
    </div>
    <div class="release-card">
      <div class="art" style="background: linear-gradient(135deg, #D946EF, #7C3AED);">
        <span class="format-badge">Single</span>
      </div>
      <h4>Dissolve</h4>
      <div class="artist">KODA</div>
      <div class="meta">
        <span class="year">Jan 2024</span>
        <span class="genre">Electronica</span>
      </div>
    </div>
  </div>
</section>

<footer>
  <p>Flavor Records · Portland, OR · info@flavorrecords.com</p>
  <p style="margin-top:4px;">&copy; 2026 Flavor Records. All rights reserved.</p>
</footer>

</body>
</html>`
}

export function catalog(themeCSS: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Catalog — Flavor Records</title>
<style>${themeCSS}</style>
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: var(--theme-font-body); color: var(--theme-text); background: var(--theme-bg); line-height: var(--theme-line-height-normal); }
h1, h2, h3 { font-family: var(--theme-font-heading); font-weight: 900; }
a.nav-link:hover { color: var(--theme-text) !important; }

.page-header { max-width: var(--theme-content-width); margin: 0 auto; padding: var(--theme-space-8) var(--theme-space-3) var(--theme-space-4); }
.page-header h1 { font-size: var(--theme-font-size-xlarge); text-transform: uppercase; letter-spacing: -0.02em; }
.page-header p { color: var(--theme-color-muted); margin-top: 4px; }

.filters { max-width: var(--theme-content-width); margin: 0 auto; padding: 0 var(--theme-space-3) var(--theme-space-4); display: flex; gap: 8px; flex-wrap: wrap; }
.filter-btn { padding: 6px 18px; border-radius: 100px; border: 1px solid var(--theme-color-surface-alt); background: transparent; color: var(--theme-color-muted); font-size: 0.8rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; cursor: pointer; font-family: var(--theme-font-body); transition: all 0.15s; }
.filter-btn:hover, .filter-btn.active { background: var(--theme-text); color: var(--theme-bg); border-color: var(--theme-text); }

section { max-width: var(--theme-content-width); margin: 0 auto; padding: 0 var(--theme-space-3) var(--theme-space-8); }
.catalog-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: var(--theme-space-3); }
.card { cursor: pointer; transition: transform 0.15s; }
.card:hover { transform: translateY(-2px); }
.card-art { aspect-ratio: 1; border-radius: 6px; margin-bottom: 10px; display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden; }
.card-art .initial { font-size: 3rem; font-weight: 900; opacity: 0.25; font-family: var(--theme-font-heading); text-transform: uppercase; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); }
.card-art .album-label { position: absolute; bottom: 12px; left: 12px; right: 12px; font-size: 0.65rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: rgba(255,255,255,0.8); }
.card-art .format-badge { position: absolute; top: 10px; right: 10px; background: rgba(0,0,0,0.5); backdrop-filter: blur(8px); padding: 3px 10px; border-radius: 100px; font-size: 0.6rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #fff; }
.card h4 { font-size: 0.95rem; font-weight: 700; margin-bottom: 2px; }
.card .artist { font-size: 0.85rem; color: var(--theme-color-muted); }
.card .meta { display: flex; gap: 6px; align-items: center; margin-top: 6px; flex-wrap: wrap; }
.card .year { font-size: 0.75rem; color: var(--theme-color-muted-darker); }
.card .genre { font-size: 0.6rem; text-transform: uppercase; letter-spacing: 0.08em; padding: 2px 8px; border: 1px solid var(--theme-color-surface-alt); border-radius: 100px; color: var(--theme-color-muted); }

footer { text-align: center; padding: var(--theme-space-6) var(--theme-space-3); font-size: var(--theme-font-size-small); color: var(--theme-color-muted-darker); border-top: 1px solid var(--theme-color-surface-alt); }
</style>
</head>
<body>

<nav style="max-width:var(--theme-content-width);margin:0 auto;padding:var(--theme-space-3);display:flex;justify-content:space-between;align-items:center;">
  <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'homepage'},'*');return false" style="font-weight:900;color:var(--theme-text);text-decoration:none;text-transform:uppercase;letter-spacing:0.05em;">Flavor Records</a>
  <div style="display:flex;gap:var(--theme-space-3);">
    <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'releases'},'*');return false" class="nav-link" style="color:var(--theme-color-muted);text-decoration:none;font-size:0.9rem;">Releases</a>
    <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'catalog'},'*');return false" class="nav-link" style="color:var(--theme-text);text-decoration:none;font-size:0.9rem;">Catalog</a>
    <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'artist'},'*');return false" class="nav-link" style="color:var(--theme-color-muted);text-decoration:none;font-size:0.9rem;">Artists</a>
    <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'shows'},'*');return false" class="nav-link" style="color:var(--theme-color-muted);text-decoration:none;font-size:0.9rem;">Shows</a>
    <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'labelAbout'},'*');return false" class="nav-link" style="color:var(--theme-color-muted);text-decoration:none;font-size:0.9rem;">About</a>
  </div>
</nav>

<div class="page-header">
  <h1>Catalog</h1>
  <p>Every release on Flavor Records — vinyl, digital, and limited editions</p>
</div>

<div class="filters">
  <button class="filter-btn active" onclick="filterCatalog('all')">All</button>
  <button class="filter-btn" onclick="filterCatalog('electronic')">Electronic</button>
  <button class="filter-btn" onclick="filterCatalog('indie-rock')">Indie Rock</button>
  <button class="filter-btn" onclick="filterCatalog('jazz')">Jazz</button>
  <button class="filter-btn" onclick="filterCatalog('ambient')">Ambient</button>
</div>

<section>
  <div class="catalog-grid">
    <div class="card" data-genre="electronic" onclick="window.parent.postMessage({type:'navigate',page:'releases'},'*')">
      <div class="card-art" style="background:linear-gradient(135deg,#8B5CF6,#3B82F6);"><span class="initial">M</span><span class="album-label">Echoes of Tomorrow</span><span class="format-badge">LP</span></div>
      <h4>Echoes of Tomorrow</h4>
      <div class="artist">Midnight Signal</div>
      <div class="meta"><span class="year">2026</span><span class="genre">Post-Punk</span><span class="genre">Electronic</span></div>
    </div>
    <div class="card" data-genre="electronic" onclick="window.parent.postMessage({type:'navigate',page:'releases'},'*')">
      <div class="card-art" style="background:linear-gradient(135deg,#06B6D4,#10B981);"><span class="initial">G</span><span class="album-label">Neon Drift</span><span class="format-badge">LP</span></div>
      <h4>Neon Drift</h4>
      <div class="artist">Glass Canyon</div>
      <div class="meta"><span class="year">2026</span><span class="genre">Synthwave</span><span class="genre">Electronic</span></div>
    </div>
    <div class="card" data-genre="indie-rock" onclick="window.parent.postMessage({type:'navigate',page:'releases'},'*')">
      <div class="card-art" style="background:linear-gradient(135deg,#EC4899,#F59E0B);"><span class="initial">V</span><span class="album-label">Soft Static</span><span class="format-badge">EP</span></div>
      <h4>Soft Static</h4>
      <div class="artist">Vera Luna</div>
      <div class="meta"><span class="year">2025</span><span class="genre">Dream Pop</span></div>
    </div>
    <div class="card" data-genre="electronic" onclick="window.parent.postMessage({type:'navigate',page:'releases'},'*')">
      <div class="card-art" style="background:linear-gradient(135deg,#F97316,#EF4444);"><span class="initial">D</span><span class="album-label">After Hours</span><span class="format-badge">LP</span></div>
      <h4>After Hours</h4>
      <div class="artist">DJ Sable</div>
      <div class="meta"><span class="year">2025</span><span class="genre">House</span><span class="genre">Electronic</span></div>
    </div>
    <div class="card" data-genre="ambient" onclick="window.parent.postMessage({type:'navigate',page:'releases'},'*')">
      <div class="card-art" style="background:linear-gradient(135deg,#14B8A6,#0D9488);"><span class="initial">G</span><span class="album-label">Coastal</span><span class="format-badge">Single</span></div>
      <h4>Coastal</h4>
      <div class="artist">Glass Canyon</div>
      <div class="meta"><span class="year">2025</span><span class="genre">Ambient</span></div>
    </div>
    <div class="card" data-genre="electronic" onclick="window.parent.postMessage({type:'navigate',page:'releases'},'*')">
      <div class="card-art" style="background:linear-gradient(135deg,#A855F7,#6D28D9);"><span class="initial">K</span><span class="album-label">Ultraviolet</span><span class="format-badge">EP</span></div>
      <h4>Ultraviolet</h4>
      <div class="artist">KODA</div>
      <div class="meta"><span class="year">2025</span><span class="genre">Electronica</span><span class="genre">Electronic</span></div>
    </div>
    <div class="card" data-genre="indie-rock" onclick="window.parent.postMessage({type:'navigate',page:'releases'},'*')">
      <div class="card-art" style="background:linear-gradient(135deg,#6366F1,#1e1b4b);"><span class="initial">M</span><span class="album-label">Peripheral Vision</span><span class="format-badge">LP</span></div>
      <h4>Peripheral Vision</h4>
      <div class="artist">Midnight Signal</div>
      <div class="meta"><span class="year">2024</span><span class="genre">Shoegaze</span></div>
    </div>
    <div class="card" data-genre="indie-rock" onclick="window.parent.postMessage({type:'navigate',page:'releases'},'*')">
      <div class="card-art" style="background:linear-gradient(135deg,#E11D48,#BE123C);"><span class="initial">V</span><span class="album-label">Burn the Map</span><span class="format-badge">LP</span></div>
      <h4>Burn the Map</h4>
      <div class="artist">Vera Luna</div>
      <div class="meta"><span class="year">2024</span><span class="genre">Indie Rock</span></div>
    </div>
    <div class="card" data-genre="indie-rock" onclick="window.parent.postMessage({type:'navigate',page:'releases'},'*')">
      <div class="card-art" style="background:linear-gradient(135deg,#6366F1,#9333EA);"><span class="initial">T</span><span class="album-label">Volume III</span><span class="format-badge">LP</span></div>
      <h4>Volume III</h4>
      <div class="artist">The Haze</div>
      <div class="meta"><span class="year">2024</span><span class="genre">Psych Rock</span></div>
    </div>
    <div class="card" data-genre="electronic" onclick="window.parent.postMessage({type:'navigate',page:'releases'},'*')">
      <div class="card-art" style="background:linear-gradient(135deg,#D946EF,#7C3AED);"><span class="initial">K</span><span class="album-label">Dissolve</span><span class="format-badge">Single</span></div>
      <h4>Dissolve</h4>
      <div class="artist">KODA</div>
      <div class="meta"><span class="year">2024</span><span class="genre">Electronica</span><span class="genre">Electronic</span></div>
    </div>
    <div class="card" data-genre="jazz" onclick="window.parent.postMessage({type:'navigate',page:'releases'},'*')">
      <div class="card-art" style="background:linear-gradient(135deg,#78716C,#D4A574);"><span class="initial">R</span><span class="album-label">Late Night Conversations</span><span class="format-badge">LP</span></div>
      <h4>Late Night Conversations</h4>
      <div class="artist">Rae Nomura Trio</div>
      <div class="meta"><span class="year">2023</span><span class="genre">Jazz</span></div>
    </div>
    <div class="card" data-genre="ambient" onclick="window.parent.postMessage({type:'navigate',page:'releases'},'*')">
      <div class="card-art" style="background:linear-gradient(135deg,#1E3A5F,#4A90A4);"><span class="initial">S</span><span class="album-label">Tidal Memory</span><span class="format-badge">LP</span></div>
      <h4>Tidal Memory</h4>
      <div class="artist">Slow Beacon</div>
      <div class="meta"><span class="year">2023</span><span class="genre">Ambient</span></div>
    </div>
    <div class="card" data-genre="electronic" onclick="window.parent.postMessage({type:'navigate',page:'releases'},'*')">
      <div class="card-art" style="background:linear-gradient(135deg,#7C3AED,#4338CA);"><span class="initial">M</span><span class="album-label">Signal / Noise</span><span class="format-badge">Single</span></div>
      <h4>Signal / Noise</h4>
      <div class="artist">Midnight Signal</div>
      <div class="meta"><span class="year">2023</span><span class="genre">Post-Punk</span><span class="genre">Electronic</span></div>
    </div>
    <div class="card" data-genre="jazz" onclick="window.parent.postMessage({type:'navigate',page:'releases'},'*')">
      <div class="card-art" style="background:linear-gradient(135deg,#92400E,#B45309);"><span class="initial">R</span><span class="album-label">Blue Hour</span><span class="format-badge">EP</span></div>
      <h4>Blue Hour</h4>
      <div class="artist">Rae Nomura Trio</div>
      <div class="meta"><span class="year">2022</span><span class="genre">Jazz</span></div>
    </div>
    <div class="card" data-genre="ambient" onclick="window.parent.postMessage({type:'navigate',page:'releases'},'*')">
      <div class="card-art" style="background:linear-gradient(135deg,#334155,#64748B);"><span class="initial">S</span><span class="album-label">Fog Studies</span><span class="format-badge">EP</span></div>
      <h4>Fog Studies</h4>
      <div class="artist">Slow Beacon</div>
      <div class="meta"><span class="year">2022</span><span class="genre">Ambient</span></div>
    </div>
    <div class="card" data-genre="indie-rock" onclick="window.parent.postMessage({type:'navigate',page:'releases'},'*')">
      <div class="card-art" style="background:linear-gradient(135deg,#a78bfa,#312e81);"><span class="initial">M</span><span class="album-label">Half-Light</span><span class="format-badge">EP</span></div>
      <h4>Half-Light</h4>
      <div class="artist">Midnight Signal</div>
      <div class="meta"><span class="year">2021</span><span class="genre">Shoegaze</span></div>
    </div>
  </div>
</section>

<footer>
  <p>Flavor Records · Portland, OR · info@flavorrecords.com</p>
  <p style="margin-top:4px;">&copy; 2026 Flavor Records. All rights reserved.</p>
</footer>

<script>
function filterCatalog(genre) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  event.target.classList.add('active');
  document.querySelectorAll('.card').forEach(card => {
    if (genre === 'all') { card.style.display = ''; return; }
    card.style.display = card.dataset.genre === genre ? '' : 'none';
  });
}
</script>
</body>
</html>`
}

export function shows(themeCSS: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Shows — Flavor Records</title>
<style>${themeCSS}</style>
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: var(--theme-font-body); color: var(--theme-text); background: var(--theme-bg); line-height: var(--theme-line-height-normal); }
h1, h2, h3 { font-family: var(--theme-font-heading); font-weight: 900; }
a.nav-link:hover { color: var(--theme-text) !important; }

.page-header { max-width: var(--theme-content-width); margin: 0 auto; padding: var(--theme-space-8) var(--theme-space-3) var(--theme-space-6); }
.page-header h1 { font-size: var(--theme-font-size-xlarge); text-transform: uppercase; letter-spacing: -0.02em; }
.page-header p { color: var(--theme-color-muted); margin-top: 4px; }

section { max-width: var(--theme-content-width); margin: 0 auto; padding: 0 var(--theme-space-3) var(--theme-space-8); }
section h2 { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.12em; color: var(--theme-color-muted-dark); margin-bottom: var(--theme-space-3); }

.show-item { display: grid; grid-template-columns: 90px 1fr auto; gap: var(--theme-space-3); align-items: start; padding: var(--theme-space-3) 0; border-bottom: 1px solid var(--theme-color-surface-alt); }
.show-date { text-align: center; }
.show-date .month { font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.12em; color: var(--theme-color-primary); font-weight: 700; }
.show-date .day { font-size: 2rem; font-weight: 900; line-height: 1; font-family: var(--theme-font-heading); }
.show-date .dow { font-size: 0.7rem; color: var(--theme-color-muted-dark); text-transform: uppercase; }
.show-details h3 { font-size: 1.1rem; font-weight: 700; margin-bottom: 2px; }
.show-details .venue { color: var(--theme-color-muted); font-size: 0.9rem; }
.show-details .support { font-size: 0.8rem; color: var(--theme-color-muted-dark); margin-top: 4px; }
.show-details .support em { color: var(--theme-color-muted); font-style: normal; }
.ticket-btn { align-self: center; padding: 8px 20px; border-radius: 100px; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; text-decoration: none; white-space: nowrap; border: 1px solid; }
.ticket-btn.on-sale { background: var(--theme-text); color: var(--theme-bg); border-color: var(--theme-text); }
.ticket-btn.sold-out { background: transparent; color: var(--theme-color-muted-dark); border-color: var(--theme-color-surface-alt); cursor: default; text-decoration: line-through; }
.ticket-btn.free { background: transparent; color: var(--theme-color-primary); border-color: var(--theme-color-primary); }

.past-shows .show-item { opacity: 0.5; }
.past-shows .show-item:hover { opacity: 0.8; }

footer { text-align: center; padding: var(--theme-space-6) var(--theme-space-3); font-size: var(--theme-font-size-small); color: var(--theme-color-muted-darker); border-top: 1px solid var(--theme-color-surface-alt); }
</style>
</head>
<body>

<nav style="max-width:var(--theme-content-width);margin:0 auto;padding:var(--theme-space-3);display:flex;justify-content:space-between;align-items:center;">
  <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'homepage'},'*');return false" style="font-weight:900;color:var(--theme-text);text-decoration:none;text-transform:uppercase;letter-spacing:0.05em;">Flavor Records</a>
  <div style="display:flex;gap:var(--theme-space-3);">
    <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'releases'},'*');return false" class="nav-link" style="color:var(--theme-color-muted);text-decoration:none;font-size:0.9rem;">Releases</a>
    <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'catalog'},'*');return false" class="nav-link" style="color:var(--theme-color-muted);text-decoration:none;font-size:0.9rem;">Catalog</a>
    <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'artist'},'*');return false" class="nav-link" style="color:var(--theme-color-muted);text-decoration:none;font-size:0.9rem;">Artists</a>
    <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'shows'},'*');return false" class="nav-link" style="color:var(--theme-text);text-decoration:none;font-size:0.9rem;">Shows</a>
    <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'labelAbout'},'*');return false" class="nav-link" style="color:var(--theme-color-muted);text-decoration:none;font-size:0.9rem;">About</a>
  </div>
</nav>

<div class="page-header">
  <h1>Shows & Events</h1>
  <p>Catch Flavor Records artists live — on tour and in your city</p>
</div>

<section>
  <h2>Upcoming Shows</h2>

  <div class="show-item">
    <div class="show-date"><div class="month">Mar</div><div class="day">14</div><div class="dow">Sat</div></div>
    <div class="show-details">
      <h3>Midnight Signal</h3>
      <div class="venue">Doug Fir Lounge · Portland, OR</div>
      <div class="support">w/ <em>Glass Canyon</em>, <em>Pale Waves</em></div>
    </div>
    <span class="ticket-btn sold-out">Sold Out</span>
  </div>

  <div class="show-item">
    <div class="show-date"><div class="month">Mar</div><div class="day">22</div><div class="dow">Sun</div></div>
    <div class="show-details">
      <h3>Midnight Signal</h3>
      <div class="venue">The Crocodile · Seattle, WA</div>
      <div class="support">w/ <em>Glass Canyon</em></div>
    </div>
    <span class="ticket-btn on-sale">On Sale</span>
  </div>

  <div class="show-item">
    <div class="show-date"><div class="month">Apr</div><div class="day">02</div><div class="dow">Thu</div></div>
    <div class="show-details">
      <h3>KODA</h3>
      <div class="venue">Holocene · Portland, OR</div>
      <div class="support">w/ <em>DJ Sable</em> · Visual set by <em>Nøva</em></div>
    </div>
    <span class="ticket-btn on-sale">On Sale</span>
  </div>

  <div class="show-item">
    <div class="show-date"><div class="month">Apr</div><div class="day">05</div><div class="dow">Sun</div></div>
    <div class="show-details">
      <h3>Midnight Signal</h3>
      <div class="venue">The Independent · San Francisco, CA</div>
      <div class="support">w/ <em>Vera Luna</em></div>
    </div>
    <span class="ticket-btn on-sale">On Sale</span>
  </div>

  <div class="show-item">
    <div class="show-date"><div class="month">Apr</div><div class="day">11</div><div class="dow">Sat</div></div>
    <div class="show-details">
      <h3>Rae Nomura Trio</h3>
      <div class="venue">Jack London Revue · Portland, OR</div>
      <div class="support">An intimate evening of jazz · Two sets</div>
    </div>
    <span class="ticket-btn on-sale">On Sale</span>
  </div>

  <div class="show-item">
    <div class="show-date"><div class="month">Apr</div><div class="day">18</div><div class="dow">Sat</div></div>
    <div class="show-details">
      <h3>Midnight Signal</h3>
      <div class="venue">Lodge Room · Los Angeles, CA</div>
      <div class="support">w/ <em>The Haze</em>, <em>Vera Luna</em></div>
    </div>
    <span class="ticket-btn on-sale">On Sale</span>
  </div>

  <div class="show-item">
    <div class="show-date"><div class="month">May</div><div class="day">02</div><div class="dow">Sat</div></div>
    <div class="show-details">
      <h3>Flavor Records Showcase</h3>
      <div class="venue">Revolution Hall · Portland, OR</div>
      <div class="support"><em>Midnight Signal</em> · <em>KODA</em> · <em>Vera Luna</em> · <em>Slow Beacon</em> · <em>DJ Sable</em></div>
    </div>
    <span class="ticket-btn free">Free RSVP</span>
  </div>

  <div class="show-item">
    <div class="show-date"><div class="month">May</div><div class="day">17</div><div class="dow">Sun</div></div>
    <div class="show-details">
      <h3>DJ Sable</h3>
      <div class="venue">Kremwerk · Seattle, WA</div>
      <div class="support">Late-night DJ set · Doors 10pm</div>
    </div>
    <span class="ticket-btn on-sale">On Sale</span>
  </div>

  <div class="show-item">
    <div class="show-date"><div class="month">Jun</div><div class="day">07</div><div class="dow">Sun</div></div>
    <div class="show-details">
      <h3>Slow Beacon</h3>
      <div class="venue">The Old Church · Portland, OR</div>
      <div class="support">Ambient listening session · Limited capacity</div>
    </div>
    <span class="ticket-btn on-sale">On Sale</span>
  </div>
</section>

<section class="past-shows">
  <h2>Past Shows</h2>

  <div class="show-item">
    <div class="show-date"><div class="month">Feb</div><div class="day">28</div><div class="dow">Sat</div></div>
    <div class="show-details">
      <h3>Midnight Signal</h3>
      <div class="venue">Mississippi Studios · Portland, OR</div>
      <div class="support">Album release show — <em>Echoes of Tomorrow</em></div>
    </div>
    <span class="ticket-btn sold-out">Sold Out</span>
  </div>

  <div class="show-item">
    <div class="show-date"><div class="month">Feb</div><div class="day">14</div><div class="dow">Sat</div></div>
    <div class="show-details">
      <h3>Rae Nomura Trio</h3>
      <div class="venue">Alberta Rose Theatre · Portland, OR</div>
      <div class="support">Valentine's evening — two sets w/ special guests</div>
    </div>
    <span class="ticket-btn sold-out">Sold Out</span>
  </div>

  <div class="show-item">
    <div class="show-date"><div class="month">Jan</div><div class="day">18</div><div class="dow">Sun</div></div>
    <div class="show-details">
      <h3>KODA + DJ Sable</h3>
      <div class="venue">Bunk Bar · Portland, OR</div>
      <div class="support">Flavor Records New Year Kick-off</div>
    </div>
    <span class="ticket-btn sold-out">Sold Out</span>
  </div>

  <div class="show-item">
    <div class="show-date"><div class="month">Dec</div><div class="day">31</div><div class="dow">Wed</div></div>
    <div class="show-details">
      <h3>Flavor Records NYE</h3>
      <div class="venue">Wonder Ballroom · Portland, OR</div>
      <div class="support">Full roster showcase · NYE countdown</div>
    </div>
    <span class="ticket-btn sold-out">Sold Out</span>
  </div>
</section>

<footer>
  <p>Flavor Records · Portland, OR · info@flavorrecords.com</p>
  <p style="margin-top:4px;">&copy; 2026 Flavor Records. All rights reserved.</p>
</footer>

</body>
</html>`
}

export function labelAbout(themeCSS: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>About — Flavor Records</title>
<style>${themeCSS}</style>
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: var(--theme-font-body); color: var(--theme-text); background: var(--theme-bg); line-height: var(--theme-line-height-normal); }
h1, h2, h3 { font-family: var(--theme-font-heading); font-weight: 900; }
a.nav-link:hover { color: var(--theme-text) !important; }

.page-header { max-width: var(--theme-content-width); margin: 0 auto; padding: var(--theme-space-8) var(--theme-space-3) var(--theme-space-6); }
.page-header h1 { font-size: var(--theme-font-size-xlarge); text-transform: uppercase; letter-spacing: -0.02em; }
.page-header .subtitle { color: var(--theme-color-muted); margin-top: 4px; font-size: var(--theme-font-size-large); }

section { max-width: var(--theme-content-width); margin: 0 auto; padding: 0 var(--theme-space-3) var(--theme-space-8); }
section h2 { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.12em; color: var(--theme-color-muted-dark); margin-bottom: var(--theme-space-3); }

.story p { color: var(--theme-color-muted); font-size: var(--theme-font-size-medium); margin-bottom: var(--theme-space-2); max-width: 720px; line-height: 1.75; }
.story p:first-of-type { color: var(--theme-text); font-size: 1.15rem; }

.pull-quote { border-left: 3px solid var(--theme-color-primary); padding: var(--theme-space-3) var(--theme-space-4); margin: var(--theme-space-4) 0; max-width: 720px; }
.pull-quote p { font-size: 1.3rem; font-style: italic; color: var(--theme-text); line-height: 1.6; }

.team-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: var(--theme-space-3); }
.team-member { padding: var(--theme-space-3); border: 1px solid var(--theme-color-surface-alt); border-radius: 8px; }
.team-member .avatar { width: 64px; height: 64px; border-radius: 50%; margin-bottom: var(--theme-space-2); display: flex; align-items: center; justify-content: center; font-weight: 900; font-size: 1.4rem; font-family: var(--theme-font-heading); }
.team-member h3 { font-size: 1.05rem; margin-bottom: 2px; }
.team-member .role { font-size: 0.8rem; color: var(--theme-color-primary); text-transform: uppercase; letter-spacing: 0.08em; font-weight: 700; margin-bottom: var(--theme-space-1); }
.team-member p { font-size: 0.9rem; color: var(--theme-color-muted); line-height: 1.6; }

.guidelines { max-width: 720px; }
.guidelines p { color: var(--theme-color-muted); font-size: var(--theme-font-size-medium); margin-bottom: var(--theme-space-2); line-height: 1.75; }
.guidelines ol { padding-left: var(--theme-space-3); margin-bottom: var(--theme-space-2); }
.guidelines li { color: var(--theme-color-muted); font-size: var(--theme-font-size-medium); margin-bottom: var(--theme-space-1); line-height: 1.6; }
.guidelines li strong { color: var(--theme-text); }
.guidelines .note { padding: var(--theme-space-3); background: var(--theme-color-surface); border-radius: 8px; margin-top: var(--theme-space-3); }
.guidelines .note p { margin-bottom: 0; font-size: 0.9rem; }

.contact-block { max-width: 720px; }
.contact-block p { color: var(--theme-color-muted); font-size: var(--theme-font-size-medium); margin-bottom: var(--theme-space-1); }
.contact-block a { color: var(--theme-color-primary); text-decoration: none; }
.contact-block .social { display: flex; gap: var(--theme-space-3); margin-top: var(--theme-space-2); flex-wrap: wrap; }
.contact-block .social a { padding: 6px 16px; border: 1px solid var(--theme-color-surface-alt); border-radius: 100px; font-size: 0.8rem; color: var(--theme-color-muted); text-decoration: none; transition: all 0.15s; }
.contact-block .social a:hover { border-color: var(--theme-text); color: var(--theme-text); }

footer { text-align: center; padding: var(--theme-space-6) var(--theme-space-3); font-size: var(--theme-font-size-small); color: var(--theme-color-muted-darker); border-top: 1px solid var(--theme-color-surface-alt); }
</style>
</head>
<body>

<nav style="max-width:var(--theme-content-width);margin:0 auto;padding:var(--theme-space-3);display:flex;justify-content:space-between;align-items:center;">
  <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'homepage'},'*');return false" style="font-weight:900;color:var(--theme-text);text-decoration:none;text-transform:uppercase;letter-spacing:0.05em;">Flavor Records</a>
  <div style="display:flex;gap:var(--theme-space-3);">
    <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'releases'},'*');return false" class="nav-link" style="color:var(--theme-color-muted);text-decoration:none;font-size:0.9rem;">Releases</a>
    <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'catalog'},'*');return false" class="nav-link" style="color:var(--theme-color-muted);text-decoration:none;font-size:0.9rem;">Catalog</a>
    <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'artist'},'*');return false" class="nav-link" style="color:var(--theme-color-muted);text-decoration:none;font-size:0.9rem;">Artists</a>
    <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'shows'},'*');return false" class="nav-link" style="color:var(--theme-color-muted);text-decoration:none;font-size:0.9rem;">Shows</a>
    <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'labelAbout'},'*');return false" class="nav-link" style="color:var(--theme-text);text-decoration:none;font-size:0.9rem;">About</a>
  </div>
</nav>

<div class="page-header">
  <h1>About Flavor Records</h1>
  <p class="subtitle">Independent since 2019 · Portland, Oregon</p>
</div>

<section class="story">
  <h2>Our Story</h2>
  <p>Flavor Records started in a basement on SE Hawthorne in the summer of 2019. What began as a way to press vinyl for friends quickly became something more — a community of artists, engineers, and music obsessives who believed that independent music deserved better infrastructure, better design, and more intentional release strategies.</p>
  <p>Founded by Dani Reeves and Marcus Chen, the label grew out of Portland's fertile DIY scene. Both had spent years organizing shows, booking tours, and watching talented artists struggle with the logistics of getting their music into the world. Flavor was built to change that — a label that treats every release like an event and every artist like a partner.</p>
  <p>In five years, we've grown from two people and a borrowed turntable to a roster of eight artists spanning post-punk, electronic, jazz, ambient, and indie rock. We've pressed over 15,000 records, organized 200+ shows, and built relationships with independent record shops across the Pacific Northwest and beyond.</p>

  <div class="pull-quote">
    <p>"We don't sign genres. We sign people who make music we can't stop listening to."</p>
  </div>

  <p>Our philosophy is simple: find artists with a distinct voice, give them the resources and freedom to realize their vision, and put it into the world with care. We handle distribution, press, design, and strategy so our artists can focus on making music. Every release gets a proper vinyl run, thoughtful artwork, and a real campaign — because the music deserves it.</p>
  <p>We remain fiercely independent. No major label backing, no venture capital, no algorithms dictating what we release. Just good music, pressed on good vinyl, shared with people who care.</p>
</section>

<section>
  <h2>The Team</h2>
  <div class="team-grid">
    <div class="team-member">
      <div class="avatar" style="background:linear-gradient(135deg,#8B5CF6,#3B82F6);">DR</div>
      <h3>Dani Reeves</h3>
      <div class="role">Co-Founder · A&R</div>
      <p>Former touring musician turned label head. Dani handles artist relations, scouting, and creative direction. She's the ear behind the roster — if it's on Flavor, Dani heard it first.</p>
    </div>
    <div class="team-member">
      <div class="avatar" style="background:linear-gradient(135deg,#06B6D4,#10B981);">MC</div>
      <h3>Marcus Chen</h3>
      <div class="role">Co-Founder · Operations</div>
      <p>The logistics brain. Marcus manages distribution, vinyl production, finances, and partnerships. Previously ran operations at a Portland pressing plant.</p>
    </div>
    <div class="team-member">
      <div class="avatar" style="background:linear-gradient(135deg,#EC4899,#F59E0B);">JT</div>
      <h3>Jules Torres</h3>
      <div class="role">Art Director</div>
      <p>Responsible for every visual touchpoint — album art, merch, web, and physical packaging. Jules brings a background in printmaking and editorial design.</p>
    </div>
    <div class="team-member">
      <div class="avatar" style="background:linear-gradient(135deg,#F97316,#EF4444);">SP</div>
      <h3>Sam Park</h3>
      <div class="role">Marketing & Shows</div>
      <p>Books all live events, manages press outreach, and runs social channels. Sam came up through Portland's DIY venue circuit and knows every booker in the PNW.</p>
    </div>
  </div>
</section>

<section class="guidelines">
  <h2>Submit Your Music</h2>
  <p>We're always listening. Flavor Records accepts unsolicited demos from artists working in any genre — if the music has a point of view, we want to hear it.</p>
  <ol>
    <li><strong>Send a private streaming link</strong> (Bandcamp, SoundCloud, or Google Drive) to <a href="mailto:demos@flavorrecords.com" style="color:var(--theme-color-primary);text-decoration:none;">demos@flavorrecords.com</a></li>
    <li><strong>Include a short bio</strong> — who you are, where you're based, what drives your music</li>
    <li><strong>Tell us what you're looking for</strong> — vinyl release, full label support, distribution only, or something else</li>
    <li><strong>No genre restrictions</strong> — we care about vision and craft, not categories</li>
    <li><strong>Response time:</strong> We listen to everything. If it's a fit, you'll hear from Dani within 3–4 weeks.</li>
  </ol>
  <div class="note">
    <p><strong>Please note:</strong> We receive hundreds of submissions monthly and can only sign a handful of artists per year. A pass doesn't mean the music isn't good — it means it isn't the right fit for our roster right now. Keep making things.</p>
  </div>
</section>

<section class="contact-block">
  <h2>Get In Touch</h2>
  <p><strong>General:</strong> <a href="mailto:info@flavorrecords.com">info@flavorrecords.com</a></p>
  <p><strong>Demos:</strong> <a href="mailto:demos@flavorrecords.com">demos@flavorrecords.com</a></p>
  <p><strong>Press:</strong> <a href="mailto:press@flavorrecords.com">press@flavorrecords.com</a></p>
  <p><strong>Booking:</strong> <a href="mailto:shows@flavorrecords.com">shows@flavorrecords.com</a></p>
  <p style="margin-top:var(--theme-space-2);color:var(--theme-color-muted-dark);font-size:0.9rem;">Flavor Records · 2847 SE Hawthorne Blvd · Portland, OR 97214</p>
  <div class="social">
    <a href="#">Instagram</a>
    <a href="#">Bandcamp</a>
    <a href="#">Spotify</a>
    <a href="#">Twitter</a>
    <a href="#">Discogs</a>
  </div>
</section>

<footer>
  <p>Flavor Records · Portland, OR · info@flavorrecords.com</p>
  <p style="margin-top:4px;">&copy; 2026 Flavor Records. All rights reserved.</p>
</footer>

</body>
</html>`
}
