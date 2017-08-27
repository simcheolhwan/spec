import uuidv4 from 'uuid/v4'
import types from '../constants/actions'
import { database } from '../constants/firebase'

export const fetchProjects = () => (dispatch, getState) => {
  const { user } = getState().auth

  database
    .ref(`/projects/${user.uid}`)
    .once('value', snap =>
      dispatch({
        type: types.FETCH_PROJECTS,
        projects: snap.val()
      })
    )
    .catch(error =>
      dispatch({
        type: types.APP_ERROR,
        error
      })
    )
}

export const createProject = project => (dispatch, getState) => {
  const key = uuidv4()
  const { user } = getState().auth

  dispatch({
    type: types.CREATE_PROJECT,
    key,
    project: { ...project, isSyncing: true }
  })

  database
    .ref(`/projects/${user.uid}/${key}`)
    .set(project)
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

export const updateProject = () => (dispatch, getState) => {}

export const deleteProject = () => (dispatch, getState) => {}
