export const state = () => ({
  user: null,
})

export const mutations = {
  loginUser(state, payload) {
    state.user = {
      username: payload.displayName,
      email: payload.email,
      uid: payload.uid,
    }
  },
}

export const getters = {
  user: (state) => state.user,
}
