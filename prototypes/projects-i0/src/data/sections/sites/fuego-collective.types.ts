// Fuego Collective — site-specific section types
// E-commerce hot sauce brand patterns

export interface FuegoHeaderData {
  navItems: Array<{ label: string; page: string }>
}

export interface FuegoFooterData {
  navItems: Array<{ label: string; page: string }>
  socials: Array<{ label: string; url: string }>
  tagline: string
  email: string
  wpTagline?: string
}

export interface FuegoHeroData {
  heading: string          // HTML allowed (e.g. <br/>, <span>)
  description: string
  image: { src: string; alt: string }
  ctas: Array<{ label: string; page: string; variant: 'primary' | 'outline' }>
}

export interface FuegoProductLineupData {
  heading: string
  subtitle: string
  products: Array<{
    name: string
    image: { src: string; alt: string }
    heat: string            // e.g. "🌶️🌶️🌶️"
    price: string
  }>
}

export interface FuegoLifestyleData {
  heading: string
  paragraphs: string[]
  image: { src: string; alt: string }
  cta?: { label: string; page: string }
}

export interface FuegoTestimonialsData {
  heading: string
  testimonials: Array<{
    stars: number
    quote: string
    author: string
  }>
}

export interface FuegoNewsletterData {
  heading: string
  description: string
  placeholder: string
  buttonLabel: string
}

export interface FuegoPageHeaderData {
  heading: string
  subtitle?: string
}

export interface FuegoFiltersData {
  label: string
  options: string[]
}

export interface FuegoProductCardData {
  name: string
  image?: { src: string; alt: string }
  placeholder?: string      // gradient CSS for products without images
  heat: string
  size: string
  price: string
  linkPage?: string          // optional navigation on "Add to Cart"
}

export interface FuegoProductGridData {
  products: FuegoProductCardData[]
}

export interface FuegoBreadcrumbData {
  items: Array<{ label: string; page?: string }>
}

export interface FuegoProductDetailData {
  name: string
  image: { src: string; alt: string }
  heatBadge: string          // e.g. "🌶️🌶️🌶️🌶️ Hot"
  scoville: string
  price: string
  description: string[]      // paragraphs
  ingredients: string[]
  pairings: string[]
}

export interface FuegoRelatedProductsData {
  heading: string
  products: Array<{
    name: string
    image: { src: string; alt: string }
    price: string
  }>
}

export interface FuegoReviewsData {
  heading: string
  reviews: Array<{
    stars: number
    body: string
    author: string
  }>
}

// Union type for the custom renderer
export type FuegoSectionType =
  | 'fuego-header'
  | 'fuego-footer'
  | 'fuego-hero'
  | 'fuego-product-lineup'
  | 'fuego-lifestyle'
  | 'fuego-testimonials'
  | 'fuego-newsletter'
  | 'fuego-page-header'
  | 'fuego-filters'
  | 'fuego-product-grid'
  | 'fuego-breadcrumb'
  | 'fuego-product-detail'
  | 'fuego-related-products'
  | 'fuego-reviews'
