export const state = {
  loading: false,
  error: {
    codigo: '',
    mensaje: '',
    resultado: null
  }
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
