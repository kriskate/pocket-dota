import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';

import { Image, Button, Progress, Text } from '../components/ui';
import { downloadImages, downloadWiki } from '../utils/downloaders';
import Colors from '../constants/Colors';
import { assets } from '../constants/Data';

import Styles from '../constants/Styles';
import Layout from '../constants/Layout';


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
    const { reason, version, onFinish } = this.props;
    const { progress_wiki, progress_images, images_consent, wiki } = this.state;

    return (
      <View style={styles.container}>
      <View style={Styles.modal_downloading_body}>
        
        <View style={styles.wrapper}>
          <Image resizeMode='contain' style={styles.logo}
            source={ assets.app.logoRed } 
          />
        </View>

        { !wiki ?

          <View style={styles.wrapper}>
            <Progress label={`Downloading hero data files`} 
              progress={progress_wiki} />
          
            <View style={styles.wrapper}>
              <Text style={styles.reason}>Updating to version:
                <Text style={Styles.text_highlight_gold}> {version}</Text>
              </Text>
              <Text>{reason}</Text>
            </View>
          </View>
          
          :
          
          images_consent ?

          <View style={styles.wrapper}>
          <Text style={styles.reason}>Done updating wiki to version <Text style={Styles.text_highlight_gold}>{version}</Text></Text>
            <Progress label={`Caching images`} 
              progress={progress_images} />
          </View>

          :

          <View style={styles.wrapper}>
            <Text style={styles.reason}>Done updating wiki to version <Text style={Styles.text_highlight_gold}>{version}</Text></Text>
            <Text>
{`Would you like to pre-cache the heroes and items images?
This will ensure that you get the best experience while using Pocket Dota, by not having to wait for the images to load later on.`}
            </Text>
            <Text style={styles.mb}>(~8MB)</Text>
          </View>
        }


      </View>
        {
          wiki && !images_consent ?
          <View style={styles.footer}>
            <Button prestyled style={Styles.modal_downloading_close_button}
              title="No (close this dialog)" titleStyle={{ textAlign: 'center' }}
              onPress={() => onFinish(wiki)} />
            <Button prestyled style={Styles.modal_downloading_close_button}
              title="Ok" titleStyle={{ textAlign: 'center' }}
              onPress={this._consentImages} />
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
    // padding: 25,
    // paddingVertical: 50,
    justifyContent: 'center',
    backgroundColor: Colors.dota_ui2,
  },
  textDone: {
    fontWeight: 'bold',
    color: Colors.dota_agi,
    marginBottom: Layout.padding_big * 3,
  },
  mb: {
    textAlign: 'center',
    color: Colors.disabled,
  },
  logo: {
    flex: 1,
    alignSelf: 'stretch',
    width: undefined,
    height: undefined
  },

  wrapper: {
    flex: 1,
    justifyContent: 'center',
    // borderColor: 'blue',
    // borderWidth: 1,
  },
  footer: {
    justifyContent: 'flex-end',
  },
  
  reason: {
    color: Colors.dota_agi,
    marginBottom: Layout.padding_big,
  },

})