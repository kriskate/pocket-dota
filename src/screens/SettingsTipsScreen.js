import React from 'react';
import { Platform } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from '../reducers/profile';
import { headerStyle } from '../utils/screen';

import Layout from '../constants/Layout';
import { SCREEN_LABELS_HIDDEN } from '../constants/Constants';
import { Container, Switch } from '../components/ui';
import { APP_TIPS } from '../components/AppTips';

@connect(
  (state => ({
    tipsState: state.profile.settings.tipsState,
  })),
  (dispatch => ({
    updateSettings: val => dispatch(Actions.settings(val)),
  }))
)
export default class SettingsTipsScreen extends React.Component {
  static navigationOptions = () => ({
    title: SCREEN_LABELS_HIDDEN.SETTINGS_TIPS,
    ...headerStyle,
  });

  state = {
    allTipsOff: false,
  }

  render() {
    const { allTipsOff } = this.state;
    const { tipsState, updateSettings } = this.props;

    return (
      <Container scrollable>
        <Switch label="Turn all tips ON/ OFF"
          style={{ marginBottom: Layout.padding_big + Layout.padding_regular, }}
          value={allTipsOff} onValueChange={() => {
            const tipsOff = {};

            Object.keys(tipsState).forEach(tip => tipsOff[tip] = !allTipsOff);
            updateSettings({ tipsState: tipsOff });
            this.setState({ allTipsOff: !allTipsOff });
          }} />
          }
        { Object.keys(APP_TIPS).map(tip => {
            const prefix = tip.split('_')[0];
            if((prefix == 'IOS' && Platform.OS !== 'ios') || 
              (prefix == 'ANDROID' && Platform.OS !== 'android'))
              return null;

            const { short, description, stateLink } = APP_TIPS[tip];

            return (
              <Switch key={tip} label={short} description={description}
                value={tipsState[stateLink]} 
                onValueChange={() => updateSettings({ tipsState: {...tipsState, [stateLink]: !tipsState[stateLink]} })} />
            )
          }
        )}
      </Container>
    )
  }
} 