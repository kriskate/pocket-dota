import React from 'react';
import { Container, Text } from '../components/ui';

import { headerStyle } from '../utils/screen';
import { model_item, model_item_npc, model_item_bonuses } from '../constants/Models';
import { Image, StyleSheet, View } from 'react-native';
import RenderHTML from 'react-native-render-html';

import { assets, url } from '../constants/Data';
import Layout from '../constants/Layout';
import Colors from '../constants/Colors';
import { trimAbilities, parseCategory } from '../utils/utils';

const removeSpace = (str) => str.replace(/\+ \<span/g, '+<span')
const removeH1 = (str) => str.replace(/\<h1/g, `<span style="color:${Colors.dota_radiant};font-weight:bold;"`)
      .replace(/\/h1/g, '/span')
const alterHtml = (str) => trimAbilities(removeSpace(removeH1(str)))

const alterNode = (node) => {
  if(node.name == 'font' && node.attribs && node.attribs.color) {
    const color = node.attribs.color == '#bdc3c7' ? Colors.goldenrod : node.attribs.color;
    node.attribs = { style: `color:${color};`};
    return node;
  }
}
const classesStyles = {
  attribVal: { color: Colors.goldenrod, margin: Layout.padding_big, },
  attribValText: { textAlign: 'right', padding: 15 },
}
class HTML extends React.PureComponent {
  render() {
    const { htmlContent, style } = this.props;
    let trimmedHtml = alterHtml(htmlContent);

    return !trimmedHtml ? null : (
      <RenderHTML containerStyle={[styles.html, style]}
      alterData={({parent, data}) => 
        parent && parent.name === 'span' && data + ' '
      }
      alterNode={alterNode}
      classesStyles={classesStyles}
      html={
        `<span style="color:${Colors.dota_white};">${trimmedHtml}</span>`
      }/>
    )
  }
}


export default class ItemScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { category, name } = navigation.getParam('item');
    const _cat = parseCategory(category);
    const color = Colors.items[_cat];
    
    return {
      title: navigation.getParam('item').name,
      ...headerStyle,
      headerTitleStyle: {
        color,
      },
    }
  };

  render() {
    const item = model_item(this.props.navigation.getParam('item'));

    const { 
      tag,
      name, description, notes, lore,
      cost, mc, cd, attrib,
      category, components,
    } = item;
    const npc = model_item_npc(item.npc);
    const bonuses = model_item_bonuses(item.bonuses);

    const _category = parseCategory(category);

    return (
      <Container padInner scrollable>


        <View style={styles.rowImage}>

          <View style={styles.loreAndImage}>
            <Text style={styles.lore}>{lore}</Text>
            <Image style={styles.image} source={{ uri: url.images.items(tag) }} />
          </View>

          <View style={styles.props}>
            <Prop text={mc}>
              <Image source={assets.game.mana} />
            </Prop>
            <Prop text={cd}>
              <Image source={assets.game.cooldown} />
            </Prop>
            <View style={styles.cost}>
              <Text style={styles.costText}>Cost: </Text>
              <Image source={assets.game.gold} />
              <Text style={styles.costText}> {cost}</Text>
            </View>
          </View>
        </View>


        <View style={styles.category}>
          <Text>Item category: </Text>
          <Text style={[styles.textHighlight, {color: Colors.items[_category]} ]}>
            {category}
          </Text>
        </View>

        
        <HTML htmlContent={attrib} style={styles.attrib} />


        <HTML htmlContent={description} style={styles.description} />
        

        { !notes ? null :
          <View style={styles.notes}>
            <HTML htmlContent={notes.trim()} />
          </View>
        }


        { !components ? null : <Text>{components.join(', ')}}</Text> }
      </Container>
    );
  }
}

const Prop = ({ children, style, text, }) => !text ? null : (
  <View style={[styles.cdm, style]}>
    {children}
    { !text ? null : <Text style={styles.cdmText}> {text} </Text> }
  </View>
)

const styles = StyleSheet.create({
  rowImage: {
    padding: Layout.padding_regular,
    backgroundColor: Colors.dota_ui1,
  },
  lore: {
    backgroundColor: Colors.dota_red_darker,
    padding: Layout.padding_regular,
    color: Colors.dota_white,
    minHeight: 64,
    marginRight: Layout.padding_regular,
    flex: 1,
  },
  loreAndImage: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  image: {
    width: 88,
    height: 64,
  },


  props: {
    marginTop: Layout.padding_regular,
    padding: Layout.padding_small,
    flexDirection: 'row',
  },
  cdm: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cdmText: {
    color: Colors.dota_white,
  },
  cost: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
    right: 0,
  },
  costText: {
    color: Colors.gold,
  },

  description: {
    backgroundColor: Colors.dota_ui1,
  },
  attrib: {

  },
  notes: {
    backgroundColor: Colors.dota_ui1,
  },

  category: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: Layout.padding_small,
    flexDirection: 'row',
  },

  textHighlight: {
    fontWeight: 'bold',
  },


  html: {
    marginVertical: 5,
    flexDirection: 'row',
    padding: Layout.padding_small,
  },
})