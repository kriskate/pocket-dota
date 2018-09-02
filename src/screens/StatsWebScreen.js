import React from 'react';
import { View, WebView, ActivityIndicator, StyleSheet, Platform } from 'react-native';
import { Container, Text, Button } from '../components/ui';

import { headerStyle } from '../utils/screen';
import { URL_ODOTA, ICONS, HELP_TEXTS, URLS } from '../constants/Constants';
import Colors from '../constants/Colors';
import { showTip, APP_TIPS } from '../components/AppTips';
import { connect } from 'react-redux';
import { Actions } from '../reducers/profile';
import { model_odota } from '../constants/Models';

import Layout from '../constants/Layout';
import Modal from 'react-native-modal';


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

    this.state = { loading: true };
  }
  render() {
    const { loading } = this.state;
    const { account_id, avatarfull, last_match_time, personaname } = this.props.player;

    if(loading) return <Text>{personaname}</Text>

    const { c_account_id, setProfile, } = this.props;

    return (
      <View style={styles.navigation_controls}>
        <Button prestyled forceTouchableOpacity style={ styles.buttonHeader }
            onPress={() => refs.view.goBack()}>
          <ICONS.BACK />
        </Button>
        <Button prestyled forceTouchableOpacity style={ styles.buttonHeader }
            onPress={() => refs.view.goForward()} >
          <ICONS.FORWARD />
        </Button>
        <Button prestyled forceTouchableOpacity style={[styles.buttonHeader, { borderColor: c_account_id == account_id ? Colors.goldenrod : Colors.dota_ui2 }]}
            onPress={() => {
              if(c_account_id !== account_id) {
                setProfile({ name: personaname, image: avatarfull, account_id, last_match_time });
                showTip(APP_TIPS.DOTA_PROFILE_ADDED);
              }
            }}>
          <ICONS.USER />
        </Button>
        <Button prestyled forceTouchableOpacity style={[styles.buttonHeader, styles.buttonHeader_info]}
          onPress={() => refs.screen.setState({ isModalVisible: true })}>
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
    headerTruncatedBackTitle: 'Stats',
  });

  constructor(props) {
    super(props);

    showTip(APP_TIPS.ADD_PROFILE, 15);

    this.state = {
      isModalVisible: false,
    }
  }

  _renderLoading = () => (
    <View style={styles.activityWrapper}>
      <ActivityIndicator size='large' color={Colors.goldenrod} />
    </View>
  )

  _onLoadEnd = () => {
    refs.screen = this;
    singleton && singleton.setState({ loading: false });
  }

  _hideModal = () => this.setState({ isModalVisible: false })

  render() {
    const { account_id } = model_odota(this.props.navigation.state.params.player);
    const source = { uri: URL_ODOTA.PROFILE + account_id + '/overview' };

    return (
      <Container>
        <Modal isVisible={this.state.isModalVisible}
          onBackdropPress={this._hideModal}
          onBackButtonPress={this._hideModal}
          onSwipe={this._hideModal} swipeDirection="down"
        >
          <Container style={Layout.modal_body}>
            <Text style={Layout.modal_header}>{HELP_TEXTS.HELP_HEADER}</Text>
            <Text style={styles.help_row} hasUrl URLS={URLS}>{HELP_TEXTS.HELP_CONTENT}</Text>

            { Object.keys(HELP_TEXTS).map(hText => {
              if(hText.split('_')[0] == "HELP") return;

              const IconComponent = ICONS[hText];
              const TextComponent = HELP_TEXTS[hText];

              return (
                <View key={hText} style={styles.help_row}>
                  <Button prestyled forceTouchableOpacity style={ styles.buttonHeader }><IconComponent /></Button>
                  <Text style={styles.help_text}>
                    { typeof TextComponent == 'string' 
                      ? TextComponent
                      : <TextComponent />
                    }
                  </Text>
                </View>
              )
            })}
            <Text>{HELP_TEXTS.HELP_DOTA_PROFILE}</Text>
            <Button prestyled style={Layout.modal_close_button}
              title="DONE"
              onPress={this._hideModal} />
          </Container>
        </Modal>
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
    justifyContent: 'center',
    marginLeft: Platform.OS === 'ios' ? 30 : 0,
  },
  buttonHeader: {
    marginHorizontal: Layout.isSmallDevice ? Layout.padding_small+2 : Layout.padding_big,
    padding: Layout.padding_small,
    paddingHorizontal: Layout.padding_regular,
    borderColor: Colors.dota_ui2,
    // icon size + buttonHeader padding + <Button margin
    height: 17 + Layout.padding_small*2 + Layout.padding_small,
    width: 17 + Layout.padding_small*2 + Layout.padding_small*2,
  },
  buttonHeader_info: {
    width: 'auto',
  },

  activityWrapper: {
    flex: 1,
    justifyContent: 'center',
  },

  help_row: {
    flexDirection: 'row',
    marginBottom: Layout.padding_big,
  },
  help_text: {
    flex: 1,
  },
})