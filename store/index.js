import { fireAuth } from '~/plugins/firebase.js'

export const strict = true
export const state = () => ({
  user: null,
})

export const mutations = {
  setUser(state, payload) {
    state.user = payload
  },
}

export const actions = {
  signOut({ commit }) {
    fireAuth
      .signOut()
      .then(() => {
        commit('setUser', null)
      })
      .catch((err) => alert(err))
  },
}
