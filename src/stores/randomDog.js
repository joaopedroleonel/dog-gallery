import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getRandomImage } from '@/services/dogApi'
import { preloadImage } from '@/utils/preloadImage'

export const useRandomDogStore = defineStore('randomDog', () => {
  const imageUrl = ref('')
  const loading = ref(false)
  const error = ref('')

  async function loadRandomDog() {
    loading.value = true
    error.value = ''

    try {
      const url = await getRandomImage()
      imageUrl.value = await preloadImage(url)
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  return { imageUrl, loading, error, loadRandomDog }
})
