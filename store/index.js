import { fireAuth } from '~/plugins/firebase.js'

export const strict = true
export const state = () => ({
  productId: null,
  user: null,
  localPhotoPaths: [],
  currentPhoto: 0,
  productDetails: {
    ownerUid: null,
    productPhotos: [],
    productTitle: null,
    productDescription: null,
    productPricing: null,
    productQuantity: null,
    shippingOptions: { pickup: false, standard: false, free: false },
  },
})

export const mutations = {
  SET_USER(state, payload) {
    state.user = payload
  },
  SET_PRODUCT_DETAILS(state, payload) {
    // console.log(payload)
    state.productDetails = { ...state.productDetails, ...payload }
  },
  SET_PRODUCT_ID(state, payload) {
    state.productId = payload
  },
  ADD_PRODUCT_PHOTOS(state, payload) {
    // console.log(payload)
    state.localPhotoPaths.push(URL.createObjectURL(payload))
    state.currentPhoto = state.localPhotoPaths.length - 1
  },
  DELETE_PRODUCT_PHOTOS(state) {
    state.localPhotoPaths.splice(state.currentPhoto, 1)
    state.currentPhoto = state.currentPhoto - 1
  },
  SET_CURRENT_PHOTO(state, payload) {
    state.currentPhoto = payload
  },
}

export const getters = {
  PREVIEW_ENABLED: (state) => {
    // var isValidPhotos = state.productDetails.productPhotos.length > 0
    var isValidProductInfo =
      !!state.productDetails.productTitle &&
      !!state.productDetails.productPricing &&
      !!state.productDetails.productQuantity &&
      Number.isInteger(Number(state.productDetails.productQuantity))
    var isValidShippingInfo =
      state.productDetails.shippingOptions.pickup ||
      state.productDetails.shippingOptions.standard ||
      state.productDetails.shippingOptions.free
    return isValidProductInfo && isValidShippingInfo
  },
  GET_CURRENT_PHOTO: (state) => {
    return state.currentPhoto
  },
  GET_PRODUCT_DETAILS: (state) => {
    return state.productDetails
  },
}

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
