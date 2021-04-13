import { createAction } from 'redux-actions'

/**
 * The initial values for the redux state.
 */
export const INITIAL_STATE = {
  user: {},
  isAdmin: false,
  inProgress: false,
  signedIn: false,
  isTeacher: false,
  isStudent: false,
  isParent: false,
  relogin: false,
  errMsg: '',
}

// Types
export const LOGIN = 'LOGIN'
export const LOGIN_FAILED = 'LOGIN_FAILED'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_IN_PROGRESS = 'LOGIN_IN_PROGRESS'
export const UPDATE_RELOGIN = 'UPDATE_RELOGIN'
export const USER_IS_ADMIN = 'USER_IS_ADMIN'
export const USER_IS_TEACHER = 'USER_IS_TEACHER'
export const USER_IS_STUDENT = 'USER_IS_STUDENT'
export const USER_IS_PARENT = 'USER_IS_PARENT'
export const LOG_OUT = 'LOG_OUT'
export const UPDATE_USER_DATA = 'UPDATE_USER_DATA'

//Actions
export const login = (loginInfo) => ({ type: LOGIN, loginInfo })
export const loginInProgress = () => ({ type: LOGIN_IN_PROGRESS })
export const loginSuccess = (userInfo) => ({ type: LOGIN_SUCCESS, userInfo })
export const loginFailed = (errMsg) => ({ type: LOGIN_FAILED, errMsg })
export const updateRelogin = (errMsg) => ({ type: UPDATE_RELOGIN, errMsg })
export const userIsAdmin = (userInfo) => ({ type: USER_IS_ADMIN, userInfo })
export const logOut = () => ({ type: LOG_OUT })
export const userIsTeacher = () => ({ type: USER_IS_TEACHER })
export const userIsStudent = () => ({ type: USER_IS_STUDENT })
export const userIsParent = () => ({ type: USER_IS_PARENT })
export const updateUserData = (userReducerData) => ({ type: UPDATE_USER_DATA, userReducerData })

// Reducers
export const userReducer = (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case LOGIN_IN_PROGRESS:
      return { ...state, signedIn: false, errMsg: '', user: {}, relogin: false, inProgress: true }
    case LOGIN_SUCCESS:
      if (action.userInfo?.isExisting) {
        return {
          ...state,
          ...action.userInfo,
        }
      } else {
        return {
          ...state,
          signedIn: true,
          errMsg: '',
          user: action.userInfo,
          relogin: false,
          inProgress: false,
        }
      }
    case userIsAdmin:
      return {
        ...state,
        errMsg: '',
        isAdmin: true,
        user: action.userInfo,
        relogin: false,
        inProgress: false,
      }
    case USER_IS_TEACHER:
      return {
        ...state,
        isTeacher: true,
        isStudent: false,
        isParent: false,
      }
    case USER_IS_STUDENT:
      return {
        ...state,
        isStudent: true,
        isTeacher: false,
        isParent: false,
      }
    case USER_IS_PARENT:
      return {
        ...state,
        isParent: true,
        isTeacher: false,
        isStudent: false,
      }
    case loginFailed:
      return {
        ...state,
        signedIn: false,
        errMsg: action.errMsg,
        user: {},
        relogin: false,
        inProgress: false,
      }
    case updateRelogin:
      return {
        ...state,
        signedIn: false,
        errMsg: action.errMsg,
        user: {},
        relogin: true,
        inProgress: false,
      }
    case LOG_OUT:
      return {
        ...state,
        user: {},
        isAdmin: false,
        inProgress: false,
        signedIn: false,
        isTeacher: false,
        isStudent: false,
        isParent: false,
        relogin: false,
        errMsg: '',
      }
    case UPDATE_USER_DATA:
      return {
        ...state,
        ...action.userReducerData
      }
    default:
      return state
  }
}
