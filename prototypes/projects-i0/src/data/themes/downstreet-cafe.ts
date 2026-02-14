import type { SiteTheme } from './types'

const downstreetCafeTheme: SiteTheme = {
  name: 'Downstreet Cafe',
  settings: {
    color: {
      palette: [
        { slug: 'primary', name: 'Terracotta', hex: '#C2703E' },
        { slug: 'primary-dark', name: 'Deep Terracotta', hex: '#A8572E' },
        { slug: 'secondary', name: 'Sage', hex: '#A8B5A0' },
        { slug: 'accent', name: 'Espresso', hex: '#3B2314' },
        { slug: 'surface', name: 'Cream', hex: '#FFF8F0' },
        { slug: 'card', name: 'White', hex: '#FFFFFF' },
        { slug: 'muted', name: 'Warm Gray', hex: '#7a6555' },
      ],
      background: '#FFF8F0',
      text: '#3B2314',
      modes: {
        dark: {
          palette: [
            { slug: 'primary', name: 'Terracotta', hex: '#D4884E' },
            { slug: 'primary-dark', name: 'Deep Terracotta', hex: '#C2703E' },
            { slug: 'secondary', name: 'Sage', hex: '#A8B5A0' },
            { slug: 'accent', name: 'Cream', hex: '#FFF8F0' },
            { slug: 'surface', name: 'Dark Brown', hex: '#2A1A0E' },
            { slug: 'card', name: 'Dark Surface', hex: '#3B2314' },
            { slug: 'muted', name: 'Warm Gray', hex: '#9a8575' },
          ],
          background: '#1E1208',
          text: '#FFF8F0',
        },
      },
    },
    typography: {
      fontFamily: {
        heading: "Georgia, 'Times New Roman', serif",
        body: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      },
      fontSize: {
        small: '0.875rem',
        medium: '1rem',
        large: '1.25rem',
        xlarge: '2rem',
        hero: '3rem',
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
      contentWidth: '960px',
      wideWidth: '1100px',
    },
  },
}

export default downstreetCafeTheme
