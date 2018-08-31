import React from 'react';
import { View, WebView, ActivityIndicator, StyleSheet, TextInput, Keyboard, TouchableWithoutFeedback, Image, FlatList } from 'react-native';
import { Container, Text, Button } from '../components/ui';

import { headerStyle } from '../utils/screen';
import { SCREEN_LABELS, URL_ODOTA, SCREEN_LABELS_HIDDEN } from '../constants/Constants';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import { model_odota } from '../constants/Models';
import { connect } from 'react-redux';
import { Actions } from '../reducers/profile';


class ProfileThumb extends React.PureComponent {
  render() {
    const { navigation, result } = this.props;
    const { account_id, avatarfull, last_match_time, personaname } = model_odota(result);
    const src = { uri: avatarfull.replace('_full','_medium'), cache: 'force-cache' };

    return (
      <Button style={styles.thumb_button} viewStyle={styles.thumb_buttonView}
          onPress={() => navigation.navigate(SCREEN_LABELS_HIDDEN.STATS_WEB, { player: {...result} })} >
        <Image source={src} style={styles.thumb_img} />
        <View style={styles.thumb_texts}>
          <Text style={styles.thumb_name}>{personaname}</Text>
          <Text style={styles.thumb_date}>{ !last_match_time ? '' : 'Last match: ' + new Date(last_match_time).toUTCString()}</Text>
        </View>
      </Button>

    )
  }
}
class Results extends React.PureComponent {
  _renderItem = ({item}) => <ProfileThumb result={item} navigation={this.props.navigation} />

  render() {
    const { search_results, navigation, submitted_text } = this.props;

    return (
      search_results == null
      ? <Container style={styles.resultsLoading}>
          <ActivityIndicator size='large' color={Colors.goldenrod} />
        </Container>
      : <Container scrollable padInner style={styles.results}>
        { search_results.length < 1
          ? <Text>Could not find any results for <Text style={{color: Colors.dota_white}}>{submitted_text}</Text>
            </Text>
          : <FlatList
              data={search_results}
              renderItem={this._renderItem}
              keyExtractor={item => item.account_id ? item.account_id.toString() : 'empty'}
            />
        }
        </Container>
    )
  }
}

@connect(
  (state => ({ lastSearch: state.profile.lastSearch })),
  (dispatch => ({ searchFor: submitted_text => dispatch(Actions.searchFor(submitted_text)) }) )
)
export default class StatsScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      submitted_text: '',
      search_results: null,
      search_text: props.lastSearch || '',
    }
  }
  static navigationOptions = ({ navigation }) => ({
    title: SCREEN_LABELS.STATS,
    ...headerStyle,
  });

  _handleSubmit = async () => {
    Keyboard.dismiss();
    const { search_text } = this.state;
    this.setState({ submitted_text: search_text, search_results: null });
    this.props.searchFor(search_text);

    const search_results = await (await fetch(URL_ODOTA.SEARCH + search_text)).json();
    this.setState({ search_results });
  }
  _handleChange = (search_text) => this.setState({ search_text })

  render() {
    const { search_results, submitted_text } = this.state;
    const { navigation } = this.props;

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container backToHome >
          <View style={styles.search}>
            <TextInput style={styles.searchBox}
              selectTextOnFocus
              placeholder='Type in profile name to look up'
              onSubmitEditing={this._handleSubmit}
              returnKeyType='search'
              enablesReturnKeyAutomatically
              onChangeText={this._handleChange}
              value={this.state.search_text}
            />
            <Button style={styles.searchButton} onPress={this._handleSubmit}><Text>Search</Text></Button>
          </View>
          { !submitted_text ? null : <Results navigation={navigation} submitted_text={submitted_text} search_results={search_results} /> }
        </Container>
      </TouchableWithoutFeedback>
    );
  }
}

const elemH = 38;
const styles = StyleSheet.create({
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Layout.padding_regular,
    marginVertical: Layout.padding_regular,
  },
  searchBox: {
    height: elemH,
    marginRight: Layout.padding_regular,
    backgroundColor: Colors.dota_white,
    padding: Layout.padding_regular,
    borderRadius: 5,
    flex: 1,
  },
  searchButton: {
    height: elemH,
    padding: Layout.padding_regular,
    backgroundColor: Colors.dota_ui1,
    borderRadius: 3,
  },

  results: {
    backgroundColor: Colors.dota_ui1,
    flex: 1,
  },
  resultsLoading: {
    backgroundColor: Colors.dota_ui1,
    justifyContent: 'center',
    flex: 1,
  },

  thumb_button: {
    paddingBottom: Layout.padding_small,
    marginBottom: Layout.padding_small,
    borderBottomColor: Colors.dota_ui2,
    borderBottomWidth: 1,
  },
  thumb_buttonView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  thumb_texts: {
    marginLeft: Layout.padding_small,
  },
  thumb_img: {
    width: 30,
    height: 30,
    borderRadius: 7,
  },
  thumb_name: {
    // color: Colors.dota_white,
  },
  thumb_date: {
    color: Colors.goldenrod,
    fontSize: 10,
  },
})