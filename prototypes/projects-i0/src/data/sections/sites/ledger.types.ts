// Ledger — Section data types for business/accounting app

export interface DashboardStatsData {
  cards: Array<{
    label: string
    value: string
    indicator: 'blue' | 'yellow' | 'red' | 'green'
  }>
}

export interface DataTableData {
  heading?: string
  headingLink?: { text: string; page: string }
  columns: Array<{
    key: string
    label: string
    align?: 'left' | 'right'
  }>
  rows: Array<Record<string, string | { text: string; type: 'link' | 'badge' | 'amount' | 'plain'; page?: string; variant?: string }>>
}

export interface InvoiceDetailData {
  invoiceNumber: string
  status: 'paid' | 'pending' | 'overdue' | 'draft'
  from: {
    name: string
    address: string
    email: string
  }
  billTo: {
    name: string
    address: string
    email: string
  }
  dates: Array<{ label: string; value: string }>
  lineItems: Array<{
    description: string
    qty: number | string
    rate: string
    amount: string
  }>
  subtotal: string
  taxLabel: string
  taxAmount: string
  total: string
  paymentDetails: Array<{ label: string; value: string }>
  actions: Array<{ label: string; variant: 'primary' | 'success' | 'default' }>
  notes: string
}

export interface BarChartData {
  heading?: string
  bars: Array<{
    label: string
    value: string
    height: string // percentage
  }>
}

export interface YoYBarChartData {
  heading?: string
  bars: Array<{
    label: string
    value: string
    currentHeight: string
    prevHeight: string
  }>
  legend: Array<{ label: string; type: 'current' | 'prev' }>
}

export interface ReportSummaryData {
  cards: Array<{
    label: string
    value: string
    change: string
    direction: 'up' | 'down'
  }>
}

export interface RatioBarData {
  heading?: string
  segments: Array<{
    label: string
    value: string
    percentage: string
    color: 'success' | 'warning' | 'danger'
  }>
}

export interface ClientListData {
  heading?: string
  clients: Array<{
    company: string
    email: string
    contactName: string
    contactTitle: string
    totalBilled: string
    outstanding: string
    lastInvoice: string
    status: 'active' | 'inactive'
  }>
}

export interface ClientDetailData {
  name: string
  initials: string
  subtitle: string
  status: 'active' | 'inactive'
  stats: Array<{ label: string; value: string }>
  invoices: Array<{
    number: string
    date: string
    amount: string
    status: 'paid' | 'pending' | 'overdue' | 'draft'
    page?: string
  }>
  contact: Array<{ label: string; value: string; isLink?: boolean }>
  notes: string
}

export interface SettingsFormData {
  heading: string
  description?: string
  sections: Array<SettingsSectionItem>
}

export interface SettingsSectionItem {
  title: string
  description?: string
  type: 'form' | 'payment-methods' | 'email-templates' | 'danger-zone'
  fields?: Array<{
    label: string
    type: 'text' | 'email' | 'tel' | 'textarea' | 'select'
    value: string
    options?: string[]
    full?: boolean
  }>
  paymentMethods?: Array<{
    icon: string
    iconClass: string
    name: string
    detail: string
    isDefault?: boolean
  }>
  templates?: Array<{
    name: string
    body: string
  }>
  dangerItems?: Array<{
    title: string
    description: string
    buttonLabel: string
    isDanger: boolean
  }>
  hasLogo?: boolean
}

// Top-level section types for Ledger
export type LedgerSectionType =
  | 'ledger-dashboard-stats'
  | 'ledger-data-table'
  | 'ledger-invoice-detail'
  | 'ledger-bar-chart'
  | 'ledger-yoy-bar-chart'
  | 'ledger-report-summary'
  | 'ledger-ratio-bar'
  | 'ledger-client-list'
  | 'ledger-client-detail'
  | 'ledger-settings'
  | 'ledger-two-column'
  | 'ledger-back-link'
  | 'ledger-page-header'
  | 'ledger-search-bar'

export interface BackLinkData {
  text: string
  page: string
}

export interface PageHeaderData {
  title: string
  subtitle?: string
  action?: { label: string; variant: 'primary' | 'default' }
  dateRange?: {
    options: string[]
    selected: string
    startDate?: string
    endDate?: string
  }
}

export interface SearchBarData {
  placeholder: string
  filters?: Array<{
    options: string[]
  }>
}

export interface TwoColumnData {
  ratio: '1-1' | '2-1'
  left: Array<{ type: LedgerSectionType; data: unknown }>
  right: Array<{ type: LedgerSectionType; data: unknown }>
}
