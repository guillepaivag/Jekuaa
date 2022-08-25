// import admin from 'firebase-admin'
// import firebase from 'firebase'
import { getUserFromCookie, getUserFromSession } from '../helpers/index.js'

export const actions = {

  async nuxtServerInit ({ dispatch, commit }, { store, route, req, res, app, beforeNuxtRender }) {
    
    try {
      const user = getUserFromCookie(req)

      if ( !(user && user.decodedToken) ) {
        await dispatch('modules/usuarios/setDatosUsuario', null)
        return 
      } else {
        commit('modules/sistema/setLoading', true)
      }

      const token = user.accessTokenCookie

      const uid = user.decodedToken.user_id

      const docUsuario = await dispatch('modules/usuarios/getDocumentoUsuarioPorUID', uid)

      // Objetos a insertar
      const emailVerificado = user.decodedToken.email_verified ? user.decodedToken.email_verified : null
      const nombreCompleto = user.decodedToken.name ? user.decodedToken.name : null
      const fotoPerfil = user.decodedToken.picture ? user.decodedToken.picture : null
      
      const nombreUsuario = docUsuario.data().nombreUsuario ? docUsuario.data().nombreUsuario : null
      const correo = docUsuario.data().correo ? docUsuario.data().correo : null
      const fechaNacimiento = docUsuario.data().fechaNacimiento ? new Date(docUsuario.data().fechaNacimiento.seconds * 1000) : null

      const plan = docUsuario.data().plan ? docUsuario.data().plan : null
      const rol = docUsuario.data().rol ? docUsuario.data().rol : null
      const point = docUsuario.data().point ? docUsuario.data().point : null

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

      await dispatch('modules/usuarios/setDatosUsuario', datosUsuario)

    } catch (error) {
      console.log('Error - nuxtServerInit: ', error)
    }
  },

}
