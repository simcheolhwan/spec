import without from 'lodash/fp/without'
import { combineReducers } from 'redux'
import dotProp from 'dot-prop-immutable'
import { types } from '../actions/featureActions'

const list = (state = {}, action) => {
  switch (action.type) {
    case types.INIT:
      return {}

    case types.FETCH:
      return action.features.list || {}

    case types.CREATE:
    case types.UPDATE:
      return dotProp.set(state, action.key, action.feature)

    case types.DELETE:
      return dotProp.delete(state, action.key)

    default:
      return state
  }
}

const order = (state = [], action) => {
  switch (action.type) {
    case types.INIT:
      return []

    case types.FETCH:
      return action.features.order || []

    case types.CREATE:
      return action.feature.issue ? state : [...state, action.key]

    case types.DELETE:
      return without([action.key])(state)

    default:
      return state
  }
}

const issues = (state = [], action) => {
  switch (action.type) {
    case types.INIT:
      return []

    case types.FETCH:
      return action.features.issues || []

    case types.CREATE:
      return action.feature.issue ? [...state, action.key] : state

    case types.DELETE:
      return without([action.key])(state)

    default:
      return state
  }
}

const project = (state = '', action) => {
  switch (action.type) {
    case types.FETCH:
      return action.project

    default:
      return state
  }
}

export default combineReducers({ list, order, issues, project })
