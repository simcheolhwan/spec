import _ from 'lodash'
import { combineReducers } from 'redux'
import types from '../constants/actions'
import dotProp from 'dot-prop-immutable'

const list = (state = {}, action) => {
  switch (action.type) {
    case types.FETCH_PROJECTS:
      return action.projects.list || {}

    case types.CREATE_PROJECT:
      return dotProp.set(state, action.key, action.project)

    case types.UPDATE_PROJECT:
      return dotProp.merge(state, action.key, action.updates)

    case types.DELETE_PROJECT:
      return dotProp.delete(state, action.key)

    default:
      return state
  }
}

const order = (state = [], action) => {
  switch (action.type) {
    case types.FETCH_PROJECTS:
      return action.projects.order || []

    case types.CREATE_PROJECT:
      return [...state, action.key]

    case types.DELETE_PROJECT:
      return _.without(state, action.key)

    default:
      return state
  }
}

export default combineReducers({ list, order })
