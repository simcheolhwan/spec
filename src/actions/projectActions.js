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
    .collection('projects')
    .doc(uid)
    .get()
    .then(doc =>
      dispatch({
        type: types.FETCH,
        projects: doc.exists ? doc.data() : {},
        // doc.data()는 order만 전달한다.
        // lists를 전달받으려면, 새로 쿼리하고 querySnapshot.forEach로 하나씩 접근해야 한다.
        // 기존에는 이 코드에서 lists를 Object로 전달할 수 있었으나, forEach를 통해 하나씩
        // 접근하면, key 없이 Array로 전달하게 된다.
        user: uid
      })
    )

export const createProject = project => (dispatch, getState) => {
  const key = uuidv4()
  const { user } = getState().auth
  const projectSyncing = { ...project, isSyncing: true }

  dispatch({ type: types.CREATE, key, project: projectSyncing })
  dispatch(push(`/${user.slug}/${project.slug}`))

  const batch = database.batch()
  const projectsRef = database.collection('projects').doc(user.uid)
  batch.set(projectsRef.collection('lists').doc(key), project)
  batch.set(projectsRef, { order: getState().projects.order })

  batch
    .commit()
    .then(() => {
      dispatch({
        type: types.UPDATE,
        key,
        project: { ...project, isSyncing: false }
      })
    })
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
