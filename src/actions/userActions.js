import { database } from '../firebase'

export const types = {
  FETCH: '~/user/fetch'
}

export const fetchUser = slug => dispatch =>
  database
    .collection('users')
    .where('slug', '==', slug)
    .get()
    .then(querySnapshot =>
      dispatch({
        type: types.FETCH,
        user: querySnapshot.empty ? {} : querySnapshot.docs[0].data()
      })
    )
