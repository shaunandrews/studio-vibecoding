import type { SiteData, Section } from '../sections/types'
import { renderPage } from '../sections/renderer'
import { renderFuegoSection } from '../sections/sites/fuego-collective.renderers'
import { fuegoCSS } from '../sections/sites/fuego-collective.css'
import fuegoCollectiveTheme from '../themes/fuego-collective'

// ---- Navigation data (shared across pages) ----

const navItems = [
  { label: 'Home', page: 'homepage' },
  { label: 'Shop', page: 'shop' },
  { label: 'Smoky Habanero', page: 'product' },
]

const footerData = {
  navItems,
  socials: [
    { label: 'Instagram', url: '#' },
    { label: 'TikTok', url: '#' },
    { label: 'Twitter', url: '#' },
  ],
  tagline: 'Small-batch hot sauce from Portland, OR',
  email: 'hello@fuegocollective.com',
  wpTagline: 'Made with WordPress',
}

// ---- SiteData ----

export const siteData: SiteData = {
  name: 'Fuego Collective',
  theme: fuegoCollectiveTheme,
  fonts: [],
  pages: [
    // ---- Homepage ----
    {
      id: 'homepage',
      title: 'Fuego Collective — Small Batch. Big Heat.',
      slug: 'homepage',
      sections: [
        {
          id: 'home-header',
          type: 'fuego-header',
          data: { navItems },
        },
        {
          id: 'home-hero',
          type: 'fuego-hero',
          data: {
            heading: 'Small Batch.<br/><span class="red">Big Heat.</span>',
            description: 'Handcrafted hot sauces made with fire-roasted peppers, real ingredients, and zero compromises.',
            image: { src: '/images/fuego/hero-bottle.png', alt: 'Smoky Habanero hot sauce bottle' },
            ctas: [
              { label: 'Shop Sauces', page: 'shop', variant: 'primary' },
              { label: 'Our #1 Seller', page: 'product', variant: 'outline' },
            ],
          },
        },
        {
          id: 'home-lineup',
          type: 'fuego-product-lineup',
          data: {
            heading: 'The Lineup',
            subtitle: 'Every bottle. Every batch. Made by hand.',
            products: [
              { name: 'Mango Habanero', image: { src: '/images/fuego/product-mango-habanero.png', alt: 'Mango Habanero hot sauce' }, heat: '🌶️🌶️🌶️', price: '$13' },
              { name: 'Chipotle Negro', image: { src: '/images/fuego/product-chipotle.png', alt: 'Chipotle Negro hot sauce' }, heat: '🌶️🌶️', price: '$12' },
              { name: 'Verde Fresco', image: { src: '/images/fuego/product-verde.png', alt: 'Verde Fresco hot sauce' }, heat: '🌶️🌶️', price: '$12' },
            ],
          },
        },
        {
          id: 'home-lifestyle',
          type: 'fuego-lifestyle',
          data: {
            heading: 'Made for Real Food',
            paragraphs: [
              'We don\'t make hot sauce for the shelf. We make it for the table — for tacos at midnight, eggs on Sunday morning, wings with friends, and everything in between.',
              'Every bottle starts with whole peppers, sourced from small farms. We roast, smoke, and blend in micro-batches so every drop has depth — not just heat.',
            ],
            image: { src: '/images/fuego/lifestyle-tacos.png', alt: 'Tacos drizzled with Fuego Collective hot sauce' },
            cta: { label: 'Explore All Sauces', page: 'shop' },
          },
        },
        {
          id: 'home-testimonials',
          type: 'fuego-testimonials',
          data: {
            heading: 'What the People Say',
            testimonials: [
              { stars: 5, quote: 'The Smoky Habanero is unreal. Complex, smoky, and the heat creeps up perfectly. I put it on literally everything.', author: 'Marcus T., Austin TX' },
              { stars: 5, quote: 'Finally, a hot sauce that tastes like actual peppers and not just vinegar. The Mango Habanero on fish tacos is *chef\'s kiss*.', author: 'Priya K., Portland OR' },
              { stars: 5, quote: 'Bought the 4-pack sampler. Now I\'m on a monthly subscription. The Verde Fresco is my everyday sauce. Can\'t go back to store-bought.', author: 'Jake R., Brooklyn NY' },
            ],
          },
        },
        {
          id: 'home-newsletter',
          type: 'fuego-newsletter',
          data: {
            heading: 'Join the Burn List',
            description: 'New drops, limited batches, and recipes. No spam — just heat.',
            placeholder: 'your@email.com',
            buttonLabel: 'Subscribe',
          },
        },
        {
          id: 'home-footer',
          type: 'fuego-footer',
          data: footerData,
        },
      ],
    },

    // ---- Shop ----
    {
      id: 'shop',
      title: 'Shop — Fuego Collective',
      slug: 'shop',
      sections: [
        {
          id: 'shop-header',
          type: 'fuego-header',
          data: { navItems },
        },
        {
          id: 'shop-page-header',
          type: 'fuego-page-header',
          data: {
            heading: 'Shop All Sauces',
            subtitle: 'Small batch. Handmade. Shipped to your door.',
          },
        },
        {
          id: 'shop-filters',
          type: 'fuego-filters',
          data: {
            label: 'Heat Level:',
            options: ['All', '🌶️ Mild', '🌶️🌶️ Medium', '🌶️🌶️🌶️ Hot', '🌶️🌶️🌶️🌶️ Extra Hot', '🌶️🌶️🌶️🌶️🌶️ Extreme'],
          },
        },
        {
          id: 'shop-grid',
          type: 'fuego-product-grid',
          data: {
            products: [
              { name: 'Smoky Habanero', image: { src: '/images/fuego/hero-bottle.png', alt: 'Smoky Habanero' }, heat: '🌶️🌶️🌶️🌶️', size: '5 oz', price: '$14', linkPage: 'product' },
              { name: 'Mango Habanero', image: { src: '/images/fuego/product-mango-habanero.png', alt: 'Mango Habanero' }, heat: '🌶️🌶️🌶️', size: '5 oz', price: '$13' },
              { name: 'Chipotle Negro', image: { src: '/images/fuego/product-chipotle.png', alt: 'Chipotle Negro' }, heat: '🌶️🌶️', size: '5 oz', price: '$12' },
              { name: 'Verde Fresco', image: { src: '/images/fuego/product-verde.png', alt: 'Verde Fresco' }, heat: '🌶️🌶️', size: '5 oz', price: '$12' },
              { name: 'Carolina Reaper', placeholder: 'linear-gradient(135deg,#8B0000,#FF4500)', heat: '🌶️🌶️🌶️🌶️🌶️', size: '5 oz', price: '$18' },
              { name: 'Ghost Pepper Garlic', placeholder: 'linear-gradient(135deg,#2F2F2F,#666)', heat: '🌶️🌶️🌶️🌶️🌶️', size: '5 oz', price: '$16' },
              { name: 'Pineapple Scorpion', placeholder: 'linear-gradient(135deg,#DAA520,#FF6347)', heat: '🌶️🌶️🌶️🌶️', size: '5 oz', price: '$15' },
              { name: 'Smoked Serrano', placeholder: 'linear-gradient(135deg,#8B4513,#CD853F)', heat: '🌶️🌶️🌶️', size: '5 oz', price: '$13' },
              { name: 'Everyday Jalapeño', placeholder: 'linear-gradient(135deg,#228B22,#90EE90)', heat: '🌶️', size: '5 oz', price: '$12' },
            ],
          },
        },
        {
          id: 'shop-footer',
          type: 'fuego-footer',
          data: footerData,
        },
      ],
    },

    // ---- Product Detail ----
    {
      id: 'product',
      title: 'Smoky Habanero — Fuego Collective',
      slug: 'product',
      sections: [
        {
          id: 'product-header',
          type: 'fuego-header',
          data: { navItems },
        },
        {
          id: 'product-breadcrumb',
          type: 'fuego-breadcrumb',
          data: {
            items: [
              { label: 'Home', page: 'homepage' },
              { label: 'Shop', page: 'shop' },
              { label: 'Smoky Habanero' },
            ],
          },
        },
        {
          id: 'product-detail',
          type: 'fuego-product-detail',
          data: {
            name: 'Smoky Habanero',
            image: { src: '/images/fuego/hero-bottle.png', alt: 'Smoky Habanero hot sauce bottle' },
            heatBadge: '🌶️🌶️🌶️🌶️ Hot',
            scoville: '~80,000 SHU · 5 oz bottle',
            price: '$14',
            description: [
              'Our flagship sauce. Hand-picked habaneros are fire-roasted over oak wood, then slow-blended with garlic, tomato, and a touch of brown sugar. The result is a rich, smoky heat that builds gradually — complex enough to sip, bold enough to drench.',
              'Every batch is made in our Portland kitchen using whole ingredients. No extracts. No fillers. No shortcuts.',
            ],
            ingredients: ['Habanero peppers', 'Tomato', 'Garlic', 'Apple cider vinegar', 'Brown sugar', 'Sea salt', 'Oak smoke'],
            pairings: ['🌮 Tacos & burritos', '🍗 Wings & grilled chicken', '🍳 Scrambled eggs', '🍕 Pizza (trust us)', '🥑 Avocado toast'],
          },
        },
        {
          id: 'product-related',
          type: 'fuego-related-products',
          data: {
            heading: 'You Might Also Like',
            products: [
              { name: 'Mango Habanero', image: { src: '/images/fuego/product-mango-habanero.png', alt: 'Mango Habanero' }, price: '$13' },
              { name: 'Chipotle Negro', image: { src: '/images/fuego/product-chipotle.png', alt: 'Chipotle Negro' }, price: '$12' },
              { name: 'Verde Fresco', image: { src: '/images/fuego/product-verde.png', alt: 'Verde Fresco' }, price: '$12' },
            ],
          },
        },
        {
          id: 'product-reviews',
          type: 'fuego-reviews',
          data: {
            heading: 'Reviews',
            reviews: [
              { stars: 5, body: 'This is the best hot sauce I\'ve ever had, and I\'ve tried hundreds. The smoke flavor is real — not that fake liquid smoke taste. It\'s got depth, heat, and just enough sweetness to keep you reaching for more. Absolutely destroyed a dozen wings with this last weekend.', author: 'DanTheHeatSeeker · Verified Purchase' },
              { stars: 5, body: 'I\'m a habanero purist and I was skeptical about the "smoky" angle. But wow — the oak-roasting really transforms the pepper. You get the fruity habanero flavor up front, then the smoke kicks in mid-palate, and the heat lingers beautifully. Restaurant-quality sauce in a bottle.', author: 'SauceBoss_Maria · Verified Purchase' },
              { stars: 4, body: 'Great flavor, amazing on eggs and tacos. Only reason for 4 stars is I wish the bottle was bigger — 5oz goes FAST when you\'re putting it on everything. Already ordered the 3-pack. Heat level is perfect: noticeable but you can still taste your food.', author: 'ChileHead_PDX · Verified Purchase' },
            ],
          },
        },
        {
          id: 'product-footer',
          type: 'fuego-footer',
          data: footerData,
        },
      ],
    },
  ],
}

// ---- Backward-compatible exports ----

function render(pageIndex: number, activePage: string) {
  return (themeCSS: string): string =>
    renderPage(siteData.pages[pageIndex], siteData, activePage, themeCSS, fuegoCSS, renderFuegoSection)
}

export function homepage(themeCSS: string): string {
  return render(0, 'homepage')(themeCSS)
}

export function shop(themeCSS: string): string {
  return render(1, 'shop')(themeCSS)
}

export function product(themeCSS: string): string {
  return render(2, 'product')(themeCSS)
}

export const pages: Record<string, { label: string; html: (css: string) => string }> = {
  homepage: { label: 'Home', html: homepage },
  shop: { label: 'Shop', html: shop },
  product: { label: 'Smoky Habanero', html: product },
}
