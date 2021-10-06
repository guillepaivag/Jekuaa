export const state = {
    roles: [],
    secciones: [],
    seccionSeleccionado: '',
    categorias: [],
    categoriaSeleccionado: '',
    subcategorias: []
  }
  
  export const getters = {  
  }
  
  export const actions = {
    async obtenerDatosRoles ({ dispatch, commit, state }, loading) {
      try {
          
      } catch (error) {
        const accion = await dispatch('errorHandler', {
            error: error.response.data
        })

        if ( accion.includes('error') ) {
            this.$nuxt.error({
                statusCode: error.response.status
            })
        } else if ( accion.includes('login') ) {
            this.$router.push('/autenticacion/inicioSesion')
        }
      }
    },
    setError (state, error) {
      console.log('[STORE ACTIONS] - setError:', error)
      commit('setError', error)
    },
    errorHandler ( { dispatch, commit }, responseError ) {
  
      console.log('responseError', responseError)
      commit('setError', responseError)
  
      if ( responseError.codigo.includes('usuario_no_autorizado') || responseError.codigo.includes('sistema') ) {
        return 'redireccion-error'
      } else if ( responseError.codigo.includes('usuario_no_autenticado') ) {
        return 'redireccion-login'
      } else if ( responseError.codigo.includes('usuario_mala_solicitud') ) {
        return ''
      }
  
    }
  }
  
  export const mutations = {
    setLoading (state, loading) {
      console.log('[STORE MUTATIONS] - setLoading:', loading)
      state.loading = loading
    },
    setError (state, error) {
      console.log('[STORE MUTATIONS] - setError:', error)
      state.error = error
  
      return error
    }
  }
  