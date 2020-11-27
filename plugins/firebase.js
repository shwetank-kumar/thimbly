import firebase from 'firebase/app'
import 'firebase/auth'
import { settings } from '../config/settings'

export default ({ __, store }, inject) => {
  const location = window.location.hostname
  const env = location === 'thimbly-prod.web.app' ? 'prod' : 'dev'
  const firebaseConfig = {
    apiKey: settings[env].apiKey,
    authDomain: settings[env].authDomain,
    databaseURL: settings[env].databaseURL,
    projectId: settings[env].projectId,
    storageBucket: settings[env].storageBucket,
    messagingSenderId: settings[env].messagingSenderId,
    appId: settings[env].appId,
  }

  console.log(firebaseConfig)

  if (!firebase.apps.length) {
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig)
  }

  if (process.client) {
    firebase.auth().onAuthStateChanged((user) => {
      store.dispatch('setAuth', user)
    })
  }

  inject('firebase', firebase)
}
