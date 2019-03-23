import React from 'react';
import { StyleSheet, View } from 'react-native';
import Colors from '../../constants/Colors';
import LanguageSelector from './LanguageSelector';
import Logo from './Logo';


export default InitialLanguageSelector = () => ((
  <View style={styles.container}>
    <View style={styles.logoWrapper}>
      <Logo fillBackground={true} />
    </View>
    <LanguageSelector isInitial />
  </View>
));

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0, bottom: 0, 
    left: 0, right: 0,
    backgroundColor: Colors.dota_ui1_light,
  },

  logoWrapper: {
    flex: 1,
    borderWidth: 1,
    borderBottomColor: Colors.dota_ui2,
  },
})