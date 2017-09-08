import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import auth from './auth'
import user from './user'
import projects from './projects'

export default combineReducers({ auth, user, projects, form })
