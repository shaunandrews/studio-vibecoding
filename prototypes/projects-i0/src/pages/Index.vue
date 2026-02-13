<template>
  <div class="index">
    <h1>Studio Prototype</h1>
    <ul>
      <li><router-link to="/design-system">Design System</router-link></li>
      <li><router-link to="/app-shell">App Shell</router-link></li>
      <li><router-link to="/components">Components</router-link></li>
      <li><router-link to="/architecture">Architecture</router-link></li>
    </ul>
  </div>
</template>

<style scoped>
.index {
  padding: var(--space-xxl);
  font-family: var(--font-family);
}

h1 {
  font-size: 32px;
  font-weight: 400;
  color: var(--color-text);
  margin-bottom: var(--space-m);
}

ul {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-xxs);
}

a {
  color: var(--color-primary);
  text-decoration: none;
  font-size: 15px;
}
a:hover {
  color: var(--color-primary-hover);
  text-decoration: underline;
}
</style>
