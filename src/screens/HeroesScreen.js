import React from 'react';
import { Image, View, Text, StyleSheet, TouchableHighlight, Platform, FlatList } from 'react-native';
import { connect } from 'react-redux';

import { SCREEN_LABELS } from '../constants/Constants';
import { Container } from '../components/ui';
import { url, local_uri } from '../constants/Data';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import { headerStyle } from '../utils/screen';

@connect(state => ({ 
  heroes: state.wiki.heroes,
}))
export default class HeroesScreen extends React.PureComponent {
  static navigationOptions = ({ navigation }) => ({
    title: SCREEN_LABELS.HEROES,
    ...headerStyle,
  });


  _renderItem = ({ item }) => {
    const hero = item;
    const { navigate } = this.props.navigation
    const imgSource = { uri: url.images.small(hero.tag) };

    return (
      <TouchableHighlight onPress={() => navigate('HeroScreen', { hero })}>
        <View style={styles.thumb}>
          <Image style={styles.thumbImg} source={imgSource} />
          <View style={styles.thumbTextWrapper}>
            <Text style={styles.thumbText}>{hero.name}</Text>
          </View>
        </View>
      </TouchableHighlight>
    )
  }
  render() {
    const { heroes } = this.props;

    return (
      <Container>
        <FlatList numColumns={columns}
          data={heroes}
          renderItem={this._renderItem}
          keyExtractor={(item) => item.tag}
        />
      </Container>
    );
  }
}


const thumbAspectRatio = 127/71;
const columns = 3;
const borderWidth = 1;
const thumbWidth = (Layout.window.width - (columns + 1) * Layout.paddingSmall - borderWidth * 2 * columns) / columns;
const thumbHeight = thumbWidth/thumbAspectRatio;

const styles = StyleSheet.create({
  thumb: {
    marginLeft: Layout.paddingSmall,
    marginTop: Layout.paddingSmall,
    justifyContent: 'center',

    backgroundColor: Colors.dota_ui1,
    alignItems: 'center',
    borderWidth,
    borderRadius: 5,
    borderColor: Colors.dota_ui1,
  },
  thumbImg: {
    width: thumbWidth,
    height: thumbHeight,
  },
  thumbTextWrapper: {
    width: thumbWidth,
    padding: 2,
    
    position: 'absolute',
    bottom: 0,
    
    backgroundColor: Colors.dota_ui1 + '99',
  },
  thumbText: {
    fontWeight: 'bold',
    fontSize: Platform.OS === 'ios' ? 9 : 13,
    textAlign: 'center',
    
    color: Colors.dota_white,
  }
});
