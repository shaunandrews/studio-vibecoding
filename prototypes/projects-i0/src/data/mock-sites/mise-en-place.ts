export function homepage(themeCSS: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Mise en Place</title>
<style>${themeCSS}</style>
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: var(--theme-font-body); color: var(--theme-text); background: var(--theme-bg); line-height: var(--theme-line-height-normal); }
h1, h2, h3 { font-family: var(--theme-font-heading); }

.app-bar {
  background: var(--theme-color-surface);
  border-bottom: 1px solid var(--theme-color-border);
  padding: 0 var(--theme-space-4);
  display: flex;
  align-items: center;
  height: 56px;
  position: sticky;
  top: 0;
  z-index: 10;
}
.app-bar .logo {
  font-family: var(--theme-font-heading);
  font-size: var(--theme-font-size-large);
  font-weight: 800;
  color: var(--theme-color-primary);
  margin-right: var(--theme-space-6);
  white-space: nowrap;
}
.app-bar nav { display: flex; gap: var(--theme-space-1); }
.app-bar nav a {
  text-decoration: none;
  color: var(--theme-color-muted);
  font-size: var(--theme-font-size-small);
  font-weight: 600;
  padding: var(--theme-space-1) var(--theme-space-2);
  border-radius: 6px;
  transition: background 0.15s, color 0.15s;
}
.app-bar nav a:hover { background: var(--theme-color-border); color: var(--theme-text); }
.app-bar nav a.active { background: var(--theme-color-primary); color: var(--theme-color-surface); }
.app-bar .spacer { flex: 1; }
.app-bar .avatar {
  width: 32px; height: 32px; border-radius: 50%;
  background: linear-gradient(135deg, var(--theme-color-primary), var(--theme-color-accent));
  display: flex; align-items: center; justify-content: center;
  color: #fff; font-weight: 700; font-size: var(--theme-font-size-small);
}

.app-body {
  max-width: var(--theme-wide-width);
  margin: 0 auto;
  padding: var(--theme-space-4);
  display: grid;
  grid-template-columns: 1fr 280px;
  gap: var(--theme-space-4);
}

.search-bar {
  grid-column: 1 / -1;
  position: relative;
}
.search-bar input {
  width: 100%;
  padding: var(--theme-space-2) var(--theme-space-3);
  padding-left: var(--theme-space-5);
  border: 1px solid var(--theme-color-border);
  border-radius: 10px;
  background: var(--theme-color-surface);
  font-size: var(--theme-font-size-medium);
  font-family: var(--theme-font-body);
  color: var(--theme-text);
  outline: none;
  transition: border-color 0.15s;
}
.search-bar input::placeholder { color: var(--theme-color-muted); }
.search-bar input:focus { border-color: var(--theme-color-primary); }
.search-bar .icon {
  position: absolute; left: var(--theme-space-2); top: 50%; transform: translateY(-50%);
  color: var(--theme-color-muted); font-size: 1.1rem;
}

.main-col h2 {
  font-size: var(--theme-font-size-xlarge);
  margin-bottom: var(--theme-space-3);
  color: var(--theme-text);
}

.recipe-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: var(--theme-space-3);
  margin-bottom: var(--theme-space-6);
}
.recipe-card {
  background: var(--theme-color-surface);
  border: 1px solid var(--theme-color-border);
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  transition: box-shadow 0.15s, transform 0.15s;
}
.recipe-card:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.08); transform: translateY(-2px); }
.recipe-card .thumb {
  height: 120px;
  background: linear-gradient(135deg, #F4845F, #E85D3A, #D4A84B);
}
.recipe-card .thumb.green { background: linear-gradient(135deg, #7DB356, #5B8A3C, #A8D060); }
.recipe-card .thumb.warm { background: linear-gradient(135deg, #E5A833, #E85D3A, #C94A2A); }
.recipe-card .thumb.cool { background: linear-gradient(135deg, #5B8A3C, #3A7CA5, #7DB356); }
.recipe-card .thumb.purple { background: linear-gradient(135deg, #8B5CF6, #E85D3A, #F4845F); }
.recipe-card .thumb.golden { background: linear-gradient(135deg, #E5A833, #D4A84B, #F0BC4A); }
.recipe-card .info { padding: var(--theme-space-2); }
.recipe-card .info h3 { font-size: var(--theme-font-size-medium); margin-bottom: 4px; }
.recipe-card .meta { display: flex; gap: var(--theme-space-1); align-items: center; font-size: var(--theme-font-size-small); color: var(--theme-color-muted); }
.recipe-card .tag {
  background: var(--theme-color-border);
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.meal-plan-preview h2 { margin-bottom: var(--theme-space-3); }
.day-row {
  display: flex;
  align-items: center;
  padding: var(--theme-space-1) 0;
  border-bottom: 1px solid var(--theme-color-border);
  font-size: var(--theme-font-size-small);
}
.day-row .day-label { width: 40px; font-weight: 700; color: var(--theme-color-muted); flex-shrink: 0; }
.day-row .meal-name { flex: 1; color: var(--theme-text); }
.day-row .meal-name.empty { color: var(--theme-color-muted); font-style: italic; cursor: pointer; }
.day-row .meal-name.empty:hover { color: var(--theme-color-primary); }

.sidebar-col { display: flex; flex-direction: column; gap: var(--theme-space-3); }
.sidebar-card {
  background: var(--theme-color-surface);
  border: 1px solid var(--theme-color-border);
  border-radius: 10px;
  padding: var(--theme-space-3);
}
.sidebar-card h3 {
  font-size: var(--theme-font-size-medium);
  margin-bottom: var(--theme-space-2);
  display: flex; align-items: center; gap: var(--theme-space-1);
}
.sidebar-card .count {
  font-size: var(--theme-font-size-hero);
  font-weight: 800;
  color: var(--theme-color-primary);
  font-family: var(--theme-font-heading);
}
.sidebar-card .link {
  display: inline-block;
  margin-top: var(--theme-space-2);
  color: var(--theme-color-primary);
  font-weight: 600;
  font-size: var(--theme-font-size-small);
  text-decoration: none;
}
.sidebar-card .link:hover { text-decoration: underline; }
.sidebar-card ul { list-style: none; }
.sidebar-card li {
  padding: 4px 0;
  font-size: var(--theme-font-size-small);
  color: var(--theme-color-muted);
  border-bottom: 1px solid var(--theme-color-border);
}
.sidebar-card li:last-child { border-bottom: none; }
.quick-stats { display: flex; gap: var(--theme-space-3); }
.stat { text-align: center; flex: 1; }
.stat .num { font-size: var(--theme-font-size-xlarge); font-weight: 800; color: var(--theme-color-primary); font-family: var(--theme-font-heading); }
.stat .label { font-size: var(--theme-font-size-small); color: var(--theme-color-muted); }
</style>
</head>
<body>

<div class="app-bar">
  <div class="logo">🍳 Mise en Place</div>
  <nav>
    <a href="#" class="active" onclick="window.parent.postMessage({type:'navigate',page:'homepage'},'*');return false">Recipes</a>
    <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'mealplan'},'*');return false">Meal Plan</a>
    <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'homepage'},'*');return false">Shopping List</a>
  </nav>
  <div class="spacer"></div>
  <div class="avatar">S</div>
</div>

<div class="app-body">
  <div class="search-bar">
    <span class="icon">🔍</span>
    <input type="text" placeholder="Search recipes, ingredients, tags..." />
  </div>

  <div class="main-col">
    <h2>Recent Recipes</h2>
    <div class="recipe-grid">
      <div class="recipe-card" onclick="window.parent.postMessage({type:'navigate',page:'recipe'},'*');return false">
        <div class="thumb warm"></div>
        <div class="info">
          <h3>Spicy Miso Ramen</h3>
          <div class="meta"><span class="tag">Japanese</span> · 45 min</div>
        </div>
      </div>
      <div class="recipe-card" onclick="window.parent.postMessage({type:'navigate',page:'recipe'},'*');return false">
        <div class="thumb green"></div>
        <div class="info">
          <h3>Thai Basil Chicken</h3>
          <div class="meta"><span class="tag">Thai</span> · 25 min</div>
        </div>
      </div>
      <div class="recipe-card" onclick="window.parent.postMessage({type:'navigate',page:'recipe'},'*');return false">
        <div class="thumb"></div>
        <div class="info">
          <h3>Margherita Pizza</h3>
          <div class="meta"><span class="tag">Italian</span> · 35 min</div>
        </div>
      </div>
      <div class="recipe-card" onclick="window.parent.postMessage({type:'navigate',page:'recipe'},'*');return false">
        <div class="thumb cool"></div>
        <div class="info">
          <h3>Falafel Bowl</h3>
          <div class="meta"><span class="tag">Mediterranean</span> · 40 min</div>
        </div>
      </div>
      <div class="recipe-card" onclick="window.parent.postMessage({type:'navigate',page:'recipe'},'*');return false">
        <div class="thumb purple"></div>
        <div class="info">
          <h3>Butter Chicken</h3>
          <div class="meta"><span class="tag">Indian</span> · 50 min</div>
        </div>
      </div>
      <div class="recipe-card" onclick="window.parent.postMessage({type:'navigate',page:'recipe'},'*');return false">
        <div class="thumb golden"></div>
        <div class="info">
          <h3>Shakshuka</h3>
          <div class="meta"><span class="tag">Middle Eastern</span> · 30 min</div>
        </div>
      </div>
    </div>

    <h2>This Week's Meal Plan</h2>
    <div class="meal-plan-preview">
      <div class="day-row"><span class="day-label">Mon</span><span class="meal-name">Spicy Miso Ramen</span></div>
      <div class="day-row"><span class="day-label">Tue</span><span class="meal-name">Thai Basil Chicken</span></div>
      <div class="day-row"><span class="day-label">Wed</span><span class="meal-name empty" onclick="window.parent.postMessage({type:'navigate',page:'mealplan'},'*');return false">+ Add meal</span></div>
      <div class="day-row"><span class="day-label">Thu</span><span class="meal-name">Falafel Bowl</span></div>
      <div class="day-row"><span class="day-label">Fri</span><span class="meal-name empty" onclick="window.parent.postMessage({type:'navigate',page:'mealplan'},'*');return false">+ Add meal</span></div>
      <div class="day-row"><span class="day-label">Sat</span><span class="meal-name">Margherita Pizza</span></div>
      <div class="day-row"><span class="day-label">Sun</span><span class="meal-name empty" onclick="window.parent.postMessage({type:'navigate',page:'mealplan'},'*');return false">+ Add meal</span></div>
    </div>
  </div>

  <div class="sidebar-col">
    <div class="sidebar-card">
      <h3>🛒 Shopping List</h3>
      <div class="count">14</div>
      <div style="font-size: var(--theme-font-size-small); color: var(--theme-color-muted);">items for this week</div>
      <a class="link" href="#" onclick="window.parent.postMessage({type:'navigate',page:'homepage'},'*');return false">View List →</a>
    </div>
    <div class="sidebar-card">
      <h3>📊 This Week</h3>
      <div class="quick-stats">
        <div class="stat"><div class="num">4</div><div class="label">Meals</div></div>
        <div class="stat"><div class="num">3</div><div class="label">New</div></div>
      </div>
    </div>
    <div class="sidebar-card">
      <h3>🏷️ Quick Tags</h3>
      <ul>
        <li>Japanese (3)</li>
        <li>Italian (5)</li>
        <li>Quick &lt;30 min (8)</li>
        <li>Vegetarian (4)</li>
        <li>Comfort Food (6)</li>
      </ul>
    </div>
  </div>
</div>

</body>
</html>`;
}

export function recipe(themeCSS: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Spicy Miso Ramen – Mise en Place</title>
<style>${themeCSS}</style>
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: var(--theme-font-body); color: var(--theme-text); background: var(--theme-bg); line-height: var(--theme-line-height-normal); }
h1, h2, h3 { font-family: var(--theme-font-heading); }

.app-bar {
  background: var(--theme-color-surface);
  border-bottom: 1px solid var(--theme-color-border);
  padding: 0 var(--theme-space-4);
  display: flex; align-items: center; height: 56px;
  position: sticky; top: 0; z-index: 10;
}
.app-bar .logo {
  font-family: var(--theme-font-heading); font-size: var(--theme-font-size-large);
  font-weight: 800; color: var(--theme-color-primary); margin-right: var(--theme-space-6); white-space: nowrap;
}
.app-bar nav { display: flex; gap: var(--theme-space-1); }
.app-bar nav a {
  text-decoration: none; color: var(--theme-color-muted); font-size: var(--theme-font-size-small);
  font-weight: 600; padding: var(--theme-space-1) var(--theme-space-2); border-radius: 6px; transition: background 0.15s, color 0.15s;
}
.app-bar nav a:hover { background: var(--theme-color-border); color: var(--theme-text); }
.app-bar nav a.active { background: var(--theme-color-primary); color: var(--theme-color-surface); }
.app-bar .spacer { flex: 1; }
.app-bar .avatar {
  width: 32px; height: 32px; border-radius: 50%;
  background: linear-gradient(135deg, var(--theme-color-primary), var(--theme-color-accent));
  display: flex; align-items: center; justify-content: center;
  color: #fff; font-weight: 700; font-size: var(--theme-font-size-small);
}

.recipe-page {
  max-width: var(--theme-content-width);
  margin: 0 auto;
  padding: var(--theme-space-4);
}

.back-link {
  display: inline-flex; align-items: center; gap: 4px;
  color: var(--theme-color-primary); text-decoration: none; font-weight: 600;
  font-size: var(--theme-font-size-small); margin-bottom: var(--theme-space-3);
}
.back-link:hover { text-decoration: underline; }

.recipe-header { margin-bottom: var(--theme-space-4); }
.recipe-header h1 { font-size: var(--theme-font-size-hero); margin-bottom: var(--theme-space-2); }
.meta-row {
  display: flex; gap: var(--theme-space-4); flex-wrap: wrap;
  font-size: var(--theme-font-size-small); color: var(--theme-color-muted);
}
.meta-item { display: flex; align-items: center; gap: 6px; }
.meta-item strong { color: var(--theme-text); }

.recipe-image {
  width: 100%; height: 320px; border-radius: 12px;
  background: linear-gradient(135deg, #F4845F, #E85D3A, #D4A84B, #E5A833);
  margin-bottom: var(--theme-space-5);
}

.recipe-content {
  display: grid; grid-template-columns: 300px 1fr; gap: var(--theme-space-6);
}

.ingredients {
  background: var(--theme-color-surface);
  border: 1px solid var(--theme-color-border);
  border-radius: 10px;
  padding: var(--theme-space-3);
  align-self: start;
  position: sticky; top: 72px;
}
.ingredients h2 { font-size: var(--theme-font-size-large); margin-bottom: var(--theme-space-2); color: var(--theme-color-primary); }
.ingredients ul { list-style: none; }
.ingredients li {
  padding: var(--theme-space-1) 0;
  border-bottom: 1px solid var(--theme-color-border);
  font-size: var(--theme-font-size-small);
  display: flex; align-items: center; gap: var(--theme-space-1);
}
.ingredients li:last-child { border-bottom: none; }
.checkbox {
  width: 18px; height: 18px; border-radius: 4px;
  border: 2px solid var(--theme-color-border);
  flex-shrink: 0; cursor: pointer;
  transition: border-color 0.15s;
}
.checkbox:hover { border-color: var(--theme-color-primary); }

.steps h2 { font-size: var(--theme-font-size-large); margin-bottom: var(--theme-space-3); color: var(--theme-color-primary); }
.step {
  display: flex; gap: var(--theme-space-2); margin-bottom: var(--theme-space-3);
}
.step-num {
  width: 32px; height: 32px; border-radius: 50%;
  background: var(--theme-color-primary); color: var(--theme-color-surface);
  display: flex; align-items: center; justify-content: center;
  font-weight: 700; font-size: var(--theme-font-size-small); flex-shrink: 0;
}
.step p { font-size: var(--theme-font-size-medium); line-height: var(--theme-line-height-normal); }

.tags { display: flex; gap: var(--theme-space-1); flex-wrap: wrap; margin: var(--theme-space-4) 0; }
.tag {
  background: var(--theme-color-border); padding: 4px 12px; border-radius: 20px;
  font-size: var(--theme-font-size-small); font-weight: 600; color: var(--theme-color-muted);
}

.actions { display: flex; gap: var(--theme-space-2); margin-bottom: var(--theme-space-5); }
.btn {
  padding: var(--theme-space-1) var(--theme-space-3);
  border-radius: 8px; font-weight: 700; font-size: var(--theme-font-size-small);
  border: none; cursor: pointer; font-family: var(--theme-font-body);
  transition: opacity 0.15s;
}
.btn:hover { opacity: 0.85; }
.btn-primary { background: var(--theme-color-primary); color: #fff; }
.btn-secondary { background: var(--theme-color-secondary); color: #fff; }

.notes-section {
  background: var(--theme-color-surface);
  border: 1px solid var(--theme-color-border);
  border-radius: 10px;
  padding: var(--theme-space-3);
}
.notes-section h3 { font-size: var(--theme-font-size-medium); margin-bottom: var(--theme-space-1); color: var(--theme-color-muted); }
.notes-section p { font-size: var(--theme-font-size-small); color: var(--theme-color-muted); font-style: italic; }
</style>
</head>
<body>

<div class="app-bar">
  <div class="logo">🍳 Mise en Place</div>
  <nav>
    <a href="#" class="active" onclick="window.parent.postMessage({type:'navigate',page:'homepage'},'*');return false">Recipes</a>
    <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'mealplan'},'*');return false">Meal Plan</a>
    <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'homepage'},'*');return false">Shopping List</a>
  </nav>
  <div class="spacer"></div>
  <div class="avatar">S</div>
</div>

<div class="recipe-page">
  <a class="back-link" href="#" onclick="window.parent.postMessage({type:'navigate',page:'homepage'},'*');return false">← Back to Recipes</a>

  <div class="recipe-header">
    <h1>Spicy Miso Ramen</h1>
    <div class="meta-row">
      <div class="meta-item">⏱ <strong>45 min</strong> prep</div>
      <div class="meta-item">🍽 <strong>4</strong> servings</div>
      <div class="meta-item">📊 <strong>Medium</strong> difficulty</div>
    </div>
  </div>

  <div class="recipe-image"></div>

  <div class="recipe-content">
    <div class="ingredients">
      <h2>Ingredients</h2>
      <ul>
        <li><div class="checkbox"></div>4 packs fresh ramen noodles</li>
        <li><div class="checkbox"></div>3 tbsp white miso paste</li>
        <li><div class="checkbox"></div>2 tbsp chili garlic sauce</li>
        <li><div class="checkbox"></div>1 tbsp sesame oil</li>
        <li><div class="checkbox"></div>6 cups dashi stock</li>
        <li><div class="checkbox"></div>2 soft-boiled eggs</li>
        <li><div class="checkbox"></div>200g chashu pork belly</li>
        <li><div class="checkbox"></div>4 sheets nori</li>
        <li><div class="checkbox"></div>2 green onions, sliced</li>
        <li><div class="checkbox"></div>1 cup corn kernels</li>
        <li><div class="checkbox"></div>Bean sprouts</li>
        <li><div class="checkbox"></div>Chili oil to taste</li>
      </ul>
    </div>

    <div class="steps-col">
      <div class="steps">
        <h2>Instructions</h2>
        <div class="step">
          <div class="step-num">1</div>
          <p>Bring the dashi stock to a simmer in a large pot over medium heat. Whisk in the miso paste and chili garlic sauce until fully dissolved.</p>
        </div>
        <div class="step">
          <div class="step-num">2</div>
          <p>Slice the chashu pork belly into thin rounds and sear in a hot pan with sesame oil until caramelized on both sides. Set aside.</p>
        </div>
        <div class="step">
          <div class="step-num">3</div>
          <p>Cook the ramen noodles according to package directions. Drain and divide among four bowls.</p>
        </div>
        <div class="step">
          <div class="step-num">4</div>
          <p>Ladle the hot miso broth over the noodles. Top each bowl with sliced pork, a halved soft-boiled egg, corn, bean sprouts, and sliced green onions.</p>
        </div>
        <div class="step">
          <div class="step-num">5</div>
          <p>Tuck a sheet of nori into each bowl. Drizzle with chili oil to taste. Serve immediately while piping hot.</p>
        </div>
      </div>

      <div class="tags">
        <span class="tag">Japanese</span>
        <span class="tag">Soup</span>
        <span class="tag">Comfort Food</span>
      </div>

      <div class="actions">
        <button class="btn btn-primary">📅 Add to Meal Plan</button>
        <button class="btn btn-secondary">🛒 Add to Shopping List</button>
      </div>

      <div class="notes-section">
        <h3>📝 Notes</h3>
        <p>For extra heat, add a tablespoon of gochugaru to the broth. You can substitute chicken stock if dashi isn't available — add a splash of soy sauce to compensate.</p>
      </div>
    </div>
  </div>
</div>

</body>
</html>`;
}

export function mealplan(themeCSS: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Meal Plan – Mise en Place</title>
<style>${themeCSS}</style>
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: var(--theme-font-body); color: var(--theme-text); background: var(--theme-bg); line-height: var(--theme-line-height-normal); }
h1, h2, h3, h4 { font-family: var(--theme-font-heading); }

.app-bar {
  background: var(--theme-color-surface);
  border-bottom: 1px solid var(--theme-color-border);
  padding: 0 var(--theme-space-4);
  display: flex; align-items: center; height: 56px;
  position: sticky; top: 0; z-index: 10;
}
.app-bar .logo {
  font-family: var(--theme-font-heading); font-size: var(--theme-font-size-large);
  font-weight: 800; color: var(--theme-color-primary); margin-right: var(--theme-space-6); white-space: nowrap;
}
.app-bar nav { display: flex; gap: var(--theme-space-1); }
.app-bar nav a {
  text-decoration: none; color: var(--theme-color-muted); font-size: var(--theme-font-size-small);
  font-weight: 600; padding: var(--theme-space-1) var(--theme-space-2); border-radius: 6px; transition: background 0.15s, color 0.15s;
}
.app-bar nav a:hover { background: var(--theme-color-border); color: var(--theme-text); }
.app-bar nav a.active { background: var(--theme-color-primary); color: var(--theme-color-surface); }
.app-bar .spacer { flex: 1; }
.app-bar .avatar {
  width: 32px; height: 32px; border-radius: 50%;
  background: linear-gradient(135deg, var(--theme-color-primary), var(--theme-color-accent));
  display: flex; align-items: center; justify-content: center;
  color: #fff; font-weight: 700; font-size: var(--theme-font-size-small);
}

.plan-body {
  max-width: var(--theme-wide-width);
  margin: 0 auto;
  padding: var(--theme-space-4);
  display: grid;
  grid-template-columns: 1fr 280px;
  gap: var(--theme-space-4);
}

.week-selector {
  grid-column: 1 / -1;
  display: flex; align-items: center; justify-content: center; gap: var(--theme-space-3);
  padding: var(--theme-space-2) 0;
}
.week-selector button {
  background: var(--theme-color-surface); border: 1px solid var(--theme-color-border);
  border-radius: 8px; padding: var(--theme-space-1) var(--theme-space-2);
  cursor: pointer; font-size: var(--theme-font-size-medium); color: var(--theme-text);
  font-family: var(--theme-font-body); transition: border-color 0.15s;
}
.week-selector button:hover { border-color: var(--theme-color-primary); }
.week-selector h2 { font-size: var(--theme-font-size-xlarge); }

.days-grid { display: flex; flex-direction: column; gap: var(--theme-space-3); }
.day-card {
  background: var(--theme-color-surface);
  border: 1px solid var(--theme-color-border);
  border-radius: 10px;
  padding: var(--theme-space-3);
}
.day-card .day-header {
  font-size: var(--theme-font-size-large);
  font-weight: 700;
  margin-bottom: var(--theme-space-2);
  color: var(--theme-text);
  display: flex; align-items: center; gap: var(--theme-space-1);
}
.day-card .day-header .date { font-size: var(--theme-font-size-small); color: var(--theme-color-muted); font-weight: 400; }

.meals { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--theme-space-2); }
.meal-slot {
  border: 1px dashed var(--theme-color-border);
  border-radius: 8px;
  padding: var(--theme-space-2);
  min-height: 80px;
}
.meal-slot.filled { border-style: solid; }
.meal-slot .meal-label {
  font-size: 0.7rem; font-weight: 700; text-transform: uppercase;
  letter-spacing: 0.05em; color: var(--theme-color-muted); margin-bottom: 6px;
}
.meal-slot .meal-thumb {
  width: 100%; height: 40px; border-radius: 6px;
  margin-bottom: 6px;
}
.meal-thumb.warm { background: linear-gradient(135deg, #F4845F, #E85D3A); }
.meal-thumb.green { background: linear-gradient(135deg, #7DB356, #5B8A3C); }
.meal-thumb.golden { background: linear-gradient(135deg, #E5A833, #D4A84B); }
.meal-thumb.cool { background: linear-gradient(135deg, #5B8A3C, #3A7CA5); }
.meal-slot .meal-title { font-size: var(--theme-font-size-small); font-weight: 600; }
.meal-slot .add-btn {
  color: var(--theme-color-muted); font-size: var(--theme-font-size-small);
  cursor: pointer; transition: color 0.15s;
}
.meal-slot .add-btn:hover { color: var(--theme-color-primary); }

.sidebar-col { display: flex; flex-direction: column; gap: var(--theme-space-3); }
.sidebar-card {
  background: var(--theme-color-surface);
  border: 1px solid var(--theme-color-border);
  border-radius: 10px;
  padding: var(--theme-space-3);
}
.sidebar-card h3 { font-size: var(--theme-font-size-medium); margin-bottom: var(--theme-space-2); }
.shopping-item {
  display: flex; align-items: center; gap: var(--theme-space-1);
  padding: 4px 0; font-size: var(--theme-font-size-small);
  border-bottom: 1px solid var(--theme-color-border);
  color: var(--theme-color-muted);
}
.shopping-item:last-child { border-bottom: none; }
.bullet { width: 6px; height: 6px; border-radius: 50%; background: var(--theme-color-primary); flex-shrink: 0; }
.nutrition-row {
  display: flex; justify-content: space-between;
  padding: 6px 0;
  font-size: var(--theme-font-size-small);
  border-bottom: 1px solid var(--theme-color-border);
}
.nutrition-row:last-child { border-bottom: none; }
.nutrition-row .val { font-weight: 700; color: var(--theme-text); }
.sidebar-link {
  display: inline-block; margin-top: var(--theme-space-2);
  color: var(--theme-color-primary); font-weight: 600;
  font-size: var(--theme-font-size-small); text-decoration: none;
}
.sidebar-link:hover { text-decoration: underline; }
</style>
</head>
<body>

<div class="app-bar">
  <div class="logo">🍳 Mise en Place</div>
  <nav>
    <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'homepage'},'*');return false">Recipes</a>
    <a href="#" class="active" onclick="window.parent.postMessage({type:'navigate',page:'mealplan'},'*');return false">Meal Plan</a>
    <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'homepage'},'*');return false">Shopping List</a>
  </nav>
  <div class="spacer"></div>
  <div class="avatar">S</div>
</div>

<div class="plan-body">
  <div class="week-selector">
    <button>←</button>
    <h2>Week of Feb 10</h2>
    <button>→</button>
  </div>

  <div class="days-grid">
    <div class="day-card">
      <div class="day-header">Monday <span class="date">Feb 10</span></div>
      <div class="meals">
        <div class="meal-slot filled">
          <div class="meal-label">Breakfast</div>
          <div class="meal-thumb golden"></div>
          <div class="meal-title">Shakshuka</div>
        </div>
        <div class="meal-slot filled">
          <div class="meal-label">Lunch</div>
          <div class="meal-thumb cool"></div>
          <div class="meal-title">Falafel Bowl</div>
        </div>
        <div class="meal-slot filled">
          <div class="meal-label">Dinner</div>
          <div class="meal-thumb warm"></div>
          <div class="meal-title">Spicy Miso Ramen</div>
        </div>
      </div>
    </div>

    <div class="day-card">
      <div class="day-header">Tuesday <span class="date">Feb 11</span></div>
      <div class="meals">
        <div class="meal-slot">
          <div class="meal-label">Breakfast</div>
          <div class="add-btn">+ Add</div>
        </div>
        <div class="meal-slot filled">
          <div class="meal-label">Lunch</div>
          <div class="meal-thumb green"></div>
          <div class="meal-title">Thai Basil Chicken</div>
        </div>
        <div class="meal-slot">
          <div class="meal-label">Dinner</div>
          <div class="add-btn">+ Add</div>
        </div>
      </div>
    </div>

    <div class="day-card">
      <div class="day-header">Wednesday <span class="date">Feb 12</span></div>
      <div class="meals">
        <div class="meal-slot filled">
          <div class="meal-label">Breakfast</div>
          <div class="meal-thumb golden"></div>
          <div class="meal-title">Granola Bowl</div>
        </div>
        <div class="meal-slot">
          <div class="meal-label">Lunch</div>
          <div class="add-btn">+ Add</div>
        </div>
        <div class="meal-slot filled">
          <div class="meal-label">Dinner</div>
          <div class="meal-thumb warm"></div>
          <div class="meal-title">Butter Chicken</div>
        </div>
      </div>
    </div>

    <div class="day-card">
      <div class="day-header">Thursday <span class="date">Feb 13</span></div>
      <div class="meals">
        <div class="meal-slot">
          <div class="meal-label">Breakfast</div>
          <div class="add-btn">+ Add</div>
        </div>
        <div class="meal-slot">
          <div class="meal-label">Lunch</div>
          <div class="add-btn">+ Add</div>
        </div>
        <div class="meal-slot filled">
          <div class="meal-label">Dinner</div>
          <div class="meal-thumb cool"></div>
          <div class="meal-title">Falafel Bowl</div>
        </div>
      </div>
    </div>

    <div class="day-card">
      <div class="day-header">Friday <span class="date">Feb 14</span></div>
      <div class="meals">
        <div class="meal-slot filled">
          <div class="meal-label">Breakfast</div>
          <div class="meal-thumb golden"></div>
          <div class="meal-title">Shakshuka</div>
        </div>
        <div class="meal-slot">
          <div class="meal-label">Lunch</div>
          <div class="add-btn">+ Add</div>
        </div>
        <div class="meal-slot">
          <div class="meal-label">Dinner</div>
          <div class="add-btn">+ Add</div>
        </div>
      </div>
    </div>

    <div class="day-card">
      <div class="day-header">Saturday <span class="date">Feb 15</span></div>
      <div class="meals">
        <div class="meal-slot">
          <div class="meal-label">Breakfast</div>
          <div class="add-btn">+ Add</div>
        </div>
        <div class="meal-slot filled">
          <div class="meal-label">Lunch</div>
          <div class="meal-thumb green"></div>
          <div class="meal-title">Thai Basil Chicken</div>
        </div>
        <div class="meal-slot filled">
          <div class="meal-label">Dinner</div>
          <div class="meal-thumb warm"></div>
          <div class="meal-title">Margherita Pizza</div>
        </div>
      </div>
    </div>

    <div class="day-card">
      <div class="day-header">Sunday <span class="date">Feb 16</span></div>
      <div class="meals">
        <div class="meal-slot filled">
          <div class="meal-label">Breakfast</div>
          <div class="meal-thumb golden"></div>
          <div class="meal-title">Granola Bowl</div>
        </div>
        <div class="meal-slot">
          <div class="meal-label">Lunch</div>
          <div class="add-btn">+ Add</div>
        </div>
        <div class="meal-slot">
          <div class="meal-label">Dinner</div>
          <div class="add-btn">+ Add</div>
        </div>
      </div>
    </div>
  </div>

  <div class="sidebar-col">
    <div class="sidebar-card">
      <h3>📊 Weekly Nutrition</h3>
      <div class="nutrition-row"><span>Avg. Calories</span><span class="val">~1,850/day</span></div>
      <div class="nutrition-row"><span>Protein</span><span class="val">82g avg</span></div>
      <div class="nutrition-row"><span>Carbs</span><span class="val">210g avg</span></div>
      <div class="nutrition-row"><span>Fat</span><span class="val">65g avg</span></div>
      <div class="nutrition-row"><span>Meals planned</span><span class="val">12 / 21</span></div>
    </div>

    <div class="sidebar-card">
      <h3>🛒 Shopping Preview</h3>
      <div class="shopping-item"><span class="bullet"></span>Ramen noodles (4 packs)</div>
      <div class="shopping-item"><span class="bullet"></span>Miso paste</div>
      <div class="shopping-item"><span class="bullet"></span>Chicken thighs</div>
      <div class="shopping-item"><span class="bullet"></span>Fresh basil</div>
      <div class="shopping-item"><span class="bullet"></span>Chickpeas (2 cans)</div>
      <div class="shopping-item"><span class="bullet"></span>Tahini</div>
      <div class="shopping-item"><span class="bullet"></span>Mozzarella</div>
      <div class="shopping-item"><span class="bullet"></span>Pizza dough</div>
      <a class="sidebar-link" href="#" onclick="window.parent.postMessage({type:'navigate',page:'homepage'},'*');return false">View full list (14 items) →</a>
    </div>
  </div>
</div>

</body>
</html>`;
}
