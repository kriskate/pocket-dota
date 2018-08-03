import React from 'react';
import { Image, Platform, StatusBar } from 'react-native';

import { Container, Text, Progress, Separator } from '../components/ui';
import Logger from '../utils/Logger';
import { downloadImages, downloadWiki } from '../utils/downloaders';

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
      <Container padTop padInner>

        <Text>{reason}</Text>

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