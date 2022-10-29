import firebase from 'firebase'
import firebaseConfigDefault from '../config/firebaseConfigDefault'
import firebaseConfigFotoPerfil from '../config/firebaseConfigFotoPerfil'
import firebaseConfigContenidoBorradorVerificacion from '../config/firebaseConfigContenidoBorradorVerificacion'
import firebaseConfigFotoCurso from '../config/firebaseConfigFotoCurso'

// Add the Firebase products that you want to use
import 'firebase/firestore'
import 'firebase/auth'

let noHayApp = firebase.apps.length === 0

// Initialize Firebase
firebase.apps.length === 0 ? firebase.initializeApp(firebaseConfigDefault) : ''
firebase.apps.length === 1 ? firebase.initializeApp(firebaseConfigFotoPerfil, 'fotos-perfil') : ''
firebase.apps.length === 2 ? firebase.initializeApp(firebaseConfigFotoCurso, 'fotos-curso') : ''
firebase.apps.length === 3 ? firebase.initializeApp(firebaseConfigContenidoBorradorVerificacion, 'contenido-borrador-verificacion') : ''


if (process.client && process.env.NODE_ENV === 'development') 
  firebase.functions().useEmulator('localhost', 5001)


if (!process.client && noHayApp && process.env.NODE_ENV === 'development') 
  firebase.functions().useEmulator('localhost', 5001)


export default async ({ env, store, redirect }, inject) => {

  if (process.client) {

    firebase.auth().onAuthStateChanged(async (user) => {
      console.log('user', user)

      if (user) {
        store.commit('modules/sistema/setLoading', true)

        if (user.metadata.creationTime !== user.metadata.lastSignInTime) 
          store.dispatch('modules/usuarios/setDatosUsuarioPorUID', user.uid)
        else {
          const token = await user.getIdToken()
          const nombreUsuario = user.email.split('@')[0] + new Date(user.metadata.creationTime).getTime()

          store.dispatch('modules/usuarios/setDatosUsuario', {
            token: token,
            emailVerificado: user.emailVerified,
            fotoPerfil: user.photoURL,
            uid: user.uid,
            nombreUsuario: nombreUsuario,
            correo: user.email,
            nombreCompleto: user.displayName,
            fechaNacimiento: null,
            plan: 'gratis',
            rol: 'estudiante',
            point: 0,
          })
        }

      } else {
        await store.dispatch('modules/usuarios/logout')
      
      }

      store.commit('modules/sistema/setLoading', false)
    
    })
  }

  inject('firebase', firebase)
  inject('firebaseFotoPerfil', firebase.apps[1])
  inject('firebaseFotoCurso', firebase.apps[2])
  inject('firebaseContenidoBV', firebase.apps[3])
}

export const fb = firebase