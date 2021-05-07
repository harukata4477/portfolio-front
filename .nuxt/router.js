import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from '@nuxt/ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _446aebc8 = () => interopDefault(import('../pages/calendars/index.vue' /* webpackChunkName: "pages/calendars/index" */))
const _0022e6e6 = () => interopDefault(import('../pages/help.vue' /* webpackChunkName: "pages/help" */))
const _4cb498cd = () => interopDefault(import('../pages/login.vue' /* webpackChunkName: "pages/login" */))
const _288fbd0c = () => interopDefault(import('../pages/posts/index.vue' /* webpackChunkName: "pages/posts/index" */))
const _a0f15342 = () => interopDefault(import('../pages/rooms/index.vue' /* webpackChunkName: "pages/rooms/index" */))
const _d38f2438 = () => interopDefault(import('../pages/signup.vue' /* webpackChunkName: "pages/signup" */))
const _19eab56f = () => interopDefault(import('../pages/users/index.vue' /* webpackChunkName: "pages/users/index" */))
const _99ff4ef8 = () => interopDefault(import('../pages/posts/create.vue' /* webpackChunkName: "pages/posts/create" */))
const _6917c03f = () => interopDefault(import('../pages/rooms/create.vue' /* webpackChunkName: "pages/rooms/create" */))
const _06a985fc = () => interopDefault(import('../pages/posts/edits/_id.vue' /* webpackChunkName: "pages/posts/edits/_id" */))
const _1e51d11e = () => interopDefault(import('../pages/users/edits/_id.vue' /* webpackChunkName: "pages/users/edits/_id" */))
const _82469d46 = () => interopDefault(import('../pages/users/followers/_id.vue' /* webpackChunkName: "pages/users/followers/_id" */))
const _7c48a86a = () => interopDefault(import('../pages/users/follows/_id.vue' /* webpackChunkName: "pages/users/follows/_id" */))
const _76604484 = () => interopDefault(import('../pages/users/likes/_id.vue' /* webpackChunkName: "pages/users/likes/_id" */))
const _5609759b = () => interopDefault(import('../pages/users/posts/_id.vue' /* webpackChunkName: "pages/users/posts/_id" */))
const _512738f8 = () => interopDefault(import('../pages/calendars/_id.vue' /* webpackChunkName: "pages/calendars/_id" */))
const _30178b3c = () => interopDefault(import('../pages/posts/_id.vue' /* webpackChunkName: "pages/posts/_id" */))
const _793536f2 = () => interopDefault(import('../pages/rooms/_id.vue' /* webpackChunkName: "pages/rooms/_id" */))
const _bb9570d2 = () => interopDefault(import('../pages/users/_id.vue' /* webpackChunkName: "pages/users/_id" */))
const _f9e61494 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

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
    component: _446aebc8,
    name: "calendars"
  }, {
    path: "/help",
    component: _0022e6e6,
    name: "help"
  }, {
    path: "/login",
    component: _4cb498cd,
    name: "login"
  }, {
    path: "/posts",
    component: _288fbd0c,
    name: "posts"
  }, {
    path: "/rooms",
    component: _a0f15342,
    name: "rooms"
  }, {
    path: "/signup",
    component: _d38f2438,
    name: "signup"
  }, {
    path: "/users",
    component: _19eab56f,
    name: "users"
  }, {
    path: "/posts/create",
    component: _99ff4ef8,
    name: "posts-create"
  }, {
    path: "/rooms/create",
    component: _6917c03f,
    name: "rooms-create"
  }, {
    path: "/posts/edits/:id?",
    component: _06a985fc,
    name: "posts-edits-id"
  }, {
    path: "/users/edits/:id?",
    component: _1e51d11e,
    name: "users-edits-id"
  }, {
    path: "/users/followers/:id?",
    component: _82469d46,
    name: "users-followers-id"
  }, {
    path: "/users/follows/:id?",
    component: _7c48a86a,
    name: "users-follows-id"
  }, {
    path: "/users/likes/:id?",
    component: _76604484,
    name: "users-likes-id"
  }, {
    path: "/users/posts/:id?",
    component: _5609759b,
    name: "users-posts-id"
  }, {
    path: "/calendars/:id",
    component: _512738f8,
    name: "calendars-id"
  }, {
    path: "/posts/:id",
    component: _30178b3c,
    name: "posts-id"
  }, {
    path: "/rooms/:id",
    component: _793536f2,
    name: "rooms-id"
  }, {
    path: "/users/:id",
    component: _bb9570d2,
    name: "users-id"
  }, {
    path: "/",
    component: _f9e61494,
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
