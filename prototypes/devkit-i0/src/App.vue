<script setup lang="ts">
import { computed, onMounted, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
import MainLayout from '@/layouts/MainLayout.vue'
import CommandPalette from '@/components/features/CommandPalette.vue'
import { useCommandPalette } from '@/data/useCommandPalette'

const route = useRoute()
const layoutName = computed(() => (route.meta.layout as string) || 'main')

const { toggle } = useCommandPalette()

function onKeyDown(e: KeyboardEvent) {
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault()
    toggle()
  }
}

onMounted(() => document.addEventListener('keydown', onKeyDown))
onBeforeUnmount(() => document.removeEventListener('keydown', onKeyDown))
</script>

<template>
  <MainLayout v-if="layoutName === 'main'" />
  <router-view v-else />
  <CommandPalette />
</template>
