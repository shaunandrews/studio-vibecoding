import type { SiteTheme } from '../themes/types'

// ---- Section Types ----

export type SectionType =
  | 'hero-split'
  | 'hero-fullwidth'
  | 'hero-simple'
  | 'image-strip'
  | 'image-gallery'
  | 'menu-list'
  | 'content-prose'
  | 'content-cards'
  | 'team-grid'
  | 'event-list'
  | 'event-recurring'
  | 'contact-info'
  | 'cta-banner'
  | 'order-menu'

export interface SectionDataMap {
  'hero-split': HeroSplitData
  'hero-fullwidth': HeroFullwidthData
  'hero-simple': HeroSimpleData
  'image-strip': ImageStripData
  'image-gallery': ImageGalleryData
  'menu-list': MenuListData
  'content-prose': ContentProseData
  'content-cards': ContentCardsData
  'team-grid': TeamGridData
  'event-list': EventListData
  'event-recurring': EventRecurringData
  'contact-info': ContactInfoData
  'cta-banner': CtaBannerData
  'order-menu': OrderMenuData
}

export interface Section {
  id: string
  type: string
  data: Record<string, any>
}

// ---- Section Data Interfaces ----

export interface HeroSplitData {
  heading: string
  tagline: string
  image: { src: string; alt: string }
  hours?: string[]
}

export interface HeroFullwidthData {
  image: { src: string; alt: string }
  height?: string
}

export interface HeroSimpleData {
  heading: string
  subtitle?: string
}

export interface ImageStripData {
  images: Array<{
    src: string
    alt: string
    caption?: string
  }>
}

export interface ImageGalleryData {
  heading?: string
  subtitle?: string
  images: Array<{
    src: string
    alt: string
    caption?: string
    size?: 'normal' | 'wide' | 'tall' | 'featured'
  }>
}

export interface MenuListData {
  heading?: string
  subtitle?: string
  note?: string
  variant: 'columns' | 'cards'
  categories: Array<{
    name: string
    items: Array<{
      name: string
      price: string
      description?: string
    }>
  }>
}

export interface ContentProseData {
  heading?: string
  body: string
  maxWidth?: string
  background?: boolean
}

export interface ContentCardsData {
  heading?: string
  cards: Array<{
    title: string
    body: string
    image?: string
  }>
}

export interface TeamGridData {
  heading?: string
  members: Array<{
    name: string
    role: string
    bio: string
    avatar?: string
    initials?: string
  }>
}

export interface EventListData {
  heading?: string
  subtitle?: string
  events: Array<{
    date: { month: string; day: string; dow: string }
    tag?: string
    title: string
    meta: string
    description: string
  }>
}

export interface EventRecurringData {
  heading?: string
  events: Array<{
    name: string
    description: string
  }>
}

export interface ContactInfoData {
  heading?: string
  address?: string
  phone?: string
  email?: string
  hours?: Array<{ label: string; value: string }>
  mapEmbed?: string
}

export interface CtaBannerData {
  heading?: string
  text: string
  linkText?: string
  linkPage?: string
  linkUrl?: string
}

export interface OrderMenuData {
  heading?: string
  subtitle?: string
  pickupInfo?: string
  pickupTime?: string
  categories: Array<{
    name: string
    items: Array<{
      name: string
      description?: string
      price: string
    }>
  }>
  sampleCart?: {
    items: Array<{ name: string; qty: number; price: string }>
    subtotal: string
    tax: string
    total: string
  }
}

// ---- Page Template ----

export interface PageTemplate {
  id: string
  title: string
  slug: string
  sections: Section[]
}

// ---- Site Data ----

export interface FontImport {
  url: string
}

export interface SiteData {
  name: string
  theme: SiteTheme
  fonts: FontImport[]
  pages: PageTemplate[]
}
