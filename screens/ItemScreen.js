import React from 'react';
import { Container, Text } from '../components/ui';

import ButtonHamburger from '../components/ButtonHamburger';

export default class Screen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('itemName'),
    headerRight: <ButtonHamburger />,
  });

  render() {

    return (
      <Container>
          <Text>
            Item description
          </Text>>
      </Container>
    );
  }
}