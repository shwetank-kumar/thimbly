import {fireAuth, config, fireDb} from "~/plugins/firebase.js"
import _ from "lodash"
import axios from "axios"

export default (context) => {
  const {store} = context

  return new Promise((resolve, reject) => {
    fireAuth.onAuthStateChanged(async (user) => {
      let user_display
      console.log("users logged in" , user)
      if (user) {
        user_display = _.pick(user, ["displayName", "email", "uid"])
        user_display["display_name"] = user_display["displayName"]
        delete user_display["displayName"]
        var querySnapshot = await fireDb
          .collection("users")
          .doc(user.uid)
          .get()

        if (Object.keys(querySnapshot.data()) ) {
          user_display = querySnapshot.data()
        } else {
          var docRef = await fireDb.collection("users").doc(user.uid)
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
