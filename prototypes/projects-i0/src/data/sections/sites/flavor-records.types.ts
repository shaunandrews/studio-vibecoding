// Flavor Records — site-specific section types

export type FlavorSectionType =
  | 'flavor-hero'
  | 'flavor-featured-release'
  | 'flavor-release-grid'
  | 'flavor-artist-profile'
  | 'flavor-artist-discography'
  | 'flavor-artist-shows'
  | 'flavor-release-year-group'
  | 'flavor-catalog'
  | 'flavor-shows-list'
  | 'flavor-label-story'
  | 'flavor-pull-quote'
  | 'flavor-team-grid'
  | 'flavor-submit-music'
  | 'flavor-contact'

export interface FlavorHeroData {
  heading: string
  tagline: string
}

export interface FlavorFeaturedReleaseData {
  label: string
  artist: string
  title: string
  meta: string
  artGradient: string
  linkPage: string
  linkText: string
}

export interface FlavorReleaseItem {
  title: string
  artist: string
  artGradient: string
  linkPage?: string
}

export interface FlavorReleaseGridData {
  label: string
  releases: FlavorReleaseItem[]
}

export interface FlavorArtistProfileData {
  name: string
  location: string
  signed: string
  tags: string[]
  photoGradient: string
  quote?: { text: string; attribution: string }
  bio: string[]
}

export interface FlavorDiscographyItem {
  title: string
  format: string
  year: string
  artGradient: string
}

export interface FlavorArtistDiscographyData {
  label: string
  items: FlavorDiscographyItem[]
}

export interface FlavorArtistShowItem {
  date: string
  venueName: string
  venueCity: string
  status: 'tickets' | 'sold-out'
}

export interface FlavorArtistShowsData {
  label: string
  shows: FlavorArtistShowItem[]
}

export interface FlavorReleaseCard {
  title: string
  artist: string
  date: string
  genre: string
  format: string
  artGradient: string
}

export interface FlavorReleaseYearGroupData {
  year: string
  releases: FlavorReleaseCard[]
}

export interface FlavorCatalogItem {
  title: string
  artist: string
  year: string
  genres: string[]
  format: string
  artGradient: string
  initial: string
  dataGenre: string
  linkPage?: string
}

export interface FlavorCatalogData {
  filters: string[]
  items: FlavorCatalogItem[]
}

export interface FlavorShowItem {
  date: { month: string; day: string; dow: string }
  headliner: string
  venue: string
  city: string
  support: string
  ticketStatus: 'on-sale' | 'sold-out' | 'free'
  ticketLabel: string
}

export interface FlavorShowsListData {
  label: string
  shows: FlavorShowItem[]
  isPast?: boolean
}

export interface FlavorLabelStoryData {
  label: string
  paragraphs: string[]
  leadParagraph?: string
}

export interface FlavorPullQuoteData {
  text: string
}

export interface FlavorTeamMember {
  name: string
  initials: string
  role: string
  bio: string
  avatarGradient: string
}

export interface FlavorTeamGridData {
  label: string
  members: FlavorTeamMember[]
}

export interface FlavorSubmitMusicData {
  label: string
  intro: string
  steps: Array<{ bold: string; rest: string }>
  note: string
}

export interface FlavorContactData {
  label: string
  contacts: Array<{ label: string; email: string }>
  address: string
  socialLinks: string[]
}

export interface FlavorSectionDataMap {
  'flavor-hero': FlavorHeroData
  'flavor-featured-release': FlavorFeaturedReleaseData
  'flavor-release-grid': FlavorReleaseGridData
  'flavor-artist-profile': FlavorArtistProfileData
  'flavor-artist-discography': FlavorArtistDiscographyData
  'flavor-artist-shows': FlavorArtistShowsData
  'flavor-release-year-group': FlavorReleaseYearGroupData
  'flavor-catalog': FlavorCatalogData
  'flavor-shows-list': FlavorShowsListData
  'flavor-label-story': FlavorLabelStoryData
  'flavor-pull-quote': FlavorPullQuoteData
  'flavor-team-grid': FlavorTeamGridData
  'flavor-submit-music': FlavorSubmitMusicData
  'flavor-contact': FlavorContactData
}

export interface FlavorSection {
  id: string
  type: FlavorSectionType
  data: FlavorSectionDataMap[FlavorSectionType]
}
