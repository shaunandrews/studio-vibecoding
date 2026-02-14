import { homepage as downstreetHomepage, menu as downstreetMenu, about as downstreetAbout } from './downstreet-cafe'
import { homepage as shaunsHomepage, post as shaunsPost, about as shaunsAbout } from './shauns-blog'
import { homepage as uiHomepage, casestudy as uiCasestudy, contact as uiContact } from './ui-portfolio'
import { homepage as flavorHomepage, artist as flavorArtist, releases as flavorReleases } from './flavor-records'

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
}
