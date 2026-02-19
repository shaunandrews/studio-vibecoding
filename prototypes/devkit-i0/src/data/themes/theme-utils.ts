import type { SiteTheme, ColorSettings } from './types'

export function themeHasDarkMode(theme: SiteTheme): boolean {
  const defaultMode = theme.settings.color.defaultMode ?? 'light'
  if (defaultMode === 'light') {
    return !!theme.settings.color.modes?.dark
  }
  // Already dark by default
  return true
}

function getColorSettings(theme: SiteTheme, mode: 'light' | 'dark'): ColorSettings {
  const defaultMode = theme.settings.color.defaultMode ?? 'light'

  if (mode === defaultMode) {
    return theme.settings.color
  }

  // Requesting a different mode — check if an alternative exists
  const alt = theme.settings.color.modes?.[mode]
  if (alt) {
    return alt
  }

  // Fallback to default colors
  return theme.settings.color
}

export function themeToCSS(theme: SiteTheme, mode: 'light' | 'dark' = 'light'): string {
  const colors = getColorSettings(theme, mode)
  const { typography, spacing, layout } = theme.settings
  const vars: string[] = []

  // Colors
  vars.push(`--theme-bg: ${colors.background}`)
  vars.push(`--theme-text: ${colors.text}`)
  for (const entry of colors.palette) {
    vars.push(`--theme-color-${entry.slug}: ${entry.hex}`)
  }

  // Typography
  vars.push(`--theme-font-heading: ${typography.fontFamily.heading}`)
  vars.push(`--theme-font-body: ${typography.fontFamily.body}`)
  for (const [key, value] of Object.entries(typography.fontSize)) {
    vars.push(`--theme-font-size-${key}: ${value}`)
  }
  for (const [key, value] of Object.entries(typography.lineHeight)) {
    vars.push(`--theme-line-height-${key}: ${value}`)
  }

  // Spacing
  for (const multiplier of spacing.scale) {
    vars.push(`--theme-space-${multiplier}: calc(${spacing.unit} * ${multiplier})`)
  }

  // Layout
  vars.push(`--theme-content-width: ${layout.contentWidth}`)
  vars.push(`--theme-wide-width: ${layout.wideWidth}`)

  return `:root {\n  ${vars.join(';\n  ')};\n}`
}
