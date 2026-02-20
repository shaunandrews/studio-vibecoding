import type { Project } from './types'

export const seedProjects: Project[] = [
  {
    id: 'downstreet-cafe',
    name: 'Downstreet Café',
    favicon: 'https://api.dicebear.com/9.x/shapes/svg?seed=cafe',
    status: 'running',
    url: 'http://localhost:8881',
    createdAt: '2025-11-15T10:00:00Z',
  },
  {
    id: 'studio-meridian',
    name: 'Studio Meridian',
    favicon: 'https://api.dicebear.com/9.x/shapes/svg?seed=meridian',
    status: 'running',
    url: 'http://localhost:8882',
    createdAt: '2026-01-20T09:00:00Z',
  },
  {
    id: 'jetpack-feature',
    name: 'Jetpack Dev',
    favicon: 'https://api.dicebear.com/9.x/shapes/svg?seed=jetpack',
    status: 'running',
    url: 'http://localhost:8883',
    createdAt: '2026-02-01T14:00:00Z',
  },
  {
    id: 'block-playground',
    name: 'Block Playground',
    favicon: 'https://api.dicebear.com/9.x/shapes/svg?seed=blocks',
    status: 'stopped',
    url: 'http://localhost:8884',
    createdAt: '2026-02-10T11:00:00Z',
  },
]
