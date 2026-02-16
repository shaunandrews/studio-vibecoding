export function homepage(themeCSS: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Ledger — Dashboard</title>
<style>${themeCSS}</style>
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: var(--theme-font-body); color: var(--theme-text); background: var(--theme-bg); line-height: var(--theme-line-height-normal); font-size: var(--theme-font-size-medium); }
h1, h2, h3 { font-family: var(--theme-font-heading); }

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
.summary-card .indicator {
  display: inline-block;
  width: 8px; height: 8px;
  border-radius: 50%;
}
.indicator-blue { background: var(--theme-color-primary); }
.indicator-yellow { background: var(--theme-color-warning); }
.indicator-red { background: var(--theme-color-danger); }
.indicator-green { background: var(--theme-color-success); }

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
.amount { font-variant-numeric: tabular-nums; font-weight: 600; }
.inv-link { color: var(--theme-color-primary); text-decoration: none; font-weight: 500; cursor: pointer; }
.inv-link:hover { text-decoration: underline; }

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
  position: relative;
}
.bar:hover { opacity: 0.8; }
.bar-label {
  font-size: 0.7rem;
  color: var(--theme-color-secondary);
  font-weight: 500;
}
.bar-value {
  font-size: 0.7rem;
  color: var(--theme-text);
  font-weight: 600;
  font-variant-numeric: tabular-nums;
}
</style>
</head>
<body>

<div class="topbar">
  <div class="logo">Ledger</div>
  <nav>
    <a href="#" class="active" onclick="window.parent.postMessage({type:'navigate',page:'homepage'},'*');return false">Dashboard</a>
    <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'invoice'},'*');return false">Invoices</a>
    <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'clients'},'*');return false">Clients</a>
    <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'reports'},'*');return false">Reports</a>
    <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'settings'},'*');return false">Settings</a>
  </nav>
  <div class="spacer"></div>
  <div class="avatar">S</div>
</div>

<div class="main">
  <div class="summary-cards">
    <div class="summary-card">
      <div class="label"><span class="indicator indicator-blue"></span> Total Revenue</div>
      <div class="value">$24,580</div>
    </div>
    <div class="summary-card">
      <div class="label"><span class="indicator indicator-yellow"></span> Outstanding</div>
      <div class="value">$3,200</div>
    </div>
    <div class="summary-card">
      <div class="label"><span class="indicator indicator-red"></span> Overdue</div>
      <div class="value">$850</div>
    </div>
    <div class="summary-card">
      <div class="label"><span class="indicator indicator-green"></span> Paid This Month</div>
      <div class="value">$8,430</div>
    </div>
  </div>

  <div class="section-header">
    <h2>Recent Invoices</h2>
    <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'invoice'},'*');return false">View all →</a>
  </div>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Invoice #</th><th>Client</th><th>Amount</th><th>Status</th><th>Date</th></tr>
      </thead>
      <tbody>
        <tr>
          <td><a class="inv-link" href="#" onclick="window.parent.postMessage({type:'navigate',page:'invoice'},'*');return false">INV-2024-0047</a></td>
          <td>Meridian Labs</td>
          <td class="amount">$4,200.00</td>
          <td><span class="badge badge-pending">Pending</span></td>
          <td>Feb 1, 2026</td>
        </tr>
        <tr>
          <td><a class="inv-link" href="#" onclick="window.parent.postMessage({type:'navigate',page:'invoice'},'*');return false">INV-2024-0046</a></td>
          <td>Vertex Studios</td>
          <td class="amount">$1,850.00</td>
          <td><span class="badge badge-paid">Paid</span></td>
          <td>Jan 28, 2026</td>
        </tr>
        <tr>
          <td><a class="inv-link" href="#" onclick="window.parent.postMessage({type:'navigate',page:'invoice'},'*');return false">INV-2024-0045</a></td>
          <td>Oakline Properties</td>
          <td class="amount">$850.00</td>
          <td><span class="badge badge-overdue">Overdue</span></td>
          <td>Jan 15, 2026</td>
        </tr>
        <tr>
          <td><a class="inv-link" href="#" onclick="window.parent.postMessage({type:'navigate',page:'invoice'},'*');return false">INV-2024-0044</a></td>
          <td>Cascade Health</td>
          <td class="amount">$3,400.00</td>
          <td><span class="badge badge-paid">Paid</span></td>
          <td>Jan 12, 2026</td>
        </tr>
        <tr>
          <td><a class="inv-link" href="#" onclick="window.parent.postMessage({type:'navigate',page:'invoice'},'*');return false">INV-2024-0043</a></td>
          <td>Nomad Collective</td>
          <td class="amount">$2,100.00</td>
          <td><span class="badge badge-paid">Paid</span></td>
          <td>Jan 5, 2026</td>
        </tr>
        <tr>
          <td><a class="inv-link" href="#" onclick="window.parent.postMessage({type:'navigate',page:'invoice'},'*');return false">INV-2024-0042</a></td>
          <td>Brightpath Education</td>
          <td class="amount">$1,200.00</td>
          <td><span class="badge badge-pending">Pending</span></td>
          <td>Dec 28, 2025</td>
        </tr>
        <tr>
          <td><a class="inv-link" href="#" onclick="window.parent.postMessage({type:'navigate',page:'invoice'},'*');return false">INV-2024-0041</a></td>
          <td>Solaris Energy</td>
          <td class="amount">$5,600.00</td>
          <td><span class="badge badge-paid">Paid</span></td>
          <td>Dec 20, 2025</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="chart-section">
    <div class="section-header">
      <h2>Revenue</h2>
    </div>
    <div class="chart">
      <div class="bars">
        <div class="bar-col">
          <div class="bar-value">$3.2k</div>
          <div class="bar" style="height: 40%;"></div>
          <div class="bar-label">Sep</div>
        </div>
        <div class="bar-col">
          <div class="bar-value">$5.1k</div>
          <div class="bar" style="height: 64%;"></div>
          <div class="bar-label">Oct</div>
        </div>
        <div class="bar-col">
          <div class="bar-value">$4.4k</div>
          <div class="bar" style="height: 55%;"></div>
          <div class="bar-label">Nov</div>
        </div>
        <div class="bar-col">
          <div class="bar-value">$6.8k</div>
          <div class="bar" style="height: 85%;"></div>
          <div class="bar-label">Dec</div>
        </div>
        <div class="bar-col">
          <div class="bar-value">$7.2k</div>
          <div class="bar" style="height: 90%;"></div>
          <div class="bar-label">Jan</div>
        </div>
        <div class="bar-col">
          <div class="bar-value">$8.0k</div>
          <div class="bar" style="height: 100%;"></div>
          <div class="bar-label">Feb</div>
        </div>
      </div>
    </div>
  </div>
</div>

</body>
</html>`;
}

export function invoice(themeCSS: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Invoice #INV-2024-0047 — Ledger</title>
<style>${themeCSS}</style>
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: var(--theme-font-body); color: var(--theme-text); background: var(--theme-bg); line-height: var(--theme-line-height-normal); font-size: var(--theme-font-size-medium); }
h1, h2, h3 { font-family: var(--theme-font-heading); }

.topbar {
  background: var(--theme-color-surface);
  border-bottom: 1px solid var(--theme-color-border);
  padding: 0 var(--theme-space-4);
  display: flex; align-items: center; height: 56px;
  position: sticky; top: 0; z-index: 10;
}
.topbar .logo { font-size: var(--theme-font-size-large); font-weight: 700; color: var(--theme-color-primary); margin-right: var(--theme-space-6); letter-spacing: -0.025em; }
.topbar nav { display: flex; gap: var(--theme-space-1); }
.topbar nav a { color: var(--theme-color-secondary); text-decoration: none; font-size: var(--theme-font-size-small); font-weight: 500; padding: var(--theme-space-1) var(--theme-space-2); border-radius: 6px; transition: background 0.15s, color 0.15s; }
.topbar nav a:hover { background: var(--theme-bg); color: var(--theme-text); }
.topbar nav a.active { background: var(--theme-color-primary); color: var(--theme-color-surface); }
.topbar .spacer { flex: 1; }
.topbar .avatar { width: 32px; height: 32px; border-radius: 50%; background: var(--theme-color-primary); color: var(--theme-color-surface); display: flex; align-items: center; justify-content: center; font-size: var(--theme-font-size-small); font-weight: 600; }

.main { max-width: 900px; margin: 0 auto; padding: var(--theme-space-4) var(--theme-space-3); }

.back-link {
  display: inline-flex; align-items: center; gap: 4px;
  color: var(--theme-color-secondary); text-decoration: none;
  font-size: var(--theme-font-size-small); font-weight: 500;
  margin-bottom: var(--theme-space-3);
}
.back-link:hover { color: var(--theme-color-primary); }

.inv-header {
  display: flex; justify-content: space-between; align-items: center;
  margin-bottom: var(--theme-space-4);
}
.inv-header h1 { font-size: var(--theme-font-size-xlarge); font-weight: 700; }
.badge { display: inline-block; padding: 2px 10px; border-radius: 999px; font-size: 0.75rem; font-weight: 600; line-height: 1.6; }
.badge-pending { background: var(--theme-color-warning-light); color: var(--theme-color-warning); }

.card {
  background: var(--theme-color-surface);
  border: 1px solid var(--theme-color-border);
  border-radius: 10px;
  padding: var(--theme-space-4);
  margin-bottom: var(--theme-space-3);
}

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

table { width: 100%; border-collapse: collapse; }
th { text-align: left; padding: var(--theme-space-2) var(--theme-space-2); font-size: var(--theme-font-size-small); font-weight: 600; color: var(--theme-color-secondary); border-bottom: 2px solid var(--theme-color-border); }
th:last-child, td:last-child { text-align: right; }
td { padding: var(--theme-space-2); border-bottom: 1px solid var(--theme-color-border); font-size: var(--theme-font-size-small); }
.amount { font-variant-numeric: tabular-nums; font-weight: 500; }

.totals { display: flex; flex-direction: column; align-items: flex-end; margin-top: var(--theme-space-2); gap: 4px; }
.total-row { display: flex; gap: var(--theme-space-6); font-size: var(--theme-font-size-small); }
.total-row .total-label { color: var(--theme-color-secondary); min-width: 80px; text-align: right; }
.total-row .total-value { font-variant-numeric: tabular-nums; min-width: 100px; text-align: right; font-weight: 500; }
.total-row.grand { font-size: var(--theme-font-size-large); font-weight: 700; border-top: 2px solid var(--theme-color-border); padding-top: var(--theme-space-1); margin-top: 4px; }

.payment-info h3 { font-size: var(--theme-font-size-medium); font-weight: 600; margin-bottom: var(--theme-space-1); }
.payment-info p { font-size: var(--theme-font-size-small); color: var(--theme-color-secondary); line-height: 1.7; }

.actions { display: flex; gap: var(--theme-space-2); margin-bottom: var(--theme-space-3); }
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

.notes h3 { font-size: var(--theme-font-size-medium); font-weight: 600; margin-bottom: var(--theme-space-1); }
.notes p { font-size: var(--theme-font-size-small); color: var(--theme-color-secondary); }
</style>
</head>
<body>

<div class="topbar">
  <div class="logo">Ledger</div>
  <nav>
    <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'homepage'},'*');return false">Dashboard</a>
    <a href="#" class="active" onclick="window.parent.postMessage({type:'navigate',page:'invoice'},'*');return false">Invoices</a>
    <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'clients'},'*');return false">Clients</a>
    <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'reports'},'*');return false">Reports</a>
    <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'settings'},'*');return false">Settings</a>
  </nav>
  <div class="spacer"></div>
  <div class="avatar">S</div>
</div>

<div class="main">
  <a class="back-link" href="#" onclick="window.parent.postMessage({type:'navigate',page:'homepage'},'*');return false">← Back to Dashboard</a>

  <div class="inv-header">
    <h1>#INV-2024-0047</h1>
    <span class="badge badge-pending">Pending</span>
  </div>

  <div class="card">
    <div class="parties">
      <div>
        <div class="party-label">From</div>
        <div class="party-name">Ledger Design Co.</div>
        <div class="party-detail">
          123 Commerce Street<br>
          Suite 400<br>
          Portland, OR 97201<br>
          billing@ledgerdesign.co
        </div>
      </div>
      <div>
        <div class="party-label">Bill To</div>
        <div class="party-name">Meridian Labs</div>
        <div class="party-detail">
          456 Innovation Drive<br>
          Floor 12<br>
          San Francisco, CA 94105<br>
          accounts@meridianlabs.io
        </div>
      </div>
    </div>

    <div class="dates-row">
      <div class="date-item">
        <span class="date-label">Issued: </span>
        <span class="date-value">February 1, 2026</span>
      </div>
      <div class="date-item">
        <span class="date-label">Due: </span>
        <span class="date-value">February 28, 2026</span>
      </div>
    </div>

    <table>
      <thead>
        <tr><th>Description</th><th>Qty</th><th>Rate</th><th>Amount</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>Brand Strategy &amp; Research</td>
          <td class="amount">1</td>
          <td class="amount">$1,200.00</td>
          <td class="amount">$1,200.00</td>
        </tr>
        <tr>
          <td>UI/UX Design — Dashboard</td>
          <td class="amount">1</td>
          <td class="amount">$1,800.00</td>
          <td class="amount">$1,800.00</td>
        </tr>
        <tr>
          <td>Front-end Development</td>
          <td class="amount">16</td>
          <td class="amount">$150.00</td>
          <td class="amount">$2,400.00</td>
        </tr>
        <tr>
          <td>Project Management</td>
          <td class="amount">8</td>
          <td class="amount">$95.00</td>
          <td class="amount">$760.00</td>
        </tr>
      </tbody>
    </table>

    <div class="totals">
      <div class="total-row"><span class="total-label">Subtotal</span><span class="total-value">$6,160.00</span></div>
      <div class="total-row"><span class="total-label">Tax (10%)</span><span class="total-value">$616.00</span></div>
      <div class="total-row grand"><span class="total-label">Total</span><span class="total-value">$6,776.00</span></div>
    </div>
  </div>

  <div class="card payment-info">
    <h3>Payment Details</h3>
    <p>
      <strong>Bank:</strong> First National Bank<br>
      <strong>Account Name:</strong> Ledger Design Co.<br>
      <strong>Account Number:</strong> ••••4821<br>
      <strong>Routing:</strong> 021000021<br>
      <strong>Reference:</strong> INV-2024-0047
    </p>
  </div>

  <div class="actions">
    <button class="btn btn-primary">Send Reminder</button>
    <button class="btn btn-success">Mark as Paid</button>
    <button class="btn">Download PDF</button>
  </div>

  <div class="card notes">
    <h3>Notes</h3>
    <p>Payment is due within 30 days of invoice date. Late payments may be subject to a 1.5% monthly interest charge. Please include the invoice number as a reference when making payment. Thank you for your business!</p>
  </div>
</div>

</body>
</html>`;
}

export function clients(themeCSS: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Clients — Ledger</title>
<style>${themeCSS}</style>
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: var(--theme-font-body); color: var(--theme-text); background: var(--theme-bg); line-height: var(--theme-line-height-normal); font-size: var(--theme-font-size-medium); }
h1, h2, h3 { font-family: var(--theme-font-heading); }

.topbar {
  background: var(--theme-color-surface);
  border-bottom: 1px solid var(--theme-color-border);
  padding: 0 var(--theme-space-4);
  display: flex; align-items: center; height: 56px;
  position: sticky; top: 0; z-index: 10;
}
.topbar .logo { font-size: var(--theme-font-size-large); font-weight: 700; color: var(--theme-color-primary); margin-right: var(--theme-space-6); letter-spacing: -0.025em; }
.topbar nav { display: flex; gap: var(--theme-space-1); }
.topbar nav a { color: var(--theme-color-secondary); text-decoration: none; font-size: var(--theme-font-size-small); font-weight: 500; padding: var(--theme-space-1) var(--theme-space-2); border-radius: 6px; transition: background 0.15s, color 0.15s; }
.topbar nav a:hover { background: var(--theme-bg); color: var(--theme-text); }
.topbar nav a.active { background: var(--theme-color-primary); color: var(--theme-color-surface); }
.topbar .spacer { flex: 1; }
.topbar .avatar { width: 32px; height: 32px; border-radius: 50%; background: var(--theme-color-primary); color: var(--theme-color-surface); display: flex; align-items: center; justify-content: center; font-size: var(--theme-font-size-small); font-weight: 600; }

.main { max-width: var(--theme-content-width); margin: 0 auto; padding: var(--theme-space-4) var(--theme-space-3); }

.page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--theme-space-3); }
.page-header h1 { font-size: var(--theme-font-size-xlarge); font-weight: 700; }
.btn { padding: var(--theme-space-1) var(--theme-space-3); border-radius: 8px; font-size: var(--theme-font-size-small); font-weight: 600; border: 1px solid var(--theme-color-border); background: var(--theme-color-surface); color: var(--theme-text); cursor: pointer; }
.btn-primary { background: var(--theme-color-primary); color: var(--theme-color-surface); border-color: var(--theme-color-primary); }

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

.table-wrap {
  background: var(--theme-color-surface);
  border: 1px solid var(--theme-color-border);
  border-radius: 10px;
  overflow: hidden;
}
table { width: 100%; border-collapse: collapse; }
thead { background: var(--theme-bg); }
th { text-align: left; padding: var(--theme-space-2) var(--theme-space-3); font-size: var(--theme-font-size-small); font-weight: 600; color: var(--theme-color-secondary); border-bottom: 1px solid var(--theme-color-border); }
td { padding: var(--theme-space-2) var(--theme-space-3); border-bottom: 1px solid var(--theme-color-border); font-size: var(--theme-font-size-small); }
tr:last-child td { border-bottom: none; }
tr:hover td { background: var(--theme-bg); }

.client-name { font-weight: 600; color: var(--theme-text); }
.client-contact { color: var(--theme-color-secondary); font-size: 0.75rem; }
.client-email { color: var(--theme-color-primary); text-decoration: none; font-size: 0.75rem; }
.amount { font-variant-numeric: tabular-nums; font-weight: 500; }

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
</style>
</head>
<body>

<div class="topbar">
  <div class="logo">Ledger</div>
  <nav>
    <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'homepage'},'*');return false">Dashboard</a>
    <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'invoice'},'*');return false">Invoices</a>
    <a href="#" class="active" onclick="window.parent.postMessage({type:'navigate',page:'clients'},'*');return false">Clients</a>
    <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'reports'},'*');return false">Reports</a>
    <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'settings'},'*');return false">Settings</a>
  </nav>
  <div class="spacer"></div>
  <div class="avatar">S</div>
</div>

<div class="main">
  <div class="page-header">
    <h1>Clients</h1>
    <button class="btn btn-primary">+ Add Client</button>
  </div>

  <div class="search-bar">
    <input type="text" placeholder="Search clients…" />
    <select>
      <option>All Status</option>
      <option>Active</option>
      <option>Inactive</option>
    </select>
  </div>

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
      <tbody>
        <tr>
          <td>
            <div class="client-name">Meridian Labs</div>
            <a href="#" class="client-email">accounts@meridianlabs.io</a>
          </td>
          <td>
            <div>Sarah Chen</div>
            <div class="client-contact">VP of Operations</div>
          </td>
          <td class="amount">$18,400</td>
          <td class="amount">$4,200</td>
          <td>Feb 1, 2026</td>
          <td><span class="status-dot status-active">Active</span></td>
        </tr>
        <tr>
          <td>
            <div class="client-name">Vertex Studios</div>
            <a href="#" class="client-email">billing@vertexstudios.com</a>
          </td>
          <td>
            <div>Marcus Webb</div>
            <div class="client-contact">Creative Director</div>
          </td>
          <td class="amount">$12,650</td>
          <td class="amount">$0</td>
          <td>Jan 28, 2026</td>
          <td><span class="status-dot status-active">Active</span></td>
        </tr>
        <tr>
          <td>
            <div class="client-name">Oakline Properties</div>
            <a href="#" class="client-email">ap@oaklineproperties.com</a>
          </td>
          <td>
            <div>Diana Reeves</div>
            <div class="client-contact">Finance Manager</div>
          </td>
          <td class="amount">$6,200</td>
          <td class="amount">$850</td>
          <td>Jan 15, 2026</td>
          <td><span class="status-dot status-active">Active</span></td>
        </tr>
        <tr>
          <td>
            <div class="client-name">Cascade Health</div>
            <a href="#" class="client-email">invoices@cascadehealth.org</a>
          </td>
          <td>
            <div>James Patel</div>
            <div class="client-contact">COO</div>
          </td>
          <td class="amount">$22,100</td>
          <td class="amount">$0</td>
          <td>Jan 12, 2026</td>
          <td><span class="status-dot status-active">Active</span></td>
        </tr>
        <tr>
          <td>
            <div class="client-name">Nomad Collective</div>
            <a href="#" class="client-email">hello@nomadcollective.co</a>
          </td>
          <td>
            <div>Ava Kim</div>
            <div class="client-contact">Founder</div>
          </td>
          <td class="amount">$8,900</td>
          <td class="amount">$0</td>
          <td>Jan 5, 2026</td>
          <td><span class="status-dot status-active">Active</span></td>
        </tr>
        <tr>
          <td>
            <div class="client-name">Brightpath Education</div>
            <a href="#" class="client-email">admin@brightpathedu.com</a>
          </td>
          <td>
            <div>Tom Gallagher</div>
            <div class="client-contact">Program Director</div>
          </td>
          <td class="amount">$3,400</td>
          <td class="amount">$1,200</td>
          <td>Dec 28, 2025</td>
          <td><span class="status-dot status-inactive">Inactive</span></td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

</body>
</html>`;
}

export function reports(themeCSS: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Reports — Ledger</title>
<style>${themeCSS}</style>
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: var(--theme-font-body); color: var(--theme-text); background: var(--theme-bg); line-height: var(--theme-line-height-normal); font-size: var(--theme-font-size-medium); }
h1, h2, h3 { font-family: var(--theme-font-heading); }

.topbar { background: var(--theme-color-surface); border-bottom: 1px solid var(--theme-color-border); padding: 0 var(--theme-space-4); display: flex; align-items: center; height: 56px; position: sticky; top: 0; z-index: 10; }
.topbar .logo { font-size: var(--theme-font-size-large); font-weight: 700; color: var(--theme-color-primary); margin-right: var(--theme-space-6); letter-spacing: -0.025em; }
.topbar nav { display: flex; gap: var(--theme-space-1); }
.topbar nav a { color: var(--theme-color-secondary); text-decoration: none; font-size: var(--theme-font-size-small); font-weight: 500; padding: var(--theme-space-1) var(--theme-space-2); border-radius: 6px; transition: background 0.15s, color 0.15s; }
.topbar nav a:hover { background: var(--theme-bg); color: var(--theme-text); }
.topbar nav a.active { background: var(--theme-color-primary); color: var(--theme-color-surface); }
.topbar .spacer { flex: 1; }
.topbar .avatar { width: 32px; height: 32px; border-radius: 50%; background: var(--theme-color-primary); color: var(--theme-color-surface); display: flex; align-items: center; justify-content: center; font-size: var(--theme-font-size-small); font-weight: 600; }

.main { max-width: var(--theme-content-width); margin: 0 auto; padding: var(--theme-space-4) var(--theme-space-3); }

.page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--theme-space-3); }
.page-header h1 { font-size: var(--theme-font-size-xlarge); font-weight: 700; }
.date-range { display: flex; align-items: center; gap: var(--theme-space-1); }
.date-range select, .date-range input { padding: var(--theme-space-1) var(--theme-space-2); border: 1px solid var(--theme-color-border); border-radius: 8px; font-size: var(--theme-font-size-small); font-family: var(--theme-font-body); background: var(--theme-color-surface); color: var(--theme-text); }

.summary-cards { display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--theme-space-3); margin-bottom: var(--theme-space-5); }
.summary-card { background: var(--theme-color-surface); border: 1px solid var(--theme-color-border); border-radius: 10px; padding: var(--theme-space-3); }
.summary-card .label { font-size: var(--theme-font-size-small); color: var(--theme-color-secondary); font-weight: 500; margin-bottom: var(--theme-space-1); }
.summary-card .value { font-size: var(--theme-font-size-xlarge); font-weight: 700; color: var(--theme-text); font-variant-numeric: tabular-nums; }
.summary-card .change { font-size: var(--theme-font-size-small); font-weight: 600; margin-top: 4px; }
.change-up { color: var(--theme-color-success); }
.change-down { color: var(--theme-color-danger); }

.card { background: var(--theme-color-surface); border: 1px solid var(--theme-color-border); border-radius: 10px; padding: var(--theme-space-3); margin-bottom: var(--theme-space-4); }
.card h2 { font-size: var(--theme-font-size-large); font-weight: 600; margin-bottom: var(--theme-space-3); }

.bars { display: flex; align-items: flex-end; gap: var(--theme-space-1); height: 200px; padding-top: var(--theme-space-2); }
.bar-col { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 4px; height: 100%; justify-content: flex-end; }
.bar-group { display: flex; gap: 3px; align-items: flex-end; width: 100%; justify-content: center; }
.bar { width: 18px; border-radius: 3px 3px 0 0; transition: opacity 0.2s; }
.bar:hover { opacity: 0.8; }
.bar-current { background: var(--theme-color-primary); }
.bar-prev { background: var(--theme-color-muted); }
.bar-label { font-size: 0.65rem; color: var(--theme-color-secondary); font-weight: 500; }
.bar-value { font-size: 0.65rem; color: var(--theme-text); font-weight: 600; font-variant-numeric: tabular-nums; }

.chart-legend { display: flex; gap: var(--theme-space-3); margin-top: var(--theme-space-2); }
.legend-item { display: flex; align-items: center; gap: 6px; font-size: var(--theme-font-size-small); color: var(--theme-color-secondary); }
.legend-dot { width: 10px; height: 10px; border-radius: 2px; }
.legend-dot-current { background: var(--theme-color-primary); }
.legend-dot-prev { background: var(--theme-color-muted); }

.two-col { display: grid; grid-template-columns: 1fr 1fr; gap: var(--theme-space-3); margin-bottom: var(--theme-space-4); }

table { width: 100%; border-collapse: collapse; }
thead { background: var(--theme-bg); }
th { text-align: left; padding: var(--theme-space-2) var(--theme-space-2); font-size: var(--theme-font-size-small); font-weight: 600; color: var(--theme-color-secondary); border-bottom: 1px solid var(--theme-color-border); }
th:last-child, td:last-child { text-align: right; }
td { padding: var(--theme-space-2); border-bottom: 1px solid var(--theme-color-border); font-size: var(--theme-font-size-small); }
tr:last-child td { border-bottom: none; }
.amount { font-variant-numeric: tabular-nums; font-weight: 600; }

.ratio-bar { display: flex; height: 32px; border-radius: 8px; overflow: hidden; margin-bottom: var(--theme-space-1); }
.ratio-paid { background: var(--theme-color-success); }
.ratio-outstanding { background: var(--theme-color-warning); }
.ratio-overdue { background: var(--theme-color-danger); }
.ratio-legend { display: flex; gap: var(--theme-space-3); font-size: var(--theme-font-size-small); color: var(--theme-color-secondary); }
.ratio-legend span { display: flex; align-items: center; gap: 4px; }
.ratio-legend .dot { width: 8px; height: 8px; border-radius: 50%; display: inline-block; }
</style>
</head>
<body>

<div class="topbar">
  <div class="logo">Ledger</div>
  <nav>
    <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'homepage'},'*');return false">Dashboard</a>
    <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'invoice'},'*');return false">Invoices</a>
    <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'clients'},'*');return false">Clients</a>
    <a href="#" class="active" onclick="window.parent.postMessage({type:'navigate',page:'reports'},'*');return false">Reports</a>
    <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'settings'},'*');return false">Settings</a>
  </nav>
  <div class="spacer"></div>
  <div class="avatar">S</div>
</div>

<div class="main">
  <div class="page-header">
    <h1>Reports</h1>
    <div class="date-range">
      <select>
        <option>Last 12 Months</option>
        <option>This Quarter</option>
        <option>This Year</option>
        <option selected>Custom Range</option>
      </select>
      <input type="date" value="2025-03-01" />
      <span style="color:var(--theme-color-secondary)">to</span>
      <input type="date" value="2026-02-14" />
    </div>
  </div>

  <div class="summary-cards">
    <div class="summary-card">
      <div class="label">Total Revenue</div>
      <div class="value">$142,680</div>
      <div class="change change-up">↑ 18.3% vs prior year</div>
    </div>
    <div class="summary-card">
      <div class="label">Invoices Sent</div>
      <div class="value">47</div>
      <div class="change change-up">↑ 12 more than prior year</div>
    </div>
    <div class="summary-card">
      <div class="label">Avg. Invoice Value</div>
      <div class="value">$3,036</div>
      <div class="change change-down">↓ 4.1% vs prior year</div>
    </div>
    <div class="summary-card">
      <div class="label">Avg. Days to Pay</div>
      <div class="value">18.4</div>
      <div class="change change-up">↑ 2.1 days faster</div>
    </div>
  </div>

  <div class="card">
    <h2>Monthly Revenue — Year-over-Year</h2>
    <div class="bars">
      <div class="bar-col">
        <div class="bar-value">$8.2k</div>
        <div class="bar-group">
          <div class="bar bar-prev" style="height: 55%;"></div>
          <div class="bar bar-current" style="height: 68%;"></div>
        </div>
        <div class="bar-label">Mar</div>
      </div>
      <div class="bar-col">
        <div class="bar-value">$9.6k</div>
        <div class="bar-group">
          <div class="bar bar-prev" style="height: 50%;"></div>
          <div class="bar bar-current" style="height: 80%;"></div>
        </div>
        <div class="bar-label">Apr</div>
      </div>
      <div class="bar-col">
        <div class="bar-value">$7.8k</div>
        <div class="bar-group">
          <div class="bar bar-prev" style="height: 62%;"></div>
          <div class="bar bar-current" style="height: 65%;"></div>
        </div>
        <div class="bar-label">May</div>
      </div>
      <div class="bar-col">
        <div class="bar-value">$11.4k</div>
        <div class="bar-group">
          <div class="bar bar-prev" style="height: 58%;"></div>
          <div class="bar bar-current" style="height: 95%;"></div>
        </div>
        <div class="bar-label">Jun</div>
      </div>
      <div class="bar-col">
        <div class="bar-value">$10.2k</div>
        <div class="bar-group">
          <div class="bar bar-prev" style="height: 70%;"></div>
          <div class="bar bar-current" style="height: 85%;"></div>
        </div>
        <div class="bar-label">Jul</div>
      </div>
      <div class="bar-col">
        <div class="bar-value">$13.1k</div>
        <div class="bar-group">
          <div class="bar bar-prev" style="height: 65%;"></div>
          <div class="bar bar-current" style="height: 100%;"></div>
        </div>
        <div class="bar-label">Aug</div>
      </div>
      <div class="bar-col">
        <div class="bar-value">$9.8k</div>
        <div class="bar-group">
          <div class="bar bar-prev" style="height: 72%;"></div>
          <div class="bar bar-current" style="height: 82%;"></div>
        </div>
        <div class="bar-label">Sep</div>
      </div>
      <div class="bar-col">
        <div class="bar-value">$14.5k</div>
        <div class="bar-group">
          <div class="bar bar-prev" style="height: 68%;"></div>
          <div class="bar bar-current" style="height: 100%;"></div>
        </div>
        <div class="bar-label">Oct</div>
      </div>
      <div class="bar-col">
        <div class="bar-value">$12.3k</div>
        <div class="bar-group">
          <div class="bar bar-prev" style="height: 75%;"></div>
          <div class="bar bar-current" style="height: 92%;"></div>
        </div>
        <div class="bar-label">Nov</div>
      </div>
      <div class="bar-col">
        <div class="bar-value">$15.8k</div>
        <div class="bar-group">
          <div class="bar bar-prev" style="height: 72%;"></div>
          <div class="bar bar-current" style="height: 100%;"></div>
        </div>
        <div class="bar-label">Dec</div>
      </div>
      <div class="bar-col">
        <div class="bar-value">$14.2k</div>
        <div class="bar-group">
          <div class="bar bar-prev" style="height: 60%;"></div>
          <div class="bar bar-current" style="height: 95%;"></div>
        </div>
        <div class="bar-label">Jan</div>
      </div>
      <div class="bar-col">
        <div class="bar-value">$15.7k</div>
        <div class="bar-group">
          <div class="bar bar-prev" style="height: 55%;"></div>
          <div class="bar bar-current" style="height: 98%;"></div>
        </div>
        <div class="bar-label">Feb</div>
      </div>
    </div>
    <div class="chart-legend">
      <div class="legend-item"><div class="legend-dot legend-dot-current"></div> 2025–2026</div>
      <div class="legend-item"><div class="legend-dot legend-dot-prev"></div> 2024–2025</div>
    </div>
  </div>

  <div class="two-col">
    <div class="card">
      <h2>Top Clients by Revenue</h2>
      <table>
        <thead><tr><th>Client</th><th>Revenue</th></tr></thead>
        <tbody>
          <tr><td>Cascade Health</td><td class="amount">$22,100.00</td></tr>
          <tr><td>Meridian Studios</td><td class="amount">$19,850.00</td></tr>
          <tr><td>Solaris Energy</td><td class="amount">$18,200.00</td></tr>
          <tr><td>Vertex Studios</td><td class="amount">$12,650.00</td></tr>
          <tr><td>Nomad Collective</td><td class="amount">$8,900.00</td></tr>
          <tr><td>Oakline Properties</td><td class="amount">$6,200.00</td></tr>
          <tr><td>Brightpath Education</td><td class="amount">$3,400.00</td></tr>
        </tbody>
      </table>
    </div>

    <div class="card">
      <h2>Outstanding vs Paid</h2>
      <div class="ratio-bar">
        <div class="ratio-paid" style="width: 78%;"></div>
        <div class="ratio-outstanding" style="width: 14%;"></div>
        <div class="ratio-overdue" style="width: 8%;"></div>
      </div>
      <div class="ratio-legend">
        <span><span class="dot" style="background:var(--theme-color-success)"></span> Paid — $111,290 (78%)</span>
        <span><span class="dot" style="background:var(--theme-color-warning)"></span> Outstanding — $19,950 (14%)</span>
        <span><span class="dot" style="background:var(--theme-color-danger)"></span> Overdue — $11,440 (8%)</span>
      </div>

      <h2 style="margin-top: var(--theme-space-4);">Monthly Breakdown</h2>
      <table>
        <thead><tr><th>Month</th><th>Invoiced</th><th>Collected</th></tr></thead>
        <tbody>
          <tr><td>Feb 2026</td><td class="amount">$15,700.00</td><td class="amount">$8,430.00</td></tr>
          <tr><td>Jan 2026</td><td class="amount">$14,200.00</td><td class="amount">$12,950.00</td></tr>
          <tr><td>Dec 2025</td><td class="amount">$15,800.00</td><td class="amount">$14,600.00</td></tr>
          <tr><td>Nov 2025</td><td class="amount">$12,300.00</td><td class="amount">$12,300.00</td></tr>
          <tr><td>Oct 2025</td><td class="amount">$14,500.00</td><td class="amount">$14,500.00</td></tr>
          <tr><td>Sep 2025</td><td class="amount">$9,800.00</td><td class="amount">$9,800.00</td></tr>
        </tbody>
      </table>
    </div>
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
<title>Settings — Ledger</title>
<style>${themeCSS}</style>
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: var(--theme-font-body); color: var(--theme-text); background: var(--theme-bg); line-height: var(--theme-line-height-normal); font-size: var(--theme-font-size-medium); }
h1, h2, h3 { font-family: var(--theme-font-heading); }

.topbar { background: var(--theme-color-surface); border-bottom: 1px solid var(--theme-color-border); padding: 0 var(--theme-space-4); display: flex; align-items: center; height: 56px; position: sticky; top: 0; z-index: 10; }
.topbar .logo { font-size: var(--theme-font-size-large); font-weight: 700; color: var(--theme-color-primary); margin-right: var(--theme-space-6); letter-spacing: -0.025em; }
.topbar nav { display: flex; gap: var(--theme-space-1); }
.topbar nav a { color: var(--theme-color-secondary); text-decoration: none; font-size: var(--theme-font-size-small); font-weight: 500; padding: var(--theme-space-1) var(--theme-space-2); border-radius: 6px; transition: background 0.15s, color 0.15s; }
.topbar nav a:hover { background: var(--theme-bg); color: var(--theme-text); }
.topbar nav a.active { background: var(--theme-color-primary); color: var(--theme-color-surface); }
.topbar .spacer { flex: 1; }
.topbar .avatar { width: 32px; height: 32px; border-radius: 50%; background: var(--theme-color-primary); color: var(--theme-color-surface); display: flex; align-items: center; justify-content: center; font-size: var(--theme-font-size-small); font-weight: 600; }

.main { max-width: 800px; margin: 0 auto; padding: var(--theme-space-4) var(--theme-space-3); }
.page-header { margin-bottom: var(--theme-space-4); }
.page-header h1 { font-size: var(--theme-font-size-xlarge); font-weight: 700; }
.page-header p { font-size: var(--theme-font-size-small); color: var(--theme-color-secondary); margin-top: 4px; }

.section { background: var(--theme-color-surface); border: 1px solid var(--theme-color-border); border-radius: 10px; padding: var(--theme-space-4); margin-bottom: var(--theme-space-3); }
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
.badge { display: inline-block; padding: 2px 10px; border-radius: 999px; font-size: 0.7rem; font-weight: 600; }
.badge-connected { background: var(--theme-color-success-light); color: var(--theme-color-success); }
.badge-default { background: var(--theme-color-primary); color: var(--theme-color-surface); font-size: 0.65rem; padding: 1px 8px; margin-left: 6px; }

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
.btn { padding: var(--theme-space-1) var(--theme-space-3); border-radius: 8px; font-size: var(--theme-font-size-small); font-weight: 600; border: 1px solid var(--theme-color-border); background: var(--theme-color-surface); color: var(--theme-text); cursor: pointer; }
.btn-danger { border-color: var(--theme-color-danger); color: var(--theme-color-danger); }
.btn-primary { background: var(--theme-color-primary); color: var(--theme-color-surface); border-color: var(--theme-color-primary); }
.btn-save { margin-top: var(--theme-space-3); }
</style>
</head>
<body>

<div class="topbar">
  <div class="logo">Ledger</div>
  <nav>
    <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'homepage'},'*');return false">Dashboard</a>
    <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'invoice'},'*');return false">Invoices</a>
    <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'clients'},'*');return false">Clients</a>
    <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'reports'},'*');return false">Reports</a>
    <a href="#" class="active" onclick="window.parent.postMessage({type:'navigate',page:'settings'},'*');return false">Settings</a>
  </nav>
  <div class="spacer"></div>
  <div class="avatar">S</div>
</div>

<div class="main">
  <div class="page-header">
    <h1>Settings</h1>
    <p>Manage your business profile, invoicing defaults, and integrations.</p>
  </div>

  <div class="section">
    <h2>Business Profile</h2>
    <div class="desc">Your company information appears on all invoices.</div>
    <div class="logo-placeholder">Logo</div>
    <div class="form-grid">
      <div class="form-group">
        <label>Company Name</label>
        <input type="text" value="Ledger Design Co." />
      </div>
      <div class="form-group">
        <label>Tax ID / EIN</label>
        <input type="text" value="82-4921038" />
      </div>
      <div class="form-group full">
        <label>Address</label>
        <textarea>123 Commerce Street, Suite 400
Portland, OR 97201</textarea>
      </div>
      <div class="form-group">
        <label>Email</label>
        <input type="email" value="billing@ledgerdesign.co" />
      </div>
      <div class="form-group">
        <label>Phone</label>
        <input type="tel" value="(503) 555-0142" />
      </div>
    </div>
  </div>

  <div class="section">
    <h2>Invoice Defaults</h2>
    <div class="desc">Default values applied to new invoices. Can be overridden per invoice.</div>
    <div class="form-grid">
      <div class="form-group">
        <label>Payment Terms</label>
        <select>
          <option>Due on Receipt</option>
          <option>Net 15</option>
          <option selected>Net 30</option>
          <option>Net 45</option>
          <option>Net 60</option>
        </select>
      </div>
      <div class="form-group">
        <label>Currency</label>
        <select>
          <option selected>USD — US Dollar</option>
          <option>EUR — Euro</option>
          <option>GBP — British Pound</option>
          <option>CAD — Canadian Dollar</option>
        </select>
      </div>
      <div class="form-group">
        <label>Default Tax Rate</label>
        <input type="text" value="10%" />
      </div>
      <div class="form-group">
        <label>Late Fee (monthly)</label>
        <input type="text" value="1.5%" />
      </div>
      <div class="form-group">
        <label>Invoice Number Prefix</label>
        <input type="text" value="INV-" />
      </div>
      <div class="form-group">
        <label>Next Invoice Number</label>
        <input type="text" value="2024-0048" />
      </div>
    </div>
  </div>

  <div class="section">
    <h2>Payment Methods</h2>
    <div class="desc">Accepted payment methods shown on invoices.</div>
    <div class="payment-method">
      <div class="pm-info">
        <div class="pm-icon pm-icon-bank">BK</div>
        <div>
          <div class="pm-name">First National Bank <span class="badge badge-default">Default</span></div>
          <div class="pm-detail">Account ••••4821 · Routing 021000021</div>
        </div>
      </div>
      <span class="badge badge-connected">Connected</span>
    </div>
    <div class="payment-method">
      <div class="pm-info">
        <div class="pm-icon pm-icon-paypal">PP</div>
        <div>
          <div class="pm-name">PayPal</div>
          <div class="pm-detail">billing@ledgerdesign.co</div>
        </div>
      </div>
      <span class="badge badge-connected">Connected</span>
    </div>
    <div class="payment-method">
      <div class="pm-info">
        <div class="pm-icon pm-icon-stripe">ST</div>
        <div>
          <div class="pm-name">Stripe</div>
          <div class="pm-detail">acct_1NxB4k2eZvKYlo · Live mode</div>
        </div>
      </div>
      <span class="badge badge-connected">Connected</span>
    </div>
  </div>

  <div class="section">
    <h2>Email Templates</h2>
    <div class="desc">Customize automated emails sent with invoices and reminders.</div>

    <div class="template-preview">
      <h3>Invoice Sent <a class="edit-link">Edit</a></h3>
      <p>Hi {client_name}, please find attached invoice {invoice_number} for {amount} due by {due_date}. You can view and pay online at the link below. Thank you for your business!</p>
    </div>
    <div class="template-preview">
      <h3>Payment Reminder <a class="edit-link">Edit</a></h3>
      <p>Hi {client_name}, this is a friendly reminder that invoice {invoice_number} for {amount} is due on {due_date}. If you've already sent payment, please disregard this notice.</p>
    </div>
    <div class="template-preview">
      <h3>Overdue Notice <a class="edit-link">Edit</a></h3>
      <p>Hi {client_name}, invoice {invoice_number} for {amount} was due on {due_date} and is now {days_overdue} days past due. A late fee of {late_fee} may apply. Please remit payment at your earliest convenience.</p>
    </div>
  </div>

  <div class="section danger-zone">
    <h2>Danger Zone</h2>
    <div class="danger-item">
      <div class="di-text">
        <h3>Export All Data</h3>
        <p>Download all invoices, clients, and reports as a CSV archive.</p>
      </div>
      <button class="btn">Export</button>
    </div>
    <div class="danger-item">
      <div class="di-text">
        <h3>Reset Invoice Counter</h3>
        <p>Reset the auto-incrementing invoice number. Cannot be undone.</p>
      </div>
      <button class="btn btn-danger">Reset</button>
    </div>
    <div class="danger-item">
      <div class="di-text">
        <h3>Delete Account</h3>
        <p>Permanently delete your account and all associated data.</p>
      </div>
      <button class="btn btn-danger">Delete</button>
    </div>
  </div>

  <button class="btn btn-primary btn-save">Save Changes</button>
</div>

</body>
</html>`;
}

export function clientDetail(themeCSS: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Meridian Studios — Ledger</title>
<style>${themeCSS}</style>
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: var(--theme-font-body); color: var(--theme-text); background: var(--theme-bg); line-height: var(--theme-line-height-normal); font-size: var(--theme-font-size-medium); }
h1, h2, h3 { font-family: var(--theme-font-heading); }

.topbar { background: var(--theme-color-surface); border-bottom: 1px solid var(--theme-color-border); padding: 0 var(--theme-space-4); display: flex; align-items: center; height: 56px; position: sticky; top: 0; z-index: 10; }
.topbar .logo { font-size: var(--theme-font-size-large); font-weight: 700; color: var(--theme-color-primary); margin-right: var(--theme-space-6); letter-spacing: -0.025em; }
.topbar nav { display: flex; gap: var(--theme-space-1); }
.topbar nav a { color: var(--theme-color-secondary); text-decoration: none; font-size: var(--theme-font-size-small); font-weight: 500; padding: var(--theme-space-1) var(--theme-space-2); border-radius: 6px; transition: background 0.15s, color 0.15s; }
.topbar nav a:hover { background: var(--theme-bg); color: var(--theme-text); }
.topbar nav a.active { background: var(--theme-color-primary); color: var(--theme-color-surface); }
.topbar .spacer { flex: 1; }
.topbar .avatar { width: 32px; height: 32px; border-radius: 50%; background: var(--theme-color-primary); color: var(--theme-color-surface); display: flex; align-items: center; justify-content: center; font-size: var(--theme-font-size-small); font-weight: 600; }

.main { max-width: var(--theme-content-width); margin: 0 auto; padding: var(--theme-space-4) var(--theme-space-3); }

.back-link { display: inline-flex; align-items: center; gap: 4px; color: var(--theme-color-secondary); text-decoration: none; font-size: var(--theme-font-size-small); font-weight: 500; margin-bottom: var(--theme-space-3); }
.back-link:hover { color: var(--theme-color-primary); }

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
.btn { padding: var(--theme-space-1) var(--theme-space-3); border-radius: 8px; font-size: var(--theme-font-size-small); font-weight: 600; border: 1px solid var(--theme-color-border); background: var(--theme-color-surface); color: var(--theme-text); cursor: pointer; }
.btn-primary { background: var(--theme-color-primary); color: var(--theme-color-surface); border-color: var(--theme-color-primary); }

.stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--theme-space-3); margin-bottom: var(--theme-space-4); }
.stat-card { background: var(--theme-color-surface); border: 1px solid var(--theme-color-border); border-radius: 10px; padding: var(--theme-space-3); }
.stat-card .label { font-size: var(--theme-font-size-small); color: var(--theme-color-secondary); font-weight: 500; margin-bottom: var(--theme-space-1); }
.stat-card .value { font-size: var(--theme-font-size-xlarge); font-weight: 700; font-variant-numeric: tabular-nums; }

.two-col { display: grid; grid-template-columns: 2fr 1fr; gap: var(--theme-space-3); }

.card { background: var(--theme-color-surface); border: 1px solid var(--theme-color-border); border-radius: 10px; padding: var(--theme-space-3); margin-bottom: var(--theme-space-3); }
.card h2 { font-size: var(--theme-font-size-large); font-weight: 600; margin-bottom: var(--theme-space-2); }

table { width: 100%; border-collapse: collapse; }
thead { background: var(--theme-bg); }
th { text-align: left; padding: var(--theme-space-2); font-size: var(--theme-font-size-small); font-weight: 600; color: var(--theme-color-secondary); border-bottom: 1px solid var(--theme-color-border); }
th:last-child { text-align: right; }
td { padding: var(--theme-space-2); border-bottom: 1px solid var(--theme-color-border); font-size: var(--theme-font-size-small); }
td:last-child { text-align: right; }
tr:last-child td { border-bottom: none; }
tr:hover td { background: var(--theme-bg); }
.amount { font-variant-numeric: tabular-nums; font-weight: 600; }
.inv-link { color: var(--theme-color-primary); text-decoration: none; font-weight: 500; cursor: pointer; }
.inv-link:hover { text-decoration: underline; }

.badge { display: inline-block; padding: 2px 10px; border-radius: 999px; font-size: 0.7rem; font-weight: 600; }
.badge-paid { background: var(--theme-color-success-light); color: var(--theme-color-success); }
.badge-pending { background: var(--theme-color-warning-light); color: var(--theme-color-warning); }
.badge-overdue { background: var(--theme-color-danger-light); color: var(--theme-color-danger); }
.badge-draft { background: var(--theme-bg); color: var(--theme-color-muted); border: 1px solid var(--theme-color-border); }

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
</style>
</head>
<body>

<div class="topbar">
  <div class="logo">Ledger</div>
  <nav>
    <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'homepage'},'*');return false">Dashboard</a>
    <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'invoice'},'*');return false">Invoices</a>
    <a href="#" class="active" onclick="window.parent.postMessage({type:'navigate',page:'clients'},'*');return false">Clients</a>
    <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'reports'},'*');return false">Reports</a>
    <a href="#" onclick="window.parent.postMessage({type:'navigate',page:'settings'},'*');return false">Settings</a>
  </nav>
  <div class="spacer"></div>
  <div class="avatar">S</div>
</div>

<div class="main">
  <a class="back-link" href="#" onclick="window.parent.postMessage({type:'navigate',page:'clients'},'*');return false">← Back to Clients</a>

  <div class="client-header">
    <div class="client-info">
      <div class="client-avatar">M</div>
      <div class="client-meta">
        <h1>Meridian Studios</h1>
        <div class="subtitle">Creative Agency · San Francisco, CA &nbsp; <span class="status-badge">Active</span></div>
      </div>
    </div>
    <button class="btn btn-primary">+ New Invoice</button>
  </div>

  <div class="stats-grid">
    <div class="stat-card">
      <div class="label">Total Revenue</div>
      <div class="value">$19,850</div>
    </div>
    <div class="stat-card">
      <div class="label">Outstanding</div>
      <div class="value">$4,200</div>
    </div>
    <div class="stat-card">
      <div class="label">Invoices</div>
      <div class="value">8</div>
    </div>
    <div class="stat-card">
      <div class="label">Avg. Days to Pay</div>
      <div class="value">16.2</div>
    </div>
  </div>

  <div class="two-col">
    <div>
      <div class="card">
        <h2>Invoices</h2>
        <table>
          <thead>
            <tr><th>Invoice #</th><th>Date</th><th>Amount</th><th>Status</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><a class="inv-link" href="#" onclick="window.parent.postMessage({type:'navigate',page:'invoice'},'*');return false">INV-2024-0047</a></td>
              <td>Feb 1, 2026</td>
              <td class="amount">$4,200.00</td>
              <td><span class="badge badge-pending">Pending</span></td>
            </tr>
            <tr>
              <td><a class="inv-link" href="#">INV-2024-0039</a></td>
              <td>Dec 15, 2025</td>
              <td class="amount">$3,150.00</td>
              <td><span class="badge badge-paid">Paid</span></td>
            </tr>
            <tr>
              <td><a class="inv-link" href="#">INV-2024-0034</a></td>
              <td>Nov 2, 2025</td>
              <td class="amount">$2,800.00</td>
              <td><span class="badge badge-paid">Paid</span></td>
            </tr>
            <tr>
              <td><a class="inv-link" href="#">INV-2024-0028</a></td>
              <td>Sep 18, 2025</td>
              <td class="amount">$1,950.00</td>
              <td><span class="badge badge-paid">Paid</span></td>
            </tr>
            <tr>
              <td><a class="inv-link" href="#">INV-2024-0022</a></td>
              <td>Aug 5, 2025</td>
              <td class="amount">$3,600.00</td>
              <td><span class="badge badge-paid">Paid</span></td>
            </tr>
            <tr>
              <td><a class="inv-link" href="#">INV-2024-0016</a></td>
              <td>Jun 20, 2025</td>
              <td class="amount">$1,200.00</td>
              <td><span class="badge badge-paid">Paid</span></td>
            </tr>
            <tr>
              <td><a class="inv-link" href="#">INV-2024-0011</a></td>
              <td>May 3, 2025</td>
              <td class="amount">$1,750.00</td>
              <td><span class="badge badge-paid">Paid</span></td>
            </tr>
            <tr>
              <td><a class="inv-link" href="#">INV-2024-0005</a></td>
              <td>Mar 12, 2025</td>
              <td class="amount">$1,200.00</td>
              <td><span class="badge badge-paid">Paid</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div>
      <div class="card">
        <h2>Contact Details</h2>
        <ul class="contact-list">
          <li><span class="contact-label">Contact</span><span class="contact-value">Sarah Chen</span></li>
          <li><span class="contact-label">Title</span><span class="contact-value">VP of Operations</span></li>
          <li><span class="contact-label">Email</span><span class="contact-value"><a href="#">sarah@meridianstudios.com</a></span></li>
          <li><span class="contact-label">Phone</span><span class="contact-value">(415) 555-0198</span></li>
          <li><span class="contact-label">Address</span><span class="contact-value">456 Innovation Dr, Floor 12<br>San Francisco, CA 94105</span></li>
          <li><span class="contact-label">Website</span><span class="contact-value"><a href="#">meridianstudios.com</a></span></li>
        </ul>
      </div>

      <div class="card">
        <h2>Notes</h2>
        <textarea class="notes-area">Preferred payment method: bank transfer. Sarah prefers email communication. They typically approve invoices within 3 business days.

Upsell opportunity: discussed potential rebrand project for Q2 2026. Follow up in March.

Previous point of contact was David Kim (left company Oct 2025).</textarea>
      </div>
    </div>
  </div>
</div>

</body>
</html>`;
}
