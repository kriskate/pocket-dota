import React from 'react';
import { Image, Platform, StatusBar, StyleSheet, View } from 'react-native';

import { Text, Progress, Separator } from '../components/ui';
import { downloadImages, downloadWiki } from '../utils/downloaders';
import Colors from '../constants/Colors';
import { assets } from '../constants/Data';

export default class AppDownloading extends React.PureComponent {
  state = {
    progress_wiki: 0,
    progress_images: 0,
  }

  _progress = (key, value) => {
    this.setState({ [`progress_${key}`]: value });
  }
  async componentDidMount() {
    Platform.OS === 'ios' && StatusBar.setNetworkActivityIndicatorVisible(true);

    const wiki = await downloadWiki(p => this._progress('wiki', p));
    await downloadImages(wiki, p => this._progress('images', p));
    
    Platform.OS === 'ios' && StatusBar.setNetworkActivityIndicatorVisible(false);

    this.props.onFinish(wiki);
  }
  
  render() {
    const { reason } = this.props;

    return (
      <View style={styles.content}>
        
        <Image resizeMode='contain' style={styles.logo}
          source={ assets.app.logoRed } 
        />

        <Text style={styles.reason}>{reason}</Text>

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