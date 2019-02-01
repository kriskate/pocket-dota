import React from 'react';
import { Image, Platform, StatusBar, StyleSheet, View } from 'react-native';

import { Text, Progress } from '../components/ui';
import { downloadImages, downloadWiki } from '../utils/downloaders';
import Colors from '../constants/Colors';
import { assets } from '../constants/Data';
import { DOWNLOAD_REASONS } from '../constants/Constants';
import Styles from '../constants/Styles';
import Layout from '../constants/Layout';

export default class WikiDownloading extends React.PureComponent {
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
    if(this.props.reason !== DOWNLOAD_REASONS.UPDATE)
      await downloadImages(wiki, p => this._progress('images', p));
    
    Platform.OS === 'ios' && StatusBar.setNetworkActivityIndicatorVisible(false);

    onFinish(wiki);
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

          { reason == DOWNLOAD_REASONS.UPDATE ? null : 
          <Progress label={`Caching images`} 
            progress={this.state.progress_images} />
          }
        </View>

        <View style={styles.wrapper}>
          { reason == DOWNLOAD_REASONS.UPDATE && 
            <Text style={styles.reason}>Updating to version:
              <Text style={Styles.text_highlight_gold}> {version}</Text>
            </Text>
          }
          <Text>{reason}</Text>
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
  
  reason: {
    color: Colors.dota_agi,
    marginBottom: Layout.padding_big,
  },

})