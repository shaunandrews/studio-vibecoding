import type { SiteData, Section } from '../sections/types'
import { renderPage } from '../sections/renderer'
import { renderSection } from '../sections/section-renderers'
import { downstreetCSS } from '../sections/sites/downstreet-cafe.css'
import downstreetCafeTheme from '../themes/downstreet-cafe'

// TODO: renderPage doesn't support color mode yet — dark mode preview will default to light

const navItems = [
  { label: 'Home', page: 'homepage' },
  { label: 'Menu', page: 'menu' },
  { label: 'About', page: 'about' },
  { label: 'Events', page: 'events' },
  { label: 'Gallery', page: 'gallery' },
  { label: 'Order', page: 'order' },
]

const headerSection: Section = {
  id: 'site-header',
  type: 'site-header',
  data: { navItems },
}

const footerSection: Section = {
  id: 'site-footer',
  type: 'site-footer',
  data: {
    address: '42 Maple Street, Riverside, OR 97201',
    phone: '(503) 555-0142',
    email: 'hello@downstreetcafe.com',
    tagline: 'Made with WordPress',
  },
}

function customRenderer(section: Section, activePage: string): string | null {
  if (section.type === 'site-header') {
    const items = section.data.navItems as Array<{ label: string; page: string }>
    const links = items.map(item => {
      const activeClass = item.page === activePage ? ' class="active"' : ''
      return `<a href="#"${activeClass} onclick="window.parent.postMessage({type:'navigate',page:'${item.page}'},'*');return false">${item.label}</a>`
    }).join('\n  ')
    return `<nav class="site-nav">\n  ${links}\n</nav>`
  }
  if (section.type === 'site-footer') {
    const d = section.data
    return `<footer>
  <p>${d.address}</p>
  <p>${d.phone} · <a href="#">${d.email}</a></p>
  <p class="wp">${d.tagline}</p>
</footer>`
  }
  return null
}

export const siteData: SiteData = {
  name: 'Downstreet Cafe',
  theme: downstreetCafeTheme,
  fonts: [
    { url: 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap' },
  ],
  pages: [
    // ---- Homepage ----
    {
      id: 'homepage',
      title: 'Downstreet Cafe',
      slug: 'homepage',
      sections: [
        headerSection,
        {
          id: 'home-hero',
          type: 'hero-split',
          data: {
            heading: 'Downstreet<br>Cafe',
            tagline: 'Your neighborhood coffee spot',
            image: { src: '/images/downstreet/hero-interior.png', alt: 'Downstreet Cafe interior with morning light' },
            hours: ['Mon – Fri: 7 AM – 6 PM', 'Sat – Sun: 8 AM – 4 PM'],
          },
        },
        {
          id: 'home-strip',
          type: 'image-strip',
          data: {
            images: [
              { src: '/images/downstreet/latte-art.png', alt: 'Latte art close-up', caption: 'Latte art by Sophie' },
              { src: '/images/downstreet/pastries.png', alt: 'Fresh pastries on wooden board', caption: 'Baked fresh daily' },
              { src: '/images/downstreet/barista-counter.png', alt: 'Barista behind espresso machine', caption: 'The espresso bar' },
            ],
          },
        },
        {
          id: 'home-menu',
          type: 'menu-list',
          data: {
            heading: 'Menu Highlights',
            variant: 'columns',
            categories: [
              {
                name: 'Coffee',
                items: [
                  { name: 'Espresso', price: '$3.50' },
                  { name: 'Cappuccino', price: '$4.75' },
                  { name: 'Pour Over', price: '$5.00' },
                  { name: 'Cold Brew', price: '$4.50' },
                ],
              },
              {
                name: 'Pastries',
                items: [
                  { name: 'Butter Croissant', price: '$3.25' },
                  { name: 'Banana Bread', price: '$3.50' },
                  { name: 'Blueberry Muffin', price: '$3.00' },
                  { name: 'Cinnamon Roll', price: '$4.25' },
                ],
              },
            ],
          },
        },
        {
          id: 'home-cta',
          type: 'cta-banner',
          data: {
            text: 'Open Mic Fridays · Latte Art Workshops · Neighborhood Book Swaps',
            linkText: 'See what\'s happening →',
            linkPage: 'events',
          },
        },
        footerSection,
      ],
    },

    // ---- Menu ----
    {
      id: 'menu',
      title: 'Menu – Downstreet Cafe',
      slug: 'menu',
      sections: [
        headerSection,
        {
          id: 'menu-hero-img',
          type: 'hero-fullwidth',
          data: {
            image: { src: '/images/downstreet/food-breakfast.png', alt: 'Overhead breakfast spread' },
            height: '300px',
          },
        },
        {
          id: 'menu-header',
          type: 'hero-simple',
          data: {
            heading: 'Our Menu',
            subtitle: 'Crafted with care, served with love',
          },
        },
        {
          id: 'menu-list',
          type: 'menu-list',
          data: {
            variant: 'cards',
            note: 'All coffee is roasted locally by Timber Ridge Roasters. Milk alternatives available for +$0.75.',
            categories: [
              {
                name: 'Coffee',
                items: [
                  { name: 'Espresso', price: '$3.50' },
                  { name: 'Americano', price: '$3.75' },
                  { name: 'Cappuccino', price: '$4.75' },
                  { name: 'Latte', price: '$5.00' },
                  { name: 'Flat White', price: '$5.00' },
                  { name: 'Mocha', price: '$5.50' },
                  { name: 'Pour Over', price: '$5.00' },
                  { name: 'Cold Brew', price: '$4.50' },
                  { name: 'Iced Latte', price: '$5.25' },
                  { name: 'Affogato', price: '$5.75' },
                ],
              },
              {
                name: 'Tea',
                items: [
                  { name: 'English Breakfast', price: '$3.00' },
                  { name: 'Earl Grey', price: '$3.00' },
                  { name: 'Green Tea', price: '$3.00' },
                  { name: 'Chamomile', price: '$3.00' },
                  { name: 'Chai Latte', price: '$4.75' },
                  { name: 'Matcha Latte', price: '$5.25' },
                  { name: 'Iced Tea', price: '$3.50' },
                ],
              },
              {
                name: 'Pastries',
                items: [
                  { name: 'Butter Croissant', price: '$3.25' },
                  { name: 'Almond Croissant', price: '$4.00' },
                  { name: 'Chocolate Croissant', price: '$3.75' },
                  { name: 'Banana Bread', price: '$3.50' },
                  { name: 'Blueberry Muffin', price: '$3.00' },
                  { name: 'Lemon Poppy Scone', price: '$3.50' },
                  { name: 'Cinnamon Roll', price: '$4.25' },
                  { name: 'Cookie (various)', price: '$2.50' },
                ],
              },
              {
                name: 'Breakfast',
                items: [
                  { name: 'Avocado Toast', price: '$9.00' },
                  { name: 'Egg &amp; Cheese Sandwich', price: '$7.50' },
                  { name: 'Granola Bowl', price: '$8.00' },
                  { name: 'Breakfast Burrito', price: '$9.50' },
                  { name: 'Overnight Oats', price: '$6.50' },
                  { name: 'Fruit &amp; Yogurt Parfait', price: '$7.00' },
                ],
              },
              {
                name: 'Lunch',
                items: [
                  { name: 'Grilled Cheese', price: '$8.50' },
                  { name: 'Turkey &amp; Brie Panini', price: '$10.50' },
                  { name: 'Caprese Sandwich', price: '$9.50' },
                  { name: 'Soup of the Day', price: '$6.00' },
                  { name: 'Garden Salad', price: '$7.50' },
                  { name: 'Grain Bowl', price: '$10.00' },
                  { name: 'Quiche (daily rotation)', price: '$8.00' },
                ],
              },
              {
                name: 'Other Drinks',
                items: [
                  { name: 'Fresh Squeezed OJ', price: '$4.50' },
                  { name: 'Lemonade', price: '$3.50' },
                  { name: 'Italian Soda', price: '$3.75' },
                  { name: 'Hot Chocolate', price: '$4.50' },
                  { name: 'Sparkling Water', price: '$2.50' },
                  { name: 'Kombucha (draft)', price: '$5.00' },
                ],
              },
            ],
          },
        },
        footerSection,
      ],
    },

    // ---- About ----
    {
      id: 'about',
      title: 'About – Downstreet Cafe',
      slug: 'about',
      sections: [
        headerSection,
        {
          id: 'about-hero-img',
          type: 'hero-fullwidth',
          data: {
            image: { src: '/images/downstreet/space-storefront.png', alt: 'View through café storefront window' },
            height: '340px',
          },
        },
        {
          id: 'about-story',
          type: 'content-prose',
          data: {
            heading: 'How It Started',
            maxWidth: '700px',
            body: `<p>Downstreet Cafe began in 2018 when partners Maya Chen and David Okafor decided that Riverside deserved a coffee shop that felt like a living room — warm, unhurried, and genuinely welcoming.</p>
<p>Maya spent a decade in specialty coffee in Portland, from barista to roaster to café manager. David brought his background in community organizing and a deep belief that small businesses can be neighborhood anchors. Together they found the old bookshop space on Maple Street, kept the original wood floors, and opened the doors.</p>
<p>Six years later, not much has changed about the feeling — just the number of regulars who call it home.</p>`,
          },
        },
        {
          id: 'about-values',
          type: 'content-cards',
          data: {
            heading: 'What We Believe In',
            cards: [
              {
                title: 'Local Sourcing',
                body: 'Our coffee is roasted by Timber Ridge Roasters, just 20 miles up the valley. Pastries come from Maple Lane Bakery. Produce is sourced from three local farms. We believe good food doesn\'t need to travel far.',
              },
              {
                title: 'Sustainability',
                body: 'Compostable cups and packaging, a zero single-use plastic policy, and a partnership with Riverside Community Compost. We\'re not perfect, but we\'re working on it every day.',
              },
              {
                title: 'Fair Wages',
                body: 'Every member of our team earns a living wage with benefits. We believe that taking care of our people is the foundation of everything else we do.',
              },
            ],
          },
        },
        {
          id: 'about-team',
          type: 'team-grid',
          data: {
            heading: 'Meet the Team',
            members: [
              {
                name: 'Maya Chen',
                role: 'Co-Owner &amp; Head Roaster',
                bio: 'Obsessed with pour-over technique and finding the perfect single origin. Always has a new blend in the works.',
                initials: 'M',
              },
              {
                name: 'David Okafor',
                role: 'Co-Owner &amp; Operations',
                bio: 'The one who makes sure everything runs smoothly. Knows every regular by name — and their order.',
                initials: 'D',
              },
              {
                name: 'Sophie Lam',
                role: 'Lead Barista',
                bio: 'Latte art champion and the friendliest face you\'ll see at 7 AM. Has been with us since day one.',
                initials: 'S',
              },
              {
                name: 'Jake Moreno',
                role: 'Kitchen Manager',
                bio: 'Turned our lunch menu from an afterthought into the reason half the neighborhood shows up at noon.',
                initials: 'J',
              },
            ],
          },
        },
        {
          id: 'about-community',
          type: 'content-prose',
          data: {
            heading: 'In the Community',
            background: true,
            maxWidth: '700px',
            body: `<p>We think a café should give back to the neighborhood that supports it. Here's what we're involved in:</p>
<ul>
  <li><strong>Open Mic Fridays</strong> — Local musicians, poets, and storytellers every Friday at 7 PM</li>
  <li><strong>Art Wall</strong> — Rotating exhibitions from Riverside artists, with pieces for sale</li>
  <li><strong>Coffee for a Cause</strong> — Every first Monday, all proceeds go to a local nonprofit</li>
  <li><strong>Study Hall Sundays</strong> — Free refills for students during exam season</li>
  <li><strong>Riverside Farmers Market</strong> — Find us at the Saturday market booth, May through October</li>
</ul>`,
          },
        },
        footerSection,
      ],
    },

    // ---- Events ----
    {
      id: 'events',
      title: 'Events – Downstreet Cafe',
      slug: 'events',
      sections: [
        headerSection,
        {
          id: 'events-header',
          type: 'hero-simple',
          data: {
            heading: 'Events',
            subtitle: 'What\'s happening at Downstreet',
          },
        },
        {
          id: 'events-recurring',
          type: 'event-recurring',
          data: {
            heading: 'Every Week at Downstreet',
            events: [
              {
                name: 'Open Mic Fridays',
                description: 'Every Friday, 7:00 – 9:30 PM. Sign-ups start at 6:30. All genres welcome — music, poetry, comedy, storytelling.',
              },
              {
                name: 'Study Hall Sundays',
                description: 'Every Sunday, 10 AM – 4 PM. Free refills on drip coffee for students. Extra outlets, quiet vibes.',
              },
              {
                name: 'Saturday Morning Vinyl',
                description: 'Every Saturday, 8 – 11 AM. We spin records from our collection. Bring your own to share.',
              },
              {
                name: 'Coffee for a Cause',
                description: 'First Monday of every month. 100% of proceeds go to a local nonprofit. This month: Riverside Youth Arts.',
              },
            ],
          },
        },
        {
          id: 'events-upcoming',
          type: 'event-list',
          data: {
            heading: 'Upcoming Events',
            subtitle: 'Mark your calendar — we\'d love to see you there',
            events: [
              {
                date: { month: 'Feb', day: '21', dow: 'Fri' },
                tag: 'Live Music',
                title: 'The Ponderosa Sessions',
                meta: '7:00 PM – 9:30 PM · Free',
                description: 'Local folk duo The Ponderosa Sessions bring their warm acoustic sound for an intimate evening set. Expect originals, classic covers, and good coffee. Seating is first-come, first-served — arrive early for the best spot by the window.',
              },
              {
                date: { month: 'Feb', day: '23', dow: 'Sun' },
                tag: 'Workshop',
                title: 'Latte Art 101',
                meta: '2:00 PM – 4:00 PM · $25 per person',
                description: 'Join lead barista Sophie Lam for a hands-on latte art workshop. Learn the basics of milk steaming, free-pour hearts and rosettas, and leave with skills to impress at home. All materials provided. Limited to 12 participants.',
              },
              {
                date: { month: 'Mar', day: '1', dow: 'Sat' },
                tag: 'Art',
                title: 'Art Wall Opening: "Morning Light" by Kenji Watanabe',
                meta: '5:00 PM – 8:00 PM · Free',
                description: 'Riverside watercolorist Kenji Watanabe debuts a new series of café and cityscape paintings inspired by early mornings in the neighborhood. Wine and light bites provided. Pieces available for purchase — 20% of sales support Riverside Arts Council.',
              },
              {
                date: { month: 'Mar', day: '8', dow: 'Sat' },
                tag: 'Tasting',
                title: 'Single Origin Tasting: Ethiopian Yirgacheffe',
                meta: '11:00 AM – 12:30 PM · $15 per person',
                description: 'Maya walks you through three preparations of the same Ethiopian Yirgacheffe — pour over, espresso, and cold brew. Explore how method changes flavor. Includes tasting notes card and a half-pound bag to take home.',
              },
              {
                date: { month: 'Mar', day: '15', dow: 'Sat' },
                tag: 'Community',
                title: 'Neighborhood Book Swap',
                meta: '10:00 AM – 2:00 PM · Free',
                description: 'Bring books you\'ve finished, take ones that catch your eye. No limit, no rules — just the honor system and good taste. We\'ll have a cozy reading corner set up and a special book-swap-day drink: the Paperback Mocha.',
              },
              {
                date: { month: 'Mar', day: '22', dow: 'Sat' },
                tag: 'Seasonal',
                title: 'Spring Menu Launch Party',
                meta: '4:00 PM – 7:00 PM · Free',
                description: 'We\'re unveiling our spring menu with new drinks, seasonal pastries, and a refreshed lunch lineup. Free samples of everything new. Live acoustic set by local guitarist Ana Reyes. First 50 guests get a Downstreet tote bag.',
              },
            ],
          },
        },
        footerSection,
      ],
    },

    // ---- Gallery ----
    {
      id: 'gallery',
      title: 'Gallery – Downstreet Cafe',
      slug: 'gallery',
      sections: [
        headerSection,
        {
          id: 'gallery-header',
          type: 'hero-simple',
          data: {
            heading: 'Gallery',
            subtitle: 'A peek inside Downstreet',
          },
        },
        {
          id: 'gallery-space',
          type: 'image-gallery',
          data: {
            heading: 'The Space',
            subtitle: 'Our corner of Maple Street',
            images: [
              { src: '/images/downstreet/hero-interior.png', alt: 'Morning light through the front windows', caption: 'Morning light through the front windows', size: 'featured' },
              { src: '/images/downstreet/space-tables.png', alt: 'Wooden tables and chairs', caption: 'Communal tables — morning light' },
              { src: '/images/downstreet/space-espresso-machine.png', alt: 'Espresso machine detail', caption: 'The espresso bar' },
              { src: '/images/downstreet/space-storefront.png', alt: 'View through storefront window', caption: 'View from Maple Street', size: 'wide' },
              { src: '/images/downstreet/space-reading-nook.png', alt: 'Cozy reading nook', caption: 'The reading nook' },
            ],
          },
        },
        {
          id: 'gallery-food',
          type: 'image-gallery',
          data: {
            heading: 'Food &amp; Drinks',
            subtitle: 'Made fresh, every single day',
            images: [
              { src: '/images/downstreet/latte-art.png', alt: 'Latte art close-up', caption: 'Sophie\'s signature rosetta', size: 'wide' },
              { src: '/images/downstreet/pastries.png', alt: 'Pastries on wooden board', caption: 'Fresh from Maple Lane Bakery' },
              { src: '/images/downstreet/food-breakfast.png', alt: 'Overhead breakfast spread', caption: 'The breakfast spread' },
              { src: '/images/downstreet/food-sandwich.png', alt: 'Turkey and brie panini', caption: 'Turkey &amp; brie panini' },
              { src: '/images/downstreet/food-coldbrew.png', alt: 'Cold brew pour', caption: 'Cold brew on tap' },
            ],
          },
        },
        {
          id: 'gallery-community',
          type: 'image-gallery',
          data: {
            heading: 'Community Moments',
            subtitle: 'The people who make this place special',
            images: [
              { src: '/images/downstreet/community-openmic.png', alt: 'Open mic night', caption: 'Open Mic Friday night' },
              { src: '/images/downstreet/community-artwall.png', alt: 'Art exhibition on brick wall', caption: 'Art wall opening — packed house', size: 'featured' },
              { src: '/images/downstreet/community-workshop.png', alt: 'Latte art workshop', caption: 'Latte art workshop group' },
            ],
          },
        },
        footerSection,
      ],
    },

    // ---- Order ----
    {
      id: 'order',
      title: 'Order Online – Downstreet Cafe',
      slug: 'order',
      sections: [
        headerSection,
        {
          id: 'order-menu',
          type: 'order-menu',
          data: {
            heading: 'Order Online',
            subtitle: 'Pickup in 15–20 minutes',
            pickupInfo: 'Ordering for pickup',
            pickupTime: '42 Maple Street · Open until 6:00 PM today',
            categories: [
              {
                name: 'Coffee',
                items: [
                  { name: 'Espresso', description: 'Double shot, rich and bold', price: '$3.50' },
                  { name: 'Americano', description: 'Espresso with hot water, smooth and clean', price: '$3.75' },
                  { name: 'Cappuccino', description: 'Equal parts espresso, steamed milk, foam', price: '$4.75' },
                  { name: 'Latte', description: 'Espresso with silky steamed milk', price: '$5.00' },
                  { name: 'Flat White', description: 'Velvety microfoam, double ristretto', price: '$5.00' },
                  { name: 'Mocha', description: 'Espresso, house chocolate, steamed milk, whipped cream', price: '$5.50' },
                  { name: 'Pour Over', description: 'Single origin, brewed to order — ask about today\'s beans', price: '$5.00' },
                  { name: 'Cold Brew', description: '24-hour steeped, smooth and naturally sweet', price: '$4.50' },
                  { name: 'Iced Latte', description: 'Espresso over ice with cold milk', price: '$5.25' },
                ],
              },
              {
                name: 'Tea',
                items: [
                  { name: 'Chai Latte', description: 'House-spiced chai with steamed milk', price: '$4.75' },
                  { name: 'Matcha Latte', description: 'Ceremonial grade matcha, oat milk', price: '$5.25' },
                  { name: 'English Breakfast', description: 'Classic black tea, served hot', price: '$3.00' },
                  { name: 'Earl Grey', description: 'Bergamot-infused black tea', price: '$3.00' },
                ],
              },
              {
                name: 'Pastries',
                items: [
                  { name: 'Butter Croissant', description: 'Flaky, golden, from Maple Lane Bakery', price: '$3.25' },
                  { name: 'Almond Croissant', description: 'Filled with almond cream, topped with sliced almonds', price: '$4.00' },
                  { name: 'Cinnamon Roll', description: 'Warm, gooey, cream cheese frosting', price: '$4.25' },
                  { name: 'Blueberry Muffin', description: 'Bursting with real blueberries, streusel top', price: '$3.00' },
                  { name: 'Banana Bread', description: 'Dense, moist, hint of cinnamon and walnut', price: '$3.50' },
                ],
              },
              {
                name: 'Lunch',
                items: [
                  { name: 'Turkey &amp; Brie Panini', description: 'Roasted turkey, brie, arugula, fig jam on sourdough', price: '$10.50' },
                  { name: 'Grilled Cheese', description: 'Sharp cheddar &amp; gruyère on thick-cut sourdough', price: '$8.50' },
                  { name: 'Grain Bowl', description: 'Farro, roasted vegetables, tahini, pickled onion, greens', price: '$10.00' },
                  { name: 'Soup of the Day', description: 'Rotating daily — ask what\'s on. Served with bread', price: '$6.00' },
                  { name: 'Avocado Toast', description: 'Smashed avocado, everything seasoning, radish, chili flake', price: '$9.00' },
                ],
              },
            ],
            sampleCart: {
              items: [
                { name: 'Cappuccino', qty: 1, price: '$4.75' },
                { name: 'Almond Croissant', qty: 2, price: '$8.00' },
                { name: 'Cold Brew', qty: 1, price: '$4.50' },
              ],
              subtotal: '$17.25',
              tax: '$1.38',
              total: '$18.63',
            },
          },
        },
        footerSection,
      ],
    },
  ],
}

// ---- Backward-compatible exports ----

export function homepage(themeCSS: string): string {
  return renderPage(siteData.pages[0], siteData, 'homepage', themeCSS, downstreetCSS, customRenderer)
}

export function menu(themeCSS: string): string {
  return renderPage(siteData.pages[1], siteData, 'menu', themeCSS, downstreetCSS, customRenderer)
}

export function about(themeCSS: string): string {
  return renderPage(siteData.pages[2], siteData, 'about', themeCSS, downstreetCSS, customRenderer)
}

export function events(themeCSS: string): string {
  return renderPage(siteData.pages[3], siteData, 'events', themeCSS, downstreetCSS, customRenderer)
}

export function gallery(themeCSS: string): string {
  return renderPage(siteData.pages[4], siteData, 'gallery', themeCSS, downstreetCSS, customRenderer)
}

export function order(themeCSS: string): string {
  return renderPage(siteData.pages[5], siteData, 'order', themeCSS, downstreetCSS, customRenderer)
}

export const pages: Record<string, { label: string; html: (css: string) => string }> = {
  homepage: { label: 'Home', html: homepage },
  menu: { label: 'Menu', html: menu },
  about: { label: 'About', html: about },
  events: { label: 'Events', html: events },
  gallery: { label: 'Gallery', html: gallery },
  order: { label: 'Order Online', html: order },
}
