import types from '../constants/actions'
import { auth, database } from '../constants/firebase'
import { fetchProjects } from './project'

export const checkAuth = () => dispatch => {
  auth.onAuthStateChanged(user => {
    if (user) {
      const { uid } = user
      dispatch({ type: types.SIGN_IN, user: { uid } })
      dispatch(fetchUser(user))
      dispatch(fetchProjects(user))
    }

    dispatch({ type: types.APP_RENDER, render: true })
  })
}

export const signin = ({ email, password }) => dispatch =>
  auth
    .signInWithEmailAndPassword(email, password)
    .then(user => {
      const { uid } = user
      dispatch({ type: types.SIGN_IN, user: { uid } })
      dispatch(fetchUser(user))
      dispatch(fetchProjects(user))
    })
    .catch(error => dispatch({ type: types.AUTH_ERROR, error }))

export const signout = () => dispatch =>
  auth
    .signOut()
    .then(() => dispatch({ type: types.SIGN_OUT }))
    .catch(error => dispatch({ type: types.AUTH_ERROR, error }))

const fetchUser = user => dispatch =>
  database
    .ref(`/users/${user.uid}`)
    .once('value', snap =>
      dispatch({ type: types.FETCH_USER, user: snap.val() || {} })
    )
    .catch(error => dispatch({ type: types.AUTH_ERROR, error }))
