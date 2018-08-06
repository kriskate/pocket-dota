import { Component } from "react";
import { View, StyleSheet, Platform } from "react-native";
import Colors from "../../constants/Colors";
import Text from "./Text";
import Button from "../Button";

export default class Card extends Component {
  state = {
    collapsed: false,
  }
  _toggleCollapse = () => {
    this.setState({ collapsed: !this.state.collapsed });
  }
  render() {
    const { style, children, collapsedTitle, noStyle } = this.props;
    const { collapsed } = this.state;

    return (
      <View style={[noStyle ? null : styles.container, style]}>
        {
          !collapsedTitle ? {children} :

          <View>
            { this.state.collapsed ? <Text>{collapsedTitle}</Text> : {children} }
            <Button onPress={this._toggleCollapse}>{ collapsed ? '+' : '-' }</Button>
          </View>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.dota_ui1,
    borderColor: Colors.dota_ui2,
    borderWidth: 1,
    padding: 15,
    margin: 15,
    marginBottom: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0,0,0, .2)',
        shadowOffset: { height: 0, width: 0 },
        shadowOpacity: 1,
        shadowRadius: 1,
      },
      android: {
        elevation: 1,
      },
    }),
  },
})