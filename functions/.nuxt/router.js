import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _3ea0c566 = () => interopDefault(import('..\\..\\jekuaaNuxt\\pages\\admin\\index.vue' /* webpackChunkName: "pages/admin/index" */))
const _97099906 = () => interopDefault(import('..\\..\\jekuaaNuxt\\pages\\blog\\index.vue' /* webpackChunkName: "pages/blog/index" */))
const _557c5930 = () => interopDefault(import('..\\..\\jekuaaNuxt\\pages\\cursos\\index.vue' /* webpackChunkName: "pages/cursos/index" */))
const _e0d95c5a = () => interopDefault(import('..\\..\\jekuaaNuxt\\pages\\perfil\\index.vue' /* webpackChunkName: "pages/perfil/index" */))
const _4dbc0d28 = () => interopDefault(import('..\\..\\jekuaaNuxt\\pages\\planes\\index.vue' /* webpackChunkName: "pages/planes/index" */))
const _5020d7f8 = () => interopDefault(import('..\\..\\jekuaaNuxt\\pages\\admin\\blog\\index.vue' /* webpackChunkName: "pages/admin/blog/index" */))
const _25bfa3a2 = () => interopDefault(import('..\\..\\jekuaaNuxt\\pages\\admin\\cursos\\index.vue' /* webpackChunkName: "pages/admin/cursos/index" */))
const _5967f27e = () => interopDefault(import('..\\..\\jekuaaNuxt\\pages\\admin\\usuarios\\index.vue' /* webpackChunkName: "pages/admin/usuarios/index" */))
const _146dcb5a = () => interopDefault(import('..\\..\\jekuaaNuxt\\pages\\autenticacion\\inicioSesion.vue' /* webpackChunkName: "pages/autenticacion/inicioSesion" */))
const _7ade277e = () => interopDefault(import('..\\..\\jekuaaNuxt\\pages\\autenticacion\\registro.vue' /* webpackChunkName: "pages/autenticacion/registro" */))
const _5bb9dbf6 = () => interopDefault(import('..\\..\\jekuaaNuxt\\pages\\admin\\usuarios\\_uidUser\\index.vue' /* webpackChunkName: "pages/admin/usuarios/_uidUser/index" */))
const _58a2fed0 = () => interopDefault(import('..\\..\\jekuaaNuxt\\pages\\admin\\usuarios\\_uidUser\\editar.vue' /* webpackChunkName: "pages/admin/usuarios/_uidUser/editar" */))
const _1b6eaccc = () => interopDefault(import('..\\..\\jekuaaNuxt\\pages\\bienvenido-a-jekuaa\\_nombreUsuario.vue' /* webpackChunkName: "pages/bienvenido-a-jekuaa/_nombreUsuario" */))
const _34fcd4e8 = () => interopDefault(import('..\\..\\jekuaaNuxt\\pages\\blog\\_uid\\index.vue' /* webpackChunkName: "pages/blog/_uid/index" */))
const _5653b39f = () => interopDefault(import('..\\..\\jekuaaNuxt\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/admin",
    component: _3ea0c566,
    name: "admin"
  }, {
    path: "/blog",
    component: _97099906,
    name: "blog"
  }, {
    path: "/cursos",
    component: _557c5930,
    name: "cursos"
  }, {
    path: "/perfil",
    component: _e0d95c5a,
    name: "perfil"
  }, {
    path: "/planes",
    component: _4dbc0d28,
    name: "planes"
  }, {
    path: "/admin/blog",
    component: _5020d7f8,
    name: "admin-blog"
  }, {
    path: "/admin/cursos",
    component: _25bfa3a2,
    name: "admin-cursos"
  }, {
    path: "/admin/usuarios",
    component: _5967f27e,
    name: "admin-usuarios"
  }, {
    path: "/autenticacion/inicioSesion",
    component: _146dcb5a,
    name: "autenticacion-inicioSesion"
  }, {
    path: "/autenticacion/registro",
    component: _7ade277e,
    name: "autenticacion-registro"
  }, {
    path: "/admin/usuarios/:uidUser",
    component: _5bb9dbf6,
    name: "admin-usuarios-uidUser"
  }, {
    path: "/admin/usuarios/:uidUser/editar",
    component: _58a2fed0,
    name: "admin-usuarios-uidUser-editar"
  }, {
    path: "/bienvenido-a-jekuaa/:nombreUsuario?",
    component: _1b6eaccc,
    name: "bienvenido-a-jekuaa-nombreUsuario"
  }, {
    path: "/blog/:uid",
    component: _34fcd4e8,
    name: "blog-uid"
  }, {
    path: "/",
    component: _5653b39f,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config.app && config.app.basePath) || routerOptions.base
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
