import React from 'react';
import { FlatList } from 'react-native';
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
        <FlatList
          initialNumToRender={5}
          keyExtractor={(item) => item}
          data={Object.keys(patch_notes).reverse()}
          renderItem={({item}) => (
            <Patch patch={item} patch_content={patch_notes[item]}
              navigate={navigate}
            />
          )}
        />
      </Container>
    );
  }
}
