import { homepage as downstreetHomepage, menu as downstreetMenu, about as downstreetAbout } from './downstreet-cafe'
import { homepage as shaunsHomepage, post as shaunsPost, about as shaunsAbout } from './shauns-blog'
import { homepage as uiHomepage, casestudy as uiCasestudy, contact as uiContact } from './ui-portfolio'
import { homepage as flavorHomepage, artist as flavorArtist, releases as flavorReleases } from './flavor-records'
import { homepage as miseHomepage, recipe as miseRecipe, mealplan as miseMealplan } from './mise-en-place'
import { homepage as ledgerHomepage, invoice as ledgerInvoice, clients as ledgerClients } from './ledger'

export interface MockSitePage {
  label: string
  html: (themeCSS: string) => string
}

export interface MockSite {
  homepage: (themeCSS: string) => string
  pages: Record<string, MockSitePage>
}

export const mockSites: Record<string, MockSite> = {
  'downstreet-cafe': {
    homepage: downstreetHomepage,
    pages: {
      homepage: { label: 'Home', html: downstreetHomepage },
      menu: { label: 'Menu', html: downstreetMenu },
      about: { label: 'About', html: downstreetAbout },
    },
  },
  'shauns-blog': {
    homepage: shaunsHomepage,
    pages: {
      homepage: { label: 'Home', html: shaunsHomepage },
      post: { label: 'The Future of Design Engineering', html: shaunsPost },
      about: { label: 'About', html: shaunsAbout },
    },
  },
  'ui-portfolio': {
    homepage: uiHomepage,
    pages: {
      homepage: { label: 'Home', html: uiHomepage },
      casestudy: { label: 'Meridian Banking App', html: uiCasestudy },
      contact: { label: 'About & Contact', html: uiContact },
    },
  },
  'flavor-records': {
    homepage: flavorHomepage,
    pages: {
      homepage: { label: 'Home', html: flavorHomepage },
      artist: { label: 'Midnight Signal', html: flavorArtist },
      releases: { label: 'Releases', html: flavorReleases },
    },
  },
  'mise-en-place': {
    homepage: miseHomepage,
    pages: {
      homepage: { label: 'Dashboard', html: miseHomepage },
      recipe: { label: 'Spicy Miso Ramen', html: miseRecipe },
      mealplan: { label: 'Meal Plan', html: miseMealplan },
    },
  },
  'ledger': {
    homepage: ledgerHomepage,
    pages: {
      homepage: { label: 'Dashboard', html: ledgerHomepage },
      invoice: { label: 'Invoice #INV-2024-0047', html: ledgerInvoice },
      clients: { label: 'Clients', html: ledgerClients },
    },
  },
}
