// to-do: have a default placeholder for images
// to-do: get image path synchronously, through a reducer maybe?
// to-do state.stopCache way of cancelling setState does not work because of React's synchronous nature

import React from 'react';
import { Image as RNImage, View } from 'react-native';
// import { CacheManager } from 'react-native-expo-image-cache';
import Colors from '../../constants/Colors';


export default class Image extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      source: props.source.uri ? null : props.source,
    }
  }

  async componentDidMount() {
    if(this.state.source) return;

    // if source.uri is present, check the cache for it
    const { source } = this.props;
    
    // const path = await CacheManager.get(source.uri).getPath();
    // this.setState({ source: { uri: path }} );
    this.setState({ source });
  }
  render() {
    const { source } = this.state;
    const { style } = this.props;
    const width = style ? style.width : undefined;
    const height = style ? style.height : undefined;

    if(!source) return <View style={{ width, height, backgroundColor: Colors.dota_ui2 }}></View>

    return <RNImage {...this.props} source={source} />
  }  
}
