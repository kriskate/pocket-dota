import React from 'react';
import RenderHTML from 'react-native-render-html';
import { StyleSheet, View, FlatList } from 'react-native';
import { url } from '../../constants/Data';
import Layout from '../../constants/Layout';
import Colors from '../../constants/Colors';


const alterNode = (node) => {
  if(node.name == 'img' && node.attribs) {
    const src = node.attribs.src;
    const hsplit = src.split('/');
    node.attribs = { src: hsplit[0] == 'heroes' ? url.images.icons(hsplit[1]) : url.images.items(hsplit[1]) };
    return node;
  }
}

const HtmlStyles = {
  main: {
    display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center',
  },
}
const HtmlTagStyles = {
  img: {
    maxWidth: 20,
    maxHeight: 20,
  }
}

export default ({ changes_short }) => (
  <View style={styles.changes_short}>
    <FlatList
      keyExtractor={(item, index) => index + item.slice(0,3)}
      data={changes_short}
      renderItem={({item}) => (
        <RenderHTML alterNode={alterNode} classesStyles={HtmlStyles} tagsStyles={HtmlTagStyles}
          html={`<div class="main" style="color:${Colors.dota_white};">${item}</div>`} 
        />
      )}
    />
  </View>
)

const styles = StyleSheet.create({
  changes_short: {
    padding: Layout.padding_small,
    paddingVertical: Layout.padding_regular,
  },
})
