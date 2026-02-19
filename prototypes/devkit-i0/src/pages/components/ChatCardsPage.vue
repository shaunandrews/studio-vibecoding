<script setup lang="ts">
import { ref } from 'vue'
import ChatCard from '@/components/composites/chat-cards/ChatCard.vue'
import PluginCard from '@/components/composites/chat-cards/PluginCard.vue'
import ColorPaletteCard from '@/components/composites/chat-cards/ColorPaletteCard.vue'
import SettingsCard from '@/components/composites/chat-cards/SettingsCard.vue'
import ProgressCard from '@/components/composites/chat-cards/ProgressCard.vue'
import ThemePickerCard from '@/components/composites/chat-cards/ThemePickerCard.vue'
import PageCard from '@/components/composites/chat-cards/PageCard.vue'
import PostDraftCard from '@/components/composites/chat-cards/PostDraftCard.vue'
import DesignBriefPickerCard from '@/components/composites/chat-cards/DesignBriefPickerCard.vue'
import MarkdownText from '@/components/composites/renderers/MarkdownText.vue'
import Text from '@/components/primitives/Text.vue'
import type { PluginCardData, ColorPaletteData, SettingsCardData, ProgressCardData, ThemePickerCardData, PageCardData, PostDraftCardData, DesignBriefPickerCardData, CardUiState } from '@/data/types'
import '@/pages/components/components-docs.css'

const pluginAvailable: PluginCardData = {
  name: 'WooCommerce',
  slug: 'woocommerce/woocommerce.php',
  description: 'An open-source eCommerce plugin for WordPress. Build any commerce solution you can imagine.',
  rating: 4.5,
  activeInstalls: '5M+',
  status: 'available',
  action: { id: 'install-woo', label: 'Install', action: { type: 'send-message', message: 'Install WooCommerce' } },
}

const pluginActive: PluginCardData = {
  name: 'Jetpack',
  slug: 'jetpack/jetpack.php',
  description: 'Security, performance, marketing, and design tools — Jetpack is made by the WordPress experts.',
  rating: 3.9,
  activeInstalls: '5M+',
  status: 'active',
}

const pluginInstalled: PluginCardData = {
  name: 'Akismet Anti-spam',
  slug: 'akismet/akismet.php',
  description: 'Used by millions, Akismet is quite possibly the best way in the world to protect your blog from spam.',
  rating: 4.7,
  activeInstalls: '5M+',
  status: 'installed',
}

const colorPalette: ColorPaletteData = {
  label: 'Brand Colors',
  colors: [
    { name: 'Primary', hex: '#3858E9', usage: 'Buttons, links' },
    { name: 'Surface', hex: '#F6F7F7', usage: 'Backgrounds' },
    { name: 'Accent', hex: '#C32283', usage: 'Highlights' },
    { name: 'Text', hex: '#1E1E1E', usage: 'Body copy' },
  ],
  action: { id: 'apply-palette', label: 'Apply palette', variant: 'primary', action: { type: 'send-message', message: 'Apply brand colors' } },
}

const settingsData: SettingsCardData = {
  label: 'PHP Configuration',
  settings: [
    { key: 'memory_limit', current: '128M', proposed: '256M' },
    { key: 'max_execution_time', current: '30', proposed: '120' },
    { key: 'upload_max_filesize', current: '2M', proposed: '64M' },
  ],
  actions: [
    { id: 'apply-settings', label: 'Apply changes', variant: 'primary', action: { type: 'send-message', message: 'Apply PHP settings' } },
    { id: 'cancel-settings', label: 'Cancel', variant: 'secondary', action: { type: 'send-message', message: 'Cancel settings change' } },
  ],
}

const progressData: ProgressCardData = {
  label: 'Site Migration',
  steps: [
    { name: 'Export database', status: 'done' },
    { name: 'Transfer media files', status: 'done' },
    { name: 'Update site URLs', status: 'running' },
    { name: 'Verify permalinks', status: 'pending' },
    { name: 'Clear cache', status: 'pending' },
  ],
}

const themePickerData: ThemePickerCardData = {
  themes: [
    { name: 'Twenty Twenty-Five', slug: 'twentytwentyfive', description: 'The latest default theme with flexible block patterns.' },
    { name: 'Flavor', slug: 'flavor', description: 'A warm editorial theme with rich color options.' },
    { name: 'Suspended', slug: 'suspended', description: 'A bold, modern theme with dramatic spacing.' },
  ],
  actions: [
    { id: 'apply-flavor', label: 'Apply Flavor', variant: 'primary', action: { type: 'send-message', message: 'Apply Flavor' } },
  ],
}

const pageData: PageCardData = {
  title: 'About Us',
  slug: 'about',
  template: 'Full Width',
  status: 'draft',
  excerpt: 'Learn about our story, our team, and our passion for great coffee and community.',
  actions: [
    { id: 'view-page', label: 'View', variant: 'secondary', action: { type: 'send-message', message: 'View About page' } },
    { id: 'edit-page', label: 'Edit', variant: 'secondary', action: { type: 'send-message', message: 'Edit About page' } },
    { id: 'delete-page', label: 'Delete', variant: 'destructive', action: { type: 'send-message', message: 'Delete About page' } },
  ],
}

const pagePublished: PageCardData = {
  title: 'Contact',
  slug: 'contact',
  template: 'Default',
  status: 'published',
}

const postDraftData: PostDraftCardData = {
  title: 'Welcome to Downstreet Cafe — We\'re Open!',
  excerpt: 'After months of preparation, Downstreet Cafe is officially open for business. Stop by for handcrafted espresso drinks and fresh pastries.',
  categories: ['Announcements', 'News'],
  tags: ['grand opening', 'coffee', 'downtown'],
  status: 'draft',
  actions: [
    { id: 'edit-post', label: 'Edit', variant: 'secondary', action: { type: 'send-message', message: 'Edit post' } },
    { id: 'publish-post', label: 'Publish', variant: 'primary', action: { type: 'send-message', message: 'Publish post' } },
  ],
}

const postPublishedData: PostDraftCardData = {
  title: 'Our Favorite Summer Drinks',
  excerpt: 'Beat the heat with our refreshing lineup of iced lattes, cold brews, and fruit smoothies.',
  categories: ['Menu'],
  tags: ['summer', 'drinks'],
  status: 'published',
}

const designBriefPickerData: DesignBriefPickerCardData = {
  briefs: [
    {
      siteName: 'Downstreet Cafe',
      styleName: 'Warm Editorial',
      direction: 'Inviting editorial warmth with serif headings and a muted earthy palette. Paper-like backgrounds with sage green accents evoke a handcrafted, community-rooted feel.',
      fonts: ['Playfair Display', 'Source Sans Pro'],
      colors: [
        { name: 'color-bg', value: '#faf9f7' },
        { name: 'color-text', value: '#2d3748' },
        { name: 'color-primary', value: '#8fa382' },
        { name: 'color-secondary', value: '#68725a' },
        { name: 'color-accent', value: '#c4a265' },
      ],
      bgColor: '#faf9f7',
      textColor: '#2d3748',
      accentColor: '#8fa382',
    },
    {
      siteName: 'Downstreet Cafe',
      styleName: 'Dark Roast',
      direction: 'Rich, moody atmosphere with dark backgrounds and warm amber highlights. Bold sans-serif headings against deep espresso tones. Feels like a late-night jazz cafe.',
      fonts: ['DM Sans', 'Inter'],
      colors: [
        { name: 'color-bg', value: '#1a1512' },
        { name: 'color-text', value: '#f5f0eb' },
        { name: 'color-primary', value: '#d4a24e' },
        { name: 'color-secondary', value: '#8b7355' },
        { name: 'color-accent', value: '#e63946' },
      ],
      bgColor: '#1a1512',
      textColor: '#f5f0eb',
      accentColor: '#d4a24e',
    },
    {
      siteName: 'Downstreet Cafe',
      styleName: 'Punch',
      direction: 'Saturated and playful with bold colors and geometric energy. Chunky type and high-contrast blocks give it a modern poster vibe that pops off the screen.',
      fonts: ['Space Grotesk', 'IBM Plex Sans'],
      colors: [
        { name: 'color-bg', value: '#f0fdf4' },
        { name: 'color-text', value: '#1a2e1a' },
        { name: 'color-primary', value: '#16a34a' },
        { name: 'color-secondary', value: '#7c3aed' },
        { name: 'color-accent', value: '#f59e0b' },
      ],
      bgColor: '#f0fdf4',
      textColor: '#1a2e1a',
      accentColor: '#16a34a',
    },
  ],
}

const cardStates: CardUiState[] = ['default', 'loading', 'complete', 'error', 'disabled']
</script>

<template>
  <!-- ChatCard -->
  <section id="chat-card">
    <h2>ChatCard</h2>
    <p class="section-desc">Wrapper component providing consistent card chrome for all chat card types. Manages visual state (border color, opacity) and compact mode padding.</p>

    <div class="props-table">
      <h3>Props</h3>
      <table>
        <thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td><code>compact</code></td><td><code>boolean</code></td><td><code>false</code></td><td>Reduces padding for inline use</td></tr>
          <tr><td><code>state</code></td><td><code>CardUiState</code></td><td><code>'default'</code></td><td>Visual state: <code>'default' | 'loading' | 'complete' | 'error' | 'disabled'</code></td></tr>
        </tbody>
      </table>
      <h3>Slots</h3>
      <table>
        <thead><tr><th>Slot</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td><code>default</code></td><td>Card content</td></tr>
        </tbody>
      </table>
    </div>

    <h3>All states</h3>
    <div class="example-section">
      <div class="vstack gap-s">
        <div v-for="s in cardStates" :key="s">
          <Text variant="caption" color="muted" style="margin-bottom: 4px; display: block;">{{ s }}</Text>
          <ChatCard :state="s">
            <Text color="secondary">Card content in <strong>{{ s }}</strong> state</Text>
          </ChatCard>
        </div>
      </div>
    </div>

    <h3>Compact</h3>
    <div class="example-section">
      <ChatCard :compact="true">
        <Text color="secondary">Compact card with reduced padding</Text>
      </ChatCard>
    </div>
  </section>

  <!-- PluginCard -->
  <section id="plugin-card">
    <h2>PluginCard</h2>
    <p class="section-desc">Displays a WordPress plugin with name, slug, description, status badge, ratings, install count, and an optional action button.</p>

    <div class="props-table">
      <h3>Props</h3>
      <table>
        <thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td><code>data</code></td><td><code>PluginCardData</code></td><td>—</td><td>Plugin info: <code>name</code>, <code>slug</code>, <code>description</code>, <code>status</code>, <code>rating?</code>, <code>activeInstalls?</code>, <code>action?</code></td></tr>
          <tr><td><code>state</code></td><td><code>CardUiState</code></td><td><code>'default'</code></td><td>Visual state</td></tr>
        </tbody>
      </table>
      <h3>Events</h3>
      <table>
        <thead><tr><th>Event</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td><code>action</code></td><td>Emitted when the action button is clicked, with the <code>ActionButton</code> payload</td></tr>
        </tbody>
      </table>
    </div>

    <h3>Available plugin (with action)</h3>
    <div class="example-section">
      <PluginCard :data="pluginAvailable" />
    </div>

    <h3>Active plugin</h3>
    <div class="example-section">
      <PluginCard :data="pluginActive" />
    </div>

    <h3>Installed plugin</h3>
    <div class="example-section">
      <PluginCard :data="pluginInstalled" />
    </div>
  </section>

  <!-- ColorPaletteCard -->
  <section id="color-palette-card">
    <h2>ColorPaletteCard</h2>
    <p class="section-desc">Displays a color palette with swatches, hex values, and usage labels. Includes an optional action button for applying the palette.</p>

    <div class="props-table">
      <h3>Props</h3>
      <table>
        <thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td><code>data</code></td><td><code>ColorPaletteData</code></td><td>—</td><td>Palette info: <code>label</code>, <code>colors[]</code> (name, hex, usage), <code>action?</code></td></tr>
          <tr><td><code>compact</code></td><td><code>boolean</code></td><td><code>false</code></td><td>Hides hex and usage text</td></tr>
          <tr><td><code>state</code></td><td><code>CardUiState</code></td><td><code>'default'</code></td><td>Visual state</td></tr>
        </tbody>
      </table>
      <h3>Events</h3>
      <table>
        <thead><tr><th>Event</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td><code>action</code></td><td>Emitted when the action button is clicked</td></tr>
        </tbody>
      </table>
    </div>

    <h3>Full palette with action</h3>
    <div class="example-section">
      <ColorPaletteCard :data="colorPalette" />
    </div>

    <h3>Compact</h3>
    <div class="example-section">
      <ColorPaletteCard :data="colorPalette" :compact="true" />
    </div>
  </section>

  <!-- SettingsCard -->
  <section id="settings-card">
    <h2>SettingsCard</h2>
    <p class="section-desc">Displays a comparison of current → proposed settings values, with optional action buttons to apply or cancel changes.</p>

    <div class="props-table">
      <h3>Props</h3>
      <table>
        <thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td><code>data</code></td><td><code>SettingsCardData</code></td><td>—</td><td>Settings info: <code>label</code>, <code>settings[]</code> (key, current, proposed), <code>actions?</code></td></tr>
          <tr><td><code>compact</code></td><td><code>boolean</code></td><td><code>false</code></td><td>Compact mode</td></tr>
          <tr><td><code>state</code></td><td><code>CardUiState</code></td><td><code>'default'</code></td><td>Visual state</td></tr>
        </tbody>
      </table>
      <h3>Events</h3>
      <table>
        <thead><tr><th>Event</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td><code>action</code></td><td>Emitted when an action button is clicked</td></tr>
        </tbody>
      </table>
    </div>

    <h3>Settings with actions</h3>
    <div class="example-section">
      <SettingsCard :data="settingsData" />
    </div>
  </section>

  <!-- ProgressCard -->
  <section id="progress-card">
    <h2>ProgressCard</h2>
    <p class="section-desc">Displays a multi-step progress list with status indicators for each step: done, running, pending, or error.</p>

    <div class="props-table">
      <h3>Props</h3>
      <table>
        <thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td><code>data</code></td><td><code>ProgressCardData</code></td><td>—</td><td>Progress info: <code>label</code>, <code>steps[]</code> (name, status: 'pending' | 'running' | 'done' | 'error')</td></tr>
          <tr><td><code>compact</code></td><td><code>boolean</code></td><td><code>false</code></td><td>Compact mode</td></tr>
          <tr><td><code>state</code></td><td><code>CardUiState</code></td><td><code>'default'</code></td><td>Visual state</td></tr>
        </tbody>
      </table>
    </div>

    <h3>Migration progress</h3>
    <div class="example-section">
      <ProgressCard :data="progressData" />
    </div>

    <h3>Loading state</h3>
    <div class="example-section">
      <ProgressCard :data="progressData" state="loading" />
    </div>
  </section>

  <!-- ThemePickerCard -->
  <section id="theme-picker-card">
    <h2>ThemePickerCard</h2>
    <p class="section-desc">Displays a grid of WordPress theme options with placeholder thumbnails, names, and descriptions. Supports action buttons for applying themes.</p>

    <div class="props-table">
      <h3>Props</h3>
      <table>
        <thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td><code>data</code></td><td><code>ThemePickerCardData</code></td><td>—</td><td>Theme list: <code>themes[]</code> (name, slug, description, thumbnail?), <code>actions?</code></td></tr>
          <tr><td><code>compact</code></td><td><code>boolean</code></td><td><code>false</code></td><td>Single-column layout, hides descriptions</td></tr>
          <tr><td><code>state</code></td><td><code>CardUiState</code></td><td><code>'default'</code></td><td>Visual state</td></tr>
        </tbody>
      </table>
      <h3>Events</h3>
      <table>
        <thead><tr><th>Event</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td><code>action</code></td><td>Emitted when an action button is clicked</td></tr>
        </tbody>
      </table>
    </div>

    <h3>Theme grid with action</h3>
    <div class="example-section">
      <ThemePickerCard :data="themePickerData" />
    </div>

    <h3>Compact mode</h3>
    <div class="example-section">
      <ThemePickerCard :data="themePickerData" :compact="true" />
    </div>
  </section>

  <!-- PageCard -->
  <section id="page-card">
    <h2>PageCard</h2>
    <p class="section-desc">Displays a WordPress page with title, slug, template, status badge, optional excerpt, and action buttons for view/edit/delete.</p>

    <div class="props-table">
      <h3>Props</h3>
      <table>
        <thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td><code>data</code></td><td><code>PageCardData</code></td><td>—</td><td>Page info: <code>title</code>, <code>slug</code>, <code>template?</code>, <code>status</code>, <code>excerpt?</code>, <code>actions?</code></td></tr>
          <tr><td><code>state</code></td><td><code>CardUiState</code></td><td><code>'default'</code></td><td>Visual state</td></tr>
        </tbody>
      </table>
      <h3>Events</h3>
      <table>
        <thead><tr><th>Event</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td><code>action</code></td><td>Emitted when an action button is clicked</td></tr>
        </tbody>
      </table>
    </div>

    <h3>Draft page with actions</h3>
    <div class="example-section">
      <PageCard :data="pageData" />
    </div>

    <h3>Published page</h3>
    <div class="example-section">
      <PageCard :data="pagePublished" />
    </div>
  </section>

  <!-- PostDraftCard -->
  <section id="post-draft-card">
    <h2>PostDraftCard</h2>
    <p class="section-desc">Displays a blog post draft with title, excerpt preview, category/tag pills, status badge, and action buttons for editing and publishing.</p>

    <div class="props-table">
      <h3>Props</h3>
      <table>
        <thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td><code>data</code></td><td><code>PostDraftCardData</code></td><td>—</td><td>Post info: <code>title</code>, <code>excerpt</code>, <code>categories?</code>, <code>tags?</code>, <code>status</code>, <code>actions?</code></td></tr>
          <tr><td><code>compact</code></td><td><code>boolean</code></td><td><code>false</code></td><td>Title + status only</td></tr>
          <tr><td><code>state</code></td><td><code>CardUiState</code></td><td><code>'default'</code></td><td>Visual state</td></tr>
        </tbody>
      </table>
      <h3>Events</h3>
      <table>
        <thead><tr><th>Event</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td><code>action</code></td><td>Emitted when an action button is clicked</td></tr>
        </tbody>
      </table>
    </div>

    <h3>Draft post with actions</h3>
    <div class="example-section">
      <PostDraftCard :data="postDraftData" />
    </div>

    <h3>Published post</h3>
    <div class="example-section">
      <PostDraftCard :data="postPublishedData" state="complete" />
    </div>

    <h3>Compact mode</h3>
    <div class="example-section">
      <PostDraftCard :data="postDraftData" :compact="true" />
    </div>
  </section>

  <!-- DesignBriefPickerCard -->
  <section id="design-brief-picker-card">
    <h2>DesignBriefPickerCard</h2>
    <p class="section-desc">Displays a horizontal row of design brief options, each showing a style name, site name rendered in the brief's heading font, and color swatches. Used during onboarding to let the user pick a visual direction for their site.</p>

    <div class="props-table">
      <h3>Props</h3>
      <table>
        <thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td><code>data</code></td><td><code>DesignBriefPickerCardData</code></td><td>&mdash;</td><td>Picker data: <code>briefs[]</code> (each with <code>siteName</code>, <code>styleName</code>, <code>direction</code>, <code>fonts</code>, <code>colors</code>, <code>bgColor</code>, <code>textColor</code>, <code>accentColor</code>), <code>actions?</code></td></tr>
          <tr><td><code>compact</code></td><td><code>boolean</code></td><td><code>false</code></td><td>Compact mode</td></tr>
          <tr><td><code>state</code></td><td><code>CardUiState</code></td><td><code>'default'</code></td><td>Visual state</td></tr>
        </tbody>
      </table>
    </div>

    <h3>Three briefs</h3>
    <div class="example-section">
      <DesignBriefPickerCard :data="designBriefPickerData" />
    </div>

    <h3>Disabled state</h3>
    <div class="example-section">
      <DesignBriefPickerCard :data="designBriefPickerData" state="disabled" />
    </div>
  </section>

  <!-- MarkdownText -->
  <section id="markdown-text">
    <h2>MarkdownText</h2>
    <p class="section-desc">Lightweight Markdown renderer that converts text with bold, italic, inline code, links, lists, and fenced code blocks into HTML. Used inside ChatMessage for agent responses.</p>

    <div class="props-table">
      <h3>Props</h3>
      <table>
        <thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td><code>text</code></td><td><code>string</code></td><td>—</td><td>Markdown source text</td></tr>
        </tbody>
      </table>
    </div>

    <h3>Inline formatting</h3>
    <div class="example-section">
      <MarkdownText text="This has **bold text**, *italic text*, and `inline code` in a paragraph." />
    </div>

    <h3>Links</h3>
    <div class="example-section">
      <MarkdownText text="Check out the [WordPress Developer Resources](https://developer.wordpress.org) for more info." />
    </div>

    <h3>Unordered list</h3>
    <div class="example-section">
      <MarkdownText text="Here are the changes I made:

- Updated the hero section background
- Increased heading font size to 48px
- Added a call-to-action button
- Adjusted mobile responsive breakpoints" />
    </div>

    <h3>Ordered list</h3>
    <div class="example-section">
      <MarkdownText text="To set up your development environment:

1. Install Node.js 18 or later
2. Clone the repository
3. Run `npm install` to install dependencies
4. Start the dev server with `npm run dev`" />
    </div>

    <h3>Fenced code block</h3>
    <div class="example-section">
      <MarkdownText :text="`Here's the updated CSS:\n\n\`\`\`css\n.hero-section {\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  padding: 4rem 2rem;\n  text-align: center;\n}\n\`\`\`\n\nThis adds a purple gradient background to the hero.`" />
    </div>
  </section>
</template>
