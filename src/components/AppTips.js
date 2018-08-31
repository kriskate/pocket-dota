import React from 'react';
import { connect } from 'react-redux';
import SnackBar from 'react-native-snackbar-component';

import { APP_TIPS } from '../constants/Constants';
import { Actions as ProfileActions } from '../reducers/profile';
import Colors from '../constants/Colors';
import { Platform } from 'react-native';

// we will only have one instance of this class, and only use this for setState
let singletonInstance;



@connect(
  (state => ({ tipsState: state.profile.settings.tipsState })),
  (dispatch => ({
    hideTip: (tip) => dispatch(ProfileActions.setTip({ [tip]: false })),
  }))
)
export default class AppTips extends React.PureComponent {
  static showTip = (tip, duration=10) => {
    if(duration > 0) setTimeout(() => singletonInstance.setState({
      show: false,
      tip: '',
    }), duration*1000);

    singletonInstance && singletonInstance.setState({
      show: true,
      tip,
    })
  }
  

  constructor(props){
    super(props);

    if(singletonInstance) console.warn('You should not use this component more than once.');
    singletonInstance = this;
    this.state = {
      show: false,
      tip: '',
    }
  }

  render() {
    const { tip, show } = this.state;
    const { hideTip, tipsState, } = this.props;
    const textMessage = APP_TIPS[tip] ? APP_TIPS[tip][1] : '';
    const platformOk = tip.split('_')[0] === 'IOS' ? Platform.OS == 'ios' : true;
    const visible = show && tipsState[tip] && textMessage && platformOk;

    return (
      <SnackBar
        visible={visible}
        textMessage={textMessage}
        actionText={"DON'T SHOW AGAIN"}
        actionHandler={() => {
          this.setState({ show: false });
          tip && hideTip(tip);
        }}
        
        actionTextWrapperStyle={{ maxWidth: 80 }}
        backgroundColor={Colors.dota_ui1}
        accentColor={Colors.goldenrod}
        messageColor={Colors.dota_white}
      />
    )
  }
}
