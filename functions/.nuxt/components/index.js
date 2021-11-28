export const Editor = () => import('../..\\..\\jekuaaNuxt\\components\\Editor.vue' /* webpackChunkName: "components/editor" */).then(c => wrapFunctional(c.default || c))
export const FooterDefault = () => import('../..\\..\\jekuaaNuxt\\components\\FooterDefault.vue' /* webpackChunkName: "components/footer-default" */).then(c => wrapFunctional(c.default || c))
export const ImageInput = () => import('../..\\..\\jekuaaNuxt\\components\\ImageInput.vue' /* webpackChunkName: "components/image-input" */).then(c => wrapFunctional(c.default || c))
export const ListaBlogs = () => import('../..\\..\\jekuaaNuxt\\components\\ListaBlogs.vue' /* webpackChunkName: "components/lista-blogs" */).then(c => wrapFunctional(c.default || c))
export const ListaCategorias = () => import('../..\\..\\jekuaaNuxt\\components\\ListaCategorias.vue' /* webpackChunkName: "components/lista-categorias" */).then(c => wrapFunctional(c.default || c))
export const Loading = () => import('../..\\..\\jekuaaNuxt\\components\\Loading.vue' /* webpackChunkName: "components/loading" */).then(c => wrapFunctional(c.default || c))
export const NavigationDefault = () => import('../..\\..\\jekuaaNuxt\\components\\NavigationDefault.vue' /* webpackChunkName: "components/navigation-default" */).then(c => wrapFunctional(c.default || c))
export const NavigationUser = () => import('../..\\..\\jekuaaNuxt\\components\\NavigationUser.vue' /* webpackChunkName: "components/navigation-user" */).then(c => wrapFunctional(c.default || c))
export const NotFound = () => import('../..\\..\\jekuaaNuxt\\components\\notFound.vue' /* webpackChunkName: "components/not-found" */).then(c => wrapFunctional(c.default || c))
export const Presentacion = () => import('../..\\..\\jekuaaNuxt\\components\\Presentacion.vue' /* webpackChunkName: "components/presentacion" */).then(c => wrapFunctional(c.default || c))
export const SnackbarError = () => import('../..\\..\\jekuaaNuxt\\components\\SnackbarError.vue' /* webpackChunkName: "components/snackbar-error" */).then(c => wrapFunctional(c.default || c))
export const Spinner = () => import('../..\\..\\jekuaaNuxt\\components\\Spinner.vue' /* webpackChunkName: "components/spinner" */).then(c => wrapFunctional(c.default || c))
export const VideoPlayer = () => import('../..\\..\\jekuaaNuxt\\components\\VideoPlayer.vue' /* webpackChunkName: "components/video-player" */).then(c => wrapFunctional(c.default || c))
export const AdminBuscadorUsuarios = () => import('../..\\..\\jekuaaNuxt\\components\\admin\\buscadorUsuarios.vue' /* webpackChunkName: "components/admin-buscador-usuarios" */).then(c => wrapFunctional(c.default || c))
export const AdminConfirmacionAccionPorUID = () => import('../..\\..\\jekuaaNuxt\\components\\admin\\confirmacionAccionPorUID.vue' /* webpackChunkName: "components/admin-confirmacion-accion-por-u-i-d" */).then(c => wrapFunctional(c.default || c))
export const AdminFiltroUsuarios = () => import('../..\\..\\jekuaaNuxt\\components\\admin\\filtroUsuarios.vue' /* webpackChunkName: "components/admin-filtro-usuarios" */).then(c => wrapFunctional(c.default || c))
export const AdminListaUsuarios = () => import('../..\\..\\jekuaaNuxt\\components\\admin\\listaUsuarios.vue' /* webpackChunkName: "components/admin-lista-usuarios" */).then(c => wrapFunctional(c.default || c))
export const AuthEmail = () => import('../..\\..\\jekuaaNuxt\\components\\auth\\authEmail.vue' /* webpackChunkName: "components/auth-email" */).then(c => wrapFunctional(c.default || c))
export const BlogsBuscadorInfinitoBlogs = () => import('../..\\..\\jekuaaNuxt\\components\\blogs\\buscador-infinito-blogs.vue' /* webpackChunkName: "components/blogs-buscador-infinito-blogs" */).then(c => wrapFunctional(c.default || c))
export const BlogsFiltroBlogs = () => import('../..\\..\\jekuaaNuxt\\components\\blogs\\filtro-blogs.vue' /* webpackChunkName: "components/blogs-filtro-blogs" */).then(c => wrapFunctional(c.default || c))
export const BlogsFormularioBlog = () => import('../..\\..\\jekuaaNuxt\\components\\blogs\\formulario-blog.vue' /* webpackChunkName: "components/blogs-formulario-blog" */).then(c => wrapFunctional(c.default || c))
export const BlogsInfiniteHitsBlogs = () => import('../..\\..\\jekuaaNuxt\\components\\blogs\\InfiniteHitsBlogs.vue' /* webpackChunkName: "components/blogs-infinite-hits-blogs" */).then(c => wrapFunctional(c.default || c))
export const BlogsListaBlogs = () => import('../..\\..\\jekuaaNuxt\\components\\blogs\\lista-blogs.vue' /* webpackChunkName: "components/blogs-lista-blogs" */).then(c => wrapFunctional(c.default || c))
export const UsuariosCartaPresentacion = () => import('../..\\..\\jekuaaNuxt\\components\\usuarios\\CartaPresentacion.vue' /* webpackChunkName: "components/usuarios-carta-presentacion" */).then(c => wrapFunctional(c.default || c))
export const AdminFormsFormBlog = () => import('../..\\..\\jekuaaNuxt\\components\\admin\\forms\\FormBlog.vue' /* webpackChunkName: "components/admin-forms-form-blog" */).then(c => wrapFunctional(c.default || c))
export const AdminFormsFormularioUsuario = () => import('../..\\..\\jekuaaNuxt\\components\\admin\\forms\\formularioUsuario.vue' /* webpackChunkName: "components/admin-forms-formulario-usuario" */).then(c => wrapFunctional(c.default || c))
export const FilterAdminUser = () => import('../..\\..\\jekuaaNuxt\\components\\filter\\admin\\User.vue' /* webpackChunkName: "components/filter-admin-user" */).then(c => wrapFunctional(c.default || c))
export const ListsAdminUser = () => import('../..\\..\\jekuaaNuxt\\components\\lists\\admin\\User.vue' /* webpackChunkName: "components/lists-admin-user" */).then(c => wrapFunctional(c.default || c))

// nuxt/nuxt.js#8607
function wrapFunctional(options) {
  if (!options || !options.functional) {
    return options
  }

  const propKeys = Array.isArray(options.props) ? options.props : Object.keys(options.props || {})

  return {
    render(h) {
      const attrs = {}
      const props = {}

      for (const key in this.$attrs) {
        if (propKeys.includes(key)) {
          props[key] = this.$attrs[key]
        } else {
          attrs[key] = this.$attrs[key]
        }
      }

      return h(options, {
        on: this.$listeners,
        attrs,
        props,
        scopedSlots: this.$scopedSlots,
      }, this.$slots.default)
    }
  }
}
