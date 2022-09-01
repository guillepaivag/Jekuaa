// export const state = {
//     uid: '',
//     funciones: [],
//     fechaComienzo: null,
// }

export const state = () => ({
    uid: '',
    funciones: [],
    fechaComienzo: null,
})

export const getters = {
    uid (state) {
        return state.uid
    },
    
    funciones (state) {
        return state.funciones
    },

    fechaComienzo (state) {
        return state.fechaComienzo
    },
}

export const mutations = {
    setUid (state, uid) {
        state.uid = uid
    },
    
    setFunciones (state, funciones) {
        state.funciones = funciones
    },

    setFechaComienzo (state, fechaComienzo) {
        state.fechaComienzo = fechaComienzo
    },
}

export const actions = {
    async setModerador ({ dispatch }, moderador) {
        if (moderador) {
            const { 
                uid,
                funciones, 
                fechaComienzo, 
            } = moderador

            await dispatch('setUid', uid)
            await dispatch('setFunciones', funciones)
            await dispatch('setFechaComienzo', fechaComienzo)
        } else {
            await dispatch('setUid', null)
            await dispatch('setFunciones', null)
            await dispatch('setFechaComienzo', null)
        }
    },

    setUid ({ commit }, uid) {
        if (uid) {
            commit('setUid', uid)
        } else {
            commit('setUid', '')
        }
    },

    setFunciones ({ commit }, funciones) {
        if (funciones) {
            commit('setFunciones', funciones)
        } else {
            commit('setFunciones', [])
        }
    },

    setFechaComienzo ({ commit }, fechaComienzo) {
        if (fechaComienzo) {
            commit('setFechaComienzo', fechaComienzo)
        } else {
            commit('setFechaComienzo', null)
        }
    },
}