import type { DesignBrief } from './types'

export function buildSectionPrompt(
  brief: DesignBrief, 
  sectionRole: string, 
  pageTitle: string, 
  pageContext: string[]
): string {
  return `You're building a section for ${pageTitle} using the established design foundation.

DESIGN BRIEF:
${brief.cssVariables}

DESIGN DIRECTION: ${brief.direction}
GOOGLE FONTS: ${brief.fonts.join(', ')}

Build this page section: ${sectionRole}

PAGE CONTEXT: ${pageContext.join(' • ')}

TECHNICAL REQUIREMENTS:
- CSS scoped to [data-section="${sectionRole}"] ONLY
- Use the established CSS custom properties from the design brief
- Follow the design direction and mood
- Express the section's content through the established visual language
- No global selectors (like bare h1, p, button) - all must be scoped
- Section-local variables can use --${sectionRole}-* naming pattern

CONTENT GUIDELINES:
- Create realistic, appropriate content for a ${sectionRole} section
- Match the content to the design direction personality
- Use semantic HTML structure
- Make content specific to the page context

Return the section in this exact format:

\`\`\`section:${sectionRole}
/* CSS scoped to [data-section="${sectionRole}"] */
[data-section="${sectionRole}"] {
  /* Your CSS here */
}
---
<!-- HTML content for the section -->
<div>Your HTML content here</div>
\`\`\``
}