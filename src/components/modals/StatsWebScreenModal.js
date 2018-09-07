import React from 'react';
import { StyleSheet, View } from 'react-native';
import Modal from 'react-native-modal';

import Layout from '../../constants/Layout';
import Styles from '../../constants/Styles';
import { HELP_TEXTS, ICONS, URLS } from '../../constants/Constants';
import { Button, Text, Container } from '../ui';


export default ({ visible, hide }) => (
  <Modal isVisible={visible}
    onBackdropPress={hide}
    onBackButtonPress={hide}
    onSwipe={hide} swipeDirection="down"
  >
    <Container style={Layout.modal_body}>
      <Text style={Layout.modal_header}>{HELP_TEXTS.HELP_HEADER}</Text>
      <Text style={styles.help_row} hasUrl URLS={URLS}>{HELP_TEXTS.HELP_CONTENT}</Text>

      { Object.keys(HELP_TEXTS).map(hText => {
        if(hText.split('_')[0] == "HELP") return;

        const IconComponent = ICONS[hText];
        const TextComponent = HELP_TEXTS[hText];

        return (
          <View key={hText} style={styles.help_row}>
            <Button prestyled forceTouchableOpacity style={ Styles.toolbox_button }><IconComponent /></Button>
            <Text style={styles.help_text}>
              { typeof TextComponent == 'string' 
                ? TextComponent
                : <TextComponent />
              }
            </Text>
          </View>
        )
      })}
      <Text>{HELP_TEXTS.HELP_DOTA_PROFILE}</Text>
      <Button prestyled style={Layout.modal_close_button}
        title="DONE"
        onPress={hide} />
    </Container>
  </Modal>
)


const styles = StyleSheet.create({
  help_row: {
    flexDirection: 'row',
    marginBottom: Layout.padding_big,
  },
  help_text: {
    flex: 1,
  },

})