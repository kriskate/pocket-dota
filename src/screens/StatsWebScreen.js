import React from 'react';
import { View, ActivityIndicator, StyleSheet, Platform, WebView } from 'react-native';
// import WebView from 'react-native-webview-autoheight';
import { Container } from '../components/ui';

import { headerStyleHidden } from '../utils/screen';
import { URL_ODOTA } from '../constants/Constants';
import Colors from '../constants/Colors';
import { showTip, APP_TIPS } from '../components/AppTips';
import { model_odota } from '../constants/Models';

import StatsWebScreenModal from '../components/modals/StatsWebScreenModal';
import StatsWebScreenToolbox from '../components/Stats/StatsWebScreenToolbox';
import Layout from '../constants/Layout';


const bkC = `background-color:${Colors.dota_ui1}!important;`;
const bkCL = `background-color:${Colors.dota_ui1_light}!important;`;
const bkC2 = `background-color:${Colors.dota_ui2}!important;`;
const jsString = `
  var timeout_linger;
  var timeout_linger_max = 15000;
  var timeout_linger_interval = 1000;
  var interval = 500;
  var currentHeight = 0;
  
  function clearLinger () {
    if(timeout_linger) {
      clearInterval(timeout_linger);
      timeout_linger = 0;
    }
  }
  function postHeight () {
    clearLinger();

    timeout_linger = setInterval(function() {
      var main = document.getElementById("root").childNodes[0];
      if(main.clientHeight !== currentHeight || main.scrollHeight !== currentHeight) {
        currentHeight = Math.max(main.clientHeight, main.scrollHeight);
  
        postMessage(JSON.stringify({
            height: currentHeight
        }));
      }
    }, timeout_linger_interval);

    setTimeout(clearLinger, timeout_linger_max);
  }


  function initHrefs () {
    Array.prototype.slice.call(document.getElementsByTagName('a')).forEach(function(el) {
      var href = el.href;
      el.href = "removeThis";
      
      if(el.getAttribute("name") == "removed") {
        return;
      }
      el.setAttribute("name", "removed");

      el.onclick = function(e) {
        e.preventDefault();
        
        postMessage(
          JSON.stringify({ newUrl: href })
        );
      }
    });
  }
  function initButtons () {
    Array.prototype.slice.call(document.getElementsByTagName('button')).forEach(function(el) {
      el.onclick = function(e) {
        setTimeout(function() {
          postHeight();
          initButtons();
        }, 500);
      }
    });
  }

  
  function handleNav () {  
    document.addEventListener("message", function(data) {
      
      postMessage(
        JSON.stringify({ data: data })
      );

      if(data == "back") {
        window.history.back();
      }
      if(data == "forward") {
        window.history.forward();
      }
    });

  }
  
  var initialized = false;
  function init () {
    if(initialized) return;
    initialized = true;

    handleNav();
    postHeight();
    initHrefs();

    initButtons();
  }
  setTimeout(init, 500);
  
  
  window.location.hash = 1;

  var head = document.getElementsByTagName("head")[0];

  var css = "body { ${bkC2} } #root { ${bkC2} background-image:none; } ul { ${bkC} } .gauge-container { ${bkC} } thead { ${bkCL} }";
  var style = document.createElement("style");
  style.appendChild(document.createTextNode(css));
  head.appendChild(style);

  var meta = document.createElement('meta'); 
  meta.setAttribute('name', 'viewport'); 
  meta.setAttribute('content', 'width=device-width, user-scalable=0');
  head.appendChild(meta);

  var main = document.getElementById("root").childNodes[0];

  main.childNodes[main.childNodes.length-2].remove();
  main.childNodes[main.childNodes.length-1].remove();
  main.childNodes[1].remove();
  main.childNodes[0].remove();

  function playerInfo() {
    var playerInfoDiv = document.getElementsByClassName('playerInfo')[0];
    if(playerInfoDiv) {
      playerInfoDiv.childNodes[2].remove();
      playerInfoDiv.childNodes[0].childNodes[1].remove();
      clearInterval(playerInfoInterval);
    }
  }
  var playerInfoInterval = setInterval(playerInfo, 200);
`


export default class StatsWebScreen extends React.Component {
  static navigationOptions = () => ({
    ...headerStyleHidden,
  });

  constructor(props) {
    super(props);

    showTip(APP_TIPS.PROFILE_ADD, 15);

    const initialSource = { uri: URL_ODOTA.PROFILE_WEB + props.navigation.state.params.player.account_id + '/overview' };

    this.view = React.createRef();
    this.state = {
      webviewHeight: Layout.window.height,
      isModalVisible: false,
      initialSource,
      source: initialSource,
      navigatedUrls: [initialSource.uri],
      navigatedIndex: 0,
    }
  }

  _renderLoading = () => (
    <View style={styles.activityWrapper}>
      <ActivityIndicator size='large' color={Colors.goldenrod} />
    </View>
  )

  _hideModal = () => this.setState({ isModalVisible: false });

  _goHome = () => {
    const { source, initialSource } = this.state;

    if(source.uri !== initialSource.uri) {
      this._navigateTo(initialSource.uri);
    }
  }
  _goBack = () => {
    const { navigatedIndex, navigatedUrls } = this.state;
    
    if(navigatedIndex > 0) {
      this.setState({
        source: { uri: navigatedUrls[navigatedIndex-1] },
        navigatedIndex: navigatedIndex-1,
        isLoading: true,
      });
    }
  }
  _goForward = () => {
    const { navigatedIndex, navigatedUrls } = this.state;
    
    if(navigatedIndex < navigatedUrls.length-1) {
      this.setState({
        navigatedIndex: navigatedIndex+1,
        source: { uri: navigatedUrls[navigatedIndex+1] },
        isLoading: true,
      });
    }
  }
  _showHelp = () => this.setState({ isModalVisible: true });
  
  
  _onMessage = (e) => {
    console.log(e.nativeEvent.data);
    const parsed = JSON.parse(e.nativeEvent.data);
    
    if(parsed.height) {
      this.setState({
        webviewHeight: parseInt(parsed.height),
      });
    }
    
    if(parsed.newUrl && parsed.newUrl !== this.state.source.uri) {
      this._navigateTo(parsed.newUrl);
    }
  }
  _navigateTo = (url) => {
    const { navigatedUrls, navigatedIndex } = this.state;

    navigatedUrls.splice(navigatedIndex + 1);
    navigatedUrls.push(url);
    
    this.setState({
      navigatedUrls,
      navigatedIndex: navigatedIndex + 1,
      source: { uri: url },
      isLoading: true,
    });
  }

  render() {
    const player = model_odota(this.props.navigation.state.params.player);
    const { 
      isModalVisible, webviewHeight, source, isLoading,
      navigatedIndex, navigatedUrls,
     } = this.state;

    const toolbox = <StatsWebScreenToolbox player={player}
      disabledBack={navigatedIndex == 0}
      disabledForward={navigatedIndex == navigatedUrls.length-1}
      goHome={this._goHome} goBack={this._goBack} goForward={this._goForward} showHelp={this._showHelp} />

    return (
      <View style={{flex:1}}>
        <StatsWebScreenModal visible={isModalVisible} hide={this._hideModal} />

        <Container
          scrollable header header_title={player.personaname} 
          stickyComponent={Platform.OS !== 'android' ? null : toolbox} 
        >
          { isLoading ? this._renderLoading() : null }
          <WebView
            ref={view => this.view = view}
            
            style={{ 
              height: webviewHeight,
              opacity: isLoading ? 0 : 1,
              position: isLoading ? 'absolute' : 'relative',
            }}
            onMessage={this._onMessage}
            onLoadEnd={()=>{
              // let react process the webpage for 200 ms, in order to apply the styles
              setTimeout(() => {
                this.setState({ isLoading: false });
              }, 200);
            }}
            scrollEnabled={false}

            startInLoadingState
            renderLoading={this._renderLoading}
            javaScriptEnabled
            injectedJavaScript={jsString}
            source={source}
          />
        </Container>

        { Platform.OS !== 'ios' ? null : toolbox }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  activityWrapper: {
    flex: 1,
    height: Layout.window.height-120,
    justifyContent: 'center',
  },
})