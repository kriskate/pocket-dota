import React, { Component } from 'react';
import { Animated, Platform, StyleSheet, View } from 'react-native';
import Colors from '../../constants/Colors';
import ButtonHamburger from '../ButtonHamburger';
import { Header, withNavigation, HeaderBackButton } from 'react-navigation';

const NAVBAR_HEIGHT = Header.HEIGHT;
const STATUS_BAR_HEIGHT = Platform.select({ ios: 20, android: 24 });

@withNavigation
export default class ContainerHeader extends Component {
  constructor(props) {
    super(props);

    const scrollAnim = new Animated.Value(0);
    const offsetAnim = new Animated.Value(0);

    this.state = {
      scrollAnim,
      offsetAnim,
      clampedScroll: Animated.diffClamp(
        Animated.add(
          scrollAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
            extrapolateLeft: 'clamp',
          }),
          offsetAnim,
        ),
        0,
        NAVBAR_HEIGHT,// - STATUS_BAR_HEIGHT,
      ),
    };
  }

  _clampedScrollValue = 0;
  _offsetValue = 0;
  _scrollValue = 0;

  componentDidMount() {
    this.state.scrollAnim.addListener(({ value }) => {
      const diff = value - this._scrollValue;
      this._scrollValue = value;
      this._clampedScrollValue = Math.min(
        Math.max(this._clampedScrollValue + diff, 0),
        NAVBAR_HEIGHT// - STATUS_BAR_HEIGHT,
      );
    });
    this.state.offsetAnim.addListener(({ value }) => {
      this._offsetValue = value;
    });
  }

  componentWillUnmount() {
    this.state.scrollAnim.removeAllListeners();
    this.state.offsetAnim.removeAllListeners();
  }

  _onScrollEndDrag = () => {
    this._scrollEndTimer = setTimeout(this._onMomentumScrollEnd, 250);
  };

  _onMomentumScrollBegin = () => {
    clearTimeout(this._scrollEndTimer);
  };

  _onMomentumScrollEnd = () => {
    const toValue = this._scrollValue > NAVBAR_HEIGHT &&
      this._clampedScrollValue > (NAVBAR_HEIGHT) / 2
      ? this._offsetValue + NAVBAR_HEIGHT
      : this._offsetValue - NAVBAR_HEIGHT;

    Animated.timing(this.state.offsetAnim, {
      toValue,
      duration: 350,
      useNativeDriver: true,
    }).start();
  };


  render() {
    const { navigation, backToHome, title, titleColor } = this.props;
    const { clampedScroll } = this.state;

    const navbarTranslate = clampedScroll.interpolate({
      inputRange: [0, NAVBAR_HEIGHT],
      outputRange: [0, -(NAVBAR_HEIGHT)],
      extrapolate: 'clamp',
    });
    const navbarOpacity = clampedScroll.interpolate({
      inputRange: [0, NAVBAR_HEIGHT],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });

    return (
      <View style={styles.fill}>
        <Animated.ScrollView
          contentContainerStyle={styles.contentContainer}
          
          scrollEventThrottle={1}
          onMomentumScrollBegin={this._onMomentumScrollBegin}
          onMomentumScrollEnd={this._onMomentumScrollEnd}
          onScrollEndDrag={this._onScrollEndDrag}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollAnim } } }],
            { useNativeDriver: true },
            )}
        >
          {this.props.children}
        </Animated.ScrollView>

        <Animated.View style={[styles.navbar, { transform: [{ translateY: navbarTranslate }] }]}>
          { backToHome ? null : 
            <HeaderBackButton 
              pressColorAndroid={Colors.dota_white}
              tintColor={Colors.dota_white}
              title={title} onPress={() => navigation.goBack()} 
            />
          }
          <Animated.Text style={[styles.title, { marginLeft: backToHome && 20, color: titleColor || Colors.dota_white }]}>
            {title}
          </Animated.Text>
          <ButtonHamburger />
        </Animated.View>
        <View style={styles.statusBar}></View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
  statusBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: STATUS_BAR_HEIGHT,
    backgroundColor: Colors.dota_ui1,
  },
  navbar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: Colors.dota_ui1,
    borderBottomColor: Colors.disabled,
    borderBottomWidth: 1,
    height: Header.HEIGHT+1,
    justifyContent: 'center',
    marginTop: STATUS_BAR_HEIGHT,
  },
  contentContainer: {
    paddingTop: NAVBAR_HEIGHT+STATUS_BAR_HEIGHT,
  },
  title: {
    flex: 1,
    ...Platform.select({
      android: {
        textAlign: 'left',
        fontSize: 20,
        fontWeight: '500',
      },
      ios: {
        textAlign: 'center',
        fontSize: 17,
        fontWeight: '700',
      },
    }),
  },
});