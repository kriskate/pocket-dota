import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
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
    this.setState({ progressPictures:100 });

    const data = await downloadWiki();

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