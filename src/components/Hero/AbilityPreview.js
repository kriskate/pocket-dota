import React, { Children } from 'react';

import { View, Image, StyleSheet, WebView } from 'react-native';
import { url } from '../../constants/Data';
import { Text } from '../ui';
import { model_ability } from '../../constants/Models';
import HTML from 'react-native-render-html';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';


const _html = (text) => `<span style="color:${Colors.dota_red_dark};">${text}</span>`


export default class AbilityPreview extends React.PureComponent {
  _alterNodeDark = (node) => {
    if(node.name == 'font' && node.attribs && node.attribs.color) {
      node.attribs = { style: `color:${node.attribs.color};`};
      return node;
    }
  }
  
  render() {
    const ability = model_ability(this.props.ability);
    const { 
      affects, attrib, cmb, 
      description, lore, name, notes, 
      HasScepterUpgrade, IsGrantedByScepter
    } = ability;
    
    return (
      <View style={styles.container}>
        <HTML containerStyle={styles.html} alterNode={this._alterNodeDark} html={_html(description)}/>
        <HTML containerStyle={styles.html} alterNode={this._alterNodeDark} html={_html(attrib)}/>
        <HTML containerStyle={styles.html} alterNode={this._alterNodeDark} html={_html(notes)}/>
        <HTML containerStyle={styles.html} alterNode={this._alterNodeDark} html={_html(cmb)}/>
        <HTML containerStyle={styles.html} alterNode={this._alterNodeDark} html={_html(lore)}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: Layout.padding_regular,
  },
  html: {
    flex: 1,
    backgroundColor: Colors.dota_ui2,
    flexDirection: 'row',
    padding: Layout.padding_small,
  }

})