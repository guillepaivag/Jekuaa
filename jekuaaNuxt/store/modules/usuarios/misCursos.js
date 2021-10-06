const collectionName = 'Usuarios'

export const state = {
    misCursos: [],
}

export const getters = {
    getMisCursos (state) {
        return state.misCursos
    }
}

export const actions = {
    /* 
        SETTERS
    */

    setMisCursos ({ dispatch, commit, state }, misCursos) {
        if (misCursos) {
            commit('setMisCursos', misCursos)
        } else {
            commit('setMisCursos', null)
        }
    },
    async setDatosMisCursos ({ dispatch, commit, state }, datosMisCursos) {
        if (datosMisCursos) {
            await dispatch('setMisCursos', datosMisCursos)
        } else {
            await dispatch('setMisCursos', null)
        }
    },
    getDatosMisCursosPorUID ({ dispatch, commit, state }, uid) {

    },
    async setDatosMisCursosPorUID ({ dispatch, commit, state }, uid) {
        if (uid) {
            const datosMisCursos = await dispatch('getDatosMisCursosPorUID', uid)
            await dispatch('setDatosMisCursos', datosMisCursos)                

        } else {
            await dispatch('setDatosMisCursos', null)
        }
    },
    async setDatosMisCursosPorUID_RealTime ({ dispatch, commit, state }, uid) {
        
    },

    /* 
        GETTERS
    */

    async getDatosMisCursosPorUID ({ dispatch, commit, state }, uid) {
        if (!uid) {
            return null
        }
        
        const datosMisCursos = await this.$firebase.firestore().collection(collectionName).doc(uid).collection('MisCursos').get()
        console.log('datosMisCursos', datosMisCursos)
        
        const misCursos = []

        if (!datosMisCursos.empty) {
            datosMisCursos.forEach(doc => {
                misCursos.push(doc.data())
            })
            
            return misCursos
        }

        return null
    }
}

export const mutations = {
    setMisCursos (state, misCursos) {
        state.misCursos = misCursos
    }
}