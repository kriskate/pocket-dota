import React from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { Container, Image, Text } from '../components/ui';

import { headerStyle } from '../utils/screen';
import { URLS, APP_VERSION } from '../constants/Constants';
import Layout from '../constants/Layout';
import Colors from '../constants/Colors';
import { assets } from '../constants/Data';
import { withNamespaces } from 'react-i18next';
import i18next from 'i18next';


const Section = ({ title, children }) => (
  <View style={styles.section}>
    {!title ? null : <Text style={styles.header} key={title}>{title}</Text>}
    <View style={styles.sectionContent} key={title + 'content'}>
      {children}
    </View>
  </View>
)

@withNamespaces("Screen_About")
export default class AboutScreen extends React.Component {
  static navigationOptions = () => ({
    title: i18next.t("Constants:SCREEN_LABELS.ABOUT"),
    ...headerStyle,
  });
  
  render() {
    const { t } = this.props;

    return (
      <Container backToHome scrollable style={styles.container}>

        <View style={styles.logo}>
          <Image style={[styles.logo, styles.logoImg]} source={assets.app.logo} />
          <Text style={styles.appVersion}>v. {APP_VERSION}</Text>
        </View>

        <View style={{ padding: Layout.padding_small }}>
          <Text>{t("Notes_Title")}</Text>
          <Text><Text style={styles.highlight}>{t("WikiData")}</Text> - {t("WikiData_description")}</Text>
          <Text><Text style={styles.highlight}>{t("PlayerStatistics")}</Text> - {t("PlayerStatistics_description")}</Text>
        </View>

        <Section title={t("App_Title")}>
          <Text><Text style={styles.highlight}>Pocket Info for Dota2</Text> {t("FreeApp")}</Text>
          <Text><Text style={styles.highlight}>Pocket Info for Dota2</Text> {t("NotEndorsed")}</Text>
        </Section>

        <Section title={t("Copyright_Information_Title")}>
          <Text style={styles.header2}>{t("Copyright_WikiData")}</Text>
          <Text hasUrl URLS={URLS}>{ t("Copyright_TheGame", { valve_corporation: URLS["Valve corporation"] }) }</Text>
          <Text hasUrl URLS={URLS}>{ t("Copyright_GameFiles", { elo: URLS["Elo"], dota_buff: URLS["Dota buff"] }) }</Text>

          <Text style={styles.header2}>{t("Copyright_PlayerStatistics")}</Text>
          <Text hasUrl URLS={URLS}>{t("Copyright_OpenDotaData", { open_dota: URLS["Open Dota"] }) }</Text>
          <Text>{t("Copyright_OpenDotaShoutout")}</Text>
        </Section>

        <Section title={t("Tech_Title")}>
          <Text hasUrl URLS={URLS}>{t("Tech_TheWiki", { nodejs: URLS["NodeJS"] })}</Text>
          <Text hasUrl URLS={URLS} style={styles.text_spaced}>{t("Tech_Frameworks", { react_native: URLS["React Native"], expo: URLS["Expo"] })}</Text>
          <Text style={styles.highlight}>{t("Tech_OS")} {Platform.OS === 'ios' ? "IOS 9+" : "Android 4.4+"}</Text>
        </Section>


        <Section title={t("Contact_Title")}>
          <Text hasUrl URLS={URLS} style={styles.text_spaced}>{t("Contact_Issues", { issues: URLS["Issues"] })}</Text>
          <Text hasUrl URLS={URLS} style={styles.text_spaced}>{t("Contact_Features", { feature_requests: URLS["Feature Requests"] })}</Text>
          <Text hasUrl URLS={URLS} style={styles.text_spaced}>{t("Contact_General", { general: URLS["General"] })}</Text>
        </Section>

      </Container>
    );
  }
}

const logoRatio = 1600/ 560;
const logoWidth = Layout.window.width;
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 0,
    paddingBottom: Layout.padding_regular,
  },
  section: {
    marginTop: Layout.padding_regular,
  },
  sectionContent: {
    padding: Layout.padding_regular,
    paddingLeft: Layout.padding_big,
  },

  logo: {
    backgroundColor: Colors.dota_ui1,
    width: logoWidth,
    height: logoWidth / logoRatio,
    maxHeight: 150,
  },
  logoImg: {
    resizeMode: 'contain',
  },

  appVersion: {
    color: Colors.goldenrod,
    marginRight: Layout.padding_small,
    position: 'absolute',
    bottom: 15,
    right: 15,
  },

  highlight: {
    fontWeight: 'bold',
    color: Colors.goldenrod,
  },
  header: {
    padding: Layout.padding_regular,
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: Colors.dota_ui1,
  },
  header2: {
    color: Colors.goldenrod,
    marginTop: Layout.padding_small,
    fontSize: 18,
    fontWeight: 'bold',
  },

  text_spaced: {
    marginBottom: Layout.padding_small,
  },
})