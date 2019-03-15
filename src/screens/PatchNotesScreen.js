import React from 'react';
import { FlatList } from 'react-native';
import { Container } from '../components/ui';

import { headerStyle } from '../utils/screen';
import { connect } from 'react-redux';
import Patch from '../components/Patch/Patch';
import i18next from 'i18next';
import InfiniteScollFlatList from '../components/InfiniteScrollFlatList';


@connect(state => ({
  patch_notes: state.wiki.wikiData.patch_notes,
}))
export default class PatchNotesScreen extends React.Component {
  static navigationOptions = () => ({
    title: i18next.t("Constants:SCREEN_LABELS.PATCH_NOTES"),
    ...headerStyle,
  });

  render() {
    const { patch_notes, } = this.props;
    const { navigate } = this.props.navigation;

    return (
      <Container backToHome>
        <InfiniteScollFlatList
          initialNumToRender={5}
          maxToRenderPerBatch={5}
          updateCellsBatchingPeriod={100}
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
