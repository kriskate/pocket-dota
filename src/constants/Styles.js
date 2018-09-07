import { StyleSheet } from "react-native";
import Layout from "./Layout";
import Colors from "./Colors";

export default StyleSheet.create({
  toolbox_button: {
    marginHorizontal: Layout.isSmallDevice ? Layout.padding_small+2 : Layout.padding_big,
    padding: Layout.padding_small,
    paddingHorizontal: Layout.padding_regular,
    borderColor: Colors.dota_ui2,
    alignItems: 'center',
    justifyContent: 'center',
    // icon size + buttonHeader padding + <Button margin
    height: 17 + Layout.padding_small*2 + Layout.padding_small,
    width: 17 + Layout.padding_small*2 + Layout.padding_small*2,
  },
})