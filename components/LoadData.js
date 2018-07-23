import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Separator } from './ui';
import { getStatusBarHeight } from 'react-native-status-bar-height';


export default class LoadData extends React.PureComponent {
  state = {
    progressData: 50,
    progressPictures: 50,
  }

  render() {
    const { progressData, progressPictures } = this.state;
    
    return (
      <View style={{ paddingTop: getStatusBarHeight() }}>

        <Text>{ this.props.text }</Text>

        <Separator />

        <View>
          <Text style={styles.label}>Downloading hero data files ({progressData}%)</Text>
          {/* <ProgressBarAnimated
            width={barWidth}
            value={this.state.progress}
            backgroundColorOnComplete="#6CC644"
          /> */}
        </View>

        <Separator />

        <View>
          <Text style={styles.label}>Downloading images ({progressPictures}%)</Text>
          {/* <ProgressBarAnimated
            width={barWidth}
            value={this.state.progressWithOnComplete}
            backgroundColorOnComplete="#6CC644"
          /> */}
        </View>
        
      </View>
    )
    
  }
}


const styles = StyleSheet.create({
  label: {
    color: '#999',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 10,
  }
})