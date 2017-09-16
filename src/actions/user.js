import _ from 'lodash'
import { database } from '../firebase'

export const types = {
  READ: '~/user/read',
  PROJECTS: '~/user/projects'
}

export const readUser = slug => dispatch => {
  database.ref('/users').once('value', snap => {
    const users = snap.val()
    const uid = _.findKey(users, ['slug', slug])
    const user = uid ? { ...users[uid], uid } : {}
    dispatch({ type: types.READ, user })
    uid && dispatch(readProjects(uid))
  })
}

const readProjects = uid => dispatch =>
  database.ref(`/projects/${uid}`).once('value', snap => {
    dispatch({ type: types.PROJECTS, projects: snap.val() || {} })
  })
