import { createAction } from 'redux-actions'

export const INITIAL_STATE = {
  logs: [],
}

// Types
export const LOG_ACTIONS = 'LOG_ACTIONS'
export const STARTUP = 'STARTUP'

// Actions
export const logActions = createAction(LOG_ACTIONS)
export const startup = createAction(STARTUP)

// Reducers
export const startupReducer = (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case LOG_ACTIONS:
      let logs = [...state.logs, action.payload.log]
      if (/STARTUP/.test(action.payload.log)) {
        // Reset logs
        logs = [action.payload.log]
      }
      return {
        ...state,
        logs,
      }
    default:
      return state
  }
}
