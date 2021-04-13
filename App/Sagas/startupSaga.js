import { call, take, put, select, fork } from 'redux-saga/effects'
import { STARTUP } from 'App/Stores/startupStore'
import { navigateAndReset } from 'App/Services/navService'
import { syncAll } from "./syncSaga";

/**
 * The startup saga is the place to define behavior to execute when the application starts.
 */
export function* startup() {
  // Dispatch a redux action using `put()`
  // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html

  yield take(STARTUP)
  // Check if user is already logged in
  const userReducer = yield select((state) => state.userReducer)

  if (userReducer) {
    if (!userReducer?.signedIn) {
      navigateAndReset('LoginScreen')
    } else if (userReducer?.isTeacher || userReducer?.isStudent || userReducer?.isParent) {
      navigateAndReset('HomeScreen')
    } else {
      navigateAndReset('WhoAreYou')
    }

    yield call(syncAll)
  }
}
