import { reactive } from 'vue'
import type { SiteTheme } from './types'
import { themeHasDarkMode as _themeHasDarkMode } from './theme-utils'
import downstreetCafeTheme from './downstreet-cafe'
import shaunsBlogTheme from './shauns-blog'
import uiPortfolioTheme from './ui-portfolio'
import flavorRecordsTheme from './flavor-records'
import miseEnPlaceTheme from './mise-en-place'
import ledgerTheme from './ledger'
import fuegoCollectiveTheme from './fuego-collective'

const state = reactive<{ themes: Record<string, SiteTheme> }>({
  themes: {
    'downstreet-cafe': downstreetCafeTheme,
    'shauns-blog': shaunsBlogTheme,
    'ui-portfolio': uiPortfolioTheme,
    'flavor-records': flavorRecordsTheme,
    'mise-en-place': miseEnPlaceTheme,
    'ledger': ledgerTheme,
    'fuego-collective': fuegoCollectiveTheme,
  },
})

export function useSiteThemes() {
  function getTheme(id: string): SiteTheme | undefined {
    return state.themes[id]
  }

  function updateTheme(id: string, patch: Partial<SiteTheme['settings']>) {
    const theme = state.themes[id]
    if (!theme) return

    if (patch.color) {
      Object.assign(theme.settings.color, patch.color)
    }
    if (patch.typography) {
      Object.assign(theme.settings.typography, patch.typography)
    }
    if (patch.spacing) {
      Object.assign(theme.settings.spacing, patch.spacing)
    }
    if (patch.layout) {
      Object.assign(theme.settings.layout, patch.layout)
    }
  }

  function themeHasDarkMode(id: string): boolean {
    const theme = state.themes[id]
    if (!theme) return false
    return _themeHasDarkMode(theme)
  }

  return {
    themes: state.themes,
    getTheme,
    updateTheme,
    themeHasDarkMode,
  }
}
