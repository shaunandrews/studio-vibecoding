import type { SiteTheme } from './types'

const uiPortfolioTheme: SiteTheme = {
  name: 'UI Portfolio',
  settings: {
    color: {
      palette: [
        { slug: 'primary', name: 'Teal', hex: '#0d9488' },
        { slug: 'primary-dark', name: 'Dark Teal', hex: '#0f766e' },
        { slug: 'text', name: 'Charcoal', hex: '#2d2d2d' },
        { slug: 'surface', name: 'White', hex: '#FFFFFF' },
        { slug: 'surface-alt', name: 'Light Gray', hex: '#f5f5f5' },
        { slug: 'muted', name: 'Gray', hex: '#666666' },
        { slug: 'muted-light', name: 'Light Gray Text', hex: '#999999' },
        { slug: 'border', name: 'Border', hex: '#eeeeee' },
      ],
      background: '#FFFFFF',
      text: '#2d2d2d',
    },
    typography: {
      fontFamily: {
        heading: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        body: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      },
      fontSize: {
        small: '0.85rem',
        medium: '1rem',
        large: '1.2rem',
        xlarge: '2.5rem',
        hero: '2.75rem',
      },
      lineHeight: {
        tight: '1.2',
        normal: '1.6',
      },
    },
    spacing: {
      unit: '8px',
      scale: [1, 2, 3, 4, 5, 6, 8, 10],
    },
    layout: {
      contentWidth: '800px',
      wideWidth: '1000px',
    },
  },
}

export default uiPortfolioTheme
