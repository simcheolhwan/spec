import firebase from 'firebase'
import 'firebase/firestore'
import config from './config/firebase'

firebase.initializeApp(config)

export const auth = firebase.auth()
export const database = firebase.firestore()
