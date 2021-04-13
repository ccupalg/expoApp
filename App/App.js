import React from 'react'
import { Provider } from 'react-redux'
import createStore from 'App/Stores'
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper'
import AppNavigator from 'App/Navigators/AppNavigator'
import SplashScreen from 'App/Containers/SplashScreen'
import { PersistGate } from 'redux-persist/lib/integration/react'
import { Config } from 'App/Config'

import Icon from 'react-native-vector-icons/MaterialIcons'

Icon.loadFont();

// const entireScreenWidth = Dimensions.get('window').width;

// Initializes the async storage.
require('App/Services/asyncStorageService.js')

console.disableYellowBox = true

if (Config.LIVE) {		//prevent showing console in production or live mode
  console.log = () => { }
}

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: Config.PRIMARY_COLOR || '#00c853',
    accent: '#f1c40f',
  },
}

const { store, persistor } = createStore()

export default () => {
  return (
    /**
     * @see https://github.com/reduxjs/react-redux/blob/master/docs/api.md#provider-store
     */
      <Provider store={store}>
        <PersistGate loading={<SplashScreen />} persistor={persistor}>
          <PaperProvider theme={theme}>
            <AppNavigator />
          </PaperProvider>
        </PersistGate>
      </Provider>
  )
}
