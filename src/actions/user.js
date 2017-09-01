import _ from 'lodash'
import types from '../constants/actions'
import { database } from '../constants/firebase'

export const readUser = slug => dispatch => {
  dispatch({ type: types.USER_STATUS, status: 'fetching' })
  database
    .ref('/users')
    .once('value', snap => {
      const users = snap.val()
      const uid = _.findKey(users, ['slug', slug])
      const user = { ...users[uid], uid }

      uid
        ? dispatch({ type: types.READ_USER, user }) &&
          dispatch(readProjects(uid))
        : dispatch({ type: types.USER_STATUS, status: 'done' })
    })
    .catch(error => dispatch({ type: types.USER_ERROR, error }))
}

const readProjects = uid => dispatch =>
  database
    .ref(`/projects/${uid}`)
    .once('value', snap => {
      dispatch({ type: types.READ_USER_PROJECTS, projects: snap.val() || {} })
      dispatch({ type: types.USER_STATUS, status: 'done' })
    })
    .catch(error => dispatch({ type: types.USER_ERROR, error }))
