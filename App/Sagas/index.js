import { takeLatest, fork, all } from 'redux-saga/effects'
import { startup } from './startupSaga'
import { STARTUP } from 'App/Stores/startupStore'
import { logOut } from './loginSaga'
import { LOG_OUT } from 'App/Stores/userStore'
import { syncAll } from "./syncSaga";
import { USER_IS_TEACHER, LOGIN_SUCCESS } from '../Stores/userStore'

export default function* root() {
  yield all([
    fork(startup),

    // To capture the actions...
    takeLatest(STARTUP, startup),
    takeLatest(LOGIN_SUCCESS, syncAll),
    takeLatest(LOG_OUT, logOut),
  ])
}
