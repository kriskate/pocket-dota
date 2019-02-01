import React from 'react';
import { connect } from 'react-redux';
import SnackBar from 'react-native-snackbar-component';

import { Actions as ProfileActions } from '../reducers/profile';
import Colors from '../constants/Colors';
import { Platform } from 'react-native';
import Layout from '../constants/Layout';

// we will only have one instance of this class, and only use this for setState
let singletonInstance;



export const APP_TIPS = {
  IOS_SLIDE_BACK: {
    stateLink: 'IOS_slideBack',
    short: "Swipe to go back",
    description: "You can swipe from the left side of the screen to go to back.",
  },
  DRAWER_SLIDE: {
    stateLink: 'drawerSlide',
    short: "Swipe for drawer",
    description: "You can swipe from the right side of the screen to open the drawer.",
  },
  ATTRIBUTES_SLIDER: {
    stateLink: 'attributesSlider',
    short: "Attribute slider",
    description: "You can use the slider below the hero image to see how the attributes change at different hero levels.",
  },

  PROFILE_ADD_REQUIREMENTS: {
    stateLink: 'profileAddRequirements',
    short: "Profile exposure",
    description: "In order for your Dota 2 profile to be parsed by Valve, you need to check the in-game setting of \"Expose Public Match Data\" (settings/options/advanced options).",
  },
  PROFILE_ADD: {
    stateLink: 'profileAdd',
    short: "Add profile to home screen",
    description: "You can add a Dota 2 profile to the app's Home screen by clicking the profile icon at the top of this screen. \r\nThis way, you can quickly acces your Dota 2 stats when opening the app.",
  },
  PROFILE_ADDED: {
    stateLink: 'profileAdded',
    short: "Dota 2 profile added",
    description: "This Dota 2 profile has been added to the app. The profile will be available on the app's Home screen, unless this option is disabled under \"Settings\"."
  },
}

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
    const { hideTip, tipsState, } = this.props;

    let visible = true, stateLink, description;
    if(show && tip) {
      stateLink = tip.stateLink;
      description = tip.description;

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
        actionText={"DON'T SHOW AGAIN"}
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
