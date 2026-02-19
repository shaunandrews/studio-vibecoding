import type { SiteTheme } from './types'

const downstreetCafeTheme: SiteTheme = {
  name: 'Downstreet Cafe',
  settings: {
    color: {
      palette: [
        { slug: 'primary', name: 'Slate', hex: '#4A5568' },
        { slug: 'primary-dark', name: 'Dark Slate', hex: '#2D3748' },
        { slug: 'secondary', name: 'Light Slate', hex: '#718096' },
        { slug: 'accent', name: 'Sage', hex: '#5B7B6A' },
        { slug: 'surface', name: 'Paper White', hex: '#FAFAF7' },
        { slug: 'card', name: 'Off White', hex: '#F5F5F0' },
        { slug: 'muted', name: 'Gray', hex: '#A0AEC0' },
      ],
      background: '#FAFAF7',
      text: '#2C2C2C',
      modes: {
        dark: {
          palette: [
            { slug: 'primary', name: 'Slate', hex: '#A0AEC0' },
            { slug: 'primary-dark', name: 'Dark Slate', hex: '#CBD5E0' },
            { slug: 'secondary', name: 'Light Slate', hex: '#718096' },
            { slug: 'accent', name: 'Sage', hex: '#7BA393' },
            { slug: 'surface', name: 'Dark Surface', hex: '#1A202C' },
            { slug: 'card', name: 'Dark Card', hex: '#2D3748' },
            { slug: 'muted', name: 'Gray', hex: '#4A5568' },
          ],
          background: '#171923',
          text: '#E2E8F0',
        },
      },
    },
    typography: {
      fontFamily: {
        heading: "'Playfair Display', Georgia, serif",
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
