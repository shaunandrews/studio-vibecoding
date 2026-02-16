import type { SiteData, Section } from '../sections/types'
import { renderPage } from '../sections/renderer'
import { renderLedgerSection } from '../sections/sites/ledger.renderers'
import { ledgerCSS } from '../sections/sites/ledger.css'
import ledgerTheme from '../themes/ledger'

const topbarData = {
  logo: 'Ledger',
  navItems: [
    { label: 'Dashboard', page: 'homepage' },
    { label: 'Invoices', page: 'invoice' },
    { label: 'Clients', page: 'clients' },
    { label: 'Reports', page: 'reports' },
    { label: 'Settings', page: 'settings' },
  ],
  avatarInitial: 'L',
}

const footerData = {
  address: '123 Commerce Street, Suite 400, Portland, OR 97201',
  phone: '(503) 555-0142',
  email: 'billing@ledgerdesign.co',
}

function topbarSection(id: string): Section {
  return { id, type: 'ledger-topbar', data: topbarData }
}

function footerSection(id: string): Section {
  return { id, type: 'ledger-footer', data: footerData }
}

export const siteData: SiteData = {
  name: 'Ledger',
  theme: ledgerTheme,
  fonts: [],
  pages: [
    // ---- Dashboard (homepage) ----
    {
      id: 'homepage',
      title: 'Ledger — Dashboard',
      slug: 'homepage',
      sections: [
        topbarSection('dash-topbar'),
        {
          id: 'dash-stats',
          type: 'ledger-dashboard-stats',
          data: {
            cards: [
              { label: 'Total Revenue', value: '$24,580', indicator: 'blue' },
              { label: 'Outstanding', value: '$3,200', indicator: 'yellow' },
              { label: 'Overdue', value: '$850', indicator: 'red' },
              { label: 'Paid This Month', value: '$8,430', indicator: 'green' },
            ],
          },
        },
        {
          id: 'dash-recent-invoices',
          type: 'ledger-data-table',
          data: {
            heading: 'Recent Invoices',
            headingLink: { text: 'View all →', page: 'invoice' },
            columns: [
              { key: 'invoice', label: 'Invoice #' },
              { key: 'client', label: 'Client' },
              { key: 'amount', label: 'Amount' },
              { key: 'status', label: 'Status' },
              { key: 'date', label: 'Date' },
            ],
            rows: [
              {
                invoice: { text: 'INV-2024-0047', type: 'link', page: 'invoice' },
                client: 'Meridian Labs',
                amount: { text: '$4,200.00', type: 'amount' },
                status: { text: 'Pending', type: 'badge', variant: 'pending' },
                date: 'Feb 1, 2026',
              },
              {
                invoice: { text: 'INV-2024-0046', type: 'link', page: 'invoice' },
                client: 'Vertex Studios',
                amount: { text: '$1,850.00', type: 'amount' },
                status: { text: 'Paid', type: 'badge', variant: 'paid' },
                date: 'Jan 28, 2026',
              },
              {
                invoice: { text: 'INV-2024-0045', type: 'link', page: 'invoice' },
                client: 'Oakline Properties',
                amount: { text: '$850.00', type: 'amount' },
                status: { text: 'Overdue', type: 'badge', variant: 'overdue' },
                date: 'Jan 15, 2026',
              },
              {
                invoice: { text: 'INV-2024-0044', type: 'link', page: 'invoice' },
                client: 'Cascade Health',
                amount: { text: '$3,400.00', type: 'amount' },
                status: { text: 'Paid', type: 'badge', variant: 'paid' },
                date: 'Jan 12, 2026',
              },
              {
                invoice: { text: 'INV-2024-0043', type: 'link', page: 'invoice' },
                client: 'Nomad Collective',
                amount: { text: '$2,100.00', type: 'amount' },
                status: { text: 'Paid', type: 'badge', variant: 'paid' },
                date: 'Jan 5, 2026',
              },
              {
                invoice: { text: 'INV-2024-0042', type: 'link', page: 'invoice' },
                client: 'Brightpath Education',
                amount: { text: '$1,200.00', type: 'amount' },
                status: { text: 'Pending', type: 'badge', variant: 'pending' },
                date: 'Dec 28, 2025',
              },
              {
                invoice: { text: 'INV-2024-0041', type: 'link', page: 'invoice' },
                client: 'Solaris Energy',
                amount: { text: '$5,600.00', type: 'amount' },
                status: { text: 'Paid', type: 'badge', variant: 'paid' },
                date: 'Dec 20, 2025',
              },
            ],
          },
        },
        {
          id: 'dash-revenue-chart',
          type: 'ledger-bar-chart',
          data: {
            heading: 'Revenue',
            bars: [
              { label: 'Sep', value: '$3.2k', height: '40%' },
              { label: 'Oct', value: '$5.1k', height: '64%' },
              { label: 'Nov', value: '$4.4k', height: '55%' },
              { label: 'Dec', value: '$6.8k', height: '85%' },
              { label: 'Jan', value: '$7.2k', height: '90%' },
              { label: 'Feb', value: '$8.0k', height: '100%' },
            ],
          },
        },
        footerSection('dash-footer'),
      ],
    },

    // ---- Invoice Detail ----
    {
      id: 'invoice',
      title: 'Invoice #INV-2024-0047 — Ledger',
      slug: 'invoice',
      sections: [
        topbarSection('inv-topbar'),
        {
          id: 'inv-back',
          type: 'ledger-back-link',
          data: { text: '← Back to Dashboard', page: 'homepage' },
        },
        {
          id: 'inv-detail',
          type: 'ledger-invoice-detail',
          data: {
            invoiceNumber: 'INV-2024-0047',
            status: 'pending',
            from: {
              name: 'Ledger Design Co.',
              address: '123 Commerce Street<br>Suite 400<br>Portland, OR 97201',
              email: 'billing@ledgerdesign.co',
            },
            billTo: {
              name: 'Meridian Labs',
              address: '456 Innovation Drive<br>Floor 12<br>San Francisco, CA 94105',
              email: 'accounts@meridianlabs.io',
            },
            dates: [
              { label: 'Issued', value: 'February 1, 2026' },
              { label: 'Due', value: 'February 28, 2026' },
            ],
            lineItems: [
              { description: 'Brand Strategy &amp; Research', qty: 1, rate: '$1,200.00', amount: '$1,200.00' },
              { description: 'UI/UX Design — Dashboard', qty: 1, rate: '$1,800.00', amount: '$1,800.00' },
              { description: 'Front-end Development', qty: 16, rate: '$150.00', amount: '$2,400.00' },
              { description: 'Project Management', qty: 8, rate: '$95.00', amount: '$760.00' },
            ],
            subtotal: '$6,160.00',
            taxLabel: 'Tax (10%)',
            taxAmount: '$616.00',
            total: '$6,776.00',
            paymentDetails: [
              { label: 'Bank', value: 'First National Bank' },
              { label: 'Account Name', value: 'Ledger Design Co.' },
              { label: 'Account Number', value: '••••4821' },
              { label: 'Routing', value: '021000021' },
              { label: 'Reference', value: 'INV-2024-0047' },
            ],
            actions: [
              { label: 'Send Reminder', variant: 'primary' },
              { label: 'Mark as Paid', variant: 'success' },
              { label: 'Download PDF', variant: 'default' },
            ],
            notes: 'Payment is due within 30 days of invoice date. Late payments may be subject to a 1.5% monthly interest charge. Please include the invoice number as a reference when making payment. Thank you for your business!',
          },
        },
        footerSection('inv-footer'),
      ],
    },

    // ---- Clients ----
    {
      id: 'clients',
      title: 'Clients — Ledger',
      slug: 'clients',
      sections: [
        topbarSection('clients-topbar'),
        {
          id: 'clients-header',
          type: 'ledger-page-header',
          data: {
            title: 'Clients',
            action: { label: '+ Add Client', variant: 'primary' },
          },
        },
        {
          id: 'clients-search',
          type: 'ledger-search-bar',
          data: {
            placeholder: 'Search clients…',
            filters: [
              { options: ['All Status', 'Active', 'Inactive'] },
            ],
          },
        },
        {
          id: 'clients-list',
          type: 'ledger-client-list',
          data: {
            clients: [
              {
                company: 'Meridian Labs',
                email: 'accounts@meridianlabs.io',
                contactName: 'Sarah Chen',
                contactTitle: 'VP of Operations',
                totalBilled: '$18,400',
                outstanding: '$4,200',
                lastInvoice: 'Feb 1, 2026',
                status: 'active',
              },
              {
                company: 'Vertex Studios',
                email: 'billing@vertexstudios.com',
                contactName: 'Marcus Webb',
                contactTitle: 'Creative Director',
                totalBilled: '$12,650',
                outstanding: '$0',
                lastInvoice: 'Jan 28, 2026',
                status: 'active',
              },
              {
                company: 'Oakline Properties',
                email: 'ap@oaklineproperties.com',
                contactName: 'Diana Reeves',
                contactTitle: 'Finance Manager',
                totalBilled: '$6,200',
                outstanding: '$850',
                lastInvoice: 'Jan 15, 2026',
                status: 'active',
              },
              {
                company: 'Cascade Health',
                email: 'invoices@cascadehealth.org',
                contactName: 'James Patel',
                contactTitle: 'COO',
                totalBilled: '$22,100',
                outstanding: '$0',
                lastInvoice: 'Jan 12, 2026',
                status: 'active',
              },
              {
                company: 'Nomad Collective',
                email: 'hello@nomadcollective.co',
                contactName: 'Ava Kim',
                contactTitle: 'Founder',
                totalBilled: '$8,900',
                outstanding: '$0',
                lastInvoice: 'Jan 5, 2026',
                status: 'active',
              },
              {
                company: 'Brightpath Education',
                email: 'admin@brightpathedu.com',
                contactName: 'Tom Gallagher',
                contactTitle: 'Program Director',
                totalBilled: '$3,400',
                outstanding: '$1,200',
                lastInvoice: 'Dec 28, 2025',
                status: 'inactive',
              },
            ],
          },
        },
        footerSection('clients-footer'),
      ],
    },

    // ---- Reports ----
    {
      id: 'reports',
      title: 'Reports — Ledger',
      slug: 'reports',
      sections: [
        topbarSection('reports-topbar'),
        {
          id: 'reports-header',
          type: 'ledger-page-header',
          data: {
            title: 'Reports',
            dateRange: {
              options: ['Last 12 Months', 'This Quarter', 'This Year', 'Custom Range'],
              selected: 'Custom Range',
              startDate: '2025-03-01',
              endDate: '2026-02-14',
            },
          },
        },
        {
          id: 'reports-summary',
          type: 'ledger-report-summary',
          data: {
            cards: [
              { label: 'Total Revenue', value: '$142,680', change: '18.3% vs prior year', direction: 'up' },
              { label: 'Invoices Sent', value: '47', change: '12 more than prior year', direction: 'up' },
              { label: 'Avg. Invoice Value', value: '$3,036', change: '4.1% vs prior year', direction: 'down' },
              { label: 'Avg. Days to Pay', value: '18.4', change: '2.1 days faster', direction: 'up' },
            ],
          },
        },
        {
          id: 'reports-yoy-chart',
          type: 'ledger-yoy-bar-chart',
          data: {
            heading: 'Monthly Revenue — Year-over-Year',
            bars: [
              { label: 'Mar', value: '$8.2k', currentHeight: '68%', prevHeight: '55%' },
              { label: 'Apr', value: '$9.6k', currentHeight: '80%', prevHeight: '50%' },
              { label: 'May', value: '$7.8k', currentHeight: '65%', prevHeight: '62%' },
              { label: 'Jun', value: '$11.4k', currentHeight: '95%', prevHeight: '58%' },
              { label: 'Jul', value: '$10.2k', currentHeight: '85%', prevHeight: '70%' },
              { label: 'Aug', value: '$13.1k', currentHeight: '100%', prevHeight: '65%' },
              { label: 'Sep', value: '$9.8k', currentHeight: '82%', prevHeight: '72%' },
              { label: 'Oct', value: '$14.5k', currentHeight: '100%', prevHeight: '68%' },
              { label: 'Nov', value: '$12.3k', currentHeight: '92%', prevHeight: '75%' },
              { label: 'Dec', value: '$15.8k', currentHeight: '100%', prevHeight: '72%' },
              { label: 'Jan', value: '$14.2k', currentHeight: '95%', prevHeight: '60%' },
              { label: 'Feb', value: '$15.7k', currentHeight: '98%', prevHeight: '55%' },
            ],
            legend: [
              { label: '2025–2026', type: 'current' },
              { label: '2024–2025', type: 'prev' },
            ],
          },
        },
        {
          id: 'reports-two-col',
          type: 'ledger-two-column',
          data: {
            ratio: '1-1',
            left: [
              {
                type: 'ledger-data-table',
                data: {
                  heading: 'Top Clients by Revenue',
                  columns: [
                    { key: 'client', label: 'Client' },
                    { key: 'revenue', label: 'Revenue', align: 'right' },
                  ],
                  rows: [
                    { client: 'Cascade Health', revenue: { text: '$22,100.00', type: 'amount' } },
                    { client: 'Meridian Studios', revenue: { text: '$19,850.00', type: 'amount' } },
                    { client: 'Solaris Energy', revenue: { text: '$18,200.00', type: 'amount' } },
                    { client: 'Vertex Studios', revenue: { text: '$12,650.00', type: 'amount' } },
                    { client: 'Nomad Collective', revenue: { text: '$8,900.00', type: 'amount' } },
                    { client: 'Oakline Properties', revenue: { text: '$6,200.00', type: 'amount' } },
                    { client: 'Brightpath Education', revenue: { text: '$3,400.00', type: 'amount' } },
                  ],
                },
              },
            ],
            right: [
              {
                type: 'ledger-ratio-bar',
                data: {
                  heading: 'Outstanding vs Paid',
                  segments: [
                    { label: 'Paid', value: '$111,290', percentage: '78%', color: 'success' },
                    { label: 'Outstanding', value: '$19,950', percentage: '14%', color: 'warning' },
                    { label: 'Overdue', value: '$11,440', percentage: '8%', color: 'danger' },
                  ],
                },
              },
              {
                type: 'ledger-data-table',
                data: {
                  heading: 'Monthly Breakdown',
                  columns: [
                    { key: 'month', label: 'Month' },
                    { key: 'invoiced', label: 'Invoiced', align: 'right' },
                    { key: 'collected', label: 'Collected', align: 'right' },
                  ],
                  rows: [
                    { month: 'Feb 2026', invoiced: { text: '$15,700.00', type: 'amount' }, collected: { text: '$8,430.00', type: 'amount' } },
                    { month: 'Jan 2026', invoiced: { text: '$14,200.00', type: 'amount' }, collected: { text: '$12,950.00', type: 'amount' } },
                    { month: 'Dec 2025', invoiced: { text: '$15,800.00', type: 'amount' }, collected: { text: '$14,600.00', type: 'amount' } },
                    { month: 'Nov 2025', invoiced: { text: '$12,300.00', type: 'amount' }, collected: { text: '$12,300.00', type: 'amount' } },
                    { month: 'Oct 2025', invoiced: { text: '$14,500.00', type: 'amount' }, collected: { text: '$14,500.00', type: 'amount' } },
                    { month: 'Sep 2025', invoiced: { text: '$9,800.00', type: 'amount' }, collected: { text: '$9,800.00', type: 'amount' } },
                  ],
                },
              },
            ],
          },
        },
        footerSection('reports-footer'),
      ],
    },

    // ---- Settings ----
    {
      id: 'settings',
      title: 'Settings — Ledger',
      slug: 'settings',
      sections: [
        topbarSection('settings-topbar'),
        {
          id: 'settings-form',
          type: 'ledger-settings',
          data: {
            heading: 'Settings',
            description: 'Manage your business profile, invoicing defaults, and integrations.',
            sections: [
              {
                title: 'Business Profile',
                description: 'Your company information appears on all invoices.',
                type: 'form',
                hasLogo: true,
                fields: [
                  { label: 'Company Name', type: 'text', value: 'Ledger Design Co.' },
                  { label: 'Tax ID / EIN', type: 'text', value: '82-4921038' },
                  { label: 'Address', type: 'textarea', value: '123 Commerce Street, Suite 400\nPortland, OR 97201', full: true },
                  { label: 'Email', type: 'email', value: 'billing@ledgerdesign.co' },
                  { label: 'Phone', type: 'tel', value: '(503) 555-0142' },
                ],
              },
              {
                title: 'Invoice Defaults',
                description: 'Default values applied to new invoices. Can be overridden per invoice.',
                type: 'form',
                fields: [
                  { label: 'Payment Terms', type: 'select', value: 'Net 30', options: ['Due on Receipt', 'Net 15', 'Net 30', 'Net 45', 'Net 60'] },
                  { label: 'Currency', type: 'select', value: 'USD — US Dollar', options: ['USD — US Dollar', 'EUR — Euro', 'GBP — British Pound', 'CAD — Canadian Dollar'] },
                  { label: 'Default Tax Rate', type: 'text', value: '10%' },
                  { label: 'Late Fee (monthly)', type: 'text', value: '1.5%' },
                  { label: 'Invoice Number Prefix', type: 'text', value: 'INV-' },
                  { label: 'Next Invoice Number', type: 'text', value: '2024-0048' },
                ],
              },
              {
                title: 'Payment Methods',
                description: 'Accepted payment methods shown on invoices.',
                type: 'payment-methods',
                paymentMethods: [
                  { icon: 'BK', iconClass: 'pm-icon-bank', name: 'First National Bank', detail: 'Account ••••4821 · Routing 021000021', isDefault: true },
                  { icon: 'PP', iconClass: 'pm-icon-paypal', name: 'PayPal', detail: 'billing@ledgerdesign.co' },
                  { icon: 'ST', iconClass: 'pm-icon-stripe', name: 'Stripe', detail: 'acct_1NxB4k2eZvKYlo · Live mode' },
                ],
              },
              {
                title: 'Email Templates',
                description: 'Customize automated emails sent with invoices and reminders.',
                type: 'email-templates',
                templates: [
                  { name: 'Invoice Sent', body: 'Hi {client_name}, please find attached invoice {invoice_number} for {amount} due by {due_date}. You can view and pay online at the link below. Thank you for your business!' },
                  { name: 'Payment Reminder', body: 'Hi {client_name}, this is a friendly reminder that invoice {invoice_number} for {amount} is due on {due_date}. If you\'ve already sent payment, please disregard this notice.' },
                  { name: 'Overdue Notice', body: 'Hi {client_name}, invoice {invoice_number} for {amount} was due on {due_date} and is now {days_overdue} days past due. A late fee of {late_fee} may apply. Please remit payment at your earliest convenience.' },
                ],
              },
              {
                title: 'Danger Zone',
                type: 'danger-zone',
                dangerItems: [
                  { title: 'Export All Data', description: 'Download all invoices, clients, and reports as a CSV archive.', buttonLabel: 'Export', isDanger: false },
                  { title: 'Reset Invoice Counter', description: 'Reset the auto-incrementing invoice number. Cannot be undone.', buttonLabel: 'Reset', isDanger: true },
                  { title: 'Delete Account', description: 'Permanently delete your account and all associated data.', buttonLabel: 'Delete', isDanger: true },
                ],
              },
            ],
          },
        },
        footerSection('settings-footer'),
      ],
    },

    // ---- Client Detail ----
    {
      id: 'clientDetail',
      title: 'Meridian Studios — Ledger',
      slug: 'clientDetail',
      sections: [
        topbarSection('cd-topbar'),
        {
          id: 'cd-back',
          type: 'ledger-back-link',
          data: { text: '← Back to Clients', page: 'clients' },
        },
        {
          id: 'cd-detail',
          type: 'ledger-client-detail',
          data: {
            name: 'Meridian Studios',
            initials: 'M',
            subtitle: 'Creative Agency · San Francisco, CA',
            status: 'active',
            stats: [
              { label: 'Total Revenue', value: '$19,850' },
              { label: 'Outstanding', value: '$4,200' },
              { label: 'Invoices', value: '8' },
              { label: 'Avg. Days to Pay', value: '16.2' },
            ],
            invoices: [
              { number: 'INV-2024-0047', date: 'Feb 1, 2026', amount: '$4,200.00', status: 'pending', page: 'invoice' },
              { number: 'INV-2024-0039', date: 'Dec 15, 2025', amount: '$3,150.00', status: 'paid' },
              { number: 'INV-2024-0034', date: 'Nov 2, 2025', amount: '$2,800.00', status: 'paid' },
              { number: 'INV-2024-0028', date: 'Sep 18, 2025', amount: '$1,950.00', status: 'paid' },
              { number: 'INV-2024-0022', date: 'Aug 5, 2025', amount: '$3,600.00', status: 'paid' },
              { number: 'INV-2024-0016', date: 'Jun 20, 2025', amount: '$1,200.00', status: 'paid' },
              { number: 'INV-2024-0011', date: 'May 3, 2025', amount: '$1,750.00', status: 'paid' },
              { number: 'INV-2024-0005', date: 'Mar 12, 2025', amount: '$1,200.00', status: 'paid' },
            ],
            contact: [
              { label: 'Contact', value: 'Sarah Chen' },
              { label: 'Title', value: 'VP of Operations' },
              { label: 'Email', value: 'sarah@meridianstudios.com', isLink: true },
              { label: 'Phone', value: '(415) 555-0198' },
              { label: 'Address', value: '456 Innovation Dr, Floor 12<br>San Francisco, CA 94105' },
              { label: 'Website', value: 'meridianstudios.com', isLink: true },
            ],
            notes: 'Preferred payment method: bank transfer. Sarah prefers email communication. They typically approve invoices within 3 business days.\n\nUpsell opportunity: discussed potential rebrand project for Q2 2026. Follow up in March.\n\nPrevious point of contact was David Kim (left company Oct 2025).',
          },
        },
        footerSection('cd-footer'),
      ],
    },
  ],
}

// ---- Ledger uses a custom app chrome (topbar) instead of the standard site-nav/footer ----

function renderLedgerPage(pageIndex: number, activePage: string, themeCSS: string): string {
  const page = siteData.pages[pageIndex]
  // Ledger has its own topbar instead of standard header/footer.
  // We use renderPage with customCSS and customRenderer, but override header/footer rendering
  // by generating the full HTML ourselves.
  return renderPage(page, siteData, activePage, themeCSS, ledgerCSS, renderLedgerSection)
}

// ---- Backward-compatible exports ----

export function homepage(themeCSS: string): string {
  return renderLedgerPage(0, 'homepage', themeCSS)
}

export function invoice(themeCSS: string): string {
  return renderLedgerPage(1, 'invoice', themeCSS)
}

export function clients(themeCSS: string): string {
  return renderLedgerPage(2, 'clients', themeCSS)
}

export function reports(themeCSS: string): string {
  return renderLedgerPage(3, 'reports', themeCSS)
}

export function settings(themeCSS: string): string {
  return renderLedgerPage(4, 'settings', themeCSS)
}

export function clientDetail(themeCSS: string): string {
  return renderLedgerPage(5, 'clientDetail', themeCSS)
}

export const pages: Record<string, { label: string; html: (css: string) => string }> = {
  homepage: { label: 'Dashboard', html: homepage },
  invoice: { label: 'Invoice', html: invoice },
  clients: { label: 'Clients', html: clients },
  reports: { label: 'Reports', html: reports },
  settings: { label: 'Settings', html: settings },
  clientDetail: { label: 'Client Detail', html: clientDetail },
}
