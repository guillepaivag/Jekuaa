const collectionName = 'UsuariosJekuaaTeam'
const realTime = false

export const state = {
    uid: '',
    instructor: false,
    rolJekuaaTeam: '',
    secciones: []
}

export const getters = {
    uid (state) {
        return state.uid
    },

    instructor (state) {
        return state.instructor
    },

    rolJekuaaTeam (state) {
        return state.rolJekuaaTeam
    },

    secciones (state) {
        if (!['gerente', 'moderador', 'miembro'].includes(state.rolJekuaaTeam)) {
            return null
        }

        return state.secciones
    }
}

export const actions = {

    /* 
        SETTERS
    */

    setUID ({ commit }, uid) {
        if (uid) {
            commit('setUID', uid)
        } else {
            commit('setUID', null)
        }
    },

    async setInstructor ({ dispatch, commit, state }, instructor) {
        
        if (instructor) {
            const uid = state.uid
            commit('setInstructor', instructor)

            if (!realTime) {
                await dispatch('modules/user/userInstructor/setDatosUsuarioInstructorPorUID', uid, { root: true })
            } else {
                await dispatch('modules/user/userInstructor/setDatosUsuarioInstructorPorUID_RealTime', uid, { root: true })
            }
            
        } else {
            commit('setInstructor', null)
        }
    },

    setRolJekuaaTeam ({ commit }, rolJekuaaTeam) {
        if (rolJekuaaTeam) {
            commit('setRolJekuaaTeam', rolJekuaaTeam)
        } else {
            commit('setRolJekuaaTeam', null)
        }
    },

    setSecciones ({ commit }, secciones) {
        
        if (secciones) {
            commit('setSecciones', secciones)
        } else {
            commit('setSecciones', null)
        }

    },

    async setDatosUsuarioJekuaaTeam ({ dispatch, commit }, usuarioJekuaaTeam) {

        if (usuarioJekuaaTeam) {
            await dispatch('setUID', usuarioJekuaaTeam.uid)
            await dispatch('setInstructor', usuarioJekuaaTeam.instructor)
            await dispatch('setRolJekuaaTeam', usuarioJekuaaTeam.rolJekuaaTeam)
            await dispatch('setSecciones', usuarioJekuaaTeam.secciones)

        } else {
            await dispatch('setUID', null)
            await dispatch('setInstructor', null)
            await dispatch('setRolJekuaaTeam', null)
            await dispatch('setSecciones', null)

        }
    },

    async setDatosUsuarioJekuaaTeamPorUID ({ dispatch, commit }, uid) {
        
        if (uid) {
            const usuarioJekuaaTeam = await dispatch('getDatosUsuarioJekuaaTeamPorUID', uid)
            await dispatch('setDatosUsuarioJekuaaTeam', usuarioJekuaaTeam)
            
        } else {
            await dispatch('setDatosUsuarioJekuaaTeam', null)
        }
    },

    async setDatosUsuarioJekuaaTeamPorUID_RealTime ({ dispatch, commit }, uid) {
        
    },

    /* 
        GETTERS
    */

    async getDatosUsuarioJekuaaTeamPorUID ({ commit }, uid) {
        if (!uid) {
            return null
        }

        const usuarioJekuaaTeam = await this.$firebase.firestore().collection(collectionName).doc(uid).get()

        if (usuarioJekuaaTeam.exists) {
            return usuarioJekuaaTeam.data()
        }
        
        return null
    }

}

export const mutations = {

    setUID (state, uid) {
        if (uid) {
            state.uid = uid
        } else {
            state.uid = ''
        }
    },

    setInstructor (state, instructor) {
        
        if (instructor) {
            state.instructor = instructor
        } else {
            state.instructor = false
        }

    },

    setRolJekuaaTeam (state, rolJekuaaTeam) {
        if (rolJekuaaTeam) {
            state.rolJekuaaTeam = rolJekuaaTeam
        } else {
            state.rolJekuaaTeam = ''
        }
    },

    setSecciones (state, secciones) {
        if (secciones) {
            state.secciones = secciones
        } else {
            state.secciones = []
        }
    }
}