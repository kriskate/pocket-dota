import mocks from 'react-native-jest-mocks';
// mocks.initAll(); 

// jest.mock('WebView', () => 'WebView')


jest.mock("react-navigation", () => ({
  createStackNavigator: jest.fn(),
  createDrawerNavigator: jest.fn(),
  withNavigation: (component) => component,
  Header: {},
}));

jest.mock('ScrollView', () => jest.genMockFromModule('ScrollView'));
jest.mock('YellowBox', () => jest.genMockFromModule('YellowBox'));

jest.mock('Linking', () => ({
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  openURL: jest.fn(() => Promise.resolve()),
  canOpenURL: jest.fn(() => Promise.resolve()),
  getInitialURL: jest.fn(() => Promise.resolve()),
}));

jest.mock('NetInfo', () => {
  return {
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    getConnectionInfo: () => ({
      done: () => ({
        type: 'none',
      }),
    }),
  };
});


console.error = jest.fn();