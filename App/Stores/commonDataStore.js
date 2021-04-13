export const INITIAL_STATE = {
  headerData: {
    title: 'Testing'
  }
}

// Types
export const UPDATE_HEADER_TITLE = 'UPDATE_HEADER_TITLE'

// Actions
export const updateHeaderTitle = (payload) => ({ type: UPDATE_HEADER_TITLE, payload })

// Reducers
export const commonDataStoreReducer = (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case UPDATE_HEADER_TITLE:
      return {
        ...state,
        headerData: {
          ...state.headerData,
          title: action?.payload?.title
        }
      }

    default:
      return state
  }
}
