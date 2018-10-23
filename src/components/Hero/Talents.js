import React from 'react'
import { View, StyleSheet } from 'react-native';
import { Text } from '../ui';

import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';



export default ({ talents }) => (
  <View style={styles.wrapper}>
    { talents.reverse().map((talent, idx) => [
      
      <View key={talent.tag} style={styles.talent}>
        <Text>{talent.name}</Text>
      </View>,

      idx % 2 == 1 ? null : (
        <View key={talent.tag + 'level'} style={styles.levelWrapper}>
          <View style={styles.level}>
            <Text style={styles.levelText}>
              { idx == 0 ? 25 : idx == 2 ? 20 : idx == 4 ? 15 : 10 }
            </Text>
          </View>
        </View>
      ),

    ] )}
  </View>
)

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  talent_row: {

  },
  levelWrapper: {
    width: "14%",
    alignItems: 'center',
    justifyContent: 'center',
  },
  level: {
    padding: Layout.padding_small,
    borderColor: Colors.disabled,
    borderWidth: 1,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  levelText: {
    textAlign: 'center',
    color: Colors.goldenrod,
  },
  talent: {
    padding: Layout.padding_small,
    marginVertical: Layout.padding_small,
    width: "43%",
    borderColor: Colors.disabled,
    borderWidth: 1,
  },
})