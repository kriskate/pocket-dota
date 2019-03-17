import React from 'react';
import { Platform } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from '../reducers/profile';
import { headerStyle } from '../utils/screen';

import Layout from '../constants/Layout';
import { Container, Switch } from '../components/ui';
import { withNamespaces } from 'react-i18next';
import i18next from 'i18next';


@withNamespaces("Screen_SettingsAppTips")
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
    title: i18next.t("Constants:SCREEN_LABELS.SETTINGS_TIPS"),
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
    const { tipsState, updateSettings, t } = this.props;

    return (
      <Container scrollable>
        <Switch label={t("ToggleAll")}
          style={{ marginBottom: Layout.padding_big + Layout.padding_regular, }}
          value={allTipsOff} onValueChange={this._allTipsOff_handler} />

        { 
          Object.keys(tipsState).sort().map(tip => {
            // if the current tip is not ment for the current platform
            const prefix = tip.split('_')[0];
            if((prefix == 'IOS' && Platform.OS !== 'ios') || 
              (prefix == 'ANDROID' && Platform.OS !== 'android'))
              return null;

            const short = t(tip + "_short"),
                  description = t(tip + "_description");

            return (
              <Switch key={tip} label={short} description={description}
                value={tipsState[tip]}
                onValueChange={() => 
                  updateSettings({ tipsState: {...tipsState, [tip]: !tipsState[tip]} })
                }
              />
            )
          })
        }
      </Container>
    )
  }
} 