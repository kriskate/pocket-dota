import React from 'react';
import { Image, View, StyleSheet, Platform, FlatList, SectionList } from 'react-native';

import { Button, Text, ListThumb } from '../components/ui';

import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import { SCREEN_LABELS_HIDDEN } from '../constants/Constants';
import { withNavigation } from 'react-navigation';

const getLayout = (layoutWidth = Layout.window.width) => {
  const borderWidth = 1;
  const maxWidth = 80;
  columns = Math.floor((layoutWidth - 2 * Layout.padding_regular) / maxWidth);

  thumbWidth = (layoutWidth - (columns + 1) * Layout.padding_regular - borderWidth * 2 * columns) / columns;
}
let columns, thumbWidth;


@withNavigation
export default class ListScreen extends React.PureComponent {
  constructor(props) {
    super(props);

    getLayout(props.layoutWidth);
  }
  _renderItem = ({ item }) => {
    const { navTo, imageExtractor, labelExtractor, costExtractor, navigation, imageAspectRatio } = this.props;
    const onPress = () => navigation.navigate(navTo, { data: item });
    const imgSource = { uri: imageExtractor(item) };
    const cost = costExtractor && costExtractor(item);
    const imgSize = { width: thumbWidth, height: thumbWidth/imageAspectRatio };
    const label = labelExtractor(item);
  
    return (
      <ListThumb 
        cost={cost}
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
        key={section.title}
        data={section.data}
        renderItem={this._renderItem}
        keyExtractor={keyExtractor}
        numColumns={columns}
      />
    )
  }

  _renderSectionHeader = ({section: {title, color}}) => (
    <Text style={[styles.sectionTitle, color ? { color } : null ]}>{title}</Text>
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
