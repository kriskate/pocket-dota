import { StyleSheet } from "react-native";
import Layout from "./Layout";
import Colors from "./Colors";

export default StyleSheet.create({
  toolbox_button: {
    padding: Layout.padding_small,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0,
    // icon size + buttonHeader padding + <Button margin
    height: 17 + Layout.padding_small*2 + Layout.padding_small,
  },
  
  toolbox_button_help: {
    marginHorizontal: Layout.isSmallDevice ? Layout.padding_small+2 : Layout.padding_big,
    paddingHorizontal: Layout.padding_regular,
    borderColor: Colors.dota_ui2,
    width: 17 + Layout.padding_small*2 + Layout.padding_small*2,
    flex: undefined,
  },
})