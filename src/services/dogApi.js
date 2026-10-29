const BASE_URL = 'https://dog.ceo/api'

async function request(path) {
  try {
    const response = await fetch(`${BASE_URL}${path}`)
    const data = await response.json()

    if (data.status !== 'success') throw new Error()

    return data.message
  } catch {
    throw new Error('Não foi possível carregar os dados. Tente novamente.')
  }
}

export function getRandomImage() {
  return request('/breeds/image/random')
}

export async function getAllBreeds() {
  const breeds = await request('/breeds/list/all')
  return Object.entries(breeds).map(([name, subBreeds]) => ({ name, subBreeds }))
}

export function getBreedImages(breed, subBreed = '') {
  const path = subBreed ? `${breed}/${subBreed}` : breed
  return request(`/breed/${path}/images`)
}
