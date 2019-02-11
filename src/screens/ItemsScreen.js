import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet } from 'react-native';

import { headerStyle } from '../utils/screen';
import { SCREEN_LABELS, SCREEN_LABELS_HIDDEN } from '../constants/Constants';

import { Container } from '../components/ui';
import ListScreen from '../components/ListScreen';
import Layout from '../constants/Layout';
import { url } from '../constants/Data';
import { model_section } from '../constants/Models';
import Colors from '../constants/Colors';
import { parseCategory } from '../utils/utils';
import { withNamespaces } from 'react-i18next';


@withNamespaces("Screen_Items")
@connect(state => ({
  items: state.wiki.items,
}))
export default class Itemscreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: SCREEN_LABELS.ITEMS,
    ...headerStyle,
  });

  constructor(props) {
    super(props);

    this.state = {
      itemSections: [],
    };
  }

  static getDerivedStateFromProps(newProps) {
    console.log('props', newProps)

    const { items, t } = newProps;
    
    const itemSections = [];

    items.forEach(item => {
      const { category } = item;
      const parsed = parseCategory(category);
      const translated_category = t(parsed);
      let section = itemSections.find(({ title }) => title == translated_category);

      if(!section) {
        section = model_section({ 
          title: translated_category,
          color: Colors.items[parsed],
        });
        itemSections.push(section);
      }

      section.data.push(item);
    });

    return {
      itemSections,
    }
  }

  render() {
    console.log('render')
    const { itemSections } = this.state;

    return (
      <Container backToHome style={ styles.container }>
        <ListScreen
          overlayed
          hasSections
          initialNumToRender={3}
          itemList={itemSections}
          imageAspectRatio={88/64}
          navTo={SCREEN_LABELS_HIDDEN.ITEM}
          keyExtractor={(item) => item.tag}
          imageExtractor={item => url.images.items(item.tag)}
          labelExtractor={item => item.name}
        />
      </Container>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Layout.padding_small,
  }
})