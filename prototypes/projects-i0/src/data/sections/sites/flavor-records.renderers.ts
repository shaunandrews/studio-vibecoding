import type { Section } from '../types'
import type {
  FlavorHeroData,
  FlavorFeaturedReleaseData,
  FlavorReleaseGridData,
  FlavorArtistProfileData,
  FlavorArtistDiscographyData,
  FlavorArtistShowsData,
  FlavorReleaseYearGroupData,
  FlavorCatalogData,
  FlavorShowsListData,
  FlavorLabelStoryData,
  FlavorPullQuoteData,
  FlavorTeamGridData,
  FlavorSubmitMusicData,
  FlavorContactData,
} from './flavor-records.types'

export function renderFlavorSection(section: Section, activePage: string): string | null {
  const d = section.data
  switch (section.type) {
    case 'flavor-header': return renderFlavorHeader(d, activePage)
    case 'flavor-footer': return renderFlavorFooter(d)
    case 'flavor-hero': return renderFlavorHero(d)
    case 'flavor-featured-release': return renderFeaturedRelease(d)
    case 'flavor-release-grid': return renderReleaseGrid(d)
    case 'flavor-artist-profile': return renderArtistProfile(d)
    case 'flavor-artist-discography': return renderArtistDiscography(d)
    case 'flavor-artist-shows': return renderArtistShows(d)
    case 'flavor-release-year-group': return renderReleaseYearGroup(d)
    case 'flavor-catalog': return renderCatalog(d)
    case 'flavor-shows-list': return renderShowsList(d)
    case 'flavor-label-story': return renderLabelStory(d)
    case 'flavor-pull-quote': return renderPullQuote(d)
    case 'flavor-team-grid': return renderFlavorTeamGrid(d)
    case 'flavor-submit-music': return renderSubmitMusic(d)
    case 'flavor-contact': return renderFlavorContact(d)
    default: return null
  }
}

function renderFlavorHeader(data: Record<string, any>, activePage: string): string {
  const links = data.navItems.map((item: { label: string; page: string }) => {
    const active = item.page === activePage ? ' class="active"' : ''
    return `    <a href="#"${active} onclick="${nav(item.page)}">${item.label}</a>`
  }).join('\n')
  return `<nav class="site-nav">
  <a href="#" class="brand" onclick="${nav(data.brandPage)}">${data.brand}</a>
  <div class="links">
${links}
  </div>
</nav>`
}

function renderFlavorFooter(data: Record<string, any>): string {
  return `<footer>
  <p>${data.copyright}</p>
  <p>${data.address}</p>
</footer>`
}

function nav(page: string): string {
  return `window.parent.postMessage({type:'navigate',page:'${page}'},'*');return false`
}

function renderFlavorHero(data: FlavorHeroData): string {
  return `<div class="flavor-hero">
  <h1>${data.heading}</h1>
  <p>${data.tagline}</p>
</div>`
}

function renderFeaturedRelease(data: FlavorFeaturedReleaseData): string {
  return `<section class="flavor-section">
  <h2 class="flavor-section-label">${data.label}</h2>
  <div class="featured-release" onclick="${nav(data.linkPage)}">
    <div class="featured-art" style="background:${data.artGradient};"></div>
    <div class="featured-info">
      <div class="artist">${data.artist}</div>
      <h3>${data.title}</h3>
      <p class="artist" style="margin-bottom:20px;">${data.meta}</p>
      <a href="#" onclick="event.stopPropagation();${nav(data.linkPage)}" class="listen">${data.linkText}</a>
    </div>
  </div>
</section>`
}

function renderReleaseGrid(data: FlavorReleaseGridData): string {
  const items = data.releases.map(r => {
    const click = r.linkPage ? ` onclick="${nav(r.linkPage)}"` : ''
    return `    <div class="release"${click}>
      <div class="release-art" style="background:${r.artGradient};"></div>
      <h4>${r.title}</h4>
      <div class="artist">${r.artist}</div>
    </div>`
  }).join('\n')

  return `<section class="flavor-section">
  <h2 class="flavor-section-label">${data.label}</h2>
  <div class="release-grid">
${items}
  </div>
</section>`
}

function renderArtistProfile(data: FlavorArtistProfileData): string {
  const tags = data.tags.map(t => `<span class="tag">${t}</span>`).join('\n      ')

  let quoteHtml = ''
  if (data.quote) {
    quoteHtml = `\n\n<section style="padding-bottom:0;">
  <div class="flavor-quote">
    <p>"${data.quote.text}"</p>
    <cite>— ${data.quote.attribution}</cite>
  </div>
</section>`
  }

  const bioHtml = data.bio.map(p => `  <p>${p}</p>`).join('\n')

  return `<div class="artist-hero">
  <div class="artist-photo" style="background:${data.photoGradient};"></div>
  <div class="artist-meta">
    <h1>${data.name}</h1>
    <p class="tagline">${data.location} · Signed ${data.signed}</p>
    <div class="tags">
      ${tags}
    </div>
  </div>
</div>${quoteHtml}

<section class="flavor-bio">
  <h2 class="flavor-section-label">About</h2>
${bioHtml}
</section>`
}

function renderArtistDiscography(data: FlavorArtistDiscographyData): string {
  const items = data.items.map(item => `    <div class="disc-item">
      <div class="disc-art" style="background:${item.artGradient};"></div>
      <h4>${item.title}</h4>
      <span class="format">${item.format}</span>
      <div class="year">${item.year}</div>
    </div>`).join('\n')

  return `<section class="flavor-section">
  <h2 class="flavor-section-label">${data.label}</h2>
  <div class="discography-grid">
${items}
  </div>
</section>`
}

function renderArtistShows(data: FlavorArtistShowsData): string {
  const items = data.shows.map(s => {
    const statusClass = s.status === 'sold-out' ? ' soldout' : ''
    const label = s.status === 'sold-out' ? 'Sold Out' : 'Tickets'
    return `    <div class="show">
      <div class="show-date">${s.date}</div>
      <div class="show-venue">
        <div class="name">${s.venueName}</div>
        <div class="city">${s.venueCity}</div>
      </div>
      <div class="show-status${statusClass}">${label}</div>
    </div>`
  }).join('\n')

  return `<section class="flavor-section">
  <h2 class="flavor-section-label">${data.label}</h2>
  <div class="shows-list">
${items}
  </div>
</section>`
}

function renderReleaseYearGroup(data: FlavorReleaseYearGroupData): string {
  const cards = data.releases.map(r => `    <div class="release-card">
      <div class="art" style="background:${r.artGradient};">
        <span class="format-badge">${r.format}</span>
      </div>
      <h4>${r.title}</h4>
      <div class="artist">${r.artist}</div>
      <div class="meta">
        <span class="year">${r.date}</span>
        <span class="genre">${r.genre}</span>
      </div>
    </div>`).join('\n')

  return `<section class="flavor-section">
  <h2 class="flavor-section-label">${data.year}</h2>
  <div class="release-grid">
${cards}
  </div>
</section>`
}

function renderCatalog(data: FlavorCatalogData): string {
  const filterBtns = data.filters.map((f, i) => {
    const active = i === 0 ? ' active' : ''
    const val = f.toLowerCase().replace(/\s+/g, '-')
    return `  <button class="filter-btn${active}" onclick="filterCatalog('${val === 'all' ? 'all' : val}')">${f}</button>`
  }).join('\n')

  const cards = data.items.map(item => {
    const genres = item.genres.map(g => `<span class="genre">${g}</span>`).join('')
    const click = item.linkPage ? ` onclick="${nav(item.linkPage)}"` : ''
    return `    <div class="card" data-genre="${item.dataGenre}"${click}>
      <div class="card-art" style="background:${item.artGradient};"><span class="initial">${item.initial}</span><span class="album-label">${item.title}</span><span class="format-badge">${item.format}</span></div>
      <h4>${item.title}</h4>
      <div class="artist">${item.artist}</div>
      <div class="meta"><span class="year">${item.year}</span>${genres}</div>
    </div>`
  }).join('\n')

  return `<div class="filters">
${filterBtns}
</div>

<section class="flavor-section">
  <div class="catalog-grid">
${cards}
  </div>
</section>

<script>
function filterCatalog(genre) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  event.target.classList.add('active');
  document.querySelectorAll('.card').forEach(card => {
    if (genre === 'all') { card.style.display = ''; return; }
    card.style.display = card.dataset.genre === genre ? '' : 'none';
  });
}
</script>`
}

function renderShowsList(data: FlavorShowsListData): string {
  const items = data.shows.map(s => {
    const statusClass = s.ticketStatus === 'sold-out' ? 'sold-out' : s.ticketStatus === 'free' ? 'free' : 'on-sale'
    return `  <div class="show-item">
    <div class="show-date"><div class="month">${s.date.month}</div><div class="day">${s.date.day}</div><div class="dow">${s.date.dow}</div></div>
    <div class="show-details">
      <h3>${s.headliner}</h3>
      <div class="venue">${s.venue} · ${s.city}</div>
      <div class="support">${s.support}</div>
    </div>
    <span class="ticket-btn ${statusClass}">${s.ticketLabel}</span>
  </div>`
  }).join('\n\n')

  const pastClass = data.isPast ? ' class="past-shows"' : ''

  return `<section class="flavor-section"${pastClass}>
  <h2 class="flavor-section-label">${data.label}</h2>
${items}
</section>`
}

function renderLabelStory(data: FlavorLabelStoryData): string {
  const paragraphs = data.paragraphs.map(p => `  <p>${p}</p>`).join('\n')
  return `<section class="flavor-section flavor-story">
  <h2 class="flavor-section-label">${data.label}</h2>
${paragraphs}
</section>`
}

function renderPullQuote(data: FlavorPullQuoteData): string {
  return `<section class="flavor-section">
  <div class="pull-quote">
    <p>${data.text}</p>
  </div>
</section>`
}

function renderFlavorTeamGrid(data: FlavorTeamGridData): string {
  const members = data.members.map(m => `    <div class="flavor-team-member">
      <div class="avatar" style="background:${m.avatarGradient};">${m.initials}</div>
      <h3>${m.name}</h3>
      <div class="role">${m.role}</div>
      <p>${m.bio}</p>
    </div>`).join('\n')

  return `<section class="flavor-section">
  <h2 class="flavor-section-label">${data.label}</h2>
  <div class="flavor-team-grid">
${members}
  </div>
</section>`
}

function renderSubmitMusic(data: FlavorSubmitMusicData): string {
  const steps = data.steps.map(s =>
    `    <li><strong>${s.bold}</strong>${s.rest}</li>`
  ).join('\n')

  return `<section class="flavor-section flavor-guidelines">
  <h2 class="flavor-section-label">${data.label}</h2>
  <p>${data.intro}</p>
  <ol>
${steps}
  </ol>
  <div class="note">
    <p>${data.note}</p>
  </div>
</section>`
}

function renderFlavorContact(data: FlavorContactData): string {
  const contacts = data.contacts.map(c =>
    `  <p><strong>${c.label}:</strong> <a href="mailto:${c.email}">${c.email}</a></p>`
  ).join('\n')

  const social = data.socialLinks.map(s => `    <a href="#">${s}</a>`).join('\n')

  return `<section class="flavor-section flavor-contact">
  <h2 class="flavor-section-label">${data.label}</h2>
${contacts}
  <p style="margin-top:var(--theme-space-2);color:var(--theme-color-muted-dark);font-size:0.9rem;">${data.address}</p>
  <div class="social">
${social}
  </div>
</section>`
}
