import _ from 'lodash'
import { database } from '../constants/firebase'

export const types = {
  READ: 'USER/READ',
  PROJECTS: 'USER/PROJECTS',
  ERROR: 'USER/READ/ERROR'
}

export const readUser = slug => dispatch => {
  database
    .ref('/users')
    .once('value', snap => {
      const users = snap.val()
      const uid = _.findKey(users, ['slug', slug])
      const user = uid ? { ...users[uid], uid } : null
      dispatch({ type: types.READ, user })
      dispatch(readProjects(uid))
    })
    .catch(error => dispatch({ type: types.ERROR, error }))
}

const readProjects = uid => dispatch =>
  database
    .ref(`/projects/${uid}`)
    .once('value', snap => {
      dispatch({ type: types.PROJECTS, projects: snap.val() || {} })
    })
    .catch(error => dispatch({ type: types.ERROR, error }))
