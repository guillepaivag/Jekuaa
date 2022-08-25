export const state = {
    uid: '',
    funciones: [],
    fechaComienzo: null,
    cantidadEstudiantes: 0,
    cantidadCursos: 0,
    cantidadBlogs: 0,
}

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

    cantidadEstudiantes (state) {
        return state.cantidadEstudiantes
    },

    cantidadCursos (state) {
        return state.cantidadCursos
    },

    cantidadBlogs (state) {
        return state.cantidadBlogs
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

    setCantidadEstudiantes (state, cantidadEstudiantes) {
        state.cantidadEstudiantes = cantidadEstudiantes
    },

    setCantidadCursos (state, cantidadCursos) {
        state.cantidadCursos = cantidadCursos
    },

    setCantidadBlogs (state, cantidadBlogs) {
        state.cantidadBlogs = cantidadBlogs
    },
}

export const actions = {
    async setMiembro ({ dispatch }, miembro) {
        if (miembro) {
            const { 
                uid,
                funciones, 
                fechaComienzo, 
                cantidadEstudiantes, 
                cantidadCursos, 
                cantidadBlogs 
            } = miembro

            await dispatch('setUid', uid)
            await dispatch('setFunciones', funciones)
            await dispatch('setFechaComienzo', fechaComienzo)
            await dispatch('setCantidadEstudiantes', cantidadEstudiantes)
            await dispatch('setCantidadCursos', cantidadCursos)
            await dispatch('setCantidadBlogs', cantidadBlogs)
        } else {
            await dispatch('setUid', null)
            await dispatch('setFunciones', null)
            await dispatch('setFechaComienzo', null)
            await dispatch('setCantidadEstudiantes', null)
            await dispatch('setCantidadCursos', null)
            await dispatch('setCantidadBlogs', null)
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

    setCantidadEstudiantes ({ commit }, cantidadEstudiantes) {
        if (cantidadEstudiantes) {
            commit('setCantidadEstudiantes', cantidadEstudiantes)
        } else {
            commit('setCantidadEstudiantes', 0)
        }
    },

    setCantidadCursos ({ commit }, cantidadCursos) {
        if (cantidadCursos) {
            commit('setCantidadCursos', cantidadCursos)
        } else {
            commit('setCantidadCursos', 0)
        }
    },

    setCantidadBlogs ({ commit }, cantidadBlogs) {
        if (cantidadBlogs) {
            commit('setCantidadBlogs', cantidadBlogs)
        } else {
            commit('setCantidadBlogs', 0)
        }
    },
}