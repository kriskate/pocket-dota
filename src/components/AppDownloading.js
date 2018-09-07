import React from 'react';

import { Image, View, ActivityIndicator, StyleSheet } from 'react-native';
import { Text, } from './ui';

import Styles from '../constants/Styles';
import Layout from '../constants/Layout';
import Colors from '../constants/Colors';
import { assets } from '../constants/Data';
import { Updates } from 'expo';

export default class AppDownloading extends React.PureComponent {
  async componentDidMount() {
    await Updates.fetchUpdateAsync();

    this.props.onFinish();
  }
  render() {
    const { downloadingApp_version } = this.props;

    return (
      <View style={Styles.modal_downloading_body}>


        <View style={styles.wrapper}>
          <Image resizeMode='contain' style={styles.logo}
            source={ assets.app.logoRed } 
          />
        </View>

        <View style={styles.wrapper}>
          <ActivityIndicator size='large' color={Colors.goldenrod} />
        </View>
        
        <View style={styles.wrapper}>
          <Text style={styles.dld}>Downloading new app version: 
            <Text style={Styles.text_highlight_gold}> {downloadingApp_version}</Text>
          </Text>

          <Text>When the update is done, the application will restart.</Text>
        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  logo: {
    flex: 1,
    alignSelf: 'stretch',
    width: undefined,
    height: undefined
  },

  wrapper: {
    flex: 1,
    justifyContent: 'center',
  },

  dld: {
    color: Colors.dota_agi,
    marginBottom: Layout.padding_big,
  },
})