// import { config, firebaseConfig } from 'firebase-functions'
import firebase from "firebase/app"
import "firebase/auth"
import "firebase/analytics"
import "firebase/firestore"
import "firebase/storage"
import { devconfig } from "../config/devconfig"
import { prodconfig } from "../config/prodconfig"
import { localconfig } from "../config/localconfig"

let config
if (process.env.NUXT_ENV_BUILD === "prod") {
  config = prodconfig
  // console.log("prod")
} else if (process.env.NUXT_ENV_BUILD === "staging") {
  config = devconfig
  // console.log("staging")
} else {
  config = localconfig
}
// console.log(config)
export { config }
// console.log("NUXT_ENV_BUILD", process.env.NUXT_ENV_BUILD)

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
export const analytics = firebase.analytics
// export const fireStorage = firebase.storage().ref()
export const fireStorage = firebase.storage()
export default firebase
