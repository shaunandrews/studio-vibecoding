/**
 * Theme Defaults & Validation
 * 
 * Provides default values and derives missing palette colors to ensure
 * the SiteTheme has all fields that component CSS expects.
 */

import type { SiteTheme } from './types'
import type { AIThemeOutput } from '../ai-pipeline-types'

/** Required palette slugs that component CSS expects */
const REQUIRED_PALETTE_SLUGS = [
  'primary',
  'primary-dark', 
  'secondary',
  'accent',
  'muted',
  'card',
  'surface'
] as const

/**
 * Darken a hex color by mixing with black
 */
function darkenHex(hex: string, percent: number = 20): string {
  // Remove # if present
  const clean = hex.replace('#', '')
  
  // Parse RGB
  const r = parseInt(clean.substr(0, 2), 16)
  const g = parseInt(clean.substr(2, 2), 16)
  const b = parseInt(clean.substr(4, 2), 16)
  
  // Darken by reducing each channel
  const factor = (100 - percent) / 100
  const newR = Math.round(r * factor)
  const newG = Math.round(g * factor)
  const newB = Math.round(b * factor)
  
  // Convert back to hex
  return '#' + [newR, newG, newB]
    .map(x => x.toString(16).padStart(2, '0'))
    .join('')
}

/**
 * Lighten a hex color by mixing with white
 */
function lightenHex(hex: string, percent: number = 10): string {
  // Remove # if present
  const clean = hex.replace('#', '')
  
  // Parse RGB
  const r = parseInt(clean.substr(0, 2), 16)
  const g = parseInt(clean.substr(2, 2), 16)
  const b = parseInt(clean.substr(4, 2), 16)
  
  // Lighten by adding to each channel
  const factor = percent / 100
  const newR = Math.round(r + (255 - r) * factor)
  const newG = Math.round(g + (255 - g) * factor)
  const newB = Math.round(b + (255 - b) * factor)
  
  // Convert back to hex
  return '#' + [newR, newG, newB]
    .map(x => Math.min(255, x).toString(16).padStart(2, '0'))
    .join('')
}

/**
 * Check if a color is light (for determining appropriate card/surface colors)
 */
function isLightColor(hex: string): boolean {
  const clean = hex.replace('#', '')
  const r = parseInt(clean.substr(0, 2), 16)
  const g = parseInt(clean.substr(2, 2), 16)
  const b = parseInt(clean.substr(4, 2), 16)
  
  // Calculate perceived brightness
  const brightness = (r * 299 + g * 587 + b * 114) / 1000
  return brightness > 128
}

/**
 * Apply theme defaults and derive missing palette colors
 */
export function applyThemeDefaults(parsed: AIThemeOutput): SiteTheme {
  const palette = [...parsed.color.palette]
  const paletteMap = new Map(palette.map(p => [p.slug, p]))
  
  // Derive missing palette colors
  const primary = paletteMap.get('primary')?.hex || '#3B82F6'
  const secondary = paletteMap.get('secondary')?.hex || '#8B5CF6'
  const background = parsed.color.background
  const isLight = isLightColor(background)
  
  // Add missing palette entries
  if (!paletteMap.has('primary-dark')) {
    palette.push({
      slug: 'primary-dark',
      name: 'Primary Dark',
      hex: darkenHex(primary, 20)
    })
  }
  
  if (!paletteMap.has('accent')) {
    // Use secondary if available, otherwise complementary to primary
    const accentHex = paletteMap.get('secondary')?.hex || secondary
    palette.push({
      slug: 'accent',
      name: 'Accent',
      hex: accentHex
    })
  }
  
  if (!paletteMap.has('muted')) {
    palette.push({
      slug: 'muted',
      name: 'Muted',
      hex: '#6B7280'
    })
  }
  
  if (!paletteMap.has('card')) {
    // For light backgrounds, use white or slightly off-white
    // For dark backgrounds, lighten the background slightly
    const cardHex = isLight ? '#FFFFFF' : lightenHex(background, 10)
    palette.push({
      slug: 'card',
      name: 'Card',
      hex: cardHex
    })
  }
  
  if (!paletteMap.has('surface')) {
    // Alternate section background - slightly different from main background
    const surfaceHex = isLight ? '#F8FAFC' : lightenHex(background, 5)
    palette.push({
      slug: 'surface',
      name: 'Surface',
      hex: surfaceHex
    })
  }
  
  return {
    name: 'Generated Theme',
    settings: {
      color: {
        palette,
        background: parsed.color.background,
        text: parsed.color.text,
      },
      typography: {
        fontFamily: parsed.typography.fontFamily,
        fontSize: parsed.typography.fontSize,
        lineHeight: parsed.typography.lineHeight || { tight: '1.2', normal: '1.6' },
      },
      spacing: parsed.spacing || { unit: '0.5rem', scale: [1, 2, 3, 4, 5, 6, 7, 8] },
      layout: parsed.layout || { contentWidth: '800px', wideWidth: '1200px' },
    },
  }
}