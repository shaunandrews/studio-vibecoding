export const homepage = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Shaun's Blog</title>
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #1a1a2e; background: #fff; line-height: 1.7; }

header { max-width: 720px; margin: 0 auto; padding: 40px 24px 0; display: flex; align-items: baseline; justify-content: space-between; flex-wrap: wrap; gap: 16px; }
header h1 { font-size: 1.5rem; font-weight: 700; }
header nav { display: flex; gap: 24px; }
header nav a { color: #1a1a2e; text-decoration: none; font-size: 0.9rem; }
header nav a:hover { color: #3858E9; }

main { max-width: 720px; margin: 0 auto; padding: 48px 24px; }

.featured { border-bottom: 1px solid #e5e5e5; padding-bottom: 40px; margin-bottom: 40px; }
.featured .label { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.08em; color: #3858E9; font-weight: 600; margin-bottom: 8px; }
.featured h2 { font-size: 2rem; font-weight: 700; margin-bottom: 8px; }
.featured h2 a { color: inherit; text-decoration: none; }
.featured h2 a:hover { color: #3858E9; }
.featured .date { font-size: 0.85rem; color: #888; margin-bottom: 12px; }
.featured .excerpt { font-size: 1.05rem; color: #444; }

.posts h3 { font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.08em; color: #888; margin-bottom: 20px; }
.post-item { padding: 20px 0; border-bottom: 1px solid #f0f0f0; }
.post-item:first-of-type { border-top: 1px solid #f0f0f0; }
.post-item a { font-size: 1.1rem; font-weight: 600; color: #1a1a2e; text-decoration: none; }
.post-item a:hover { color: #3858E9; }
.post-item .meta { font-size: 0.85rem; color: #888; margin-top: 4px; }
.post-item .meta .excerpt { color: #666; }

footer { max-width: 720px; margin: 0 auto; padding: 40px 24px; font-size: 0.8rem; color: #aaa; border-top: 1px solid #e5e5e5; }
</style>
</head>
<body>

<header>
  <h1>Shaun's Blog</h1>
  <nav>
    <a href="#">Home</a>
    <a href="#">About</a>
    <a href="#">Archive</a>
  </nav>
</header>

<main>
  <article class="featured">
    <div class="label">Featured</div>
    <h2><a href="#">The Future of Design Engineering</a></h2>
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
