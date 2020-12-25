import { fireAuth } from '~/plugins/firebase.js'

export default (context) => {
  const { store } = context

  return new Promise((resolve, reject) => {
    fireAuth.onAuthStateChanged((user) => {
      let userDisplay
      if (user) {
        userDisplay = (({ displayName, email, uid }) => ({
          displayName,
          email,
          uid,
        }))(user)
      } else {
        userDisplay = null
      }
      store.commit('SET_USER', userDisplay)
      resolve()
    })
  })
}
