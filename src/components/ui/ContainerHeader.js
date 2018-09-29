import React, { Component } from 'react';
import { Animated, Platform, StyleSheet, View } from 'react-native';
import Colors from '../../constants/Colors';
import ButtonHamburger from '../ButtonHamburger';
import { withNavigation, HeaderBackButton } from 'react-navigation';

const NAVBAR_HEIGHT = Platform.select({ ios: 44, android: 56 });
const STATUS_BAR_HEIGHT = Platform.select({ ios: 20, android: 24 });

@withNavigation
export default class ContainerHeader extends Component {
  constructor(props) {
    super(props);

    const scrollAnim = new Animated.Value(0);
    const offsetAnim = new Animated.Value(0);

    this.state = {
      headerHeight: NAVBAR_HEIGHT+1,
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
        NAVBAR_HEIGHT/* - STATUS_BAR_HEIGHT*/,
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
        NAVBAR_HEIGHT/* - STATUS_BAR_HEIGHT*/,
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
      this._clampedScrollValue > (NAVBAR_HEIGHT - STATUS_BAR_HEIGHT) / 2
      ? this._offsetValue+ NAVBAR_HEIGHT
      : this._offsetValue - NAVBAR_HEIGHT;

    Animated.timing(this.state.offsetAnim, {
      toValue,
      duration: 350,
      useNativeDriver: true,
    }).start();
  };

  _onHeaderLayout = (event) => {
    const { height } = event.nativeEvent.layout;
    this.setState({ headerHeight: Math.round(height) });
  }

  render() {
    const { navigation, backToHome, title, titleColor, stickyComponent=null } = this.props;
    const { clampedScroll } = this.state;

    const navbarTranslate = clampedScroll.interpolate({
      inputRange: [0, NAVBAR_HEIGHT/* - STATUS_BAR_HEIGHT*/],
      outputRange: [0, -(NAVBAR_HEIGHT/* - STATUS_BAR_HEIGHT*/)],
      extrapolate: 'clamp',
    });

    return (
      <View style={styles.fill}>
        <Animated.ScrollView
          contentContainerStyle={{ paddingTop: this.state.headerHeight + STATUS_BAR_HEIGHT }}
          
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

        <Animated.View style={[styles.navbar, { transform: [{ translateY: navbarTranslate }] }]}
            onLayout={this._onHeaderLayout}>
          <Animated.View style={[ styles.navbarHeader, stickyComponent ? borderBottom : null ]}>
            { backToHome ? null : 
              <HeaderBackButton 
                pressColorAndroid={Colors.dota_white}
                tintColor={Colors.dota_white}
                onPress={() => navigation.goBack()} 
              />
            }
            <Animated.Text adjustsFontSizeToFit style={[styles.title, { marginLeft: backToHome && 20, color: titleColor || Colors.dota_white }]}>
              {title}
            </Animated.Text>
            <ButtonHamburger />
          </Animated.View>
          { stickyComponent }
        </Animated.View>
        <View style={styles.statusBar}></View>

      </View>
    );
  }
}

const borderBottom = {
  borderBottomColor: Colors.disabled + '90',
  borderBottomWidth: 1,
};
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
    elevation: 11,
  },
  navbarHeader: {
    height: NAVBAR_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 1,
  },
  navbar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.dota_ui1,
    marginTop: STATUS_BAR_HEIGHT,
    borderBottomColor: Colors.disabled,
    borderBottomWidth: 1,

    ...Platform.select({
      ios: {
        shadowOffset:{  height: 3,  },
        shadowColor: 'black',
        shadowOpacity: 0.2,
      },
      android: {
        elevation: 10,
      }
    })
  },
  contentContainer: {
    paddingTop: NAVBAR_HEIGHT + STATUS_BAR_HEIGHT,
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