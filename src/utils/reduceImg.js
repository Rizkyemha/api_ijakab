const { Image } = require('image-js')

async function reduceImageSize(base64Data) {
  try {
    const img = await Image.load(base64Data)
    const reducedImg = await img.resize({ width: 800 })
    const reducedBase64 = reducedImg.toBase64('image/jpeg')

    return 'data:image/jpeg;base64,' + reducedBase64
  } catch (error) {
    console.error('Error reducing image size:', error)
    return []
  }
}

module.exports = { reduceImageSize }
module.reduceImageSize = reduceImageSize
