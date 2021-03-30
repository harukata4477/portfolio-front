import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from '@nuxt/ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _0649c83e = () => interopDefault(import('../pages/calendars/index.vue' /* webpackChunkName: "pages/calendars/index" */))
const _10ba8d22 = () => interopDefault(import('../pages/login.vue' /* webpackChunkName: "pages/login" */))
const _310ef581 = () => interopDefault(import('../pages/rooms/index.vue' /* webpackChunkName: "pages/rooms/index" */))
const _490e6182 = () => interopDefault(import('../pages/signup.vue' /* webpackChunkName: "pages/signup" */))
const _4b01347c = () => interopDefault(import('../pages/test.vue' /* webpackChunkName: "pages/test" */))
const _c91b56de = () => interopDefault(import('../pages/users/index.vue' /* webpackChunkName: "pages/users/index" */))
const _626c9da2 = () => interopDefault(import('../pages/posts/create.vue' /* webpackChunkName: "pages/posts/create" */))
const _1884055d = () => interopDefault(import('../pages/rooms/create.vue' /* webpackChunkName: "pages/rooms/create" */))
const _2f28c41e = () => interopDefault(import('../pages/posts/edits/_id.vue' /* webpackChunkName: "pages/posts/edits/_id" */))
const _62958d8a = () => interopDefault(import('../pages/posts/main/_id.vue' /* webpackChunkName: "pages/posts/main/_id" */))
const _19565593 = () => interopDefault(import('../pages/users/edits/_id.vue' /* webpackChunkName: "pages/users/edits/_id" */))
const _fc1e33e8 = () => interopDefault(import('../pages/users/follows/_id.vue' /* webpackChunkName: "pages/users/follows/_id" */))
const _c240fab4 = () => interopDefault(import('../pages/users/likes/_id.vue' /* webpackChunkName: "pages/users/likes/_id" */))
const _7e88b3bd = () => interopDefault(import('../pages/users/posts/_id.vue' /* webpackChunkName: "pages/users/posts/_id" */))
const _1588c226 = () => interopDefault(import('../pages/calendars/_id.vue' /* webpackChunkName: "pages/calendars/_id" */))
const _132e6429 = () => interopDefault(import('../pages/rooms/_id.vue' /* webpackChunkName: "pages/rooms/_id" */))
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
    path: "/calendars",
    component: _0649c83e,
    name: "calendars"
  }, {
    path: "/login",
    component: _10ba8d22,
    name: "login"
  }, {
    path: "/rooms",
    component: _310ef581,
    name: "rooms"
  }, {
    path: "/signup",
    component: _490e6182,
    name: "signup"
  }, {
    path: "/test",
    component: _4b01347c,
    name: "test"
  }, {
    path: "/users",
    component: _c91b56de,
    name: "users"
  }, {
    path: "/posts/create",
    component: _626c9da2,
    name: "posts-create"
  }, {
    path: "/rooms/create",
    component: _1884055d,
    name: "rooms-create"
  }, {
    path: "/posts/edits/:id?",
    component: _2f28c41e,
    name: "posts-edits-id"
  }, {
    path: "/posts/main/:id?",
    component: _62958d8a,
    name: "posts-main-id"
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
    path: "/calendars/:id",
    component: _1588c226,
    name: "calendars-id"
  }, {
    path: "/rooms/:id",
    component: _132e6429,
    name: "rooms-id"
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
