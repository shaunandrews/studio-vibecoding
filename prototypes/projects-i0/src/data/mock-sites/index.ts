import { homepage as downstreetCafe } from './downstreet-cafe'
import { homepage as shaunsBlog } from './shauns-blog'
import { homepage as uiPortfolio } from './ui-portfolio'
import { homepage as flavorRecords } from './flavor-records'

export interface MockSite {
  homepage: string
  pages?: Record<string, string>
}

export const mockSites: Record<string, MockSite> = {
  'downstreet-cafe': { homepage: downstreetCafe },
  'shauns-blog': { homepage: shaunsBlog },
  'ui-portfolio': { homepage: uiPortfolio },
  'flavor-records': { homepage: flavorRecords },
}
