import type {
  Section,
  HeroSplitData,
  HeroFullwidthData,
  HeroSimpleData,
  ImageStripData,
  ImageGalleryData,
  MenuListData,
  ContentProseData,
  ContentCardsData,
  TeamGridData,
  EventListData,
  EventRecurringData,
  ContactInfoData,
  CtaBannerData,
  OrderMenuData
} from './types'

export function renderSection(section: Section): string {
  switch (section.type) {
    case 'hero-split': return renderHeroSplit(section.data as HeroSplitData)
    case 'hero-fullwidth': return renderHeroFullwidth(section.data as HeroFullwidthData)
    case 'hero-simple': return renderHeroSimple(section.data as HeroSimpleData)
    case 'image-strip': return renderImageStrip(section.data as ImageStripData)
    case 'image-gallery': return renderImageGallery(section.data as ImageGalleryData)
    case 'menu-list': return renderMenuList(section.data as MenuListData)
    case 'content-prose': return renderContentProse(section.data as ContentProseData)
    case 'content-cards': return renderContentCards(section.data as ContentCardsData)
    case 'team-grid': return renderTeamGrid(section.data as TeamGridData)
    case 'event-list': return renderEventList(section.data as EventListData)
    case 'event-recurring': return renderEventRecurring(section.data as EventRecurringData)
    case 'contact-info': return renderContactInfo(section.data as ContactInfoData)
    case 'cta-banner': return renderCtaBanner(section.data as CtaBannerData)
    case 'order-menu': return renderOrderMenu(section.data as OrderMenuData)
    default: return `<!-- unknown section type: ${(section as any).type} -->`
  }
}

export function renderHeroSplit(data: HeroSplitData): string {
  const hours = data.hours
    ? `<div class="hours-brief">\n      ${data.hours.join('<br>\n      ')}\n    </div>`
    : ''
  return `<div class="split-hero">
  <div class="split-hero-img">
    <img src="${data.image.src}" alt="${data.image.alt}">
  </div>
  <div class="split-hero-text">
    <h1>${data.heading}</h1>
    <p class="tagline">${data.tagline}</p>
    ${hours}
  </div>
</div>`
}

export function renderHeroFullwidth(data: HeroFullwidthData): string {
  return `<img class="hero-image" src="${data.image.src}" alt="${data.image.alt}">`
}

export function renderHeroSimple(data: HeroSimpleData): string {
  const subtitle = data.subtitle ? `\n  <p>${data.subtitle}</p>` : ''
  return `<div class="page-header">
  <h1>${data.heading}</h1>${subtitle}
</div>`
}

export function renderImageStrip(data: ImageStripData): string {
  const figures = data.images.map(img => {
    const caption = img.caption ? `\n    <figcaption>${img.caption}</figcaption>` : ''
    return `  <figure>
    <img src="${img.src}" alt="${img.alt}">${caption}
  </figure>`
  }).join('\n')
  return `<div class="image-strip">
${figures}
</div>`
}

export function renderImageGallery(data: ImageGalleryData): string {
  const heading = data.heading ? `  <h2>${data.heading}</h2>\n` : ''
  const subtitle = data.subtitle ? `  <p class="subtitle">${data.subtitle}</p>\n` : ''

  const items = data.images.map(img => {
    const sizeClass = img.size && img.size !== 'normal' ? ` ${img.size}` : ''
    const caption = img.caption ? `<span class="caption">${img.caption}</span>` : ''
    return `    <div class="gallery-item${sizeClass}"><img src="${img.src}" alt="${img.alt}">${caption}</div>`
  }).join('\n')

  return `<section>
${heading}${subtitle}  <div class="gallery-grid">
${items}
  </div>
</section>`
}

export function renderMenuList(data: MenuListData): string {
  if (data.variant === 'columns') {
    return renderMenuColumns(data)
  } else {
    return renderMenuCards(data)
  }
}

function renderMenuColumns(data: MenuListData): string {
  const heading = data.heading
    ? `  <h2>${data.heading}</h2>\n  <div class="rule"></div>\n`
    : ''

  const cols = data.categories.map(cat => {
    const items = cat.items.map(item =>
      `      <div class="menu-line"><span class="name">${item.name}</span><span class="dots"></span><span class="price">${item.price}</span></div>`
    ).join('\n')
    return `    <div class="menu-col">
      <h3>${cat.name}</h3>
${items}
    </div>`
  }).join('\n')

  return `<div class="menu-highlights">
${heading}  <div class="menu-columns">
${cols}
  </div>
</div>`
}

function renderMenuCards(data: MenuListData): string {
  const note = data.note
    ? `  <p class="note">${data.note}</p>\n`
    : ''

  const cards = data.categories.map(cat => {
    const items = cat.items.map(item =>
      `      <div class="menu-item"><span>${item.name}</span><span class="price">${item.price}</span></div>`
    ).join('\n')
    return `    <div class="menu-card">
      <h3>${cat.name}</h3>
${items}
    </div>`
  }).join('\n\n')

  return `<section>
${note}  <div class="menu-grid">

${cards}

  </div>
</section>`
}

export function renderContentProse(data: ContentProseData): string {
  if (data.background) {
    // Community-style card container
    const heading = data.heading ? `    <h2>${data.heading}</h2>\n` : ''
    return `<section>
  <div class="community">
${heading}    ${data.body}
  </div>
</section>`
  }

  const heading = data.heading ? `    <h2>${data.heading}</h2>\n` : ''
  return `<section>
  <div class="story">
${heading}    ${data.body.split('\n').join('\n    ')}
  </div>
</section>`
}

export function renderContentCards(data: ContentCardsData): string {
  const heading = data.heading
    ? `  <div class="story">\n    <h2>${data.heading}</h2>\n  </div>\n`
    : ''

  const cards = data.cards.map(card =>
    `    <div class="value-card">
      <h3>${card.title}</h3>
      <p>${card.body}</p>
    </div>`
  ).join('\n')

  return `<section>
${heading}  <div class="values-grid">
${cards}
  </div>
</section>`
}

export function renderTeamGrid(data: TeamGridData): string {
  const heading = data.heading ? `  <h2>${data.heading}</h2>\n` : ''

  const members = data.members.map(member => {
    const avatarContent = member.avatar
      ? `<img src="${member.avatar}" alt="${member.name}">`
      : (member.initials || member.name.charAt(0))
    return `    <div class="team-member">
      <div class="team-avatar">${avatarContent}</div>
      <h3>${member.name}</h3>
      <div class="role">${member.role}</div>
      <p>${member.bio}</p>
    </div>`
  }).join('\n')

  return `<section class="team-section">
${heading}  <div class="team-grid">
${members}
  </div>
</section>`
}

export function renderEventList(data: EventListData): string {
  const heading = data.heading ? `  <h2>${data.heading}</h2>\n` : ''
  const subtitle = data.subtitle ? `  <p class="subtitle">${data.subtitle}</p>\n` : ''

  const events = data.events.map(event => {
    const tag = event.tag ? `      <span class="event-tag">${event.tag}</span>\n` : ''
    return `  <div class="event-card">
    <div class="event-date"><span class="month">${event.date.month}</span><span class="day">${event.date.day}</span><span class="dow">${event.date.dow}</span></div>
    <div class="event-body">
${tag}      <h3>${event.title}</h3>
      <div class="meta">${event.meta}</div>
      <p>${event.description}</p>
    </div>
  </div>`
  }).join('\n\n')

  return `<section>
${heading}${subtitle}
${events}

</section>`
}

export function renderEventRecurring(data: EventRecurringData): string {
  const heading = data.heading ? `    <h3>${data.heading}</h3>\n` : ''

  const items = data.events.map(event =>
    `      <div class="recurring-item">
        <strong>${event.name}</strong>
        <span>${event.description}</span>
      </div>`
  ).join('\n')

  return `<section>
  <div class="recurring">
${heading}    <div class="recurring-grid">
${items}
    </div>
  </div>
</section>`
}

export function renderContactInfo(data: ContactInfoData): string {
  const heading = data.heading ? `  <h2>${data.heading}</h2>\n` : ''
  const address = data.address ? `  <p>${data.address}</p>\n` : ''
  const phone = data.phone ? `  <p>${data.phone}</p>\n` : ''
  const email = data.email ? `  <p><a href="mailto:${data.email}">${data.email}</a></p>\n` : ''

  const hours = data.hours
    ? `  <div class="contact-hours">\n${data.hours.map(h => `    <p><strong>${h.label}:</strong> ${h.value}</p>`).join('\n')}\n  </div>\n`
    : ''

  const map = data.mapEmbed
    ? `  <iframe src="${data.mapEmbed}" width="100%" height="300" style="border:0" loading="lazy"></iframe>\n`
    : ''

  return `<section class="contact-info">
${heading}${address}${phone}${email}${hours}${map}</section>`
}

export function renderCtaBanner(data: CtaBannerData): string {
  let link = ''
  if (data.linkText) {
    if (data.linkPage) {
      link = `\n  <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'${data.linkPage}'},'*');return false">${data.linkText}</a>`
    } else if (data.linkUrl) {
      link = `\n  <a href="${data.linkUrl}">${data.linkText}</a>`
    }
  }
  const heading = data.heading ? `  <h2>${data.heading}</h2>\n` : ''
  return `<div class="community">
${heading}  <p>${data.text}</p>${link}
</div>`
}

export function renderOrderMenu(data: OrderMenuData): string {
  // Page header
  const heading = data.heading ? data.heading : 'Order Online'
  const subtitle = data.subtitle ? data.subtitle : ''
  const headerHtml = `<div class="page-header">
  <h1>${heading}</h1>
  <p>${subtitle}</p>
</div>`

  // Order info bar
  const orderInfo = data.pickupInfo
    ? `<div class="order-info">\n  <strong>Ordering for pickup</strong> · ${data.pickupInfo.replace(/^Ordering for pickup · /, '')}\n</div>`
    : ''

  // Category tabs
  const tabs = data.categories.map((cat, i) =>
    `      <span class="category-tab${i === 0 ? ' active' : ''}">${cat.name}</span>`
  ).join('\n')

  // Menu items grouped by category
  const menuItems = data.categories.map(cat => {
    const items = cat.items.map(item => {
      const desc = item.description ? `<p>${item.description}</p>` : ''
      return `    <div class="order-item"><div class="order-item-info"><h4>${item.name}</h4>${desc}</div><div class="order-item-action"><span class="price">${item.price}</span><button class="add-btn">+</button></div></div>`
    }).join('\n')
    return `    <h3 class="menu-section-title">${cat.name}</h3>\n${items}`
  }).join('\n\n')

  // Sidebar
  let sidebarHtml = ''
  if (data.sampleCart) {
    const cart = data.sampleCart
    const cartItems = cart.items.map(item =>
      `      <div class="sidebar-item"><span>${item.name} <span class="qty">× ${item.qty}</span></span><span>${item.price}</span></div>`
    ).join('\n')

    sidebarHtml = `  <div class="order-sidebar">
    <h3>Your Order</h3>
    <div class="sidebar-items">
${cartItems}
    </div>
    <div class="sidebar-subtotal"><span>Subtotal</span><span>${cart.subtotal}</span></div>
    <div class="sidebar-subtotal"><span>Tax</span><span>${cart.tax}</span></div>
    <div class="sidebar-total"><span>Total</span><span>${cart.total}</span></div>
    <button class="checkout-btn">Checkout · ${cart.total}</button>
    <div class="pickup-note">${data.pickupTime || 'Ready for pickup in 15–20 min'}</div>
  </div>`
  }

  return `${headerHtml}

${orderInfo}

<div class="order-layout">
  <div class="order-menu">
    <div class="category-tabs">
${tabs}
    </div>

${menuItems}
  </div>

${sidebarHtml}
</div>`
}
