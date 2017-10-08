import uuidv4 from 'uuid/v4'
import { push, replace } from 'react-router-redux'
import { database } from '../firebase'

export const types = {
  INIT: '~/projects/init',
  FETCH: '~/projects/fetch',
  CREATE: '~/project/create',
  UPDATE: '~/project/update',
  DELETE: '~/project/delete'
}

export const initProjects = () => dispatch => dispatch({ type: types.INIT })

export const fetchProjects = uid => dispatch =>
  database
    .ref(`/projects/${uid}`)
    .once('value', snap =>
      dispatch({ type: types.FETCH, projects: snap.val() || {}, user: uid })
    )

export const createProject = project => (dispatch, getState) => {
  const key = uuidv4()
  const { user } = getState().auth
  const projectSyncing = { ...project, isSyncing: true }

  dispatch({ type: types.CREATE, key, project: projectSyncing })
  dispatch(push(`/${user.slug}/${project.slug}`))

  database
    .ref(`/projects/${user.uid}`)
    .update({
      [`/list/${key}`]: project,
      [`/order`]: getState().projects.order
    })
    .then(() => dispatch({ type: types.UPDATE, key, project }))
    .catch(error => {
      dispatch({ type: types.DELETE, key })
      dispatch(push('/'))
    })
}

export const updateProject = (key, updates) => (dispatch, getState) => {
  const { user } = getState().auth
  const project = getState().projects.list[key]
  const projectUpdates = { ...project, ...updates }
  const projectUpdatesSyncing = { ...projectUpdates, isSyncing: true }

  dispatch({ type: types.UPDATE, key, project: projectUpdatesSyncing })
  updates.slug && dispatch(replace(`/${user.slug}/${updates.slug}/settings`))

  database
    .ref(`/projects/${user.uid}/list/${key}`)
    .update(updates)
    .then(() => dispatch({ type: types.UPDATE, key, project: projectUpdates }))
    .catch(error => {
      dispatch({ type: types.UPDATE, key, project })
      updates.slug &&
        dispatch(replace(`/${user.slug}/${project.slug}/settings`))
    })
}

export const deleteProject = key => (dispatch, getState) => {
  const { uid } = getState().auth.user
  const project = getState().projects.list[key]

  dispatch({ type: types.DELETE, key })
  dispatch(push('/'))

  database
    .ref(`/projects/${uid}`)
    .update({
      [`/list/${key}`]: null,
      [`/order`]: getState().projects.order
    })
    .catch(error => dispatch({ type: types.CREATE, key, project }))
}
