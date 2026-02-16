import type { SiteData, Section } from '../sections/types'
import { renderPage } from '../sections/renderer'
import { renderBlogSection } from '../sections/sites/shauns-blog.renderers'
import { blogCSS } from '../sections/sites/shauns-blog.css'
import shaunsBlogTheme from '../themes/shauns-blog'

export const siteData: SiteData = {
  name: "Shaun's Blog",
  theme: shaunsBlogTheme,
  fonts: [],
  header: {
    id: 'header',
    type: 'header',
    data: {
      navItems: [
        { label: 'Home', page: 'homepage' },
        { label: 'About', page: 'about' },
        { label: 'Archive', page: 'archive' },
        { label: 'Projects', page: 'projects' },
      ],
    },
  },
  footer: {
    id: 'footer',
    type: 'footer',
    data: {
      address: '© 2026 Shaun Andrews. Powered by WordPress.',
      phone: '',
      email: '',
    },
  },
  pages: [
    // ---- Homepage ----
    {
      id: 'homepage',
      title: "Shaun's Blog",
      slug: 'homepage',
      sections: [
        {
          id: 'home-featured',
          type: 'blog-featured' as any,
          data: {
            label: 'Featured',
            title: 'The Future of Design Engineering',
            titlePage: 'post',
            date: 'February 10, 2026',
            excerpt: 'The line between design and engineering continues to blur. As tools become more capable and AI accelerates prototyping, the designers who thrive will be the ones who think in systems and ship real code. Here\u2019s what I\u2019ve learned building at that intersection.',
          } as any,
        },
        {
          id: 'home-posts',
          type: 'blog-post-list' as any,
          data: {
            heading: 'Recent Posts',
            posts: [
              {
                title: 'Why Design Systems Matter',
                date: 'February 5, 2026',
                excerpt: 'A design system isn\u2019t a component library \u2014 it\u2019s a shared language for building products.',
              },
              {
                title: 'Building at the Speed of Thought',
                date: 'January 28, 2026',
                excerpt: 'How rapid prototyping changed the way our team ships features.',
              },
              {
                title: 'Ten Years at Automattic',
                date: 'January 15, 2026',
                excerpt: 'Reflections on a decade of distributed work, open source, and the evolution of the web.',
              },
            ],
          } as any,
        },
      ],
    },

    // ---- Post: The Future of Design Engineering ----
    {
      id: 'post',
      title: "The Future of Design Engineering \u2014 Shaun's Blog",
      slug: 'post',
      sections: [
        {
          id: 'post-content',
          type: 'blog-post' as any,
          data: {
            backLabel: '\u2190 Back to home',
            backPage: 'homepage',
            title: 'The Future of Design Engineering',
            author: 'Shaun Andrews',
            date: 'February 10, 2026',
            readTime: '5 min read',
            body: `<p>For most of my career, there\u2019s been a clear line between \u201Cthe designer\u201D and \u201Cthe developer.\u201D You\u2019d design in one tool, hand off a spec, and hope that what came back looked something like what you intended. That workflow made sense when our tools were limited and the web was simpler. But that line has been dissolving for years now, and I think we\u2019ve finally reached the point where clinging to it holds us back more than it helps.</p>

    <p>Design engineering \u2014 the practice of working fluidly across design and code \u2014 isn\u2019t a new idea, but it\u2019s becoming a necessity. The products we build today are dynamic, interactive, and deeply systematic. You can\u2019t fully design a responsive layout in a static canvas. You can\u2019t communicate motion, state transitions, or the feel of an interaction through a PDF. The medium is the browser, and the most effective designers I know are the ones who work directly in it, or at least think in its terms.</p>

    <p>What\u2019s accelerated this shift is the tooling. Figma brought design closer to systems thinking. Component libraries gave us a shared vocabulary. And now AI is collapsing the gap even further \u2014 you can go from a rough concept to a working prototype in minutes. I\u2019ve been experimenting with AI-assisted workflows for the past year, and the biggest unlock isn\u2019t speed (though that\u2019s real). It\u2019s that prototyping becomes so cheap that you can explore ideas you\u2019d never have justified in the old workflow. You can try ten variations before lunch instead of debating one in a meeting.</p>

    <p>But tools alone don\u2019t make a design engineer. What matters is the mindset: a willingness to think in systems, to care about the user\u2019s experience <em>and</em> the developer\u2019s experience, to understand that the best design decisions often happen in code. It means being comfortable with ambiguity \u2014 knowing that the first implementation will teach you things the mockup never could. It means shipping, learning, and iterating instead of polishing pixels that nobody\u2019s interacted with yet.</p>

    <p>After ten-plus years building products at Automattic \u2014 across WordPress, Tumblr, and Gravatar \u2014 I keep coming back to the same conviction: the best work happens when you collapse the distance between imagining something and making it real. That\u2019s what design engineering is about. Not replacing designers or developers, but recognizing that the most impactful work lives at their intersection. The future belongs to the people who can think across that boundary.</p>`,
          } as any,
        },
      ],
    },

    // ---- About ----
    {
      id: 'about',
      title: "About \u2014 Shaun's Blog",
      slug: 'about',
      sections: [
        {
          id: 'about-heading',
          type: 'hero-simple',
          data: {
            heading: 'About',
          },
        },
        {
          id: 'about-intro',
          type: 'content-prose',
          data: {
            body: `<p>Hey, I\u2019m Shaun. I\u2019m a design engineer at <strong>Automattic</strong>, where I\u2019ve spent the last 10+ years working on products like WordPress, Tumblr, and Gravatar. I live at the intersection of design and code \u2014 I love the moment when an idea stops being abstract and starts being something you can click on, scroll through, and feel.</p>
<p>Most of my day is spent prototyping, building design systems, and figuring out how to make complex interfaces feel simple. I believe the best digital products come from people who care deeply about both how something looks and how it\u2019s built. I try to be one of those people.</p>
<p>Outside of work, I\u2019m usually tinkering with side projects, exploring new tools, or thinking about how the web platform keeps evolving. This blog is where I write about all of it \u2014 design, engineering, the tools I use, and the occasional reflection on what it means to build things for a living.</p>`,
          },
        },
        {
          id: 'about-currently',
          type: 'blog-info-list' as any,
          data: {
            heading: 'Currently',
            items: [
              { label: 'Working on', value: 'Design systems and prototyping tools at Automattic' },
              { label: 'Exploring', value: 'AI-assisted design workflows and generative UI' },
              { label: 'Reading', value: '\u201CA Philosophy of Software Design\u201D by John Ousterhout' },
              { label: 'Listening to', value: 'A lot of ambient and lo-fi while I work' },
            ],
          } as any,
        },
        {
          id: 'about-uses',
          type: 'blog-info-list' as any,
          data: {
            heading: 'What I Use',
            items: [
              { label: 'Editor', value: 'VS Code + Cursor' },
              { label: 'Design', value: 'Figma, plus the browser itself' },
              { label: 'Stack', value: 'TypeScript, React, Vue, WordPress' },
              { label: 'Hardware', value: 'MacBook Pro, Studio Display' },
              { label: 'Notes', value: 'Obsidian for everything' },
            ],
          } as any,
        },
      ],
    },

    // ---- Archive ----
    {
      id: 'archive',
      title: "Archive \u2014 Shaun's Blog",
      slug: 'archive',
      sections: [
        {
          id: 'archive-list',
          type: 'blog-archive' as any,
          data: {
            heading: 'Archive',
            months: [
              {
                label: 'February 2026',
                posts: [
                  {
                    title: 'The Future of Design Engineering',
                    page: 'post',
                    date: 'February 10, 2026',
                    excerpt: 'The line between design and engineering continues to blur. As tools become more capable and AI accelerates prototyping, the designers who thrive will be the ones who think in systems and ship real code.',
                    tags: ['design engineering', 'career', 'AI'],
                  },
                  {
                    title: 'The Case for Design Engineers',
                    page: 'post2',
                    date: 'February 7, 2026',
                    excerpt: 'Why the hybrid designer-developer role isn\u2019t a compromise \u2014 it\u2019s a superpower. A look at how design engineers ship better products, faster.',
                    tags: ['design engineering', 'roles', 'hiring'],
                  },
                  {
                    title: 'Why Design Systems Matter',
                    date: 'February 5, 2026',
                    excerpt: 'A design system isn\u2019t a component library \u2014 it\u2019s a shared language for building products. Here\u2019s why that distinction matters and how to get your team to care.',
                    tags: ['design systems', 'process'],
                  },
                ],
              },
              {
                label: 'January 2026',
                posts: [
                  {
                    title: 'Building at the Speed of Thought',
                    date: 'January 28, 2026',
                    excerpt: 'How rapid prototyping changed the way our team ships features. When the cost of trying something is near zero, you stop debating and start building.',
                    tags: ['prototyping', 'process', 'AI'],
                  },
                  {
                    title: 'Ten Years at Automattic',
                    date: 'January 15, 2026',
                    excerpt: 'Reflections on a decade of distributed work, open source, and the evolution of the web. What I\u2019ve learned, what I\u2019d do differently, and why I\u2019m still here.',
                    tags: ['Automattic', 'remote work', 'career'],
                  },
                  {
                    title: 'CSS Variables Changed How I Think About Theming',
                    date: 'January 8, 2026',
                    excerpt: 'Custom properties aren\u2019t just a convenience \u2014 they\u2019re a fundamentally different mental model for styling. Here\u2019s how I use them to build theme-aware components.',
                    tags: ['CSS', 'creative coding', 'theming'],
                  },
                ],
              },
              {
                label: 'December 2025',
                posts: [
                  {
                    title: 'The WordPress Block Editor, Three Years In',
                    date: 'December 18, 2025',
                    excerpt: 'Gutenberg has evolved dramatically since launch. A candid look at what\u2019s working, what\u2019s not, and where block-based editing is headed next.',
                    tags: ['WordPress', 'Gutenberg', 'blocks'],
                  },
                  {
                    title: 'My Creative Coding Setup for 2026',
                    date: 'December 5, 2025',
                    excerpt: 'Canvas, WebGL, and generative art \u2014 my tools, libraries, and workflow for creative coding side projects heading into the new year.',
                    tags: ['creative coding', 'tools', 'generative art'],
                  },
                ],
              },
              {
                label: 'November 2025',
                posts: [
                  {
                    title: 'Designing in the Browser Is Not a Shortcut',
                    date: 'November 22, 2025',
                    excerpt: 'It\u2019s not about skipping Figma. It\u2019s about working in the real medium. Why designing in code produces different (and often better) results.',
                    tags: ['design engineering', 'workflow'],
                  },
                  {
                    title: 'Remote Work Isn\u2019t About Location',
                    date: 'November 10, 2025',
                    excerpt: 'After a decade of distributed work, I\u2019ve realized the real advantage isn\u2019t working from anywhere \u2014 it\u2019s asynchronous communication and deep focus time.',
                    tags: ['remote work', 'Automattic', 'productivity'],
                  },
                  {
                    title: 'Building a WordPress Plugin with Modern JavaScript',
                    date: 'November 2, 2025',
                    excerpt: 'A walkthrough of building a WordPress plugin using React, the @wordpress/scripts toolchain, and the block editor APIs. Lessons learned from shipping real plugins.',
                    tags: ['WordPress', 'JavaScript', 'plugins'],
                  },
                ],
              },
              {
                label: 'October 2025',
                posts: [
                  {
                    title: 'Tokens, Variables, and the Language of Design',
                    date: 'October 15, 2025',
                    excerpt: 'Design tokens bridge the gap between design intent and code implementation. How we structured ours, and the naming conventions that actually stuck.',
                    tags: ['design tokens', 'design systems', 'CSS'],
                  },
                ],
              },
            ],
          } as any,
        },
      ],
    },

    // ---- Post 2: The Case for Design Engineers ----
    {
      id: 'post2',
      title: "The Case for Design Engineers \u2014 Shaun's Blog",
      slug: 'post2',
      sections: [
        {
          id: 'post2-content',
          type: 'blog-post' as any,
          data: {
            backLabel: '\u2190 Back to home',
            backPage: 'homepage',
            title: 'The Case for Design Engineers',
            author: 'Shaun Andrews',
            date: 'February 7, 2026',
            readTime: '8 min read',
            body: `<p>There\u2019s a role that keeps showing up in job postings, conference talks, and Twitter threads, but still doesn\u2019t have a universally agreed-upon definition: the <strong>design engineer</strong>. Some companies call it \u201CUX engineer.\u201D Others say \u201Ccreative technologist\u201D or \u201Cdesign technologist.\u201D The title varies, but the shape of the work is remarkably consistent: someone who moves fluidly between design and code, who can take a concept from sketch to shipped product without a handoff step in between.</p>

    <p>I\u2019ve been doing some version of this work for over a decade, and I want to make the case that this isn\u2019t a niche specialty or a transitional role \u2014 it\u2019s one of the most valuable positions on a product team. Here\u2019s why.</p>

    <h3>The Handoff Problem</h3>

    <p>Traditional product workflows look something like this: a designer creates mockups, writes specs, annotates edge cases, and hands them to an engineer. The engineer interprets the specs, builds the thing, and sends it back for review. The designer flags discrepancies. Repeat until everyone\u2019s exhausted or the deadline arrives, whichever comes first.</p>

    <p>This process isn\u2019t broken because the people are bad at their jobs. It\u2019s broken because <strong>design intent doesn\u2019t survive translation</strong>. A mockup is a static artifact. It can\u2019t capture how a 300ms ease-out curve feels versus a 200ms linear one. It can\u2019t show what happens when the user\u2019s name is 47 characters long, or when the API takes three seconds to respond, or when the viewport is exactly 834 pixels wide. These details \u2014 the ones that determine whether something feels polished or janky \u2014 only reveal themselves in the real medium: the browser.</p>

    <div class="pullquote">Design engineers don\u2019t eliminate the gap between design and engineering. They work inside it \u2014 and that\u2019s where the best product decisions happen.</div>

    <h3>What Design Engineers Actually Do</h3>

    <p>A design engineer\u2019s value isn\u2019t that they\u2019re \u201Ca designer who can code\u201D or \u201Ca developer with taste.\u201D It\u2019s that they can hold both concerns in their head simultaneously. When a design engineer builds a component, they\u2019re thinking about visual hierarchy <em>and</em> DOM structure, about spacing <em>and</em> performance, about the ideal interaction <em>and</em> what\u2019s achievable with CSS transitions versus what needs a JS animation library.</p>

    <p>Here\u2019s a concrete example. Say you\u2019re building a card component for a design system. A designer might spec it out with fixed content and three viewport sizes. A developer might build it to match those three screenshots. A design engineer would do something like this:</p>

    <pre><code>// A card that actually handles the real world
const Card = ({ title, excerpt, image, tags }) =&gt; (
  &lt;article className={styles.card}&gt;
    {image &amp;&amp; (
      &lt;div className={styles.media}&gt;
        &lt;img src={image} alt="" loading="lazy" /&gt;
      &lt;/div&gt;
    )}
    &lt;div className={styles.content}&gt;
      &lt;h3 className={styles.title}&gt;
        {title.length &gt; 80 ? title.slice(0, 77) + '\u2026' : title}
      &lt;/h3&gt;
      {excerpt &amp;&amp; &lt;p className={styles.excerpt}&gt;{excerpt}&lt;/p&gt;}
      {tags?.length &gt; 0 &amp;&amp; (
        &lt;div className={styles.tags}&gt;
          {tags.slice(0, 3).map(t =&gt; (
            &lt;span key={t} className={styles.tag}&gt;{t}&lt;/span&gt;
          ))}
          {tags.length &gt; 3 &amp;&amp; (
            &lt;span className={styles.more}&gt;+{tags.length - 3}&lt;/span&gt;
          )}
        &lt;/div&gt;
      )}
    &lt;/div&gt;
  &lt;/article&gt;
);</code></pre>

    <p>Notice the difference: the design engineer anticipates real-world content. Long titles get truncated gracefully. Images are optional, not assumed. Tags overflow is handled. The component is defensive without being over-engineered. This kind of thinking comes from living in both worlds.</p>

    <h3>Why This Matters Now More Than Ever</h3>

    <p>Two forces are making design engineers more important than ever. The first is <strong>AI-assisted development</strong>. When you can generate a working prototype from a description in minutes, the bottleneck shifts from \u201Ccan we build it?\u201D to \u201Cshould we build it, and does it feel right?\u201D Design engineers are uniquely positioned to evaluate AI-generated output because they understand both the design intent and the technical implications. They can tell you whether the generated code is actually good, not just whether it looks right in a screenshot.</p>

    <p>The second force is <strong>design systems at scale</strong>. As organizations adopt component libraries and design tokens, the work of maintaining consistency becomes deeply technical. You need people who understand why a 4px difference in padding matters <em>and</em> can implement a token system that prevents it. Design systems work that ignores the engineering reality produces beautiful documentation that nobody follows. Work that ignores design intent produces a component library that technically works but feels like a government form.</p>

    <h3>Building the Role Into Your Team</h3>

    <p>If you\u2019re a manager or team lead, here\u2019s my practical advice: don\u2019t create a \u201Cdesign engineering team\u201D in isolation. Embed design engineers on product teams, between design and engineering. Give them ownership of the space where intent becomes implementation \u2014 prototyping, component development, interaction design, and design system stewardship.</p>

    <p>If you\u2019re an individual contributor wondering whether to go deeper into design or engineering, my honest answer is: <strong>go deeper into both</strong>. Learn CSS Grid and animation well enough to prototype anything. Learn Figma well enough to communicate visually. Learn enough about accessibility to make it a habit, not an afterthought. You don\u2019t need to be an expert in everything. You need to be fluent enough to move fast and literate enough to collaborate with specialists.</p>

    <p>The best products I\u2019ve worked on \u2014 the ones that felt <em>right</em>, that users actually enjoyed using \u2014 were built by people who refused to stay in their lane. They sketched in code, questioned the mockup, pushed back on technical constraints that didn\u2019t need to exist, and celebrated the details that nobody asked for but everybody noticed. That\u2019s design engineering. That\u2019s the work worth doing.</p>`,
            tags: ['design engineering', 'roles', 'hiring', 'design systems', 'career'],
          } as any,
        },
      ],
    },

    // ---- Projects ----
    {
      id: 'projects',
      title: "Projects \u2014 Shaun's Blog",
      slug: 'projects',
      sections: [
        {
          id: 'projects-grid',
          type: 'blog-project-grid' as any,
          data: {
            heading: 'Projects',
            subtitle: 'Open source work, side projects, and things I\u2019ve built over the years.',
            projects: [
              {
                name: 'flavor',
                description: 'A minimal WordPress block theme built for personal blogs. Focuses on typography, whitespace, and reading experience. Supports full site editing and global styles with a small, opinionated set of design tokens.',
                tech: ['WordPress', 'PHP', 'Block Theme', 'CSS Custom Properties'],
                status: 'shipped' as const,
                linkLabel: 'GitHub \u2192',
              },
              {
                name: 'Studio',
                description: 'A visual design tool for WordPress themes. Edit colors, typography, spacing, and layout in real-time with a live preview. Generates valid theme.json and CSS custom properties. Built as an exploration of what theme editing could feel like.',
                tech: ['TypeScript', 'React', 'Vite', 'WordPress'],
                status: 'in-progress' as const,
                linkLabel: 'GitHub \u2192',
              },
              {
                name: 'Token Bridge',
                description: 'A CLI tool that converts design tokens from Figma\u2019s token format into CSS custom properties, theme.json values, and Sass variables. Supports multiple output targets with a single config file.',
                tech: ['Node.js', 'TypeScript', 'CLI', 'Design Tokens'],
                status: 'shipped' as const,
                linkLabel: 'npm \u2192',
              },
              {
                name: 'Gravity Forms UI Refresh',
                description: 'A WordPress plugin that modernizes the front-end rendering of Gravity Forms. Replaces the default markup with accessible, modern HTML and provides a clean CSS API for custom styling. Drop-in, no configuration required.',
                tech: ['WordPress', 'PHP', 'CSS', 'Accessibility'],
                status: 'shipped' as const,
                linkLabel: 'GitHub \u2192',
              },
              {
                name: 'Sketchbook',
                description: 'A personal creative coding playground. Generative art experiments, Canvas API explorations, and WebGL sketches. Each sketch is self-contained with its own controls and exportable as PNG or SVG.',
                tech: ['JavaScript', 'Canvas API', 'WebGL', 'Vite'],
                status: 'in-progress' as const,
                linkLabel: 'Live \u2192',
              },
              {
                name: 'wp-theme-utils',
                description: 'A collection of utility functions for WordPress block theme development. Includes helpers for responsive spacing, fluid typography, color manipulation, and theme.json generation. Used across several of my own themes.',
                tech: ['PHP', 'WordPress', 'Composer'],
                status: 'shipped' as const,
                linkLabel: 'GitHub \u2192',
              },
              {
                name: 'Distributed Design Playbook',
                description: 'A public handbook documenting best practices for running design teams in fully distributed companies. Covers async critiques, remote workshops, documentation-first culture, and tool recommendations.',
                tech: ['Markdown', 'MkDocs', 'Remote Work'],
                status: 'archived' as const,
                linkLabel: 'Read \u2192',
              },
              {
                name: 'Palette',
                description: 'A tiny web app for generating accessible color palettes. Input a brand color and get a full scale with WCAG contrast ratios calculated against light and dark backgrounds. Exports to CSS, Tailwind config, or Figma tokens.',
                tech: ['Svelte', 'TypeScript', 'Color Science'],
                status: 'shipped' as const,
                linkLabel: 'Live \u2192',
              },
            ],
          } as any,
        },
      ],
    },
  ],
}

// ---- Backward-compatible exports ----

const customRenderer = (section: Section) => renderBlogSection(section)

export function homepage(themeCSS: string): string {
  return renderPage(siteData.pages[0], siteData, 'homepage', themeCSS, blogCSS, customRenderer)
}

export function post(themeCSS: string): string {
  return renderPage(siteData.pages[1], siteData, 'post', themeCSS, blogCSS, customRenderer)
}

export function about(themeCSS: string): string {
  return renderPage(siteData.pages[2], siteData, 'about', themeCSS, blogCSS, customRenderer)
}

export function archive(themeCSS: string): string {
  return renderPage(siteData.pages[3], siteData, 'archive', themeCSS, blogCSS, customRenderer)
}

export function post2(themeCSS: string): string {
  return renderPage(siteData.pages[4], siteData, 'post2', themeCSS, blogCSS, customRenderer)
}

export function projects(themeCSS: string): string {
  return renderPage(siteData.pages[5], siteData, 'projects', themeCSS, blogCSS, customRenderer)
}

export const pages: Record<string, { label: string; html: (css: string) => string }> = {
  homepage: { label: 'Home', html: homepage },
  post: { label: 'Featured Post', html: post },
  about: { label: 'About', html: about },
  archive: { label: 'Archive', html: archive },
  post2: { label: 'Design Engineers', html: post2 },
  projects: { label: 'Projects', html: projects },
}
