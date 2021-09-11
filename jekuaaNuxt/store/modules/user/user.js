import 'firebase'
import Cookies from 'js-cookie'
const COOKIE_NAME = '__session'
const collectionName = 'Usuarios'
const realTime = false

const jekuaaPremiumDefault = {
  plan: '',
  fechaCompra: null,
  fechaHasta: null
}

const jekuaaRolesDefault = {
  rol: 'estudiante',
  secciones: [],
  instructor: false
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
  jekuaaRoles: jekuaaRolesDefault,
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

  jekuaaRoles (state) {
    return state.jekuaaRoles
  },

  jekuaaPoint (state) {
    return state.jekuaaPoint
  },

  autenticado (state) {
    return !!state.token && !!state.uid
  },

  esJekuaaPremium (state) {
    return !!state.jekuaaPremium
  },

  esMiembroJekuaa (state) {
    return state.jekuaaRoles.rol != 'estudiante'
  }

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

  setDatosJekuaaPremium ({ commit }, datosJekuaaPremium) {
    console.log('[STORE ACTIONS] - setDatosJekuaaPremium')
    if (datosJekuaaPremium) {
      commit('setDatosJekuaaPremium', datosJekuaaPremium)
    } else {
      commit('setDatosJekuaaPremium', null)
    }
  },

  async setJekuaaRoles ({ dispatch, commit, state }, jekuaaRoles) {
    console.log('[STORE ACTIONS] - setJekuaaRoles')
    
    if (jekuaaRoles) {
      const uid = state.uid

      const { rol, secciones, instructor } = jekuaaRoles

      commit('setJekuaaRoles', { rol, secciones, instructor })

      if (jekuaaRoles.rol === 'estudiante') {
        return;
      }

      // if (!realTime) {
      //   await dispatch('modules/user/userJekuaaTeam/setDatosUsuarioJekuaaTeamPorUID', uid, { root: true })
      // } else {
      //   await dispatch('modules/user/userJekuaaTeam/setDatosUsuarioJekuaaTeamPorUID_RealTime', uid, { root: true })
      // }
      
    } else {
      commit('setJekuaaRoles', null)
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
      // Mostrar pantalla de carga

      // Obtenemos los datos del usuario por medio de la uid
      // Insertamos los datos de los usuarios en la store
      if (!realTime) {
        await dispatch('setDatosUsuarioPorUID', uid)
      } else {
        await dispatch('setDatosUsuarioPorUID_RealTime', uid) 
      }

    } catch (error) {
      
      console.log('error login', error)

    } finally {
      // Finalizar pantalla de carga
    }
    
  },

  async logout ({ commit, dispatch }) {
    console.log('[STORE ACTIONS] - logout')
    await this.$firebase.auth().signOut()

    // Insertamos los datos de los usuarios en la store
    await dispatch('setDatosUsuario', null)
  },

  async setDatosUsuario ({ dispatch, commit }, datosUsuario) {

    let uid
    if (datosUsuario) {
      uid = datosUsuario.uid
      
      await dispatch('setTOKEN', datosUsuario.token)
      await dispatch('setFotoPerfil', datosUsuario.fotoPerfil)
      await dispatch('saveUID', datosUsuario.uid)
      await dispatch('setNombreUsuario', datosUsuario.nombreUsuario)
      await dispatch('setCorreo', datosUsuario.correo)
      await dispatch('setNombreCompleto', datosUsuario.nombreCompleto)
      await dispatch('setFechaNacimiento', datosUsuario.fechaNacimiento)
      await dispatch('setDatosJekuaaPremium', datosUsuario.jekuaaPremium)
      await dispatch('setJekuaaRoles', datosUsuario.jekuaaRoles)
      await dispatch('setJekuaaPoint', datosUsuario.jekuaaPoint)
      
    } else {
      uid = null

      await dispatch('setTOKEN', null)
      await dispatch('setFotoPerfil', null)
      await dispatch('saveUID', null)
      await dispatch('setNombreUsuario', null)
      await dispatch('setCorreo', null)
      await dispatch('setNombreCompleto', null)
      await dispatch('setFechaNacimiento', null)
      await dispatch('setDatosJekuaaPremium', null)
      await dispatch('setJekuaaRoles', null)
      await dispatch('setJekuaaPoint', null)
    }

    // if (!realTime) {
    //   await dispatch('modules/user/misCursos/setDatosMisCursosPorUID', uid, { root: true })
    //   // await dispatch('modules/user/seguimientos/setDatosSeguimientosPorUID', null, { root: true })
    //   // await dispatch('modules/user/intereses/setDatosInteresesPorUID', null, { root: true })
    // } else {
    //   await dispatch('modules/user/misCursos/setDatosMisCursosPorUID_RealTime', uid, { root: true })
    //   // await dispatch('modules/user/seguimientos/setDatosSeguimientosPorUID_RealTime', null, { root: true })
    //   // await dispatch('modules/user/intereses/setDatosInteresesPorUID_RealTime', null, { root: true })
    // }

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

    const registrarUsuarioPorCorreoYContrasenha = this.$firebase.functions().httpsCallable('registrarUsuarioPorCorreoYContrasenha')

    const datosRegistroUsuario = await registrarUsuarioPorCorreoYContrasenha({
      correo: usuario.correo,
      contrasenha: usuario.contrasenha,
      nombreUsuario: usuario.nombreUsuario,
      nombreCompleto: usuario.nombreCompleto
    })
    console.log('datosRegistroUsuario', datosRegistroUsuario)

    // Retornar datos de registro del usuario
    return datosRegistroUsuario.data.resultado
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
    
    const userDoc = await this.$firebase.firestore().collection(collectionName).doc(uid).get()

    return userDoc
  },

  async getUsuarioDatosPorUID ({ dispatch, commit, state }, uid) {
    
    if (!uid) {
      return null
    }
    
    const usuarioDoc = await dispatch('firebaseFirestoreGetUser_UID', uid)

    if ( !usuarioDoc.exists ) {
      return null
    } 

    const usuario = usuarioDoc.data()
    
    // Obtener los datos
    const userCurrent = this.$firebase.auth().currentUser

    if (!userCurrent) {
      return null
    }

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
    }

    const jekuaaRoles = usuario.jekuaaRoles ?
                  usuario.jekuaaRoles : null

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
      jekuaaRoles,
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

  setDatosJekuaaPremium (state, jekuaaPremium) {
    console.log('[STORE MUTATIONS] - setDatosJekuaaPremium:', jekuaaPremium)

    if (jekuaaPremium) {
      /* FORMATO: {
          duracion: 0,
          fechaCompra: null,
          plan: ''
      } */
      
      state.jekuaaPremium = jekuaaPremium
    } else {
      state.jekuaaPremium = null
    }
  },

  setJekuaaRoles (state, jekuaaRoles) {
    console.log('[STORE MUTATIONS] - setJekuaaRoles:', jekuaaRoles)

    if (jekuaaRoles) {
      state.jekuaaRoles = jekuaaRoles
    } else {
      state.jekuaaRoles = jekuaaRolesDefault
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
