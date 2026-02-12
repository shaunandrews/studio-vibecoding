<template>
  <div class="ds">
    <h1>Design System</h1>

    <section>
      <h2>Chrome</h2>
      <p class="section-desc">App frame, sidebar, and titlebar colors.</p>
      <div class="swatches">
        <div class="swatch">
          <div class="swatch-color" style="background: var(--color-chrome)"></div>
          <span class="swatch-name">chrome</span>
          <code class="swatch-value">#1e1e1e</code>
        </div>
        <div class="swatch">
          <div class="swatch-color" style="background: var(--color-chrome-text)"></div>
          <span class="swatch-name">chrome-text</span>
          <code class="swatch-value">#fff</code>
        </div>
        <div class="swatch">
          <div class="swatch-color border" style="background: var(--color-chrome-text-secondary)"></div>
          <span class="swatch-name">chrome-text-secondary</span>
          <code class="swatch-value">rgba(255,255,255,0.7)</code>
        </div>
        <div class="swatch">
          <div class="swatch-color border" style="background: var(--color-chrome-text-muted)"></div>
          <span class="swatch-name">chrome-text-muted</span>
          <code class="swatch-value">rgba(255,255,255,0.5)</code>
        </div>
        <div class="swatch">
          <div class="swatch-color border" style="background: var(--color-chrome-text-faint)"></div>
          <span class="swatch-name">chrome-text-faint</span>
          <code class="swatch-value">rgba(255,255,255,0.4)</code>
        </div>
        <div class="swatch">
          <div class="swatch-color" style="background: var(--color-chrome); outline: 2px solid var(--color-chrome-border); outline-offset: -2px;"></div>
          <span class="swatch-name">chrome-border</span>
          <code class="swatch-value">rgba(255,255,255,0.1)</code>
        </div>
        <div class="swatch">
          <div class="swatch-color" style="background: var(--color-chrome-hover)"></div>
          <span class="swatch-name">chrome-hover</span>
          <code class="swatch-value">rgba(255,255,255,0.1)</code>
        </div>
        <div class="swatch">
          <div class="swatch-color" style="background: var(--color-chrome-active)"></div>
          <span class="swatch-name">chrome-active</span>
          <code class="swatch-value">rgba(255,255,255,0.15)</code>
        </div>
        <div class="swatch">
          <div class="swatch-color" style="background: var(--color-chrome-subtle)"></div>
          <span class="swatch-name">chrome-subtle</span>
          <code class="swatch-value">rgba(255,255,255,0.2)</code>
        </div>
      </div>
    </section>

    <section>
      <h2>Traffic Lights</h2>
      <p class="section-desc">macOS window controls.</p>
      <div class="swatches">
        <div class="swatch">
          <div class="swatch-color" style="background: var(--color-light-close)"></div>
          <span class="swatch-name">light-close</span>
          <code class="swatch-value">#ff5f57</code>
        </div>
        <div class="swatch">
          <div class="swatch-color" style="background: var(--color-light-minimize)"></div>
          <span class="swatch-name">light-minimize</span>
          <code class="swatch-value">#ffbd2e</code>
        </div>
        <div class="swatch">
          <div class="swatch-color" style="background: var(--color-light-maximize)"></div>
          <span class="swatch-name">light-maximize</span>
          <code class="swatch-value">#28c840</code>
        </div>
      </div>
    </section>

    <section>
      <h2>Status</h2>
      <p class="section-desc">Site running state indicators.</p>
      <div class="swatches">
        <div class="swatch">
          <div class="swatch-color" style="background: var(--color-status-running)"></div>
          <span class="swatch-name">status-running</span>
          <code class="swatch-value">#069e08</code>
        </div>
        <div class="swatch">
          <div class="swatch-color" style="background: var(--color-status-stopped)"></div>
          <span class="swatch-name">status-stopped</span>
          <code class="swatch-value">#646970</code>
        </div>
      </div>
    </section>

    <section>
      <h2>Surface</h2>
      <p class="section-desc">Main content area backgrounds and borders.</p>
      <div class="swatches">
        <div class="swatch">
          <div class="swatch-color border" style="background: var(--color-surface)"></div>
          <span class="swatch-name">surface</span>
          <code class="swatch-value">#fff</code>
        </div>
        <div class="swatch">
          <div class="swatch-color border" style="background: var(--color-surface-secondary)"></div>
          <span class="swatch-name">surface-secondary</span>
          <code class="swatch-value">#f6f7f7</code>
        </div>
        <div class="swatch">
          <div class="swatch-color border" style="background: var(--color-surface-border)"></div>
          <span class="swatch-name">surface-border</span>
          <code class="swatch-value">#dcdcde</code>
        </div>
      </div>
    </section>

    <section>
      <h2>Text</h2>
      <p class="section-desc">Content typography colors.</p>
      <div class="swatches">
        <div class="swatch">
          <div class="swatch-color" style="background: var(--color-text)"></div>
          <span class="swatch-name">text</span>
          <code class="swatch-value">#1d2327</code>
        </div>
        <div class="swatch">
          <div class="swatch-color" style="background: var(--color-text-secondary)"></div>
          <span class="swatch-name">text-secondary</span>
          <code class="swatch-value">#646970</code>
        </div>
        <div class="swatch">
          <div class="swatch-color" style="background: var(--color-text-muted)"></div>
          <span class="swatch-name">text-muted</span>
          <code class="swatch-value">#a7aaad</code>
        </div>
      </div>
    </section>

    <section>
      <h2>Interactive</h2>
      <p class="section-desc">Primary actions and links.</p>
      <div class="swatches">
        <div class="swatch">
          <div class="swatch-color" style="background: var(--color-primary)"></div>
          <span class="swatch-name">primary</span>
          <code class="swatch-value">#3858e9</code>
        </div>
        <div class="swatch">
          <div class="swatch-color" style="background: var(--color-primary-hover)"></div>
          <span class="swatch-name">primary-hover</span>
          <code class="swatch-value">#2a46ce</code>
        </div>
        <div class="swatch">
          <div class="swatch-color border" style="background: var(--color-primary-text)"></div>
          <span class="swatch-name">primary-text</span>
          <code class="swatch-value">#fff</code>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.ds {
  max-width: 960px;
  margin: 0 auto;
  padding: 48px 32px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  color: var(--color-text);
}

h1 {
  font-size: 32px;
  font-weight: 400;
  margin-bottom: 40px;
}

section {
  margin-bottom: 48px;
}

h2 {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 4px;
}

.section-desc {
  font-size: 13px;
  color: var(--color-text-secondary);
  margin-bottom: 20px;
}

.swatches {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 16px;
}

.swatch {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.swatch-color {
  width: 100%;
  height: 64px;
  border-radius: 8px;
}

.swatch-color.border {
  border: 1px solid var(--color-surface-border);
}

.swatch-name {
  font-size: 13px;
  font-weight: 500;
  color: var(--color-text);
}

.swatch-value {
  font-size: 11px;
  color: var(--color-text-secondary);
  font-family: 'SF Mono', 'Fira Code', monospace;
  background: var(--color-surface-secondary);
  padding: 2px 6px;
  border-radius: 3px;
  width: fit-content;
}
</style>
