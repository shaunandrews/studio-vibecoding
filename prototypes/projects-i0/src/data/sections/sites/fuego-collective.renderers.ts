// Fuego Collective — site-specific section renderers

import type { Section } from '../types'
import type {
  FuegoHeaderData,
  FuegoFooterData,
  FuegoHeroData,
  FuegoProductLineupData,
  FuegoLifestyleData,
  FuegoTestimonialsData,
  FuegoNewsletterData,
  FuegoPageHeaderData,
  FuegoFiltersData,
  FuegoProductGridData,
  FuegoBreadcrumbData,
  FuegoProductDetailData,
  FuegoRelatedProductsData,
  FuegoReviewsData,
} from './fuego-collective.types'

export function renderFuegoSection(section: Section): string | null {
  switch (section.type as string) {
    case 'fuego-header': return renderFuegoHeader(section.data as unknown as FuegoHeaderData)
    case 'fuego-footer': return renderFuegoFooter(section.data as unknown as FuegoFooterData)
    case 'fuego-hero': return renderFuegoHero(section.data as unknown as FuegoHeroData)
    case 'fuego-product-lineup': return renderFuegoProductLineup(section.data as unknown as FuegoProductLineupData)
    case 'fuego-lifestyle': return renderFuegoLifestyle(section.data as unknown as FuegoLifestyleData)
    case 'fuego-testimonials': return renderFuegoTestimonials(section.data as unknown as FuegoTestimonialsData)
    case 'fuego-newsletter': return renderFuegoNewsletter(section.data as unknown as FuegoNewsletterData)
    case 'fuego-page-header': return renderFuegoPageHeader(section.data as unknown as FuegoPageHeaderData)
    case 'fuego-filters': return renderFuegoFilters(section.data as unknown as FuegoFiltersData)
    case 'fuego-product-grid': return renderFuegoProductGrid(section.data as unknown as FuegoProductGridData)
    case 'fuego-breadcrumb': return renderFuegoBreadcrumb(section.data as unknown as FuegoBreadcrumbData)
    case 'fuego-product-detail': return renderFuegoProductDetail(section.data as unknown as FuegoProductDetailData)
    case 'fuego-related-products': return renderFuegoRelatedProducts(section.data as unknown as FuegoRelatedProductsData)
    case 'fuego-reviews': return renderFuegoReviews(section.data as unknown as FuegoReviewsData)
    default: return null
  }
}

function nav(page: string) {
  return `onclick="window.parent.postMessage({type:'navigate',page:'${page}'},'*');return false"`
}

function renderFuegoHeader(data: FuegoHeaderData): string {
  const links = data.navItems.map(item =>
    `    <a href="#" ${nav(item.page)}>${item.label}</a>`
  ).join('\n')
  return `<div class="topnav">
  <div class="logo">Fuego <span>Collective</span></div>
  <nav>
${links}
  </nav>
</div>`
}

function renderFuegoFooter(data: FuegoFooterData): string {
  const links = data.navItems.map(item =>
    `      <a href="#" ${nav(item.page)}>${item.label}</a>`
  ).join('\n')
  const socials = data.socials.map(s =>
    `<a href="${s.url}">${s.label}</a>`
  ).join(' · ')
  return `<footer class="fuego-footer">
  <div class="footer-inner">
    <div class="brand">Fuego <span>Collective</span></div>
    <div class="links">
${links}
    </div>
    <div class="socials">${socials}</div>
    <p>${data.tagline} · ${data.email}</p>
    ${data.wpTagline ? `<p class="wp">${data.wpTagline}</p>` : ''}
  </div>
</footer>`
}

function renderFuegoHero(data: FuegoHeroData): string {
  const ctas = data.ctas.map(cta => {
    const cls = cta.variant === 'primary' ? 'btn-primary' : 'btn-outline'
    return `    <a href="#" class="${cls}" ${nav(cta.page)}>${cta.label}</a>`
  }).join('\n')
  return `<div class="fuego-hero">
  <div class="hero-img"><img src="${data.image.src}" alt="${data.image.alt}" /></div>
  <div class="hero-content">
    <h1>${data.heading}</h1>
    <p>${data.description}</p>
${ctas}
  </div>
</div>`
}

function renderFuegoProductLineup(data: FuegoProductLineupData): string {
  const cards = data.products.map(p => `    <div class="lineup-card">
      <img src="${p.image.src}" alt="${p.image.alt}" />
      <h3>${p.name}</h3>
      <div class="heat">${p.heat}</div>
      <div class="price">${p.price}</div>
    </div>`).join('\n')
  return `<section class="lineup">
  <h2>${data.heading}</h2>
  <p class="subtitle">${data.subtitle}</p>
  <div class="lineup-grid">
${cards}
  </div>
</section>`
}

function renderFuegoLifestyle(data: FuegoLifestyleData): string {
  const paragraphs = data.paragraphs.map(p => `    <p>${p}</p>`).join('\n')
  const cta = data.cta
    ? `\n    <a href="#" class="btn-primary" ${nav(data.cta.page)}>${data.cta.label}</a>`
    : ''
  return `<section class="lifestyle">
  <img src="${data.image.src}" alt="${data.image.alt}" />
  <div class="lifestyle-text">
    <h2>${data.heading}</h2>
${paragraphs}${cta}
  </div>
</section>`
}

function renderFuegoTestimonials(data: FuegoTestimonialsData): string {
  const cards = data.testimonials.map(t => {
    const stars = '★'.repeat(t.stars) + '☆'.repeat(5 - t.stars)
    return `    <div class="testimonial-card">
      <div class="stars">${stars}</div>
      <blockquote>"${t.quote}"</blockquote>
      <div class="author">— ${t.author}</div>
    </div>`
  }).join('\n')
  return `<section class="testimonials">
  <h2>${data.heading}</h2>
  <div class="testimonial-grid">
${cards}
  </div>
</section>`
}

function renderFuegoNewsletter(data: FuegoNewsletterData): string {
  return `<section class="newsletter">
  <h2>${data.heading}</h2>
  <p>${data.description}</p>
  <form onsubmit="return false">
    <input type="email" placeholder="${data.placeholder}" />
    <button type="submit">${data.buttonLabel}</button>
  </form>
</section>`
}

function renderFuegoPageHeader(data: FuegoPageHeaderData): string {
  const subtitle = data.subtitle ? `\n  <p>${data.subtitle}</p>` : ''
  return `<div class="fuego-page-header">
  <h1>${data.heading}</h1>${subtitle}
</div>`
}

function renderFuegoFilters(data: FuegoFiltersData): string {
  const btns = data.options.map((opt, i) =>
    `  <button class="filter-btn${i === 0 ? ' active' : ''}">${opt}</button>`
  ).join('\n')
  return `<div class="filters">
  <label>${data.label}</label>
${btns}
</div>`
}

function renderFuegoProductGrid(data: FuegoProductGridData): string {
  const cards = data.products.map(p => {
    const imgContent = p.image
      ? `<img src="${p.image.src}" alt="${p.image.alt}" />`
      : `<div class="placeholder" style="background:${p.placeholder};"></div>`
    const cartClick = p.linkPage ? ` ${nav(p.linkPage)}` : ''
    return `  <div class="product-card">
    <div class="img-wrap">${imgContent}</div>
    <div class="info">
      <h3>${p.name}</h3>
      <div class="meta"><span class="heat">${p.heat}</span><span class="size">${p.size}</span></div>
      <div class="price-row"><span class="price">${p.price}</span><button class="btn-cart"${cartClick}>Add to Cart</button></div>
    </div>
  </div>`
  }).join('\n\n')
  return `<div class="product-grid">
${cards}
</div>`
}

function renderFuegoBreadcrumb(data: FuegoBreadcrumbData): string {
  const parts = data.items.map(item => {
    if (item.page) {
      return `<a href="#" ${nav(item.page)}>${item.label}</a>`
    }
    return item.label
  }).join(' / ')
  return `<div class="breadcrumb">${parts}</div>`
}

function renderFuegoProductDetail(data: FuegoProductDetailData): string {
  const desc = data.description.map(p => `      <p>${p}</p>`).join('\n')
  const ingredients = data.ingredients.map(i => `          <li>${i}</li>`).join('\n')
  const pairings = data.pairings.map(p => `          <li>${p}</li>`).join('\n')
  return `<div class="product-detail">
  <div class="product-image">
    <img src="${data.image.src}" alt="${data.image.alt}" />
  </div>
  <div class="product-info">
    <h1>${data.name}</h1>
    <span class="heat-badge">${data.heatBadge}</span>
    <div class="scoville">${data.scoville}</div>
    <div class="price">${data.price}</div>
    <div class="desc">
${desc}
    </div>
    <div class="qty-row">
      <label>Qty</label>
      <button class="qty-btn">−</button>
      <span class="qty-val">1</span>
      <button class="qty-btn">+</button>
    </div>
    <button class="btn-add">Add to Cart — ${data.price}</button>
    <div class="details-grid">
      <div class="detail-box">
        <h4>Ingredients</h4>
        <ul>
${ingredients}
        </ul>
      </div>
      <div class="detail-box">
        <h4>Perfect With</h4>
        <ul>
${pairings}
        </ul>
      </div>
    </div>
  </div>
</div>`
}

function renderFuegoRelatedProducts(data: FuegoRelatedProductsData): string {
  const cards = data.products.map(p => `    <div class="also-card">
      <div class="img-wrap"><img src="${p.image.src}" alt="${p.image.alt}" /></div>
      <div class="info"><h3>${p.name}</h3><div class="price">${p.price}</div></div>
    </div>`).join('\n')
  return `<section class="also-like">
  <h2>${data.heading}</h2>
  <div class="also-grid">
${cards}
  </div>
</section>`
}

function renderFuegoReviews(data: FuegoReviewsData): string {
  const cards = data.reviews.map(r => {
    const stars = '★'.repeat(r.stars) + '☆'.repeat(5 - r.stars)
    return `    <div class="review-card">
      <div class="stars">${stars}</div>
      <div class="body">${r.body}</div>
      <div class="author">— ${r.author}</div>
    </div>`
  }).join('\n')
  return `<section class="reviews">
  <h2>${data.heading}</h2>
  <div class="review-list">
${cards}
  </div>
</section>`
}
