import React from 'react';
import { Switch as RNSwitch, View, StyleSheet, Platform } from 'react-native';
import Layout from '../../constants/Layout';
import Colors from '../../constants/Colors';
import Button from './Button';
import Text from './Text';

export default ({ label, description, value, onValueChange, disabled, style }) => (
  <Button prestyled style={[styles.switchWrapper, style]} onPress={() => onValueChange(!!!value)} disabled={disabled}>
    <View style={{ flex: 1 }}>
      <Text style={disabled ? { color: Colors.dota_ui1 } : null}>{label}</Text>
      { !description ? null : <Text style={styles.switchDescription}>{description}</Text> }
    </View>

    <RNSwitch style={styles.switch} disabled={disabled} trackColor={Colors.dota_agi + '70'} thumbTintColor={Platform.OS ==='android' ? Colors.dota_agi : null}
      value={value} onValueChange={onValueChange} />
  </Button>
)

const styles = StyleSheet.create({
  switchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Layout.padding_small,
    paddingHorizontal: Layout.padding_regular,

  },
  switchDescription: {
    color: Colors.disabled,
    fontSize: 10,
    marginRight: Layout.padding_regular,
  },
})