async function toPngBlob(url) {
  const response = await fetch(url)
  const bitmap = await createImageBitmap(await response.blob())

  const canvas = document.createElement('canvas')
  canvas.width = bitmap.width
  canvas.height = bitmap.height
  canvas.getContext('2d').drawImage(bitmap, 0, 0)

  return new Promise((resolve) => canvas.toBlob(resolve, 'image/png'))
}

export async function copyImageToClipboard(url) {
  if (!window.ClipboardItem) {
    await navigator.clipboard.writeText(url)
    return
  }

  await navigator.clipboard.write([new ClipboardItem({ 'image/png': toPngBlob(url) })])
}
