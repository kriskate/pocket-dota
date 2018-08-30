import React from 'react';
import { createStackNavigator } from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import DrawerNavigator from './DrawerNavigator';
import { SCREEN_LABELS } from '../constants/Constants';
import { View } from 'react-native';
import SnackBar from 'react-native-snackbar-component'
import { connect } from 'react-redux';
import Colors from '../constants/Colors';
import { Actions } from '../reducers/snackbar';


const MainStack = createStackNavigator({
  [SCREEN_LABELS.HOME]: HomeScreen,
  DrawerNavigator,
}, {
  headerMode: 'none',
});

export default connect(
  (state => ({
    snackbar: state.snackbar,
  })),
  (dispatch => ({
    hideSnack: () => dispatch(Actions.snack({ visible: false, actionText: '' })),
  }))
  )
(
  ({ snackbar: { actionText, textMessage, visible }, hideSnack }) => (
    <View style={{ flex: 1 }}>
      <SnackBar 
        visible={visible}
        textMessage={textMessage}
        actionText={actionText}
        actionHandler={hideSnack}
        backgroundColor={Colors.dota_ui1}
        accentColor={Colors.goldenrod}
        messageColor={Colors.dota_white}
      />
      <MainStack />
    </View>
  )
)