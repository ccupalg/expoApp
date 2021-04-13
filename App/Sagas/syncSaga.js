import { take, fork, select, call } from 'redux-saga/effects'

export function* syncAll() {
  const transformSnapShots = ({ snapshotsData, isCreator = false, isChats = false }) => {
    const res = []
    if (isChats)
      snapshotsData.forEach((doc) => doc.exists && res.push({ ...doc.data(), _id: doc.id }))
    else
      snapshotsData.forEach((doc) => doc.exists && res.push({ ...doc.data(), id: doc.id, isCreator }))
    return res
  }

  const userReducer = yield select((state) => state.userReducer)
  if (userReducer) {
    if (userReducer?.signedIn) {
      const userId = userReducer?.user?.userId

      // // syncing for joinedClasses starts
      // const joinClassesRef = firestore()
      //   .collection('classes')
      //   .where('peopleJoined.' + userId + '.user.userId', '==', userId)
      //   .where('isDeleted', '==', false)

      // // Listen to changes
      // const taskSyncJoinClasses = yield fork(rsf?.firestore?.syncCollection, joinClassesRef, {
      //   successActionCreator: (classes) => classes && ({ type: JOIN_CLASS, payload: classes }),
      //   failureActionCreator: console.log,
      //   transform: (snapshotsData) => transformSnapShots({ isCreator: false, snapshotsData }),
      // })
      // // syncing for joinedClasses ends

      // // syncing for chats starts
      // const chatsRef = firestore()
      //   .collection('oneToOneChats')
      //   .where('between', 'array-contains', userId)

      // // Listen to changes
      // const taskSyncChats = yield fork(rsf?.firestore?.syncCollection, chatsRef, {
      //   successActionCreator: (peopleChats) => peopleChats && ({ type: ALL_CHATS, payload: peopleChats }),
      //   failureActionCreator: console.log,
      //   transform: (snapshotsData) => transformSnapShots({ isChats: true, snapshotsData }),
      // })
      // // syncing for chats ends

      // // syncing for group chats starts
      // const commonDataStoreReducer = yield select((state) => state?.commonDataStoreReducer)

      // const classIdsArr = ['prevent_breaking', ...(map(commonDataStoreReducer?.joinedClasses, trjc => trjc?.id))]
      // console.log('classIdsArr??', classIdsArr)

      // const groupChatsRef = firestore()
      //   .collection('groupChats')
      // // .where('toClassId', 'in', classIdsArr) //TODO: old_classIds not getting updated just after creating classes new_dont fetch all message instead use proper filter, it is commented as it only supports length 10

      // // Listen to changes
      // const taskSyncGroupChats = yield fork(rsf?.firestore?.syncCollection, groupChatsRef, {
      //   successActionCreator: (groupChats) => groupChats && ({ type: ALL_GROUP_CHATS, payload: groupChats }),
      //   failureActionCreator: console.log,
      //   transform: (snapshotsData) => transformSnapShots({ isChats: true, snapshotsData }),
      // })
      // // syncing for group chats ends

      // Wait for the logout action, then stop sync so register all the tasks here to be cancelled
      yield take('LOGOUT')
      yield cancel(taskSyncJoinClasses)
      yield cancel(taskSyncChats)
      yield cancel(taskSyncGroupChats)
      //syncing ends
    }
  }
}