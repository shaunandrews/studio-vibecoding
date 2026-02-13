<script setup lang="ts">
defineProps<{
  variant?: 'body' | 'body-large' | 'caption' | 'label'
  tag?: string
  color?: 'default' | 'secondary' | 'muted' | 'inherit'
  weight?: 'regular' | 'medium' | 'semibold'
}>()
</script>

<template>
  <component
    :is="tag || 'span'"
    class="text"
    :class="[
      `text--${variant || 'body'}`,
      color ? `text--${color}` : '',
      weight ? `text--${weight}` : '',
    ]"
  >
    <slot />
  </component>
</template>

<style scoped>
.text { margin: 0; }

/* Variants */
.text--body {
  font-size: 14px;
  line-height: 1.4;
}

.text--body-large {
  font-size: 16px;
  line-height: 1.4;
}

.text--caption {
  font-size: 12px;
  line-height: 1.4;
}

.text--label {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  line-height: 1.2;
}

/* Colors */
.text--default { color: var(--color-text); }
.text--secondary { color: var(--color-text-secondary); }
.text--muted { color: var(--color-text-muted); }
.text--inherit { color: inherit; }

/* Weights */
.text--regular { font-weight: 400; }
.text--medium { font-weight: 500; }
.text--semibold { font-weight: 600; }
</style>
