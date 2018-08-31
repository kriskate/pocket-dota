import React from 'react';
import { connect } from 'react-redux';
import SnackBar from 'react-native-snackbar-component';

import { Actions as ProfileActions } from '../reducers/profile';
import Colors from '../constants/Colors';
import { Platform } from 'react-native';

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
  ADD_PROFILE: {
    stateLink: 'addProfile',
    short: "Add profile to home screen",
    description: "You can add a Dota profile and show it on the homescreen. This way, you can quickly acces your Dota stats when opening the app.",
  },
  ATTRIBUTES_SLIDER: {
    stateLink: 'attributesSlider',
    short: "Attribute slider",
    description: "You can use the slider below the hero image to see how the attributes change at different hero levels.",
  },
}
export const showTip = (tip, duration=10) => {
  if(duration > 0) setTimeout(() => singletonInstance.setState({
    show: false,
    tip: '',
  }), duration*1000);

  singletonInstance && singletonInstance.setState({
    show: true,
    tip,
  })
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
        
        actionTextWrapperStyle={{ maxWidth: 80 }}
        backgroundColor={Colors.dota_ui1}
        accentColor={Colors.goldenrod}
        messageColor={Colors.dota_white}
      />
    )
  }
}
