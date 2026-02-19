import type { SiteTheme } from './types'

const ledgerTheme: SiteTheme = {
  name: 'Ledger',
  settings: {
    color: {
      defaultMode: 'light',
      palette: [
        { slug: 'primary', name: 'Primary', hex: '#2563EB' },
        { slug: 'primary-dark', name: 'Primary Dark', hex: '#1D4ED8' },
        { slug: 'secondary', name: 'Secondary', hex: '#64748B' },
        { slug: 'surface', name: 'Surface', hex: '#FFFFFF' },
        { slug: 'border', name: 'Border', hex: '#E5E7EB' },
        { slug: 'success', name: 'Success', hex: '#16A34A' },
        { slug: 'success-light', name: 'Success Light', hex: '#F0FDF4' },
        { slug: 'warning', name: 'Warning', hex: '#D97706' },
        { slug: 'warning-light', name: 'Warning Light', hex: '#FFFBEB' },
        { slug: 'danger', name: 'Danger', hex: '#DC2626' },
        { slug: 'danger-light', name: 'Danger Light', hex: '#FEF2F2' },
        { slug: 'muted', name: 'Muted', hex: '#9CA3AF' },
        { slug: 'card', name: 'Card', hex: '#FFFFFF' },
        { slug: 'accent', name: 'Accent', hex: '#1E293B' },
      ],
      background: '#F8F9FA',
      text: '#111827',
      modes: {
        dark: {
          palette: [
            { slug: 'primary', name: 'Primary', hex: '#3B82F6' },
            { slug: 'primary-dark', name: 'Primary Dark', hex: '#2563EB' },
            { slug: 'secondary', name: 'Secondary', hex: '#94A3B8' },
            { slug: 'surface', name: 'Surface', hex: '#1E293B' },
            { slug: 'border', name: 'Border', hex: '#334155' },
            { slug: 'success', name: 'Success', hex: '#22C55E' },
            { slug: 'success-light', name: 'Success Light', hex: '#14532D' },
            { slug: 'warning', name: 'Warning', hex: '#F59E0B' },
            { slug: 'warning-light', name: 'Warning Light', hex: '#451A03' },
            { slug: 'danger', name: 'Danger', hex: '#EF4444' },
            { slug: 'danger-light', name: 'Danger Light', hex: '#450A0A' },
            { slug: 'muted', name: 'Muted', hex: '#6B7280' },
            { slug: 'card', name: 'Card', hex: '#1E293B' },
            { slug: 'accent', name: 'Accent', hex: '#0F172A' },
          ],
          background: '#0F172A',
          text: '#F1F5F9',
        },
      },
    },
    typography: {
      fontFamily: {
        heading: '-apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", Roboto, sans-serif',
        body: '-apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", Roboto, sans-serif',
      },
      fontSize: {
        small: '0.8125rem',
        medium: '0.9375rem',
        large: '1.125rem',
        xlarge: '1.5rem',
        hero: '2rem',
      },
      lineHeight: {
        tight: '1.25',
        normal: '1.5',
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

export default ledgerTheme
