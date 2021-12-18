import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _5163fa38 = () => interopDefault(import('..\\..\\jekuaaNuxt\\pages\\blogs\\index.vue' /* webpackChunkName: "pages/blogs/index" */))
const _55e36ebc = () => interopDefault(import('..\\..\\jekuaaNuxt\\pages\\inicio.vue' /* webpackChunkName: "pages/inicio" */))
const _ca494018 = () => interopDefault(import('..\\..\\jekuaaNuxt\\pages\\miembro-jekuaa\\index.vue' /* webpackChunkName: "pages/miembro-jekuaa/index" */))
const _12f09ea3 = () => interopDefault(import('..\\..\\jekuaaNuxt\\pages\\perfil.vue' /* webpackChunkName: "pages/perfil" */))
const _4118ef02 = () => interopDefault(import('..\\..\\jekuaaNuxt\\pages\\perfil\\index.vue' /* webpackChunkName: "pages/perfil/index" */))
const _95710d6c = () => interopDefault(import('..\\..\\jekuaaNuxt\\pages\\perfil\\informacion.vue' /* webpackChunkName: "pages/perfil/informacion" */))
const _1d940d5d = () => interopDefault(import('..\\..\\jekuaaNuxt\\pages\\perfil\\seguridad.vue' /* webpackChunkName: "pages/perfil/seguridad" */))
const _77ba35f4 = () => interopDefault(import('..\\..\\jekuaaNuxt\\pages\\autenticacion\\inicioSesion.vue' /* webpackChunkName: "pages/autenticacion/inicioSesion" */))
const _01cdbbed = () => interopDefault(import('..\\..\\jekuaaNuxt\\pages\\autenticacion\\registro.vue' /* webpackChunkName: "pages/autenticacion/registro" */))
const _ac831f22 = () => interopDefault(import('..\\..\\jekuaaNuxt\\pages\\miembro-jekuaa\\blogs\\index.vue' /* webpackChunkName: "pages/miembro-jekuaa/blogs/index" */))
const _ed3fda90 = () => interopDefault(import('..\\..\\jekuaaNuxt\\pages\\miembro-jekuaa\\blogs\\mis-blogs.vue' /* webpackChunkName: "pages/miembro-jekuaa/blogs/mis-blogs" */))
const _90b2c058 = () => interopDefault(import('..\\..\\jekuaaNuxt\\pages\\miembro-jekuaa\\blogs\\nuevo.vue' /* webpackChunkName: "pages/miembro-jekuaa/blogs/nuevo" */))
const _7f06e921 = () => interopDefault(import('..\\..\\jekuaaNuxt\\pages\\miembro-jekuaa\\blog\\actualizar\\_referencia.vue' /* webpackChunkName: "pages/miembro-jekuaa/blog/actualizar/_referencia" */))
const _3b178e51 = () => interopDefault(import('..\\..\\jekuaaNuxt\\pages\\miembro-jekuaa\\blog\\_referencia.vue' /* webpackChunkName: "pages/miembro-jekuaa/blog/_referencia" */))
const _2d566381 = () => interopDefault(import('..\\..\\jekuaaNuxt\\pages\\bienvenido-a-jekuaapy\\_nombreUsuario.vue' /* webpackChunkName: "pages/bienvenido-a-jekuaapy/_nombreUsuario" */))
const _9d048bb0 = () => interopDefault(import('..\\..\\jekuaaNuxt\\pages\\blog\\_referencia.vue' /* webpackChunkName: "pages/blog/_referencia" */))
const _707244fe = () => interopDefault(import('..\\..\\jekuaaNuxt\\pages\\blogs\\_seccion\\index.vue' /* webpackChunkName: "pages/blogs/_seccion/index" */))
const _048ec7cf = () => interopDefault(import('..\\..\\jekuaaNuxt\\pages\\estudiante\\_nombreUsuario.vue' /* webpackChunkName: "pages/estudiante/_nombreUsuario" */))
const _280c634d = () => interopDefault(import('..\\..\\jekuaaNuxt\\pages\\blogs\\_seccion\\_categoria\\index.vue' /* webpackChunkName: "pages/blogs/_seccion/_categoria/index" */))
const _31ed6c2d = () => interopDefault(import('..\\..\\jekuaaNuxt\\pages\\blogs\\_seccion\\_categoria\\_subCategoria.vue' /* webpackChunkName: "pages/blogs/_seccion/_categoria/_subCategoria" */))
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
    path: "/blogs",
    component: _5163fa38,
    name: "blogs"
  }, {
    path: "/inicio",
    component: _55e36ebc,
    name: "inicio"
  }, {
    path: "/miembro-jekuaa",
    component: _ca494018,
    name: "miembro-jekuaa"
  }, {
    path: "/perfil",
    component: _12f09ea3,
    children: [{
      path: "",
      component: _4118ef02,
      name: "perfil"
    }, {
      path: "informacion",
      component: _95710d6c,
      name: "perfil-informacion"
    }, {
      path: "seguridad",
      component: _1d940d5d,
      name: "perfil-seguridad"
    }]
  }, {
    path: "/autenticacion/inicioSesion",
    component: _77ba35f4,
    name: "autenticacion-inicioSesion"
  }, {
    path: "/autenticacion/registro",
    component: _01cdbbed,
    name: "autenticacion-registro"
  }, {
    path: "/miembro-jekuaa/blogs",
    component: _ac831f22,
    name: "miembro-jekuaa-blogs"
  }, {
    path: "/miembro-jekuaa/blogs/mis-blogs",
    component: _ed3fda90,
    name: "miembro-jekuaa-blogs-mis-blogs"
  }, {
    path: "/miembro-jekuaa/blogs/nuevo",
    component: _90b2c058,
    name: "miembro-jekuaa-blogs-nuevo"
  }, {
    path: "/miembro-jekuaa/blog/actualizar/:referencia?",
    component: _7f06e921,
    name: "miembro-jekuaa-blog-actualizar-referencia"
  }, {
    path: "/miembro-jekuaa/blog/:referencia",
    component: _3b178e51,
    name: "miembro-jekuaa-blog-referencia"
  }, {
    path: "/bienvenido-a-jekuaapy/:nombreUsuario?",
    component: _2d566381,
    name: "bienvenido-a-jekuaapy-nombreUsuario"
  }, {
    path: "/blog/:referencia?",
    component: _9d048bb0,
    name: "blog-referencia"
  }, {
    path: "/blogs/:seccion",
    component: _707244fe,
    name: "blogs-seccion"
  }, {
    path: "/estudiante/:nombreUsuario?",
    component: _048ec7cf,
    name: "estudiante-nombreUsuario"
  }, {
    path: "/blogs/:seccion/:categoria",
    component: _280c634d,
    name: "blogs-seccion-categoria"
  }, {
    path: "/blogs/:seccion/:categoria/:subCategoria",
    component: _31ed6c2d,
    name: "blogs-seccion-categoria-subCategoria"
  }, {
    path: "/",
    component: _50fb564b,
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
