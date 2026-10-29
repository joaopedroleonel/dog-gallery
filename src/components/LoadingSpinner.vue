<template>
  <div class="spinner" role="status" aria-label="Carregando"></div>
</template>

<style scoped>
.spinner {
  width: 48px;
  height: 48px;
  border: 5px solid rgba(245, 158, 11, 0.25);
  border-top-color: var(--color-primary);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
