import React, { Children } from 'react';

import { View, Image, StyleSheet, WebView } from 'react-native';
import { url, assets } from '../../constants/Data';
import { Text } from '../ui';
import { model_ability } from '../../constants/Models';
import RenderHTML from 'react-native-render-html';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';
import { trimAbilities } from '../../utils/utils';


const alterNode = (node) => {
  if(node.name == 'font' && node.attribs && node.attribs.color) {
    const color = node.attribs.color == '#bdc3c7' ? Colors.goldenrod : node.attribs.color;
    node.attribs = { style: `color:${color};`};
    return node;
  }
}
class HTML extends React.PureComponent {
  render() {
    const { htmlContent, style } = this.props;
    let trimmedHtml = trimAbilities(htmlContent);

    return !trimmedHtml ? null : (
      <RenderHTML containerStyle={[styles.html, style]} alterNode={alterNode} html={
        `<span style="color:${Colors.dota_white};">${trimmedHtml}</span>`
      }/>
    )
  }
}

export default class AbilityPreview extends React.PureComponent {
  
  render() {
    const ability = model_ability(this.props.ability);
    const { 
      tag, name, affects, description,
      notes, attrib, cooldown, manacost,
      lore, IsGrantedByScepter, HasScepterUpgrade
    } = ability;
    
    return (
      <View style={styles.container}>
        <HTML htmlContent={affects} />
        <HTML htmlContent={description} style={styles.description} />
        <HTML htmlContent={attrib} />

        <Prop text={manacost}>
          <Image source={assets.game.mana} />
        </Prop>
        <Prop text={cooldown}>
          <Image source={assets.game.cooldown} />
        </Prop>
        
        <HTML htmlContent={notes} style={styles.description} />
        
        <HTML htmlContent={lore} style={styles.lore} />
      </View>
    )
  }
}

const Prop = ({ children, style, text, }) => !text ? null : (
  <View style={[styles.cdm, style]}>
    {children}
    { !text ? null : <Text style={styles.cdmText}> {text} </Text> }
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: Layout.padding_regular,
  },
  description: {
    backgroundColor: Colors.dota_ui3,
  },
  lore: {
    padding: 5,
    backgroundColor: Colors.dota_red_darker,
  },
  html: {
    marginVertical: 5,
    backgroundColor: Colors.dota_ui2,
    flexDirection: 'row',
    padding: Layout.padding_small,
  },


  cdm: {
    padding: Layout.padding_small,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cdmText: {
    color: Colors.dota_white,
  },

})