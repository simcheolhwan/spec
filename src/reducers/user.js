import types from '../constants/actions'

const initial = { user: {}, projects: {}, status: '', error: {} }

export default (state = initial, action) => {
  switch (action.type) {
    case types.FETCH_USER:
      return { ...state, user: action.user }

    case types.FETCH_USER_PROJECTS:
      return { ...state, projects: action.projects }

    case types.USER_STATUS:
      return { ...state, status: action.status }

    case types.USER_ERROR:
      return { ...state, error: action.error, status: 'error' }

    default:
      return state
  }
}
