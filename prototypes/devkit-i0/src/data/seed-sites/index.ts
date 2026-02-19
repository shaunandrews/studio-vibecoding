import { downstreetCafe } from './downstreet-cafe'
import { portfolio } from './portfolio'
// TODO: import from site-types when available
import type { Site } from '../site-types'

export const seedSites: Record<string, Site> = {
  'downstreet-cafe': downstreetCafe,
  'portfolio': portfolio,
}

// Export individual sites for direct imports if needed
export { downstreetCafe, portfolio }