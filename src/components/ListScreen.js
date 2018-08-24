import React from 'react';
import { Image, View, StyleSheet, Platform, FlatList, SectionList } from 'react-native';

import { Button, Text, ListThumb } from '../components/ui';

import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import { SCREEN_LABELS_HIDDEN } from '../constants/Constants';
import { withNavigation } from 'react-navigation';


@withNavigation
export default class ListScreen extends React.PureComponent {
  _renderItem = ({ item }) => {
    const { navTo, imageExtractor, labelExtractor, navigation, imageAspectRatio } = this.props;
    const onPress = () => navigation.navigate(navTo, { item });
    const imgSource = { uri: imageExtractor(item) };
    const imgSize = { width: thumbWidth, height: thumbWidth/imageAspectRatio };
    const label = labelExtractor(item);
  
    return (
      <ListThumb 
        item={item} 
        imgSource={imgSource} imgSize={imgSize}
        label={label} 
        onPress={onPress}
        width={thumbWidth}
      />
    )
  }

  _renderList = ({ section, index, item }) => {
    if (index !== 0) return null;

    const { keyExtractor } = this.props;  
    
    return (
      <FlatList 
        data={section.data}
        renderItem={this._renderItem}
        keyExtractor={keyExtractor}
        numColumns={columns}
      />
    )
  }

  _renderSectionHeader = ({section: {title}}) => (
    <Text style={styles.sectionTitle}>{title}</Text>
  )

  render() {
    const { itemList, keyExtractor, hasSections } = this.props;

    if(hasSections)
      return (
        <SectionList
          stickySectionHeadersEnabled
          renderItem={this._renderList}
          renderSectionHeader={this._renderSectionHeader}
          sections={itemList}
          keyExtractor={keyExtractor}
        />
      )
          
    else
      return this._renderList({ section: { data: itemList }, index: 0 })
  }
}

const borderWidth = 1;
const maxWidth = 90;
const columns = Math.floor((Layout.window.width - 2 * Layout.padding_regular) / maxWidth);

const thumbWidth = (Layout.window.width - (columns + 1) * Layout.padding_regular - borderWidth * 2 * columns) / columns;


const styles = StyleSheet.create({
  sectionTitle: {
    width: 200,
    textAlign: 'center',
    alignSelf: 'center',

    fontWeight: 'bold',
    margin: Layout.padding_regular,
    marginTop: Layout.padding_big,
    padding: Layout.padding_regular,
    backgroundColor: Colors.dota_ui1,
    borderColor: Colors.dota_white+'50',
    borderRadius: 5,
    borderWidth: 1,
    color: Colors.dota_white,
  },
});
