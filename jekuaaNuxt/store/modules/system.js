export const state = {
  adminTeamSeccion: ['admin', 'subAdmin', 'creadorContenido'],
  loading: false,
  error: {
    existe: false,
    titulo: '',
    mensaje: '',
    error: null
  }
}

export const getters = {

  getAdminTeamSECCION (state) {
    return state.adminTeamSeccion
  },

  getLoading (state) {
    return state.loading
  },
  getError (state) {
    return state.error
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
