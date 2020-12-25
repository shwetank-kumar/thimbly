import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from '@nuxt/ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _1c3cffb1 = () => interopDefault(import('../pages/privacy.vue' /* webpackChunkName: "pages/privacy" */))
const _47f2fb8e = () => interopDefault(import('../pages/test.vue' /* webpackChunkName: "pages/test" */))
const _d82cb3fe = () => interopDefault(import('../pages/tos.vue' /* webpackChunkName: "pages/tos" */))
const _29d75fdc = () => interopDefault(import('../pages/seller/preferences/index.vue' /* webpackChunkName: "pages/seller/preferences/index" */))
const _ad0cf840 = () => interopDefault(import('../pages/seller/products/index.vue' /* webpackChunkName: "pages/seller/products/index" */))
const _a5297a44 = () => interopDefault(import('../pages/seller/products/create.vue' /* webpackChunkName: "pages/seller/products/create" */))
const _51b2e31b = () => interopDefault(import('../pages/seller/products/_product_id/index.vue' /* webpackChunkName: "pages/seller/products/_product_id/index" */))
const _7c62f0d1 = () => interopDefault(import('../pages/seller/products/_product_id/edit.vue' /* webpackChunkName: "pages/seller/products/_product_id/edit" */))
const _84c0ff8a = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/privacy",
    component: _1c3cffb1,
    name: "privacy"
  }, {
    path: "/test",
    component: _47f2fb8e,
    name: "test"
  }, {
    path: "/tos",
    component: _d82cb3fe,
    name: "tos"
  }, {
    path: "/seller/preferences",
    component: _29d75fdc,
    name: "seller-preferences"
  }, {
    path: "/seller/products",
    component: _ad0cf840,
    name: "seller-products"
  }, {
    path: "/seller/products/create",
    component: _a5297a44,
    name: "seller-products-create"
  }, {
    path: "/seller/products/:product_id",
    component: _51b2e31b,
    name: "seller-products-product_id"
  }, {
    path: "/seller/products/:product_id/edit",
    component: _7c62f0d1,
    name: "seller-products-product_id-edit"
  }, {
    path: "/",
    component: _84c0ff8a,
    name: "index"
  }],

  fallback: false
}

function decodeObj(obj) {
  for (const key in obj) {
    if (typeof obj[key] === 'string') {
      obj[key] = decode(obj[key])
    }
  }
}

export function createRouter () {
  const router = new Router(routerOptions)

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    const r = resolve(to, current, append)
    if (r && r.resolved && r.resolved.query) {
      decodeObj(r.resolved.query)
    }
    return r
  }

  return router
}
