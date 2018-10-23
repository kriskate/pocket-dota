import React from 'react';
import { View, StyleSheet, LayoutAnimation } from 'react-native';

import { model_patch_notes, } from '../../constants/Models';
import Colors from '../../constants/Colors';
import { Text, Button } from '../ui';
import Layout from '../../constants/Layout';
import PatchShort from './PatchShort';
import PatchFull from './PatchFull';
import { animation } from '../../utils/screen';


export default class Patch extends React.Component {
  state = {
    open: false,
  }

  toggleOpen = () => {
    LayoutAnimation.configureNext(animation.standard);

    this.setState({ open: !this.state.open });
  }
  render () {
    const { patch, patch_content, wiki_heroes, wiki_items } = this.props;
    const { version_date, changes_short, heroes, items, general } = model_patch_notes(patch_content);
    const { open } = this.state;

    return (
      <View key={patch} style={styles.patch}>
        <View style={styles.title}>
          <Text>{patch}</Text> 
          <Text>Release date: {new Date(version_date).toLocaleDateString() || version_date})</Text>
        </View>

        <PatchShort changes_short={changes_short} />

        <Button prestyled titleStyle={styles.button_more_title}
          title={open ? 'close' : '...more'} onPress={this.toggleOpen} />
        { !open ? null :
          <PatchFull 
            heroes={heroes} wiki_heroes={wiki_heroes}
            items={items} wiki_items={wiki_items}
            general={general}
          />
        }
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