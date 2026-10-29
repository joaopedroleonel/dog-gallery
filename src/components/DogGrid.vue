<script setup>
import CopyImageButton from '@/components/CopyImageButton.vue'

defineProps({
  urls: { type: Array, required: true },
})
</script>

<template>
  <ul class="grid">
    <li v-for="url in urls" :key="url" class="card">
      <img :src="url" alt="Foto de um cachorro" loading="lazy" class="image" />
      <CopyImageButton :url="url" label="Copiar" class="card-copy" />
    </li>
  </ul>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 16px;
  padding: 0;
  list-style: none;
}

.card {
  position: relative;
  overflow: hidden;
  aspect-ratio: 1;
  border-radius: var(--radius);
  background: var(--color-surface);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.card:hover .image {
  transform: scale(1.05);
}

.card .card-copy {
  position: absolute;
  right: 8px;
  bottom: 8px;
  padding: 4px 12px;
  font-size: 0.8rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}
</style>
