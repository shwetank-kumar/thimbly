import {fireAuth, config, fireDb} from "~/plugins/firebase.js"
import _ from "lodash"
import axios from "axios"

export default (context) => {
  const {store} = context

  return new Promise((resolve, reject) => {
    fireAuth.onAuthStateChanged(async (user) => {
      let user_display
      if (user) {
        user_display = _.pick(user, ["displayName", "email", "uid"])
        user_display["display_name"] = user_display["displayName"]
        delete user_display["displayName"]
        var querySnapshot = await fireDb
          .collection("users")
          .where("uid", "==", user.uid)
          .get()
        if (querySnapshot.docs.length >= 1) {
          user_display = querySnapshot.docs[0].data()
        } else {
          var docRef = fireDb.collection("users").doc()
          user_display = {...user_display, stripe_id: null}
          await docRef.set(user_display)
        }
        store.commit("SET_USER", user_display)
      } else {
        user = null
        store.commit("SET_USER", user)
      }
      resolve()
    })
  })
}
