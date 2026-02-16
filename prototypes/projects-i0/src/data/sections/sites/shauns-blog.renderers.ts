import type { Section } from '../types'
import type {
  BlogFeaturedData,
  BlogPostListData,
  BlogPostData,
  BlogArchiveData,
  BlogInfoListData,
  BlogProjectGridData,
} from './shauns-blog.types'

export function renderBlogSection(section: Section): string | null {
  switch (section.type as string) {
    case 'blog-featured': return renderBlogFeatured(section.data as unknown as BlogFeaturedData)
    case 'blog-post-list': return renderBlogPostList(section.data as unknown as BlogPostListData)
    case 'blog-post': return renderBlogPost(section.data as unknown as BlogPostData)
    case 'blog-archive': return renderBlogArchive(section.data as unknown as BlogArchiveData)
    case 'blog-info-list': return renderBlogInfoList(section.data as unknown as BlogInfoListData)
    case 'blog-project-grid': return renderBlogProjectGrid(section.data as unknown as BlogProjectGridData)
    default: return null
  }
}

function renderBlogFeatured(data: BlogFeaturedData): string {
  return `<article class="featured">
  <div class="label">${data.label}</div>
  <h2><a href="#" onclick="window.parent.postMessage({type:'navigate',page:'${data.titlePage}'},'*');return false">${data.title}</a></h2>
  <div class="date">${data.date}</div>
  <p class="excerpt">${data.excerpt}</p>
</article>`
}

function renderBlogPostList(data: BlogPostListData): string {
  const items = data.posts.map(post => {
    const href = post.page
      ? `href="#" onclick="window.parent.postMessage({type:'navigate',page:'${post.page}'},'*');return false"`
      : 'href="#"'
    return `  <div class="post-item">
    <a ${href}>${post.title}</a>
    <div class="meta">${post.date} · <span class="excerpt">${post.excerpt}</span></div>
  </div>`
  }).join('\n')
  return `<div class="posts">
  <h3>${data.heading}</h3>
${items}
</div>`
}

function renderBlogPost(data: BlogPostData): string {
  const tagsHtml = data.tags && data.tags.length > 0
    ? `\n\n    <div class="post-tags">
      <span class="label">Tags:</span>
${data.tags.map(t => `      <span class="tag">${t}</span>`).join('\n')}
    </div>`
    : ''

  return `<a href="#" class="back" onclick="window.parent.postMessage({type:'navigate',page:'${data.backPage}'},'*');return false">${data.backLabel}</a>

<article>
  <h2>${data.title}</h2>
  <div class="byline"><strong>${data.author}</strong> · ${data.date} · ${data.readTime}</div>

  ${data.body}${tagsHtml}
</article>`
}

function renderBlogArchive(data: BlogArchiveData): string {
  const groups = data.months.map(month => {
    const items = month.posts.map(post => {
      const href = post.page
        ? `href="#" onclick="window.parent.postMessage({type:'navigate',page:'${post.page}'},'*');return false"`
        : 'href="#"'
      const tags = post.tags.length > 0
        ? `\n    <div class="tags">${post.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>`
        : ''
      return `  <div class="archive-item">
    <a ${href}>${post.title}</a>
    <div class="meta">${post.date}</div>
    <div class="excerpt">${post.excerpt}</div>${tags}
  </div>`
    }).join('\n')
    return `<div class="month-group">
  <h3>${month.label}</h3>
${items}
</div>`
  }).join('\n\n')

  return `<h2>${data.heading}</h2>

${groups}`
}

function renderBlogInfoList(data: BlogInfoListData): string {
  const items = data.items.map(item =>
    `    <li><strong>${item.label}</strong> — ${item.value}</li>`
  ).join('\n')
  return `<div class="section">
  <h3>${data.heading}</h3>
  <ul>
${items}
  </ul>
</div>`
}

function renderBlogProjectGrid(data: BlogProjectGridData): string {
  const subtitle = data.subtitle
    ? `<p class="subtitle">${data.subtitle}</p>\n\n  `
    : ''

  const cards = data.projects.map(project => {
    const statusClass = project.status
    const statusLabel = project.status === 'in-progress' ? 'In Progress'
      : project.status === 'shipped' ? 'Shipped'
      : 'Archived'
    const tech = project.tech.map(t => `<span>${t}</span>`).join('')
    const link = project.linkUrl
      ? `<a href="${project.linkUrl}" class="link">${project.linkLabel}</a>`
      : `<a href="#" class="link">${project.linkLabel}</a>`
    const titleLink = project.url
      ? `<a href="${project.url}">${project.name}</a>`
      : `<a href="#">${project.name}</a>`
    return `    <div class="project-card">
      <h3>${titleLink}</h3>
      <div class="desc">${project.description}</div>
      <div class="tech">${tech}</div>
      <div class="bottom">
        <span class="status ${statusClass}">${statusLabel}</span>
        ${link}
      </div>
    </div>`
  }).join('\n\n')

  return `<h2>${data.heading}</h2>
  ${subtitle}<div class="projects-grid">
${cards}
  </div>`
}
