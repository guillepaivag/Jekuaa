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

      const datosUsuarioDB = await dispatch('modules/usuarios/firebaseFirestoreGetUser_UID', uid)

      // Objetos a insertar
      const fotoPerfil = user.decodedToken.picture ? user.decodedToken.picture : null
      const nombreUsuario = user.decodedToken.name ? user.decodedToken.name : null
      const correo = user.decodedToken.email ? user.decodedToken.email : null
      const nombreCompleto = datosUsuarioDB.data().nombreCompleto ? datosUsuarioDB.data().nombreCompleto : null
      const fechaNacimiento = datosUsuarioDB.data().fechaNacimiento ? new Date(datosUsuarioDB.data().fechaNacimiento.seconds * 1000) : null

      const jekuaaPremium = datosUsuarioDB.data().jekuaaPremium ? datosUsuarioDB.data().jekuaaPremium : null
      const jekuaaRol = user.decodedToken.jekuaaRol ? user.decodedToken.jekuaaRol : null
      const instructor = user.decodedToken.instructor ? user.decodedToken.instructor : null
      const jekuaaPoint = datosUsuarioDB.data().jekuaaPoint ? datosUsuarioDB.data().jekuaaPoint : null


      // // Objetos a insertar
      // const fotoPerfil = user.decodedToken.picture ? user.decodedToken.picture : null
      // const nombreUsuario = user.decodedToken.name ? user.decodedToken.name : null
      // const correo = user.decodedToken.email ? user.decodedToken.email : null
      // const nombreCompleto = null
      // const fechaNacimiento = null
      // const jekuaaPremium = {
      //   plan: user.decodedToken.jekuaaPremium,
      //   fechaCompra: null,
      //   fechaHasta: null,
      // }
      // const jekuaaRol = user.decodedToken.jekuaaRol ? user.decodedToken.jekuaaRol : null
      // const instructor = user.decodedToken.instructor ? user.decodedToken.instructor : null
      // const jekuaaPoint = null

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

      await dispatch('modules/usuarios/setDatosUsuario', datosUsuario)

    } catch (error) {
      console.log('Error - nuxtServerInit: ', error)
    }
  },

}
