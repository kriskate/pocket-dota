import React from 'react';
import { Image, Platform, StatusBar, StyleSheet } from 'react-native';

import { Container, Text, Progress, Separator } from '../components/ui';
import { downloadImages, downloadWiki } from '../utils/downloaders';
import Colors from '../constants/Colors';

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

    this.props.onFinish();
  }
  
  render() {
    const { reason } = this.props;

    return (
      <Container padTop padInner style={styles.content}>
        
        <Image resizeMode='contain' style={styles.logo}
          source={ require('../assets/images/logo-red.png') } 
        />

        <Text style={styles.reason}>{reason}</Text>

        <Separator />

        <Progress label={`Downloading hero data files`} 
          progress={this.state.progress_wiki} />

        <Separator />

        <Progress label={`Caching images`} 
          progress={this.state.progress_images} />
        
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: 25,
    justifyContent: 'center',
  },
  reason: {
    color: Colors.dota_,
  },
  logo: {
    flex: 1,
    alignSelf: 'stretch',
    width: undefined,
    height: undefined
  },

})