import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Image } from 'react-native';

import { Actions } from '../reducers/wiki';

import { Container, Text, Progress, Separator } from './ui';
import { downloadWiki } from '../utils/loaders';

const texts = {
  FRESH: 'Because this is the first time you launch the app, additional files need to be downloaded (eg: images, hero/ item descriptions).',
  MISSING: 'Some wiki data on your device seems to be missing. Please wait while the app re-downloads the data.',
  UPDATE: 'Downloading new wiki database.'
}

@connect(
  state => ({
    wiki: state.wiki,
  }), 
  dispatch => ({
    actions: bindActionCreators(Actions, dispatch),
  })
)
export default class DownloadData extends React.PureComponent {
  state = {
    progressData: 0,
    progressPictures: 0,
  }

  async componentDidMount() {
    
    this.setState({ progressData:100 });
    const data = await downloadWiki();

    const { heroes } = data;
    const step = 100/heroes.length;

    await Promise.all(heroes.map(async hero => {
      await Image.prefetch(hero.img_small);
      this.setState({ progressPictures: Math.round((this.state.progressPictures+step)*100)/100 })
    }))
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    //this.setState({ progressPictures:100 });
    this.props.actions.newWiki(data);
  }
  render() {
    const { downloadingReason } = this.props.wiki;

    return (
      <Container padTop padInner>

        <Text>{ texts[downloadingReason] }</Text>

        <Separator />

        <Progress label={`Downloading hero data files`} 
          progress={this.state.progressData} />

        <Separator />

        <Progress label={`Downloading images`} 
          progress={this.state.progressPictures} />
        
      </Container>
    )
  }
}