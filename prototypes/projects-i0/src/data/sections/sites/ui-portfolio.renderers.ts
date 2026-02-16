import type { Section } from '../types'
import type {
  PortfolioIntroData,
  ProjectGridData,
  ProjectGridFullData,
  AboutBriefData,
  WorkFiltersData,
  CaseStudyHeroData,
  CaseStudyImageData,
  CaseStudyImageRowData,
  CaseStudyMetaData,
  CaseStudySectionData,
  CaseStudyResultsData,
  CaseStudyTimelineData,
  CaseStudyCompareData,
  CaseStudyTestimonialData,
  ProcessHeroData,
  ProcessPhasesData,
  ProcessPrinciplesData,
  ProcessCtaData,
  ContactAvatarData,
  ContactPhilosophyData,
  ContactToolsData,
  ContactExperienceData,
  ContactAvailabilityData,
  ContactFormData,
  ContactSocialData,
} from './ui-portfolio.types'

export function renderPortfolioSection(section: Section): string | null {
  const s = section as { id: string; type: string; data: unknown }
  switch (s.type) {
    case 'portfolio-intro': return renderPortfolioIntro(s.data as PortfolioIntroData)
    case 'project-grid': return renderProjectGrid(s.data as ProjectGridData)
    case 'project-grid-full': return renderProjectGridFull(s.data as ProjectGridFullData)
    case 'about-brief': return renderAboutBrief(s.data as AboutBriefData)
    case 'work-filters': return renderWorkFilters(s.data as WorkFiltersData)
    case 'case-study-hero': return renderCaseStudyHero(s.data as CaseStudyHeroData)
    case 'case-study-image': return renderCaseStudyImage(s.data as CaseStudyImageData)
    case 'case-study-image-row': return renderCaseStudyImageRow(s.data as CaseStudyImageRowData)
    case 'case-study-meta': return renderCaseStudyMeta(s.data as CaseStudyMetaData)
    case 'case-study-section': return renderCaseStudySection(s.data as CaseStudySectionData)
    case 'case-study-results': return renderCaseStudyResults(s.data as CaseStudyResultsData)
    case 'case-study-timeline': return renderCaseStudyTimeline(s.data as CaseStudyTimelineData)
    case 'case-study-compare': return renderCaseStudyCompare(s.data as CaseStudyCompareData)
    case 'case-study-testimonial': return renderCaseStudyTestimonial(s.data as CaseStudyTestimonialData)
    case 'process-hero': return renderProcessHero(s.data as ProcessHeroData)
    case 'process-phases': return renderProcessPhases(s.data as ProcessPhasesData)
    case 'process-principles': return renderProcessPrinciples(s.data as ProcessPrinciplesData)
    case 'process-cta': return renderProcessCta(s.data as ProcessCtaData)
    case 'contact-avatar': return renderContactAvatar(s.data as ContactAvatarData)
    case 'contact-philosophy': return renderContactPhilosophy(s.data as ContactPhilosophyData)
    case 'contact-tools': return renderContactTools(s.data as ContactToolsData)
    case 'contact-experience': return renderContactExperience(s.data as ContactExperienceData)
    case 'contact-availability': return renderContactAvailability(s.data as ContactAvailabilityData)
    case 'contact-form': return renderContactForm(s.data as ContactFormData)
    case 'contact-social': return renderContactSocial(s.data as ContactSocialData)
    default: return null
  }
}

function renderPortfolioIntro(data: PortfolioIntroData): string {
  return `<section class="p-intro">
  <div class="p-intro__greeting">${data.greeting}</div>
  <h1>${data.heading}</h1>
  <p>${data.tagline}</p>
</section>`
}

function renderProjectGrid(data: ProjectGridData): string {
  const heading = data.heading ? `  <h2>${data.heading}</h2>\n` : ''
  const cards = data.projects.map(p => {
    const linkOpen = p.linkPage
      ? `<a class="p-card-link" href="#" onclick="window.parent.postMessage({type:'navigate',page:'${p.linkPage}'},'*');return false">`
      : ''
    const linkClose = p.linkPage ? '</a>' : ''
    return `    ${linkOpen}<div class="p-card">
      <div class="p-card__thumb" style="background: ${p.thumbColor};"></div>
      <div class="p-card__body">
        <h3>${p.title}</h3>
        <p>${p.description}</p>
      </div>
    </div>${linkClose}`
  }).join('\n')
  return `<section class="p-work">
${heading}  <div class="p-card-grid">
${cards}
  </div>
</section>`
}

function renderProjectGridFull(data: ProjectGridFullData): string {
  const cards = data.projects.map(p => {
    const linkOpen = p.linkPage
      ? `<a class="p-project-card" href="#" onclick="window.parent.postMessage({type:'navigate',page:'${p.linkPage}'},'*');return false">`
      : '<a class="p-project-card" href="#">'
    const overlayText = p.overlayText || 'View Project'
    return `    ${linkOpen}
      <div class="p-project-thumb" style="background: ${p.thumbColor};">
        <div class="p-project-overlay"><span>${overlayText}</span></div>
      </div>
      <div class="p-project-info">
        <h3>${p.title}</h3>
        ${p.client ? `<div class="p-project-client">${p.client}</div>` : ''}
        ${p.category ? `<span class="p-project-category">${p.category}</span>` : ''}
      </div>
    </a>`
  }).join('\n')
  return `<section class="p-hero">
  <h1>${data.heading}</h1>
  <p>${data.subtitle}</p>
</section>

<div class="p-project-grid">
${cards}
</div>`
}

function renderAboutBrief(data: AboutBriefData): string {
  return `<section class="p-about">
  <h2>${data.heading}</h2>
  <p>${data.text}</p>
</section>`
}

function renderWorkFilters(data: WorkFiltersData): string {
  const buttons = data.filters.map(f => {
    const active = f === data.activeFilter ? ' active' : ''
    return `  <button class="p-filter-btn${active}">${f}</button>`
  }).join('\n')
  return `<div class="p-filters">
${buttons}
</div>`
}

function renderCaseStudyHero(data: CaseStudyHeroData): string {
  return `<section class="p-cs-hero">
  <div class="p-cs-label">${data.label}</div>
  <h1>${data.title}</h1>
  <p>${data.subtitle}</p>
</section>`
}

function renderCaseStudyImage(data: CaseStudyImageData): string {
  const height = data.height || '240px'
  return `<div class="p-cs-image-block">
  <div style="height:${height};border-radius:12px;background:${data.gradient};display:flex;align-items:center;justify-content:center;color:#fff;font-size:var(--theme-font-size-medium);font-weight:500;letter-spacing:0.05em;">${data.label}</div>
</div>`
}

function renderCaseStudyImageRow(data: CaseStudyImageRowData): string {
  const images = data.images.map(img =>
    `  <div style="background:${img.gradient};">${img.label}</div>`
  ).join('\n')
  return `<div class="p-cs-image-row">
${images}
</div>`
}

function renderCaseStudyMeta(data: CaseStudyMetaData): string {
  const items = data.items.map(item =>
    `  <div class="p-cs-meta-item">
    <div class="p-cs-meta-label">${item.label}</div>
    <div class="p-cs-meta-value">${item.value}</div>
  </div>`
  ).join('\n')
  return `<div class="p-cs-meta" style="grid-template-columns:repeat(${data.items.length},1fr);">
${items}
</div>`
}

function renderCaseStudySection(data: CaseStudySectionData): string {
  return `<section class="p-cs-section">
  <h2>${data.heading}</h2>
  ${data.content}
</section>`
}

function renderCaseStudyResults(data: CaseStudyResultsData): string {
  const intro = data.introText ? `  <p>${data.introText}</p>\n` : ''
  const cols = data.columns || 2
  const cards = data.results.map(r =>
    `    <div class="p-result-card">
      <div class="p-result-number">${r.number}</div>
      <div class="p-result-desc">${r.description}</div>
    </div>`
  ).join('\n')
  return `<section class="p-cs-section">
  <h2>${data.heading}</h2>
${intro}  <div class="p-results-grid" style="grid-template-columns:repeat(${cols},1fr);">
${cards}
  </div>
</section>`
}

function renderCaseStudyTimeline(data: CaseStudyTimelineData): string {
  const phases = data.phases.map(p =>
    `    <div class="p-timeline-phase">
      <div class="p-timeline-bar" style="background:${p.color};"></div>
      <div class="p-timeline-name">${p.name}</div>
      <div class="p-timeline-duration">${p.duration}</div>
    </div>`
  ).join('\n')
  return `<div class="p-cs-timeline">
  <h2>${data.heading}</h2>
  <div class="p-timeline-track">
${phases}
  </div>
</div>`
}

function renderCaseStudyCompare(data: CaseStudyCompareData): string {
  return `<div class="p-cs-compare">
  <h2>${data.heading}</h2>
  <div class="p-compare-grid">
    <div class="p-compare-col p-compare-before">
      <h3>${data.before.heading}</h3>
      <div class="p-compare-block p-compare-block--before">
        ${data.before.html}
      </div>
    </div>
    <div class="p-compare-col p-compare-after">
      <h3>${data.after.heading}</h3>
      <div class="p-compare-block p-compare-block--after">
        ${data.after.html}
      </div>
    </div>
  </div>
</div>`
}

function renderCaseStudyTestimonial(data: CaseStudyTestimonialData): string {
  return `<div class="p-cs-testimonial">
  <blockquote>${data.quote}</blockquote>
  <cite>${data.cite}</cite>
</div>`
}

function renderProcessHero(data: ProcessHeroData): string {
  return `<section class="p-cs-hero">
  <div class="p-cs-label">${data.label}</div>
  <h1>${data.heading}</h1>
  <p>${data.subtitle}</p>
</section>`
}

function renderProcessPhases(data: ProcessPhasesData): string {
  const phases = data.phases.map(phase => {
    const paragraphs = phase.paragraphs.map(p => `      <p>${p}</p>`).join('\n')
    const metaGroups = phase.meta.map(m => {
      const tags = m.tags.map(t => `            <span class="p-phase-tag">${t}</span>`).join('\n')
      return `        <div class="p-phase-meta-group">
          <h4>${m.label}</h4>
          <div class="p-phase-tags">
${tags}
          </div>
        </div>`
    }).join('\n')
    return `  <div class="p-phase">
    <div class="p-phase-number">${phase.number}</div>
    <div class="p-phase-content">
      <h2>${phase.title}</h2>
      <div class="p-phase-subtitle">${phase.subtitle}</div>
${paragraphs}
      <div class="p-phase-meta">
${metaGroups}
      </div>
    </div>
  </div>`
  }).join('\n\n')
  return `<div class="p-phase-list">
${phases}
</div>`
}

function renderProcessPrinciples(data: ProcessPrinciplesData): string {
  const cards = data.principles.map(p =>
    `    <div class="p-principle">
      <div class="p-principle-icon">${p.icon}</div>
      <h3>${p.title}</h3>
      <p>${p.description}</p>
    </div>`
  ).join('\n')
  return `<div class="p-philosophy">
  <h2>${data.heading}</h2>
  <div class="p-principles-grid">
${cards}
  </div>
</div>`
}

function renderProcessCta(data: ProcessCtaData): string {
  return `<div class="p-cta-section">
  <div class="p-cta-card">
    <div class="p-cta-badge">${data.badge}</div>
    <h2>${data.heading}</h2>
    <p>${data.subtitle}</p>
    <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'${data.buttonPage}'},'*');return false" class="p-cta-btn">${data.buttonText}</a>
  </div>
</div>`
}

function renderContactAvatar(data: ContactAvatarData): string {
  return `<div class="p-avatar-block">
  <div class="p-avatar">${data.initials}</div>
  <div class="p-avatar-info">
    <h2>${data.name}</h2>
    <p>${data.title}</p>
  </div>
</div>`
}

function renderContactPhilosophy(data: ContactPhilosophyData): string {
  return `<div class="p-philosophy-quote">
  <blockquote>${data.quote}</blockquote>
</div>`
}

function renderContactTools(data: ContactToolsData): string {
  const tools = data.tools.map(t => `    <div class="p-tool-tag">${t}</div>`).join('\n')
  return `<section class="p-cs-section">
  <h2>${data.heading}</h2>
  <div class="p-tools-grid">
${tools}
  </div>
</section>`
}

function renderContactExperience(data: ContactExperienceData): string {
  const items = data.items.map(item =>
    `  <div class="p-exp-item">
    <div class="p-exp-role">${item.role}</div>
    <div class="p-exp-company">${item.company}</div>
    <div class="p-exp-period">${item.period}</div>
  </div>`
  ).join('\n')
  return `<section class="p-experience">
  <h2>${data.heading}</h2>
${items}
</section>`
}

function renderContactAvailability(data: ContactAvailabilityData): string {
  return `<section class="p-availability">
  <h2>${data.heading}</h2>
  <div class="p-avail-badge">${data.badge}</div>
  <p>${data.text}</p>
</section>`
}

function renderContactForm(data: ContactFormData): string {
  const fields = data.fields.map(f => {
    if (f.type === 'textarea') {
      return `    <div class="p-form-group">
      <label>${f.label}</label>
      <textarea placeholder="${f.placeholder}"></textarea>
    </div>`
    }
    return `    <div class="p-form-group${f.halfWidth ? ' p-form-half' : ''}">
      <label>${f.label}</label>
      <input type="${f.type}" placeholder="${f.placeholder}">
    </div>`
  })

  // Group half-width fields into rows
  const rows: string[] = []
  let i = 0
  while (i < fields.length) {
    const field = data.fields[i]
    if (field.halfWidth && i + 1 < fields.length && data.fields[i + 1].halfWidth) {
      rows.push(`  <div class="p-form-row">\n${fields[i]}\n${fields[i + 1]}\n  </div>`)
      i += 2
    } else {
      rows.push(fields[i])
      i++
    }
  }

  return `<section class="p-contact-form">
  <h2>${data.heading}</h2>
  <form onsubmit="return false">
${rows.join('\n')}
    <button type="submit" class="p-submit-btn">${data.submitText}</button>
  </form>
</section>`
}

function renderContactSocial(data: ContactSocialData): string {
  const links = data.links.map(l =>
    `    <a href="#" class="p-social-card"><span class="p-social-dot" style="background:${l.color};"></span> ${l.name}</a>`
  ).join('\n')
  return `<section class="p-social-links">
  <h2>${data.heading}</h2>
  <div class="p-social-grid">
${links}
  </div>
</section>`
}
