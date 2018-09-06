import React from 'react';
import { Button, Container, Text, Switch } from '../ui';
import Modal from 'react-native-modal';
import Layout from '../../constants/Layout';
import { APP_TIPS } from '../AppTips';
import { Platform } from 'react-native';

export default class TipsModal extends React.Component {
  state = {
    allTipsOff: false,
  }
  render() {
    const { allTipsOff } = this.state;
    const { isVisible, hideModal, tipsState, updateSettings } = this.props;

    return (
      <Modal isVisible={isVisible}
        onBackdropPress={hideModal}
        onBackButtonPress={hideModal}
        onSwipe={hideModal} swipeDirection="down"
      >
        <Container scrollable style={Layout.modal_body}>
          <Text style={Layout.modal_header} >In-app tips</Text>

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
        <Button prestyled style={Layout.modal_close_button}
          title="DONE"
          onPress={hideModal} />
      </Modal>
    )
  }
} 