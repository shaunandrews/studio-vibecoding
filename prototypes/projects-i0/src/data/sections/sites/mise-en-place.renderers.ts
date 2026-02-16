// Mise en Place — Section renderers
import type { Section } from '../types'
import type {
  MiseAppBarData,
  MiseSearchBarData,
  MiseRecipeGridData,
  MiseRecipeDetailData,
  MiseMealPlanPreviewData,
  MiseMealPlanFullData,
  MiseGroceryListData,
  MiseBrowseHeaderData,
  MiseFilterBarData,
  MiseBrowseRecipeGridData,
  MiseSettingsData,
  MiseSettingItem,
} from './mise-en-place.types'

export function renderMiseSection(section: Section, activePage: string): string | null {
  const d = section.data as Record<string, unknown>
  switch (section.type) {
    case 'mise-app-bar': return renderAppBarWithActive(d as MiseAppBarData, activePage)
    case 'mise-search-bar': return renderSearchBar(d as MiseSearchBarData)
    case 'mise-recipe-grid': return renderRecipeGrid(d as MiseRecipeGridData)
    case 'mise-recipe-detail': return renderRecipeDetail(d as MiseRecipeDetailData)
    case 'mise-meal-plan-preview': return renderMealPlanPreview(d as MiseMealPlanPreviewData)
    case 'mise-meal-plan-full': return renderMealPlanFull(d as MiseMealPlanFullData)
    case 'mise-grocery-list': return renderGroceryList(d as MiseGroceryListData)
    case 'mise-browse-header': return renderBrowseHeader(d as MiseBrowseHeaderData)
    case 'mise-filter-bar': return renderFilterBar(d as MiseFilterBarData)
    case 'mise-browse-recipe-grid': return renderBrowseRecipeGrid(d as MiseBrowseRecipeGridData)
    case 'mise-settings': return renderSettings(d as MiseSettingsData)
    default: return null
  }
}

// Shared nav render helper
function renderNav(navItems: MiseAppBarData['navItems'], activePage: string): string {
  return navItems.map(n =>
    `<a href="#"${n.page === activePage ? ' class="active"' : ''} onclick="window.parent.postMessage({type:'navigate',page:'${n.page}'},'*');return false">${n.label}</a>`
  ).join('\n    ')
}

function renderAppBar(data: MiseAppBarData): string {
  // activePage is encoded in the section id as "app-bar-{page}"
  // We extract it by convention or default to empty
  return `<div class="app-bar" data-nav-items='${JSON.stringify(data.navItems)}' data-avatar="${data.avatarInitial}">
  <div class="logo">${data.logo}</div>
  <nav>
    ${renderNav(data.navItems, '')}
  </nav>
  <div class="spacer"></div>
  <div class="avatar">${data.avatarInitial}</div>
</div>`
}

// We need the active page to highlight nav. Since renderPage passes activePage to header but not sections,
// we'll encode the active page in the section id. The renderers in the site file will create the app bar
// HTML directly with the correct active state. Actually, let's make the app bar render function accept
// the active page from the data.

// Revised: add activePage to the data
function renderAppBarWithActive(data: MiseAppBarData, activePage: string): string {
  return `<div class="app-bar">
  <div class="logo">${data.logo}</div>
  <nav>
    ${renderNav(data.navItems, activePage)}
  </nav>
  <div class="spacer"></div>
  <div class="avatar">${data.avatarInitial}</div>
</div>`
}


function renderSearchBar(data: MiseSearchBarData): string {
  return `<div class="search-bar">
    <span class="icon">${data.icon}</span>
    <input type="text" placeholder="${data.placeholder}" />
  </div>`
}

function renderRecipeGrid(data: MiseRecipeGridData): string {
  const heading = data.heading ? `<h2>${data.heading}</h2>` : ''
  const cards = data.recipes.map(r => `
      <div class="recipe-card" onclick="window.parent.postMessage({type:'navigate',page:'${r.linkPage}'},'*');return false">
        <div class="thumb ${r.thumbClass}"></div>
        <div class="info">
          <h3>${r.title}</h3>
          <div class="meta"><span class="tag">${r.tag}</span> · ${r.time}</div>
        </div>
      </div>`).join('')
  return `${heading}
    <div class="recipe-grid">${cards}
    </div>`
}

function renderRecipeDetail(data: MiseRecipeDetailData): string {
  const ingredientItems = data.ingredients.map(i => `<li><div class="checkbox"></div>${i}</li>`).join('\n        ')
  const stepItems = data.steps.map((s, i) => `
        <div class="step">
          <div class="step-num">${i + 1}</div>
          <p>${s}</p>
        </div>`).join('')
  const tagItems = data.tags.map(t => `<span class="tag">${t}</span>`).join('\n        ')

  return `<div class="recipe-page">
  <a class="back-link" href="#" onclick="window.parent.postMessage({type:'navigate',page:'${data.backLink.page}'},'*');return false">${data.backLink.label}</a>

  <div class="recipe-header">
    <h1>${data.title}</h1>
    <div class="meta-row">
      <div class="meta-item">⏱ <strong>${data.prepTime}</strong> prep</div>
      <div class="meta-item">🍽 <strong>${data.servings}</strong> servings</div>
      <div class="meta-item">📊 <strong>${data.difficulty}</strong> difficulty</div>
    </div>
  </div>

  <div class="recipe-image" style="background: ${data.imageGradient}"></div>

  <div class="recipe-content">
    <div class="ingredients">
      <h2>Ingredients</h2>
      <ul>
        ${ingredientItems}
      </ul>
    </div>

    <div class="steps-col">
      <div class="steps">
        <h2>Instructions</h2>${stepItems}
      </div>

      <div class="tags">
        ${tagItems}
      </div>

      <div class="actions">
        <button class="btn btn-primary">📅 Add to Meal Plan</button>
        <button class="btn btn-secondary">🛒 Add to Shopping List</button>
      </div>

      <div class="notes-section">
        <h3>📝 Notes</h3>
        <p>${data.notes}</p>
      </div>
    </div>
  </div>
</div>`
}

function renderMealPlanPreview(data: MiseMealPlanPreviewData): string {
  const rows = data.days.map(d => {
    if (d.meal) {
      return `<div class="day-row"><span class="day-label">${d.label}</span><span class="meal-name">${d.meal}</span></div>`
    }
    return `<div class="day-row"><span class="day-label">${d.label}</span><span class="meal-name empty" onclick="window.parent.postMessage({type:'navigate',page:'mealplan'},'*');return false">+ Add meal</span></div>`
  }).join('\n      ')

  return `<h2>${data.heading}</h2>
    <div class="meal-plan-preview">
      ${rows}
    </div>`
}

function renderMealPlanFull(data: MiseMealPlanFullData): string {
  const dayCards = data.days.map(day => {
    const mealSlots = day.meals.map(m => {
      if (m.title) {
        return `<div class="meal-slot filled">
          <div class="meal-label">${m.label}</div>
          <div class="meal-thumb ${m.thumbClass || ''}"></div>
          <div class="meal-title">${m.title}</div>
        </div>`
      }
      return `<div class="meal-slot">
          <div class="meal-label">${m.label}</div>
          <div class="add-btn">+ Add</div>
        </div>`
    }).join('\n        ')

    return `<div class="day-card">
      <div class="day-header">${day.dayName} <span class="date">${day.date}</span></div>
      <div class="meals">
        ${mealSlots}
      </div>
    </div>`
  }).join('\n\n    ')

  const nutritionRows = data.nutrition.map(n =>
    `<div class="nutrition-row"><span>${n.label}</span><span class="val">${n.value}</span></div>`
  ).join('\n      ')

  const shoppingItems = data.shoppingPreview.map(s =>
    `<div class="shopping-item"><span class="bullet"></span>${s.name}</div>`
  ).join('\n      ')

  return `<div class="plan-body">
  <div class="week-selector">
    <button>←</button>
    <h2>${data.weekLabel}</h2>
    <button>→</button>
  </div>

  <div class="days-grid">
    ${dayCards}
  </div>

  <div class="sidebar-col">
    <div class="sidebar-card">
      <h3>📊 Weekly Nutrition</h3>
      ${nutritionRows}
    </div>

    <div class="sidebar-card">
      <h3>🛒 Shopping Preview</h3>
      ${shoppingItems}
      <a class="sidebar-link" href="#" onclick="window.parent.postMessage({type:'navigate',page:'groceries'},'*');return false">${data.shoppingLinkLabel}</a>
    </div>
  </div>
</div>`
}

function renderGroceryList(data: MiseGroceryListData): string {
  const aisles = data.aisles.map(aisle => {
    const items = aisle.items.map(item => {
      const checkedClass = item.checked ? ' checked' : ''
      const checkedAttr = item.checked ? ' checked' : ''
      return `<div class="grocery-item${checkedClass}"><input type="checkbox"${checkedAttr}><span class="item-name">${item.name}</span><span class="item-qty">${item.qty}</span><span class="item-recipe">${item.recipe}</span></div>`
    }).join('\n    ')

    return `<div class="aisle-section">
    <div class="aisle-header"><span class="icon">${aisle.icon}</span><h2>${aisle.name}</h2><span class="aisle-count">${aisle.items.length} items</span></div>
    ${items}
  </div>`
  }).join('\n\n  ')

  return `<div class="groceries-body">
  <div class="groceries-header">
    <h1>${data.title}</h1>
    <div class="subtitle">${data.subtitle}</div>
  </div>

  <div class="summary-bar">
    <div class="summary-stat"><span class="val">${data.totalItems}</span><span class="label">items</span></div>
    <div class="summary-stat"><span class="val">${data.estimatedCost}</span><span class="label">estimated</span></div>
    <div class="summary-stat"><span class="val">${data.recipeCount}</span><span class="label">recipes</span></div>
    <div class="spacer"></div>
    <button class="btn">Share List</button>
  </div>

  ${aisles}
</div>`
}

function renderBrowseHeader(data: MiseBrowseHeaderData): string {
  return `<div class="browse-header">
    <h1>${data.title}</h1>
    <span class="count">${data.count}</span>
  </div>`
}

function renderFilterBar(data: MiseFilterBarData): string {
  const groups = data.groups.map((group, i) => {
    const pills = group.options.map(o =>
      `<button class="pill${o.active ? ' active' : ''}">${o.label}</button>`
    ).join('\n    ')
    const sep = i < data.groups.length - 1 ? '\n    <div class="sep"></div>' : ''
    return `<span class="filter-label">${group.label}:</span>\n    ${pills}${sep}`
  }).join('\n    ')

  return `<div class="filter-bar">
    ${groups}
  </div>`
}

function renderBrowseRecipeGrid(data: MiseBrowseRecipeGridData): string {
  const cards = data.recipes.map(r => `
      <div class="recipe-card" onclick="window.parent.postMessage({type:'navigate',page:'${r.linkPage}'},'*');return false">
        <div class="thumb ${r.thumbClass}"><span class="difficulty">${r.difficulty}</span></div>
        <div class="info"><h3>${r.title}</h3><div class="meta"><span class="tag">${r.tag}</span> · ${r.time}</div></div>
      </div>`).join('')

  return `<div class="recipe-grid">${cards}
    </div>`
}

function renderSettingItem(item: MiseSettingItem): string {
  switch (item.type) {
    case 'toggle':
      return `<div class="setting-row">
      <div class="setting-info">
        <div class="setting-label">${item.label}</div>
        <div class="setting-desc">${item.description}</div>
      </div>
      <label class="toggle"><input type="checkbox"${item.checked ? ' checked' : ''}><span class="slider"></span></label>
    </div>`

    case 'number':
      return `<div class="setting-row">
      <div class="setting-info">
        <div class="setting-label">${item.label}</div>
        <div class="setting-desc">${item.description}</div>
      </div>
      <input type="number" class="number-input" value="${item.value}" min="${item.min}" max="${item.max}">
    </div>`

    case 'radio':
      const options = item.options.map(o =>
        `<button class="radio-option${o === item.active ? ' active' : ''}">${o}</button>`
      ).join('')
      return `<div class="setting-row">
      <div class="setting-info">
        <div class="setting-label">${item.label}</div>
        <div class="setting-desc">${item.description}</div>
      </div>
      <div class="radio-group">${options}</div>
    </div>`

    case 'checkbox-group':
      const checks = item.options.map(o =>
        `<label class="checkbox-label"><input type="checkbox"${o.checked ? ' checked' : ''}> ${o.label}</label>`
      ).join('\n      ')
      return `<p class="desc">${item.description}</p>
    <div class="checkbox-group">
      ${checks}
    </div>`

    case 'connected-services':
      const services = item.services.map(s =>
        `<div class="connected-service">
      <div class="service-icon ${s.iconClass}">${s.icon}</div>
      <div class="service-info"><div class="service-name">${s.name}</div><div class="service-status">${s.status}</div></div>
      <button class="connect-btn${s.connected ? ' connected' : ''}">${s.connected ? 'Disconnect' : 'Connect'}</button>
    </div>`
      ).join('\n    ')
      return services

    case 'danger-zone':
      return item.actions.map(a =>
        `<div class="setting-row">
      <div class="setting-info">
        <div class="setting-label">${a.label}</div>
        <div class="setting-desc">${a.description}</div>
      </div>
      <button class="danger-btn${a.destructive ? ' destructive' : ''}">${a.label}</button>
    </div>`
      ).join('\n    ')
  }
}

function renderSettings(data: MiseSettingsData): string {
  const sections = data.sections.map(s => {
    const items = s.items.map(renderSettingItem).join('\n    ')
    return `<div class="settings-section${s.danger ? ' danger-zone' : ''}">
    <h2>${s.icon} ${s.title}</h2>
    ${items}
  </div>`
  }).join('\n\n  ')

  return `<div class="settings-body">
  <h1>${data.title}</h1>

  ${sections}
</div>`
}
