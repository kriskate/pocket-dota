import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '../ui';
import { ICONS } from '../../constants/Constants';
import Layout from '../../constants/Layout';


export default class Complexity extends React.Component {
  _renderComplexity = (level) => {
    const arr = [];
    for(let i = 1; i <= 3; i++) {
      if(i <= level) arr.push(<ICONS.CIRCLE key={i} />);
      else arr.push(<ICONS.CIRCLE_O key={i} />);
    }
    return arr;
  }
  render() {
    const { level } = this.props;

    return (
      <View style={styles.container}>
        <Text>Complexity: </Text>
        <View style={styles.complexityLevels}>
          { this._renderComplexity(level) }
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    paddingTop: Layout.padding_small,
  },
  complexityLevels: {
    flexDirection: "row",
  },
})