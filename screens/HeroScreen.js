import React from 'react';
import { Container, Content, Text, } from 'native-base';

import ButtonHamburger from '../components/ButtonHamburger';

export default class Screen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('hero').name,
    headerRight: <ButtonHamburger />,
  });

  render() {
    const hero =  this.props.navigation.getParam('hero');

    return (
      <Container>
        <Content padder>
          <Text>
            {hero.name}
          </Text>
        </Content>
      </Container>
    );
  }
}