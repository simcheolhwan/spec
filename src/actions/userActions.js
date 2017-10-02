import findKey from 'lodash/fp/findKey'
import { database } from '../firebase'

export const types = {
  FETCH: '~/user/fetch'
}

export const fetchUser = slug => dispatch => {
  database.ref('/users').once('value', snap => {
    const users = snap.val()
    const uid = findKey(['slug', slug])(users)
    const user = uid ? users[uid] : {}
    dispatch({ type: types.FETCH, user })
  })
}
