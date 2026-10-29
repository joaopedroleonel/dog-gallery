<script setup>
import { onMounted } from 'vue'
import CopyImageButton from '@/components/CopyImageButton.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import { useRandomDogStore } from '@/stores/randomDog'

const randomDogStore = useRandomDogStore()

onMounted(() => {
  if (!randomDogStore.imageUrl) randomDogStore.loadRandomDog()
})
</script>

<template>
  <section class="home">
    <p v-if="randomDogStore.error" class="error">{{ randomDogStore.error }}</p>

    <div v-else class="image-wrapper">
      <img
        v-if="randomDogStore.imageUrl"
        :src="randomDogStore.imageUrl"
        alt="Foto aleatória de um cachorro"
        class="dog-image"
        :class="{ dimmed: randomDogStore.loading }"
      />

      <LoadingSpinner v-if="randomDogStore.loading" />
    </div>

    <div class="actions">
      <button
        type="button"
        class="shuffle-button"
        :disabled="randomDogStore.loading"
        @click="randomDogStore.loadRandomDog()"
      >
        {{ randomDogStore.loading ? 'Sorteando...' : 'Sortear foto' }}
      </button>

      <CopyImageButton
        v-if="randomDogStore.imageUrl && !randomDogStore.loading"
        :url="randomDogStore.imageUrl"
      />
    </div>
  </section>
</template>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  min-height: 70vh;
}

.error {
  color: var(--color-error);
}

.image-wrapper {
  display: grid;
  place-items: center;
}

.image-wrapper > * {
  grid-area: 1 / 1;
}

.dog-image {
  max-width: 100%;
  max-height: 65vh;
  object-fit: contain;
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  transition: opacity 0.2s;
}

.dog-image.dimmed {
  opacity: 0.4;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
}

.shuffle-button {
  min-width: 160px;
  padding: 12px 24px;
  border: none;
  border-radius: 999px;
  font-weight: 600;
  color: #fff;
  background: var(--color-primary);
  transition:
    background 0.2s,
    transform 0.1s;
}

.shuffle-button:hover:not(:disabled) {
  background: var(--color-primary-hover);
}

.shuffle-button:active:not(:disabled) {
  transform: scale(0.96);
}

.shuffle-button:disabled {
  opacity: 0.6;
  cursor: wait;
}
</style>
