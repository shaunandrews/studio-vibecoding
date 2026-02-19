import type { SiteTheme } from './types'

const shaunsBlogTheme: SiteTheme = {
  name: "Shaun's Blog",
  settings: {
    color: {
      palette: [
        { slug: 'primary', name: 'Blue', hex: '#3858E9' },
        { slug: 'text', name: 'Dark Navy', hex: '#1a1a2e' },
        { slug: 'surface', name: 'White', hex: '#FFFFFF' },
        { slug: 'muted', name: 'Gray', hex: '#888888' },
        { slug: 'muted-light', name: 'Light Gray', hex: '#aaaaaa' },
        { slug: 'body-text', name: 'Dark Gray', hex: '#333333' },
        { slug: 'border', name: 'Border', hex: '#e5e5e5' },
        { slug: 'border-light', name: 'Light Border', hex: '#f0f0f0' },
      ],
      background: '#FFFFFF',
      text: '#1a1a2e',
      modes: {
        dark: {
          palette: [
            { slug: 'primary', name: 'Blue', hex: '#5B78FF' },
            { slug: 'text', name: 'Light', hex: '#E5E5E5' },
            { slug: 'surface', name: 'Dark', hex: '#1a1a2e' },
            { slug: 'muted', name: 'Gray', hex: '#888888' },
            { slug: 'muted-light', name: 'Dim Gray', hex: '#666666' },
            { slug: 'body-text', name: 'Light Gray', hex: '#cccccc' },
            { slug: 'border', name: 'Border', hex: '#333333' },
            { slug: 'border-light', name: 'Light Border', hex: '#2a2a2a' },
          ],
          background: '#111122',
          text: '#E5E5E5',
        },
      },
    },
    typography: {
      fontFamily: {
        heading: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        body: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      },
      fontSize: {
        small: '0.8rem',
        medium: '1rem',
        large: '1.1rem',
        xlarge: '2rem',
        hero: '2.2rem',
      },
      lineHeight: {
        tight: '1.3',
        normal: '1.7',
      },
    },
    spacing: {
      unit: '8px',
      scale: [1, 2, 3, 4, 5, 6, 8],
    },
    layout: {
      contentWidth: '720px',
      wideWidth: '900px',
    },
  },
}

export default shaunsBlogTheme
