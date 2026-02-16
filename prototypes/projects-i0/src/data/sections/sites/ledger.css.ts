export const ledgerCSS = `
/* Ledger — App Chrome */
.topbar {
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
.topbar .logo {
  font-size: var(--theme-font-size-large);
  font-weight: 700;
  color: var(--theme-color-primary);
  margin-right: var(--theme-space-6);
  letter-spacing: -0.025em;
}
.topbar nav { display: flex; gap: var(--theme-space-1); }
.topbar nav a {
  color: var(--theme-color-secondary);
  text-decoration: none;
  font-size: var(--theme-font-size-small);
  font-weight: 500;
  padding: var(--theme-space-1) var(--theme-space-2);
  border-radius: 6px;
  transition: background 0.15s, color 0.15s;
}
.topbar nav a:hover { background: var(--theme-bg); color: var(--theme-text); }
.topbar nav a.active { background: var(--theme-color-primary); color: var(--theme-color-surface); }
.topbar .spacer { flex: 1; }
.topbar .avatar {
  width: 32px; height: 32px; border-radius: 50%;
  background: var(--theme-color-primary);
  color: var(--theme-color-surface);
  display: flex; align-items: center; justify-content: center;
  font-size: var(--theme-font-size-small); font-weight: 600;
}

.main { max-width: var(--theme-content-width); margin: 0 auto; padding: var(--theme-space-4) var(--theme-space-3); }
.main-narrow { max-width: 900px; margin: 0 auto; padding: var(--theme-space-4) var(--theme-space-3); }
.main-settings { max-width: 800px; margin: 0 auto; padding: var(--theme-space-4) var(--theme-space-3); }

/* Summary / Stat Cards */
.summary-cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--theme-space-3);
  margin-bottom: var(--theme-space-5);
}
.summary-card {
  background: var(--theme-color-surface);
  border: 1px solid var(--theme-color-border);
  border-radius: 10px;
  padding: var(--theme-space-3);
}
.summary-card .label {
  font-size: var(--theme-font-size-small);
  color: var(--theme-color-secondary);
  font-weight: 500;
  margin-bottom: var(--theme-space-1);
  display: flex;
  align-items: center;
  gap: 6px;
}
.summary-card .value {
  font-size: var(--theme-font-size-xlarge);
  font-weight: 700;
  color: var(--theme-text);
  font-variant-numeric: tabular-nums;
}
.summary-card .change { font-size: var(--theme-font-size-small); font-weight: 600; margin-top: 4px; }
.change-up { color: var(--theme-color-success); }
.change-down { color: var(--theme-color-danger); }

.indicator {
  display: inline-block;
  width: 8px; height: 8px;
  border-radius: 50%;
}
.indicator-blue { background: var(--theme-color-primary); }
.indicator-yellow { background: var(--theme-color-warning); }
.indicator-red { background: var(--theme-color-danger); }
.indicator-green { background: var(--theme-color-success); }

/* Section Header */
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--theme-space-2);
}
.section-header h2 {
  font-size: var(--theme-font-size-large);
  font-weight: 600;
}
.section-header a {
  font-size: var(--theme-font-size-small);
  color: var(--theme-color-primary);
  text-decoration: none;
  font-weight: 500;
}

/* Page Header */
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--theme-space-3);
}
.page-header h1 { font-size: var(--theme-font-size-xlarge); font-weight: 700; }
.page-header p { font-size: var(--theme-font-size-small); color: var(--theme-color-secondary); margin-top: 4px; }
.page-header-block { margin-bottom: var(--theme-space-4); }

/* Tables */
.table-wrap {
  background: var(--theme-color-surface);
  border: 1px solid var(--theme-color-border);
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: var(--theme-space-5);
}
table { width: 100%; border-collapse: collapse; }
thead { background: var(--theme-bg); }
th {
  text-align: left;
  padding: var(--theme-space-2) var(--theme-space-3);
  font-size: var(--theme-font-size-small);
  font-weight: 600;
  color: var(--theme-color-secondary);
  border-bottom: 1px solid var(--theme-color-border);
}
td {
  padding: var(--theme-space-2) var(--theme-space-3);
  border-bottom: 1px solid var(--theme-color-border);
  font-size: var(--theme-font-size-small);
}
tr:last-child td { border-bottom: none; }
tr:hover td { background: var(--theme-bg); }
th.align-right, td.align-right { text-align: right; }
.amount { font-variant-numeric: tabular-nums; font-weight: 600; }
.inv-link { color: var(--theme-color-primary); text-decoration: none; font-weight: 500; cursor: pointer; }
.inv-link:hover { text-decoration: underline; }

/* Badges */
.badge {
  display: inline-block;
  padding: 2px 10px;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 600;
  line-height: 1.6;
}
.badge-paid { background: var(--theme-color-success-light); color: var(--theme-color-success); }
.badge-pending { background: var(--theme-color-warning-light); color: var(--theme-color-warning); }
.badge-overdue { background: var(--theme-color-danger-light); color: var(--theme-color-danger); }
.badge-draft { background: var(--theme-bg); color: var(--theme-color-muted); border: 1px solid var(--theme-color-border); }
.badge-connected { background: var(--theme-color-success-light); color: var(--theme-color-success); }
.badge-default { background: var(--theme-color-primary); color: var(--theme-color-surface); font-size: 0.65rem; padding: 1px 8px; margin-left: 6px; }

/* Buttons */
.btn {
  padding: var(--theme-space-1) var(--theme-space-3);
  border-radius: 8px;
  font-size: var(--theme-font-size-small);
  font-weight: 600;
  border: 1px solid var(--theme-color-border);
  background: var(--theme-color-surface);
  color: var(--theme-text);
  cursor: pointer;
  transition: background 0.15s;
}
.btn:hover { background: var(--theme-bg); }
.btn-primary { background: var(--theme-color-primary); color: var(--theme-color-surface); border-color: var(--theme-color-primary); }
.btn-primary:hover { opacity: 0.9; background: var(--theme-color-primary-dark); }
.btn-success { background: var(--theme-color-success); color: var(--theme-color-surface); border-color: var(--theme-color-success); }
.btn-success:hover { opacity: 0.9; }
.btn-danger { border-color: var(--theme-color-danger); color: var(--theme-color-danger); }
.btn-save { margin-top: var(--theme-space-3); }

/* Back Link */
.back-link {
  display: inline-flex; align-items: center; gap: 4px;
  color: var(--theme-color-secondary); text-decoration: none;
  font-size: var(--theme-font-size-small); font-weight: 500;
  margin-bottom: var(--theme-space-3);
}
.back-link:hover { color: var(--theme-color-primary); }

/* Bar Chart */
.chart-section { margin-bottom: var(--theme-space-5); }
.chart {
  background: var(--theme-color-surface);
  border: 1px solid var(--theme-color-border);
  border-radius: 10px;
  padding: var(--theme-space-3);
}
.bars {
  display: flex;
  align-items: flex-end;
  gap: var(--theme-space-2);
  height: 160px;
  padding-top: var(--theme-space-2);
}
.bars-tall { height: 200px; gap: var(--theme-space-1); }
.bar-col {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  height: 100%;
  justify-content: flex-end;
}
.bar {
  width: 100%;
  max-width: 48px;
  background: var(--theme-color-primary);
  border-radius: 4px 4px 0 0;
  transition: opacity 0.2s;
}
.bar:hover { opacity: 0.8; }
.bar-label { font-size: 0.7rem; color: var(--theme-color-secondary); font-weight: 500; }
.bar-value { font-size: 0.7rem; color: var(--theme-text); font-weight: 600; font-variant-numeric: tabular-nums; }

/* YoY Bar Chart */
.bar-group { display: flex; gap: 3px; align-items: flex-end; width: 100%; justify-content: center; }
.bar-current { background: var(--theme-color-primary); width: 18px; border-radius: 3px 3px 0 0; }
.bar-prev { background: var(--theme-color-muted); width: 18px; border-radius: 3px 3px 0 0; }
.chart-legend { display: flex; gap: var(--theme-space-3); margin-top: var(--theme-space-2); }
.legend-item { display: flex; align-items: center; gap: 6px; font-size: var(--theme-font-size-small); color: var(--theme-color-secondary); }
.legend-dot { width: 10px; height: 10px; border-radius: 2px; }
.legend-dot-current { background: var(--theme-color-primary); }
.legend-dot-prev { background: var(--theme-color-muted); }

/* Ratio Bar */
.ratio-bar { display: flex; height: 32px; border-radius: 8px; overflow: hidden; margin-bottom: var(--theme-space-1); }
.ratio-paid { background: var(--theme-color-success); }
.ratio-outstanding { background: var(--theme-color-warning); }
.ratio-overdue { background: var(--theme-color-danger); }
.ratio-legend { display: flex; gap: var(--theme-space-3); font-size: var(--theme-font-size-small); color: var(--theme-color-secondary); }
.ratio-legend span { display: flex; align-items: center; gap: 4px; }
.ratio-legend .dot { width: 8px; height: 8px; border-radius: 50%; display: inline-block; }

/* Two Column Layout */
.two-col { display: grid; grid-template-columns: 1fr 1fr; gap: var(--theme-space-3); margin-bottom: var(--theme-space-4); }
.two-col-2-1 { grid-template-columns: 2fr 1fr; }

/* Card */
.card {
  background: var(--theme-color-surface);
  border: 1px solid var(--theme-color-border);
  border-radius: 10px;
  padding: var(--theme-space-3);
  margin-bottom: var(--theme-space-3);
}
.card h2 { font-size: var(--theme-font-size-large); font-weight: 600; margin-bottom: var(--theme-space-2); }
.card-padded { padding: var(--theme-space-4); }

/* Invoice Detail */
.inv-header {
  display: flex; justify-content: space-between; align-items: center;
  margin-bottom: var(--theme-space-4);
}
.inv-header h1 { font-size: var(--theme-font-size-xlarge); font-weight: 700; }

.parties { display: grid; grid-template-columns: 1fr 1fr; gap: var(--theme-space-5); margin-bottom: var(--theme-space-3); }
.party-label { font-size: var(--theme-font-size-small); color: var(--theme-color-secondary); font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: var(--theme-space-1); }
.party-name { font-weight: 700; font-size: var(--theme-font-size-large); margin-bottom: 4px; }
.party-detail { font-size: var(--theme-font-size-small); color: var(--theme-color-secondary); line-height: 1.6; }

.dates-row {
  display: flex; gap: var(--theme-space-5);
  padding: var(--theme-space-2) 0;
  margin-bottom: var(--theme-space-3);
  border-top: 1px solid var(--theme-color-border);
  border-bottom: 1px solid var(--theme-color-border);
}
.date-item .date-label { font-size: var(--theme-font-size-small); color: var(--theme-color-secondary); font-weight: 500; }
.date-item .date-value { font-weight: 600; }

.totals { display: flex; flex-direction: column; align-items: flex-end; margin-top: var(--theme-space-2); gap: 4px; }
.total-row { display: flex; gap: var(--theme-space-6); font-size: var(--theme-font-size-small); }
.total-row .total-label { color: var(--theme-color-secondary); min-width: 80px; text-align: right; }
.total-row .total-value { font-variant-numeric: tabular-nums; min-width: 100px; text-align: right; font-weight: 500; }
.total-row.grand { font-size: var(--theme-font-size-large); font-weight: 700; border-top: 2px solid var(--theme-color-border); padding-top: var(--theme-space-1); margin-top: 4px; }

.payment-info h3 { font-size: var(--theme-font-size-medium); font-weight: 600; margin-bottom: var(--theme-space-1); }
.payment-info p { font-size: var(--theme-font-size-small); color: var(--theme-color-secondary); line-height: 1.7; }

.actions { display: flex; gap: var(--theme-space-2); margin-bottom: var(--theme-space-3); }

.notes h3 { font-size: var(--theme-font-size-medium); font-weight: 600; margin-bottom: var(--theme-space-1); }
.notes p { font-size: var(--theme-font-size-small); color: var(--theme-color-secondary); }

/* Client List */
.client-name { font-weight: 600; color: var(--theme-text); }
.client-contact { color: var(--theme-color-secondary); font-size: 0.75rem; }
.client-email { color: var(--theme-color-primary); text-decoration: none; font-size: 0.75rem; }
.status-dot {
  display: inline-flex; align-items: center; gap: 6px;
  font-size: var(--theme-font-size-small); font-weight: 500;
}
.status-dot::before {
  content: '';
  width: 8px; height: 8px;
  border-radius: 50%;
  display: inline-block;
}
.status-active::before { background: var(--theme-color-success); }
.status-inactive::before { background: var(--theme-color-muted); }

/* Client Detail */
.client-header {
  display: flex; justify-content: space-between; align-items: flex-start;
  background: var(--theme-color-surface);
  border: 1px solid var(--theme-color-border);
  border-radius: 10px;
  padding: var(--theme-space-4);
  margin-bottom: var(--theme-space-3);
}
.client-info { display: flex; gap: var(--theme-space-3); align-items: center; }
.client-avatar {
  width: 56px; height: 56px; border-radius: 12px;
  background: var(--theme-color-primary);
  color: var(--theme-color-surface);
  display: flex; align-items: center; justify-content: center;
  font-size: var(--theme-font-size-xlarge); font-weight: 700;
}
.client-meta h1 { font-size: var(--theme-font-size-xlarge); font-weight: 700; margin-bottom: 2px; }
.client-meta .subtitle { font-size: var(--theme-font-size-small); color: var(--theme-color-secondary); }
.status-badge { display: inline-block; padding: 2px 10px; border-radius: 999px; font-size: 0.75rem; font-weight: 600; background: var(--theme-color-success-light); color: var(--theme-color-success); }

.stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--theme-space-3); margin-bottom: var(--theme-space-4); }
.stat-card { background: var(--theme-color-surface); border: 1px solid var(--theme-color-border); border-radius: 10px; padding: var(--theme-space-3); }
.stat-card .label { font-size: var(--theme-font-size-small); color: var(--theme-color-secondary); font-weight: 500; margin-bottom: var(--theme-space-1); }
.stat-card .value { font-size: var(--theme-font-size-xlarge); font-weight: 700; font-variant-numeric: tabular-nums; }

.contact-list { list-style: none; }
.contact-list li { padding: var(--theme-space-1) 0; border-bottom: 1px solid var(--theme-color-border); font-size: var(--theme-font-size-small); display: flex; justify-content: space-between; }
.contact-list li:last-child { border-bottom: none; }
.contact-label { color: var(--theme-color-secondary); font-weight: 500; }
.contact-value { font-weight: 500; }
.contact-value a { color: var(--theme-color-primary); text-decoration: none; }

.notes-area {
  width: 100%;
  min-height: 100px;
  padding: var(--theme-space-2);
  border: 1px solid var(--theme-color-border);
  border-radius: 8px;
  font-size: var(--theme-font-size-small);
  font-family: var(--theme-font-body);
  background: var(--theme-bg);
  color: var(--theme-text);
  resize: vertical;
  line-height: 1.6;
}

/* Search Bar */
.search-bar {
  display: flex; gap: var(--theme-space-2);
  margin-bottom: var(--theme-space-3);
}
.search-bar input {
  flex: 1;
  padding: var(--theme-space-1) var(--theme-space-2);
  border: 1px solid var(--theme-color-border);
  border-radius: 8px;
  font-size: var(--theme-font-size-small);
  font-family: var(--theme-font-body);
  background: var(--theme-color-surface);
  color: var(--theme-text);
  outline: none;
}
.search-bar input:focus { border-color: var(--theme-color-primary); box-shadow: 0 0 0 3px color-mix(in srgb, var(--theme-color-primary) 15%, transparent); }
.search-bar select {
  padding: var(--theme-space-1) var(--theme-space-2);
  border: 1px solid var(--theme-color-border);
  border-radius: 8px;
  font-size: var(--theme-font-size-small);
  font-family: var(--theme-font-body);
  background: var(--theme-color-surface);
  color: var(--theme-text);
}

/* Date Range */
.date-range { display: flex; align-items: center; gap: var(--theme-space-1); }
.date-range select, .date-range input {
  padding: var(--theme-space-1) var(--theme-space-2);
  border: 1px solid var(--theme-color-border);
  border-radius: 8px;
  font-size: var(--theme-font-size-small);
  font-family: var(--theme-font-body);
  background: var(--theme-color-surface);
  color: var(--theme-text);
}

/* Settings */
.section {
  background: var(--theme-color-surface);
  border: 1px solid var(--theme-color-border);
  border-radius: 10px;
  padding: var(--theme-space-4);
  margin-bottom: var(--theme-space-3);
}
.section h2 { font-size: var(--theme-font-size-large); font-weight: 600; margin-bottom: var(--theme-space-1); }
.section .desc { font-size: var(--theme-font-size-small); color: var(--theme-color-secondary); margin-bottom: var(--theme-space-3); }

.form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: var(--theme-space-2) var(--theme-space-3); }
.form-group { display: flex; flex-direction: column; gap: 4px; }
.form-group.full { grid-column: 1 / -1; }
.form-group label { font-size: var(--theme-font-size-small); font-weight: 600; color: var(--theme-color-secondary); }
.form-group input, .form-group select, .form-group textarea {
  padding: var(--theme-space-1) var(--theme-space-2);
  border: 1px solid var(--theme-color-border);
  border-radius: 8px;
  font-size: var(--theme-font-size-small);
  font-family: var(--theme-font-body);
  background: var(--theme-bg);
  color: var(--theme-text);
}
.form-group textarea { resize: vertical; min-height: 60px; }

.logo-placeholder {
  width: 80px; height: 80px;
  border: 2px dashed var(--theme-color-border);
  border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
  color: var(--theme-color-muted);
  font-size: var(--theme-font-size-small);
  cursor: pointer;
  margin-bottom: var(--theme-space-2);
}

.payment-method {
  display: flex; justify-content: space-between; align-items: center;
  padding: var(--theme-space-2) 0;
  border-bottom: 1px solid var(--theme-color-border);
}
.payment-method:last-child { border-bottom: none; }
.pm-info { display: flex; align-items: center; gap: var(--theme-space-2); }
.pm-icon {
  width: 40px; height: 40px; border-radius: 8px;
  display: flex; align-items: center; justify-content: center;
  font-size: 0.75rem; font-weight: 700;
}
.pm-icon-bank { background: var(--theme-color-primary); color: var(--theme-color-surface); }
.pm-icon-paypal { background: #0070ba; color: white; }
.pm-icon-stripe { background: #635bff; color: white; }
.pm-name { font-weight: 600; font-size: var(--theme-font-size-small); }
.pm-detail { font-size: 0.75rem; color: var(--theme-color-secondary); }

.template-preview {
  background: var(--theme-bg);
  border: 1px solid var(--theme-color-border);
  border-radius: 8px;
  padding: var(--theme-space-2) var(--theme-space-3);
  margin-bottom: var(--theme-space-2);
}
.template-preview h3 { font-size: var(--theme-font-size-small); font-weight: 600; margin-bottom: 4px; display: flex; justify-content: space-between; align-items: center; }
.template-preview p { font-size: 0.75rem; color: var(--theme-color-secondary); line-height: 1.6; }
.edit-link { font-size: 0.75rem; color: var(--theme-color-primary); text-decoration: none; font-weight: 500; cursor: pointer; }

.danger-zone { border-color: var(--theme-color-danger); }
.danger-zone h2 { color: var(--theme-color-danger); }
.danger-item { display: flex; justify-content: space-between; align-items: center; padding: var(--theme-space-2) 0; border-bottom: 1px solid var(--theme-color-border); }
.danger-item:last-child { border-bottom: none; }
.danger-item .di-text h3 { font-size: var(--theme-font-size-small); font-weight: 600; }
.danger-item .di-text p { font-size: 0.75rem; color: var(--theme-color-secondary); }

/* Footer */
.ledger-footer {
  border-top: 1px solid var(--theme-color-border);
  padding: var(--theme-space-3) var(--theme-space-4);
  text-align: center;
  font-size: var(--theme-font-size-small);
  color: var(--theme-color-secondary);
  margin-top: var(--theme-space-5);
}
.ledger-footer .footer-inner {
  max-width: var(--theme-content-width);
  margin: 0 auto;
  display: flex;
  justify-content: center;
  gap: var(--theme-space-3);
  flex-wrap: wrap;
}
`
