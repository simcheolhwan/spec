import uuidv4 from 'uuid/v4'
import types from '../constants/actions'
import { database } from '../constants/firebase'

export const fetchProjects = uid => dispatch =>
  database
    .ref(`/projects/${uid}`)
    .once('value', snap =>
      dispatch({ type: types.FETCH_PROJECTS, projects: snap.val() || {} })
    )
    .catch(error => false)

export const createProject = project => (dispatch, getState) => {
  const key = uuidv4()
  const { user } = getState().auth

  dispatch({
    type: types.CREATE_PROJECT,
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
      dispatch({
        type: types.UPDATE_PROJECT,
        key,
        updates: { isSyncing: false }
      })
    )
    .catch(error =>
      dispatch({
        type: types.DELETE_PROJECT,
        key
      })
    )
}

export const updateProject = (key, updates) => (dispatch, getState) => {
  const { uid } = getState().auth.user
  const project = getState().projects.list[key]

  dispatch({
    type: types.UPDATE_PROJECT,
    key,
    updates: { ...updates, isSyncing: true }
  })

  database
    .ref(`/projects/${uid}/list/${key}`)
    .update(updates)
    .then(() =>
      dispatch({
        type: types.UPDATE_PROJECT,
        key,
        updates: { isSyncing: false }
      })
    )
    .catch(error =>
      dispatch({
        type: types.UPDATE_PROJECT,
        key,
        updates: { ...project, isSyncing: false }
      })
    )
}

export const deleteProject = key => (dispatch, getState) => {
  const { uid } = getState().auth.user
  const project = getState().projects.list[key]

  dispatch({
    type: types.DELETE_PROJECT,
    key
  })

  database
    .ref(`/projects/${uid}`)
    .update({
      [`/list/${key}`]: null,
      [`/order`]: getState().projects.order
    })
    .catch(error =>
      dispatch({
        type: types.CREATE_PROJECT,
        key,
        project
      })
    )
}
