// import { config, firebaseConfig } from 'firebase-functions'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
import { devconfig } from '../config/devconfig'
import { prodconfig } from '../config/prodconfig'
import { localconfig } from '../config/localconfig'

// const location = window.location.hostname
// export const baseUrl = process.env.BASE_URL || 'http://localhost:3000'
// const firebaseConfig =
//   baseUrl === 'thimbly-prod.web.app' ? prodconfig : devconfig

export const config = localconfig
// export const config = devconfig
// export const config = prodconfig

const firebaseConfig = config.firebaseConfig
export const hostServer = config.hostServer

if (!firebase.apps.length) {
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig)
}

export const authProviders = {
  Google: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  Facebook: firebase.auth.FacebookAuthProvider.PROVIDER_ID,
}
export const fireDb = firebase.firestore()
export const fireAuth = firebase.auth()
export const fireStorage = firebase.storage().ref()
export default firebase
