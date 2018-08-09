import React from 'react';
import { Container, Text } from '../components/ui';

import { headerStyle } from '../utils/screen';


export default class ItemScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('itemName'),
    ...headerStyle,
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