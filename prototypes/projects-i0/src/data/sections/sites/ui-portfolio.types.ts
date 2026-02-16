// Portfolio-specific section types for Alex Chen UI Portfolio site

import type { Section as BaseSection } from '../types'

// ---- Portfolio Section Types ----

export type PortfolioSectionType =
  | 'portfolio-intro'
  | 'project-grid'
  | 'project-grid-full'
  | 'about-brief'
  | 'case-study-hero'
  | 'case-study-image'
  | 'case-study-image-row'
  | 'case-study-meta'
  | 'case-study-section'
  | 'case-study-results'
  | 'case-study-timeline'
  | 'case-study-compare'
  | 'case-study-testimonial'
  | 'process-hero'
  | 'process-phases'
  | 'process-principles'
  | 'process-cta'
  | 'contact-avatar'
  | 'contact-philosophy'
  | 'contact-tools'
  | 'contact-experience'
  | 'contact-availability'
  | 'contact-form'
  | 'contact-social'
  | 'work-filters'

// ---- Data Interfaces ----

export interface PortfolioIntroData {
  greeting: string
  heading: string
  tagline: string
}

export interface ProjectCardData {
  title: string
  description: string
  thumbColor: string
  category?: string
  client?: string
  linkPage?: string
  overlayText?: string
}

export interface ProjectGridData {
  heading?: string
  projects: ProjectCardData[]
}

export interface ProjectGridFullData {
  heading: string
  subtitle: string
  projects: ProjectCardData[]
}

export interface AboutBriefData {
  heading: string
  text: string
}

export interface WorkFiltersData {
  filters: string[]
  activeFilter?: string
}

export interface CaseStudyHeroData {
  label: string
  title: string
  subtitle: string
}

export interface CaseStudyImageData {
  label: string
  gradient: string
  height?: string
}

export interface CaseStudyImageRowData {
  images: Array<{ label: string; gradient: string }>
}

export interface CaseStudyMetaData {
  items: Array<{ label: string; value: string }>
}

export interface CaseStudySectionData {
  heading: string
  content: string // HTML content
}

export interface CaseStudyResultsData {
  heading: string
  introText?: string
  columns?: number
  results: Array<{ number: string; description: string }>
}

export interface CaseStudyTimelineData {
  heading: string
  phases: Array<{ name: string; duration: string; color: string }>
}

export interface CaseStudyCompareData {
  heading: string
  before: { heading: string; html: string }
  after: { heading: string; html: string }
}

export interface CaseStudyTestimonialData {
  quote: string
  cite: string
}

export interface ProcessHeroData {
  label: string
  heading: string
  subtitle: string
}

export interface ProcessPhaseData {
  number: string
  title: string
  subtitle: string
  paragraphs: string[]
  meta: Array<{ label: string; tags: string[] }>
}

export interface ProcessPhasesData {
  phases: ProcessPhaseData[]
}

export interface ProcessPrinciplesData {
  heading: string
  principles: Array<{ icon: string; title: string; description: string }>
}

export interface ProcessCtaData {
  badge: string
  heading: string
  subtitle: string
  buttonText: string
  buttonPage: string
}

export interface ContactAvatarData {
  initials: string
  name: string
  title: string
}

export interface ContactPhilosophyData {
  quote: string
}

export interface ContactToolsData {
  heading: string
  tools: string[]
}

export interface ContactExperienceData {
  heading: string
  items: Array<{ role: string; company: string; period: string }>
}

export interface ContactAvailabilityData {
  heading: string
  badge: string
  text: string
}

export interface ContactFormData {
  heading: string
  fields: Array<{
    label: string
    type: 'text' | 'email' | 'textarea'
    placeholder: string
    halfWidth?: boolean
  }>
  submitText: string
}

export interface ContactSocialData {
  heading: string
  links: Array<{ name: string; color: string; url?: string }>
}

// ---- Section Union ----

export interface PortfolioSection {
  id: string
  type: PortfolioSectionType
  data: unknown
}

export interface PortfolioSectionDataMap {
  'portfolio-intro': PortfolioIntroData
  'project-grid': ProjectGridData
  'project-grid-full': ProjectGridFullData
  'about-brief': AboutBriefData
  'case-study-hero': CaseStudyHeroData
  'case-study-image': CaseStudyImageData
  'case-study-image-row': CaseStudyImageRowData
  'case-study-meta': CaseStudyMetaData
  'case-study-section': CaseStudySectionData
  'case-study-results': CaseStudyResultsData
  'case-study-timeline': CaseStudyTimelineData
  'case-study-compare': CaseStudyCompareData
  'case-study-testimonial': CaseStudyTestimonialData
  'process-hero': ProcessHeroData
  'process-phases': ProcessPhasesData
  'process-principles': ProcessPrinciplesData
  'process-cta': ProcessCtaData
  'contact-avatar': ContactAvatarData
  'contact-philosophy': ContactPhilosophyData
  'contact-tools': ContactToolsData
  'contact-experience': ContactExperienceData
  'contact-availability': ContactAvailabilityData
  'contact-form': ContactFormData
  'contact-social': ContactSocialData
  'work-filters': WorkFiltersData
}
