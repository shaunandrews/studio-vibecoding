const NAV_ITEMS = [
  { page: 'homepage', label: 'Recipes', icon: '📖' },
  { page: 'browse', label: 'Browse', icon: '🔍' },
  { page: 'mealplan', label: 'Meal Plan', icon: '📅' },
  { page: 'groceries', label: 'Groceries', icon: '🛒' },
  { page: 'settings', label: 'Settings', icon: '⚙️' },
];

function renderNav(activePage: string): string {
  return NAV_ITEMS.map(n =>
    `<a href="#"${n.page === activePage ? ' class="active"' : ''} onclick="window.parent.postMessage({type:'navigate',page:'${n.page}'},'*');return false">${n.label}</a>`
  ).join('\n    ');
}

const APP_BAR_CSS = `
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
}`;

function renderAppBar(activePage: string): string {
  return `<div class="app-bar">
  <div class="logo">🍳 Mise en Place</div>
  <nav>
    ${renderNav(activePage)}
  </nav>
  <div class="spacer"></div>
  <div class="avatar">S</div>
</div>`;
}

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

${APP_BAR_CSS}

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

${renderAppBar('homepage')}

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
      <a class="link" href="#" onclick="window.parent.postMessage({type:'navigate',page:'groceries'},'*');return false">View List →</a>
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

${APP_BAR_CSS}

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

${renderAppBar('homepage')}

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

${APP_BAR_CSS}

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

${renderAppBar('mealplan')}

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
      <a class="sidebar-link" href="#" onclick="window.parent.postMessage({type:'navigate',page:'groceries'},'*');return false">View full list (14 items) →</a>
    </div>
  </div>
</div>

</body>
</html>`;
}

export function browse(themeCSS: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Browse Recipes – Mise en Place</title>
<style>${themeCSS}</style>
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: var(--theme-font-body); color: var(--theme-text); background: var(--theme-bg); line-height: var(--theme-line-height-normal); }
h1, h2, h3 { font-family: var(--theme-font-heading); }

${APP_BAR_CSS}

.browse-body {
  max-width: var(--theme-wide-width);
  margin: 0 auto;
  padding: var(--theme-space-4);
}
.browse-header {
  display: flex; align-items: center; justify-content: space-between;
  margin-bottom: var(--theme-space-3);
}
.browse-header h1 { font-size: var(--theme-font-size-xlarge); }
.browse-header .count { font-size: var(--theme-font-size-small); color: var(--theme-color-muted); }

.filter-bar {
  display: flex; gap: var(--theme-space-2); flex-wrap: wrap;
  margin-bottom: var(--theme-space-4);
  padding: var(--theme-space-2) var(--theme-space-3);
  background: var(--theme-color-surface);
  border: 1px solid var(--theme-color-border);
  border-radius: 10px;
  align-items: center;
}
.filter-bar .filter-label {
  font-size: var(--theme-font-size-small); font-weight: 700;
  color: var(--theme-color-muted); margin-right: var(--theme-space-1);
}
.filter-bar .sep {
  width: 1px; height: 24px; background: var(--theme-color-border);
  margin: 0 var(--theme-space-1);
}
.pill {
  padding: 6px 14px; border-radius: 20px; border: 1px solid var(--theme-color-border);
  background: transparent; font-size: var(--theme-font-size-small); font-weight: 600;
  color: var(--theme-color-muted); cursor: pointer; font-family: var(--theme-font-body);
  transition: all 0.15s;
}
.pill:hover { border-color: var(--theme-color-primary); color: var(--theme-text); }
.pill.active { background: var(--theme-color-primary); color: #fff; border-color: var(--theme-color-primary); }

.recipe-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: var(--theme-space-3);
}
.recipe-card {
  background: var(--theme-color-surface);
  border: 1px solid var(--theme-color-border);
  border-radius: 12px; overflow: hidden; cursor: pointer;
  transition: box-shadow 0.15s, transform 0.15s;
}
.recipe-card:hover { box-shadow: 0 6px 20px rgba(0,0,0,0.1); transform: translateY(-3px); }
.recipe-card .thumb {
  height: 140px; display: flex; align-items: flex-end; padding: var(--theme-space-2);
}
.recipe-card .difficulty {
  padding: 3px 8px; border-radius: 4px; font-size: 0.65rem;
  font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em;
  background: rgba(0,0,0,0.45); color: #fff; backdrop-filter: blur(4px);
}
.recipe-card .info { padding: var(--theme-space-2); }
.recipe-card .info h3 { font-size: var(--theme-font-size-medium); margin-bottom: 4px; }
.recipe-card .meta {
  display: flex; gap: var(--theme-space-1); align-items: center;
  font-size: var(--theme-font-size-small); color: var(--theme-color-muted); flex-wrap: wrap;
}
.tag {
  background: var(--theme-color-border); padding: 2px 8px; border-radius: 4px;
  font-size: 0.7rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.03em;
}
.thumb.g1 { background: linear-gradient(135deg, #F4845F, #E85D3A, #D4A84B); }
.thumb.g2 { background: linear-gradient(135deg, #7DB356, #5B8A3C, #A8D060); }
.thumb.g3 { background: linear-gradient(135deg, #E5A833, #E85D3A, #C94A2A); }
.thumb.g4 { background: linear-gradient(135deg, #5B8A3C, #3A7CA5, #7DB356); }
.thumb.g5 { background: linear-gradient(135deg, #8B5CF6, #6D28D9, #A78BFA); }
.thumb.g6 { background: linear-gradient(135deg, #E5A833, #D4A84B, #F0BC4A); }
.thumb.g7 { background: linear-gradient(135deg, #EC4899, #F472B6, #E85D3A); }
.thumb.g8 { background: linear-gradient(135deg, #06B6D4, #0891B2, #67E8F9); }
.thumb.g9 { background: linear-gradient(135deg, #84CC16, #65A30D, #BEF264); }
.thumb.g10 { background: linear-gradient(135deg, #F59E0B, #D97706, #FCD34D); }
.thumb.g11 { background: linear-gradient(135deg, #EF4444, #DC2626, #F87171); }
.thumb.g12 { background: linear-gradient(135deg, #8B5CF6, #EC4899, #F472B6); }
.thumb.g13 { background: linear-gradient(135deg, #14B8A6, #0D9488, #5EEAD4); }
.thumb.g14 { background: linear-gradient(135deg, #F97316, #EA580C, #FB923C); }
</style>
</head>
<body>

${renderAppBar('browse')}

<div class="browse-body">
  <div class="browse-header">
    <h1>Browse Recipes</h1>
    <span class="count">14 recipes</span>
  </div>

  <div class="filter-bar">
    <span class="filter-label">Cuisine:</span>
    <button class="pill active">All</button>
    <button class="pill">Italian</button>
    <button class="pill">Asian</button>
    <button class="pill">Mexican</button>
    <button class="pill">American</button>
    <div class="sep"></div>
    <span class="filter-label">Meal:</span>
    <button class="pill">Breakfast</button>
    <button class="pill">Lunch</button>
    <button class="pill">Dinner</button>
    <button class="pill">Snack</button>
  </div>

  <div class="recipe-grid">
    <div class="recipe-card" onclick="window.parent.postMessage({type:'navigate',page:'recipe'},'*');return false">
      <div class="thumb g3"><span class="difficulty">Medium</span></div>
      <div class="info"><h3>Spicy Miso Ramen</h3><div class="meta"><span class="tag">Japanese</span> · 45 min</div></div>
    </div>
    <div class="recipe-card" onclick="window.parent.postMessage({type:'navigate',page:'recipe'},'*');return false">
      <div class="thumb g2"><span class="difficulty">Easy</span></div>
      <div class="info"><h3>Thai Basil Chicken</h3><div class="meta"><span class="tag">Thai</span> · 25 min</div></div>
    </div>
    <div class="recipe-card" onclick="window.parent.postMessage({type:'navigate',page:'recipe'},'*');return false">
      <div class="thumb g1"><span class="difficulty">Medium</span></div>
      <div class="info"><h3>Margherita Pizza</h3><div class="meta"><span class="tag">Italian</span> · 35 min</div></div>
    </div>
    <div class="recipe-card" onclick="window.parent.postMessage({type:'navigate',page:'recipe'},'*');return false">
      <div class="thumb g4"><span class="difficulty">Easy</span></div>
      <div class="info"><h3>Falafel Bowl</h3><div class="meta"><span class="tag">Mediterranean</span> · 40 min</div></div>
    </div>
    <div class="recipe-card" onclick="window.parent.postMessage({type:'navigate',page:'recipe'},'*');return false">
      <div class="thumb g5"><span class="difficulty">Medium</span></div>
      <div class="info"><h3>Butter Chicken</h3><div class="meta"><span class="tag">Indian</span> · 50 min</div></div>
    </div>
    <div class="recipe-card" onclick="window.parent.postMessage({type:'navigate',page:'recipe'},'*');return false">
      <div class="thumb g6"><span class="difficulty">Easy</span></div>
      <div class="info"><h3>Shakshuka</h3><div class="meta"><span class="tag">Middle Eastern</span> · 30 min</div></div>
    </div>
    <div class="recipe-card" onclick="window.parent.postMessage({type:'navigate',page:'recipe'},'*');return false">
      <div class="thumb g7"><span class="difficulty">Hard</span></div>
      <div class="info"><h3>Beef Tacos al Pastor</h3><div class="meta"><span class="tag">Mexican</span> · 60 min</div></div>
    </div>
    <div class="recipe-card" onclick="window.parent.postMessage({type:'navigate',page:'recipe'},'*');return false">
      <div class="thumb g8"><span class="difficulty">Easy</span></div>
      <div class="info"><h3>Poke Bowl</h3><div class="meta"><span class="tag">Hawaiian</span> · 20 min</div></div>
    </div>
    <div class="recipe-card" onclick="window.parent.postMessage({type:'navigate',page:'recipe'},'*');return false">
      <div class="thumb g9"><span class="difficulty">Easy</span></div>
      <div class="info"><h3>Avocado Toast</h3><div class="meta"><span class="tag">American</span> · 10 min</div></div>
    </div>
    <div class="recipe-card" onclick="window.parent.postMessage({type:'navigate',page:'recipe'},'*');return false">
      <div class="thumb g10"><span class="difficulty">Medium</span></div>
      <div class="info"><h3>Pad Thai</h3><div class="meta"><span class="tag">Thai</span> · 35 min</div></div>
    </div>
    <div class="recipe-card" onclick="window.parent.postMessage({type:'navigate',page:'recipe'},'*');return false">
      <div class="thumb g11"><span class="difficulty">Hard</span></div>
      <div class="info"><h3>Osso Buco</h3><div class="meta"><span class="tag">Italian</span> · 180 min</div></div>
    </div>
    <div class="recipe-card" onclick="window.parent.postMessage({type:'navigate',page:'recipe'},'*');return false">
      <div class="thumb g12"><span class="difficulty">Easy</span></div>
      <div class="info"><h3>Açaí Bowl</h3><div class="meta"><span class="tag">Brazilian</span> · 10 min</div></div>
    </div>
    <div class="recipe-card" onclick="window.parent.postMessage({type:'navigate',page:'recipe'},'*');return false">
      <div class="thumb g13"><span class="difficulty">Medium</span></div>
      <div class="info"><h3>Green Curry</h3><div class="meta"><span class="tag">Thai</span> · 40 min</div></div>
    </div>
    <div class="recipe-card" onclick="window.parent.postMessage({type:'navigate',page:'recipe'},'*');return false">
      <div class="thumb g14"><span class="difficulty">Easy</span></div>
      <div class="info"><h3>Smash Burger</h3><div class="meta"><span class="tag">American</span> · 15 min</div></div>
    </div>
  </div>
</div>

</body>
</html>`;
}

export function groceries(themeCSS: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Grocery List – Mise en Place</title>
<style>${themeCSS}</style>
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: var(--theme-font-body); color: var(--theme-text); background: var(--theme-bg); line-height: var(--theme-line-height-normal); }
h1, h2, h3 { font-family: var(--theme-font-heading); }

${APP_BAR_CSS}

.groceries-body {
  max-width: var(--theme-content-width);
  margin: 0 auto;
  padding: var(--theme-space-4);
}
.groceries-header { margin-bottom: var(--theme-space-4); }
.groceries-header h1 { font-size: var(--theme-font-size-xlarge); margin-bottom: 4px; }
.groceries-header .subtitle { font-size: var(--theme-font-size-small); color: var(--theme-color-muted); }

.summary-bar {
  display: flex; gap: var(--theme-space-4); flex-wrap: wrap;
  padding: var(--theme-space-2) var(--theme-space-3);
  background: var(--theme-color-surface);
  border: 1px solid var(--theme-color-border);
  border-radius: 10px;
  margin-bottom: var(--theme-space-4);
  align-items: center;
}
.summary-stat { display: flex; align-items: baseline; gap: 6px; }
.summary-stat .val {
  font-size: var(--theme-font-size-large); font-weight: 800;
  color: var(--theme-color-primary); font-family: var(--theme-font-heading);
}
.summary-stat .label { font-size: var(--theme-font-size-small); color: var(--theme-color-muted); }
.summary-bar .spacer { flex: 1; }
.summary-bar .btn {
  padding: var(--theme-space-1) var(--theme-space-3);
  border-radius: 8px; font-weight: 700; font-size: var(--theme-font-size-small);
  border: none; cursor: pointer; font-family: var(--theme-font-body);
  background: var(--theme-color-primary); color: #fff;
}

.aisle-section { margin-bottom: var(--theme-space-4); }
.aisle-header {
  display: flex; align-items: center; gap: var(--theme-space-1);
  margin-bottom: var(--theme-space-2);
  padding-bottom: var(--theme-space-1);
  border-bottom: 2px solid var(--theme-color-primary);
}
.aisle-header .icon { font-size: 1.2rem; }
.aisle-header h2 { font-size: var(--theme-font-size-large); }
.aisle-header .aisle-count {
  font-size: var(--theme-font-size-small); color: var(--theme-color-muted); margin-left: auto;
}

.grocery-item {
  display: flex; align-items: center; gap: var(--theme-space-2);
  padding: var(--theme-space-2);
  border-bottom: 1px solid var(--theme-color-border);
  transition: background 0.1s;
}
.grocery-item:hover { background: var(--theme-color-surface); }
.grocery-item:last-child { border-bottom: none; }
.grocery-item input[type="checkbox"] {
  width: 18px; height: 18px; accent-color: var(--theme-color-primary);
  cursor: pointer; flex-shrink: 0;
}
.grocery-item .item-name { flex: 1; font-size: var(--theme-font-size-medium); }
.grocery-item .item-qty {
  font-size: var(--theme-font-size-small); color: var(--theme-color-muted);
  min-width: 60px; text-align: right;
}
.grocery-item .item-recipe {
  font-size: 0.7rem; color: var(--theme-color-muted);
  background: var(--theme-color-border); padding: 2px 8px; border-radius: 4px;
  white-space: nowrap;
}
.checked .item-name { text-decoration: line-through; color: var(--theme-color-muted); }
</style>
</head>
<body>

${renderAppBar('groceries')}

<div class="groceries-body">
  <div class="groceries-header">
    <h1>🛒 Grocery List</h1>
    <div class="subtitle">Based on this week's meal plan · Feb 10 – 16</div>
  </div>

  <div class="summary-bar">
    <div class="summary-stat"><span class="val">23</span><span class="label">items</span></div>
    <div class="summary-stat"><span class="val">~$64</span><span class="label">estimated</span></div>
    <div class="summary-stat"><span class="val">5</span><span class="label">recipes</span></div>
    <div class="spacer"></div>
    <button class="btn">Share List</button>
  </div>

  <div class="aisle-section">
    <div class="aisle-header"><span class="icon">🥬</span><h2>Produce</h2><span class="aisle-count">7 items</span></div>
    <div class="grocery-item"><input type="checkbox"><span class="item-name">Green onions</span><span class="item-qty">2 bunches</span><span class="item-recipe">Ramen, Pad Thai</span></div>
    <div class="grocery-item"><input type="checkbox"><span class="item-name">Fresh basil</span><span class="item-qty">1 bunch</span><span class="item-recipe">Thai Basil Chicken</span></div>
    <div class="grocery-item"><input type="checkbox"><span class="item-name">Bean sprouts</span><span class="item-qty">200g</span><span class="item-recipe">Ramen</span></div>
    <div class="grocery-item"><input type="checkbox"><span class="item-name">Avocados</span><span class="item-qty">3</span><span class="item-recipe">Poke Bowl</span></div>
    <div class="grocery-item"><input type="checkbox"><span class="item-name">Limes</span><span class="item-qty">4</span><span class="item-recipe">Pad Thai, Tacos</span></div>
    <div class="grocery-item"><input type="checkbox"><span class="item-name">Roma tomatoes</span><span class="item-qty">6</span><span class="item-recipe">Shakshuka, Pizza</span></div>
    <div class="grocery-item"><input type="checkbox"><span class="item-name">Corn kernels</span><span class="item-qty">1 cup</span><span class="item-recipe">Ramen</span></div>
  </div>

  <div class="aisle-section">
    <div class="aisle-header"><span class="icon">🧀</span><h2>Dairy</h2><span class="aisle-count">3 items</span></div>
    <div class="grocery-item"><input type="checkbox"><span class="item-name">Fresh mozzarella</span><span class="item-qty">250g</span><span class="item-recipe">Pizza</span></div>
    <div class="grocery-item"><input type="checkbox"><span class="item-name">Eggs</span><span class="item-qty">1 dozen</span><span class="item-recipe">Ramen, Shakshuka</span></div>
    <div class="grocery-item"><input type="checkbox"><span class="item-name">Butter</span><span class="item-qty">1 stick</span><span class="item-recipe">Butter Chicken</span></div>
  </div>

  <div class="aisle-section">
    <div class="aisle-header"><span class="icon">🥫</span><h2>Pantry</h2><span class="aisle-count">7 items</span></div>
    <div class="grocery-item"><input type="checkbox"><span class="item-name">White miso paste</span><span class="item-qty">3 tbsp</span><span class="item-recipe">Ramen</span></div>
    <div class="grocery-item"><input type="checkbox"><span class="item-name">Chili garlic sauce</span><span class="item-qty">1 jar</span><span class="item-recipe">Ramen</span></div>
    <div class="grocery-item"><input type="checkbox"><span class="item-name">Sesame oil</span><span class="item-qty">1 bottle</span><span class="item-recipe">Ramen, Poke</span></div>
    <div class="grocery-item"><input type="checkbox"><span class="item-name">Chickpeas</span><span class="item-qty">2 cans</span><span class="item-recipe">Falafel Bowl</span></div>
    <div class="grocery-item"><input type="checkbox"><span class="item-name">Tahini</span><span class="item-qty">1 jar</span><span class="item-recipe">Falafel Bowl</span></div>
    <div class="grocery-item"><input type="checkbox"><span class="item-name">Ramen noodles</span><span class="item-qty">4 packs</span><span class="item-recipe">Ramen</span></div>
    <div class="grocery-item checked"><input type="checkbox" checked><span class="item-name">Soy sauce</span><span class="item-qty">1 bottle</span><span class="item-recipe">Multiple</span></div>
  </div>

  <div class="aisle-section">
    <div class="aisle-header"><span class="icon">🥩</span><h2>Meat &amp; Seafood</h2><span class="aisle-count">4 items</span></div>
    <div class="grocery-item"><input type="checkbox"><span class="item-name">Chashu pork belly</span><span class="item-qty">200g</span><span class="item-recipe">Ramen</span></div>
    <div class="grocery-item"><input type="checkbox"><span class="item-name">Chicken thighs</span><span class="item-qty">500g</span><span class="item-recipe">Thai Basil, Butter Chicken</span></div>
    <div class="grocery-item"><input type="checkbox"><span class="item-name">Sushi-grade tuna</span><span class="item-qty">300g</span><span class="item-recipe">Poke Bowl</span></div>
    <div class="grocery-item"><input type="checkbox"><span class="item-name">Ground beef</span><span class="item-qty">400g</span><span class="item-recipe">Tacos</span></div>
  </div>

  <div class="aisle-section">
    <div class="aisle-header"><span class="icon">🍞</span><h2>Bakery</h2><span class="aisle-count">2 items</span></div>
    <div class="grocery-item"><input type="checkbox"><span class="item-name">Pizza dough</span><span class="item-qty">1 ball</span><span class="item-recipe">Pizza</span></div>
    <div class="grocery-item"><input type="checkbox"><span class="item-name">Nori sheets</span><span class="item-qty">4 sheets</span><span class="item-recipe">Ramen</span></div>
  </div>
</div>

</body>
</html>`;
}

export function settings(themeCSS: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Settings – Mise en Place</title>
<style>${themeCSS}</style>
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: var(--theme-font-body); color: var(--theme-text); background: var(--theme-bg); line-height: var(--theme-line-height-normal); }
h1, h2, h3 { font-family: var(--theme-font-heading); }

${APP_BAR_CSS}

.settings-body {
  max-width: 640px;
  margin: 0 auto;
  padding: var(--theme-space-4);
}
.settings-body h1 { font-size: var(--theme-font-size-xlarge); margin-bottom: var(--theme-space-4); }

.settings-section {
  background: var(--theme-color-surface);
  border: 1px solid var(--theme-color-border);
  border-radius: 12px;
  padding: var(--theme-space-3);
  margin-bottom: var(--theme-space-3);
}
.settings-section h2 {
  font-size: var(--theme-font-size-large); margin-bottom: var(--theme-space-2);
  display: flex; align-items: center; gap: var(--theme-space-1);
}
.settings-section p.desc {
  font-size: var(--theme-font-size-small); color: var(--theme-color-muted);
  margin-bottom: var(--theme-space-2);
}

.checkbox-group { display: flex; flex-wrap: wrap; gap: var(--theme-space-2); }
.checkbox-label {
  display: flex; align-items: center; gap: 6px;
  font-size: var(--theme-font-size-small); cursor: pointer;
  padding: 6px 12px; border-radius: 8px; border: 1px solid var(--theme-color-border);
  transition: border-color 0.15s;
}
.checkbox-label:hover { border-color: var(--theme-color-primary); }
.checkbox-label input { accent-color: var(--theme-color-primary); cursor: pointer; }

.setting-row {
  display: flex; align-items: center; justify-content: space-between;
  padding: var(--theme-space-2) 0;
  border-bottom: 1px solid var(--theme-color-border);
}
.setting-row:last-child { border-bottom: none; }
.setting-row .setting-info { flex: 1; }
.setting-row .setting-label { font-size: var(--theme-font-size-medium); font-weight: 600; }
.setting-row .setting-desc { font-size: var(--theme-font-size-small); color: var(--theme-color-muted); }

.toggle { position: relative; width: 44px; height: 24px; flex-shrink: 0; }
.toggle input { opacity: 0; width: 0; height: 0; }
.toggle .slider {
  position: absolute; cursor: pointer; inset: 0;
  background: var(--theme-color-border); border-radius: 24px; transition: background 0.2s;
}
.toggle .slider::before {
  content: ''; position: absolute; width: 18px; height: 18px;
  left: 3px; bottom: 3px; background: #fff; border-radius: 50%; transition: transform 0.2s;
}
.toggle input:checked + .slider { background: var(--theme-color-primary); }
.toggle input:checked + .slider::before { transform: translateX(20px); }

.number-input {
  width: 64px; padding: 6px 10px; border: 1px solid var(--theme-color-border);
  border-radius: 8px; font-size: var(--theme-font-size-medium);
  font-family: var(--theme-font-body); color: var(--theme-text);
  background: var(--theme-bg); text-align: center;
}

.radio-group { display: flex; gap: 0; border: 1px solid var(--theme-color-border); border-radius: 8px; overflow: hidden; }
.radio-option {
  padding: 6px 16px; font-size: var(--theme-font-size-small); font-weight: 600;
  cursor: pointer; background: transparent; color: var(--theme-color-muted);
  border: none; font-family: var(--theme-font-body);
  border-right: 1px solid var(--theme-color-border); transition: all 0.15s;
}
.radio-option:last-child { border-right: none; }
.radio-option.active { background: var(--theme-color-primary); color: #fff; }
.radio-option:hover:not(.active) { background: var(--theme-color-border); color: var(--theme-text); }

.connected-service {
  display: flex; align-items: center; gap: var(--theme-space-2);
  padding: var(--theme-space-2) 0;
  border-bottom: 1px solid var(--theme-color-border);
}
.connected-service:last-child { border-bottom: none; }
.service-icon {
  width: 36px; height: 36px; border-radius: 8px;
  display: flex; align-items: center; justify-content: center;
  font-size: 1.2rem; flex-shrink: 0;
}
.service-icon.green { background: #DEF7EC; }
.service-icon.blue { background: #DBEAFE; }
.service-icon.red { background: #FEE2E2; }
.connected-service .service-info { flex: 1; }
.connected-service .service-name { font-size: var(--theme-font-size-medium); font-weight: 600; }
.connected-service .service-status { font-size: var(--theme-font-size-small); color: var(--theme-color-muted); }
.connect-btn {
  padding: 4px 12px; border-radius: 6px; font-size: var(--theme-font-size-small);
  font-weight: 600; border: 1px solid var(--theme-color-border); background: transparent;
  color: var(--theme-color-primary); cursor: pointer; font-family: var(--theme-font-body);
}
.connect-btn.connected { color: var(--theme-color-muted); }

.danger-zone { border-color: #FCA5A5 !important; }
.danger-zone h2 { color: #DC2626; }
.danger-btn {
  padding: var(--theme-space-1) var(--theme-space-3);
  border-radius: 8px; font-weight: 700; font-size: var(--theme-font-size-small);
  border: 1px solid var(--theme-color-border); cursor: pointer;
  font-family: var(--theme-font-body); background: transparent;
  color: var(--theme-text); transition: all 0.15s;
}
.danger-btn:hover { background: #FEE2E2; border-color: #FCA5A5; }
.danger-btn.destructive { background: #DC2626; color: #fff; border-color: #DC2626; }
.danger-btn.destructive:hover { background: #B91C1C; }
</style>
</head>
<body>

${renderAppBar('settings')}

<div class="settings-body">
  <h1>⚙️ Settings</h1>

  <div class="settings-section">
    <h2>🥗 Dietary Preferences</h2>
    <p class="desc">We'll filter recipes and flag ingredients based on your preferences.</p>
    <div class="checkbox-group">
      <label class="checkbox-label"><input type="checkbox"> Vegetarian</label>
      <label class="checkbox-label"><input type="checkbox" checked> Gluten-Free</label>
      <label class="checkbox-label"><input type="checkbox"> Vegan</label>
      <label class="checkbox-label"><input type="checkbox"> Dairy-Free</label>
      <label class="checkbox-label"><input type="checkbox"> Nut-Free</label>
      <label class="checkbox-label"><input type="checkbox"> Low-Carb</label>
    </div>
  </div>

  <div class="settings-section">
    <h2>👥 Household</h2>
    <div class="setting-row">
      <div class="setting-info">
        <div class="setting-label">Household Size</div>
        <div class="setting-desc">Recipes will scale servings automatically</div>
      </div>
      <input type="number" class="number-input" value="2" min="1" max="12">
    </div>
    <div class="setting-row">
      <div class="setting-info">
        <div class="setting-label">Measurement System</div>
        <div class="setting-desc">Used for ingredient quantities</div>
      </div>
      <div class="radio-group">
        <button class="radio-option active">Imperial</button>
        <button class="radio-option">Metric</button>
      </div>
    </div>
  </div>

  <div class="settings-section">
    <h2>🔔 Notifications</h2>
    <div class="setting-row">
      <div class="setting-info">
        <div class="setting-label">Meal Reminders</div>
        <div class="setting-desc">Get notified 30 min before planned meals</div>
      </div>
      <label class="toggle"><input type="checkbox" checked><span class="slider"></span></label>
    </div>
    <div class="setting-row">
      <div class="setting-info">
        <div class="setting-label">Shopping Day Reminder</div>
        <div class="setting-desc">Weekly reminder to review your grocery list</div>
      </div>
      <label class="toggle"><input type="checkbox" checked><span class="slider"></span></label>
    </div>
    <div class="setting-row">
      <div class="setting-info">
        <div class="setting-label">New Recipe Suggestions</div>
        <div class="setting-desc">Weekly recipe ideas based on your preferences</div>
      </div>
      <label class="toggle"><input type="checkbox"><span class="slider"></span></label>
    </div>
  </div>

  <div class="settings-section">
    <h2>🔗 Connected Services</h2>
    <div class="connected-service">
      <div class="service-icon green">🍏</div>
      <div class="service-info"><div class="service-name">Apple Health</div><div class="service-status">Connected · syncing nutrition data</div></div>
      <button class="connect-btn connected">Disconnect</button>
    </div>
    <div class="connected-service">
      <div class="service-icon blue">📦</div>
      <div class="service-info"><div class="service-name">Instacart</div><div class="service-status">Connected · auto-order groceries</div></div>
      <button class="connect-btn connected">Disconnect</button>
    </div>
    <div class="connected-service">
      <div class="service-icon red">📺</div>
      <div class="service-info"><div class="service-name">YouTube</div><div class="service-status">Not connected</div></div>
      <button class="connect-btn">Connect</button>
    </div>
  </div>

  <div class="settings-section danger-zone">
    <h2>⚠️ Danger Zone</h2>
    <div class="setting-row">
      <div class="setting-info">
        <div class="setting-label">Clear All Data</div>
        <div class="setting-desc">Remove all recipes, meal plans, and shopping lists</div>
      </div>
      <button class="danger-btn">Clear Data</button>
    </div>
    <div class="setting-row">
      <div class="setting-info">
        <div class="setting-label">Delete Account</div>
        <div class="setting-desc">Permanently delete your account and all data</div>
      </div>
      <button class="danger-btn destructive">Delete Account</button>
    </div>
  </div>
</div>

</body>
</html>`;
}
