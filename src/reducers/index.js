import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import { reducer as form } from 'redux-form'
import auth from './auth'
import user from './user'
import projects from './projects'
import features from './features'
import specs from './specs'

export default combineReducers({
  auth,
  user,
  projects,
  features,
  specs,
  router,
  form
})
