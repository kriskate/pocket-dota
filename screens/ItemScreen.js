import React from 'react';
import { Container, Content, Text, } from 'native-base';

import ButtonHamburger from '../components/ButtonHamburger';

export default class Screen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('itemName'),
    headerRight: <ButtonHamburger />,
  });

  render() {

    return (
      <Container>
        <Content padder>
          <Text>
            Item description
          </Text>
        </Content>
      </Container>
    );
  }
}