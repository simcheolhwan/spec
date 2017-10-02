import { auth, database } from '../firebase'
import { initProjects } from './projectActions'
import { initFeatures } from './featureActions'
import { initSpecs } from './specActions'

export const types = {
  AUTH: '~/auth',
  USER: '~/auth/user',
  UPDATE: '~/auth/user/update',
  ERROR: '~/auth/error'
}

export const checkAuth = () => dispatch =>
  auth.onAuthStateChanged(user => {
    if (user) {
      const { uid } = user
      dispatch({ type: types.AUTH, authenticated: true, user: { uid } })
      dispatch(fetchUser(uid))
    } else {
      dispatch({ type: types.AUTH, authenticated: false })
    }
  })

export const signin = ({ email, password }) => dispatch =>
  auth
    .signInWithEmailAndPassword(email, password)
    .catch(error => dispatch({ type: types.ERROR, error }))

export const signout = () => dispatch =>
  auth.signOut().then(() => {
    dispatch(initProjects())
    dispatch(initFeatures())
    dispatch(initSpecs())
  })

const fetchUser = uid => dispatch =>
  database
    .ref(`/users/${uid}`)
    .once('value', snap =>
      dispatch({ type: types.USER, user: snap.val() || {} })
    )

export const updateUser = (uid, updates) => dispatch =>
  database
    .ref(`/users/${uid}`)
    .set(updates)
    .then(() => dispatch({ type: types.USER, user: updates }))
