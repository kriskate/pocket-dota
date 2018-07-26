import React from 'react';
import { Image, Platform, StatusBar } from 'react-native';

import { Container, Text, Progress, Separator } from '../components/ui';
import { loadProfileStateFromStorage } from '../utils/loaders';
import Logger from '../utils/Logger';
import { downloadNewWikiData } from '../utils/wiki';

export default class AppDownloading extends React.PureComponent {
  state = {
    progress_wiki: 0,
    progress_images: 0,
  }

  async componentDidMount() {
    Logger.debug('mounted AppDownloading');
    Platform.OS === 'ios' && StatusBar.setNetworkActivityIndicatorVisible(true);

    // to-do: find a solution to download json with progress (react-native-fetch-blob - not supported by expo)
    const profile = await loadProfileStateFromStorage();
    const wiki = await downloadNewWikiData();
    this.setState({ progress_wiki: 1 });

    const { heroes } = wiki;
    const step = 1/heroes.length;

    await Promise.all(heroes.map(async hero => {
      await Image.prefetch(hero.img_small);
      if(this.state.progress_images < 1) 
        this.setState({ progress_images: this.state.progress_images + step })
    }))
    // await new Promise(resolve => setTimeout(resolve, 3000));
    
    Platform.OS === 'ios' && StatusBar.setNetworkActivityIndicatorVisible(false);

    this.props.onFinish({ wiki, profile });
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

        <Progress label={`Downloading images`} 
          progress={this.state.progress_images} />
        
      </Container>
    )
  }
}