import { Alert } from "react-native";
import i18n from 'i18next';


const wikiSize = () => `\r\n( ${i18n.t("Alerts:download_size")} ~1.4 MB )`


export const alertLanguageUpdate = (lang, onYes, onNo) => 
  Alert.alert(
    lang,
    i18n.t("Components:LANGUAGE.UPDATE") + wikiSize(),
    [
      { text: i18n.t("Alerts:BUTTON_No"), style: 'cancel', onPress: onNo },
      { text: i18n.t("Alerts:BUTTON_Yes"), onPress: onYes },
    ],
    { cancelable: true }
  );
export const alertLanguageDownload = (lang, onYes, onNo) => 
  Alert.alert(
    lang,
    i18n.t("Components:LANGUAGE.DOWNLOAD_ASK") + wikiSize(),
    [
      { text: i18n.t("Alerts:BUTTON_No"), style: 'cancel', onPress: onNo },
      { text: i18n.t("Alerts:BUTTON_Yes"), onPress: onYes },
    ],
    { cancelable: true }
  );




export const alertGeneral = (title, content) => 
  Alert.alert(
    title, content,
    [
      {text: i18n.t("Alerts:BUTTON_Dismiss")}
    ],
    { cancelable: true }
  );

export const alertAppUpdateDone = (version, onYes, onNo) =>
  Alert.alert(
    i18n.t("Alerts:MESSAGE_Success"),
    i18n.t("Alerts:AppUpdateDone", { "version": version }),
    [
      { text: i18n.t("Alerts:BUTTON_DontRestart"), onPress: onNo, style: 'cancel' },
      { text: i18n.t("Alerts:BUTTON_Yes"), onPress: onYes },
    ]
  )

export const alertWikiUpdateDone = (version) => 
  Alert.alert(
    i18n.t("Alerts:MESSAGE_Success"),
    i18n.t("Alerts:WikiUpdateDone", { version }),
    [
      { text: i18n.t("Alerts:BUTTON_Ok"), },
    ],
    { cancelable: true }
  );


export const alertUpdateCheckError = (What, error, onDismiss) =>
  Alert.alert(
    i18n.t("Alerts:MESSAGE_Error"),
    i18n.t("Alerts:UpdateCheckError", { What, error }),
    [
      { text: i18n.t("Alerts:BUTTON_Ok"), onPress: onDismiss },
    ],
    { cancelable: true }
  );

export const alertUpdateCheckAvailable = (What, newVersion, onNo, onYes) =>
  Alert.alert(
    i18n.t("Alerts:UpdateCheckAvailable_Title", { What, newVersion }),
    i18n.t("Alerts:UpdateCheckAvailable", { What }) + wikiSize(),
    [
      { text: i18n.t("Alerts:BUTTON_No"), style: 'cancel', onPress: onNo },
      { text: i18n.t("Alerts:BUTTON_Yes"), onPress: onYes },
    ],
    { cancelable: true }
  );

export const alertCannotUpdate = (version, e) =>
  Alert.alert(
    i18n.t("Alerts:CannotUpdate_Title"),
    i18n.t("Alerts:CannotUpdate", { version }),
    [
      { text: i18n.t("Alerts:BUTTON_Ok") },
    ],
    { cancelable: false }
  );


export const alertRemoveProfileData = (onYes) =>
  Alert.alert(
    i18n.t("Alerts:RemoveProfileData_Title"),
    i18n.t("Alerts:RemoveProfileData"),

    [
      { text: i18n.t("Alerts:BUTTON_No"), style: 'cancel' },
      { text: i18n.t("Alerts:BUTTON_Yes"), onPress: onYes },
    ],
    { cancelable: true }
  );


export const alertResetSettings = (onYes) =>
  Alert.alert(
    i18n.t("Alerts:ResetSettingsTitle"),
    i18n.t("Alerts:ResetSettings"),
    [
      { text: i18n.t("Alerts:BUTTON_No"), style: 'cancel' },
      { text: i18n.t("Alerts:BUTTON_Yes"), onPress: onYes },
    ],
    { cancelable: true }
  );

