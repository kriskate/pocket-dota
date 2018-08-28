import React from 'react';
import { Container, Text, Card } from '../components/ui';

import { headerStyle } from '../utils/screen';
import { model_item, model_item_npc, model_item_bonuses } from '../constants/Models';
import { Image, StyleSheet, View } from 'react-native';
import RenderHTML from 'react-native-render-html';

import { assets, url } from '../constants/Data';
import Layout from '../constants/Layout';
import Colors from '../constants/Colors';
import { trimAbilities, parseCategory } from '../utils/utils';
import { ITEM_CONSTANTS } from '../constants/Constants';

const removeSpace = (str) => str.replace(/\+ \<span/g, '+<span')
const removeH1 = (str) => str.replace(/\<h1/g, `<br/><span style="color:${Colors.dota_radiant};font-weight:bold;"`)
      .replace(/\/h1>/g, '/span><br/>')
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


export default class ItemScreen extends React.PureComponent {
  static navigationOptions = ({ navigation }) => {
    const { category, name } = navigation.getParam('data');
    const _cat = parseCategory(category);
    const color = Colors.items[_cat];
    
    return {
      ...headerStyle,
      headerTitle: (
        <View style={{ justifyContent: 'center', alignItems: 'center', }}>
          <Text adjustsFontSizeToFit style={{ fontSize: 17, fontWeight: 'bold', color, textAlign: 'center', }}>
            {name}
          </Text>
        </View>
      ),
    }
  };


  render() {
    const item = model_item(this.props.navigation.getParam('data'));

    const { 
      tag,
      name, description, notes, lore,
      cost, manacost, cooldown, attrib,
      category, components, hasRecipe,
    } = item;
    const npc = model_item_npc(item.npc);
    const { ItemDisassembleRule } = npc;
    const dissasemble = ItemDisassembleRule == ITEM_CONSTANTS.DISSASEMBLE ? "Yes" : "No";
    const bonuses = model_item_bonuses(item.bonuses);

    const _category = parseCategory(category);

    return (
      <Container scrollable>


        <Card style={{ marginHorizontal: 0 }}>
          <View style={styles.loreAndImage}>
            <Text style={styles.lore}>{lore}</Text>
            <Image style={styles.image} source={{ uri: url.images.items(tag) }} />
          </View>
        </Card>


        <Card style={styles.stats}>

          <View style={styles.stat}>
            <Text style={styles.costText}>Cost: </Text>
            <Image source={assets.game.gold} />
            <Text style={styles.costText}> {cost}</Text>
          </View>

          <Prop text={manacost} textStyle={{ color: Colors.dota_int }}>
            <Image source={assets.game.mana} />
          </Prop>
          <Prop text={cooldown} textStyle={{ color: Colors.disabled }}>
            <Image source={assets.game.cooldown} />
          </Prop>

          <View style={styles.stat}>
            <Text>Can be dissasembled: </Text>
            <Text style={{
                  fontWeight: 'bold', color: dissasemble == "Yes" ? Colors.dota_radiant : Colors.dota_dire, 
                }}>
              {dissasemble}
            </Text>
          </View>

          <View style={styles.stat}>
            <Text>Item category: </Text>
            <Text style={[styles.textHighlight, {color: Colors.items[_category]} ]}>
              {category}
            </Text>
          </View>
          <HTML htmlContent={attrib} style={styles.attrib} />
        </Card>

        

        <Card>
          <HTML htmlContent={description} style={styles.description} />
        </Card>
        

        { !notes ? null :
          <View style={styles.notes}>
            <Text style={styles.notesText}>Notes:</Text>
            <HTML htmlContent={notes.trim()} style={styles.notesHTML} />
          </View>
        }


        { !components ? null : <Text>{components.join(', ')}}</Text> }
      </Container>
    );
  }
}

const Prop = ({ children, style, text, textStyle, }) => !text ? null : (
  <View style={[styles.stat, style]}>
    <Text style={textStyle}> {text} </Text>
    {children}
  </View>
)

const styles = StyleSheet.create({

  textHighlight: {
    fontWeight: 'bold',
  },


  loreAndImage: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  lore: {
    backgroundColor: Colors.dota_red_darker,
    padding: Layout.padding_regular,
    color: Colors.dota_white,
    minHeight: 64,
    marginRight: Layout.padding_regular,
    flex: 1,
  },
  image: {
    borderColor: Colors.dota_ui2,
    borderWidth: 1,
    width: 88,
    height: 64,
  },


  stats: {
    backgroundColor: Colors.dota_ui1+'70',
    padding: 0,
    paddingTop: Layout.padding_regular,
  },
  stat: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    marginBottom: Layout.padding_small,
    marginRight: Layout.padding_regular,
  },
  
  costText: {
    color: Colors.gold,
  },

  attrib: {
    padding: Layout.padding_regular,
    backgroundColor: Colors.dota_ui1+'70',
    borderColor: Colors.dota_ui1,
    borderWidth: 1,
  },


  description: {

  },

  
  notes: {
    backgroundColor: Colors.dota_ui1,
    marginVertical: Layout.padding_small,
  },
  notesText: {
    marginLeft: Layout.padding_regular,
    marginTop: Layout.padding_regular,
    color: Colors.dota_radiant,
    fontWeight: 'bold',
  },
  notesHTML: {
    paddingTop: 0,
  },




  html: {
    flexDirection: 'row',
  },
})