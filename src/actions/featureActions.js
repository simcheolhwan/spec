import uuidv4 from 'uuid/v4'
import { database } from '../firebase'

export const types = {
  INIT: '~/features/init',
  FETCH: '~/features/fetch',
  CREATE: '~/feature/create',
  UPDATE: '~/feature/update',
  DELETE: '~/feature/delete'
}

export const initFeatures = () => dispatch => dispatch({ type: types.INIT })

export const fetchFeatures = (uid, projectKey) => dispatch => undefined
// database.ref(`/features/${uid}/${projectKey}`).once('value', snap =>
//   dispatch({
//     type: types.FETCH,
//     features: snap.val() || {},
//     project: projectKey
//   })
// )

export const createFeature = (projectKey, feature) => (dispatch, getState) => {
  const key = uuidv4()
  const { uid } = getState().auth.user
  const featureSyncing = { ...feature, isSyncing: true }

  dispatch({ type: types.CREATE, key, feature: featureSyncing })

  database
    .ref(`/features/${uid}/${projectKey}`)
    .update({
      [`/list/${key}`]: feature,
      [`/order`]: getState().features.order
    })
    .then(() => dispatch({ type: types.UPDATE, key, feature }))
    .catch(error => dispatch({ type: types.DELETE, key }))
}

export const updateFeature = (projectKey, key, updates) => (
  dispatch,
  getState
) => {
  const { uid } = getState().auth.user
  const feature = getState().features.list[key]
  const featureUpdates = { ...feature, ...updates }
  const featureUpdatesSyncing = { ...featureUpdates, isSyncing: true }

  dispatch({ type: types.UPDATE, key, feature: featureUpdatesSyncing })

  database
    .ref(`/features/${uid}/${projectKey}/list/${key}`)
    .update(updates)
    .then(() => dispatch({ type: types.UPDATE, key, feature: featureUpdates }))
    .catch(error => dispatch({ type: types.UPDATE, key, feature }))
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
    .catch(error => dispatch({ type: types.CREATE, key, feature }))
}
