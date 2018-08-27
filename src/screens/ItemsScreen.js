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



@connect(state => ({
  items: state.wiki.items,
}))
export default class Itemscreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: SCREEN_LABELS.ITEMS,
    ...headerStyle,
  });

  render() {
    const { items } = this.props;
    
    const itemSections = [];

    items.forEach(item => {
      const { category } = item;
      let section = itemSections.find(({ title }) => title == category);
      if(!section) {
        section = new model_section({ 
          title: category,
          color: Colors.items[parseCategory(category)],
        });
        itemSections.push(section);
      }

      section.data.push(item);
    });

    return (
      <Container backToHome style={ styles.container }>
        <ListScreen
          hasSections
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
    padding: Layout.padding_small,
  }
})