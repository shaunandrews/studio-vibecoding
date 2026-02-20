<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import MainLayout from '@/layouts/MainLayout.vue'
import CommandPalette from '@/components/features/CommandPalette.vue'

const route = useRoute()
const layoutName = computed(() => (route.meta.layout as string) || 'main')
</script>

<template>
  <MainLayout v-if="layoutName === 'main'" />
  <router-view v-else />
  <CommandPalette />
</template>
