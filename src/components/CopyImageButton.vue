<script setup>
import { computed, onUnmounted, ref } from 'vue'
import { copyImageToClipboard } from '@/utils/copyImage'

const props = defineProps({
  url: { type: String, required: true },
  label: { type: String, default: 'Copiar imagem' },
})

const status = ref('idle')
let resetTimer = null

const text = computed(() => {
  if (status.value === 'copying') return 'Copiando...'
  if (status.value === 'copied') return 'Copiada!'
  if (status.value === 'error') return 'Erro ao copiar'
  return props.label
})

async function copy() {
  status.value = 'copying'

  try {
    await copyImageToClipboard(props.url)
    status.value = 'copied'
  } catch {
    status.value = 'error'
  }

  clearTimeout(resetTimer)
  resetTimer = setTimeout(() => (status.value = 'idle'), 2000)
}

onUnmounted(() => clearTimeout(resetTimer))
</script>

<template>
  <button
    type="button"
    class="copy-button"
    :class="status"
    :disabled="status === 'copying'"
    aria-live="polite"
    @click="copy"
  >
    {{ text }}
  </button>
</template>

<style scoped>
.copy-button {
  padding: 10px 20px;
  border: 2px solid var(--color-primary);
  border-radius: 999px;
  font-weight: 600;
  color: var(--color-primary-hover);
  background: var(--color-surface);
  transition:
    background 0.2s,
    color 0.2s,
    border-color 0.2s;
}

.copy-button:hover:not(:disabled) {
  background: #fef3c7;
}

.copy-button:disabled {
  cursor: wait;
}

.copy-button.copied {
  border-color: #16a34a;
  color: #fff;
  background: #16a34a;
}

.copy-button.error {
  border-color: var(--color-error);
  color: #fff;
  background: var(--color-error);
}
</style>
