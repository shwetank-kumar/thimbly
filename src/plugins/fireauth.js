import { fireAuth } from '~/plugins/firebase.js'

export default (context) => {
  const { store } = context

  return new Promise((resolve, reject) => {
    fireAuth.onAuthStateChanged(async (user) => {
      let userDisplay
      if (user) {
        userDisplay = (({ displayName, email, uid }) => ({
          displayName,
          email,
          uid,
        }))(user)
      } else {
        user = null
        store.commit('SET_USER', userDisplay)
      }
      store.commit('SET_USER', userDisplay)
      resolve()
    })
  })
}
