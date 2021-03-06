import { combineReducers } from 'redux'
import { types } from '../actions/authActions'

const authenticated = (state = false, action) => {
  switch (action.type) {
    case types.AUTH:
      return action.authenticated

    default:
      return state
  }
}

const user = (state = {}, action) => {
  switch (action.type) {
    case types.AUTH:
      return action.authenticated ? action.user : {}

    case types.USER:
      return { ...state, ...action.user }

    default:
      return state
  }
}

const state = (state = 'idle', action) => {
  switch (action.type) {
    case types.AUTH:
      return action.authenticated ? 'idle' : 'guest'

    case types.USER:
      return 'user'

    default:
      return state
  }
}

const error = (state = {}, action) => {
  switch (action.type) {
    case types.AUTH:
    case types.USER:
      return {}

    case types.ERROR:
      return action.error

    default:
      return state
  }
}

export default combineReducers({ authenticated, user, state, error })
