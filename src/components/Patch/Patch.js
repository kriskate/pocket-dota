import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from '../ui';

import { model_patch_notes, } from '../../constants/Models';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';

import PatchShort from './PatchShort';
import { SCREEN_LABELS_HIDDEN } from '../../constants/Constants';


export default class Patch extends React.Component {
  state = {
    open: false,
  }

  openPatch = () => {
    this.props.navigate(SCREEN_LABELS_HIDDEN.PATCH, { tag: this.props.patch });
  }
  render () {
    const { patch, patch_content, } = this.props;
    const { version_date, changes_short, } = model_patch_notes(patch_content);

    return (
      <View key={patch} style={styles.patch}>
        <View style={styles.title}>
          <Text>{patch}</Text> 
          <Text>Release date: {new Date(version_date).toLocaleDateString() || version_date})</Text>
        </View>

        <PatchShort changes_short={changes_short} />

        <Button prestyled titleStyle={styles.button_more_title}
          title={'view game changes'} onPress={this.openPatch} />
      </View>
    )
  }
}


const styles = StyleSheet.create({
  patch: {
    padding: Layout.padding_small,
    borderBottomWidth: 1,
    borderBottomColor: Colors.disabled,
  },
  title: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Layout.padding_regular,
    borderBottomWidth: 1,
    borderBottomColor: Colors.disabled,
  },
  button_more_title: {
    textAlign: 'center',
  }
})