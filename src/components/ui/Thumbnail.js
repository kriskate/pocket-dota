import React from 'react'
import { Image, StyleSheet } from 'react-native';

export default class Thumbnail extends React.Component {
  render() {
    const { round } = this.props;

    return <Image {...this.props} style={round ? [styles.thumb, styles.round] : styles.thumb} />
  }
}


const styles = StyleSheet.create({
  thumb: {
    borderWidth:1,
    borderColor:'rgba(0,0,0,0.2)',
    width: 80,
    height: 80,
    margin: 10,
  },
  round: {
    borderRadius:40,
  },
})