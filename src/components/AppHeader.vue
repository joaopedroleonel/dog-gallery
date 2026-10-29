<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <header class="header">
    <h1 class="title">🐶 Dog Gallery</h1>

    <nav class="nav">
      <RouterLink :to="{ name: 'home' }" class="link">Início</RouterLink>
      <RouterLink :to="{ name: 'gallery' }" class="link">Galeria</RouterLink>
    </nav>
  </header>
</template>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 16px 24px;
  background: var(--color-surface);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
}

.title {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-primary-hover);
}

.nav {
  display: flex;
  gap: 4px;
}

.link {
  padding: 8px 14px;
  border-radius: 999px;
  font-weight: 500;
  color: var(--color-text);
  text-decoration: none;
  transition: background 0.2s;
}

.link:hover {
  background: var(--color-background);
}

.link.router-link-exact-active {
  color: #fff;
  background: var(--color-primary);
}
</style>
