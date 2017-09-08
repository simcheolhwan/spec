import { auth, database } from '../constants/firebase'
import { types as projects, fetchProjects } from './project'

export const types = {
  AUTH: '~/auth',
  USER: '~/auth/user',
  UPDATE: '~/auth/user/update',
  ERROR: '~/auth/error'
}

export const checkAuth = () => dispatch =>
  auth.onAuthStateChanged(
    user => {
      if (user) {
        const { uid } = user
        dispatch({ type: types.AUTH, authenticated: true, user: { uid } })
        dispatch(fetchUser(uid))
      } else {
        dispatch({ type: types.AUTH, authenticated: false })
      }
    },
    error => dispatch({ type: types.ERROR, error })
  )

export const signin = ({ email, password }) => dispatch =>
  auth
    .signInWithEmailAndPassword(email, password)
    .catch(error => dispatch({ type: types.ERROR, error }))

export const signout = () => dispatch =>
  auth
    .signOut()
    .then(() => dispatch({ type: projects.INIT }))
    .catch(error => dispatch({ type: types.ERROR, error }))

const fetchUser = uid => dispatch =>
  database
    .ref(`/users/${uid}`)
    .once('value', snap => {
      dispatch({ type: types.USER, user: snap.val() || {} })
      dispatch(fetchProjects(uid))
    })
    .catch(error => dispatch({ type: types.ERROR, error }))

export const updateUser = (uid, updates) => dispatch =>
  database
    .ref(`/users/${uid}`)
    .set(updates)
    .then(() => dispatch({ type: types.USER, user: updates }))
    .catch(error => dispatch({ type: types.ERROR, error }))
