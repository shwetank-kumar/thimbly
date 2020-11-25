import firebase from 'firebase/app'
import 'firebase/auth'

export default ({ env, store }, inject) => {
  const firebaseConfig = {
    apiKey: 'AIzaSyDtskTo2SSvyzfbpA2rAFA14ZTjsD2jrBs',
    authDomain: 'thimbly-dev.firebaseapp.com',
    databaseURL: 'https://thimbly-dev.firebaseio.com',
    projectId: 'thimbly-dev',
    storageBucket: 'thimbly-dev.appspot.com',
    messagingSenderId: '28742505791',
    appId: '1:28742505791:web:b2172e2c33f27ec86eef8a',
    measurementId: 'G-843BLJ4NTX',
  }

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
