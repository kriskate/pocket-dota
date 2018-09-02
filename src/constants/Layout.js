import { Dimensions } from 'react-native';
import Colors from './Colors';

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
  
  padding_big: 15,

  modal_body: {
    flex: 1,
    backgroundColor: Colors.dota_ui1,
    borderRadius: 3,

    // marginHorizontal: 5,
    // marginVertical: 25,
    padding: 10,
  },
  modal_header: {
    marginTop: 5,
    marginBottom: 15,
    fontSize: 15,
    textAlign: 'center',
    color: Colors.dota_int,
  },
  modal_close_button: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: -5,
    borderWidth: 1,
    borderColor: Colors.dota_ui2,
  },
};
