// Blog-specific section types for Shaun's Blog

export interface BlogFeaturedData {
  label: string
  title: string
  titlePage: string
  date: string
  excerpt: string
}

export interface BlogPostListData {
  heading: string
  posts: Array<{
    title: string
    page?: string
    date: string
    excerpt: string
  }>
}

export interface BlogPostData {
  backLabel: string
  backPage: string
  title: string
  author: string
  date: string
  readTime: string
  body: string
  tags?: string[]
}

export interface BlogArchiveData {
  heading: string
  months: Array<{
    label: string
    posts: Array<{
      title: string
      page?: string
      date: string
      excerpt: string
      tags: string[]
    }>
  }>
}

export interface BlogInfoListData {
  heading: string
  items: Array<{
    label: string
    value: string
  }>
}

export interface BlogProjectGridData {
  heading: string
  subtitle?: string
  projects: Array<{
    name: string
    url?: string
    description: string
    tech: string[]
    status: 'shipped' | 'in-progress' | 'archived'
    linkLabel: string
    linkUrl?: string
  }>
}

export type BlogSectionType =
  | 'blog-featured'
  | 'blog-post-list'
  | 'blog-post'
  | 'blog-archive'
  | 'blog-info-list'
  | 'blog-project-grid'
