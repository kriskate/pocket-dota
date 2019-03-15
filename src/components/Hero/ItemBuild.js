import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet } from 'react-native';

import ListScreen from '../ListScreen';
import { SCREEN_LABELS_HIDDEN } from '../../constants/Constants';
import { model_itembuild, model_section } from '../../constants/Models';
import { url } from '../../constants/Data';
import Layout from '../../constants/Layout';
import Logger from '../../utils/Logger';
import { withNamespaces } from 'react-i18next';

const rename_items = {
  "item_iron_talon": "deprecated",
  "item_poor_mans_shield": "deprecated",

  "item_ghost_scepter": "item_ghost",
  "item_hand_midas": "item_hand_of_midas",
  "item_manta_style": "item_manta",
  "item_moonshard": "item_moon_shard",
  "item_desolater": "item_desolator",
  "item_item_desolator": "item_desolator",
  "item_dagon_5": "item_dagon",
  "item_necronomicon_1": "item_necronomicon",
  "item_necronomicon_3": "item_necronomicon",
  "item_necromonicon_3": "item_necronomicon",
  "item_refresher_orb": "item_refresher",
  "item_shadow_blade": "item_invis_sword",
  "item_veil_of_dicord": "item_veil_of_discord",
  "item_blood_stone": "item_bloodstone",
  "item_eye_of_skadi": "item_skadi",
  "item_assault_cuirass": "item_assault",
  "item_crimson_time": "item_crimson_guard",
  "item_spherer": "item_sphere",
  "item_shivas": "item_shivas_guard",
  "item_battle_fury": "item_bfury",
  
  "item_mango": "enchanted_mango",
  "item_branch": "item_branches",
  "item_ward_courier": "item_ward_sentry",
  
  "item_boots_of_speed": "item_boots",
  "item_travel_boots_": "item_travel_boots",
  "item_travel_boots_1": "item_travel_boots",
  "item_travel_boots_2": "item_travel_boots",
  "item_boots_of_travel_1": "item_travel_boots",

  "item_diffusal_blade_2": "item_diffusal_blade",
  "item_diffusal_2": "item_diffusal_blade",
}


@withNamespaces("Screen_Hero")
@connect(state => ({
  game_items: state.wiki.wikiData.items
}))
export default class ItemBuild extends React.Component {
  render() {
    const item_builds = model_itembuild(this.props.item_builds);
    const itemSections = [];
    const { game_items, hero_tag, t } = this.props;

    Object.keys(item_builds).forEach(moment => {
      if(!item_builds[moment] || item_builds[moment].length == 0) return;

      const section = model_section({ title: t(moment), });
      itemSections.push(section);
      
      //!data-point - add try catch
      item_builds[moment].forEach(npc_tag => {
        if(rename_items[npc_tag]) npc_tag = rename_items[npc_tag];
        if(npc_tag == 'deprecated') return;

        const item = game_items.find(({ tag }) => tag == npc_tag.replace('item_', ''));
        if(!item) Logger.debug(`could not find item ${hero_tag}: ${npc_tag}`);
        else section.data.push(item);
      });
    });
    
    // layoutWidth deductions from Card.marginHorizontal and Card.paddingHorizontal
    return (
      <ListScreen layoutWidth={Layout.window.width - 3*Layout.padding_regular - 4}
        overlayed
        hasSections
        noBorder
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