import React from 'react';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import Navigator from './src/screens/Navigator';

import {useColorScheme, SafeAreaView, StatusBar} from 'react-native';
import {View} from 'react-native/types';

import {Provider} from 'react-redux';
import {persistor, store} from './config/store';
import {PersistGate} from 'redux-persist/integration/react';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Navigator />
      </PersistGate>
    </Provider>
  );
}

export default App;
