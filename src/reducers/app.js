import types from '../constants/actions'

const initialState = { render: false, error: {} }

export default (state = initialState, action) => {
  switch (action.type) {
    case types.APP_RENDER:
      return { ...state, render: action.render }

    case types.APP_ERROR:
      return { ...state, error: action.error }

    default:
      return state
  }
}
