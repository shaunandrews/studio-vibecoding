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
