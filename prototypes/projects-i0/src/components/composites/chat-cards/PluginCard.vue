<script setup lang="ts">
import { ref, computed, watch, nextTick, onMounted, onBeforeUnmount } from 'vue'
import { moreVertical } from '@wordpress/icons'
import Badge from '@/components/primitives/Badge.vue'
import Button from '@/components/primitives/Button.vue'
import WPIcon from '@/components/primitives/WPIcon.vue'
import ChatCard from './ChatCard.vue'
import type { CardUiState, PluginCardData } from '@/data/types'

const props = withDefaults(defineProps<{
  data: PluginCardData
  state?: CardUiState
}>(), {
  state: 'default',
})

const emit = defineEmits<{
  action: [data: PluginCardData]
}>()

const dirSlug = computed(() => props.data.slug.split('/')[0])

const iconUrl = computed(() =>
  props.data.icon || `https://ps.w.org/${dirSlug.value}/assets/icon-256x256.png`
)

const statusLabel = computed(() => {
  const map: Record<PluginCardData['status'], string> = {
    available: 'Available',
    installing: 'Installing',
    installed: 'Installed',
    active: 'Active',
    error: 'Error',
  }
  return map[props.data.status]
})

const statusVariant = computed(() => {
  if (props.data.status === 'active' || props.data.status === 'installed') return 'success'
  if (props.data.status === 'installing') return 'warning'
  if (props.data.status === 'error') return 'error'
  return 'default'
})

// Overflow menu
interface MenuItem {
  label: string
  destructive?: boolean
}

const menuOpen = ref(false)
const menuTriggerRef = ref<HTMLElement | null>(null)
const menuDropdownRef = ref<HTMLElement | null>(null)
const menuStyle = ref<Record<string, string>>({})

const menuItems = computed<MenuItem[]>(() => {
  const items: MenuItem[] = [
    { label: 'View plugin page' },
  ]
  const s = props.data.status
  if (s === 'available') {
    items.push({ label: 'Install' })
  } else if (s === 'installed') {
    items.push({ label: 'Activate' })
    items.push({ label: 'Delete', destructive: true })
  } else if (s === 'active') {
    items.push({ label: 'Deactivate' })
    items.push({ label: 'Delete', destructive: true })
  } else if (s === 'error') {
    items.push({ label: 'Retry' })
    items.push({ label: 'Delete', destructive: true })
  }
  return items
})

function positionMenu() {
  const trigger = menuTriggerRef.value
  const menu = menuDropdownRef.value
  if (!trigger || !menu) return

  const rect = trigger.getBoundingClientRect()
  const menuRect = menu.getBoundingClientRect()
  const vw = window.innerWidth
  const gap = 4

  const style: Record<string, string> = {
    position: 'fixed',
    top: `${rect.bottom + gap}px`,
  }

  // Right-align to trigger by default, shift if needed
  let left = rect.right - menuRect.width
  if (left < 8) left = 8
  if (left + menuRect.width > vw - 8) left = vw - 8 - menuRect.width
  style.left = `${left}px`

  menuStyle.value = style
}

watch(menuOpen, (val) => {
  if (val) nextTick(() => { positionMenu(); nextTick(positionMenu) })
})

function toggleMenu() {
  menuOpen.value = !menuOpen.value
}

function selectItem(_item: MenuItem) {
  menuOpen.value = false
}

function onClickOutside(e: MouseEvent) {
  const target = e.target as Node
  if (menuTriggerRef.value && !menuTriggerRef.value.contains(target) && !menuDropdownRef.value?.contains(target)) {
    menuOpen.value = false
  }
}

function onScrollOrResize() {
  if (menuOpen.value) positionMenu()
}

onMounted(() => {
  document.addEventListener('click', onClickOutside)
  window.addEventListener('scroll', onScrollOrResize, true)
  window.addEventListener('resize', onScrollOrResize)
})
onBeforeUnmount(() => {
  document.removeEventListener('click', onClickOutside)
  window.removeEventListener('scroll', onScrollOrResize, true)
  window.removeEventListener('resize', onScrollOrResize)
})
</script>

<template>
  <ChatCard :state="state" title="Plugin">
    <div class="plugin-layout">
      <img
        :src="iconUrl"
        :alt="`${data.name} icon`"
        class="plugin-icon"
        loading="lazy"
      />
      <div class="plugin-content vstack gap-xxxs">
        <div class="hstack gap-xs align-center">
          <strong class="plugin-name">{{ data.name }}</strong>
          <Badge :label="statusLabel" :variant="statusVariant" />
        </div>
        <p class="plugin-description">{{ data.description }}</p>
      </div>
      <Button
        v-if="data.action"
        class="plugin-action"
        :label="data.action.label"
        :variant="data.action.variant || 'primary'"
        size="small"
        @click="emit('action', data)"
      />
      <div class="plugin-menu" ref="menuTriggerRef">
        <button class="plugin-menu-trigger" @click="toggleMenu" aria-label="More options">
          <WPIcon :icon="moreVertical" :size="20" />
        </button>
      </div>
      <Teleport to="body">
        <Transition name="plugin-menu">
          <div v-if="menuOpen" ref="menuDropdownRef" class="plugin-menu-dropdown" :style="menuStyle">
            <button
              v-for="item in menuItems"
              :key="item.label"
              class="plugin-menu-item"
              :class="{ 'plugin-menu-item--destructive': item.destructive }"
              @click="selectItem(item)"
            >
              {{ item.label }}
            </button>
          </div>
        </Transition>
      </Teleport>
    </div>
  </ChatCard>
</template>

<style scoped>
.plugin-layout {
  display: flex;
  align-items: start;
  gap: var(--space-s);
}

.plugin-icon {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-s);
  flex-shrink: 0;
  object-fit: cover;
}

.plugin-content {
  flex: 1;
  min-width: 0;
}

.plugin-name {
  line-height: var(--line-height-tight);
}

.plugin-description {
  color: var(--color-text-secondary);
  font-size: var(--font-size-s);
  line-height: var(--line-height-normal);
}

.plugin-action {
  flex-shrink: 0;
  align-self: center;
}

.plugin-menu {
  flex-shrink: 0;
  align-self: center;
}

.plugin-menu-trigger {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  background: none;
  border: none;
  border-radius: var(--radius-s);
  cursor: pointer;
  color: var(--color-text-muted);
  transition: background var(--duration-instant) var(--ease-default), color var(--duration-instant) var(--ease-default);
}

.plugin-menu-trigger:hover {
  background: var(--color-surface-secondary);
  color: var(--color-text);
}
</style>

<!-- Teleported menu styles (unscoped) -->
<style>
.plugin-menu-dropdown {
  width: max-content;
  min-width: 160px;
  background: var(--color-surface);
  border: 1px solid var(--color-surface-border);
  border-radius: var(--radius-m);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 9999;
  padding: var(--space-xxxs);
}

.plugin-menu-item {
  display: block;
  width: 100%;
  padding: var(--space-xs) var(--space-s);
  background: none;
  border: none;
  border-radius: var(--radius-s);
  cursor: pointer;
  font-family: inherit;
  font-size: var(--font-size-s);
  color: var(--color-text);
  text-align: start;
  transition: background var(--duration-instant) var(--ease-default);
}

.plugin-menu-item:hover {
  background: var(--color-surface-secondary);
}

.plugin-menu-item--destructive {
  color: #d63638;
}

.plugin-menu-enter-active,
.plugin-menu-leave-active {
  transition: opacity var(--duration-instant) var(--ease-default), transform var(--duration-instant) var(--ease-default);
}

.plugin-menu-enter-from,
.plugin-menu-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
