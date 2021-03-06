import Analytics from './Analytics';

const getActiveRouteName = (navigationState) => {
  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];
  // dive into nested navigators
  if (route.routes) {
    return getActiveRouteName(route);
  }
  return route.routeName;
}
export const onNavigationStateChange = (prevState, currentState) => {
  const currentScreen = getActiveRouteName(currentState);
  const prevScreen = getActiveRouteName(prevState);
  
  if (prevScreen !== currentScreen) {
    Analytics.track(Analytics.events.navigation(currentScreen), { previousScreen: prevScreen });
  }
}

export const navigationPersistenceKey = __DEV__ ? "NavigationStateDEV" : null;

