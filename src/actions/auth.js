import types from '../constants/actions'
import { auth } from '../constants/firebase'

export const checkAuth = () => dispatch => {
  auth.onAuthStateChanged(user => {
    user && dispatch({ type: types.SIGN_IN, user })
    dispatch({ type: types.APP_RENDER, render: true })
  })
}

export const signin = ({ email, password }) => dispatch =>
  auth
    .signInWithEmailAndPassword(email, password)
    .then(user => dispatch({ type: types.SIGN_IN, user }))
    .catch(error => dispatch({ type: types.AUTH_ERROR, error }))

export const signout = () => dispatch =>
  auth
    .signOut()
    .then(() => dispatch({ type: types.SIGN_OUT }))
    .catch(error => dispatch({ type: types.AUTH_ERROR, error }))
