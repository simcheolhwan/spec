import uuidv4 from 'uuid/v4'
import { database } from '../firebase'

export const types = {
  INIT: '~/features/init',
  FETCH: '~/features/fetch',
  CREATE: '~/feature/create',
  UPDATE: '~/feature/update',
  DELETE: '~/feature/delete'
}

export const fetchFeatures = (uid, projectKey) => dispatch =>
  database
    .ref(`/features/${uid}/${projectKey}`)
    .once('value', snap =>
      dispatch({ type: types.FETCH, features: snap.val() || {} })
    )

export const createFeature = (projectKey, feature) => (dispatch, getState) => {
  const key = uuidv4()
  const { uid } = getState().auth.user

  dispatch({
    type: types.CREATE,
    key,
    feature: { ...feature, isSyncing: true }
  })

  database
    .ref(`/features/${uid}/${projectKey}`)
    .update({
      [`/list/${key}`]: feature,
      [`/order`]: getState().features.order
    })
    .then(() => {
      dispatch({
        type: types.UPDATE,
        key,
        feature: { ...feature, isSyncing: false }
      })
    })
    .catch(error => {
      dispatch({ type: types.DELETE, key })
    })
}

export const updateFeature = (projectKey, key, updates) => (
  dispatch,
  getState
) => {
  const { uid } = getState().auth.user
  const feature = getState().features.list[key]

  dispatch({
    type: types.UPDATE,
    key,
    feature: { ...feature, ...updates, isSyncing: true }
  })

  database
    .ref(`/features/${uid}/${projectKey}/list/${key}`)
    .update(updates)
    .then(() =>
      dispatch({
        type: types.UPDATE,
        key,
        feature: { ...feature, ...updates, isSyncing: false }
      })
    )
    .catch(error => {
      dispatch({ type: types.UPDATE, key, feature })
    })
}

export const deleteFeature = (projectKey, key) => (dispatch, getState) => {
  const { uid } = getState().auth.user
  const feature = getState().features.list[key]

  dispatch({ type: types.DELETE, key })

  database
    .ref(`/features/${uid}/${projectKey}`)
    .update({
      [`/list/${key}`]: null,
      [`/order`]: getState().features.order
    })
    .catch(error => {
      dispatch({ type: types.CREATE, key, feature })
    })
}