export { default as Editor } from '../..\\..\\jekuaaNuxt\\components\\Editor.vue'
export { default as FooterDefault } from '../..\\..\\jekuaaNuxt\\components\\FooterDefault.vue'
export { default as ImageInput } from '../..\\..\\jekuaaNuxt\\components\\ImageInput.vue'
export { default as ListaBlogs } from '../..\\..\\jekuaaNuxt\\components\\ListaBlogs.vue'
export { default as ListaCategorias } from '../..\\..\\jekuaaNuxt\\components\\ListaCategorias.vue'
export { default as Loading } from '../..\\..\\jekuaaNuxt\\components\\Loading.vue'
export { default as NavigationDefault } from '../..\\..\\jekuaaNuxt\\components\\NavigationDefault.vue'
export { default as NavigationUser } from '../..\\..\\jekuaaNuxt\\components\\NavigationUser.vue'
export { default as NotFound } from '../..\\..\\jekuaaNuxt\\components\\notFound.vue'
export { default as Presentacion } from '../..\\..\\jekuaaNuxt\\components\\Presentacion.vue'
export { default as SnackbarError } from '../..\\..\\jekuaaNuxt\\components\\SnackbarError.vue'
export { default as Spinner } from '../..\\..\\jekuaaNuxt\\components\\Spinner.vue'
export { default as AuthEmail } from '../..\\..\\jekuaaNuxt\\components\\auth\\authEmail.vue'
export { default as BlogsBuscadorInfinitoBlogs } from '../..\\..\\jekuaaNuxt\\components\\blogs\\buscador-infinito-blogs.vue'
export { default as BlogsFiltroBlogs } from '../..\\..\\jekuaaNuxt\\components\\blogs\\filtro-blogs.vue'
export { default as BlogsFormularioBlog } from '../..\\..\\jekuaaNuxt\\components\\blogs\\formulario-blog.vue'
export { default as BlogsInfiniteHitsBlogs } from '../..\\..\\jekuaaNuxt\\components\\blogs\\InfiniteHitsBlogs.vue'
export { default as BlogsListaBlogs } from '../..\\..\\jekuaaNuxt\\components\\blogs\\lista-blogs.vue'
export { default as BlogsVisualizador } from '../..\\..\\jekuaaNuxt\\components\\blogs\\Visualizador.vue'
export { default as UsuariosCartaPresentacion } from '../..\\..\\jekuaaNuxt\\components\\usuarios\\CartaPresentacion.vue'
export { default as TiptapVuetifyImagenURL } from '../..\\..\\jekuaaNuxt\\components\\tiptap\\vuetify\\ImagenURL.vue'

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
