import type { SiteTheme } from './types'

const fuegoCollectiveTheme: SiteTheme = {
  name: 'Fuego Collective',
  settings: {
    color: {
      palette: [
        { slug: 'primary', name: 'Hot Red', hex: '#E63226' },
        { slug: 'primary-dark', name: 'Deep Red', hex: '#B81D12' },
        { slug: 'secondary', name: 'Flame Orange', hex: '#FF6B35' },
        { slug: 'accent', name: 'Charcoal', hex: '#1A1A1A' },
        { slug: 'surface', name: 'Off White', hex: '#FAF7F2' },
        { slug: 'card', name: 'White', hex: '#FFFFFF' },
        { slug: 'muted', name: 'Smoke', hex: '#6B6B6B' },
      ],
      background: '#FAF7F2',
      text: '#1A1A1A',
      modes: {
        dark: {
          palette: [
            { slug: 'primary', name: 'Hot Red', hex: '#FF4136' },
            { slug: 'primary-dark', name: 'Deep Red', hex: '#E63226' },
            { slug: 'secondary', name: 'Flame Orange', hex: '#FF8C5A' },
            { slug: 'accent', name: 'Off White', hex: '#FAF7F2' },
            { slug: 'surface', name: 'Dark', hex: '#111111' },
            { slug: 'card', name: 'Dark Surface', hex: '#1A1A1A' },
            { slug: 'muted', name: 'Smoke', hex: '#999999' },
          ],
          background: '#0A0A0A',
          text: '#FAF7F2',
        },
      },
    },
    typography: {
      fontFamily: {
        heading: "'Impact', 'Haettenschweiler', 'Arial Narrow Bold', sans-serif",
        body: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      },
      fontSize: { small: '0.875rem', medium: '1rem', large: '1.25rem', xlarge: '2.5rem', hero: '4rem' },
      lineHeight: { tight: '1.1', normal: '1.6' },
    },
    spacing: { unit: '8px', scale: [1, 2, 3, 4, 5, 6, 8, 10] },
    layout: { contentWidth: '960px', wideWidth: '1100px' },
  },
}
export default fuegoCollectiveTheme
