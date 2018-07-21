import React from 'react'
import { Header as NavigationHeader } from 'react-navigation'
import { Header, Title, Button, Icon, Left, Right, Body } from 'native-base'
import { getStatusBarHeight } from 'react-native-status-bar-height'


export default props => (
  <Header style={{ marginTop: getStatusBarHeight() }}>
    { !props.hasBack ? null :
      <Left>
        <Button transparent onPress={() => props.navigation.goBack(null)}>
          <Icon name="ios-arrow-back" />
        </Button>
      </Left> }

    <Body>
      <Title>{props.title}</Title>
    </Body>
    <Right>
      <Button
        transparent
        onPress={() => props.navigation.openDrawer()}
      >
        <Icon name="ios-menu" />
      </Button>
    </Right>
  </Header>
)