import React from 'react';
import { Image, Platform, StatusBar, StyleSheet, View } from 'react-native';

import { Text, Progress } from '../components/ui';
import { downloadImages, downloadWiki } from '../utils/downloaders';
import Colors from '../constants/Colors';
import { assets } from '../constants/Data';
import Styles from '../constants/Styles';
import Layout from '../constants/Layout';
import { withNamespaces } from 'react-i18next';

@withNamespaces("Components")
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
    const { versionInfo, onFinish, t } = this.props;
    Platform.OS === 'ios' && StatusBar.setNetworkActivityIndicatorVisible(true);

    const wiki = await downloadWiki(versionInfo, p => this._progress('wiki', p));
    if(this.props.reason !== t("DOWNLOAD_REASONS.UPDATE"))
      await downloadImages(wiki, p => this._progress('images', p));
    
    Platform.OS === 'ios' && StatusBar.setNetworkActivityIndicatorVisible(false);

    onFinish(wiki);
  }
  
  render() {
    const { reason, version, t } = this.props;

    return (
      <View style={Styles.modal_downloading_body}>
        
        <View style={styles.wrapper}>
          <Image resizeMode='contain' style={styles.logo}
            source={ assets.app.logoRed } 
          />
        </View>

        <View style={styles.wrapper}>
          <Progress label={t("WikiDownloading.PROGRESS_DATA")} 
            progress={this.state.progress_wiki} />

          { reason == t("DOWNLOAD_REASONS.UPDATE") ? null : 
          <Progress label={t("WikiDownloading.PROGRESS_IMAGES")} 
            progress={this.state.progress_images} />
          }
        </View>

        <View style={styles.wrapper}>
          { reason == t("DOWNLOAD_REASONS.UPDATE") && 
            <Text style={styles.reason}>{t("WikiDownloading.PROGRESS_UPDATE_VERSION")}
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