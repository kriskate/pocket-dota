import React from 'react';
import { StyleSheet, View } from 'react-native';
import Modal from 'react-native-modal';

import Layout from '../../constants/Layout';
import Styles from '../../constants/Styles';
import { HELP_TEXTS, ICONS, URLS } from '../../constants/Constants';
import { Button, Text, Container } from '../ui';
import { withNamespaces } from 'react-i18next';


export default withNamespaces("Screen_StatsWeb")(({ visible, hide, t }) => (
  <Modal isVisible={visible}
    onBackdropPress={hide}
    onBackButtonPress={hide}
    onSwipe={hide} swipeDirection="down"
  >
    <Container style={Styles.modal_body}>
      <Text style={Styles.modal_header}>{t("HEADER")}</Text>
      <Text style={styles.help_row} hasUrl URLS={URLS}>{t("CONTENT", { open_dota: URLS["Open Dota"] }) }</Text>

      { ["BUTTON_BACK", "BUTTON_FORWARD", "BUTTON_USER"].map(hText => {
        const IconComponent = ICONS[hText];

        return (
          <View key={hText} style={styles.help_row}>
            <Button prestyled forceTouchableOpacity style={[ Styles.toolbox_button, Styles.toolbox_button_help ]}><IconComponent /></Button>
            <Text style={styles.help_text}>{t(hText)}</Text>
          </View>
        )
      })}
      <Text>{t("DOTA_PROFILE")}</Text>
      <View style={Styles.modal_close_button_wrapper}>
        <Button prestyled style={Styles.modal_close_button}
          title={t("BUTTON_Done")}
          onPress={hide} />
      </View>
    </Container>
  </Modal>
))


const styles = StyleSheet.create({
  help_row: {
    flexDirection: 'row',
    marginBottom: Layout.padding_big,
  },
  help_text: {
    flex: 1,
  },


})