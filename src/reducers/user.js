import { combineReducers } from 'redux'
import { types } from '../actions/user'

const user = (state = {}, action) => {
  switch (action.type) {
    case types.READ:
      return action.user

    default:
      return state
  }
}

const projects = (state = {}, action) => {
  switch (action.type) {
    case types.PROJECTS:
      return action.projects

    default:
      return state
  }
}

const state = (state = 'idle', action) => {
  switch (action.type) {
    case types.PROJECTS:
      return 'projects'

    default:
      return state
  }
}

const error = (state = {}, action) => {
  switch (action.type) {
    case types.READ:
      return {}

    case types.ERROR:
      return action.error

    default:
      return state
  }
}

export default combineReducers({ user, projects, state, error })
