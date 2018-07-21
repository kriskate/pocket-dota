import { Image } from 'react-native'
import { Asset, Font, Icon } from 'expo';

export const cacheImages = (images) => {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image)
    } else {
      return Asset.fromModule(image).downloadAsync()
    }
  })
}

export const loadInitialAssets = async () => {
  const imageAssets = cacheImages([
    // 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
    require('../assets/images/menu-heroes.png'),
    require('../assets/images/menu-items.png'),
    require('../assets/images/menu-stats.png'),
    
  ])

  const fontAssets = Font.loadAsync({
    ...Icon.Ionicons.font,
    'space-mono': require('../assets/fonts/SpaceMono-Regular.ttf'),
    Roboto: require("native-base/Fonts/Roboto.ttf"),
    Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
  })

  await Promise.all([...imageAssets, fontAssets])
}