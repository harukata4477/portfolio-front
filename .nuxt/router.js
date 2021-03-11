import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from '@nuxt/ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _10ba8d22 = () => interopDefault(import('../pages/login.vue' /* webpackChunkName: "pages/login" */))
const _490e6182 = () => interopDefault(import('../pages/signup.vue' /* webpackChunkName: "pages/signup" */))
const _c91b56de = () => interopDefault(import('../pages/users/index.vue' /* webpackChunkName: "pages/users/index" */))
const _19565593 = () => interopDefault(import('../pages/users/edits/_id.vue' /* webpackChunkName: "pages/users/edits/_id" */))
const _fc1e33e8 = () => interopDefault(import('../pages/users/follows/_id.vue' /* webpackChunkName: "pages/users/follows/_id" */))
const _c240fab4 = () => interopDefault(import('../pages/users/likes/_id.vue' /* webpackChunkName: "pages/users/likes/_id" */))
const _7e88b3bd = () => interopDefault(import('../pages/users/posts/_id.vue' /* webpackChunkName: "pages/users/posts/_id" */))
const _1c03718e = () => interopDefault(import('../pages/users/_id.vue' /* webpackChunkName: "pages/users/_id" */))
const _2dfb1658 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

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
    path: "/login",
    component: _10ba8d22,
    name: "login"
  }, {
    path: "/signup",
    component: _490e6182,
    name: "signup"
  }, {
    path: "/users",
    component: _c91b56de,
    name: "users"
  }, {
    path: "/users/edits/:id?",
    component: _19565593,
    name: "users-edits-id"
  }, {
    path: "/users/follows/:id?",
    component: _fc1e33e8,
    name: "users-follows-id"
  }, {
    path: "/users/likes/:id?",
    component: _c240fab4,
    name: "users-likes-id"
  }, {
    path: "/users/posts/:id?",
    component: _7e88b3bd,
    name: "users-posts-id"
  }, {
    path: "/users/:id",
    component: _1c03718e,
    name: "users-id"
  }, {
    path: "/",
    component: _2dfb1658,
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
