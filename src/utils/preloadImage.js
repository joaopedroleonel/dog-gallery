export function preloadImage(url) {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.onload = () => resolve(url)
    image.onerror = () => reject(new Error('Não foi possível carregar a imagem.'))
    image.src = url
  })
}
