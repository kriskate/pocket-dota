import React from 'react';
import { Container } from '../components/ui';

import { headerStyle } from '../utils/screen';
import { SCREEN_LABELS } from '../constants/Constants';
import { connect } from 'react-redux';
import Patch from '../components/Patch/Patch';


@connect(state => ({
  patch_notes: state.wiki.patch_notes,
  wiki_heroes: state.wiki.heroes,
  wiki_items: state.wiki.items,
}))
export default class PatchNotesScreen extends React.Component {
  static navigationOptions = () => ({
    title: SCREEN_LABELS.PATCH_NOTES,
    ...headerStyle,
  });

  render() {
    const { patch_notes, wiki_heroes, wiki_items } = this.props;

    return (
      <Container scrollable backToHome>
        { Object.keys(patch_notes).map(patch => (
          <Patch key={patch} patch={patch} patch_content={patch_notes[patch]}
            wiki_heroes={wiki_heroes} wiki_items={wiki_items}
          /> 
        )) }
      </Container>
    );
  }
}
