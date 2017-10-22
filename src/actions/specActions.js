import without from 'lodash/fp/without'
import uuidv4 from 'uuid/v4'
import { database } from '../firebase'

export const types = {
  INIT: '~/specs/init',
  FETCH: '~/specs/fetch',
  CREATE: '~/spec/create',
  UPDATE: '~/spec/update',
  DELETE: '~/spec/delete'
}

export const initSpecs = () => dispatch => dispatch({ type: types.INIT })

export const fetchSpecs = (uid, projectKey) => dispatch =>
  database
    .ref(`/specs/${uid}/${projectKey}`)
    .once('value', snap =>
      dispatch({ type: types.FETCH, specs: snap.val() || {} })
    )

export const createSpec = (projectKey, featureKey, _spec) => (
  dispatch,
  getState
) => {
  const key = uuidv4()
  const timestamp = new Date()
  const { uid } = getState().auth.user
  const spec = { ..._spec, createdAt: timestamp }
  const specSyncing = { ...spec, isSyncing: true }

  dispatch({ type: types.CREATE, featureKey, key, spec: specSyncing })

  database
    .ref(`/specs/${uid}/${projectKey}`)
    .update({
      [`/list/${key}`]: spec,
      [`/orders/${featureKey}`]: getState().specs.orders[featureKey]
    })
    .then(() => dispatch({ type: types.UPDATE, key, spec }))
    .catch(error => dispatch({ type: types.DELETE, featureKey, key }))
}

export const updateSpec = (projectKey, featureKey, key, updates) => (
  dispatch,
  getState
) => {
  const { uid } = getState().auth.user
  const spec = getState().specs.list[key]
  const specUpdates = { ...spec, ...updates }
  const specUpdatesSyncing = { ...specUpdates, isSyncing: true }

  dispatch({ type: types.UPDATE, key, spec: specUpdatesSyncing })

  database
    .ref(`/specs/${uid}/${projectKey}/list/${key}`)
    .update(updates)
    .then(() => dispatch({ type: types.UPDATE, key, spec: specUpdates }))
    .catch(error => dispatch({ type: types.UPDATE, key, spec }))
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
    .catch(error => dispatch({ type: types.CREATE, featureKey, key, spec }))
}

export const createSubspec = (projectKey, parentKey, spec) => (
  dispatch,
  getState
) => {
  const key = uuidv4()
  const { uid } = getState().auth.user
  const parent = getState().specs.list[parentKey]
  const parentUpdates = {
    ...parent,
    subspecs: parent.subspecs ? [...parent.subspecs, key] : [key]
  }
  const parentUpdatesSyncing = { ...parentUpdates, isSyncing: true }

  dispatch({ type: types.CREATE, key, spec: { ...spec, isSyncing: true } })
  dispatch({ type: types.UPDATE, key: parentKey, spec: parentUpdatesSyncing })

  database
    .ref(`/specs/${uid}/${projectKey}`)
    .update({
      [`/list/${key}`]: spec,
      [`/list/${parentKey}`]: parentUpdates
    })
    .then(() => {
      dispatch({ type: types.UPDATE, key, spec: spec })
      dispatch({ type: types.UPDATE, key: parentKey, spec: parentUpdates })
    })
    .catch(error => {
      dispatch({ type: types.DELETE, key })
      dispatch({ type: types.UPDATE, key: parentKey, spec: parent })
    })
}

export const deleteSubspec = (projectKey, parentKey, key) => (
  dispatch,
  getState
) => {
  const { uid } = getState().auth.user
  const spec = getState().specs.list[key]
  const parent = getState().specs.list[parentKey]
  const parentUpdates = { ...parent, subspecs: without([key])(parent.subspecs) }
  const parentUpdatesSyncing = { ...parentUpdates, isSyncing: true }

  dispatch({ type: types.DELETE, key })
  dispatch({ type: types.UPDATE, key: parentKey, spec: parentUpdatesSyncing })

  database
    .ref(`/specs/${uid}/${projectKey}`)
    .update({
      [`/list/${key}`]: null,
      [`/list/${parentKey}`]: parentUpdates
    })
    .then(() =>
      dispatch({ type: types.UPDATE, key: parentKey, spec: parentUpdates })
    )
    .catch(error => {
      dispatch({ type: types.CREATE, key, spec })
      dispatch({ type: types.UPDATE, key: parentKey, spec: parent })
    })
}
