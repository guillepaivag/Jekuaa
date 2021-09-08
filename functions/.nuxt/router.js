import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _12112529 = () => interopDefault(import('..\\..\\jekuaaNuxt\\pages\\blog\\index.vue' /* webpackChunkName: "pages/blog/index" */))
const _25220a14 = () => interopDefault(import('..\\..\\jekuaaNuxt\\pages\\cursos\\index.vue' /* webpackChunkName: "pages/cursos/index" */))
const _ca494018 = () => interopDefault(import('..\\..\\jekuaaNuxt\\pages\\miembro-jekuaa\\index.vue' /* webpackChunkName: "pages/miembro-jekuaa/index" */))
const _4118ef02 = () => interopDefault(import('..\\..\\jekuaaNuxt\\pages\\perfil\\index.vue' /* webpackChunkName: "pages/perfil/index" */))
const _c4c77858 = () => interopDefault(import('..\\..\\jekuaaNuxt\\pages\\planes\\index.vue' /* webpackChunkName: "pages/planes/index" */))
const _77ba35f4 = () => interopDefault(import('..\\..\\jekuaaNuxt\\pages\\autenticacion\\inicioSesion.vue' /* webpackChunkName: "pages/autenticacion/inicioSesion" */))
const _01cdbbed = () => interopDefault(import('..\\..\\jekuaaNuxt\\pages\\autenticacion\\registro.vue' /* webpackChunkName: "pages/autenticacion/registro" */))
const _78038c12 = () => interopDefault(import('..\\..\\jekuaaNuxt\\pages\\miembro-jekuaa\\blog\\index.vue' /* webpackChunkName: "pages/miembro-jekuaa/blog/index" */))
const _4fd34a86 = () => interopDefault(import('..\\..\\jekuaaNuxt\\pages\\miembro-jekuaa\\cursos\\index.vue' /* webpackChunkName: "pages/miembro-jekuaa/cursos/index" */))
const _4d2d7062 = () => interopDefault(import('..\\..\\jekuaaNuxt\\pages\\miembro-jekuaa\\usuarios\\index.vue' /* webpackChunkName: "pages/miembro-jekuaa/usuarios/index" */))
const _42044640 = () => interopDefault(import('..\\..\\jekuaaNuxt\\pages\\miembro-jekuaa\\usuarios\\lista-usuarios\\index.vue' /* webpackChunkName: "pages/miembro-jekuaa/usuarios/lista-usuarios/index" */))
const _f34cb7cc = () => interopDefault(import('..\\..\\jekuaaNuxt\\pages\\miembro-jekuaa\\usuarios\\_uidUsuario.vue' /* webpackChunkName: "pages/miembro-jekuaa/usuarios/_uidUsuario" */))
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
    path: "/blog",
    component: _12112529,
    name: "blog"
  }, {
    path: "/cursos",
    component: _25220a14,
    name: "cursos"
  }, {
    path: "/miembro-jekuaa",
    component: _ca494018,
    name: "miembro-jekuaa"
  }, {
    path: "/perfil",
    component: _4118ef02,
    name: "perfil"
  }, {
    path: "/planes",
    component: _c4c77858,
    name: "planes"
  }, {
    path: "/autenticacion/inicioSesion",
    component: _77ba35f4,
    name: "autenticacion-inicioSesion"
  }, {
    path: "/autenticacion/registro",
    component: _01cdbbed,
    name: "autenticacion-registro"
  }, {
    path: "/miembro-jekuaa/blog",
    component: _78038c12,
    name: "miembro-jekuaa-blog"
  }, {
    path: "/miembro-jekuaa/cursos",
    component: _4fd34a86,
    name: "miembro-jekuaa-cursos"
  }, {
    path: "/miembro-jekuaa/usuarios",
    component: _4d2d7062,
    name: "miembro-jekuaa-usuarios"
  }, {
    path: "/miembro-jekuaa/usuarios/lista-usuarios",
    component: _42044640,
    name: "miembro-jekuaa-usuarios-lista-usuarios"
  }, {
    path: "/miembro-jekuaa/usuarios/:uidUsuario",
    component: _f34cb7cc,
    name: "miembro-jekuaa-usuarios-uidUsuario"
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
