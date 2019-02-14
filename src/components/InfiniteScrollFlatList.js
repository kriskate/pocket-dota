import React from 'react';
import { FlatList } from 'react-native';
import PropTypes from 'prop-types';


export default class InfiniteScollFlatList extends React.Component {

  constructor(props) {
    super(props);
    
    const { data: allData, onScrollEndLoadCount } = props;
    this.state = {
      allData,
      loadedData: allData.slice(0, onScrollEndLoadCount),
    }
  }
  
  _loadMore = () => {
    const { allData, loadedData } = this.state;
    if(allData.length == loadedData.length) return;
    const { onScrollEndLoadCount } = this.props;
    
    this.setState({
      loadedData: loadedData.concat(allData.slice(loadedData.length, loadedData.length + onScrollEndLoadCount))
    })
  }

  render() {
    const { loadedData } = this.state;

    return (
      <FlatList {...this.props} 
        data={loadedData}
        onEndReached={this._loadMore}
        onEndReachedThreshold={0.1}
      />
    )
  }
}

InfiniteScollFlatList.propTypes = {
  data: PropTypes.array,
  onScrollEndLoadCount: PropTypes.number,
}
InfiniteScollFlatList.defaultProps = {
  onScrollEndLoadCount: 5,
}