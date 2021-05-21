import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _9c26a03a = () => interopDefault(import('../pages/calendars/index.vue' /* webpackChunkName: "pages/calendars/index" */))
const _006b85b4 = () => interopDefault(import('../pages/help.vue' /* webpackChunkName: "pages/help" */))
const _484efb54 = () => interopDefault(import('../pages/login.vue' /* webpackChunkName: "pages/login" */))
const _53ea42c1 = () => interopDefault(import('../pages/posts/index.vue' /* webpackChunkName: "pages/posts/index" */))
const _17b977a6 = () => interopDefault(import('../pages/rooms/index.vue' /* webpackChunkName: "pages/rooms/index" */))
const _0dea5c3d = () => interopDefault(import('../pages/signup.vue' /* webpackChunkName: "pages/signup" */))
const _fbc65294 = () => interopDefault(import('../pages/users/index.vue' /* webpackChunkName: "pages/users/index" */))
const _5112601d = () => interopDefault(import('../pages/posts/create.vue' /* webpackChunkName: "pages/posts/create" */))
const _0729c7d8 = () => interopDefault(import('../pages/rooms/create.vue' /* webpackChunkName: "pages/rooms/create" */))
const _4a68a87a = () => interopDefault(import('../pages/posts/edits/_id.vue' /* webpackChunkName: "pages/posts/edits/_id" */))
const _760d8590 = () => interopDefault(import('../pages/users/edits/_id.vue' /* webpackChunkName: "pages/users/edits/_id" */))
const _734ec8b8 = () => interopDefault(import('../pages/users/followers/_id.vue' /* webpackChunkName: "pages/users/followers/_id" */))
const _5f0f0f1e = () => interopDefault(import('../pages/users/follows/_id.vue' /* webpackChunkName: "pages/users/follows/_id" */))
const _4a826a4b = () => interopDefault(import('../pages/users/likes/_id.vue' /* webpackChunkName: "pages/users/likes/_id" */))
const _2a2b9b62 = () => interopDefault(import('../pages/users/posts/_id.vue' /* webpackChunkName: "pages/users/posts/_id" */))
const _08c961ea = () => interopDefault(import('../pages/calendars/_id.vue' /* webpackChunkName: "pages/calendars/_id" */))
const _1a07fd2e = () => interopDefault(import('../pages/posts/_id.vue' /* webpackChunkName: "pages/posts/_id" */))
const _6325a8e4 = () => interopDefault(import('../pages/rooms/_id.vue' /* webpackChunkName: "pages/rooms/_id" */))
const _a585e2c4 = () => interopDefault(import('../pages/users/_id.vue' /* webpackChunkName: "pages/users/_id" */))
const _7ea7583d = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/calendars",
    component: _9c26a03a,
    name: "calendars"
  }, {
    path: "/help",
    component: _006b85b4,
    name: "help"
  }, {
    path: "/login",
    component: _484efb54,
    name: "login"
  }, {
    path: "/posts",
    component: _53ea42c1,
    name: "posts"
  }, {
    path: "/rooms",
    component: _17b977a6,
    name: "rooms"
  }, {
    path: "/signup",
    component: _0dea5c3d,
    name: "signup"
  }, {
    path: "/users",
    component: _fbc65294,
    name: "users"
  }, {
    path: "/posts/create",
    component: _5112601d,
    name: "posts-create"
  }, {
    path: "/rooms/create",
    component: _0729c7d8,
    name: "rooms-create"
  }, {
    path: "/posts/edits/:id?",
    component: _4a68a87a,
    name: "posts-edits-id"
  }, {
    path: "/users/edits/:id?",
    component: _760d8590,
    name: "users-edits-id"
  }, {
    path: "/users/followers/:id?",
    component: _734ec8b8,
    name: "users-followers-id"
  }, {
    path: "/users/follows/:id?",
    component: _5f0f0f1e,
    name: "users-follows-id"
  }, {
    path: "/users/likes/:id?",
    component: _4a826a4b,
    name: "users-likes-id"
  }, {
    path: "/users/posts/:id?",
    component: _2a2b9b62,
    name: "users-posts-id"
  }, {
    path: "/calendars/:id",
    component: _08c961ea,
    name: "calendars-id"
  }, {
    path: "/posts/:id",
    component: _1a07fd2e,
    name: "posts-id"
  }, {
    path: "/rooms/:id",
    component: _6325a8e4,
    name: "rooms-id"
  }, {
    path: "/users/:id",
    component: _a585e2c4,
    name: "users-id"
  }, {
    path: "/",
    component: _7ea7583d,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
