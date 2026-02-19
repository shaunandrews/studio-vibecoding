import type { SiteTheme } from './types'

const theme: SiteTheme = {
  name: 'Mise en Place',
  settings: {
    color: {
      defaultMode: 'light',
      palette: [
        { slug: 'primary', name: 'Tomato', hex: '#E85D3A' },
        { slug: 'primary-dark', name: 'Tomato Dark', hex: '#C94A2A' },
        { slug: 'secondary', name: 'Herb Green', hex: '#5B8A3C' },
        { slug: 'accent', name: 'Saffron', hex: '#E5A833' },
        { slug: 'surface', name: 'Surface', hex: '#FFFFFF' },
        { slug: 'card', name: 'Card', hex: '#FFFFFF' },
        { slug: 'muted', name: 'Muted', hex: '#8A8078' },
        { slug: 'border', name: 'Border', hex: '#E5E0DA' },
      ],
      background: '#FAFAF7',
      text: '#2D2A26',
      modes: {
        dark: {
          palette: [
            { slug: 'primary', name: 'Tomato', hex: '#F07050' },
            { slug: 'primary-dark', name: 'Tomato Dark', hex: '#E85D3A' },
            { slug: 'secondary', name: 'Herb Green', hex: '#7DB356' },
            { slug: 'accent', name: 'Saffron', hex: '#F0BC4A' },
            { slug: 'surface', name: 'Surface', hex: '#2A2520' },
            { slug: 'card', name: 'Card', hex: '#352F28' },
            { slug: 'muted', name: 'Muted', hex: '#9A9088' },
            { slug: 'border', name: 'Border', hex: '#4A4238' },
          ],
          background: '#1E1B18',
          text: '#F0EDE8',
        },
      },
    },
    typography: {
      fontFamily: {
        heading: "'Nunito', 'Segoe UI', sans-serif",
        body: "'Inter', 'Segoe UI', system-ui, sans-serif",
      },
      fontSize: {
        small: '0.8125rem',
        medium: '1rem',
        large: '1.25rem',
        xlarge: '1.75rem',
        hero: '2.5rem',
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
      contentWidth: '1200px',
      wideWidth: '1400px',
    },
  },
}

export default theme
