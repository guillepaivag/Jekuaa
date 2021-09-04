const collectionName = 'UsuariosInstructor'

export const state = {
    uid: '',
    habilitado: false,
    fechaComienzoInstructor: null,
    cantidadCursos: 0,
    cantidadEstudiantes: 0,
    links: {
        portafolio: '',
        facebook: '',
        instagram: '',
        github: '',
        linkedin: ''
    },
    informacionInstructor: '',
    especializacionesIntereses: []

}

export const getters = {
    uid (state) {
        return state.uid
    },

    habilitado (state) {
        return state.habilitado
    },

    fechaComienzoInstructor (state) {
        return state.fechaComienzoInstructor
    },

    cantidadCursos (state) {
        return state.cantidadCursos
    },

    cantidadEstudiantes (state) {
        return state.cantidadEstudiantes
    },

    links (state) {
        return state.links
    },

    informacionInstructor (state) {
        return state.informacionInstructor
    },

    especializacionesIntereses (state) {
        return state.especializacionesIntereses
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

    setHabilitado ({ commit }, habilitado) {
        if (habilitado) {
            commit('setHabilitado', habilitado)
        } else {
            commit('setHabilitado', null)
        }
    },

    setFechaComienzoInstructor ({ commit }, fechaComienzoInstructor) {
        if (fechaComienzoInstructor) {
            commit('setGananciaAcumulada', fechaComienzoInstructor)
        } else {
            commit('setGananciaAcumulada', null)
        }
    },

    setCantidadCursos ({ commit }, cantidadCursos) {
        if (cantidadCursos) {
            commit('setCantidadCursos', cantidadCursos)
        } else {
            commit('setCantidadCursos', null)
        }
    },

    setCantidadEstudiantes ({ commit }, cantidadEstudiantes) {
        if (cantidadEstudiantes) {
            commit('setCantidadEstudiantes', cantidadEstudiantes)
        } else {
            commit('setCantidadEstudiantes', null)
        }
    },

    setLinks({ commit }, newLinks) {
        const linksDefault = {
            portafolio: '',
            facebook: '',
            instagram: '',
            github: '',
            linkedin: ''
        }

        if (newLinks) {
            for(let i = 0; i < Object.keys(newLinks).length; i++) {
                if(!Object.keys(linksDefault).includes(Object.keys(newLinks)[i])) {
                    return commit('setLinks', null)
                }
            }

            const newLinksFormat = Object.assign(linksDefault, newLinks)

            commit('setLinks', newLinksFormat)
        } else {
            commit('setLinks', null)
        }
              
    },

    setInformacionInstructor ({ commit }, informacionInstructor) {
        if (informacionInstructor) {
            commit('setInformacionInstructor', informacionInstructor)
        } else {
            commit('setInformacionInstructor', null)
        }
    },

    setEspecializacionesIntereses ({ commit }, especializacionesIntereses) {
        if (especializacionesIntereses) {
            commit('setEspecializacionesIntereses', especializacionesIntereses)
        } else {
            commit('setEspecializacionesIntereses', null)
        }
    },

    async setDatosUsuarioInstructor ({ dispatch, commit, state }, datosUsuarioInstructor) {
        if (datosUsuarioInstructor) {
            await dispatch('setUID', datosUsuarioInstructor.uid)
            await dispatch('setHabilitado', datosUsuarioInstructor.habilitado)
            await dispatch('setFechaComienzoInstructor', datosUsuarioInstructor.fechaComienzoInstructor)
            await dispatch('setCantidadCursos', datosUsuarioInstructor.cantidadCursos)
            await dispatch('setCantidadEstudiantes', datosUsuarioInstructor.cantidadEstudiantes)
            await dispatch('setLinks', datosUsuarioInstructor.links)
            await dispatch('setInformacionInstructor', datosUsuarioInstructor.informacionInstructor)
            await dispatch('setEspecializacionesIntereses', datosUsuarioInstructor.especializacionesIntereses)
        } else {
            await dispatch('setUID', null)
            await dispatch('setHabilitado', false)
            await dispatch('setFechaComienzoInstructor', null)
            await dispatch('setCantidadCursos', 0)
            await dispatch('setCantidadEstudiantes', 0)
            await dispatch('setLinks', null)
            await dispatch('setInformacionInstructor', null)
            await dispatch('setEspecializacionesIntereses', null)
        }
    },

    async setDatosUsuarioInstructorPorUID ({ dispatch, commit, state }, uid) {
        if (uid) {
            const usuarioInstructor = await dispatch('getDatosUsuarioInstructorPorUID', uid)

            await dispatch('setDatosUsuarioInstructor', usuarioInstructor)
        } else {
            await dispatch('setDatosUsuarioInstructor', null)
        }
    },

    async setDatosUsuarioInstructorPorUID_RealTime ({ dispatch, commit, state }, uid) {
        
    },

    /* 
        GETTERS
    */

    async getDatosUsuarioInstructorPorUID ({ dispatch, commit, state }, uid) {
        if (!uid) {
            return null
        }

        const usuarioInstructorDoc = await this.$firebase.firestore().collection(collectionName).doc(uid).get()

        if (usuarioInstructorDoc.exists) {
            const usuarioInstructor = usuarioInstructorDoc.data()

            usuarioInstructor.fechaComienzoInstructor = usuarioInstructor.fechaComienzoInstructor ? 
                        new Date(usuarioInstructor.fechaComienzoInstructor.seconds * 1000) : null

            return usuarioInstructor
        } else {
            return null
        }

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

    setHabilitado (state, habilitado) {
        if (habilitado) {
            state.habilitado = habilitado
        } else {
            state.habilitado = false
        }
    },

    setFechaComienzoInstructor (state, fechaComienzoInstructor) {
        if (fechaComienzoInstructor) {
            state.fechaComienzoInstructor = fechaComienzoInstructor
        } else {
            state.fechaComienzoInstructor = null
        }
    },

    setCantidadCursos (state, cantidadCursos) {
        if (cantidadCursos) {
            state.cantidadCursos = cantidadCursos
        } else {
            state.cantidadCursos = 0
        }
    },

    setCantidadEstudiantes (state, cantidadEstudiantes) {
        if (cantidadEstudiantes) {
            state.cantidadEstudiantes = cantidadEstudiantes
        } else {
            state.cantidadEstudiantes = 0
        }
    },

    setLinks (state, newLinks) {
        const linksDefault = {
            portafolio: '',
            facebook: '',
            instagram: '',
            github: '',
            linkedin: ''
        }

        if (newLinks) {
            for(let i = 0; i < Object.keys(newLinks).length; i++) {
                if(!Object.keys(linksDefault).includes(Object.keys(newLinks)[i])) {
                    return state.links = linksDefault
                }
            }

            state.links = Object.assign(linksDefault, newLinks)
        } else {
            state.links = linksDefault
        }
        
    },

    setInformacionInstructor (state, informacionInstructor) {
        if (informacionInstructor) {
            state.informacionInstructor = informacionInstructor
        } else {
            state.informacionInstructor = ''
        }
    },

    setEspecializacionesIntereses (state, especializacionesIntereses) {
        if (especializacionesIntereses) {
            state.especializacionesIntereses = especializacionesIntereses
        } else {
            state.especializacionesIntereses = []
        }
    }
}