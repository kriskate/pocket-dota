import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { withNamespaces } from 'react-i18next';

import { Image, Button, Progress, Text } from '../components/ui';
import { downloadImages, downloadWiki } from '../utils/downloaders';
import Colors from '../constants/Colors';
import { assets } from '../constants/Data';

import Styles from '../constants/Styles';
import Layout from '../constants/Layout';

@withNamespaces(["Components", "Alerts"])
export default class WikiDownloading extends React.PureComponent {
  state = {
    progress_wiki: 0,
    progress_images: 0,

    images_consent: false,

    wiki: null,
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
    this._downloadWiki();
  }
  _downloadWiki = async () => {
    const { versionInfo } = this.props;
    Platform.OS === 'ios' && StatusBar.setNetworkActivityIndicatorVisible(true);

    const wiki = await downloadWiki(versionInfo, p => this._progress('wiki', p));
    
    Platform.OS === 'ios' && StatusBar.setNetworkActivityIndicatorVisible(false);

    this.setState({ wiki });
  }
  _consentImages = () => {
    this.setState({ images_consent: true });

    this._downloadImages();
  }
  _downloadImages = async () => {
    const { wiki } = this.state;
    const { onFinish } = this.props;

    Platform.OS === 'ios' && StatusBar.setNetworkActivityIndicatorVisible(true);

    try {
      await downloadImages(wiki, p => this._progress('images', p));
    } catch(e) {}

    Platform.OS === 'ios' && StatusBar.setNetworkActivityIndicatorVisible(false);

    onFinish(wiki);
  }
  
  render() {
    const { reason, version, onFinish, t } = this.props;
    const { progress_wiki, progress_images, images_consent, wiki } = this.state;

    return (
      <View style={styles.container}>
        <View style={Styles.modal_downloading_body}>
        
          <View style={styles.wrapper}>
            <Image resizeMode='contain' style={styles.logo}
              source={ assets.app.logoRed } 
            />
          </View>

          { !wiki ? null : 
            <Text style={styles.reason}>{t("WikiDownloading.UPDATE_DONE")}
              <Text style={Styles.text_highlight_gold}> {version}</Text>
            </Text>
          }
          { !wiki ?

          <View style={styles.wrapper}>
            <Progress label={t("WikiDownloading.PROGRESS_DATA")} 
              progress={progress_wiki} />
          
            <View style={styles.wrapper}>
              <Text style={styles.reason}>{t("WikiDownloading.PROGRESS_UPDATE_VERSION")}
                <Text style={Styles.text_highlight_gold}> {version}</Text>
              </Text>
              <Text>{reason}</Text>
            </View>
          </View>
          
          :

          <View style={styles.wrapper}>
            { images_consent ? 
          
            <Progress label={t("WikiDownloading.PROGRESS_IMAGES")} 
              progress={progress_images} />
            :
            <View>
              <Text>{t("WikiDownloading.CONSENT_PRECACHE_IMAGES")}</Text>
              <Text style={styles.mb}>(~8MB)</Text>
            </View>
          }
          </View>
        }


      </View>
        {
          wiki && !images_consent ?
          <View style={styles.footer}>
            <Button prestyled style={Styles.modal_downloading_close_button}
              title={t("Alerts:BUTTON_Yes")} titleStyle={{ textAlign: 'center' }}
              onPress={this._consentImages} />
            <Button prestyled style={Styles.modal_downloading_close_button}
              title={t("Alerts:BUTTON_No")} titleStyle={{ textAlign: 'center' }}
              onPress={() => onFinish(wiki)} />
          </View>
          : null
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.dota_ui2,
  },
  wrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },

  logo: {
    flex: 1,
    alignSelf: 'stretch',
    width: undefined,
    height: undefined
  },

  mb: {
    textAlign: 'center',
    color: Colors.disabled,
  },
  
  
  reason: {
    color: Colors.dota_agi,
    marginBottom: Layout.padding_big,
  },

})