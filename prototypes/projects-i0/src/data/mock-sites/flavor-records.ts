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
    <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'artist'},'*');return false" class="nav-link" style="color:var(--theme-color-muted);text-decoration:none;font-size:0.9rem;">Artists</a>
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
    <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'artist'},'*');return false" class="nav-link" style="color:var(--theme-text);text-decoration:none;font-size:0.9rem;">Artists</a>
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
    <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'artist'},'*');return false" class="nav-link" style="color:var(--theme-color-muted);text-decoration:none;font-size:0.9rem;">Artists</a>
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
