import firebase from 'firebase/app'
import 'firebase/auth'
import { devconfig } from '../config/devconfig'
import { prodconfig } from '../config/prodconfig'

// export default ({ __, store }, inject) => {
//   const location = window.location.hostname
//   const firebaseConfig =
//     location === 'thimbly-prod.web.app' ? prodconfig : devconfig

//   console.log(firebaseConfig)

//   if (!firebase.apps.length) {
//     // Initialize Firebase
//     firebase.initializeApp(firebaseConfig)
//   }

// if (process.client) {
//   firebase.auth().onAuthStateChanged((user) => {
//     store.dispatch('setAuth', user)
//   })
// }

//   inject('firebase', firebase)
// }

const location = window.location.hostname
const firebaseConfig =
  location === 'thimbly-prod.web.app' ? prodconfig : devconfig

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
