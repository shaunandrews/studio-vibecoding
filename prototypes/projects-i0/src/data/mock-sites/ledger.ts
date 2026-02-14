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
    <a href="#">Settings</a>
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
    <a href="#">Settings</a>
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
    <a href="#">Settings</a>
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
