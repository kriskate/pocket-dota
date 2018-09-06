import React from 'react';
import { Image, Platform, StatusBar, StyleSheet, View } from 'react-native';

import { Text, Progress, Separator } from '../components/ui';
import { downloadImages, downloadWiki } from '../utils/downloaders';
import Colors from '../constants/Colors';
import { assets } from '../constants/Data';
import { DOWNLOAD_REASONS } from '../constants/Constants';

export default class AppDownloading extends React.PureComponent {
  state = {
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
    //await downloadImages(wiki, p => this._progress('images', p));
    
    Platform.OS === 'ios' && StatusBar.setNetworkActivityIndicatorVisible(false);

    onFinish(wiki);
  }
  
  render() {
    const { reason, version } = this.props;

    return (
      <View style={styles.content}>
        
        <Image resizeMode='contain' style={styles.logo}
          source={ assets.app.logoRed } 
        />

        <Text style={styles.reason}>{reason}</Text>
        { reason == DOWNLOAD_REASONS.UPDATE && <Text style={styles.reason}>Updating to version: {version}</Text>}

        <Separator />

        <Progress label={`Downloading hero data files`} 
          progress={this.state.progress_wiki} />

        <Separator />

        <Progress label={`Caching images`} 
          progress={this.state.progress_images} />
        
      </View>
    )
  }
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: 25,
    justifyContent: 'center',
    paddingBottom: 75,
    backgroundColor: Colors.dota_ui2,
  },
  reason: {
    color: Colors.dota_agi,
  },
  logo: {
    flex: 1,
    alignSelf: 'stretch',
    width: undefined,
    height: undefined
  },

})