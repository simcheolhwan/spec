import without from 'lodash/fp/without'
import { combineReducers } from 'redux'
import dotProp from 'dot-prop-immutable'
import { types } from '../actions/feature'

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
      return [...state, action.key]

    case types.DELETE:
      return without([action.key])(state)

    default:
      return state
  }
}

export default combineReducers({ list, order })
