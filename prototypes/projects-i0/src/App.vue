<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import MainLayout from '@/layouts/MainLayout.vue'
import BareLayout from '@/layouts/BareLayout.vue'

const route = useRoute()

const layouts: Record<string, any> = {
  main: MainLayout,
  bare: BareLayout,
}

const layout = computed(() => {
  const name = (route.meta.layout as string) || 'bare'
  return layouts[name]
})
</script>

<template>
  <component :is="layout">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </component>
</template>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.15s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
