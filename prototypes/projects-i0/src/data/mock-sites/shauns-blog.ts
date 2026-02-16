export function homepage(themeCSS: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Shaun's Blog</title>
<style>${themeCSS}</style>
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: var(--theme-font-body); color: var(--theme-text); background: var(--theme-bg); line-height: var(--theme-line-height-normal); }

header { max-width: var(--theme-content-width); margin: 0 auto; padding: var(--theme-space-5) var(--theme-space-3) 0; display: flex; align-items: baseline; justify-content: space-between; flex-wrap: wrap; gap: var(--theme-space-2); }
header h1 { font-size: 1.5rem; font-weight: 700; font-family: var(--theme-font-heading); }
header nav { display: flex; gap: var(--theme-space-3); }
header nav a { color: var(--theme-text); text-decoration: none; font-size: 0.9rem; }
header nav a:hover { color: var(--theme-color-primary); }

main { max-width: var(--theme-content-width); margin: 0 auto; padding: var(--theme-space-6) var(--theme-space-3); }

.featured { border-bottom: 1px solid var(--theme-color-border); padding-bottom: var(--theme-space-5); margin-bottom: var(--theme-space-5); }
.featured .label { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.08em; color: var(--theme-color-primary); font-weight: 600; margin-bottom: var(--theme-space-1); }
.featured h2 { font-size: var(--theme-font-size-xlarge); font-weight: 700; margin-bottom: var(--theme-space-1); font-family: var(--theme-font-heading); }
.featured h2 a { color: inherit; text-decoration: none; }
.featured h2 a:hover { color: var(--theme-color-primary); }
.featured .date { font-size: 0.85rem; color: var(--theme-color-muted); margin-bottom: 12px; }
.featured .excerpt { font-size: 1.05rem; color: var(--theme-color-body-text); }

.posts h3 { font-size: var(--theme-font-size-small); text-transform: uppercase; letter-spacing: 0.08em; color: var(--theme-color-muted); margin-bottom: 20px; }
.post-item { padding: 20px 0; border-bottom: 1px solid var(--theme-color-border-light); }
.post-item:first-of-type { border-top: 1px solid var(--theme-color-border-light); }
.post-item a { font-size: var(--theme-font-size-large); font-weight: 600; color: var(--theme-text); text-decoration: none; }
.post-item a:hover { color: var(--theme-color-primary); }
.post-item .meta { font-size: 0.85rem; color: var(--theme-color-muted); margin-top: 4px; }
.post-item .meta .excerpt { color: var(--theme-color-muted); }

footer { max-width: var(--theme-content-width); margin: 0 auto; padding: var(--theme-space-5) var(--theme-space-3); font-size: var(--theme-font-size-small); color: var(--theme-color-muted-light); border-top: 1px solid var(--theme-color-border); }
</style>
</head>
<body>

<header>
  <h1>Shaun's Blog</h1>
  <nav>
    <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'homepage'},'*');return false">Home</a>
    <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'about'},'*');return false">About</a>
    <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'archive'},'*');return false">Archive</a>
    <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'projects'},'*');return false">Projects</a>
  </nav>
</header>

<main>
  <article class="featured">
    <div class="label">Featured</div>
    <h2><a href="#" onclick="window.parent.postMessage({type:'navigate',page:'post'},'*');return false">The Future of Design Engineering</a></h2>
    <div class="date">February 10, 2026</div>
    <p class="excerpt">The line between design and engineering continues to blur. As tools become more capable and AI accelerates prototyping, the designers who thrive will be the ones who think in systems and ship real code. Here's what I've learned building at that intersection.</p>
  </article>

  <div class="posts">
    <h3>Recent Posts</h3>
    <div class="post-item">
      <a href="#">Why Design Systems Matter</a>
      <div class="meta">February 5, 2026 · <span class="excerpt">A design system isn't a component library — it's a shared language for building products.</span></div>
    </div>
    <div class="post-item">
      <a href="#">Building at the Speed of Thought</a>
      <div class="meta">January 28, 2026 · <span class="excerpt">How rapid prototyping changed the way our team ships features.</span></div>
    </div>
    <div class="post-item">
      <a href="#">Ten Years at Automattic</a>
      <div class="meta">January 15, 2026 · <span class="excerpt">Reflections on a decade of distributed work, open source, and the evolution of the web.</span></div>
    </div>
  </div>
</main>

<footer>
  <p>&copy; 2026 Shaun Andrews. Powered by WordPress.</p>
</footer>

</body>
</html>`
}

export function post(themeCSS: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>The Future of Design Engineering — Shaun's Blog</title>
<style>${themeCSS}</style>
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: var(--theme-font-body); color: var(--theme-text); background: var(--theme-bg); line-height: var(--theme-line-height-normal); }

header { max-width: var(--theme-content-width); margin: 0 auto; padding: var(--theme-space-5) var(--theme-space-3) 0; display: flex; align-items: baseline; justify-content: space-between; flex-wrap: wrap; gap: var(--theme-space-2); }
header h1 { font-size: 1.5rem; font-weight: 700; font-family: var(--theme-font-heading); }
header nav { display: flex; gap: var(--theme-space-3); }
header nav a { color: var(--theme-text); text-decoration: none; font-size: 0.9rem; }
header nav a:hover { color: var(--theme-color-primary); }

main { max-width: var(--theme-content-width); margin: 0 auto; padding: var(--theme-space-6) var(--theme-space-3); }

.back { display: inline-block; font-size: 0.85rem; color: var(--theme-color-primary); text-decoration: none; margin-bottom: var(--theme-space-4); }
.back:hover { text-decoration: underline; }

article h2 { font-size: var(--theme-font-size-hero); font-weight: 700; margin-bottom: 12px; line-height: var(--theme-line-height-tight); font-family: var(--theme-font-heading); }
.byline { font-size: 0.85rem; color: var(--theme-color-muted); margin-bottom: var(--theme-space-5); }
.byline strong { color: var(--theme-text); }

article p { font-size: 1.05rem; color: var(--theme-color-body-text); margin-bottom: var(--theme-space-3); }

footer { max-width: var(--theme-content-width); margin: 0 auto; padding: var(--theme-space-5) var(--theme-space-3); font-size: var(--theme-font-size-small); color: var(--theme-color-muted-light); border-top: 1px solid var(--theme-color-border); }
</style>
</head>
<body>

<header>
  <h1>Shaun's Blog</h1>
  <nav>
    <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'homepage'},'*');return false">Home</a>
    <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'about'},'*');return false">About</a>
    <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'archive'},'*');return false">Archive</a>
    <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'projects'},'*');return false">Projects</a>
  </nav>
</header>

<main>
  <a href="#" class="back" onclick="window.parent.postMessage({type:'navigate',page:'homepage'},'*');return false">← Back to home</a>

  <article>
    <h2>The Future of Design Engineering</h2>
    <div class="byline"><strong>Shaun Andrews</strong> · February 10, 2026 · 5 min read</div>

    <p>For most of my career, there's been a clear line between "the designer" and "the developer." You'd design in one tool, hand off a spec, and hope that what came back looked something like what you intended. That workflow made sense when our tools were limited and the web was simpler. But that line has been dissolving for years now, and I think we've finally reached the point where clinging to it holds us back more than it helps.</p>

    <p>Design engineering — the practice of working fluidly across design and code — isn't a new idea, but it's becoming a necessity. The products we build today are dynamic, interactive, and deeply systematic. You can't fully design a responsive layout in a static canvas. You can't communicate motion, state transitions, or the feel of an interaction through a PDF. The medium is the browser, and the most effective designers I know are the ones who work directly in it, or at least think in its terms.</p>

    <p>What's accelerated this shift is the tooling. Figma brought design closer to systems thinking. Component libraries gave us a shared vocabulary. And now AI is collapsing the gap even further — you can go from a rough concept to a working prototype in minutes. I've been experimenting with AI-assisted workflows for the past year, and the biggest unlock isn't speed (though that's real). It's that prototyping becomes so cheap that you can explore ideas you'd never have justified in the old workflow. You can try ten variations before lunch instead of debating one in a meeting.</p>

    <p>But tools alone don't make a design engineer. What matters is the mindset: a willingness to think in systems, to care about the user's experience <em>and</em> the developer's experience, to understand that the best design decisions often happen in code. It means being comfortable with ambiguity — knowing that the first implementation will teach you things the mockup never could. It means shipping, learning, and iterating instead of polishing pixels that nobody's interacted with yet.</p>

    <p>After ten-plus years building products at Automattic — across WordPress, Tumblr, and Gravatar — I keep coming back to the same conviction: the best work happens when you collapse the distance between imagining something and making it real. That's what design engineering is about. Not replacing designers or developers, but recognizing that the most impactful work lives at their intersection. The future belongs to the people who can think across that boundary.</p>
  </article>
</main>

<footer>
  <p>&copy; 2026 Shaun Andrews. Powered by WordPress.</p>
</footer>

</body>
</html>`
}

export function about(themeCSS: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>About — Shaun's Blog</title>
<style>${themeCSS}</style>
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: var(--theme-font-body); color: var(--theme-text); background: var(--theme-bg); line-height: var(--theme-line-height-normal); }

header { max-width: var(--theme-content-width); margin: 0 auto; padding: var(--theme-space-5) var(--theme-space-3) 0; display: flex; align-items: baseline; justify-content: space-between; flex-wrap: wrap; gap: var(--theme-space-2); }
header h1 { font-size: 1.5rem; font-weight: 700; font-family: var(--theme-font-heading); }
header nav { display: flex; gap: var(--theme-space-3); }
header nav a { color: var(--theme-text); text-decoration: none; font-size: 0.9rem; }
header nav a:hover { color: var(--theme-color-primary); }

main { max-width: var(--theme-content-width); margin: 0 auto; padding: var(--theme-space-6) var(--theme-space-3); }

main h2 { font-size: var(--theme-font-size-xlarge); font-weight: 700; margin-bottom: var(--theme-space-3); font-family: var(--theme-font-heading); }
main p { font-size: 1.05rem; color: var(--theme-color-body-text); margin-bottom: 20px; }

.section { margin-top: var(--theme-space-6); }
.section h3 { font-size: var(--theme-font-size-small); text-transform: uppercase; letter-spacing: 0.08em; color: var(--theme-color-primary); font-weight: 600; margin-bottom: var(--theme-space-2); }
.section ul { list-style: none; }
.section li { padding: var(--theme-space-1) 0; border-bottom: 1px solid var(--theme-color-border-light); font-size: 0.95rem; color: var(--theme-color-body-text); }
.section li:last-child { border-bottom: none; }
.section li strong { color: var(--theme-text); }

footer { max-width: var(--theme-content-width); margin: 0 auto; padding: var(--theme-space-5) var(--theme-space-3); font-size: var(--theme-font-size-small); color: var(--theme-color-muted-light); border-top: 1px solid var(--theme-color-border); }
</style>
</head>
<body>

<header>
  <h1>Shaun's Blog</h1>
  <nav>
    <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'homepage'},'*');return false">Home</a>
    <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'about'},'*');return false">About</a>
    <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'archive'},'*');return false">Archive</a>
    <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'projects'},'*');return false">Projects</a>
  </nav>
</header>

<main>
  <h2>About</h2>

  <p>Hey, I'm Shaun. I'm a design engineer at <strong>Automattic</strong>, where I've spent the last 10+ years working on products like WordPress, Tumblr, and Gravatar. I live at the intersection of design and code — I love the moment when an idea stops being abstract and starts being something you can click on, scroll through, and feel.</p>

  <p>Most of my day is spent prototyping, building design systems, and figuring out how to make complex interfaces feel simple. I believe the best digital products come from people who care deeply about both how something looks and how it's built. I try to be one of those people.</p>

  <p>Outside of work, I'm usually tinkering with side projects, exploring new tools, or thinking about how the web platform keeps evolving. This blog is where I write about all of it — design, engineering, the tools I use, and the occasional reflection on what it means to build things for a living.</p>

  <div class="section">
    <h3>Currently</h3>
    <ul>
      <li><strong>Working on</strong> — Design systems and prototyping tools at Automattic</li>
      <li><strong>Exploring</strong> — AI-assisted design workflows and generative UI</li>
      <li><strong>Reading</strong> — "A Philosophy of Software Design" by John Ousterhout</li>
      <li><strong>Listening to</strong> — A lot of ambient and lo-fi while I work</li>
    </ul>
  </div>

  <div class="section">
    <h3>What I Use</h3>
    <ul>
      <li><strong>Editor</strong> — VS Code + Cursor</li>
      <li><strong>Design</strong> — Figma, plus the browser itself</li>
      <li><strong>Stack</strong> — TypeScript, React, Vue, WordPress</li>
      <li><strong>Hardware</strong> — MacBook Pro, Studio Display</li>
      <li><strong>Notes</strong> — Obsidian for everything</li>
    </ul>
  </div>
</main>

<footer>
  <p>&copy; 2026 Shaun Andrews. Powered by WordPress.</p>
</footer>

</body>
</html>`
}

export function archive(themeCSS: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Archive — Shaun's Blog</title>
<style>${themeCSS}</style>
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: var(--theme-font-body); color: var(--theme-text); background: var(--theme-bg); line-height: var(--theme-line-height-normal); }

header { max-width: var(--theme-content-width); margin: 0 auto; padding: var(--theme-space-5) var(--theme-space-3) 0; display: flex; align-items: baseline; justify-content: space-between; flex-wrap: wrap; gap: var(--theme-space-2); }
header h1 { font-size: 1.5rem; font-weight: 700; font-family: var(--theme-font-heading); }
header nav { display: flex; gap: var(--theme-space-3); }
header nav a { color: var(--theme-text); text-decoration: none; font-size: 0.9rem; }
header nav a:hover { color: var(--theme-color-primary); }

main { max-width: var(--theme-content-width); margin: 0 auto; padding: var(--theme-space-6) var(--theme-space-3); }
main > h2 { font-size: var(--theme-font-size-xlarge); font-weight: 700; margin-bottom: var(--theme-space-5); font-family: var(--theme-font-heading); }

.month-group { margin-bottom: var(--theme-space-5); }
.month-group h3 { font-size: var(--theme-font-size-small); text-transform: uppercase; letter-spacing: 0.08em; color: var(--theme-color-primary); font-weight: 600; margin-bottom: var(--theme-space-2); }

.archive-item { padding: 16px 0; border-bottom: 1px solid var(--theme-color-border-light); }
.archive-item:first-child { border-top: 1px solid var(--theme-color-border-light); }
.archive-item a { font-size: var(--theme-font-size-large); font-weight: 600; color: var(--theme-text); text-decoration: none; display: block; margin-bottom: 4px; }
.archive-item a:hover { color: var(--theme-color-primary); }
.archive-item .meta { font-size: 0.85rem; color: var(--theme-color-muted); margin-bottom: 6px; }
.archive-item .excerpt { font-size: 0.95rem; color: var(--theme-color-body-text); margin-bottom: 8px; }
.archive-item .tags { display: flex; gap: 6px; flex-wrap: wrap; }
.archive-item .tag { font-size: 0.75rem; padding: 2px 8px; background: var(--theme-color-surface); color: var(--theme-color-muted); border-radius: 3px; }

footer { max-width: var(--theme-content-width); margin: 0 auto; padding: var(--theme-space-5) var(--theme-space-3); font-size: var(--theme-font-size-small); color: var(--theme-color-muted-light); border-top: 1px solid var(--theme-color-border); }
</style>
</head>
<body>

<header>
  <h1>Shaun's Blog</h1>
  <nav>
    <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'homepage'},'*');return false">Home</a>
    <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'about'},'*');return false">About</a>
    <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'archive'},'*');return false">Archive</a>
    <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'projects'},'*');return false">Projects</a>
  </nav>
</header>

<main>
  <h2>Archive</h2>

  <div class="month-group">
    <h3>February 2026</h3>
    <div class="archive-item">
      <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'post'},'*');return false">The Future of Design Engineering</a>
      <div class="meta">February 10, 2026</div>
      <div class="excerpt">The line between design and engineering continues to blur. As tools become more capable and AI accelerates prototyping, the designers who thrive will be the ones who think in systems and ship real code.</div>
      <div class="tags"><span class="tag">design engineering</span><span class="tag">career</span><span class="tag">AI</span></div>
    </div>
    <div class="archive-item">
      <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'post2'},'*');return false">The Case for Design Engineers</a>
      <div class="meta">February 7, 2026</div>
      <div class="excerpt">Why the hybrid designer-developer role isn't a compromise — it's a superpower. A look at how design engineers ship better products, faster.</div>
      <div class="tags"><span class="tag">design engineering</span><span class="tag">roles</span><span class="tag">hiring</span></div>
    </div>
    <div class="archive-item">
      <a href="#">Why Design Systems Matter</a>
      <div class="meta">February 5, 2026</div>
      <div class="excerpt">A design system isn't a component library — it's a shared language for building products. Here's why that distinction matters and how to get your team to care.</div>
      <div class="tags"><span class="tag">design systems</span><span class="tag">process</span></div>
    </div>
  </div>

  <div class="month-group">
    <h3>January 2026</h3>
    <div class="archive-item">
      <a href="#">Building at the Speed of Thought</a>
      <div class="meta">January 28, 2026</div>
      <div class="excerpt">How rapid prototyping changed the way our team ships features. When the cost of trying something is near zero, you stop debating and start building.</div>
      <div class="tags"><span class="tag">prototyping</span><span class="tag">process</span><span class="tag">AI</span></div>
    </div>
    <div class="archive-item">
      <a href="#">Ten Years at Automattic</a>
      <div class="meta">January 15, 2026</div>
      <div class="excerpt">Reflections on a decade of distributed work, open source, and the evolution of the web. What I've learned, what I'd do differently, and why I'm still here.</div>
      <div class="tags"><span class="tag">Automattic</span><span class="tag">remote work</span><span class="tag">career</span></div>
    </div>
    <div class="archive-item">
      <a href="#">CSS Variables Changed How I Think About Theming</a>
      <div class="meta">January 8, 2026</div>
      <div class="excerpt">Custom properties aren't just a convenience — they're a fundamentally different mental model for styling. Here's how I use them to build theme-aware components.</div>
      <div class="tags"><span class="tag">CSS</span><span class="tag">creative coding</span><span class="tag">theming</span></div>
    </div>
  </div>

  <div class="month-group">
    <h3>December 2025</h3>
    <div class="archive-item">
      <a href="#">The WordPress Block Editor, Three Years In</a>
      <div class="meta">December 18, 2025</div>
      <div class="excerpt">Gutenberg has evolved dramatically since launch. A candid look at what's working, what's not, and where block-based editing is headed next.</div>
      <div class="tags"><span class="tag">WordPress</span><span class="tag">Gutenberg</span><span class="tag">blocks</span></div>
    </div>
    <div class="archive-item">
      <a href="#">My Creative Coding Setup for 2026</a>
      <div class="meta">December 5, 2025</div>
      <div class="excerpt">Canvas, WebGL, and generative art — my tools, libraries, and workflow for creative coding side projects heading into the new year.</div>
      <div class="tags"><span class="tag">creative coding</span><span class="tag">tools</span><span class="tag">generative art</span></div>
    </div>
  </div>

  <div class="month-group">
    <h3>November 2025</h3>
    <div class="archive-item">
      <a href="#">Designing in the Browser Is Not a Shortcut</a>
      <div class="meta">November 22, 2025</div>
      <div class="excerpt">It's not about skipping Figma. It's about working in the real medium. Why designing in code produces different (and often better) results.</div>
      <div class="tags"><span class="tag">design engineering</span><span class="tag">workflow</span></div>
    </div>
    <div class="archive-item">
      <a href="#">Remote Work Isn't About Location</a>
      <div class="meta">November 10, 2025</div>
      <div class="excerpt">After a decade of distributed work, I've realized the real advantage isn't working from anywhere — it's asynchronous communication and deep focus time.</div>
      <div class="tags"><span class="tag">remote work</span><span class="tag">Automattic</span><span class="tag">productivity</span></div>
    </div>
    <div class="archive-item">
      <a href="#">Building a WordPress Plugin with Modern JavaScript</a>
      <div class="meta">November 2, 2025</div>
      <div class="excerpt">A walkthrough of building a WordPress plugin using React, the @wordpress/scripts toolchain, and the block editor APIs. Lessons learned from shipping real plugins.</div>
      <div class="tags"><span class="tag">WordPress</span><span class="tag">JavaScript</span><span class="tag">plugins</span></div>
    </div>
  </div>

  <div class="month-group">
    <h3>October 2025</h3>
    <div class="archive-item">
      <a href="#">Tokens, Variables, and the Language of Design</a>
      <div class="meta">October 15, 2025</div>
      <div class="excerpt">Design tokens bridge the gap between design intent and code implementation. How we structured ours, and the naming conventions that actually stuck.</div>
      <div class="tags"><span class="tag">design tokens</span><span class="tag">design systems</span><span class="tag">CSS</span></div>
    </div>
  </div>
</main>

<footer>
  <p>&copy; 2026 Shaun Andrews. Powered by WordPress.</p>
</footer>

</body>
</html>`
}

export function post2(themeCSS: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>The Case for Design Engineers — Shaun's Blog</title>
<style>${themeCSS}</style>
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: var(--theme-font-body); color: var(--theme-text); background: var(--theme-bg); line-height: var(--theme-line-height-normal); }

header { max-width: var(--theme-content-width); margin: 0 auto; padding: var(--theme-space-5) var(--theme-space-3) 0; display: flex; align-items: baseline; justify-content: space-between; flex-wrap: wrap; gap: var(--theme-space-2); }
header h1 { font-size: 1.5rem; font-weight: 700; font-family: var(--theme-font-heading); }
header nav { display: flex; gap: var(--theme-space-3); }
header nav a { color: var(--theme-text); text-decoration: none; font-size: 0.9rem; }
header nav a:hover { color: var(--theme-color-primary); }

main { max-width: var(--theme-content-width); margin: 0 auto; padding: var(--theme-space-6) var(--theme-space-3); }

.back { display: inline-block; font-size: 0.85rem; color: var(--theme-color-primary); text-decoration: none; margin-bottom: var(--theme-space-4); }
.back:hover { text-decoration: underline; }

article h2 { font-size: var(--theme-font-size-hero); font-weight: 700; margin-bottom: 12px; line-height: var(--theme-line-height-tight); font-family: var(--theme-font-heading); }
.byline { font-size: 0.85rem; color: var(--theme-color-muted); margin-bottom: var(--theme-space-5); }
.byline strong { color: var(--theme-text); }

article p { font-size: 1.05rem; color: var(--theme-color-body-text); margin-bottom: var(--theme-space-3); }
article h3 { font-size: var(--theme-font-size-large); font-weight: 700; margin-top: var(--theme-space-5); margin-bottom: var(--theme-space-2); font-family: var(--theme-font-heading); }

.pullquote { border-left: 3px solid var(--theme-color-primary); padding: var(--theme-space-2) var(--theme-space-4); margin: var(--theme-space-4) 0; font-size: 1.2rem; font-style: italic; color: var(--theme-color-primary); line-height: 1.5; }

article pre { background: var(--theme-color-surface); padding: var(--theme-space-3); border-radius: 6px; overflow-x: auto; margin: var(--theme-space-3) 0; font-size: 0.9rem; line-height: 1.5; color: var(--theme-text); }
article code { font-family: 'SF Mono', 'Fira Code', monospace; }

.post-tags { margin-top: var(--theme-space-5); padding-top: var(--theme-space-3); border-top: 1px solid var(--theme-color-border-light); display: flex; gap: 8px; flex-wrap: wrap; align-items: center; }
.post-tags span.label { font-size: 0.8rem; color: var(--theme-color-muted); text-transform: uppercase; letter-spacing: 0.05em; }
.post-tags .tag { font-size: 0.8rem; padding: 3px 10px; background: var(--theme-color-surface); color: var(--theme-color-muted); border-radius: 3px; }

footer { max-width: var(--theme-content-width); margin: 0 auto; padding: var(--theme-space-5) var(--theme-space-3); font-size: var(--theme-font-size-small); color: var(--theme-color-muted-light); border-top: 1px solid var(--theme-color-border); }
</style>
</head>
<body>

<header>
  <h1>Shaun's Blog</h1>
  <nav>
    <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'homepage'},'*');return false">Home</a>
    <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'about'},'*');return false">About</a>
    <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'archive'},'*');return false">Archive</a>
    <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'projects'},'*');return false">Projects</a>
  </nav>
</header>

<main>
  <a href="#" class="back" onclick="window.parent.postMessage({type:'navigate',page:'homepage'},'*');return false">← Back to home</a>

  <article>
    <h2>The Case for Design Engineers</h2>
    <div class="byline"><strong>Shaun Andrews</strong> · February 7, 2026 · 8 min read</div>

    <p>There's a role that keeps showing up in job postings, conference talks, and Twitter threads, but still doesn't have a universally agreed-upon definition: the <strong>design engineer</strong>. Some companies call it "UX engineer." Others say "creative technologist" or "design technologist." The title varies, but the shape of the work is remarkably consistent: someone who moves fluidly between design and code, who can take a concept from sketch to shipped product without a handoff step in between.</p>

    <p>I've been doing some version of this work for over a decade, and I want to make the case that this isn't a niche specialty or a transitional role — it's one of the most valuable positions on a product team. Here's why.</p>

    <h3>The Handoff Problem</h3>

    <p>Traditional product workflows look something like this: a designer creates mockups, writes specs, annotates edge cases, and hands them to an engineer. The engineer interprets the specs, builds the thing, and sends it back for review. The designer flags discrepancies. Repeat until everyone's exhausted or the deadline arrives, whichever comes first.</p>

    <p>This process isn't broken because the people are bad at their jobs. It's broken because <strong>design intent doesn't survive translation</strong>. A mockup is a static artifact. It can't capture how a 300ms ease-out curve feels versus a 200ms linear one. It can't show what happens when the user's name is 47 characters long, or when the API takes three seconds to respond, or when the viewport is exactly 834 pixels wide. These details — the ones that determine whether something feels polished or janky — only reveal themselves in the real medium: the browser.</p>

    <div class="pullquote">Design engineers don't eliminate the gap between design and engineering. They work inside it — and that's where the best product decisions happen.</div>

    <h3>What Design Engineers Actually Do</h3>

    <p>A design engineer's value isn't that they're "a designer who can code" or "a developer with taste." It's that they can hold both concerns in their head simultaneously. When a design engineer builds a component, they're thinking about visual hierarchy <em>and</em> DOM structure, about spacing <em>and</em> performance, about the ideal interaction <em>and</em> what's achievable with CSS transitions versus what needs a JS animation library.</p>

    <p>Here's a concrete example. Say you're building a card component for a design system. A designer might spec it out with fixed content and three viewport sizes. A developer might build it to match those three screenshots. A design engineer would do something like this:</p>

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
        {title.length &gt; 80 ? title.slice(0, 77) + '…' : title}
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

    <p>Two forces are making design engineers more important than ever. The first is <strong>AI-assisted development</strong>. When you can generate a working prototype from a description in minutes, the bottleneck shifts from "can we build it?" to "should we build it, and does it feel right?" Design engineers are uniquely positioned to evaluate AI-generated output because they understand both the design intent and the technical implications. They can tell you whether the generated code is actually good, not just whether it looks right in a screenshot.</p>

    <p>The second force is <strong>design systems at scale</strong>. As organizations adopt component libraries and design tokens, the work of maintaining consistency becomes deeply technical. You need people who understand why a 4px difference in padding matters <em>and</em> can implement a token system that prevents it. Design systems work that ignores the engineering reality produces beautiful documentation that nobody follows. Work that ignores design intent produces a component library that technically works but feels like a government form.</p>

    <h3>Building the Role Into Your Team</h3>

    <p>If you're a manager or team lead, here's my practical advice: don't create a "design engineering team" in isolation. Embed design engineers on product teams, between design and engineering. Give them ownership of the space where intent becomes implementation — prototyping, component development, interaction design, and design system stewardship.</p>

    <p>If you're an individual contributor wondering whether to go deeper into design or engineering, my honest answer is: <strong>go deeper into both</strong>. Learn CSS Grid and animation well enough to prototype anything. Learn Figma well enough to communicate visually. Learn enough about accessibility to make it a habit, not an afterthought. You don't need to be an expert in everything. You need to be fluent enough to move fast and literate enough to collaborate with specialists.</p>

    <p>The best products I've worked on — the ones that felt <em>right</em>, that users actually enjoyed using — were built by people who refused to stay in their lane. They sketched in code, questioned the mockup, pushed back on technical constraints that didn't need to exist, and celebrated the details that nobody asked for but everybody noticed. That's design engineering. That's the work worth doing.</p>

    <div class="post-tags">
      <span class="label">Tags:</span>
      <span class="tag">design engineering</span>
      <span class="tag">roles</span>
      <span class="tag">hiring</span>
      <span class="tag">design systems</span>
      <span class="tag">career</span>
    </div>
  </article>
</main>

<footer>
  <p>&copy; 2026 Shaun Andrews. Powered by WordPress.</p>
</footer>

</body>
</html>`
}

export function projects(themeCSS: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Projects — Shaun's Blog</title>
<style>${themeCSS}</style>
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: var(--theme-font-body); color: var(--theme-text); background: var(--theme-bg); line-height: var(--theme-line-height-normal); }

header { max-width: var(--theme-content-width); margin: 0 auto; padding: var(--theme-space-5) var(--theme-space-3) 0; display: flex; align-items: baseline; justify-content: space-between; flex-wrap: wrap; gap: var(--theme-space-2); }
header h1 { font-size: 1.5rem; font-weight: 700; font-family: var(--theme-font-heading); }
header nav { display: flex; gap: var(--theme-space-3); }
header nav a { color: var(--theme-text); text-decoration: none; font-size: 0.9rem; }
header nav a:hover { color: var(--theme-color-primary); }

main { max-width: var(--theme-content-width); margin: 0 auto; padding: var(--theme-space-6) var(--theme-space-3); }
main > h2 { font-size: var(--theme-font-size-xlarge); font-weight: 700; margin-bottom: 8px; font-family: var(--theme-font-heading); }
main > .subtitle { font-size: 1.05rem; color: var(--theme-color-muted); margin-bottom: var(--theme-space-5); }

.projects-grid { display: grid; grid-template-columns: 1fr; gap: var(--theme-space-3); }

.project-card { border: 1px solid var(--theme-color-border-light); border-radius: 8px; padding: var(--theme-space-4); background: var(--theme-color-card, var(--theme-bg)); }
.project-card h3 { font-size: var(--theme-font-size-large); font-weight: 700; margin-bottom: 6px; font-family: var(--theme-font-heading); }
.project-card h3 a { color: inherit; text-decoration: none; }
.project-card h3 a:hover { color: var(--theme-color-primary); }
.project-card .desc { font-size: 0.95rem; color: var(--theme-color-body-text); margin-bottom: 12px; }
.project-card .tech { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 12px; }
.project-card .tech span { font-size: 0.75rem; padding: 2px 8px; background: var(--theme-color-surface); color: var(--theme-color-muted); border-radius: 3px; }
.project-card .bottom { display: flex; justify-content: space-between; align-items: center; }
.project-card .status { font-size: 0.8rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; }
.project-card .status.shipped { color: var(--theme-color-primary); }
.project-card .status.in-progress { color: var(--theme-color-accent, #e67e22); }
.project-card .status.archived { color: var(--theme-color-muted); }
.project-card .link { font-size: 0.85rem; color: var(--theme-color-primary); text-decoration: none; }
.project-card .link:hover { text-decoration: underline; }

footer { max-width: var(--theme-content-width); margin: 0 auto; padding: var(--theme-space-5) var(--theme-space-3); font-size: var(--theme-font-size-small); color: var(--theme-color-muted-light); border-top: 1px solid var(--theme-color-border); }
</style>
</head>
<body>

<header>
  <h1>Shaun's Blog</h1>
  <nav>
    <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'homepage'},'*');return false">Home</a>
    <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'about'},'*');return false">About</a>
    <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'archive'},'*');return false">Archive</a>
    <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'projects'},'*');return false">Projects</a>
  </nav>
</header>

<main>
  <h2>Projects</h2>
  <p class="subtitle">Open source work, side projects, and things I've built over the years.</p>

  <div class="projects-grid">
    <div class="project-card">
      <h3><a href="#">flavor</a></h3>
      <div class="desc">A minimal WordPress block theme built for personal blogs. Focuses on typography, whitespace, and reading experience. Supports full site editing and global styles with a small, opinionated set of design tokens.</div>
      <div class="tech"><span>WordPress</span><span>PHP</span><span>Block Theme</span><span>CSS Custom Properties</span></div>
      <div class="bottom">
        <span class="status shipped">Shipped</span>
        <a href="#" class="link">GitHub →</a>
      </div>
    </div>

    <div class="project-card">
      <h3><a href="#">Studio</a></h3>
      <div class="desc">A visual design tool for WordPress themes. Edit colors, typography, spacing, and layout in real-time with a live preview. Generates valid theme.json and CSS custom properties. Built as an exploration of what theme editing could feel like.</div>
      <div class="tech"><span>TypeScript</span><span>React</span><span>Vite</span><span>WordPress</span></div>
      <div class="bottom">
        <span class="status in-progress">In Progress</span>
        <a href="#" class="link">GitHub →</a>
      </div>
    </div>

    <div class="project-card">
      <h3><a href="#">Token Bridge</a></h3>
      <div class="desc">A CLI tool that converts design tokens from Figma's token format into CSS custom properties, theme.json values, and Sass variables. Supports multiple output targets with a single config file.</div>
      <div class="tech"><span>Node.js</span><span>TypeScript</span><span>CLI</span><span>Design Tokens</span></div>
      <div class="bottom">
        <span class="status shipped">Shipped</span>
        <a href="#" class="link">npm →</a>
      </div>
    </div>

    <div class="project-card">
      <h3><a href="#">Gravity Forms UI Refresh</a></h3>
      <div class="desc">A WordPress plugin that modernizes the front-end rendering of Gravity Forms. Replaces the default markup with accessible, modern HTML and provides a clean CSS API for custom styling. Drop-in, no configuration required.</div>
      <div class="tech"><span>WordPress</span><span>PHP</span><span>CSS</span><span>Accessibility</span></div>
      <div class="bottom">
        <span class="status shipped">Shipped</span>
        <a href="#" class="link">GitHub →</a>
      </div>
    </div>

    <div class="project-card">
      <h3><a href="#">Sketchbook</a></h3>
      <div class="desc">A personal creative coding playground. Generative art experiments, Canvas API explorations, and WebGL sketches. Each sketch is self-contained with its own controls and exportable as PNG or SVG.</div>
      <div class="tech"><span>JavaScript</span><span>Canvas API</span><span>WebGL</span><span>Vite</span></div>
      <div class="bottom">
        <span class="status in-progress">In Progress</span>
        <a href="#" class="link">Live →</a>
      </div>
    </div>

    <div class="project-card">
      <h3><a href="#">wp-theme-utils</a></h3>
      <div class="desc">A collection of utility functions for WordPress block theme development. Includes helpers for responsive spacing, fluid typography, color manipulation, and theme.json generation. Used across several of my own themes.</div>
      <div class="tech"><span>PHP</span><span>WordPress</span><span>Composer</span></div>
      <div class="bottom">
        <span class="status shipped">Shipped</span>
        <a href="#" class="link">GitHub →</a>
      </div>
    </div>

    <div class="project-card">
      <h3><a href="#">Distributed Design Playbook</a></h3>
      <div class="desc">A public handbook documenting best practices for running design teams in fully distributed companies. Covers async critiques, remote workshops, documentation-first culture, and tool recommendations.</div>
      <div class="tech"><span>Markdown</span><span>MkDocs</span><span>Remote Work</span></div>
      <div class="bottom">
        <span class="status archived">Archived</span>
        <a href="#" class="link">Read →</a>
      </div>
    </div>

    <div class="project-card">
      <h3><a href="#">Palette</a></h3>
      <div class="desc">A tiny web app for generating accessible color palettes. Input a brand color and get a full scale with WCAG contrast ratios calculated against light and dark backgrounds. Exports to CSS, Tailwind config, or Figma tokens.</div>
      <div class="tech"><span>Svelte</span><span>TypeScript</span><span>Color Science</span></div>
      <div class="bottom">
        <span class="status shipped">Shipped</span>
        <a href="#" class="link">Live →</a>
      </div>
    </div>
  </div>
</main>

<footer>
  <p>&copy; 2026 Shaun Andrews. Powered by WordPress.</p>
</footer>

</body>
</html>`
}
