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
  _allTipsOff_handler = () => {
    const tipsOff = {};
    const { allTipsOff } = this.state;

    Object.keys(this.props.tipsState).forEach(tip => tipsOff[tip] = !allTipsOff);
    this.props.updateSettings({ tipsState: tipsOff });
    this.setState({ allTipsOff: !allTipsOff });
  }

  render() {
    const { allTipsOff } = this.state;
    const { tipsState, updateSettings } = this.props;

    return (
      <Container scrollable>
        <Switch label="Turn all tips ON/ OFF"
          style={{ marginBottom: Layout.padding_big + Layout.padding_regular, }}
          value={allTipsOff} onValueChange={this._allTipsOff_handler} />

        { Object.keys(APP_TIPS).map(tip => {
            // if the current tip is not ment for the current platform
            const prefix = tip.split('_')[0];
            if((prefix == 'IOS' && Platform.OS !== 'ios') || 
              (prefix == 'ANDROID' && Platform.OS !== 'android'))
              return null;

            const { short, description, stateLink } = APP_TIPS[tip];

            return (
              <Switch key={tip} label={short} description={description}
                value={tipsState[stateLink]} 
                onValueChange={() => 
                  updateSettings({ tipsState: {...tipsState, [stateLink]: !tipsState[stateLink]} })
                }
              />
            )
        })}
      </Container>
    )
  }
} 