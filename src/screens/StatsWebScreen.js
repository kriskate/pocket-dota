import React from 'react';
import { View, WebView, ActivityIndicator, StyleSheet } from 'react-native';
import { Container, Text } from '../components/ui';

import { headerStyle } from '../utils/screen';
import { SCREEN_LABELS, URL_ODOTA } from '../constants/Constants';
import Colors from '../constants/Colors';
import { showTip, APP_TIPS } from '../components/AppTips';

const bkC = `background-color:${Colors.dota_ui1}!important;`;
const bkCL = `background-color:${Colors.dota_ui1_light}!important;`;
const bkC2 = `background-color:${Colors.dota_ui2}!important;`;
const jsString = `
  var css = "
    #root { ${bkC2} background-image:none; }
    ul { ${bkC} }
    .gauge-container { ${bkC} }
    thead { ${bkCL} }
  ";
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
    title: SCREEN_LABELS.STATS,
    ...headerStyle,
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
  render() {
    const { account_id } = this.props.navigation.state.params;
    const source = { uri: URL_ODOTA.PROFILE + account_id };

    return (
      <Container>
        <WebView
          startInLoadingState
          renderLoading={this._renderLoading}

          javaScriptEnabled
          injectedJavaScript={jsString}
          source={source}
        />        
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  wview: {
    backgroundColor: Colors.dota_ui2,
  },
  activityWrapper: {
    flex: 1,
    justifyContent: 'center',
  },
})