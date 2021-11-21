import Cookies from 'js-cookie'
import firebase from 'firebase'
import firebaseConfig from '../config/configEnv'

// Add the Firebase products that you want to use
import 'firebase/firestore'
import 'firebase/auth'

export default async ({ env, store }, inject) => {

  let esComienzo = firebase.apps.length === 0

  // Initialize Firebase
  !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : ''

  if (process.client) {

    if(window.location.hostname === 'localhost') {
      firebase.auth().useEmulator('http://localhost:9099')
      firebase.firestore().useEmulator('localhost', 8080)
      firebase.functions().useEmulator('localhost', 5001)
      // firebase.storage().useEmulator('localhost', 9199)
    }

    firebase.auth().onAuthStateChanged(async (user) => {
      await store.dispatch('modules/sistema/setLoading', true)

      if (user) {
        console.log('signed in', user)
        await store.dispatch('modules/usuarios/login', user.uid)

      } else {
        console.log('signed out')
        await store.dispatch('modules/usuarios/logout')
      }

      await store.dispatch('modules/sistema/setLoading', false)
    })

  } else {
    if(esComienzo) {
      firebase.auth().useEmulator('http://localhost:9099')
      firebase.firestore().useEmulator('localhost', 8080)
      firebase.functions().useEmulator('localhost', 5001)
      // firebase.storage().useEmulator('localhost', 9199)
    }
  }
  
  inject('firebase', firebase)
}
