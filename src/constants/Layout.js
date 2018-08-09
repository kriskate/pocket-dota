import { Dimensions } from 'react-native';

const width = () => Dimensions.get('window').width;
const height = () => Dimensions.get('window').height;

export default {
  window: {
    width: width(),
    height: height(),
  },
  isSmallDevice: width() < 375,

  padding_small: 5,

  padding_regular: 10,
};
