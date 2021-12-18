import 'firebase'
import Cookies from 'js-cookie'
const COOKIE_NAME = '__session'
const collectionName = 'Usuarios'

const jekuaaPremiumDefault = {
  plan: 'gratis',
  fechaCompra: null,
  fechaHasta: null
}



export const state = {
  token: '',
  fotoPerfil: '',
  uid: '',
  nombreUsuario: '',
  correo: '',
  nombreCompleto: '',
  fechaNacimiento: null,
  jekuaaPremium: jekuaaPremiumDefault,
  jekuaaRol: 'estudiante',
  instructor: false,
  jekuaaPoint: 0,
}




export const getters = {

  token (state) {
    return state.token
  },

  fotoPerfil (state) {
    return state.fotoPerfil
  },

  uid (state) {
    return state.uid
  },

  nombreUsuario (state) {
    return state.nombreUsuario
  },

  correo (state) {
    return state.correo
  },

  nombreCompleto (state) {
    return state.nombreCompleto
  },

  fechaNacimiento (state) {
    return state.fechaNacimiento
  },

  jekuaaPremium (state) {
    return state.jekuaaPremium
  },

  jekuaaRol (state) {
    return state.jekuaaRol
  },

  instructor (state) {
    return state.instructor
  },

  jekuaaPoint (state) {
    return state.jekuaaPoint
  },

  autenticado (state) {
    return !!state.token
  },

  esJekuaaPremium (state) {
    return !!state.jekuaaPremium
  },

  esMiembroJekuaa (state) {
    return state.jekuaaRol !== 'estudiante'
  },
}




export const actions = {

  /* 
    SETTERS
  */
  setTOKEN ({ commit }, token) {
    console.log('[STORE ACTIONS] - setTOKEN')
    if (token) {
      commit('setTOKEN', token)
      Cookies.set(COOKIE_NAME, token)
    } else {
      commit('setTOKEN', null)
      Cookies.remove(COOKIE_NAME)
    }
  },

  setFotoPerfil ({ commit }, fotoPerfil) {
    console.log('[STORE ACTIONS] - setFotoPerfil')
    if (fotoPerfil) {
      commit('setFotoPerfil', fotoPerfil)
    } else {
      commit('setFotoPerfil', null)
    }
  },

  saveUID ({ commit }, uid) {
    console.log('[STORE ACTIONS] - saveUID')
    if (uid) {
      commit('saveUID', uid)
    } else {
      commit('saveUID', null)
    }
  },

  setNombreUsuario ({ commit }, nombreUsuario) {
    console.log('[STORE ACTIONS] - setNombreUsuario')
    if (nombreUsuario) {
      commit('setNombreUsuario', nombreUsuario)
    } else {
      commit('setNombreUsuario', null)
    }
  },

  setCorreo ({ commit }, correo) {
    console.log('[STORE ACTIONS] - setCorreo')
    if (correo) {
      commit('setCorreo', correo)
    } else {
      commit('setCorreo', null)
    }
  },

  setNombreCompleto ({ commit }, nombreCompleto) {
    console.log('[STORE ACTIONS] - setNombreCompleto')
    if (nombreCompleto) {
      commit('setNombreCompleto', nombreCompleto)
    } else {
      commit('setNombreCompleto', null)
    }
  },

  setFechaNacimiento ({ commit }, fechaNacimiento) {
    console.log('[STORE ACTIONS] - setFechaNacimiento')
    if (fechaNacimiento) {
      commit('setFechaNacimiento', fechaNacimiento)
    } else {
      commit('setFechaNacimiento', null)
    }
  },

  setJekuaaPremium ({ commit }, jekuaaPremium) {
    console.log('[STORE ACTIONS] - setJekuaaPremium')
    if (jekuaaPremium) {
      commit('setJekuaaPremium', jekuaaPremium)
    } else {
      commit('setJekuaaPremium', null)
    }
  },

  setJekuaaRol ({ dispatch, commit, state }, jekuaaRol) {
    console.log('[STORE ACTIONS] - setJekuaaRol')
    if (jekuaaRol) {
      commit('setJekuaaRol', jekuaaRol)
    } else {
      commit('setJekuaaRol', null)
    }
  },

  setInstructor ({ dispatch, commit, state }, instructor) {
    console.log('[STORE ACTIONS] - setInstructor')
    if (instructor) {
      commit('setInstructor', instructor)
    } else {
      commit('setInstructor', null)
    }
  },

  setJekuaaPoint ({ commit }, jekuaaPoint) {
    console.log('[STORE ACTIONS] - setJekuaaPoint')
    if (jekuaaPoint) {
      commit('setJekuaaPoint', jekuaaPoint)
    } else {
      commit('setJekuaaPoint', null)
    }
  },

  async login ({ dispatch, state }, uid) {
    console.log('[STORE ACTIONS] - login')

    try {
      await dispatch('setDatosUsuarioPorUID', uid)
    } catch (error) {
      console.log('error login', error)
    }
    
  },

  async logout ({ commit, dispatch }) {
    console.log('[STORE ACTIONS] - logout')
    await this.$firebase.auth().signOut()

    // Insertamos los datos de los usuarios en la store
    await dispatch('setDatosUsuario', null)
  },

  async setDatosUsuario ({ state, dispatch, commit }, datosUsuario) {

    let uid = null
    if (datosUsuario) {
      uid = datosUsuario.uid
      
      await dispatch('setTOKEN', datosUsuario.token)
      await dispatch('setFotoPerfil', datosUsuario.fotoPerfil)
      await dispatch('saveUID', datosUsuario.uid)
      await dispatch('setNombreUsuario', datosUsuario.nombreUsuario)
      await dispatch('setCorreo', datosUsuario.correo)
      await dispatch('setNombreCompleto', datosUsuario.nombreCompleto)
      await dispatch('setFechaNacimiento', datosUsuario.fechaNacimiento)
      await dispatch('setJekuaaPremium', datosUsuario.jekuaaPremium)
      await dispatch('setJekuaaRol', datosUsuario.jekuaaRol)
      await dispatch('setInstructor', datosUsuario.instructor)
      await dispatch('setJekuaaPoint', datosUsuario.jekuaaPoint)
      
    } else {
      await dispatch('setTOKEN', null)
      await dispatch('setFotoPerfil', null)
      await dispatch('saveUID', null)
      await dispatch('setNombreUsuario', null)
      await dispatch('setCorreo', null)
      await dispatch('setNombreCompleto', null)
      await dispatch('setFechaNacimiento', null)
      await dispatch('setJekuaaPremium', null)
      await dispatch('setJekuaaRol', null)
      await dispatch('setInstructor', null)
      await dispatch('setJekuaaPoint', null)
    }
    
    // await dispatch('modules/user/misCursos/setDatosMisCursosPorUID', uid, { root: true })

  },

  async setDatosUsuarioPorUID ({ dispatch, commit }, uid) {
    console.log('uid', uid)

    if (uid) {
      const datosUsuario = await dispatch('getUsuarioDatosPorUID', uid)

      await dispatch('setDatosUsuario', datosUsuario)
      
    } else {
      await dispatch('setDatosUsuario', null)
    }
  },

  async setDatosUsuarioPorUID_RealTime ({ dispatch, commit, state }, uid) {
    
    if (!uid) {
      return await dispatch('setDatosUsuario', null)
    }
    
    this.$firebase.firestore().collection(collectionName).doc(uid).onSnapshot(async doc => {
      
      if (doc.exists) {
        // Obtener los datos
        const userCurrent = this.$firebase.auth().currentUser

        if (!userCurrent) {
          return await dispatch('setDatosUsuario', null)
        }

        const usuario = doc.data()

        // Token del usuario
        const token = await userCurrent.getIdToken(true)

        // Objetos a insertar
        const datosPersonales = {
          nombreCompleto: usuario.nombreCompleto ? usuario.nombreCompleto : null,
          nombreUsuario: userCurrent.displayName,
          correo: userCurrent.email,
          fechaNacimiento: usuario.fechaNacimiento ? new Date(usuario.fechaNacimiento.seconds * 1000) : null,
          fotoPerfil: userCurrent.photoURL ? userCurrent.photoURL : ''
        }

        // Obtener datos de Jekuaa Premium
        const jekuaaPremium = usuario.jekuaaPremium ?
                                    usuario.jekuaaPremium : null

        if (jekuaaPremium) {
          jekuaaPremium.fechaCompra = jekuaaPremium.fechaCompra ? 
                  new Date(jekuaaPremium.fechaCompra.seconds * 1000) : null
        }

        const jekuaaRoles = usuario.jekuaaRoles ?
                      usuario.jekuaaRoles : null

        const jekuaaPoint = usuario.jekuaaPoint ?
                        usuario.jekuaaPoint : 0

        // Creamos un objeto a insertar
        const datosUsuario = {
          token,
          uid,
          datosPersonales,
          jekuaaPremium,
          jekuaaRoles,
          jekuaaPoint
        }

        // Insertamos los datos de los usuarios en la store
        await dispatch('setDatosUsuario', datosUsuario)
        
      } else {
        await dispatch('setDatosUsuario', null)
      }
      
    }, async err => {
        console.log(err)
        await dispatch('setDatosUsuario', null)
    })

  },

  /* 
    GETTERS
  */

  async firebaseRegistroUser_EmailAndPassword ({ dispatch, state }, usuario) {
    console.log('[STORE ACTIONS] - firebaseRegistroUser_EmailAndPassword')

    const datosRegistroUsuario = await this.$axios.$post('/usuarios/estudiante/crearUsuario', {
      datosUsuario: {
        nombreUsuario: usuario.nombreUsuario,
        correo: usuario.correo,
        nombreCompleto: usuario.nombreCompleto,
      },
      contrasenha: usuario.contrasenha,
      confirmacionContrasenha: usuario.confirmacionContrasenha,
    })
    
    return datosRegistroUsuario.resultado
  },

  async firebaseInicioSesionUser_EmailAndPassword ({ dispatch, state }, usuario) {
    console.log('[STORE ACTIONS] - firebaseInicioSesionUser_EmailAndPassword')

    return this.$firebase.auth().signInWithEmailAndPassword(usuario.correo, usuario.contrasenha)
  },

  async firebaseCerrarSesionUser_EmailAndPassword ({ dispatch, state }) {
    console.log('[STORE ACTIONS] - firebaseCerrarSesionUser_EmailAndPassword')
    await this.$firebase.auth().signOut()

    // Insertamos los datos del usuario en la store
    await dispatch('setDatosUsuario', null)
  },

  async firebaseFirestoreGetUser_UID ({ dispatch, state }, uid) {
    console.log('[STORE ACTIONS] - firebaseFirestoreGetUser_UID', uid)
    
    const ref = this.$firebase.firestore().collection(collectionName).doc(uid)
    const userDoc = await ref.get()

    return userDoc
  },

  async getUsuarioDatosPorUID ({ dispatch, commit, state }, uid) {
    
    if (!uid) return null
    
    const usuarioDoc = await dispatch('firebaseFirestoreGetUser_UID', uid)

    if ( !usuarioDoc.exists ) return null

    const usuario = usuarioDoc.data()
    
    // Obtener los datos
    const userCurrent = this.$firebase.auth().currentUser

    if (!userCurrent) return null

    // Token del usuario
    const token = await userCurrent.getIdToken(true)

    // Datos personales
    const fotoPerfil = userCurrent.photoURL ? userCurrent.photoURL : null
    const nombreCompleto = usuario.nombreCompleto ? usuario.nombreCompleto : null
    const nombreUsuario = userCurrent.displayName ? userCurrent.displayName : null
    const correo = userCurrent.email ? userCurrent.email : null
    const fechaNacimiento = usuario.fechaNacimiento ? new Date(usuario.fechaNacimiento.seconds * 1000) : null

    // Obtener datos de Jekuaa Premium
    const jekuaaPremium = usuario.jekuaaPremium ?
      usuario.jekuaaPremium : null

    if (jekuaaPremium) {
      jekuaaPremium.fechaCompra = jekuaaPremium.fechaCompra ? 
        new Date(jekuaaPremium.fechaCompra.seconds * 1000) : null

      jekuaaPremium.fechaHasta = jekuaaPremium.fechaHasta ? 
        new Date(jekuaaPremium.fechaHasta.seconds * 1000) : null
    }

    const jekuaaRol = usuario.jekuaaRol ?
      usuario.jekuaaRol : null

    const instructor = usuario.instructor ?
      usuario.instructor : null

    const jekuaaPoint = usuario.jekuaaPoint ?
      usuario.jekuaaPoint : null

    // Creamos un objeto a insertar
    const datosUsuario = {
      token,
      fotoPerfil,
      uid,
      nombreCompleto,
      nombreUsuario,
      correo,
      fechaNacimiento,
      jekuaaPremium,
      jekuaaRol,
      instructor,
      jekuaaPoint
    }

    return datosUsuario
  },

}




export const mutations = {

  setTOKEN (state, token) {
    console.log('[STORE MUTATIONS] - setTOKEN:', token)
    
    if (token) {
      state.token = token
    } else {
      state.token = ''
    }
  },

  setFotoPerfil (state, fotoPerfil ) {
    console.log('[STORE MUTATIONS] - fotoPerfil:', fotoPerfil)

    if (fotoPerfil) {
      state.fotoPerfil = fotoPerfil
    } else {
      state.fotoPerfil = ''
    }
  },

  saveUID (state, uid) {
    console.log('[STORE MUTATIONS] - saveUID:', uid)
    
    if (uid) {
      state.uid = uid
    } else {
      state.uid = ''
    }
  },

  setNombreUsuario (state, nombreUsuario ) {
    console.log('[STORE MUTATIONS] - setNombreUsuario:', nombreUsuario)

    if (nombreUsuario) {
      state.nombreUsuario = nombreUsuario
    } else {
      state.nombreUsuario = ''
    }
  },

  setCorreo (state, correo ) {
    console.log('[STORE MUTATIONS] - setCorreo:', correo)

    if (correo) {
      state.correo = correo
    } else {
      state.correo = ''
    }
  },

  setNombreCompleto (state, nombreCompleto ) {
    console.log('[STORE MUTATIONS] - setNombreCompleto:', nombreCompleto)

    if (nombreCompleto) {
      state.nombreCompleto = nombreCompleto
    } else {
      state.nombreCompleto = ''
    }
  },

  setFechaNacimiento (state, fechaNacimiento ) {
    console.log('[STORE MUTATIONS] - setFechaNacimiento:', fechaNacimiento)

    if (fechaNacimiento) {
      state.fechaNacimiento = fechaNacimiento
    } else {
      state.fechaNacimiento = null
    }
  },

  setJekuaaPremium (state, jekuaaPremium) {
    console.log('[STORE MUTATIONS] - setJekuaaPremium:', jekuaaPremium)

    if (jekuaaPremium) {
      state.jekuaaPremium = jekuaaPremium
    } else {
      state.jekuaaPremium = null
    }
  },

  setJekuaaRol (state, jekuaaRol) {
    console.log('[STORE MUTATIONS] - setJekuaaRol:', jekuaaRol)

    if (jekuaaRol) {
      state.jekuaaRol = jekuaaRol
    } else {
      state.jekuaaRol = 'estudiante'
    }
  },

  setInstructor (state, instructor) {
    console.log('[STORE MUTATIONS] - setInstructor:', instructor)

    if (instructor) {
      state.instructor = instructor
    } else {
      state.instructor = false
    }
  },

  setJekuaaPoint (state, jekuaaPoint) {
    console.log('[STORE MUTATIONS] - setJekuaaPoint:', jekuaaPoint)

    if (jekuaaPoint) {
      state.jekuaaPoint = jekuaaPoint
    } else {
      state.jekuaaPoint = 0
    }
  },

  
}
