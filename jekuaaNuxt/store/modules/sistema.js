export const state = {
  loading: false,
  error: null
}

export const getters = {

  getLoading (state) {
    return state.loading
  },
  getError (state) {
    return state.error
  },
  existeError ( state ) {
    return state.error.codigo != ''
  }

}

export const actions = {
  setLoading ({ dispatch, commit, state }, loading) {
    console.log('[STORE ACTIONS] - setLoading:', loading)
    commit('setLoading', loading)
  },
  setError (state, error) {
    console.log('[STORE ACTIONS] - setError:', error)
    commit('setError', error)
  },
  errorHandler ( { dispatch, commit }, error ) {
    console.log('error', error)

    if ( error.response ) { 
      console.log('error.response', error.response)

      const responseError = error.response.data
      commit('setError', {
        tipo: 'response',
        error
      })

      // Manejo de errores
      if ( responseError.codigo.includes('usuario_no_autorizado') ) {
        return this.app.$nuxt.error({
          statusCode: error.response.status
        })
      } else if ( responseError.codigo.includes('usuario_no_autenticado') ) {
        return this.app.router.push('/autenticacion/inicioSesion')
      } else if ( responseError.codigo.includes('usuario_mala_solicitud') || responseError.codigo.includes('sistema') ) {
        return 'mensaje-error'
      }

    } else if (error.request) { 
      commit('setError', {
        tipo: 'request',
        error
      })
      // client never received a response, or request never left 
    } else { 
      commit('setError', {
        tipo: 'otro',
        error
      })
      // anything else 
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
  }
}
