<template>
  <div class="ds">
    <h1>Design System</h1>

    <section>
      <h2>Space</h2>
      <p class="section-desc">5px grid. All spacing must use these tokens. No magic numbers.</p>
      <div class="space-list">
        <div class="space-item" v-for="t in [
          { name: 'xxxs', val: '2.5px', units: 0.5 },
          { name: 'xxs', val: '5px', units: 1 },
          { name: 'xs', val: '10px', units: 2 },
          { name: 's', val: '15px', units: 3 },
          { name: 'm', val: '20px', units: 4 },
          { name: 'l', val: '25px', units: 5 },
          { name: 'xl', val: '30px', units: 6 },
          { name: 'xxl', val: '40px', units: 8 },
          { name: 'xxxl', val: '50px', units: 10 },
        ]" :key="t.name">
          <code class="space-token">--space-{{ t.name }}</code>
          <div class="space-bar" :style="{ width: `var(--space-${t.name})` }"></div>
          <span class="space-value">{{ t.val }}</span>
          <span class="space-units">{{ t.units }} {{ t.units === 1 ? 'unit' : 'units' }}</span>
        </div>
      </div>
    </section>

    <section>
      <h2>Border Radius</h2>
      <p class="section-desc">On the 5px grid. Use for consistent rounding across components.</p>
      <div class="radius-list">
        <div class="radius-item" v-for="r in [
          { name: 's', val: '5px', desc: 'Buttons, inputs, tags' },
          { name: 'm', val: '10px', desc: 'Cards, panels, dropdowns' },
          { name: 'l', val: '15px', desc: 'Modals, large containers' },
        ]" :key="r.name">
          <div class="radius-preview" :style="{ borderRadius: `var(--radius-${r.name})` }"></div>
          <div class="radius-info">
            <code>--radius-{{ r.name }}</code>
            <span class="radius-val">{{ r.val }}</span>
            <span class="radius-desc">{{ r.desc }}</span>
          </div>
        </div>
      </div>
    </section>

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
  padding: var(--space-xxxl) var(--space-xl);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  color: var(--color-text);
}

h1 {
  font-size: 32px;
  font-weight: 400;
  margin-block-end: var(--space-xxl);
}

section {
  margin-block-end: var(--space-xxxl);
}

h2 {
  font-size: 18px;
  font-weight: 600;
  margin-block-end: var(--space-xxxs);
}

.section-desc {
  font-size: 13px;
  color: var(--color-text-secondary);
  margin-block-end: var(--space-m);
}

.swatches {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: var(--space-s);
}

.swatch {
  display: flex;
  flex-direction: column;
  gap: var(--space-xxs);
}

.swatch-color {
  width: 100%;
  height: 64px;
  border-radius: var(--radius-m);
}

.swatch-color.border {
  border: 1px solid var(--color-surface-border);
}

.swatch-name {
  font-size: 13px;
  font-weight: 500;
  color: var(--color-text);
}

/* Space */
.space-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-xxs);
}

.space-item {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
}

.space-token {
  font-size: 12px;
  font-family: 'SF Mono', 'Fira Code', monospace;
  color: var(--color-text);
  width: 120px;
  flex-shrink: 0;
}

.space-bar {
  height: 20px;
  background: var(--color-primary);
  border-radius: var(--radius-s);
  opacity: 0.2;
}

.space-value {
  font-size: 12px;
  font-family: 'SF Mono', 'Fira Code', monospace;
  color: var(--color-text-secondary);
  width: 40px;
  flex-shrink: 0;
}

.space-units {
  font-size: 12px;
  color: var(--color-text-muted);
}

/* Radius */
.radius-list {
  display: flex;
  gap: var(--space-l);
}

.radius-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-xs);
}

.radius-preview {
  width: 80px;
  height: 80px;
  background: var(--color-surface-secondary);
  border: 1px solid var(--color-surface-border);
}

.radius-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.radius-info code {
  font-size: 12px;
  font-family: 'SF Mono', 'Fira Code', monospace;
}

.radius-val {
  font-size: 12px;
  font-family: 'SF Mono', 'Fira Code', monospace;
  color: var(--color-text-secondary);
}

.radius-desc {
  font-size: 11px;
  color: var(--color-text-muted);
}

.swatch-value {
  font-size: 11px;
  color: var(--color-text-secondary);
  font-family: 'SF Mono', 'Fira Code', monospace;
  background: var(--color-surface-secondary);
  padding: var(--space-xxxs) var(--space-xxs);
  border-radius: var(--radius-s);
  width: fit-content;
}
</style>
