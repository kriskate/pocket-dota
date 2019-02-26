import { Amplitude } from 'expo';
// import { normalizeTrackingOptions } from './AnalyticsUtils';
import { AMPLITUDE_API_KEY } from 'react-native-dotenv';
import { ActionTypes } from '../reducers/profile';

const events = {
  HERO: {
    CHANGED_LEVEL: "CHANGED_LEVEL",
  },

  navigation: (to: ?string) => `Navigation: ${to}`,

  language: (to: ?string) => `Language: ${to}`,

  TIP: {
    DISMISSED: 'Tip dismissed',
    NEVER_SHOW: 'Tip never show',
  },
};


let isInitialized = false;

const initialize = () => {
  // if (__DEV__ || !AMPLITUDE_API_KEY) return;

  Amplitude.initialize(AMPLITUDE_API_KEY);
  isInitialized = true;
};

const maybeInitialize = () => {
  if (AMPLITUDE_API_KEY && !isInitialized) {
    initialize();
  }
};

const identify = (id: ?string, options?: ?Object = null) => {
  maybeInitialize();
  // options = normalizeTrackingOptions(options);

  if (id) {
    Amplitude.setUserId(id);
    if (options) {
      Amplitude.setUserProperties(options);
    }
  } else {
    Amplitude.clearUserProperties();
  }
};

const track = (event: string, options: any = null) => {
  maybeInitialize();
  // options = normalizeTrackingOptions(options);

  if (options) {
    Amplitude.logEventWithProperties(event, options);
  } else {
    Amplitude.logEvent(event);
  }
};

export default {
  events,
  track,
  identify,
};