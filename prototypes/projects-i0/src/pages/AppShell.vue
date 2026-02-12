<template>
  <div class="app-shell">
    <!-- Titlebar -->
    <div class="titlebar">
      <div class="titlebar-left">
        <div class="traffic-lights">
          <span class="light close"></span>
          <span class="light minimize"></span>
          <span class="light maximize"></span>
        </div>
        <button class="titlebar-icon-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="18" rx="1"/><rect x="14" y="3" width="7" height="18" rx="1"/></svg>
        </button>
      </div>
      <div class="titlebar-right">
        <span class="titlebar-greeting">Howdy, Shaun Andrews</span>
        <span class="titlebar-avatar"></span>
        <button class="titlebar-icon-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
        </button>
        <button class="titlebar-icon-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3M12 17h.01"/></svg>
        </button>
      </div>
    </div>

    <!-- Body: sidebar + main -->
    <div class="app-body">
      <!-- Sidebar -->
      <aside class="sidebar">
        <div class="sidebar-sites">
          <div class="site-item">
            <span class="site-name">Downstreet Cafe</span>
            <span class="site-status running"></span>
          </div>
          <div class="site-item active">
            <span class="site-name">Shaun's Blog</span>
            <span class="site-status running"></span>
          </div>
          <div class="site-item">
            <span class="site-name">UI Portfolio</span>
            <span class="site-status running"></span>
          </div>
        </div>
        <div class="sidebar-footer">
          <div class="sidebar-meta">
            <span>3 sites running</span>
            <a href="#">Stop all</a>
          </div>
          <button class="add-site-btn">Add site</button>
        </div>
      </aside>

      <!-- Main frame -->
      <main class="frame">
        <div class="frame-placeholder">
          <span>Main content area</span>
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
.app-shell {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #1e1e1e;
  color: #fff;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 13px;
  -webkit-font-smoothing: antialiased;
}

.titlebar {
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 12px;
  flex-shrink: 0;
  -webkit-app-region: drag;
}

.titlebar-left,
.titlebar-right {
  display: flex;
  align-items: center;
  gap: 10px;
  -webkit-app-region: no-drag;
}

.traffic-lights {
  display: flex;
  gap: 8px;
  margin-right: 8px;
}

.light {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}
.light.close { background: #ff5f57; }
.light.minimize { background: #ffbd2e; }
.light.maximize { background: #28c840; }

.titlebar-icon-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  background: transparent;
  border: none;
  border-radius: 4px;
  color: rgba(255,255,255,0.6);
  cursor: pointer;
}
.titlebar-icon-btn:hover {
  background: rgba(255,255,255,0.1);
  color: #fff;
}

.titlebar-greeting {
  font-size: 13px;
  color: rgba(255,255,255,0.7);
}

.titlebar-avatar {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #4a9e4a;
  flex-shrink: 0;
}

/* ============================================
   BODY: SIDEBAR + FRAME
   ============================================ */
.app-body {
  flex: 1;
  display: flex;
  min-height: 0;
}

/* ============================================
   SIDEBAR
   ============================================ */
.sidebar {
  width: 208px;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
}

.sidebar-sites {
  flex: 1;
  padding: 4px 10px;
  display: flex;
  flex-direction: column;
  gap: 2px;
  overflow-y: auto;
}

.site-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
  color: rgba(255,255,255,0.8);
  transition: background 150ms ease;
}
.site-item:hover {
  background: rgba(255,255,255,0.1);
}
.site-item.active {
  background: rgba(255,255,255,0.15);
  color: #fff;
}

.site-name {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.site-status {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
}
.site-status.running { background: #069e08; }
.site-status.stopped { background: #646970; }

.sidebar-footer {
  padding: 10px;
  border-top: 1px solid rgba(255,255,255,0.1);
}

.sidebar-meta {
  display: flex;
  justify-content: space-between;
  font-size: 11px;
  color: rgba(255,255,255,0.5);
  margin-bottom: 10px;
}
.sidebar-meta a {
  color: rgba(255,255,255,0.5);
  text-decoration: none;
}
.sidebar-meta a:hover {
  color: #fff;
}

.add-site-btn {
  width: 100%;
  padding: 8px;
  background: transparent;
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: 5px;
  color: rgba(255,255,255,0.8);
  font-size: 13px;
  cursor: pointer;
  transition: all 150ms ease;
}
.add-site-btn:hover {
  background: rgba(255,255,255,0.1);
  color: #fff;
}

/* ============================================
   MAIN FRAME
   ============================================ */
.frame {
  flex: 1;
  background: #fff;
  border-radius: 5px;
  overflow: hidden;
  display: flex;
  margin: 0 10px 10px 0;
}

.frame-placeholder {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
