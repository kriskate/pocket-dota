import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import { store_simple } from './__setup__/config';
import Updater from '../src/Updater';


it('renders the component', async () => {
  const tree = renderer.create(<Updater store={store_simple}/>).toJSON();
  expect(tree).toMatchSnapshot();
});
