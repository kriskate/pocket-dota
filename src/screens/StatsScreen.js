import React from 'react';
import { View, ActivityIndicator, StyleSheet, TextInput, Keyboard, TouchableWithoutFeedback, Image, FlatList } from 'react-native';
import { Container, Text, Button } from '../components/ui';

import { headerStyle } from '../utils/screen';
import { SCREEN_LABELS, URL_ODOTA, SCREEN_LABELS_HIDDEN } from '../constants/Constants';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import { model_odota } from '../constants/Models';
import { connect } from 'react-redux';
import { Actions } from '../reducers/profile';
import { showTip } from '../components/AppTips';
import RequiresConnection from '../utils/RequiresConnection';
import { withNamespaces } from 'react-i18next';


@withNamespaces("Screen_Stats")
class ProfileThumb extends React.PureComponent {
  render() {
    const { navigation, result, t } = this.props;
    const { account_id, avatarfull, last_match_time, personaname } = model_odota(result);
    const src = { uri: avatarfull.replace('_full','_medium'), cache: 'force-cache' };

    return (
      <Button style={styles.thumb_button} viewStyle={styles.thumb_buttonView}
          onPress={() => navigation.navigate(SCREEN_LABELS_HIDDEN.STATS_WEB, { data: {...result} })} >
        <Image source={src} style={styles.thumb_img} />
        <View style={styles.thumb_texts}>
          <Text style={styles.thumb_name}>{personaname}</Text>
          <Text style={styles.thumb_date}>{ !last_match_time ? '' : t("LastMatch") + " " + new Date(last_match_time).toUTCString()}</Text>
        </View>
      </Button>

    )
  }
}

@withNamespaces("Screen_Stats")
class Results extends React.PureComponent {
  constructor(props) {
    super(props);

    showTip("profileAddRequirements", 15);
  }
  _renderItem = ({item}) => <ProfileThumb result={item} navigation={this.props.navigation} />

  render() {
    const { lastSearch, lastSearchResults, t } = this.props;

    return (
      lastSearchResults == null
      ? <Container style={styles.resultsLoading}>
          <ActivityIndicator size='large' color={Colors.goldenrod} />
        </Container>
      : <Container scrollable padInner style={styles.results}>
        { lastSearchResults.length < 1
          ? <Text>{t("CouldNotFind")} <Text style={{color: Colors.dota_white, fontWeight: "bold" }}>{lastSearch}</Text>
            </Text>
          : <FlatList
              data={lastSearchResults}
              renderItem={this._renderItem}
              keyExtractor={item => item.account_id ? item.account_id.toString() : 'empty'}
            />
        }
        </Container>
    )
  }
}


@withNamespaces("Screen_Stats")
@connect(
  (state => ({ 
    lastSearch: state.profile.lastSearch,
    lastSearchResults: state.profile.lastSearchResults,
  })),
  (dispatch => ({ 
    searchFor: submitted_text => dispatch(Actions.searchFor(submitted_text)),
    searchForResults: results => dispatch(Actions.searchForResults(results)),
  }) )
)
export default class StatsScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
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
    this.props.searchFor(search_text);
    this.props.searchForResults(null);

    const lastSearchResults = await (await fetch(URL_ODOTA.SEARCH + search_text)).json();

    this.props.searchForResults(lastSearchResults);
  }
  _handleChange = (search_text) => this.setState({ search_text })

  render() {
    const { lastSearch, lastSearchResults, navigation, t, } = this.props;
    const { search_text } = this.state;

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <RequiresConnection>
        <Container backToHome >
          <View style={styles.search}>
            <TextInput style={styles.searchBox}
              selectTextOnFocus
              placeholder={t("TypeProfileName")}
              onSubmitEditing={this._handleSubmit}
              returnKeyType='search'
              enablesReturnKeyAutomatically
              onChangeText={this._handleChange}
              value={search_text}
            />
            <Button style={styles.searchButton} onPress={this._handleSubmit}><Text>{t("Search")}</Text></Button>
          </View>
          { !lastSearch ? null : <Results navigation={navigation} lastSearch={lastSearch} lastSearchResults={lastSearchResults} /> }
        </Container>
        </RequiresConnection>
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