import firebase from 'firebase'
import firebaseConfig from '../config/configEnv'

// Add the Firebase products that you want to use
import 'firebase/firestore'
import 'firebase/auth'

let esComienzo = firebase.apps.length === 0

// Initialize Firebase
!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : ''

if (process.client && process.env.NODE_ENV === 'development') {
  firebase.auth().useEmulator('http://localhost:9099')
  firebase.firestore().useEmulator('localhost', 8080)
  firebase.functions().useEmulator('localhost', 5001)
  // firebase.storage().useEmulator('localhost', 9199)
}

if (!process.client && esComienzo && process.env.NODE_ENV === 'development') {
  firebase.auth().useEmulator('http://localhost:9099')
  firebase.firestore().useEmulator('localhost', 8080)
  firebase.functions().useEmulator('localhost', 5001)
  // firebase.storage().useEmulator('localhost', 9199)
}

export default async ({ env, store, redirect }, inject) => {

  if (process.client) {
    firebase.auth().onAuthStateChanged(async (user) => {
      store.commit('modules/sistema/setLoading', true)
      if (user) {
        if ( !store.getters['modules/usuarios/autenticado'] ) {
          await store.dispatch('modules/usuarios/login', user.uid)
          redirect('/inicio')
        }
      } else {
        await store.dispatch('modules/usuarios/logout')
      }
      store.commit('modules/sistema/setLoading', false)
    })

  }
  
  inject('firebase', firebase)
}

export const fb = firebase