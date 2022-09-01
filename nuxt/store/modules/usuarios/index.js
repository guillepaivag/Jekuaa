import Cookies from 'js-cookie'
const COOKIE_NAME = '__session'
const collectionName = 'Usuarios'


// export const state = {
//   token: '',
//   emailVerificado: false,
//   fotoPerfil: '',
//   nombreCompleto: '',
//   uid: '',
//   nombreUsuario: '',
//   correo: '',
//   fechaNacimiento: null,
//   plan: 'gratis',
//   rol: 'estudiante',
//   point: 0,
// }

export const state = () => ({
  token: '',
  emailVerificado: false,
  fotoPerfil: '',
  nombreCompleto: '',
  uid: '',
  nombreUsuario: '',
  correo: '',
  fechaNacimiento: null,
  plan: 'gratis',
  rol: 'estudiante',
  point: 0,
})



export const getters = {

  token (state) {
    return state.token
  },

  emailVerificado (state) {
    return state.emailVerificado
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

  plan (state) {
    return state.plan
  },

  rol (state) {
    return state.rol
  },

  point (state) {
    return state.point
  },

  autenticado (state) {
    return !!state.token
  },

  tienePlan (state) {
    return state.plan !== ''
  },

  esMiembro (state) {
    return state.rol !== 'estudiante'
  },

  esModerador (state) {
    return state.rol === 'moderador' || state.rol === 'propietario'
  },
}




export const actions = {

  /* 
    SETTERS
  */
  setTOKEN ({ commit }, token) {
    if (token) {
      commit('setTOKEN', token)
      Cookies.set(COOKIE_NAME, token)
    } else {
      commit('setTOKEN', null)
      Cookies.remove(COOKIE_NAME)
    }
  },

  setEmailVerificado ({ commit }, emailVerificado) {
    if (emailVerificado) {
      commit('setEmailVerificado', emailVerificado)
    } else {
      commit('setEmailVerificado', null)
    }
  },

  setFotoPerfil ({ commit }, fotoPerfil) {
    if (fotoPerfil) {
      commit('setFotoPerfil', fotoPerfil)
    } else {
      commit('setFotoPerfil', null)
    }
  },

  saveUID ({ commit }, uid) {
    if (uid) {
      commit('saveUID', uid)
    } else {
      commit('saveUID', null)
    }
  },

  setNombreUsuario ({ commit }, nombreUsuario) {
    if (nombreUsuario) {
      commit('setNombreUsuario', nombreUsuario)
    } else {
      commit('setNombreUsuario', null)
    }
  },

  setCorreo ({ commit }, correo) {
    if (correo) {
      commit('setCorreo', correo)
    } else {
      commit('setCorreo', null)
    }
  },

  setNombreCompleto ({ commit }, nombreCompleto) {
    if (nombreCompleto) {
      commit('setNombreCompleto', nombreCompleto)
    } else {
      commit('setNombreCompleto', null)
    }
  },

  setFechaNacimiento ({ commit }, fechaNacimiento) {
    if (fechaNacimiento) {
      commit('setFechaNacimiento', fechaNacimiento)
    } else {
      commit('setFechaNacimiento', null)
    }
  },

  setPlan ({ commit }, plan) {
    if (plan) {
      commit('setPlan', plan)
    } else {
      commit('setPlan', null)
    }
  },

  setRol ({ dispatch, commit, state }, rol) {
    if (rol) {
      commit('setRol', rol)
    } else {
      commit('setRol', null)
    }
  },

  setPoint ({ commit }, point) {
    if (point) {
      commit('setPoint', point)
    } else {
      commit('setPoint', null)
    }
  },




  async register ({ dispatch, state }, usuario) {
    const datosRegistroUsuario = await this.$axios.$post('/serviceUsuario/crearUsuario', {
      nombreCompleto: usuario.nombreCompleto,
      datosUsuario: {
        nombreUsuario: usuario.nombreUsuario,
        correo: usuario.correo,
      },
      contrasenha: usuario.contrasenha,
      confirmacionContrasenha: usuario.confirmacionContrasenha,
    })
    
    return datosRegistroUsuario.resultado
  },

  async login ({ dispatch, state }, usuario) {
    return this.$firebase.auth().signInWithEmailAndPassword(usuario.correo, usuario.contrasenha)
  },

  async logout ({ commit, dispatch }) {
    await this.$firebase.auth().signOut()

    // Insertamos los datos de los usuarios en la store
    await dispatch('setDatosUsuario', null)
  },

  async setDatosUsuarioPorUID ({ dispatch, commit }, uid) {
    if (uid) {
      const datosUsuario = await dispatch('getDatosUsuarioPorUID', uid)
      await dispatch('setDatosUsuario', datosUsuario)
    } else {
      await dispatch('setDatosUsuario', null)
    }
  },

  async getDatosUsuarioPorUID ({ dispatch, commit, state }, uid) {
    
    if (!uid) return null
    
    const usuarioDoc = await dispatch('getDocumentoUsuarioPorUID', uid)

    if ( !usuarioDoc.exists ) return null

    const usuario = usuarioDoc.data()
    
    // Obtener los datos
    const userCurrent = this.$firebase.auth().currentUser

    if (!userCurrent) return null

    // Token del usuario
    const token = await userCurrent.getIdToken(true)

    // Datos personales
    const emailVerificado = userCurrent.emailVerified ? userCurrent.emailVerified : null
    const nombreCompleto = userCurrent.displayName ? userCurrent.displayName : null
    const fotoPerfil = userCurrent.photoURL ? userCurrent.photoURL : null

    const nombreUsuario = usuario.nombreUsuario ? usuario.nombreUsuario : null
    const correo = usuario.correo ? usuario.correo : null
    const fechaNacimiento = usuario.fechaNacimiento ? new Date(usuario.fechaNacimiento.seconds * 1000) : null

    const plan = usuario.plan ? usuario.plan : null
    const rol = usuario.rol ? usuario.rol : null
    const point = usuario.point ? usuario.point : null

    // Creamos un objeto a insertar
    const datosUsuario = {
      token,
      emailVerificado,
      fotoPerfil,
      uid,
      nombreCompleto,
      nombreUsuario,
      correo,
      fechaNacimiento,
      plan,
      rol,
      point
    }

    return datosUsuario
  },

  async getDocumentoUsuarioPorUID ({ dispatch, state }, uid) {
    const ref = this.$firebase.firestore().collection(collectionName).doc(uid)
    const userDoc = await ref.get()

    return userDoc
  },

  async setDatosUsuario ({ state, dispatch, commit }, datosUsuario) {

    let uid = ''
    if (datosUsuario) {
      uid = datosUsuario.uid
      
      await dispatch('setTOKEN', datosUsuario.token)
      await dispatch('setEmailVerificado', datosUsuario.emailVerificado)
      await dispatch('setFotoPerfil', datosUsuario.fotoPerfil)
      await dispatch('saveUID', datosUsuario.uid)
      await dispatch('setNombreUsuario', datosUsuario.nombreUsuario)
      await dispatch('setCorreo', datosUsuario.correo)
      await dispatch('setNombreCompleto', datosUsuario.nombreCompleto)
      await dispatch('setFechaNacimiento', datosUsuario.fechaNacimiento)
      await dispatch('setPlan', datosUsuario.plan)
      await dispatch('setRol', datosUsuario.rol)
      await dispatch('setPoint', datosUsuario.point)
      
    } else {
      await dispatch('setTOKEN', null)
      await dispatch('setEmailVerificado', null)
      await dispatch('setFotoPerfil', null)
      await dispatch('saveUID', null)
      await dispatch('setNombreUsuario', null)
      await dispatch('setCorreo', null)
      await dispatch('setNombreCompleto', null)
      await dispatch('setFechaNacimiento', null)
      await dispatch('setPlan', null)
      await dispatch('setRol', null)
      await dispatch('setPoint', null)
    }

  },

}




export const mutations = {

  setTOKEN (state, token) {
    if (token) {
      state.token = token
    } else {
      state.token = ''
    }
  },

  setEmailVerificado (state, emailVerificado) {
    if (emailVerificado) {
      state.emailVerificado = emailVerificado
    } else {
      state.emailVerificado = false
    }
  },

  setFotoPerfil (state, fotoPerfil ) {
    if (fotoPerfil) {
      state.fotoPerfil = fotoPerfil
    } else {
      state.fotoPerfil = ''
    }
  },

  saveUID (state, uid) {
    if (uid) {
      state.uid = uid
    } else {
      state.uid = ''
    }
  },

  setNombreUsuario (state, nombreUsuario ) {
    if (nombreUsuario) {
      state.nombreUsuario = nombreUsuario
    } else {
      state.nombreUsuario = ''
    }
  },

  setCorreo (state, correo ) {
    if (correo) {
      state.correo = correo
    } else {
      state.correo = ''
    }
  },

  setNombreCompleto (state, nombreCompleto ) {
    if (nombreCompleto) {
      state.nombreCompleto = nombreCompleto
    } else {
      state.nombreCompleto = ''
    }
  },

  setFechaNacimiento (state, fechaNacimiento ) {
    if (fechaNacimiento) {
      state.fechaNacimiento = fechaNacimiento
    } else {
      state.fechaNacimiento = null
    }
  },

  setPlan (state, plan) {
    if (plan) {
      state.plan = plan
    } else {
      state.plan = 'gratis'
    }
  },

  setRol (state, rol) {
    if (rol) {
      state.rol = rol
    } else {
      state.rol = 'estudiante'
    }
  },

  setPoint (state, point) {
    if (point) {
      state.point = point
    } else {
      state.point = 0
    }
  },

  
}
