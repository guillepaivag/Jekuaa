import Cookies from 'js-cookie'
import firebase from 'firebase'
import firebaseConfig from '../config/configEnv'

// Add the Firebase products that you want to use
import 'firebase/firestore'
import 'firebase/auth'

export default ({ env, store }, inject) => {

  // Initialize Firebase
  !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : ''
  
  if (process.client) {

    if(window.location.hostname === 'localhost') {
      firebase.auth().useEmulator('http://localhost:9099')
      firebase.firestore().useEmulator('localhost', 8080)
      firebase.functions().useEmulator('localhost', 5001)
      firebase.storage().useEmulator('localhost', 9199)
    }

    firebase.auth().onAuthStateChanged(async (user) => {
      store.dispatch('modules/system/setLoading', true)

      if (user) {
        console.log('signed in', user)
        await store.dispatch('modules/user/user/login', user.uid)

      } else {
        console.log('signed out')
        await store.dispatch('modules/user/user/logout')
      }

      store.dispatch('modules/system/setLoading', false)
    })

  }
  
  inject('firebase', firebase)
}
