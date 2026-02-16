import { homepage as downstreetHomepage, menu as downstreetMenu, about as downstreetAbout, events as downstreetEvents, gallery as downstreetGallery, order as downstreetOrder } from './downstreet-cafe'
import { homepage as shaunsHomepage, post as shaunsPost, about as shaunsAbout, archive as shaunsArchive, post2 as shaunsPost2, projects as shaunsProjects } from './shauns-blog'
import { homepage as uiHomepage, casestudy as uiCasestudy, contact as uiContact, work as uiWork, casestudy2 as uiCasestudy2, process as uiProcess } from './ui-portfolio'
import { homepage as flavorHomepage, artist as flavorArtist, releases as flavorReleases, catalog as flavorCatalog, shows as flavorShows, labelAbout as flavorLabelAbout } from './flavor-records'
import { homepage as miseHomepage, recipe as miseRecipe, mealplan as miseMealplan, browse as miseBrowse, groceries as miseGroceries, settings as miseSettings } from './mise-en-place'
import { homepage as ledgerHomepage, invoice as ledgerInvoice, clients as ledgerClients, reports as ledgerReports, settings as ledgerSettings, clientDetail as ledgerClientDetail } from './ledger'
import { homepage as fuegoHomepage, shop as fuegoShop, product as fuegoProduct } from './fuego-collective'

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
      events: { label: 'Events', html: downstreetEvents },
      gallery: { label: 'Gallery', html: downstreetGallery },
      order: { label: 'Order Online', html: downstreetOrder },
    },
  },
  'shauns-blog': {
    homepage: shaunsHomepage,
    pages: {
      homepage: { label: 'Home', html: shaunsHomepage },
      post: { label: 'The Future of Design Engineering', html: shaunsPost },
      about: { label: 'About', html: shaunsAbout },
      archive: { label: 'Archive', html: shaunsArchive },
      post2: { label: 'The Case for Design Engineers', html: shaunsPost2 },
      projects: { label: 'Projects', html: shaunsProjects },
    },
  },
  'ui-portfolio': {
    homepage: uiHomepage,
    pages: {
      homepage: { label: 'Home', html: uiHomepage },
      work: { label: 'Work', html: uiWork },
      casestudy: { label: 'Meridian Banking App', html: uiCasestudy },
      casestudy2: { label: 'Verdant — Sustainable Shopping', html: uiCasestudy2 },
      process: { label: 'Process', html: uiProcess },
      contact: { label: 'About & Contact', html: uiContact },
    },
  },
  'flavor-records': {
    homepage: flavorHomepage,
    pages: {
      homepage: { label: 'Home', html: flavorHomepage },
      artist: { label: 'Midnight Signal', html: flavorArtist },
      releases: { label: 'Releases', html: flavorReleases },
      catalog: { label: 'Catalog', html: flavorCatalog },
      shows: { label: 'Shows', html: flavorShows },
      labelAbout: { label: 'About the Label', html: flavorLabelAbout },
    },
  },
  'mise-en-place': {
    homepage: miseHomepage,
    pages: {
      homepage: { label: 'Dashboard', html: miseHomepage },
      recipe: { label: 'Spicy Miso Ramen', html: miseRecipe },
      mealplan: { label: 'Meal Plan', html: miseMealplan },
      browse: { label: 'Browse Recipes', html: miseBrowse },
      groceries: { label: 'Grocery List', html: miseGroceries },
      settings: { label: 'Settings', html: miseSettings },
    },
  },
  'ledger': {
    homepage: ledgerHomepage,
    pages: {
      homepage: { label: 'Dashboard', html: ledgerHomepage },
      invoice: { label: 'Invoice #INV-2024-0047', html: ledgerInvoice },
      clients: { label: 'Clients', html: ledgerClients },
      reports: { label: 'Reports', html: ledgerReports },
      settings: { label: 'Settings', html: ledgerSettings },
      clientDetail: { label: 'Client: Meridian Studios', html: ledgerClientDetail },
    },
  },
  'fuego-collective': {
    homepage: fuegoHomepage,
    pages: {
      homepage: { label: 'Home', html: fuegoHomepage },
      shop: { label: 'Shop', html: fuegoShop },
      product: { label: 'Smoky Habanero', html: fuegoProduct },
    },
  },
}
