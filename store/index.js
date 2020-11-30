import { fireAuth } from '~/plugins/firebase.js'

export const strict = true
export const state = () => ({
  user: null,
  productDetails: null,
  previewDisabled: true,
})

export const mutations = {
  SET_USER(state, payload) {
    state.user = payload
  },
  SET_PRODUCT_DETAILS(state, payload) {
    state.productDetails = { ...state.productDetails, ...payload }
  },
}

// export const getters = {
//   GET_SUBMIT_DISABLED: (state) => {
//     console.log(typeof state.productDetails.productPricing === 'number')
//     state.previewDisabled = state.productDetails.productTitle.length > 0
//     return state.previewDisabled
//   },
// }

export const actions = {
  SIGNOUT({ commit }) {
    fireAuth
      .signOut()
      .then(() => {
        commit('SET_USER', null)
      })
      .catch((err) => alert(err))
  },
}
