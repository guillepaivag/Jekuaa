export { default as FooterDefault } from '../..\\..\\jekuaaNuxt\\components\\FooterDefault.vue'
export { default as Loading } from '../..\\..\\jekuaaNuxt\\components\\Loading.vue'
export { default as Logo } from '../..\\..\\jekuaaNuxt\\components\\Logo.vue'
export { default as NavigationDefault } from '../..\\..\\jekuaaNuxt\\components\\NavigationDefault.vue'
export { default as NavigationUser } from '../..\\..\\jekuaaNuxt\\components\\NavigationUser.vue'
export { default as VideoPlayer } from '../..\\..\\jekuaaNuxt\\components\\VideoPlayer.vue'
export { default as VuetifyLogo } from '../..\\..\\jekuaaNuxt\\components\\VuetifyLogo.vue'
export { default as AdminBuscadorUsuarios } from '../..\\..\\jekuaaNuxt\\components\\admin\\buscadorUsuarios.vue'
export { default as AdminConfirmacionAccionPorUID } from '../..\\..\\jekuaaNuxt\\components\\admin\\confirmacionAccionPorUID.vue'
export { default as AdminFiltroUsuarios } from '../..\\..\\jekuaaNuxt\\components\\admin\\filtroUsuarios.vue'
export { default as AdminListaUsuarios } from '../..\\..\\jekuaaNuxt\\components\\admin\\listaUsuarios.vue'
export { default as AuthEmail } from '../..\\..\\jekuaaNuxt\\components\\auth\\authEmail.vue'
export { default as InicioAtajos } from '../..\\..\\jekuaaNuxt\\components\\inicio\\atajos.vue'
export { default as InicioPresentacion } from '../..\\..\\jekuaaNuxt\\components\\inicio\\presentacion.vue'
export { default as InicioSubpresentacion } from '../..\\..\\jekuaaNuxt\\components\\inicio\\subpresentacion.vue'
export { default as AdminFormsFormularioUsuario } from '../..\\..\\jekuaaNuxt\\components\\admin\\forms\\formularioUsuario.vue'
export { default as FilterAdminUser } from '../..\\..\\jekuaaNuxt\\components\\filter\\admin\\User.vue'
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
