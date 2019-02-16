import { Alert } from "react-native";


export const alertGeneral = (title, content) => 
  Alert.alert(
    title, content,
    [
      {text: 'Dismiss'}
    ],
    { cancelable: true }
  );

export const alertAppUpdateDone = (version, onYes) =>
  Alert.alert(
    'Success!',
`Downloading new app version ${version} has finished successfully.
The app will now restart, in order for the new version to be applied.`,
    [
      { text: `Don't restart`, style: 'cancel' },
      { text: 'OK', onPress: onYes },
    ]
  )

export const alertWikiUpdateDone = (version) => 
  Alert.alert(
    `Success!`,
    `Downloading new wiki files for version ${version} has finished succesfully.`,
    [
      { text: 'OK' },
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
      { text: 'OK', onPress: onDismiss },
    ],
    { cancelable: true }
  );

export const alertUpdateCheckAvailable = (What, newV, onNo, onYes) =>
  Alert.alert(
    `New ${What} version found! (${newV})`,
`A new ${What} version has been found.
Would you like to download it?
It is recomended to be connected to a WI-FI network before downloading new data.
( download size ~40 MB )`,
    [
      { text: 'No', style: 'cancel', onPress: onNo },
      { text: 'Yes', onPress: onYes },
    ],
    { cancelable: true }
  );

export const alertCannotUpdate = (v, e) =>
  Alert.alert(
    `The update cannot start`,
`Pocket Dota is trying to update it's Wiki to a version higher than ${v}, but has encountered an error.
There might be a problem with your connection; please restart the app and make sure you're connected to the internet.

THIS UPDATE IS HIGHLY RECOMMENDED - if the update is not made, the application will not show the data correctly; it might even crash due to lack of correct data.

${e}`,
    [
      { text: 'OK' },
    ],
    { cancelable: false }
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

