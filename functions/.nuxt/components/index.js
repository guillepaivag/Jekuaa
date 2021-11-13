export { default as FooterDefault } from '../..\\..\\jekuaaNuxt\\components\\FooterDefault.vue'
export { default as ListaBlogs } from '../..\\..\\jekuaaNuxt\\components\\ListaBlogs.vue'
export { default as ListaCategorias } from '../..\\..\\jekuaaNuxt\\components\\ListaCategorias.vue'
export { default as Loading } from '../..\\..\\jekuaaNuxt\\components\\Loading.vue'
export { default as NavigationDefault } from '../..\\..\\jekuaaNuxt\\components\\NavigationDefault.vue'
export { default as NavigationUser } from '../..\\..\\jekuaaNuxt\\components\\NavigationUser.vue'
export { default as NotFound } from '../..\\..\\jekuaaNuxt\\components\\notFound.vue'
export { default as Presentacion } from '../..\\..\\jekuaaNuxt\\components\\Presentacion.vue'
export { default as Spinner } from '../..\\..\\jekuaaNuxt\\components\\Spinner.vue'
export { default as VideoPlayer } from '../..\\..\\jekuaaNuxt\\components\\VideoPlayer.vue'
export { default as AdminBuscadorUsuarios } from '../..\\..\\jekuaaNuxt\\components\\admin\\buscadorUsuarios.vue'
export { default as AdminConfirmacionAccionPorUID } from '../..\\..\\jekuaaNuxt\\components\\admin\\confirmacionAccionPorUID.vue'
export { default as AdminFiltroUsuarios } from '../..\\..\\jekuaaNuxt\\components\\admin\\filtroUsuarios.vue'
export { default as AdminListaUsuarios } from '../..\\..\\jekuaaNuxt\\components\\admin\\listaUsuarios.vue'
export { default as AuthEmail } from '../..\\..\\jekuaaNuxt\\components\\auth\\authEmail.vue'
export { default as BlogsBuscadorBlogs } from '../..\\..\\jekuaaNuxt\\components\\blogs\\buscador-blogs.vue'
export { default as BlogsBuscadorInfinitoBlogs } from '../..\\..\\jekuaaNuxt\\components\\blogs\\buscador-infinito-blogs.vue'
export { default as BlogsFiltroBlogs } from '../..\\..\\jekuaaNuxt\\components\\blogs\\filtro-blogs.vue'
export { default as BlogsInfiniteHitsBlogs } from '../..\\..\\jekuaaNuxt\\components\\blogs\\InfiniteHitsBlogs.vue'
export { default as BlogsListaBlogs } from '../..\\..\\jekuaaNuxt\\components\\blogs\\lista-blogs.vue'
export { default as UsuariosCartaPresentacion } from '../..\\..\\jekuaaNuxt\\components\\usuarios\\CartaPresentacion.vue'
export { default as FilterAdminUser } from '../..\\..\\jekuaaNuxt\\components\\filter\\admin\\User.vue'
export { default as AdminFormsEditor } from '../..\\..\\jekuaaNuxt\\components\\admin\\forms\\Editor.vue'
export { default as AdminFormsFormBlog } from '../..\\..\\jekuaaNuxt\\components\\admin\\forms\\FormBlog.vue'
export { default as AdminFormsFormularioUsuario } from '../..\\..\\jekuaaNuxt\\components\\admin\\forms\\formularioUsuario.vue'
export { default as ListsAdminUser } from '../..\\..\\jekuaaNuxt\\components\\lists\\admin\\User.vue'

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
