import { Alert } from "react-native";


export const alertWikiUpdateDone = (version) => 
  Alert.alert(
    `Success!`,
    `Downloading new wiki files for version ${version} has finished succesfully.`,
    [
      { text: 'Dismiss' },
    ],
    { cancelable: true }
  );


export const alertUpdateCheckError = (What, error, onDismiss) =>
  Alert.alert(
    `Error`,
    `There was an error while trying to retrieve new ${What} version
    ${error}
    Please try again later.`,
    [
      { text: 'Dismiss', onPress: onDismiss },
    ],
    { cancelable: true }
  );

export const alertUpdateCheckAvailable = (What, newV, onNo, onYes) =>
  Alert.alert(
    `New version found! (${newV})`,
    `A new ${What} version has been found.
    Would you like to begin downloading it?
    It is recoomended to be connected to a WI-FI network before downloading new data.`,
    [
      { text: 'No', style: 'cancel', onPress: onNo },
      { text: 'Yes', onPress: onYes },
    ],
    { cancelable: true }
  );


export const alertRemoveProfileData = (onYes) =>
  Alert.alert(
    'Are you sure you want to remove your profile?',
    'This will remove the Dota profile data.',
    [
      { text: 'No', style: 'cancel' },
      { text: 'Yes', onPress: onYes },
    ],
    { cancelable: true }
  );


export const alertResetSettings = (onYes) =>
  Alert.alert(
    'Are you sure you want to reset settings to default?',
    'This will reset the settings to default, including the removal of the Dota profile data.',
    [
      { text: 'No', style: 'cancel' },
      { text: 'Yes', onPress: onYes },
    ],
    { cancelable: true }
  );
