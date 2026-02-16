// Mise en Place — Custom CSS
// App-style UI with app bar, recipe cards, meal planner, grocery list, settings

export const miseCSS = `
/* ---- App Bar ---- */
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

/* ---- Search Bar ---- */
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

/* ---- App Body (2-column layout) ---- */
.app-body {
  max-width: var(--theme-wide-width);
  margin: 0 auto;
  padding: var(--theme-space-4);
  display: grid;
  grid-template-columns: 1fr 280px;
  gap: var(--theme-space-4);
}

/* ---- Recipe Grid ---- */
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
.recipe-card .thumb { height: 120px; }
.recipe-card .thumb.green { background: linear-gradient(135deg, #7DB356, #5B8A3C, #A8D060); }
.recipe-card .thumb.warm { background: linear-gradient(135deg, #F4845F, #E85D3A, #D4A84B); }
.recipe-card .thumb.cool { background: linear-gradient(135deg, #5B8A3C, #3A7CA5, #7DB356); }
.recipe-card .thumb.purple { background: linear-gradient(135deg, #8B5CF6, #E85D3A, #F4845F); }
.recipe-card .thumb.golden { background: linear-gradient(135deg, #E5A833, #D4A84B, #F0BC4A); }
.recipe-card .thumb.default { background: linear-gradient(135deg, #F4845F, #E85D3A, #D4A84B); }
.recipe-card .info { padding: var(--theme-space-2); }
.recipe-card .info h3 { font-size: var(--theme-font-size-medium); margin-bottom: 4px; }
.recipe-card .meta { display: flex; gap: var(--theme-space-1); align-items: center; font-size: var(--theme-font-size-small); color: var(--theme-color-muted); }
.tag {
  background: var(--theme-color-border);
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

/* ---- Meal Plan Preview ---- */
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

/* ---- Sidebar Cards ---- */
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

/* ---- Recipe Detail Page ---- */
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
.tags .tag {
  padding: 4px 12px; border-radius: 20px;
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

/* ---- Meal Plan Full ---- */
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
.shopping-item {
  display: flex; align-items: center; gap: var(--theme-space-1);
  padding: 4px 0; font-size: var(--theme-font-size-small);
  border-bottom: 1px solid var(--theme-color-border);
  color: var(--theme-color-muted);
}
.shopping-item:last-child { border-bottom: none; }
.bullet { width: 6px; height: 6px; border-radius: 50%; background: var(--theme-color-primary); flex-shrink: 0; }

/* ---- Browse Page ---- */
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
.browse-body .recipe-grid {
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
}
.browse-body .recipe-card { border-radius: 12px; }
.browse-body .recipe-card:hover { box-shadow: 0 6px 20px rgba(0,0,0,0.1); transform: translateY(-3px); }
.browse-body .recipe-card .thumb {
  height: 140px; display: flex; align-items: flex-end; padding: var(--theme-space-2);
}
.difficulty {
  padding: 3px 8px; border-radius: 4px; font-size: 0.65rem;
  font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em;
  background: rgba(0,0,0,0.45); color: #fff; backdrop-filter: blur(4px);
}
/* Browse thumb gradients */
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

/* ---- Grocery List ---- */
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

/* ---- Settings ---- */
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
`
