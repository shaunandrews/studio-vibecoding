import { siteData as downstreetCafe, renderSitePage as renderDownstreetPage } from './downstreet-cafe'
import { siteData as shaunsBlog, renderSitePage as renderShaunsPage } from './shauns-blog'
import { siteData as uiPortfolio, renderSitePage as renderUiPage } from './ui-portfolio'
import { siteData as flavorRecords, renderSitePage as renderFlavorPage } from './flavor-records'
import { siteData as miseEnPlace, renderSitePage as renderMisePage } from './mise-en-place'
import { siteData as ledger, renderSitePage as renderLedgerPage } from './ledger'
import { siteData as fuegoCollective, renderSitePage as renderFuegoPage } from './fuego-collective'
import type { SiteData } from '../sections/types'

export interface SiteModule {
  siteData: SiteData
  renderSitePage: (pageSlug: string, themeCSSOverride?: string) => string
}

export const mockSites: Record<string, SiteModule> = {
  'downstreet-cafe': {
    siteData: downstreetCafe,
    renderSitePage: renderDownstreetPage,
  },
  'shauns-blog': {
    siteData: shaunsBlog,
    renderSitePage: renderShaunsPage,
  },
  'ui-portfolio': {
    siteData: uiPortfolio,
    renderSitePage: renderUiPage,
  },
  'flavor-records': {
    siteData: flavorRecords,
    renderSitePage: renderFlavorPage,
  },
  'mise-en-place': {
    siteData: miseEnPlace,
    renderSitePage: renderMisePage,
  },
  'ledger': {
    siteData: ledger,
    renderSitePage: renderLedgerPage,
  },
  'fuego-collective': {
    siteData: fuegoCollective,
    renderSitePage: renderFuegoPage,
  },
}