import React from 'react';
import { View, StyleSheet, FlatList, LayoutAnimation, Image } from 'react-native';
import { connect } from 'react-redux';
import { Container, Text, Button } from '../components/ui';

import { headerStyle, animation } from '../utils/screen';
import { ICONS } from '../constants/Constants';
import Layout from '../constants/Layout';
import { url } from '../constants/Data';
import { withNamespaces } from 'react-i18next';
import i18next from 'i18next';


class Section extends React.Component {
  state = { open: false }

  toggleOpen = () => {
    LayoutAnimation.configureNext(animation.standard);

    this.setState({ open: !this.state.open })
  }
  render() {
    const { data, title, wiki_heroes } = this.props;
    const { open } = this.state;

    const _data = !wiki_heroes ? data : Object.keys(data);

    return (
      <View style={styles.section}>
        <Button prestyled onPress={this.toggleOpen} style={styles.sectionTitle}>
          <Text>{title}</Text>
          <Text>
            {open 
              ? <ICONS.DROPUP />
              : <ICONS.DROPDOWN />
            }
          </Text>
        </Button>
        
        { !open ? null :
          <View style={styles.sectionContent}>
            <FlatList data={_data} keyExtractor={(item, index) => title + index}
              renderItem={({item}) => {

                if(!wiki_heroes) return <Text style={styles.sectionText}>{item}</Text>
                
                const hero = wiki_heroes.find(h => h.tag == item);

                return (
                  <View style={styles.sectionHero}>
                    <View style={{ flexDirection: 'row' }}>
                      <Image style={styles.sectionHeroImage} source={{ uri: url.images.icons(item) }} />
                      <Text> {hero ? hero.name : item}</Text>
                    </View>

                    { data[item].map((tip, idx) => (
                      <Text key={item+idx} style={styles.sectionText}>{tip}</Text>
                    )) }

                  </View>
                )

              }}
            />
          </View>
        }
      </View>
    )
  }
}

@withNamespaces("Screen_Tips")
@connect(state => ({
  tips: state.wiki.tips,
  wiki_heroes: state.wiki.heroes,
}))
export default class TipsScreen extends React.Component {
  static navigationOptions = () => ({
    title: i18next.t("Constants:SCREEN_LABELS.TIPS"),
    ...headerStyle,
  });

  render() {
    const { tips, wiki_heroes, t } = this.props;
    const { introduction, universal, beginner, intermediate, advanced, hero } = tips;

    return (
      <Container scrollable backToHome>

        <Section title={t("Label_Introduction")} data={introduction} />
        <Section title={t("Label_Universal")} data={universal} />
        <Section title={t("Label_Beginner")} data={beginner} />
        <Section title={t("Label_Intermediate")} data={intermediate} />
        <Section title={t("Label_Advanced")} data={advanced} />

        <Section title={t("Label_Heroes")} data={hero} wiki_heroes={wiki_heroes} />

      </Container>
    );
  }
}


const styles = StyleSheet.create({
  section: {
    marginTop: Layout.padding_regular,
  },
  sectionTitle: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  sectionContent: {
    padding: Layout.padding_regular,
    paddingVertical: Layout.padding_small,
  },
  sectionText: {
    paddingVertical: Layout.padding_small,
  },
  sectionHero: {
    paddingVertical: Layout.padding_small,
  },
  sectionHeroImage: {
    width: 20,
    height: 20,
  },
})