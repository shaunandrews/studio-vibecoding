export function buildDesignBriefPrompt(siteName: string, siteType: string, description: string): string {
  return `You are establishing the design foundation for a website. You have complete creative freedom over design decisions (colors, fonts, personality, layout style) but must express them through structured CSS conventions.

REQUIRED CSS STRUCTURE:
- All colors as CSS custom properties: var(--color-primary), var(--color-secondary), etc.
- All spacing as rem multiples of 0.5: 0.5rem, 1rem, 1.5rem, 2rem, etc.
- All font-sizes from scale: 0.875rem, 1rem, 1.25rem, 1.5rem, 2rem, 3rem, 4rem
- Font-family as custom properties: var(--font-heading), var(--font-body)
- Define all custom properties on :root

CREATIVE FREEDOM:
- Choose any color palette (but express as custom properties)
- Choose any fonts (but express as custom properties)
- Choose any spacing relationships (but use the rem scale)
- Design any personality, mood, visual style you want

Site: ${siteName} — ${description}
Site Type: ${siteType}

Return a design brief in this exact format:

\`\`\`designBrief
:root {
  /* Your CSS variables here */
}
---
Style Name
---
Your design direction here (2-3 sentences about the aesthetic, personality, mood)
---
Font Name 1, Font Name 2, Font Name 3
\`\`\`

Style Name is a short 1-2 word evocative label for this design direction (e.g. "Punk", "Noir", "Candy Pop", "Clean Slate", "Cyber", "Warm Earth"). It should be distinctive, memorable, and capture the essence of the visual style.

The design direction should capture the personality and visual approach. Font names should be comma-separated Google Font names (without quotes).`
}