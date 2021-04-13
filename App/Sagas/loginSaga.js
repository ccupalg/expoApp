import { put, call, take } from 'redux-saga/effects'
import { flatten, isArray } from 'lodash'

export function* waitAll(actionList) {
  const allActions = flatten(actionList)
  let wait = true

  while (wait) {
    console.log('Waiting for all actions to complete...', actionList)
    const action = yield take(allActions)

    // Remove the completed action from actionList
    actionList = actionList.filter((a) => {
      if (isArray(a)) {
        return !a.find((subA) => subA == action.type)
      }
      return a != action.type
    })
    console.log('Got action...', action, actionList)
    if (!actionList.length) {
      wait = false
    }
  }

  console.log('All actions received...')
}

export function* logOut() {
  try {
    // yield call(auth().signOut())
    console.log('Logged out done.')
  } catch (e) {
    // an error
    console.log('Err??', e)
  }
  yield put({ type: 'STARTUP' })
}
