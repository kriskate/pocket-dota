import React from 'react';
import { connect } from 'react-redux';
import Updater from './Updater';
import InitialLanguageSelector from './components/Settings/InitialLanguageSelector';

export default connect(state => ({
  isInitialLanguageSet: state.wiki.isInitialLanguageSet,
}))( 
  ({ isInitialLanguageSet }) => isInitialLanguageSet 
    ? <Updater /> 
    : <InitialLanguageSelector />
)