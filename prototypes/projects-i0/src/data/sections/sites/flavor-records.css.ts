export const flavorCSS = `
/* Flavor Records — site-specific styles */
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: var(--theme-font-body); color: var(--theme-text); background: var(--theme-bg); line-height: var(--theme-line-height-normal); }
h1, h2, h3 { font-family: var(--theme-font-heading); font-weight: 900; }
a.nav-link:hover { color: var(--theme-text) !important; }

/* Nav */
.site-nav { max-width: var(--theme-content-width); margin: 0 auto; padding: var(--theme-space-3); display: flex; justify-content: space-between; align-items: center; }
.site-nav .brand { font-weight: 900; color: var(--theme-text); text-decoration: none; text-transform: uppercase; letter-spacing: 0.05em; }
.site-nav .links { display: flex; gap: var(--theme-space-3); }
.site-nav .links a { color: var(--theme-color-muted); text-decoration: none; font-size: 0.9rem; }
.site-nav .links a.active { color: var(--theme-text); }

/* Hero */
.flavor-hero { padding: var(--theme-space-8) var(--theme-space-3) var(--theme-space-10); text-align: center; }
.flavor-hero h1 { font-size: var(--theme-font-size-hero); letter-spacing: -0.02em; text-transform: uppercase; }
.flavor-hero p { font-size: var(--theme-font-size-large); color: var(--theme-color-muted); margin-top: var(--theme-space-1); }

/* Section wrapper */
.flavor-section { max-width: var(--theme-content-width); margin: 0 auto; padding: 0 var(--theme-space-3) var(--theme-space-10); }
.flavor-section-label { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.12em; color: var(--theme-color-muted-dark); margin-bottom: var(--theme-space-3); }

/* Featured release */
.featured-release { display: flex; gap: var(--theme-space-4); align-items: center; flex-wrap: wrap; cursor: pointer; }
.featured-art { width: 300px; max-width: 100%; aspect-ratio: 1; border-radius: 8px; flex-shrink: 0; }
.featured-info h3 { font-size: 2rem; margin-bottom: 4px; }
.featured-info .artist { font-size: var(--theme-font-size-large); color: var(--theme-color-muted); margin-bottom: var(--theme-space-2); }
.featured-info .listen { display: inline-block; padding: 10px 28px; background: var(--theme-text); color: var(--theme-bg); border-radius: 100px; text-decoration: none; font-weight: 700; font-size: 0.9rem; }

/* Release grid */
.release-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 20px; }
.release { cursor: pointer; }
.release-art { aspect-ratio: 1; border-radius: 6px; margin-bottom: 10px; }
.release h4 { font-size: 0.95rem; font-weight: 700; }
.release .artist { font-size: 0.85rem; color: var(--theme-color-muted); }

/* Artist profile */
.artist-hero { max-width: var(--theme-content-width); margin: 0 auto; padding: var(--theme-space-8) var(--theme-space-3) var(--theme-space-6); display: flex; gap: var(--theme-space-5); align-items: center; flex-wrap: wrap; }
.artist-photo { width: 280px; aspect-ratio: 1; border-radius: 50%; flex-shrink: 0; }
.artist-meta h1 { font-size: var(--theme-font-size-xlarge); text-transform: uppercase; letter-spacing: -0.02em; }
.artist-meta .tagline { color: var(--theme-color-muted); font-size: var(--theme-font-size-large); margin-top: 4px; }
.artist-meta .tags { display: flex; gap: var(--theme-space-1); margin-top: var(--theme-space-2); flex-wrap: wrap; }
.artist-meta .tag { padding: 4px 14px; border: 1px solid var(--theme-color-surface-alt); border-radius: 100px; font-size: 0.75rem; color: var(--theme-color-muted); text-transform: uppercase; letter-spacing: 0.08em; }

/* Quote */
.flavor-quote { border-left: 3px solid var(--theme-color-primary); padding: 20px var(--theme-space-3); margin-bottom: var(--theme-space-8); max-width: var(--theme-content-width); margin-left: auto; margin-right: auto; }
.flavor-quote p { font-size: 1.2rem; font-style: italic; color: #ccc; }
.flavor-quote cite { display: block; margin-top: 12px; font-size: 0.85rem; color: var(--theme-color-muted-dark); font-style: normal; }

/* Bio */
.flavor-bio { max-width: var(--theme-content-width); margin: 0 auto; padding: 0 var(--theme-space-3) var(--theme-space-8); }
.flavor-bio p { color: #bbb; font-size: var(--theme-font-size-medium); margin-bottom: var(--theme-space-2); max-width: 680px; }

/* Discography grid */
.discography-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 20px; }
.disc-item { cursor: default; }
.disc-art { aspect-ratio: 1; border-radius: 6px; margin-bottom: 10px; }
.disc-item h4 { font-size: 0.95rem; font-weight: 700; }
.disc-item .year { font-size: var(--theme-font-size-small); color: var(--theme-color-muted-dark); }
.disc-item .format { display: inline-block; font-size: 0.65rem; text-transform: uppercase; letter-spacing: 0.08em; color: var(--theme-color-primary); margin-top: 2px; }

/* Artist shows (compact) */
.shows-list { display: flex; flex-direction: column; gap: var(--theme-space-2); }
.show { display: flex; justify-content: space-between; align-items: center; padding: var(--theme-space-2) 0; border-bottom: 1px solid var(--theme-color-surface-alt); flex-wrap: wrap; gap: var(--theme-space-1); }
.show-date { font-weight: 900; font-size: 0.85rem; text-transform: uppercase; color: var(--theme-color-primary); min-width: 120px; }
.show-venue { flex: 1; }
.show-venue .name { font-weight: 700; }
.show-venue .city { font-size: 0.85rem; color: var(--theme-color-muted); }
.show-status { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.08em; padding: 6px 16px; border: 1px solid var(--theme-color-surface-alt); border-radius: 100px; color: var(--theme-color-muted); }
.show-status.soldout { border-color: var(--theme-color-danger); color: var(--theme-color-danger); }

/* Release cards (releases page) */
.release-card { cursor: default; }
.release-card .art { aspect-ratio: 1; border-radius: 6px; margin-bottom: 12px; position: relative; overflow: hidden; }
.release-card .art .format-badge { position: absolute; top: 10px; right: 10px; background: rgba(0,0,0,0.6); backdrop-filter: blur(8px); padding: 3px 10px; border-radius: 100px; font-size: 0.65rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: var(--theme-text); }
.release-card h4 { font-size: var(--theme-font-size-medium); font-weight: 700; margin-bottom: 2px; }
.release-card .artist { font-size: 0.85rem; color: var(--theme-color-muted); }
.release-card .meta { display: flex; gap: var(--theme-space-1); align-items: center; margin-top: 6px; }
.release-card .year { font-size: 0.75rem; color: var(--theme-color-muted-darker); }
.release-card .genre { font-size: 0.65rem; text-transform: uppercase; letter-spacing: 0.08em; padding: 2px 8px; border: 1px solid var(--theme-color-surface-alt); border-radius: 100px; color: var(--theme-color-muted); }

/* Page header */
.flavor-page-header { max-width: var(--theme-content-width); margin: 0 auto; padding: var(--theme-space-8) var(--theme-space-3) var(--theme-space-6); }
.flavor-page-header h1 { font-size: var(--theme-font-size-xlarge); text-transform: uppercase; letter-spacing: -0.02em; }
.flavor-page-header p { color: var(--theme-color-muted); margin-top: 4px; }
.flavor-page-header .subtitle { font-size: var(--theme-font-size-large); }

/* Catalog */
.filters { max-width: var(--theme-content-width); margin: 0 auto; padding: 0 var(--theme-space-3) var(--theme-space-4); display: flex; gap: 8px; flex-wrap: wrap; }
.filter-btn { padding: 6px 18px; border-radius: 100px; border: 1px solid var(--theme-color-surface-alt); background: transparent; color: var(--theme-color-muted); font-size: 0.8rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; cursor: pointer; font-family: var(--theme-font-body); transition: all 0.15s; }
.filter-btn:hover, .filter-btn.active { background: var(--theme-text); color: var(--theme-bg); border-color: var(--theme-text); }
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

/* Shows page */
.show-item { display: grid; grid-template-columns: 90px 1fr auto; gap: var(--theme-space-3); align-items: start; padding: var(--theme-space-3) 0; border-bottom: 1px solid var(--theme-color-surface-alt); }
.show-item .show-date { text-align: center; }
.show-item .show-date .month { font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.12em; color: var(--theme-color-primary); font-weight: 700; }
.show-item .show-date .day { font-size: 2rem; font-weight: 900; line-height: 1; font-family: var(--theme-font-heading); }
.show-item .show-date .dow { font-size: 0.7rem; color: var(--theme-color-muted-dark); text-transform: uppercase; }
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

/* About page — story */
.flavor-story p { color: var(--theme-color-muted); font-size: var(--theme-font-size-medium); margin-bottom: var(--theme-space-2); max-width: 720px; line-height: 1.75; }
.flavor-story p:first-of-type { color: var(--theme-text); font-size: 1.15rem; }

/* Pull quote */
.pull-quote { border-left: 3px solid var(--theme-color-primary); padding: var(--theme-space-3) var(--theme-space-4); margin: var(--theme-space-4) 0; max-width: 720px; }
.pull-quote p { font-size: 1.3rem; font-style: italic; color: var(--theme-text); line-height: 1.6; }

/* Team grid */
.flavor-team-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: var(--theme-space-3); }
.flavor-team-member { padding: var(--theme-space-3); border: 1px solid var(--theme-color-surface-alt); border-radius: 8px; }
.flavor-team-member .avatar { width: 64px; height: 64px; border-radius: 50%; margin-bottom: var(--theme-space-2); display: flex; align-items: center; justify-content: center; font-weight: 900; font-size: 1.4rem; font-family: var(--theme-font-heading); }
.flavor-team-member h3 { font-size: 1.05rem; margin-bottom: 2px; }
.flavor-team-member .role { font-size: 0.8rem; color: var(--theme-color-primary); text-transform: uppercase; letter-spacing: 0.08em; font-weight: 700; margin-bottom: var(--theme-space-1); }
.flavor-team-member p { font-size: 0.9rem; color: var(--theme-color-muted); line-height: 1.6; }

/* Submit music */
.flavor-guidelines { max-width: 720px; }
.flavor-guidelines p { color: var(--theme-color-muted); font-size: var(--theme-font-size-medium); margin-bottom: var(--theme-space-2); line-height: 1.75; }
.flavor-guidelines ol { padding-left: var(--theme-space-3); margin-bottom: var(--theme-space-2); }
.flavor-guidelines li { color: var(--theme-color-muted); font-size: var(--theme-font-size-medium); margin-bottom: var(--theme-space-1); line-height: 1.6; }
.flavor-guidelines li strong { color: var(--theme-text); }
.flavor-guidelines .note { padding: var(--theme-space-3); background: var(--theme-color-surface); border-radius: 8px; margin-top: var(--theme-space-3); }
.flavor-guidelines .note p { margin-bottom: 0; font-size: 0.9rem; }

/* Contact */
.flavor-contact { max-width: 720px; }
.flavor-contact p { color: var(--theme-color-muted); font-size: var(--theme-font-size-medium); margin-bottom: var(--theme-space-1); }
.flavor-contact a { color: var(--theme-color-primary); text-decoration: none; }
.flavor-contact .social { display: flex; gap: var(--theme-space-3); margin-top: var(--theme-space-2); flex-wrap: wrap; }
.flavor-contact .social a { padding: 6px 16px; border: 1px solid var(--theme-color-surface-alt); border-radius: 100px; font-size: 0.8rem; color: var(--theme-color-muted); text-decoration: none; transition: all 0.15s; }
.flavor-contact .social a:hover { border-color: var(--theme-text); color: var(--theme-text); }

/* Footer */
footer { text-align: center; padding: var(--theme-space-6) var(--theme-space-3); font-size: var(--theme-font-size-small); color: var(--theme-color-muted-darker); border-top: 1px solid var(--theme-color-surface-alt); }
`
