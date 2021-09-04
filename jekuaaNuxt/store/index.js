// import admin from 'firebase-admin'
// import firebase from 'firebase'
import { getUserFromCookie, getUserFromSession } from '../helpers/index.js'

export const actions = {

  async nuxtServerInit ({ dispatch }, { store, route, req, res, app, beforeNuxtRender }) {
    
    try {

      await dispatch('modules/system/setLoading', true)

      const user = getUserFromCookie(req)

      if (user && user.decodedToken) {
      
        const token = user.accessTokenCookie

        const uid = user.decodedToken.user_id

        const datosUsuarioDB = await dispatch('modules/user/user/firebaseFirestoreGetUser_UID', uid)

        console.log('datosUsuarioDB: ', datosUsuarioDB.data())

        // Objetos a insertar
        const fotoPerfil = user.decodedToken.picture ? user.decodedToken.picture : null
        const nombreUsuario = user.decodedToken.name ? user.decodedToken.name : null
        const correo = user.decodedToken.email ? user.decodedToken.email : null
        const nombreCompleto = datosUsuarioDB.data().nombreCompleto ? datosUsuarioDB.data().nombreCompleto : null
        const fechaNacimiento = datosUsuarioDB.data().fechaNacimiento ? new Date(datosUsuarioDB.data().fechaNacimiento.seconds * 1000) : null

        const jekuaaPremium = datosUsuarioDB.data().jekuaaPremium ? 
                                    datosUsuarioDB.data().jekuaaPremium : null

        const jekuaaRoles = datosUsuarioDB.data().jekuaaRoles ? 
                        datosUsuarioDB.data().jekuaaRoles : null

        const jekuaaPoint = datosUsuarioDB.data().jekuaaPoint ? 
                        datosUsuarioDB.data().jekuaaPoint : null

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

        console.log('datosUsuario: ', datosUsuario)

        await dispatch('modules/user/user/setDatosUsuario', datosUsuario)

      } else {
        await dispatch('modules/user/user/setDatosUsuario', null)
      }
    } catch (error) {
      console.log('ERROOOR: ', error)

      return 
    } 

  },

}
