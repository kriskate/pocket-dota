import React from 'react';
import { withNavigation } from 'react-navigation';

import { Button, Icon } from 'native-base';

export default withNavigation(({ navigation }) => <Button transparent onPress={() => navigation.openDrawer()}><Icon name='menu' /></Button>);