import firebase from 'firebase'
import firebaseConfigDefault from '../config/firebaseConfigDefault'
import firebaseConfigFotoPerfil from '../config/firebaseConfigFotoPerfil'

// Add the Firebase products that you want to use
import 'firebase/firestore'
import 'firebase/auth'

let noHayApp = firebase.apps.length === 0

// Initialize Firebase
firebase.apps.length === 0 ? firebase.initializeApp(firebaseConfigDefault) : ''
firebase.apps.length === 1 ? firebase.initializeApp(firebaseConfigFotoPerfil, 'fotos-perfil') : ''
// firebase.apps.length === 2 ? firebase.initializeApp(firebaseConfigDefault) : ''

if (process.client && process.env.NODE_ENV === 'development') 
  firebase.functions().useEmulator('localhost', 5001)


if (!process.client && noHayApp && process.env.NODE_ENV === 'development') 
  firebase.functions().useEmulator('localhost', 5001)


export default async ({ env, store, redirect }, inject) => {

  if (process.client) {
    console.log('firebase.apps[0].name', firebase.apps[0].name)
    console.log('firebase.apps[1].name', firebase.apps[1].name)

    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        store.commit('modules/sistema/setLoading', true)
        // if ( !store.getters['modules/usuarios/autenticado'] ) {
        //   await store.dispatch('modules/usuarios/login', user.uid)
        // }
        await store.dispatch('modules/usuarios/login', user.uid)
      } else {
        await store.dispatch('modules/usuarios/logout')
      }
      store.commit('modules/sistema/setLoading', false)
    })
  }

  inject('firebase', firebase)
  inject('firebaseFotoPerfil', firebase.apps[1])
  // inject('firebaseCursos', firebase.apps[2])

}

export const fb = firebase