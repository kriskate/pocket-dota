import { Image } from "react-native";
import { url } from '../constants/Data';

export default () => (
  <Image style={styles.imgHero} source={{ uri: url.images.vert(tag) }} />
)

const styles = StyleSheet.create({
  imgHero: {
    width: 235,
    height: 272,

    borderRadius: 3,
    borderWidth: 3,
    borderColor: Colors.dota_ui2,
  },
})