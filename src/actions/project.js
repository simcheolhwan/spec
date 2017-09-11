import uuidv4 from 'uuid/v4'
import { database } from '../constants/firebase'

export const types = {
  INIT: '~/projects/init',
  FETCH: '~/projects/fetch',
  CREATE: '~/project/create',
  UPDATE: '~/project/update',
  DELETE: '~/project/delete',
  ERROR: '~/project/error'
}

export const fetchProjects = uid => dispatch =>
  database
    .ref(`/projects/${uid}`)
    .once('value', snap =>
      dispatch({ type: types.FETCH, projects: snap.val() || {} })
    )
    .catch(error => dispatch({ type: types.ERROR, error }))

export const createProject = project => (dispatch, getState) => {
  const key = uuidv4()
  const { user } = getState().auth

  dispatch({
    type: types.CREATE,
    key,
    project: { ...project, isSyncing: true }
  })

  database
    .ref(`/projects/${user.uid}`)
    .update({
      [`/list/${key}`]: project,
      [`/order`]: getState().projects.order
    })
    .then(() =>
      dispatch({ type: types.UPDATE, key, updates: { isSyncing: false } })
    )
    .catch(error => {
      dispatch({ type: types.DELETE, key })
      dispatch({ type: types.ERROR, error })
    })
}

export const updateProject = (key, updates) => (dispatch, getState) => {
  const { uid } = getState().auth.user
  const project = getState().projects.list[key]

  dispatch({
    type: types.UPDATE,
    key,
    updates: { ...updates, isSyncing: true }
  })

  database
    .ref(`/projects/${uid}/list/${key}`)
    .update(updates)
    .then(() =>
      dispatch({ type: types.UPDATE, key, updates: { isSyncing: false } })
    )
    .catch(error => {
      const updates = { ...project, isSyncing: false }
      dispatch({ type: types.UPDATE, key, updates })
      dispatch({ type: types.ERROR, error })
    })
}

export const deleteProject = key => (dispatch, getState) => {
  const { uid } = getState().auth.user
  const project = getState().projects.list[key]

  dispatch({ type: types.DELETE, key })

  database
    .ref(`/projects/${uid}`)
    .update({
      [`/list/${key}`]: null,
      [`/order`]: getState().projects.order
    })
    .catch(error => {
      dispatch({ type: types.CREATE, key, project })
      dispatch({ type: types.ERROR, error })
    })
}
