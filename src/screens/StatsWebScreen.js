import React from 'react';
import { View, WebView, ActivityIndicator, StyleSheet, Platform } from 'react-native';
import { Container, Text, Button } from '../components/ui';

import { headerStyle } from '../utils/screen';
import { SCREEN_LABELS, URL_ODOTA, ICONS } from '../constants/Constants';
import Colors from '../constants/Colors';
import { showTip, APP_TIPS } from '../components/AppTips';
import { connect } from 'react-redux';
import { Actions } from '../reducers/profile';
import { model_odota } from '../constants/Models';

import Layout from '../constants/Layout';


const bkC = `background-color:${Colors.dota_ui1}!important;`;
const bkCL = `background-color:${Colors.dota_ui1_light}!important;`;
const bkC2 = `background-color:${Colors.dota_ui2}!important;`;
const jsString = `
  var css = "#root { ${bkC2} background-image:none; } ul { ${bkC} } .gauge-container { ${bkC} } thead { ${bkCL} }";
  var head = document.getElementsByTagName("head")[0];
  var style = document.createElement("style");
  style.appendChild(document.createTextNode(css));
  head.appendChild(style);

  var main = document.getElementById("root").childNodes[0];

  main.childNodes[main.childNodes.length-2].remove();
  main.childNodes[main.childNodes.length-1].remove();
  main.childNodes[1].remove();
  main.childNodes[0].remove();
`

const refs = { view: {} };

let singleton;

@connect(
  (state => ({
    c_account_id: state.profile.user.account_id,
    user: state.profile.user,
  })),
  (dispatch => ({
    setProfile: (user) => dispatch(Actions.setUser(user)),
  }))
)
class NavigationControls extends React.PureComponent {
  constructor(props) {
    super(props);

    singleton = this;

    this.state = { loading: false };
  }
  render() {
    const { loading } = this.state;
    const { account_id, avatarfull, last_match_time, personaname } = this.props.player;

    if(loading) return <Text>{personaname}</Text>

    const { c_account_id, setProfile, } = this.props;

    return (
      <View style={styles.navigation_controls}>
        <Button prestyled style={ styles.buttonHeader }
            onPress={() => refs.view.goBack()}>
          <ICONS.BACK />
        </Button>
        <Button prestyled style={ styles.buttonHeader }
            onPress={() => refs.view.goForward()} >
          <ICONS.FORWARD />
        </Button>
        <Button prestyled style={[styles.buttonHeader, { borderColor: c_account_id == account_id ? Colors.goldenrod : Colors.dota_ui2 }]}
            onPress={() => {
              if(c_account_id !== account_id) {
                setProfile({ name: personaname, image: avatarfull, account_id, last_match_time });
                showTip(APP_TIPS.DOTA_PROFILE_ADDED);
              }
            }}>
          <ICONS.USER />
        </Button>
        <Button prestyled style={styles.buttonHeader}
          onPress={() => {}}>
          <ICONS.INFO />
        </Button>
      </View>
    )
  }
}



export default class StatsWebScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    ...headerStyle,
    headerTitle: <NavigationControls player={navigation.state.params.player} />,
  });

  constructor(props) {
    super(props);

    showTip(APP_TIPS.ADD_PROFILE, 15);
  }

  _renderLoading = () => (
    <View style={styles.activityWrapper}>
      <ActivityIndicator size='large' color={Colors.goldenrod} />
    </View>
  )

  _onLoadEnd = () => {
    singleton && singleton.setState({ loading: false });
  }
  render() {
    const { account_id } = model_odota(this.props.navigation.state.params.player);
    const source = { uri: URL_ODOTA.PROFILE + account_id + '/overview' };

    return (
      <Container>
        <WebView
          ref={el => refs.view = el}
          startInLoadingState
          renderLoading={this._renderLoading}
          onLoadEnd={this._onLoadEnd}
          javaScriptEnabled
          injectedJavaScript={jsString}
          source={source}
        />        
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  navigation_controls: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: Platform.OS === 'ios' ? 'flex-start' : 'center',
    margin: 0,
  },
  buttonHeader: {
    padding: Layout.padding_small,
    paddingHorizontal: Layout.padding_regular,
    borderColor: Colors.dota_ui2,
  },
  activityWrapper: {
    flex: 1,
    justifyContent: 'center',
  },
})