import types from '../constants/actions'

const initialState = { render: false }

export default (state = initialState, action) => {
  switch (action.type) {
    case types.RENDER_APP:
      return { ...state, render: action.render }

    default:
      return state
  }
}
