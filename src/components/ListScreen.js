import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';

import { Text, ListThumb } from '../components/ui';

import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import { withNavigation } from 'react-navigation';

const getLayout = (layoutWidth = Layout.window.width) => {
  const borderWidth = 1;
  const maxWidth = 80;
  columns = Math.floor((layoutWidth - 2 * Layout.padding_regular) / maxWidth);

  thumbWidth = (layoutWidth - (columns + 1) * Layout.padding_regular - borderWidth * 2 * columns) / columns;
}
let columns, thumbWidth;


class List extends React.PureComponent {
  render() {
    const { section, renderItem, keyExtractor, noBorder } = this.props;
    const { data, color, title } = section;

    const sectionBorder = noBorder ? null : {
      borderColor: color + '60',
      borderWidth: 1,
    }
    const sectionTitleBorder = noBorder ? null : {
      borderColor: color + '60',
      // borderColor: Colors.dota_ui3,
      borderWidth: 1,
    }

    return (
      <View key={title} style={[ styles.section, sectionBorder ]}>
        <Text style={[styles.sectionTitle, color, sectionTitleBorder ]}>{title}</Text>
        <FlatList
          initialNumToRender={10}
          maxToRenderPerBatch={1}
          updateCellsBatchingPeriod={50}
          data={data}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          numColumns={columns}
        />
      </View>
    )
  }
}

@withNavigation
export default class ListScreen extends React.PureComponent {
  constructor(props) {
    super(props);

    getLayout(props.layoutWidth);
  }
  _renderItem = ({ item }) => {
    const { navTo, imageExtractor, labelExtractor, costExtractor, navigation, imageAspectRatio, overlayed } = this.props;
    const onPress = () => navigation.navigate(navTo, { data: item });
    const imgSource = { uri: imageExtractor(item) };
    const cost = costExtractor && costExtractor(item);
    const imgSize = { width: thumbWidth, height: thumbWidth/imageAspectRatio };
    const label = labelExtractor(item);
  
    return (
      <ListThumb 
        overlayed={overlayed}
        cost={cost}
        imgSource={imgSource} imgSize={imgSize}
        label={label} 
        onPress={onPress}
        width={thumbWidth}
      />
    )
  }

  _renderList = ({ item }) => {
    const { keyExtractor, noBorder } = this.props;

    return (
      <List section={item} renderItem={this._renderItem} keyExtractor={keyExtractor} noBorder={noBorder} />
    )
  }

  render() {
    const { itemList, hasSections, initialNumToRender, scrollEnabled } = this.props;

    if(hasSections)
      return (
        <FlatList
          scrollEnabled={scrollEnabled !== false}

          initialNumToRender={initialNumToRender || 1}
          maxToRenderPerBatch={1}
          updateCellsBatchingPeriod={100}
          data={itemList}
          renderItem={this._renderList}
          keyExtractor={({title}) => title}
        />
      )
          
    else
      return this._renderList({ section: { data: itemList }, index: 0 })
  }
}
ListScreen.defaultProps = {
  noBorder: false,
}


const styles = StyleSheet.create({
  section: {
    marginVertical: Layout.padding_small,
  },
  sectionTitle: {
    width: '100%',

    alignSelf: 'center',

    fontWeight: 'bold',
    padding: Layout.padding_regular,
    backgroundColor: Colors.dota_ui1,
    color: Colors.dota_white,
  },
});
