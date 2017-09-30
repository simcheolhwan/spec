import uuidv4 from 'uuid/v4'
import { database } from '../firebase'

export const types = {
  INIT: '~/specs/init',
  FETCH: '~/specs/fetch',
  CREATE: '~/spec/create',
  UPDATE: '~/spec/update',
  DELETE: '~/spec/delete'
}

export const fetchSpecs = (uid, projectKey) => dispatch =>
  database
    .ref(`/specs/${uid}/${projectKey}`)
    .once('value', snap =>
      dispatch({ type: types.FETCH, specs: snap.val() || {} })
    )

export const createSpec = (projectKey, featureKey, spec) => (
  dispatch,
  getState
) => {
  const key = uuidv4()
  const { uid } = getState().auth.user

  dispatch({
    type: types.CREATE,
    featureKey,
    key,
    spec: { ...spec, isSyncing: true }
  })

  database
    .ref(`/specs/${uid}/${projectKey}`)
    .update({
      [`/list/${key}`]: spec,
      [`/orders/${featureKey}`]: getState().specs.orders[featureKey]
    })
    .then(() => {
      dispatch({
        type: types.UPDATE,
        key,
        spec: { ...spec, isSyncing: false }
      })
    })
    .catch(error => {
      dispatch({ type: types.DELETE, featureKey, key })
    })
}

export const updateSpec = (projectKey, featureKey, key, updates) => (
  dispatch,
  getState
) => {
  const { uid } = getState().auth.user
  const spec = getState().specs.list[key]

  dispatch({
    type: types.UPDATE,
    key,
    spec: { ...spec, ...updates, isSyncing: true }
  })

  database
    .ref(`/specs/${uid}/${projectKey}/list/${key}`)
    .update(updates)
    .then(() =>
      dispatch({
        type: types.UPDATE,
        key,
        spec: { ...spec, ...updates, isSyncing: false }
      })
    )
    .catch(error => {
      dispatch({ type: types.UPDATE, key, spec })
    })
}

export const deleteSpec = (projectKey, featureKey, key) => (
  dispatch,
  getState
) => {
  const { uid } = getState().auth.user
  const spec = getState().specs.list[key]

  dispatch({ type: types.DELETE, featureKey, key })

  database
    .ref(`/specs/${uid}/${projectKey}`)
    .update({
      [`/list/${key}`]: null,
      [`/orders/${featureKey}`]: getState().specs.orders[featureKey]
    })
    .catch(error => {
      dispatch({ type: types.CREATE, featureKey, key, spec })
    })
}
