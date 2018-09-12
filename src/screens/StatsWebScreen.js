import React from 'react';
import { View, WebView, ActivityIndicator, StyleSheet, Platform } from 'react-native';
import { Container } from '../components/ui';

import { headerStyle } from '../utils/screen';
import { URL_ODOTA } from '../constants/Constants';
import Colors from '../constants/Colors';
import { showTip, APP_TIPS } from '../components/AppTips';
import { model_odota } from '../constants/Models';

import StatsWebScreenModal from '../components/modals/StatsWebScreenModal';
import StatsWebScreenToolbox from '../components/Stats/StatsWebScreenToolbox';


const bkC = `background-color:${Colors.dota_ui1}!important;`;
const bkCL = `background-color:${Colors.dota_ui1_light}!important;`;
const bkC2 = `background-color:${Colors.dota_ui2}!important;`;
const jsString = `
  var css = "body { ${bkC2} } #root { ${bkC2} background-image:none; } ul { ${bkC} } .gauge-container { ${bkC} } thead { ${bkCL} }";
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


export default class StatsWebScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    ...headerStyle,
    title: navigation.state.params.player.personaname,
    headerTruncatedBackTitle: 'Stats',
  });

  constructor(props) {
    super(props);

    showTip(APP_TIPS.PROFILE_ADD, 15);

    this.view = React.createRef();
    this.state = {
      isModalVisible: false,
    }
  }

  _renderLoading = () => (
    <View style={styles.activityWrapper}>
      <ActivityIndicator size='large' color={Colors.goldenrod} />
    </View>
  )

  _hideModal = () => this.setState({ isModalVisible: false });

  _goBack = () => this.view.goBack();
  _goForward = () => this.view.goForward();
  _showHelp = () => this.setState({ isModalVisible: true });

  render() {
    const player = model_odota(this.props.navigation.state.params.player);
    const source = { uri: URL_ODOTA.PROFILE_WEB + player.account_id + '/overview' };
    const { isModalVisible } = this.state;

    return (
      <Container>
        <StatsWebScreenModal visible={isModalVisible} hide={this._hideModal} />
        { Platform.OS !== 'android' ? null : 
          <StatsWebScreenToolbox player={player}
            goBack={this._goBack} goForward={this._goForward} showHelp={this._showHelp} />
        }
        <WebView
          style={styles.webView}
          ref={view => this.view = view}
          startInLoadingState
          renderLoading={this._renderLoading}
          javaScriptEnabled
          injectedJavaScript={jsString}
          source={source}
        />
        { Platform.OS !== 'ios' ? null : 
          <StatsWebScreenToolbox player={player}
            goBack={this._goBack} goForward={this._goForward} showHelp={this._showHelp} />
        }
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  webView: {
    backgroundColor: Colors.dota_ui2,
  },
  activityWrapper: {
    flex: 1,
    justifyContent: 'center',
  },
})