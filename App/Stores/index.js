import { combineReducers } from 'redux'
import reduceReducers from 'reduce-reducers'
import configureStore from 'App/Stores/createStore'
import rootSaga from 'App/Sagas'
import { userReducer } from 'App/Stores/userStore'
import { startupReducer } from 'App/Stores/startupStore'
import { commonDataStoreReducer } from 'App/Stores/commonDataStore'

export default () => {
  const rootReducer = reduceReducers(
    combineReducers({
      /**
       * Register your reducers here.
       * @see https://redux.js.org/api-reference/combinereducers
       */
      startupReducer,
      userReducer,
      commonDataStoreReducer,
    }),
  )
  return configureStore(rootReducer, rootSaga)
}
