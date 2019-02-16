import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';

import { Image, Button, Progress, Text } from '../components/ui';
import { downloadImages, downloadWiki } from '../utils/downloaders';
import Colors from '../constants/Colors';
import { assets } from '../constants/Data';

import Styles from '../constants/Styles';
import Layout from '../constants/Layout';

let cancel = false;

export default class WikiDownloading extends React.PureComponent {
  state = {
    show_cancel: false,
    progress_wiki: 0,
    progress_images: 0,
  }

  static defaultProps = {
    reason: '',
    version: '',
    versionInfo: null,
    onFinish: () => {},
  }

  _progress = (key, value) => {
    this.setState({ [`progress_${key}`]: value });
  }
  async componentDidMount() {
    const { versionInfo, onFinish } = this.props;
    Platform.OS === 'ios' && StatusBar.setNetworkActivityIndicatorVisible(true);

    const wiki = await downloadWiki(versionInfo, p => this._progress('wiki', p));
    this.setState({ show_cancel: true });
    await downloadImages(wiki, p => this._progress('images', p), () => cancel);
    
    Platform.OS === 'ios' && StatusBar.setNetworkActivityIndicatorVisible(false);

    if(!cancel) onFinish(wiki);
  }
  _cancelDownload = () => {
    cancel = true;
  }
  
  render() {
    const { reason, version } = this.props;

    return (
      <View style={Styles.modal_downloading_body}>
        
        <View style={styles.wrapper}>
          <Image resizeMode='contain' style={styles.logo}
            source={ assets.app.logoRed } 
          />
        </View>

        <View style={styles.wrapper}>
          <Progress label={`Downloading hero data files`} 
            progress={this.state.progress_wiki} />

          <Progress label={`Caching images`} 
            progress={this.state.progress_images} />
        </View>

        <View style={styles.wrapper}>
          <Text style={styles.reason}>Updating to version:
            <Text style={Styles.text_highlight_gold}> {version}</Text>
          </Text>
          <Text>{reason}</Text>
        </View>

        {/* { !this.state.show_cancel ? null :
          <Button prestyled style={Styles.modal_downloading_close_button}
            title="CANCEL" titleStyle={{ textAlign: 'center' }}
            onPress={this._cancelDownload} />
        } */}
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
  
  reason: {
    color: Colors.dota_agi,
    marginBottom: Layout.padding_big,
  },

})