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
    return state.error.estado !== 200
  }

}

export const actions = {
  setLoading ({ dispatch, commit, state }, loading) {
    commit('setLoading', loading)
  },
  setError ({ commit }, error) {
    commit('setError', error)
  },
  errorHandler ( { dispatch, commit }, error ) {
    if ( error.response ) { 
      const responseError = error.response.data
      
      commit('setError', {
        tipo: 'response',
        error,
      })

      // Manejo de errores
      if ( responseError.estado === 401 ) {
        
        if ( responseError.mensajeCliente === 'auth/id-token-expired' ) {
          return this.app.router.push('/inicioSesion')
        }

        return this.app.$nuxt.error({
          statusCode: error.response.status
        })

      } else if ( responseError.estado === 400 || responseError.estado === 500 ) {
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
    state.loading = loading
  },
  setError (state, error) {
    state.error = error
  }
}
