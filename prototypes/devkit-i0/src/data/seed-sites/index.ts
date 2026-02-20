import { downstreetCafe } from './downstreet-cafe'
import { portfolio } from './portfolio'
import { jetpackDev } from './jetpack-dev'
import { blockPlayground } from './block-playground'
import type { Site } from '../site-types'

export const seedSites: Record<string, Site> = {
  'downstreet-cafe': downstreetCafe,
  'studio-meridian': portfolio,
  'jetpack-feature': jetpackDev,
  'block-playground': blockPlayground,
}

export { downstreetCafe, portfolio, jetpackDev, blockPlayground }
