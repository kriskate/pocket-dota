import { Dimensions } from 'react-native';

const width = () => Dimensions.get('window').width;
const height = () => Dimensions.get('window').height;

export default {
  window: {
    width: width(),
    height: height(),
  },
  isSmallDevice: width() < 375,

  paddingSmall: 10,

  padding_regular: 10,
};
