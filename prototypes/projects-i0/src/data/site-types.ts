// Phase B: Simple Site Data Model
// These types replace the complex section system with a simple, flat structure

export interface Section {
  id: string
  html: string
  css: string
  role?: string  // 'header' | 'footer' | 'hero' | 'content' | 'gallery' | 'contact' | 'cta' | etc
}

export interface Page {
  slug: string      // "/" for homepage, "/about", etc
  title: string
  sections: string[]  // ordered section IDs
}

export interface Theme {
  name: string
  variables: Record<string, string>  // flat CSS custom properties
  fonts: string[]                     // Google Font names
}

export interface DesignSystem {
  colors: Record<string, any>
  typography: Record<string, any>
  spacing: Record<string, any>
  components: Record<string, any>
  variables: Record<string, string>  // the raw :root variables
}

export interface Site {
  name: string
  description: string
  theme: Theme
  sections: Record<string, Section>
  pages: Page[]
  designSystem?: DesignSystem
}