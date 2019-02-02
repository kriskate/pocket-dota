import React from 'react';
import { connect } from 'react-redux';
import SnackBar from 'react-native-snackbar-component';

import { Actions as ProfileActions } from '../reducers/profile';
import Colors from '../constants/Colors';
import { Platform } from 'react-native';
import Layout from '../constants/Layout';
import { withNamespaces } from 'react-i18next';

// we will only have one instance of this class, and only use this for setState
let singletonInstance;


let tipTimeout;
export const showTip = (tip, duration=10) => {
  if(duration > 0) {
    if(tipTimeout) {
      clearTimeout(tipTimeout);
      singletonInstance && singletonInstance.setState({
        show: false,
        tip: '',
      })
    }
    tipTimeout = setTimeout(() => singletonInstance && singletonInstance.setState({
      show: false,
      tip: '',
    }), duration*1000);
  }
  setTimeout(() => singletonInstance && singletonInstance.setState({
    show: true,
    tip,
  }), 750);
}

@withNamespaces("Screen_SettingsAppTips")
@connect(
  (state => ({ tipsState: state.profile.settings.tipsState })),
  (dispatch => ({
    hideTip: (tip) => dispatch(ProfileActions.setTip({ [tip]: false })),
  }))
)
export default class AppTips extends React.PureComponent {
  constructor(props){
    super(props);

    if(singletonInstance) console.warn('You should not use this component more than once.');
    singletonInstance = this;
    this.state = {
      show: false,
      tip: '',
    }
  }

  _hide = () => this.setState({ show: false });

  render() {
    const { tip, show } = this.state;
    const { hideTip, tipsState, t } = this.props;

    let visible = true, stateLink, description;
    if(show && tip) {
      stateLink = tip;
      description = t(tip + "_description");

      const platformOk_ios = stateLink.split('_')[0] === 'IOS' ? Platform.OS === 'ios' : true;
      const platformOk_android = stateLink.split('_')[0] === 'ANDROID' ? Platform.OS === 'android' : true;
      
      visible = tipsState[stateLink] && platformOk_ios && platformOk_android;
    } else {
      visible = false;
    }


    return (
      <SnackBar
        visible={visible}
        textMessage={description}
        actionText={t("DONT_SHOW_AGAIN")}
        actionHandler={() => {
          this._hide();
          hideTip(stateLink);
        }}
        onPress={this._hide}
        actionTextWrapperStyle={{ maxWidth: 80, marginLeft: Layout.padding_regular }}
        backgroundColor={Colors.dota_ui3}
        accentColor={Colors.goldenrod}
        messageColor={Colors.dota_white}
      />
    )
  }
}
