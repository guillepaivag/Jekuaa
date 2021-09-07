import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _d86ded8c = () => interopDefault(import('..\\..\\jekuaaNuxt\\pages\\admin\\index.vue' /* webpackChunkName: "pages/admin/index" */))
const _12112529 = () => interopDefault(import('..\\..\\jekuaaNuxt\\pages\\blog\\index.vue' /* webpackChunkName: "pages/blog/index" */))
const _25220a14 = () => interopDefault(import('..\\..\\jekuaaNuxt\\pages\\cursos\\index.vue' /* webpackChunkName: "pages/cursos/index" */))
const _4118ef02 = () => interopDefault(import('..\\..\\jekuaaNuxt\\pages\\perfil\\index.vue' /* webpackChunkName: "pages/perfil/index" */))
const _c4c77858 = () => interopDefault(import('..\\..\\jekuaaNuxt\\pages\\planes\\index.vue' /* webpackChunkName: "pages/planes/index" */))
const _817aae50 = () => interopDefault(import('..\\..\\jekuaaNuxt\\pages\\admin\\blog\\index.vue' /* webpackChunkName: "pages/admin/blog/index" */))
const _4c015e03 = () => interopDefault(import('..\\..\\jekuaaNuxt\\pages\\admin\\cursos\\index.vue' /* webpackChunkName: "pages/admin/cursos/index" */))
const _02bedcd6 = () => interopDefault(import('..\\..\\jekuaaNuxt\\pages\\admin\\usuarios\\index.vue' /* webpackChunkName: "pages/admin/usuarios/index" */))
const _77ba35f4 = () => interopDefault(import('..\\..\\jekuaaNuxt\\pages\\autenticacion\\inicioSesion.vue' /* webpackChunkName: "pages/autenticacion/inicioSesion" */))
const _01cdbbed = () => interopDefault(import('..\\..\\jekuaaNuxt\\pages\\autenticacion\\registro.vue' /* webpackChunkName: "pages/autenticacion/registro" */))
const _7a3723d9 = () => interopDefault(import('..\\..\\jekuaaNuxt\\pages\\admin\\usuarios\\_uidUser\\index.vue' /* webpackChunkName: "pages/admin/usuarios/_uidUser/index" */))
const _2e1ca944 = () => interopDefault(import('..\\..\\jekuaaNuxt\\pages\\admin\\usuarios\\_uidUser\\editar.vue' /* webpackChunkName: "pages/admin/usuarios/_uidUser/editar" */))
const _da154b10 = () => interopDefault(import('..\\..\\jekuaaNuxt\\pages\\bienvenido-a-jekuaa\\_nombreUsuario.vue' /* webpackChunkName: "pages/bienvenido-a-jekuaa/_nombreUsuario" */))
const _47ce9638 = () => interopDefault(import('..\\..\\jekuaaNuxt\\pages\\blog\\_uid\\index.vue' /* webpackChunkName: "pages/blog/_uid/index" */))
const _50fb564b = () => interopDefault(import('..\\..\\jekuaaNuxt\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

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
    component: _d86ded8c,
    name: "admin"
  }, {
    path: "/blog",
    component: _12112529,
    name: "blog"
  }, {
    path: "/cursos",
    component: _25220a14,
    name: "cursos"
  }, {
    path: "/perfil",
    component: _4118ef02,
    name: "perfil"
  }, {
    path: "/planes",
    component: _c4c77858,
    name: "planes"
  }, {
    path: "/admin/blog",
    component: _817aae50,
    name: "admin-blog"
  }, {
    path: "/admin/cursos",
    component: _4c015e03,
    name: "admin-cursos"
  }, {
    path: "/admin/usuarios",
    component: _02bedcd6,
    name: "admin-usuarios"
  }, {
    path: "/autenticacion/inicioSesion",
    component: _77ba35f4,
    name: "autenticacion-inicioSesion"
  }, {
    path: "/autenticacion/registro",
    component: _01cdbbed,
    name: "autenticacion-registro"
  }, {
    path: "/admin/usuarios/:uidUser",
    component: _7a3723d9,
    name: "admin-usuarios-uidUser"
  }, {
    path: "/admin/usuarios/:uidUser/editar",
    component: _2e1ca944,
    name: "admin-usuarios-uidUser-editar"
  }, {
    path: "/bienvenido-a-jekuaa/:nombreUsuario?",
    component: _da154b10,
    name: "bienvenido-a-jekuaa-nombreUsuario"
  }, {
    path: "/blog/:uid",
    component: _47ce9638,
    name: "blog-uid"
  }, {
    path: "/",
    component: _50fb564b,
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
