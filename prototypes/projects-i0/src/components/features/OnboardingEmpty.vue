<script setup lang="ts">
import Text from '@shared/primitives/Text.vue'
import Button from '@/components/primitives/Button.vue'

withDefaults(defineProps<{
  title?: string
  description?: string
  actionLabel?: string
}>(), {
  title: 'Welcome to Studio',
  description: 'Create your first site to get started.',
  actionLabel: 'Create a site',
})

defineEmits<{
  'action': []
}>()
</script>

<template>
  <div class="onboarding-empty vstack align-center justify-center gap-s flex-1">
    <Text variant="body-large" weight="medium" color="inherit">{{ title }}</Text>
    <Text variant="body" color="muted">{{ description }}</Text>
    <Button variant="primary" :label="actionLabel" @click="$emit('action')" />
  </div>
</template>

<style scoped>
.onboarding-empty {
  text-align: center;
  padding: var(--space-xxl);
}
</style>
