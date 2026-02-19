export function buildExtractionPrompt(allSectionCSS: string): string {
  return `Analyze this CSS and extract a ROBUST design system. Be interpretive, not literal:

1. CONSOLIDATE similar values:
   - #2563eb and rgb(37, 99, 235) → same color, pick hex format
   - 3.5rem and 56px → same size (assuming 16px base), normalize to rem
   - 'Inter' and Inter → normalize to quoted format

2. INFER missing scale points:
   - Spacing: if you see 1rem, 1.5rem, 3rem → infer full scale: 0.5, 1, 1.5, 2, 2.5, 3
   - Typography: if you see headings at 2rem, 1.5rem → create complete h1-h6 scale

3. IDENTIFY reusable components:
   - Button patterns (normalize variants into one flexible component)
   - Card/container patterns  
   - Typography patterns that can generalize

4. NORMALIZE units and formats:
   - Convert px to rem where appropriate (assuming 16px base)
   - Standardize color formats to hex
   - Clean up font-family declarations

5. FLAG problems for regeneration:
   - Hardcoded values that should be CSS variables
   - Colors that fail contrast requirements
   - Components too section-specific to reuse
   - CSS conflicts or redundancies

Return a JSON object matching this structure:

\`\`\`json
{
  "colors": {
    "primary": "#2563eb",
    "secondary": "#64748b",
    "accent": "#f59e0b",
    "background": "#ffffff",
    "text": "#111827"
  },
  "typography": {
    "fonts": ["Inter", "Playfair Display"],
    "scale": {
      "xs": "0.75rem",
      "sm": "0.875rem", 
      "base": "1rem",
      "lg": "1.125rem",
      "xl": "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem"
    },
    "lineHeights": {
      "tight": "1.25",
      "normal": "1.5",
      "relaxed": "1.75"
    }
  },
  "spacing": {
    "unit": "rem",
    "scale": ["0.5rem", "1rem", "1.5rem", "2rem", "3rem", "4rem", "6rem", "8rem"]
  },
  "components": {
    "button": {
      "html": "<button class=\\"btn\\">Button</button>",
      "css": ".btn { padding: var(--spacing-2) var(--spacing-4); border-radius: 0.5rem; }",
      "variations": ["primary", "secondary", "outline"]
    },
    "card": {
      "html": "<div class=\\"card\\"><div class=\\"card-content\\">Content</div></div>",
      "css": ".card { background: var(--color-background); border-radius: 0.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }",
      "variations": ["default", "elevated"]
    }
  },
  "variables": {
    "--color-primary": "#2563eb",
    "--color-secondary": "#64748b",
    "--font-heading": "Playfair Display, serif",
    "--font-body": "Inter, sans-serif",
    "--spacing-1": "0.5rem",
    "--spacing-2": "1rem"
  }
}
\`\`\`

CSS to analyze:
${allSectionCSS}`
}