import { combineReducers } from 'redux'
import app from './app'
import auth from './auth'
import user from './user'
import projects from './projects'

export default combineReducers({ app, auth, user, projects })
