import React, { Component } from "react";
import { View, StyleSheet, Platform } from "react-native";
import Colors from "../../constants/Colors";
import Text from "./Text";
import Button from "../Button";
import Layout from "../../constants/Layout";

export default class Card extends Component {
  state = {
    collapsed: false,
  }
  _toggleCollapse = () => {
    this.setState({ collapsed: !this.state.collapsed });
  }
  render() {
    const { style, children, collapsedTitle, title } = this.props;
    const { collapsed } = this.state;

    return (
      <View style={[styles.card, style]}>
        { !collapsedTitle ? null :
          <Button style={styles.btnCollapse} onPress={this._toggleCollapse}><Text>{ collapsed ? '+' : '-' }</Text></Button>
        }
        <View>
          { !title || collapsed ? null : <Text style={styles.title}>{title}</Text> }
          { collapsed ? <Text>{collapsedTitle}</Text> : children }

        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  title: {
    flex: 3,
    width: '100%',
    
  },
  btnCollapse: {
    position: 'absolute',
    elevation: 1,
    zIndex: 10,
    top: -5,
    right: -5,
    width: 20,
    height: 20,
    backgroundColor: Colors.dota_background_light,
  },
  card: {

    backgroundColor: Colors.dota_ui1,
    borderColor: Colors.dota_ui2,
    borderWidth: 1,
    padding: Layout.paddingSmall,
    margin: Layout.paddingSmall,
    marginBottom: Layout.paddingSmall/2,
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