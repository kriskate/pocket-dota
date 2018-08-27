import React from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native';

import ListScreen from '../ListScreen';
import { ITEM_CONSTANTS, SCREEN_LABELS_HIDDEN } from '../../constants/Constants';
import { model_itembuild, model_section } from '../../constants/Models';
import { url } from '../../constants/Data';
import Layout from '../../constants/Layout';

const skip_items = ['']
@connect(state => ({
  game_items: state.wiki.items
}))
export default class ItemBuild extends React.Component {
  render() {
    const item_builds = model_itembuild(this.props.item_builds);
    const itemSections = [];
    const { game_items } = this.props;

    Object.keys(item_builds).forEach(moment => {
      if(!item_builds[moment] || item_builds[moment].length == 0) return;

      const section = new model_section({ title: ITEM_CONSTANTS.BUILDS[moment], });
      itemSections.push(section);
      
      //!data-point - add try catch
      item_builds[moment].forEach(npc_tag => {
        if(npc_tag == 'item_dagon_5') npc_tag = 'item_dagon';
        const item = game_items.find(({ tag }) => tag == npc_tag.replace('item_', ''));
        section.data.push(item);
      });
    });
    
    // layoutWidth deductions from Card.marginHorizontal and Card.paddingHorizontal
    return (
      <ListScreen layoutWidth={Layout.window.width - 3*Layout.padding_regular - 2}
        hasSections
        itemList={itemSections}
        imageAspectRatio={88/64}
        navTo={SCREEN_LABELS_HIDDEN.ITEM}
        keyExtractor={(item, index) => item.tag+index}
        imageExtractor={item => url.images.items(item.tag)}
        labelExtractor={item => item.name}
        costExtractor={item => item.cost}
      />
    )
  }
}


const styles = StyleSheet.create({

})