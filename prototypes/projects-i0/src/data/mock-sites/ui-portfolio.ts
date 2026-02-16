import type { SiteData } from '../sections/types'
import { renderPage } from '../sections/renderer'
import { renderPortfolioSection } from '../sections/sites/ui-portfolio.renderers'
import { portfolioCSS } from '../sections/sites/ui-portfolio.css'
import uiPortfolioTheme from '../themes/ui-portfolio'

const portfolioHeader = {
  id: 'nav',
  type: 'portfolio-header',
  data: {
    brand: 'Alex Chen',
    brandPage: 'homepage',
    navItems: [
      { label: 'Work', page: 'work' },
      { label: 'Process', page: 'process' },
      { label: 'Contact', page: 'contact' },
    ],
  },
}

const portfolioFooter = {
  id: 'footer',
  type: 'portfolio-footer',
  data: {
    copyright: '© 2026 Alex Chen',
    email: 'alex@alexchen.design',
  },
}

export const siteData: SiteData = {
  name: 'Alex Chen — UI/UX Designer',
  theme: uiPortfolioTheme,
  fonts: [],
  pages: [
    // ---- Homepage ----
    {
      id: 'homepage',
      title: 'Alex Chen — UI/UX Designer',
      slug: 'homepage',
      sections: [
        portfolioHeader,
        {
          id: 'home-intro',
          type: 'portfolio-intro',
          data: {
            greeting: 'Hello —',
            heading: "Hi, I'm Alex Chen",
            tagline: 'UI/UX Designer crafting digital experiences that are simple, purposeful, and human.',
          },
        },
        {
          id: 'home-work',
          type: 'project-grid',
          data: {
            heading: 'Selected Work',
            projects: [
              {
                title: 'Meridian Banking App',
                description: 'Reimagining personal finance for a mobile-first generation.',
                thumbColor: '#c7d2cb',
                linkPage: 'casestudy',
              },
              {
                title: 'Solstice Weather',
                description: 'A calm, beautiful weather app that respects your attention.',
                thumbColor: '#b8c5d6',
              },
              {
                title: 'Aura Health Dashboard',
                description: 'Making complex health data feel approachable and clear.',
                thumbColor: '#d6c7b8',
              },
              {
                title: 'Prism Design System',
                description: 'A unified design language for a growing product suite.',
                thumbColor: '#c4b8d6',
              },
            ],
          },
        },
        {
          id: 'home-about',
          type: 'about-brief',
          data: {
            heading: 'About',
            text: "I'm a product designer based in San Francisco with 8 years of experience building interfaces for startups and established brands. I believe great design disappears — it just feels right.",
          },
        },
        portfolioFooter,
      ],
    },

    // ---- Work ----
    {
      id: 'work',
      title: 'Work — Alex Chen',
      slug: 'work',
      sections: [
        portfolioHeader,
        {
          id: 'work-grid',
          type: 'project-grid-full',
          data: {
            heading: 'Work',
            subtitle: 'A curated selection of projects spanning mobile apps, web platforms, and design systems. Each one a story of turning complexity into clarity.',
            projects: [
              {
                title: 'Meridian Banking App',
                client: 'Meridian Financial',
                category: 'Mobile App',
                thumbColor: 'linear-gradient(135deg, #c7d2cb 0%, #8fa899 100%)',
                linkPage: 'casestudy',
                overlayText: 'View Case Study',
              },
              {
                title: 'Verdant',
                client: 'Verdant Inc.',
                category: 'Web Platform',
                thumbColor: 'linear-gradient(135deg, #a8d5ba 0%, #5b9279 100%)',
                linkPage: 'casestudy2',
                overlayText: 'View Case Study',
              },
              {
                title: 'Solstice Weather',
                client: 'Solstice Labs',
                category: 'Mobile App',
                thumbColor: 'linear-gradient(135deg, #b8c5d6 0%, #7a94b3 100%)',
              },
              {
                title: 'Aura Health Dashboard',
                client: 'Aura Health',
                category: 'Dashboard',
                thumbColor: 'linear-gradient(135deg, #d6c7b8 0%, #b8a48e 100%)',
              },
              {
                title: 'Prism Design System',
                client: 'Prism Studio',
                category: 'Design System',
                thumbColor: 'linear-gradient(135deg, #c4b8d6 0%, #9b89b8 100%)',
              },
              {
                title: 'Harvest Marketplace',
                client: 'Harvest Co.',
                category: 'Web Platform',
                thumbColor: 'linear-gradient(135deg, #f0c27f 0%, #d4945a 100%)',
              },
              {
                title: 'Cadence Fitness',
                client: 'Cadence Inc.',
                category: 'Mobile App',
                thumbColor: 'linear-gradient(135deg, #e8b4b8 0%, #c77d83 100%)',
              },
              {
                title: 'Nimbus Component Library',
                client: 'Nimbus Cloud',
                category: 'Design System',
                thumbColor: 'linear-gradient(135deg, #89CFF0 0%, #5B8DB8 100%)',
              },
            ],
          },
        },
        {
          id: 'work-filters',
          type: 'work-filters',
          data: {
            filters: ['All', 'Mobile App', 'Web Platform', 'Design System', 'Dashboard'],
            activeFilter: 'All',
          },
        },
        portfolioFooter,
      ],
    },

    // ---- Case Study: Meridian ----
    {
      id: 'casestudy',
      title: 'Meridian Banking App — Alex Chen',
      slug: 'casestudy',
      sections: [
        portfolioHeader,
        {
          id: 'cs1-hero',
          type: 'case-study-hero',
          data: {
            label: 'Case Study',
            title: 'Meridian Banking App',
            subtitle: 'Reimagining personal finance for a mobile-first generation — making money management feel intuitive, not intimidating.',
          },
        },
        {
          id: 'cs1-hero-image',
          type: 'case-study-image',
          data: {
            label: 'Hero — App Overview',
            gradient: 'linear-gradient(135deg, #c7d2cb 0%, #a8b9ad 100%)',
            height: '320px',
          },
        },
        {
          id: 'cs1-meta',
          type: 'case-study-meta',
          data: {
            items: [
              { label: 'Role', value: 'Lead Product Designer' },
              { label: 'Timeline', value: '12 Weeks' },
              { label: 'Team', value: '5 People' },
            ],
          },
        },
        {
          id: 'cs1-challenge',
          type: 'case-study-section',
          data: {
            heading: 'The Challenge',
            content: `<p>Meridian, a digital-first bank targeting millennials and Gen Z, was struggling with user retention. Their existing app felt like a spreadsheet — functional but lifeless. Users opened it to check balances and left immediately.</p>
  <p>The goal: transform the app from a utility into a daily companion that helps users build better financial habits, without sacrificing the trust and clarity that banking demands.</p>`,
          },
        },
        {
          id: 'cs1-research',
          type: 'case-study-section',
          data: {
            heading: 'Discovery & Research',
            content: `<p>I started by interviewing 24 users across three segments — students, early-career professionals, and freelancers. Key findings:</p>
  <ul>
    <li>78% felt anxious opening their banking app</li>
    <li>Users wanted to understand spending patterns, not just see transactions</li>
    <li>Trust was tied to visual clarity — cluttered screens felt "sketchy"</li>
    <li>Notifications were seen as nagging rather than helpful</li>
  </ul>`,
          },
        },
        {
          id: 'cs1-research-images',
          type: 'case-study-image-row',
          data: {
            images: [
              { label: 'Research Synthesis', gradient: 'linear-gradient(135deg, #e8ede9 0%, #c7d2cb 100%)' },
              { label: 'User Journey Map', gradient: 'linear-gradient(135deg, #dce3e0 0%, #b5c4ba 100%)' },
            ],
          },
        },
        {
          id: 'cs1-design',
          type: 'case-study-section',
          data: {
            heading: 'Design Process',
            content: `<h3>Information Architecture</h3>
  <p>I restructured the app around three core modes: Overview (how am I doing?), Activity (what happened?), and Goals (where am I going?). This replaced the flat tab-based navigation with a more intentional hierarchy.</p>

  <h3>Visual Language</h3>
  <p>We developed a warm, confident aesthetic — rounded cards with subtle depth, a muted earth-tone palette that felt calming rather than corporate, and generous whitespace that let numbers breathe.</p>

  <h3>Interaction Design</h3>
  <p>Micro-interactions became key to the experience. Smooth transitions between views, satisfying progress animations on savings goals, and gentle haptic feedback for confirmations. Every interaction reinforced the feeling of being in control.</p>`,
          },
        },
        {
          id: 'cs1-final-image',
          type: 'case-study-image',
          data: {
            label: 'Final UI — Dashboard & Activity Views',
            gradient: 'linear-gradient(135deg, #c7d2cb 0%, #9bb0a3 100%)',
          },
        },
        {
          id: 'cs1-detail-images',
          type: 'case-study-image-row',
          data: {
            images: [
              { label: 'Goals Screen', gradient: 'linear-gradient(135deg, #b8c9be 0%, #8fa899 100%)' },
              { label: 'Spending Insights', gradient: 'linear-gradient(135deg, #a8b9ad 0%, #89a090 100%)' },
            ],
          },
        },
        {
          id: 'cs1-solution',
          type: 'case-study-section',
          data: {
            heading: 'The Solution',
            content: `<p>The redesigned Meridian app centers around a personalized dashboard that greets users with a clear financial snapshot — not a wall of numbers, but a curated summary of what matters today. Spending insights are woven throughout, surfacing patterns in plain language rather than charts.</p>
  <p>The savings goals feature uses visual progress indicators and milestone celebrations, turning the often-dreaded act of saving into something genuinely rewarding.</p>`,
          },
        },
        {
          id: 'cs1-results',
          type: 'case-study-results',
          data: {
            heading: 'Results',
            introText: 'After launch, the numbers told a compelling story:',
            columns: 2,
            results: [
              { number: '+47%', description: 'Daily active users within 3 months' },
              { number: '+62%', description: 'Average session duration' },
              { number: '4.8★', description: 'App Store rating (up from 3.2)' },
              { number: '−31%', description: 'Support tickets related to navigation' },
            ],
          },
        },
        {
          id: 'cs1-reflection',
          type: 'case-study-section',
          data: {
            heading: 'Reflection',
            content: `<p>This project reinforced something I deeply believe: in fintech, empathy is a feature. Users don't just need to see their money — they need to feel okay about it. The biggest design wins weren't visual; they were emotional.</p>`,
          },
        },
        portfolioFooter,
      ],
    },

    // ---- Case Study: Verdant ----
    {
      id: 'casestudy2',
      title: 'Verdant — Sustainable Shopping Platform — Alex Chen',
      slug: 'casestudy2',
      sections: [
        portfolioHeader,
        {
          id: 'cs2-hero',
          type: 'case-study-hero',
          data: {
            label: 'Case Study',
            title: 'Verdant — Sustainable Shopping Platform',
            subtitle: 'Helping conscious consumers find, compare, and buy sustainable products without the guilt-trip or the guesswork.',
          },
        },
        {
          id: 'cs2-hero-image',
          type: 'case-study-image',
          data: {
            label: 'Hero — Platform Overview',
            gradient: 'linear-gradient(135deg, #a8d5ba 0%, #5b9279 100%)',
            height: '340px',
          },
        },
        {
          id: 'cs2-meta',
          type: 'case-study-meta',
          data: {
            items: [
              { label: 'Role', value: 'Lead Designer' },
              { label: 'Timeline', value: '16 Weeks' },
              { label: 'Team', value: '8 People' },
              { label: 'Platform', value: 'Web &amp; iOS' },
            ],
          },
        },
        {
          id: 'cs2-challenge',
          type: 'case-study-section',
          data: {
            heading: 'The Challenge',
            content: `<p>Verdant wanted to build an e-commerce platform for sustainable products — but the space was full of greenwashing, confusing eco-labels, and guilt-driven marketing. Shoppers didn't trust sustainability claims, and ethical brands struggled to stand out in a sea of vague "eco-friendly" tags.</p>
  <p>The brief: create a shopping experience that makes sustainability transparent, trustworthy, and — crucially — enjoyable. Not preachy. Not overwhelming. Just helpful.</p>`,
          },
        },
        {
          id: 'cs2-research',
          type: 'case-study-section',
          data: {
            heading: 'Research &amp; Discovery',
            content: `<h3>Understanding the Landscape</h3>
  <p>I conducted competitive analysis across 12 sustainable marketplaces and interviewed 30 consumers who'd tried eco-conscious shopping. The findings were revealing:</p>
  <ul>
    <li>84% of users distrusted "green" labels without third-party verification</li>
    <li>Average time to assess a product's sustainability: 4.2 minutes (vs. 30 seconds for price/reviews)</li>
    <li>67% abandoned carts when they couldn't verify environmental claims</li>
    <li>Users wanted to feel empowered, not lectured</li>
  </ul>
  <h3>Key Insight</h3>
  <p>People don't want to become sustainability experts. They want to make good choices quickly and feel confident about them. The design needed to do the heavy lifting — translating complex certifications and supply-chain data into instant, glanceable trust signals.</p>`,
          },
        },
        {
          id: 'cs2-research-images',
          type: 'case-study-image-row',
          data: {
            images: [
              { label: 'Affinity Mapping', gradient: 'linear-gradient(135deg, #d4edda 0%, #a8d5ba 100%)' },
              { label: 'User Personas', gradient: 'linear-gradient(135deg, #c3e6cb 0%, #82c99a 100%)' },
            ],
          },
        },
        {
          id: 'cs2-timeline',
          type: 'case-study-timeline',
          data: {
            heading: 'Project Timeline',
            phases: [
              { name: 'Discovery', duration: 'Weeks 1–3', color: '#5b9279' },
              { name: 'Design &amp; Prototype', duration: 'Weeks 4–9', color: '#7ab893' },
              { name: 'Test &amp; Iterate', duration: 'Weeks 10–13', color: '#9dd4ad' },
              { name: 'Ship &amp; Measure', duration: 'Weeks 14–16', color: '#b8e6c8' },
            ],
          },
        },
        {
          id: 'cs2-design',
          type: 'case-study-section',
          data: {
            heading: 'Design Approach',
            content: `<h3>The Sustainability Score</h3>
  <p>The centerpiece of the design: a clear, 0–100 "Impact Score" displayed on every product. Rather than throwing raw certifications at users, I designed an algorithm visualization that breaks sustainability into four pillars — Materials, Labor, Transport, and End-of-Life — each with a simple progress bar and plain-language summary.</p>
  <p>Users could tap into detail or trust the top-line number. Both paths were equally valid.</p>

  <h3>Visual Language</h3>
  <p>I developed a design language rooted in natural textures and warm greens — but avoided the cliché "leaf-and-earth" aesthetic. The palette is modern, almost editorial. Clean typography (Söhne for headings, Inter for body) signals credibility without feeling corporate. Product photography sits on soft gradient backgrounds, not busy lifestyle shots.</p>

  <h3>Smart Filtering</h3>
  <p>Traditional filters (price, category) were augmented with values-based filters: "Plastic-Free Packaging," "Living Wage Certified," "Carbon Neutral Shipping." These surface as gentle suggestions, not gatekeeping mechanisms — nudging rather than judging.</p>`,
          },
        },
        {
          id: 'cs2-detail-image',
          type: 'case-study-image',
          data: {
            label: 'Product Detail Page — Impact Score Breakdown',
            gradient: 'linear-gradient(135deg, #a8d5ba 0%, #5b9279 100%)',
          },
        },
        {
          id: 'cs2-ui-images',
          type: 'case-study-image-row',
          data: {
            images: [
              { label: 'Smart Filters UI', gradient: 'linear-gradient(135deg, #b8e6c8 0%, #7ab893 100%)' },
              { label: 'Collection Browsing', gradient: 'linear-gradient(135deg, #9dd4ad 0%, #6aab84 100%)' },
            ],
          },
        },
        {
          id: 'cs2-compare',
          type: 'case-study-compare',
          data: {
            heading: 'Before &amp; After',
            before: {
              heading: 'Before — Original Platform',
              html: `<div class="mock-heading">Product: Organic Cotton Tee</div>
        <div class="mock-row"><div class="mock-bar" style="width:60%;"></div></div>
        <div class="mock-text">✓ Eco-Friendly  ✓ Sustainable  ✓ Green</div>
        <div class="mock-row"><div class="mock-bar" style="width:80%;"></div></div>
        <div class="mock-row"><div class="mock-bar" style="width:45%;"></div></div>
        <div class="mock-text" style="margin-top:12px;">Certifications: FSC, GOTS, B-Corp, OEKO-TEX, Cradle to Cradle, Fair Trade, USDA Organic</div>
        <div class="mock-row"><div class="mock-bar" style="width:70%;"></div></div>
        <div class="mock-text" style="color:var(--theme-color-muted-light);font-style:italic;margin-top:8px;">Dense, unstructured, overwhelming. Users couldn't parse what mattered.</div>`,
            },
            after: {
              heading: 'After — Verdant Redesign',
              html: `<div class="mock-heading">Product: Organic Cotton Tee</div>
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px;">
          <div style="width:52px;height:52px;border-radius:50%;background:linear-gradient(135deg,#5b9279,#9dd4ad);display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:1.1rem;">87</div>
          <div><div style="font-weight:600;font-size:0.9rem;">Impact Score</div><div style="font-size:0.75rem;color:var(--theme-color-muted);">Excellent sustainability rating</div></div>
        </div>
        <div class="mock-text" style="font-weight:600;">Materials · 92/100</div>
        <div class="mock-row"><div class="mock-bar green" style="width:92%;"></div></div>
        <div class="mock-text" style="font-weight:600;">Labor · 88/100</div>
        <div class="mock-row"><div class="mock-bar green" style="width:88%;"></div></div>
        <div class="mock-text" style="font-weight:600;">Transport · 74/100</div>
        <div class="mock-row"><div class="mock-bar green" style="width:74%;"></div></div>
        <div class="mock-text" style="color:var(--theme-color-muted-light);font-style:italic;margin-top:8px;">Clear, scannable, trustworthy. One number, with depth on demand.</div>`,
            },
          },
        },
        {
          id: 'cs2-solution',
          type: 'case-study-section',
          data: {
            heading: 'The Solution',
            content: `<p>The final platform launched with three core experiences:</p>
  <ul>
    <li><strong>Browse with confidence</strong> — Every product carries its Impact Score front and center. No greenwashing hides behind the numbers.</li>
    <li><strong>Shop by values</strong> — Users set their priorities once (e.g., "I care most about labor practices") and the platform personalizes rankings accordingly.</li>
    <li><strong>Track your impact</strong> — A personal dashboard shows cumulative environmental impact of purchases: CO₂ saved, plastic avoided, fair-wage hours supported.</li>
  </ul>
  <p>The checkout flow includes a "Your Impact" summary — not to guilt-trip, but to celebrate the choices users are already making.</p>`,
          },
        },
        {
          id: 'cs2-dashboard-image',
          type: 'case-study-image',
          data: {
            label: 'Personal Impact Dashboard',
            gradient: 'linear-gradient(135deg, #7ab893 0%, #3d7a57 100%)',
          },
        },
        {
          id: 'cs2-results',
          type: 'case-study-results',
          data: {
            heading: 'Results',
            introText: 'Verdant launched in beta with 200 brands and 3,400 products. Within 8 weeks:',
            columns: 3,
            results: [
              { number: '+73%', description: 'Conversion rate vs. previous platform' },
              { number: '2.1×', description: 'Average session duration' },
              { number: '91%', description: 'Users said they trusted product claims' },
              { number: '−52%', description: 'Cart abandonment rate' },
              { number: '4.9★', description: 'Average app store rating' },
              { number: '68%', description: 'Users returned within 7 days' },
            ],
          },
        },
        {
          id: 'cs2-testimonial',
          type: 'case-study-testimonial',
          data: {
            quote: '"Alex didn\'t just redesign our platform — he reframed how we think about trust in sustainable commerce. The Impact Score alone changed our entire business model."',
            cite: '— Maya Torres, CEO, Verdant Inc.',
          },
        },
        {
          id: 'cs2-reflection',
          type: 'case-study-section',
          data: {
            heading: 'Reflection',
            content: `<p>This project taught me that transparency is a design material. The hardest challenge wasn't visual — it was deciding how much information to surface and when. Too little feels evasive; too much feels like a data dump. The sweet spot is progressive disclosure: give people a clear signal upfront, and let curiosity drive deeper exploration.</p>
  <p>Sustainability shouldn't require a PhD. Good design can bridge that gap.</p>`,
          },
        },
        portfolioFooter,
      ],
    },

    // ---- Process ----
    {
      id: 'process',
      title: 'Process — Alex Chen',
      slug: 'process',
      sections: [
        portfolioHeader,
        {
          id: 'process-hero',
          type: 'process-hero',
          data: {
            label: 'How I Work',
            heading: 'Design Process',
            subtitle: "Great design isn't magic — it's methodology. Here's how I turn ambiguity into interfaces that work, every time.",
          },
        },
        {
          id: 'process-phases',
          type: 'process-phases',
          data: {
            phases: [
              {
                number: '01',
                title: 'Discovery',
                subtitle: 'Understanding the problem space',
                paragraphs: [
                  "Every project starts with listening. I immerse myself in the business context, stakeholder goals, existing data, and competitive landscape. The goal isn't to form opinions — it's to form the right questions.",
                  'I run kickoff workshops, audit existing products, and align on success metrics before sketching a single screen.',
                ],
                meta: [
                  { label: 'Tools', tags: ['Miro', 'Notion', 'Google Docs'] },
                  { label: 'Deliverables', tags: ['Project brief', 'Stakeholder map', 'Competitive audit'] },
                ],
              },
              {
                number: '02',
                title: 'Research',
                subtitle: 'Talking to the humans who matter',
                paragraphs: [
                  'I conduct user interviews, contextual inquiries, and survey analysis to understand real behaviors — not assumed ones. I look for patterns in frustration, workarounds, and unspoken needs.',
                  "Research artifacts become the project's north star. Every design decision traces back to something a real person said or did.",
                ],
                meta: [
                  { label: 'Tools', tags: ['Dovetail', 'Maze', 'Zoom', 'Typeform'] },
                  { label: 'Deliverables', tags: ['User personas', 'Journey maps', 'Research report'] },
                ],
              },
              {
                number: '03',
                title: 'Ideate',
                subtitle: 'Exploring the solution space widely',
                paragraphs: [
                  'This is where I go broad. Sketches, wireframes, crazy-eights, "what if" explorations. I generate dozens of directions before narrowing. The ugly ideas often hide the best insights.',
                  'I involve engineers and stakeholders early — divergent thinking works best as a team sport.',
                ],
                meta: [
                  { label: 'Tools', tags: ['Pen & paper', 'Figma', 'FigJam'] },
                  { label: 'Deliverables', tags: ['Wireframes', 'Information architecture', 'Flow diagrams'] },
                ],
              },
              {
                number: '04',
                title: 'Prototype',
                subtitle: 'Making it real enough to learn from',
                paragraphs: [
                  "I build interactive prototypes at the right fidelity for the question at hand — sometimes a clickable Figma flow, sometimes a coded prototype for complex interactions. The point is to make the idea tangible enough to test.",
                  'This phase is where visual design and interaction design converge. Typography, spacing, motion, and micro-interactions all come together.',
                ],
                meta: [
                  { label: 'Tools', tags: ['Figma', 'Protopie', 'Framer', 'HTML/CSS'] },
                  { label: 'Deliverables', tags: ['Hi-fi mockups', 'Interactive prototype', 'Design specs'] },
                ],
              },
              {
                number: '05',
                title: 'Test',
                subtitle: 'Letting users prove us right (or wrong)',
                paragraphs: [
                  "I run moderated usability tests with 5–8 participants, measuring task completion, time-on-task, and qualitative feedback. I record sessions and create highlight reels for stakeholders — nothing builds alignment faster than watching a user struggle.",
                  "Testing isn't the end. It's a loop. Findings feed directly back into design iterations, sometimes multiple rounds before launch.",
                ],
                meta: [
                  { label: 'Tools', tags: ['Maze', 'Lookback', 'Hotjar'] },
                  { label: 'Deliverables', tags: ['Usability report', 'Iteration log', 'Highlight reel'] },
                ],
              },
              {
                number: '06',
                title: 'Ship',
                subtitle: 'Getting it into the world — and watching closely',
                paragraphs: [
                  'I work side-by-side with engineers during implementation, doing design QA and making real-time decisions as edge cases surface. I believe designers should stay involved until the last pixel ships.',
                  'Post-launch, I set up dashboards to track the metrics we defined in Discovery. The first two weeks of real usage data are worth more than months of prototyping.',
                ],
                meta: [
                  { label: 'Tools', tags: ['Linear', 'GitHub', 'Mixpanel', 'Figma'] },
                  { label: 'Deliverables', tags: ['Dev handoff', 'QA checklist', 'Launch metrics dashboard'] },
                ],
              },
            ],
          },
        },
        {
          id: 'process-principles',
          type: 'process-principles',
          data: {
            heading: 'Guiding Principles',
            principles: [
              {
                icon: '🎯',
                title: 'Clarity Over Cleverness',
                description: 'The best interface is one users never have to think about. I optimize for understanding, not impressiveness.',
              },
              {
                icon: '🤝',
                title: 'Collaborate Early',
                description: "Engineers, PMs, and stakeholders aren't reviewers — they're co-creators. I bring them in from day one.",
              },
              {
                icon: '📐',
                title: 'Systems Over Screens',
                description: 'Individual screens are moments. Design systems are multipliers. I build for scale from the start.',
              },
            ],
          },
        },
        {
          id: 'process-cta',
          type: 'process-cta',
          data: {
            badge: '● Currently available for freelance',
            heading: "Let's work together",
            subtitle: "I'm taking on select projects in fintech, health, sustainability, and developer tools. Short engagements or long-term partnerships — let's talk.",
            buttonText: 'Get in Touch',
            buttonPage: 'contact',
          },
        },
        portfolioFooter,
      ],
    },

    // ---- Contact ----
    {
      id: 'contact',
      title: 'About & Contact — Alex Chen',
      slug: 'contact',
      sections: [
        portfolioHeader,
        {
          id: 'contact-avatar',
          type: 'contact-avatar',
          data: {
            initials: 'AC',
            name: 'Alex Chen',
            title: 'Product Designer · San Francisco, CA',
          },
        },
        {
          id: 'contact-quote',
          type: 'contact-philosophy',
          data: {
            quote: '"Design should feel like a conversation — intuitive, respectful, and genuinely helpful."',
          },
        },
        {
          id: 'contact-philosophy-section',
          type: 'case-study-section',
          data: {
            heading: 'Design Philosophy',
            content: `<p>I approach every project with three principles: clarity over cleverness, empathy over assumption, and craft over speed. I believe the best interfaces are invisible — they get out of the way and let people accomplish what they came to do.</p>
  <p>My work sits at the intersection of visual design and systems thinking. I love building component libraries as much as I love pushing pixels on a hero screen. Both matter.</p>`,
          },
        },
        {
          id: 'contact-tools',
          type: 'contact-tools',
          data: {
            heading: 'Tools & Skills',
            tools: ['Figma', 'Framer', 'Protopie', 'HTML / CSS', 'React (basic)', 'Design Systems', 'User Research', 'Accessibility'],
          },
        },
        {
          id: 'contact-experience',
          type: 'contact-experience',
          data: {
            heading: 'Experience',
            items: [
              { role: 'Senior Product Designer', company: 'Meridian Financial', period: '2023 – Present' },
              { role: 'Product Designer', company: 'Solstice Labs', period: '2020 – 2023' },
              { role: 'UI Designer', company: 'Aura Health', period: '2018 – 2020' },
              { role: 'Junior Designer', company: 'Prism Studio', period: '2016 – 2018' },
            ],
          },
        },
        {
          id: 'contact-availability',
          type: 'contact-availability',
          data: {
            heading: 'Availability',
            badge: '● Available for freelance',
            text: "I'm currently taking on select freelance projects — particularly in fintech, health, and developer tools. I'm open to both short-term engagements (audits, redesigns) and longer product partnerships.",
          },
        },
        {
          id: 'contact-form',
          type: 'contact-form',
          data: {
            heading: 'Get in Touch',
            fields: [
              { label: 'Name', type: 'text', placeholder: 'Your name', halfWidth: true },
              { label: 'Email', type: 'email', placeholder: 'you@example.com', halfWidth: true },
              { label: 'Project type', type: 'text', placeholder: 'e.g. Mobile app redesign, Design system' },
              { label: 'Message', type: 'textarea', placeholder: 'Tell me about your project...' },
            ],
            submitText: 'Send Message',
          },
        },
        {
          id: 'contact-social',
          type: 'contact-social',
          data: {
            heading: 'Elsewhere',
            links: [
              { name: 'Dribbble', color: '#ea4c89' },
              { name: 'LinkedIn', color: '#0077b5' },
              { name: 'Twitter', color: '#1da1f2' },
              { name: 'GitHub', color: '#333' },
            ],
          },
        },
        portfolioFooter,
      ],
    },
  ],
}

// ---- Backward-compatible exports ----

export function homepage(themeCSS: string): string {
  return renderPage(siteData.pages[0], siteData, 'homepage', themeCSS, portfolioCSS, renderPortfolioSection)
}

export function work(themeCSS: string): string {
  return renderPage(siteData.pages[1], siteData, 'work', themeCSS, portfolioCSS, renderPortfolioSection)
}

export function casestudy(themeCSS: string): string {
  return renderPage(siteData.pages[2], siteData, 'casestudy', themeCSS, portfolioCSS, renderPortfolioSection)
}

export function casestudy2(themeCSS: string): string {
  return renderPage(siteData.pages[3], siteData, 'casestudy2', themeCSS, portfolioCSS, renderPortfolioSection)
}

export function process(themeCSS: string): string {
  return renderPage(siteData.pages[4], siteData, 'process', themeCSS, portfolioCSS, renderPortfolioSection)
}

export function contact(themeCSS: string): string {
  return renderPage(siteData.pages[5], siteData, 'contact', themeCSS, portfolioCSS, renderPortfolioSection)
}

export const pages: Record<string, { label: string; html: (css: string) => string }> = {
  homepage: { label: 'Home', html: homepage },
  work: { label: 'Work', html: work },
  casestudy: { label: 'Meridian Case Study', html: casestudy },
  casestudy2: { label: 'Verdant Case Study', html: casestudy2 },
  process: { label: 'Process', html: process },
  contact: { label: 'Contact', html: contact },
}
