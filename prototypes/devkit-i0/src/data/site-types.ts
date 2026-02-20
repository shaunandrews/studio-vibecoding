export interface Section {
  id: string
  html: string
  css: string
  role?: string
}

export interface Page {
  slug: string
  title: string
  sections: string[]
}

export interface Theme {
  name: string
  variables: Record<string, string>
  darkVariables?: Record<string, string>
  fonts: string[]
}

export interface DesignSystem {
  colors: Record<string, any>
  typography: Record<string, any>
  spacing: Record<string, any>
  components: Record<string, any>
  variables: Record<string, string>
}

export interface Site {
  name: string
  description: string
  theme: Theme
  sections: Record<string, Section>
  pages: Page[]
  designSystem?: DesignSystem
}
