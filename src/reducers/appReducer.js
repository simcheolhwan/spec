import { combineReducers } from 'redux'
import { types } from '../actions/appActions'

const fullscreen = (state = false, action) => {
  switch (action.type) {
    case types.FULLSCREEN:
      return true

    default:
      return state
  }
}

export default combineReducers({ fullscreen })
