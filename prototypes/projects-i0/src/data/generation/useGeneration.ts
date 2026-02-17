import { ref, type Ref } from 'vue'
import Anthropic from '@anthropic-ai/sdk'
import { useSiteStore } from '../useSiteStore'
import { getAPIKey } from '../ai-service'
import type { DesignBrief, GenerationProgress, ReviewResult, GenerationEventCallback } from './types'
import type { Site, DesignSystem } from '../site-types'
import { buildDesignBriefPrompt } from './design-brief-prompt'
import { buildSectionPrompt } from './section-prompt'
import { buildExtractionPrompt } from './extraction-prompt'
import { buildReviewPrompt } from './review-prompt'

// ---- State ----

const progress: Ref<GenerationProgress> = ref({
  status: 'idle',
  briefReady: false,
  sectionsTotal: 0,
  sectionsComplete: 0,
  currentPage: '',
})

let abortController: AbortController | null = null
let anthropicClient: Anthropic | null = null

// ---- AI Client ----

function getAIClient(): Anthropic {
  if (!anthropicClient) {
    const apiKey = getAPIKey()
    if (!apiKey) {
      throw new Error('Anthropic API key not configured')
    }
    anthropicClient = new Anthropic({
      apiKey,
      dangerouslyAllowBrowser: true,
    })
  }
  return anthropicClient
}

// ---- Response Parsing ----

function parseDesignBrief(text: string): DesignBrief {
  const briefMatch = text.match(/```designBrief\s*([\s\S]*?)```/)
  if (!briefMatch || !briefMatch[1]) {
    throw new Error('Design brief not found in response')
  }

  const briefContent = briefMatch[1].trim()
  const parts = briefContent.split('---').map(p => p.trim())
  
  if (parts.length !== 3) {
    throw new Error('Design brief must have 3 parts separated by ---')
  }

  const cssVariables = parts[0]!
  const direction = parts[1]!
  const fontsStr = parts[2]!
  const fonts = fontsStr.split(',').map(f => f.trim())

  return {
    cssVariables,
    direction,
    fonts
  }
}

function parseSectionResponse(text: string, expectedSectionId: string): { css: string; html: string } {
  // Try exact format first: ```section:sectionId
  let sectionMatch = text.match(new RegExp(`\`\`\`section:${expectedSectionId}\\s*\\n([\\s\\S]*?)\`\`\``))

  // Fallback: any ```section:... block (AI might rename the section)
  if (!sectionMatch?.[1]) {
    sectionMatch = text.match(/```section:\S*\s*\n([\s\S]*?)```/)
  }

  // Fallback: ```css block followed by ```html block
  if (!sectionMatch?.[1]) {
    const cssMatch = text.match(/```css\s*\n([\s\S]*?)```/)
    const htmlMatch = text.match(/```html\s*\n([\s\S]*?)```/)
    if (cssMatch?.[1] && htmlMatch?.[1]) {
      return { css: cssMatch[1].trim(), html: htmlMatch[1].trim() }
    }
  }

  if (!sectionMatch?.[1]) {
    throw new Error(`Section ${expectedSectionId} not found in response`)
  }

  const sectionContent = sectionMatch[1].trim()

  // Split on --- separator, but be lenient — the separator might have
  // whitespace or extra dashes
  const separatorIndex = sectionContent.search(/\n-{3,}\n/)
  if (separatorIndex === -1) {
    // No separator — try to split on the first HTML tag
    const htmlStart = sectionContent.search(/<[a-zA-Z]/)
    if (htmlStart > 0) {
      return {
        css: sectionContent.slice(0, htmlStart).trim(),
        html: sectionContent.slice(htmlStart).trim(),
      }
    }
    throw new Error(`Section ${expectedSectionId} must have CSS and HTML separated by ---`)
  }

  const css = sectionContent.slice(0, separatorIndex).trim()
  const html = sectionContent.slice(separatorIndex).replace(/^[\s-]+/, '').trim()
  return { css, html }
}

function parseExtractedDesignSystem(text: string): DesignSystem {
  const jsonMatch = text.match(/```json\s*([\s\S]*?)```/)
  if (!jsonMatch || !jsonMatch[1]) {
    throw new Error('Design system JSON not found in response')
  }

  try {
    return JSON.parse(jsonMatch[1].trim())
  } catch (error) {
    throw new Error(`Invalid JSON in design system: ${error}`)
  }
}

function parseReviewResult(text: string): ReviewResult {
  const jsonMatch = text.match(/```json\s*([\s\S]*?)```/)
  if (!jsonMatch || !jsonMatch[1]) {
    throw new Error('Review result JSON not found in response')
  }

  try {
    return JSON.parse(jsonMatch[1].trim())
  } catch (error) {
    throw new Error(`Invalid JSON in review result: ${error}`)
  }
}

// ---- Generation Functions ----

async function generateDesignBrief(siteName: string, siteType: string, description: string): Promise<DesignBrief> {
  const client = getAIClient()
  const prompt = buildDesignBriefPrompt(siteName, siteType, description)

  const response = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 2048,
    messages: [{ role: 'user', content: prompt }],
  })

  const content = response.content[0]
  if (!content || content.type !== 'text') {
    throw new Error('Invalid response type from AI')
  }

  return parseDesignBrief(content.text)
}

async function generateSection(
  brief: DesignBrief,
  sectionRole: string,
  pageTitle: string,
  pageContext: string[]
): Promise<{ css: string; html: string }> {
  const client = getAIClient()
  const prompt = buildSectionPrompt(brief, sectionRole, pageTitle, pageContext)

  const response = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 3072,
    messages: [{ role: 'user', content: prompt }],
  })

  const content = response.content[0]
  if (!content || content.type !== 'text') {
    throw new Error('Invalid response type from AI')
  }

  return parseSectionResponse(content.text, sectionRole)
}

/**
 * Generate a section with one retry on failure.
 * The retry uses a stripped-down prompt to reduce format confusion.
 */
async function generateSectionWithRetry(
  brief: DesignBrief,
  sectionRole: string,
  pageTitle: string,
  pageContext: string[],
): Promise<{ css: string; html: string }> {
  try {
    return await generateSection(brief, sectionRole, pageTitle, pageContext)
  } catch (firstError) {
    console.warn(`[Gen] ${sectionRole} failed, retrying with simplified prompt:`, firstError)

    // Retry with a more explicit, stripped-down prompt
    const client = getAIClient()
    const retryPrompt = `Generate a ${sectionRole} section for "${pageTitle}".

Design variables: ${brief.cssVariables}
Fonts: ${brief.fonts.join(', ')}

Return ONLY this format, nothing else:

\`\`\`css
[data-section="${sectionRole}"] {
  /* your CSS */
}
\`\`\`

\`\`\`html
<!-- your HTML -->
\`\`\``

    const response = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 3072,
      messages: [{ role: 'user', content: retryPrompt }],
    })

    const content = response.content[0]
    if (!content || content.type !== 'text') {
      throw new Error('Invalid response type from AI on retry')
    }

    return parseSectionResponse(content.text, sectionRole)
  }
}

async function extractDesignSystem(allSectionCSS: string): Promise<DesignSystem> {
  const client = getAIClient()
  const prompt = buildExtractionPrompt(allSectionCSS)

  const response = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 4096,
    messages: [{ role: 'user', content: prompt }],
  })

  const content = response.content[0]
  if (!content || content.type !== 'text') {
    throw new Error('Invalid response type from AI')
  }

  return parseExtractedDesignSystem(content.text)
}

async function reviewCSS(allCSS: string, siteDescription: string): Promise<ReviewResult> {
  const client = getAIClient()
  const prompt = buildReviewPrompt(allCSS, siteDescription)

  const response = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 2048,
    messages: [{ role: 'user', content: prompt }],
  })

  const content = response.content[0]
  if (!content || content.type !== 'text') {
    throw new Error('Invalid response type from AI')
  }

  return parseReviewResult(content.text)
}

// ---- Main Generation Function ----

async function generateSite(
  projectId: string,
  siteName: string,
  siteType: string,
  description: string,
  pageConfigs: { title: string; slug: string; sectionRoles: string[] }[],
  onEvent?: GenerationEventCallback,
): Promise<void> {
  const siteStore = useSiteStore()
  
  try {
    // Reset progress
    progress.value = {
      status: 'brief',
      briefReady: false,
      sectionsTotal: 0,
      sectionsComplete: 0,
      currentPage: 'Generating design brief...',
    }

    // Setup abort controller
    abortController = new AbortController()

    // Calculate total sections
    const totalSections = pageConfigs.reduce((sum, page) => sum + page.sectionRoles.length, 0)
    progress.value.sectionsTotal = totalSections

    // Step 1: Generate design brief
    const brief = await generateDesignBrief(siteName, siteType, description)
    progress.value.briefReady = true
    onEvent?.({ type: 'brief-done', brief })

    // Initialize site structure
    const site: Site = {
      name: siteName,
      description,
      theme: {
        name: 'Generated Theme',
        variables: extractVariablesFromCSS(brief.cssVariables),
        fonts: brief.fonts,
      },
      sections: {},
      pages: pageConfigs.map(config => ({
        slug: config.slug,
        title: config.title,
        sections: config.sectionRoles.map(role =>
          config.slug === '/' ? role : `${config.slug.replace('/', '')}-${role}`
        ),
      })),
    }

    siteStore.setSite(projectId, site)

    // Step 2: Generate homepage sections in parallel
    progress.value.status = 'generating'
    const homepageConfig = pageConfigs.find(p => p.slug === '/') || pageConfigs[0]
    if (!homepageConfig) {
      throw new Error('No homepage configuration found')
    }
    progress.value.currentPage = homepageConfig.title
    onEvent?.({ type: 'page-start', pageTitle: homepageConfig.title })

    const failedSections: string[] = []

    const homepageSectionPromises = homepageConfig.sectionRoles.map(async (role) => {
      try {
        const { css, html } = await generateSectionWithRetry(brief, role, homepageConfig.title, [])

        siteStore.updateSection(projectId, role, html, css)
        progress.value.sectionsComplete += 1
        onEvent?.({ type: 'section-done', sectionId: role, pageSlug: homepageConfig.slug, sectionsComplete: progress.value.sectionsComplete, sectionsTotal: totalSections })

        return { role, css, html }
      } catch (error) {
        const msg = error instanceof Error ? error.message : 'Unknown error'
        console.error(`[Gen] Section ${role} failed after retry:`, msg)
        progress.value.sectionsComplete += 1
        failedSections.push(role)
        onEvent?.({ type: 'section-error', sectionId: role, error: msg })
        return null
      }
    })

    const homepageResults = await Promise.all(homepageSectionPromises)
    const homepageSections = homepageResults.filter((s): s is { role: string; css: string; html: string } => s !== null)

    // Step 3: Extract design system from homepage CSS (skip if no sections succeeded)
    if (homepageSections.length > 0) {
      progress.value.status = 'extracting'
      progress.value.currentPage = 'Analyzing design patterns...'
      onEvent?.({ type: 'extract-start' })

      try {
        const homepageCSS = homepageSections.map(s => s.css).join('\n\n')
        const designSystem = await extractDesignSystem(homepageCSS)
        const updatedSite = siteStore.getSite(projectId)
        if (updatedSite) {
          updatedSite.designSystem = designSystem
        }
      } catch (extractError) {
        console.warn('[Gen] Design system extraction failed, continuing:', extractError)
      }
    }

    // Step 4: Generate remaining pages in parallel
    const remainingPages = pageConfigs.filter(p => p.slug !== '/' && p !== homepageConfig)
    
    for (const pageConfig of remainingPages) {
      progress.value.currentPage = pageConfig.title
      onEvent?.({ type: 'page-start', pageTitle: pageConfig.title })

      const pageSectionPromises = pageConfig.sectionRoles.map(async (role) => {
        const sectionId = pageConfig.slug === '/' ? role : `${pageConfig.slug.replace('/', '')}-${role}`
        try {
          const contextInfo = [`Page: ${pageConfig.title}`, `Design system established`]
          const { css, html } = await generateSectionWithRetry(brief, role, pageConfig.title, contextInfo)

          siteStore.updateSection(projectId, sectionId, html, css)
          progress.value.sectionsComplete += 1
          onEvent?.({ type: 'section-done', sectionId, pageSlug: pageConfig.slug, sectionsComplete: progress.value.sectionsComplete, sectionsTotal: totalSections })

          return { role: sectionId, css, html }
        } catch (error) {
          const msg = error instanceof Error ? error.message : 'Unknown error'
          console.error(`[Gen] Section ${sectionId} failed after retry:`, msg)
          progress.value.sectionsComplete += 1
          failedSections.push(sectionId)
          onEvent?.({ type: 'section-error', sectionId, error: msg })
          return null
        }
      })

      await Promise.all(pageSectionPromises)
    }

    // Step 5: Review generated CSS (non-fatal)
    const allSections = Object.values(siteStore.getSite(projectId)?.sections || {})
    if (allSections.length > 0) {
      progress.value.status = 'reviewing'
      progress.value.currentPage = 'Final quality review...'

      try {
        const allCSS = allSections.map(s => s.css).join('\n\n')
        const reviewResult = await reviewCSS(allCSS, description)
        console.log('Review result:', reviewResult)
        if (!reviewResult.passed) {
          console.warn('Generated site has issues:', reviewResult.issues)
        }
      } catch (reviewError) {
        console.warn('[Gen] Review failed, continuing:', reviewError)
      }
    }

    // Complete
    progress.value.status = 'complete'
    progress.value.currentPage = 'Generation complete!'
    onEvent?.({ type: 'complete', failed: failedSections })

  } catch (error) {
    progress.value.status = 'error'
    progress.value.error = error instanceof Error ? error.message : 'Unknown error'
    onEvent?.({ type: 'error', error: progress.value.error })
    throw error
  }
}

// ---- Helper Functions ----

function extractVariablesFromCSS(cssText: string): Record<string, string> {
  const variables: Record<string, string> = {}
  
  // Extract :root block (multiline compatible)
  const rootMatch = cssText.match(/:root\s*\{([\s\S]*?)\}/)
  if (rootMatch && rootMatch[1]) {
    const rootContent = rootMatch[1]
    
    // Parse CSS variables
    const varRegex = /--([\w-]+):\s*([^;]+);/g
    let match
    while ((match = varRegex.exec(rootContent)) !== null) {
      if (match[1] && match[2]) {
        variables[`--${match[1]}`] = match[2].trim()
      }
    }
  }
  
  return variables
}

function abort(): void {
  if (abortController) {
    abortController.abort()
    abortController = null
  }
  
  progress.value.status = 'error'
  progress.value.error = 'Generation cancelled'
}

// ---- Export ----

export function useGeneration() {
  return {
    generateSite,
    progress,
    abort,
  }
}