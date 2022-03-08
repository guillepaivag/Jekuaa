import firebase from 'firebase'
import firebaseConfig from '../config/configEnv'

// Add the Firebase products that you want to use
import 'firebase/firestore'
import 'firebase/auth'

let noHayApp = firebase.apps.length === 0

// Initialize Firebase
!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : ''

if (process.client && process.env.NODE_ENV === 'development') 
  firebase.functions().useEmulator('localhost', 5001)


if (!process.client && noHayApp && process.env.NODE_ENV === 'development') 
  firebase.functions().useEmulator('localhost', 5001)


export default async ({ env, store, redirect }, inject) => {

  if (process.client) {
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
}

export const fb = firebase