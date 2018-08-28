import React from 'react';
import { Card, Text, ListThumb } from '../ui';
import { connect } from 'react-redux';
import { url } from '../../constants/Data';
import { StyleSheet, View } from 'react-native';

import { Svg } from 'expo';
import Layout from '../../constants/Layout';
import Colors from '../../constants/Colors';
import { withNavigation } from 'react-navigation';
import { SCREEN_LABELS_HIDDEN } from '../../constants/Constants';
const { Line,} = Svg;

@withNavigation
@connect(state => ({
  items: state.wiki.items,
}))
export default class ItemComponents extends React.PureComponent {
  state = {
    svg: {
      width: 1,
      height: 1,
    },
    thumbs: {
    },
  }
  _onLayoutThumb = (component, e) => {
    const { x, width } = e.nativeEvent.layout;

    this.setState({
      thumbs: {
        ...this.state.thumbs,
        [component]: { x, width },
      }
    })
  }
  _onLayout = (e) => {
    this.setState({
      svg: {
        width: e.nativeEvent.layout.width,
        height: e.nativeEvent.layout.height,

        x_start: e.nativeEvent.layout.width/2 - (Layout.padding_regular + 1), // Card padding and borderWidth
        y_start: thumbHeight + Layout.padding_small, // thumb height and margin
        y_mid: thumbHeight + Layout.padding_small + Layout.padding_big,
        y_end: thumbHeight + Layout.padding_small + Layout.padding_big + Layout.padding_big,
      },
    })
  }
  _getSVG = () => {
    const { width, height, x_start, y_start, y_mid, y_end } = this.state.svg;

    return {
      line: {
        stroke: Colors.dota_white, strokeWidth: "2",
      },
      line1: {
        x1: x_start, y1: y_start, x2: x_start,y2: y_mid,
      },
      horizontal: (toX) => ({
        x1: x_start, y1: y_mid, x2: toX, y2: y_mid,
      }),
      vertical: (x) => ({
        x1: x, y1: y_mid, x2: x, y2: y_end,
      }),
    }
  }
  render() {
    const { current_item, items, navigation } = this.props;
    const { components, recipeCost, tag, name } = current_item;
    const { width, height } = this.state.svg;
    
    const svg = this._getSVG();

    return (
      <Card style={styles.containerWrapper} onLayout={this._onLayout}>
        <ListThumb key={tag}
          imgSource={{ uri: url.images.items(tag) }}
          imgSize={{ width: thumbWidth, height: thumbWidth/imgRatio }}
          width={thumbWidth}
        />


        <Svg style={{position: 'absolute'}} 
          width={width} height={height}
          viewBox={`0 0 ${width} ${height}`}
        >
          <Line {...svg.line} {...svg.line1} />
          { Object.keys(this.state.thumbs).map(component => {
            const { x, width } = this.state.thumbs[component];

            return [
              <Line key={x.toString() + '_horizontal'} {...svg.line}
                {...svg.horizontal(x + width/2)} />,
              <Line key={x.toString() + '_vertical'} {...svg.line}
                {...svg.vertical(x + width/2)} />
            ]
          })}
        </Svg>


        <View style={styles.container}>
          { components.map((component, idx) => {
            const item = items.find(({ tag }) => tag == component.replace('item_', ''));
            const { tag, cost, name } = item;

            return (
              <ListThumb key={tag + idx} onLayout={(e) => this._onLayoutThumb(tag+idx, e)}
                cost={cost}
                imgSource={{ uri: url.images.items(tag) }}
                imgSize={{ width: thumbWidth, height: thumbWidth/imgRatio }}
                onPress={() => navigation.navigate(SCREEN_LABELS_HIDDEN.ITEM, { data: item })}
                width={thumbWidth}
              />
            )
          }) }
          { !recipeCost || recipeCost == "0" ? null :  
              <ListThumb key={'recipe'} onLayout={(e) => this._onLayoutThumb('recipe', e)}
                cost={recipeCost}
                imgSource={{ uri: url.images.items('recipe') }}
                imgSize={{ width: thumbWidth, height: thumbWidth/imgRatio }}
                width={thumbWidth}
              />
          }
        </View>
      </Card>
    )
  }
}

const imgRatio = 88/64;
const thumbWidth = 60;
const thumbHeight = thumbWidth/imgRatio;


const styles = StyleSheet.create({
  containerWrapper: {
    marginHorizontal: 0,
  },
  container: {
    marginTop: Layout.padding_regular*2,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
})