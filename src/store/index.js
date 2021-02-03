import {fireAuth} from "~/plugins/firebase.js"

export const strict = true
export const state = () => ({
  productId: null,
  user: {
    display_name: null,
    email: null,
    uid: null,
    stripe_id: null,
  },
  buyerDetails: {
    first_name: null,
    last_name: null,
    email: null,
    phone: null,
    address: {
      address_one: null,
      address_two: null,
      city: null,
      state: null,
      zip: null,
    },
  },
  currentPhoto: 0,
  productDetails: {
    ownerUid: null,
    productPhotos: [],
    productTitle: null,
    productDescription: null,
    productPricing: null,
    productQuantity: null,
    published: false,
    shippingOptions: [],
  },
  storeProducts: {},
  stripeSetup: {
    capabilities: {
      transfers: {
        requested: true,
      },
    },
    individual: {first_name: null, last_name: null},
    external_account: null,
  },
})

export const mutations = {
  SET_USER(state, payload) {
    state.user = payload
  },
  RESET_PRODUCT_DETAILS(state) {
    for (var key in state.productDetails) {
      state.productDetails[key] = null
    }
    state.productDetails.productPhotos = []
    state.productDetails.shippingOptions = []
  },
  SET_PRODUCT_DETAILS(state, payload) {
    state.productDetails = {...state.productDetails, ...payload}
  },
  SET_PRODUCT_ID(state, payload) {
    state.productId = payload
  },
  ADD_PRODUCT_PHOTOS(state, payload) {
    state.productDetails.productPhotos.push(URL.createObjectURL(payload))
    state.currentPhoto = state.productDetails.productPhotos.length - 1
  },
  DELETE_PRODUCT_PHOTOS(state) {
    state.productDetails.productPhotos.splice(state.currentPhoto, 1)
    state.currentPhoto = state.currentPhoto - 1
  },
  SET_CURRENT_PHOTO(state, payload) {
    state.currentPhoto = payload
  },
  SET_STORE_PRODUCTS(state, payload) {
    state.storeProducts = payload
  },
  SET_INDIVIDUAL_FIRST_NAME(state, payload) {
    state.stripeSetup.individual.first_name = payload
  },
  SET_INDIVIDUAL_LAST_NAME(state, payload) {
    state.stripeSetup.individual.last_name = payload
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
    var isValidShippingInfo = state.productDetails.shippingOptions.length > 0
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
  SIGNOUT({commit}) {
    fireAuth
      .signOut()
      .then(() => {
        commit("SET_USER", null)
      })
      .catch((err) => alert(err))
  },
}
