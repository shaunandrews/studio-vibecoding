import type { Section } from '../types'
import type {
  DashboardStatsData,
  DataTableData,
  InvoiceDetailData,
  BarChartData,
  YoYBarChartData,
  ReportSummaryData,
  RatioBarData,
  ClientListData,
  ClientDetailData,
  SettingsFormData,
  SettingsSectionItem,
  TwoColumnData,
  BackLinkData,
  PageHeaderData,
  SearchBarData,
} from './ledger.types'

function esc(s: string): string {
  return s
}

function renderDashboardStats(data: DashboardStatsData): string {
  const cards = data.cards.map(c => `
    <div class="summary-card">
      <div class="label"><span class="indicator indicator-${c.indicator}"></span> ${c.label}</div>
      <div class="value">${c.value}</div>
    </div>`).join('\n')
  return `<div class="summary-cards">${cards}\n</div>`
}

function renderDataTable(data: DataTableData): string {
  const header = data.heading ? `
  <div class="section-header">
    <h2>${data.heading}</h2>
    ${data.headingLink ? `<a href="#" onclick="window.parent.postMessage({type:'navigate',page:'${data.headingLink.page}'},'*');return false">${data.headingLink.text}</a>` : ''}
  </div>` : ''

  const ths = data.columns.map(c =>
    `<th${c.align === 'right' ? ' class="align-right"' : ''}>${c.label}</th>`
  ).join('')

  const trs = data.rows.map(row => {
    const tds = data.columns.map(col => {
      const cell = row[col.key]
      if (!cell) return '<td></td>'
      if (typeof cell === 'string') return `<td${col.align === 'right' ? ' class="align-right"' : ''}>${cell}</td>`
      switch (cell.type) {
        case 'link':
          return `<td><a class="inv-link" href="#" onclick="window.parent.postMessage({type:'navigate',page:'${cell.page || ''}'},'*');return false">${cell.text}</a></td>`
        case 'badge':
          return `<td><span class="badge badge-${cell.variant}">${cell.text}</span></td>`
        case 'amount':
          return `<td class="amount${col.align === 'right' ? ' align-right' : ''}">${cell.text}</td>`
        default:
          return `<td${col.align === 'right' ? ' class="align-right"' : ''}>${cell.text}</td>`
      }
    }).join('\n          ')
    return `        <tr>\n          ${tds}\n        </tr>`
  }).join('\n')

  return `${header}
  <div class="table-wrap">
    <table>
      <thead><tr>${ths}</tr></thead>
      <tbody>
${trs}
      </tbody>
    </table>
  </div>`
}

function renderInvoiceDetail(data: InvoiceDetailData): string {
  const lineItemRows = data.lineItems.map(li =>
    `<tr><td>${li.description}</td><td class="amount">${li.qty}</td><td class="amount">${li.rate}</td><td class="amount">${li.amount}</td></tr>`
  ).join('\n        ')

  const paymentLines = data.paymentDetails.map(p =>
    `<strong>${p.label}:</strong> ${p.value}`
  ).join('<br>\n      ')

  const actionButtons = data.actions.map(a =>
    `<button class="btn${a.variant !== 'default' ? ` btn-${a.variant}` : ''}">${a.label}</button>`
  ).join('\n    ')

  const dates = data.dates.map(d =>
    `<div class="date-item"><span class="date-label">${d.label}: </span><span class="date-value">${d.value}</span></div>`
  ).join('\n      ')

  return `
  <div class="inv-header">
    <h1>#${data.invoiceNumber}</h1>
    <span class="badge badge-${data.status}">${data.status.charAt(0).toUpperCase() + data.status.slice(1)}</span>
  </div>

  <div class="card card-padded">
    <div class="parties">
      <div>
        <div class="party-label">From</div>
        <div class="party-name">${data.from.name}</div>
        <div class="party-detail">${data.from.address}<br>${data.from.email}</div>
      </div>
      <div>
        <div class="party-label">Bill To</div>
        <div class="party-name">${data.billTo.name}</div>
        <div class="party-detail">${data.billTo.address}<br>${data.billTo.email}</div>
      </div>
    </div>

    <div class="dates-row">
      ${dates}
    </div>

    <table>
      <thead><tr><th>Description</th><th>Qty</th><th>Rate</th><th>Amount</th></tr></thead>
      <tbody>
        ${lineItemRows}
      </tbody>
    </table>

    <div class="totals">
      <div class="total-row"><span class="total-label">Subtotal</span><span class="total-value">${data.subtotal}</span></div>
      <div class="total-row"><span class="total-label">${data.taxLabel}</span><span class="total-value">${data.taxAmount}</span></div>
      <div class="total-row grand"><span class="total-label">Total</span><span class="total-value">${data.total}</span></div>
    </div>
  </div>

  <div class="card payment-info">
    <h3>Payment Details</h3>
    <p>${paymentLines}</p>
  </div>

  <div class="actions">
    ${actionButtons}
  </div>

  <div class="card notes">
    <h3>Notes</h3>
    <p>${data.notes}</p>
  </div>`
}

function renderBarChart(data: BarChartData): string {
  const bars = data.bars.map(b => `
        <div class="bar-col">
          <div class="bar-value">${b.value}</div>
          <div class="bar" style="height: ${b.height};"></div>
          <div class="bar-label">${b.label}</div>
        </div>`).join('\n')

  return `
  <div class="chart-section">
    ${data.heading ? `<div class="section-header"><h2>${data.heading}</h2></div>` : ''}
    <div class="chart">
      <div class="bars">
${bars}
      </div>
    </div>
  </div>`
}

function renderYoYBarChart(data: YoYBarChartData): string {
  const bars = data.bars.map(b => `
        <div class="bar-col">
          <div class="bar-value">${b.value}</div>
          <div class="bar-group">
            <div class="bar bar-prev" style="height: ${b.prevHeight};"></div>
            <div class="bar bar-current" style="height: ${b.currentHeight};"></div>
          </div>
          <div class="bar-label">${b.label}</div>
        </div>`).join('\n')

  const legend = data.legend.map(l =>
    `<div class="legend-item"><div class="legend-dot legend-dot-${l.type}"></div> ${l.label}</div>`
  ).join('\n      ')

  return `
  <div class="card">
    ${data.heading ? `<h2>${data.heading}</h2>` : ''}
    <div class="bars bars-tall">
${bars}
    </div>
    <div class="chart-legend">
      ${legend}
    </div>
  </div>`
}

function renderReportSummary(data: ReportSummaryData): string {
  const cards = data.cards.map(c => `
    <div class="summary-card">
      <div class="label">${c.label}</div>
      <div class="value">${c.value}</div>
      <div class="change change-${c.direction}">${c.direction === 'up' ? '↑' : '↓'} ${c.change}</div>
    </div>`).join('\n')
  return `<div class="summary-cards">${cards}\n</div>`
}

function renderRatioBar(data: RatioBarData): string {
  const segments = data.segments.map(s =>
    `<div class="ratio-${s.color === 'success' ? 'paid' : s.color === 'warning' ? 'outstanding' : 'overdue'}" style="width: ${s.percentage};"></div>`
  ).join('\n      ')

  const legend = data.segments.map(s =>
    `<span><span class="dot" style="background:var(--theme-color-${s.color})"></span> ${s.label} — ${s.value} (${s.percentage})</span>`
  ).join('\n        ')

  return `
    ${data.heading ? `<h2>${data.heading}</h2>` : ''}
    <div class="ratio-bar">
      ${segments}
    </div>
    <div class="ratio-legend">
        ${legend}
    </div>`
}

function renderClientList(data: ClientListData): string {
  const rows = data.clients.map(c => `
        <tr>
          <td>
            <div class="client-name">${c.company}</div>
            <a href="#" class="client-email">${c.email}</a>
          </td>
          <td>
            <div>${c.contactName}</div>
            <div class="client-contact">${c.contactTitle}</div>
          </td>
          <td class="amount">${c.totalBilled}</td>
          <td class="amount">${c.outstanding}</td>
          <td>${c.lastInvoice}</td>
          <td><span class="status-dot status-${c.status}">${c.status.charAt(0).toUpperCase() + c.status.slice(1)}</span></td>
        </tr>`).join('\n')

  return `
  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>Company</th>
          <th>Contact</th>
          <th>Total Billed</th>
          <th>Outstanding</th>
          <th>Last Invoice</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>${rows}
      </tbody>
    </table>
  </div>`
}

function renderClientDetail(data: ClientDetailData): string {
  const stats = data.stats.map(s => `
    <div class="stat-card">
      <div class="label">${s.label}</div>
      <div class="value">${s.value}</div>
    </div>`).join('\n')

  const invoiceRows = data.invoices.map(inv => `
            <tr>
              <td><a class="inv-link" href="#"${inv.page ? ` onclick="window.parent.postMessage({type:'navigate',page:'${inv.page}'},'*');return false"` : ''}>${inv.number}</a></td>
              <td>${inv.date}</td>
              <td class="amount">${inv.amount}</td>
              <td><span class="badge badge-${inv.status}">${inv.status.charAt(0).toUpperCase() + inv.status.slice(1)}</span></td>
            </tr>`).join('\n')

  const contactItems = data.contact.map(c => `
          <li><span class="contact-label">${c.label}</span><span class="contact-value">${c.isLink ? `<a href="#">${c.value}</a>` : c.value}</span></li>`).join('\n')

  return `
  <div class="client-header">
    <div class="client-info">
      <div class="client-avatar">${data.initials}</div>
      <div class="client-meta">
        <h1>${data.name}</h1>
        <div class="subtitle">${data.subtitle} &nbsp; <span class="status-badge">${data.status.charAt(0).toUpperCase() + data.status.slice(1)}</span></div>
      </div>
    </div>
    <button class="btn btn-primary">+ New Invoice</button>
  </div>

  <div class="stats-grid">${stats}
  </div>

  <div class="two-col two-col-2-1">
    <div>
      <div class="card">
        <h2>Invoices</h2>
        <table>
          <thead><tr><th>Invoice #</th><th>Date</th><th>Amount</th><th>Status</th></tr></thead>
          <tbody>${invoiceRows}
          </tbody>
        </table>
      </div>
    </div>

    <div>
      <div class="card">
        <h2>Contact Details</h2>
        <ul class="contact-list">${contactItems}
        </ul>
      </div>

      <div class="card">
        <h2>Notes</h2>
        <textarea class="notes-area">${data.notes}</textarea>
      </div>
    </div>
  </div>`
}

function renderSettingsSection(item: SettingsSectionItem): string {
  let content = ''
  const extraClass = item.type === 'danger-zone' ? ' danger-zone' : ''

  switch (item.type) {
    case 'form': {
      const logo = item.hasLogo ? '<div class="logo-placeholder">Logo</div>' : ''
      const fields = (item.fields || []).map(f => {
        const fullClass = f.full ? ' full' : ''
        let input = ''
        switch (f.type) {
          case 'textarea':
            input = `<textarea>${f.value}</textarea>`
            break
          case 'select':
            input = `<select>${(f.options || []).map(o => `<option${o === f.value ? ' selected' : ''}>${o}</option>`).join('')}</select>`
            break
          default:
            input = `<input type="${f.type}" value="${f.value}" />`
        }
        return `<div class="form-group${fullClass}"><label>${f.label}</label>${input}</div>`
      }).join('\n      ')
      content = `${logo}<div class="form-grid">\n      ${fields}\n    </div>`
      break
    }
    case 'payment-methods': {
      content = (item.paymentMethods || []).map(pm => `
    <div class="payment-method">
      <div class="pm-info">
        <div class="pm-icon ${pm.iconClass}">${pm.icon}</div>
        <div>
          <div class="pm-name">${pm.name}${pm.isDefault ? ' <span class="badge badge-default">Default</span>' : ''}</div>
          <div class="pm-detail">${pm.detail}</div>
        </div>
      </div>
      <span class="badge badge-connected">Connected</span>
    </div>`).join('\n')
      break
    }
    case 'email-templates': {
      content = (item.templates || []).map(t => `
    <div class="template-preview">
      <h3>${t.name} <a class="edit-link">Edit</a></h3>
      <p>${t.body}</p>
    </div>`).join('\n')
      break
    }
    case 'danger-zone': {
      content = (item.dangerItems || []).map(d => `
    <div class="danger-item">
      <div class="di-text">
        <h3>${d.title}</h3>
        <p>${d.description}</p>
      </div>
      <button class="btn${d.isDanger ? ' btn-danger' : ''}">${d.buttonLabel}</button>
    </div>`).join('\n')
      break
    }
  }

  return `
  <div class="section${extraClass}">
    <h2>${item.title}</h2>
    ${item.description ? `<div class="desc">${item.description}</div>` : ''}
    ${content}
  </div>`
}

function renderSettings(data: SettingsFormData): string {
  const sections = data.sections.map(s => renderSettingsSection(s)).join('\n')
  return `
  <div class="page-header page-header-block">
    <h1>${data.heading}</h1>
    ${data.description ? `<p>${data.description}</p>` : ''}
  </div>
  ${sections}
  <button class="btn btn-primary btn-save">Save Changes</button>`
}

function renderBackLink(data: BackLinkData): string {
  return `<a class="back-link" href="#" onclick="window.parent.postMessage({type:'navigate',page:'${data.page}'},'*');return false">${data.text}</a>`
}

function renderPageHeader(data: PageHeaderData): string {
  let rightSide = ''
  if (data.action) {
    rightSide = `<button class="btn${data.action.variant === 'primary' ? ' btn-primary' : ''}">${data.action.label}</button>`
  }
  if (data.dateRange) {
    const options = data.dateRange.options.map(o =>
      `<option${o === data.dateRange!.selected ? ' selected' : ''}>${o}</option>`
    ).join('')
    rightSide = `<div class="date-range">
      <select>${options}</select>
      ${data.dateRange.startDate ? `<input type="date" value="${data.dateRange.startDate}" />` : ''}
      ${data.dateRange.endDate ? `<span style="color:var(--theme-color-secondary)">to</span><input type="date" value="${data.dateRange.endDate}" />` : ''}
    </div>`
  }
  return `
  <div class="page-header">
    <h1>${data.title}</h1>
    ${rightSide}
  </div>`
}

function renderSearchBar(data: SearchBarData): string {
  const filters = (data.filters || []).map(f => {
    const opts = f.options.map(o => `<option>${o}</option>`).join('')
    return `<select>${opts}</select>`
  }).join('\n    ')
  return `
  <div class="search-bar">
    <input type="text" placeholder="${data.placeholder}" />
    ${filters}
  </div>`
}

function renderTwoColumn(data: TwoColumnData): string {
  const renderInner = (items: Array<{ type: string; data: unknown }>) =>
    items.map(item => renderLedgerSectionInner(item.type, item.data)).join('\n')

  return `
  <div class="two-col${data.ratio === '2-1' ? ' two-col-2-1' : ''}">
    <div>${renderInner(data.left)}</div>
    <div>${renderInner(data.right)}</div>
  </div>`
}

function renderLedgerSectionInner(type: string, data: unknown): string {
  switch (type) {
    case 'ledger-dashboard-stats': return renderDashboardStats(data as DashboardStatsData)
    case 'ledger-data-table': return renderDataTable(data as DataTableData)
    case 'ledger-invoice-detail': return renderInvoiceDetail(data as InvoiceDetailData)
    case 'ledger-bar-chart': return renderBarChart(data as BarChartData)
    case 'ledger-yoy-bar-chart': return renderYoYBarChart(data as YoYBarChartData)
    case 'ledger-report-summary': return renderReportSummary(data as ReportSummaryData)
    case 'ledger-ratio-bar': return renderRatioBar(data as RatioBarData)
    case 'ledger-client-list': return renderClientList(data as ClientListData)
    case 'ledger-client-detail': return renderClientDetail(data as ClientDetailData)
    case 'ledger-settings': return renderSettings(data as SettingsFormData)
    case 'ledger-two-column': return renderTwoColumn(data as TwoColumnData)
    case 'ledger-back-link': return renderBackLink(data as BackLinkData)
    case 'ledger-page-header': return renderPageHeader(data as PageHeaderData)
    case 'ledger-search-bar': return renderSearchBar(data as SearchBarData)
    default: return ''
  }
}

export function renderLedgerSection(section: Section): string | null {
  const type = section.type as string
  if (!type.startsWith('ledger-')) return null
  const html = renderLedgerSectionInner(type, section.data)
  return html || null
}
