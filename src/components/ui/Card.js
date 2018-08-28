import React from "react";
import { View, StyleSheet, Platform, LayoutAnimation } from "react-native";
import Colors from "../../constants/Colors";
import Text from "./Text";
import Button from "./Button";
import Layout from "../../constants/Layout";
import { animation } from "../../utils/screen";

export default class Card extends React.PureComponent {
  constructor(props) {
    super(props);
    
    this.state = {
      collapsed: props.collapsedByDefault,
    }
    if(props.collapsedByDefault && !props.collapsedTitle) console.warn('You should pass a collapsedTitle prop in order to show the collapse button.');
  }
  
  _toggleCollapse = () => {
    LayoutAnimation.configureNext(animation.standard);

    this.setState({ collapsed: !this.state.collapsed });
  }
  render() {
    const { style, children, collapsedTitle, title, showTitleWhenOpened, viewStyle } = this.props;
    const { collapsed } = this.state;

    return (
      <View {...this.props} style={[styles.card, style]}>
        { !title ? null :
          <Button style={styles.btnCollapse} viewStyle={styles.btnCollapseView} onPress={this._toggleCollapse}><Text pointerEvents='none'>{ collapsed ? '+' : '-' }</Text></Button>
        }
        <View style={viewStyle}>
          { !title || !(showTitleWhenOpened || collapsed) ? null : 
            <Text style={collapsed ? styles.collapsedTitle : styles.title}>{title}</Text>
          }
          { collapsed ? null : children }

        </View>
      </View>
    )
  }
}

const btnPad = 10;
const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    color: Colors.dota_red,
    marginBottom: Layout.padding_regular,
  },
  collapsedTitle: {
    fontSize: 16,
    color: Colors.dota_red,
  },
  btnCollapse: {
    position: 'absolute',
    elevation: 1,
    zIndex: 10,
    top: -btnPad -2,
    right: -btnPad -2,
    padding: btnPad,
  },
  btnCollapseView: {
    width: 20,
    height: 20,
    backgroundColor: Colors.dota_background_light,
  },
  card: {

    backgroundColor: Colors.dota_ui1,
    borderColor: Colors.dota_ui3,
    borderWidth: 1,
    padding: Layout.padding_regular,
    marginHorizontal: Layout.padding_regular,
    marginVertical: Layout.padding_small,
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