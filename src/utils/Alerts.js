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