import types from '../constants/actions'
import dotProp from 'dot-prop-immutable'

const initialState = {}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_PROJECTS:
      return action.projects

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
