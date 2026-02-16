// Mise en Place — Section data interfaces
// App-style recipe manager with app bar, recipe grid, meal plan, grocery list, settings

export type MiseSectionType =
  | 'mise-app-bar'
  | 'mise-search-bar'
  | 'mise-recipe-grid'
  | 'mise-recipe-detail'
  | 'mise-meal-plan-preview'
  | 'mise-meal-plan-full'
  | 'mise-grocery-list'
  | 'mise-browse-header'
  | 'mise-filter-bar'
  | 'mise-sidebar-layout'
  | 'mise-settings'

// ---- App Bar ----

export interface MiseNavItem {
  page: string
  label: string
  icon: string
}

export interface MiseAppBarData {
  logo: string
  navItems: MiseNavItem[]
  avatarInitial: string
}

// ---- Search Bar ----

export interface MiseSearchBarData {
  placeholder: string
  icon: string
}

// ---- Recipe Grid ----

export interface MiseRecipeCardData {
  title: string
  tag: string
  time: string
  thumbClass: string
  linkPage: string
}

export interface MiseRecipeGridData {
  heading?: string
  recipes: MiseRecipeCardData[]
}

// ---- Recipe Detail ----

export interface MiseRecipeDetailData {
  title: string
  prepTime: string
  servings: string
  difficulty: string
  imageGradient: string
  ingredients: string[]
  steps: string[]
  tags: string[]
  notes: string
  backLink: { label: string; page: string }
}

// ---- Meal Plan Preview (homepage sidebar) ----

export interface MiseMealPlanPreviewData {
  heading: string
  days: Array<{
    label: string
    meal: string | null  // null = empty/add-able
  }>
}

// ---- Meal Plan Full ----

export interface MiseMealSlot {
  label: string  // Breakfast, Lunch, Dinner
  title?: string
  thumbClass?: string
}

export interface MiseDayPlan {
  dayName: string
  date: string
  meals: MiseMealSlot[]
}

export interface MiseMealPlanFullData {
  weekLabel: string
  days: MiseDayPlan[]
  nutrition: Array<{ label: string; value: string }>
  shoppingPreview: Array<{ name: string }>
  shoppingLinkLabel: string
}

// ---- Grocery List ----

export interface MiseGroceryAisle {
  icon: string
  name: string
  items: Array<{
    name: string
    qty: string
    recipe: string
    checked?: boolean
  }>
}

export interface MiseGroceryListData {
  title: string
  subtitle: string
  totalItems: string
  estimatedCost: string
  recipeCount: string
  aisles: MiseGroceryAisle[]
}

// ---- Browse Header ----

export interface MiseBrowseHeaderData {
  title: string
  count: string
}

// ---- Filter Bar ----

export interface MiseFilterGroup {
  label: string
  options: Array<{ label: string; active?: boolean }>
}

export interface MiseFilterBarData {
  groups: MiseFilterGroup[]
}

// ---- Browse Recipe Grid (extended with difficulty) ----

export interface MiseBrowseRecipeCardData {
  title: string
  tag: string
  time: string
  difficulty: string
  thumbClass: string
  linkPage: string
}

export interface MiseBrowseRecipeGridData {
  recipes: MiseBrowseRecipeCardData[]
}

// ---- Sidebar Layout (homepage 2-column with sidebar cards) ----

export interface MiseSidebarCard {
  type: 'shopping-summary' | 'quick-stats' | 'quick-tags'
  title: string
  data: Record<string, unknown>
}

export interface MiseSidebarLayoutData {
  mainSections: MiseSectionUnion[]
  sidebarCards: MiseSidebarCard[]
}

// ---- Settings ----

export interface MiseSettingToggle {
  type: 'toggle'
  label: string
  description: string
  checked: boolean
}

export interface MiseSettingNumber {
  type: 'number'
  label: string
  description: string
  value: number
  min: number
  max: number
}

export interface MiseSettingRadio {
  type: 'radio'
  label: string
  description: string
  options: string[]
  active: string
}

export interface MiseSettingCheckboxGroup {
  type: 'checkbox-group'
  description: string
  options: Array<{ label: string; checked: boolean }>
}

export interface MiseSettingConnectedServices {
  type: 'connected-services'
  services: Array<{
    icon: string
    iconClass: string
    name: string
    status: string
    connected: boolean
  }>
}

export interface MiseSettingDangerZone {
  type: 'danger-zone'
  actions: Array<{
    label: string
    description: string
    destructive?: boolean
  }>
}

export type MiseSettingItem =
  | MiseSettingToggle
  | MiseSettingNumber
  | MiseSettingRadio
  | MiseSettingCheckboxGroup
  | MiseSettingConnectedServices
  | MiseSettingDangerZone

export interface MiseSettingsSection {
  icon: string
  title: string
  description?: string
  danger?: boolean
  items: MiseSettingItem[]
}

export interface MiseSettingsData {
  title: string
  sections: MiseSettingsSection[]
}

// ---- Union for section data ----

export interface MiseSectionDataMap {
  'mise-app-bar': MiseAppBarData
  'mise-search-bar': MiseSearchBarData
  'mise-recipe-grid': MiseRecipeGridData
  'mise-recipe-detail': MiseRecipeDetailData
  'mise-meal-plan-preview': MiseMealPlanPreviewData
  'mise-meal-plan-full': MiseMealPlanFullData
  'mise-grocery-list': MiseGroceryListData
  'mise-browse-header': MiseBrowseHeaderData
  'mise-filter-bar': MiseFilterBarData
  'mise-browse-recipe-grid': MiseBrowseRecipeGridData
  'mise-sidebar-layout': MiseSidebarLayoutData
  'mise-settings': MiseSettingsData
}

export interface MiseSection {
  id: string
  type: string
  data: MiseSectionDataMap[keyof MiseSectionDataMap]
}

export type MiseSectionUnion = MiseSection
