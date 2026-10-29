<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import DogGrid from '@/components/DogGrid.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import { getAllBreeds, getBreedImages } from '@/services/dogApi'

const PAGE_SIZE = 24

const route = useRoute()
const router = useRouter()

const selectedBreed = ref(route.query.raca ?? '')
const selectedSubBreed = ref(route.query.sub ?? '')

const breeds = ref([])
const breedsLoading = ref(false)
const breedsError = ref('')

const images = ref([])
const imagesLoading = ref(false)
const imagesError = ref('')
const visibleCount = ref(PAGE_SIZE)

const subBreeds = computed(
  () => breeds.value.find((breed) => breed.name === selectedBreed.value)?.subBreeds ?? [],
)
const visibleImages = computed(() => images.value.slice(0, visibleCount.value))
const remaining = computed(() => images.value.length - visibleCount.value)

function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1)
}

async function loadBreeds() {
  breedsLoading.value = true
  breedsError.value = ''

  try {
    breeds.value = await getAllBreeds()
  } catch (err) {
    breedsError.value = err.message
  } finally {
    breedsLoading.value = false
  }
}

let lastRequestId = 0

async function loadImages() {
  const requestId = ++lastRequestId
  images.value = []
  visibleCount.value = PAGE_SIZE
  imagesError.value = ''

  if (!selectedBreed.value) return

  imagesLoading.value = true

  try {
    const result = await getBreedImages(selectedBreed.value, selectedSubBreed.value)
    if (requestId === lastRequestId) images.value = result
  } catch (err) {
    if (requestId === lastRequestId) imagesError.value = err.message
  } finally {
    if (requestId === lastRequestId) imagesLoading.value = false
  }
}

watch(selectedBreed, () => {
  selectedSubBreed.value = ''
})

watch(
  [selectedBreed, selectedSubBreed],
  ([breed, subBreed]) => {
    const query = {}
    if (breed) query.raca = breed
    if (subBreed) query.sub = subBreed
    router.replace({ query })

    loadImages()
  },
  { immediate: true },
)

onMounted(loadBreeds)
</script>

<template>
  <section class="gallery">
    <h2 class="title">Galeria</h2>

    <LoadingSpinner v-if="breedsLoading" class="centered" />

    <div v-else-if="breedsError" class="state">
      <p class="error">{{ breedsError }}</p>
      <button type="button" class="button" @click="loadBreeds">Tentar novamente</button>
    </div>

    <template v-else>
      <div class="filters">
        <label class="field">
          Raça
          <select v-model="selectedBreed" class="select">
            <option value="">Selecione uma raça</option>
            <option v-for="breed in breeds" :key="breed.name" :value="breed.name">
              {{ capitalize(breed.name) }}
            </option>
          </select>
        </label>

        <label v-if="subBreeds.length" class="field">
          Sub-raça
          <select v-model="selectedSubBreed" class="select">
            <option value="">Todas</option>
            <option v-for="sub in subBreeds" :key="sub" :value="sub">
              {{ capitalize(sub) }}
            </option>
          </select>
        </label>

        <p v-if="images.length" class="count">{{ images.length }} fotos</p>
      </div>

      <p v-if="!selectedBreed" class="state">Escolha uma raça para ver as fotos.</p>

      <LoadingSpinner v-else-if="imagesLoading" class="centered" />

      <div v-else-if="imagesError" class="state">
        <p class="error">{{ imagesError }}</p>
        <button type="button" class="button" @click="loadImages">Tentar novamente</button>
      </div>

      <template v-else>
        <DogGrid :urls="visibleImages" />

        <div v-if="remaining > 0" class="more">
          <button type="button" class="button" @click="visibleCount += PAGE_SIZE">
            Carregar mais ({{ remaining }} restantes)
          </button>
        </div>
      </template>
    </template>
  </section>
</template>

<style scoped>
.gallery {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.title {
  font-size: 1.75rem;
  font-weight: 700;
}

.filters {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  gap: 16px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 0.875rem;
  color: var(--color-text-muted);
}

.select {
  min-width: 200px;
  padding: 8px 12px;
  border: 1px solid #d6d3d1;
  border-radius: 10px;
  font: inherit;
  font-size: 1rem;
  color: var(--color-text);
  background: var(--color-surface);
}

.select:focus {
  outline: 2px solid var(--color-primary);
  outline-offset: 1px;
}

.count {
  margin-left: auto;
  color: var(--color-text-muted);
}

.state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 48px 0;
  color: var(--color-text-muted);
}

.error {
  color: var(--color-error);
}

.centered {
  margin: 48px auto;
}

.more {
  text-align: center;
}

.button {
  padding: 10px 20px;
  border: none;
  border-radius: 999px;
  font-weight: 600;
  color: #fff;
  background: var(--color-primary);
}

.button:hover {
  background: var(--color-primary-hover);
}
</style>
