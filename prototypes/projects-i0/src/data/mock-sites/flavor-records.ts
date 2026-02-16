import type { SiteData } from '../sections/types'
import { renderPage } from '../sections/renderer'
import { renderFlavorSection } from '../sections/sites/flavor-records.renderers'
import { flavorCSS } from '../sections/sites/flavor-records.css'
import flavorRecordsTheme from '../themes/flavor-records'

export const siteData: SiteData = {
  name: 'Flavor Records',
  theme: flavorRecordsTheme,
  fonts: [],
  header: {
    id: 'header',
    type: 'header',
    data: {
      navItems: [
        { label: 'Releases', page: 'releases' },
        { label: 'Catalog', page: 'catalog' },
        { label: 'Artists', page: 'artist' },
        { label: 'Shows', page: 'shows' },
        { label: 'About', page: 'labelAbout' },
      ],
    },
  },
  footer: {
    id: 'footer',
    type: 'footer',
    data: {
      address: 'Flavor Records · Portland, OR · info@flavorrecords.com',
      phone: '',
      email: 'info@flavorrecords.com',
      copyright: '© 2026 Flavor Records. All rights reserved.',
    },
  },
  pages: [
    // ---- Homepage ----
    {
      id: 'homepage',
      title: 'Flavor Records',
      slug: 'homepage',
      sections: [
        {
          id: 'home-hero',
          type: 'flavor-hero' as any,
          data: {
            heading: 'Flavor Records',
            tagline: 'Independent music since 2019',
          },
        },
        {
          id: 'home-featured',
          type: 'flavor-featured-release' as any,
          data: {
            label: 'Featured Release',
            artist: 'Midnight Signal',
            title: 'Echoes of Tomorrow',
            meta: '12 tracks · January 2026',
            artGradient: 'linear-gradient(135deg, #8B5CF6, #3B82F6)',
            linkPage: 'artist',
            linkText: 'Listen Now',
          },
        },
        {
          id: 'home-recent',
          type: 'flavor-release-grid' as any,
          data: {
            label: 'Recent Releases',
            releases: [
              { title: 'Neon Drift', artist: 'Glass Canyon', artGradient: 'linear-gradient(135deg, #06B6D4, #10B981)', linkPage: 'releases' },
              { title: 'Soft Static', artist: 'Vera Luna', artGradient: 'linear-gradient(135deg, #EC4899, #F59E0B)', linkPage: 'releases' },
              { title: 'Volume III', artist: 'The Haze', artGradient: 'linear-gradient(135deg, #6366F1, #9333EA)', linkPage: 'releases' },
              { title: 'After Hours', artist: 'DJ Sable', artGradient: 'linear-gradient(135deg, #F97316, #EF4444)', linkPage: 'releases' },
            ],
          },
        },
      ],
    },

    // ---- Artist ----
    {
      id: 'artist',
      title: 'Midnight Signal — Flavor Records',
      slug: 'artist',
      sections: [
        {
          id: 'artist-profile',
          type: 'flavor-artist-profile' as any,
          data: {
            name: 'Midnight Signal',
            location: 'Portland, OR',
            signed: '2021',
            tags: ['Post-Punk', 'Shoegaze', 'Dream Pop'],
            photoGradient: 'linear-gradient(135deg, #8B5CF6, #3B82F6, var(--theme-bg))',
            quote: {
              text: 'We wanted to make something that sounds like driving through fog at 2 AM — familiar but unreachable.',
              attribution: 'Kai Morrow, vocals/guitar',
            },
            bio: [
              'Midnight Signal emerged from Portland\'s basement scene in 2019, built on the foundation of layered guitars, analog synths, and Kai Morrow\'s haunted vocal delivery. The four-piece — Morrow, bassist Jess Tanaka, drummer Cole Arden, and synth/keys player Mira Voss — found their sound in late-night sessions at a converted warehouse studio on the east side.',
              'Their debut EP <em>Half-Light</em> caught the attention of Flavor Records in early 2021. Since signing, the band has released two full-length albums and toured extensively across the Pacific Northwest and beyond, earning a reputation for intense, atmospheric live shows.',
              'Their latest album <em>Echoes of Tomorrow</em> (January 2026) marks a shift toward more expansive arrangements, blending post-punk urgency with cinematic textures that expand on the sonic palette of their earlier work.',
            ],
          },
        },
        {
          id: 'artist-discography',
          type: 'flavor-artist-discography' as any,
          data: {
            label: 'Discography',
            items: [
              { title: 'Echoes of Tomorrow', format: 'LP', year: '2026', artGradient: 'linear-gradient(135deg, #8B5CF6, #3B82F6)' },
              { title: 'Peripheral Vision', format: 'LP', year: '2024', artGradient: 'linear-gradient(135deg, #6366F1, #1e1b4b)' },
              { title: 'Signal / Noise', format: 'Single', year: '2023', artGradient: 'linear-gradient(135deg, #7C3AED, #4338CA)' },
              { title: 'Half-Light', format: 'EP', year: '2021', artGradient: 'linear-gradient(135deg, #a78bfa, #312e81)' },
            ],
          },
        },
        {
          id: 'artist-shows',
          type: 'flavor-artist-shows' as any,
          data: {
            label: 'Upcoming Shows',
            shows: [
              { date: 'Mar 14, 2026', venueName: 'Doug Fir Lounge', venueCity: 'Portland, OR', status: 'sold-out' },
              { date: 'Mar 22, 2026', venueName: 'The Crocodile', venueCity: 'Seattle, WA', status: 'tickets' },
              { date: 'Apr 5, 2026', venueName: 'The Independent', venueCity: 'San Francisco, CA', status: 'tickets' },
              { date: 'Apr 18, 2026', venueName: 'Lodge Room', venueCity: 'Los Angeles, CA', status: 'tickets' },
              { date: 'May 2, 2026', venueName: 'Neumos', venueCity: 'Seattle, WA', status: 'tickets' },
            ],
          },
        },
      ],
    },

    // ---- Releases ----
    {
      id: 'releases',
      title: 'Releases — Flavor Records',
      slug: 'releases',
      sections: [
        {
          id: 'releases-header',
          type: 'hero-simple',
          data: {
            heading: 'Releases',
            subtitle: 'The full Flavor Records catalog',
          },
        },
        {
          id: 'releases-2026',
          type: 'flavor-release-year-group' as any,
          data: {
            year: '2026',
            releases: [
              { title: 'Echoes of Tomorrow', artist: 'Midnight Signal', date: 'Jan 2026', genre: 'Post-Punk', format: 'LP', artGradient: 'linear-gradient(135deg, #8B5CF6, #3B82F6)' },
              { title: 'Neon Drift', artist: 'Glass Canyon', date: 'Feb 2026', genre: 'Synthwave', format: 'LP', artGradient: 'linear-gradient(135deg, #06B6D4, #10B981)' },
            ],
          },
        },
        {
          id: 'releases-2025',
          type: 'flavor-release-year-group' as any,
          data: {
            year: '2025',
            releases: [
              { title: 'Soft Static', artist: 'Vera Luna', date: 'Nov 2025', genre: 'Dream Pop', format: 'EP', artGradient: 'linear-gradient(135deg, #EC4899, #F59E0B)' },
              { title: 'After Hours', artist: 'DJ Sable', date: 'Sep 2025', genre: 'House', format: 'LP', artGradient: 'linear-gradient(135deg, #F97316, #EF4444)' },
              { title: 'Coastal', artist: 'Glass Canyon', date: 'Jul 2025', genre: 'Ambient', format: 'Single', artGradient: 'linear-gradient(135deg, #14B8A6, #0D9488)' },
              { title: 'Ultraviolet', artist: 'KODA', date: 'May 2025', genre: 'Electronica', format: 'EP', artGradient: 'linear-gradient(135deg, #A855F7, #6D28D9)' },
            ],
          },
        },
        {
          id: 'releases-2024',
          type: 'flavor-release-year-group' as any,
          data: {
            year: '2024',
            releases: [
              { title: 'Peripheral Vision', artist: 'Midnight Signal', date: 'Oct 2024', genre: 'Shoegaze', format: 'LP', artGradient: 'linear-gradient(135deg, #6366F1, #1e1b4b)' },
              { title: 'Burn the Map', artist: 'Vera Luna', date: 'Jun 2024', genre: 'Indie Rock', format: 'LP', artGradient: 'linear-gradient(135deg, #E11D48, #BE123C)' },
              { title: 'Volume III', artist: 'The Haze', date: 'Mar 2024', genre: 'Psych Rock', format: 'LP', artGradient: 'linear-gradient(135deg, #6366F1, #9333EA)' },
              { title: 'Dissolve', artist: 'KODA', date: 'Jan 2024', genre: 'Electronica', format: 'Single', artGradient: 'linear-gradient(135deg, #D946EF, #7C3AED)' },
            ],
          },
        },
      ],
    },

    // ---- Catalog ----
    {
      id: 'catalog',
      title: 'Catalog — Flavor Records',
      slug: 'catalog',
      sections: [
        {
          id: 'catalog-header',
          type: 'hero-simple',
          data: {
            heading: 'Catalog',
            subtitle: 'Every release on Flavor Records — vinyl, digital, and limited editions',
          },
        },
        {
          id: 'catalog-grid',
          type: 'flavor-catalog' as any,
          data: {
            filters: ['All', 'Electronic', 'Indie Rock', 'Jazz', 'Ambient'],
            items: [
              { title: 'Echoes of Tomorrow', artist: 'Midnight Signal', year: '2026', genres: ['Post-Punk', 'Electronic'], format: 'LP', artGradient: 'linear-gradient(135deg,#8B5CF6,#3B82F6)', initial: 'M', dataGenre: 'electronic', linkPage: 'releases' },
              { title: 'Neon Drift', artist: 'Glass Canyon', year: '2026', genres: ['Synthwave', 'Electronic'], format: 'LP', artGradient: 'linear-gradient(135deg,#06B6D4,#10B981)', initial: 'G', dataGenre: 'electronic', linkPage: 'releases' },
              { title: 'Soft Static', artist: 'Vera Luna', year: '2025', genres: ['Dream Pop'], format: 'EP', artGradient: 'linear-gradient(135deg,#EC4899,#F59E0B)', initial: 'V', dataGenre: 'indie-rock', linkPage: 'releases' },
              { title: 'After Hours', artist: 'DJ Sable', year: '2025', genres: ['House', 'Electronic'], format: 'LP', artGradient: 'linear-gradient(135deg,#F97316,#EF4444)', initial: 'D', dataGenre: 'electronic', linkPage: 'releases' },
              { title: 'Coastal', artist: 'Glass Canyon', year: '2025', genres: ['Ambient'], format: 'Single', artGradient: 'linear-gradient(135deg,#14B8A6,#0D9488)', initial: 'G', dataGenre: 'ambient', linkPage: 'releases' },
              { title: 'Ultraviolet', artist: 'KODA', year: '2025', genres: ['Electronica', 'Electronic'], format: 'EP', artGradient: 'linear-gradient(135deg,#A855F7,#6D28D9)', initial: 'K', dataGenre: 'electronic', linkPage: 'releases' },
              { title: 'Peripheral Vision', artist: 'Midnight Signal', year: '2024', genres: ['Shoegaze'], format: 'LP', artGradient: 'linear-gradient(135deg,#6366F1,#1e1b4b)', initial: 'M', dataGenre: 'indie-rock', linkPage: 'releases' },
              { title: 'Burn the Map', artist: 'Vera Luna', year: '2024', genres: ['Indie Rock'], format: 'LP', artGradient: 'linear-gradient(135deg,#E11D48,#BE123C)', initial: 'V', dataGenre: 'indie-rock', linkPage: 'releases' },
              { title: 'Volume III', artist: 'The Haze', year: '2024', genres: ['Psych Rock'], format: 'LP', artGradient: 'linear-gradient(135deg,#6366F1,#9333EA)', initial: 'T', dataGenre: 'indie-rock', linkPage: 'releases' },
              { title: 'Dissolve', artist: 'KODA', year: '2024', genres: ['Electronica', 'Electronic'], format: 'Single', artGradient: 'linear-gradient(135deg,#D946EF,#7C3AED)', initial: 'K', dataGenre: 'electronic', linkPage: 'releases' },
              { title: 'Late Night Conversations', artist: 'Rae Nomura Trio', year: '2023', genres: ['Jazz'], format: 'LP', artGradient: 'linear-gradient(135deg,#78716C,#D4A574)', initial: 'R', dataGenre: 'jazz', linkPage: 'releases' },
              { title: 'Tidal Memory', artist: 'Slow Beacon', year: '2023', genres: ['Ambient'], format: 'LP', artGradient: 'linear-gradient(135deg,#1E3A5F,#4A90A4)', initial: 'S', dataGenre: 'ambient', linkPage: 'releases' },
              { title: 'Signal / Noise', artist: 'Midnight Signal', year: '2023', genres: ['Post-Punk', 'Electronic'], format: 'Single', artGradient: 'linear-gradient(135deg,#7C3AED,#4338CA)', initial: 'M', dataGenre: 'electronic', linkPage: 'releases' },
              { title: 'Blue Hour', artist: 'Rae Nomura Trio', year: '2022', genres: ['Jazz'], format: 'EP', artGradient: 'linear-gradient(135deg,#92400E,#B45309)', initial: 'R', dataGenre: 'jazz', linkPage: 'releases' },
              { title: 'Fog Studies', artist: 'Slow Beacon', year: '2022', genres: ['Ambient'], format: 'EP', artGradient: 'linear-gradient(135deg,#334155,#64748B)', initial: 'S', dataGenre: 'ambient', linkPage: 'releases' },
              { title: 'Half-Light', artist: 'Midnight Signal', year: '2021', genres: ['Shoegaze'], format: 'EP', artGradient: 'linear-gradient(135deg,#a78bfa,#312e81)', initial: 'M', dataGenre: 'indie-rock', linkPage: 'releases' },
            ],
          },
        },
      ],
    },

    // ---- Shows ----
    {
      id: 'shows',
      title: 'Shows — Flavor Records',
      slug: 'shows',
      sections: [
        {
          id: 'shows-header',
          type: 'hero-simple',
          data: {
            heading: 'Shows & Events',
            subtitle: 'Catch Flavor Records artists live — on tour and in your city',
          },
        },
        {
          id: 'shows-upcoming',
          type: 'flavor-shows-list' as any,
          data: {
            label: 'Upcoming Shows',
            shows: [
              { date: { month: 'Mar', day: '14', dow: 'Sat' }, headliner: 'Midnight Signal', venue: 'Doug Fir Lounge', city: 'Portland, OR', support: 'w/ <em>Glass Canyon</em>, <em>Pale Waves</em>', ticketStatus: 'sold-out', ticketLabel: 'Sold Out' },
              { date: { month: 'Mar', day: '22', dow: 'Sun' }, headliner: 'Midnight Signal', venue: 'The Crocodile', city: 'Seattle, WA', support: 'w/ <em>Glass Canyon</em>', ticketStatus: 'on-sale', ticketLabel: 'On Sale' },
              { date: { month: 'Apr', day: '02', dow: 'Thu' }, headliner: 'KODA', venue: 'Holocene', city: 'Portland, OR', support: 'w/ <em>DJ Sable</em> · Visual set by <em>Nøva</em>', ticketStatus: 'on-sale', ticketLabel: 'On Sale' },
              { date: { month: 'Apr', day: '05', dow: 'Sun' }, headliner: 'Midnight Signal', venue: 'The Independent', city: 'San Francisco, CA', support: 'w/ <em>Vera Luna</em>', ticketStatus: 'on-sale', ticketLabel: 'On Sale' },
              { date: { month: 'Apr', day: '11', dow: 'Sat' }, headliner: 'Rae Nomura Trio', venue: 'Jack London Revue', city: 'Portland, OR', support: 'An intimate evening of jazz · Two sets', ticketStatus: 'on-sale', ticketLabel: 'On Sale' },
              { date: { month: 'Apr', day: '18', dow: 'Sat' }, headliner: 'Midnight Signal', venue: 'Lodge Room', city: 'Los Angeles, CA', support: 'w/ <em>The Haze</em>, <em>Vera Luna</em>', ticketStatus: 'on-sale', ticketLabel: 'On Sale' },
              { date: { month: 'May', day: '02', dow: 'Sat' }, headliner: 'Flavor Records Showcase', venue: 'Revolution Hall', city: 'Portland, OR', support: '<em>Midnight Signal</em> · <em>KODA</em> · <em>Vera Luna</em> · <em>Slow Beacon</em> · <em>DJ Sable</em>', ticketStatus: 'free', ticketLabel: 'Free RSVP' },
              { date: { month: 'May', day: '17', dow: 'Sun' }, headliner: 'DJ Sable', venue: 'Kremwerk', city: 'Seattle, WA', support: 'Late-night DJ set · Doors 10pm', ticketStatus: 'on-sale', ticketLabel: 'On Sale' },
              { date: { month: 'Jun', day: '07', dow: 'Sun' }, headliner: 'Slow Beacon', venue: 'The Old Church', city: 'Portland, OR', support: 'Ambient listening session · Limited capacity', ticketStatus: 'on-sale', ticketLabel: 'On Sale' },
            ],
          },
        },
        {
          id: 'shows-past',
          type: 'flavor-shows-list' as any,
          data: {
            label: 'Past Shows',
            isPast: true,
            shows: [
              { date: { month: 'Feb', day: '28', dow: 'Sat' }, headliner: 'Midnight Signal', venue: 'Mississippi Studios', city: 'Portland, OR', support: 'Album release show — <em>Echoes of Tomorrow</em>', ticketStatus: 'sold-out', ticketLabel: 'Sold Out' },
              { date: { month: 'Feb', day: '14', dow: 'Sat' }, headliner: 'Rae Nomura Trio', venue: 'Alberta Rose Theatre', city: 'Portland, OR', support: 'Valentine\'s evening — two sets w/ special guests', ticketStatus: 'sold-out', ticketLabel: 'Sold Out' },
              { date: { month: 'Jan', day: '18', dow: 'Sun' }, headliner: 'KODA + DJ Sable', venue: 'Bunk Bar', city: 'Portland, OR', support: 'Flavor Records New Year Kick-off', ticketStatus: 'sold-out', ticketLabel: 'Sold Out' },
              { date: { month: 'Dec', day: '31', dow: 'Wed' }, headliner: 'Flavor Records NYE', venue: 'Wonder Ballroom', city: 'Portland, OR', support: 'Full roster showcase · NYE countdown', ticketStatus: 'sold-out', ticketLabel: 'Sold Out' },
            ],
          },
        },
      ],
    },

    // ---- About ----
    {
      id: 'labelAbout',
      title: 'About — Flavor Records',
      slug: 'labelAbout',
      sections: [
        {
          id: 'about-header',
          type: 'hero-simple',
          data: {
            heading: 'About Flavor Records',
            subtitle: 'Independent since 2019 · Portland, Oregon',
          },
        },
        {
          id: 'about-story',
          type: 'flavor-label-story' as any,
          data: {
            label: 'Our Story',
            paragraphs: [
              'Flavor Records started in a basement on SE Hawthorne in the summer of 2019. What began as a way to press vinyl for friends quickly became something more — a community of artists, engineers, and music obsessives who believed that independent music deserved better infrastructure, better design, and more intentional release strategies.',
              'Founded by Dani Reeves and Marcus Chen, the label grew out of Portland\'s fertile DIY scene. Both had spent years organizing shows, booking tours, and watching talented artists struggle with the logistics of getting their music into the world. Flavor was built to change that — a label that treats every release like an event and every artist like a partner.',
              'In five years, we\'ve grown from two people and a borrowed turntable to a roster of eight artists spanning post-punk, electronic, jazz, ambient, and indie rock. We\'ve pressed over 15,000 records, organized 200+ shows, and built relationships with independent record shops across the Pacific Northwest and beyond.',
            ],
          },
        },
        {
          id: 'about-quote',
          type: 'flavor-pull-quote' as any,
          data: {
            text: '"We don\'t sign genres. We sign people who make music we can\'t stop listening to."',
          },
        },
        {
          id: 'about-philosophy',
          type: 'flavor-label-story' as any,
          data: {
            label: '',
            paragraphs: [
              'Our philosophy is simple: find artists with a distinct voice, give them the resources and freedom to realize their vision, and put it into the world with care. We handle distribution, press, design, and strategy so our artists can focus on making music. Every release gets a proper vinyl run, thoughtful artwork, and a real campaign — because the music deserves it.',
              'We remain fiercely independent. No major label backing, no venture capital, no algorithms dictating what we release. Just good music, pressed on good vinyl, shared with people who care.',
            ],
          },
        },
        {
          id: 'about-team',
          type: 'flavor-team-grid' as any,
          data: {
            label: 'The Team',
            members: [
              { name: 'Dani Reeves', initials: 'DR', role: 'Co-Founder · A&R', bio: 'Former touring musician turned label head. Dani handles artist relations, scouting, and creative direction. She\'s the ear behind the roster — if it\'s on Flavor, Dani heard it first.', avatarGradient: 'linear-gradient(135deg,#8B5CF6,#3B82F6)' },
              { name: 'Marcus Chen', initials: 'MC', role: 'Co-Founder · Operations', bio: 'The logistics brain. Marcus manages distribution, vinyl production, finances, and partnerships. Previously ran operations at a Portland pressing plant.', avatarGradient: 'linear-gradient(135deg,#06B6D4,#10B981)' },
              { name: 'Jules Torres', initials: 'JT', role: 'Art Director', bio: 'Responsible for every visual touchpoint — album art, merch, web, and physical packaging. Jules brings a background in printmaking and editorial design.', avatarGradient: 'linear-gradient(135deg,#EC4899,#F59E0B)' },
              { name: 'Sam Park', initials: 'SP', role: 'Marketing & Shows', bio: 'Books all live events, manages press outreach, and runs social channels. Sam came up through Portland\'s DIY venue circuit and knows every booker in the PNW.', avatarGradient: 'linear-gradient(135deg,#F97316,#EF4444)' },
            ],
          },
        },
        {
          id: 'about-submit',
          type: 'flavor-submit-music' as any,
          data: {
            label: 'Submit Your Music',
            intro: 'We\'re always listening. Flavor Records accepts unsolicited demos from artists working in any genre — if the music has a point of view, we want to hear it.',
            steps: [
              { bold: 'Send a private streaming link', rest: ' (Bandcamp, SoundCloud, or Google Drive) to <a href="mailto:demos@flavorrecords.com" style="color:var(--theme-color-primary);text-decoration:none;">demos@flavorrecords.com</a>' },
              { bold: 'Include a short bio', rest: ' — who you are, where you\'re based, what drives your music' },
              { bold: 'Tell us what you\'re looking for', rest: ' — vinyl release, full label support, distribution only, or something else' },
              { bold: 'No genre restrictions', rest: ' — we care about vision and craft, not categories' },
              { bold: 'Response time:', rest: ' We listen to everything. If it\'s a fit, you\'ll hear from Dani within 3–4 weeks.' },
            ],
            note: '<strong>Please note:</strong> We receive hundreds of submissions monthly and can only sign a handful of artists per year. A pass doesn\'t mean the music isn\'t good — it means it isn\'t the right fit for our roster right now. Keep making things.',
          },
        },
        {
          id: 'about-contact',
          type: 'flavor-contact' as any,
          data: {
            label: 'Get In Touch',
            contacts: [
              { label: 'General', email: 'info@flavorrecords.com' },
              { label: 'Demos', email: 'demos@flavorrecords.com' },
              { label: 'Press', email: 'press@flavorrecords.com' },
              { label: 'Booking', email: 'shows@flavorrecords.com' },
            ],
            address: 'Flavor Records · 2847 SE Hawthorne Blvd · Portland, OR 97214',
            socialLinks: ['Instagram', 'Bandcamp', 'Spotify', 'Twitter', 'Discogs'],
          },
        },
      ],
    },
  ],
}

// ---- Backward-compatible exports ----

export function homepage(themeCSS: string): string {
  return renderPage(siteData.pages[0], siteData, 'homepage', themeCSS, flavorCSS, renderFlavorSection)
}

export function artist(themeCSS: string): string {
  return renderPage(siteData.pages[1], siteData, 'artist', themeCSS, flavorCSS, renderFlavorSection)
}

export function releases(themeCSS: string): string {
  return renderPage(siteData.pages[2], siteData, 'releases', themeCSS, flavorCSS, renderFlavorSection)
}

export function catalog(themeCSS: string): string {
  return renderPage(siteData.pages[3], siteData, 'catalog', themeCSS, flavorCSS, renderFlavorSection)
}

export function shows(themeCSS: string): string {
  return renderPage(siteData.pages[4], siteData, 'shows', themeCSS, flavorCSS, renderFlavorSection)
}

export function labelAbout(themeCSS: string): string {
  return renderPage(siteData.pages[5], siteData, 'labelAbout', themeCSS, flavorCSS, renderFlavorSection)
}

export const pages: Record<string, { label: string; html: (css: string) => string }> = {
  homepage: { label: 'Home', html: homepage },
  artist: { label: 'Artists', html: artist },
  releases: { label: 'Releases', html: releases },
  catalog: { label: 'Catalog', html: catalog },
  shows: { label: 'Shows', html: shows },
  labelAbout: { label: 'About', html: labelAbout },
}
