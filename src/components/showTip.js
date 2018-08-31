import React from 'react';
import { connect } from 'react-redux';
import { Actions } from '../reducers/snackbar';
import { APP_TIPS } from '../constants/Constants';


export default tip => WrappedComponent => (
  @connect(
    (state => ({
      sliderEnabled: state.profile.settings.tipsState[tip],
    })),
    (dispatch => ({ 
      showTip: () => {
        const tipDescription = APP_TIPS[tip][1];
        
        dispatch(
          Actions.snack({ 
            visible: true,
            textMessage: `TIP: ${tipDescription}`,
            actionText: "DON'T SHOW AGAIN",
            tipToHide: tip,
          })
        );
        setTimeout(() => dispatch(Actions.snack({ visible: false })), 11000);
      },
    }))
  )
  class extends React.Component {
    componentDidMount() {
      if(!tip) console.warn('you have not declared the tip type');

      tip && this.props.sliderEnabled && this.props.showTip();
    }
    render() {
      return <WrappedComponent {...this.props} />
    }
  }
)
