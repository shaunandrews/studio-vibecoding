import type { SiteTheme } from './types'

const flavorRecordsTheme: SiteTheme = {
  name: 'Flavor Records',
  settings: {
    color: {
      defaultMode: 'dark',
      palette: [
        { slug: 'primary', name: 'Violet', hex: '#8B5CF6' },
        { slug: 'secondary', name: 'Blue', hex: '#3B82F6' },
        { slug: 'accent', name: 'Cyan', hex: '#06B6D4' },
        { slug: 'surface', name: 'Dark', hex: '#1A1A1A' },
        { slug: 'surface-alt', name: 'Darker', hex: '#2a2a2a' },
        { slug: 'text', name: 'Warm White', hex: '#F5F0EB' },
        { slug: 'muted', name: 'Gray', hex: '#999999' },
        { slug: 'muted-dark', name: 'Dark Gray', hex: '#666666' },
        { slug: 'muted-darker', name: 'Darker Gray', hex: '#555555' },
        { slug: 'danger', name: 'Red', hex: '#EF4444' },
      ],
      background: '#1A1A1A',
      text: '#F5F0EB',
      modes: {
        light: {
          palette: [
            { slug: 'primary', name: 'Violet', hex: '#7C3AED' },
            { slug: 'secondary', name: 'Blue', hex: '#2563EB' },
            { slug: 'accent', name: 'Cyan', hex: '#0891B2' },
            { slug: 'surface', name: 'Light', hex: '#FAF9F7' },
            { slug: 'surface-alt', name: 'Off White', hex: '#F0EEEB' },
            { slug: 'text', name: 'Dark', hex: '#1A1A1A' },
            { slug: 'muted', name: 'Gray', hex: '#777777' },
            { slug: 'muted-dark', name: 'Medium Gray', hex: '#999999' },
            { slug: 'muted-darker', name: 'Light Gray', hex: '#aaaaaa' },
            { slug: 'danger', name: 'Red', hex: '#DC2626' },
          ],
          background: '#FAF9F7',
          text: '#1A1A1A',
        },
      },
    },
    typography: {
      fontFamily: {
        heading: "system-ui, sans-serif",
        body: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      },
      fontSize: {
        small: '0.8rem',
        medium: '1rem',
        large: '1.1rem',
        xlarge: '3rem',
        hero: '3.5rem',
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
      contentWidth: '900px',
      wideWidth: '1100px',
    },
  },
}

export default flavorRecordsTheme
