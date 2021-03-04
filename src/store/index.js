import {fireAuth} from "~/plugins/firebase.js"

export const strict = true
export const state = () => ({
  product_id: null,
  user: {
    display_name: null,
    email: null,
    uid: null,
    stripe_id: null,
  },
  currentPhoto: 0,
  productDetails: {
    seller_id: null,
    productPhotos: [],
    productTitle: null,
    productDescription: null,
    productPricing: null,
    productQuantity: null,
    published: false,
    shipping: null,
  },
  // storeProducts: {},
  stripeSetup: {
    capabilities: {
      transfers: {
        requested: true,
      },
    },
    individual: {first_name: null, last_name: null},
    external_account: null,
  },
  order: {
    shipping_details: {
      name: null,
      email: null,
      address: {
        line1: null,
        line2: null,
        city: null,
        state: null,
        postal_code: null,
        country: "US",
      },
    },
    quantity: 0,
    total: null,
    special_instructions: null,
  },
  seller: {
    display_name: null,
    email: null,
    uid: null,
    stripe_id: null,
  },
})

export const mutations = {
  SET_ORDER_ID(state, payload) {
    state.order_id = payload
  },
  SET_ORDER_QUANTITY(state, payload) {
    state.order.quantity = payload
  },
  SET_ORDER_TOTAL(state, payload) {
    state.order.total = payload
  },
  SET_ORDER_SPECIAL_INSTRUCTIONS(state, payload) {
    state.order.special_instructions = payload
  },
  SET_ORDER_SHIPPING_DETAILS_NAME(state, payload) {
    state.order.shipping_details.name = payload
  },
  SET_ORDER_SHIPPING_DETAILS_EMAIL(state, payload) {
    state.order.shipping_details.email = payload
  },
  SET_ORDER_SHIPPING_DETAILS_ADDRESS_LINE_ONE(state, payload) {
    state.order.shipping_details.address.line1 = payload
  },
  SET_ORDER_SHIPPING_DETAILS_ADDRESS_LINE_TWO(state, payload) {
    state.order.shipping_details.address.line2 = payload
  },
  SET_ORDER_SHIPPING_DETAILS_ADDRESS_CITY(state, payload) {
    state.order.shipping_details.address.city = payload
  },
  SET_ORDER_SHIPPING_DETAILS_ADDRESS_STATE(state, payload) {
    state.order.shipping_details.address.state = payload
  },
  SET_ORDER_SHIPPING_DETAILS_ADDRESS_POSTAL_CODE(state, payload) {
    state.order.shipping_details.address.postal_code = payload
  },
  SET_USER(state, payload) {
    state.user = payload
  },
  SET_SELLER(state, payload) {
    state.seller = payload
  },
  RESET_PRODUCT_DETAILS(state) {
    for (var key in state.productDetails) {
      state.productDetails[key] = null
    }
    state.productDetails.productPhotos = []
    // state.productDetails.shippingOptions = []
  },
  SET_PRODUCT_DETAILS(state, payload) {
    state.productDetails = {...state.productDetails, ...payload}
  },
  SET_PRODUCT_ID(state, payload) {
    state.product_id = payload
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
  SET_STRIPE_FIRST_NAME(state, payload) {
    state.stripeSetup.individual.first_name = payload
  },
  SET_STRIPE_LAST_NAME(state, payload) {
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
    // var isValidShippingInfo = state.productDetails.shippingOptions.length > 0
    return isValidProductInfo //&& isValidShippingInfo
  },
  GET_CURRENT_PHOTO: (state) => {
    return state.currentPhoto
  },
  GET_PRODUCT_DETAILS: (state) => {
    return state.productDetails
  },
  GET_ORDER: (state) => {
    return state.order
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
