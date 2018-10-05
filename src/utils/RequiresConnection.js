import React from 'react';
import { NetInfo, StyleSheet, Text, View } from 'react-native';
import Colors from '../constants/Colors';
import { Button } from '../components/ui';

const offlineText = `There seems to be a problem with your internet connection. 
This section is only available when connected to the internet.

You may still hide this message and display the content, but navigating through this section would lead to nowhere.`;

export default class RequiresConnection extends React.Component {
  state = {
    isConnected: true,
    forceDismiss: false,
  }

  onConnectionChange = ({ type }) => this.setState({ isConnected: type !== 'none' });

  componentDidMount () {
    NetInfo.getConnectionInfo().done((info) => this.onConnectionChange(info));

    NetInfo.addEventListener('connectionChange', this.onConnectionChange);
  }
  componentWillUnmount () {
    NetInfo.removeEventListener('connectionChange', this.onConnectionChange);
  }

  render () {
    const { isConnected, forceDismiss } = this.state;
    return (
      <View style={styles.wrapper}>
        {this.props.children}
        {isConnected || forceDismiss ? null :
          <View style={styles.container}>
            <Text style={styles.connectionProblemMessage}>{offlineText}</Text>
            <Button prestyled title='dismiss' onPress={() => this.setState({ forceDismiss: true })} />
          </View>
        }
      </View>
    )
  }
}

var styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.dota_ui2,
    opacity: 0.9,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },

  connectionProblemMessage: {
    color: Colors.dota_white,
    padding: 24,
    textAlign: 'center'
  }
})