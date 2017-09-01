import { combineReducers } from 'redux'
import types from '../constants/actions'

const authenticated = (state = false, action) => {
  switch (action.type) {
    case types.SIGN_IN:
      return true

    case types.SIGN_OUT:
      return false

    default:
      return state
  }
}

const initial = { uid: '', name: '', slug: '' }
const user = (state = initial, action) => {
  switch (action.type) {
    case types.SIGN_IN:
    case types.FETCH_USER:
      return { ...state, ...action.user }

    case types.SIGN_OUT:
      return initial

    default:
      return state
  }
}

const error = (state = {}, action) => {
  switch (action.type) {
    case types.SIGN_IN:
    case types.SIGN_OUT:
    case types.FETCH_USER:
      return {}

    case types.AUTH_ERROR:
      return action.error

    default:
      return state
  }
}

export default combineReducers({ authenticated, user, error })
