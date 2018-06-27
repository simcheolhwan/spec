import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import config from './config/firebase'

firebase.initializeApp(config)

export const auth = firebase.auth()
export const database = firebase.database()
