const cookieParser = process.server ? require('cookieparser') : undefined
import firebase from 'firebase'

export const state = () => {
  return {
    auth: null,
    user: null,
  }
}

export const mutations = {
  setAuth(state, auth) {
    state.auth = auth
  },
  setUser(state, user) {
    const { uid, email, emailVerified, displayName, photoURL } = user
    state.user = {
      uid,
      displayName,
      email,
      emailVerified,
      photoURL: photoURL || null, // results in photoURL being null for server auth
      // use custom claims to control access (see https://firebase.google.com/docs/auth/admin/custom-claims)
    }
  },
}

export const getters = {
  auth: (state) => state.auth,
}

export const actions = {
  nuxtServerInit({ commit }, { req }) {
    // Get the token from the cookie, if available, and
    // initialise the `auth` state with it.
    let token = null
    if (req && req.headers && req.headers.cookie) {
      const parsed = cookieParser.parse(req.headers.cookie)
      token = parsed.token
    }
    commit('setAuth', token)
  },
  setAuth({ commit }, user) {
    if (!user) {
      commit('setAuth', null)
      document.cookie = 'token=;path=/;expires=0'
    } else {
      // When we have a valid user, we retrieve the user's token and save it to the `auth` state as well as in a cookie.
      user.getIdToken().then(
        (token) => {
          commit('setAuth', token)
          const { uid, email, emailVerified, displayName, photoURL } = user
          commit('setUser', {
            uid,
            email,
            emailVerified,
            displayName,
            photoURL,
          })
          const expiresIn = 60 * 60 * 24 * 5 * 1000 // 5 days.
          document.cookie = 'token=' + token + ';path=/;max-age=' + expiresIn
        },
        (error) => {
          console.log('Error getting ID token.', error)
          commit('setAuth', null)
          document.cookie = 'token=;path=/;expires=0'
        }
      )
    }
  },
}
