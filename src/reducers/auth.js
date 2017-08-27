import types from '../constants/actions'

const initialState = { authenticated: false, user: {}, error: {} }

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SIGN_IN:
      return { ...state, authenticated: true, user: action.user, error: {} }

    case types.SIGN_OUT:
      return { ...state, authenticated: false, user: {}, error: {} }

    case types.AUTH_ERROR:
      return { ...state, error: action.error }

    default:
      return state
  }
}
