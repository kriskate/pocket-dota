import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Text } from '../ui';
import { ICONS } from '../../constants/Constants';
import Layout from '../../constants/Layout';
import { assets } from '../../constants/Data';


export default class Roles extends React.Component {
  _renderRoleLevel = (level) => {
    const arr = [];
    for(let i = 1; i <= 3; i++) {
      if(i <= level) arr.push(<ICONS.CIRCLE key={i} />);
      else arr.push(<ICONS.CIRCLE_O key={i} />);
    }
    return arr;
  }
  render() {
    const { roles, roleLevels } = this.props;
    const r_split = roles.split(',');
    const rl_split = roleLevels.split(',');

    return (
      <View style={styles.container}>
        { r_split.map((role, idx) => (
          <View style={styles.role} key={role}>
            <View style={styles.roleImgWrapper}>
              <Image style={styles.roleImg} source={assets.game.roles[role]} />
              <Text>{role}</Text>
            </View>
            <View style={styles.roleLevels}>
              { this._renderRoleLevel(rl_split[idx]) }
            </View>
          </View>
        )) }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    flexWrap: 'wrap',
    paddingBottom: Layout.padding_small,
    justifyContent: "space-around",
  },
  role: {
    paddingTop: Layout.padding_small,
    paddingRight: Layout.padding_small,
    alignItems: 'center',
  },
  roleImgWrapper: {
    flexDirection: "row",
    alignItems: "center", 
  },
  roleImg: {
    // marginRight: Layout.padding_small,
    width: 20,
    height: 20,
  },
  roleLevels: {
    flexDirection: "row",
  },
})