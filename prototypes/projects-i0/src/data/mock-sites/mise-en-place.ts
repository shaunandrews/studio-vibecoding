import type { SiteData, Section } from '../sections/types'
import { renderPage } from '../sections/renderer'
import { renderMiseSection } from '../sections/sites/mise-en-place.renderers'
import { miseCSS } from '../sections/sites/mise-en-place.css'
import miseEnPlaceTheme from '../themes/mise-en-place'

// ---- Shared app bar data ----

const APP_BAR_NAV = [
  { page: 'homepage', label: 'Recipes', icon: '📖' },
  { page: 'browse', label: 'Browse', icon: '🔍' },
  { page: 'mealplan', label: 'Meal Plan', icon: '📅' },
  { page: 'groceries', label: 'Groceries', icon: '🛒' },
  { page: 'settings', label: 'Settings', icon: '⚙️' },
]

const appBarData: MiseAppBarData = {
  logo: '🍳 Mise en Place',
  navItems: APP_BAR_NAV,
  avatarInitial: 'S',
}

function appBarSection(id: string): Section {
  return { id, type: 'mise-app-bar', data: appBarData }
}

// ---- Site Data ----

export const siteData: SiteData = {
  name: 'Mise en Place',
  theme: miseEnPlaceTheme,
  fonts: [],
  pages: [
    // ---- Homepage (Dashboard) ----
    {
      id: 'homepage',
      title: 'Mise en Place',
      slug: 'homepage',
      sections: [
        appBarSection('home-app-bar'),
        {
          id: 'home-body-open',
          type: 'mise-search-bar',
          data: {
            placeholder: 'Search recipes, ingredients, tags...',
            icon: '🔍',
          },
        },
        // Homepage uses a custom 2-column layout rendered as raw HTML via a wrapper section.
        // We encode the main content + sidebar together.
        {
          id: 'home-main',
          type: 'mise-recipe-grid',
          data: {
            heading: 'Recent Recipes',
            recipes: [
              { title: 'Spicy Miso Ramen', tag: 'Japanese', time: '45 min', thumbClass: 'warm', linkPage: 'recipe' },
              { title: 'Thai Basil Chicken', tag: 'Thai', time: '25 min', thumbClass: 'green', linkPage: 'recipe' },
              { title: 'Margherita Pizza', tag: 'Italian', time: '35 min', thumbClass: 'default', linkPage: 'recipe' },
              { title: 'Falafel Bowl', tag: 'Mediterranean', time: '40 min', thumbClass: 'cool', linkPage: 'recipe' },
              { title: 'Butter Chicken', tag: 'Indian', time: '50 min', thumbClass: 'purple', linkPage: 'recipe' },
              { title: 'Shakshuka', tag: 'Middle Eastern', time: '30 min', thumbClass: 'golden', linkPage: 'recipe' },
            ],
          },
        },
        {
          id: 'home-meal-preview',
          type: 'mise-meal-plan-preview',
          data: {
            heading: "This Week's Meal Plan",
            days: [
              { label: 'Mon', meal: 'Spicy Miso Ramen' },
              { label: 'Tue', meal: 'Thai Basil Chicken' },
              { label: 'Wed', meal: null },
              { label: 'Thu', meal: 'Falafel Bowl' },
              { label: 'Fri', meal: null },
              { label: 'Sat', meal: 'Margherita Pizza' },
              { label: 'Sun', meal: null },
            ],
          },
        },
      ],
    },

    // ---- Recipe Detail ----
    {
      id: 'recipe',
      title: 'Spicy Miso Ramen – Mise en Place',
      slug: 'recipe',
      sections: [
        appBarSection('recipe-app-bar'),
        {
          id: 'recipe-detail',
          type: 'mise-recipe-detail',
          data: {
            title: 'Spicy Miso Ramen',
            prepTime: '45 min',
            servings: '4',
            difficulty: 'Medium',
            imageGradient: 'linear-gradient(135deg, #F4845F, #E85D3A, #D4A84B, #E5A833)',
            ingredients: [
              '4 packs fresh ramen noodles',
              '3 tbsp white miso paste',
              '2 tbsp chili garlic sauce',
              '1 tbsp sesame oil',
              '6 cups dashi stock',
              '2 soft-boiled eggs',
              '200g chashu pork belly',
              '4 sheets nori',
              '2 green onions, sliced',
              '1 cup corn kernels',
              'Bean sprouts',
              'Chili oil to taste',
            ],
            steps: [
              'Bring the dashi stock to a simmer in a large pot over medium heat. Whisk in the miso paste and chili garlic sauce until fully dissolved.',
              'Slice the chashu pork belly into thin rounds and sear in a hot pan with sesame oil until caramelized on both sides. Set aside.',
              'Cook the ramen noodles according to package directions. Drain and divide among four bowls.',
              'Ladle the hot miso broth over the noodles. Top each bowl with sliced pork, a halved soft-boiled egg, corn, bean sprouts, and sliced green onions.',
              'Tuck a sheet of nori into each bowl. Drizzle with chili oil to taste. Serve immediately while piping hot.',
            ],
            tags: ['Japanese', 'Soup', 'Comfort Food'],
            notes: "For extra heat, add a tablespoon of gochugaru to the broth. You can substitute chicken stock if dashi isn't available — add a splash of soy sauce to compensate.",
            backLink: { label: '← Back to Recipes', page: 'homepage' },
          },
        },
      ],
    },

    // ---- Meal Plan ----
    {
      id: 'mealplan',
      title: 'Meal Plan – Mise en Place',
      slug: 'mealplan',
      sections: [
        appBarSection('mealplan-app-bar'),
        {
          id: 'mealplan-full',
          type: 'mise-meal-plan-full',
          data: {
            weekLabel: 'Week of Feb 10',
            days: [
              {
                dayName: 'Monday', date: 'Feb 10',
                meals: [
                  { label: 'Breakfast', title: 'Shakshuka', thumbClass: 'golden' },
                  { label: 'Lunch', title: 'Falafel Bowl', thumbClass: 'cool' },
                  { label: 'Dinner', title: 'Spicy Miso Ramen', thumbClass: 'warm' },
                ],
              },
              {
                dayName: 'Tuesday', date: 'Feb 11',
                meals: [
                  { label: 'Breakfast' },
                  { label: 'Lunch', title: 'Thai Basil Chicken', thumbClass: 'green' },
                  { label: 'Dinner' },
                ],
              },
              {
                dayName: 'Wednesday', date: 'Feb 12',
                meals: [
                  { label: 'Breakfast', title: 'Granola Bowl', thumbClass: 'golden' },
                  { label: 'Lunch' },
                  { label: 'Dinner', title: 'Butter Chicken', thumbClass: 'warm' },
                ],
              },
              {
                dayName: 'Thursday', date: 'Feb 13',
                meals: [
                  { label: 'Breakfast' },
                  { label: 'Lunch' },
                  { label: 'Dinner', title: 'Falafel Bowl', thumbClass: 'cool' },
                ],
              },
              {
                dayName: 'Friday', date: 'Feb 14',
                meals: [
                  { label: 'Breakfast', title: 'Shakshuka', thumbClass: 'golden' },
                  { label: 'Lunch' },
                  { label: 'Dinner' },
                ],
              },
              {
                dayName: 'Saturday', date: 'Feb 15',
                meals: [
                  { label: 'Breakfast' },
                  { label: 'Lunch', title: 'Thai Basil Chicken', thumbClass: 'green' },
                  { label: 'Dinner', title: 'Margherita Pizza', thumbClass: 'warm' },
                ],
              },
              {
                dayName: 'Sunday', date: 'Feb 16',
                meals: [
                  { label: 'Breakfast', title: 'Granola Bowl', thumbClass: 'golden' },
                  { label: 'Lunch' },
                  { label: 'Dinner' },
                ],
              },
            ],
            nutrition: [
              { label: 'Avg. Calories', value: '~1,850/day' },
              { label: 'Protein', value: '82g avg' },
              { label: 'Carbs', value: '210g avg' },
              { label: 'Fat', value: '65g avg' },
              { label: 'Meals planned', value: '12 / 21' },
            ],
            shoppingPreview: [
              { name: 'Ramen noodles (4 packs)' },
              { name: 'Miso paste' },
              { name: 'Chicken thighs' },
              { name: 'Fresh basil' },
              { name: 'Chickpeas (2 cans)' },
              { name: 'Tahini' },
              { name: 'Mozzarella' },
              { name: 'Pizza dough' },
            ],
            shoppingLinkLabel: 'View full list (14 items) →',
          },
        },
      ],
    },

    // ---- Browse ----
    {
      id: 'browse',
      title: 'Browse Recipes – Mise en Place',
      slug: 'browse',
      sections: [
        appBarSection('browse-app-bar'),
        {
          id: 'browse-wrapper-open',
          type: 'mise-browse-header',
          data: {
            title: 'Browse Recipes',
            count: '14 recipes',
          },
        },
        {
          id: 'browse-filters',
          type: 'mise-filter-bar',
          data: {
            groups: [
              {
                label: 'Cuisine',
                options: [
                  { label: 'All', active: true },
                  { label: 'Italian' },
                  { label: 'Asian' },
                  { label: 'Mexican' },
                  { label: 'American' },
                ],
              },
              {
                label: 'Meal',
                options: [
                  { label: 'Breakfast' },
                  { label: 'Lunch' },
                  { label: 'Dinner' },
                  { label: 'Snack' },
                ],
              },
            ],
          },
        },
        {
          id: 'browse-grid',
          type: 'mise-browse-recipe-grid',
          data: {
            recipes: [
              { title: 'Spicy Miso Ramen', tag: 'Japanese', time: '45 min', difficulty: 'Medium', thumbClass: 'g3', linkPage: 'recipe' },
              { title: 'Thai Basil Chicken', tag: 'Thai', time: '25 min', difficulty: 'Easy', thumbClass: 'g2', linkPage: 'recipe' },
              { title: 'Margherita Pizza', tag: 'Italian', time: '35 min', difficulty: 'Medium', thumbClass: 'g1', linkPage: 'recipe' },
              { title: 'Falafel Bowl', tag: 'Mediterranean', time: '40 min', difficulty: 'Easy', thumbClass: 'g4', linkPage: 'recipe' },
              { title: 'Butter Chicken', tag: 'Indian', time: '50 min', difficulty: 'Medium', thumbClass: 'g5', linkPage: 'recipe' },
              { title: 'Shakshuka', tag: 'Middle Eastern', time: '30 min', difficulty: 'Easy', thumbClass: 'g6', linkPage: 'recipe' },
              { title: 'Beef Tacos al Pastor', tag: 'Mexican', time: '60 min', difficulty: 'Hard', thumbClass: 'g7', linkPage: 'recipe' },
              { title: 'Poke Bowl', tag: 'Hawaiian', time: '20 min', difficulty: 'Easy', thumbClass: 'g8', linkPage: 'recipe' },
              { title: 'Avocado Toast', tag: 'American', time: '10 min', difficulty: 'Easy', thumbClass: 'g9', linkPage: 'recipe' },
              { title: 'Pad Thai', tag: 'Thai', time: '35 min', difficulty: 'Medium', thumbClass: 'g10', linkPage: 'recipe' },
              { title: 'Osso Buco', tag: 'Italian', time: '180 min', difficulty: 'Hard', thumbClass: 'g11', linkPage: 'recipe' },
              { title: 'Açaí Bowl', tag: 'Brazilian', time: '10 min', difficulty: 'Easy', thumbClass: 'g12', linkPage: 'recipe' },
              { title: 'Green Curry', tag: 'Thai', time: '40 min', difficulty: 'Medium', thumbClass: 'g13', linkPage: 'recipe' },
              { title: 'Smash Burger', tag: 'American', time: '15 min', difficulty: 'Easy', thumbClass: 'g14', linkPage: 'recipe' },
            ],
          },
        },
      ],
    },

    // ---- Groceries ----
    {
      id: 'groceries',
      title: 'Grocery List – Mise en Place',
      slug: 'groceries',
      sections: [
        appBarSection('groceries-app-bar'),
        {
          id: 'grocery-list',
          type: 'mise-grocery-list',
          data: {
            title: '🛒 Grocery List',
            subtitle: "Based on this week's meal plan · Feb 10 – 16",
            totalItems: '23',
            estimatedCost: '~$64',
            recipeCount: '5',
            aisles: [
              {
                icon: '🥬', name: 'Produce',
                items: [
                  { name: 'Green onions', qty: '2 bunches', recipe: 'Ramen, Pad Thai' },
                  { name: 'Fresh basil', qty: '1 bunch', recipe: 'Thai Basil Chicken' },
                  { name: 'Bean sprouts', qty: '200g', recipe: 'Ramen' },
                  { name: 'Avocados', qty: '3', recipe: 'Poke Bowl' },
                  { name: 'Limes', qty: '4', recipe: 'Pad Thai, Tacos' },
                  { name: 'Roma tomatoes', qty: '6', recipe: 'Shakshuka, Pizza' },
                  { name: 'Corn kernels', qty: '1 cup', recipe: 'Ramen' },
                ],
              },
              {
                icon: '🧀', name: 'Dairy',
                items: [
                  { name: 'Fresh mozzarella', qty: '250g', recipe: 'Pizza' },
                  { name: 'Eggs', qty: '1 dozen', recipe: 'Ramen, Shakshuka' },
                  { name: 'Butter', qty: '1 stick', recipe: 'Butter Chicken' },
                ],
              },
              {
                icon: '🥫', name: 'Pantry',
                items: [
                  { name: 'White miso paste', qty: '3 tbsp', recipe: 'Ramen' },
                  { name: 'Chili garlic sauce', qty: '1 jar', recipe: 'Ramen' },
                  { name: 'Sesame oil', qty: '1 bottle', recipe: 'Ramen, Poke' },
                  { name: 'Chickpeas', qty: '2 cans', recipe: 'Falafel Bowl' },
                  { name: 'Tahini', qty: '1 jar', recipe: 'Falafel Bowl' },
                  { name: 'Ramen noodles', qty: '4 packs', recipe: 'Ramen' },
                  { name: 'Soy sauce', qty: '1 bottle', recipe: 'Multiple', checked: true },
                ],
              },
              {
                icon: '🥩', name: 'Meat &amp; Seafood',
                items: [
                  { name: 'Chashu pork belly', qty: '200g', recipe: 'Ramen' },
                  { name: 'Chicken thighs', qty: '500g', recipe: 'Thai Basil, Butter Chicken' },
                  { name: 'Sushi-grade tuna', qty: '300g', recipe: 'Poke Bowl' },
                  { name: 'Ground beef', qty: '400g', recipe: 'Tacos' },
                ],
              },
              {
                icon: '🍞', name: 'Bakery',
                items: [
                  { name: 'Pizza dough', qty: '1 ball', recipe: 'Pizza' },
                  { name: 'Nori sheets', qty: '4 sheets', recipe: 'Ramen' },
                ],
              },
            ],
          },
        },
      ],
    },

    // ---- Settings ----
    {
      id: 'settings',
      title: 'Settings – Mise en Place',
      slug: 'settings',
      sections: [
        appBarSection('settings-app-bar'),
        {
          id: 'settings-page',
          type: 'mise-settings',
          data: {
            title: '⚙️ Settings',
            sections: [
              {
                icon: '🥗', title: 'Dietary Preferences',
                items: [{
                  type: 'checkbox-group',
                  description: "We'll filter recipes and flag ingredients based on your preferences.",
                  options: [
                    { label: 'Vegetarian', checked: false },
                    { label: 'Gluten-Free', checked: true },
                    { label: 'Vegan', checked: false },
                    { label: 'Dairy-Free', checked: false },
                    { label: 'Nut-Free', checked: false },
                    { label: 'Low-Carb', checked: false },
                  ],
                }],
              },
              {
                icon: '👥', title: 'Household',
                items: [
                  { type: 'number', label: 'Household Size', description: 'Recipes will scale servings automatically', value: 2, min: 1, max: 12 },
                  { type: 'radio', label: 'Measurement System', description: 'Used for ingredient quantities', options: ['Imperial', 'Metric'], active: 'Imperial' },
                ],
              },
              {
                icon: '🔔', title: 'Notifications',
                items: [
                  { type: 'toggle', label: 'Meal Reminders', description: 'Get notified 30 min before planned meals', checked: true },
                  { type: 'toggle', label: 'Shopping Day Reminder', description: 'Weekly reminder to review your grocery list', checked: true },
                  { type: 'toggle', label: 'New Recipe Suggestions', description: 'Weekly recipe ideas based on your preferences', checked: false },
                ],
              },
              {
                icon: '🔗', title: 'Connected Services',
                items: [{
                  type: 'connected-services',
                  services: [
                    { icon: '🍏', iconClass: 'green', name: 'Apple Health', status: 'Connected · syncing nutrition data', connected: true },
                    { icon: '📦', iconClass: 'blue', name: 'Instacart', status: 'Connected · auto-order groceries', connected: true },
                    { icon: '📺', iconClass: 'red', name: 'YouTube', status: 'Not connected', connected: false },
                  ],
                }],
              },
              {
                icon: '⚠️', title: 'Danger Zone', danger: true,
                items: [{
                  type: 'danger-zone',
                  actions: [
                    { label: 'Clear Data', description: 'Remove all recipes, meal plans, and shopping lists' },
                    { label: 'Delete Account', description: 'Permanently delete your account and all data', destructive: true },
                  ],
                }],
              },
            ],
          },
        },
      ],
    },
  ],
}

// ---- Backward-compatible wrapper exports ----

export function homepage(themeCSS: string): string {
  // Homepage has a special 2-col layout with sidebar that doesn't fit cleanly into sections.
  // We render the app bar + search via sections, then inject the 2-col body manually.
  const render = (s: Section) => renderMiseSection(s, 'homepage')
  const appBar = render(siteData.pages[0].sections[0])
  const searchBar = render(siteData.pages[0].sections[1])
  const recipeGrid = render(siteData.pages[0].sections[2])
  const mealPreview = render(siteData.pages[0].sections[3])

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Mise en Place</title>
<style>${themeCSS}</style>
<style>* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: var(--theme-font-body); color: var(--theme-text); background: var(--theme-bg); line-height: var(--theme-line-height-normal); }
h1, h2, h3 { font-family: var(--theme-font-heading); }</style>
<style>${miseCSS}</style>
</head>
<body>

${appBar}

<div class="app-body">
  ${searchBar}

  <div class="main-col">
    ${recipeGrid}
    ${mealPreview}
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
</html>`
}

function renderSimplePage(pageIndex: number, activePage: string, themeCSS: string): string {
  const page = siteData.pages[pageIndex]
  const sectionsHTML = page.sections.map(s => renderMiseSection(s, activePage) || '').join('\n\n')

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${page.title}</title>
<style>${themeCSS}</style>
<style>* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: var(--theme-font-body); color: var(--theme-text); background: var(--theme-bg); line-height: var(--theme-line-height-normal); }
h1, h2, h3, h4 { font-family: var(--theme-font-heading); }</style>
<style>${miseCSS}</style>
</head>
<body>

${sectionsHTML}

</body>
</html>`
}

export function recipe(themeCSS: string): string {
  return renderSimplePage(1, 'homepage', themeCSS)
}

export function mealplan(themeCSS: string): string {
  return renderSimplePage(2, 'mealplan', themeCSS)
}

export function browse(themeCSS: string): string {
  const page = siteData.pages[3]
  const render = (s: Section) => renderMiseSection(s, 'browse')
  const appBar = render(page.sections[0])
  const browseHeader = render(page.sections[1])
  const filterBar = render(page.sections[2])
  const recipeGrid = render(page.sections[3])

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${page.title}</title>
<style>${themeCSS}</style>
<style>* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: var(--theme-font-body); color: var(--theme-text); background: var(--theme-bg); line-height: var(--theme-line-height-normal); }
h1, h2, h3 { font-family: var(--theme-font-heading); }</style>
<style>${miseCSS}</style>
</head>
<body>

${appBar}

<div class="browse-body">
  ${browseHeader}
  ${filterBar}
  ${recipeGrid}
</div>

</body>
</html>`
}

export function groceries(themeCSS: string): string {
  return renderSimplePage(4, 'groceries', themeCSS)
}

export function settings(themeCSS: string): string {
  return renderSimplePage(5, 'settings', themeCSS)
}
