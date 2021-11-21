import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _1161ae28 = () => interopDefault(import('..\\..\\jekuaaNuxt\\pages\\admin-jekuaa\\index.vue' /* webpackChunkName: "pages/admin-jekuaa/index" */))
const _12112529 = () => interopDefault(import('..\\..\\jekuaaNuxt\\pages\\blog\\index.vue' /* webpackChunkName: "pages/blog/index" */))
const _5163fa38 = () => interopDefault(import('..\\..\\jekuaaNuxt\\pages\\blogs\\index.vue' /* webpackChunkName: "pages/blogs/index" */))
const _ca494018 = () => interopDefault(import('..\\..\\jekuaaNuxt\\pages\\miembro-jekuaa\\index.vue' /* webpackChunkName: "pages/miembro-jekuaa/index" */))
const _12f09ea3 = () => interopDefault(import('..\\..\\jekuaaNuxt\\pages\\perfil.vue' /* webpackChunkName: "pages/perfil" */))
const _4118ef02 = () => interopDefault(import('..\\..\\jekuaaNuxt\\pages\\perfil\\index.vue' /* webpackChunkName: "pages/perfil/index" */))
const _95710d6c = () => interopDefault(import('..\\..\\jekuaaNuxt\\pages\\perfil\\informacion.vue' /* webpackChunkName: "pages/perfil/informacion" */))
const _1d940d5d = () => interopDefault(import('..\\..\\jekuaaNuxt\\pages\\perfil\\seguridad.vue' /* webpackChunkName: "pages/perfil/seguridad" */))
const _56db6346 = () => interopDefault(import('..\\..\\jekuaaNuxt\\pages\\admin-jekuaa\\blog\\index.vue' /* webpackChunkName: "pages/admin-jekuaa/blog/index" */))
const _605534f1 = () => interopDefault(import('..\\..\\jekuaaNuxt\\pages\\admin-jekuaa\\cursos\\index.vue' /* webpackChunkName: "pages/admin-jekuaa/cursos/index" */))
const _4d5a6503 = () => interopDefault(import('..\\..\\jekuaaNuxt\\pages\\admin-jekuaa\\usuarios\\index.vue' /* webpackChunkName: "pages/admin-jekuaa/usuarios/index" */))
const _77ba35f4 = () => interopDefault(import('..\\..\\jekuaaNuxt\\pages\\autenticacion\\inicioSesion.vue' /* webpackChunkName: "pages/autenticacion/inicioSesion" */))
const _01cdbbed = () => interopDefault(import('..\\..\\jekuaaNuxt\\pages\\autenticacion\\registro.vue' /* webpackChunkName: "pages/autenticacion/registro" */))
const _ac831f22 = () => interopDefault(import('..\\..\\jekuaaNuxt\\pages\\miembro-jekuaa\\blogs\\index.vue' /* webpackChunkName: "pages/miembro-jekuaa/blogs/index" */))
const _1cd3dbd8 = () => interopDefault(import('..\\..\\jekuaaNuxt\\pages\\admin-jekuaa\\usuarios\\lista-usuarios\\index.vue' /* webpackChunkName: "pages/admin-jekuaa/usuarios/lista-usuarios/index" */))
const _ed3fda90 = () => interopDefault(import('..\\..\\jekuaaNuxt\\pages\\miembro-jekuaa\\blogs\\mis-blogs.vue' /* webpackChunkName: "pages/miembro-jekuaa/blogs/mis-blogs" */))
const _90b2c058 = () => interopDefault(import('..\\..\\jekuaaNuxt\\pages\\miembro-jekuaa\\blogs\\nuevo.vue' /* webpackChunkName: "pages/miembro-jekuaa/blogs/nuevo" */))
const _55050a4e = () => interopDefault(import('..\\..\\jekuaaNuxt\\pages\\admin-jekuaa\\usuarios\\_uidUsuario.vue' /* webpackChunkName: "pages/admin-jekuaa/usuarios/_uidUsuario" */))
const _3b178e51 = () => interopDefault(import('..\\..\\jekuaaNuxt\\pages\\miembro-jekuaa\\blog\\_referencia.vue' /* webpackChunkName: "pages/miembro-jekuaa/blog/_referencia" */))
const _3a33c88a = () => interopDefault(import('..\\..\\jekuaaNuxt\\pages\\miembro-jekuaa\\blog\\_refenrecia\\actualizar.vue' /* webpackChunkName: "pages/miembro-jekuaa/blog/_refenrecia/actualizar" */))
const _da154b10 = () => interopDefault(import('..\\..\\jekuaaNuxt\\pages\\bienvenido-a-jekuaa\\_nombreUsuario.vue' /* webpackChunkName: "pages/bienvenido-a-jekuaa/_nombreUsuario" */))
const _9d048bb0 = () => interopDefault(import('..\\..\\jekuaaNuxt\\pages\\blog\\_referencia.vue' /* webpackChunkName: "pages/blog/_referencia" */))
const _707244fe = () => interopDefault(import('..\\..\\jekuaaNuxt\\pages\\blogs\\_seccion\\index.vue' /* webpackChunkName: "pages/blogs/_seccion/index" */))
const _280c634d = () => interopDefault(import('..\\..\\jekuaaNuxt\\pages\\blogs\\_seccion\\_categoria\\index.vue' /* webpackChunkName: "pages/blogs/_seccion/_categoria/index" */))
const _31ed6c2d = () => interopDefault(import('..\\..\\jekuaaNuxt\\pages\\blogs\\_seccion\\_categoria\\_subCategoria.vue' /* webpackChunkName: "pages/blogs/_seccion/_categoria/_subCategoria" */))
const _50fb564b = () => interopDefault(import('..\\..\\jekuaaNuxt\\pages\\index.vue' /* webpackChunkName: "pages/index" */))
const _3f35b1fd = () => interopDefault(import('..\\..\\jekuaaNuxt\\pages\\_nombreUsuario.vue' /* webpackChunkName: "pages/_nombreUsuario" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/admin-jekuaa",
    component: _1161ae28,
    name: "admin-jekuaa"
  }, {
    path: "/blog",
    component: _12112529,
    name: "blog"
  }, {
    path: "/blogs",
    component: _5163fa38,
    name: "blogs"
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
    path: "/admin-jekuaa/blog",
    component: _56db6346,
    name: "admin-jekuaa-blog"
  }, {
    path: "/admin-jekuaa/cursos",
    component: _605534f1,
    name: "admin-jekuaa-cursos"
  }, {
    path: "/admin-jekuaa/usuarios",
    component: _4d5a6503,
    name: "admin-jekuaa-usuarios"
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
    path: "/admin-jekuaa/usuarios/lista-usuarios",
    component: _1cd3dbd8,
    name: "admin-jekuaa-usuarios-lista-usuarios"
  }, {
    path: "/miembro-jekuaa/blogs/mis-blogs",
    component: _ed3fda90,
    name: "miembro-jekuaa-blogs-mis-blogs"
  }, {
    path: "/miembro-jekuaa/blogs/nuevo",
    component: _90b2c058,
    name: "miembro-jekuaa-blogs-nuevo"
  }, {
    path: "/admin-jekuaa/usuarios/:uidUsuario",
    component: _55050a4e,
    name: "admin-jekuaa-usuarios-uidUsuario"
  }, {
    path: "/miembro-jekuaa/blog/:referencia",
    component: _3b178e51,
    name: "miembro-jekuaa-blog-referencia"
  }, {
    path: "/miembro-jekuaa/blog/:refenrecia/actualizar",
    component: _3a33c88a,
    name: "miembro-jekuaa-blog-refenrecia-actualizar"
  }, {
    path: "/bienvenido-a-jekuaa/:nombreUsuario?",
    component: _da154b10,
    name: "bienvenido-a-jekuaa-nombreUsuario"
  }, {
    path: "/blog/:referencia",
    component: _9d048bb0,
    name: "blog-referencia"
  }, {
    path: "/blogs/:seccion",
    component: _707244fe,
    name: "blogs-seccion"
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
  }, {
    path: "/:nombreUsuario",
    component: _3f35b1fd,
    name: "nombreUsuario"
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
