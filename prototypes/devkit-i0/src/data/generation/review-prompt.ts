export function buildReviewPrompt(allCSS: string, siteDescription: string): string {
  return `Review the generated website CSS for technical quality. This is for: ${siteDescription}

Validate these criteria:

1. CSS SYNTAX: Valid CSS with no syntax errors or unknown properties
   Check: CSS parses without errors, all properties are valid

2. COLOR CONTRAST: Text meets WCAG AA contrast requirements (4.5:1 minimum)
   Check: All text/background combinations, flag failures with specific ratios

3. HEADING STRUCTURE: Proper semantic heading hierarchy (h1 → h2 → h3, no skips)
   Check: Each page has one h1, headings follow logical order

4. CASCADE CONFLICTS: No CSS conflicts between sections
   Check: Scoping rules followed, no global selectors from sections

5. REASONABLE SIZE: CSS and HTML size within reasonable limits
   Check: Total CSS < 100KB, HTML sections not excessively verbose

Rate each section: PASS / FAIL (no warnings, just binary)
For FAIL, provide specific fix instructions.

Return JSON in this exact format:

\`\`\`json
{
  "passed": true,
  "issues": [
    {
      "section": "hero",
      "severity": "fail",
      "description": "h1 color #999 on #ccc background fails contrast (2.1:1)",
      "fix": "Use --color-primary instead of #999 for better contrast"
    },
    {
      "section": "about", 
      "severity": "warn",
      "description": "CSS size is large (15KB) due to redundant rules",
      "fix": "Consolidate duplicate margin/padding declarations"
    }
  ]
}
\`\`\`

CSS to review:
${allCSS}`
}