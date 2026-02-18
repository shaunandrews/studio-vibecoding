interface TypeOverlay {
  composition: string
  typography: string
  colorMood: string
}

const TYPE_OVERLAYS: Record<string, TypeOverlay> = {
  'Business Site': {
    composition: 'Strong geometric grid fragments. Bold headline lockup with structured asymmetric blocks. Suggest corporate confidence through clean rectangles and decisive spacing.',
    typography: 'Authoritative headings — wide-set grotesque or sharp contemporary serif. The type should feel like a firm handshake.',
    colorMood: 'Confident and minimal. One strong accent against a neutral ground. No playfulness — this is a boardroom, not a playground.',
  },
  'Online Store': {
    composition: 'Card-like rectangular zones suggesting product tiles. Price-tag typography with intentional number styling. Stacked rectangles implying a browsable grid.',
    typography: 'Clear commercial hierarchy. Numbers and prices should feel intentional, not afterthoughts. Heading font should feel premium without being pretentious.',
    colorMood: 'High contrast accents for calls to action. Warm tones suggest luxury; cool tones suggest tech. The palette should make you want to buy something.',
  },
  'Blog': {
    composition: 'Editorial column proportions. Pull-quote typography rendered large and dramatic. Stacked horizontal text blocks like newspaper headlines at different scales.',
    typography: 'Literary and readable. The heading font should have editorial character — serifs are welcome here. Body font must invite long-form reading.',
    colorMood: 'Restrained and content-forward. Let the typography carry the personality. Background should recede; text is the star.',
  },
  'Portfolio': {
    composition: 'Asymmetric frame-like zones suggesting image placeholders. Dramatic whitespace as a deliberate compositional choice. Oversized type used as a graphic element, not just text.',
    typography: 'Expressive and artistic. The heading font should make a statement about the creator. This is someone\'s personal brand — it needs to feel curated.',
    colorMood: 'Either very minimal (near-monochrome with one accent) or bold and unapologetic. No middle ground — portfolios are about conviction.',
  },
  'Restaurant': {
    composition: 'Menu-like text arrangements with item-price alignment rhythms. Vertical text or monogram/wordmark as a graphic anchor. The tile should feel like you could frame it on the wall.',
    typography: 'Warm and inviting. The heading font should feel like the restaurant\'s signage — hand-painted for a bistro, neon for a diner, engraved for fine dining.',
    colorMood: 'Earthy and warm for casual spots. Dramatic and moody (dark backgrounds, candlelight accents) for upscale. The palette should make you hungry.',
  },
  'Agency': {
    composition: 'Bold, oversized type dominating the space. Geometric shapes as confident accents. The layout should feel like a pitch deck cover slide — minimal but impactful.',
    typography: 'Sharp, modern, slightly aggressive. The heading font should project competence and forward-thinking. No soft edges.',
    colorMood: 'High contrast, decisive. Often dark backgrounds with bright accents. The palette says "we know what we\'re doing."',
  },
  'Nonprofit': {
    composition: 'Banner-like horizontal strips with impactful headline and supporting subtext. Rounded or organic shapes that feel approachable. Human, not corporate.',
    typography: 'Approachable but serious. Trustworthy without being stiff. The heading font should feel like a cause worth believing in.',
    colorMood: 'Purposeful and warm. The palette should feel hopeful, not clinical. Greens, blues, earth tones are common but not mandatory.',
  },
  'Membership': {
    composition: 'Structured zones suggesting content tiers or access levels. Badge-like shapes and progress-bar-inspired horizontal elements. The tile should feel like a platform.',
    typography: 'Modern and systematic. Clear hierarchy that suggests organization and structure. The heading font should feel like a product, not a poster.',
    colorMood: 'Clean and systematic. The palette suggests clarity and value tiers. Professional but not cold.',
  },
  'Course': {
    composition: 'Structured layout suggesting learning modules or chapters. Step-numbered elements and card-like content zones. The tile should feel educational but exciting.',
    typography: 'Clear, inviting, authoritative. The heading font should make you want to learn. Body must be exceptionally readable — this is for long study sessions.',
    colorMood: 'Focused and motivating. Bright accents for progress and achievement. The palette should say "you can do this."',
  },
  'Event': {
    composition: 'Date and time typography used as a bold graphic element. Diagonal or rotated text creating energy and urgency. Ticket-stub geometry — torn edges, stamps, perforations suggested through shape.',
    typography: 'High energy and attention-grabbing. The heading font should feel like a concert poster or gallery opening invitation. Go big.',
    colorMood: 'Bold, high contrast, kinetic. The palette should create urgency and excitement. Neon on dark, or vibrant primaries.',
  },
}

const DEFAULT_OVERLAY: TypeOverlay = {
  composition: 'Asymmetric grid with bold headline and geometric framing. Versatile composition that adapts to the site\'s personality.',
  typography: 'Adapted from the site description and visual direction. The heading font should match the energy of what\'s being built.',
  colorMood: 'Derived from the mood and style input. Follow the client\'s lead.',
}

function getTypeOverlay(siteType: string): TypeOverlay {
  if (TYPE_OVERLAYS[siteType]) return TYPE_OVERLAYS[siteType]

  // Fuzzy match: check both directions (handles "store" matching "Online Store"
  // and "My Cool Restaurant" matching "Restaurant")
  const lower = siteType.toLowerCase()
  for (const [key, overlay] of Object.entries(TYPE_OVERLAYS)) {
    const keyLower = key.toLowerCase()
    if (lower.includes(keyLower) || keyLower.includes(lower)) return overlay
  }

  return DEFAULT_OVERLAY
}

function siteNameInstruction(siteType: string): string {
  const lower = siteType.toLowerCase()
  if (lower.includes('restaurant')) return 'Style it like signage — the name IS the brand.'
  if (lower.includes('blog')) return 'Style it like an editorial masthead.'
  if (lower.includes('event')) return 'Style it like a poster headline.'
  return 'Make it the dominant typographic element.'
}

export function buildDesignBriefPrompt(siteName: string, siteType: string, description: string, variation?: string, visualDirection?: string, inspiration?: string, previousBriefs?: string[]): string {
  const overlay = getTypeOverlay(siteType)

  const variationBlock = variation
    ? `\nCOLOR ANCHOR (hard constraint):\n${variation}`
    : ''

  const avoidanceBlock = previousBriefs?.length
    ? `\nAVOID THESE REJECTED DIRECTIONS:\n${previousBriefs.map((b, i) => `${i + 1}. ${b}`).join('\n')}\nDo NOT reuse their color palettes, fonts, or style names. Go in a completely different direction.`
    : ''

  return `You are a senior brand designer creating the visual identity for "${siteName}", a ${siteType}. ${description ? `The client describes it as: "${description}".` : ''}
${visualDirection ? `\nThe client wants it to feel: "${visualDirection}". This is their voice — let it drive your choices.` : ''}
${inspiration ? `\nThey admire these references: "${inspiration}". Study their visual language — color, type, spatial rhythm — and channel that sensibility into something original.` : ''}

DESIGN FOUNDATIONS — the non-negotiables:

Typography:
- Pair fonts from DIFFERENT classifications. Serif heading + sans body, slab + geometric, display + humanist. Two fonts from the same class creates "typographic mud" — too similar to contrast, too different to match.
- Display and decorative fonts are for headings ONLY. Body text gets a workhorse optimized for reading.
- Use a modular type scale. Each size step should be a consistent ratio jump — Perfect Fourth (\u00d71.333) for balanced hierarchy, Perfect Fifth (\u00d71.5) for bold drama. No arbitrary sizes that happen to "feel right."
- Centered text is not "clean" — it's the absence of a decision. Use it deliberately or not at all.

Color:
- One color dominates; the rest support. Equal distribution of 4-5 colors creates visual chaos.
- Background and text MUST have minimum 4.5:1 contrast ratio (WCAG AA).
- Use named color harmonies — analogous (serene, cohesive), complementary (high energy), split-complementary (contrast with easier harmony), triadic (vibrant, balanced). Not random picks.
- Saturated colors are accents, not backgrounds. Large saturated areas vibrate and fatigue the eye.
- Avoid pure black (#000000) on pure white (#ffffff). Warm or cool the extremes slightly — it's more sophisticated and easier on the eyes.

Composition:
- Asymmetry creates dynamic tension that guides the eye. Centered symmetry is static and passive.
- One dominant element per composition. The eye needs a clear entry point — without it, everything competes and nothing wins.
- Hierarchy through size contrast, not decoration. If everything is bold, nothing is. If everything is the same size, there is no hierarchy.
- Whitespace is a design element, not empty space. It's intentional, measured, and structural.
- "As little design as possible" — less, but better. (Dieter Rams)

NEVER DO THIS:
- More than 2 font families
- Two fonts from the same classification (e.g. two geometric sans-serifs)
- Decorative or script fonts for body text
- Center-aligning everything — it destroys the reading edge
- Making every element the same size and weight
- Using thin/light font weights for headings — they disappear
- Rainbow palettes with no dominant color
- Fonts that look almost-the-same-but-not-quite paired together

THIS SITE'S CHARACTER (${siteType}):

Composition direction: ${overlay.composition}

Typographic character: ${overlay.typography}

Color mood: ${overlay.colorMood}
${variationBlock}${avoidanceBlock}

FONT SELECTION — choose from high-quality Google Fonts:
- Great heading fonts: Playfair Display, Space Grotesk, Fraunces, Syne, DM Serif Display, Anybody, Instrument Serif, Bricolage Grotesque, Darker Grotesque, Outfit, Spectral, Cormorant Garamond, Libre Baskerville, Josefin Sans, Archivo Black, Climate Crisis, Unbounded, Gloock, Young Serif
- Great body fonts: Inter, DM Sans, Source Sans 3, Nunito Sans, Work Sans, Karla, Rubik, Plus Jakarta Sans, Manrope, Geist, Satoshi
- NEVER pick system-like fonts (Arial, Helvetica, Times New Roman, Georgia). Pick fonts with visible personality.
- The heading font carries the brand. The body font serves the content. They must contrast clearly.

OUTPUT FORMAT:

Return a design brief in this exact format:

\`\`\`designBrief
:root {
  --color-primary: /* main accent */;
  --color-secondary: /* supporting accent */;
  --color-bg: /* background */;
  --color-text: /* body text */;
  --color-muted: /* subtle/secondary text */;
  --color-surface: /* card/section backgrounds */;
  --color-border: /* borders and dividers */;
  --font-heading: /* heading font-family */;
  --font-body: /* body font-family */;
  --space-unit: /* base spacing unit, e.g. 0.5rem */;
}
---
Style Name
---
Design direction (2-3 sentences: aesthetic, personality, mood)
---
Heading Font Name, Body Font Name
\`\`\`

Style Name: a short 1-2 word evocative label (e.g. "Punk", "Noir", "Candy Pop", "Warm Earth", "Cyber"). Distinctive, memorable, captures the essence. Never the site name or site type.

ALSO return a style tile — a visual composition previewing the design direction. Rendered at 400\u00d7250px as a floating preview card.

\`\`\`styleTile
<style>
  .tile { /* position:relative; width:100%; height:100%; overflow:hidden */ }
  /* ALL styles scoped under .tile */
</style>
<div class="tile">
  <!-- your composition -->
</div>
\`\`\`

STYLE TILE RULES:
- This is a suggestive visual composition — not a wireframe, not a screenshot. Think mood board meets type specimen meets poster design. But it should hint at what this kind of site FEELS like.
- ${overlay.composition}
- Use the CSS variables from your :root block.
- Show "${siteName}" prominently, styled to match the site type. ${siteNameInstruction(siteType)}
- Be compositionally inventive. Use CSS transforms, clip-path, mix-blend-mode, gradients, rotations — but in service of the design, not as decoration.
- Asymmetry. Dynamic tension. One dominant element. Clear hierarchy. Apply the foundations.
- ~15 lines of HTML max. Pure CSS/HTML only — no <img> tags.
- Every tile MUST be a unique composition. Never repeat a layout pattern.`
}
