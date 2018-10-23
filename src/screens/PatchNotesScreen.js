import React from 'react';
import { Container } from '../components/ui';

import { headerStyle } from '../utils/screen';
import { SCREEN_LABELS } from '../constants/Constants';
import { connect } from 'react-redux';
import Patch from '../components/Patch/Patch';


@connect(state => ({
  patch_notes: state.wiki.patch_notes,
}))
export default class PatchNotesScreen extends React.Component {
  static navigationOptions = () => ({
    title: SCREEN_LABELS.PATCH_NOTES,
    ...headerStyle,
  });

  render() {
    const { patch_notes, } = this.props;
    const { navigate } = this.props.navigation;

    return (
      <Container scrollable backToHome>
        { Object.keys(patch_notes).reverse().map(patch => (
          <Patch key={patch} patch={patch} patch_content={patch_notes[patch]}
            navigate={navigate}
          /> 
        )) }
      </Container>
    );
  }
}
