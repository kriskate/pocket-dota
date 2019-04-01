import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, TextInput, View, } from 'react-native';

import { headerStyle } from '../utils/screen';
import { SCREEN_LABELS_HIDDEN } from '../constants/Constants';

import { Container } from '../components/ui';
import ListScreen from '../components/ListScreen';
import Layout from '../constants/Layout';
import { url } from '../constants/Data';
import { model_section } from '../constants/Models';
import Colors from '../constants/Colors';
import { parseCategory } from '../utils/utils';
import { withNamespaces } from 'react-i18next';
import i18next from 'i18next';


@withNamespaces("Screen_Items")
@connect(state => ({
  items: state.wiki.wikiData.items,
}))
export default class Itemscreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: i18next.t("Constants:SCREEN_LABELS.ITEMS"),
    ...headerStyle,
  });

  constructor(props) {
    super(props);

    this.state = {
      itemSections: [],
      search: "",
    };
  }

  static getDerivedStateFromProps(newProps, state) {
    const { items, t } = newProps;
    const r = new RegExp(state.search, 'i');
    
    const itemSections = [];

    items.forEach(item => {
      if(state.search && !r.test(item.name)) return;

      const { category } = item;
      const parsed = parseCategory(category);
      const translated_category = t("ItemType_" + parsed);
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
  
  _handleChange = (search) => this.setState({ search })

  render() {
    const { itemSections, search } = this.state;

    return (
      <Container backToHome style={ styles.container } scrollable>

        <View style={styles.search}>
          <TextInput style={styles.searchBox}
            selectTextOnFocus
            placeholder={"Search"}
            returnKeyType='search'
            enablesReturnKeyAutomatically
            onChangeText={this._handleChange}
            value={search}
          />
        </View>
        
        <ListScreen
          scrollEnabled={false}
          
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
  },

  search: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Layout.padding_regular,
    marginVertical: Layout.padding_regular,
  },
  searchBox: {
    marginRight: Layout.padding_regular,
    backgroundColor: Colors.dota_white,
    padding: Layout.padding_small,
    borderRadius: 5,
    flex: 1,
  },
})