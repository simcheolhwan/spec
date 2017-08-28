import { combineReducers } from 'redux'
import app from './app'
import auth from './auth'
import projects from './projects'

export default combineReducers({ app, auth, projects })
