import type { ThemeUpdateCardData } from '../types'

type Changes = ThemeUpdateCardData['changes']

/**
 * Converts structured theme changes (from AI card:themeUpdate) into flat CSS
 * custom property overrides suitable for merging onto `Site.theme.variables`.
 *
 * Only returns entries that are actually present in the changes object —
 * caller is responsible for merging onto current vars.
 */
export function settingsToVariables(changes: Changes): Record<string, string> {
  const vars: Record<string, string> = {}

  if (changes.color) {
    const { palette, background, text } = changes.color

    if (palette) {
      for (const entry of palette) {
        vars[`--color-${entry.slug}`] = entry.hex
      }
    }

    if (background !== undefined) {
      vars['--color-background'] = background
    }

    if (text !== undefined) {
      vars['--color-text'] = text
    }
  }

  if (changes.typography) {
    const { fontFamily } = changes.typography

    if (fontFamily) {
      if (fontFamily.heading !== undefined) {
        vars['--font-heading'] = fontFamily.heading
      }

      if (fontFamily.body !== undefined) {
        vars['--font-body'] = fontFamily.body
      }
    }
  }

  return vars
}
