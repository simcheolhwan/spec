import { combineReducers } from 'redux'
import { types } from 'actions/userActions'

const user = (state = {}, action) => {
  switch (action.type) {
    case types.FETCH:
      return action.user

    default:
      return state
  }
}

const state = (state = 'idle', action) => {
  switch (action.type) {
    case types.FETCH:
      return action.user.uid ? 'user' : 404

    default:
      return state
  }
}

export default combineReducers({ user, state })
