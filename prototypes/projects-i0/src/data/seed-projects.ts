import type { Project } from './types'

export const seedProjects: Project[] = [
  {
    id: 'downstreet-cafe',
    name: 'Downstreet Café',
    favicon: 'https://api.dicebear.com/9.x/shapes/svg?seed=cafe',
    status: 'running',
    url: 'https://downstreet.cafe',
    createdAt: '2025-11-15T10:00:00Z',
    description: 'A cozy neighborhood coffee shop website.',
  },
  {
    id: 'portfolio',
    name: 'Studio Meridian',
    favicon: 'https://api.dicebear.com/9.x/shapes/svg?seed=meridian',
    status: 'running',
    url: 'https://studiomeridian.com',
    createdAt: '2026-01-20T09:00:00Z',
    description: 'A design studio portfolio.',
  },
]
